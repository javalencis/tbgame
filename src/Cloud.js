import { GameObject } from "./GameObject.js";

class Cloud extends GameObject{
    constructor(ctx,img,x,y,width,height,canvas){
        super(ctx,x,y,width,height)
        this.canvas = canvas
        this.img = img
        this.velX = 0.2
        this.prevX = 0
    }

    draw(){
        this.ctx.drawImage(this.img,this.x,this.y, this.width, this.height)
    }
    moveX(){
        this.x+=this.velX
    }
    update(){
        this.moveX()
        if (Math.abs((this.prevX + 0.2) % 100) < 0.01) {
            this.velX *= -1;
            this.prevX = 0;
        } else {
            this.prevX += 0.2;
        }
    }
}

export {Cloud}