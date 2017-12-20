// example of movement
var Navigation = {
    update: function () {
        Navigation.cursor(data);
    },
    cursor: function (data) {
        data.entities.cursor.currentState.navigation(data);
    }
}