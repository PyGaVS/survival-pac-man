import { Direction } from "../types/direction.js";
import { Switch } from "../types/switch.js";
import { GameScreen } from "../types/gamescreen.js";
import { Position } from "../types/position.js";
import { Entity } from "./entity.js";

export class Player extends Entity {
  public score: number = 0;

  constructor(gameScreen: GameScreen){
    super();
    this.element = document.getElementById("player")!;
    this.pos = {x: gameScreen.getHeight()/10, y: gameScreen.getHeight()/10}
    this.setPos(this.pos.x, this.pos.y, gameScreen)
    this.element.style.display = "inline";
  }

  public move(gameScreen: GameScreen){
    const rect = gameScreen.element.getBoundingClientRect();
    const step = gameScreen.getStep(this.speed);

    if (this.pos.y >= rect.height - this.element.offsetHeight - 10) {  //top border
      this.changeDirection(undefined, "down")
    } else if (this.pos.y <= 1) {  //bottom border
      this.changeDirection(undefined, "up")
    } else if (this.pos.x <= 1) {  //left border
      this.changeDirection(undefined, "right")
    } else if (this.pos.x >= rect.width - this.element.offsetWidth - 10) { //right border
      this.changeDirection(undefined, "left")
    }

    this.forward(step);
    requestAnimationFrame(() => this.move(gameScreen));
  }

  public changeDirection(event?: KeyboardEvent, force?: Direction){
    if(force){
      switch (force) {
        case "up":
            this.direction = "up";
            this.element.style.transform = "rotate(270deg)"
            break;
        case "down":
            this.direction = "down";
            this.element.style.transform = "rotate(90deg)"
            break;
        case "left":
            this.direction = "left";
            this.element.style.transform = "scaleX(-1)"
            break;
        case "right":
            this.direction = "right";
            this.element.style.transform = "rotate(0deg)"
            break;
      }
    } else if(event) {
      switch (event.key) {
        case "ArrowUp":
            this.direction = "up";
            this.element.style.transform = "rotate(270deg)"
            break;
        case "ArrowDown":
            this.direction = "down";
            this.element.style.transform = "rotate(90deg)"
            break;
        case "ArrowLeft":
            this.direction = "left";
            this.element.style.transform = "scaleX(-1)"
            break;
        case "ArrowRight":
            this.direction = "right";
            this.element.style.transform = "rotate(0deg)"
            break;
      }
    }
  }
}