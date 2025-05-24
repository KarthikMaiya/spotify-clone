console.log("Welcome to Spotify");

// Initialize Variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "Warriyo - Mortals [NCS Release]", filePath: "songs/1.mp3", coverPath: "covers/1.jpg"},
    {songName: "Cielo - Huma-Huma", filePath: "songs/2.mp3", coverPath: "covers/2.jpg"},
    {songName: "DEAF KEV - Invincible [NCS Release]-320k", filePath: "songs/3.mp3", coverPath: "covers/3.jpg"},
    {songName: "Different Heaven & EH!DE - My Heart [NCS Release]", filePath: "songs/4.mp3", coverPath: "covers/4.jpg"},
    {songName: "Janji-Heroes-Tonight-feat-Johnning-NCS-Release", filePath: "songs/5.mp3", coverPath: "covers/5.jpg"},
    {songName: "Rabba - Salam-e-Ishq", filePath: "songs/2.mp3", coverPath: "covers/6.jpg"},
    {songName: "Sakhiyaan - Salam-e-Ishq", filePath: "songs/2.mp3", coverPath: "covers/7.jpg"},
    {songName: "Bhula Dena - Salam-e-Ishq", filePath: "songs/2.mp3", coverPath: "covers/8.jpg"},
    {songName: "Tumhari Kasam - Salam-e-Ishq", filePath: "songs/2.mp3", coverPath: "covers/9.jpg"},
    {songName: "Na Jaana - Salam-e-Ishq", filePath: "songs/4.mp3", coverPath: "covers/10.jpg"},
];

// Initialize UI with song covers and names
songItems.forEach((element, i) => { 
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 
});

// Update progress bar as song plays
audioElement.addEventListener('timeupdate', () => { 
    if (audioElement.duration) {
        let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100); 
        myProgressBar.value = progress;
    }
});

// Seek song when progress bar changes
myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = (myProgressBar.value * audioElement.duration) / 100;
});

// Helper function to reset all play buttons in the song list
const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    });
};

// Master play/pause button logic
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.replace('fa-play-circle', 'fa-pause-circle');
        gif.style.opacity = 1;
        makeAllPlays();
        // Highlight current song's play button as pause
        let currentPlayIcon = document.getElementById(songIndex.toString());
        if (currentPlayIcon) {
            currentPlayIcon.classList.replace('fa-play-circle', 'fa-pause-circle');
        }
    } else {
        audioElement.pause();
        masterPlay.classList.replace('fa-pause-circle', 'fa-play-circle');
        gif.style.opacity = 0;
        makeAllPlays();
    }
});

// Click event for each song's play button
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => { 
        let clickedIndex = parseInt(e.target.id);
        if (songIndex === clickedIndex && !audioElement.paused) {
            // If clicked the currently playing song, pause it
            audioElement.pause();
            e.target.classList.replace('fa-pause-circle', 'fa-play-circle');
            masterPlay.classList.replace('fa-pause-circle', 'fa-play-circle');
            gif.style.opacity = 0;
        } else {
            // Play new song
            makeAllPlays();
            songIndex = clickedIndex;
            e.target.classList.replace('fa-play-circle', 'fa-pause-circle');
            audioElement.src = songs[songIndex].filePath;
            masterSongName.innerText = songs[songIndex].songName;
            audioElement.currentTime = 0;
            audioElement.play();
            gif.style.opacity = 1;
            masterPlay.classList.replace('fa-play-circle', 'fa-pause-circle');
        }
    });
});

// Next button logic
document.getElementById('next').addEventListener('click', () => {
    songIndex = (songIndex + 1) % songs.length;
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.replace('fa-play-circle', 'fa-pause-circle');
    gif.style.opacity = 1;
    makeAllPlays();
    let currentPlayIcon = document.getElementById(songIndex.toString());
    if (currentPlayIcon) {
        currentPlayIcon.classList.replace('fa-play-circle', 'fa-pause-circle');
    }
});

// Previous button logic
document.getElementById('previous').addEventListener('click', () => {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.replace('fa-play-circle', 'fa-pause-circle');
    gif.style.opacity = 1;
    makeAllPlays();
    let currentPlayIcon = document.getElementById(songIndex.toString());
    if (currentPlayIcon) {
        currentPlayIcon.classList.replace('fa-play-circle', 'fa-pause-circle');
    }
});
