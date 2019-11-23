

    var end = false;
    var btamaño=gc.width/3;
    var turno = Math.random() < 0.5;  //true O false X

    // 0 para vacio
    // 1 para o
    // 2 para x
    var tablero = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0]
        ];


    var posicionX = "";
    var posicionY = "";

    window.onload = ()=> {
      c = document.getElementById('gc');
      cc = c.getContext('2d');
      cc.font = '40px Arial';
      setInterval(update, 1000/30);
      c.addEventListener('mousemove', movemouse);
      c.addEventListener('mousedown', clickado);


    }


    function movemouse(evt){
      cc.fillStyle = 'red';


      x=evt.pageX-parseInt(c.offsetLeft, 10);
      y=evt.pageY-parseInt(c.offsetTop, 10);
      /*Debugging
      cc.fillStyle = 'white';
      cc.font = '15px Arial';
      cc.fillText("X :"+x, 13, 20);
      cc.fillText("Y :"+y, 13, 40);
      */

      if(y<c.height/3){
        posicionY=0;
      }
      if(y>c.height/3 && y<c.height*2/3){
        posicionY=1;
      }
      if(y>c.height*2/3 && y<c.height){
        posicionY=2;
      }
      if(x<c.width/3){
        posicionX=0;
      }
      if(x>c.width/3 && x<c.width*2/3){
        posicionX=1;
      }
      if(x>c.width*2/3 && x<c.width){
        posicionX=2;
      }

    }


    function pintatablero(){
      cc.fillStyle = 'black';
      cc.fillRect(0, 0, c.width, c.height);
      cc.fillStyle = 'white';
      cc.fillRect(c.width/3-2, 10, 5, c.height-20);
      cc.fillRect(c.width*2/3-2, 10, 5, c.height-20);
      cc.fillRect(10,c.width/3-2, c.width-20,5);
      cc.fillRect(10,c.width*2/3-2, c.width-20,5);
      /*Debugging
      cc.fillStyle = 'white';
      cc.font = '15px Arial';
      cc.fillText("turno: "+turno, 13, 20);
      */
    }

    function pintafichas(){
      for (var i=0; i<3; i++){
        for (var j=0; j<3; j++){
          if(tablero[i][j]==1){
            pintacirculos(i,j,"white");
          }
          if(tablero[i][j]==2){
            pintacruces(i,j,"white");
          }
        }
      }
    }

    function pintacirculos(i,j,color){
      cc.lineWidth="5";
      cc.strokeStyle=color;
      cc.beginPath();
      cc.arc(j*btamaño+(btamaño/2),i*btamaño+(btamaño/2),btamaño/2.5,0,2*Math.PI);
      cc.stroke();

    }

    function pintacruces(i,j,color){
      cc.lineWidth="5";
      cc.strokeStyle=color;
      bordes=20;
      cc.beginPath();
      cc.moveTo(j*btamaño+bordes,i*btamaño+bordes);
      cc.lineTo(j*btamaño+(btamaño-bordes),i*btamaño+(btamaño-bordes));
      cc.moveTo(j*btamaño+(btamaño-bordes),i*btamaño+bordes);
      cc.lineTo(j*btamaño+bordes,i*btamaño+(btamaño-bordes));
      cc.stroke();

    }

    function clickado(){
      if(tablero[posicionY][posicionX]==0 && !end){
          if(turno){
            tablero[posicionY][posicionX]=1;
          }
          else{
            tablero[posicionY][posicionX]=2;
          }
          turno = !turno;
        }
      }

    function pintacursor(){
        if (turno){
          pintacirculos(posicionY,posicionX,"red");
        }else{
          pintacruces(posicionY,posicionX,"red");
        }
      }

    function checkwin(){
       //vertical
        for (var i=0; i<3; i++){
          if (tablero[0][i]*tablero[1][i]*tablero[2][i]==1){
            executewin(0,i,2,i,1);
            return;
          }
          if (tablero[0][i]*tablero[1][i]*tablero[2][i]==8){
            executewin(0,i,2,i,2);
            return;
          }
        }
        //horizontal
        for (var i=0; i<3; i++){
          if (tablero[i][0]*tablero[i][1]*tablero[i][2]==1){
            executewin(i,0,i,2,1);
            return;
          }
          if (tablero[i][0]*tablero[i][1]*tablero[i][2]==8){
            executewin(i,0,i,2,2);
            return;
          }
        }

        //win like /
        if (tablero[2][0]*tablero[1][1]*tablero[0][2]==1){
          executewin(2,0,0,2,1);
          return;
        }
        if (tablero[2][0]*tablero[1][1]*tablero[0][2]==8){
          executewin(2,0,0,2,2);
          return;
        }

        //win like \
        if (tablero[0][0]*tablero[1][1]*tablero[2][2]==1){
          executewin(0,0,2,2,1);
          return;
        }
        if (tablero[0][0]*tablero[1][1]*tablero[2][2]==8){
          executewin(0,0,2,2,2);
          return;
        }

        if (checkempate(tablero)){
          executetie();
          return;
        }

      }

    function checkempate(b){
      if (b[0][0]*b[0][1]*b[0][2] *b[1][0]*b[1][1]*b[1][2] *b[2][0]*b[2][1]*b[2][2]){
        return true;
      }
      else{
        return false;
      }
    }

    function executewin(i1,j1,i2,j2,winner){
        end=true;
        pintawon(i1,j1,i2,j2,winner);
      }

    function executetie(){
      end=true;
      pintatie();
    }

    function pintawon(i1,j1,i2,j2,winner){
        cc.lineWidth="10";
        cc.strokeStyle="blue";
        bordes=20;
        cc.beginPath();
        cc.moveTo(j1*btamaño+(btamaño/2),i1*btamaño+(btamaño/2));
        cc.lineTo(j2*btamaño+(btamaño/2),i2*btamaño+(btamaño/2));
        cc.stroke();
        cc.fillStyle = 'green';
        cc.font = '40px Impact';
        cc.fillText("PLAYER "+winner+" WINS", 110, 218);
        cc.font = 'bold 20px Arial';
        cc.fillText("Refresh page (F5) to restart", 92, 248);
      }

    function pintatie(){
      cc.fillStyle = 'green';
      cc.font = '70px Impact';
      cc.fillText("WE HAVE A TIE", 35, 230);
      cc.font = 'bold 20px Arial';
      cc.fillText("Refresh page (F5) to restart", 92, 260);
    }

    function update() {
      pintatablero();
      pintafichas();
      pintacursor();
      checkwin();
    }

