const AUTOFILL_DATA_FILE = chrome.runtime.getURL('data.json');
const SITES_SELECTOR_MAPPING_FILE = chrome.runtime.getURL('sites.json');

let autofillData = {};
let done_next = 0 
let done_previous = 0
let sitesData = {};
let lastknown_title = ""; 

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
  console.log("fill workday called")
  while(cannot_find){ 
    console.log('All assets are loaded')  
    if($("div[data-automation-id*='formField']").length > 0 ) {
      cannot_find = false; 
      //It'll be an array of elements 
    }
    await sleep(2000)
  }
  

  if(document.getElementsByClassName("css-1j9bnzb")[0].innerText == lastknown_title){
      return 
  }
  lastknown_title = document.getElementsByClassName("css-1j9bnzb")[0].innerText
  //this section is for the dropdown 
  $("div[data-automation-id*='formField']").each(function (i, el) {
    var label_name  = el.children[0].innerText.replace("*","");
    //this is the second div that contains the input 
    var input_div = el.children[1]    

    var to_search = sitesData["workday"]["selectorMapping"][label_name.toLowerCase()]
    var value_to_look_for = ""
    if(typeof to_search !== "undefined"){ 
        value_to_look_for = autofillData[to_search]
    }
    found = 0 
    //if button is present, means we have a dropdown 
    if(typeof input_div !== "undefined" && input_div.getElementsByTagName("button").length > 0){ 
      input_div.getElementsByTagName("button")[0].click()
      document.getElementsByClassName('css-mq2y9k')[0].querySelector('[role="listbox"]')
      options = document.getElementsByTagName('li')
      i = 0 
      while(i < options.length){
        if(value_to_look_for != "" && typeof value_to_look_for !== "undefined" && options[i].innerText !== "undefined"  && value_to_look_for.toLowerCase() == options[i].innerText.toLowerCase()){ 
          found = 1
          options[i].click()
        }        
        //console.log(options[i].getAttribute('data-value'),options[i].innerText)
        i++
      }
    }
    else{ 

    }
    //close the dropdown 
    if(found == 0){ 
      if(typeof input_div !== "undefined" && input_div.getElementsByTagName("button").length > 0){ 
        input_div.getElementsByTagName("button")[0].click()
      }
    }
  });
  await sleep(2000)
  //console.log("called new",$("div[data-automation-id*='formField']") )
  //this section is for the normal text input --> I have done it like this because when you do drop down more fields might be added
  $("div[data-automation-id*='formField']").each(function (i, el) {
    
    var label_name  = el.children[0].innerText.replace("*","");
    //this is the second div that contains the input 
    var input_div = el.children[1]    

    var to_search = sitesData["workday"]["selectorMapping"][label_name.toLowerCase()]
    var value_to_look_for = ""
    console.log(label_name,to_search,value_to_look_for)
    if(typeof to_search !== "undefined"){ 
        value_to_look_for = autofillData[to_search]
    }
    if(typeof input_div !== "undefined" && input_div.querySelectorAll('input[type=text]').length > 0 ){ 
      if(value_to_look_for != "" && typeof value_to_look_for !== "undefined"){ 
        input_div.querySelector('input[type=text]').value = value_to_look_for
      }
    }
  });

  if(done_next == 0){ 
    try{
      document.getElementsByClassName('css-1r8ofxn')[0].addEventListener("click", function(){ 
          console.log('next pressed')  
          fill_workday()        
          done_previous = 1
      });
    }  
    catch(err){ 
    }

  }
  if(done_previous == 0 ){ 
    try{
      document.getElementsByClassName('css-1coxel6')[0].addEventListener("click", function(){ 
          console.log("prev pressed")
          fill_workday()
          done_previous = 1
      });

    }  
    catch(err){ 
    }
  }
}

