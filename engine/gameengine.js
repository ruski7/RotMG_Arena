// This game shell was happily modified from Googler Seth Ladd's "Bad Aliens" game and his Google IO talk in 2011

class GameEngine {
    constructor(options) {
        // What you will use to draw
        // Documentation: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D
        this.ctx = null;

        // Everything that will be updated and drawn each frame
        this.entities = [];

        // Information on the input
        this.click = null;
        this.mouse = null;
        this.wheel = null;
        
        //controls
        this.left = null;
        this.right = null;
        this.down = null;
        this.up = null;

        this.ability = null;
        this.nexus = null;
        this.hp = null;
        this.mp = null;

        this.debug = null;

        //height for debug
        this.surfaceWidth = null;
        this.surfaceHeight = null;

        // Options and the Details
        this.options = options || {
            prevent: {
                contextMenu: true,
                scrolling: true,
            },
            mouseMove: false,
            mouseclick: true,
            debugging: true,
        };
    };

    init(ctx) {
        this.ctx = ctx;
        this.surfaceWidth = this.ctx.canvas.width;
        this.surfaceHeight = this.ctx.canvas.height;
        document.getElementById("gameWorld").style.cursor = "none"; //disable cursor by default
        this.startInput();
        this.timer = new Timer();
    };

    start() {

        this.mouse = ({ x: 0, y: 0 });

        this.running = true;
        const gameLoop = () => {
            this.loop();
            requestAnimFrame(gameLoop, this.ctx.canvas);
        };
        gameLoop();
    };

    startInput() {

        console.log('Starting input');

        var that = this;
        
        const getXandY = e => ({
            x: e.clientX - this.ctx.canvas.getBoundingClientRect().left,
            y: e.clientY - this.ctx.canvas.getBoundingClientRect().top
        });

        // Keyboard Events
        this.ctx.canvas.addEventListener("keydown",  (e) => {
            e.preventDefault(); //prevents scrolling from pressing any key
            switch(e.code) {
                case "KeyW":
                    that.up = true;
                    break;
                case "KeyD":
                    that.right = true;
                    break;
                case "KeyS":
                    that.down = true;
                    break;
                case "KeyA":
                    that.left = true;
                    break;
                case "Space":
                    that.ability = true;
                    break;
                case "KeyE":
                    that.nexus = true;
                    break;
                case "KeyQ":
                    that.hp = true;
                    break;
                case "KeyF":
                    that.mp = true;
                    break;
                case "ControlLeft":
                    that.debug = true;
                    break;
            }
        }, false);

        // Keyboard Events
        this.ctx.canvas.addEventListener("keyup",  (e) => {
            e.preventDefault(); //prevents scrolling from pressing any key
            switch(e.code) {
                case "KeyW":
                    that.up = false;
                    break;
                case "KeyD":
                    that.right = false;
                    break;
                case "KeyS":
                    that.down = false;
                    break;
                case "KeyA":
                    that.left = false;
                    break;
                case "Space":
                    that.ability = false;
                    break;
                case "KeyE":
                    that.nexus = false;
                    break;
                case "KeyQ":
                    that.hp = false;
                    break;
                case "KeyF":
                    that.mp = false;
                    break;
            }
        }, false);



        // Mouse Events
        this.ctx.canvas.addEventListener("mousemove", e => {
            if (PARAMS.DEBUG && this.options.mouseMove) {
                console.log("Mouse Moved", getXandY(e));
            }
            that.mouse = getXandY(e);
        }, false);

        
        // Activates only until mousedown and mouseup have been done 
        this.ctx.canvas.addEventListener("click", e => {
            if (PARAMS.DEBUG) {
                console.log("CLICK", getXandY(e));
            }
        }, false);
        

        this.ctx.canvas.addEventListener("mousedown", e => {
            that.click = true;
        }, false);

        this.ctx.canvas.addEventListener("mouseup", e => {
            that.click = false;
        }, false);

        // No use for wheel movement as of yet
        // Will be preserved for debugging
        this.ctx.canvas.addEventListener("wheel", e => {
            if(e.wheelDelta == -120){
                console.log("Debugging turning on");
                document.getElementById("debug").checked = true;
            } else {
                console.log("Debugging turning off");
                document.getElementById("debug").checked = false;
            }
            if (PARAMS.DEBUG) {
                console.log("WHEEL", getXandY(e), e.wheelDelta);
            }
            if (this.options.prevent.scrolling) {
                e.preventDefault(); // Prevent Scrolling
            }
            this.wheel = e;
        });
        

    };

    addEntity(entity) {
        this.entities.push(entity);
    };

    draw() {
        // Clear the whole canvas with transparent color (rgba(0, 0, 0, 0))
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

        // Draw latest things first
        for (let i = this.entities.length - 1; i >= 0; i--) {
            this.entities[i].draw(this.ctx, this);
        }

        this.camera.draw(this.ctx);
    };

    update() {
        let entitiesCount = this.entities.length;

        for (let i = 0; i < entitiesCount; i++) {
            let entity = this.entities[i];

            if (!entity.removeFromWorld) {
                entity.update();
            }
        }

        for (let i = this.entities.length - 1; i >= 0; --i) {
            if (this.entities[i].removeFromWorld) {
                this.entities.splice(i, 1);
            }
        }
        this.camera.update();
    };

    loop() {
        this.clockTick = this.timer.tick();
        this.update();
        this.draw();
    };

};
