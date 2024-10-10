import { Direction } from "../types/direction.js";
import { Position } from "../types/position.js";
import { GameScreen } from "../types/gamescreen.js";
import { Switch } from "../types/switch.js";
import { Entity } from "./entity.js";
export abstract class Phantom extends Entity {
  kill: number = 0; //to update
  name: string = ""
  constructor(){
    super();
    this.speed = 20;
  }

  changeDirection(direction: Direction){
    switch (direction) {
      case "up":
          this.direction = "up";
          this.element.style.backgroundImage = `url("images/${this.name}/blinky-default-up.gif")`;
          break;
      case "down":
          this.direction = "down";
          this.element.style.backgroundImage = `url("images/${this.name}/blinky-default-down.gif")`;
          break;
      case "left":
          this.direction = "left";
          this.element.style.backgroundImage = `url("images/${this.name}/blinky-default-right.gif")`;
          this.element.style.transform = "scaleX(-1)"
          break;
      case "right":
          this.direction = "right";
          this.element.style.backgroundImage = `url("images/${this.name}/blinky-default-right.gif")`;
          this.element.style.transform = "rotate(0deg)"
          break;
    }
  }
}