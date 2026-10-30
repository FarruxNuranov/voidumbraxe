// Проверка ориентации: сайт работает только горизонтально
const bgVideoEl = document.getElementById('bg-video');
const bgMusicEl = document.getElementById('bg-music');
const rotateOverlayEl = document.getElementById('rotate-overlay');
let wasLandscape = false;

// Песня начинается с 11-й секунды
const MUSIC_START = 11;
if (bgMusicEl.readyState >= 1) {
    bgMusicEl.currentTime = MUSIC_START;
} else {
    bgMusicEl.addEventListener('loadedmetadata', () => {
        bgMusicEl.currentTime = MUSIC_START;
    });
}

// Музыка включается только после нажатия «Жми сюда»
let musicUnlocked = false;

function checkOrientationGate() {
    const isPortrait = window.innerHeight > window.innerWidth;
    if (isPortrait) {
        // Повернули обратно — всё начинается заново с первой страницы
        if (wasLandscape) {
            location.href = 'index.html';
            return;
        }
        rotateOverlayEl.classList.add('active');
        bgVideoEl.pause();
        bgMusicEl.pause();
    } else {
        wasLandscape = true;
        rotateOverlayEl.classList.remove('active');
        bgVideoEl.play().catch(() => {});
        if (musicUnlocked) {
            bgMusicEl.play().catch(() => {});
        }
    }
}

window.addEventListener('orientationchange', () => setTimeout(checkOrientationGate, 300));
window.addEventListener('resize', checkOrientationGate);
checkOrientationGate();

 // Reasons database
 const reasons = [
    {
        text: "Ты всегда подскажешь, какие эхо фармить и какие артефакты собирать — без тебя я бы до сих пор бегал с кривым билдом. 💖",
        emoji: "🌟",
        gif: "gif1.gif"
    },
    {
        text: "Твои советы по сборке команды превращают любой мой состав в имбу — ты лучший друг! 🎮",
        emoji: "💗",
        gif: "gif2.gif"
    },
    {
        text: "С тобой любой чат превращается в угар — приколы, мемы и смех без остановки. 😂",
        emoji: "💕",
        gif: "gif1.gif"
    },
    {
        text: "Пусть в этом году тебе падают только идеальные эхо, а все крутки будут с пятизвёздками! 🥳",
        emoji: "🌟",
        gif: "gif2.gif"
    },
    {
        text: "А в жизни желаю крепкого здоровья, настоящего счастья и людей рядом, которые ценят тебя так же, как я. 🌷",
        emoji: "💖",
        gif: "gif1.gif"
    },
    {
        text: "Пусть сбудутся все твои мечты — и большие, и маленькие. Ты этого заслуживаешь больше всех! ✨",
        emoji: "🎂",
        gif: "gif2.gif"
    }
];

// State management
let currentReasonIndex = 0;
const reasonsContainer = document.getElementById('reasons-container');
const shuffleButton = document.querySelector('.shuffle-button');
const reasonCounter = document.querySelector('.reason-counter');
let isTransitioning = false;

// Create reason card with gif
function createReasonCard(reason) {
    const card = document.createElement('div');
    card.className = 'reason-card';
    
    const text = document.createElement('div');
    text.className = 'reason-text';
    text.innerHTML = `${reason.emoji} ${reason.text}`;
    
    const gifOverlay = document.createElement('div');
    gifOverlay.className = 'gif-overlay';
    gifOverlay.innerHTML = `<img src="${reason.gif}" alt="Friendship Memory">`;
    
    card.appendChild(text);
    card.appendChild(gifOverlay);

    // Показываем котика 3 секунды после появления карточки
    card.classList.add('show-gif');
    setTimeout(() => card.classList.remove('show-gif'), 3000);
    
    if (window.gsap) {
        gsap.from(card, {
            opacity: 0,
            y: 50,
            duration: 0.5,
            ease: "back.out"
        });
    }

    return card;
}

// Display new reason
function displayNewReason() {
    if (isTransitioning) return;
    isTransitioning = true;

    if (currentReasonIndex < reasons.length) {
        const card = createReasonCard(reasons[currentReasonIndex]);
        reasonsContainer.appendChild(card);

        // Авто-скролл к новой карточке и кнопке
        setTimeout(() => {
            shuffleButton.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
        
        // Update counter
        reasonCounter.textContent = `Причина ${currentReasonIndex + 1} из ${reasons.length}`;
        
        currentReasonIndex++;

        // Check if we should transform the button
        if (currentReasonIndex === reasons.length) {
            const makeStoryButton = () => {
                shuffleButton.textContent = "Дальше — наша история 💫";
                shuffleButton.classList.add('story-mode');
                shuffleButton.addEventListener('click', () => {
                    if (window.gsap) {
                        gsap.to('body', {
                            opacity: 0,
                            duration: 1,
                            onComplete: () => {
                                window.location.href = 'last.html';
                            }
                        });
                    } else {
                        window.location.href = 'last.html';
                    }
                });
            };
            if (window.gsap) {
                gsap.to(shuffleButton, {
                    scale: 1.1,
                    duration: 0.5,
                    ease: "elastic.out",
                    onComplete: makeStoryButton
                });
            } else {
                makeStoryButton();
            }
        }

        // Create floating elements
        createFloatingElement();
        
        setTimeout(() => {
            isTransitioning = false;
        }, 500);
    } else {
        // Handle navigation to new page or section
        window.location.href = "#storylane";
        // Or trigger your next page functionality
    }
}

// Initialize button click
shuffleButton.addEventListener('click', () => {
    // Первая песня начинается именно после этой кнопки
    if (!musicUnlocked) {
        musicUnlocked = true;
        bgMusicEl.play().catch(() => {});
    }
    displayNewReason();
    if (window.gsap) {
        gsap.to(shuffleButton, {
            scale: 0.9,
            duration: 0.1,
            yoyo: true,
            repeat: 1
        });
    }
});

// Floating elements function (same as before)
function createFloatingElement() {
    const elements = ['🌸', '✨', '💖', '🦋', '⭐'];
    const element = document.createElement('div');
    element.className = 'floating';
    element.textContent = elements[Math.floor(Math.random() * elements.length)];
    element.style.left = Math.random() * window.innerWidth + 'px';
    element.style.top = Math.random() * window.innerHeight + 'px';
    element.style.fontSize = (Math.random() * 20 + 10) + 'px';
    document.body.appendChild(element);

    if (window.gsap) {
        gsap.to(element, {
            y: -500,
            duration: Math.random() * 10 + 10,
            opacity: 0,
            onComplete: () => element.remove()
        });
    } else {
        setTimeout(() => element.remove(), 10000);
    }
}

// Custom cursor (same as before)
const cursor = document.querySelector('.custom-cursor');
document.addEventListener('mousemove', (e) => {
    if (window.gsap) {
        gsap.to(cursor, {
            x: e.clientX - 15,
            y: e.clientY - 15,
            duration: 0.2
        });
    }
});

// Create initial floating elements
setInterval(createFloatingElement, 2000);