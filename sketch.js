const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Render = Matter.Render;
var hero1;
var hero2;
var plant1;
var plant2;
var score=0;
var keypadsound;
var obstaclesGroup;
var gameState=0;
var gameover;
var gameoverimg;
var enemy;
var win;
var winimg;
var hill;
var loosingsound;
var winningsound;


function preload(){
  hero2=loadImage("HERO1.webp")
  plant2=loadImage("medicine.webp")
  //keypadsound=loadSound("jump.mp3")
  gameoverimg=loadImage("GAMEOVER.webp")
  enemy=loadImage("virusimg1.svg")
  winimg=loadImage("win.png")
  hill=loadImage("hill.webp")
  loosingsound=loadSound("losing sound.wav")
  winningsound=loadSound("winsound1.wav")
}
function setup() {
  createCanvas(displayWidth-100,displayHeight-120);
  //createSprite(400, 200, 50, 50);
  hero1=createSprite(displayWidth/6,displayHeight/2,20,20)
  hero1.scale=0.1
  hero1.addImage(hero2)       
  plant1=createSprite(1100,320,20,20) 
  plant1.addImage(plant2)
  plant1.scale=0.15
  obstaclesGroup=new Group()
  gameover=createSprite(600,330,50,50)  
  gameover.addImage(gameoverimg)  

  
}

function draw() {
  background(hill); 
  

  
  if(gameState===0){
   
    if(keyDown(UP_ARROW)){    
      hero1.y= hero1.y - 6
      //keypadsound.play()
    }
    if(keyDown(DOWN_ARROW)){
      hero1.y= hero1.y + 6
      //keypadsound.play()
    }
    if(keyDown(LEFT_ARROW)){
      hero1.x= hero1.x - 6
      
     // keypadsound.play()
    }
    if(keyDown(RIGHT_ARROW)){
      hero1.x= hero1.x + 6
      //keypadsound.play()
    }
    spawnObstacles()
    textSize(15)
    fill("red")
    text("MOVE THE HERO WITH THE 4 ARROW KEYS",430,100)

    if(hero1.isTouching(plant1)){
      score = score + Math.round(getFrameRate()/60);
      plant1.x= random(30, displayWidth-30)
      plant1.y= random(30, displayHeight-30)
      
    }

    if(hero1.isTouching(obstaclesGroup)){
      gameState=1
      loosingsound.play()
    }

    if(score===3){
      obstaclesGroup.destroyEach()
      hero1.visible=false;
      plant1.visible=false;
      win=createSprite(600,300,50,50)
      win.addImage(winimg)
      win.scale=2.5
      //winningsound.play()
      if(keyDown("L")){
        gameState=0;
        hero1.x=displayWidth/6
        hero1.y=displayHeight/2
        plant1.x=1100
        plant1.y=300
        
        
      }
      
      //winningsound.play()

    }

    gameover.visible=false;
    hero1.visible=true;
    plant1.visible=true;
    
    
    
  }
  else if (gameState===1){
    //obstaclesGroup.velocityX=6
    //obstaclesGroup.velocityY=0
      background("white"); 
      obstaclesGroup.destroyEach();
      plant1.visible=false;
      hero1.visible=false;
      score=0;
      fill("green")
      stroke("yellow")
      textSize(50)
      text("PRESS R TO RESTART",350,50)
      gameover.visible=true;
      gameover.scale=1.5;
      
     // gameover.scale=2.2
     if(keyDown("R")){
       gameState=0;
       hero1.x=displayWidth/6
       hero1.y=displayHeight/2
       plant1.x=1100
       plant1.y=300
       
     }
  }

       textSize(20)
       fill("orange")
       stroke("yellow")
       text("Score: "+ score, 520,85);
  
  drawSprites();
}
function spawnObstacles(){
  if(frameCount%65 ===0){
      var obstacle=createSprite(displayWidth,random(50, displayHeight-50),20,20)
      obstacle.addImage(enemy)
      obstacle.scale=0.15
      obstacle.velocityX=random(-10,-15)
      obstacle.velocityY=random(-2,2)
      obstacle.lifetime=displayWidth/obstacle.velocityX
      obstaclesGroup.add(obstacle)
   }

}