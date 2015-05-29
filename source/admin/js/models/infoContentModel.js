var app = app || {};

app.infoContentModel = (function() {
    function InfoContentModel(baseUrl, requester, headers) {
        this._serviceUrl = baseUrl + 'classes/InfoContent/';
        this._requester = requester;
        this._headers = headers;
    }

    InfoContentModel.prototype.listAllInfoContent = function() {
        return this._requester.get(this._serviceUrl, this._headers.getHeaders(true));
    };

    InfoContentModel.prototype.editInfoContent = function (data) {
        var url = this._serviceUrl + data.id;
        var headers = this._headers.getHeaders(true);

        return this._requester.put(url, headers, data.infoContent);
    };

    return {
        load: function(baseUrl, requester, headers) {
            return new InfoContentModel(baseUrl, requester, headers);
        }
    };
}());