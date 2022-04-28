
export class Player {
    constructor(character, player=1) {
        this.character = character;
        this.keyMap = Player.map[player]
        this.moveMap = {};
        this.keysDown = {};
        Object.keys(this.keyMap).forEach((key) => {
            this.moveMap[this.keyMap[key]] = key;
        });
    }
    down(key, type, inputKey) {
        let input = Player.map[key];
        return key === inputKey && type === "keydown" && !this.character.inputs[input]
    }
    handleKey(key, type) {
        let input = this.keyMap[key];

        if(input) {
            if(this.down(key, type, this.moveMap["up"])
                && !this.keysDown[this.moveMap["up"]]) {
                this.character.jump();
            } else if(this.down(key, type, this.moveMap["attack"])
                && !this.keysDown[this.moveMap["attack"]]) {
                this.character.attack();
            }
            if(type === "keydown") {
                this.character.inputs[input] = true;
            } else {
                this.character.inputs[input] = false;
            }
        }
        if(type === "keydown") {
            this.keysDown[key] = true;
        } else {
            this.keysDown[key] = false;
        }
    }
}

Player.map = {
    1:{
        w: "up",
        a: "left",
        s: "down",
        d: "right",
        f: "attack",
    },
    2: {
        ArrowUp: "up",
        ArrowLeft: "left",
        ArrowDown: "down",
        ArrowRight: "right",
        l: "attack",
    }
};