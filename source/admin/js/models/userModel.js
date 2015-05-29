var app = app || {};

app.userModel = (function() {
    function UserModel(baseUrl, requester, headers) {
        this.baseUrl = baseUrl;
        this.requester = requester;
        this.headers = headers;
    }

    UserModel.prototype.login = function(username, password) {
        var serviceUrl = this.baseUrl + 'login?username=' + username + '&password=' + password;
        return this.requester.get(serviceUrl, this.headers.getHeaders());
    };

    UserModel.prototype.logout = function() {
        var serviceUrl = this.baseUrl + 'logout';
        return this.requester.post(serviceUrl, this.headers.getHeaders(true));
    };

    return {
        load: function(baseUrl, requester, headers) {
            return new UserModel(baseUrl, requester, headers);
        }
    };
}());