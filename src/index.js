const { Game } = require("./game");
const { GameView } = require("./game_view");


document.addEventListener("DOMContentLoaded", function() {
    const canvas = document.getElementsByTagName("canvas")[0];
    const context = canvas.getContext("2d");
    const game = new Game();
    new GameView(game, context).start();
});


// smoke https://nyknck.itch.io/pixelfx052
// adventurer https://rvros.itch.io/animated-pixel-hero?download
// tiles https://sanctumpixel.itch.io/forest-lite-pixel-art-tileset