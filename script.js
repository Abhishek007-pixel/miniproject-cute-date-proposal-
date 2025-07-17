document.addEventListener('DOMContentLoaded', function() {
    const noButton = document.getElementById("no-btn");
    const yesButton = document.getElementById("yes-btn");
    const popup = document.getElementById("popup");
    const heartsContainer = document.querySelector('.hearts-container');
    const fireworksContainer = document.querySelector('.fireworks');
    const panda = document.querySelector('.panda');
    const pointArm = document.getElementById('point-arm');
    const happySound = document.getElementById('happy-sound');
    const sadSound = document.getElementById('sad-sound');
    const celebrateSound = document.getElementById('celebrate-sound');

    popup.style.display = "none";

    const messages = [
        "We'll look damn good together! 💃🕺",
        "Okay, you decide the place! 🗺️✨",
        "Why? Did badapav go wrong? 🍔😢",
        "I promise this time will be perfect! 🤞❤️",
        "Just one chance? Please? 🥺🙏",
        "Line nhi maar rha hun... real efforts! 💪😅",
        "Think of all the fun we'll have! 🎉🤗",
        "Don't break it yrr! 💔😭",
        "You + Me = Perfect Match! 💑❤️",
        "Try karne mein kya jaata hai? 😉🤷‍♂️"
    ];

    const messageElement = document.createElement('div');
    messageElement.className = 'persuasive-message';
    document.body.appendChild(messageElement);

    function pointToYes() {
        panda.classList.remove('sad');
        panda.classList.add('happy');
        happySound.currentTime = 0;
        happySound.play();
        const yesBtnRect = yesButton.getBoundingClientRect();
        const angle = Math.atan2(
            yesBtnRect.top + yesBtnRect.height/2 - (panda.offsetTop + 50),
            yesBtnRect.left + yesBtnRect.width/2 - (panda.offsetLeft + 60)
        ) * 180 / Math.PI;
        pointArm.style.transform = `rotate(${angle - 90}deg)`;
    }

    function pandaGetsSad() {
        panda.classList.remove('happy');
        panda.classList.add('sad');
        sadSound.currentTime = 0;
        sadSound.play();
        pointArm.style.transform = 'rotate(0deg)';
    }

    pointToYes();

    function createHearts() {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.width = (Math.random() * 20 + 10) + 'px';
        heart.style.height = heart.style.width;
        heart.style.animation = `float ${Math.random() * 6 + 3}s linear infinite`;
        heartsContainer.appendChild(heart);
        setTimeout(() => {
            heart.remove();
        }, 9000);
    }

    function createFireworks() {
        const colors = ['#ff0000', '#ff69b4', '#ff1493', '#ff00ff', '#d23369'];
        for (let i = 0; i < 50; i++) {
            const firework = document.createElement('div');
            firework.classList.add('firework');
            firework.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            const angle = Math.random() * Math.PI * 2;
            const distance = Math.random() * 100 + 50;
            const tx = Math.cos(angle) * distance;
            const ty = Math.sin(angle) * distance;
            firework.style.setProperty('--tx', tx + 'px');
            firework.style.setProperty('--ty', ty + 'px');
            firework.style.animationDelay = Math.random() * 0.5 + 's';
            fireworksContainer.appendChild(firework);
            setTimeout(() => {
                firework.remove();
            }, 1000);
        }
    }

    setInterval(createHearts, 300);

    noButton.addEventListener("mouseover", () => {
        const newLeft = Math.random() * 70;
        const newTop = Math.random() * 60 + 20; // min 20vh to avoid too close to top
        noButton.style.position = "absolute";
        noButton.style.left = newLeft + "vw";
        noButton.style.top = newTop + "vh";
        noButton.style.transition = "all 0.1s ease";

        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        messageElement.textContent = randomMessage;

        const buttonRect = noButton.getBoundingClientRect();
        messageElement.style.left = (buttonRect.left + buttonRect.width/2) + 'px';
        messageElement.style.top = (buttonRect.top - 50) + 'px';
        messageElement.classList.toggle('left', Math.random() > 0.5);
        messageElement.classList.toggle('right', Math.random() <= 0.5);
        messageElement.style.opacity = '1';

        pandaGetsSad();

        setTimeout(() => {
            messageElement.style.opacity = '0';
        }, 5000); // extended to 5 seconds
    });

    yesButton.addEventListener("mouseover", () => {
        pointToYes();
    });

    let fireworkInterval;
    yesButton.addEventListener("click", () => {
        popup.style.display = "block";
        popup.style.opacity = "1";
        createFireworks();
        celebrateSound.currentTime = 0;
        celebrateSound.play();
        panda.classList.add('celebrate');
        fireworkInterval = setInterval(createFireworks, 800);
        function closePopup() {
            clearInterval(fireworkInterval);
            popup.style.display = "none";
            panda.classList.remove('celebrate');
            popup.removeEventListener('click', closePopup);
        }
        popup.addEventListener('click', closePopup);
    });

    document.addEventListener('mousemove', (e) => {
        if(e.clientY > window.innerHeight/2) {
            const angle = Math.atan2(
                e.clientY - (panda.offsetTop + 50),
                e.clientX - (panda.offsetLeft + 60)
            ) * 180 / Math.PI;
            pointArm.style.transform = `rotate(${angle - 90}deg)`;
        }
    });

    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0% { transform: translateY(0) rotate(0deg); opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
});
