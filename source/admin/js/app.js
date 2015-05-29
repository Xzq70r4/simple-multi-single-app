var app = app || {};

(function () {
    var dishesPerPage = 2;

    var appId= 'Hrf7KnjqLGgZXBcrjun2jeXCN8VQ3mPEY6yCpDw1';
    var restAPI = 'bBaqrI6AMhx7ejsznC5vc06jFuM7x6agPdvqDBie';
    var baseUrl = 'https://api.parse.com/1/';

    var headers = app.headers.load(appId, restAPI);
    var requester = app.requester.load();

    var userModel = app.userModel.load(baseUrl, requester, headers);
    var infoContentModel = app.infoContentModel.load(baseUrl, requester, headers);
    var dishModel = app.dishModel.load(baseUrl, requester, headers);
    var imageModel = app.imageModel.load(baseUrl, requester);

    var homeViews = app.homeViews.load();
    var userViews = app.userViews.load();
    var infoContentViews = app.infoContentViews.load();
    var dishViews = app.dishViews.load();

    var userController = app.userController.load(userModel, userViews);
    var infoContentController = app.infoContentController.load(infoContentModel, infoContentViews);
    var homeController = app.homeController.load(homeViews);
    var imageController = app.imageController.load(imageModel);
    var dishController = app.dishController.load(dishModel, dishViews, dishesPerPage);

    app.router = Sammy(function () {
        var selector = '#container'

        this.before(function() {
            var userId = sessionStorage['userId'];
            if (userId) {
                $('#nav').show();
            } else {
                $('nav').hide();
            }
        });

        this.before('#/info-contents/', function() {
            var userId = sessionStorage['userId'];
            if (!userId) {
                this.redirect('#/');
                return false;
            }
        });


        this.before('#/dishes/(.*)', function() {
            var userId = sessionStorage['userId'];
            if (!userId) {
                this.redirect('#/');
                return false;
            }
        });


        this.before('#/home/', function() {
            var userId = sessionStorage['userId'];
            if (!userId) {
                this.redirect('#/');
                return false;
            }
        });

        this.before('#/add-dish/', function() {
            var userId = sessionStorage['userId'];
            if (!userId) {
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

        this.get('#/info-contents/', function() {
            infoContentController.listAllInfoContent(selector);
        });

        this.get('#/dishes/([-0-9]+)?', function() {
            var page = 1;

            if (this.params['splat'][0]) {
                page = this.params['splat'][0];
            }

            dishController.listAllDishes(selector, page);
        });

        this.get('#/add-dish/', function () {
            dishController.showAddDish(selector);
        });

        this.bind('login', function(e, data) {
            userController.login(data.username, data.password);
        });

        this.bind('addDish', function (e, data) {
            dishController.addDish(data);
        });

        this.bind('uploadImages', function (e, data) {

            imageController.UploadImages(data, 'addDish');
        });

        this.bind('showEditDish', function (e, data) {
            dishController.showEditDish(selector, data);
        });

        this.bind('showEditInfoContent', function (e, data) {
            infoContentController.showEditInfoContent(selector, data);
        });

        this.bind('editInfoContent', function (e, data) {
            infoContentController.editInfoContent(selector, data);
        });

        this.bind('editDish', function (e, data) {
            dishController.editDish(data);
        });

        this.bind('showDeleteConfirm', function (e, data) {
            dishController.showDeleteConfirmMessage(selector, data);
        });

        this.bind('deleteDish', function (e, data) {
            dishController.deleteDish(data);
        });

        this.bind('changePath', function (e, data) {
            this.redirect(data);
        })
    });

    app.router.run('#/');
}());