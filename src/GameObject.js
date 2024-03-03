class GameObject {
    constructor(ctx, x, y, width, height) {

        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    getX(){
        return this.x
    }
    getY(){
        return this.y
    }
    getWidth(){
        return this.width
    }
    getHeight(){
        return this.height
    }

    setX(x){
        this.x=x
    }
    setY(y){
        this.y=y
    }
    setWidth(width){
        this.width=width
    }
    setHeight(height){
        this.height=height
    }

}

export {GameObject}
