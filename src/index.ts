import { Player } from "./types/player.js";

let player = new Player()

function start(){
  window.removeEventListener("keydown", start)
  let start_text = document.getElementById("start_text")
  start_text.style.display = "none"
  window.addEventListener("keydown", player.changeDirection.bind(player));
  requestAnimationFrame(() => player.move())
}

/*
function stop(){
  cancelAnimationFrame(requestAnimationFrame(() => player.move()))
}
*/

window.addEventListener("keydown", start)


