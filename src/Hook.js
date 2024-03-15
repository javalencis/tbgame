import { GameObject } from "./GameObject.js";

class Hook extends GameObject {
    constructor(ctx, x, y, width, height) {
        super(ctx, x, y, width, height);

        this.velX = 0
        this.hasItem = true
    }

    draw(imgHook,imgRope) {
      
        this.ctx.drawImage(
            imgHook,
            this.x,
            -imgHook.height / 1.5,
            imgHook.width,
            imgHook.height
        );
        this.ctx.drawImage(
            imgRope,
            this.x - (imgRope.width - imgHook.width) / 2,
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
                this.setVelX(-8)

            }
        }
    }
}

export { Hook };
