window.onload = ()=> {
    c = document.getElementById('gc');
    cc = c.getContext('2d');
    cc.font = '40px Arial';
    setInterval(update, 0);
    document.addEventListener('keydown',keyDown);
    document.addEventListener('keyup',keyBack);

}


const Colors = {
    darkGray: '#808080',
    lightGray: '#c6c6c6',
    white: '#ffffff'
}

const BLOCK_SIZE = 30;
const board = {
  position: {
    x: 13,
    y: 39
  },
  height: 9,
  width: 9,
  cells: [],

  initializeBoard() {
    board.cells = new Array(this.height)
    for (let i=0; i < board.width; i ++) {
      board.cells[i] = Array(board.width).fill(0);
    }
  },

  represent() {
    board.cells[0][5] = 1;
    board.cells[0][6] = 2;
    board.cells[0][7] = 3;
    board.cells[0][8] = 4;
    board.cells[1][1] = -1;
    board.cells[2][2] = 'k';
    cc.fillStyle = Colors.darkGray;
    cc.fillRect(this.position.x - 3, this.position.y - 3, BLOCK_SIZE * this.height + 6, BLOCK_SIZE * this.width + 6);

    for (let i=0; i < board.height; i ++) {
      for (let j=0; j < board.width; j ++) {
        blockX = this.position.x + i*BLOCK_SIZE;
        blockY = this.position.y + j*BLOCK_SIZE;
        paintBlock(blockX, blockY, board.cells[i][j], false);
      }
    }
  }


}

board.initializeBoard();


function paintBlock(x, y, value, hidden) {
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
      cc.fillStyle = "blue";
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
      cc.fillText("4", x, y);
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
    paintBlock(100, 100, 0, false);
    paintBlock(100, 140, 1, false);
    paintBlock(140, 140, 2, false);
    paintBlock(140, 100, 0, true);

    board.represent();

}


