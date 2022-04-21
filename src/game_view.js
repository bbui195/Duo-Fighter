

export class GameView {
    constructor(game, context) {
        this.ctx = context;
        this.game = game;
    }
    start() {
        this.bindKeyHandlers();
        this.lastTime = 0;

        requestAnimationFrame(this.animate.bind(this));
    }
    bindKeyHandlers() {

    }
    animate() {
        // draw stuff
        // console.log("spam");
        requestAnimationFrame(this.animate.bind(this));
    }
}