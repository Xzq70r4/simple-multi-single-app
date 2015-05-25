var app = app || {};

app.dishViews = (function() {
    function DishViews() {
        this.listDishes = {
            loadDishesView: loadDishesView
        };
    }

    function loadDishesView (selectorThumbnail, selectorSlider, data) {
        loadDishesThumbnailImagesView(selectorThumbnail, data);
        loadDishesSliderItemsView(selectorSlider, data);
    }

    function loadDishesThumbnailImagesView (selector, data) {
        $.get('templates/dish.html', function (template) {
            var outHtml = Mustache.render(template, data);
            $(selector).html(outHtml);
        });
    }

    function loadDishesSliderItemsView (selector, data) {
        $.get('templates/slider.html', function (template) {
            var outHtml = Mustache.render(template, data);
            $(selector).html(outHtml);
        }).then(
            $(document).ready(function(){
                //Template get elements when is loaded, but I need load lib when data is loaded from
                //Rest API(www.parse.com) to build correct theme template.
                $.getScript("js/libs/theme/jquery.template.min.js");
            })
        );
    }

    return {
        load: function() {
            return new DishViews();
        }
    }
}());
