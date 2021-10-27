// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDh0wIZsEfKfMhb_7YkK3xrgZ-4lr8CEJM",
  authDomain: "slayer-6af47.firebaseapp.com",
  databaseURL: "https://slayer-6af47-default-rtdb.firebaseio.com",
  projectId: "slayer-6af47",
  storageBucket: "slayer-6af47.appspot.com",
  messagingSenderId: "841605166533",
  appId: "1:841605166533:web:c11da59658f7dccf1707ac",
  measurementId: "G-MMQ0LC1RVN"
};
firebase.initializeApp(config);

var database = firebase.database();

database.ref('/').once('value', function(snapshot){
  console.log(snapshot.val());
});

var rootRef = database.ref('/');

rootRef.once('value', function(snapshot){
  console.log(snapshot.val());
});

function pushData(){
  var data = document.getElementById("dataValue").value;
  var dataRef = database.ref('/pushData').push();
  dataRef.set({
    value: data
  });
}

function setData(){
  var data = document.getElementById("dataValue").value;
  var dataRef = database.ref('/setData');
  console.log(data)
  dataRef.set({
    value: data
  });
}

setDataRef = database.ref("/setData");
setDataRef.on('child_changed', function(snapshot) {
  console.log("Below is the data from child_changed");
  console.log(snapshot.val());
});

pushDataRef = database.ref("/pushData");
pushDataRef.on("child_added", function(snapshot){
  console.log("Below is the data from child_added");
  console.log(snapshot.val());
});

database.ref('/pushData').once('value', function(snapshot){
  snapshot.forEach(function(data){
    console.log("Below are the child keys of the values in 'pushData'")
    console.log(data.key);
  });
  console.log(Object.keys(snapshot.val()));
});
