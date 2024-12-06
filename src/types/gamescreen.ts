import { Blinky } from "../entities/blinky.js";
import { Clyde } from "../entities/clyde.js";
import { Inky } from "../entities/inky.js";
import { Dot } from "../entities/item/dot.js";
import { Phantom } from "../entities/phantom.js";
import { Pinky } from "../entities/pinky.js";
import { Player } from "../entities/player.js";
import { delay, getRandomInt } from "../utils/helper.js";

export class GameScreen {
  public element: HTMLElement;
  public text: HTMLElement;
  public scoreText: HTMLElement;
  public bestScoreText: HTMLElement
  public gameId: number = 0;
  public player: Player;
  public blinky: Blinky;
  public pinky: Pinky;
  public clyde: Clyde;
  public inky: Inky;
  public phantoms: Phantom[];
  public dots: Dot[];
  public animationId: number
  public boundStart: () => void;
  public boundStop: () => void;
  public boundPlayerEvent: (event: KeyboardEvent) => void;

  constructor(){
    //init gameScreen size
    this.element = document.getElementById("gameScreen")!;
    this.resize()
    console.log(this.getWidth()/16, this.getHeight()/9);

    this.text = document.getElementById("text")!;
    this.scoreText = document.getElementById("scoreText")!;
    this.bestScoreText = document.getElementById("bestScoreText")!;
    //init characters
    this.player = new Player(this);
    this.blinky = new Blinky(this);
    this.pinky = new Pinky(this);
    this.clyde = new Clyde(this);
    this.inky = new Inky(this);
    this.phantoms = [this.blinky, this.pinky, this.clyde, this.inky];

    //init items
    this.dots = [new Dot(document.getElementById("dot1")!, this.gameId), new Dot(document.getElementById("dot2")!, this.gameId)]

    this.boundStart = () => this.start();
    this.boundStop = () => this.stop();
    this.boundPlayerEvent = (event: KeyboardEvent) => this.player.getEvent(event)
    this.animationId = 0
    window.addEventListener("keydown", this.boundStart);
  }

  public init(){
    this.gameId += 1;
    this.player = new Player(this);
    this.blinky = new Blinky(this);
    this.pinky = new Pinky(this);
    this.clyde = new Clyde(this);
    this.inky = new Inky(this);
    this.phantoms = [this.blinky, this.pinky, this.clyde, this.inky]
    this.dots = [new Dot(document.getElementById("dot1")!, this.gameId), new Dot(document.getElementById("dot2")!, this.gameId)]
    this.text.style.display = "block"
    this.text.innerHTML = "Press any button"
    window.addEventListener("keydown", this.boundStart)
  }

  public resize(){
    const width = window.innerWidth;
    const height = window.innerHeight;

    this.element.style.width = (width - width/10).toString()
    this.element.style.height = (height - height/10).toString()

    if(width*16 > height*9){
      this.element.style.width = (width - width/10).toString()
      this.element.style.height = ((width - width/10)/16*9).toString()

      this.element.style.height = (height - height/10).toString()
      this.element.style.width = ((height - height/10)/9*16).toString()
    } else {
      this.element.style.height = (height - height/10).toString()
      this.element.style.width = ((height - height/10)/9*16).toString()
    }
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
    this.animationId = requestAnimationFrame(() => this.gameLoop())
    window.addEventListener("keydown", this.boundPlayerEvent);
    window.addEventListener("keydown", this.getEvent.bind(this));
    for(let dot of this.dots){
      dot.cooldown(this)
    }
  }

  public stop(){
    window.removeEventListener("keydown", this.boundStop)
    this.player.setBestScore(this.bestScoreText)
    console.log("STOP")
    cancelAnimationFrame(this.animationId)
    this.init()
  }

  public lose(){
    console.log("LOSE")
    this.player.setBestScore(this.bestScoreText)
    cancelAnimationFrame(this.animationId)
    this.text.style.display = "block"
    this.text.innerHTML = "you died xD"
    window.removeEventListener("keydown", this.boundPlayerEvent)
    delay(1000).then(() => window.addEventListener("keydown", this.boundStop))
  }

  public getEvent(event: KeyboardEvent){
    switch(event.key){
      case "Escape":
        this.stop()
        break;
    }
  }

  public gameLoop(frame: number = 1, s: number = 0){
    if(frame > 60){ //+1 second
      frame = 1;
      s += 1
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

    for(let dot of this.dots){
      if(this.player.isColliding(dot) && dot.spawned){
        this.player.setScore(1, this.scoreText)
        this.player.setBestScore(this.bestScoreText)
        dot.despawn(this)
      }
    }

    this.animationId = requestAnimationFrame(() => this.gameLoop(frame + 1, s))
  }
}