var Animation = {
    update: function (data) {
        Animation.character1(data);
        Animation.character2(data);
        Animation.character3(data);
        Animation.exampleObjects(data);
    },

    character1: function (data) {
        data.entities.character1.currentState.animation(data);
    },

    character2: function (data) {
        data.entities.character2.currentState.animation(data);
    },

    character3: function (data) {
        data.entities.character3.currentState.animation(data);
    },

    // Stand in example for animating opjects. functions below, update above with call
    exampleObjects: function (data) {
        data.entities.ObjectExampleArray.forEach(function (exampleObject) {
            exampleObject.currentState.animation(data);
        });
    }
};