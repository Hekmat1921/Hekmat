const audioPlayer = document.getElementById('audioPlayer');
const songTitleSpan = document.getElementById('songTitle');
const playlistUl = document.getElementById('playlist');
const uploadInput = document.getElementById('uploadSong');

let songs = [];

// بارگذاری آهنگ‌های ذخیره‌شده از localStorage
function loadSongsFromStorage() {
    const stored = localStorage.getItem('hekmat_music_songs');
    if(stored) {
        songs = JSON.parse(stored);
        renderPlaylist();
    }
}

function saveSongsToStorage() {
    localStorage.setItem('hekmat_music_songs', JSON.stringify(songs));
}

function renderPlaylist() {
    playlistUl.innerHTML = '';
    songs.forEach((song, index) => {
        const li = document.createElement('li');
        li.innerHTML = `<span>${song.name}</span> <span style="font-size:12px;">🎵</span>`;
        li.onclick = () => playSongAtIndex(index);
        playlistUl.appendChild(li);
    });
}

function playSongAtIndex(index) {
    const song = songs[index];
    if(!song) return;
    audioPlayer.src = song.url;
    songTitleSpan.innerText = song.name;
    audioPlayer.play();
}

// اضافه کردن آهنگ جدید از فایل محلی
function addNewSong(file) {
    if(!file.type.includes('audio')) {
        alert('لطفاً فایل صوتی (mp3) انتخاب کن');
        return;
    }
    const url = URL.createObjectURL(file);
    const songObj = {
        id: Date.now(),
        name: file.name.replace('.mp3','').substring(0, 40),
        url: url
    };
    songs.push(songObj);
    saveSongsToStorage();
    renderPlaylist();
    alert(`آهنگ ${songObj.name} اضافه شد`);
}

uploadInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if(file) addNewSong(file);
    uploadInput.value = ''; // اجازه آپلود مجدد
});

// نمونه آهنگ پیش‌فرض (اختیاری)
function addExampleSong() {
    if(songs.length === 0) {
        // یه آهنگ نمونه خالی نمی‌ذاریم، ولی می‌تونی لینک یه آهنگ آزمایشی از وب بذاری
        console.log('هیچ آهنگی نیست، لطفاً اول یه mp3 آپلود کن');
    }
}

loadSongsFromStorage();
addExampleSong();
