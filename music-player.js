const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
const repeatButton = document.getElementById("repeat");
const shuffleButton = document.getElementById("shuffle");
const audio = document.getElementById("audio");
const songImage = document.getElementById("song-image");
const songName = document.getElementById("song-name");
const pauseButton = document.getElementById("pause");
const playButton = document.getElementById("play");
const maxDuration = document.getElementById("max-duration");
const currentTimeRef = document.getElementById("current-time");
const progressBar = document.getElementById("progress-bar");
const currentProgress = document.getElementById("current-progress");
const songDownload = document.getElementById("download");

// 初始化歌曲索引和播放模式
let index = 0;
let isLooping = true;
let isShuffling = false;

const songsList = [
    {
        name: "Track-01",
        link: "./audio/audio-1.mp3",
        image: "./imgs/cassette-Track-1.svg",
    },
    {
        name: "Track-02",
        link: "./audio/audio-2.mp3",
        image: "./imgs/cassette-Track-2.svg",
    },
    {
        name: "Track-03",
        link: "./audio/audio-3.mp3",
        image: "./imgs/cassette-Track-3.svg",
    },
    {
        name: "Track-04",
        link: "./audio/audio-4.mp3",
        image: "./imgs/Track-04.svg",
    },
    {
        name: "Always",
        link: "./audio/audio-pop.mp3",
        image: "./imgs/album1-Always.svg",
    },
    {
        name: "Happy",
        link: "./audio/audio-pop2.mp3",
        image: "./imgs/album2-Happy.svg",
    },
    {
        name: "Everyday",
        link: "./audio/audio-romatic.mp3",
        image: "./imgs/album3-Everyday.svg",
    },
    {
        name: "You",
        link: "./audio/audio-CD4.mp3",
        image: "./imgs/album4-You.svg",
    },
    {
        name: "Just-Live",
        link: "./audio/audio-CD5.mp3",
        image: "./imgs/album5-Just-Live.svg",
    },
    {
        name: "Once",
        link: "./audio/audio-CD6.mp3",
        image: "./imgs/album6-Once.svg",
    },
    {
        name: "Peace",
        link: "./audio/audio-CD7.mp3",
        image: "./imgs/album7-Peace.svg",
    },
    {
        name: "Of",
        link: "./audio/audio-CD8.mp3",
        image: "./imgs/album8-Of.svg",
    },
    {
        name: "Love.",
        link: "./audio/audio-CD9.mp3",
        image: "./imgs/album9-Love.svg",
    },

];

//events object
let events = {
    mouse: { click: "click" },
    touch: { click: "touchstart" },
};
let deviceType = "";
const isTouchDevice = () => {
    try {
        document.createEvent("TouchEvent");
        deviceType = "touch";
        return true;
    } catch (e) {
        deviceType = "mouse";
        return false;
    }
};
//Format time (convert ms to seconds, minutes and add 0 id less than 10)
const timeFormatter = (timeInput) => {
    let minute = Math.floor(timeInput / 60);
    minute = minute < 10 ? "0" + minute : minute;
    let second = Math.floor(timeInput % 60);
    second = second < 10 ? "0" + second : second;
    return `${minute}:${second}`;
};
const cassetteAlbums = document.querySelectorAll('.cassette-pic');

// 点击专辑封面时触发事件
cassetteAlbums.forEach((album, index) => {
    album.addEventListener('click', () => {
        // 更新当前播放的歌曲索引
        index = index;
        // 根据索引更新播放器下方的歌曲详情
        setSong(index);
    });
});

// 页面加载完成时，默认显示第一首歌曲的详情
window.onload = () => {
    // 初始化显示第一首歌曲的详情
    setSong(0);
};
//set song
const setSong = (arrayIndex) => {
    //this extracts all the variables from the object
    let { name, link, image } = songsList[arrayIndex];
    audio.src = link;
    songName.innerHTML = name;
    songImage.src = image;
    //display duration when metadata loads
    audio.onloadedmetadata = () => {
        maxDuration.innerText = timeFormatter(audio.duration);
    };
}
//play song
const playAudio = () => {
    audio.play();
    pauseButton.classList.remove("hide");
    playButton.classList.add("hide");
};
// 切换循环播放状态
repeatButton.addEventListener("click", () => {
    isLooping = !isLooping;
    audio.loop = isLooping; // 根据循环状态设置 audio 元素的 loop 属性
    repeatButton.classList.toggle("active");
    console.log(isLooping ? "Looping on" : "Looping off");
});
//Next song
const nextSong = () => {
    //if loop is true then continue in normal order
    if (loop) {
        if (index == songsList.length - 1) {
            //If last song is being played
            index = 0;
        } else {
            index += 1;
        }
        setSong(index);

        playAudio();
    } else {
        //else find a random index and play that song
        let randIndex = Math.floor(Math.random() * songsList.length);
        console.log(randIndex);
        setSong(randIndex);
        playAudio();
    }
};
//pause song
const pauseAudio = () => {
    audio.pause();
    pauseButton.classList.add("hide");
    playButton.classList.remove("hide");
};
//previous song ( you can't go back to a randomly played song)
const previousSong = () => {
    if (index > 0) {
        pauseAudio();
        index -= 1;
    } else {
        //if first song is being played
        index = songsList.length - 1;
    }
    setSong(index);
    playAudio();
};

//next song when current song ends
audio.onended = () => {
    audio.pause(); // 停止播放音樂
};



// 切换随机播放状态
shuffleButton.addEventListener("click", () => {
    isShuffling = !isShuffling;
    shuffleButton.classList.toggle("active");
    console.log(isShuffling ? "Shuffling on" : "Shuffling off");
});
//play button
playButton.addEventListener("click", playAudio);

//next button
nextButton.addEventListener("click", nextSong);

//pause button
pauseButton.addEventListener("click", pauseAudio);

//prev button
prevButton.addEventListener("click", previousSong);

isTouchDevice();
progressBar.addEventListener(events[deviceType].click, (event) => {
    //start of progressBar
    let coordStart = progressBar.getBoundingClientRect().left;
    //mouse click position
    let coordEnd = !isTouchDevice() ? event.clientX : event.touches[0].clientX;
    let progress = (coordEnd - coordStart) / progressBar.offsetWidth;

    //set width to progress
    currentProgress.style.width = progress * 100 + "%";

    //set time
    audio.currentTime = progress * audio.duration;

    //play
    audio.play();
    pauseButton.classList.remove("hide");
    playButton.classList.add("hide");
});

//update progress every second
setInterval(() => {
    currentTimeRef.innerHTML = timeFormatter(audio.currentTime);
    currentProgress.style.width =
        (audio.currentTime / audio.duration.toFixed(3)) * 100 + "%"; const isTouchDevice = () => {
            try {
                //We try to create TouchEvent(it would fail for desktops and throw error)
                document.createEvent("TouchEvent");
                deviceType = "touch";
                return true;
            } catch (e) {
                deviceType = "mouse";
                return false;
            }
        };
});

//update time
audio.addEventListener("timeupdate", () => {
    currentTimeRef.innerText = timeFormatter(audio.currentTime);
});
songDownload.addEventListener("click", () => {
    // 获取当前播放的音频文件的 URL
    const audioUrl = songsList[index].link;

    // 创建一个下载链接元素
    const downloadLink = document.createElement('a');
    downloadLink.href = audioUrl; // 设置链接的 URL 为当前音频文件的 URL
    downloadLink.download = `${songsList[index].name}.mp3`; // 设置下载的文件名为歌曲名

    // 将下载链接添加到文档中
    document.body.appendChild(downloadLink);

    // 模拟点击下载链接
    downloadLink.click();

    // 移除下载链接
    document.body.removeChild(downloadLink);
});
window.onload = () => {
    //initially first song
    index = 0;
    setSong(index);
};
