var Animation = {
    update: function (data) {
        Animation.exampleObjects(data);
    },

    // Stand in example for animating opjects. functions below, update above with call
    exampleObjects: function (data) {
        data.entities.ObjectExampleArray.forEach(function (exampleObject) {
            exampleObject.currentState.animation(data);
        });
    }
};