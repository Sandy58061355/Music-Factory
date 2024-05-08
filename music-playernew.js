document.addEventListener("DOMContentLoaded", function () {
    const audioPlayer = document.getElementById('audio-player');
    const playButton = document.getElementById('play');
    const pauseButton = document.getElementById('pause');
    const nextButton = document.getElementById('next');
    const prevButton = document.getElementById('prev');
    const repeatButton = document.getElementById('repeat');
    const shuffleButton = document.getElementById('shuffle');
    const downloadButton = document.getElementById('download');
    const songImage = document.getElementById('song-image');
    const songName = document.getElementById('song-name');
    const progressBar = document.getElementById('progress-bar');
    const currentProgress = document.getElementById('current-progress');
    const currentTimeDisplay = document.getElementById('current-time');
    const maxDurationDisplay = document.getElementById('max-duration');

    let currentTrackIndex = 0;
    const tracks = [];
    let isRepeat = false;
    let isShuffle = false;

    $('.cassette-pic, .recommand-album-pic').each(function () {
        const album = $(this).closest('.cassette, .recommand-album');
        tracks.push({
            src: album.data('src'),
            title: album.data('title'),
            cover: $(this).attr('src')
        });
    });

    function initializePlayer() {
        loadTrack(0);
        audioPlayer.pause();
        audioPlayer.currentTime = 0;
        currentProgress.style.width = "0%";
        currentTimeDisplay.textContent = timeFormatter(0);
        updatePlayButton();
    }

    function loadTrack(index) {
        audioPlayer.src = tracks[index].src;
        songName.textContent = tracks[index].title;
        songImage.src = tracks[index].cover;
        audioPlayer.load();
        audioPlayer.addEventListener('loadedmetadata', () => {
            maxDurationDisplay.textContent = timeFormatter(audioPlayer.duration);
        }, { once: true });
    }

    function updatePlayButton() {
        if (audioPlayer.paused) {
            playButton.style.display = 'inline-block';
            pauseButton.style.display = 'none';
        } else {
            playButton.style.display = 'none';
            pauseButton.style.display = 'inline-block';
        }
    }

    function playMusic() {
        audioPlayer.play();
        updatePlayButton();
    }

    function pauseMusic() {
        audioPlayer.pause();
        updatePlayButton();
    }

    function nextTrack() {
        currentTrackIndex = isShuffle ? Math.floor(Math.random() * tracks.length) : (currentTrackIndex + 1) % tracks.length;
        loadTrack(currentTrackIndex);
        playMusic();
    }

    function prevTrack() {
        currentTrackIndex = isShuffle ? Math.floor(Math.random() * tracks.length) : (currentTrackIndex - 1 + tracks.length) % tracks.length;
        loadTrack(currentTrackIndex);
        playMusic();
    }

    function timeFormatter(timeInput) {
        let minute = Math.floor(timeInput / 60);
        minute = minute < 10 ? "0" + minute : minute;
        let second = Math.floor(timeInput % 60);
        second = second < 10 ? "0" + second : second;
        return `${minute}:${second}`;
    }

    audioPlayer.addEventListener('timeupdate', () => {
        const progressPercent = (audioPlayer.currentTime / audioPlayer.duration) * 100;
        currentProgress.style.width = `${progressPercent}%`;
        currentTimeDisplay.textContent = timeFormatter(audioPlayer.currentTime);
    });

    progressBar.addEventListener('click', (e) => {
        const clickPosition = (e.offsetX / progressBar.offsetWidth);
        audioPlayer.currentTime = clickPosition * audioPlayer.duration;
    });

    $('.cassette-pic, .recommand-album-pic').on('click', function () {
        currentTrackIndex = $('.cassette, .recommand-album').index($(this).closest('.cassette, .recommand-album'));
        loadTrack(currentTrackIndex);
        playMusic();
    });

    audioPlayer.addEventListener('ended', () => {
        if (isRepeat) {
            playMusic();
        } else {
            updatePlayButton();
        }
    });

    playButton.addEventListener('click', playMusic);
    pauseButton.addEventListener('click', pauseMusic);
    nextButton.addEventListener('click', nextTrack);
    prevButton.addEventListener('click', prevTrack);

    repeatButton.addEventListener('click', () => {
        isRepeat = !isRepeat;
        repeatButton.style.color = isRepeat ? '#7C19FB' : 'rgba(217, 217, 217, 1)';
        shuffleButton.style.color = 'rgba(217, 217, 217, 1)';
        isShuffle = false;
    });

    shuffleButton.addEventListener('click', () => {
        isShuffle = !isShuffle;
        shuffleButton.style.color = isShuffle ? '#7C19FB' : 'rgba(217, 217, 217, 1)';
        if (isShuffle) {
            isRepeat = false;
            repeatButton.style.color = 'rgba(217, 217, 217, 1)';
        }
    });

    downloadButton.addEventListener('click', () => {
        const link = document.createElement('a');
        link.href = tracks[currentTrackIndex].src;
        link.download = `${tracks[currentTrackIndex].title}.mp3`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });

    initializePlayer();  // Call to initialize player on document load
});

