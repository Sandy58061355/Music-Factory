// 漢堡
window.addEventListener("load", function () {
    //------btnHam漢堡按鈕被點按時
    document.getElementById("btnHam").onclick = function () {
        //取得選單的參考
        let menu = document.getElementById("menu");
        //  檢測是否有hidden類, 再決定是要加入或移除
        if (menu.classList.contains("hidden") === true) {
            menu.classList.remove("hidden");
        } else {
            menu.classList.add("hidden");
        }
    };
}, false);

//搜索框(不得輸入空值)
let searchInput = document.getElementById('music-generate-search');
let musicStyleBtn = document.querySelector('.music-style-search-btn');
var searchLinkMusicGenerate = document.getElementById('search-link-mg');

searchInput.addEventListener('input', function () {
    var inputVal = searchInput.value.trim();
    if (inputVal) {
        musicStyleBtn.classList.remove('disabled');
        searchLinkMusicGenerate.href = 'music-generate.html?search=' + encodeURIComponent(inputVal);
    } else {
        musicStyleBtn.classList.add('disabled');
        searchLinkMusicGenerate.href = '#';
    }
});

musicStyleBtn.addEventListener('click', function (e) {
    if (musicStyleBtn.classList.contains('disabled')) {
        e.preventDefault(); // 阻止跳轉
        alert('請輸入搜索內容');
    }
});