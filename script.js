// Início da comemoração: 27 de novembro de 2026, às 12h (horário local).
const birthday = new Date("2026-11-27T12:00:00");

const parts = {
  days: document.querySelector("#days"),
  hours: document.querySelector("#hours"),
  minutes: document.querySelector("#minutes"),
  seconds: document.querySelector("#seconds"),
};
const dateNote = document.querySelector("#date-note");
const birthdaySong = document.querySelector("#birthday-song");

const confettiCanvas = document.querySelector("#confetti-canvas");
const confettiContext = confettiCanvas.getContext("2d");
const confetti = [];
const confettiColors = ["#f27e93", "#ffd166", "#79d6c2", "#9d8cf0", "#fff3df"];
let canvasWidth = 0;
let canvasHeight = 0;

function resizeConfettiCanvas() {
  const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
  canvasWidth = window.innerWidth;
  canvasHeight = window.innerHeight;
  confettiCanvas.width = canvasWidth * pixelRatio;
  confettiCanvas.height = canvasHeight * pixelRatio;
  confettiContext.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
}

function burstConfetti() {
  const originX = Math.random() * canvasWidth;
  const originY = canvasHeight * (0.12 + Math.random() * 0.4);
  for (let i = 0; i < 55; i += 1) {
    const angle = Math.random() * Math.PI * 2;
    const speed = 2 + Math.random() * 6;
    confetti.push({
      x: originX,
      y: originY,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 1.8,
      size: 4 + Math.random() * 5,
      rotation: Math.random() * Math.PI,
      spin: (Math.random() - 0.5) * 0.22,
      color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
      life: 0,
      duration: 105 + Math.random() * 40,
    });
  }
}

function animateConfetti() {
  confettiContext.clearRect(0, 0, canvasWidth, canvasHeight);
  for (let i = confetti.length - 1; i >= 0; i -= 1) {
    const piece = confetti[i];
    piece.life += 1;
    piece.x += piece.vx;
    piece.y += piece.vy;
    piece.vy += 0.075;
    piece.vx *= 0.995;
    piece.rotation += piece.spin;
    const opacity = Math.max(0, 1 - piece.life / piece.duration);
    confettiContext.save();
    confettiContext.globalAlpha = opacity;
    confettiContext.fillStyle = piece.color;
    confettiContext.translate(piece.x, piece.y);
    confettiContext.rotate(piece.rotation);
    confettiContext.fillRect(-piece.size / 2, -piece.size / 2, piece.size, piece.size * 0.65);
    confettiContext.restore();
    if (piece.life >= piece.duration || piece.y > canvasHeight + 30) confetti.splice(i, 1);
  }
  window.requestAnimationFrame(animateConfetti);
}

resizeConfettiCanvas();
window.addEventListener("resize", resizeConfettiCanvas);
burstConfetti();
window.setInterval(burstConfetti, 3000);
window.requestAnimationFrame(animateConfetti);

// Tenta tocar assim que a página carrega. Se o navegador bloquear autoplay,
// tenta novamente na primeira interação normal da pessoa com a página.
function startBirthdaySong() {
  if (birthdaySong.paused) birthdaySong.play().catch(() => {});
}

startBirthdaySong();
window.addEventListener("pointerdown", startBirthdaySong, { once: true });
window.addEventListener("keydown", startBirthdaySong, { once: true });

dateNote.textContent = "27 a 29 de novembro · começamos às 12h 💛";

function updateCountdown() {
  const remaining = birthday.getTime() - Date.now();
  if (remaining <= 0) {
    Object.values(parts).forEach((part) => { part.textContent = "00"; });
    dateNote.textContent = "A comemoração começou! Aproveitem cada momento! 🎉";
    return;
  }

  const days = Math.floor(remaining / 86_400_000);
  const hours = Math.floor((remaining % 86_400_000) / 3_600_000);
  const minutes = Math.floor((remaining % 3_600_000) / 60_000);
  const seconds = Math.floor((remaining % 60_000) / 1_000);
  parts.days.textContent = String(days).padStart(2, "0");
  parts.hours.textContent = String(hours).padStart(2, "0");
  parts.minutes.textContent = String(minutes).padStart(2, "0");
  parts.seconds.textContent = String(seconds).padStart(2, "0");
}

updateCountdown();
setInterval(updateCountdown, 1000);
