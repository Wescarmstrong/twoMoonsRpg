var Entities = {
    init: function (data) {
        var background = {
            sprite: new Entities.helpers.Sprite(data.spriteSheet, 0, 0, 0, 0),
            x: 0,    // where to draw
            y: 0,
            w: 1920,
            h: 1080
        };

        // Might need to have dif arrays and/or functions for dif objects drawn on screen
        // example of object locations...    var ObjectLocations = [[250, 150], [297, 150]];   etc
        var ObjectLocations = [];

        data.entities = {};

        data.entities.background = background;
        //declare array that will be populated by forEach function
        data.entities.ObjectExampleArray = [];

        ObjectLocations.forEach(function (location) {
            data.entities.ObjectExampleArray.push(new Entities.helpers.ObjectOnScreen(data.spriteSheet, location[0], location[1], 50, 50))   // 50 parameters are width and height
        })
    },

    helpers: {
        Sprite: function (img, srcX, srcY, srcW, srcH) {
            this.img = img;
            this.srcX = srcX;
            this.srcY = srcY;
            this.srcW = srcW;
            this.srcH = srcH;
        },
        // An example of object(s) on screen. Use with array declaration above and for loop to create
        ObjectOnScreen: function (img, x, y, w, h) {
            var self = this;
            this.type = "objectExample";
            this.sound = new Audio("#");
            this.sprite = new Entities.helpers.Sprite(img, 0, 0, 0, 0);  // Zero's here represent loaction on atlas
            this.spriteAnimations = {
                cycle: {
                    frames: [new Entities.helpers.Sprite(img, 0, 0, 0, 0), new Entities.helpers.Sprite(img, 64, 0, 0, 0),
                    new Entities.helpers.Sprite(img, 128, 0, 0, 0), new Entities.helpers.Sprite(img, 192, 0, 0, 0)],
                    currentFrame: 0
                }
            };
            this.states = {
                cycling: {
                    animation: function (data) {
                        if (data.animationFrame % 13 === 0) {
                            self.sprite = self.spriteAnimations.cycle.frames[self.spriteAnimations.cycle.currentFrame]
                            /*self.spriteAnimations.cycle.currentFrame++;
                            if (self.spriteAnimations.cycle.currentFrame > 3) {
                                self.spriteAnimations.cycle.currentFrame = 0;
                            }  */

                            self.spriteAnimations.cycle.currentFrame = (self.spriteAnimations.cycle.currentFrame + 1) % self.spriteAnimations.cycle.frames.lenth;
                        }
                    }
                }
            };
            // Once we have dif states ie: object is playing idle animation, then changes state to die
            this.currentState = self.states.cycling;
            this.x = x;
            this.y = y;
            this.w = w;
            this.h = h;
        }
    }
};