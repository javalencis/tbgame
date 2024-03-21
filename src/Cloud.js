import { GameObject } from "./GameObject.js";

class Cloud extends GameObject{
    constructor(ctx,img,x,y,width,height,velX,canvas){
        super(ctx,x,y,width,height)
        this.img = img
        this.velX = velX
        this.prevX =0
        this.canvas = canvas
    }

    draw(){
        this.ctx.drawImage(this.img,this.x,this.y, this.width, this.height)
    }
    moveX(){
        this.x+=this.velX
    }
    moveY(){
        this.y+=2
    }
    update(){

        this.moveX()
        if(this.x + this.width/2 > this.canvas.width || this.x < -this.width/2 ){
            this.velX *= -1;
            this.prevX = 0;
        }
        if (Math.abs((this.prevX + Math.abs(this.velX)) % 80) < 0.01) {
            this.velX *= -1;
            this.prevX = 0;
        } else {
            this.prevX += Math.abs(this.velX);
        }
    }
}

export {Cloud}