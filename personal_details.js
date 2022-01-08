document.addEventListener("DOMContentLoaded", function () {
  // on load first time, populate the fields if exists
  chrome.storage.local.get(null, function (result) {
    if (result.firstName != undefined) {
      document.getElementById("firstName").value = result.firstName;
    }
    if (result.lastName != undefined) {
      document.getElementById("lastName").value = result.lastName;
    }
    if (result.fullName != undefined) {
      document.getElementById("fullName").value = result.fullName;
    }
    if (result.email != undefined) {
      document.getElementById("email").value = result.email;
    }
    if (result.phone != undefined) {
      document.getElementById("phoneNumber").value = result.phone;
    }
    if (result.location != undefined) {
      document.getElementById("location").value = result.location;
    }
    if (result.postalCode != undefined) {
      document.getElementById("postalCode").value = result.postalCode;
    }
    if (result.city != undefined) {
      document.getElementById("city").value = result.city;
    }
    if (result.extension != undefined) {
      document.getElementById("extension").value = result.extension;
    }
    if (result.phoneType != undefined) {
      document.getElementById("phoneType").value = result.phoneType;
    }
    if (result.currentCompany != undefined) {
      document.getElementById("currentCompany").value = result.currentCompany;
    }
    if (result.website != undefined) {
      document.getElementById("personalWebsite").value = result.website;
    }
    if (result.linkedin != undefined) {
      document.getElementById("linkedin").value = result.linkedin;
    }
    if (result.github != undefined) {
      document.getElementById("github").value = result.github;
    }
    if (result.twitter != undefined) {
      document.getElementById("twitter").value = result.github;
    }
    if (result.blog != undefined) {
      document.getElementById("blog").value = result.blog;
    }
    if (result.school != undefined) {
      document.getElementById("school").value = result.school;
    }
    if (result.discipline != undefined) {
      document.getElementById("discipline").value = result.discipline;
    }
    if (result.degree != undefined) {
      document.getElementById("degree").value = result.degree;
    }
    if (result.education_start_date_month != undefined) {
      document.getElementById("educationStartMonth").value =
        result.education_start_date_month;
    }
    if (result.education_start_date_year != undefined) {
      document.getElementById("educationStartYear").value =
        result.education_start_date_year;
    }
    if (result.education_end_date_month != undefined) {
      document.getElementById("educationEndMonth").value =
        result.education_end_date_month;
    }
    if (result.education_end_date_year != undefined) {
      document.getElementById("educationEndYear").value =
        result.education_end_date_year;
    }
    if (result.company_name != undefined) {
      document.getElementById("currentCompanyName").value = result.company_name;
    }
    if (result.company_name != undefined) {
      document.getElementById("currentCompanyName").value = result.company_name;
    }
    if (result.employment_title != undefined) {
      document.getElementById("employmentTitle").value =
        result.employment_title;
    }
    if (result.employment_start_date_month != undefined) {
      document.getElementById("employmentStartMonth").value =
        result.employment_start_date_month;
    }
    if (result.employment_start_date_year != undefined) {
      document.getElementById("employmentStartYear").value =
        result.employment_start_date_year;
    }
    if (result.employment_end_date_month != undefined) {
      document.getElementById("employmentEndMonth").value =
        result.employment_end_date_month;
    }
    if (result.employment_end_date_year != undefined) {
      document.getElementById("employmentEndYear").value =
        result.employment_end_date_year;
    }
  });

  document.getElementById("saveButton").addEventListener("click", function () {
    // chrome.storage.local.set({ ["label_name"]: "hi there" }, function () {
    //   console.log("saving", "hi there");
    // });
    // console.log("Hey there brown cow");
    // console.log(document.getElementById("firstName").value);
    // chrome.storage.local.get(null, function (result) {
    //   console.log(result);
    // });

    var firstName = document.getElementById("firstName").value;
    if (firstName != undefined && firstName != null && firstName != "") {
      chrome.storage.local.set({ ["firstName"]: firstName }, function () {
        console.log("saving", firstName);
      });
    }

    var lastName = document.getElementById("lastName").value;
    if (lastName != undefined && lastName != null && lastName != "") {
      chrome.storage.local.set({ ["lastName"]: lastName }, function () {
        console.log("saving", lastName);
      });
    }

    var fullName = document.getElementById("fullName").value;
    if (fullName != undefined && fullName != null && fullName != "") {
      chrome.storage.local.set({ ["fullName"]: fullName }, function () {
        console.log("saving", fullName);
      });
    }

    var email = document.getElementById("email").value;
    if (email != undefined && email != null && email != "") {
      chrome.storage.local.set({ ["email"]: email }, function () {
        console.log("saving", email);
      });
    }

    var phoneNumber = document.getElementById("phoneNumber").value;
    if (phoneNumber != undefined && phoneNumber != null && phoneNumber != "") {
      chrome.storage.local.set({ ["phone"]: phoneNumber }, function () {
        console.log("saving", phoneNumber);
      });
    }

    var location = document.getElementById("location").value;
    if (location != undefined && location != null && location != "") {
      chrome.storage.local.set({ ["location"]: location }, function () {
        console.log("saving", location);
      });
    }

    var postalCode = document.getElementById("postalCode").value;
    if (postalCode != undefined && postalCode != null && postalCode != "") {
      chrome.storage.local.set({ ["postalCode"]: postalCode }, function () {
        console.log("saving", postalCode);
      });
    }

    var city = document.getElementById("city").value;
    if (city != undefined && city != null && city != "") {
      chrome.storage.local.set({ ["city"]: city }, function () {
        console.log("saving", city);
      });
    }

    var extension = document.getElementById("extension").value;
    if (extension != undefined && extension != null && extension != "") {
      chrome.storage.local.set({ ["extension"]: extension }, function () {
        console.log("saving", extension);
      });
    }

    var phoneType = document.getElementById("phoneType").value;
    if (phoneType != undefined && phoneType != null && phoneType != "") {
      chrome.storage.local.set({ ["phoneType"]: phoneType }, function () {
        console.log("saving", phoneType);
      });
    }

    var currentCompany = document.getElementById("currentCompany").value;
    if (
      currentCompany != undefined &&
      currentCompany != null &&
      currentCompany != ""
    ) {
      chrome.storage.local.set(
        { ["currentCompany"]: currentCompany },
        function () {
          console.log("saving", currentCompany);
        }
      );
    }

    var website = document.getElementById("personalWebsite").value;
    if (website != undefined && website != null && website != "") {
      chrome.storage.local.set({ ["website"]: website }, function () {
        console.log("saving", website);
      });
    }

    var linkedin = document.getElementById("linkedin").value;
    if (linkedin != undefined && linkedin != null && linkedin != "") {
      chrome.storage.local.set({ ["linkedin"]: linkedin }, function () {
        console.log("saving", linkedin);
      });
    }

    var github = document.getElementById("github").value;
    if (github != undefined && github != null && github != "") {
      chrome.storage.local.set({ ["github"]: github }, function () {
        console.log("saving", github);
      });
    }

    var twitter = document.getElementById("twitter").value;
    if (twitter != undefined && twitter != null && twitter != "") {
      chrome.storage.local.set({ ["twitter"]: twitter }, function () {
        console.log("saving", twitter);
      });
    }

    var blog = document.getElementById("blog").value;
    if (blog != undefined && blog != null && blog != "") {
      chrome.storage.local.set({ ["blog"]: blog }, function () {
        console.log("saving", blog);
      });
    }

    var school = document.getElementById("school").value;
    if (school != undefined && school != null && school != "") {
      chrome.storage.local.set({ ["school"]: school }, function () {
        console.log("saving", school);
      });
    }

    var discipline = document.getElementById("discipline").value;
    if (discipline != undefined && discipline != null && discipline != "") {
      chrome.storage.local.set({ ["discipline"]: discipline }, function () {
        console.log("saving", discipline);
      });
    }

    var degree = document.getElementById("degree").value;
    if (degree != undefined && degree != null && degree != "") {
      chrome.storage.local.set({ ["degree"]: degree }, function () {
        console.log("saving", degree);
      });
    }

    var education_start_date_month = document.getElementById(
      "educationStartMonth"
    ).value;
    if (
      education_start_date_month != undefined &&
      education_start_date_month != null &&
      education_start_date_month != ""
    ) {
      chrome.storage.local.set(
        { ["education_start_date_month"]: education_start_date_month },
        function () {
          console.log("saving", education_start_date_month);
        }
      );
    }

    var education_start_date_year =
      document.getElementById("educationStartYear").value;
    if (
      education_start_date_year != undefined &&
      education_start_date_year != null &&
      education_start_date_year != ""
    ) {
      chrome.storage.local.set(
        { ["education_start_date_year"]: education_start_date_year },
        function () {
          console.log("saving", education_start_date_year);
        }
      );
    }

    var education_end_date_month =
      document.getElementById("educationEndMonth").value;
    if (
      education_end_date_month != undefined &&
      education_end_date_month != null &&
      education_end_date_month != ""
    ) {
      chrome.storage.local.set(
        { ["education_end_date_month"]: education_end_date_month },
        function () {
          console.log("saving", education_end_date_month);
        }
      );
    }

    var education_end_date_year =
      document.getElementById("educationEndYear").value;
    if (
      education_end_date_year != undefined &&
      education_end_date_year != null &&
      education_end_date_year != ""
    ) {
      chrome.storage.local.set(
        { ["education_end_date_year"]: education_end_date_year },
        function () {
          console.log("saving", education_end_date_year);
        }
      );
    }

    var company_name = document.getElementById("currentCompanyName").value;
    if (
      company_name != undefined &&
      company_name != null &&
      company_name != ""
    ) {
      chrome.storage.local.set({ ["company_name"]: company_name }, function () {
        console.log("saving", company_name);
      });
    }

    var employment_title = document.getElementById("employmentTitle").value;
    if (
      employment_title != undefined &&
      employment_title != null &&
      employment_title != ""
    ) {
      chrome.storage.local.set(
        { ["employment_title"]: employment_title },
        function () {
          console.log("saving", employment_title);
        }
      );
    }

    var employment_start_date_month = document.getElementById(
      "employmentStartMonth"
    ).value;
    if (
      employment_start_date_month != undefined &&
      employment_start_date_month != null &&
      employment_start_date_month != ""
    ) {
      chrome.storage.local.set(
        { ["employment_start_date_month"]: employment_start_date_month },
        function () {
          console.log("saving", employment_start_date_month);
        }
      );
    }

    var employment_start_date_year = document.getElementById(
      "employmentStartYear"
    ).value;
    if (
      employment_start_date_year != undefined &&
      employment_start_date_year != null &&
      employment_start_date_year != ""
    ) {
      chrome.storage.local.set(
        { ["employment_start_date_month"]: employment_start_date_year },
        function () {
          console.log("saving", employment_start_date_year);
        }
      );
    }

    var employment_end_date_month =
      document.getElementById("employmentEndMonth").value;
    if (
      employment_end_date_month != undefined &&
      employment_end_date_month != null &&
      employment_end_date_month != ""
    ) {
      chrome.storage.local.set(
        { ["employment_end_date_month"]: employment_end_date_month },
        function () {
          console.log("saving", employment_end_date_month);
        }
      );
    }

    var employment_end_date_year =
      document.getElementById("employmentEndYear").value;
    if (
      employment_end_date_year != undefined &&
      employment_end_date_year != null &&
      employment_end_date_year != ""
    ) {
      chrome.storage.local.set(
        { ["employment_end_date_year"]: employment_end_date_year },
        function () {
          console.log("saving", employment_end_date_year);
        }
      );
    }
  });
});
