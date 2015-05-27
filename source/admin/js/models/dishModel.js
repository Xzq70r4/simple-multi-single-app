var app = app || {};

app.dishModel = (function() {
    function DishModel(baseUrl, requester, headers) {
        this._serviceUrl = baseUrl + 'classes/Dish/';
        this._requester = requester;
        this._headers = headers;
    }

    DishModel.prototype.listAllDishes = function(limit, skipPages) {
        var queryUrl = this._serviceUrl +
            '?limit=' + limit +
            '&skip=' + skipPages +
            '&count=1';

        return this._requester.get(queryUrl, this._headers.getHeaders(true));
    };

    DishModel.prototype.addDish = function (dish) {
        var headers = this._headers.getHeaders(true);

        return this._requester.post(this._serviceUrl, headers,  dish);
    };

    DishModel.prototype.editDish = function (data) {
        var url = this._serviceUrl + data.id;
        var headers = this._headers.getHeaders(true);

        return this._requester.put(url, headers, data.dish);
    };

    DishModel.prototype.deleteDish = function (dishId) {
        var queryUrl = this._serviceUrl + dishId;
        var headers = this._headers.getHeaders(true);

        return this._requester.delete(queryUrl, headers);
    };

    return {
        load: function(baseUrl, requester, headers) {
            return new DishModel(baseUrl, requester, headers);
        }
    }
}());
