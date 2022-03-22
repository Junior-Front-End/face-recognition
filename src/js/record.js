
//
function initRecorderWithCanvas(canvas, webcam_audio) {
    
    //
    var canvasStream = canvas.captureStream(30); // fps
        
    var combinedStream = new MediaStream([
      ...webcam_audio.getAudioTracks(), 
      ...canvasStream.getVideoTracks()
    ]);

    //
    var chunks = [];
    var recorder = new MediaRecorder(combinedStream); 
    
    //
    recorder.addEventListener('dataavailable', (e) => { 
        chunks.push(e.data); 
    });

    //
    recorder.addEventListener("stop", () => {

        // 
        var blob = new Blob(chunks, {type: "video/webm"});
        var objURL = URL.createObjectURL(blob); 

        var download_btn = document.querySelector("#a"); 

        var name = new Date().toLocaleString();
        download_btn.download = name + ".webm";
        download_btn.href = objURL;

        //
        chunks = []
        
    });


    //
    var recordBTN = document.querySelector("#record");
    var pauseBTN = document.querySelector("#pause")
    var stopBTN = document.querySelector("#stop")
    var resumeBTN = document.querySelector("#resume")

    //
    recordBTN.addEventListener("click", () => {
        console.log("started");
        recorder.start();
    }); 


    //
    pauseBTN.addEventListener("click", () => {
        console.log("pause");
        recorder.pause();
    });

    //
    resumeBTN.addEventListener("click", () => {
        console.log("resume");
        recorder.resume();
    }); 

    //
    stopBTN.addEventListener("click", () => { 
        recorder.stop(); 
        console.log("stopped");  
    });



 


}
