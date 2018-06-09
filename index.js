// //define the canvas
// var canvas = document.getElementById('canvasSpace');
//
// //sets interaction with the canvas
// var ctx = canvas.getContext("2d");
//
// //Test to see if this js talks to the canvas : param2 = x axis, param1 = y axis
// ctx.fillText("Hello World", 50, 150);


//Refactored

var canvas = document.createElement("canvas"); //same thing as <canvas></canvas>
var ctx = canvas.getContext("2d");

canvas.height = 400;
canvas.width = 600;

document.body.appendChild(canvas); //stick it in the dom

ctx.fillText("Hello World", 50, 150); // this line has to come AFTER canvas.height && width
