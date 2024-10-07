import { Direction } from "./direction.js";
import { Switch } from "./switch.js";

export class Player {
  score: number = 0;
  direction: Direction;
  posx: number = 50;
  posy: number = 50;
  speed: number = 0;
  element: HTMLElement = document.getElementById("player");
  screen: HTMLElement = document.getElementById("screen")

  move(){
    const rect = this.screen.getBoundingClientRect();
    this.speed = rect.width/350;
    console.log(this.speed);

    if (this.posy >= rect.height - this.element.offsetHeight - 10) {
      this.changeDirection(undefined, "down")
    } else if (this.posy <= 1) {
      this.changeDirection(undefined, "up")
    } else if (this.posx <= 1) {
      this.changeDirection(undefined, "right")
    } else if (this.posx >= rect.width - this.element.offsetWidth - 10) {
      this.changeDirection(undefined, "left")
    }

    const directions: Switch = {
      up: () => {
        this.posy += this.speed
        this.element.style.bottom = this.posy.toString() + 'px'
      },
      down: () => {
        this.posy -= this.speed
        this.element.style.bottom = this.posy.toString() + 'px'
      },
      left: () => {
        this.posx -= this.speed
        this.element.style.left = this.posx.toString() + 'px'
      },
      default: () => {
        this.posx += this.speed
        this.element.style.left = this.posx.toString() + 'px'
      }
    };

    (directions[this.direction] ?? directions.default)()
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