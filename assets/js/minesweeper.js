window.onload = ()=> {
    c = document.getElementById('gc');
    cc = c.getContext('2d');
    cc.font = '40px Arial';
    setInterval(update, 0);
    c.addEventListener('mousemove', movemouse);
    c.addEventListener('contextmenu', rightClick); 

    c.addEventListener('click', leftClick);
    
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
  return board.uncoverCell();
}

function rightClick(evt){
  evt.preventDefault();
  return board.flagCell();
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
    if (!this.flag) {
      this.hidden = false;
      this.flag = false;
    }
  }

  putFlag() {
    if (this.hidden)
      this.flag = !this.flag;
  }
}

const BLOCK_SIZE = 30;
const BOARD_HEIGHT = 9;
const BOARD_WIDTH = 9;
const BOMB_COUNT = 10;
const CHEAT = false;

const board = {
  position: {
    x: 13,
    y: 70
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
    for (let i=this.bombs; i--;) {
      const cellX = Math.floor(Math.random()*this.width);
      const cellY = Math.floor(Math.random()*this.height);
      this.cells[cellX][cellY].value = -1;
    }
    this.computeCellBombCount();
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

  getHoveredCell() {
    let cellX = Math.floor((mouse.x - this.position.x) / BLOCK_SIZE);
    let cellY = Math.floor((mouse.y - this.position.y) / BLOCK_SIZE);
    return [cellX, cellY];
  },

  flagCell() {
    const [cellX, cellY] = this.getHoveredCell();
    this.cells[cellX][cellY].putFlag();
  },

  uncoverCell() {
    const [cellX, cellY] = this.getHoveredCell();
    this.explodeCell(cellX, cellY);
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

board.initializeBoard();


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
    cc.fillStyle = 'lightblue';
    cc.fillRect(0, 0, c.width, c.height);
    paintBlock(100, 100, 0, false, false);
    paintBlock(100, 140, 1, false, true);
    paintBlock(140, 140, 2, false, false);
    paintBlock(140, 100, 0, true, true);

    board.represent();

}


