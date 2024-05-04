// function playMusic(recordId, audioId) {
//     var allAudios = document.querySelectorAll('audio');
//     var audio = document.getElementById(audioId);
//     var record = document.getElementById(recordId);

//     // 暫停其他音樂並停止旋轉
//     allAudios.forEach(function (otherAudio) {
//         // 找到每个音频元素对应的图片元素
//         var otherRecord = otherAudio.closest('.red-album').querySelector('.red-cd');
//         if (otherAudio != audio) {
//             otherAudio.pause();
//             otherAudio.currentTime = 0;
//             otherRecord.classList.remove('rotating');
//         }
//     });

//     // 控制當前唱片的播放與暫停
//     if (audio.paused) {
//         audio.play();
//         record.classList.add('rotating');
//     } else {
//         audio.pause();
//         record.classList.remove('rotating');
//     }

//     // 當音樂播放完畢自動停止旋轉
//     audio.onended = function () {
//         record.classList.remove('rotating');
//     };
// }

function playMusic(recordId, audioId) {
    var allAudios = document.querySelectorAll('audio');
    var record = document.getElementById(recordId);
    var audio = document.getElementById(audioId);

    // 暫停其他音樂並停止旋轉
    allAudios.forEach(function (otherAudio) {
        // 获取与每个音频元素相关的图片元素
        var otherRecord = document.querySelector('#' + otherAudio.id.replace('audio', 'cd'));
        if (otherAudio !== audio) {
            otherAudio.pause();
            otherAudio.currentTime = 0;
            otherRecord.classList.remove('rotating');
        }
    });

    // 控制當前唱片的播放與暫停
    if (audio.paused) {
        audio.play();
        record.classList.add('rotating');
    } else {
        audio.pause();
        record.classList.remove('rotating');
    }

    // 當音樂播放完畢自動停止旋轉
    audio.onended = function () {
        record.classList.remove('rotating');
    };
}
