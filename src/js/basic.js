
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