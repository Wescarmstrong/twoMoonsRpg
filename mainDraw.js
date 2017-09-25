
function mainDraw() {

    switch(gameState) {
        case "title":
            // title call function here
            break;
        case "inGame":
            // inGame call function here
            break;
        case "mainMenu":
            // mainMenu call function here
            break;
        case "cutScene":
            animateTest();
            break;
    }

    window.requestAnimationFrame(mainDraw);
}

window.requestAnimationFrame(mainDraw);