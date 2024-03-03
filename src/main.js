import { Block } from "./Block.js";
import { Hook } from "./Hook.js";
import { Sky } from "./Sky.js";
import { Base } from "./Base.js";
import { detectCollision } from "./utils.js";

const btStart = document.querySelector(".start-button");
const titleStart = document.querySelector(".start-top");
const cStart = document.querySelector(".start");
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

btStart.addEventListener("click", start);
document.addEventListener("mousedown", mouseDown);

const backgroundImg = new Image();
const imgHook = new Image();
const imgRope = new Image();
const imgBlock = new Image();

backgroundImg.src = "../assets/background.png";
imgHook.src = "../assets/hook.png";
imgRope.src = "../assets/rope.png";
imgBlock.src = "../assets/block.png";
canvas.width = backgroundImg.width;
canvas.height = backgroundImg.height;

const hook = new Hook(ctx, imgHook, -66, 0, imgHook.width, imgHook.height);
let block = new Block(
    ctx,
    imgBlock,
    hook.getX() - 36,
    122,
    imgBlock.width,
    imgBlock.height
);
const sky = new Sky(ctx, 0, 0, canvas.width, canvas.height);
const base = new Base(ctx, 150, 215, 128, 60);

let bgY = 0;
let yDown = 0;
let moveDownInit = 150;
let score = 0;
let blocks = [];


const states = {
    ready: false,
    play: false,
    gameover: false,
};

function start() {
    console.log("click");
    btStart.classList.add("slideBottom");
    titleStart.classList.add("slideTop");
    setTimeout(function () {
        cStart.style.display = "none";
        states.ready = true;
    }, 950);
}

function mouseDown() {
    if (!block.isColliding && (states.ready || states.play)) {
        if(!block.inScene)return
        block.isDown = true;
        hook.hasItem = false
    }
}

function backgroundDown() {
    if (yDown <= moveDownInit) {
        bgY += 1;
        sky.moveY();
        base.moveY();
        if (score > 0) {
            blocks.forEach((block) => block.moveY());
        }
        yDown++;
    }
}

function createBlock() {
    block = new Block(
        ctx,
        imgBlock,
        -102,
        122,
        imgBlock.width,
        imgBlock.height
    );
}
function collisionBase() {
    if (score === 0) {
        if (detectCollision(block, base)) {
            block.isDown = false;
            blocks.push(block);
            createBlock();
            states.play = true;
            states.ready = false;
            yDown = 0;
            moveDownInit = 120;
            score++;
        }
    }
}

function blockOutScene(){
    if(block.getY()>canvas.height){
        createBlock()
    }
}
function collisionsBlock() {
    block.setIsColliding(false)
    if (detectCollision(block, blocks.at(-1))) {
        if (block.getX() > blocks.at(-1).getX() + blocks.at(-1).getWidth() * 0.5) {
            block.pointRotation = blocks.at(-1).getX() + blocks.at(-1).getWidth()
            block.isRotating = true
            block.clockWise = true
        } else if (block.getX() + block.getWidth() * 0.5 < blocks.at(-1).getX()) {
            block.pointRotation = blocks.at(-1).getX()
            block.isRotating = true
            block.clockWise = false
        }
        else {
            block.isRotating = false
            block.isDown = false
            block.setVelX(0)
            blocks.push(block)
            createBlock()
            yDown = 0;
            moveDownInit = 70;
            score++
        }
        block.setIsColliding(true)
    }
}

function changeStates() {
    if (states.ready) {
        if (hook.getX() < 200) {
            hook.setVelX(2);
            block.setVelX(2);
        } else {
            hook.setVelX(0);
            block.setVelX(0);
        }
        backgroundDown();
    } else if (states.play) {
        backgroundDown();
    }
}
function moveHookBlock(){
    if(block.getX()+block.getWidth() >= canvas.width || block.getX() < 0){
        hook.velX*=-1
        block.velX*=-1
    }
}
function hookBlock(){
    if(!states.play) return
    if(hook.hasItem){
        if(block.inScene){
            moveHookBlock()
        }else{
            hook.setVelX(3);
            block.setVelX(3);

        }
    }
    
}

function drawBackgrounds() {
    sky.draw();
    ctx.drawImage(backgroundImg, 0, bgY, canvas.width, canvas.height);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBackgrounds();

    base.draw();
    hook.draw(imgRope);
    blocks.forEach((block) => block.draw());
    block.draw();
}

function update() {
    blockOutScene()
    hookBlock()
    collisionsBlock() 
    collisionBase();
    changeStates();
    hook.update();
    block.update();
}

function gameloop() {
    update();
    draw();
    requestAnimationFrame(gameloop);
}

gameloop();
