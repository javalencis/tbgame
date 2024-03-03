import { GameObject } from "./GameObject.js";

class Hook extends GameObject {
    constructor(ctx, imgHook, x, y, width, height) {
        super(ctx, x, y, width, height);
        this.imgHook = imgHook;
        this.velX = 0
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
    }
}

export { Hook };
