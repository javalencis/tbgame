import { GameObject } from "./GameObject.js";

class Sky extends GameObject{
    constructor(ctx,x,y,width,height) {
        super(ctx,x,y,width,height)

    }
    draw(imgBg){
       this.ctx.drawImage(imgBg, this.x, this.y);
    }
    moveY(){
        this.y+=2
    }
    update(){
        this.y =( this.y-1200)% (this.height/2);    
    }
}

export {Sky}