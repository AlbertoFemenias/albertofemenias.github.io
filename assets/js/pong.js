

  var p1y = 40;
  var p2y = 40;
  var p1yLast = 40;
  var p2yLast = 40;
  var pthick = 8;
  var pheight = 100;
  var ballx =  50;
  var bally = 50;
  var balld = 8;
  var xvel = 6;
  var yvel = 6;
  var score1 = 0;
  var score2 = 0;
  var aiSpeed = 6;

  window.onload = ()=> {
    c = document.getElementById('gc');
    cc = c.getContext('2d');
    cc.font = '20px Arial';
    setInterval(update, 1000/60);
    c.addEventListener('mousemove', (e)=> {
      p1y = e.clientY-pheight/2 - parseInt(c.offsetTop, 10);
    });
  }

  //When the ball scores the loser player has to serve
  function reset() {
    ballx = c.width/2;
    bally = c.height/2 -150;
    yvel = 3;
  }

  function update() {

    //Move the ball
    ballx += xvel;
    bally += yvel;

    //Top and bottom bouncing
    if (bally < 0 && yvel < 0) {
      yvel = -yvel;
    }
    if (bally > c.height && yvel > 0) {
      yvel = -yvel;
    }


    //Calculate inertia of p1 racquet
    inertiaY = (p1y - p1yLast) * 0.2;
    p1yLast = p1y;

    // Ball bouncing off left side (paddle or wall)
    if (ballx < 0) {
      if (bally > p1y && bally < p1y + pheight) {
        xvel = -xvel;
        yvel = yvel + inertiaY; //add inertia for effect
      } else {
        score2++;
        reset();
      }
    }

    //Calculate inertia of p2 racquet 
    //as speed is constant for y, a random rang makes things more interesting
    inertiaY = (p2y - p2yLast) * ((Math.random() * 0.5) + 0.1);
    p2yLast = p2y;

    // Ball bouncing off right side
    if (ballx > c.width) {
      if (bally > p2y && bally < p2y + pheight) {
        xvel = -xvel;
        yvel = yvel + inertiaY;
      } else {
        score1++;
        reset();
      }
    }

    // AI movement
    if (p2y+pheight/2 < bally || p2y+pheight/2 < bally+10) {
      p2y += aiSpeed;
    }
    if (p2y+pheight/2 > bally || p2y+pheight/2 > bally-10) {
      p2y -= aiSpeed;
    }



    //REPRESENT
    // Background
    cc.fillStyle = 'black';
    cc.fillRect(0, 0, c.width, c.height);
    //Middle line
    cc.fillStyle = 'white';
    cc.fillRect(c.width/2, 0, 5, c.height);

    // Ball
    cc.fillRect(ballx-balld/2, bally-balld/2, balld, balld);

    // Paddle 1
    //cc.fillStyle = 'cyan';
    cc.fillRect(0, p1y, pthick, pheight);

    // Paddle 2
    //cc.fillStyle = 'lime';
    cc.fillRect(c.width-pthick, p2y, pthick, pheight);
    
    // Scores
    cc.font = '80px Impact';
    cc.fillText(score1, 150, 100);
    cc.fillText(score2, c.width-220, 100);

  }

