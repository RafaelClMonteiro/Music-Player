const img = document.getElementById('cover'),
    title = document.getElementById('music-title'),
    artist = document.getElementById('music-artist'),
    currentTimeEl = document.getElementById('current-time'),
    durationEl= document.getElementById('duration'),
    progress= document.getElementById('progress'),
    player = document.getElementById('player-progress'),
    backBtn = document.getElementById('back'),
    playBtn = document.getElementById('play'),
    forwardBtn = document.getElementById('forward'),
    background = document.getElementById('bg-image'),
    searchInput = document.getElementById('music-url');
    suggestions = document.getElementById('suggestions');
    volumeSlider = document.getElementById('volume-slider');
    volumeIcon = document.querySelector('.volume-control i');  

const music = new Audio();

const songs = [
    {
    path: 'assets/Music1.mp3',
    displayName: 'Rose',
    cover: 'assets/Music1.png',
    artist: 'oxinym',
    },

    {
        path: 'assets/Music2.mp3',
        displayName: 'Lovers of the Lake',
        cover: 'assets/Music2.png',
        artist: 'oxinym',
    },

    {
        path: 'assets/Music3.mp3',
        displayName: 'Euphoria',
        cover: 'assets/Music3.png',
        artist: 'oxinym',
    },
    
    {
        path: 'assets/Music4.mp3',
        displayName: 'Lonely Merchant',
        cover: 'assets/Music4.png',
        artist: 'oxinym',
    }, 
]

let musicIndex = 0;
let isPlaying = true;

function togglePlay(){
    if(isPlaying){
        pauseMusic();
    }else{
        playMusic();
    }
}

function playMusic(){
    isPlaying = true;

    playBtn.classList.replace('bxs-chevron-right', 'bx-pause');

    playBtn.setAttribute('title', 'Pause');
    music.play();
}

function pauseMusic(){
    isPlaying = false;

    playBtn.classList.replace('bx-pause', 'bxs-chevron-right');

    playBtn.setAttribute('title', 'Play');
    music.pause();
}

function loadMusic(songs){
    music.src = songs.path;
    title.textContent = songs.displayName;
    artist.textContent = songs.artist;
    img.src = songs.cover;
    background.src = songs.cover;
}

function changeMusic(direction){
    musicIndex = (musicIndex + direction + songs.length) %
    songs.length;

    loadMusic(songs[musicIndex]); 
    playMusic(); 
}

function updateProgressBar(){
    const { duration, currentTime } = music; 
    const progressPercent = (duration ? (currentTime / duration) * 100 : 0); 

    progress.style.width = `${progressPercent}%`; 

    const formatTime = (time) => String(Math.floor(time)).padStart(2, '0');
    durationEl.textContent = `${formatTime(duration / 60)}:${formatTime(duration % 60)}`;
    currentTimeEl.textContent = `${formatTime(currentTime / 60)}:${formatTime(currentTime % 60)}`; 
}

function setProgressBar (e) {
    const width = player.clientWidth;
    const clickX = e.offsetX;
    music.currentTime = (clickX / width) * music.duration;
}


music.volume = 0.5;


function updateVolumeIcon() {
    const volume = music.volume * 100;  

    if (volume === 0) {
        volumeIcon.className = 'bx bxs-volume-mute';  
    } else if (volume > 0 && volume <= 33) {
        volumeIcon.className = 'bx bxs-volume';  
    } else if (volume > 33 && volume <= 66) {
        volumeIcon.className = 'bx bxs-volume-low';  
    } else {
        volumeIcon.className = 'bx bxs-volume-full';  
    }
}


volumeSlider.addEventListener('input', (e) => {
    music.volume = e.target.value / 100;  
    updateVolumeIcon();  
});


updateVolumeIcon();

searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase();
    suggestions.innerHTML = '';

    if (query) {
        const filteredSongs = songs.filter(song => 
            song.displayName.toLowerCase().startsWith(query)
        );

        filteredSongs.forEach(song => {
            const li = document.createElement('li');
            li.textContent = song.displayName;
            li.addEventListener('click', () => {
                loadMusic(song);
                playMusic();
                suggestions.innerHTML = '';  
                searchInput.value = '';  
            });
            suggestions.appendChild(li);
        });
    }
});


playBtn.addEventListener('click', togglePlay);
backBtn.addEventListener('click', () => changeMusic(-1));
forwardBtn.addEventListener('click', () => changeMusic(1));
music.addEventListener('ended', () => changeMusic(1));
music.addEventListener('timeupdate', updateProgressBar);
player.addEventListener('click', setProgressBar);

loadMusic(songs[musicIndex]);
music.play();
