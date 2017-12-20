var Game = {
    init: function() {
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
                canvas: canvas
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
        var loop = function () {
            Game.input(data);
            Game.update(data);
            Game.render(data);

            data.animationFrame++;

            window.requestAnimationFrame(loop);
        };

        loop();
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
    }
};

Game.init();