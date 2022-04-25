import { Character } from "./character";
import { Player } from "./player";
import { Map } from "./map";

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
    constructor(context) {
        this.map = new Map();
        this.character = new Character("adventurer", this, this.map, context);
        this.player = new Player(this.character);
    }

    draw(context) {
        context.clearRect(0, 0, Game.WIDTH, Game.HEIGHT);
        this.map.draw(context);
        this.character.animate(context);
    }

    handleKey(e) {
        // console.log(e);
        // console.log(e.type);
        if(keyHandlers[e.key]) {
            // keyHandlers[e.key].call(this.character, e.type);
        }
        this.player.handleKey(e.key, e.type);
    }

    step(context) {
        this.draw(context);
    }
}

Game.WIDTH = 900;
Game.HEIGHT = 600;