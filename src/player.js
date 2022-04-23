
export class Player {
    constructor(character) {
        this.character = character;
    }
    handleKey(key, type) {
        let input = Player.map[key];
        if(input) {
            if(key === "w" && type === "keydown" && !this.character.inputs[input]) {
                this.character.jump();
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
    d: "right"
};