import { Direction } from "../types/direction.js";
import { Switch } from "../types/switch.js";
import { GameScreen } from "../types/gamescreen.js";
import { Position } from "../types/position.js";
import { Entity } from "./entity.js";

export class Player extends Entity {

  public bestScore: number = 0;

  constructor(gameScreen: GameScreen){
    super();
    this.element = document.getElementById("player")!;
    this.setDirection("right");
    this.pos = {x: gameScreen.getHeight()/10, y: gameScreen.getHeight()/10};
    this.setPos(this.pos.x, this.pos.y, gameScreen);
    this.element.style.display = "inline";
    this.setScore(0, gameScreen.scoreText, true);
    this.setBestScore(gameScreen.bestScoreText, Number(localStorage.getItem('best')) ?? 0);
  }

  public move(gameScreen: GameScreen){
    const rect = gameScreen.element.getBoundingClientRect();
    const step = gameScreen.getStep(this.speed);

    if (this.pos.y >= rect.height - this.element.offsetHeight - 10) {  //top border
      this.setDirection("down")
    } else if (this.pos.y <= 1) {  //bottom border
      this.setDirection("up")
    } else if (this.pos.x <= 1) {  //left border
      this.setDirection("right")
    } else if (this.pos.x >= rect.width - this.element.offsetWidth - 10) { //right border
      this.setDirection("left")
    }

    this.forward(step);
  }

  public setDirection(direction: Direction){
    switch (direction) {
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
  }

  public getEvent(event: KeyboardEvent){
    switch (event.key) {
      case "ArrowUp":
          this.setDirection("up")
          break;
      case "ArrowDown":
          this.setDirection("down")
          break;
      case "ArrowLeft":
          this.setDirection("left")
          break;
      case "ArrowRight":
          this.setDirection("right")
          break;
    }
  }

  public isColliding(entity: Entity){
    const rect = this.element.getBoundingClientRect();
    const entityRect = this.element.getBoundingClientRect();
    return !(
      this.pos.x + rect.width < entity.pos.x ||
      this.pos.x > entity.pos.x + entityRect.width ||
      this.pos.y + rect.height < entity.pos.y ||
      this.pos.y > entity.pos.y + entityRect.height
    )
  }

  public setScore(score: number, scoreText: HTMLElement, reset: boolean = false){
    this.score = reset ? score : this.score + 1
    scoreText.innerHTML = `Score : ${this.score}`
  }

  public setBestScore(bestScoreText: HTMLElement, score: number = this.score){
    if(score > this.bestScore){
      localStorage.setItem("best", score.toString())
      this.bestScore = score
      bestScoreText.innerHTML = `Best : ${score}`
    }
  }
}