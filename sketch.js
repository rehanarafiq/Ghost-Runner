var tower, towerImg;
var doors, doorsImg, doorsGroup;
var climber, climberImg, climberGroup;
var ghost, ghostImg;
var invisible, invisbleGroup;
var gameState = "PLAY";
var sound;

function preload() {
  towerImg = loadImage("tower.png");
  doorsImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  sound = loadSound("spooky.wav");

  doorsGroup = new Group();
  climberGroup = new Group();
  invisibleGroup = new Group();
}

function setup() {
  createCanvas(600, 600);

  tower = createSprite(300, 300);
  tower.addImage("tower", towerImg);
  tower.velocityY = 1;

  ghost = createSprite(200, 200, 50, 50);
  ghost.scale = 0.3;
  ghost.addImage("ghost", ghostImg);
}

function draw() {
  background(0);

  if (gameState === "PLAY") {

    sound.loop();

    if (tower.y > 400) {
      tower.y = 300;
    }

    if (keyDown("space")) {
      ghost.velocityY = -5;
    }

    if (keyDown("left_arrow")) {
      ghost.x = ghost.x - 3;
    }

    if (keyDown("right_arrow")) {
      ghost.x = ghost.x + 3;
    }

    ghost.velocityY = ghost.velocityY + 0.8;

    if (climberGroup.isTouching(ghost)) {
      ghost.velocityY = 0;
    }

    if (invisibleGroup.isTouching(ghost) || ghost.y > 600) {
      ghost.destroy();
      gameState = "END";
    }

    spawnDoors();

    drawSprites();
  }
  if (gameState === "END") {
    stroke("Yellow");
    fill("Yellow");

    textSize(30);
    text("Game Over", 230, 250);
  }
}

function spawnDoors() {
  if (frameCount % 240 === 0) {
    doors = createSprite(200, -50);
    doors.addImage("door", doorsImg);

    climber = createSprite(200, 10);
    climber.addImage("climber", climberImg);

    invisible = createSprite(200, 15);
    invisible.width = climber.width;
    invisible.height = 2;

    doors.x = Math.round(random(120, 400));
    climber.x = doors.x;
    invisible.x = doors.x;

    doors.velocityY = 1;
    climber.velocityY = 1;
    invisible.velocityY = 1;

    doors.lifetime = 800;
    climber.lifetime = 800;

    doorsGroup.add(doors);
    climberGroup.add(climber);
    invisibleGroup.add(invisible);

    ghost.depth = doors.depth;
    ghost.depth = ghost.depth + 1;

    invisible.debug = true;
  }
}