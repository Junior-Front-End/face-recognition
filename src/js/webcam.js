
// -------------------------------------------------------
// (3) reqAnimation
// -------------------------------------------------------
async function reqAnimation(webcam) {  

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
      }).then(seg => {
        combineToCanvas(seg);
      }).catch(e => console.log("err: ",e));
          
      // 
      function combineToCanvas(segmentation) {

        requestAnimationFrame(detection); 
    
        const coloredPartImage = bodyPix.toMask(segmentation);
        const opacity = 1; // background blur 
        const flipHorizontal = false;
        const maskBlurAmount = 0; // edge blur
        var options = [coloredPartImage, opacity, maskBlurAmount, flipHorizontal]; 

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