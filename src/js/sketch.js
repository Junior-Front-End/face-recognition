window.addEventListener("DOMContentLoaded", async () => {
   
  var width = 700
  var height = 500;
  
  // --------------------------------------------------------
  // get stream from webcam
  // --------------------------------------------------------
  const stream = await navigator.mediaDevices.getUserMedia({video: true});
  
  const video = document.createElement("video");
  video.setAttribute("style", "display: none;");
  video.width = width;
  video.height = height;
  document.body.appendChild(video);

  video.srcObject = stream;
  video.play(); 
 
  var canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  document.body.appendChild(canvas); 

  var ctx = canvas.getContext("2d");

  // --------------------------------------------------------
  // Define ML Model 
  // --------------------------------------------------------
  const faceapi = await ml5.faceApi(video, {
    withLandmarks: true,
    withDescriptors: false
  });

  faceapi.detect(drawDetectedFace);

  // --------------------------------------------------------
  // Draw Detected Face 
  // --------------------------------------------------------
  function drawDetectedFace(err, detections) {
    if (err) return console.log(err); 

    // video to canvas 
    ctx.fillStyle = `rgb(100, 100, 0)`;
    ctx.fillRect(0, 0, width, height);
 
    // 
    if (detections && detections.length > 0) {
      for (let i = 0; i < detections.length; i++) {
 
        const alignedRect = detections[i].alignedRect;
        const x = alignedRect._box._x;
        const y = alignedRect._box._y;
        const boxWidth = alignedRect._box._width;
        const boxHeight = alignedRect._box._height;
          
        // put a piece of video on canvas
        ctx.drawImage(video, 
          x-25, y-100, 
          boxWidth-20, boxHeight+70, 
          x-25, y-100, 
          boxWidth-20, boxHeight+70); 
  
      } 
    }
    
    // ----------------------
    // Repeat this function (for new moment)
    // ----------------------
    faceapi.detect(drawDetectedFace);

  }

});
  


 
 
