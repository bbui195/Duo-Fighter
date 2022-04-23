const CharacterMap = require("./character_map.js");
export class Character {
    constructor(charName, game) {
        this.char = CharacterMap[charName];
        this.game = game;
        // console.log(this.char);
        // this.image.src = "./src/assets/adventurer.png";
        this.image = new Image();
        this.image.src = this.char.image;
        this.frame = 0;
        this.frameCount = 0;
        this.disabled = false;
        this.doubleJumped = false;
        this.pos = {
            x: 0,
            y: 500,
        };
        this.velocity = {
            x: 0,
            y: 0
        };
        this.inputs = {};
        this.facingRight = true;
        this.actions = {
            idle: {
                frame: this.char.actions.idle.start,
                firstFrame: this.char.actions.idle.start,
                lastFrame: this.char.actions.idle.end,
                priority: this.char.actions.idle.priority,
                repeat: true
            }
        };
    }
    animate(context) {
        this.updateState();
        if(this.facingRight) {
            this.renderFrame(context);
        } else {
            this.renderReversed(context);
        }
    }

    getRenderFrame() {
        let frame = 0;
        let priority = -1;
        Object.keys(this.actions).forEach((actionName) => {
            let action = this.actions[actionName];
            if(!action) {
                return;
            }
            // console.log(action);
            if(action.priority > priority) {
                priority = action.priority;
                frame = action.frame;
            }
            if(this.frameCount === 0){
                action.frame += 1;
            }
            if(action.frame > action.lastFrame) {
                if(action.repeat) {
                    action.frame = action.firstFrame;
                } else {
                    this.actions[actionName] = null;
                }
            }
        });
        this.frameCount = (this.frameCount + 1) % 10;
        // console.log(frame);
        return frame;
    }

    updateState() {
        if(this.disabled) {
            return;
        }
        if(this.inputs.up) {
            // this.pos.y -= 5;
        }
        if(this.inputs.down) {
            // this.pos.y += 5;
        }
        if(this.inputs.left && this.inputs.right){
            this.removeAction("run");
        } else if(this.inputs.left) {
            this.pos.x -= 4; // speed
            this.facingRight = false;
            this.addAction("run", false);
        } else if(this.inputs.right) {
            this.pos.x += 4; // speed
            this.facingRight = true;
            this.addAction("run", false);
        } else {
            this.removeAction("run");
        }
        if(!this.standing() || this.velocity.y < 0) {
            // this.pos.y += 1;
            this.velocity.y += 0.5; //gravity
            this.fall();
        } else {
            this.velocity.y = 0;
        }
    }

    standing() {
        // edit to find platform underneath
        if(this.pos.y >= 500) {
            this.removeAction("fall");
            return true;
        } else {
            this.addAction("fall", true);
            this.doubleJumped = false;
            return false;
        }
    }

    fall() {
        this.pos.y += this.velocity.y;
    }

    jump() {
        this.addAction("jump");
        // console.log(this.pos);
        // this.pos.y = 450;
        this.velocity.y = -10;
    }

    removeAction(actionName) {
        this.actions[actionName] = null;
    }
    
    addAction(actionName, repeat) {
        if(!this.actions[actionName]) {
            this.actions[actionName] = {
                frame: this.char.actions[actionName].start,
                firstFrame: this.char.actions[actionName].start,
                lastFrame: this.char.actions[actionName].end,
                priority: this.char.actions[actionName].priority,
                repeat: repeat
            }
        }
    }

    renderFrame(context) {
        let scale = this.char.size.scale;
        context.drawImage(this.image,
            // ...this.getDims(this.frame),
            ...this.getDims(this.getRenderFrame()),
            this.pos.x, this.pos.y, this.char.size.x * scale,
            this.char.size.y * scale);
        // this.frame = (this.frame + 0.2) % 109;
        this.frame = (this.frame + .2) % 13;
    }

    renderReversed(context) {
        let width = this.game.constructor.WIDTH;
        let scale = this.char.size.scale;
        context.save();
        context.translate(width, 0);
        context.scale(-1, 1);
        context.drawImage(this.image,
            // ...this.getDims(this.frame),
            ...this.getDims(this.getRenderFrame()),
            width - this.pos.x - this.char.size.x * scale,
            this.pos.y,
            this.char.size.x * scale, this.char.size.y * scale);
        // this.frame = (this.frame + 0.2) % 109;
        this.frame = (this.frame + .2) % 13;
        context.restore();
    }

    getDims(frame) {
        // frame = frame - frame % 1 + 96;
        frame = frame - frame % 1 + 0;
        return [
            (frame % this.char.size.rowLength)
            * this.char.size.x, Math.floor(frame / this.char.size.rowLength)
            * this.char.size.y,
            this.char.size.x, this.char.size.y
        ];
    }


    // drawImage(image, sx, sy,
    // sWidth, sHeight, dx, dy,
    // dWidth, dHeight)

}
