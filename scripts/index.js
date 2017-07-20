window.onload = () => {
  const pomodoro = new Pomodoro(function (status, remainSec) {
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

  const pomodoroBtn = document.querySelectorAll('#pomodoro-btn')[0];
  let isRunning = false;
  pomodoroBtn.addEventListener('click', () => {
    if (isRunning) {
      pomodoro.stop();
      pomodoro.reset();
      setDefaultTime();
      pomodoroBtn.innerText = 'START';
    } else {
      pomodoro.start();
      pomodoroBtn.innerText = 'STOP';
    }
    isRunning = !isRunning;
  });
};

function setDefaultTime() {
  const min = Math.floor(TIME.POMODORO / 60);
  let sec = TIME.POMODORO % 60;
  document.querySelectorAll('.min')[0].innerText = min;
  document.querySelectorAll('.sec')[0].innerText = sec < 10 ? `0${sec}`: sec;
}