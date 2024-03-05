import { GameObject } from "./GameObject.js";

class Cloud extends GameObject{
    constructor(ctx,img,x,y,width,height,velX){
        super(ctx,x,y,width,height)
        this.img = img
        this.velX = velX
        this.prevX =0
    }

    draw(){
        this.ctx.drawImage(this.img,this.x,this.y, this.width, this.height)
    }
    moveX(){
        this.x+=this.velX
    }
    moveY(){
        this.y+=1
    }
    update(){
        this.moveX()
        if (Math.abs((this.prevX + Math.abs(this.velX)) % 100) < 0.01) {
            this.velX *= -1;
            this.prevX = 0;
        } else {
            this.prevX += Math.abs(this.velX);
        }
    }
}

export {Cloud}