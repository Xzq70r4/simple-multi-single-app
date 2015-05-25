var app = app || {};

app.infoContentViews = (function() {
    function InfoContentViews() {
        this.showInfoContentsView = showInfoContentsView;
        this.showEditInfoContentsView = showEditInfoContentView;
    }

    function showInfoContentsView (selector, data) {
        $.get('templates/info-content-list.html', function (template) {
            var outHtml = Mustache.render(template, data);
            $(selector).html(outHtml);
        }).then(function() {
            $('.edit').click(function () {
                var data = getElementData(this);
                $.sammy(function () {
                    this.trigger('showEditInfoContent', data);
                })
            });
        }).done()
    }

    function showEditInfoContentView (selector, data) {
        $.get('templates/editInfoContent.html', function(template) {
            var outHtml = Mustache.render(template, data);
            $(selector).html(outHtml);
        }).then(function() {
            $('#editInfoContentButton').click(function() {
                var title = $('#title').val();
                var description = $('#description').val();
                var id = $('#edit-info-content').attr('data-id');

                $.sammy(function() {
                    this.trigger('editInfoContent', {title: title, description: description, id: id});
                });

                return false;
            })
        }).done();
    }

    function getElementData(element) {
        var title = $($(element).parent().children()[0]).find('h2').text();
        var description = $($(element).parent().children()[0]).find('p').text();
        var id = $(element).parent().attr('data-id');

        //console.log(element)
        //console.log(title)
        //console.log(description)


        return {title:title,  description:description, objectId:id};
    }

    return {
        load: function() {
            return new InfoContentViews();
        }
    }
}());