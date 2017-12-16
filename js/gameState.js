
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








/*
c.font="30px Comic Sans MS";
c.fillStyle = "red";
c.textAlign = "center";
c.fillText("Hello World", layer2.width/2, layer2.height/2);
*/