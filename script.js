
let seconds = 0;
let minutes = 0;
let hours = 0;


let displaySeconds = 0;
let displayMinutes = 0;
let displayHours = 0;


let interval = null;


let status = "stopped";


function stopWatch(){

    seconds++;

  
    if(seconds / 60 === 1){
        seconds = 0;
        minutes++;

        if(minutes / 60 === 1){
            minutes = 0;
            hours++;
        }

    }

    
    if(seconds < 10){
        displaySeconds = "0" + seconds.toString();
    }
    else{
        displaySeconds = seconds;
    }

    if(minutes < 10){
        displayMinutes = "0" + minutes.toString();
    }
    else{
        displayMinutes = minutes;
    }

    if(hours < 10){
        displayHours = "0" + hours.toString();
    }
    else{
        displayHours = hours;
    }


    document.getElementById("display").innerHTML = displayHours + ":" + displayMinutes + ":" + displaySeconds;

}



function startStop(){

    if(status === "stopped"){


        interval = window.setInterval(stopWatch, 1000);
        document.getElementById("startStop").innerHTML = "Stop";
        status = "started";

    }
    else{

        window.clearInterval(interval);
        document.getElementById("startStop").innerHTML = "Start";
        status = "stopped";

    }

}

function reset(){

    window.clearInterval(interval);
    seconds = 0;
    minutes = 0;
    hours = 0;
    document.getElementById("display").innerHTML = "00:00:00";
    document.getElementById("startStop").innerHTML = "Start";

}

const downloadLink = document.getElementById('download');
const stopButton = document.getElementById('stop');

class VoiceRecorder{
    constructor(){
        if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia){
            console.log("Get user media supported");
        }
        else
    {
        console.log("Get user media NOT supported");
    
    }
    this.mediaRecorder
    this.stream
    this.chunks =[]
    this.isRecording = false
    this.recordRef = document.querySelector("#recorder");
    this.playerRef = document.querySelector("#player");
    this.startRef = document.querySelector("#start");
    this.stopRef = document.querySelector("#stop");
        
        this.startRef.onclick = this.startRecording.bind(this);
        this.stopRef.onclick = this.stopRecording.bind(this);
        this.constraints={
            audio:true,
            video: false
        }
    }
    handleSuccess(stream){
        this.stream = streamthis.stream.onactive = ()=>{
            console.log("stream ended ");
        }
        this.recorderRef.scrObject =this.stream
        this.mediaRecorder = new this.mediaRecorder(this.stream)
        this.mediaRecorder.ondataavailable = this.onMediaRecorderDataAvailable.bind(this);
        this.mediaRecorder.onstop = this.onMediaRecorderStop.bind(this);
        this.recorderRef.play();
        this.mediaRecorder.start();
    }
    onMediaRecorderDataAvailable(e){this.chunks.push(e.data)}
    onMediaRecorderStop(e){
        const blob=new Blob(this.chunks,{'type':'audio/ogg;codesc=opus'});
        const audioURL = window.URL.createObjectURL(blob);
        this.playerRef.src=audioURL;
        this.chunks=[]
        this.stream.getAudioTracks().forEach(track=>track.stop());
        this.stream = null
    }
    startRecording(){
        if(this.isRecording) return
        this.isRecording=truethis.startRef.innerHTML="Recording...";
        this.playerRef.src=' ';
        navigator.mediaDevices.getUserMedia(this.constraints)
        .then(this.handleSuccess.bind(this))
        .catch(this.handleSuccess.bind(this))
    }
    stopRecording(){
        if(!this.isRecording) return
        this.isRecording=false
        this.startRef.innerHTML="Record";
        this.recorderRef.pause();
        this.onMediaRecorder.stop()
    }
}
window.VoiceRecorder = new VoiceRecorder();