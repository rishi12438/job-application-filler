var current_value = 0;

const readLocalStorage = async () => {
  console.log("hello there ");
  return new Promise((resolve, reject) => {
    chrome.storage.local.get(null, function (result) {
      resolve(result);
    });
  });
};

current_value_map = {};

function collapse(v) {
  console.log("collapse called", v);
  document.getElementById("summary_" + v.toString()).style = "display:block";
  document.getElementById("title" + v.toString()).innerText =
    document.getElementById("jobTitle" + v.toString()).value;
  document.getElementById("education_box" + v.toString()).style =
    "display:none";
}

function add_new_box(values) {
  var educationContainer = document.getElementById("education_container");
  var addEducationButton = document.getElementById("addEducationBtn");
  var saveEducationBtn = document.getElementById("saveEducationBtn");
  var educationBox =
    `<div class = "overall_box">` +
    `<a class="btn btn-primary" id="collapse` +
    current_value.toString() +
    `"
   data-toggle="collapse" style="margin-left: 20px; margin-top: 10px; margin-top: 10px; width: 250px;" href="#collapseExample0" role="button" aria-expanded="true" aria-controls="collapseExample0">Toggle this</a>` +
    `<div class="show" id="object` +
    current_value.toString() +
    `">
  <div class="education_box" id= "education_box` +
    current_value.toString() +
    `">
<div class="form-group">
  <label for="jobTitle">Job Title</label>
  <input type="text" class="form-control" id="jobTitle` +
    current_value.toString() +
    `"aria-describedby="emailHelp" placeholder="Enter job title">
</div>

<div class="form-group">
  <label for="companyName">Company Name</label>
  <input type="text" class="form-control" id="companyName` +
    current_value.toString() +
    `"aria-describedby="emailHelp" placeholder="Enter company name">
</div>

<div class="form-group">
  <label for="jobSummary">Job Summary</label>
  <textarea class="form-control" id="jobSummary` +
    current_value.toString() +
    `"rows="3"></textarea>
</div>

<div class="form-group">
  <label for="jobSummary">Job Location</label>
  <textarea class="form-control" id="jobLocation` +
    current_value.toString() +
    `"rows="3"></textarea>
</div>

<div class="form-group">
  <label for="workStartDate">Work Start Date</label>
  <input type="text" class="form-control" id="workStartDate` +
    current_value.toString() +
    `"aria-describedby="emailHelp" placeholder="Enter work start date">
</div>

<div class="form-group">
  <label for="workEndDate">Work End Date</label>
  <input type="text" class="form-control" id="workEndDate` +
    current_value.toString() +
    `"aria-describedby="emailHelp" placeholder="Enter work end date">
</div>
</div>
</div></div>`;

  // var educationBox =
  //   `<div class = "overall_box"><button id="collapse` +
  //   current_value.toString() +
  //   `"value ="` +
  //   current_value.toString() +
  //   `">Collapse </button>` +
  //   +`<a class="btn btn-primary" data-bs-toggle="collapse" href="#education_box"` +
  //   current_value.toString() +
  //   `role="button" aria-expanded="false" aria-controls="education_box"` +
  //   current_value.toString() +
  //   `>` +
  //   `Collapse </a>` +
  //   `<div class = "form-group" id= "summary_` +
  //   current_value.toString() +
  //   `" style="display:none;" ><h2 id="title` +
  //   current_value.toString() +
  //   `"></h2></div><div class="education_box" id= "education_box` +
  //   current_value.toString() +
  //   `">
  //   <div class="form-group">
  //       <label for="jobTitle">Job Title</label>
  //       <input type="text" class="form-control" id="jobTitle` +
  //   current_value.toString() +
  //   `"value="` +
  //   values["job_title"] +
  //   `"aria-describedby="emailHelp" placeholder="Enter job title">
  //   </div>

  //   <div class="form-group">
  //       <label for="companyName">Company Name</label>
  //       <input type="text" class="form-control" id="companyName` +
  //   current_value.toString() +
  //   `"value="` +
  //   values["company"] +
  //   `"aria-describedby="emailHelp" placeholder="Enter company name">
  //   </div>

  //   <div class="form-group">
  //       <label for="jobSummary">Job Summary</label>
  //       <textarea class="form-control" id="jobSummary` +
  //   current_value.toString() +
  //   `"value="` +
  //   values["summary"] +
  //   `"rows="3">` +
  //   values["summary"] +
  //   `</textarea>
  //   </div>

  //   <div class="form-group">
  //       <label for="jobSummary">Job Location</label>
  //       <textarea class="form-control" id="jobLocation` +
  //   current_value.toString() +
  //   `"value="` +
  //   values["location"] +
  //   `"rows="3">` +
  //   values["location"] +
  //   `</textarea>
  //   </div>

  //   <div class="form-group">
  //       <label for="workStartDate">Work Start Date</label>
  //       <input type="text" class="form-control" id="workStartDate` +
  //   current_value.toString() +
  //   `"value="` +
  //   values["start_date"] +
  //   `"aria-describedby="emailHelp" placeholder="Enter work start date">
  //   </div>

  //   <div class="form-group">
  //       <label for="workEndDate">Work End Date</label>
  //       <input type="text" class="form-control" id="workEndDate` +
  //   current_value.toString() +
  //   `"value="` +
  //   values["end_date"] +
  //   `"aria-describedby="emailHelp" placeholder="Enter work end date">
  //   </div>
  // </div>`;
  current_value++;
  console.log("adding button");

  educationContainer.insertAdjacentHTML("beforeend", educationBox);
}
document.addEventListener("DOMContentLoaded", function () {
  dragula([document.querySelector("#education_container")]);
  Promise.all([readLocalStorage()]).then((responses) => {
    current_value_map = responses[0];
    document.body.addEventListener("click", function (event) {
      if (event.target.id.indexOf("collapse") != -1) {
        console.log("hellofromjrj");
        console.log("evendnsjkcnds ", event.target.id);
        var index = event.target.id.toString().replace("collapse", "");
        var classlist = document.getElementById("object" + index).classList;
        var jobTitle = document.getElementById("jobTitle" + index).value;
        if (jobTitle != null && jobTitle != undefined && jobTitle != "") {
          document.getElementById("collapse" + index).innerText = jobTitle;
        }

        if (classlist.contains("show")) {
          classlist.remove("show");
          document.getElementById("object" + index).classList.add("collapse");
        } else if (classlist.contains("collapse")) {
          classlist.remove("collapse");
          document.getElementById("object" + index).classList.add("show");
        }
      }
    });

    i = 0;
    console.log("found", current_value_map);
    try {
      while (i < current_value_map["work_experiences"].length) {
        add_new_box(current_value_map["work_experiences"][i]);
        i += 1;
      }
    } catch (err) {}

    var educationContainer = document.getElementById("education_container");
    var addEducationButton = document.getElementById("addEducationBtn");
    var saveEducationBtn = document.getElementById("saveEducationBtn");

    addEducationButton.addEventListener("click", function () {
      var educationBox =
        `<div class = "overall_box">` +
        `<a class="btn btn-primary" id="collapse` +
        current_value.toString() +
        `"
         data-toggle="collapse" style="margin-left: 20px; margin-top: 10px; margin-top: 10px; width: 250px;" href="#collapseExample0" role="button" aria-expanded="true" aria-controls="collapseExample0">Toggle this</a>` +
        `<div class="show" id="object` +
        current_value.toString() +
        `">
        <div class="education_box" id= "education_box` +
        current_value.toString() +
        `">
    <div class="form-group">
        <label for="jobTitle">Job Title</label>
        <input type="text" class="form-control" id="jobTitle` +
        current_value.toString() +
        `"aria-describedby="emailHelp" placeholder="Enter job title">
    </div>
  
    <div class="form-group">
        <label for="companyName">Company Name</label>
        <input type="text" class="form-control" id="companyName` +
        current_value.toString() +
        `"aria-describedby="emailHelp" placeholder="Enter company name">
    </div>
  
    <div class="form-group">
        <label for="jobSummary">Job Summary</label>
        <textarea class="form-control" id="jobSummary` +
        current_value.toString() +
        `"rows="3"></textarea>
    </div>
  
    <div class="form-group">
        <label for="jobSummary">Job Location</label>
        <textarea class="form-control" id="jobLocation` +
        current_value.toString() +
        `"rows="3"></textarea>
    </div>
  
    <div class="form-group">
        <label for="workStartDate">Work Start Date</label>
        <input type="text" class="form-control" id="workStartDate` +
        current_value.toString() +
        `"aria-describedby="emailHelp" placeholder="Enter work start date">
    </div>
  
    <div class="form-group">
        <label for="workEndDate">Work End Date</label>
        <input type="text" class="form-control" id="workEndDate` +
        current_value.toString() +
        `"aria-describedby="emailHelp" placeholder="Enter work end date">
    </div>
  </div>
  </div></div>`;

      console.log("adding button");

      educationContainer.insertAdjacentHTML("beforeend", educationBox);
      // $("#collapse"+current_value.toString()).click(function(){
      //   console.log("hello in ",document.getElementById("collapse"+current_value.toString()).value )
      //   collapse(document.getElementById("collapse"+current_value.toString()).value)
      // })
      current_value++;
    });

    saveEducationBtn.addEventListener("click", function () {
      classes = document.getElementsByClassName("education_box");
      i = 0;
      education_exp = [];
      while (i < classes.length) {
        education_exp.push({});
        i++;
      }
      i = 0;
      while (i < classes.length) {
        education_exp[i]["job_title"] = document.getElementById(
          "jobTitle" + i.toString()
        ).value;
        education_exp[i]["company"] = document.getElementById(
          "companyName" + i.toString()
        ).value;
        education_exp[i]["location"] = document.getElementById(
          "jobLocation" + i.toString()
        ).value;
        education_exp[i]["summary"] = document.getElementById(
          "jobSummary" + i.toString()
        ).value;
        education_exp[i]["start_date"] = document.getElementById(
          "workStartDate" + i.toString()
        ).value;
        education_exp[i]["end_date"] = document.getElementById(
          "workEndDate" + i.toString()
        ).value;
        i++;
      }

      chrome.storage.local.set(
        { ["work_experiences"]: education_exp },
        function () {
          console.log("saving", "work experience", education_exp);
        }
      );
    });
  });

  console.log("hi there");
});
