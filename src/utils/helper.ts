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