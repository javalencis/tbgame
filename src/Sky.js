import { GameObject } from "./GameObject.js";

class Sky extends GameObject{
    constructor(ctx,x,y,width,height) {
        super(ctx,x,y,width,height)
        this.colors=[
            "rgb(46, 196, 255)",
            "rgb(255, 249, 46)",
            "rgb(250, 137, 0)",
            "rgb(0, 0, 0)"
        ]
    }
    draw(canvas){
        this.width=canvas.width
        this.height=canvas.height
        const gradient = this.ctx.createLinearGradient(this.x,this.height+this.y, 0, -this.height*4+this.y);
        for (let i = 0; i < this.colors.length; i++) {
            gradient.addColorStop(i / (this.colors.length - 1), this.colors[i]);
        }
        this.ctx.fillStyle = gradient;
       this.ctx.fillRect(0,0,this.width, this.height);
    }
    moveY(){
        this.y+=2
    }
}

export {Sky}