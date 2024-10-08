import { getStep } from "../utils/helper.js";
import { Direction } from "./direction.js";
import { Switch } from "./switch.js";
import { Screen } from "./screen.js";

export class Player extends Screen {
  public score: number = 0;
  public direction: Direction;
  public posx: number = 50;
  public posy: number = 50;
  public speed: number = 0;    //to update
  public element: HTMLElement = document.getElementById("player");

  constructor(){
    super();
    this.posy = this.screenElement.getBoundingClientRect().height/10;
    this.posx = this.posy;
    this.element.style.left = `${this.posx}px`;
    this.element.style.bottom = `${this.posy}px`;
    this.element.style.display = "inline";
  }

  move(){
    const rect = this.screenElement.getBoundingClientRect();
    const step = getStep(this.speed, rect.width);

    if (this.posy >= rect.height - this.element.offsetHeight - 10) {  //top border
      this.changeDirection(undefined, "down")
    } else if (this.posy <= 1) {  //bottom border
      this.changeDirection(undefined, "up")
    } else if (this.posx <= 1) {  //left border
      this.changeDirection(undefined, "right")
    } else if (this.posx >= rect.width - this.element.offsetWidth - 10) { //right border
      this.changeDirection(undefined, "left")
    }

    const directions: Switch = {
      up: () => {
        this.posy += step
        this.element.style.bottom = `${this.posy}px`
      },
      down: () => {
        this.posy -= step
        this.element.style.bottom = `${this.posy}px`
      },
      left: () => {
        this.posx -= step
        this.element.style.left = `${this.posx}px`
      },
      right: () => {
        this.posx += step
        this.element.style.left = `${this.posx}px`
      }
    };

    (directions[this.direction] ?? directions.right)()
    requestAnimationFrame(() => this.move());
  }

  changeDirection(event?: KeyboardEvent, force?: Direction){
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
    } else {
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