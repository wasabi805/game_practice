//define the canvas
var canvas = document.getElementById('canvasSpace');

//sets interaction with the canvas
var ctx = canvas.getContext("2d");

//Test to see if this js talks to the canvas : param2 = x axis, param1 = y axis
ctx.fillText("Hello World", 50, 150);