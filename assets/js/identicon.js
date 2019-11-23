var array = [[],[],[],[],[]];
var colors = ['#C0392B','#E74C3C','#9B59B6','#8E44AD','#2980B9','#3498DB','#1ABC9C','#27AE60','#16A085','#F4D03F','#F39C12','#E67E22','#D35400','#BDC3C7','#95A5A6','#2C3E50'];
var c;
var cc;


window.onload = ()=> {
  c=document.getElementById("mcanvas");
  cc=c.getContext("2d");
  generateFromWord();
}


function generateFromWord () {
  palabra = document.getElementById("inputText").value ;
  generateIcon(palabra);

}


function generateRandom () {
  palabra =  Math.random().toString(36).substring(2, 9) + Math.random().toString(36).substring(2, 9);
  generateIcon(palabra);
  document.getElementById("inputText").value = palabra;

}


function generateIcon (palabra) {

  cc.fillStyle = 'white';
  cc.fillRect(0, 0, 200, 200);

  if (!palabra) 
    palabra = "Albert"

  hasheado = hash(palabra);

  var bitarray = [];

  for(var i = 0; i < 32; ++i){
    bitarray[i] = (hasheado >> i) & 1;
  }

  for (var j = 0; j < 5; j++){
    for (var i = 0; i < 5; i++) {
      array[j][i] = bitarray[(4*i)+j];
    }
  }

  color = colors[hasheado % (colors.length-1)]

  if (document.getElementById("myCheck").checked){
    iconPaintQuad(array, color);
  }else{
    iconPaintRow(array, color);
  }
  
  /* cc.fillStyle = 'black';
  cc.font = '10px Arial';
  cc.fillText("Input :"+ palabra, 20, 20);
  cc.fillText("Hash :"+ hasheado, 20, 40);
  cc.fillText("Arr :"+ bitarray, 20, 60); */

}


function hash(s) {
    /* Simple hash function. */
    var a = 1, c = 0, h, o;
    if (s) {
        a = 0;
        /*jshint plusplus:false bitwise:false*/
        for (h = s.length - 1; h >= 0; h--) {
            o = s.charCodeAt(h);
            a = (a<<6&268435455) + o + (o<<14);
            c = a & 266338304;
            a = c!==0?a^c>>21:a;
        }
    }
    return String(a);
};

function iconPaintQuad( array, color) {

  cc.fillStyle = color;
  
  for(var j = 0; j < 5; j++){
    for (var i = 0; i < 5; i++) {
      if (array[i][j])
        cc.fillRect(20*j, i*20, 20, 20);
    }
  }


  for(var j = 0; j < 5; j++){
    for (var i = 0; i < 5; i++) {
      if (array[i][j])
        cc.fillRect(180-20*j, i*20, 20, 20);
    }
  }

  for(var j = 0; j < 5; j++){
    for (var i = 0; i < 5; i++) {
      if (array[i][j])
        cc.fillRect(20*j, 180-i*20, 20, 20);
    }
  }


  for(var j = 0; j < 5; j++){
    for (var i = 0; i < 5; i++) {
      if (array[i][j])
        cc.fillRect(180-20*j, 180-i*20, 20, 20);
    }
  }

   

}

function iconPaintRow( array, color) {

  cc.fillStyle = color;
  
  for(var j = 0; j < 3; j++){
    for (var i = 0; i < 5; i++) {
      if (array[j][i])
        cc.fillRect(40*j, i*40, 40, 40);
    }
  }

  for(var j = 0; j < 3; j++){
    for (var i = 0; i < 5; i++) {
      if (array[j][i])
        cc.fillRect(160-(40*j), i*40, 40, 40);
    }
  }  

}


function download_image(){
  var canvas = document.getElementById("mcanvas");
  image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
  var link = document.createElement('a');
  link.download = document.getElementById("inputText").value+"_identicon.png";
  link.href = image;
  link.click();
}