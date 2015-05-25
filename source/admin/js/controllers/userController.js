var app = app || {};

app.userController = (function() {
    function UserController(model, views) {
        this.model = model;
        this.viewBag = views;
    }

    UserController.prototype.loadLoginPage = function(selector) {
         this.viewBag.loginView.loadLoginView(selector);
    };


    UserController.prototype.login = function(username, password) {
        return this.model.login(username, password)
            .then(function(loginData) {
                setUserToStorage(loginData);
                window.location.replace('#/home/');
            }, function(error) {
                console.log(error);
            })
    };

    UserController.prototype.logout = function() {
        return this.model.logout()
            .then(function() {
                clearUserFromStorage();
                window.location.replace('#/');
            }, function(error) {
                console.log(error);
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
    }
}());