
var bgCanvas = document.getElementById("layer1");
var ctx = bgCanvas.getContext('2d');
var fps  = document.getElementById('fps');

bgCanvas.width = window.innerWidth;
bgCanvas.height = window.innerHeight;

var particleCount = 500;

window.addEventListener("resize", function() {
    bgCanvas.width = window.innerWidth;
    bgCanvas.height = window.innerHeight;

    lightParticles = [];
    initializeParticles();
});


function LightParticle(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;

    this.update = function() {

        this.draw();
    };

    this.draw = function() {
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
    "#9514DD",
    "#5F0FE7",
    "#FFFFFF",
    "#0F2DB6",
    "#3278D0",
    "#FFFFFF"
];

var initializeParticles;

(initializeParticles = function() {
    for (var i = 0; i < particleCount; i++) {

        var randomColorIndex = Math.floor(Math.random() * 7);
        var randomRadius = Math.random() * 2;

        // particles need to be spawned past screen width and height
        var x = (Math.random() * (bgCanvas.width + 200)) - (bgCanvas.width + 200) / 2;
        var y = (Math.random() * (bgCanvas.width + 200)) - (bgCanvas.width + 200) / 2;
        lightParticles.push(new LightParticle(x, y, randomRadius, colors[randomColorIndex]));
    }
})();

// var lastDraw = performance.now(); //             Old FPS measure
// var avgDelay = 0;

function animate(newtime) {

    if (stop) {
        return;
    }

    window.requestAnimationFrame(animate);

    now = newtime;
    elapsed = now - then;

    if(elapsed > fpsInterval) {
        then = now - (elapsed % fpsInterval);


    ctx.save();
    if (isMouseDown === true) {

        // Ease into the new opacity
        var desiredOpacity = 0.01;
        opacity += (desiredOpacity - opacity) * 0.03;
        ctx.fillStyle = "rgba(18, 18, 18,"+ opacity +")";

        // Ease into the new speed
        var desiredSpeed = 0.012;
        speed += (desiredSpeed - speed) * 0.01;
        timer += speed;

    } else {

        // Ease back to the original opacity
        var originalOpacity = 1;
        opacity += (originalOpacity - opacity) * 0.01;
        ctx.fillStyle = "rgba(18, 18, 18, " + opacity + ")";

        // Ease back to the original speed
        var originalSpeed = 0.0005;
        speed += (originalSpeed - speed) * 0.01;
        timer += speed;


    }

    ctx.fillRect(0, 0, bgCanvas.width, bgCanvas.height);
    ctx.translate(bgCanvas.width / 2, bgCanvas.height/2 );
    ctx.rotate(timer);

    for (var i = 0; i < lightParticles.length; i++) {
        lightParticles[i].update();
    }


      ctx.restore();

      var sinceStart = now - startTime;
      var currentFps = Math.round(1000 / (sinceStart / ++frameCount) *100) / 100;
      fps.innerHTML ="fps: " + currentFps;



    // var timeNow = performance.now();                Old FPS measure
    // var delay = timeNow - lastDraw;
    // avgDelay += (delay - avgDelay) / 10;
    // lastDraw = timeNow;
    }

}

var isMouseDown = false;

window.addEventListener("mousedown", function() {
    isMouseDown = true;
});


window.addEventListener("mouseup", function() {
    isMouseDown = false;
});



// Display FPS                                                          Old FPS measure
// setInterval(function() {
//     fps.innerHTML = "fps: " + (1000/avgDelay).toFixed(1);
// }, 2000);


var stop = false;
var frameCount = 0;
var framesPerSecond, fpsInterval, startTime, now, then, elapsed;


function startAnimating(framesPerSecond) {
    fpsInterval = 1000 / framesPerSecond;
    then = window.performance.now();
    startTime = then;
    animate();
}

// Start Animation(fps limiter)
startAnimating(500);
