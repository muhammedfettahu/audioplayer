const image = document.getElementById('cover'),
    title = document.getElementById('music-title'),
    artist = document.getElementById('music-artist'),
    currentTimeEl = document.getElementById('current-time'),
    durationEl = document.getElementById('duration'),
    progress = document.getElementById('progress'),
    playerProgress = document.getElementById('player-progress'),
    prevBtn = document.getElementById('prev'),
    nextBtn = document.getElementById('next'),
    playBtn = document.getElementById('play'),
    background = document.getElementById('bg-img');

const music = new Audio();

const songs = [
    {
        path: 'assets/1.mp3',
        displayName: 'Murujan - Nasheed',
        cover: 'assets/1.jpg',
        artist: 'UNKNOWN',
    },
    {
        path: 'assets/2.mp3',
        displayName: 'Sirna - Nasheed',
        cover: 'assets/2.jpg',
        artist: 'UNKNOWN',
    },
    {
        path: 'assets/3.mp3',
        displayName: 'FIRUBUI - Nasheed',
        cover: 'assets/3.jpg',
        artist: 'UNKNOWN',
    },
    {
        path: 'assets/4.mp3',
        displayName: 'Bashair - Nasheed',
        cover: 'assets/4.jpg',
        artist: 'UNKNOWN',
    },
    {
        path: 'assets/5.mp3',
        displayName: 'Shay Shay - Nasheed',
        cover: 'assets/5.jpg',
        artist: 'UNKNOWN',
    },
    {
        path: 'assets/6.mp3',
        displayName: 'Ya dhakir al-Ashabi - Nasheed',
        cover: 'assets/6.jpg',
        artist: 'UNKNOWN',
    },
    {
        path: 'assets/7.mp3',
        displayName: 'Baligh Maleek - Nasheed',
        cover: 'assets/7.jpg',
        artist: 'UNKNOWN',
    },
    {
        path: 'assets/8.mp3',
        displayName: 'Ghuraba - Nasheed',
        cover: 'assets/8.jpg',
        artist: 'UNKNOWN',
    },
    {
        path: 'assets/9.mp3',
        displayName: 'Akhi Anta Hurun - Nasheed',
        cover: 'assets/9.jpg',
        artist: 'UNKNOWN',
    },
    {
        path: 'assets/10.mp3',
        displayName: 'هذب فؤادك بالحياة',
        cover: 'assets/10.jpg',
        artist: 'UNKNOWN',
    },
    {
        path: 'assets/11.mp3',
        displayName: 'ذاك شيخ المعي',
        cover: 'assets/11.jpg',
        artist: 'UNKNOWN',
    },
    {
        path: 'assets/12.mp3',
        displayName: 'Al-Lamiyyah',
        cover: 'assets/12.jpg',
        artist: 'UNKNOWN',
    },
];

let musicIndex = 0;
let isPlaying = false;

function togglePlay() {
    if (isPlaying) {
        pauseMusic();
    } else {
        playMusic();
    }
}

function playMusic() {
    isPlaying = true;
    // Change play button icon
    playBtn.classList.replace('fa-play', 'fa-pause');
    // Set button hover title
    playBtn.setAttribute('title', 'Pause');
    music.play();
}

function pauseMusic() {
    isPlaying = false;
    // Change pause button icon
    playBtn.classList.replace('fa-pause', 'fa-play');
    // Set button hover title
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

function loadMusic(song) {
    music.src = song.path;
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    image.src = song.cover;
    background.src = song.cover;
}

function changeMusic(direction) {
    musicIndex = (musicIndex + direction + songs.length) % songs.length;
    loadMusic(songs[musicIndex]);
    playMusic();
}

function updateProgressBar() {
    const { duration, currentTime } = music;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    const formatTime = (time) => String(Math.floor(time)).padStart(2, '0');
    durationEl.textContent = `${formatTime(duration / 60)}:${formatTime(duration % 60)}`;
    currentTimeEl.textContent = `${formatTime(currentTime / 60)}:${formatTime(currentTime % 60)}`;
}

function setProgressBar(e) {
    const width = playerProgress.clientWidth;
    const clickX = e.offsetX;
    music.currentTime = (clickX / width) * music.duration;
}

const repeatBtn = document.getElementById('repeat');
let isRepeating = false;

// Toggle repeat mode
function toggleRepeat() {
    isRepeating = !isRepeating;
    // Change the button color based on repeat state
    repeatBtn.style.color = isRepeating ? 'green' : ''; // Set green when active
    repeatBtn.setAttribute('title', isRepeating ? 'Repeat On' : 'Repeat Off');
}

// Handle song end based on repeat state
music.addEventListener('ended', () => {
    if (isRepeating) {
        playMusic(); // Replay the current song
    } else {
        changeMusic(1); // Move to the next song
    }
});

// Add event listener to the repeat button
repeatBtn.addEventListener('click', toggleRepeat);

// Other event listeners (unchanged)
playBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', () => changeMusic(-1));
nextBtn.addEventListener('click', () => changeMusic(1));
music.addEventListener('timeupdate', updateProgressBar);
playerProgress.addEventListener('click', setProgressBar);

loadMusic(songs[musicIndex]);
