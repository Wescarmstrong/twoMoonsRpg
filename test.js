
// Variables
let mouse = {
    x: innerWidth / 2,
    y: innerHeight / 2
};

const colorsTest = [
    '#2185C5',
    '#7ECEFD',
    '#FFF6E5',
    '#FF7F66'
];


// Event Listeners
addEventListener('mousemove', function(event) {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
});

addEventListener('resize', function() {

    init();
});


// Utility Functions
function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomColor(colorsTest) {
    return colorsTest[Math.floor(Math.random() * colorsTest.length)];
}


// Objects
function Particle(x, y, dx, dy, radius, colorTest) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = -dy;
    this.radius = 5;
    this.colorTest = colorTest;
    this.timeToLive = 2;
    this.opacity = 1;
    this.r = 10;
    this.g = 10;
    this.b = randomIntFromRange(150, 250);

    this.update = function() {
        if (this.y + this.radius + this.dy > gameCanvas.height) {
            this.dy = -this.dy;
        }

        if (this.x + this.radius + this.dx > gameCanvas.width || this.x - this.radius + this.dx < 0) {
            this.dx = -this.dx;
        }
        // this.dy += gravity * this.mass;
        this.x += Math.random() > 0.5 ? dx : -dx;
        this.y += Math.random() > 0.5 ? dy : -dy;
        this.draw();


        this.timeToLive -= 0.01;
    };

    this.draw = function() {
        this.opacity = this.timeToLive / 1;

        c.save();
        c.beginPath();
        c.arc(this.x, this.y, 2, 0, Math.PI * 2, false);
        c.fillStyle = 'rgba('+this.r+','+this.g+','+this.b+',' + this.opacity.toFixed(2) + ')';
        c.fill();

        c.closePath();

        c.restore();
    };
}

function Mortar(x, y, dx, dy, radius, colorTest) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.colorTest = colorTest;
    this.triggered = false;
    this.explosion;
    this.waveOffset = randomIntFromRange(1, 2);

    this.update = delta => {
        this.draw();
        this.ttl -= 1;

        this.dy += 0.11;
        this.x += this.dx * Math.sin(delta) * this.waveOffset;
        this.y += this.dy;

        if (this.dy > 0) {
            this.triggered = true;
        }
    };

    this.draw = function() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.colorTest;
        c.fill();
        c.closePath();
    };

    this.explode = function(callback) {
        // Create explosion... if particle count == 0, call callback
        if (typeof this.explosion == 'undefined') {
            this.explosion = new Explosion(this);
            this.radius = 0;
        }
        this.explosion.update();

        if (this.explosion.particles.length <= 0) {
            callback();
        }
    };
}

function Explosion(source) {
    this.particles = [];
    this.rings = [];
    this.source = source;

    this.init = function() {
        for (var i = 0; i < 12; i++) {
            const v = 7;
            var dx = v;
            var dy = v;

            // var hue = (255 / 5) * i;
            // var color = "hsl(" + hue + ", 100%, 50%)";
            this.particles.push(new Particle(this.source.x, this.source.y, dx, dy, 1, 'blue'));
        }
    };

    this.init();

    this.update = function() {
        for (var i = 0; i < this.particles.length; i++) {
            this.particles[i].update();

            // Remove particles from scene one time to live is up
            if (this.particles[i].timeToLive < 0) {
                this.particles.splice(i, 1);
            }
        }
    };
}

// Implementation
let mortars = [];

function init() {
}

// Animation Loop
let elapsed = 0;
let randomInterval = randomIntFromRange(80, 170);
function animateTest() {

    c.fillStyle = 'rgba(240,248,255, 0.5)';
    c.fillRect(0, 0, gameCanvas.width, gameCanvas.height);

    for (let i = 0; i < mortars.length; i++) {
        mortars[i].update(elapsed);

        if (mortars[i].triggered === true) {
            mortars[i].explode(() => {
                mortars.splice(i, 1);
            });
        }
    }

    if (elapsed % randomInterval == 0) {
        const x = randomIntFromRange(10, gameCanvas.width - 10);
        const dy = randomIntFromRange(-5, -10);
        mortars.push(new Mortar(x, gameCanvas.height, 2, dy, 3, 'blue'));
        randomInterval = randomIntFromRange(50, 100);
    }

    elapsed += 1;
}

init();
