import { Block } from "./Block.js";
import { Hook } from "./Hook.js";
import { Sky } from "./Sky.js";
import { Base } from "./Base.js";
import { detectCollision } from "./utils.js";
import { Cloud } from "./Cloud.js";
const pCheck = document.querySelector(".p-check")
const btStart = document.querySelector(".start-button");
const btGameOver = document.querySelector(".gameover-button");
const titleStart = document.querySelector(".start-top");
const cStart = document.querySelector(".start");
const txtCupon = document.querySelector(".msn-cupon");
const cGameOver = document.querySelector(".gameover");
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

btStart.addEventListener("click", start);
btGameOver.addEventListener("click", again);
document.addEventListener("mousedown", mouseDown);
document.addEventListener("touchstart", mouseDown);

const backgroundImg = new Image();
const imgHook = new Image();

const imgBlock = new Image();
const imgBlockP = new Image();

const imgHeart = new Image();
const imgPatron = new Image();

backgroundImg.src = "https://tiendamic.com/gamification/mic/game-tower-blocks/assets/background.png";
imgHook.src = "https://tiendamic.com/gamification/mic/game-tower-blocks/assets/hook.gif";
imgBlock.src = "https://tiendamic.com/gamification/mic/game-tower-blocks/assets/block.png";
imgHeart.src = "https://tiendamic.com/gamification/mic/game-tower-blocks/assets/heart.png";
imgPatron.src = "https://tiendamic.com/gamification/mic/game-tower-blocks/assets/bgame.png";
imgBlockP.src = "https://tiendamic.com/gamification/mic/game-tower-blocks/assets/blockp.png";
canvas.width = backgroundImg.width;
canvas.height = backgroundImg.height;

let hook = new Hook(ctx, -100, 0, imgHook.width, imgHook.height);
let block = new Block(ctx, imgBlock, hook.getX(), 122, 100, imgBlock.height);

let sky = new Sky(ctx, 0, -600, 450, 1200);
let base = new Base(ctx, 175, 332, 100, 60);

let bgY = 0;
let yDown = 0;
let moveDownInit = 100;
let score = 0;
let prevScore = 0;
let blocks = [];
let clouds = [];
let stones = [];
let zigZag = true;
let interval;
let velHookBlock = 6;
let lives = 3;
let direction = 0.4;
let timeDirection = 10;

export let states = {
    ready: false,
    play: false,
    gameover: false,
};

function start() {
    btStart.classList.add("slideBottom");
    titleStart.classList.add("slideTop");
    setTimeout(function () {
        cStart.style.display = "none";
        states.ready = true;
    }, 950);
}

function mouseDown() {
    if (!block.isColliding && (states.ready || states.play)) {
        if (!block.inScene) return;
        block.isDown = true;
        hook.hasItem = false;
    }
}

function backgroundDown() {
    if (yDown <= moveDownInit) {
        bgY += 2;
        sky.moveY();
        base.moveY();
        clouds.forEach((item) => item.moveY());
        stones.forEach((item) => item.moveY());

        if (score > 0) {
            blocks.forEach((block) => block.moveY());
        }
        yDown += 2;
    }
}

function createBlock() {
    block = new Block(
        ctx,
        imgBlock,
        -100,
        122,
        imgBlock.width,
        imgBlock.height
    );
}
function collisionBase() {
    if (score === 0) {
        if (block.y + 66 >= 426) {
            block.isDown = false;
            blocks.push(block);
            createBlock();
            states.play = true;
            states.ready = false;
            yDown = 0;
            moveDownInit = 80;
            score++;
        }
    }
}

function blockOutScene() {
    if (states.ready || states.play) {
        // if(block.isDown && (block.isRotating || block.isColliding)){
        if (block.getY() > canvas.height) {
            createBlock();
            lives--;
        }
        // }
    }
}

function numRandom(min, max) {
    return Math.random() * (max - min) + min;
}

function movementZigZag() {
    if (score >= 5) {
        let time = 0;
        interval = setInterval(() => {
            for (let i = 0; i < blocks.length; i++) {
                blocks[i].setVelX(direction);
                blocks[i].moveX();
            }
            time++;
            if (time >= 60) {
                direction *= -1;
                time = 0;
            }
        }, timeDirection);
        zigZag = false;
    }
}
function collisionsBlock() {
    block.setIsColliding(false);

    if (detectCollision(block, blocks.at(-1))) {
        if (
            block.getX() >
            blocks.at(-1).getX() + blocks.at(-1).getWidth() * 0.5
        ) {
            block.pointRotation =
                blocks.at(-1).getX() + blocks.at(-1).getWidth();
            block.isRotating = true;
            block.clockWise = true;
        } else if (
            block.getX() + block.getWidth() * 0.5 <
            blocks.at(-1).getX()
        ) {
            block.pointRotation = blocks.at(-1).getX();
            block.isRotating = true;
            block.clockWise = false;
        } else {
            if (!block.isColliding && !block.isRotating) {
                blockPerfect();
                block.isRotating = false;
                block.isDown = false;
                block.setVelX(0);
                blocks.push(block);

                createBlock();
                yDown = 0;
                moveDownInit = 64;
                score++;
            }
        }
        block.setIsColliding(true);
    }
}
function blockPerfect() {
    if (Math.abs(block.getX() - blocks.at(-1).getX()) <= 10) {
        block.img = imgBlockP;
        block.setX(blocks.at(-1).getX());
    }
}
function levels() {
    if (prevScore != score) {
        velHookBlock += score * 0.01;
        if (score > 5) {
            direction += score * (direction > 0 ? 0.001 : -0.001);
        }
        prevScore = score;
    }
}

function scoreAndLives() {
    if (states.play || states.ready) {
        var font = new FontFace("golden", "url(../fonts/golden.ttf)");
        ctx.font = "32px golden";
        ctx.fillStyle = "#fff92e";
    
        ctx.shadowColor = "#fff92e"; 

        
        ctx.shadowOffsetX = 0; 

        ctx.shadowOffsetY = 0; 
        ctx.shadowBlur = 10; 
        ctx.fillText(score, 16, 36);

        ctx.font = "32px golden";
        ctx.fillStyle = "#ef8903";
        
        ctx.shadowColor = "#ef8903"; 
        
        
        ctx.shadowOffsetX = 0; 
        
        ctx.shadowOffsetY = 0; 
        ctx.shadowBlur = 10; 
        ctx.fillText(lives, 365, 36);
        ctx.drawImage(imgHeart, 390, 6, 40, 40);
    }
}
function changeStates() {
    if (states.ready) {
        if (hook.getX() < 172.5) {
            hook.setVelX(4);
            block.setVelX(4);
        } else {
            hook.setVelX(0);
            block.setVelX(0);
        }
        backgroundDown();
    } else if (states.play) {
        backgroundDown();
        sky.update();
    }
}
function moveHookBlock() {
    if (block.isRotating) return;
    if (block.getX() + block.getWidth() >= canvas.width || block.getX() < 0) {
        hook.velX *= -1;
        block.velX *= -1;
    }
}
function hookBlock() {
    if (!states.play) return;
    if (hook.hasItem) {
        if (block.inScene) {
            if (block.isRotating) return;
            moveHookBlock();
        } else {
            hook.setVelX(velHookBlock);
            block.setVelX(velHookBlock);
        }
    }
}
function createClouds() {
    let velClouds = [0.4, -0.4, 0.2, -0.2, 0.6, -0.6];
    const imgCloud1 = new Image();
    const imgCloud2 = new Image();
    const imgCloud3 = new Image();
    imgCloud1.src = "https://tiendamic.com/gamification/mic/game-tower-blocks/assets/gr1.png";
    imgCloud2.src = "https://tiendamic.com/gamification/mic/game-tower-blocks/assets/gr2.png";
    imgCloud3.src = "https://tiendamic.com/gamification/mic/game-tower-blocks/assets/gr3.png";
    const cloudsSrc = [
        imgCloud1,
        imgCloud2,
        imgCloud3
    ];
    for (let i = 0; i < 20; i++) {
        clouds[i] = new Cloud(
            ctx,
            cloudsSrc[parseInt(numRandom(0, 3))],
            numRandom(-30, 330),
            numRandom(-5000, 150),
            180,
            180,
            velClouds[parseInt(numRandom(0, 6))],
            canvas
        );
    }
}

function drawBackgrounds() {
    canvas.width = backgroundImg.width;
    canvas.height = backgroundImg.height;
    sky.draw(imgPatron);
    //ctx.drawImage(imgPatron, 0, 0, canvas.width, canvas.height);
    clouds.forEach((item) => item.draw());
    // stones.forEach((item) => item.draw());
    ctx.drawImage(backgroundImg, 0, bgY, canvas.width, canvas.height);
}

function gameOver() {
    if (lives === 0) {
        states.gameover = true;
        document.removeEventListener("mousedown", mouseDown);
        document.removeEventListener("touchstart", mouseDown);
        if (score <= 10) {
            txtCupon.textContent = "SHIPGAMER";
        } else if (score <= 20) {
            txtCupon.textContent = "5PLAYER";
        } else {
            txtCupon.textContent = "WINNER10";
        }
        cGameOver.style.display = "flex";
    } else {
        cGameOver.style.display = "none";
    }
    if (states.gameover) {
        let btCopy = document.querySelector(".content-cupon");
        btCopy.addEventListener("click", copy);
        states.gameover = false
    }
}
function copy(){
    let text = document.querySelector(".msn-cupon").innerHTML;
   
    const tempInput = document.createElement('input');
    tempInput.setAttribute("value", text);
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
    pCheck.style.display = 'block'
}

function again() {
    hook = new Hook(ctx, -100, 0, imgHook.width, imgHook.height);
    block = new Block(
        ctx,
        imgBlock,
        hook.getX(),
        122,
        imgBlock.width,
        imgBlock.height
    );

    sky = new Sky(ctx, 0, -600, 450, 1200);
    base = new Base(ctx, 175, 332, 100, 60);
    bgY = 0;
    yDown = 0;
    moveDownInit = 100;
    score = 0;
    prevScore = 0;
    blocks = [];
    clouds = [];
    stones = [];
    zigZag = true;
    clearInterval(interval);
    velHookBlock = 6;
    lives = 3;
    direction = 0.4;
    timeDirection = 10;

    states = {
        ready: true,
        play: false,
        gameover: false,
    };

    document.addEventListener("mousedown", mouseDown);
    document.addEventListener("touchstart",mouseDown)
    pCheck.style.display = 'none'
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBackgrounds();
    base.draw();
    hook.draw(imgHook);
    blocks.forEach((block) => block.draw());
    block.draw();

    scoreAndLives();
}

function update() {
    clouds.forEach((item) => item.update());
    stones.forEach((item) => item.update());
    //sky.update()
    levels();
    if (zigZag) {
        movementZigZag();
    }
    blockOutScene();
    hookBlock();
    collisionsBlock();
    collisionBase();
    changeStates();
    hook.update();
    block.update();
    gameOver();
}

function gameloop() {

    update();
    draw();
    requestAnimationFrame(gameloop);
}

createClouds();
gameloop();
