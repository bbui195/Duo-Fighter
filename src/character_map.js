
const CharacterMap = {
    adventurer: {
        image: "./src/assets/adventurer.png",
        size: {
            x: 50,
            y: 37,
            rowLength: 7,
            scale: 2
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
            fall: {
                start: 22,
                end: 23,
                priority: 2
            }
            // idle: [0, 3],
            // run: [8, 13],
            // attack: [
            //     [],
            //     [],
            //     []
            // ]
        }
    }
}

module.exports = CharacterMap;