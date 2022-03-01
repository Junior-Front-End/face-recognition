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
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, width, height);
    ctx.drawImage(video, 0, 0, width, height);

    // 
    if (detections && detections.length > 0) {
      for (let i = 0; i < detections.length; i += 1) {

        // ===================================
        //    ctx.rect
        // ===================================

        const alignedRect = detections[i].alignedRect;
        const x = alignedRect._box._x;
        const y = alignedRect._box._y;
        const boxWidth = alignedRect._box._width;
        const boxHeight = alignedRect._box._height;
    
        ctx.beginPath();
        ctx.rect(x, y, boxWidth, boxHeight);
        ctx.strokeStyle = "#a15ffb";
        ctx.stroke();
        ctx.closePath();

        // ===================================
        //    stroke face
        // ===================================
        
        const mouth = detections[i].parts.mouth;
        const nose = detections[i].parts.nose;
        const leftEye = detections[i].parts.leftEye;
        const rightEye = detections[i].parts.rightEye;
        const rightEyeBrow = detections[i].parts.rightEyeBrow;
        const leftEyeBrow = detections[i].parts.leftEyeBrow;
    
        //
        drawPart(mouth, true);
        drawPart(nose, false);
        drawPart(leftEye, true);
        drawPart(leftEyeBrow, false);
        drawPart(rightEye, true);
        drawPart(rightEyeBrow, false);
    
        // 
        function drawPart(feature, closed) {
    
          ctx.beginPath();
    
          // for (let i = 0; i < feature.length; i += 1) {
          //   var x = feature[i]._x, y = feature[i]._y;
          //   if (i == 0){ctx.moveTo(x, y)} else {ctx.lineTo(x, y)}
          // }

          if (closed == true){ctx.closePath()}

          ctx.stroke();
    
        }
    


      } 
    }
    
    // ----------------------
    // Repeat this function (for new moment)
    // ----------------------
    faceapi.detect(drawDetectedFace);


  }





});
  


 
 
