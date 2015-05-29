var app = app || {};

app.requester = (function () {
    function Requester() {
    }

    Requester.prototype.get = function (url, headers) {
        return makeRequest('GET', headers, url);
    };

    Requester.prototype.post = function (url, headers, data) {
        return makeRequest('POST', headers, url, data);
    };

    Requester.prototype.uploadFile = function (url, data) {
        return makeUploadFileRequest(url, data);
    };

    Requester.prototype.put = function (url, headers, data) {
        return makeRequest('PUT', headers, url, data);
    };

    Requester.prototype.delete = function (url, headers) {
        return makeRequest('DELETE', headers, url);
    };

    function makeUploadFileRequest(url, file) {
        var deferUpload = Q.defer();

        return $.ajax({
            type: 'POST',
            beforeSend: function(request) {
                request.setRequestHeader("X-Parse-Application-Id", 'Hrf7KnjqLGgZXBcrjun2jeXCN8VQ3mPEY6yCpDw1');
                request.setRequestHeader("X-Parse-REST-API-Key", 'bBaqrI6AMhx7ejsznC5vc06jFuM7x6agPdvqDBie');
                request.setRequestHeader("Content-Type", file.type);
            },
            url: url,
            processData: false,
            contentType: false,
            data: file,
            success: function (data) {
                deferUpload.resolve(data);
            },
            error: function (error) {
                deferUpload.reject(error);
            }
        });

        return deferUpload.promise;
    }


    function makeRequest(method, headers, url, data) {
        var deffer = Q.defer();

        $.ajax({
            method: method,
            headers: headers,
            url: url,
            data: JSON.stringify(data),
            success: function (data) {
                deffer.resolve(data);
            },
            error: function (error) {
                deffer.reject(error);
            }
        });

        return deffer.promise;
    }

    return {
        load: function () {
            return new Requester();
        }
    };
}());