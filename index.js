// 漢堡
// window.addEventListener("load", function () {
//     //------btnHam漢堡按鈕被點按時
//     document.getElementById("mp-humberger").onclick = function showmenu() {
//         //取得選單的參考
//         let mpMenu = document.getElementById("mp-menu");
//         //  檢測是否有hidden類, 再決定是要加入或移除
//         if (mpMenu.title === "mp-hb") {
//             mpMenu.style.display = "flex";
//             mpMenu.title = "";
//         } else {
//             mpMenu.style.display = "none";
//             mpMenu.title = "mp-hb";
//         }
//     };
// })
window.addEventListener("load", function () {
    document.getElementById("mp-humberger").addEventListener("click", function () {
        let mpMenu = document.getElementById("mp-menu");
        mpMenu.classList.toggle('active');
    });
});

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

document.addEventListener("DOMContentLoaded", function () {
    const selects = document.querySelectorAll('select.search-select-footer');
    selects.forEach(selectElement => {
        const defaultOption = selectElement.querySelector('option[value="all"]');
        if (defaultOption) {
            defaultOption.disabled = true;
            defaultOption.hidden = true;
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