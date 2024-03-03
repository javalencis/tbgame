const btStart = document.querySelector('.start-button')
const titleStart = document.querySelector('.start-top')
const cStart = document.querySelector('.start')
const canvas = document.getElementById('myCanvas')
const ctx = canvas.getContext('2d')

btStart.addEventListener('click',start)


const backgroundImg = new Image()
backgroundImg.src = '../assets/background.png'
let bgY = 0


function start(){
    btStart.classList.add('slideBottom')
    titleStart.classList.add('slideTop')
    setTimeout(function () {
        cStart.style.display = 'none'
      }, 950)
}

function drawBackgrounds(){
    canvas.width = backgroundImg.width
    canvas.height = backgroundImg.height
    ctx.drawImage(backgroundImg, 0, bgY,canvas.width,canvas.height);
}

function draw(){
    drawBackgrounds()
}

function update(){

}

function gameloop(){
    draw()
    requestAnimationFrame(gameloop)
}

gameloop()