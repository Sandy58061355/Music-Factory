document.addEventListener('DOMContentLoaded', () => {
    const redCD = document.getElementById('red-cd');
    const audio1 = document.getElementById('audio1');
    const greenCD = document.getElementById('green-cd');
    const audio2 = document.getElementById('audio2');

    let currentPlaying = null;

    redCD.addEventListener('click', () => {
        handlePlayPause(redCD, audio1, greenCD, audio2);
    });

    greenCD.addEventListener('click', () => {
        handlePlayPause(greenCD, audio2, redCD, audio1);
    });

    function handlePlayPause(currentImg, currentAudio, otherImg, otherAudio) {
        // Stop and reset other audio and image
        if (otherAudio.played.length > 0 && !otherAudio.paused) {
            otherAudio.pause();
            otherAudio.currentTime = 0;
            otherImg.classList.remove('rotating');
        }

        // Play or pause current audio and toggle image rotation
        if (currentAudio.paused) {
            currentAudio.play();
            currentImg.classList.add('rotating');
            currentPlaying = currentAudio;
        } else {
            currentAudio.pause();
            currentImg.classList.remove('rotating');
        }

        // Handle end of the audio
        currentAudio.onended = () => {
            currentImg.classList.remove('rotating');
            currentAudio.currentTime = 0;
        };
    }
});
