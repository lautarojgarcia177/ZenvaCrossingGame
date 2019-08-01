const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let screenWidth = 1000;
let screenHeight = 600;

var step = function() {
  update();
  draw();

  window.requestAnimationFrame(step)
    ;
}

function drawHouse(xPosition=0,yPosition=0) {
  // Set line width
ctx.lineWidth = 10;

// Wall
ctx.strokeRect(xPosition+75,yPosition+ 140, 150, 110);

// Door
ctx.fillStyle="black";
ctx.fillRect(xPosition+130,yPosition+ 190, 40, 60);

// Roof
ctx.moveTo(xPosition+50,yPosition+ 140);
ctx.lineTo(xPosition+150,yPosition+60);
ctx.lineTo(xPosition+250,yPosition+140);
ctx.closePath();
ctx.stroke();
}

function dibujarRectangulo(xPosition=0,yPosition=0) {
  ctx.fillStyle = 'red';
  ctx.fillRect(xPosition+0,yPosition+0, 150, 100);
}

function dibujarPlayer(xPosition=0,yPosition=0) {
  ctx.fillStyle = 'blue';
  ctx.beginPath();
  ctx.arc(xPosition+50,yPosition+300,20,0,2*Math.PI);
  ctx.fill();
  ctx.lineWidth=4;
  ctx.stroke();
}

document.onkeydown = function(event) {
  let keypressed = event.keyCode;
  if (keyPressed == 39) {
    moverPlayer("right");
  }
}

class GameCharacter {
  constructor(x,y,width,height,color,speed) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.speed = speed;
  }
  moveHorizontally() {
    if(this.x > screenHeight -100) {
      this.speed = -this.speed;
    }
    this.x += this.speed;
  }
  moveVertically() {
    if((this.y > screenHeight -100) || (this.y < 50)) {
      this.speed = -this.speed;
    }
    this.y += this.speed;
  }
}

class Enemy extends GameCharacter {
  constructor(x,y,width=50,height=50,color="red",speed=2) {
    super(x,y,width,height,color,speed);
  }
}

var rectangle = new GameCharacter(
    50,50,50,50,"rbg(0,0,255)"
);

var enemies = [
  new Enemy(200,50,50,50,"red",2),
  new Enemy(400,50+400,50,50,"red",2),
  new Enemy(600,50,50,50,"red",2)
];

var update = function() {
  enemies.forEach(function(element){
    element.moveVertically();
  });
}

var draw = function() {
  ctx.clearRect(0,0,screenWidth,screenHeight);

  drawHouse(700,95);
  dibujarPlayer();
  enemies.forEach(function(element){
    ctx.fillStyle=element.color;
    ctx.fillRect(element.x,element.y,element.width,element.height);
  });
}



step();
