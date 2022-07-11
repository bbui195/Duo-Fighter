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

    gameView.animateStartScreen();
    twoPlayerButton.addEventListener("click", function() {
        startDiv.style.display = "none";
        gameView.game = new Game(context);
        gameView.start();
    });
    // document.getElementsByClassName("canvas-elements")[0].display = "flex";
    // document.getElementsByClassName("select-prompt")[0].innerHTML = "PLAYER 1 WINS\nPlay again?";
    vsAi.addEventListener("click", function() {
        startDiv.style.display = "none";
        gameView.game = new Game(context);
        gameView.start("ai");
    });

});

const ignoreKeys = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];

window.addEventListener("keydown", function(e) {
    if(ignoreKeys.indexOf(e.code) != -1) {
        e.preventDefault();
    }
}, false);


// smoke https://nyknck.itch.io/pixelfx052
// adventurer https://rvros.itch.io/animated-pixel-hero?download
// tiles https://sanctumpixel.itch.io/forest-lite-pixel-art-tileset
// start screen https://vnitti.itch.io/glacial-mountains-parallax-background
// archer https://astrobob.itch.io/arcane-archer