
var app = app || {};

app.imageController = (function () {
    function ImageController(model) {
        this._model = model;
    }

    ImageController.prototype.UploadImages = function (data, triggerName) {
        var model = this._model;
        var dish = data;
        model.UploadImage(data.thumbnailImage)
            .then(function (imageData) {

                dish.thumbnailImageUploaded =  {
                    __type: "File",
                    name: imageData.name,
                    url: imageData.url
                };

            }).then(function () {
                model.UploadImage(data.foregroundImage)
                    .then(function (imageData) {

                        dish.foregroundImageUploaded =  {
                            __type: "File",
                            name: imageData.name,
                            url: imageData.url
                        };

                    }).then(function () {
                        $.sammy(function () {
                            this.trigger(triggerName, dish);
                        });

                        return false;
                    });
            });
    };

    return {
        load: function (model) {
            return new ImageController(model);
        }
    };
}());