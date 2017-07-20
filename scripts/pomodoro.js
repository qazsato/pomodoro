const TIME = {
  // POMODORO: 25 * 60,
  // BREAK_SHORT: 5 * 60,
  // BREAK_LONG: 30 * 60
  POMODORO: 3,
  BREAK_SHORT: 3,
  BREAK_LONG: 3
};

const STATUS = {
  POMODORO: 'pomodoro',
  BREAK_SHORT: 'break_short',
  BREAK_LONG: 'break_long'
};

class Pomodoro {
  constructor(callback) {
    this.callback = callback;
    this.intervalID = null;
    this.prevTime = null;
    this.count = {
      pomodoro: 0,
      break: 0
    };
    this.status = this._getStatus();
    this.remainTime = this._getRemainTime();
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
    this.remainTime = this._getRemainTime();
  }

  _count() {
    if (!this.prevTime) {
      this.prevTime = this._getTime();
      return;
    }
    const nextTime = this._getTime();
    const diffTime = nextTime - this.prevTime;
    this.remainTime = (this.remainTime - diffTime) < 0 ? 0 : (this.remainTime - diffTime);
    this.callback(this.status, this.remainTime);
    this.prevTime = nextTime;
    if (this.remainTime === 0) {
      if (this.status === STATUS.POMODORO) {
        this.count.pomodoro++;
      } else {
        this.count.break++;
      }
      this.status = this._getStatus();
      this.remainTime = this._getRemainTime();
    } else {
      
    }
  }

  _getTime() {
    return Math.round(new Date().getTime() / 1000);
  }

  _getStatus() {
    let status;
    if (this.count.pomodoro === this.count.break) {
      status = STATUS.POMODORO;
    } else if (this.count.pomodoro % 4 === 0) {
      status = STATUS.BREAK_LONG;
    } else if (this.count.pomodoro > this.count.break) {
      status = STATUS.BREAK_SHORT;
    }
    return status;
  }

  _getRemainTime() {
    let time;
    if (this.status === STATUS.POMODORO) {
      time = TIME.POMODORO;
    } else if (this.status === STATUS.BREAK_SHORT) {
      time = TIME.BREAK_SHORT;
    } else if (this.status === STATUS.BREAK_LONG) {
      time = TIME.BREAK_LONG;
    }
    return time;
  }
}