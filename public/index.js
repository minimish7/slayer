var mainText = document.getElementById("mainText");
var readFire = document.getElementById("readFire");

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

//auto-typing
var Typer={
	text: null,
	accessCountimer:null,
	index:0, 
	speed:2,
	file:"", 
	accessCount:0,
	deniedCount:0, 
	init: function(){
		accessCountimer=setInterval(function(){Typer.updLstChr();},500); 
		$.get(Typer.file,function(data){
			Typer.text=data;
			Typer.text = Typer.text.slice(0, Typer.text.length-1);
		});
	},
 
	content:function(){
		return $("#console").html();
	},
 
	write:function(str){
		$("#console").append(str);
		return false;
	},
 
	addText:function(key){
		
		if(key.keyCode==18){
			Typer.accessCount++; 
			
			if(Typer.accessCount>=3){
				Typer.makeAccess(); 
			}
		}
		
    		else if(key.keyCode==20){
			Typer.deniedCount++; 
			
			if(Typer.deniedCount>=3){
				Typer.makeDenied(); 
			}
		}
		
    		else if(key.keyCode==27){ 
			Typer.hidepop(); 
		}
		
    		else if(Typer.text){ 
			var cont=Typer.content(); 
			if(cont.substring(cont.length-1,cont.length)=="|") 
				$("#console").html($("#console").html().substring(0,cont.length-1)); 
			if(key.keyCode!=8){ 
				Typer.index+=Typer.speed;	
			}
      		else {
			if(Typer.index>0) 
				Typer.index-=Typer.speed;
			}
			var text=Typer.text.substring(0,Typer.index)
			var rtn= new RegExp("\n", "g"); 
	
			$("#console").html(text.replace(rtn,"<br/>"));
			window.scrollBy(0,50); 
		}
		
		if (key.preventDefault && key.keyCode != 122) { 
			key.preventDefault()
		};  
		
		if(key.keyCode != 122){ // otherway prevent keys default behavior
			key.returnValue = false;
		}
	},
 
	updLstChr:function(){ 
		var cont=this.content(); 
		
		if(cont.substring(cont.length-1,cont.length)=="|") 
			$("#console").html($("#console").html().substring(0,cont.length-1)); 
		
		else
			this.write("|"); // else write it
	}
}

function replaceUrls(text) {
	var http = text.indexOf("http://");
	var space = text.indexOf(".me ", http);
	
	if (space != -1) { 
		var url = text.slice(http, space-1);
		return text.replace(url, "<a href=\""  + url + "\">" + url + "</a>");
	} 
	
	else {
		return text
	}
}

Typer.speed=1;
Typer.file="fakename.txt"; // add your own name here
Typer.init();
 
var timer = setInterval("t();", 30);
function t() {
	Typer.addText({"keyCode": 123748});
	
	if (Typer.index > Typer.text.length) {
		clearInterval(timer);
	}
}
