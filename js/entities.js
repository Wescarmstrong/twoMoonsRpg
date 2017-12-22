var Entities = {
    init: function (data) {
        var background = {
            sprite: new Entities.helpers.Sprite(data.spriteSheet, 0, 280, 1440, 720),
            x: 0,    // where to draw
            y: 0,
            w: 1440,
            h: 720
        };

        var character = new Entities.helpers.character(data.spriteSheet, 275, 400, 113, 145);  // location on screen parameters

        // Might need to have dif arrays and/or functions for dif objects drawn on screen
        // example of object locations...    var ObjectLocations = [[250, 150], [297, 150]];   etc
        var ObjectLocations = [[1000, 600]];

        data.entities = {};

        data.entities.background = background;
        data.entities.character = character;
        //declare array that will be populated by forEach function
        data.entities.ObjectExampleArray = [];

        ObjectLocations.forEach(function (location) {
            data.entities.ObjectExampleArray.push(new Entities.helpers.ObjectOnScreen(data.spriteSheet, location[0], location[1], 86, 110))   // last parameters are width and height
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

        character: function (img, x, y, w, h) {
            var self = this;
            //this.testSound = new Audio("#");
            this.sprite = new Entities.helpers.Sprite(img, 15, 13, 113, 145);
            this.spriteAnimations = {
                idle: {
                    frames: [new Entities.helpers.Sprite(img, 1062, 18, 87, 110), new Entities.helpers.Sprite(img, 1150, 18, 86, 110),
                        new Entities.helpers.Sprite(img, 1237, 18, 86, 110), new Entities.helpers.Sprite(img, 1324, 18, 86, 110),
                        new Entities.helpers.Sprite(img, 1062, 147, 87, 110), new Entities.helpers.Sprite(img, 1150, 147, 86, 110),
                        new Entities.helpers.Sprite(img, 1237, 147, 86, 110), new Entities.helpers.Sprite(img, 1324, 147, 86, 110)],
                    currentFrame: 0
                },
                faceRight: new Entities.helpers.Sprite(img, 15, 13, 113, 145),
                faceLeft: new Entities.helpers.Sprite(img, 15, 13, 113, 145)
                //Repeat for all animations
            };
            this.states = {
                standing: {
                    movement: function (data) {
                        return;
                    },
                    animation: function (data) {
                        if (self.direction === "right") {
                            self.sprite = self.spriteAnimations.faceRight;
                        } else {
                            self.sprite = self.spriteAnimations.faceLeft;
                        }
                    }
                },
                idle: {                          // Just example on how to set up state functions
                    movement: function (data) {
                        if (self.velY === 0) {
                            var idleSound = self.idleSound.cloneNode();  // just example
                            idleSound.play();

                        }
                    },
                    animation: function (data) {
                        if (self.direction === "right" && data.animationFrame % 15 === 0) {
                            self.sprite = self.spriteAnimations.idle.frames[self.spriteAnimations.idle.currentFrame];
                            self.spriteAnimations.idle.currentFrame = (self.spriteAnimations.idle.currentFrame + 1) % self.spriteAnimations.idle.frames.length;
                        } else {
                            self.sprite = self.spriteAnimations.idle.frames[self.spriteAnimations.idle.currentFrame];
                        }
                    }
                }
            };
            this.currentState = self.states.idle;
            this.direction = "right";
            this.velY = 0;
            this.velX = 3.8;
            this.items = 0;
            this.x = x;
            this.y = y;
            this.w = w;
            this.h = h;

        },

        // An example of object(s) on screen. Use with array declaration above and for loop to create
        ObjectOnScreen: function (img, x, y, w, h) {
            var self = this;
            this.type = "objectExample";
            //this.sound = new Audio("#");
            this.sprite = new Entities.helpers.Sprite(img, 1062, 18, 87, 110);  // Zero's here represent loaction on atlas
            this.spriteAnimations = {
                cycle: {
                    frames: [new Entities.helpers.Sprite(img, 1062, 18, 87, 110), new Entities.helpers.Sprite(img, 1150, 18, 86, 110),
                    new Entities.helpers.Sprite(img, 1237, 18, 86, 110), new Entities.helpers.Sprite(img, 1324, 18, 86, 110),
                    new Entities.helpers.Sprite(img, 1062, 147, 87, 110), new Entities.helpers.Sprite(img, 1150, 147, 86, 110),
                    new Entities.helpers.Sprite(img, 1237, 147, 86, 110), new Entities.helpers.Sprite(img, 1324, 147, 86, 110)],
                    currentFrame: 0
                }
            };
            this.states = {
                cycling: {
                    animation: function (data) {
                        if (data.animationFrame % 13 === 0) {
                            self.sprite = self.spriteAnimations.cycle.frames[self.spriteAnimations.cycle.currentFrame];
                            /*self.spriteAnimations.cycle.currentFrame++;
                            if (self.spriteAnimations.cycle.currentFrame > 3) {
                                self.spriteAnimations.cycle.currentFrame = 0;
                            }  */

                            self.spriteAnimations.cycle.currentFrame = (self.spriteAnimations.cycle.currentFrame + 1) % self.spriteAnimations.cycle.frames.length;
                        }
                    }
                }
            };
            // Once we have dif states ie: object is playing idle animation, then changes state to die/cast/w/e
            this.currentState = self.states.cycling;
            this.x = x;
            this.y = y;
            this.w = w;
            this.h = h;
        }
    }
};