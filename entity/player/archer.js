class Archer {
    constructor(game, x, y){
        
        Object.assign(this, {game, x, y});
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/player/archer.png");
        
        // Player sizes
        this.scale = 7; // 2.5
        this.width = 9 * this.scale;
        this.height = 8 * this.scale;

        // Hold the true middle point of player character
        this.X = this.x + this.width / 2;
        this.Y = this.y + this.width / 2;

        // Mapping animations and mob states
        this.states = {idle: 0, move: 1, attack: 2};
        this.directions = {up: 0, right: 1, down: 2, left: 3}; // Rotational | NESW : Clockwise - _N_ever, _E_at, _S_limy, _W_orms  
        this.animations = []; // [state][direction]
        
        this.state = 0;
        this.direction = 0;

        this.velocity = { up: 0, down: 0, left: 0, right: 0 };
        this.velocitySpeed = 200;

        // Other
        this.loadAnimations();

    };

    drawDebug(ctx) {
        ctx.strokeStyle = "Red"
        ctx.strokeRect(this.x, this.y, this.width + this.scale * 1, this.height);
    }

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
        // (X, Y,   Width, Height, Images, Animation Speed, White Space Betwen Images, Reversed, Loop, Flipped) 

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

        if(PARAMS.DEBUG){
            this.drawDebug(ctx);
        }

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

        // Displays Player Debug Boundery
        if(PARAMS.DEBUG) this.drawDebug(ctx);

    };

    drawDebug(ctx) {
        ctx.strokeStyle = "Red";
        ctx.strokeRect(this.x, this.y, this.width, this.height);

        // Draws players vision direction box
        ctx.strokeStyle = "Blue";
        ctx.beginPath();
        ctx.moveTo(this.X - 1000, this.Y - 1000);
        ctx.lineTo(this.X + 1000, this.Y + 1000);
        ctx.stroke(); 

        ctx.beginPath();
        ctx.moveTo(this.X - 1000, this.Y + 1000);
        ctx.lineTo(this.X + 1000, this.Y - 1000);
        ctx.stroke(); 

        //     ctx.fillStyle = "White"
        //     ctx.fillText("Chest", this.x - this.game.camera.x, this.y - this.game.camera.y + 20);
        //     ctx.fillText("Contents: ", this.x - this.game.camera.x, this.y - this.game.camera.y + 10);
    }

    update() {

        const TICK = this.game.clockTick;
        
        this.updatePlayerInfo();
        this.playerMovement(TICK);
        this.playerDirectionState();
        

    };

    updatePlayerInfo(){
        // Hold the true middle point of player character
        this.X = this.x + this.width / 2;
        this.Y = this.y + this.width / 2;
    }

    playerMovement(TICK){

        //console.log("Velocity: " + this.velocity.y + ", " + this.velocity.x);

        // Velocity reset
        this.velocity.up = 0;
        this.velocity.down = 0;
        this.velocity.left = 0;
        this.velocity.right = 0;

        if(this.game.up) this.velocity.up = this.velocitySpeed;
        if(this.game.down) this.velocity.down = this.velocitySpeed;
        if(this.game.left) this.velocity.left = this.velocitySpeed;
        if(this.game.right) this.velocity.right = this.velocitySpeed;

        let vel_x = (this.velocity.right - this.velocity.left);
        let vel_y = (this.velocity.up - this.velocity.down);

        // Checks for vertical movement and corrects magnitude  
        if(vel_x != 0 && vel_y != 0){
            vel_x /= 1.414213562373095;
            vel_y /= 1.414213562373095;
        }

        // Moves player position based on current velocity
        this.x += vel_x * TICK;
        this.y -= vel_y * TICK;
    }

    playerDirectionState(){

        // Determines players state and direction
        if(this.game.click){
            this.state = this.states.attack;

            // Get mouse coordinates on click
            const {x, y} = this.game?.mouse ?? {x: 0, y: 0}

            /* CANVAS COORDINATES ARE DIFFERENT FROM NORMAL GRAPH COORDINATES
            Calculating facing direction based on 'b' the y-intercept in 'y = mx + b' 
            
            Logic example: Using two lines (m = -1, m = 1),
            if mouse location's 'b' is greater than player's location 'b' on line1 and line2,
            mouse must facing up on first Quaderant
            */

            // m = 1
            let player_b1 = this.Y - this.X; // Note: Also offset by player width / height
            let mouse_b1 = y - x;

            // m = -1
            let player_b2 = this.Y + this.X;
            let mouse_b2 = y + x;

            // Faces Up
            if(mouse_b1 > player_b1 && mouse_b2 > player_b2) this.direction = this.directions.down;
            // Faces Down
            if(mouse_b1 < player_b1 && mouse_b2 < player_b2) this.direction = this.directions.up;
            // Faces Left
            if(mouse_b1 > player_b1 && mouse_b2 < player_b2) this.direction = this.directions.left;
            // Faces Right
            if(mouse_b1 < player_b1 && mouse_b2 > player_b2) this.direction = this.directions.right;


            // if((y < (x - 128) ) && (y < (-x + 896) ))
            //     this.direction = 0;
            // if((y < (x - 128) ) && (y >= (-x + 896) ))
            //     this.direction = 1;
            // if( (y >= (x - 128)) && (y >= (-x + 896)) )
            //     this.direction = 2;
            // if((y >= (x - 128) ) && (y < (-x + 896) ))
            //     this.direction = 3;
                
        }
        else if ((this.game.up || this.game.right || this.game.down || this.game.left) /*&& this.velocity.up - this.velocity.down + this.velocity.left - this.velocity.right != 0 */) { // To implement in future, if velocityx/y = 0 then state = 0
            this.state = this.states.move;

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
            this.state = this.states.idle;
        }
    }
};