import { MapObject } from "./map_object"


export class Map {
    constructor() {
        this.objects = [];
        // this.objects.push(new MapObject());
        this.setupMap();
        this.generateTerrain();
    }

    setupMap() {
        let sky = new Image();
        sky.src = "./src/assets/background/sky_cloud.png";
        let mountain = new Image();
        mountain.src = "./src/assets/background/mountain.png";
        let pine1 = new Image();
        pine1.src = "./src/assets/background/pine1.png";
        let pine2 = new Image();
        pine2.src = "./src/assets/background/pine2.png";
        this.renderBackground = (context) => {
            // console.log("hi")
            context.drawImage(sky, -80, 0, 1060, 300);
            context.drawImage(mountain, -80, 145, 1060, 300);
            context.drawImage(pine1, -80, 250, 1060, 300);
            context.drawImage(pine2, -80, 350, 1060, 300);
        };
    }

    generateTerrain() {
        // 
        // this.objects.push(new MapObject());
        this.objects = [];
        for (let row = 0; row < 19; row++) {
            let filled = [];
            // filled[-1] = true; //outside bounding box
            // filled[30] = true;
            let percent = row / 80;
            for (let i = 0; i < 30; i++) {
                if(Math.random() < percent) {
                    filled.push(true);
                } else {
                    filled.push(false);
                }
            }
            this.objects.push(filled);
        }
        let filled = [];
        // filled[-1] = true;
        // filled[30] = true;
        for(let i = 0; i < 30; i++) {
            filled.push(true);
        }
        this.objects.push(filled);
        this.fillTerrain();
    }
    // top_left,    top,        top_right
    // left,        center,     right
    // bottom_left, bottom,     bottom_right
    fillTerrain() {
        function img(src) {
            let image = new Image();
            image.src = "./src/assets/tiles/ground/ground_" + src + ".png";
            return image;
        }
        let images = [
            [img("top_left"), img("top"), img("top_right")],
            [img("left"), img("center"), img("right")],
            [img("bottom_left"), img("bottom"), img("bottom_right")],
        ];
        let top = new Image();
        top.src = "./src/assets/tiles/ground/ground_top.png";
        for (let row = 0; row < this.objects.length; row++) {
            for (let col = 0; col < this.objects[0].length; col++) {
                let x = 1;
                let y = 1;
                if(!this.objects[row - 1] || !this.objects[row - 1][col]) {
                    y -= 1;
                }
                // if(!this.objects[row + 1] || !this.objects[row + 1][col]) {
                //     y += 1;
                // }
                if(!this.objects[row][col - 1]) {
                    x -= 1;
                }
                if(!this.objects[row][col + 1]) {
                    x += 1;
                }
                if(this.objects[row][col]) {
                    this.objects[row][col] = images[y][x];
                }
            }
        }
    }

    drawBackground(context) {
        // console.log("drawing background");
        this.renderBackground(context);
        // console.log(context);
        //sky_cloud, mountain, pine1, pine2

    }

    renderGround(context) {
        // context.drawImage(img, 0, 570, 30, 30);
        this.objects.forEach(function(arr, row) {
            arr.forEach(function(image, col) {
                if(image) {
                    context.drawImage(image, col * 30, row * 30, 30, 30);
                }
            });
        });
    }

    draw(context) {
        // this.drawBackground(context);
        this.renderBackground(context);
        this.renderGround(context);
    }
}