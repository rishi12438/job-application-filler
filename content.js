const AUTOFILL_DATA_FILE = chrome.runtime.getURL('data.json');
const SITES_SELECTOR_MAPPING_FILE = chrome.runtime.getURL('sites.json');

let autofillData = {};
let done_next = 0 
let done_previous = 0
let sitesData = {};
let lastknown_title = ""; 
let current_page_value_map = {}
var actual_next_button;
var actual_prev_button;
var fake_next_button;
var fake_prev_button; 


function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const readLocalStorage = async () => {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get(null, function (result) {
      resolve(result)
    });
  });
}; 

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
  sitesStream, 
  readLocalStorage(),
]).then(responses => {
  autofillData = responses[0];
  sitesData = responses[1];
  current_page_value_map= responses[2]
  console.log("ffkkk",current_page_value_map)
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
    fill_workday(0)
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

function add_event_listener_for_next_prev_workday(){ 
  
  if(done_previous == 0){ 

    try{
      if(document.querySelectorAll('button[data-automation-id="bottom-navigation-back-button"]').length > 0 ){ 
        actual_prev_button = document.querySelectorAll('button[data-automation-id="bottom-navigation-back-button"]')[0]
        fake_prev_button = actual_prev_button.cloneNode(true)
        actual_prev_button.style.display = "none"; 
        actual_prev_button.parentNode.insertBefore(fake_prev_button,actual_prev_button)
        

        fake_prev_button.addEventListener("click", function(){ 
          console.log('prev pressed')  
          fill_workday(2)        
        });
      done_previous = 1    
      }  
    }  
    catch(err){ 

    }
  }

  if(done_next == 0 ){ 
    try{
      
      if(document.querySelectorAll('button[data-automation-id="bottom-navigation-next-button"]').length > 0 ){  
        actual_next_button = document.querySelectorAll('button[data-automation-id="bottom-navigation-next-button"]')[0]
        fake_next_button =  actual_next_button.cloneNode(true) //document.createElement("button");
        actual_next_button.style.display = "none"; 
        actual_next_button.parentNode.insertBefore(fake_next_button,actual_next_button)
        

        fake_next_button.addEventListener("click", function(){ 
            console.log("next pressed")
            fill_workday(1)
        });
        console.log("added next button event listner");
        done_next = 1
      }
    }  
    catch(err){ 
      console.log("err",err)
    }
  }
}
async function fill_workday(save){ 
  if(save == 1 || save == 2){ 
    console.log("saving whatever possible")
    $("div[data-automation-id*='formField']").each(function (i, el) {

      var label_name  = el.children[0].innerText.replace("*","");
      label_name = label_name.toLowerCase()
      //this is the second div that contains the input 
      var input_div = el.children[1]    
      var to_search = sitesData["workday"]["selectorMapping"][label_name.toLowerCase()]
      
      if(typeof input_div !== "undefined" && input_div.getElementsByTagName("button").length > 0){ 
        btn_to_search = input_div.getElementsByTagName("button")[0]
        value_for_button = btn_to_search.innerText
        console.log("correct values for ", label_name, "are ",btn_to_search.getAttribute('value') , value_for_button)
        chrome.storage.local.set({[label_name] :  value_for_button }, function () {
          console.log("saving",label_name,value_for_button)
          current_page_value_map[label_name] =  value_for_button
        });
      }
      else if(typeof input_div !== "undefined" && input_div.querySelectorAll('input[type=text]').length > 0 ){ 
        input_to_search = input_div.querySelectorAll('input[type=text]')[0]
        console.log("correct values for ", label_name, "are ",input_to_search.getAttribute('value') )
        chrome.storage.local.set({[label_name] :  input_to_search.getAttribute('value') }, function () {
          current_page_value_map[label_name] =  input_to_search.getAttribute('value') 
        });
      }
    })

    if(save == 1){ 
      
      actual_next_button.click()
    }     
    
    else{ 
      actual_prev_button.click()
    }

    await sleep(3000)
    console.log("finished sleeping")
  }
  

  cannot_find = true 
  console.log("fill workday called",lastknown_title)
  while(cannot_find){ 
    console.log('All assets are loaded')  
    
    if(document.getElementsByClassName("css-1j9bnzb").length > 0  && document.querySelectorAll("div[data-automation-id*='formField']").length > 0 ) {
      cannot_find = false; 
    }
    await sleep(2000)
  }

  add_event_listener_for_next_prev_workday()

  
  
  //exit if same page is seen again 
  //if(document.getElementsByClassName("css-1j9bnzb")[0].innerText == lastknown_title){
    
  //  return 
  //  }
  
  var work_exp_count = {
    job_title:  0,
    company: 0,
    location: 0,
    summary: 0,
    from: 0,
    to: 0
  }
  console.log("work experiences", autofillData.work_experiences)
  $("div[data-automation-id*='workExperienceSection']").each(async function(i,el) {
    var label_name = el.children[0].innerText.replace("*","")
    var input_div = el.children[1]

    for (var k = 0; k < autofillData.work_experiences.length; k++) {
      if (input_div.getElementsByTagName("button")[0].getAttribute("data-automation-id") != "panel-set-delete-button") {
        input_div.getElementsByTagName("button")[0].click()
      }
    }
    await sleep(1000)
    $("div[data-automation-id*='formField']").each(function (i, el) {
      var label_name  = el.children[0].innerText.replace("*","");
      label_name = label_name.toLowerCase()
      //this is the second div that contains the input 
      var input_div = el.children[1]    
      
      var to_search = sitesData["workday"]["selectorMapping"][label_name.toLowerCase()]
      var value_to_look_for = ""
      // console.log("bel",label_name)
      if(typeof to_search !== "undefined" ){ 
          value_to_look_for = autofillData[to_search]
          // console.log('test work',label_name)
          switch(label_name.toLowerCase() ) {
            case "job title":
              value_to_look_for = autofillData[to_search][work_exp_count.job_title]["job_title"]
              work_exp_count.job_title += 1  
              break
            case "company":
              value_to_look_for = autofillData[to_search][work_exp_count.company]["company"]
              work_exp_count.company += 1
              break
            case "location":
              value_to_look_for = autofillData[to_search][work_exp_count.location]["location"]
              work_exp_count.location += 1
              break
            case "role description":
              value_to_look_for = autofillData[to_search][work_exp_count.summary]["summary"]
              document.querySelectorAll('[data-automation-id="description"]')[work_exp_count.summary].value = value_to_look_for
              work_exp_count.summary += 1
              break
          }
          if(value_to_look_for != "" && typeof value_to_look_for !== "undefined"){ 
            $(input_div).find('input[type=text]').focus()
            $(input_div).find('input[type=text]').val(value_to_look_for).change();
            //$(input_div).find('input[type=text]').focus()
          }
      }

    })

      // check if work experiences are already created
    if (Array.from(document.querySelectorAll('div')).find(el => el.textContent === 'MM')) {
      $("div[data-automation-id*='formField']").each(function (i, el) {
        var label_name  = el.children[0].innerText.replace("*","");
        //this is the second div that contains the input 
        var input_div = el.children[1]    

        var to_search = sitesData["workday"]["selectorMapping"][label_name.toLowerCase()]

        if (typeof to_search !== "undefined") {
          // fill up the dates
          for (var i = 0; i < autofillData.work_experiences.length;  i++ ) {
            const calendar_icon = document.querySelectorAll('[data-automation-id="dateIcon"]')
            console.log('calendar', calendar_icon)
            if (calendar_icon.length) {
              // from
              calendar_icon[i*2].children[0].focus()
              calendar_icon[i*2].children[0].click()
              console.log('from')
              const start_date = autofillData[to_search][work_exp_count.from]["start_date"].split("-")
              // click year as many times as current-specified
              for (var j = 0; j < new Date().getFullYear() - start_date[1]; j++) {
                document.querySelectorAll('[data-automation-id="monthPickerLeftSpinner"]')[0].focus()
                document.querySelectorAll('[data-automation-id="monthPickerLeftSpinner"]')[0].click()
              }
              // do same for month
              document.querySelectorAll('[data-automation-id="monthPickerTile"]')[parseInt(start_date[0])-1].focus()
              document.querySelectorAll('[data-automation-id="monthPickerTile"]')[parseInt(start_date[0])-1].click()
              
              // to
              calendar_icon[i*2+1].children[0].focus()
              calendar_icon[i*2+1].children[0].click()
              console.log('to')
              const end_date = autofillData[to_search][work_exp_count.from]["end_date"].split("-")
              // click year as many times as current-specified
              for (var j = 0; j < new Date().getFullYear() - end_date[1]; j++) {
                document.querySelectorAll('[data-automation-id="monthPickerLeftSpinner"]')[0].focus()
                document.querySelectorAll('[data-automation-id="monthPickerLeftSpinner"]')[0].click()
              }
              // do same for month
              document.querySelectorAll('[data-automation-id="monthPickerTile"]')[parseInt(end_date[0])-1].focus()
              document.querySelectorAll('[data-automation-id="monthPickerTile"]')[parseInt(end_date[0])-1].click()
              work_exp_count.from += 1
              work_exp_count.to += 1
            }
          }
        }
      })
    }
  })

  var education_count = {
    school:  0,
    degree: 0,
    major: 0,
    gpa: 0,
    from: 0,
    to: 0
  }
  console.log("education", autofillData.education)
  $("div[data-automation-id*='educationSection']").each(async function(i,el) {
    var label_name = el.children[0].innerText.replace("*","")
    var input_div = el.children[1]

    for (var k = 0; k < autofillData.education.length; k++) {
      if (input_div.getElementsByTagName("button")[0].getAttribute("data-automation-id") != "panel-set-delete-button") {
        input_div.getElementsByTagName("button")[0].click()
      }
    }
    await sleep(1000)
    $("div[data-automation-id*='formField']").each(async function (i, el) {
      var label_name  = el.children[0].innerText.replace("*","");
      label_name = label_name.toLowerCase()
      //this is the second div that contains the input 
      var input_div = el.children[1]    
      
      var to_search = sitesData["workday"]["selectorMapping"][label_name.toLowerCase()]
      var value_to_look_for = ""

      if(typeof to_search !== "undefined" ){ 
          value_to_look_for = autofillData[to_search]
          console.log('test education',label_name)
          switch(label_name.toLowerCase() ) {
            case "school or university":
              value_to_look_for = autofillData[to_search][education_count.school]["school"]
              $(input_div).find('input[type=text]').focus()
              $(input_div).find('input[type=text]').val(value_to_look_for).change();
              education_count.school += 1  
              break
            case "degree":
              value_to_look_for = autofillData[to_search][education_count.degree]["degree"]
              document.querySelectorAll('[data-automation-id="degree"]')[0].focus()
              document.querySelectorAll('[data-automation-id="degree"]')[0].click()
              var found = 0
              console.log("looking for ", label_name)
              try{
                z_s = document.querySelectorAll('ul')
                j = 0 
                var z 
                found_z = 0 
                while(j<z_s.length){ 
                  if(z_s[j].parentNode.hasAttribute('visibility') &&  z_s[j].getAttribute('role') == "listbox"){ 
                    z = z_s[j]
                    found_z = 1
                  }
                  j++
                }
                options = z.getElementsByTagName('li')
                i = 0           
                while(i < options.length){
                  if(value_to_look_for != "" && typeof value_to_look_for !== "undefined" && options[i].innerText !== "undefined"  && options[i].innerText.toLowerCase().includes(value_to_look_for.toLowerCase())){ 
                    found = 1
                    options[i].click()
                    changed = true
                    break;
                  }        
                  //console.log(options[i].getAttribute('data-value'),options[i].innerText)
                  i++
                }
              }
              catch(err){ 
                console.log("errorrr*OFOFOFOFOFO",err)
              }
              //close the dropdown 
              if(found == 0){ 
                if(typeof input_div !== "undefined" && input_div.querySelectorAll('button').length  > 0 && input_div.querySelectorAll('button')[0].hasAttribute('aria-expanded')){ 
                  console.log("closing", input_div.querySelectorAll('button')[0])
                  input_div.getElementsByTagName("button")[0].click()
                }
              }
              education_count.degree += 1
              break
            // case "field of study":
            //   value_to_look_for = autofillData[to_search][education_count.major]["major"]
            //   document.querySelectorAll('[data-automation-id="multiselectInputContainer"]')[education_count.major].focus()
            //   document.querySelectorAll('[data-automation-id="multiselectInputContainer"]')[education_count.major].click()
            //   await sleep(1000)
            //   const prompts = document.querySelectorAll('[data-automation-id="promptOption"]')
            //   for (var a = 0; a < prompts.length; a++) {
            //     if (prompts[a].innerText.toLowerCase() === value_to_look_for.toLowerCase()) {
            //       prompts[a].focus()
            //       prompts[a].click()
            //       break
            //     }
            //   }
            //   education_count.major += 1  
            //   break
            case "overall result (gpa)":
              value_to_look_for = autofillData[to_search][education_count.gpa]["gpa"]
              $(input_div).find('input[type=text]').focus()
              $(input_div).find('input[type=text]').val(value_to_look_for).change();
              education_count.gpa += 1
              break
          }
          // if(value_to_look_for != "" && typeof value_to_look_for !== "undefined"){ 
            
          //   //$(input_div).find('input[type=text]').focus()
          // }
      }
    })
  })

  lastknown_title = document.getElementsByClassName("css-1j9bnzb")[0].innerText
  changed = false 
  //this section is for the dropdown 
  $("div[data-automation-id*='formField']").each(function (i, el) {
    var label_name  = el.children[0].innerText.replace("*","");
      label_name = label_name.toLowerCase()
      //this is the second div that contains the input 
      var input_div = el.children[1]    
      var to_search = sitesData["workday"]["selectorMapping"][label_name.toLowerCase()]
      var value_to_look_for = ""
      if(typeof to_search !== "undefined"){ 
          value_to_look_for = autofillData[to_search]
      }
      if( typeof current_page_value_map[label_name] !== "undefined" && current_page_value_map[label_name] != "" ){ 
        value_to_look_for = current_page_value_map[label_name]
      }

      found = -1       
      //if button is present, means we have a dropdown 
      console.log("trying to check", label_name)

      if(typeof input_div !== "undefined" && input_div.querySelectorAll('button').length > 0 && input_div.getElementsByTagName("button")[0].innerText.toLowerCase() != value_to_look_for.toLowerCase()   ){ 
        if(found == -1){ 
          found = 0
        }
        input_div.getElementsByTagName("button")[0].click()
        console.log("looking for ", label_name)
        try{
          z_s = document.querySelectorAll('ul')
          j = 0 
          var z 
          found_z = 0 
          while(j<z_s.length){ 
            if(z_s[j].parentNode.hasAttribute('visibility') &&  z_s[j].getAttribute('role') == "listbox"){ 
              z = z_s[j]
              found_z = 1
            }
            j++
          }
          options = z.getElementsByTagName('li')
          i = 0           
          while(i < options.length){
            //console.log("looking for",options[i].getAttribute('data-value'),options[i].innerText)
            //if can match the option value to the value we are looking for

            if(value_to_look_for != "" && typeof value_to_look_for !== "undefined" && options[i].innerText !== "undefined"  && value_to_look_for.toLowerCase() == options[i].innerText.toLowerCase()){ 
              found = 1
              options[i].click()
              changed = true
              break;
            }        
            //console.log(options[i].getAttribute('data-value'),options[i].innerText)
            i++
          }
        }
        catch(err){ 
          console.log("errorrr*OFOFOFOFOFO",err)
        }
      }
      //close the dropdown 
      if(found == 0){ 
        if(typeof input_div !== "undefined" && input_div.querySelectorAll('button').length  > 0 && input_div.querySelectorAll('button')[0].hasAttribute('aria-expanded')){ 
          console.log("closing", input_div.querySelectorAll('button')[0])
          input_div.getElementsByTagName("button")[0].click()
        }
      }
 

    
  });
  if(changed){ 
    //ensure all drop down info is updated 
    await sleep(2000)
    console.log("sleeping")
  }
   //console.log("called new",$("div[data-automation-id*='formField']") )
  //this section is for the normal text input --> I have done it like this because when you do drop down more fields might be added
  $("div[data-automation-id*='formField']").each(function (i, el) {
    var label_name  = el.children[0].innerText.replace("*","");
    label_name = label_name.toLowerCase()
    //this is the second div that contains the input 
    var input_div = el.children[1]    

    var to_search = sitesData["workday"]["selectorMapping"][label_name.toLowerCase()]
    var value_to_look_for = ""
    // console.log("bel",label_name)
    // if(typeof to_search !== "undefined" ){ 
    //     value_to_look_for = autofillData[to_search]
    //     console.log('test work',label_name)
    //     switch(label_name.toLowerCase() ) {
    //       case "job title":
    //         value_to_look_for = autofillData[to_search][work_exp_count.job_title]["job_title"]
    //         console.log('job title',value_to_look_for)
    //         work_exp_count.job_title += 1  
    //         break
    //       case "company":
    //         value_to_look_for = autofillData[to_search][work_exp_count.company]["company"]
    //         console.log(value_to_look_for)
    //         work_exp_count.company += 1
    //         break
    //     }
    // }


    if(typeof input_div !== "undefined" && input_div.querySelectorAll('input[type=text]').length > 0 && input_div.querySelectorAll('button').length  == 0 ){ 
        if( typeof current_page_value_map[label_name] !== "undefined" && current_page_value_map[label_name]  != "" ){ 
          
          value_to_look_for = current_page_value_map[label_name]
        }
        console.log(label_name,to_search,value_to_look_for)
      
        if(value_to_look_for != "" && typeof value_to_look_for !== "undefined"){ 
          $(input_div).find('input[type=text]').focus()
          $(input_div).find('input[type=text]').val(value_to_look_for).change();
          //$(input_div).find('input[type=text]').focus()
        }
    }
    if(typeof input_div !== "undefined" && input_div.getElementsByTagName('textarea').length > 0 && input_div.querySelectorAll('button').length  == 0 ){ 
      if( typeof current_page_value_map[label_name] !== "undefined"){ 
        
        value_to_look_for = current_page_value_map[label_name]
      }
      console.log(label_name,to_search,value_to_look_for)
    
      if(value_to_look_for != "" && typeof value_to_look_for !== "undefined"){ 
        $(input_div).find('textarea').focus()
        $(input_div).find('textarea').val(value_to_look_for).change();
        //$(input_div).find('input[type=text]').focus()
      }
  }

  

  if(typeof input_div !== "undefined" && input_div.querySelectorAll('input[type=text]').length > 0 ){ 
    if(value_to_look_for != "" && typeof value_to_look_for !== "undefined"){ 
      $(input_div).find('input[type=text]').focus()
      $(input_div).find('input[type=text]').val(value_to_look_for).change();
      $(input_div).find('input[type=text]').focus()
    }
  }   

  });

  

  

  if(changed && save != -1){ 
    //ensure all drop down info is updated 
    fill_workday(-1)
  }
}

