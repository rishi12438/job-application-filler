document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("saveButton").addEventListener("click", function () {
    // chrome.storage.local.set({ ["label_name"]: "hi there" }, function () {
    //   console.log("saving", "hi there");
    // });
    // console.log("Hey there brown cow");

    chrome.storage.local.get(null, function (result) {
      console.log(result);
    });
  });
});
