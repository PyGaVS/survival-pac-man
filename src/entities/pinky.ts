import { Phantom } from "./phantom.js";
import { GameScreen } from "../types/gamescreen.js";
import { Player } from "./player.js";

export class Pinky extends Phantom {
  constructor(gameScreen: GameScreen){
    super();
    this.name = "pinky";
    this.element = document.getElementById("pinky")!
    this.pos = this.setPos((gameScreen.getHeight()/10)*(-1), (gameScreen.getHeight()/4)*(-1), gameScreen)
    this.element.style.display = "inline";
    this.setDirection("down")
  }

  move(gameScreen: GameScreen, player: Player, frame: number = 1){
    const rect = gameScreen.element.getBoundingClientRect();
    const step = gameScreen.getStep(this.speed);

    if(frame >= 30){
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

  public chase(player: Player){}
}