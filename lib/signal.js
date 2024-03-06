export class Signal {
  constructor() {
    this.promise = new Promise((res, rej) => {
      this.resolve = res
      this.reject = rej
    })
  }
}
