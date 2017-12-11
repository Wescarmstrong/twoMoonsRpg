
function gameStateCase() {

    switch (gameState) {
        case "title":
            // title call function here
            break;
        case "mainMenu":
            // mainMenu call function here
            break;
        case "combat":
            combatHandler.beginCombat();
            break;
        case "cutScene":
            animateTest();
            break;
    }
}









/*window.requestAnimationFrame(mainDraw);



window.onload = function () {
    window.requestAnimationFrame(mainDraw);
};
*/