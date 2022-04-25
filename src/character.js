const CharacterMap = require("./character_map.js");
export class Character {
    constructor(charName, game, map, context) {
        this.char = CharacterMap[charName];
        this.game = game;
        this.map = map;
        this.context = context;
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
            // this.pos.x -= 4; // speed
            this.move([-4, 0]);
            this.facingRight = false;
            this.addAction("run", true);
        } else if(this.inputs.right) {
            // this.pos.x += 4; // speed
            this.move([4, 0]);
            this.facingRight = true;
            this.addAction("run", true);
        } else {
            this.removeAction("run");
        }
        if(!this.standing() || this.velocity.y < 0) {
            // this.pos.y += 1;
            this.velocity.y += 0.5; //gravity
            if(this.velocity.y < 0) {
                this.pos.y += this.velocity.y;
            } else {
                this.fall();
            }
        } else {
            this.velocity.y = 0;
        }
    }

    standing() {
        // edit to find platform underneath
        if(this.velocity.y >= 0 && this.move([0, 1])) {
            this.move([0, -1]);
            this.addAction("fall", true);
            this.doubleJumped = false;
            return false;
        } else {
            this.removeAction("fall");
            return true;
        }
    }

    fall() {
        // change to go 1 pixel at a time, this.velocity.y times
        // this.pos.y += this.velocity.y;
        this.move([0, this.velocity.y]);
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

    getBoundingRectangle() {
        let scale = this.char.size.scale;
        return {
            x: this.pos.x + this.char.hitBox.offsetX * scale,
            y: this.pos.y + this.char.hitBox.offsetY * scale,
            width: this.char.hitBox.x * scale,
            height: this.char.hitBox.y * scale
        }
    }

    getBoundPoints() {
        let bound = this.getBoundingRectangle();
        return {
            xLeft: bound.x - 1,
            xRight: bound.x + bound.width + 1,
            yLeft: bound.y,
            yRight: bound.y + bound.height
        };
    }

    showHitBox(context) {
        context.globalAlpha = 0.7;
        let bound = this.getBoundingRectangle();
        context.fillRect(bound.x, bound.y, bound.width, bound.height);
        context.globalAlpha = 1;
    }

    calcBounds() {
        let bound = this.getBoundingRectangle();
        return [
            bound, //bounds
            Math.floor(bound.x / 30) - 1, //left
            Math.floor((bound.x + bound.width) / 30) + 1, //right
            Math.floor(bound.y / 30) + 2 //bottom
        ];
    }

    getFloor() {
        let squares = [];
        let [bound, left, right, bottom] = this.calcBounds();
        for(let i = left + 1; i < right; i++) {
            if(this.map.objects[bottom] && this.map.objects[bottom][i]) {
                squares.push([i, bottom]);
            }
        }
        return squares;
    }

    getSides() {
        let squares = [];
        let [bound, left, right, bottom] = this.calcBounds();
        let points = [];
        if(this.inputs.left) {
            points.push([left, bottom - 1]);
            // points.push([left, bottom - 2]);
        }
        //right
        if(this.inputs.right) {
            points.push([right, bottom - 1]);
            // points.push([right, bottom - 2]);
        }
        points.forEach(([i, j]) => {
            if(this.map.objects[j] && this.map.objects[j][i]) {
                squares.push([i, j]);
            }
        });
        return squares;
    }

    collides(squares) {
        let int = false;
        let boundPoints = this.getBoundPoints();
        squares.forEach(([col, row]) => {
            this.context.fillRect(col * 30, row * 30, 30, 30); //remove later
            let square = {
                xLeft: col * 30,
                xRight: col * 30 + 30,
                yLeft: row * 30,
                yRight: row * 30 + 30
            };
            if(((square.xLeft >= boundPoints.xLeft && square.xLeft <= boundPoints.xRight ||
                square.xRight >= boundPoints.xLeft && square.xRight <= boundPoints.xRight) &&
                (square.yLeft >= boundPoints.yLeft && square.yLeft <= boundPoints.yRight ||
                square.yRight >= boundPoints.yLeft && square.yRight <= boundPoints.yRight)) ||

                ((boundPoints.xLeft >= square.xLeft && boundPoints.xLeft <= square.xRight ||
                boundPoints.xRight >= square.xLeft && boundPoints.xRight <= square.xRight) &&
                (boundPoints.yLeft >= square.yLeft && boundPoints.yLeft <= square.yRight ||
                boundPoints.yRight >= square.yLeft && boundPoints.yRight <= square.yRight))) {
                int = true;
            }
        });
        return int;
    }

    intersecting() {
        return this.collides(this.getFloor().concat(this.getSides()));
    }

    move(pos) {
        let [x, y] = pos;
        x = x - x % 1;
        y = y - y % 1;
        // console.log(this.pos);
        let dir = x < 0 ? -1 : 1;
        while(x) {
            // if(x < 1 && x > -1) {
            //     dir = x;
            // }
            this.pos.x += dir;
            if(this.intersecting()) {
                this.pos.x -= dir;
                break;
            }
            x -= dir;
        }
        dir = y < 0 ? -1 : 1;
        let down = true;
        while(y) {
            // if(y < 1 && y > -1) {
            //     dir = y;
            // }
            this.pos.y += dir;
            if(this.intersecting()) {
                this.velocity.y = 0;
                this.pos.y -= dir;
                down = false;
                break;
            }
            y -= dir;
        }
        return down;
    }

    renderFrame(context) {
        this.context ||= context; //remove later
        let scale = this.char.size.scale;
        context.drawImage(this.image,
            // ...this.getDims(this.frame),
            ...this.getDims(this.getRenderFrame()),
            this.pos.x, this.pos.y, this.char.size.x * scale,
            this.char.size.y * scale);

        this.showHitBox(context);
        this.intersecting();
        // this.frame = (this.frame + 0.2) % 109;
        // this.frame = (this.frame + .2) % 13;
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
        // this.frame = (this.frame + .2) % 13;
        context.restore();
        this.showHitBox(context);
        this.intersecting();
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
