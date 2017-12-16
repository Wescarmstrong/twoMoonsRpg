//
var gameCanvas = document.getElementById("layer2");
var c = gameCanvas.getContext('2d');

var canvasFps = document.getElementById('canvasFps');
var canvasLastDraw = performance.now();   //    FPS measure
var canvasAvgDelay = 0;

var combatHandler = {
    combat_initialize: function () {
        var combatBackground = new Image();
        combatBackground.src = 'img/combatBG.jpg';
        combatBackground.onload = function () {
            c.drawImage(combatBackground, 0, 0);
        }
    },
    combat_draw: function () {


        window.requestAnimationFrame(combatHandler.combat_draw);

        var canvasTimeNow = performance.now();
        var canvasDelay = canvasTimeNow - canvasLastDraw;
        canvasAvgDelay += (canvasDelay - canvasAvgDelay) / 10;
        canvasLastDraw = canvasTimeNow;
    },
    beginCombat: function () {
        combatHandler.combat_initialize();
        window.requestAnimationFrame(combatHandler.combat_draw);
    }
}





//Display FPS
setInterval(function () {
    canvasFps.innerHTML = "Canvas: " + (1000 / canvasAvgDelay).toFixed(1);
}, 2000);