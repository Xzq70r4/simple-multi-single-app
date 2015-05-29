var app = app || {};

app.imageModel = (function() {
    function ImageModel(baseUrl, requester) {
        this._serviceUrl = baseUrl + 'files/';
        this._requester = requester;
    }

    ImageModel.prototype.UploadImage = function (file) {
        console.log(file)
        var serverUrl = this._serviceUrl + file.name;

        return this._requester.uploadFile(serverUrl, file);
    };

    return {
        load: function(baseUrl, requester, headers) {
            return new ImageModel(baseUrl, requester, headers);
        }
    };
}());

