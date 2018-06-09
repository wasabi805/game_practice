
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

    //bg
    context.fillStyle = 'blue';
    context.fillRect(0,0, canvas.width, canvas.height);

    //Puts img on screen
    context.drawImage(

        mainImage,  // obj created from ln 9
        320, 0,     // origin loc of xy || which coordinates do you want to place the "viewport"
        32, 32,     // from origin, specify width&height || defines "viewport" x&y
        50, 50,     // destination loc of xy cord || now that "viewport" && image defined, where (X&Y cords) do you want to put it?
        32, 32      // defines the size of it
    )
}

render();


document.body.appendChild(canvas); //stick it in the dom




