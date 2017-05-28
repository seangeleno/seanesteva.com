function asciitobinary() {
  var input=document.getElementById("ti1").value;
  var  output=document.getElementById("ti1");
    output.value = "";
    for (i=0; i < input.length; i++) {
     	//output.value +=input[i].charCodeAt(0).toString(2) + " ";
     	output.value +=input[i].charCodeAt(0).toString(2);
    }
    var container = document.querySelector('.container');
    container.insert
}
function asciitooctal() {
  var input=document.getElementById("ti4").value;
  var  output=document.getElementById("ti4");
    output.value = "";
    for (i=0; i < input.length; i++) {
     	output.value +=input[i].charCodeAt(0).toString(8) + " ";
    }
    var container = document.querySelector('.container');
    container.insert
}

// hex = 16
function asciitoascii() {
  var input=document.getElementById("ti3").value;
  var  output=document.getElementById("ti3");
    output.value = "";
    for (i=0; i < input.length; i++) {
     	output.value +=input[i].charCodeAt(0).toString(16) + " ";
     	//output.value +=input[i].charCodeAt(0).toString(16);
    }
    var container = document.querySelector('.container');
    container.insert
}

// hex = 16
function asciitohex() {
  var input=document.getElementById("ti2").value;
  var  output=document.getElementById("ti2");
    output.value = "";
    for (i=0; i < input.length; i++) {
     	output.value +=input[i].charCodeAt(0).toString() + " ";
     	//output.value +=input[i].charCodeAt(0).toString(16);
    }
    var container = document.querySelector('.container');
    container.insert
}

// function binarytoascii() {
//   var input=document.getElementById("ti2").value;
//   var  output=document.getElementById("ti1");
//     output.value = "";
//     for (i=0; i < input.length; i++) {
//      	output.value += input[i].fromCharCode([i]);
//     }
// }
