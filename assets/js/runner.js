

  window.onload = ()=> {
    c = document.getElementById('gc');
    cc = c.getContext('2d');
    cc.font = '40px Arial';
    setInterval(update, 1000/30);
    //Salta con click o espacio!
    document.addEventListener('click',jump); 
    document.addEventListener('keydown',keyPush);

  }

  //THIS FUNCTIONS PREVENTS SCROLLING THE WEBPAGE WHILE PLAYING WITH THE ARROWKEYS
    window.addEventListener("keydown", function(e) {
        // space and arrow keys
        if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
            e.preventDefault();
        }
    }, false);


    pixelsize=2;
    blocksize=32;

  var brick = [

    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1],
    [0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1],
    [0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0],
    [0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0],
    [0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1],
    [0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1],
    [0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0],
    [0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0],
    [0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0]
      ];


   var coin = [
              [0,0,1,1,1,1,1,1,1,0,0],
              [0,0,1,1,1,1,1,1,1,0,0],
              [1,1,1,1,0,0,0,1,1,1,1],
              [1,1,1,1,0,0,0,1,1,1,1],
              [1,1,1,1,0,0,0,1,1,1,1],
              [1,1,1,1,0,0,0,1,1,1,1],
              [1,1,1,1,0,0,0,1,1,1,1],
              [1,1,1,1,0,0,0,1,1,1,1],
              [1,1,1,1,0,0,0,1,1,1,1],
              [1,1,1,1,0,0,0,1,1,1,1],
              [1,1,1,1,0,0,0,1,1,1,1],
              [0,0,1,1,1,1,1,1,1,0,0],
              [0,0,1,1,1,1,1,1,1,0,0]        
            ];


        var playerright1 = [
               [0,0,3,3,3,3,3,3,3,3,3,3,3,3,0,0],
              [0,0,3,3,3,3,3,3,3,3,3,3,3,3,0,0],
              [3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3],
              [3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3],
              [3,3,3,3,3,3,2,2,2,2,2,2,3,3,3,3],
              [3,3,3,3,3,3,2,2,2,2,2,2,3,3,3,3],
              [3,3,3,3,2,2,2,2,2,2,2,2,2,2,2,2],
              [3,3,3,3,2,2,2,2,3,3,2,2,3,3,2,2],
              [3,3,3,3,2,2,2,2,3,3,2,2,3,3,2,2],
              [3,3,2,2,2,2,2,2,3,3,2,2,3,3,2,2],
              [3,3,2,2,2,2,2,2,3,3,2,2,3,3,2,2],
              [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
              [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
              [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
              [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
              [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
              [1,1,1,1,2,2,1,1,1,1,2,2,1,1,1,1],
              [1,1,1,1,2,2,1,1,1,1,2,2,1,1,1,1],
              [1,1,1,1,2,2,1,1,1,1,2,2,1,1,1,1],
              [1,1,1,1,2,2,1,1,1,1,2,2,1,1,1,1],
              [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
              [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
              [0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0],
              [0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0],
              [0,0,1,1,1,1,0,0,0,0,1,1,1,1,0,0],
              [0,0,1,1,1,1,0,0,0,0,1,1,1,1,0,0],
              [0,0,1,1,1,1,0,0,0,0,1,1,1,1,0,0],
              [0,0,1,1,1,1,0,0,0,0,1,1,1,1,0,0],
              [0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0],
              [0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0]
            ];

            var playerright2 = [
              [0,0,3,3,3,3,3,3,3,3,3,3,3,3,0,0],
              [0,0,3,3,3,3,3,3,3,3,3,3,3,3,0,0],
              [3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3],
              [3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3],
              [3,3,3,3,3,3,2,2,2,2,2,2,3,3,3,3],
              [3,3,3,3,3,3,2,2,2,2,2,2,3,3,3,3],
              [3,3,3,3,2,2,2,2,2,2,2,2,2,2,2,2],
              [3,3,3,3,2,2,2,2,3,3,2,2,3,3,2,2],
              [3,3,3,3,2,2,2,2,3,3,2,2,3,3,2,2],
              [3,3,2,2,2,2,2,2,3,3,2,2,3,3,2,2],
              [3,3,2,2,2,2,2,2,3,3,2,2,3,3,2,2],
              [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
              [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
              [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
              [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
              [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
              [1,1,1,1,2,2,1,1,1,1,2,2,1,1,1,1],
              [1,1,1,1,2,2,1,1,1,1,2,2,1,1,1,1],
              [1,1,1,1,2,2,1,1,1,1,2,2,1,1,1,1],
              [1,1,1,1,2,2,1,1,1,1,2,2,1,1,1,1],
              [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
              [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
              [0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0],
              [0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0],
              [0,0,1,1,1,1,0,0,0,0,1,1,1,1,0,0],
              [0,0,1,1,1,1,0,0,0,0,1,1,1,1,0,0],
              [0,0,1,1,1,1,0,0,0,0,1,1,1,1,0,0],
              [0,0,1,1,1,1,0,0,0,0,1,1,1,1,0,0],
              [0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0],
              [0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0]
                ];

    CONSTALTURA = 95;

    var p = {
      x: 50,
      y: CONSTALTURA,
      vel: 0,
      alive: true,
    }




    function keyPush(evt) {
        switch(evt.keyCode){
          case 32: //space
          jump();
          break;

        }
     }

    function jump(){
        if(p.y == CONSTALTURA){
            soundEffects.jumpPlay();
            p.vel=-8;
            p.y--;
        } 
    }


        var soundEffects = {
        dead: new sound("/assets/sounds/gameover.mp3"),
        jumps: [new sound("/assets/sounds/jump.wav"), new sound("/assets/sounds/jump.wav"), new sound("/assets/sounds/jump.wav"), new sound("/assets/sounds/jump.wav")],
        njumps: 0,

        jumpPlay: function (){
            this.jumps[this.njumps % 4].play();
            this.njumps++;
        },

        deadPlay: function (){
            this.dead.play();
        },

    }



    function sound(src) {
        this.sound = document.createElement("audio");
        this.sound.src = src;
        this.sound.setAttribute("preload", "auto");
        this.sound.setAttribute("controls", "none");
        this.sound.style.display = "none";
        document.body.appendChild(this.sound);

        this.play = function(){
            this.sound.play();
        }

        this.stop = function(){
            his.sound.pause();
        }

    }

    function moveP(){

        var gravity = Speed/8;
        
        
        p.vel = p.vel + gravity;
        

        if (p.alive == true){
            if(p.y < CONSTALTURA){
                p.y = p.y + p.vel;
                if (p.y > CONSTALTURA) {
                    p.y = CONSTALTURA;
                }
            }else{
                p.y = CONSTALTURA;
            }
        }else{
            p.y = p.y + 0.3 + 0.05*p.vel;
        }
    }

    



    function pintamapa(){


      for (var i=0; i<33; i++){ //try 16
              drawbrick(i*blocksize - (Time%16), (CONSTALTURA+1)*2);
              drawbrick(i*blocksize - (Time%16), (CONSTALTURA+17)*2);
       }
    }


    function drawbrick(x, y){
      for (var i=0; i<brick.length; i++){
        for (var j=0; j<brick[0].length; j++){
          if(brick[i][j]==0){
            //cc.fillStyle = "darkred";
            cc.fillStyle = "#404040";
            cc.fillRect(j*pixelsize+x, i*pixelsize+y, pixelsize, pixelsize);
          }
          if(brick[i][j]==1){
            cc.fillStyle = "dimgray";
            cc.fillRect(j*pixelsize+x, i*pixelsize+y, pixelsize, pixelsize);
          }
        }
      }
    }

    function paintBubble(x, y, r) {
                cc.strokeStyle="green";
                cc.beginPath();
                cc.lineWidth=3;
                cc.strokeStyle="green";
                cc.arc(x,y,r,0,2*Math.PI);
                cc.fillStyle ="black";
                cc.fill();
                cc.stroke();
    }

    function laser () {
        this.x = 700;
        this.y = 183;
        this.radius = 1;
        this.alive = false;

        this.move = function () {
            if (this.alive){
            this.x -= Speed*1.7;
            }

            if (this.x< -60){
                this.alive = false;
                this.x = -40;
            }
        }

        this.regen = function(){
            if (!this.alive){
                this.alive = true;
                this.x = 700;
                this.radius = 1;
            }
        }

        this.check = function(){
            if (this.x < (2*p.x)+30 && this.x > (2*p.x)+20 && p.y > CONSTALTURA - 2 && this.alive){
                killPlayerLaser();
            }else if(this.x < (2*p.x)+30 && this.x > (2*p.x) && p.y > (CONSTALTURA-20) && p.vel > 0 && p.alive){
                this.alive = false;
            }
        }

        this.show = function (leg) {
            x = this.x;
            y = this.y;
            cc.lineWidth = 3;
            cc.strokeStyle = "red";
            if (this.alive){
                if (leg) {
                    cc.beginPath();
                    cc.moveTo(x,y);
                    cc.lineTo(x+5,y+5);
                    cc.lineTo(x+10,y);
                    cc.lineTo(x+15,y+5);
                    cc.lineTo(x+20,y);
                    cc.lineTo(x+25,y+5);
                    cc.stroke();
                    cc.closePath();
                }else{
                    cc.beginPath();
                    cc.moveTo(x,y+5);
                    cc.lineTo(x+5,y);
                    cc.lineTo(x+10,y+5);
                    cc.lineTo(x+15,y);
                    cc.lineTo(x+20,y+5);
                    cc.lineTo(x+25,y);
                    cc.stroke();
                    cc.closePath();
                }
            }else{
                if (this.radius<15){
                    cc.beginPath();
                    cc.lineWidth=3;
                    cc.strokeStyle=this.color;
                    this.radius = this.radius + 3;
                    cc.arc(this.x+2, this.y, this.radius, 0, 2*Math.PI);
                    cc.fillStyle ="black";
                    cc.fill();
                    cc.stroke();
                }
            }
            //truco para que no se pinten cosas raras
            cc.beginPath();
            cc.strokeStyle = "green";
            cc.moveTo(0,0);
            cc.lineTo(1,1);
            cc.stroke();
            cc.closePath();
        }
    }



    function hole (x, y) {
        this.x = x;
        this.y = y;
        this.l = 64;
        this.alive = true;

        this.move = function () {
            this.x -= Speed;
            if (this.x< -64){
                this.alive = false;
            }
        }

        this.show = function () {
            cc.fillStyle = "black";
            cc.fillRect(this.x, this.y, this.l, this.l);
            paintBubble(this.x + 10, this.y - 3, 4) ;
            paintBubble(this.x + 25, this.y + 5, 5) ;
            paintBubble(this.x + 36, this.y - 8, 3) ;
            paintBubble(this.x + 49, this.y + 2, 5) ;
            cc.fillStyle = "green";
            cc.fillRect(this.x, this.y+5, this.l, this.l);
        }

    }


    function coinMaker () {
        this.x = 400;
        this.y = 90;

        this.show = function () {
           for (var i=0; i<coin.length; i++){
              for (var j=0; j<coin[0].length; j++){
                  if(coin[i][j]==1){
                    cc.fillStyle = "yellow";
                    cc.fillRect(j*2+this.x, i*2+this.y, 2, 2);
                  }
               }
            } 
        }

        this.move = function () {
          this.x -= Speed;
        }
        
        this.check = function () {
          if (this.x < p.x*2 +40 && this.x +20 > p.x*2 && p.y < this.y) {
            return true;
          }else{
            return false;
          }
        }
    }


    var obstacles = {
        hole1: new hole (gc.width             , (CONSTALTURA+1)*2),
        hole2: new hole (gc.width +  gc.width/3, (CONSTALTURA+1)*2),
        hole3: new hole (gc.width + 2*gc.width/3 ,(CONSTALTURA+1)*2),

        move: function(){
            this.hole1.move();
            this.hole2.move();
            this.hole3.move();
        },

        show: function(){
            this.hole1.show();
            this.hole2.show();
            this.hole3.show();
        },
        regen: function(){
            if (!this.hole1.alive){
                this.hole1.alive = true;
                this.hole1.x = this.hole3.x + Math.floor((Math.random() * 100) + 300);
            }
            if (!this.hole2.alive){
                this.hole2.alive = true;
                this.hole2.x = this.hole1.x + Math.floor((Math.random() * -200) + 300);
            }
            if (!this.hole3.alive){
                this.hole3.alive = true;
                this.hole3.x = this.hole2.x + Math.floor((Math.random() * 100) + 300);
            }
        },
        check: function(){
            if (this.hole1.x - 55 < p.x && this.hole1.x > p.x + 20 && p.y > CONSTALTURA-1){
                killPlayer();
            }
            if (this.hole2.x - 55 < p.x && this.hole2.x > p.x + 20 && p.y > CONSTALTURA-1){
                killPlayer();
            }
            if (this.hole3.x - 55 < p.x && this.hole3.x > p.x + 20 && p.y > CONSTALTURA-1){
                killPlayer();
            }  
        }

    }

    function killPlayer(){
        Speed = 0;
        p.alive = false;
        soundEffects.deadPlay();
    }

    function killPlayerLaser(){
        Speed = 0;
        p.alive = false;
        p.vel = -40;
        soundEffects.deadPlay();
    }




 

    function drawplayer(x, y, leg){
        if(leg){
          player=playerright1;
        }else{
          player=playerright2;
        }
    
      for (var i=0; i<player.length; i++){
        for (var j=0; j<player[0].length; j++){
          if(player[i][j]==3){
            cc.fillStyle = "dimgray";
            cc.fillRect(j*pixelsize+x*pixelsize, i*pixelsize+y*pixelsize-58, pixelsize, pixelsize);
          }
          if(player[i][j]==1){
            cc.fillStyle = "#01296E";
            cc.fillRect(j*pixelsize+x*pixelsize, i*pixelsize+y*pixelsize-58, pixelsize, pixelsize);
          }
          if(player[i][j]==2){
            cc.fillStyle = "floralwhite";
            cc.fillRect(j*pixelsize+x*pixelsize, i*pixelsize+y*pixelsize-58, pixelsize, pixelsize);
          }
        }
      }
    }
    
  
  function incrementSpeed(){
    Speed = Speed + 0.004;
  }


  function pintatablero(){
    cc.fillStyle = 'black';
    cc.fillRect(0, 0, c.width, c.height);

    cc.font = '30px Courier';
    cc.fillStyle = 'white';
    cc.fillText("Distance: "+ Math.round(Time/35) + " m", 20, 40);
    cc.fillText("Coins: "+ Coins, 430, 40);
    cc.fillText(coin1.check(), 430, 80);
    if (!p.alive){
        cc.fillStyle = 'white';
        cc.font = '70px Courier';
        cc.fillText("You died!", 120, 130);
    }
  }



  var Time = 0;
  var oldT = 0;
  var leg = true;
  var Speed = 6;
  var Coins = 0;


laser1 = new laser(200,200);

coin1 = new coinMaker();

  function update() {

    

    Time = Time +Speed;
    pintatablero();
    pintamapa();

    if (Time > oldT + 30){
        leg =  !leg;
        oldT = Time;
    }

    if (p.alive){
        incrementSpeed();
        obstacles.move();
        obstacles.regen();
        obstacles.check();
    }

    moveP();
    obstacles.show();
    drawplayer(p.x, p.y, leg);
    laser1.show(leg);
    laser1.move();
    laser1.check();

    coin1.show();
    coin1.move();


    if (Math.round(Time/35)%30 == 0){
        laser1.regen();
    }

  }

