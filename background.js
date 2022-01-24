class Background { 
    constructor(game) {
        Object.assign(this, { game});
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/environment/background_sample-shrinked.png");
        //this.animator = new Animator(this.spritesheet, 0, 0, 1920, 1080, 0, 1, 0, 0, 1, 0);
    };

    update() {

    };

    draw(ctx) {
        //ctx.drawImage(this.spritesheet, 0, 0, this.game.surfaceWidth, this.game.surfaceHeight);
        ctx.drawImage(this.spritesheet, 0, 0, 1024, 768);
        //this.animator.drawFrame(this.game.clockTick, ctx, 0, 0, 0.71)
    };
};