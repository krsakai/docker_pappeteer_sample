export {};

declare global {
  interface Array<T> {
    removeNull<T>(): Array<T>;
  }
}

Array.prototype.removeNull = function <T>(): Array<T> {
  return this.filter((item) => item !== null);
};
