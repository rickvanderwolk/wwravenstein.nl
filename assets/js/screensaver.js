let screensaverTimeout;

function getRandomishColor() {
    return 'hsla(' + Math.floor((Math.random() * 360)) + ', 100%, 50%, 1.0)';
}

function resetTimer() {
    const screensaver = document.getElementById('screensaver');
    screensaver.style.display = 'none';
    screensaver.setAttribute('aria-hidden', 'true');
    clearTimeout(screensaverTimeout);
    screensaverTimeout = setTimeout(showScreensaver, 25 * 1000);
}

function showScreensaver() {
    const screensaver = document.getElementById('screensaver');
    screensaver.style.display = 'block';
    screensaver.setAttribute('aria-hidden', 'false');
    animate();
    if (typeof changeLinkColors === 'function') {
        changeLinkColors();
    }
}

function animate() {
    const text = document.getElementById('screensaver-text');
    let x = Math.random() * (window.innerWidth - text.clientWidth);
    let y = Math.random() * (window.innerHeight - text.clientHeight);
    let dx = 2;
    let dy = 2;

    text.style.color = getRandomishColor();
    text.style.textShadow = `0 0 10px ${text.style.color}`;

    function moveText() {
        const width = text.clientWidth;
        const height = text.clientHeight;

        if (x + dx + width > window.innerWidth || x + dx < 0) {
            dx = -dx;
            text.style.color = getRandomishColor();
            text.style.textShadow = `0 0 10px ${text.style.color}`;
        }
        if (y + dy + height > window.innerHeight || y + dy < 0) {
            dy = -dy;
            text.style.color = getRandomishColor();
            text.style.textShadow = `0 0 10px ${text.style.color}`;
        }

        x += dx;
        y += dy;

        text.style.transform = `translate(${x}px, ${y}px)`;

        if (document.getElementById('screensaver').style.display === 'block') {
            requestAnimationFrame(moveText);
        }
    }

    moveText();
}

['mousemove', 'keydown', 'click', 'scroll'].forEach(event => {
    document.addEventListener(event, resetTimer);
});

// Add keyboard support to close screensaver with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && document.getElementById('screensaver').style.display === 'block') {
        resetTimer();
    }
});

resetTimer();
