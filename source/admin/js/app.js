var app = app || {};

(function() {
    var appId= 'Hrf7KnjqLGgZXBcrjun2jeXCN8VQ3mPEY6yCpDw1';
    var restAPI = 'bBaqrI6AMhx7ejsznC5vc06jFuM7x6agPdvqDBie';
    var baseUrl = 'https://api.parse.com/1/';

    var headers = app.headers.load(appId, restAPI);
    var requester = app.requester.load();
    var userModel = app.userModel.load(baseUrl, requester, headers);
    var infoContentModel = app.infoContentModel.load(baseUrl, requester, headers);
    var dishModel = app.dishModel.load(baseUrl, requester, headers);

    var homeViews = app.homeViews.load();
    var userViews = app.userViews.load();
    var infoContentViews = app.infoContentViews.load();
    var dishViews = app.dishViews.load();

    var userController = app.userController.load(userModel, userViews);
    var infoContentController = app.infoContentController.load(infoContentModel, infoContentViews);
    var homeController = app.homeController.load(homeViews);
    var dishController = app.dishController.load(dishModel,dishViews);

    app.router = Sammy(function () {
        var selector = '#container'

        this.before(function() {
            var userId = sessionStorage['userId'];
            if(userId) {
                $('#nav').show();
            } else {
                $('nav').hide();
            }
        });

        this.before('#/home/', function() {
            var userId = sessionStorage['userId'];
            if(!userId) {
                this.redirect('#/');
                return false;
            }
        });

        this.get('#/', function () {
            userController.loadLoginPage(selector)
        });

        this.get('#/login/', function() {
            userController.loadLoginPage(selector);
        });

        this.get('#/logout/', function() {
            userController.logout();
        });

        this.get('#/home/', function () {
            homeController.homeScreen(selector);
        });

        this.bind('login', function(e, data) {
            userController.login(data.username, data.password);
        });
    });

    app.router.run('#/');
}());