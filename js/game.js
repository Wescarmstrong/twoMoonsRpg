var Game = {
    init: function () {
        var gameCanvas = document.getElementById("layer2");
        var bgCanvas = document.getElementById("layer1");
        var voidCanvas = document.getElementById("layer0");

        var canvas = {
            bgCanvas: bgCanvas,
            gameCanvas: gameCanvas,
            voidCanvas: voidCanvas,
            bgCtx: bgCanvas.getContext('2d'),
            ctx: gameCanvas.getContext('2d'),
            voidCtx: voidCanvas.getContext('2d')
        };



        var backgroundMusic = new Audio('audio/HeartOnFire.mp3');
        backgroundMusic.loop = true;

        var spriteSheet = new Image();
        spriteSheet.src = 'img/exampleSheet.png';
        // Maybe spriteSheet.src (above) should come after load event listener (below) ???
        spriteSheet.addEventListener('load', function () {
            var spriteSheet = this;

            var data = {
                animationFrame: 0,
                spriteSheet: spriteSheet,
                canvas: canvas,
                timing: {
                    lastFrameTimeMs: 0,
                    maxFPS: 60,
                    delta: 0,
                    timestep: 1000 / 60
                },
            };

            backgroundMusic.play();
            backgroundMusic.volume = 0.3;

            Input.init(data);
            Entities.init(data);
            Void.init(data);
            Render.init(data);
            Game.run(data);

        });
    },

    run: function (data) {
        var loop = function (timestamp) {
            // Throttle frame rate
            if (timestamp < data.timing.lastFrameTimeMs + (1000 / data.timing.maxFPS)) {
                requestAnimationFrame(loop);
                return;
            }
            data.timing.delta += timestamp - data.timing.lastFrameTimeMs;
            data.timing.lastFrameTimeMs = timestamp;

            // Input before update() and render()
            Game.input(data);

            var numUpdateStemps = 0;
            while (data.timing.delta >= data.timing.timestep) {
                Game.update(data);
                data.timing.delta -= data.timing.timestep;
                data.animationFrame++;
                // check to see if game is performing normal, otherwise snap state
                if (++numUpdateStemps >= 240) {
                    Game.snapState();
                    break;
                }
            }
            Game.render(data);


            window.requestAnimationFrame(loop);
        };

        window.requestAnimationFrame(loop);
        //loop();
    },

    input: function (data) {
        //Navigation.update(data);
        //Input.update(data);
    },

    update: function (data) {
        Animation.update(data);
    },

    render: function (data) {
        Render.update(data);
    },

    // when performance is low, snap out of update() into render()
    snapState: function () {
        data.timing.delta = 0;
    }
};

Game.init();