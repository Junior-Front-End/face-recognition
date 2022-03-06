
// ====================================================== define variables
var screen_w = 1920
var screen_h = 1080;

var webcam_w = 640
var webcam_h = 480

// mother 
var width = 1920;
var height = 1080

// * mother
var canvas = document.createElement("canvas");
canvas.setAttribute("style", "border: solid lightgray 1px; width: 70%");
canvas.width = width;
canvas.height = height;
document.body.appendChild(canvas);  

var ctx = canvas.getContext("2d"); 

// * webcam   
var can1 = document.createElement("canvas")
can1.width = webcam_w
can1.height = webcam_h
var ctx1 = can1.getContext("2d")  

var width_sm = 426
var height_sm = 320

var sc_h = Math.floor(( screen_h/screen_w) * width)
var top_sc = (height - sc_h)/2 

//
var btn = document.querySelector("#btn");
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
    webcam.addEventListener("loadeddata", reqAnimation)
    webcam.play(); 

    // -------------------------------------------------------
    // (3) reqAnimation
    // -------------------------------------------------------
    async function reqAnimation() {  
  
      // model  
      const net = await bodyPix.load({
        architecture: 'MobileNetV1',
        outputStride: 16,
        multiplier: 0.75,
        quantBytes: 2
      });

      //
      detection()

      //
      function detection() {
        
        // call model
        net.segmentPerson(webcam, {
          flipHorizontal: false,
          internalResolution: 'medium',
          segmentationThreshold: 0.7
        }).then(seg => combineToCanvas(seg));
           
        // 
        function combineToCanvas(segmentation) {

          //
          requestAnimationFrame(detection); 
    
          //
          const coloredPartImage = bodyPix.toMask(segmentation);
          const opacity = 1; // background blur 
          const flipHorizontal = false;
          const maskBlurAmount = 0; // edge blur
          var options = [coloredPartImage, opacity, maskBlurAmount, flipHorizontal]; 

          //
          ctx1.fillStyle = "#000";
          ctx1.fillRect(0, 0, webcam_w, webcam_h)

          // draw webcam on can1
          bodyPix.drawMask(can1, webcam, ...options); 

          // webcam: black to transparent
          var ctx1data = ctx1.getImageData(0, 0, webcam_w, webcam_h);
          var data1 = ctx1data.data;
 
          for (j = 0; j < data1.length; j+=4) {
            if (
              data1[j] == 0 &&
              data1[j+1] == 0 &&
              data1[j+2] == 0 
            ) { 
              data1[j + 3] =  0  
            }
          }

          //
          ctx1.putImageData(ctx1data, 0, 0);

           


        }

      }
 
       


          
    }

  }


});
  


 
 
