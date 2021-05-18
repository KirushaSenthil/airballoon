var cityImage, balloonSprite, balloonImage
var database;
var position;


function preload(){
cityImage=loadImage("cityImage.png")
balloonImage=loadAnimation("HotAirBallon-01.png","HotAirBallon-02.png","HotAirBallon-03.png")
}
function setup() {
  createCanvas(500,500);
  balloonSprite=createSprite(400, 200, 50, 50);
  balloonSprite.addAnimation("balloon",balloonImage)
  balloonSprite.scale=0.5
  database=firebase.database();
    console.log(database)
    var listener=database.ref('balloonSprite/position')
    listener.on("value",readPosition,showError)
}

function draw() {
  background(cityImage); 
  textSize(10)
  text("use arrow keys to move hot air balloon",50,100)
  
  if(keyDown(LEFT_ARROW)){
    balloonSprite.x=balloonSprite.x-10;
  } 
  else if(keyDown(RIGHT_ARROW)){
    balloonSprite.x=balloonSprite.x+10;
  }
  else if(keyDown(UP_ARROW)){
    balloonSprite.y=balloonSprite.y-10;
  }
  else if(keyDown(DOWN_ARROW)){
    balloonSprite.y=balloonSprite.y+10;
  }
  if(keyDown(UP_ARROW)){
    updateHeight(0,-10);
    balloonSprite.addAnimation("balloon",balloonImage);
    balloonSprite.scale=balloonSprite.scale-0.01;
  }
  if(keyDown(DOWN_ARROW)){
    updateHeight(0,+10);
    balloonSprite.addAnimation("balloon",balloonImage)
    balloonSprite.scale=balloonSprite.scale+0.01
  }
  drawSprites();
}
function changePosition(x,y){
  database.ref('balloonSprite/position').set({
      x:position.x+x,
      y:position.y+y
  })
}

function showError(){
  console.log("error")
}

function readPosition(data){
  position=data.val()
  ball.x=position.x
  ball.y=position.y
}

function updateHeight(x,y){
  database.ref('balloonSprite/height').set({
    'x': height.x+x,
    'y': height.y+y
  })
}

function readPosition(data){
  height=data.val();
  balloonSprite.x = height.x;
  balloonSprite.y = height.y;
}