import { Phantom } from "./phantom.js";
import { setPos } from "../utils/helper.js";
import { Direction } from "../types/direction.js";
import { Switch } from "../types/switch.js";
import { Entity } from "./entity.js";
import { GameScreen } from "../types/gamescreen.js";
import { Player } from "./player.js";

export class Blinky extends Phantom {
  constructor(gameScreen: GameScreen){
    super();
    this.name = "blinky";
    this.element = document.getElementById("blinky")!
    this.pos = this.setPos((gameScreen.getHeight()/10)*(-1), (gameScreen.getHeight()/10)*(-1), gameScreen)
    this.element.style.display = "inline";
    this.direction = "left"
  }

  move(gameScreen: GameScreen, player: Player, frame: number = 1){
    const rect = gameScreen.element.getBoundingClientRect();
    const step = gameScreen.getStep(this.speed);

    if(frame >= 30){
      this.chase(player)
      frame = 0
    }

    if (this.pos.y >= rect.height - this.element.offsetHeight - 10) {  //top border
      this.changeDirection("down")
    } else if (this.pos.y <= 1) {  //bottom border
      this.changeDirection("up")
    } else if (this.pos.x <= 1) {  //left border
      this.changeDirection("right")
    } else if (this.pos.x >= rect.width - this.element.offsetWidth - 10) { //right border
      this.changeDirection("left")
    }

    this.forward(step);
    requestAnimationFrame(() => this.move(gameScreen, player, frame + 1));
  }

  chase(player: Player){
    const distance_x: number = player.pos.x - this.pos.x
    const distance_y: number = player.pos.y - this.pos.y
    if(Math.abs(distance_x) >= Math.abs(distance_y)){
      if(distance_x < 0){
        this.changeDirection("left")
      } else {
        this.changeDirection("right")
      }
    } else {
      if(distance_y < 0){
        this.changeDirection("down")
      } else {
        this.changeDirection("up")
      }
    }

  }

  
}