export class Screen {
  public element: HTMLElement

  constructor(){
    //init screen size
    this.element = document.getElementById("screen")!;
    this.element.style.width = this.getWidth().toString() + 'px';
    this.element.style.height = this.getHeight().toString() + 'px';
  }

  public getStep(speed: number): number{
    return this.getWidth()/(360 - speed);
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
}