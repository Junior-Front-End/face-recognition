# ScreenShare & body-fix (v1.3)
1400.12 
 
ScreenShare with Instrauctor Face and Pose (no background)

## this branch (v1.3)

* [x] improve screen record speed
* [ ] improve detection
* [ ] Record, pause & Download


* [Github](https://github.com/tensorflow/tfjs-models/tree/master/body-pix)

``` 
{
  architecture: 'ResNet50',
  outputStride: 32,
  quantBytes: 2
}
```

``` 
{
architecture: 'MobileNetV1',
outputStride: 16,
multiplier: 0.75,
quantBytes: 2
}
```

## improvement

* [x] always show webcam, just change on detect
* [x] data combine screen, webcam then on mother
* [x] change `ml5.faceAPI` to `body-pix` from tfjs 


