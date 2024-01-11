status = "";
od = [];
item = document.getElementById("name_of_object").value;

function preload() {

}

function setup() {
    canvas = createCanvas(300, 300);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    video.size(800, 400);
}

function draw() {
    image(video, 0, 0, 300, 300);
    if (status != "") {
        for (i = 0; i < od.length; i++) {
            fill("cyan");
            per = floor(od[i].confidence * 100);
            text(od[i].label + " " + per + "%", od[i].x + 15, od[i].y + 15);
            noFill();
            stroke("cyan");
            rect(od[i].x, od[i].y, od[i].width, od[i].height);
            if (od[i].label == item) {
                document.getElementById("status").innerHTML = "Objects Detected";
                document.getElementById("found").innerHTML = "object is found";
                video.stop();
                talk = window.speechSynthesis;
                utterthis = new SpeechSynthesisUtterance(item + "found");
                talk.speak(utterthis);
            } else {
                document.getElementById("status").innerHTML = "Objects not Detected";
                document.getElementById("found").innerHTML = "object not found";
            }
        }
    }
}

function start() {
    ccsd = ml5.objectDetector("cocossd", modelloaded);
    status = true;
    document.getElementById("status").innerHTML = "Detecting Objects";
    item = document.getElementById("name_of_object").value;
}

function modelloaded() {
    console.log("model is loaded");
    ccsd.detect(video, gotresults);

}

function gotresults(error, results) {
    if (error) {
        console.error(error);
    } else {
        console.log(results);
        od = results;
    }
}