//elements  from DOM
const player = document.querySelector('.player')

const video = player.querySelector('.player__video')
const progress = player.querySelector('.progress')
const progressBar = player.querySelector('.progress__filled')
const playerButton = player.querySelector('.toggle')
const ranges = player.querySelectorAll('.player__slider')
const skipButtons = player.querySelectorAll('[data-skip]')
const fullScreenBtn = player.querySelector('.fullscreen__button')


//functions
const togglePlay = function(){
    if(video.paused){
        video.play()
    }else{
        video.pause()
    }
}

const updateButton = function(){
    const icon = this.paused ? '►' : '❚❚'
    playerButton.textContent = icon
}

const skip = function(){
    video.currentTime += parseFloat(this.dataset.skip)
}


const handleRangeUpdate = function(){
    video[this.name] = this.value
}

const handleProgress = function(){
    const percent = (video.currentTime/ video.duration)*100
    progressBar.style.flexBasis = `${percent}%`
}

const scrub = function(e){
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration
    video.currentTime = scrubTime
}

const fullScreen = function(){
    if(video.requestFullscreen){
        video.requestFullscreen()
    }
}
//events
//click above video image
video.addEventListener('click',togglePlay)

//when the video is playing or paused update the button(play or pause)
video.addEventListener('play', updateButton)
video.addEventListener('pause', updateButton)

//click play button and play
playerButton.addEventListener('click', togglePlay)

//click on the skip buttons that add an attribute data-skip
skipButtons.forEach( button => button.addEventListener('click', skip))

//update the range inputs volume and speed
ranges.forEach( range => range.addEventListener('change', handleRangeUpdate))
ranges.forEach( range => range.addEventListener('mousemove', handleRangeUpdate))

//progress Bar fullfill by playing the video
video.addEventListener('timeupdate', handleProgress)


let mousedown = false

progress.addEventListener('click', scrub)

progress.addEventListener('mousemove', (e) => {
    if(mousedown){
        scrub(e)
    }
})

//drag continuously if mousedown and mousemove above
progressBar.addEventListener('mousedown' , () => mousedown = true)

progressBar.addEventListener('mouseup', ()=> mousedown = true)


// toggle fullscreen btn
fullScreenBtn.addEventListener('click', fullScreen)