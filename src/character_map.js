
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
    },
    archer: {
        image: "./src/assets/archer.png",
        projectileImage: "./src/assets/projectile.png",
        size: {
            x: 64,
            y: 64,
            rowLength: 8,
            scale: 1.8
        },
        hitBox: {
            x: 14,//20
            y: 32,
            offsetX: 24,//15
            offsetY: 15
        },
        actions: {
            idle: {
                start: 40,
                end: 43,
                priority: 0
                // length: 4
            },
            run: {
                start: 0,
                end: 7,
                priority: 1
                // length: 6
            },
            jump: {
                // start: 14,
                start: 56,
                end: 57,
                priority: 3
            },
            airJump: {
                start: 48,
                end: 51,
                priority: 3
            },
            fall: {
                start: 57,
                end: 57,
                priority: 2
            },
            attack1: {
                start: 28,
                end: 30,
                priority: 4,
                hitbox: {
                    xLeft: 20,
                    xRight: 60,
                    yLeft: 0,
                    yRight: 60
                },
                damage: 50
            }
        }
    }
}

module.exports = CharacterMap;