var knife, knifeImage, knifeSound;

var fruit1, fruit2, fruit3, fruit4, monsterImage;

var fruitGroup, enemyGroup;

var play = 1;
var end = 0;
var gameState = play;

var score;

var gameOver, gameOverImage, gameOverSound;

var position;

var monsterCollided;

function preload() {
  knifeImage = loadImage("sword.png");
  knifeSound = loadSound("knifesound.mp3");
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  monsterImage = loadAnimation("alien1.png","alien2.png");
  gameOverImage = loadImage("gameover.png");
  gameOverSound = loadSound("gameover.mp3");
  monsterCollided = loadAnimation("alien1.png");
}

function setup() {
  createCanvas(500, 500);
  knife = createSprite(250, 250, 10, 10);
  knife.addImage("image",knifeImage);
  knife.scale = 0.5;
  
  fruitGroup = new Group();
  enemyGroup = new Group();
  
  score = 0;
  
  gameOver = createSprite(250, 150, 20, 20);
  gameOver.addImage("image",gameOverImage);
}
function draw() {
  background("white");
  
  fill("red");
  textSize(18);
  text("Score : "+score, 400, 50);
  
  if (gameState == play) {
    knife.x = World.mouseX;
    knife.y = World.mouseY;
    gameOver.visible = false;
    fruits();
    enemy();
    if (knife.isTouching(fruitGroup)) {
      fruitGroup.destroyEach();
      knifeSound.play();
      score = score+1;
    }
  
    if (knife.isTouching(enemyGroup)) {
      gameState = end;
      gameOverSound.play();
    }
  }
  
  if (gameState == end) {
    fruitGroup.setLifetimeEach(-1);
    enemyGroup.setLifetimeEach(-1);
    fruitGroup.setVelocityXEach(0);
    enemyGroup.setVelocityXEach(0);
    gameOver.visible = true;
    enemyGroup.changeAnimation("collided",monsterCollided);
  }
  
  drawSprites();
}

function fruits() {
  if (World.frameCount%80 == 0) {
    fruit=createSprite(400, 200, 20, 20);
    fruit.scale = 0.5;
    r=Math.round(random(1,4));
    if (r == 1) {
      fruit.addImage(fruit1);
    } else if (r == 2) {
      fruit.addImage(fruit2); 
    } else if (r == 3) {
    fruit.addImage(fruit3);
    } else {
      fruit.addImage(fruit4);
    }
    
    fruit.y=Math.round(random(50,340));
    
    fruit.velocityX = -(7+3*score/5);
    fruit.scale = 0.25;
    fruit.lifetime = 100;
    
    position = Math.round(random(1,2));
  
    switch(position) {
      case 1:
          fruit.x = 400;
          fruit.velocityX = -(5+(score/4));
          break;
      case 2:
          fruit.x = 0;
          fruit.velocityX = (5+(score/4));
          break;
      default:
          break;
    }
    
    fruitGroup.add(fruit);
  }
}

function enemy() {
  if (World.frameCount%200 == 0) {
    var monster = createSprite(400, 200, 20, 20);
    monster.addAnimation("moving",monsterImage);
    monster.addAnimation("collided", monsterCollided);
    monster.y=Math.round(random(100,300));
    monster.velocityX = -(6+3*score/5);
    monster.lifetime = 50;
    monster.setCollider("circle", 0, 0 ,20);
    monster.scale = 0.6;
    
    enemyGroup.add(monster);
  }
}