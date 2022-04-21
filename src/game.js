import { Character } from "./character";


export class Game {
    constructor() {
        this.character = new Character();
    }

    draw(context) {
        context.clearRect(0, 0, Game.WIDTH, Game.HEIGHT);
        this.character.animate(context);
    }

    step(context) {
        this.draw(context);
    }
}

Game.WIDTH = 900;
Game.HEIGHT = 600;