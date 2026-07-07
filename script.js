// ===== MENU HAMBURGER =====
const menuToggle = document.getElementById('menu-toggle');
const menu = document.getElementById('menu');

menuToggle.addEventListener('click', (e) => {
  e.stopPropagation();
  menu.classList.toggle('active');
});

document.addEventListener('click', (e) => {
  if (!menu.contains(e.target) && !menuToggle.contains(e.target)) {
    menu.classList.remove('active');
  }
});

document.querySelectorAll('#menu a').forEach((link) => {
  link.addEventListener('click', () => {
    menu.classList.remove('active');
  });
});

// ===== NÚT GET SCRIPT → CUỘN XUỐNG =====
document.getElementById('get-script-btn').addEventListener('click', () => {
  document.getElementById('get-script').scrollIntoView({ behavior: 'smooth' });
});

// ===== JOIN DISCORD → COPY LINK =====
document.getElementById('join-discord-btn').addEventListener('click', () => {
  const discordLink = 'https://discord.gg/3Vdavc4c6d';
  navigator.clipboard
    .writeText(discordLink)
    .then(() => alert('✅ Đã sao chép link Discord:\n' + discordLink))
    .catch(() => {
      const input = document.createElement('input');
      input.value = discordLink;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
      alert('✅ Đã sao chép link Discord:\n' + discordLink);
    });
});

// ===== MAIN / FARM → HIỂN THỊ LINK =====
const linkDisplay = document.getElementById('link-display');
const mainLink = 'https://immagicmaster.github.io/MagicMaster/';
const farmLink = 'https://obfuscatorhub.onrender.com/';

function showLink(url) {
  linkDisplay.innerHTML = `<a href="${url}" target="_blank">${url}</a>`;
  // Thêm class 'show' để kích hoạt animation fade + scale
  linkDisplay.classList.add('show');
}

document.getElementById('main-btn').addEventListener('click', () => {
  showLink(mainLink);
});

document.getElementById('farm-btn').addEventListener('click', () => {
  showLink(farmLink);
});

// ===== NHẠC TỰ ĐỘNG PHÁT (không có nút) =====
const audio = document.getElementById('bg-music');

function playMusic() {
  audio.play().catch(() => {
    // Nếu bị chặn, thử phát khi người dùng click bất kỳ đâu
    document.addEventListener('click', function playOnClick() {
      audio.play();
      document.removeEventListener('click', playOnClick);
    }, { once: true });
  });
}

// Cố gắng phát khi trang tải
window.addEventListener('load', playMusic);

// Dự phòng: thử lại sau 1s nếu chưa phát
setTimeout(playMusic, 1000);

// ===== HIỆU ỨNG XUẤT HIỆN KHI CUỘN =====
const sections = document.querySelectorAll('section');
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  },
  { threshold: 0.15 }
);

sections.forEach((section) => {
  section.style.opacity = '0';
  section.style.transform = 'translateY(30px)';
  section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(section);
});

// Home hiển thị ngay lập tức
document.getElementById('home').style.opacity = '1';
document.getElementById('home').style.transform = 'translateY(0)';
