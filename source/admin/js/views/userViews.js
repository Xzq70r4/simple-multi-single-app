var app = app || {};

app.userViews = (function() {
    function UserViews() {
        this.loginView = {
            loadLoginView: loadLoginView
        };
    }

    function loadLoginView (selector) {
        $.get('templates/login.html', function(template) {
            var outHtml = Mustache.render(template);
            $(selector).html(outHtml);
        }).then(function() {
            $('#loginButton').click(function() {
                var username = $('#username').val();
                var password = $('#password').val();

                $.sammy(function() {
                    this.trigger('login', {username: username, password: password});
                });

                return false;
            })
        }).done();

    }

    return {
        load: function() {
            return new UserViews();
        }
    }
}());