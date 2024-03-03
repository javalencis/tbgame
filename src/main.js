const btStart = document.querySelector('.start-button')
const titleStart = document.querySelector('.start-top')
const cStart = document.querySelector('.start')
const canvas = document.getElementById('myCanvas')
const ctx = canvas.getContext('2d')

import { Background } from "./background.js";


btStart.addEventListener('click',start)



function start(){
    btStart.classList.add('slideBottom')
    titleStart.classList.add('slideTop')
    setTimeout(function () {
        cStart.style.display = 'none'
      }, 950)
}

