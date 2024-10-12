import { GameScreen } from "../types/gamescreen.js";
import { getRandomInt } from "../utils/helper.js";
import { Phantom } from "./phantom.js";
import { Player } from "./player.js";

export class Clyde extends Phantom {
  constructor(gameScreen: GameScreen){
    super();
    this.name = "clyde";
    this.element = document.getElementById("clyde")!
    this.pos = this.setPos((gameScreen.getHeight()/10)*(-1), (gameScreen.getHeight()/10)*(-1), gameScreen)
    this.element.style.display = "inline";
    this.setDirection("up")
  }

  move(gameScreen: GameScreen, player: Player, frame: number = 1){
    const rect = gameScreen.element.getBoundingClientRect();
    const step = gameScreen.getStep(this.speed);

    if(frame % 30 == 0){
      this.chase(player, gameScreen)
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

  public chase(player: Player, gameScreen: GameScreen){
    const random: number = getRandomInt(1, 5);
    switch (random) {
      case 1:
        this.setDirection("up");
        break;
      case 2:
        this.setDirection("down");
        break;
      case 3:
        this.setDirection("left");
        break;
      case 4:
        this.setDirection("right");
        break;
      case 5:
        this.aim(gameScreen.getWidth()/2, gameScreen.getHeight()/2)
        break;
    }

    if(this.isCloseTo(player.pos, gameScreen.getRange(10))){
      this.aim(player.pos.x, player.pos.y)
    }
  }
}