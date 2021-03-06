btn.addEventListener("click", async () => {

  //
  const screen_stream = await navigator.mediaDevices.getDisplayMedia();

  //
  const screen = document.createElement("video");
  screen.setAttribute("style", "display:none;"); 
  document.body.appendChild(screen); 
  screen.srcObject = screen_stream;
  screen.addEventListener("loadeddata", addWebcamEvent);
  screen.play();
  
  
  //
  async function addWebcamEvent() { 


    // -------------------------------
    // (1) Screen 
    // ------------------------------- 
    
    screenAnimation();

    function screenAnimation() { 
      
      requestAnimationFrame(screenAnimation);

      // screen 
      ctx.drawImage(screen, 0, top_sc, width, sc_h); 
      
      // webcam (can changes somewhere else)
      ctx.drawImage(can1, 
        width-width_sm, height-height_sm, 
        width_sm, height_sm
      );  
      
    }
    
    // -------------------------------
    // (2) Webcam 
    // ------------------------------- 

    // webcam_()

    async function webcam_() {
        
      const webcam_stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        // audio: true
      }); 
      
      const webcam_video = new MediaStream([...webcam_stream.getVideoTracks()])
      const webcam_audio = new MediaStream([...webcam_stream.getAudioTracks()])
    
      const webcam = document.createElement("video");
      webcam.width = webcam_w
      webcam.height = webcam_h
      webcam.setAttribute("style", "display: none;"); 
      document.body.appendChild(webcam); 

      webcam.srcObject = webcam_video;
      
      webcam.addEventListener("loadeddata", () => {
        // reqAnimation(webcam);
      });

      webcam.play(); 

      // -------------------------------
      // (3) Record 
      // -------------------------------  
      // initRecorderWithCanvas(canvas, webcam_audio);
      
    }

  }


});
 
