class Archer {
    constructor(game, x, y){
        
        Object.assign(this, {game, x, y});
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/player/archer.png");
        
        // Player sizes
        this.scale = 7; // 2.5
        this.width = 8 * this.scale;
        this.height = 8 * this.scale;

        // Mapping animations and mob states
        this.states = {idle: 0, move: 1, attack: 2};
        this.directions = {up: 0, right: 1, down: 2, left: 3}; // Rotational | NESW : Clockwise - _N_ever, _E_at, _S_limy, _W_orms  
        this.animations = []; // [state][direction]
        
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
        this.animations[0][this.directions.up] = new Animator(this.spritesheet,    0, 24,  9, 8, 1, 1, 0, 0, 1, 0);
        this.animations[0][this.directions.right] = new Animator(this.spritesheet, 0, 8,   9, 8, 1, 1, 0, 0, 1, 0);
        this.animations[0][this.directions.down] = new Animator(this.spritesheet,  0, 16,  9, 8, 1, 1, 0, 0, 1, 0);
        this.animations[0][this.directions.left] = new Animator(this.spritesheet,  0, 0,   9, 8, 1, 1, 0, 0, 1, 0);

        // Move Animations
        this.animations[1][this.directions.up] = new Animator(this.spritesheet,    9, 24,  9, 8, 2, 0.3, 0, 0, 1, 0);
        this.animations[1][this.directions.right] = new Animator(this.spritesheet, 0, 8,   9, 8, 2, 0.3, 0, 0, 1, 0);
        this.animations[1][this.directions.down] = new Animator(this.spritesheet,  9, 16,  9, 8, 2, 0.3, 0, 0, 1, 0);
        this.animations[1][this.directions.left] = new Animator(this.spritesheet,  0, 0,   9, 8, 2, 0.3, 0, 0, 1, 0);

        // Attack Animation
        this.animations[2][this.directions.up] = new Animator(this.spritesheet,    30, 24,  9, 8, 2, 0.2, 0, 0, 1, 0);
        this.animations[2][this.directions.right] = new Animator(this.spritesheet, 30, 8,   9, 8, 2, 0.2, 0, 0, 1, 0);
        this.animations[2][this.directions.down] = new Animator(this.spritesheet,  30, 16,  9, 8, 2, 0.2, 0, 0, 1, 0);
        this.animations[2][this.directions.left] = new Animator(this.spritesheet,  30, 0,   9, 8, 2, 0.2, 0, 0, 1, 0);

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

            const {x, y} = this.game?.mouse ?? {x: 0, y: 0}

            if((y < (x - 128) ) && (y < (-x + 896) ))
                this.direction = 0;
            if((y < (x - 128) ) && (y >= (-x + 896) ))
                this.direction = 1;
            if( (y >= (x - 128)) && (y >= (-x + 896)) )
                this.direction = 2;
            if((y >= (x - 128) ) && (y < (-x + 896) ))
                this.direction = 3;
        }
        else if ((this.game.up || this.game.right || this.game.down || this.game.left)) { // To implement in future, if velocityx/y = 0 then state = 0
            this.state = 1;

            // RotMG replica for move and turning direction
            if(this.game.up && !this.game.down && !this.game.left)
                this.direction = 0;
            else if(!this.game.up && this.game.right && !this.game.left)
                this.direction = 1;
            else if(!this.game.up && !this.game.right && this.game.down)
                this.direction = 2;
            else if( !this.game.right && !this.game.down && this.game.left)
                this.direction = 3;

            /*
            if(this.game.up && !this.game.right && !this.game.down && !this.game.left)
                this.direction = 0;
            else if(!this.game.up && this.game.right && !this.game.down && !this.game.left)
                this.direction = 1;
            else if(!this.game.up && !this.game.right && this.game.down && !this.game.left)
                this.direction = 2;
            else if(!this.game.up && !this.game.right && !this.game.down && this.game.left)
                this.direction = 3;    
            */


        }
        else {
            this.state = 0;
        }
        
        

    };

};