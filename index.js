
//HASHTAG點擊加入搜索框之功能
const hashtagSoftly = document.getElementById('tag-softly');
const hashtagHappy = document.getElementById('tag-happy');
const hashtagPiano = document.getElementById('tag-piano');
const input = document.getElementById('search-sec');

// 定義一個函數來處理點擊事件
function handleTagClick(event) {
    const currentText = input.value;
    const hashtagText = event.target.innerText; // 獲取被點擊的 hashtag 的文字
    // 如果輸入框已經有文字，就在後面追加新的 hashtag 文字，並且在之間加上空格
    if (currentText.length > 0) {
        input.value = `${currentText} ${hashtagText}`;
    } else {
        input.value = hashtagText; // 如果輸入框是空的，直接設置為 hashtag 的文字
    }
    console.log(input.value);
}

hashtagSoftly.addEventListener('click', handleTagClick);
hashtagHappy.addEventListener('click', handleTagClick);
hashtagPiano.addEventListener('click', handleTagClick);