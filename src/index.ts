import { Blinky } from "./entities/blinky.js";
import { Player } from "./entities/player.js";
import { GameScreen } from "./types/gamescreen.js";

let gamescreen = new GameScreen()
//let player = new Player(gamescreen)
//let blinky = new Blinky(gamescreen)
/*
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


window.addEventListener("keydown", start)
*/


