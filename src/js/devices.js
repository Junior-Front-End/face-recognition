
// ====================================================== start

btn.addEventListener("click", async () => {
    
  // -------------------------------
  // (1) Screen 
  // -------------------------------
  const screen_stream = await navigator.mediaDevices.getDisplayMedia({video: true}) 
  const screen = document.createElement("video");
  screen.setAttribute("style", "display:none;"); 
  document.body.appendChild(screen); 
  screen.srcObject = screen_stream;
  screen.addEventListener("loadeddata", addWebcamEvent)
  screen.play();  
 
  
  async function addWebcamEvent() { 

    //
    reqAniScreen();

    function reqAniScreen() { 

      //
      requestAnimationFrame(reqAniScreen);
      ctx.drawImage(screen, 0, top_sc, width, sc_h); 
      
      // (7-3) can1 on mother    
      ctx.drawImage(can1, 
        width-width_sm, height-height_sm, 
        width_sm, height_sm
      );  
      
    }
    
    // -------------------------------
    // (2) webcam 
    // ------------------------------- 
    const webcam_stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true
    }); 
    
    //
    const webcam_video = new MediaStream([...webcam_stream.getVideoTracks()])
    const webcam_audio = new MediaStream([...webcam_stream.getAudioTracks()])
    
    //
    const webcam = document.createElement("video");
    webcam.width = webcam_w
    webcam.height = webcam_h
    webcam.setAttribute("style", "display: none;"); 
    document.body.appendChild(webcam); 

    //
    webcam.srcObject = webcam_video;
    webcam.addEventListener("loadeddata", () => {
      reqAnimation(webcam);
    })
    webcam.play(); 
 
    // ================================= record
    //
    var canvasStream = canvas.captureStream(30); // fps
        
    var combinedStream = new MediaStream([
      // ...AudioStream.getAudioTracks(), 
      ...canvasStream.getVideoTracks()
    ]);

    initRecorderWithCanvas(combinedStream);


    //
    function initRecorderWithCanvas(combinedStream) {

      //
      var chunks = []
      recorder = new MediaRecorder(combinedStream); 
      recorder.addEventListener('dataavailable', (e) => {
        chunks.push(e.data); 
      });

      //
      var recordBTN = document.querySelector("#record")
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

        var blob = new Blob(chunks, {type: "video/webm"})
        var objURL = URL.createObjectURL(blob); 

        var download_btn = document.createElement("a"); 

        var name = new Date().toLocaleString()
        download_btn.download = name + ".webm";
        download_btn.href = objURL;
        download_btn.click();
        
        //
        recorder.stop(); 
        console.log("stopped");
         

      });


    }




  }


});
  


 
 
