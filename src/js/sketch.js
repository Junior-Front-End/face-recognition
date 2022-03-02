var btn = document.querySelector("#btn")

btn.addEventListener("click", async () => {
    
  // -------------------------------
  // (1) get screen 
  // -------------------------------
  const screen_stream = await navigator.mediaDevices.getDisplayMedia({video: true}) 
  const screen = document.createElement("video");
  screen.setAttribute("style", "display:none;"); 
  document.body.appendChild(screen); 
  screen.srcObject = screen_stream;
  screen.play();  
 
  var screen_w = 1920
  var screen_h = 1080;
  
  // -------------------------------
  // (2) get webcam 
  // -------------------------------
  var webcam_w = 700
  var webcam_h = 500

  const webcam_stream = await navigator.mediaDevices.getUserMedia({video: true}); 
  const webcam = document.createElement("video");
  webcam.width = webcam_w
  webcam.height = webcam_h
  webcam.setAttribute("style", "display: none;"); 
  document.body.appendChild(webcam); 
  webcam.srcObject = webcam_stream;
  webcam.play(); 
 
  // -------------------------------
  // (3) canvas: mother
  // -------------------------------
  var width = 1920;
  var height = 1080

  var canvas = document.createElement("canvas");
  canvas.setAttribute("style", "border: solid lightgray 1px; width: 70%");
  canvas.width = width;
  canvas.height = height;
  document.body.appendChild(canvas);  

  var ctx = canvas.getContext("2d"); 

  // -------------------------------
  // (4) can1: webcam small 
  // -------------------------------
  var can1 = document.createElement("canvas")
  can1.width = webcam_w
  can1.height = webcam_h
  var ctx1 = can1.getContext("2d")  

  var width_sm = 280
  var height_sm = 200
  
  // -------------------------------
  // (5) can2: screen  
  // -------------------------------
  var can2 = document.createElement("canvas")
  can2.width = width
  can2.height = height
  var ctx2 = can2.getContext("2d") 

  var sc_h = Math.floor(( screen_h/screen_w) * width)
  var top_sc = (height - sc_h)/2 
 
 
  // -------------------------------
  // (6) Define ML Model  
  // -------------------------------
  const faceapi = await ml5.faceApi(webcam, {
    withLandmarks: true,
    withDescriptors: false
  });

  faceapi.detect(updateMoment);
 
  // -------------------------------
  // (7) Repeat function 
  // -------------------------------
  var boxHeight, boxWidth, x, y; 

  function updateMoment(err, detections) {
    if (err) return console.log(err); 

    // clear the last moment 
    ctx.fillStyle = `#aaa`;
    ctx.fillRect(0, 0, width, height); 
    
    // clear the last moment 
    ctx1.fillStyle = `#fff`;
    ctx1.fillRect(0, 0, webcam_w, webcam_h);

    // (7-1) draw screen (of the moment) on can2  
    ctx2.drawImage(screen, 0, top_sc, width, sc_h);  

    // (7-2) put on mother (at the moment) 
    ctx.drawImage(can2, 0, 0, width, height);

    // tick happens here (apply just when change, new detection)
    if (detections && detections.length > 0) { 
      for (i = 0; i < detections.length; i++) {

        var alignedRect = detections[i].alignedRect;
        x = alignedRect._box._x;
        y = alignedRect._box._y;
        boxWidth = alignedRect._box._width;
        boxHeight = alignedRect._box._height;
          
      }   
    }  

    // (7-1) webcam on can1 (result can1 is a original size but more transparent space)
    ctx1.drawImage(webcam, 
      x-25, y-100, 
      boxWidth-20, boxHeight+70, 
      x-25, y-100, 
      boxWidth-20, boxHeight+70
    );  

    // (7-2) white to transparent
    var ctx1data = ctx1.getImageData(0, 0, webcam_w, webcam_h)
    var data1 = ctx1data.data

    for (j = 0; j < data1.length; j+=4) {
      if (
        data1[j] == 255 &&
        data1[j+1] == 255 &&
        data1[j+2] == 255 
      ) { 
        data1[j + 3] =  0 // alpha
      }
    }

    ctx1.putImageData(ctx1data, 0, 0);


    // (7-3) can1 on mother    
    ctx.drawImage(can1, 
      width-width_sm, height-height_sm, 
      width_sm, height_sm
    );

         
    
    // ----------------------
    // Repeat this function (for new moment)
    // ----------------------
    faceapi.detect(updateMoment);

  }

});
  


 
 
