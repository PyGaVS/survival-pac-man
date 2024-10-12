import { Blinky } from "../entities/blinky.js";
import { Phantom } from "../entities/phantom.js";
import { Pinky } from "../entities/pinky.js";
import { Player } from "../entities/player.js";

export class GameScreen {
  public element: HTMLElement;
  public player: Player;
  public blinky: Blinky;
  public pinky: Pinky;
  public phantoms: Phantom[]
  public boundStart: () => void;

  constructor(){
    //init gameScreen size
    this.element = document.getElementById("gameScreen")!;
    this.element.style.width = this.getWidth().toString() + 'px';
    this.element.style.height = this.getHeight().toString() + 'px';

    //init entities
    this.player = new Player(this);
    this.blinky = new Blinky(this);
    this.pinky = new Pinky(this);
    this.phantoms = [this.blinky, this.pinky]

    this.boundStart = () => this.start()
    window.addEventListener("keydown", this.boundStart)
  }

  public getStep(speed: number): number{
    return (this.getWidth()*speed)/(10**4);
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
    window.addEventListener("keydown", this.player.setDirection.bind(this.player));
    requestAnimationFrame(() => this.gameLoop())
  }

  public gameLoop(frame: number = 1){
    if(frame > 60){
      frame = 1;
    }
    this.player.move(this)
    this.blinky.move(this, this.player, frame)
    this.pinky.move(this, this.player, frame)

    for(let phantom of this.phantoms){
      console.log(this.player.isColliding(phantom))
    }

    requestAnimationFrame(() => this.gameLoop(frame + 1))
  }
}