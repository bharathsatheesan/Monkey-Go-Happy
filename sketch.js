var monkey , monkey_running, monkey_collided;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score = 0;
var survivalTime = 0;
var ground, ground_Image;
var Play = 1;
var Over = 0;
var Gamestate = Play;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  monkey_collided =            loadAnimation("sprite_0.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  ground_Image = loadImage("platform_002.png");
}



function setup() {
  createCanvas(600,600);
  
  monkey = createSprite(50,300);
  monkey.addAnimation("running", monkey_running);
  monkey.addAnimation("collided", monkey_collided);
  monkey.scale = 0.15;
  
  ground = createSprite(300, 900, 400, 100)
  ground.addImage("platform", ground_Image);
  ground.scale = 4.5;
  ground.x = ground.width/2;
  
  FoodGroup = new Group();
  obstacleGroup = new Group();
  
  //monkey.debug = true;
  monkey.setCollider("circle", 0, 0, 275);
  
}


function draw() {
  background("#87ceeb");
  if(Gamestate === Play){
      ground.velocityX = -2;

      stroke("black");
      textSize = 20;
      fill("white");
      text("Score: " + score, 500, 50);

      stroke("black");
      textSize = 20;
      fill("black");
      text("Time survived: " + survivalTime, 50, 50);
      survivalTime = Math.round(Math.ceil(frameCount/frameRate()));

      if(ground.x === 50){
        ground.x = ground.width/2;
      }

      if(keyDown("up") && monkey.y >= 290){
        monkey.velocityY = -14;
      }
      monkey.velocityY = monkey.velocityY + 0.6;
      monkey.collide(ground);
       
      if(frameCount%80 === 0){
        food();
      }
      if(frameCount%300 === 0){
        obstacles();
      }
    
      if(monkey.isTouching(FoodGroup)){
        FoodGroup.destroyEach();
        score += 1;
      }
  }
  
  if(obstacleGroup.isTouching(monkey)){
    Gamestate = Over;
  }
  
  if(Gamestate === Over){
      obstacleGroup.setVelocityXEach(0);
      FoodGroup.setVelocityXEach(0);
      ground.velocityX = 0;

      obstacleGroup.setLifetimeEach(-1);
      FoodGroup.destroyEach();

      monkey.collide(ground);
      monkey.velocityY = monkey.velocityY + 0.6;
      monkey.changeAnimation("collided", monkey_collided);
       
      fill("black");
      textSize = 30;
      text("Game Over! Press 's' to restart", 250, 250);
      stroke("black");
      textSize = 20;
      fill("white");
      text("Score: " + score, 500, 50);

      stroke("black");
      textSize = 20;
      fill("black");
      text("Time survived: " + survivalTime, 50, 50);
    
      if(keyDown("s") && Gamestate === Over){
        score = 0;
        survivalTime = 0;
        
        Gamestate = Play;
        obstacleGroup.destroyEach();
        monkey.changeAnimation("running",monkey_running);
      }
  }
  
  drawSprites();
  
}

function food(){
  var food = createSprite(600,200,10,10);
  food.addImage(bananaImage);
  food.scale = 0.1;
  food.velocityX = -5;
  food.y = Math.round(random(120,200));
  food.lifetime = 300;
  
  FoodGroup.add(food);
}

function obstacles(){
  var obstacles = createSprite(600,320,10,10);
  obstacles.addImage(obstacleImage);
  obstacles.scale = 0.18;
  obstacles.velocityX = -6;
  obstacles.lifetime = 300;
  obstacles.setCollider("circle", 0, 0, 200);
  
  obstacleGroup.add(obstacles);
}