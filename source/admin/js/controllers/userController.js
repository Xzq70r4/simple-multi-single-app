var app = app || {};

app.userController = (function () {
    function UserController(model, views) {
        this._model = model;
        this._viewBag = views;
    }

    UserController.prototype.loadLoginPage = function(selector) {
         this._viewBag.loadLogin(selector);
    };

    UserController.prototype.login = function(username, password) {
        return this._model.login(username, password)
            .then(function (loginData) {
                noty({
                    theme: 'relax',
                    text: 'You have successfully logged in!',
                    type: 'success',
                    timeout: 2000,
                    closeWith: ['click']
                });
                setUserToStorage(loginData);
                window.location.replace('#/home/');
            }, function (error) {
                noty({
                    theme: 'relax',
                    text: error.responseJSON.error || 'A problem occurred while signing in!',
                    type: 'error',
                    timeout: 2000,
                    closeWith: ['click']
                });
            });
    };

    UserController.prototype.logout = function () {
        return this._model.logout()
            .then(function () {
                noty({
                    theme: 'relax',
                    text: 'You have successfully logged out!',
                    type: 'success',
                    timeout: 2000,
                    closeWith: ['click']
                });

                clearUserFromStorage();
                window.location.replace('#/');
            }, function (error) {
                noty({
                    theme: 'relax',
                    text: error.responseJSON.error || 'A problem occurred while signing out!',
                    type: 'error',
                    timeout: 2000,
                    closeWith: ['click']
                });
            });
    };

    function setUserToStorage(data) {
        sessionStorage['username'] = data.username;
        sessionStorage['userId'] = data.objectId;
        sessionStorage['sessionToken'] = data.sessionToken;
    }

    function clearUserFromStorage() {
        delete sessionStorage['username'];
        delete sessionStorage['userId'];
        delete sessionStorage['sessionToken'];
    }

    return {
        load : function(model, views) {
            return new UserController(model, views);
        }
    };
}());