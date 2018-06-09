
//Init Canvas
var canvas = document.createElement("canvas"); //same thing as <canvas></canvas>
var context = canvas.getContext("2d");
canvas.height = 400;
canvas.width = 600;

//Loading Images
mainImage = new Image();
mainImage.ready = false; //default state
mainImage.onLoad = checkReady; //will be function that checks the ready state
mainImage.src = "pac.png";

//define
function checkReady() {

    this.ready = true;
    playgame();

}


function playGame() {

    render();
}



function render() {
    //make the bg black
    context.fillStyle = 'blue';

    //takes in (x,y,w,h)
    context.fillRect(0,0, canvas.width, canvas.height);
}






document.body.appendChild(canvas); //stick it in the dom

context.fillText("Hello World", 50, 150); // this line has to come AFTER canvas.height && width


