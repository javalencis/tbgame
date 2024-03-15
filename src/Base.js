import { GameObject } from "./GameObject.js";

class Base  extends GameObject{
    constructor(ctx,x,y,width,height) {
        super(ctx,x,y,width,height)
    }

    draw(){
        this.ctx.fillStyle="#ff000000"
        this.ctx.fillRect(this.x,this.y,this.width,this.height)
    }

    moveY(){
        this.y+=2
    }


}

export {Base}