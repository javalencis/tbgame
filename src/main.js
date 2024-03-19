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

const imgHeart = new Image();

backgroundImg.src = "../assets/background.png";
imgHook.src = "../assets/hook.gif";
imgRope.src = "../assets/rope.png";
imgBlock.src = "../assets/block.png";
imgHeart.src = "../assets/heart.png";

canvas.width = backgroundImg.width;
canvas.height = backgroundImg.height;

const hook = new Hook(ctx, -100, 0, imgHook.width, imgHook.height);
let block = new Block(
    ctx,
    imgBlock,
    hook.getX(),
    122,
    imgBlock.width,
    imgBlock.height
);

const sky = new Sky(ctx, 0, 0, canvas.width, canvas.height);
const base = new Base(ctx, 175, 332, 100, 60);

let bgY = 0;
let yDown = 0;
let moveDownInit = 100; 
let score = 0;
let prevScore = 0;
let blocks = [];
let clouds = [];
let stones = []
let zigZag = true;
let interval;
let velHookBlock = 6;
let lives = 3;
let direction = 0.4;
let timeDirection = 10;

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
        bgY += 2;
        sky.moveY();
        base.moveY();
        clouds.forEach((item) => item.moveY());
        stones.forEach((item) => item.moveY());

        if (score > 0) {
            blocks.forEach((block) => block.moveY());
        }
        yDown+=2;
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
        if (detectCollision(block, base)) {
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
            (block.getX() > blocks.at(-1).getX() + blocks.at(-1).getWidth() * 0.5) && !block.isRotating
        ) {
            block.pointRotation =
                blocks.at(-1).getX() + blocks.at(-1).getWidth();
            block.isRotating = true;
            block.clockWise = true;
            console.log(1);
        } else if (
            (block.getX() + block.getWidth() * 0.5 <
            blocks.at(-1).getX()) && !block.isRotating
        ) {
            block.pointRotation = blocks.at(-1).getX();
            block.isRotating = true;
            block.clockWise = false;
            console.log(2);
        } else {
            if (!block.isColliding && !block.isRotating) {
                block.isRotating = false;
                block.isDown = false;
                block.setVelX(0);
                blocks.push(block);
                console.log(3);
                createBlock();
                yDown = 0;
                moveDownInit = 64;
                score++;
            }
        }
        block.setIsColliding(true);
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
        var font = new FontFace('golden', 'url(../fonts/golden.ttf)')
        ctx.font = "32px golden";
        ctx.fillStyle = "white";
        ctx.fillText(score, 16, 36);

        ctx.drawImage(imgHeart, 380, 14, 34, 30);
        ctx.font = "24px golden";
        ctx.fillStyle = "red";
        ctx.fillText(lives, 365, 36);
    }
}
function changeStates() {
    if (states.ready) {
        if (hook.getX() < 170) {
            hook.setVelX(4);
            block.setVelX(4);
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
    if(block.isRotating) return
    if (block.getX() + block.getWidth() >= canvas.width || block.getX() < 0) {
        hook.velX *= -1;
        block.velX *= -1;
    }
}
function hookBlock() {
    if (!states.play) return;
    if (hook.hasItem) {
        if (block.inScene) {
            if(block.isRotating) return
            moveHookBlock();
        } else {
            hook.setVelX(velHookBlock);
            block.setVelX(velHookBlock);
        }
    }
}
function createClouds() {
    let velClouds = [0.4, -0.4, 0.2, -0.2, 0.6, -0.6];
    const cloudsSrc = [
        "../assets/c1.png",
        "../assets/c2.png",
        "../assets/c3.png",
    ];

    for (let i = 0; i < 10; i++) {
        const imgCloud = new Image();
        imgCloud.src = cloudsSrc[parseInt(numRandom(0, 3))];
        clouds[i] = new Cloud(
            ctx,
            imgCloud,
            numRandom(0, canvas.width - 220),
            numRandom(-2200, 150),
            200,
            200,
            velClouds[parseInt(numRandom(0, 6))]
        );
    }
}
function createStones() {
    let velStones = [0.4, -0.4, 0.2, -0.2, 0.6, -0.6];
    const stonesSrc = [
        "../assets/c4.png",
        "../assets/c5.png",
        "../assets/c6.png",
        "../assets/c7.png",
        "../assets/c8.png"
    ];
    let pos=0;
    let prevPos =0;

    for (let i = 0; i < 15; i++) {
        pos = parseInt(numRandom(-5000, -2300))

        const imgCloud = new Image();
        imgCloud.src = stonesSrc[parseInt(numRandom(0, 5))];
        stones[i] = new Cloud(
            ctx,
            imgCloud,
            numRandom(0, canvas.width - 220),
            pos != prevPos ? pos:pos+300,
            200,
            200,
            velStones[parseInt(numRandom(0, 6))]
        );
        prevPos=pos
    }
}
function drawBackgrounds() {
    canvas.width = backgroundImg.width;
    canvas.height = backgroundImg.height;
    sky.draw(canvas);
    // clouds.forEach((item) => item.draw());
    // stones.forEach((item) => item.draw());
    ctx.drawImage(backgroundImg, 0, bgY, canvas.width, canvas.height);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBackgrounds();
    base.draw();
    hook.draw(imgHook, imgRope);
    blocks.forEach((block) => block.draw());
    block.draw();

    scoreAndLives();
}

function update() {
    clouds.forEach((item) => item.update());
    stones.forEach((item) => item.update());

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

createClouds();
createStones()
gameloop();
