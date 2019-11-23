

    var sliderPopulation = document.getElementById("sliderPopulation");
    var outputPopulation = document.getElementById("demoPopulation");
    outputPopulation.innerHTML = sliderPopulation.value;

    sliderPopulation.oninput = function() {
      outputPopulation.innerHTML = this.value;
    }

    var sliderMutation = document.getElementById("sliderMutation");
    var outputMutation = document.getElementById("demoMutation");
    outputMutation.innerHTML = sliderMutation.value;

    sliderMutation.oninput = function() {
      outputMutation.innerHTML = this.value/10;
    }

    var sliderParents = document.getElementById("sliderParents");
    var outputParents = document.getElementById("demoParents");
    outputParents.innerHTML = sliderParents.value;

    sliderParents.oninput = function() {
      outputParents.innerHTML = this.value;
    }



    window.onload = ()=> {
      c = document.getElementById('gc');
      cc = c.getContext('2d');
      cc.font = '40px Arial';
      setInterval(update, 1000/200);
      outputMutation.innerHTML = 2;
    //  c.addEventListener('mousemove', movemouse);
    //  c.addEventListener('mousedown', clickado);
    }


    function pintaMapa(){
      cc.fillStyle = 'Darkgrey';
      cc.fillRect(0, 0, 750, 750);
      for (var j=0; j < 150; j++) {
        var i;
        if ((j % 2)==0) {
          i = 1;
        }
        else {
          i = 0;
        }
        for (i; i < 150; i=i+2) {
          pintaCuadro(j,i,'gainsboro');
        }
        pintaGoal();
        pintaObstacle();
      }

      cc.fillStyle = 'black';
      cc.font = '30px Arial';
      cc.fillText("Generation :"+ population.generation, 20, 40);
      cc.fillText("Steps :"+ population.dots[0].nsteps, 20, 80);

    }

    function pintaCuadro (x,y,color){
      cc.fillStyle = color;
      cc.fillRect(x*5, y*5, 5, 5);
    }

    function pintaGoal (){
      pintaCuadro(goal.x,goal.y,goal.nuccolor);
      pintaCuadro(goal.x+1,goal.y,goal.color);
      pintaCuadro(goal.x,goal.y+1,goal.color);
      pintaCuadro(goal.x-1,goal.y,goal.color);
      pintaCuadro(goal.x,goal.y-1,goal.color);
    }

    function pintaObstacle (){
      cc.fillStyle = obstacle.color;
      cc.fillRect(obstacle.x*5, obstacle.y*5, obstacle.size*5, obstacle.size*5);
    }

    function randArray(size) {
        var myArray = [];
        for (var i=0; i < size; i++) {
          myArray[i] = Math.floor((Math.random() * 3) + -1);
        }
        return myArray;
      }


    function cloneBrain(paste,copy){
      for (var i=0; i < paste.maxsteps; i++) {
      paste.brain.stepx[i] = copy.brain.stepx[i];
      paste.brain.stepy[i] = copy.brain.stepy[i];
      }
    }



    function Brain(size) {
      this.stepx = randArray(size);
      this.stepy = randArray(size);
    }

    function WallCollision(dot){
      if (dot.x==149 || dot.x==0 ){
        dot.alive=false;
      }
      if (dot.y==149 || dot.y==0 ){
        dot.alive=false;
      }
    }

    function ObstacleCollision(dot){
      if(dot.x == obstacle.x & obstacle.y<=dot.y & dot.y<(obstacle.y+obstacle.size)){
        dot.alive=false;
      }
      if(dot.x == (obstacle.x+obstacle.size-1) & obstacle.y<=dot.y & dot.y<(obstacle.y+obstacle.size)){
        dot.alive=false;
      }
      if(dot.y == obstacle.y & obstacle.x<=dot.x & dot.x<=(obstacle.x+obstacle.size)){
        dot.alive=false;
      }
      if(dot.y == (obstacle.y+obstacle.size-1) & obstacle.x<=dot.x & dot.x<(obstacle.x+obstacle.size)){
        dot.alive=false;
      }
    }



    function Obstacle (size, x, y) {
      this.size = size;
      this.x = x;
      this.y = y;
      this.color = 'black';
    }

    var obstacle = new Obstacle(50,40,30);



    function Dot (maxsteps) {
      this.x = 20;
      this.y = 130;
      this.fitness = 0;
      this.alive = true;
      this.achivement = false;
      this.color = 'blue';
      this.maxsteps = maxsteps;
      this.nsteps = 1;
      this.brain = new Brain(this.maxsteps);

      this.move = function () {
        if (this.nsteps<this.maxsteps & this.alive & !this.achivement) {
          this.x = this.x + this.brain.stepx[this.nsteps];
          this.y = this.y + this.brain.stepy[this.nsteps];
          this.nsteps++;
        }

        if(this.nsteps==this.maxsteps){
          this.alive=false;
        }

        WallCollision(this);
        ObstacleCollision(this);

        if (this.y==goal.y & this.x==goal.x ){
          this.achivement=true;
        }

      }

      this.show = function () {
        pintaCuadro (this.x, this.y, this.color);
      }

      this.calcFitness = function () {
        this.fitness =  1/((goal.x-this.x)*(goal.x-this.x) + (goal.y-this.y)*(goal.y-this.y));
      }

    }

    var goal = {x: 140, y: 10, color: 'green', nuccolor: 'lightgreen'};

    function reTrain() {
      population.generation = 1;
      population.erase();
      population.n = sliderPopulation.value;
      population.mutPercent = sliderMutation.value;
      population.nparents = sliderParents.value;
      population.initialize();
    }

    var population = {
      generation: 1,
      n: 200,
      steps: 400,
      dots: [],
      nparents: 5,
      mutPercent: 20,


      erase: function(){
        for (var i = 0; i < this.n; i++)
        this.dots.pop();
      },

      initialize: function(){
        for (var i = 0; i < this.n; i++)
          this.dots.push(new Dot(this.steps))
      },

      move: function(){
        for (var i=0; i < this.n; i++) {
          this.dots[i].move();
        }
      },

      show: function(){
        for (var i=this.n-1; i > -1; i--) {
          if(i<this.nparents & this.generation>1){
            this.dots[i].color = 'red';
          }
          this.dots[i].show();
        }
      },

      calcFitness: function(){
        for (var i=0; i < this.n; i++) {
          this.dots[i].calcFitness();
        }
      },

      allDead: function(){
        for (var i=0; i < this.n; i++) {
          if (this.dots[i].alive & !this.dots[i].achivement){
            return false;
          }else{
            return true;
          }
        }
      },

      tournamentSelection: function(){
        var newDots = [];
        //var winners = [this.dots[0], this.dots[0], this.dots[0]];
        var winners = [];
        for (var i = 0; i < this.nparents; i++)
          winners.push(new Dot(this.steps))


        for (var i=0; i < this.nparents; i++) {
          for (var j=1; j<this.n; j++){
            if (this.dots[j].fitness>winners[i].fitness ){
              winners[i] = this.dots[j];
            }
          }
          winners[i].fitness = 0;
        }


        for (var i = 0; i < this.n; i++)
          this.dots.pop();

        for (var i = 0; i < this.n; i++){
          var newdot = new Dot(this.steps);
          cloneBrain(newdot, winners[i % this.nparents]);
          this.dots.push(newdot);
        }

     },

     mutation: function(){
       for (var i = 10; i < this.n; i++){
         for (var j = 0; j < this.steps; j++){
           if (Math.floor((Math.random() * (1000/this.mutPercent)))==1){
             this.dots[i].brain.stepx[j] = Math.floor((Math.random() * 3) - 1);

           }
          if (Math.floor((Math.random() * (1000/this.mutPercent)))==1){
            this.dots[i].brain.stepy[j] = Math.floor((Math.random() * 3) - 1);
          }
        }
      }
    }


    }


    var generation = 1;


   population.initialize();

    function update() {
      pintaMapa();
      if (population.allDead()==true){
        population.generation++;
        population.calcFitness();
        population.tournamentSelection();
        population.mutation();
      }

      population.move();
      population.show();
    }

