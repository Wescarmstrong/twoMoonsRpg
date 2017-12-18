var Render = {
    // init is drawn once at start
    init: function (data) {
        Render.helpers.drawEntity(data.entities.background, data.canvas.bgCtx);
    },
    //update loops over and over
    update: function (data) {
        // First clear canvas
        data.canvas.ctx.clearRect(0, 0, data.canvas.gameCanvas.width, data.canvas.gameCanvas.height);
        // Now draw
        data.entities.ObjectExampleArray.forEach(function (ObjectOnScreen) {
            Render.helpers.drawEntity(ObjectOnScreen, data.canvas.ctx);
        });
    },

    helpers: {
        drawEntity: function (entity, ctx) {
            ctx.drawImage(entity.sprite.img,
                entity.sprite.srcX, entity.sprite.srcY,
                entity.sprite.srcW, entity.sprite.srcH,
                entity.x, entity.y,
                entity.w, entity.h);
        }
    }
};