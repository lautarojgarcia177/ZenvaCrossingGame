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
  ctx.fillStyle = player.color;
  ctx.beginPath();
  ctx.arc(xPosition+50,yPosition+300,20,0,2*Math.PI);
  ctx.fill();
  ctx.lineWidth=4;
  ctx.stroke();
}

document.addEventListener("keydown",function(event){
  let keyPressed = event.keyCode;
  if(keyPressed==39) {
    player.speed = player.maxSpeed;
  }
  if(keyPressed==37) {
    player.speed = -player.maxSpeed;
  }
});

document.addEventListener("keyup",function(event) {
  player.speed = 0;
});

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

class Player extends GameCharacter {
  constructor(x,y,width=50,height=50,color="blue",speed=0) {
    super(x,y,width,height,color,speed);
    this.maxSpeed = 4;    
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

var checkCollisions = function(rect1,rect2) {
  var xOverlap = Math.abs(rect1.x - rect2.x)
    <= Math.max(rect1.width,rect2.width);
  var yOverlap = Math.abs(rect1.y - rect2.y)
    <= Math.max(rect1.height,rect2.height);
    return xOverlap && yOverlap;
}

var enemies = [
  new Enemy(200,50,50,50,"red",2),
  new Enemy(400,50+400,50,50,"red",2),
  new Enemy(600,50,50,50,"red",2)
];

let player = new Player(50,300);

var update = function() {
  player.moveHorizontally();

  enemies.forEach(function(element){
    if(checkCollisions(player,element)) {
      alert("Collision detected");
    }
    element.moveVertically();
  });
}

var draw = function() {
  ctx.clearRect(0,0,screenWidth,screenHeight);

  drawHouse(700,95);
  //dibujar player en cudradito
  ctx.fillStyle=player.color;
  ctx.fillRect(player.x,player.y,player.width,player.height);

  enemies.forEach(function(element){
    ctx.fillStyle=element.color;
    ctx.fillRect(element.x,element.y,element.width,element.height);
  });
}



step();
