
// //HASHTAG點擊加入搜索框之功能
// const hashtagSoftly = document.getElementById('tag-softly');
// const hashtagHappy = document.getElementById('tag-happy');
// const hashtagPiano = document.getElementById('tag-piano');
// const input = document.getElementById('search-sec');

// // 定義一個函數來處理點擊事件
// function handleTagClick(event) {
//     const currentText = input.value;
//     const hashtagText = event.target.innerText; // 獲取被點擊的 hashtag 的文字
//     // 如果輸入框已經有文字，就在後面追加新的 hashtag 文字，並且在之間加上空格
//     if (currentText.length > 0) {
//         input.value = `${currentText} ${hashtagText}`;
//     } else {
//         input.value = hashtagText; // 如果輸入框是空的，直接設置為 hashtag 的文字
//     }
//     console.log(input.value);
// }

// hashtagSoftly.addEventListener('click', handleTagClick);
// hashtagHappy.addEventListener('click', handleTagClick);
// hashtagPiano.addEventListener('click', handleTagClick);
$(document).ready(function () {
    // 處理 hashtag 點擊事件，並更新搜索框
    $('#tag-softly, #tag-happy, #tag-piano').click(function (event) {
        var currentText = $('#search-sec').val().trim();
        var hashtagText = $(event.target).text().trim();
        if (currentText.length > 0) {
            $('#search-sec').val(`${currentText} ${hashtagText}`);
        } else {
            $('#search-sec').val(hashtagText);
        }
        updateButtonState();
    });

    // 監聽搜索框的輸入變化來更新按鈕狀態
    $('#search-sec').on('input', function () {
        updateButtonState();
    });

    // 更新搜索按鈕的啟用狀態
    function updateButtonState() {
        var inputVal = $('#search-sec').val().trim();
        var searchLink = $('#search-link');
        if (inputVal) {
            $('.search-btn').removeClass('disabled');
            searchLink.attr('href', 'music-generate.html?search=' + encodeURIComponent(inputVal));
        } else {
            $('.search-btn').addClass('disabled');
            searchLink.attr('href', '#');
        }
    }

    // 按鈕點擊行為，防止空搜索提交
    $('.search-btn').click(function (e) {
        if ($(this).hasClass('disabled')) {
            e.preventDefault(); // 阻止跳轉
            alert('請輸入搜索內容');
        }
    });
});
//footer搜索框必須輸入文字才能搜索之功能
$(function () {
    $('#search-footer').on('input', function () {
        var inputVal = $(this).val().trim();
        if (inputVal) {
            $('.search-btn-footer').removeClass('disabled');
            $('#search-link-footer').attr('href', 'music-generate.html?search=' + encodeURIComponent(inputVal));
        } else {
            $('.search-btn-footer').addClass('disabled');
            $('#search-link-footer').attr('href', '#');
        }
    });

    $('.search-btn-footer').click(function (e) {
        if ($(this).hasClass('disabled')) {
            e.preventDefault(); // 阻止跳轉
            alert('請輸入搜索內容');
        }
    });
});