var app = app || {};

app.dishViews = (function() {
    function DishViews() {
        this.showDishesView = showDishesView;
        this.showAddDishView = showAddDishView;
        this.showEditDishView = showEditDishView;
        this.showDeleteConfirmView = showDeleteConfirmView;
    }

    function showDishesView (selector, data) {
        $.get('templates/dish-list.html', function (template) {
            var outHtml = Mustache.render(template, data);
            $(selector).html(outHtml);

        }).then(function() {
            $('.edit').click(function () {
                var data = getElementData(this);
                $.sammy(function () {
                    this.trigger('showEditDish', data);
                })
            });

            $('.delete').click(function () {
                var data = {
                    objectId : $(this).parent().parent().attr('data-id')
                };

                $.sammy(function() {
                    this.trigger('showDeleteConfirm', data);
                });
            });

            $('#pagination').pagination({
                items: data.pagination.numberOfItems,
                itemsOnPage: data.pagination.itemsPerPage,
                cssStyle: 'light-theme',
                hrefTextPrefix: data.pagination.hrefPrefix
            }).pagination('selectPage', data.pagination.selectedPage);

        }).done()
    }

    function showAddDishView (selector) {
        $.get('templates/add-dish.html', function(template) {
            var outHtml = Mustache.render(template);
            $(selector).html(outHtml);
        }).then(function() {
            $('#addDishButton').click(function() {
                var title = $('#title').val();
                var description = $('#description').val();

                var data = {
                    title: title.toString().trim(),
                    description: description.toString().trim(),
                    ACL : {

                    }
                }

                $.sammy(function() {
                    this.trigger('addDish',data);
                });

                return false;
            })
        }).done();
    }

    function showEditDishView (selector, data) {
        $.get('templates/edit-dish.html', function(template) {
            var outHtml = Mustache.render(template, data);
            $(selector).html(outHtml);
        }).then(function() {
            $('#editDishButton').click(function() {
                var title = $('#title').val();
                var description = $('#description').val();
                var id = $('#edit-dish').attr('data-id');

                var data = {
                    title: title.toString().trim(),
                    description: description.toString().trim(),
                    id: id
                }

                $.sammy(function() {
                    this.trigger('editDish', data);
                });

                return false;
            })
        }).done();
    }

    function showDeleteConfirmView (selector, data) {
        $.get('templates/delete-dish.html', function(template) {
            var outHtml = Mustache.render(template, data);
            $(selector).html(outHtml);
        }).then(function() {
            $('#deleteDishButton').click(function() {
                var id = $(this).attr('data-id');
                $.sammy(function() {
                    this.trigger('deleteDish', id);
                });

                return false;
            })
        }).done();
    }

    function getElementData(element) {
        var title = $($(element).parent().parent().children()[0]).text();
        var description = $($(element).parent().parent().children()[1]).text();
        var id = $(element).parent().parent().attr('data-id');

        return {
            title:title.toString().trim(),
            description:description.toString().trim(),
            objectId:id
        };
    }

    return {
        load: function() {
            return new DishViews();
        }
    }
}());
