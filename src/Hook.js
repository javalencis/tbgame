import { GameObject } from "./GameObject.js";

class Hook extends GameObject {
    constructor(ctx, x, y, width, height) {
        super(ctx, x, y, width, height);

        this.velX = 0
        this.hasItem = true
    }

    draw(imgHook) {
      
        this.ctx.drawImage(
            imgHook,
            this.x,
            -imgHook.height / 2,
            imgHook.width,
            imgHook.height
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
            if(this.getX()<=-100){
                this.hasItem=true
                this.setVelX(0)
            }else{
                this.setVelX(-8)

            }
        }
    }
}

export { Hook };
