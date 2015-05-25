var app = app || {};

app.infoContentController = (function () {
    function InfoContentController(model, views) {
        this._model = model;
        this._viewBag = views;
    }

    InfoContentController.prototype.showEditInfoContent = function (selector, data) {
        this._viewBag.showEditInfoContentsView(selector, data);
    };

    InfoContentController.prototype.listAllInfoContent = function (selector) {
        var _this = this;

        return this._model.listAllInfoContent()
            .then(function (data) {
                _this._viewBag.showInfoContentsView(selector,data);
            }, function (error) {
                console.log(error);
            })
    };

    InfoContentController.prototype.editInfoContent = function (selector, data) {
        var editInfoContentData = {
            note: {}
        };
        if (data.title !== '') {
            editInfoContentData.note.title = data.title;
        }
        if (data.description !== '') {
            editInfoContentData.note.description = data.description;
        }

        editInfoContentData.id = data.id;

        this._model.editInfoContent(editInfoContentData)
            .then(function (data) {
                noty({
                    theme: 'relax',
                    text: "Successfully edited note!",
                    type: 'success',
                    timeout: 2000,
                    closeWith: ['click']
                });
                $.sammy(function() {
                    this.trigger('changePath', '#/info-contents/');
                })
            }, function (error) {
                noty({
                    theme: 'relax',
                    text: error.responseJSON.error || "A problem occurred while trying to edit your note",
                    type: 'error',
                    timeout: 2000,
                    closeWith: ['click']
                });
            });
    };



    return {
        load: function (model, views) {
            return new InfoContentController(model, views);
        }
    }
}());
