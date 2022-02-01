class Archer {
    constructor(game, x, y){
        
        Object.assign(this, {game, x, y});
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/player/archer.png");
        
        // Player sizes
        this.scale = 7; // 2.5
        this.width = 33 * this.scale;
        this.height = 36 * this.scale;

        // Mapping animations and mob states
        this.states = {idle: 0, move: 1, attack: 2};
        this.directions = {up: 0, right: 1, down: 2, left: 3}; // Rotational | NESW : Clockwise - _N_ever, _E_at, _S_limy, _W_orms  
        this.animations = []; // [state][direction]
        this.trueState = 0;

        this.state = 0;
        this.direction = 0;

        // Other
        this.loadAnimations();
    };

    loadAnimations() {

        let numDir = 4;
        let numStates = 3;
        for (var i = 0; i < numStates; i++) { //defines action
            this.animations.push([]);
            for (var j = 0; j < numDir; j++){ //defines directon: left = 0, right = 1
                this.animations[i].push([]);
            }
        }

        // Animations  [state][direction]
        // (X, Y,   Width, Height, Images, Animation Speed, White Space Betwen Images, ?, Loop, ?) 

        // Idle Animations
        this.animations[0][0] = new Animator(this.spritesheet, 0, 24,   8, 8, 1, 1, 0, 0, 1, 0);
        this.animations[0][1] = new Animator(this.spritesheet, 0, 8,    8, 8, 1, 1, 0, 0, 1, 0);
        this.animations[0][2] = new Animator(this.spritesheet, 0, 16,   8, 8, 1, 1, 0, 0, 1, 0);
        this.animations[0][3] = new Animator(this.spritesheet, 0, 0,    8, 8, 1, 1, 0, 0, 1, 0);

        // Move Animations
        this.animations[1][0] = new Animator(this.spritesheet, 8, 24,   8, 8, 2, 0.4, 0, 0, 1, 0);
        this.animations[1][1] = new Animator(this.spritesheet, 0, 8,    8, 8, 2, 0.4, 0, 0, 1, 0);
        this.animations[1][2] = new Animator(this.spritesheet, 8, 16,   8, 8, 2, 0.4, 0, 0, 1, 0);
        this.animations[1][3] = new Animator(this.spritesheet, 0, 0,    8, 8, 2, 0.4, 0, 0, 1, 0);

        // Attack Animation
        this.animations[2][0] = new Animator(this.spritesheet, 32, 24,  8, 8, 2, 0.2, 0, 0, 1, 0);
        this.animations[2][1] = new Animator(this.spritesheet, 32, 8,   8, 8, 2, 0.2, 0, 0, 1, 0);
        this.animations[2][2] = new Animator(this.spritesheet, 32, 16,  8, 8, 2, 0.2, 0, 0, 1, 0);
        this.animations[2][3] = new Animator(this.spritesheet, 32, 0,   8, 8, 2, 0.2, 0, 0, 1, 0);

    };

    draw(ctx) {

        switch(this.state) {
            case 0: // Idle
                this.animations[this.state][this.direction].drawFrame(this.game.clockTick, ctx, this.x, this.y, this.scale);
                break;
            case 1: // Move
                this.animations[this.state][this.direction].drawFrame(this.game.clockTick, ctx, this.x, this.y, this.scale);
                break;
            case 2: // Attack
                this.animations[this.state][this.direction].drawFrame(this.game.clockTick, ctx, this.x, this.y, this.scale);
                break;
        }
    };

    update() {

        if(this.game.click){
            this.state = 2;
        }
        else if (this.game.up || this.game.right || this.game.down || this.game.left) {
            this.state = 1;
        }
        else {
            this.state = 0;
        }

        if(this.game.up){
            this.direction = 0;
        }
        else if(this.game.right){
            this.direction = 1;
        }
        else if(this.game.down){
            this.direction = 2;
        }
        else if(this.game.left){
            this.direction = 3;
        }

    };

};