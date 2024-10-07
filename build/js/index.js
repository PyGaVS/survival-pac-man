import { Player } from "./types/player.js";
function start() {
    let player = new Player();
    window.addEventListener("keydown", player.changeDirection.bind(player));
    requestAnimationFrame(() => player.move());
}
start();
