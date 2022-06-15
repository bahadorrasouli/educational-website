const videoSection = document.querySelector('.video-gallery')
const videoContainer = videoSection.querySelector('.main-video')
const videoPlayer = videoSection.querySelector('video');
const videoPreview = videoSection.querySelector('.video-preview');
const playBtnVideoPreview = videoPreview.querySelector('.play-btn');



const videoController = videoSection.querySelector('.video-controller');
const videoControllerContainer = videoController.querySelector('.container');
const playVideoBtn = videoController.querySelector('.play-btn');
const pauseVideoBtn = videoController.querySelector('.pause-btn');
const timelineBar = videoController.querySelector('.timeline');
const timelineBarActiv = videoController.querySelector('.timeline-bar');
const timelineHandle = videoController.querySelector('.timeline-handle');
const timeCount = videoController.querySelector('.timecount');

const volumeBar = videoController.querySelector('.volume');
const volumeBarActiv = videoController.querySelector('.volume-bar');
const volumeHandle = videoController.querySelector('.volume-handle');

let previewMode = true;

playBtnVideoPreview.addEventListener('click', ()=>{
  videoPreview.style.opacity = '0';
  videoPlayer.play();
  videoControllerContainer.classList.add("moveUp");
  videoPlayer.classList.add('play');
  previewMode = false;
});


pauseVideoBtn.addEventListener('click', ()=>{
  videoPlayer.pause();
  videoPlayer.classList.remove('play');
  videoPlayer.classList.add('pause');
  playVideoBtn.style.display = 'flex';
  pauseVideoBtn.style.display = 'none';
});

playVideoBtn.addEventListener('click', ()=>{
  videoPlayer.play();
  videoPlayer.classList.remove('pause');
  videoPlayer.classList.add('play');
  pauseVideoBtn.style.display = 'flex';
  playVideoBtn.style.display = 'none';
});





videoPlayer.addEventListener('timeupdate', ()=>{
  let v = videoPlayer;
  let percentOfDuration = v.currentTime * 100 / v.duration;
  timelineBarActiv.style.width = `${percentOfDuration}%`;
  timelineHandle.style.left = `${percentOfDuration}%`;

  let remainingTime = v.duration - v.currentTime;
  let min = Math.floor(remainingTime / 60);
  let sec = Math.floor(remainingTime % 60);

  min = min<10 ? `0${min}` : min;
  sec = sec<10 ? `0${sec}` : sec;

  timeCount.innerHTML = `${min} : ${sec}`

  if(remainingTime == 0){
    videoPlayer.pause();
    // videoControllerContainer.style.transform = 'translateY(100px)';
    videoControllerContainer.classList.add("moveDown");
    videoPreview.style.opacity = '1';
    videoPlayer.classList.add('pause');
    previewMode = true;
  }
});

timelineBarActiv.style.width = `0%`;
timelineHandle.style.left = `0%`;
timelineBar.addEventListener('click', (e)=>{
  let width = timelineBar.offsetWidth;
  let x = e.offsetX;

  let percentOfWidth = x * 100 / width;

  let fullTime = videoPlayer.duration;
  videoPlayer.currentTime = percentOfWidth * fullTime / 100;
})

volumeBarActiv.style.width = `100%`;
volumeHandle.style.left = `100%`;

volumeBar.addEventListener('click', (e)=>{
  
  let width = volumeBar.offsetWidth;
  let x = e.offsetX;

  let percentOfWidth = x * 100 / width;

  videoPlayer.volume = percentOfWidth / 100;

  volumeBarActiv.style.width = `${percentOfWidth}%`;
  volumeHandle.style.left = `${percentOfWidth}%`;

});


videoContainer.addEventListener('mouseenter', ()=>{
  
  if(!previewMode){
    videoControllerContainer.classList.remove('moveDown')
    videoControllerContainer.classList.add('moveUp')
  }
 
})


videoContainer.addEventListener('mouseleave', ()=>{
  
  if(!previewMode){
    videoControllerContainer.classList.remove('moveUp');
    videoControllerContainer.classList.add('moveDown');
  }

})


