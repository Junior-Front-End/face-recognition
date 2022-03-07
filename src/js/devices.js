
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
    const webcam_stream = await navigator.mediaDevices.getUserMedia({video: true}); 
    const webcam = document.createElement("video");
    webcam.width = webcam_w
    webcam.height = webcam_h
    webcam.setAttribute("style", "display: none;"); 
    document.body.appendChild(webcam); 
    webcam.srcObject = webcam_stream;
    webcam.addEventListener("loadeddata", () => reqAnimation(webcam))
    webcam.play(); 


  }


});
  


 
 
