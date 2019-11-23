

  var mySound;

      window.onload = ()=> {
        c = document.getElementById('gc');
        cc = c.getContext('2d');
        cc.font = '40px Arial';
        setInterval(update, 10);
        mySound = new sound("bounce.mp3");
        mySound.play();
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
            this.sound.stop();
        }
      }

      function pintatablero(){
        cc.fillStyle = 'black';
        cc.fillRect(0, 0, c.width, c.height);
        cc.stroke();
        cc.lineWidth="10";
        cc.strokeStyle='indigo';
        cc.rect(0,0,c.width, c.height);
        cc.stroke();
        cc.fillStyle = 'white';
        cc.fillRect(c.width/2-1, 43, 1, c.height-48);
      }





      function pintacirculo(x,y,r){

        cc.beginPath();
        cc.arc(x, y, r, 0, 2 * Math.PI, false);
        cc.fillStyle = 'indigo';
        cc.fill();

      }

      i=0;
      function update() {
        pintatablero();
        i=i+1
        t=i/100;
        length=Number(L.value);
        //w=3.14;
        w = Math.sqrt(9000/length);
        A=0.5;
        tita = A*Math.sin(w*t);
        length=length/10;
        centerx=225;
        centery=40;
        x=centerx+length*Math.sin(tita);
        y=centery+length*Math.cos(tita);
        yc=centery+(length+20)*Math.cos(tita);
        xc=centerx+(length+20)*Math.sin(tita);

        xp=centerx-30*Math.sin(tita);
        yp=centery-30*Math.cos(tita);
        cc.lineWidth="3";
        cc.beginPath();
        cc.moveTo(xp,yp);
        cc.lineTo(xc,yc);
        cc.stroke();
        pintacirculo(xc,yc,13);
      //  pintacirculo(xp,yp,13);
        if(xc>224 && xc<226){
          mySound.play();
        }

        cc.fillStyle = 'white';
        cc.font = '30px Verdana';
        cc.fillText("T: "+(3.1415*2/w).toFixed(2)+"s", 13, 40);

        pintacirculo(0,0,0);
      }


