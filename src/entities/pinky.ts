import { Phantom } from "./phantom.js";
import { GameScreen } from "../types/gamescreen.js";
import { Player } from "./player.js";
import { Switch } from "../types/switch.js";
import { Position } from "../types/position.js";

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
      this.chase(player, gameScreen)
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

  public chase(player: Player, gameScreen: GameScreen){
    let targetX: number = player.pos.x;
    let targetY: number = player.pos.y;
    const target_range: number = this.getTargetRange(player.pos, (gameScreen.getWidth()/16)*4)
    const directions: Switch = {
      up: () => {
        targetY += target_range
      },
      down: () => {
        targetY -= target_range
      },
      left: () => {
        targetX -= target_range
      },
      right: () => {
        targetX += target_range
      }
    };

    (directions[player.direction] ?? directions.right)()

    this.aim(targetX, targetY)
  }

  private getTargetRange(playerPos: Position, maxRange: number, counter: number = 0): number{
    if(Math.abs(playerPos.x - this.pos.x) < maxRange && Math.abs(playerPos.y - this.pos.y) < maxRange && counter < 2){
      return this.getTargetRange(playerPos, maxRange*0.8, counter+1)
    }
    return maxRange
  }
}