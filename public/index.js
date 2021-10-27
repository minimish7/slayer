var mainText = document.getElementById("mainText");
var readFire = document.getElementById("readFire");

var email = "it2901a@gmail.com";
var password = "ViErBest";
var signedIn = false;
var userId;

//Read from Firebase
function read(){

    var firebaseRef = firebase.database().ref('/temperature');
    firebaseRef.once('value').then((datasnapshot) => {
    readFire.innerText = 'The temperature is ' + datasnapshot.val() + ' degrees';
  })
}

//Write to Firebase
function submit(){
  if (true) {
      var messageText = mainText.value;
      var firebaseRef = firebase.database().ref();
      firebaseRef.set({temperature:messageText}).then(successfull, failed);
    }
}

//Actions for the .set() promise successfull or failed
function successfull(){
  snackbar('Data saved')
}

function failed(){
  snackbar('Error, data not saved')
}

function snackbar(text) {
  var snackbarContainer = document.querySelector('#demo-toast-example');
  var data = {message: text};
  snackbarContainer.MaterialSnackbar.showSnackbar(data);
  }