
var bgCanvas = document.getElementById("layer1");
var ctx = bgCanvas.getContext('2d');
var bgFps = document.getElementById('bgFps');

bgCanvas.width = window.innerWidth;
bgCanvas.height = window.innerHeight;

var particleCount = 350;

function LightParticle(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;

    this.update = function () {

        this.draw();
    };

    this.draw = function () {
        ctx.save();
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 15;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
        ctx.restore();
    };
}

var lightParticles = [];

var timer = 0;
var opacity = 1;
var speed = 0.0005;
var colors = [
    "#0952BD",
    "#A5BFF0",
    "#449991",
    "#F2E8C9",
    "#3278D0"
];



var initializeParticles = function () {
    for (var i = 0; i < particleCount; i += 1) {

        var randomColorIndex = Math.floor(Math.random() * 6);
        var randomRadius = Math.random() * 3;

        // particles need to be spawned past screen width and height
        var x = (Math.random() * (bgCanvas.width + 200)) - (bgCanvas.width + 200) / 2;
        var y = (Math.random() * (bgCanvas.width + 200)) - (bgCanvas.width + 200) / 2;
        lightParticles.push(new LightParticle(x, y, randomRadius, colors[randomColorIndex]));
    }
};
initializeParticles();

window.addEventListener("resize", function () {
    bgCanvas.width = window.innerWidth;
    bgCanvas.height = window.innerHeight;

    lightParticles = [];
    initializeParticles();
});

var bgLastDraw = performance.now();   //    FPS measure
var bgAvgDelay = 0;


function animateBg() {

    ctx.save();
    if (isMouseDown === true) {

        // Ease into the new opacity
        var desiredOpacity = 0.01;
        opacity += (desiredOpacity - opacity) * 0.03;
        ctx.fillStyle = "rgba(12, 12, 12," + opacity + ")";

        // Ease into the new speed
        var desiredSpeed = 0.024;
        speed += (desiredSpeed - speed) * 0.01;
        timer += speed;

    } else {

        // Ease back to the original opacity
        var originalOpacity = 1;
        opacity += (originalOpacity - opacity) * 0.01;
        ctx.fillStyle = "rgba(12, 12, 12," + opacity + ")";

        // Ease back to the original speed
        var originalSpeed = 0.002;
        speed += (originalSpeed - speed) * 0.01;
        timer += speed;

    }

    ctx.fillRect(0, 0, bgCanvas.width, bgCanvas.height);
    ctx.translate(bgCanvas.width / 2, bgCanvas.height / 2);
    ctx.rotate(timer);

    for (var i = 0; i < lightParticles.length; i += 1) {
        lightParticles[i].update();
    }


    ctx.restore();


    var bgTimeNow = performance.now();
    var bgDelay = bgTimeNow - bgLastDraw;
    bgAvgDelay += (bgDelay - bgAvgDelay) / 10;
    bgLastDraw = bgTimeNow;

    setTimeout(function () {
        window.requestAnimationFrame(animateBg);
    }, 26);
}



var isMouseDown = false;

window.addEventListener("mousedown", function () {
    isMouseDown = true;
});


window.addEventListener("mouseup", function () {
    isMouseDown = false;
});



//Display FPS
setInterval(function () {
    bgFps.innerHTML = "Bg: " + (1000 / bgAvgDelay).toFixed(1);
}, 2000);


window.addEventListener('load', function () {
    animateBg();
});











