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

        var spriteSheet = new Image();
        spriteSheet.src = 'img/exampleSheet1.png';
        spriteSheet.addEventListener('load', function () {
            var spriteSheet = this;

            var data = {
                gameState: "title",
                timeSinceLastAnimation: 0,
                animationFrame: 0,
                spriteSheet: spriteSheet,
                canvas: canvas,
                lastDraw: 0,
                avgDelay: 0,
                combatDuration: 0  //  DOMHighResTimeStamp -- USE to get seconds --> (data.combatDuration / 1000).toFixed()
            };

            //Display FPS
            setInterval(function () {
                canvasFps.innerHTML = "canvas: " + (1000 / data.avgDelay).toFixed(1);
            }, 2000);

            /*setInterval(function () {                  // only used to display particular info for testing
                test.innerHTML = "Test: " + (data.combatDuration / 1000).toFixed();
            }, 1000);           */

            Input.init(data);
            Entities.init(data);
            Void.init(data);
            Render.init(data);
            Game.run(data);

        });
    },

    run: function (data) {
        var loop = function () {

            if (data.gameState !== "combat") {
                gameStateCase(data);
                return;
            }

            var timeNow = performance.now();
            var dt = (timeNow - data.lastDraw);
            data.timeSinceLastAnimation += dt;
            data.combatDuration += dt;
            var delay = timeNow - data.lastDraw;
            data.avgDelay += (delay - data.avgDelay) / 10;

            Game.input(data);
            Game.update(data);
            Game.render(data);

            if (data.timeSinceLastAnimation >= 10) {       //increasing animationFrame 100 times per second
                data.animationFrame++;
                data.timeSinceLastAnimation = 0;
            }


            data.lastDraw = timeNow;

            window.requestAnimationFrame(loop);
        };

        window.requestAnimationFrame(loop);
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

    title: function (data) {
        Title.init(data);
    },

    musicController: function (data) {
        if (data.gameState === "combat") {
            var battleMusic = new Audio('audio/HeartOnFire.mp3');
            battleMusic.loop = true;
            battleMusic.play();
            battleMusic.volume = 0.3;
        } if (data.gameState === "title") {
            var titleMusic = new Audio('audio/LostThoughts,FragmentedMemories3.mp3');
            titleMusic.loop = true;
            titleMusic.play();
            titleMusic.volume = 0.4;
        }
    }
};

Game.init();

