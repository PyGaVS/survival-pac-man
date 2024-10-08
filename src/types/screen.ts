export class Screen {
  protected screenElement: HTMLElement

  constructor(){
    //init screen size
    this.screenElement = document.getElementById("screen");
    this.screenElement.style.width = this.screenElement.getBoundingClientRect().width.toString();
    this.screenElement.style.height = this.screenElement.getBoundingClientRect().height.toString();
  }
}