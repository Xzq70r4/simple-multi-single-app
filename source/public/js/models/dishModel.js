var app = app || {};

app.dishModel = (function() {
    function DishModel(baseUrl, requester, headers) {
        this.serviceUrl = baseUrl + 'classes/Dish/';
        this.requester = requester;
        this.headers = headers;
    }

    DishModel.prototype.listAllDishes = function() {
        return this.requester.get(this.serviceUrl, this.headers.getHeaders(true));
    };

    return {
        load: function(baseUrl, requester, headers) {
            return new DishModel(baseUrl, requester, headers);
        }
    }
}());
