
export class Character {
    constructor() {
        this.image = new Image();
        this.image.src = "./src/assets/adventurer.png";
        this.frame = 0;
        this.pos = {
            x: 100,
            y: 100,
        };
        this.inputs = {
            
        };
    }

    animate(context) {
        console.log("animating char");
        this.updateState();
        this.renderFrame(context);
        // this.renderReversed(context);
    }

    updateState() {
        if(this.inputs.w) {
            this.pos.y -= 5;
        }
        if(this.inputs.s) {
            this.pos.y += 5;
        }
        if(this.inputs.a) {
            this.pos.x -= 5;
        }
        if(this.inputs.d) {
            this.pos.x += 5;
        }
    }

    handleKey(key, type) {
        if(type === "keydown") {
            this.inputs[key] = true;
        } else {
            this.inputs[key] = false;
        }
    }
    renderFrame(context) {
        context.drawImage(this.image,
            ...this.getDims(this.frame),
            this.pos.x, this.pos.y, 110, 74);
        // this.frame = (this.frame + 0.2) % 109;
        this.frame = (this.frame + .2) % 13;
    }

    renderReversed(context) {
        context.save();
        context.translate(600, 0);
        context.scale(-1, 1);
        context.drawImage(this.image,
            ...this.getDims(this.frame),
            this.pos.x, this.pos.y, 110, 74);
        // this.frame = (this.frame + 0.2) % 109;
        this.frame = (this.frame + .2) % 13;
        context.restore();
    }

    getDims(frame) {
        frame = frame - frame % 1 + 96;
        return [
            (frame % 7) * 50, Math.floor(frame / 7) * 37,
            50, 37
        ];
    }


    // drawImage(image, sx, sy,
    // sWidth, sHeight, dx, dy,
    // dWidth, dHeight)

}
// https://rvros.itch.io/animated-pixel-hero?download