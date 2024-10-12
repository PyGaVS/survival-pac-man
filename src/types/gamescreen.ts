import { Blinky } from "../entities/blinky.js";
import { Clyde } from "../entities/clyde.js";
import { Inky } from "../entities/inky.js";
import { Phantom } from "../entities/phantom.js";
import { Pinky } from "../entities/pinky.js";
import { Player } from "../entities/player.js";
import { delay, getRandomInt } from "../utils/helper.js";

export class GameScreen {
  public element: HTMLElement;
  public text: HTMLElement
  public player: Player;
  public blinky: Blinky;
  public pinky: Pinky;
  public clyde: Clyde;
  public inky: Inky;
  public phantoms: Phantom[];
  public animationId: number
  public boundStart: () => void;
  public boundStop: () => void;

  constructor(){
    //init gameScreen size
    this.element = document.getElementById("gameScreen")!;
    this.element.style.width = this.getWidth().toString() + 'px';
    this.element.style.height = this.getHeight().toString() + 'px';

    //init entities
    this.player = new Player(this);
    this.blinky = new Blinky(this);
    this.pinky = new Pinky(this);
    this.clyde = new Clyde(this);
    this.inky = new Inky(this);
    this.phantoms = [this.blinky, this.pinky, this.clyde, this.inky];

    this.text = document.getElementById("text")!;
    this.boundStart = () => this.start();
    this.boundStop = () => this.stop();
    this.animationId = 0
    window.addEventListener("keydown", this.boundStart);
  }

  public init(){
    this.player = new Player(this);
    this.blinky = new Blinky(this);
    this.pinky = new Pinky(this);
    this.clyde = new Clyde(this);
    this.inky = new Inky(this);
    this.phantoms = [this.blinky, this.pinky, this.clyde, this.inky]
    this.text.style.display = "block"
    this.text.innerHTML = "Press any button"
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

  public setPos(element: HTMLElement, x: number, y: number): HTMLElement{ //todo : convert x and y to %
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

  public getRange(pourcent: number, side: "w" | "h" = "w"){
    if(side == "w"){
      return (this.getWidth()/100) * pourcent
    } else {
      return (this.getHeight()/100) * pourcent
    }
  }

  public start(){
    window.removeEventListener("keydown", this.boundStart)
    this.text.style.display = "none"
    console.log("START");
    window.addEventListener("keydown", this.player.getEvent.bind(this.player));
    window.addEventListener("keydown", this.getEvent.bind(this));
    this.animationId = requestAnimationFrame(() => this.gameLoop())
  }

  public stop(){
    window.removeEventListener("keydown", this.boundStop)
    console.log("STOP")
    cancelAnimationFrame(this.animationId)
    this.init()
  }

  public lose(){
    console.log("LOSE")
    cancelAnimationFrame(this.animationId)
    this.text.style.display = "block"
    this.text.innerHTML = "you died xD"
    delay(1000).then(() => window.addEventListener("keydown", this.boundStop))
  }

  public getEvent(event: KeyboardEvent){
    switch(event.key){
      case "Escape":
        this.stop()
        break;
    }
  }

  public gameLoop(frame: number = 1){
    if(frame > 60){
      frame = 1;
    }
    this.player.move(this)
    this.blinky.move(this, this.player, frame)
    this.pinky.move(this, this.player, frame)
    this.clyde.move(this, this.player, frame)
    this.inky.move(this, this.player, this.phantoms, frame)

    for(let phantom of this.phantoms){
      if(this.player.isColliding(phantom)){
        this.lose()
        return
      }
    }

    this.animationId = requestAnimationFrame(() => this.gameLoop(frame + 1))
  }
}