var app = app || {};

app.infoContentModel = (function() {
    function InfoContentModel(baseUrl, requester, headers) {
        this.serviceUrl = baseUrl + 'classes/InfoContent/';
        this.requester = requester;
        this.headers = headers;
    }



    return {
        load: function(baseUrl, requester, headers) {
            return new InfoContentModel(baseUrl, requester, headers);
        }
    }
}());