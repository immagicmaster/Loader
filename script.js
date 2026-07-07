// ===== MENU HAMBURGER =====
const menuToggle = document.getElementById('menu-toggle');
const menu = document.getElementById('menu');

menuToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    menu.classList.toggle('active');
});

// Đóng menu khi click bên ngoài
document.addEventListener('click', (e) => {
    if (!menu.contains(e.target) && !menuToggle.contains(e.target)) {
        menu.classList.remove('active');
    }
});

// Đóng menu khi click một liên kết
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
        .then(() => {
            alert('✅ Đã sao chép link Discord:\n' + discordLink);
        })
        .catch(() => {
            // Phương thức dự phòng
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
const magicLink = 'https://immagicmaster.github.io/MagicMaster/';

function showLink() {
    linkDisplay.innerHTML = `<a href="${magicLink}" target="_blank">${magicLink}</a>`;
}

document.getElementById('main-btn').addEventListener('click', showLink);
document.getElementById('farm-btn').addEventListener('click', showLink);

// ===== NHẠC NỀN =====
const audio = document.getElementById('bg-music');
const musicBtn = document.getElementById('music-toggle');
let isPlaying = false;

musicBtn.addEventListener('click', () => {
    if (isPlaying) {
        audio.pause();
        musicBtn.textContent = '🔊 Play Music';
        isPlaying = false;
    } else {
        audio.play()
            .then(() => {
                musicBtn.textContent = '🔊 Pause Music';
                isPlaying = true;
            })
            .catch((err) => {
                console.warn('Không thể phát nhạc tự động:', err);
                alert('Vui lòng click vào trang để phát nhạc!');
            });
    }
});

// Thử phát nhạc khi tải trang (nếu trình duyệt cho phép)
window.addEventListener('load', () => {
    audio.play()
        .then(() => {
            musicBtn.textContent = '🔊 Pause Music';
            isPlaying = true;
        })
        .catch(() => {
            // Không autoplay, giữ nguyên nút
        });
});

// ===== HIỆU ỨNG ANIMATION KHI CUỘN (tuỳ chọn) =====
// Thêm class 'visible' cho các phần tử khi xuất hiện trong viewport
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

// Vì home đã hiển thị sẵn, ta kích hoạt ngay cho home
document.getElementById('home').style.opacity = '1';
document.getElementById('home').style.transform = 'translateY(0)';