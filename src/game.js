import { Character } from "./character";
import { Player } from "./player";
import { Map } from "./map";
import { intersects } from "./util";
import { Projectile } from "./projectile";

export class Game {
    constructor(context) {
        this.map = new Map();
        this.character = new Character("archer", this, this.map, context, 40);
        this.characters = [this.character];
        let newChar = new Character("adventurer", this, this.map, context, 750);
        this.characters.push(newChar);

        this.player = new Player(this.character, 1);
        this.players = [this.player];
        this.players.push(new Player(newChar, 2));

        this.hitboxes = {};
        this.projectiles = [];

        this.gameOver = false;

    }

    draw(context) {
        context.clearRect(0, 0, Game.WIDTH, Game.HEIGHT);
        this.map.draw(context);

        this.characters.forEach((char) => {
            char.animate(context);
        });
        this.handleProjectiles(context);
        
        // this.drawHitBoxes(context);
    }

    handleProjectiles(context) {
        let hit = [];
        this.projectiles.forEach((projectile, index) => {
            //move projectile in direction
            projectile.animate(context);
            let bp = projectile.getBoundPoints();
            let hitted = false;
            this.characters.forEach((char) => {
                if(char === projectile.owner) {
                    return;
                }
                if(intersects(char.getBoundPoints(), bp)) {
                    this.damage(char, projectile.damage);
                    if(!hitted) {
                        hit.push(index);
                    }
                    hitted = true;
                }
            });
            if(projectile.lifeTime <= 0 && !hitted) {
                hit.push(index);
            }
        });
        while(hit.length > 0) {
            this.projectiles.splice(hit.pop(), 1);
        }
    }

    damage(char, damage) {
        let dead = char.hit(damage)
        if(dead) {
            setTimeout(() => {
                this.gameOver = true;
            }, 500);
        }
    }

    handleKey(e) {
        this.players.forEach((player) => {
            player.handleKey(e.key, e.type);
        })
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

    attack(charHitting, options) {

        if(charHitting.charName === "adventurer") {
            let rand = Math.random();
            this.hitboxes[rand] = options.hitbox; // to show hitboxes
            this.characters.forEach((char) => {
                if(charHitting === char) {
                    return;
                }
                if(intersects(char.getBoundPoints(), options.hitbox)) {
                    console.log("hit someone");
                    this.damage(char, options.damage);
                }
            });
            setTimeout(()=> {
                delete this.hitboxes[rand];
            }, 200);

        } else if(charHitting.charName === "archer") {

            this.projectiles.push(new Projectile(options));
        }
    }

    step(context) {
        this.draw(context);
    }
}

Game.WIDTH = 900;
Game.HEIGHT = 600;