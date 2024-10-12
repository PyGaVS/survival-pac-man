import { Direction } from "../types/direction.js";
import { Position } from "../types/position.js";
import { GameScreen } from "../types/gamescreen.js";
import { Switch } from "../types/switch.js";

export class Entity {

  public direction: Direction = "right";
  public pos!: Position
  public speed: number = 30;
  public element!: HTMLElement;
  //public gamescreen: GameScreen

  constructor(){}

  public setPos(x: number, y: number, gameScreen: GameScreen): Position {
    this.pos = {x: 0, y: 0}
    if(x < 0){
      this.pos.x = gameScreen.getWidth() + x
    } else {
      this.pos.x = x;
    }
    
    if(y < 0){
      this.pos.y = gameScreen.getHeight() + y
    } else {
      this.pos.y = y;
    }

    this.element.style.left = `${this.pos.x}px`
    this.element.style.bottom = `${this.pos.y}px`
    return this.pos;
  }

  protected forward(step: number){
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
  } 

  protected isCloseTo(pos: Position, range: number): boolean{
    return Math.abs(pos.x - this.pos.x) < range && Math.abs(pos.y - this.pos.y) < range
  }
}