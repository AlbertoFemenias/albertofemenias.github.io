

	var length = 5;
	var amp = 10;
	var speed = 1;
	var rainbow = false;
	var colours = ['royalblue', 'white', 'forestgreen', 'yellow', 'red', 'darkviolet', 'turquoise', 'orange', 'springgreen'];



	window.onload = ()=> {
		c = document.getElementById('gc');
		cc = c.getContext('2d');
		cc.font = '20px Arial';
		setInterval(update, 10); //10 miliseconds is the minimum
		centerY = c.height/2;
		centerX = c.width/2;
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
		amp = Number(Szoom.value);
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
		visible: Number(SstarL.value),
		stars: [],

		initialize: function(){
			for (var i=0; i < this.n; i++) {
				this.stars.push(new Star());
			}
		}, 

		draw : function() {
			for (var i=0; i < this.visible; i++) {
				if (document.getElementById("myCheck").checked){
	            	this.stars[i].draw(colours[i % colours.length]);
				}else{
					this.stars[i].draw('white');
				}
	        }
		},

		update : function() {
			for (var i=0; i < this.n; i++) {
	            this.stars[i].update(Number(Sspeed.value)/10);
	        }
		}
	};


	Galaxy.initialize();
	


	function update() {

		cc.fillStyle = 'black';
		cc.fillRect(0, 0, c.width, c.height);

		Galaxy.draw();
		Galaxy.update();

	}
