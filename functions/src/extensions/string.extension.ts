export {};

declare global {
  interface String {
    twoDigit(): String;
  }
}

String.prototype.twoDigit = function(): String {
  return ('00' + this).slice(-2)
};