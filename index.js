
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


//Objects
var score =0;
var gscore =0;

var player = {
    //init state
    x: 50,
    y: 100,
    pacmouth: 320,
    pacdir: 0,
    psize: 32
};


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

        mainImage,                  //  obj created from ln 9
        player.pacmouth,            //  moves viewport || select mouth img
        player.pacdir,              //  origin loc of xy || which coordinates do you want to place the "viewport"
        32, 32,                     //  from origin, specify width&height || defines "viewport" x&y
        player.x, player.y,         //  destination loc of xy cord || now that "viewport" && image defined, where (X&Y cords) do you want to put it?
        32, 32                      //  defines the size of it
    );

    //used for score
    context.font = "20px Verdana";
    context.fillStyle = "white";
    context.fillText("Pacman: " + score + " vs Ghost: " + gscore, 2,18 ); //last two params : where to display score

}

render();


document.body.appendChild(canvas); //stick it in the dom




