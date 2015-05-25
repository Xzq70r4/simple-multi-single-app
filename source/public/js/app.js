var app = app || {};

(function() {
    var appId= 'Hrf7KnjqLGgZXBcrjun2jeXCN8VQ3mPEY6yCpDw1';
    var restAPI = 'bBaqrI6AMhx7ejsznC5vc06jFuM7x6agPdvqDBie';
    var baseUrl = 'https://api.parse.com/1/';

    var headers = app.headers.load(appId, restAPI);
    var requester = app.requester.load();
    var infoContentModel = app.infoContentModel.load(baseUrl, requester, headers);
    var dishModel = app.dishModel.load(baseUrl, requester, headers);

    var infoContentViews = app.infoContentViews.load();
    var dishViews = app.dishViews.load();

    var infoContentController = app.infoContentController.load(infoContentModel, infoContentViews);
    var dishController = app.dishController.load(dishModel,dishViews);

    app.router = Sammy(function () {
        var homeSelector = '#home-info-content',
            aboutSelector = '#about-info-content',
            menuSelector = '#menu-info-content',
            thumbnailSelector = '#bf_dishes',
            sliderSelector = '#slider',
            welcomeInfoContentId = 'NYfmaaHNEh',
            aboutInfoContentId = 'h3BPIP1dmW',
            menuInfoContentId = 'KHwium6knu',
            $templateScript = $('body').find('.child[src="js/libs/theme/jquery.template.min.js"]')

        this.get('#/?(.*)', function() {
            if($templateScript.length < 1) {
                infoContentController.infoContentById(homeSelector, welcomeInfoContentId);
                infoContentController.infoContentById(aboutSelector, aboutInfoContentId);
                infoContentController.infoContentById(menuSelector, menuInfoContentId);
                dishController.listAllDishes(thumbnailSelector, sliderSelector);
            }

            this.redirect('#/');
            return false;
        });

        this.get('#/', function () {
        });
    });

    app.router.run('#/');
}());