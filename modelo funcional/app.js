
navigator.getUserMedia = navigator.getUserMedia ||
navigator.webkitgetUserMedia ||
navigator.mozGetUserMedia || 
navigator.msGetUserMedia;

// Select everything in my html
const video = document.querySelector("#video");
const canvas = document.querySelector("#canvas");
const context = canvas.getContext("2d");
//const stopBtn = document.querySelector("#stopTracking");
var running = true;

const defaultParams = {
    flipHorizontal: false,
    outputStride: 16,
    imageScaleFactor: 1,
    maxNumBoxes: 20,
    iouThreshold: 0.2,
    scoreThreshold: 0.6,
    modelType: "ssd320fpnlite",
    modelSize: "large",
    bboxLineWidth: "2",
    fontSize: 17,
};

let model;
//stopBtn.addEventListener("click", function() {clicked = false});


handTrack.startVideo(video)
.then(status => {
    if (status){
    navigator.getUserMedia({video:{}}, stream => {
        video.srcObject = stream;
            setInterval(runDetection, 3000);
            
    },
    err => console.log(err));
    }
});


function runDetection(){
    model.detect(video).then(predictions => {
        console.log(predictions);
        if (predictions.length > 0 && predictions.length < 3) {
            console.log(predictions[0]["label"]);
        }
    });
}

// Cargamos el modelo
handTrack.load(defaultParams).then(lmodel => {
    model = lmodel;
});

