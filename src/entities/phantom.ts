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

  move(gameScreen: GameScreen){
    const rect = this.element.getBoundingClientRect();
    const step = gameScreen.getStep(this.speed);
    console.log(`blinky : ${step}`)

    if (this.pos.y >= rect.height - this.element.offsetHeight - 10) {  //top border
      this.changeDirection("down")
    } else if (this.pos.y <= 1) {  //bottom border
      this.changeDirection("up")
    } else if (this.pos.x <= 1) {  //left border
      this.changeDirection("right")
    } else if (this.pos.x >= rect.width - this.element.offsetWidth - 10) { //right border
      this.changeDirection("left")
    }

    const directions: Switch = {
      up: () => {
        this.pos.y += step
        this.element.style.bottom = `${this.pos.y}px`
      },
      down: () => {
        this.pos.y -= step
        this.element.style.bottom = `${this.pos.y}px`
      },
      left: () => {
        this.pos.x -= step
        this.element.style.left = `${this.pos.x}px`
      },
      right: () => {
        this.pos.x += step
        this.element.style.left = `${this.pos.x}px`
      }
    };

    (directions[this.direction] ?? directions.right)()
    requestAnimationFrame(() => this.move(gameScreen));
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