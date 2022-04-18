


const title = document.querySelector('.title');
const rec = document.querySelector('.rec');
const stop = document.querySelector('.stop');
const audioPlay = document.querySelector('.audio');
const stopwatch = document.querySelector('.stopwatch');


let typeOfMedia = {
    audio: true
       
};

let chunks = [];

var options = {
        audioBitsPerSecond: 128000,
       
        mimeType: 'audio/webm'
    }
  
let counter = 0;


let recStream;

const recFunction = async() => {
    try {
        
        const mediaDevices = await navigator.mediaDevices.getUserMedia(typeOfMedia)
        if (mediaDevices.active === true || mediaDevices.inactive === true ) {
             
            recStream = new MediaRecorder(mediaDevices, options);
    
            recStream.ondataavailable = e => {
                  
                    chunks.push(e.data);
              
                    if (recStream.state == 'inactive') {
                      
                        let blob = new Blob(chunks, { type: 'audio/webm' });
                     
                        createAudioElement(URL.createObjectURL(blob))
                    }
                }
               
            recStream.start()
        }
    } catch (error) {
        if (error) console.log(error);
    }
}


let linkStyles = "display: block; padding: 10px; color:red; text-decoration: none; "
    
    
      function createAudioElement(blobUrl) {
          
          const divEl = document.createElement('div');
          
          divEl.className = 'div-audio'
              
          const downloadEl = document.createElement('a');
      
          downloadEl.style = linkStyles;
        
          downloadEl.innerHTML = `Download-${counter = counter + 1}`;
          downloadEl.download = `Audio-${counter}.webm`;
    
          downloadEl.href = blobUrl;
        
          const audioEl = document.createElement('audio');
          
          audioEl.className = 'audio'
          
          audioEl.controls = true;
       
          const sourceEl = document.createElement('source');
          sourceEl.src = blobUrl;
       
          sourceEl.type = 'audio/webm';
         
          audioEl.appendChild(sourceEl);
        
          divEl.appendChild(audioEl)
          divEl.appendChild(downloadEl)
              
          document.body.appendChild(divEl);
      }
    


rec.onclick = e => {
       
        rec.disabled = true;
      
        rec.classList.add('scale');
    
        stop.disabled = false;
      
        recFunction()
          
        clearInterval(swInterval);
        swIternal = setInterval(stopwatchFunction, 1000);
    }
  
stop.onclick = e => {
   
    rec.disabled = false;
  
    rec.classList.remove('scale');
   
    stop.disabled = true;
  
    clearInterval(swIternal);
    sec = 0;
    min = 0;
   
    recStream.stop()

}


let swInterval;
let displayStopwatch;
let sec = 0;
let min = 0;
let stopwatchFunction = () => {
    sec++
    if (sec <= 9) {
        sec = '0' + sec;
    }
    if (sec === 60) {
        sec = 0;
        min++
        if (min <= 9) {
            min = '0' + min;
        }
    }
    if (min === 60) {
        min = 0;
    }
    displayStopwatch = 'min: ' + min + ' : ' + 'sec: ' + sec;
    // Write output to the screen
    stopwatch.innerHTML = displayStopwatch;
};


//  button.setAttribute('onmouseup',action);
//  return button;
// }
