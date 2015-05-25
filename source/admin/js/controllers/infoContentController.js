var app = app || {};

app.infoContentController = (function () {
    function InfoContentController(model, views) {
        this.model = model;
        this.viewBag = views;
    }


    return {
        load: function (model, views) {
            return new InfoContentController(model, views);
        }
    }
}());
