  var play = true;
  var side = 45;
  var mouseX;
  var mouseY;
  var speed = 200;
  var map = Array.from(Array(side+1), _ => Array(side+1).fill(0));
  map[22][20] = 1
  map[23][20] = 1;
  map[21][21] = 1;
  map[21][22] = 1;
  map[22][23] = 1;
  map[23][21] = 1;
  map[23][22] = 1;

  window.onload = ()=> {
    c = document.getElementById('gc');
    cc = c.getContext('2d');
    cc.font = '40px Arial';
    setInterval(update, 10);
    c.addEventListener('mousemove', movemouse);
    c.addEventListener('mousedown', clickado);
  }

  inputspeed.oninput = function() {
    speed = 1000 - Number(this.value);
    console.log(speed);
  }

  function pintaMapa(){
    for (var i=0; i<side; i++){
      for (var j=0; j<side; j++){
        if(map[i][j]==0 && (i+j)%2==0){
          paintSquare(i,j,'ghostwhite');
        }
        if(map[i][j]==0 && (i+j)%2!=0){
          paintSquare(i,j,'gainsboro');
        }
        if(map[i][j]==1){
          paintSquare(i,j,'mediumseagreen');
        }
        if(map[i][j]==2){
          paintSquare(i,j,'red');
        }
      }
    }
  }

  function paintSquare (x,y,color){
    cc.fillStyle = color;
    cc.fillRect(x*10, y*10, 10, 10);
  }


  function movemouse(evt){
    x=evt.pageX-parseInt(c.offsetLeft, 10);
    y=evt.pageY-parseInt(c.offsetTop, 10);
    console.log(document.getElementById('gc').offsetTop);
  }

  function clickado(){
    if(map[Math.floor(x/10)][Math.floor(y/10)]==1){
      map[Math.floor(x/10)][Math.floor(y/10)]=0;
    }else{
      map[Math.floor(x/10)][Math.floor(y/10)]=1;
    }
  }

  function playPause() {
    if (play){
      play = false;
    }else{
      play = true;
    }
  }

  function randomMap() {
    play = false;
    for (var i=0; i<side; i++){
      for (var j=0; j<side; j++){
        map[i][j] = Math.floor(Math.random()*2);
      }
    }
  }

  function resetMap() {
    play = false;
    for (var i=0; i<side; i++){
      for (var j=0; j<side; j++){
        map[i][j] = 0;
      }
    }
  }

  class deltaLife {
    constructor(x, y, alive) {
      this.x = x;
      this.y = y;
      this.alive = alive;
    }
  }

  var deltaStack = [];

  function liveOrdie(x, y){
    neighbours = 0;
    alive = map[x][y];
    for (i=-1; i<=1; i++){
      for (j=-1; j<=1; j++){
        if ((x+i)<0 || (y+j)<0){
        //out of bounds
        }else{
          if (!(i==j && i==0)){
            neighbours += map[x+i][y+j];
          }
        }
      }
    }
    //RULE 1
    if (alive==1 && neighbours<2){
      alive = 0;
    }
    //RULE 2
    if (alive==1 && (neighbours==3 || neighbours==2)){
      alive = 1;
    }
    //RULE 3
    if (alive==1 && neighbours>3 ){
      alive = 0;
    }
    if (alive==0 && neighbours==3){
      alive = 1;
    }
    if (alive != map[x][y]){
      deltaStack.push(new deltaLife(x, y, alive));
    //console.log(x+" - "+y+"has: "+neighbours);
    }
  }

  function lifeCycle(){
    for (var i=0; i<side; i++){
      for (var j=0; j<side; j++)
        liveOrdie(i, j);
    }
    delta = deltaStack.pop();
    while (delta != undefined){
      map[delta.x][delta.y] = delta.alive;
      delta = deltaStack.pop();
    }
  }


  lastn = 0;
  function update() {

    pintaMapa();

    n = new Date().getTime();
    if (n>(lastn+speed)){
      lastn = n;
      if (play)
        lifeCycle();
    }
  }
