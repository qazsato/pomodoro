window.onload = () => {
  const pomodoro = new Pomodoro(function (remainSec) {
    const min = Math.floor(remainSec / 60);
    let sec = remainSec % 60;
    sec = sec < 10 ? `0${sec}`: sec;
    document.querySelectorAll('.min')[0].innerText = `${min}`;
    document.querySelectorAll('.sec')[0].innerText = `${sec}`;
    if (remainSec <= 0) {
      setTimeout(() => alert('end')); // HACK 0:00時点のDOM書き換えがalertで阻止され描画されないためtimeoutで逃がす
    }
  });
  setDefaultTime();

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
    setDefaultTime();
    pomodoro.reset();
  });
};

function setDefaultTime() {
  const min = Math.floor(POMODORO_TIME / 1000 / 60);
  let sec = POMODORO_TIME / 1000 % 60;
  document.querySelectorAll('.min')[0].innerText = min;
  document.querySelectorAll('.sec')[0].innerText = sec < 10 ? `0${sec}`: sec;
}