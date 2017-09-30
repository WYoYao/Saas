// 跳转到新增页面
var goProjectManageInsert = function(info) {

    var customer = new projectManageInsertModel.Customer();
    v.initPage('prokestInsert', { Customer: _.assign({}, customer, info) || customer });
    // 跳转到的新增页面
    v.navigatorTo('prokestInsert');

}

// 跳转到查看编辑页面
var goProjectManageUpdate = function(info) {
    // 跳转到的新增页面
    v.initPage('projectUpdate', { customerUpdate: info });
    v.navigatorTo('projectUpdate');
}

// 新增页面 和 查看编辑页面 返回按钮
var projectManageSubmitBack = function() {

    var list = Array.prototype.slice.call($(".project_manage_update_content .vinputupdate_block"));
    list = list.concat(Array.prototype.slice.call($(".project_manage_update_content .ptimetext")))

    var isError = false;
    for (var index = 0; index < list.length; index++) {
        var element = list[index];
        if ($(element).css("display") == 'block') {
            $("#confirmWindow").pshow({ title: '确定要离开此页面吗？', subtitle: '您编辑的信息尚未保存，离开会使内容丢失' });
            isError = true;
            break;
        };
    }

    if (!isError) {
        goProjectManageSubmitBack();
    }

}

var goProjectManageSubmitBack = function() {
    // 返回列表页面
    v.navigatorTo('projectList');
    $("#confirmWindow").phide()
}

function confirmhide() {
    $("#confirmWindow").phide()
}