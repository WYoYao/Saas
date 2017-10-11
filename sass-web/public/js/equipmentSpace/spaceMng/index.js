$(function () {
    var instance = spaceInfoModel.instance();
    spaceInfoController.init();
    $("#editSelBox .radioButton").on('click', function (event) {
        var $this = $(event.currentTarget);
        var instance = spaceInfoModel.instance();
        if ($this.hasClass('checked')) {
            return;
        }
        if (instance.editMode == 'modify') {
            instance.editMode = 'change';
        } else {
            instance.editMode = 'modify';
        }
    });
    spceBindClick();

});