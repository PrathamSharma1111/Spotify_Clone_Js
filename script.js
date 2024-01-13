console.log("My Spotify");
// Initialise the variable
let songIndex=0;
let audioElement= new Audio('1.mp3');
let masterplay=document.getElementById('masterplay');
let myProgressBar=document.getElementById('myProgressBar');
let gif=document.getElementById('gif');
let masterSongName=document.getElementById('masterSongName');
 let songItems=Array.from(document.getElementsByClassName('songItem'));
   let timestamp=document.getElementsByClassName('timestamp');
let songs=[
    {songName:"Bombay", filepath:"1.mp3", coverPath:"covers/1.jpg"},
    {songName:"New York", filepath:"2.mp3", coverPath:"covers/2.jpg"},
    {songName:"Opera", filepath:"3.mp3", coverPath:"covers/3.jpg"},
    {songName:"James Bond", filepath:"4.mp3", coverPath:"covers/4.jpg"},
    {songName:"KaKerot", filepath:"5.mp3", coverPath:"covers/5.jpg"},
    {songName:"Vegeta", filepath:"6.mp3", coverPath:"covers/6.jpg"},
    {songName:"Asta", filepath:"7.mp3", coverPath:"covers/7.jpg"},
    {songName:"Luffy", filepath:"8.mp3", coverPath:"covers/8.jpg"},
    {songName:"Zoro", filepath:"9.mp3", coverPath:"covers/9.jpg"}
]

songItems.forEach((element,i) => {
    element.getElementsByTagName("img")[0].src=songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText=songs[i].songName;
});

// audioElement.play();

// handel play/pause click
masterplay.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterplay.classList.remove('fa-circle-play');
        masterplay.classList.add('fa-circle-pause');
        gif.style.opacity=1;
    }else{
        audioElement.pause();
        masterplay.classList.remove('fa-circle-pause');
        masterplay.classList.add('fa-circle-play');
        gif.style.opacity=0;
    }
})
// listen to Event
audioElement.addEventListener('timeupdate',()=>{
//    console.log('timeupdate');
    // update seekbar
    progress=parseInt((audioElement.currentTime/audioElement.duration)*100);
    // console.log(progress);
    myProgressBar.value=progress;

})

myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime=myProgressBar.value*audioElement.duration/100;
})

const makeAllPlays=()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');  
    })
}

// Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
//     element.addEventListener('click',(e)=>{
//         makeAllPlays();
//         songIndex =parseInt(e.target.id);
//         e.target.classList.remove('fa-circle-play');
//         e.target.classList.add('fa-circle-pause');
//         audioElement.src=`${songIndex+1}.mp3`;
//         masterSongName.innerHTML=songs[songIndex].songName;
//         audioElement.currentTime=0;
//         audioElement.play();
//         gif.style.opacity=1;
//         masterplay.classList.remove('fa-circle-play');
//         masterplay.classList.add('fa-circle-pause');
//     })
// })
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        makeAllPlays();
        currentlyPlayingIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        audioElement.src = `${currentlyPlayingIndex + 1}.mp3`;
        masterSongName.innerHTML = songs[currentlyPlayingIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterplay.classList.remove('fa-circle-play');
        masterplay.classList.add('fa-circle-pause');
    });
});

document.getElementById('next').addEventListener('click',()=>{
    if(songIndex>=8){
        songIndex=0;
    }else{
    songIndex +=1;
    }
    audioElement.src=`${songIndex+1}.mp3`;
    masterSongName.innerHTML=songs[songIndex].songName;
        audioElement.currentTime=0;
        audioElement.play();
        masterplay.classList.remove('fa-circle-play');
        masterplay.classList.add('fa-circle-pause');
})
document.getElementById('previous').addEventListener('click',()=>{
    if(songIndex<=0){
        songIndex=8;
    }else{
    songIndex -=1;
    }
    audioElement.src=`${songIndex+1}.mp3`;
    masterSongName.innerHTML=songs[songIndex].songName;
        audioElement.currentTime=0;
        audioElement.play();
        masterplay.classList.remove('fa-circle-play');
        masterplay.classList.add('fa-circle-pause');
})

// Array.from(timestamp).forEach((element, i) => {
//     element.addEventListener('change', () => {
//         progress =audioElement.currentTime = element.value * audioElement.duration / 100;
//         timestamp.value=progress;
//     });
// });
function formatTime(seconds) {
    let minutes = Math.floor(seconds / 60);
    let remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}
let currentlyPlayingIndex = null;

// Update timestamp value for the currently playing song
audioElement.addEventListener('timeupdate', () => {
    if (currentlyPlayingIndex !== null) {
        let prevTimestampElement = document.getElementById(currentlyPlayingIndex);
        if (prevTimestampElement) {
            prevTimestampElement.innerText = formatTime(0);
        }
    }
    if (currentlyPlayingIndex !== null) {
        let timestampElement = document.getElementById(currentlyPlayingIndex);
        if (timestampElement) {
            let currentTimeInSeconds = Math.floor(audioElement.currentTime);
            timestampElement.innerText = formatTime(currentTimeInSeconds);
        }
    }
});
// audioElement.addEventListener('loadedmetadata', () => {
//     songs.forEach((song, i) => {
//         let timestampElement = document.getElementById('i');
//         if (timestampElement) {
//             let durationInSeconds = Math.floor(audioElement.duration);
//             timestampElement.innerText = formatTime(durationInSeconds);
//         }
//     });
// });


// // Update timestamp values based on audio length
// audioElement.addEventListener('timeupdate', () => {
//     songs.forEach((song, i) => {
//         let timestampElement = document.getElementById(i);
//         if (timestampElement) {
//             let currentTimeInSeconds = Math.floor(audioElement.currentTime);
//             timestampElement.innerText = formatTime(currentTimeInSeconds);
//         }
//     });
// });