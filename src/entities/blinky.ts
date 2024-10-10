import { Phantom } from "./phantom.js";
import { GameScreen } from "../types/gamescreen.js";
import { Player } from "./player.js";

export class Blinky extends Phantom {
  constructor(gameScreen: GameScreen){
    super();
    this.name = "blinky";
    this.element = document.getElementById("blinky")!
    this.pos = this.setPos((gameScreen.getHeight()/4)*(-1), (gameScreen.getHeight()/4)*(-1), gameScreen)
    this.element.style.display = "inline";
    this.setDirection("left")
  }

  move(gameScreen: GameScreen, player: Player, frame: number = 1){
    const rect = gameScreen.element.getBoundingClientRect();
    const step = gameScreen.getStep(this.speed);

    if(frame >= 15){
      this.chase(player)
      frame = 0
    }

    if (this.pos.y >= rect.height - this.element.offsetHeight - 10) {  //top border
      this.setDirection("down")
    } else if (this.pos.y <= 1) {  //bottom border
      this.setDirection("up")
    } else if (this.pos.x <= 1) {  //left border
      this.setDirection("right")
    } else if (this.pos.x >= rect.width - this.element.offsetWidth - 10) { //right border
      this.setDirection("left")
    }

    this.forward(step);
    requestAnimationFrame(() => this.move(gameScreen, player, frame + 1));
  }

  chase(player: Player){
    /*
    const distance_x: number = player.pos.x - this.pos.x
    const distance_y: number = player.pos.y - this.pos.y
    if(Math.abs(distance_x) >= Math.abs(distance_y)){
      if(distance_x < 0){
        this.setDirection("left")
      } else {
        this.setDirection("right")
      }
    } else {
      if(distance_y < 0){
        this.setDirection("down")
      } else {
        this.setDirection("up")
      }
    }
      */
    this.aim(player.pos.x, player.pos.y)

  }

  
}