import { GameScreen } from "../../types/gamescreen.js";
import { delay, getRandomInt } from "../../utils/helper.js";
import { Entity } from "../entity.js";

export class Dot extends Entity {
  public spawned: boolean = false;
  public gameId: number;

  constructor(element: HTMLElement, gameId: number){
    super();
    this.pos = {x: 0, y: 0}
    this.speed = 0
    this.element = element
    this.element.style.display = "none";
    this.gameId = gameId;
  }

  public spawn(gameScreen: GameScreen){
    if(gameScreen.gameId === this.gameId){
      this.setPos(gameScreen.getHeight()/100*getRandomInt(10, 90), gameScreen.getHeight()/100*getRandomInt(10, 90), gameScreen)
      this.element.style.display = "inline"
      this.spawned = true
    }
  }

  public despawn(gameScreen: GameScreen){
    this.element.style.display = "none";
    this.cooldown(gameScreen);
    this.spawned = false;
  }

  public cooldown(gameScreen: GameScreen){
    delay(5000).then(
      () => { this.spawn(gameScreen) }
    )
  }
}