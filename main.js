
img="";
Status ="";
Objects = [];

var status=false;
function preload(){
    img = loadImage("dog_cat.jpg");
}
function setup(){
    canvas = createCanvas(380,380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380,380);
    video.hide();
    
}
function start(){
    objectDetector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="Status : Detecting Objects";
}
function modelLoaded(){
    console.log("Model Loaded");
    Status = true;
    
}
function gotResults(error,results){
    if(error){
        console.error("error!");
    }
    console.log(results);
    Objects = results;
}

function draw(){
    
    image(video,0,0,380,380);
    if(Status != ""){
        r = random(255);
        g = random(255);
        b = random(255);

        objectDetector.detect(video,gotResults);
        for(i = 0;i<Objects.length;i++){
            document.getElementById("status").innerHTML="Status : Object Detected";
            document.getElementById("number_of_objects").innerHTML="No. of objects detected : " + Objects.length;
            fill(r,g,b);
            percent = floor(Objects[i].confidence*100);
            text(Objects[i].label + " " + percent + "%",Objects[i].x,Objects[i].y-5);
            noFill();
            stroke(r,g,b);
            rect(Objects[i].x,Objects[i].y,Objects[i].width,Objects[i].height);
        }
    }
    
}
