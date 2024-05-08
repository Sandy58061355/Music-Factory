// 漢堡
window.addEventListener("load", function () {
    //------btnHam漢堡按鈕被點按時
    document.getElementById("btnHam").onclick = function showmenu() {
        //取得選單的參考
        let menu = document.getElementById("menu");
        //  檢測是否有hidden類, 再決定是要加入或移除
        if (menu.title === "a") {
            menu.style.display = "flex";
            menu.title = "";
        } else {
            menu.style.display = "none";
            menu.title = "a";
        }
    };
})
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
//隱藏選單"風格"在option中
function handleSelectChange(selectElement) {
    const defaultOption = selectElement.querySelector('option[value="all"]');
    if (defaultOption) {
        defaultOption.disabled = true;
        defaultOption.hidden = true;
    }
}
// 設定所有愛心圖標的點按事件
document.querySelectorAll(".favorite").forEach(function (heart) {
    heart.onclick = function () {
        switchFavorite(this); // 將當前點擊的愛心元素傳入函數
    };
});

// 加入收藏與取消收藏的函數
function switchFavorite(heart) {
    if (heart.title === "加入收藏") {
        heart.src = "./imgs/love-red.svg";
        heart.title = "取消收藏";
    } else {
        heart.src = "./imgs/love-white.svg";
        heart.title = "加入收藏";
    }
}
//釘選菜單效果
document.addEventListener("DOMContentLoaded", function () {
    const links = document.querySelectorAll('.side-menu-bar a');

    links.forEach(link => {
        link.addEventListener('click', function () {
            links.forEach(node => node.classList.remove('active'));

            this.classList.add('active');
        });
    });
});
