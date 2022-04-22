import { Character } from "./character";

const keyHandlers = {
    w: function(type) {
        this.pos.y -= 2;
    },
    a: function(type) {
        this.pos.x -= 2;
    },
    s: function(type) {
        this.pos.y += 2;
    },
    d: function(type) {
        this.pos.x += 2;
    },
};
export class Game {
    constructor() {
        this.character = new Character();
    }

    draw(context) {
        context.clearRect(0, 0, Game.WIDTH, Game.HEIGHT);
        this.character.animate(context);
    }

    handleKey(e) {
        // console.log(e);
        // console.log(e.type);
        if(keyHandlers[e.key]) {
            // keyHandlers[e.key].call(this.character, e.type);
        }
        this.character.handleKey(e.key, e.type);
    }

    step(context) {
        this.draw(context);
    }
}

Game.WIDTH = 900;
Game.HEIGHT = 600;