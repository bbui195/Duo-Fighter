const { Game } = require("./game");
const { GameView } = require("./game_view");
import "./index.scss"

document.addEventListener("DOMContentLoaded", function() {
    const canvas = document.getElementsByTagName("canvas")[0];
    const context = canvas.getContext("2d");
    const game = new Game(context);
    const startDiv = document.getElementsByClassName("canvas-elements")[0];
    const twoPlayerButton = document.getElementById("two-players");
    const vsAi = document.getElementById("vs-ai");
    let gameView = new GameView(game, context);
    // start start screen
    gameView.animateStartScreen();
    twoPlayerButton.addEventListener("click", function() {
        startDiv.style.display = "none";
        gameView.start();
    });
    // start game on button press
    // gameView.start();
    // new GameView(game, context).start();
});


// smoke https://nyknck.itch.io/pixelfx052
// adventurer https://rvros.itch.io/animated-pixel-hero?download
// tiles https://sanctumpixel.itch.io/forest-lite-pixel-art-tileset
// start screen https://vnitti.itch.io/glacial-mountains-parallax-background