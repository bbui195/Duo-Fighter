

export class GameView {
    constructor(game, context) {
        this.ctx = context;
        this.game = game;
        this.bindKeyHandlers();
    }
    start() {
        this.bindKeyHandlers();
        this.lastTime = 0;

        requestAnimationFrame(this.animate.bind(this));
    }
    bindKeyHandlers() {
        document.addEventListener("keydown", this.game.handleKey.bind(this.game));
        document.addEventListener("keyup", this.game.handleKey.bind(this.game));
    }
    animate() {
        // draw stuff
        // console.log("spam");
        this.game.step(this.ctx);
        requestAnimationFrame(this.animate.bind(this));
    }
}