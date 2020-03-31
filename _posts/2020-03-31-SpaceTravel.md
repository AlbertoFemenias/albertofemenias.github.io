---
layout: post
title: Space Travel Animation
minidesc: Awesome animation that you can tweak
thumbnail: icon_spacetravel.png
tags: [Misc, Animation, Wallpaper, Artistic]
---

There is no better distraction these quarantine days than to stare at my awesome Space Travel Animation.
By tweaking the slider you can end up with very different and cool results.

**Instructions:** You can add colors, change speed, zoom, length and number of stars. Enjoy!

<br> 

<div align="center">
<canvas id="gc" width="640" height="480"></canvas>
<br>
<input type="range" min="50" max="2000" value="500" class="nstars" id="nstars">
<input type="range" min="2" max="30" value="5" class="SstarL" id="SstarL">
<input type="range" min="5" max="25" value="10" class="Szoom" id="Szoom">
<input type="range" min="1" max="50" value="10" class="Sspeed" id="Sspeed">
<br>
<br>
<form>
  <input type="radio" name="color" id="colourfull">Color
  <input type="radio" name="color" id="white" checked>White
</form>


<script type="text/javascript">

	c = document.getElementById('gc');
	centerY = c.height/2;
	centerX = c.width/2;
	var length = 5;
	var amp = 10;
	var speed = 1;
	var rainbow = false;
	var colours = ['royalblue', 'white', 'forestgreen', 'yellow', 'red', 'darkviolet', 'turquoise', 'orange', 'springgreen'];



	window.onload = ()=> {
		cc = c.getContext('2d');
		cc.font = '20px Arial';
		setInterval(update, 10); //10 miliseconds is the minimum
	}

	SstarL.oninput = function() {
		length = Number(this.value);
	}
	Szoom.oninput = function() {
		amp = Number(this.value);
	}
	Sspeed.oninput = function() {
		speed = Number(this.value)/10;
	}
	colourfull.oninput = function() {
		rainbow = true;
	}
	white.oninput = function() {
		rainbow = false;
	}



	function drawLineAng(angleA, angleB, radius, colour){
		x1 = Math.cos(angleA)*radius*Math.sin(angleB);
		y1 = Math.sin(angleA)*radius*Math.sin(angleB);
		z = Math.cos(angleB)*radius;
		segment = length + z/(20*radius/20);
		cc.lineWidth = 2;
		x2 = Math.cos(angleA)*(radius+segment)*Math.sin(angleB);
		y2 = Math.sin(angleA)*(radius+segment)*Math.sin(angleB);
		cc.strokeStyle = colour;
		cc.beginPath();
		cc.moveTo(centerX + x1*amp, centerY + y1*amp);
		cc.lineTo(centerX + x2*amp, centerY + y2*amp);
		cc.stroke();
	}



	class Star {

		angleA = Math.random()*Math.PI*2;
		angleB = 0.1 * Math.random();//Math.random()*Math.PI/8 + 0.1;
		maxRadius = 1700;
		radius = Math.random()*this.maxRadius;
		//colour = 'white';

		draw(colour) {
			drawLineAng(this.angleA, this.angleB, this.radius, colour);;
		}

		update(speed) {
			this.radius = this.radius + speed;
			if (this.radius > this.maxRadius) {
				this.reset();
			}
		}

		reset () {
			this.radius = Math.random()*40+5;
			this.angleA = Math.random()*Math.PI*2;
		}
	}


	var Galaxy = {
		n: 2000,
		visible: 500,
		stars: [],

		initialize: function(){
			for (var i=0; i < this.n; i++) {
				this.stars.push(new Star());
			}
		}, 

		draw : function() {
			for (var i=0; i < this.visible; i++) {
				if (rainbow){
	            	this.stars[i].draw(colours[i % colours.length]);
				}else{
					this.stars[i].draw('white');
				}
	        }
		},

		update : function() {
			for (var i=0; i < this.n; i++) {
	            this.stars[i].update(speed);
	        }
		}
	};


	Galaxy.initialize();
	
	nstars.oninput = function() {
		Galaxy.visible = this.value;
	}


	function update() {

		cc.fillStyle = 'black';
		cc.fillRect(0, 0, c.width, c.height);

		Galaxy.draw();
		Galaxy.update();

	}

</script>﻿

</div>
