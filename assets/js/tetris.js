

/////////////

var Tune = new Audio("/assets/sounds/tetris.mp3");
var LineSound = new Audio("/assets/sounds/line.wav");
var selectionSound = new Audio("/assets/sounds/selection.wav");
var gameOverSound = new Audio("/assets/sounds/gameOver.wav");
Tune.loop = true;

keyLeft = false;
keyRight =  false;
keyUp = false;
keySpace = false;
keyDwn = false;

//  L=1 'orange' 'darkorange'
//  J=2 'dodgerblue' 'royalblue'
//  T=3  'darkorchid'
//  5=4   'limegreen'
//  2=5   'crimson'
//  |=6    'skyblue'
//  #=7    'gold'

var colors = ['black', 'darkorange', 'dodgerblue', 'darkorchid', 'limegreen', 'crimson', 'deepskyblue', 'gold', 'khaki'];
var Lines = 0;
var GameOver = false;

var board = [
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0]
];


window.onload = ()=> {
    c = document.getElementById('gc');
    cc = c.getContext('2d');
    cc.font = '40px Arial';
    setInterval(update, 0);
    document.addEventListener('keydown',keyDown);
    document.addEventListener('keyup',keyBack);

}

 
 

function keyBack(evt) {
    switch(evt.keyCode){
      case 32: //space
      keySpace = false;
      break;

      case 37: //left
      keyLeft = false;
      break;
      
      case 38: //up
      keyUp = false;
      break;

      case 39: //right
      keyRight = false;
      break;

      case 40: //down
      keyDwn = false;
      break;

  }
}

function keyDown(evt) {
    Tune.play();
    switch(evt.keyCode){
      case 32: //space
      keySpace = true;
      break;

      case 37: //left
      keyLeft = true;
      break;

      case 38: //up
      keyUp = true;
      break;

      case 39: //right
      keyRight = true;
      break;

      case 40: //down
      keyDwn = true;
      break;

  }
}



var shape1 = [
    [
        [0,0,0,],
        [1,1,1,],
        [1,0,0,]
    ],
    [
        [1,1,0,],
        [0,1,0,],
        [0,1,0,]
    ],
    [
        [0,0,1,],
        [1,1,1,],
        [0,0,0,]
    ],
    [
        [0,1,0,],
        [0,1,0,],
        [0,1,1,]
    ]
];

var shape2 = [
    [
        [0,0,0,],
        [1,1,1,],
        [0,0,1,]
    ],
    [
        [0,1,0,],
        [0,1,0,],
        [1,1,0,]
    ],
    [
        [1,0,0,],
        [1,1,1,],
        [0,0,0,]
    ],
    [
        [0,1,1,],
        [0,1,0,],
        [0,1,0,]
    ]
];

var shape3 = [
    [
        [0,0,0,],
        [1,1,1,],
        [0,1,0,]
    ],
    [
        [0,1,0,],
        [1,1,0,],
        [0,1,0,]
    ],
    [
        [0,1,0,],
        [1,1,1,],
        [0,0,0,]
    ],
    [
        [0,1,0,],
        [0,1,1,],
        [0,1,0,]
    ]
];

var shape4 = [
    [
        [0,0,0,],
        [0,1,1,],
        [1,1,0,]
    ],
    [
        [1,0,0,],
        [1,1,0,],
        [0,1,0,]
    ]
];

var shape5 = [
    [
        [0,0,0,],
        [1,1,0,],
        [0,1,1,]
    ],
    [
        [0,1,0,],
        [1,1,0,],
        [1,0,0,]
    ]
];

var shape6 = [
    [
        [0,1,0,0],
        [0,1,0,0],
        [0,1,0,0],
        [0,1,0,0]
    ],
    [
        [0,0,0,0],
        [0,0,0,0],
        [1,1,1,1],
        [0,0,0,0]
    ]
];

var shape7 = [
    [
        [1,1],
        [1,1]
    ]
];

class Piece {
  constructor(number, color, shape, nstates, dimension, centerX, centerY) {
        this.number = number;
        this.color = color;
        this.centerX = centerX;
        this.centerY = centerY;
        this.shape = shape;
        this.nstates = nstates;
        this.dimension = dimension;
    }
}

let Pieces = []
Pieces.push(new Piece(0, colors[7], shape7, 1, 1, 1, 1));
Pieces.push(new Piece(1, colors[1], shape1, 4, 3, 1, 1));
Pieces.push(new Piece(2, colors[2], shape2, 4, 3, 1, 1));
Pieces.push(new Piece(3, colors[3], shape3, 4, 3, 1, 1));
Pieces.push(new Piece(4, colors[4], shape4, 2, 3, 1, 1));
Pieces.push(new Piece(5, colors[5], shape5, 2, 3, 1, 1));
Pieces.push(new Piece(6, colors[6], shape6, 2, 4, 1, 2));
Pieces.push(new Piece(7, colors[7], shape7, 1, 2, 0, 0));



var playable = {
    piece: Pieces[Math.floor((Math.random() * 7) + 1)],
    nextPiece: [Math.floor((Math.random() * 7) + 1)],
    posX :  4,
    posY :  -1,
    cstate : 0,
    lastMoves: new Array(5).fill(0),

    paint : function() {
        for (i = 0; i < this.piece.dimension; i++) {
            for (j = 0; j < this.piece.dimension; j++) {
                if (this.piece.shape[this.cstate][j][i]) 
                    paintSquare(i+this.posX-this.piece.centerX, j+this.posY-this.piece.centerY, this.piece.color);
            }
        }

    },

    checkCollision : function() {
        var colliding = false;
        for (i = 0; i < this.piece.dimension; i++) {
            for (j = 0; j < this.piece.dimension; j++) {
                if (this.piece.shape[this.cstate][j][i]){
                    x = i+this.posX-this.piece.centerX;
                    y = j+this.posY-this.piece.centerY;
                    if (x < 0 || x > 9)
                        colliding = true;
                    else if (y > 19)
                        colliding = true;
                    else if (y>=0 && x>=0 && board[y][x] != 0)
                        colliding = true;
                    //paintSquare(x, y, 'gray');
                }
            }
        }

        //document.getElementById("test").innerHTML = "Colliding: " + colliding;
        return colliding;

    },

    newPiece : function() {

        //Add the piece to the board
        for (i = 0; i < this.piece.dimension; i++) {
            for (j = 0; j < this.piece.dimension; j++) {
                if (this.piece.shape[this.cstate][j][i]){
                    x = i+this.posX-this.piece.centerX;
                    y = j+this.posY-this.piece.centerY;
                    board[y][x] = this.piece.number; 
                }
            }
        }

        //Set a new piece
        this.posY = 0;
        this.posX = 4;
        this.cstate = 0;
        this.piece = Pieces[this.nextPiece];
        this.nextPiece = Math.floor((Math.random() * 7) + 1);
        selectionSound.play()
        if (this.checkCollision()){
            GameOver = true;
            gameOverSound.play();
        }


    },



    move : function() {

        var d0 = new Date();
        if (d0.valueOf() > this.lastMoves[0]+(Math.max(150, 700-(Lines*25)))) {
            this.lastMoves[0] = d0.valueOf();
            this.posY++;
            if (this.checkCollision()){
                this.posY--;
                this.newPiece();
            }

        }


        if (keySpace) {
            var d1 = new Date();
            if (d1.valueOf() > this.lastMoves[1]+150) {
                this.lastMoves[1] = d1.valueOf();
                this.cstate++;
                if (this.cstate == this.piece.nstates)
                    this.cstate = 0;
                if (this.checkCollision())
                    this.cstate--;
                    if (this.cstate < 0)
                        this.cstate = this.piece.nstates-1;

            }
        }

        if (keyLeft) {
            var d2 = new Date();
            if (d2.valueOf() > this.lastMoves[2]+150) {
                this.lastMoves[2] = d2.valueOf();
                this.posX--;
                if (this.checkCollision())
                    this.posX++;
            }
        }

        if (keyRight) {
            var d3 = new Date();
            if (d3.valueOf() > this.lastMoves[3]+150) {
                this.lastMoves[3] = d3.valueOf();
                this.posX++;
                if (this.checkCollision())
                    this.posX--;
            }
        }

        if (keyDwn) {
            var d4 = new Date();
            if (d4.valueOf() > this.lastMoves[4]+75) {
                this.lastMoves[4] = d4.valueOf();
                this.posY++;
                if (this.checkCollision())
                    this.posY--;
            }
        }

        if (keyUp) {
            var d5 = new Date();
            if (d5.valueOf() > this.lastMoves[5]+75) {
                this.lastMoves[5] = d5.valueOf();
                this.posY--;
                if (this.checkCollision())
                    this.posY++;
            }
        }     

    }
};



function removeLine(line){
    LineSound.play();
    Lines++;
    for (j = line; j > 0; j--) {
        for (i = 0; i < 10; i ++){
            board[j][i] = board[j-1][i];
        }
    }



}


function checkFullLine(){
    for (i = 0; i < 20; i++) {
        if (!board[i].includes(0)){
            removeLine(i);
        }    
    }
}
 



function paintSquare(x, y, color) {
    cc.fillStyle = 'black';
    x = x + 8;
    y = y + 1;
    cc.fillRect(20*x, 20*y, 20, 20);
    cc.fillStyle = color;
    cc.fillRect(20*x+1, 20*y+1, 18, 18);
}




function paintBoard(){
    cc.fillStyle = 'black';
    cc.fillRect(0, 0, c.width, c.height);


    for (i = 0; i < 10; i++) {
        for (j = 0; j < 20; j++) {
            if (board[j][i]) 
                paintSquare(i, j, colors[board[j][i]]);
        }
    }

    playable.paint();

    for (i = -1; i < 11; i++) {
            paintSquare(i, -1, 'gray');
            paintSquare(i, 20, 'gray');
    }
    for (i = -1; i < 20; i++) {
            paintSquare(-1, i, 'gray');
            paintSquare(10, i, 'gray');
    }    

    paintInfo();
    paintNextPiece();
    paintControls();

}


function paintControls(){
    cc.fillStyle = 'white';
    cc.fillRect(5, 120, 127, 100);
    cc.fillStyle = 'black';
    cc.fillRect(7, 122, 123, 96);
    cc.fillStyle = 'black';
    cc.fillRect(30, 110, 76, 20);


    
    cc.fillStyle = "white";
    cc.font = " 15px Courier New ";
    cc.fillText("Controls", 32, 125);
    cc.font = " 20px Courier New ";
    cc.fillText("Accel  ↓ ", 20, 150);
    cc.fillText("Move   ↔  ", 20, 175);
    cc.fillText("Rotate ⎵ ", 20, 200);
 


}

function paintInfo(){
    cc.fillStyle = 'white';
    cc.fillRect(400, 220, 180, 90);
    cc.fillStyle = 'black';
    cc.fillRect(402, 222, 176, 86);

    cc.font = " 20px Courier New ";
    cc.fillStyle = "white";
    cc.fillText("Lines: "+Lines, 420, 250);
    speed = Math.max(150, 700-(Lines*25));
    cc.fillText("Speed: "+ speed+"ms", 420, 290);

}

function paintNextPiece(){
    cc.font = " 20px Courier New ";
    cc.fillStyle = "white";
    cc.fillText("Next", 475, 50);

    cc.fillStyle = 'white';
    cc.fillRect(456, 56, 88, 88);
    cc.fillStyle = 'black';
    cc.fillRect(458, 58, 84, 84);


    off = 0;
    if (playable.nextPiece == 7)
        off = 1;
    for (i = 0; i < Pieces[playable.nextPiece].dimension; i++) {
        for (j = 0; j < Pieces[playable.nextPiece].dimension; j++) {
            if (Pieces[playable.nextPiece].shape[0][j][i]) 
                paintSquare(i +15 +off, j +2 +off, Pieces[playable.nextPiece].color);
        }
    }
}

function gameOver(){
    cc.fillStyle = 'black';
    cc.fillRect(175, 145, 175, 80);
    cc.font = " 30px Courier New ";
    cc.fillStyle = "white";
    cc.fillText("Game Over", 180, 170);
    cc.font = " 20px Courier New ";
    cc.fillText("Refresh to ", 195, 200);
    cc.fillText("play again!", 195, 215);
}


function update() {
    paintBoard();
    if (!GameOver){
        playable.move();
        checkFullLine();
    }else{
        gameOver();
    }

}


