var imgURL;
function reddenPage() {
  //var t = document.getElementsByTagName('body')[0].innerHTML; 
  //t = "<style>#mydiv { position: absolute; z-index: 1000; background-color: #f1f1f1; border: 1px solid #d3d3d3; text-align: center; } #mydivheader { padding: 10px; cursor: move; z-index: 1001; background-color: #2196F3; color: #fff; } </style>"+t
  //document.getElementsByTagName('body')[0].innerHTML = t 
  var divs = document.getElementsByClassName("scratchCategoryMenuRow");
  for (var i = 0 ; i < divs.length; i++) {
    x = divs[i]
    try{ 
      //x.classList.remove("scratchCategoryMenuRow") ;
      x.style = "background-color:yellow !important;"
      //x.setAttribute("onclick","clickss()");
      //x.onclick = "clickss(this)"
      x.addEventListener('click', /*function(e) {
        alert("hi")
        this.style = "background-color:white !important;";
        this.removeEventListener('click', this._onClick());
        console.log(this)
      }*/ clickss);

    }
    catch(err){ 

      console.error(err);
    }
  }
  var imgURL = chrome.runtime.getURL("img/"+"0.svg");
  console.log(imgURL)
  //var imgURL = 'chrome-extension://__MSG_@@extension_id__/img/0.svg'
  toggleAnimation("w1",imgURL)
  

function clickss(e) {
  //alert("hi")
  this.style = "background-color:white !important;";
  this.removeEventListener('click',clickss)
}
}

chrome.action.onClicked.addListener((tab) => {
  
  //console.log(imgURL)
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: reddenPage
  });
});


