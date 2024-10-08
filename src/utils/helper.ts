export function getStep(speed: number, screenWidth: number): number{
  return screenWidth/360 - speed;
}