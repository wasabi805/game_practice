//Objects
var score =0;
var gscore =0;


var player = {
    x: 50,
    y: 100,
    pacmouth: 320,
    pacdir: 0,  //direction pac faces on X oR y axis : inc of 32X32 for each face swap
    psize: 32,
    speed: 5    //increments move on x OR y axis
};


//Init Canvas
var canvas = document.createElement("canvas"); //same thing as <canvas></canvas>
var context = canvas.getContext("2d");
canvas.height = 400;
canvas.width = 600;
document.body.appendChild(canvas);
// ctx.fillText("Hello World", 10, 150);

//Loading Images
mainImage = new Image();
mainImage.ready = false; //default state
mainImage.onload = checkReady; //will be function that checks the ready state
mainImage.src = "pac.png";

//Define Key mapping obj
var keyclick = {};

// define Event Listener

document.addEventListener('keydown', function(event){
    //the event: callback
    keyclick[event.keyCode] = true;
    console.log(keyclick, 'frm : keydown');

    //call the move func
    move(keyclick)
}, false);

//when you lift up pressing a key, it clears the value of keyclick obj
document.addEventListener('keyup', function(event){
    //the event: callback
    delete keyclick[event.keyCode];

}, false);


function move(keyclick) {

    //left key
    if(37 in keyclick){
        player.x -= player.speed;
        player.pacdir = 64; //which img? they're all 32X32 apart : choose 64 for open mouth
    }

    //up key
    if(38 in keyclick){
        player.y -= player.speed;
        player.pacdir = 96; // the up head
    }

    //right key
    if(39 in keyclick){
        player.x += player.speed;
        player.pacdir = 0;
    }
    //down key
    if(40 in keyclick){
        player.y += player.speed;
        player.pacdir = 32;
    }

    //----- Move pacman based on directional movement -----

    //if you run into the canvas border...
    if(player.x > canvas.width-32){player.x = 0}
    if(player.y > canvas.height-32){player.y = 0}

    //brings pac to the other side of the screen
    if(player.x < 0){player.x = (canvas.width-32)}
    if(player.y < 0){player.y = (canvas.height-32)}

    //----- Animate pacman based on directional movement -----

    //when pac moves either mouth open or mouth close

    if(player.pacmouth == 320){
        player.pacmouth = 352
    }
    else{
        player.pacmouth = 320
    }

    render()
}

function checkReady() {
    this.ready = true;
    playgame();
}

function playgame() {

    score++;
    render();
    console.log(score);
    requestAnimationFrame(playgame) //continuous rendering out of the frame
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

// document.body.appendChild(canvas);




