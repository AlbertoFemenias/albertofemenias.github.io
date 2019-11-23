

var dead=false;
var bsize=30; //bsizeize

//THE GAME IS MORE OR LESS RESIZABLE
//USE POWERS OF 30 FOR CANVAS DIMENSIONS
//ALLOW AT LEAST 10 BLOCKS IN EACH DIRECTION
var gameheight=(gc.height/bsize)-1; //una menos de la que es porque empieza en cero
var gamewidth=(gc.width/bsize)-1; 

var speed=7;
var foodx;
var foody;
var vagony = new Array(7,8,9);
var vagonx = new Array(7,7,7);
var score = vagony.length-3;
var direction="";
var lastmove="up"
var gamestarted=false;


window.onload = ()=> {
        c = document.getElementById('gc');
        cc = c.getContext('2d');
        cc.font = '40px Arial';
        setInterval(update, 1000/speed);
        document.addEventListener('keydown',keyPush);
        generatefood();
    }


//THIS FUNCTIONS PREVENTS SCROLLING THE WEBPAGE WHILE PLAYING WITH THE ARROWKEYS
window.addEventListener("keydown", function(e) {
    // space and arrow keys
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);



function keyPush(evt) {
        switch(evt.keyCode){
            case 37: //left
            if (lastmove!="right"){
                direction="left";
                gamestarted=true;      
            }
            break;

            case 38: //up
            if (lastmove!="down"){
                direction="up";
                gamestarted=true;
            }
            break;

            case 39: //right
            if (lastmove!="left"){
                direction="right";
                gamestarted=true;
            }
            break;

            case 40: //down
            if (lastmove!="up"){
                direction="down";
                gamestarted=true;
            }
            break;
    }
}


function reset(){
     dead=false;
     vagony = new Array(7,8,9);
     vagonx = new Array(7,7,7);
     score = vagony.length-3;
     direction="";
     lastmove="up"
     gamestarted=false;
     c.width = swidth.value * bsize;
     c.height = sheight.value * bsize;
     gameheight=(gc.height/bsize)-1; 
     gamewidth=(gc.width/bsize)-1; 
     generatefood();


    
}


function muevevagones(){
    //save head position before moving
    var lastx=vagonx[0];
    var lasty=vagony[0];

    if (gamestarted & !dead){
        switch (direction) {
            case "right":
            vagonx[0]+=1;
            lastmove = "right";
            break;

            case "left":
            vagonx[0]-=1;
            lastmove = "left";
            break;

            case "down":
            vagony[0]+=1;
            lastmove = "down";
            break;

            case "up":
            vagony[0]-=1;
            lastmove = "up";
            break;
        }

        checkcollision();

        if (dead!=true && direction!=""){
            for (var i = (vagony.length-1); i >= 2; i--) {
                vagony[i]=vagony[i-1];
                vagonx[i]=vagonx[i-1];
            }
            vagony[1]=lasty;
            vagonx[1]=lastx;
        }
    }
}

function checkcollision(){
    if (vagony[0]<0){
        loserwindow();
        vagony[0]=0;
    }
    if (vagony[0]>gameheight){
        loserwindow();
        vagony[0]=gameheight;
    }
    if (vagonx[0]<0){
        loserwindow();
        vagonx[0]=0;
    }
    if (vagonx[0]>gamewidth){
        loserwindow();
        vagonx[0]=gamewidth;
    }
}

function canival(){
    //Check if the head is touching one of its wagons,
    //if it is the case, splice() removes every wagon
    //from the intersection to the tail
    for (var i = 1; i < vagony.length; i++){
        if (vagony[0]==vagony[i] && vagonx[0]==vagonx[i]){
            vagony.splice(i-1,vagony.length-i);
            vagonx.splice(i-1,vagony.length-i);
            break;
        }
    }
}

function pintavagones(){
    cc.fillStyle = 'limegreen';
    cc.fillRect(vagonx[0]*bsize,vagony[0]*bsize,bsize,bsize);
    cc.fillStyle = 'lime';
    for (var i = 1; i < vagony.length; i++){
        cc.fillRect(vagonx[i]*bsize,vagony[i]*bsize,bsize,bsize);
    }
}

function checkfood(){
    if (vagony[0]==foody && vagonx[0]==foodx){
        addvagon();
        generatefood();
    }
}

function addvagon(){
    vagonx[vagony.length]=vagonx[vagony.length-1];
    vagony[vagony.length]=vagony[vagony.length-1];
}

function generatefood(){
    //generate food coordinates until not touching snake
    var valid=false;
    while(!valid){
        foody=Math.floor((Math.random() * (gameheight)) + 1);
        foodx=Math.floor((Math.random() * (gamewidth)) + 1);
        valid=true;
        for (var i = 0; i < vagony.length; i++){
            if (vagony[i]==foody && vagonx[i]==foodx){
                valid=false;
            }
        }
    }
}

function pintafood(){
    cc.fillStyle = 'red';
    cc.fillRect(foodx*bsize,foody*bsize,bsize,bsize);
}

function showAll(){
    pintatablero();
    pintafood();
    pintavagones();
    pintascore();
    pintapantalla();
}


function pintatablero(){
    cc.fillStyle = 'black';
    cc.fillRect(0, 0, c.width, c.height);
}

function pintascore(){
    if (!dead){
        cc.fillStyle = 'white';
        cc.font = '40px Arial';
        cc.fillText("Score: "+String(vagony.length-3), 25, 50);
    }
}

function pintapantalla(){
    if (dead){
        loserwindow();
    }
    if (!gamestarted){
        cc.font = '20px Arial';
        cc.fillStyle = 'white';
        cc.fillText("Welcome to Snake!", gc.width/2-90, gc.height/2 -40);
        cc.fillText("Use the arrow keys ", gc.width/2-90, gc.height/2 );
        cc.fillText("to move your reptile", gc.width/2-90, gc.height/2 + 20);
    }
}



function loserwindow(){

    dead=true;
    cc.fillStyle = 'white';
    cc.font = '40px Impact';
    cc.fillText("GAME OVER", gc.width/2-90, gc.height/2 -40);
    cc.font = '20px Arial';
    cc.fillText("Your score: "+String(vagony.length-3), gc.width/2-55, gc.height/2);
    cc.fillText("Refresh the web or push Reset", gc.width/2-140, gc.height/2 +30);


}



function update() {

    muevevagones();
    checkfood();
    showAll();
    canival();

}

