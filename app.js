//Get current domain

chrome.runtime.sendMessage({command: "fetch_jobs"}, (response) => {
  showData(response.data);
});

/*chrome.runtime.sendMessage({command: "post", data:"Test Data"}, (response) => {
  showData(response.data);
});*/
var t = []
var showData = function(data) {
  console.log(data)
}
// //"matches": ["https://*.greenhouse.io/","https://*.myworkdayjobs.com/","https://*.taleo.net/","https://*.shopee.sg/"],
$('#containers .frame .popup, #containers .frame .object ').droppable({
  activeClass: "ui-state-default",
  hoverClass: "ui-state-hover",
  accept: '.object',
  cursor: 'move',
   greedy: true ,
  drop: function (event, ui) {
    
    //console.log($(ui.draggable))
     //$(ui.draggable).addClass("insidePopup");
     // ui.draggable.detach().appendTo($(this));
  }
});
$('#containers .frame .popup').sortable();
$('#containers .frame').droppable({
  activeClass: "ui-state-default",
  hoverClass: "ui-state-hover",
  accept: '.insidePopup',
  greedy: true ,
  drop: function (event, ui) {
      //ui.draggable.detach().appendTo($(this));
      //$(ui.draggable).removeClass("insidePopup");
  }
});
$('#containers .frame .object').draggable({
  helper: 'clone',
  containment: "document"
});