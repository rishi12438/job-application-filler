const AUTOFILL_DATA_FILE = chrome.runtime.getURL('data.json');
const SITES_SELECTOR_MAPPING_FILE = chrome.runtime.getURL('sites.json');

let autofillData = {};
let sitesData = {};

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


/**
 * Import the data.json file
 */
const dataStream = fetch(AUTOFILL_DATA_FILE)
  .then(response => response.json())
  .catch(e => console.log(`failed to read data.json: ${e}`));

/**
 * Import the sites.json file
 */
const sitesStream = fetch(SITES_SELECTOR_MAPPING_FILE)
  .then(response => response.json())
  .catch(e => console.log(`failed to read sites.json: ${e}`));

/**
 * Wait for all promises to be resolved before we initialize the extension
 */
Promise.all([
  dataStream,
  sitesStream
]).then(responses => {
  autofillData = responses[0];
  sitesData = responses[1];
  init();
})

/**
 * Checks if the hostname is supported.
 * Finds a standardized equivalent if there's no direct match.
 * @param {String} hostname - hostname of the current window
 * @returns {String|null} - returns the standardized sitename or null
 */
function _isSupported(hostname) {
  if(hostname.indexOf("workday")!=-1){ 
    return "workday" 
  }  
  if (sitesData[hostname]) {
    return hostname;
  }
  for (let site in supportedSites) {
    if (hostname.includes(site)) {
      return site;
    }
  }
  return null;
}

/**
 * Checks if the application type is simple or complex
 * @param {String} siteName - standardized sitename
 * @returns {Boolean}
 */
function _isComplex(siteName) {
  return sitesData[siteName].isComplex;
}

/**
 * Initialize the autofill extension
 */
function init() {
  const siteName = _isSupported(window.location.hostname);
  
  if (!siteName) {
    return;
  }
  if(siteName == "workday"){ 
    fill_workday()
    return;
  }
  if (_isComplex(siteName)) {
    autofillComplexPages(siteName);
  } else {
    autofillPage(siteName);
  }
}

/**
 * Find the autofill-able input fields on the page according the hostname
 * @param {String} siteName - standardized sitename of the current window
 */
function autofillPage(siteName) {
  for (let selector in sitesData[siteName].selectorMapping) {
    const inputElement = $(selector);
    if (inputElement.length) {
      const inputData = sitesData[siteName].selectorMapping[selector];
      autofillInput(selector, inputData, inputElement);
    }
  }
}

/**
 * Handles autofill for complex application pages
 * @param {String} siteName - standardized sitename of the current window
 */
function autofillComplexPages(siteName) {
  // TODO: Handle complex cases
}

/**
 * Autofill the input field(s) with the input data
 * @param {jQuery} inputElement - jQuery Object containing the input element(s)
 * @param {String} inputData - data to be autofilled into the input element
 */
function autofillInput(selector, inputData, inputElement) {
  const inputValue = autofillData[inputData];
  inputElement.each(element => {
    if (inputElement[element].tagName === 'SELECT') {
      $(`${selector} option:contains("${inputValue}")`).attr("selected", true);
    } else {
      $(selector).val(inputValue).change();
    }
  });
}

async function fill_workday(){ 
  cannot_find = true 
  while(cannot_find){ 
    console.log('All assets are loaded')  
    if($("div[data-automation-id*='formField']").length > 0 ) {
      cannot_find = false; 
      //It'll be an array of elements
    }
    await sleep(2000)
  }
  $("div[data-automation-id*='formField']").each(function (i, el) {
    console.log(el.children[0]) 
    //It'll be an array of elements
  });
}
/*
function start() {

  setTimeout(function() {
      console.log('Hello My Infinite Loop Execution');

    // Again
    start();

    // Every 3 sec
  }, 3000);
}*/

