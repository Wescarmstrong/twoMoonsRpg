var canvasFps  = document.getElementById('canvasFps');
var canvasLastDraw = performance.now();   //    FPS measure
var canvasAvgDelay = 0;

function mainDraw() {

    switch(gameState) {
        case "title":
            // title call function here
            break;
        case "inGame":
            // inGame call function here
            mapLoad();
            loadPlayer();
            break;
        case "mainMenu":
            // mainMenu call function here
            break;
        case "cutScene":
            animateTest();
            break;
    }

    window.requestAnimationFrame(mainDraw);

    var canvasTimeNow = performance.now();
    var canvasDelay = canvasTimeNow - canvasLastDraw;
    canvasAvgDelay += (canvasDelay - canvasAvgDelay) / 10;
    canvasLastDraw = canvasTimeNow;
}

window.requestAnimationFrame(mainDraw);

//Display FPS
setInterval(function() {
    canvasFps.innerHTML = "Canvas: " + (1000/canvasAvgDelay).toFixed(1);
}, 2000);
