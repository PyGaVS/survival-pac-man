export function setPos(element: HTMLElement, x: number, y: number): HTMLElement{
  if(x < 0){
    element.style.right = `${-x}px`
  } else {
    element.style.left = `${x}px` 
  }
  
  if(y < 0){
    element.style.top = `${-y}px`
  } else {
    element.style.bottom = `${y}px`;
  }

  return element;
}

export function delay(ms: number){
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function getRandomInt(min: number, max: number):number {
  return Math.floor(Math.random()*((max+1)-min)+min)
}