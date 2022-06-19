song = "";
LeftWristX = 0;
LeftWristY = 0;
RightWristX = 0;
RightWristY = 0;
scoreleftwrist = 0;

function preload()
{
    song = loadSound("music.mp3");
}

function setup() {
    canvas = createCanvas(500, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        scoreleftwrist = results[0].pose.keypoints[9].score;
        LeftWristX = results[0].pose.leftWrist.x;
        LeftWristY = results[0].pose.leftWrist.y;
        RightWristX = results[0].pose.rightWrist.x;
        RightWristY = results[0].pose.rightWrist.y;
        console.log("Left Wrist X = " + LeftWristX + "Left Wrist Y = " + LeftWristY);
        console.log("Right Wrist X = " + RightWristX + "Right Wrist Y = " + RightWristY);
    }
}

function modelLoaded() {
    console.log("Posenet is running");
}

function draw() {
    image(video, 0, 0, 500, 500);
    fill("red");
    stroke("green");
    circle(LeftWristX-70, LeftWristY, 30);
    if (scoreleftwrist > 0.2) {
        leftY = Number(LeftWristY);
        varible = Math.floor(leftY);
        volume = varible/500;
        song.setVolume(volume);
        document.getElementById("volumetext").innerHTML = "Volume - "+volume;
    }
}

function play() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}