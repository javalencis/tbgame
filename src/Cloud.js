import { GameObject } from "./GameObject.js";

class Cloud extends GameObject{
    constructor(ctx,img,x,y,w,h,canvas){
        super(ctx,x,y,w,h)
        this.canvas = canvas
        this.img = img
        this.velX = 1
        this.prevX = 0
    }

    draw(){
        this.ctx.drawImage(this.img,this.x,this.y,this.w,this.h)
    }
    moveX(){
        this.x+=this.velX
    }
    update(){
        this.moveX()
        if((this.prevX+1)%100 === 0){
            this.velX*=-1
            this.prevX=0
        }else{
            this.prevX+=1
        }
    }
}

export {Cloud}