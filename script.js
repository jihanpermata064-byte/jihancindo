const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 400;
canvas.height = 600;

let player = { x: 175, y: 550, width: 50, height: 20, color: '#00ffff' };
let stars = [];
let score = 0;

// Buat bintang jatuh
function createStar() {
  const x = Math.random() * (canvas.width - 20);
  stars.push({ x: x, y: 0, size: 20, color: '#ffea00' });
}

// Gerakkan bintang
function updateStars() {
  for (let i = 0; i < stars.length; i++) {
    stars[i].y += 3;

    // Jika tertangkap
    if (
      stars[i].y + stars[i].size > player.y &&
      stars[i].x < player.x + player.width &&
      stars[i].x + stars[i].size > player.x
    ) {
      score++;
      stars.splice(i, 1);
      i--;
      continue;
    }

    // Jika lewat layar
    if (stars[i].y > canvas.height) {
      stars.splice(i, 1);
      i--;
    }
  }
}

// Gambar pemain
function drawPlayer() {
  ctx.shadowBlur = 20;
  ctx.shadowColor = player.color;
  ctx.fillStyle = player.color;
  ctx.fillRect(player.x, player.y, player.width, player.height);
}

// Gambar bintang
function drawStars() {
  for (let s of stars) {
    ctx.beginPath();
    ctx.shadowBlur = 15;
    ctx.shadowColor = s.color;
    ctx.fillStyle = s.color;
    ctx.arc(s.x + s.size / 2, s.y + s.size / 2, s.size / 2, 0, Math.PI * 2);
    ctx.fill();
  }
}

// Update game
function updateGame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawPlayer();
  drawStars();
  updateStars();

  ctx.font = '20px Poppins';
  ctx.fillStyle = '#fff';
  ctx.shadowBlur = 10;
  ctx.shadowColor = '#00ffea';
  ctx.fillText('Skor: ' + score, 10, 30);

  requestAnimationFrame(updateGame);
}

// Gerakkan pemain
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft' && player.x > 0) {
    player.x -= 20;
  } else if (e.key === 'ArrowRight' && player.x + player.width < canvas.width) {
    player.x += 20;
  }
});

// Mulai game
setInterval(createStar, 800);
updateGame();