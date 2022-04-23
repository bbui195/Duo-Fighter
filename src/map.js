import { MapObject } from "./map_object"


export class Map {
    constructor() {
        this.objects = [];
        this.objects.push(new MapObject());
        this.setupMap();
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
    }

    drawBackground(context) {
        // console.log("drawing background");
        this.renderBackground(context);
        // console.log(context);
        //sky_cloud, mountain, pine1, pine2

    }

    draw(context) {
        this.drawBackground(context);
    }
}