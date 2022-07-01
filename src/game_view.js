

export class GameView {
    constructor(game, context) {
        this.ctx = context;
        this.game = game;
        this.gameDims = [this.game.constructor.WIDTH, this.game.constructor.HEIGHT];
        this.started = false;
        this.boundKeys = [];
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
        if(!this.restarted) {
            requestAnimationFrame(this.animateEndScreen.bind(this));
        }
    }
    start(type) {
        if(type === "ai") {
            this.game.setAi();
        }
        this.bindKeyHandlers();
        this.started = true;
        requestAnimationFrame(this.animate.bind(this));
    }
    bindKeyHandlers() {
        if(this.boundKeys) {
            document.removeEventListener("keydown", this.boundKeys);
            document.removeEventListener("keyup", this.boundKeys);
        }
        this.boundKeys = this.game.handleKey.bind(this.game);
        document.addEventListener("keydown", this.boundKeys);
        document.addEventListener("keyup", this.boundKeys);
        
    }
    animate(time) {
        // draw stuff
        // console.log("spam");
        this.game.step(this.ctx, time);
        //show game over and restart
        if(this.game.gameOver) {
            document.getElementsByClassName("canvas-elements")[0].style.display = "flex";
            // console.log(this.game);
            let prompt = document.getElementsByClassName("select-prompt")[0]
            if(this.game.characters[0].health === 0) {
                prompt.innerHTML = "PLAYER 2 WINS\nPlay again?";
            } else {
                prompt.innerHTML = "PLAYER 1 WINS\nPlay again?";
            }
            this.started = false;
            // this.game.gameOver = false;
            // this.restarted = false;
            // this.animateEndScreen("player 1");
            this.animateStartScreen();
        } else {
            requestAnimationFrame(this.animate.bind(this));
        }
    }
}