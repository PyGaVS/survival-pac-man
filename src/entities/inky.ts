import { GameScreen } from "../types/gamescreen.js";
import { Phantom } from "./phantom.js";
import { Player } from "./player.js";

export class Inky extends Phantom {
  constructor(gameScreen: GameScreen){
    super();
    this.name = "inky";
    this.element = document.getElementById("inky")!
    this.pos = this.setPos((gameScreen.getHeight()/4)*(-1), (gameScreen.getHeight()/10)*(-1), gameScreen)
    this.element.style.display = "inline";
    this.setDirection("left")
  }

  public move(gameScreen: GameScreen, player: Player, phantoms: Phantom[], frame: number = 1){
    const rect = gameScreen.element.getBoundingClientRect();
    const step = gameScreen.getStep(this.speed);

    if(frame % 30 == 0){
      this.chase(player, phantoms, gameScreen)
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

  public chase(player: Player, phantoms: Phantom[], gameScreen: GameScreen){
    const blinky = phantoms.find(phantom => phantom.name === "blinky")!
    const pinky = phantoms.find(phantom => phantom.name === "pinky")!
    const clyde = phantoms.find(phantom => phantom.name === "clyde")!

    if(this.isCloseTo(blinky.pos, gameScreen.getRange(10))){
      this.aimAway(blinky.pos.x, blinky.pos.y)
    } else if(this.isCloseTo(pinky.pos, gameScreen.getRange(10))){
      this.aimAway(pinky.pos.x, pinky.pos.y)
    } else if(this.isCloseTo(clyde.pos, gameScreen.getRange(10))){
      this.aimAway(clyde.pos.x, clyde.pos.y)
    } else {
      this.aim(player.pos.x, player.pos.y)
    }
  }
}