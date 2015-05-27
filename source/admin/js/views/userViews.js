var app = app || {};

app.userViews = (function() {
    function UserViews() {
        this.loadLogin = loadLoginView
    }

    function loadLoginView (selector) {
        $.get('templates/login.html', function(template) {
            var outHtml = Mustache.render(template);
            $(selector).html(outHtml);
        }).then(function() {
            $('#loginButton').click(function() {
                var username = $('#username').val();
                var password = $('#password').val();

                var data = {
                    username: username.toString().trim(),
                    password: password.toLocaleString().trim()
                }

                $.sammy(function() {
                    this.trigger('login', data);
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