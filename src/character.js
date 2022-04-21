
export class Character {
    constructor() {
        this.image = new Image();
        this.image.src = "./src/assets/adventurer.png";
        this.frame = 0;
        
    }

    animate(context) {
        console.log("animating char");
        this.renderFrame(context);
    }

    renderFrame(context) {
        context.drawImage(this.image,
            ...this.getDims(this.frame),
            100, 100, 110, 74);
        this.frame = (this.frame + 0.2) % 109;
    }

    getDims(frame) {
        frame = frame - frame % 1;
        return [
            (frame % 7) * 50, Math.floor(frame / 7) * 37,
            55, 37
        ];
    }


    // drawImage(image, sx, sy,
    // sWidth, sHeight, dx, dy,
    // dWidth, dHeight)

}
// https://rvros.itch.io/animated-pixel-hero?download