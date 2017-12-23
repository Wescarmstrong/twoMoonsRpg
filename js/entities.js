var Entities = {
    init: function (data) {
        var background = {
            sprite: new Entities.helpers.Sprite(data.spriteSheet, 0, 280, 1440, 720),
            x: 0,    // where to draw
            y: 0,
            w: 1440,
            h: 720
        };

        var character1 = new Entities.helpers.character1(data.spriteSheet, 200, 530, 87, 110);  // first two numbers are location on screen
        var character2 = new Entities.helpers.character2(data.spriteSheet, 275, 430, 122, 103);
        var character3 = new Entities.helpers.character3(data.spriteSheet, 400, 350, 79, 94);

        // Might need to have dif arrays and/or functions for dif objects drawn on screen
        // example of object locations...    var ObjectLocations = [[250, 150], [297, 150]];   etc
        var ObjectLocations = [[1100, 530], [1050, 430], [1000, 350]];

        data.entities = {};

        data.entities.background = background;
        data.entities.character1 = character1;
        data.entities.character2 = character2;
        data.entities.character3 = character3;
        //declare array that will be populated by forEach function
        data.entities.ObjectExampleArray = [];

        ObjectLocations.forEach(function (location) {
            data.entities.ObjectExampleArray.push(new Entities.helpers.ObjectOnScreen(data.spriteSheet, location[0], location[1], 54, 87))   // last parameters are width and height
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

        character1: function (img, x, y, w, h) {
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
                        if (self.direction === "right" && data.animationFrame % 10 === 0) {
                            self.sprite = self.spriteAnimations.idle.frames[self.spriteAnimations.idle.currentFrame];
                            self.spriteAnimations.idle.currentFrame = (self.spriteAnimations.idle.currentFrame + 1) % self.spriteAnimations.idle.frames.length;
                        } else {   //else is for dif animations for dif events
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
            this.speed = typeof speed === 'number' ? speed : 0;      //speed of animation
            this.x = x;
            this.y = y;
            this.w = w;
            this.h = h;

        },

        character2: function (img, x, y, w, h) {
            var self = this;
            //this.testSound = new Audio("#");
            this.sprite = new Entities.helpers.Sprite(img, 367, 18, 122, 103);
            this.spriteAnimations = {
                idle: {
                    frames: [new Entities.helpers.Sprite(img, 367, 18, 122, 103), new Entities.helpers.Sprite(img, 507, 18, 122, 103),
                        new Entities.helpers.Sprite(img, 657, 17, 122, 103), new Entities.helpers.Sprite(img, 804, 18, 122, 103),
                        new Entities.helpers.Sprite(img, 367, 128, 122, 103), new Entities.helpers.Sprite(img, 507, 128, 122, 103),
                        new Entities.helpers.Sprite(img, 657, 127, 122, 103), new Entities.helpers.Sprite(img, 804, 128, 122, 103)],
                    currentFrame: 0
                },
                faceRight: new Entities.helpers.Sprite(img, 367, 18, 122, 103),
                faceLeft: new Entities.helpers.Sprite(img, 367, 18, 122, 103)
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
                        if (self.direction === "right" && data.animationFrame % 10 === 0) {
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

        character3: function (img, x, y, w, h) {
            var self = this;
            //this.testSound = new Audio("#");
            this.sprite = new Entities.helpers.Sprite(img, 9, 25, 79, 94);
            this.spriteAnimations = {
                idle: {
                    frames: [new Entities.helpers.Sprite(img, 9, 25, 79, 94), new Entities.helpers.Sprite(img, 93, 25, 79, 97),
                        new Entities.helpers.Sprite(img, 176, 25, 82, 94), new Entities.helpers.Sprite(img, 259, 25, 85, 94),
                        new Entities.helpers.Sprite(img, 6, 132, 82, 94), new Entities.helpers.Sprite(img, 89, 132, 81, 94),
                        new Entities.helpers.Sprite(img, 176, 132, 82, 94), new Entities.helpers.Sprite(img, 263, 132, 81, 94)],
                    currentFrame: 0
                },
                faceRight: new Entities.helpers.Sprite(img, 9, 25, 79, 94),
                faceLeft: new Entities.helpers.Sprite(img, 9, 25, 79, 94)
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
                        if (self.direction === "right" && data.animationFrame % 10 === 0) {
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
            this.sprite = new Entities.helpers.Sprite(img, 1506, 25, 54, 87);  // Zero's here represent loaction on atlas
            this.spriteAnimations = {
                cycle: {
                    frames: [new Entities.helpers.Sprite(img, 1506, 25, 54, 87), new Entities.helpers.Sprite(img, 1563, 25, 53, 87),
                    new Entities.helpers.Sprite(img, 1620, 25, 52, 87), new Entities.helpers.Sprite(img, 1677, 25, 52, 87),
                    new Entities.helpers.Sprite(img, 1734, 25, 53, 87), new Entities.helpers.Sprite(img, 1791, 25, 54, 87),
                    new Entities.helpers.Sprite(img, 1848, 25, 54, 87), new Entities.helpers.Sprite(img, 1905, 25, 53, 87)],
                    currentFrame: 0
                }
            };
            this.states = {
                cycling: {
                    animation: function (data) {
                        if (data.animationFrame % 10 === 0) {
                            self.sprite = self.spriteAnimations.cycle.frames[self.spriteAnimations.cycle.currentFrame];

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