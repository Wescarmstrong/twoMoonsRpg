
function gameStateCase(data) {

    switch (data.gameState) {
        case "title":
            Game.musicController(data);
            Game.title(data);
            break;
        case "mainMenu":
            // mainMenu call function here
            break;
        case "combat":
            Game.musicController(data);
            Game.run(data);
            break;
        case "cutScene":
            // cutScene call function here
            break;
    }
}








