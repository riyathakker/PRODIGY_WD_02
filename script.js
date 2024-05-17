const timeDisplay = document.querySelector('.time-display');
const startBtn = document.querySelector('.start-btn');
const pauseBtn = document.querySelector('.pause-btn');
const resetBtn = document.querySelector('.reset-btn');
const lapBtn = document.querySelector('.lap-btn');
const lapList = document.querySelector('.lap-list');

let startTime = null;
let elapsedTime = 0;
let timerInterval = null;
let isRunning = false;
let lapTimes = [];

function formatTime(time) {
  const hours = Math.floor(time / 3600000);
  const minutes = Math.floor((time % 3600000) / 60000);
  const seconds = Math.floor((time % 60000) / 1000);
  const milliseconds = time % 1000;

  return `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}.${padZero(milliseconds, 3)}`;
}

function padZero(value, length = 2) {
  return value.toString().padStart(length, '0');
}

function startTimer() {
  if (!isRunning) {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(updateTimer, 10);
    isRunning = true;
    startBtn.textContent = 'Resume';
  }
}

function pauseTimer() {
  if (isRunning) {
    clearInterval(timerInterval);
    elapsedTime = Date.now() - startTime;
    isRunning = false;
    startBtn.textContent = 'Start';
  }
}

function resetTimer() {
  clearInterval(timerInterval);
  elapsedTime = 0;
  startTime = null;
  isRunning = false;
  timeDisplay.textContent = '00:00:00.000';
  startBtn.textContent = 'Start';
  lapList.innerHTML = '';
  lapTimes = [];
}

function updateTimer() {
  elapsedTime = Date.now() - startTime;
  timeDisplay.textContent = formatTime(elapsedTime);
}

function recordLap() {
  if (isRunning) {
    const lapTime = formatTime(elapsedTime);
    lapTimes.push(lapTime);
    const lapItem = document.createElement('li');
    lapItem.textContent = `Lap ${lapTimes.length}: ${lapTime}`;
    lapList.appendChild(lapItem);
  }
}

startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);
lapBtn.addEventListener('click', recordLap);
document.addEventListener('keydown', (event) => {
  if (event.code === 'Space') {
    if (isRunning) {
      pauseTimer();
    } else {
      startTimer();
    }
  } else if (event.code === 'KeyL') {
    recordLap();
  }
});