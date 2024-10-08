import { Direction } from "../types/direction.js";
import { Position } from "../types/position.js";
import { Screen } from "../types/screen.js";

export class Entity {

  public direction: Direction = "right";
  public pos!: Position
  public speed: number = 10;
  public element!: HTMLElement;
  public screen: Screen

  constructor(){
    this.screen = new Screen()
  }

  public setPos(x: number, y: number): Position {
    this.pos = {x: 0, y: 0}
    if(x < 0){
      this.pos.x = this.screen.getWidth() + x
    } else {
      this.pos.x = x;
    }
    
    if(y < 0){
      this.pos.y = this.screen.getHeight() + y
    } else {
      this.pos.y = y;
    }

    this.element.style.left = `${this.pos.x}px`
    this.element.style.bottom = `${this.pos.y}px`
    return this.pos;
  }
  
}