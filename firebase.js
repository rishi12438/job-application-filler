// Your web app's Firebase configuration
var firebaseConfig = {
  /*apiKey: "AIzaSyDaNwOolhOZwe6KV8eVm0Pyf2zZ8p6tc80",
  authDomain: "codue2--extension.firebaseapp.com",
  projectId: "codue2--extension",
  storageBucket: "codue2--extension.appspot.com",
  messagingSenderId: "511659363057",
  appId: "1:511659363057:web:ed8e929b194914c48c7750",
  measurementId: "G-CTC3V1002K"*/ 

    apiKey: "AIzaSyAroP3E8o3JZeh60Q0F_bVCrbN2513QIAM",
    authDomain: "job-app-provider.firebaseapp.com",
    projectId: "job-app-provider",
    storageBucket: "job-app-provider.appspot.com",
    messagingSenderId: "904076826577",
    appId: "1:904076826577:web:ade60aa5f85495f597b2f0",
    measurementId: "G-FCVFC2R2MS"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


console.log(firebase);
console.log("JJjjjfjfjfj")

var db = firebase.firestore();


chrome.runtime.onMessage.addListener((msg, sender, resp) => {


  if(msg.command == "fetch_jobs"){
  console.log("fetch jobs")
   
   var t = []
    db.collection("job_application").get()
    .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        // doc.data() is never undefined for query doc snapshots
        var k = doc.data()
        console.log(doc.id,doc.data())
        t.push(k)
        //resp({type: "result", status: "success", data: doc.data(), request: msg});
        //console.log(doc.id, " => ", doc.data());
    });
    resp({type: "result", status: "success", data: t, request: msg});
  });  
  }

  return true;


})
