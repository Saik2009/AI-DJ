song = "";
right_wrist_y = 0;
right_wrist_x = 0;
left_wrist_x = 0;
left_wrist_y = 0;
score_left_wrist = 0;

function preload() {
    song = loadSound("music.mp3");

}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelReady);
    poseNet.on('pose', getPoses);
}

function draw() {
    image(video, 0, 0, 600, 500);
    fill("#02d3d6");
    stroke("#02d3d6");
    if (score_left_wrist > 0.2) {

        circle(left_wrist_x, left_wrist_y, 20);
        nlw = Number(left_wrist_y);
        rnlw = Floor(nlw);
        volume = rnlw / 500;
        song.setVolume(volume);
    }
}

function play_song() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function modelReady() {
    console.log("poseNet has been initalized!")
}

function getPoses(results) {
    if (results.length > 0) {
        score_left_wrist = results[0].pose.keypoints[9].score;
        console.log(results);
        left_wrist_x = results[0].pose.leftWrist.x;
        left_wrist_y = results[0].pose.leftWrist.y;
        right_wrist_x = results[0].pose.rightWrist.x;
        right_wrist_y = results[0].pose.rightWrist.y;
        console.log(" Left_Wrist_X = " + left_wrist_x + " Left_Wrist_Y = " + left_wrist_y);
        console.log(" Right_Wrist_X = " + right_wrist_x + " Right_Wrist_Y = " + right_wrist_y);
    }
}