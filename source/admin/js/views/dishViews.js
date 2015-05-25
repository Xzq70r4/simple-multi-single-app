var app = app || {};

app.dishViews = (function() {
    function DishViews() {
        this.dishView = {
        };
    }


    return {
        load: function() {
            return new DishViews();
        }
    }
}());
