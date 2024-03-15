import { GameObject } from "./GameObject.js";

class Sky extends GameObject{
    constructor(ctx,x,y,width,height) {
        super(ctx,x,y,width,height)
        this.colors=[
            "rgb(200, 255, 150)",
            "rgb(105, 230, 240)",
            "rgb(90, 190, 240)",
            "rgb(85, 100, 190)",
            "rgb(55, 20, 35)",
            "rgb(75, 25, 35)",
            "rgb(25, 0, 10)"
        ]
    }
    draw(canvas){
        this.width=canvas.width
        this.height=canvas.height
        const gradient = this.ctx.createLinearGradient(this.x,this.height+this.y, 0, -this.height*6+this.y);
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