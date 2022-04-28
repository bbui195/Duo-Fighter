

export class GameView {
    constructor(game, context) {
        this.ctx = context;
        this.game = game;
        this.gameDims = [this.game.constructor.WIDTH, this.game.constructor.HEIGHT];
        this.started = false;
        this.initializeStart();
    }

    initializeStart() {
        this.images = [];
        let makeImg = (src) => {
            let image = new Image();
            image.src = "./src/assets/start_screen/" + src + ".png";
            this.images.push(image);
        }
        for (let i = 0; i < 7; i++) {
            makeImg(i);
        }
        this.frame = 0;
        // console.log(this.images);
    }
    animateStartScreen() {
        this.images.forEach((image, ind) => {
            let offset = (this.frame / (7 - ind)) % this.gameDims[0];
            // console.log(offset);
            this.ctx.drawImage(image, 0 - offset, 0, ...this.gameDims);
            this.ctx.drawImage(image, this.gameDims[0] - offset, 0, ...this.gameDims);
        });
        this.frame += 10;
        if(!this.started) {
            requestAnimationFrame(this.animateStartScreen.bind(this));
        }
    }
    animateEndScreen(name) {
        //animate name wins! into screen
        this.animateStartScreen();
        
        requestAnimationFrame(this.animateEndScreen.bind(this));
    }
    start() {
        this.bindKeyHandlers();
        this.started = true;
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
        //show game over and restart
        if(this.game.gameOver) {
            this.animateEndScreen("player 1");
        } else {
            requestAnimationFrame(this.animate.bind(this));
        }
    }
}