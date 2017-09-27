var keys = {};
keys.UP = 87;
keys.LEFT = 65;
keys.RIGHT = 68;
keys.DOWN = 83;

var player = new Image();
player.src = "img/player.png";
var playerPos = {x:592, y:592};

function loadPlayer(){
    c.drawImage(player,playerPos.x,playerPos.y);
}

function playerMove(newX, newY, speed){
    playerPos = {x: (playerPos.x + newX * speed), y: (playerPos.y + newY * speed) };

    //console.log("POSX: " + playerPos.x);
    //console.log("POSY: " + playerPos.y);
};

window.addEventListener("keydown", function(e){
    var key = e.keyCode;
    var speed = 5;
    if(key == keys.UP){
        playerMove(0,-1, speed);
        
        // console.log("Up is pressed!");
    }
    if(key == keys.LEFT){
        playerMove(-1,0, speed);
        
        // console.log("Left is pressed!");
    }
    if(key == keys.RIGHT){
        playerMove(1,0, speed);
        
        // console.log("Right is pressed!");
    }
    if(key == keys.DOWN){
        playerMove(0,1, speed);
        
        //console.log("Down is pressed!");
    }
});