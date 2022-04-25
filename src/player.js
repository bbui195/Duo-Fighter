
export class Player {
    constructor(character) {
        this.character = character;
    }
    down(key, type, inputKey) {
        let input = Player.map[key];
        return key === inputKey && type === "keydown" && !this.character.inputs[input]
    }
    handleKey(key, type) {
        let input = Player.map[key];
        if(input) {
            if(this.down(key, type, "w")) {
                this.character.jump();
            } else if(this.down(key, type, "f")) {
                // console.log("hitting");
                this.character.attack();
            }
            if(type === "keydown") {
                this.character.inputs[input] = true;
            } else {
                this.character.inputs[input] = false;
            }
        }
    }
}

Player.map = {
    w: "up",
    a: "left",
    s: "down",
    d: "right",
    f: "attack",
};