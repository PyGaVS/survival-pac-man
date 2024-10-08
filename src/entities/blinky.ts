import { Phantom } from "./phantom.js";
import { setPos } from "../utils/helper.js";
import { Direction } from "../types/direction.js";
import { Switch } from "../types/switch.js";
import { Entity } from "./entity.js";

export class Blinky extends Phantom {
  constructor(){
    super();
    this.element = document.getElementById("blinky")!
    console.log((this.screen.getHeight()/10)*(-1))
    this.pos = this.setPos((this.screen.getHeight()/10)*(-1), (this.screen.getHeight()/10)*(-1))
    console.log(this.pos)
    this.element.style.display = "inline";
    this.direction = "left"
  }

  move(){
    const rect = this.screen.element.getBoundingClientRect();
    const step = this.screen.getStep(this.speed);

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
    requestAnimationFrame(() => this.move());
  }

  
}