const { Game } = require("./game");
const { GameView } = require("./game_view");


document.addEventListener("DOMContentLoaded", function() {
    const canvas = document.getElementsByTagName("canvas")[0];
    const context = canvas.getContext("2d");
    const game = new Game();
    new GameView(game, context).start();
});