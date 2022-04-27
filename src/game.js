import { Character } from "./character";
import { Player } from "./player";
import { Map } from "./map";
import { intersects } from "./util";

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
        this.characters = [this.character];
        let newChar = new Character("adventurer", this, this.map, context);
        this.characters.push(newChar);

        this.player = new Player(this.character, 1);
        this.players = [this.player];
        this.players.push(new Player(newChar, 2));

        this.hitboxes = {};

    }

    draw(context) {
        context.clearRect(0, 0, Game.WIDTH, Game.HEIGHT);
        this.map.draw(context);
        // this.character.animate(context);
        this.characters.forEach((char) => {
            char.animate(context);
        });
        // this.drawHitBoxes(context);
    }

    handleKey(e) {
        // console.log(e);
        // console.log(e.type);
        if(keyHandlers[e.key]) {
            // keyHandlers[e.key].call(this.character, e.type);
        }
        this.players.forEach((player) => {
            player.handleKey(e.key, e.type);
        })
        // this.player.handleKey(e.key, e.type);
    }

    drawHitBoxes(context) {
        context.globalAlpha = 0.5;
        Object.values(this.hitboxes).forEach((hitbox) => {
            context.fillRect(hitbox.xLeft, hitbox.yLeft,
                hitbox.xRight - hitbox.xLeft,
                hitbox.yRight - hitbox.yLeft);
        });
        context.globalAlpha = 1;
    }

    attack(charHitting, hitbox, damage) {
        console.log("attacking");
        let rand = Math.random();
        this.hitboxes[rand] = hitbox;
        this.characters.forEach((char) => {
            if(charHitting === char) {
                return;
            }
            if(intersects(char.getBoundPoints(), hitbox)) {
                console.log("hit someone");
                char.hit(damage);
            }
        });
        setTimeout(()=> {
            delete this.hitboxes[rand];
        }, 200);
        // console.log(Object.values(this.hitboxes));
    }

    step(context) {
        this.draw(context);
    }
}

Game.WIDTH = 900;
Game.HEIGHT = 600;