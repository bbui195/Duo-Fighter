import { intersects } from "./util.js";

const CharacterMap = require("./character_map.js");
export class Character {
    constructor(charName, game, map, context) {
        this.char = CharacterMap[charName];
        this.game = game;
        this.map = map;
        this.context = context;

        this.image = new Image();
        this.image.src = this.char.image;
        this.frame = 0;
        this.frameCount = 0;
        this.disabled = false;
        this.jumps = 2;
        this.attackDebounce = 0;
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
            this.move([-4, 0]); //speed
            this.facingRight = false;
            this.addAction("run", true);
        } else if(this.inputs.right) {
            this.move([4, 0]); //speed
            this.facingRight = true;
            this.addAction("run", true);
        } else {
            this.removeAction("run");
        }
        if(!this.standing() || this.velocity.y < 0) {
            this.velocity.y += 0.5; //gravity
            if(this.velocity.y < 0) {
                this.pos.y += this.velocity.y;
            } else {
                this.fall();
            }
        } else {
            this.velocity.y = 0;
            this.jumps = 2;
        }
    }

    standing() {
        // edit to find platform underneath
        if(this.velocity.y >= 0 && this.move([0, 1])) {
            this.move([0, -1]);
            this.addAction("fall", true);
            return false;
        } else {
            this.removeAction("fall");
            return true;
        }
    }

    fall() {
        this.move([0, this.velocity.y]);
    }

    jump() {
        // console.log(this.jumps);
        if(this.jumps === 0) {
            return;
        }
        if(this.jumps === 2) {
            this.addAction("jump");
        } else {
            this.addAction("airJump");
        }
        this.velocity.y = -10;
        this.jumps -= 1;
    }

    hit() {
        this.velocity.y = -5;
        // this.jump();
    }

    attack() {
        this.action ||= 0;
        // this.addAction("attack" + (Math.floor(Math.random() * 3) + 1));
        // this.addAction("attack3");
        if(this.action === 0 && this.attackDebounce > 0) {
            return;
        }
        let attack = "attack" + (this.action + 1);
        this.addAction(attack);
        this.action = (this.action + 1) % 3;
        this.attackDebounce += 1;
        setTimeout(() => {
            this.attackDebounce -= 1;
            if(this.attackDebounce === 0) {
                this.action = 0;
            }
            // console.log(this.attackDebounce);
        }, 1000);
        let charRect = this.getBoundingRectangle();
        let attackHitbox = this.char.actions[attack].hitbox;
        let hit = null
        if(this.facingRight) {
            hit = {
                xLeft: charRect.x + attackHitbox.xLeft,
                xRight: charRect.x + attackHitbox.xRight,
                yLeft: charRect.y + attackHitbox.yLeft,
                yRight: charRect.y + attackHitbox.yRight
            };
        } else {
            hit = {
                xLeft: charRect.x + charRect.width - attackHitbox.xRight,
                xRight: charRect.x + charRect.width - attackHitbox.xLeft,
                yLeft: charRect.y + attackHitbox.yLeft,
                yRight: charRect.y + attackHitbox.yRight
            };
        }
        // console.log(hit);
        this.game.attack(this, hit);
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
            // this.context.fillRect(col * 30, row * 30, 30, 30); //remove later
            let square = {
                xLeft: col * 30,
                xRight: col * 30 + 30,
                yLeft: row * 30,
                // yRight: row * 30 + 30
                yRight: row * 30 + 2
            };

            if(intersects(square, boundPoints)) {
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
        let dir = x < 0 ? -1 : 1;
        while(x) {
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
        let scale = this.char.size.scale;
        context.drawImage(this.image,
            ...this.getDims(this.getRenderFrame()),
            this.pos.x, this.pos.y, this.char.size.x * scale,
            this.char.size.y * scale);

        // this.showHitBox(context);
        this.intersecting();
    }

    renderReversed(context) {
        let width = this.game.constructor.WIDTH;
        let scale = this.char.size.scale;
        context.save();
        context.translate(width, 0);
        context.scale(-1, 1);
        context.drawImage(this.image,
            ...this.getDims(this.getRenderFrame()),
            width - this.pos.x - this.char.size.x * scale,
            this.pos.y,
            this.char.size.x * scale, this.char.size.y * scale);
        context.restore();
        // this.showHitBox(context);
        this.intersecting();
    }

    getDims(frame) {
        frame = frame - frame % 1 + 0;
        return [
            (frame % this.char.size.rowLength)
            * this.char.size.x, Math.floor(frame / this.char.size.rowLength)
            * this.char.size.y,
            this.char.size.x, this.char.size.y
        ];
    }

}
