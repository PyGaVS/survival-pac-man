import { Direction } from "./direction";

export abstract class Phantom {
  kill: number = 0; //to update
  direction: Direction;
  posx: number;
  posy: number;
  speed: number = 0;  //to update
  element: HTMLElement;
  screen: HTMLElement = document.getElementById("screen");
}