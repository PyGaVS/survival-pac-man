import { Direction } from "../types/direction.js";
import { Position } from "../types/position.js";
import { GameScreen } from "../types/gamescreen.js";
import { Switch } from "../types/switch.js";
import { Entity } from "./entity.js";
export abstract class Phantom extends Entity {
  kill: number = 0; //to update
  
  constructor(){
    super();
    this.speed = 25;
  }

  changeDirection(direction: Direction){
    switch (direction) {
      case "up":
          this.direction = "up";
          break;
      case "down":
          this.direction = "down";
          break;
      case "left":
          this.direction = "left";
          break;
      case "right":
          this.direction = "right";
          break;
    }
  }
}