objects = [];
status = "";

function preload(){
  song=loadSound('alarm.mp3')
}

function setup() {
  canvas = createCanvas(640, 450);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();
  objectDetector = ml5.objectDetector("cocossd", modelLoaded);
  document.getElementById("status").innerHTML = "Status: Detecting baby...";
}

function modelLoaded(){
    console.log("Model is loaded!✨")
    status=true;
}

function gotResult(error, results){
    if(error){
        console.log(error);
    }
    console.log(results);
    objects=results;
}

function draw() {
  image(video, 0, 0, 650, 460);
  if(status!=""){
    objectDetector.detect(video, gotResult);
    for(i=0; i<objects.length; i++){
        if(objects[i].label=="person"){
        document.getElementById("status").innerHTML="Status: Baby detected";
        fill("#FF0000");
        percent=floor(objects[i].confidence*100);
        text(objects[i].label+" "+percent+"%", objects[i].x+15, objects[i].y+15);
        noFill();
        stroke("#FF0000");
        rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        if(objects[i].label=="person"){
          document.getElementById("status").innerHTML="Status: Baby detected";
          song.stop();
        } 
        else{
          document.getElementById.innerHTML="Status: Baby not detected";
          song.play();
        }
        }
    }
  }
  if(objects.length==0){
    document.getElementById("status").innerHTML="Status: Baby not detected"
    song.play();
  }
}


