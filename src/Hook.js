import { GameObject } from "./GameObject.js";

class Hook extends GameObject {
    constructor(ctx, imgHook, x, y, width, height) {
        super(ctx, x, y, width, height);
        this.imgHook = imgHook;
        this.velX = 0
        this.hasItem = true
    }

    draw(imgRope) {
        this.ctx.drawImage(
            this.imgHook,
            this.x,
            -this.height / 1.5,
            this.width,
            this.height
        );
        this.ctx.drawImage(
            imgRope,
            this.x - (imgRope.width - this.width) / 2,
            95,
            imgRope.width,
            imgRope.height * 1.5
        );
    }

    setVelX(velX){
        this.velX = velX
    }
    moveX(){
        this.x += this.velX
    }

    update(){
        this.moveX()
        if(!this.hasItem){
            if(this.getX()<=-66){
                this.hasItem=true
                this.setVelX(0)
            }else{
                this.setVelX(-4)

            }
        }
    }
}

export { Hook };
