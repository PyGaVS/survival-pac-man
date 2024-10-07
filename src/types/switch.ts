export type Switch = {
  [key: string]: (...params: unknown[]) => void
  default:  (...params: unknown[]) => void
}