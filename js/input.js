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
        var character1 = data.entities.character1;

        // Left Arrow
        if (Input.helpers.down(37)) {
            if (character1.velY === 0) {
                character1.currentState = character1.states.faceRight;
            } else {
                character1.x -= character1.velX;
            }

            character1.direction = "left";
        }

        //Right Arrow
        if (Input.helpers.down(39)) {
            if (character1.velY === 0) {
                character1.currentState = character1.states.faceRight;
            } else {
                character1.x += character1.velX;
            }

            character1.direction = "left";
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