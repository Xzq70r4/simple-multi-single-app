var app = app || {};

app.infoContentController = (function () {
    function InfoContentController(model, views) {
        this.model = model;
        this.viewBag = views;
    }

    InfoContentController.prototype.infoContentById = function (selector,infoContentId) {
        var _this = this;

        return this.model.infoContentById(infoContentId)
            .then(function (data) {
                _this.viewBag.infoContent.loadInfoContentByIdView(selector, data);
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
            return new InfoContentController(model, views);
        }
    }
}());
