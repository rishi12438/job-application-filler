document.addEventListener("DOMContentLoaded", function () {
  var educationContainer = document.getElementById("education_container");
  var addEducationButton = document.getElementById("addEducationBtn");
  var educationBox = `<div class="education_box">
  <div class="form-group">
      <label for="jobTitle">Job Title</label>
      <input type="text" class="form-control" id="jobTitle" aria-describedby="emailHelp" placeholder="Enter job title">
  </div>

  <div class="form-group">
      <label for="companyName">Company Name</label>
      <input type="text" class="form-control" id="companyName" aria-describedby="emailHelp" placeholder="Enter company name">
  </div>

  <div class="form-group">
      <label for="jobSummary">Job Summary</label>
      <textarea class="form-control" id="jobSummary" rows="3"></textarea>
  </div>

  <div class="form-group">
      <label for="workStartDate">Work Start Date</label>
      <input type="text" class="form-control" id="workStartDate" aria-describedby="emailHelp" placeholder="Enter work start date">
  </div>

  <div class="form-group">
      <label for="workEndDate">Work End Date</label>
      <input type="text" class="form-control" id="workEndDate" aria-describedby="emailHelp" placeholder="Enter work end date">
  </div>
</div>`;

  addEducationButton.addEventListener("click", function () {
    educationContainer.innerHTML += educationBox;
  });

  console.log("hi there");
});
