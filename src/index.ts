import { Blinky } from "./entities/blinky.js";
import { Player } from "./entities/player.js";

let player = new Player()
let blinky = new Blinky()

function start(){
  window.removeEventListener("keydown", start)
  let start_text = document.getElementById("start_text")!
  start_text.style.display = "none"
  window.addEventListener("keydown", player.changeDirection.bind(player));
  requestAnimationFrame(() => player.move())
  requestAnimationFrame(() => blinky.move())
}

/*
function stop(){
  cancelAnimationFrame(requestAnimationFrame(() => player.move()))
}
*/

window.addEventListener("keydown", start)


