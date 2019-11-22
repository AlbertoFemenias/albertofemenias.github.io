


    window.onload = ()=> {
      c = document.getElementById('gc');
      cc = c.getContext('2d');
      cc.font = '40px Arial';
      setInterval(update, 1000/30);
    }



    
    function segment (x0, y0, length, angle){
      cc.strokeStyle = 'rgb(0,128,20)';;
      cc.lineWidth="2";
      cc.beginPath();
      cc.moveTo(x0,y0);
      cc.lineTo(x0+length*Math.cos(angle*Math.PI/180),y0+length*Math.sin(angle*Math.PI/180));
      cc.closePath();
      cc.stroke();
    }


    function pintatablero(){
      cc.fillStyle = 'black';
      cc.fillRect(0, 0, c.width, c.height);
      cc.stroke();
      cc.lineWidth="10";
      cc.strokeStyle='rgb(0,128,20)';
      cc.rect(0,0,c.width, c.height);
      cc.stroke();
    }

    function pintavalores(){
      cc.fillStyle = 'white';
      cc.font = '15px Arial';
      cc.fillText("Angle: "+String(angle.value)+"º", 13, 20);
      cc.fillText("Size: "+String(long.value)+"px", 13, 40);
      cc.fillText("Step: "+String(step.value)+"%", 13, 60);
      cc.fillText("Depth: "+String(depth.value), 13, 80);
    }

    function buildtree (x,y,length, angle, depth, anglestep, lenstep){
      var xf,yf,newDepth = 3;
      segment(x,y,length ,angle);
      xf=x+length*Math.cos(angle*Math.PI/180);
      yf=y+length*Math.sin(angle*Math.PI/180);

      newDepth = depth - 1;
      if(newDepth < 1) {
        return;
      }

        buildtree(xf,yf,length*lenstep,angle-anglestep, newDepth, anglestep, lenstep);
        buildtree(xf,yf,length*lenstep,angle+anglestep, newDepth, anglestep, lenstep);

    }

    function update() {
      gc.height = 450 + 50*board.value;
      gc.width = 450 + 30*board.value;
      pintatablero();
      buildtree(gc.width/2,gc.height-10,long.value,-90,Number(depth.value),Number(angle.value), 0.01*Number(step.value));
      pintavalores();
      segment (0,0,0,0);
    }


