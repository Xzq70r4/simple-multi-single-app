var app = app || {};

app.dishController = (function () {
    function DishController(model, views) {
        this.model = model;
        this.viewBag = views;
    }

    DishController.prototype.listAllDishes = function (selectorThumbnail, selectorSlider) {
        var _this = this;

        return this.model.listAllDishes()
            .then(function (data) {
                _this.viewBag.listDishes.loadDishesView(selectorThumbnail, selectorSlider, data);
            }, function (error) {
                noty({
                    text        : "A problem occurred.Please try it later again",
                    type        : 'error',
                    dismissQueue: false,
                    layout      : 'topCenter',
                    theme       : 'defaultTheme'
                });
            })
    };

    return {
        load: function (model, views) {
            return new DishController(model, views);
        }
    }
}());