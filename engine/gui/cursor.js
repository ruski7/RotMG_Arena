// To be updated to support more and new cursors in the future
// Can optimize cursor by only updating upon mouse movement in gameengine.js

class Cursor { 
    constructor(game) {
        
        this.game = game;

        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/GUI/GreenSpin.png");
        this.width = 48;
        this.height = 48;
        this.scale = 40;
    }

    update(){
    }

    draw(ctx){
        ctx.drawImage(this.spritesheet, 0, 0, this.width, this.height, this.game.mouse.x - (this.scale / 2), this.game.mouse.y - (this.scale / 2), this.scale, this.scale);
    }

}