var Title = {
    init: function (data) {
        var titleBackground = {
            sprite: new Title.helpers.Sprite(data.spriteSheet, 0, 1018, 1440, 720),
            x: 0,    // where to draw
            y: 0,
            w: 1440,
            h: 720
        };

        data.title = {};
        data.title.titleBackground = titleBackground;
        data.canvas.bgCtx.clearRect(0, 0, 1440, 720);
        Title.helpers.drawEntity(data.title.titleBackground, data.canvas.bgCtx);

        var pressToBeginText;
        var textAlphaValue = 0.3;
        var alphaIncrement = 0.1;
        var textAlphaCeiling = 1;
        var textAlphaUp = true;
        var pressToBeginText_RGBA = new RGBA(0, 0, 0, textAlphaValue);


        data.title.animateText = {
            size: "25px",
            font: "Verdana",
            color: pressToBeginText_RGBA.css(),
            value: "Press Any Key to Continue",
            x: 540,
            y: 370
        };

        function RGBA(red, green, blue, alpha) {
            this.red = red;
            this.green = green;
            this.blue = blue;
            this.alpha = alpha;
            this.css = function () {
                return "rgba(" + this.red + "," + this.green + "," + this.blue + "," + this.alpha + ")";
            }
        }

        function CalculateAlpha() {
            if (textAlphaUp == true && textAlphaValue <= textAlphaCeiling) {
                textAlphaValue += alphaIncrement
                if (textAlphaValue == textAlphaCeiling) {
                    textAlphaUp = false;
                }
            } else {
                textAlphaUp = false
                textAlphaValue -= alphaIncrement;

                if (textAlphaValue <= 0) {
                    textAlphaUp = true;
                }
            }
            return textAlphaValue;
        }

        function intervalTextAnimation() {
            data.canvas.ctx.clearRect(0, 0, 1440, 720);

            CalculateAlpha();

            var pressToBeginText_RGBA = new RGBA(0, 0, 0, textAlphaValue);
            data.title.animateText.color = pressToBeginText_RGBA.css();

            Render.helpers.drawText(data.title.animateText, data.canvas.ctx);



        }


        function animated_text() {
            pressToBeginText = setInterval(intervalTextAnimation, 90);
        }

        animated_text();
    },

    helpers: {
        Sprite: function (img, srcX, srcY, srcW, srcH) {
            this.img = img;
            this.srcX = srcX;
            this.srcY = srcY;
            this.srcW = srcW;
            this.srcH = srcH;
        },

        drawEntity: function (entity, ctx) {
            ctx.drawImage(entity.sprite.img,
                entity.sprite.srcX, entity.sprite.srcY,
                entity.sprite.srcW, entity.sprite.srcH,
                entity.x, entity.y,
                entity.w, entity.h);
        }
    }
};