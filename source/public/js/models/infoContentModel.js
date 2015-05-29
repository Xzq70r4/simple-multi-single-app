var app = app || {};

app.infoContentModel = (function() {
    function InfoContentModel(baseUrl, requester, headers) {
        this.serviceUrl = baseUrl + 'classes/InfoContent/';
        this.requester = requester;
        this.headers = headers;
    }

    InfoContentModel.prototype.infoContentById = function (infoContentId) {
        return this.requester.get(this.serviceUrl + infoContentId, this.headers.getHeaders(true));
    };

    return {
        load: function(baseUrl, requester, headers) {
            return new InfoContentModel(baseUrl, requester, headers);
        }
    };
}());