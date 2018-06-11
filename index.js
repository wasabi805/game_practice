//Objects
var score =0;
var gscore =0;
var ghost = false; //init state: check if ghosts on screen exists


var player = {
    x: 50,
    y: 100,
    pacmouth: 320,
    pacdir: 0,  //direction pac faces on X oR y axis : inc of 32X32 for each face swap
    psize: 32,
    speed: 10    //increments move on x OR y axis
};

var enemy = {
    x: 150,
    y: 200,
    speed: 5,
    moving: 0, // countdown: how many seconds ghost moves in the same dir
    dirx: 0,
    diry: 0
};

var powerdot = {
    x: 10,
    y: 10,
    powerup : false, //means that not there or pacman ate it
    pcountdown : 0,
    ghostNum : 0
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

    //-----     Keep The Ghosts on the screen   -----
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
    render();
    requestAnimationFrame(playgame) //continuous rendering out of the frame: refreshes
}

function randomNum(num) {

    return Math.floor(Math.random()*num)
}


function render() {

    //bg
    context.fillStyle = 'blue';
    context.fillRect(0,0, canvas.width, canvas.height);

    //check if powerup exists, spawn it
    if(!powerdot.powerup){
        powerdot.x = randomNum(420)+30; //+30 offset the top
        powerdot.y = randomNum(250);
        powerdot.powerup = true; //create it
    }


    //-----         ENEMY Characteristics       -----
    //ghost check
    if(!ghost){
        enemy.ghostNum = randomNum(5) * 64;  //enemy.ghostNum = select which color ghost

        //where to render ghost
        enemy.x = randomNum(450);
        enemy.y = randomNum(250) + 30; //+30 prevents ghost from rendering too close to the top
    }

    ghost = true;

    //keep in mind since this is in the render(){}, the enemy will move quicker
    if(enemy.moving<0){
        enemy.moving = (randomNum(20)*3) +randomNum(1);
        enemy.speed = (randomNum(3)+1); //vary the speed when ghost change dir
        enemy.dirx = 0;
        enemy.diry = 0;

        //if remainder, move left or right
        if(enemy.moving % 2){

            if(player.x < enemy.x){
                enemy.dirx = -enemy.speed; //determine speed of enemy based pacman pos
            }else{
                enemy.dirx = enemy.speed
            }

            //if NO remainder, move up or down
        }else{
            if(player.y < enemy.y){
                enemy.diry = -enemy.speed; //determine speed of enemy based pacman pos
            }else{
                enemy.diry = enemy.speed
            }
        }
    }


    //----- /////   -----   /////   -----   /////


    //-----     Keep The Ghosts on the screen   -----
    //if you run into the canvas border...
    if(enemy.x > enemy.width-32){enemy.x = 0}
    if(enemy.y > enemy.height-32){enemy.y = 0}

    //brings pac to the other side of the screen
    if(enemy.x < 0){enemy.x = (canvas.width-32)}
    if(enemy.y < 0){enemy.y = (canvas.height-32)}


    //-----     Collision Detection     -----

    //if player cords are in same cord of the powerdot
    if(player.x <= (
        powerdot.x) &&
        powerdot.x <= (player.x+32) && //center of the dot
        player.y <= (powerdot.y) &&
        powerdot.y <= (player.y +32)
    ){
        console.log('Ate the dot');
        powerdot.powerup = false; //remove the dot once pacman eats it
        powerdot.pcountdown = 500; //start the eat ghost timer
        powerdot.ghostNum =enemy.ghostNum; // used to switch ghost colors back to OG color once powerup countdown expires
        enemy.ghostNum = 384 ;//384 is the blue ghost
        powerdot.x =0;
        powerdot.y = 0;

    }

    //POWERUP
    //----- When powerup exists, how to spawn it : THIS WILL SHOW HOW TO DRAW IT
    if(powerdot.powerup){
        context.fillStyle = "#ffffff";

        //https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D
        //-----Draw Circle-----
        context.beginPath();
        context.arc(powerdot.x, powerdot.y, 10,0, Math.PI * 2, true);
        context.closePath();
        context.fill();
        //-----         -------
    }


    //used for score
    context.font = "20px Verdana";
    context.fillStyle = "white";
    context.fillText("Pacman: " + score + " vs Ghost: " + gscore, 2,18 );  //last two params : where to display score

    //Puts ghost on the creen
    context.drawImage(

        mainImage,                  //  obj created from ln 9
        enemy.ghostNum,  0,         //  pick the red ghost //  moves viewport || select mouth img, //  origin loc of xy || which coordinates do you want to place the "viewport"
        32, 32,                     //  from origin, specify width&height || defines "viewport" x&y
        enemy.x, enemy.y,           //  destination loc of xy cord || now that "viewport" && image defined, where (X&Y cords) do you want to put it?
        32, 32                      //  defines the size of it
    );

    //Puts PacMan on screen
    context.drawImage(

        mainImage,                  //  obj created from ln 9
        player.pacmouth,            //  moves viewport || select mouth img
        player.pacdir,              //  origin loc of xy || which coordinates do you want to place the "viewport"
        32, 32,                     //  from origin, specify width&height || defines "viewport" x&y
        player.x, player.y,         //  destination loc of xy cord || now that "viewport" && image defined, where (X&Y cords) do you want to put it?
        32, 32                      //  defines the size of it
    );

    //decrement the movement for further randomization of movement
    enemy.moving--;


    //define the movement increments
    enemy.x = enemy.x + enemy.dirx;
    enemy.y = enemy.y + enemy.diry;
    
}

// document.body.appendChild(canvas);




