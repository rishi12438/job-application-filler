var current_value = 0

const readLocalStorage = async () => {
  console.log("hello there ")
  return new Promise((resolve, reject) => {
    chrome.storage.local.get(null, function (result) {
      resolve(result)
    });
  });
}; 

current_value_map = {}

function add_new_box(values){ 
  var educationContainer = document.getElementById("education_container");
  var addEducationButton = document.getElementById("addEducationBtn");
  var saveEducationBtn = document.getElementById("saveEducationBtn");
  var educationBox = `<div class="education_box">
    <div class="form-group">
        <label for="jobTitle">Job Title</label>
        <input type="text" class="form-control" id="jobTitle`+ current_value.toString()+`"value="`+ values["job_title"] +`"aria-describedby="emailHelp" placeholder="Enter job title">
    </div>
  
    <div class="form-group">
        <label for="companyName">Company Name</label>
        <input type="text" class="form-control" id="companyName`+ current_value.toString()+ `"value="`+ values["company"] +`"aria-describedby="emailHelp" placeholder="Enter company name">
    </div>
  
    <div class="form-group">
        <label for="jobSummary">Job Summary</label>
        <textarea class="form-control" id="jobSummary`+ current_value.toString()+  `"value="`+ values["summary"] +`"rows="3"></textarea>
    </div>
  
    <div class="form-group">
        <label for="jobSummary">Job Location</label>
        <textarea class="form-control" id="jobLocation`+ current_value.toString()+  `"value="`+ values["location"] +`"rows="3"></textarea>
    </div>
  
    <div class="form-group">
        <label for="workStartDate">Work Start Date</label>
        <input type="text" class="form-control" id="workStartDate`+ current_value.toString()+  `"value="`+ values["start_date"] + `"aria-describedby="emailHelp" placeholder="Enter work start date">
    </div>
  
    <div class="form-group">
        <label for="workEndDate">Work End Date</label>
        <input type="text" class="form-control" id="workEndDate` + current_value.toString()+ `"value="`+ values["end_date"] +`"aria-describedby="emailHelp" placeholder="Enter work end date">
    </div>
  </div>`
  current_value++ 
    console.log("adding button")
    
    educationContainer.insertAdjacentHTML('beforeend', educationBox);
    
}
document.addEventListener("DOMContentLoaded", function () {
  Promise.all([
    readLocalStorage(),
]).then(responses => {
  current_value_map= responses[0]

  i = 0 
  console.log("found",current_value_map)
  try{ 
    while(i < current_value_map["work_experiences"].length){ 
      add_new_box(current_value_map["work_experiences"][i])
      i+=1
    }

  }
  catch(err){}
  
  var educationContainer = document.getElementById("education_container");
  var addEducationButton = document.getElementById("addEducationBtn");
  var saveEducationBtn = document.getElementById("saveEducationBtn");
 
  addEducationButton.addEventListener("click", function () {
        
    var educationBox = `<div class="education_box">
    <div class="form-group">
        <label for="jobTitle">Job Title</label>
        <input type="text" class="form-control" id="jobTitle`+ current_value.toString()+`"aria-describedby="emailHelp" placeholder="Enter job title">
    </div>
  
    <div class="form-group">
        <label for="companyName">Company Name</label>
        <input type="text" class="form-control" id="companyName`+ current_value.toString()+ `"aria-describedby="emailHelp" placeholder="Enter company name">
    </div>
  
    <div class="form-group">
        <label for="jobSummary">Job Summary</label>
        <textarea class="form-control" id="jobSummary`+ current_value.toString()+`"rows="3"></textarea>
    </div>
  
    <div class="form-group">
        <label for="jobSummary">Job Location</label>
        <textarea class="form-control" id="jobLocation`+ current_value.toString()+ `"rows="3"></textarea>
    </div>
  
    <div class="form-group">
        <label for="workStartDate">Work Start Date</label>
        <input type="text" class="form-control" id="workStartDate`+ current_value.toString()+ `"aria-describedby="emailHelp" placeholder="Enter work start date">
    </div>
  
    <div class="form-group">
        <label for="workEndDate">Work End Date</label>
        <input type="text" class="form-control" id="workEndDate` + current_value.toString()+`"aria-describedby="emailHelp" placeholder="Enter work end date">
    </div>
  </div>`
  current_value++ 
    console.log("adding button")
    
    educationContainer.insertAdjacentHTML('beforeend', educationBox);
    
  });

  saveEducationBtn.addEventListener("click", function () {
    classes = document.getElementsByClassName("education_box")
    i = 0 
    education_exp = []
    while(i<classes.length){ 
      
      education_exp.push({})
      i++
    }
    i = 0 
    while(i<classes.length){ 
      education_exp[i]["job_title"] = document.getElementById("jobTitle"+i.toString()).value
      education_exp[i]["company"] =   document.getElementById("companyName"+i.toString()).value
      education_exp[i]["location"] = document.getElementById("jobLocation"+i.toString()).value
      education_exp[i]["summary"] = document.getElementById("jobSummary"+i.toString()).value
      education_exp[i]["start_date"] = document.getElementById("workStartDate"+i.toString()).value
      education_exp[i]["end_date"] =     document.getElementById("workEndDate"+i.toString()).value
      i++
    }
   
    chrome.storage.local.set({["work_experiences"] :  education_exp }, function () {
      console.log("saving","work experience",education_exp)
    });
  });

})



  console.log("hi there");
});
