import { GameScreen } from "../../types/gamescreen.js";
import { delay, getRandomInt } from "../../utils/helper.js";
import { Entity } from "../entity.js";

export class Dot extends Entity {
  public spawned: boolean = false;

  constructor(element: HTMLElement){
    super();
    this.pos = {x: 0, y: 0}
    this.speed = 0
    this.element = element
    this.element.style.display = "none";
  }

  public spawn(gameScreen: GameScreen){
    this.setPos(gameScreen.getHeight()/100*getRandomInt(10, 90), gameScreen.getHeight()/100*getRandomInt(10, 90), gameScreen)
    this.element.style.display = "inline"
    this.spawned = true
  }

  public despawn(gameScreen: GameScreen){
    this.element.style.display = "none";
    this.cooldown(gameScreen);
    this.spawned = false;
  }

  public cooldown(gameScreen: GameScreen){
    delay(5000).then(
      () => this.spawn(gameScreen)
    )
  }
}