
const CharacterMap = {
    adventurer: {
        image: "./src/assets/adventurer.png",
        size: {
            x: 50,
            y: 37,
            rowLength: 7,
            scale: 2
        },
        hitBox: {
            x: 13,//20
            y: 29,
            offsetX: 17.5,//15
            offsetY: 5
        },
        actions: {
            idle: {
                start: 0,
                end: 3,
                priority: 0
                // length: 4
            },
            run: {
                start: 8,
                end: 13,
                priority: 1
                // length: 6
            },
            jump: {
                // start: 14,
                start: 15,
                end: 17,
                priority: 3
            },
            airJump: {
                start: 18,
                end: 21,
                priority: 3
            },
            fall: {
                start: 22,
                end: 23,
                priority: 2
            },
            attack1: {
                start: 44,
                end: 46,
                priority: 4,
                hitbox: {
                    xLeft: 20,
                    xRight: 60,
                    yLeft: 0,
                    yRight: 60
                },
                damage: 5
            },
            attack2: {
                start: 50,
                end: 52,
                priority: 5,
                hitbox: {
                    xLeft: 20,
                    xRight: 60,
                    yLeft: 0,
                    yRight: 60
                },
                damage: 7
            },
            attack3: {
                start: 53,
                end: 56,
                priority: 6,
                hitbox: {
                    xLeft: 20,
                    xRight: 60,
                    yLeft: 0,
                    yRight: 60
                },
                damage: 9
            }
        }
    }
}

module.exports = CharacterMap;