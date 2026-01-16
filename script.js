const container = document.getElementById('prompter-container');
const prompterText = document.getElementById('prompter-text');
const playPauseBtn = document.getElementById('play-pause');
const resetBtn = document.getElementById('reset');
const speedInput = document.getElementById('speed');
const fontSizeInput = document.getElementById('font-size');
const bgColorInput = document.getElementById('bg-color');
const textColorInput = document.getElementById('text-color');
const controls = document.getElementById('controls');

let isPlaying = false;
let scrollPos = 0;
let animationId = null;

function animateScroll() {
    if (!isPlaying) return;

    const speed = parseInt(speedInput.value) / 10;
    scrollPos += speed;
    container.scrollTop = scrollPos;

    // Check if reached bottom
    if (container.scrollTop + container.clientHeight >= container.scrollHeight) {
        isPlaying = false;
        playPauseBtn.textContent = 'Play';
        return;
    }

    animationId = requestAnimationFrame(animateScroll);
}

playPauseBtn.addEventListener('click', () => {
    isPlaying = !isPlaying;
    playPauseBtn.textContent = isPlaying ? 'Pause' : 'Play';
    
    if (isPlaying) {
        // When playing, make prompter text non-editable for better experience
        prompterText.contentEditable = 'false';
        controls.classList.add('hidden');
        animateScroll();
    } else {
        cancelAnimationFrame(animationId);
        controls.classList.remove('hidden');
    }
});

resetBtn.addEventListener('click', () => {
    isPlaying = false;
    cancelAnimationFrame(animationId);
    scrollPos = 0;
    container.scrollTop = 0;
    playPauseBtn.textContent = 'Play';
    prompterText.contentEditable = 'true';
    controls.classList.remove('hidden');
});

// Settings interaction
speedInput.addEventListener('input', () => {
    // Speed update handled in animateScroll
});

fontSizeInput.addEventListener('input', (e) => {
    prompterText.style.fontSize = `${e.target.value}px`;
});

bgColorInput.addEventListener('input', (e) => {
    document.body.style.backgroundColor = e.target.value;
});

textColorInput.addEventListener('input', (e) => {
    prompterText.style.color = e.target.value;
});

// Auto-hide controls when mouse is inactive
let timeout;
document.addEventListener('mousemove', () => {
    if (isPlaying) {
        controls.classList.remove('hidden');
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            if (isPlaying) controls.classList.add('hidden');
        }, 2000);
    }
});

// Initialize styles
prompterText.style.fontSize = `${fontSizeInput.value}px`;
prompterText.style.color = textColorInput.value;
document.body.style.backgroundColor = bgColorInput.value;
