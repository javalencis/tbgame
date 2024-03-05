import { GameObject } from "./GameObject.js"
class Block extends GameObject {
    constructor(ctx,img, x, y, width, height) {
        super(ctx, x, y, width, height)
        this.isDown = false
        this.isColliding = false
        this.velX = 0
        this.velY = 5
        this.isRotating = false
        this.currAngle = 0
        this.pointRotation = 0
        this.clockWise=true
        this.img = img
        this.inScene = false
    }
    draw() {
        this.ctx.save();
        this.ctx.translate(this.pointRotation, this.y +  this.img.height);
        this.ctx.rotate((Math.PI / 180) * this.currAngle);
        this.ctx.translate(-(this.pointRotation), -(this.y +  this.img.height));
        this.ctx.drawImage(this.img,this.x, this.y,  this.img.width,  this.img.height);
        this.ctx.restore();
    }
    setVelY(velY) {
        this.velY = velY
    }
    setVelX(velX) {
        this.velX = velX
    }
    setIsColliding(isColliding) {
        this.isColliding = isColliding
    }
    moveX() {
        this.x += this.velX
    }
    moveY(){
        this.y += 1
    }
    rotation() {
        if(this.clockWise){
            this.currAngle += 2
        }else{
            this.currAngle -= 2
        }
    }

    update() {
        this.moveX()
        if(this.isColliding && this.isRotating){
            this.setVelX(this.clockWise ? 1 : -1)
            this.setVelY(0)
            this.rotation()
        }else if(!this.isColliding && this.isRotating){
            if(this.clockWise){
                this.pointRotation=this.x
            }else{
                this.pointRotation=this.x +this.width
            }
            if(this.velY < 5){
                this.velY+=0.4
            }
            this.setVelX(this.clockWise ? 1.5 : -1.5)
            this.rotation()
        }else if(this.isColliding && !this.isRotating){
            this.isDown=false
     
        }
        
        if (this.isDown) {
            if(!this.isRotating){
                this.setVelX(0)
            }
           this.y += this.velY
        }

        if(this.getX()>=0){
            this.inScene=true
        }else{
            
            this.inScene = false
        }

    }
}


export { Block }