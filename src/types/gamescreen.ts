import { Blinky } from "../entities/blinky.js";
import { Phantom } from "../entities/phantom.js";
import { Player } from "../entities/player.js";

export class GameScreen {
  public element: HTMLElement;
  public player: Player;
  public blinky: Blinky;
  public boundStart: () => void;

  constructor(){
    //init gameScreen size
    this.element = document.getElementById("gameScreen")!;
    this.element.style.width = this.getWidth().toString() + 'px';
    this.element.style.height = this.getHeight().toString() + 'px';

    //init entities
    this.player = new Player(this);
    this.blinky = new Blinky(this);

    this.boundStart = () => this.start()
    window.addEventListener("keydown", this.boundStart)
  }

  public getStep(speed: number): number{
    return this.getWidth()/(500 - speed);
  }

  public getWidth(): number {
    return this.element.getBoundingClientRect().width;
  }

  public getHeight(): number {
    return this.element.getBoundingClientRect().height;
  }

  public setPos(element: HTMLElement, x: number, y: number): HTMLElement{
    if(x < 0){
      element.style.left = `${this.getWidth() - x}px`
      console.log(element.style.left)
    } else {
      element.style.left = `${x}px` 
    }
    
    if(y < 0){
      element.style.bottom = `${this.getHeight() - y}px`
    } else {
      element.style.bottom = `${y}px`;
    }
  
    return element;
  }

  public start(){
    window.removeEventListener("keydown", this.boundStart)
    let start_text = document.getElementById("start_text")!
    start_text.style.display = "none"
    console.log("START");
    window.addEventListener("keydown", this.player.changeDirection.bind(this.player));
    requestAnimationFrame(() => this.player.move(this))
    requestAnimationFrame(() => this.blinky.move(this))
  }
}