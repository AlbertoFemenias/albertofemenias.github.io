
  function refreshPage(){
    window.location.reload();
  }
	// 16*30=480

  var painted = 0;
  var firstMove = true;
  var playable = false;

  originX = Math.floor((Math.random() * 14) + 1);
  originY = Math.floor((Math.random() * 14) + 1);

  var player = {
	  x: originX,
	  y: originY
  };

  lastDir = 1;

  var map = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],

  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],

  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],

  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];

  map[originX][originY] = 2;


  var headmomentum="";
  var step=1;
  var gamestarted=false;
  var direction="up";

  window.onload = ()=> {
    c = document.getElementById('gc');
    cc = c.getContext('2d');
    cc.font = '40px Arial';
    setInterval(update, 5);
    document.addEventListener('keydown',keyPush);
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
      case 32: //space
        makeMove();   
        break;
      case 37: //left
        if(playable){
        	while(map[player.x-1][player.y] != 1){
              player.x--;
              map[player.x][player.y] = 3;
        	}
        }   
        break;

      case 38: //up
        if(playable){
        	while(map[player.x][player.y-1] != 1){
              player.y--;
              map[player.x][player.y] = 3;
        	}
        }  
        break;

      case 39: //right
        if(playable){
        	while(map[player.x+1][player.y] != 1){
              player.x++;
              map[player.x][player.y] = 3;
        	}
        }   
        break;

      case 40: //down
        if(playable){
        	while(map[player.x][player.y+1] != 1){
              player.y++;
              map[player.x][player.y] = 3;
        	}
        }   
        break;
      }
    }
  

function randN(n){
   return Math.floor((Math.random() * n) + 1);
}


function pintaCasilla(x, y, c){
	cc.fillStyle = 'black';
    if (c == 1) 
    	cc.fillStyle = 'DARKSEAGREEN';
    if (c == 2) 
        cc.fillStyle = 'grey';
    if (c == 3) 
        cc.fillStyle = 'dimgrey';
    if (c == 9) 
        cc.fillStyle = 'crimson';
    
    cc.fillRect(30*x, 30*y, 30, 30);
  }

   function pintaPlayer(){
    pintaCasilla(player.x,player.y,9);
  }


  function pintaTablero(){
    cc.fillStyle = 'black';
    cc.fillRect(0, 0, c.width, c.height);
    for (var x = 0; x < 16; x++){
    	for (var y = 0; y < 16; y++){
    		pintaCasilla(x,y,map[x][y]);
    	}
    }
    pintaPlayer();
  }

  function repinta(){
  	map[originX][originY]=3;
  	for (var x = 0; x < 16; x++){
    	for (var y = 0; y < 16; y++){
    		if (map[x][y]==0){
    			map[x][y]=1;
    		}
    	}
    }
  }


  function makeMove(){
    var dir = randN(4);
    
    if (dir <=2 && lastDir <=2){
    	makeMove();
    	return;
    }
    if (dir >=3 && lastDir >=3){
    	makeMove();
    	return;
    }

    var dX = 0;
    var dY = 0;

    if (dir == 1){ //left
      dX = -1;
      dY = 0;
    }

    if (dir == 2){ //right
      dX = +1;
      dY = 0;
    }

    if (dir == 3){ //up
      dX = 0;
      dY = -1;
    }

    if (dir == 4){ //down
      dX = 0;
      dY = +1;
    }

    if (map[player.x+dX][player.y+dY] == 1){
    	return;
    }

    lastDir = dir;
    
    if(map[player.x-dX][player.y-dY] == 0  && !firstMove)
    	map[player.x-dX][player.y-dY] = 1;

    firstMove = false;

  	for (var x = 3+randN(11); x > 0; x--){
  		if (map[player.x+dX][player.y+dY] != 1) {
  			player.x = player.x + dX;
  			player.y = player.y + dY;
  			if (map[player.x+dX][player.y+dY] == 2){
  				x = x + 2;
  			}
        if (map[player.x][player.y] != 2){
          map[player.x][player.y] = 2;
          painted++;
        }
  			
  		}else{
  			return;
  		}
  	}
  	//if(map[player.x+dX][player.y+dY] == 0){
  		map[player.x+dX][player.y+dY] = 1;
  	//}
  }



  function info(){
      cc.font = '20px Arial';
      cc.fillStyle = 'white';
      cc.fillText("Tiles painted: "+painted, 20, 20);
  }

  function reset(){
    painted = 0;
    firstMove = true;
    playable = false;

    originX = Math.floor((Math.random() * 14) + 1);
    originY = Math.floor((Math.random() * 14) + 1);

    player.x = originX;
    player.y = originY;

    lastDir = 1;

    map = [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],

      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],

      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],

      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ];

  }






  function explore(pasos){
      while(pasos > -10) {
      if (pasos > 1)
        makeMove();
      pasos--;

      if (pasos == -10){
        repinta();
        player.x = originX;
        player.y = originY;
        playable = true;
      }
    }
  }

  function hard () {
    reset();
    explore();
    while (painted < 150){
      reset();
      //pasos = 200;
      explore(200);
    }
  }
  

  var pasos = 150;
  
  function update() {

      if (pasos > 1)
        makeMove();
      pasos--;

      if (pasos == 0){
        repinta();
        player.x = originX;
        player.y = originY;
        playable = true;
      }
    
      pintaTablero();
      //info();
  
  }

