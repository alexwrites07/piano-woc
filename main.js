

// Select buttons
const title = document.querySelector('.title');
const rec = document.querySelector('.rec');
const stop = document.querySelector('.stop');
const audioPlay = document.querySelector('.audio');
const stopwatch = document.querySelector('.stopwatch');

// Type of media to rec
let typeOfMedia = {
    audio: true
        //, video: true
};
// Create chunks audio container
let chunks = [];
// Media options
var options = {
        audioBitsPerSecond: 128000,
        // videoBitsPerSecond: 2500000,
        mimeType: 'audio/webm'
    }
    // Download counter
let counter = 0;

//
// ─── REC FUNCTION ───────────────────────────────────────────────────────────────

// RecStream init
let recStream;

const recFunction = async() => {
    try {
        // Access to computer devices
        const mediaDevices = await navigator.mediaDevices.getUserMedia(typeOfMedia)
        if (mediaDevices.active === true || mediaDevices.inactive === true ) {
            // The MediaRecorder() constructor creates a new MediaRecorder object that will record a specified MediaStream. 
            recStream = new MediaRecorder(mediaDevices, options);
            //console.log(recStream)
            recStream.ondataavailable = e => {
                    // console.log(e)
                    // Push media data inside the array
                    chunks.push(e.data);
                    // If state inactive stop recording
                    if (recStream.state == 'inactive') {
                        // console.log(chunks)
                        // Create a new Blob with the array created
                        let blob = new Blob(chunks, { type: 'audio/webm' });
                        // Create a Playback and pass it the blob
                        createAudioElement(URL.createObjectURL(blob))
                    }
                }
                // Start Recording in 1s
                // recStream.start(1000)
                // Start rec now
            recStream.start()
        }
    } catch (error) {
        if (error) console.log(error);
    }
}

// Link styles
let linkStyles = "display: block; padding: 10px; color:red; text-decoration: none; "
    //
    //─── FUNCTION TO CREATE AN AUDIO ELEMENT TO PLAYBACK AND DOWNLOAD RECORDING ─────
    
    
      function createAudioElement(blobUrl) {
          // Create a div element
          const divEl = document.createElement('div');
          // Assign it a class
          divEl.className = 'div-audio'
              // Create an anchor tag
          const downloadEl = document.createElement('a');
          // Give it styles
          downloadEl.style = linkStyles;
          // Give it a progressive name
          downloadEl.innerHTML = `Download-${counter = counter + 1}`;
          downloadEl.download = `Audio-${counter}.webm`;
          // Define href
          downloadEl.href = blobUrl;
          // Create audio element
          const audioEl = document.createElement('audio');
          // Give it a class
          audioEl.className = 'audio'
              // Show controls play pause etc
          audioEl.controls = true;
          // Create source
          const sourceEl = document.createElement('source');
          sourceEl.src = blobUrl;
          // Audio type
          sourceEl.type = 'audio/webm';
          // Append source on audio
          audioEl.appendChild(sourceEl);
          // document.body.appendChild(audioEl);
          // document.body.appendChild(downloadEl);
          // Append child
          divEl.appendChild(audioEl)
          divEl.appendChild(downloadEl)
              // Append all in the body DOM
          document.body.appendChild(divEl);
      }
    

// REC CLICK BUTTON EVENT LISTENER
rec.onclick = e => {
        // During registration disable rec button
        rec.disabled = true;
        // Change background color
        // rec.style.backgroundColor = 'orange';
        // Animate rec button
        rec.classList.add('scale');
        // Enable stop button (default disabled)
        stop.disabled = false;
        // Change stop color back
        // stop.style.background = '#292964';
        // stop.style.color = '#ffffff';
        // Change title back color
        // title.style.color = '#2196F3'
            // Start recording
        recFunction()
            // START STOPWATCH
        clearInterval(swInterval);
        swIternal = setInterval(stopwatchFunction, 1000);
    }
    // STOP REC BUTTON EVENT LISTENER
stop.onclick = e => {
    // Enable rec button
    rec.disabled = false;
    // // Restore red color on rec button
    // rec.style.backgroundColor = 'red';
    // // Disable rec animation 
    rec.classList.remove('scale');
    // // Disable stop button
    stop.disabled = true;
    // // Change stop color back
    // stop.style.backgroundColor = '#292929';
    // stop.style.color = 'rgb(103, 103, 103)';
    // // Change back title color
    // title.style.color = '#313142'
        // STOP and Reset STOPWATCH
    clearInterval(swIternal);
    sec = 0;
    min = 0;
    // Stop Recording
    recStream.stop()

}

// STOPWATCH
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
// function trimrecording(arr)
// {
//  var newarr = [];
//  var startms = arr[0].split('.')[1];
//  for (var i=0; i<arr.length-1; i++)
//  {
//   var n = Math.floor(arr[i]);
//   var ms = arr[i].split('.')[1];
//   ms = ms - startms;
//   newarr.push(n+'.'+ms);  
//  }
//  newarr.push('');
//  return newarr;
// }

// var g_playbackbuttontext = 's &#9654;'; //' secs playback';

// function playbackbutton(id)
// {
//  var tape = document.getElementById('recordedsounds').value;
//  var arr = tape.split(' ');
//  if (arr.length <=1 ) return;
//  arr = trimrecording(arr);
//  var duration = parseInt(arr[arr.length-2].split('.')[1]);

//  var ga = "galog('Memorybutton', 'playback-click');"; 
//  var action = ga;
//  for (var i=0; i<arr.length-1; i++)
//  {
//   var n = Math.floor(arr[i]);
//   var ms = arr[i].split('.')[1];
//   var percent = parseInt(ms)/duration*100+'%';
//   var background = "linear-gradient(to right, #ffffff, #ffffff "+percent+", #cccccc 0%, #cccccc)"; 
//   action += 'setTimeout("'+id+'button.style.background='+"'"+background+"'"+';",'+ms+');' ; 
//   action += "setTimeout('downpresspianokey("+n+");',"+ms+');' ;
//   var delay = 222;
//   action += "setTimeout('releasepianokey("+n+");',"+(parseInt(ms)+delay)+');' ;
//   action += "playpianosound(audiocontext,"+n+","+ms/1000+");";
//  }
//  action += 'setTimeout("'+id+'button.style.background='+"'"+'linear-gradient(#eeeeee, #cccccc)'+"'"+';",'+duration+');' ;
//  var button = document.createElement('button');
//  button.id = id+'button';
//  button.className = 'playback';
//  button.innerHTML = (duration / 1000).toFixed(1) + g_playbackbuttontext;
//  button.setAttribute('onmousedown','null');
//  button.setAttribute('onmouseup',action);
//  return button;
// }