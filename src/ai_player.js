
export class AIPlayer {
    constructor(character, game) {
        this.game = game;
        this.character = character;
        this.otherChar = this.game.characters[0];
        this.keysDown = {};
        this.lastAttack = 0;
        this.lastJump = 0;
        this.lastX = 100000;
        this.stopped = 0;
    }
    handleAI(time) {
        // console.log("thinking");
        // console.log(time);
        if((this.character.pos.y - this.otherChar.pos.y > 50
            || this.character.pos.x === this.lastX && Math.abs(this.character.pos.x - this.otherChar.pos.x) > 50
                && this.wasMoving)
            && time - this.lastJump > 400) {
            this.character.jump();
            this.lastJump = time;
        }
        if(Math.abs(this.character.pos.x - this.otherChar.pos.x) < 50) {
            this.character.inputs["right"] = false;
            this.character.inputs["left"] = false;
            this.wasMoving = false;
            this.stopped = time;
            if(Math.abs(this.character.pos.y - this.otherChar.pos.y) < 50
                && time - this.lastAttack > 500) {
                this.character.attack();
                this.lastAttack = time;
            }
        }
        else if(time > this.stopped + 500) {
            if(this.character.pos.x < this.otherChar.pos.x) {
                this.character.inputs["right"] = true;
                this.character.inputs["left"] = false;
                this.wasMoving = true;
            } else {
                this.character.inputs["right"] = false;
                this.character.inputs["left"] = true;
                this.wasMoving = true;
            }
        }
        this.lastX = this.character.pos.x;
        // this.character.attack();

    }
}

// "up", "left", "down", "right", "attack"
