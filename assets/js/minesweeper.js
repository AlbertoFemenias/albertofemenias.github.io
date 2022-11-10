window.onload = ()=> {
    c = document.getElementById('gc');
    cc = c.getContext('2d');
    cc.font = '40px Arial';
    setInterval(update, 0);
    c.addEventListener('mousemove', movemouse);
    c.addEventListener('contextmenu', rightClick); 

    c.addEventListener('click', leftClick);

    game.newGame()
    
    /*c.addEventListener('contextmenu', function(e) {  
      e.preventDefault();
      board.uncoverCell();
    });*/
}

var mouse = {
  x: 0,
  y: 0
}

function movemouse(evt){
  mouse.x=evt.pageX-parseInt(c.offsetLeft, 10);
  mouse.y=evt.pageY-parseInt(c.offsetTop, 10);
}

function leftClick(){
  game.mouseLeftClick(mouse.x, mouse.y);
}

function rightClick(evt){
  evt.preventDefault();
  game.mouseRightClick(mouse.x, mouse.y);
}


const Colors = {
    darkGray: '#808080',
    lightGray: '#c6c6c6',
    white: '#ffffff'
}

class Block {
  constructor(value=0, hidden=true) {
    this.value = value;
    this.hidden = hidden;
    this.flag = false;
  }

  uncover() {
    this.hidden = false;
    this.flag = false;
  }

  putFlag() {
    if (this.hidden)
      this.flag = !this.flag;
  }
}

const BLOCK_SIZE = 30;
const BOARD_HEIGHT = 9;
const BOARD_WIDTH = 9;
const BOMB_COUNT = 3;
const CHEAT = true;

const playBoard = {
  position: {
    x: 8,
    y: 75
  },
  bombs: BOMB_COUNT,
  height: BOARD_HEIGHT,
  width: BOARD_WIDTH,
  cells: null,

  initializeBoard() {
    this.cells = new Array(this.height)
    for (let i=0; i < this.width; i ++) {
      this.cells[i] = Array.from({ length: this.height }, () => new Block());
    }

    let bombsToPlace = this.bombs
    while (bombsToPlace > 0) {
      const cellX = Math.floor(Math.random()*this.width);
      const cellY = Math.floor(Math.random()*this.height);
      if (this.cells[cellX][cellY].value !== -1) {
        this.cells[cellX][cellY].value = -1;
        bombsToPlace--;
      }
    }

    this.computeCellBombCount();
  },

  getBombsFlagged() {
    let bombsFlagged = 0;
    for (let cellX=0; cellX<this.height; cellX++) {
      for (let cellY=0; cellY<this.width; cellY++) {
        if (this.cells[cellX][cellY].value === -1 && this.cells[cellX][cellY].flag)
          bombsFlagged++; 
      }
    }
    return bombsFlagged;
  },

  getHiddenCells() {
    let hiddenCells = 0;
    for (let cellX=0; cellX<this.height; cellX++) {
      for (let cellY=0; cellY<this.width; cellY++) {
        if (this.cells[cellX][cellY].hidden)
        hiddenCells++; 
      }
    }
    return hiddenCells;
  },

  computeCellBombCount() {
    for (let cellX=0; cellX<this.height; cellX++) {
      for (let cellY=0; cellY<this.width; cellY++) {
        let bombCount = 0;
        for (const cellCoords of this.getSurroundingCells(cellX, cellY)) {
          const [cellX, cellY] = cellCoords;
          if (this.cells[cellX][cellY].value === -1)
            bombCount++; 
        }
        if (this.cells[cellX][cellY].value !== -1)
          this.cells[cellX][cellY].value = bombCount;
      }
    }
  },

  getFlagsLeft() {
    let flagCount = 0;
    for (let i=0; i < this.height; i ++) {
      for (let j=0; j < this.width; j ++) {
        if (this.cells[i][j].flag) {
          flagCount++;
        }
      }
    }
    return this.bombs - flagCount;
  },

  getSurroundingCells(cellX, cellY) {
    const surroundingCells = [];
    for (let i=-1; i<=1; i++) {
      for (let j=-1; j<=1; j++) {
        const sX = cellX + i;
        const sY = cellY + j;
        if (-1<sX && sX<this.width && -1<sY && sY<this.height) {
          surroundingCells.push([(cellX+i),(cellY+j)]);
        }
      }
    }
    return surroundingCells;
  },

  represent() {
    cc.fillStyle = Colors.lightGray;
    cc.fillRect(this.position.x - 3, this.position.y - 3, BLOCK_SIZE * this.height + 6, BLOCK_SIZE * this.width + 6);

    for (let i=0; i < this.height; i ++) {
      for (let j=0; j < this.width; j ++) {
        blockX = this.position.x + i*BLOCK_SIZE;
        blockY = this.position.y + j*BLOCK_SIZE;
        paintBlock(blockX, blockY, this.cells[i][j].value, this.cells[i][j].hidden, this.cells[i][j].flag);
      }
    }
  },

  mouseIsOverBoard(mouseX, mouseY) {
    if (mouseX < this.position.x)
      return false;
    if (mouseY < this.position.y)
      return false;
    if (mouseX > this.position.x+this.width*BLOCK_SIZE)
      return false;
    if (mouseY > this.position.y+this.height*BLOCK_SIZE)
      return false;
    
    return true;
  },

  getHoveredCell(mouseX, mouseY) {
    let cellX = Math.floor((mouseX - this.position.x) / BLOCK_SIZE);
    let cellY = Math.floor((mouseY - this.position.y) / BLOCK_SIZE);
    return [cellX, cellY];
  },

  flagCell(mouseX, mouseY) {
    const [cellX, cellY] = this.getHoveredCell(mouseX, mouseY);
    this.cells[cellX][cellY].putFlag();
  },

  uncoverCell(mouseX, mouseY) {
    const [cellX, cellY] = this.getHoveredCell(mouseX, mouseY);
    if (!this.cells[cellX][cellY].flag){
      this.explodeCell(cellX, cellY);
    }
  },

  explodeCell(cellX, cellY) {
    this.cells[cellX][cellY].uncover();
    if (this.cells[cellX][cellY].value !== 0)
      return 
      for (const cellCoords of this.getSurroundingCells(cellX, cellY)) {
        const [sX, sY] = cellCoords;
      if (this.cells[sX][sY].hidden)
        this.explodeCell(sX, sY);
    }
  }
}

const scoreBoard = {
  position: {
    x: 5,
    y: 5
  },
  elapsedTime: 0,
  state: 'gameOn',
  timerStart: new Date(),
  border: 8,
  button: {
    emojis: {
      gameOn: '🙂',
      gameWon: '😎',
    },
    x: 5 + 115,
    y: 5 + 8,
    size: 45
  },

  reset() {
    this.timerStart = new Date();
    this.state = 'gameOn';
  },

  getElapsedSeconds() {
    const endTime = new Date();
    let timeDiff = endTime - this.timerStart; //in ms
    timeDiff /= 1000;
    this.elapsedTime = Math.round(timeDiff)
    return this.elapsedTime;
  },

  buttonPressed(mouseX, mouseY) {
    if (mouseX > this.button.x && mouseX < this.button.x+this.button.size) {
      if (mouseY > this.button.y && mouseY < this.button.y+this.button.size)
        return true;
    }
    return false;
  },

  represent(bombCount) {
    cc.fillStyle = Colors.lightGray;
    cc.fillRect(this.position.x, this.position.y, 275, 60);
    this.paintCounter(bombCount, this.position.x + this.border, this.position.y + this.border);
    if (this.state === 'gameOn') {
      this.paintCounter(this.getElapsedSeconds(), this.position.x + 180 - this.border, this.position.y + this.border);
      this.paintBigButton(!this.getElapsedSeconds(), this.button.emojis.gameOn, this.button.x, this.button.y, this.button.size)  
    } else if (this.state === 'gameWon'){
      this.paintCounter(this.elapsedTime, this.position.x + 180 - this.border, this.position.y + this.border);
      this.paintBigButton(false, this.button.emojis.gameWon, this.button.x, this.button.y, this.button.size)
    }  
    },

  paintCounter(value, x, y) {
    cc.fillStyle = 'black';
      cc.fillRect(x, y, 95, 45);
      cc.font = "bolder 50px Courier New";
      cc.fillStyle = "red";
      cc.fillText(String(value).padStart(3, '0'), x + 2, y + 38);
  },
  
  paintBigButton(clicked, emoji, x, y, size) {
    cc.fillStyle = Colors.white;
    if (clicked)
      cc.fillStyle = Colors.darkGray;
    cc.fillRect(x, y, size, size);
    
    cc.fillStyle = Colors.darkGray;
    if (clicked)
      cc.fillStyle = Colors.white;
    cc.beginPath();
    cc.moveTo(x + size, y);
    cc.lineTo(x, y + size);
    cc.lineTo(x + size, y + size);
    cc.closePath();
    cc.fill();
  
    cc.fillStyle = Colors.lightGray;
    cc.fillRect(x+3, y+3, size - 6, size - 6);
    if (clicked) {
      cc.font = "bolder 33px verdana";
      cc.fillText(emoji, x + 6, y + size - 8);
    } else {
      cc.font = "bolder 35px verdana";
      cc.fillText(emoji, x + 5, y + size - 9);
    }
  }

}

const game = {
  state: 'gameOn',

  newGame() {
    this.state = 'gameOn';
    playBoard.initializeBoard();
    scoreBoard.reset();
  },

  checkState() {
    if (playBoard.getBombsFlagged() === playBoard.getHiddenCells() && playBoard.getBombsFlagged() === playBoard.bombs) {
      this.state = 'gameWon';
      scoreBoard.state = this.state;
    }
  },

  gameOn () {
    return this.state === 'gameOn';
  },

  represent() {
    playBoard.represent();
    scoreBoard.represent(playBoard.getFlagsLeft());
  },

  mouseLeftClick(mouseX, mouseY) {
    if (scoreBoard.buttonPressed(mouseX, mouseY)) {
      this.newGame();
    }
    if (this.gameOn() && playBoard.mouseIsOverBoard(mouseX, mouseY)) {
      playBoard.uncoverCell(mouseX, mouseY);
    }
  },

  mouseRightClick(mouseX, mouseY) {
    if (this.gameOn() &&  playBoard.mouseIsOverBoard(mouseX, mouseY)) {
      playBoard.flagCell(mouseX, mouseY);
    }
  },

}


function paintBlock(x, y, value, hidden, flag) {
  if (hidden) {
    cc.fillStyle = Colors.white;
    cc.fillRect(x, y, BLOCK_SIZE, BLOCK_SIZE);
    
    cc.fillStyle = Colors.darkGray;
    cc.beginPath();
    cc.moveTo(x + BLOCK_SIZE, y);
    cc.lineTo(x, y + BLOCK_SIZE);
    cc.lineTo(x + BLOCK_SIZE, y + BLOCK_SIZE);
    cc.closePath();
    cc.fill();

    cc.fillStyle = Colors.lightGray;
    cc.fillRect(x+3, y+3, BLOCK_SIZE - 6, BLOCK_SIZE - 6);
    if (CHEAT)
      paintBlockValue(x + 6, y + BLOCK_SIZE - 5, value);
    if (flag) {
      cc.font = "bolder 20px verdana";
      cc.fillText('🏴‍☠️', x + 5, y + BLOCK_SIZE - 8);
    }
  } else {
    cc.fillStyle = Colors.darkGray;
    cc.fillRect(x, y, BLOCK_SIZE, BLOCK_SIZE);
    cc.fillStyle = Colors.lightGray;
    cc.fillRect(x+1, y+1, BLOCK_SIZE - 1, BLOCK_SIZE - 1);
    paintBlockValue(x + 6, y + BLOCK_SIZE - 5, value);
  }
}

function paintBlockValue(x, y, value) {
  cc.font = "bolder 25px verdana";
  switch (value) {
    case -1:
      cc.font = "bolder 15px verdana";
      cc.fillText('💣', x, y - 3);
      break;
    case 0:
      break;
    case 1:
      cc.fillStyle = "blue";
      cc.fillText("1", x, y);
      break;
    case 2:
      cc.fillStyle = "green";
      cc.fillText("2", x, y);
      break;
    case 3:
      cc.fillStyle = "red";
      cc.fillText("3", x, y);
      break;
    case 4:
    case 5:
    case 6:
    case 7:
    case 8:  
      cc.fillStyle = "darkred";
      cc.fillText(value.toString(), x, y);
      break;
    default:
      cc.fillStyle = "yellow";
      cc.fillText("?", x, y);
      break;
  }
}

function update() {
    cc.fillStyle = '#f5f5f5';
    cc.fillRect(0, 0, c.width, c.height);
    paintBlock(100, 100, 0, false, false);
    paintBlock(100, 140, 1, false, true);
    paintBlock(140, 140, 2, false, false);
    paintBlock(140, 100, 0, true, true);

    game.checkState();
    game.represent();

}


