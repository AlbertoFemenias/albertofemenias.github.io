


    window.onload = ()=> {
        c = document.getElementById('gc');
        cc = c.getContext('2d');
        cc.font = '40px Arial';
        setInterval(update, 1000/120);
        document.addEventListener('keydown',keyPush);
        document.addEventListener('keyup',keyRelease);
        Ammunition.initialize();
        Asteroids.initialize();
    }



    var soundEffects = {
        ship: new sound("/assets/sounds/ship.mp3"),
        laserSounds: [new sound("/assets/sounds/laser.mp3"), new sound("/assets/sounds/laser.mp3"), new sound("/assets/sounds/laser.mp3"), new sound("/assets/sounds/laser.mp3")],
        asteroidSounds: [new sound("/assets/sounds/asteroid.mp3"), new sound("/assets/sounds/asteroid.mp3"), new sound("/assets/sounds/asteroid.mp3"), new sound("/assets/sounds/asteroid.mp3")],
        nlasers: 0,
        nasteroids: 0,

        laserPlay: function (){
            this.laserSounds[this.nlasers % 4].play();
            this.nlasers++;
        },

        asteroidPlay: function (){
            this.asteroidSounds[this.nasteroids % 4].play();
            this.nasteroids++;
        },

        shipPlay: function (){
            this.ship.play();
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
                Ship.angleless = true;
            break;

            case 38: //up
                Ship.accelerate = true;
            break;

            case 39: //right
                Ship.angleplus = true;
            break;

            case 32: //space
                Ship.fire();
            break;
        }

    }



    function keyRelease(evt) {
        switch(evt.keyCode){
            case 37: //left
                Ship.angleless = false;
            break;

            case 38: //up
                Ship.accelerate = false;
            break;

            case 39: //right
                Ship.angleplus = false;
            break;

            case 40: //down

            break;
            }

    }



    function showBoard(){

        cc.fillStyle = 'black';
        cc.fillRect(0, 0, c.width, c.height);



        cc.fillStyle = 'white';
        cc.font = '40px Courier';
        cc.fillText(Score, 25, 50);
        cc.fillText("Lives: "+Ship.lives, 580, 50);
        cc.font = '20px Courier';
        cc.fillText(BestScore, 380, 50);
        cc.fillText("Level: "+Level, 350, 25);
        //cc.fillText("Time: "+Time, 125, 25);


        /*Debugging
        cc.font = '20px Courier';
        cc.fillText("Accelerate: "+Ship.accelerate, 125, 25);
        cc.fillText("Hexagons: "+Asteroids.nHexagons, 125, 50);
        cc.fillText("Pentagons: "+Asteroids.nPentagons, 125, 75);
        cc.fillText("Squares: "+Asteroids.nSquares, 125, 100); 
        cc.fillText("Deaths: "+Asteroids.dead, 125, 120); */ 

    }



    function reallocateX(x){
        if (x>800){
            x = x - 800;
        }
        if (x<0){
            x = x + 800;
        }
        return x;
    }



    function reallocateY(y){
        if (y>600){
            y = y - 600;
        }
        if (y<0){
            y = y + 600;
        }
        return y;
    }



    function Poligon (x,y,angle,lados) {

        this.x = x;
        this.y = y;
        this.lados = lados;
        this.angle = angle;
        this.variation = Math.floor(Math.random() * 150)/100;
        this.alive = true;

        //set speed and radius based on number of sides
        if (this.lados == 6){
            this.speed = 0.4;
        }
        if (this.lados == 5){
            this.speed = 0.6;
        }
        if (this.lados == 4){
            this.speed = 1.2;
        }
        
        if (this.lados == 6){
            this.radius = 45;
        }
        if (this.lados == 5){
            this.radius = 35;
        }
        if (this.lados == 4){
            this.radius = 20;
        }

        this.move = function (){
            this.x = this.x + this.speed*Math.cos(this.angle);
            this.y = this.y + this.speed*Math.sin(this.angle);

            //check bordes
            this.x = reallocateX(this.x);
            this.y = reallocateY(this.y);
        }

        this.paint = function () {
            if (this.alive){
                var radius = this.radius;
                var angle = 3.141593 * 2 / this.lados;

                cc.beginPath();
                cc.lineWidth=5;
                cc.strokeStyle="white";
                cc.moveTo(radius*Math.cos(angle+this.variation) + this.x, radius*Math.sin(angle+this.variation)+this.y);
                for (var i=2; i < this.lados+3; i++) {
                    cc.lineTo(radius*Math.cos(angle*i+this.variation) + this.x, radius*Math.sin(angle*i+this.variation)+this.y);
                }
                cc.stroke(); 
            }
            /*Debugging
            cc.beginPath();
            cc.lineWidth=1;
            cc.strokeStyle="red";
            cc.arc(this.x,this.y,this.radius-1,0,2*Math.PI);
            cc.stroke();*/

        }

        this.checkCollision = function () {
            //Ship collision
            var sx = Ship.x;
            var sy = Ship.y;
            var sr = 8; //radius of Ship
            var sc = 4; //radius of Ship corner
            var distance1 = Math.sqrt( (sx-this.x)*(sx-this.x) + (sy-this.y)*(sy-this.y) );
            var eval1 = distance1 < (this.radius+sr);

            var c1x = 23*Math.cos(Ship.angle) + sx;
            var c1y = 23*Math.sin(Ship.angle)+sy;
            var c2x = 18*Math.cos(Ship.angle+2.2) + sx;
            var c2y = 18*Math.sin(Ship.angle+2.2)+sy;
            var c3x = 18*Math.cos(Ship.angle-2.2) + sx;
            var c3y = 18*Math.sin(Ship.angle-2.2)+sy;

            var distance2 = Math.sqrt( (c1x-this.x)*(c1x-this.x) + (c1y-this.y)*(c1y-this.y) );
            var eval2 = distance2 < (this.radius);
            var distance3 = Math.sqrt( (c2x-this.x)*(c2x-this.x) + (c2y-this.y)*(c2y-this.y) );
            var eval3 = distance3 < (this.radius);
            var distance4 = Math.sqrt( (c3x-this.x)*(c3x-this.x) + (c3y-this.y)*(c3y-this.y) );
            var eval4 = distance4 < (this.radius);

            if ((eval1 || eval3 || eval2 || eval4) & this.alive & !Ship.invencible){
                Ship.die();
                if (this.lados == 6){
                    Score = Score + 20;
                }
                if (this.lados == 5){
                    Score = Score + 50;
                }
                if (this.lados == 4){
                    Score = Score + 100;
                }
                this.alive = false;

                Animations.add(this.x, this.y, (this.lados-3));
                return true;	
            }   




            //bullet collision
            var bx;
            var by;
            for (var i=0; i < 4; i++) {
                bx = Ammunition.bullets[i].x;
                by = Ammunition.bullets[i].y;
                var distanceB = Math.sqrt( (bx-this.x)*(bx-this.x) + (by-this.y)*(by-this.y) );
                if (distanceB < this.radius & this.alive & Ammunition.bullets[i].alive){
                    if (this.lados == 6){
                        Score = Score + 20;
                    }
                    if (this.lados == 5){
                        Score = Score + 50;
                    }
                    if (this.lados == 4){
                        Score = Score + 100;
                    }
                    this.alive = false;
                    Ammunition.bullets[i].explode();
                    Animations.add(this.x, this.y, (this.lados-3));
                    return true;
                    }
                }
                return false;
            }

    }  



    function Bullet () {
        this.x = 0;
        this.y = 0;
        this.angle = 0;
        this.speed = 0;
        this.steps = 0;
        this.alive = false;

        this.set = function (x,y,angle) {
            this.x = x;
            this.y = y;
            this.angle = angle;
            this.speed = 2.5 + Math.sqrt(Ship.speedx*Ship.speedx + Ship.speedy*Ship.speedy);
            this.alive = true;
            this.steps = 0;
        }

        this.explode = function (){
            this.alive = false;
        }


        this.move = function () {
            if (this.alive){
                this.x = this.x + this.speed*Math.cos(this.angle);
                this.y = this.y + this.speed*Math.sin(this.angle);

                //check bordes
                this.x = reallocateX(this.x);
                this.y = reallocateY(this.y);

                this.steps++;
            }
        }

        this.paint = function () {
            if (this.alive){
                cc.beginPath();
                cc.lineWidth=1;
                cc.strokeStyle="black";
                cc.arc(this.x,this.y,4,0,2*Math.PI);
                cc.fillStyle ="white";
                cc.fill();
                cc.stroke();
            }
        }

    } 



    var Asteroids = {
    
        hexagons: [],
        pentagons: [],
        squares: [],
        nHexagons: 4,
        nPentagons: 0,
        nSquares: 0,
        dead: 0,

        reset: function (n) { 
            this.hexagons.splice(0,this.nHexagons);
            this.pentagons.splice(0,this.nPentagons);
            this.squares.splice(0,this.nSquares);

            this.nHexagons = n;
            this.nPentagons = 0;
            this.nSquares = 0;
        },

        initialize: function(){
            var rx;
            var ry;
            var ra;
            this.nPentagons = 0;
            this.nSquares = 0;
            for (var i=0; i < this.nHexagons; i++) {
                rx = Math.floor((Math.random() * 400) + -200);
                ry = Math.floor((Math.random() * 300) + -150);
                ra = Math.floor((Math.random() * 4))*( Math.floor((Math.random() * 50)+100)/2);
                this.hexagons.push(new Poligon(rx,ry,ra,6));
            }
        }, 

        move: function(){
            for (var i=0; i < this.nHexagons; i++) {
                this.hexagons[i].move();
            }
            for (var i=0; i < this.nPentagons; i++) {
                this.pentagons[i].move();
            }
            for (var i=0; i < this.nSquares; i++) {
                this.squares[i].move();
            }
        },

        paint: function(){
            for (var i=0; i < this.nHexagons; i++) {
                this.hexagons[i].paint();
            }
            for (var i=0; i < this.nPentagons; i++) {
                this.pentagons[i].paint();
            }
            for (var i=0; i < this.nSquares; i++) {
                this.squares[i].paint();
            }
        },

        check: function(){
            for (var i=0; i < this.nHexagons; i++) {
                if (this.hexagons[i].checkCollision()){
                    if (Ship.lives < 1){
                        endGame();
                    }else{
                        soundEffects.asteroidPlay();
                        this.nPentagons = this.nPentagons +2;
                        var x = this.hexagons[i].x;
                        var y = this.hexagons[i].y;
                        var ra = Math.floor((Math.random() * 50)+100)/100;
                        this.pentagons.push(new Poligon(x,y,ra,5));
                        this.pentagons.push(new Poligon(x,y,ra*2,5));
                    }
                }
            }

            for (var i=0; i < this.nPentagons; i++) {
                if (this.pentagons[i].checkCollision()){
                    if (Ship.lives < 1){
                        endGame();
                    }else{
                        soundEffects.asteroidPlay();
                        this.nSquares = this.nSquares +2;
                        var x = this.pentagons[i].x;
                        var y = this.pentagons[i].y;
                        var ra = Math.floor((Math.random() * 50)+100)/100;
                        this.squares.push(new Poligon(x,y,ra,4));
                        this.squares.push(new Poligon(x,y,ra*2,4));
                    }
                }
            }

            for (var i=0; i < this.nSquares; i++) {
                if (this.squares[i].checkCollision()){
                    if (Ship.lives < 1){
                        endGame();
                    }else{
                        soundEffects.asteroidPlay();
                    }
                }
            } 
        },

        levelCheck: function(){
            var total = this.nHexagons * 4;
            var count = 0;
            for (var i=0; i < this.nSquares; i++) {
                if (! this.squares[i].alive){
                    count++;
                }
            }
            this.dead = count;
            if (total == count){
                nextLevel();
            }
        }

    }



    var Ammunition = {
        bullets: [], //there are 4 entries
        duration: 150,


        initialize: function(){
            for (var i=0; i < 4; i++) {
            this.bullets.push(new Bullet());
            }
        }, 

        add: function(x,y,angle){
            if (Ship.lives > 0){
                for (var i=0; i < 4; i++) {
                    if (! this.bullets[i].alive){
                        this.bullets[i].set(x,y,angle);
                        soundEffects.laserPlay();
                        break;
                    }
                }
            }
        },

        move: function(){
            for (var i=0; i < 4; i++) {
                this.bullets[i].move();
                if (this.bullets[i].steps > this.duration) {
                    this.bullets[i].explode();
                }
            }
        },

        paint: function(){
            for (var i=0; i < 4; i++) {
                this.bullets[i].paint();
            }
        },

    }



    function endGame(){
        Messages.end();
        resetGame.start();
    }



    var resetGame = {

        record: 0,
        ended: false,

        start: function(){
            this.record = Time;
            this.ended = true;
        },

        reset: function(){
            if (this.ended){
                if (this.record + 600 > Time){
                    //I hide the Ship while game is restarting
                    Ship.x = 10000;
                    Ship.y = 10000;

                }else{
                    Level = 1
                    //Ship reset
                    Ship.lives = 3;
                    Ship.x = 400;
                    Ship.y = 300;
                    Ship.angle = 4.7;
                    Ship.speedx = 0;
                    Ship.speedy = 0;
                    Ship.steps = 301;
                    Ship.visible = true;
                    Ship.invencible = false;
                    //Score reset
                    Score = 0;
                    //Asteroids reset
                    Asteroids.reset(4);
                    Asteroids.initialize();
                    this.ended = false;
                }
            }
        },


    }



    var Messages = {
        
        record: 0,
        level: false, 
        over: false,

        next: function(n) {
            this.record = Time;
            this.level = true;
        }, 

        end: function(n) {
            this.record = Time;
            this.over = true;
        }, 

        represent: function(){
            if (this.level) {
                if (this.record+360 > Time){
                    cc.font = '80px Courier';
                    cc.fillText("Level "+Level, 250, 280);
                }else{
                    this.level = false;
                }
            }

            if (this.over) {
                if (this.record+600 > Time){
                    cc.font = '80px Courier';
                    cc.fillText("GAME OVER", 190, 280);
                    cc.font = '40px Courier';
                    cc.fillText("Your score: "+Score, 250, 350);
                    cc.fillText("Best score: "+BestScore, 250, 390);
                    cc.font = '30px Courier';
                    cc.fillText("Game will restart in 5 seconds", 130, 480);
                }else{
                    this.over = false;
                }
            }
        },

    }



    function nextLevel(){
        Messages.next(Level);
        Level++;
        //Ship reset
        Ship.x = 400;
        Ship.y = 300;
        Ship.angle = 4.7;
        Ship.speedx = 0;
        Ship.speedy = 0;
        //Asteroids reset
        Asteroids.reset(Level+3);
        Asteroids.initialize();
    }



    var Ship = {
        lives: 3,
        x: 400,
        y: 300,
        steps: 301, //to not start blinking
        visible: true,
        invencible: false,
        angle: 4.7,
        speedy: 0,
        speedx: 0,
        angleplus: false,
        angleless: false,
        accelerate: false,

        die: function (){
            soundEffects.shipPlay();
            this.lives--;
            if (this.lives ==0) {
                //hay que ir arriba y salir de la branch
            }else{
                this.steps = 0;
                this.visible = true;
                this.invencible = true;
                this.x = 400;
                this.y = 300;
                this.angle = 4.7;
                this.speedx = 0;
                this.speedy = 0;
            }
        },


        fire: function(){
            Ammunition.add(20*Math.cos(this.angle) + this.x, 20*Math.sin(this.angle)+this.y, this.angle);
        },

        paint: function(){
            var esquina=2.2;

            if (this.visible){

                cc.beginPath();
                cc.lineWidth=5;
                cc.strokeStyle="white";
                var c1x = 30*Math.cos(this.angle) + this.x;
                var c1y = 30*Math.sin(this.angle)+this.y;
                var c2x = 25*Math.cos(this.angle+esquina) + this.x;
                var c2y = 25*Math.sin(this.angle+esquina)+this.y;
                var c3x = 25*Math.cos(this.angle-esquina) + this.x;
                var c3y = 25*Math.sin(this.angle-esquina)+this.y;

                cc.moveTo(15*Math.cos(this.angle+esquina) + this.x, 15*Math.sin(this.angle+esquina)+this.y);
                cc.lineTo(20*Math.cos(this.angle) + this.x, 20*Math.sin(this.angle)+this.y);
                cc.lineTo(15*Math.cos(this.angle-esquina) + this.x, 15*Math.sin(this.angle-esquina)+this.y);
                cc.lineTo(-7*Math.cos(this.angle) + this.x, 7*Math.sin(-this.angle)+this.y);
                cc.lineTo(15*Math.cos(this.angle+esquina) + this.x, 15*Math.sin(this.angle+esquina)+this.y);
                cc.lineTo(20*Math.cos(this.angle) + this.x, 20*Math.sin(this.angle)+this.y);
                cc.stroke();

                /*Debugging
                cc.beginPath();
                cc.lineWidth=1;
                cc.strokeStyle="red";
                cc.arc(this.x,this.y,16,0,2*Math.PI);
                cc.arc(c1x,c1y,1,0,2*Math.PI);
                cc.arc(c2x,c2y,1,0,2*Math.PI);
                cc.arc(c3x,c3y,1,0,2*Math.PI);
                cc.stroke();*/

                var redcorner = 2.7;
                var redradius = 13;

                if (this.accelerate) {
                    cc.beginPath();
                    cc.lineWidth=5;
                    cc.strokeStyle="orangered";
                    cc.moveTo(redradius*Math.cos(this.angle+redcorner) + this.x, redradius*Math.sin(this.angle+redcorner)+this.y);
                    cc.lineTo(-22*Math.cos(this.angle) + this.x, 22*Math.sin(-this.angle)+this.y);
                    cc.lineTo(redradius*Math.cos(this.angle-redcorner) + this.x, redradius*Math.sin(this.angle-redcorner)+this.y);
                    cc.stroke();
                    }
                }
            if (this.steps < 300){
                if (this.steps % 25 == 0){
                    this.visible = ! this.visible;
                }
            }else{
                this.invencible = false;
                this.visible = true;
            }
        },


        move: function(){
            var masxspeed = 3;
            var accelerationrate = 0.02;

            this.steps++;

            //rotate
            if (this.angleplus){
                this.angle = this.angle + 0.05; 
            }
            if (this.angleless){
                this.angle = this.angle - 0.05; 
            }

            //change speed vector
            if (this.accelerate){

                this.speedx = this.speedx + Math.cos(this.angle)*accelerationrate;
                if (this.speedx>masxspeed){
                    this.speedx = masxspeed;
                }
                if (this.speedx<-masxspeed){
                    this.speedx = -masxspeed;
                }

                this.speedy = this.speedy + Math.sin(this.angle)*accelerationrate;
                if (this.speedy>masxspeed){
                this.speedy = masxspeed;
                }
                if (this.speedy<-masxspeed){
                this.speedy = -masxspeed;
                }
            }

            //move
            this.x = this.x + this.speedx;
            this.y = this.y + this.speedy;

            //check bordes
            this.x = reallocateX(this.x);
            this.y = reallocateY(this.y);
        },

    }



    function Spark (x,y,angle,speed) {
        this.x = x;
        this.y = y;
        this.angle = angle;
        this.speed = speed;

        this.move = function () {
            this.x = this.x + this.speed*Math.cos(this.angle);
            this.y = this.y + this.speed*Math.sin(this.angle);

            //check bordes
            this.x = reallocateX(this.x);
            this.y = reallocateY(this.y);

            this.steps++;
        }

        this.paint = function () {
            cc.beginPath();
            cc.lineWidth=1;
            cc.strokeStyle="black";
            cc.arc(this.x,this.y,4,0,2*Math.PI);
            cc.fillStyle ="white";
            cc.fill();
            cc.stroke();    
        }

    } 



    function Explosion (x,y,radius) {
        this.x = x;
        this.y = y;
        this.nSparks = 3+ 2*radius;
        this.sparks = [];
        this.steps = 0;
        this.maxSteps = 20; //40
        this.speed = radius;
        this.angle = 6.28 / this.nSparks;
        for (var i=0; i < this.nSparks; i++) {
            this.sparks.push( new Spark (this.x, this.y, this.angle*i, this.speed));
        }


        this.represent = function(){
            this.steps++;
            if (this.steps > this.maxSteps) {
                this.sparks.splice(0,this.nSparks);
                this.nSparks = 0;
            }
            for (var i=0; i < this.nSparks; i++) {
                this.sparks[i].move();
                this.sparks[i].paint();
            }
        } 

    }
 


    var Animations = {
        explosions: [],
        nExplosions: 0,

        add: function(x,y,radius){
            this.explosions.push( new Explosion (x, y, radius) );
            this.nExplosions++;
        },

        represent: function(){
            for (var i=0; i < this.nExplosions; i++) {
                this.explosions[i].represent();
            }
        },

    }



    function checkScore () {
        if (Score > BestScore){
            BestScore = Score;
        }

    }


    //GLOBAL VARIABLES
    var Time = 0;
    var Level = 1;
    var Score = 0;
    var BestScore = 0;



    function update() {
        Time++;
        showBoard();

        Ship.move();
        Ship.paint();

        Animations.represent();

        Asteroids.move();
        Asteroids.paint();
        Asteroids.check();
        Asteroids.levelCheck();

        Ammunition.move();
        Ammunition.paint();

        Messages.represent();

        checkScore();

        resetGame.reset();
    }

