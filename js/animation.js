var Animation = {
    update: function (data) {
        Animation.character(data);
        Animation.exampleObjects(data);
    },

    character: function (data) {
        data.entities.character.currentState.animation(data);
    },

    // Stand in example for animating opjects. functions below, update above with call
    exampleObjects: function (data) {
        data.entities.ObjectExampleArray.forEach(function (exampleObject) {
            exampleObject.currentState.animation(data);
        });
    }
};