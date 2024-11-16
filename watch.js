const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");
const millisecondsEl = document.getElementById("milliseconds");
const startBtn = document.getElementById("start-btn");
const pauseBtn = document.getElementById("pause-btn");
const resetBtn = document.getElementById("reset-btn");
const lapBtn = document.getElementById("lap-btn");
const lapsList = document.getElementById("laps-list");

let timerInterval;
let milliseconds = 0;
let seconds = 0;
let minutes = 0;
let running = false;

startBtn.addEventListener("click", () => {
  if (!running) {
    running = true;
    timerInterval = setInterval(updateTimer, 10);
  }
});

pauseBtn.addEventListener("click", () => {
  running = false;
  clearInterval(timerInterval);
});

resetBtn.addEventListener("click", () => {
  running = false;
  clearInterval(timerInterval);
  milliseconds = 0;
  seconds = 0;
  minutes = 0;
  updateDisplay();
  lapsList.innerHTML = "";
});

lapBtn.addEventListener("click", () => {
  if (running) {
    const lapTime = `${formatTime(minutes)}:${formatTime(seconds)}:${formatTime(milliseconds)}`;
    const li = document.createElement("li");
    li.textContent = `Lap ${lapsList.children.length + 1}: ${lapTime}`;
    lapsList.appendChild(li);
  }
});

function updateTimer() {
  milliseconds += 1;
  if (milliseconds === 100) {
    milliseconds = 0;
    seconds += 1;
  }
  if (seconds === 60) {
    seconds = 0;
    minutes += 1;
  }
  updateDisplay();
}

function updateDisplay() {
  millisecondsEl.textContent = formatTime(milliseconds);
  secondsEl.textContent = formatTime(seconds);
  minutesEl.textContent = formatTime(minutes);
}

function formatTime(time) {
  return time < 10 ? `0${time}` : `${time}`;
}
