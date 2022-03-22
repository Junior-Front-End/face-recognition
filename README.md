# ScreenShare & body-fix (v1.7)
1401.01.02 - screen, body-pix

## this branch (v1.7)
 
* [x] Record, pause & Download
* [x] add audio
* [ ] fix delay after moments
* [ ] beautiful ui

## improvement

* [ ] exact detection using `ResNet`

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
 
## Pretrained Models

Pretrained Neural Network Models:
* body surface
* body pose
* hand and face 
* only face

NN | Branches | clone
-- | ---- | ----
face-detection | 7 | https://github.com/Junior-Front-End/face-recognition 
hand-detection | 3 | `git@gitlab.com:Shervin1995/hand-detection.git`
body-pix | 1 | `git@github.com:Junior-Front-End/body-pix.git`
pose-net | 4 | `git@gitlab.com:Shervin1995/pose-net.git`

## Related Docs 

* [body-pix Github](https://github.com/tensorflow/tfjs-models/tree/master/body-pix)


