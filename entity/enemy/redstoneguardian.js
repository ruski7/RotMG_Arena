class RedStoneGuardian {
    constructor(game){
        
        this.game = game;
        this.animator = new Animator(ASSET_MANAGER.getAsset("./sprites/enemy/red_stone_guardian.png"), 0, 0, 16, 15, 3, 0.4, 16, 0, 1, 0);

        //this.loadAnimations();

        this.x = 320;
        this.y = -100;
        this.speed = 100;

    };

    draw(ctx) {

        //ctx.drawImage(ASSET_MANAGER.getAsset("./sprites/enemy/red_stone_guardian.png"),0,0);
        this.animator.drawFrame(this.game.clockTick, ctx, this.x, this.y, 8)
    };

    update() {
        this.y += this.speed * this.game.clockTick;
        if(this.y > 400) this.y = -100;
    };
};