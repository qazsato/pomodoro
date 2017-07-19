const pomodoro = new Pomodoro(function (remainTime) {
  const time = Math.round(this.remainTime / 1000);
  const min = Math.floor(time / 60);
  let sec = time % 60;
  sec = sec < 10 ? `0${sec}`: sec;
  document.querySelectorAll('.min')[0].innerText = `${min}`;
  document.querySelectorAll('.sec')[0].innerText = `${sec}`;
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
  document.querySelectorAll('.min')[0].innerText = '25';
  document.querySelectorAll('.sec')[0].innerText = '00';
  pomodoro.reset();
});
