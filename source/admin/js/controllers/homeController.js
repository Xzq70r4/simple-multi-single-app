var app = app || {};

app.homeController = (function () {
    function HomeController(views) {
        this.viewBag = views;
    }

    HomeController.prototype.homeScreen = function(selector) {
        this.viewBag.homeView.loadHomeView(selector);
    };

    return {
        load: function (views) {
            return new HomeController(views);
        }
    };
}());