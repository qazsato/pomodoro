const pomodoro = new Pomodoro(function (remainTime) {
  const time = Math.round(this.remainTime / 1000);
  const min = Math.floor(time / 60);
  const sec = time % 60;
  console.log('残り時間', `${min} : ${sec}`);
});

const startBtn = document.querySelectorAll('#start')[0];
const stopBtn = document.querySelectorAll('#stop')[0];
const resetBtn = document.querySelectorAll('#reset')[0];
startBtn.addEventListener('click', () => {
  pomodoro.start();
});
stopBtn.addEventListener('click', () => {
  pomodoro.stop();
});
resetBtn.addEventListener('click', () => {
  pomodoro.reset();
});
