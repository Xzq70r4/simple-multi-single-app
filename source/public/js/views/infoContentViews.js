var app = app || {};

app.infoContentViews = (function () {
    function InfoContentViews() {
        this.infoContent = {
            loadInfoContentByIdView : loadInfoContentView
        };
    }

    function loadInfoContentView(selector, data) {
        $.get('templates/info-content.html', function (template) {
            var outHtml = Mustache.render(template, data);
            $(selector).html(outHtml);
        });
    }

    return {
        load: function () {
            return new InfoContentViews();
        }
    };
}());