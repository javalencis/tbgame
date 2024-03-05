import { Block } from "./Block.js";
import { Hook } from "./Hook.js";
import { Sky } from "./Sky.js";
import { Base } from "./Base.js";
import { detectCollision } from "./utils.js";
import { Cloud } from "./Cloud.js";

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
const imgCloud = new Image();
const imgHeart = new Image();

backgroundImg.src = "../assets/background.png";
imgHook.src = "../assets/hook.png";
imgRope.src = "../assets/rope.png";
imgBlock.src = "../assets/block.png";
imgHeart.src = "../assets/heart.png";
imgCloud.src = "../assets/c1.png";

canvas.width = backgroundImg.width;
canvas.height = backgroundImg.height;

const hook = new Hook(ctx, -66, 0, imgHook.width, imgHook.height);
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
const c1 = new Cloud(ctx, imgCloud, 100, 300, 100, 100, canvas);
let bgY = 0;
let yDown = 0;
let moveDownInit = 150;
let score = 0;
let prevScore = 0;
let blocks = [];
let zigZag = true;
let interval;
let velHookBlock = 3;
let lives = 3;
let direction = 0.4;

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
        if (!block.inScene) return;
        block.isDown = true;
        hook.hasItem = false;
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

function blockOutScene() {
    if (block.getY() > canvas.height) {
        createBlock();
        lives--;
    }
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
        }, 10);
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
            block.isRotating = false;
            block.isDown = false;
            block.setVelX(0);
            blocks.push(block);
            createBlock();
            yDown = 0;
            moveDownInit = 70;
            score++;
        }
        block.setIsColliding(true);
    }
}

function levels() {
    if (prevScore != score) {
        velHookBlock += score * 0.01;
        if (score > 5) {
            direction += score * 0.01;
        }
        prevScore = score;
    }
}

function scoreAndLives() {
    if (states.play || states.ready) {
        ctx.font = "32px Arial";
        ctx.fillStyle = "black";
        ctx.fillText(score, 16, 36);

        ctx.drawImage(imgHeart, 380, 16, 34, 30);
        ctx.font = "24px Arial";
        ctx.fillStyle = "red";
        ctx.fillText(lives, 365, 36);
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
function moveHookBlock() {
    if (block.getX() + block.getWidth() >= canvas.width || block.getX() < 0) {
        hook.velX *= -1;
        block.velX *= -1;
    }
}
function hookBlock() {
    if (!states.play) return;
    if (hook.hasItem) {
        if (block.inScene) {
            moveHookBlock();
        } else {
            hook.setVelX(velHookBlock);
            block.setVelX(velHookBlock);
        }
    }
}

function drawBackgrounds() {
    canvas.width = backgroundImg.width;
    canvas.height = backgroundImg.height;
    sky.draw(canvas);
    ctx.drawImage(backgroundImg, 0, bgY, canvas.width, canvas.height);
    c1.draw();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBackgrounds();

    base.draw();
    hook.draw(imgHook,imgRope);
    blocks.forEach((block) => block.draw());
    block.draw();
        
    scoreAndLives();
}

function update() {
    //c1.update()
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


}

function gameloop() {
    update();
    draw();
    requestAnimationFrame(gameloop);
}

gameloop();
