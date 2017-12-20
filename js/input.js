var Input = {
    init: function (data) {
        var self = this;

        $(window).on("keydown", function (event) {
            self.helpers.down[event.keyCode] = true;
        });

        $(window).on("keyup", function () {
            delete self.helpers.down[event.keyCode];
            delete self.helpers.pressed[event.keyCode];
        });
    },

    update: function (data) {
        var character = data.entities.character;

        // Left Arrow
        if (Input.helpers.down(37)) {
            if (character.velY === 0) {
                character.currentState = character.states.faceRight;
            } else {
                character.x -= character.velX;
            }

            character.direction = "left";
        }

        //Right Arrow
        if (Input.helpers.down(39)) {
            if (character.velY === 0) {
                character.currentState = character.states.faceRight;
            } else {
                character.x += character.velX;
            }

            character.direction = "left";
        }
    },

    helpers: {
        down: function (code) {
            return Input.helpers.down[code];
        },

        pressed: function (code) {
            if (Input.helpers.pressed[code]) {
                return false;
            } else if (Input.helpers.down[code]) {
                return Input.helpers.pressed[code] = true;
            }

            return false;
        },

        down: {},
        pressed: {}
    }
};