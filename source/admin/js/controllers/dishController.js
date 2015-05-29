var app = app || {};

app.dishController = (function () {
    function DishController(model, views, dishesPerPage) {
        this._model = model;
        this._viewBag = views;
        this._dishesPerPage = dishesPerPage;
    }

    DishController.prototype.showEditDish = function (selector, data) {
        this._viewBag.showEditDishView(selector, data);
    };

    DishController.prototype.showDeleteConfirmMessage = function (selector, data) {
        this._viewBag.showDeleteConfirmView(selector, data);
    };

    DishController.prototype.showAddDish = function (selector) {
        this._viewBag.showAddDishView(selector);
    };

    DishController.prototype.listAllDishes = function (selector, page) {
        var _this = this,
        skipPages = (page - 1) * this._dishesPerPage;

        return this._model.listAllDishes(this._dishesPerPage, skipPages)
            .then(function (data) {
                var viewInputData = {
                    results: [],
                    pagination: {
                        numberOfItems: data.count,
                        itemsPerPage: _this._dishesPerPage,
                        selectedPage: page,
                        hrefPrefix: '#/dishes/'
                    },
                    isEdible : false
                };

                parseInputData(data.results, viewInputData.results);
                _this._viewBag.showDishesView(selector,viewInputData);
            }, function (error) {
                noty({
                    theme: 'relax',
                    text: error.responseJSON.error || "A problem occurred while trying to get dishes",
                    type: 'error',
                    timeout: 2000,
                    closeWith: ['click']
                });
            });
    };
    DishController.prototype.addDish = function (data) {
        var userId = sessionStorage['userId'];

        var dish = {
            title: data.title,
            description: data.description,
            foregroundImage: data.foregroundImageUploaded,
            thumbnailImage: data.thumbnailImageUploaded,
            ACL : {
                "*": {
                    "read": true
                }
            }
        };

        dish.ACL[userId] = {"write":true,"read":true};

        this._model.addDish(dish)
            .then(function (data) {
                noty({
                    theme: 'relax',
                    text: "Successfully added new dish!",
                    type: 'success',
                    timeout: 2000,
                    closeWith: ['click']
                });
                $.sammy(function () {
                    this.trigger('changePath', '#/dishes/');
                });
            }, function (error) {
                noty({
                    theme: 'relax',
                    text: error.responseJSON.error || "A problem occurred while trying to add a new dish",
                    type: 'error',
                    timeout: 2000,
                    closeWith: ['click']
                });
            });
    };

    DishController.prototype.editDish = function (data) {
        var editDishData = {
            dish: {}
        };
        if (data.title !== '') {
            editDishData.dish.title = data.title;
        }
        if (data.description !== '') {
            editDishData.dish.description = data.description;
        }

        editDishData.id = data.id;

        this._model.editDish(editDishData)
            .then(function (data) {
                noty({
                    theme: 'relax',
                    text: "Successfully edited dish!",
                    type: 'success',
                    timeout: 2000,
                    closeWith: ['click']
                });
                $.sammy(function() {
                    this.trigger('changePath', '#/dishes/');
                })
            }, function (error) {
                noty({
                    theme: 'relax',
                    text: error.responseJSON.error || "A problem occurred while trying to edit your dish",
                    type: 'error',
                    timeout: 2000,
                    closeWith: ['click']
                });
            });
    };

    DishController.prototype.deleteDish = function (dishId) {

        this._model.deleteDish(dishId)
            .then(function (data) {
                noty({
                    theme: 'relax',
                    text: "Successfully deleted dish!",
                    type: 'success',
                    timeout: 2000,
                    closeWith: ['click']
                });
                $.sammy(function() {
                    this.trigger('changePath', '#/dishes/');
                });
            }, function (error) {
                noty({
                    theme: 'relax',
                    text: error.responseJSON.error || "A problem occurred while trying to delete your dish",
                    type: 'error',
                    timeout: 2000,
                    closeWith: ['click']
                });
            });
    };

    function parseInputData(inputData, outputData) {

        inputData.forEach(function (data) {
            var dishes = {
                objectId: data.objectId,
                title: data.title,
                description: data.description,
                thumbnailImage: data.thumbnailImage,
                foregroundImage: data.foregroundImage
            };

            outputData.push(dishes);
        });
    }

    return {
        load: function (model, views, dishesPerPage) {
            return new DishController(model, views, dishesPerPage);
        }
    };
}());