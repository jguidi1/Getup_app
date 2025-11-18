// Timer
let seconds = 3600; // 1 hour
const timerEl = document.getElementById('timer');
const alarm = document.getElementById('alarm-sound');

function updateTimer() {
  const mins = Math.floor(seconds / 60).toString().padStart(2,'0');
  const secs = (seconds % 60).toString().padStart(2,'0');
  timerEl.textContent = `Next Walk Reminder In: ${mins}:${secs}`;
  
  if (seconds === 0) {
    alert("Time to get up and walk 0.25 miles!");
    alarm.play();
    seconds = 3600; // reset
  } else {
    seconds--;
  }
}

setInterval(updateTimer, 1000);

// Walk tracker
let walkedDistance = 0; // in miles
const goal = 0.25;
const walkStatus = document.getElementById('walk-status');
const progressBar = document.getElementById('progress-bar');
const updateBtn = document.getElementById('update-walk');

updateBtn.addEventListener('click', () => {
  if (!navigator.geolocation) {
    alert("Geolocation not supported");
    return;
  }

  navigator.geolocation.getCurrentPosition((pos) => {
    // Approximation: use speed (meters/second) * 5 seconds per click
    const meters = pos.coords.speed ? pos.coords.speed * 5 : 0;
    const miles = meters / 1609.34;
    walkedDistance = Math.min(walkedDistance + miles, goal);

    walkStatus.textContent = `Walked: ${walkedDistance.toFixed(3)} / ${goal} miles`;
    progressBar.style.width = `${(walkedDistance/goal)*100}%`;

    if (walkedDistance >= goal) {
      alert("✅ Goal reached!");
    }
  });
});
