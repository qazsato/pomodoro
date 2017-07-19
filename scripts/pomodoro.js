const POMODORO_TIME = 25 * 60 * 1000;
const BREAK_SHORT_TIME = 5 * 60 * 1000;
const BREAK_LONG_TIME = 10 * 60 * 1000;

class Pomodoro {
  constructor(callback) {
    this.callback = callback;
    this.intervalID = null;
    this.prevTime = null;
    this.remainTime = POMODORO_TIME;
  }

  start() {
    if (this.intervalID) return;
    this._count();
    this.intervalID = setInterval(() => this._count(), 1000);
  }

  stop() {
    if (!this.intervalID) return;
    clearInterval(this.intervalID);
    this.intervalID = null;
    this.prevTime = null;
  }

  reset() {
    this.remainTime = POMODORO_TIME;
  }

  _count() {
    if (!this.prevTime) {
      this.prevTime = new Date().getTime();
      return;
    }
    const nextTime = new Date().getTime();
    const diffTime = nextTime - this.prevTime;
    this.remainTime = (this.remainTime - diffTime);
    this.callback(this.remainTime);
    this.prevTime = nextTime;
  }
}