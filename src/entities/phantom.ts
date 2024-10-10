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
    this.speed = 15;
  }

  public setDirection(direction: Direction){
    switch (direction) {
      case "up":
          this.direction = "up";
          this.element.style.backgroundImage = `url("images/${this.name}/${this.name}-default-up.gif")`;
          break;
      case "down":
          this.direction = "down";
          this.element.style.backgroundImage = `url("images/${this.name}/${this.name}-default-down.gif")`;
          break;
      case "left":
          this.direction = "left";
          this.element.style.backgroundImage = `url("images/${this.name}/${this.name}-default-right.gif")`;
          this.element.style.transform = "scaleX(-1)"
          break;
      case "right":
          this.direction = "right";
          this.element.style.backgroundImage = `url("images/${this.name}/${this.name}-default-right.gif")`;
          this.element.style.transform = "rotate(0deg)"
          break;
    }
  }

  public aim(x: number, y: number){
    const distance_x: number = x - this.pos.x
    const distance_y: number = y - this.pos.y
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
  }
}