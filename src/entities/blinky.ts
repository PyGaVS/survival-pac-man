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

    if(frame % 15 == 0){
      this.chase(player)
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
  }

  chase(player: Player){
    this.aim(player.pos.x, player.pos.y)
  }

  
}