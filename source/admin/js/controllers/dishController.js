var app = app || {};

app.dishController = (function () {
    function DishController(model, views) {
        this.model = model;
        this.viewBag = views;
    }

    return {
        load: function (model, views) {
            return new DishController(model, views);
        }
    }
}());