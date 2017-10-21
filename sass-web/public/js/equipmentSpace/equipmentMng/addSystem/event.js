//var majorTypeArr = [{ name: '数学' }, { name: '数学' }, { name: '数学' }];
//var systemTypeArr = [{ name: '系统1' }, { name: '系统' }, { name: '系统' }];
var spaceFloorArr = [{ floor_local_name: '建筑1' }, { floor_local_name: '建筑2' }];
$(function () {
    controllerAddSystem.init();

});
// function showAddSystem() {
//     $("#addSystemDiv").show();
// }
// function hideAddSystem() {
//     $("#addSystemDiv").hide();
//     v.initPage("systemMng");
// }
function editItem(event) {
    var $this = $(event.currentTarget);
    var $contShow = $this.parents(".contShow");
    $contShow.hide();
    $contShow.siblings(".editShow").show();
}
function cancelEdit() {//确认取消编辑
    var $this = $(event.currentTarget);
    var $editShow = $this.parents(".editShow");
    $editShow.hide();
    $editShow.siblings(".contShow").show();
}
function showSystList(event) {
    event.stopPropagation();
    var $sarrow = $(event.currentTarget);
    var $buildTitle = $sarrow.parent(".buildTitle");
    if ($buildTitle.attr('stype') == 'show') { //展开状态
        $buildTitle.siblings(".systemCont").slideUp();
        $sarrow.text('r');
        $buildTitle.attr('stype', 'close');
    } else {
        $buildTitle.siblings(".systemCont").slideDown();
        $sarrow.text('b');
        $buildTitle.attr('stype', 'show');
    }
}
function selMajorType(item) {
    var resArr = v.instance.majorTypeArr.filter(function (ele) {
        return ele.code == item.code;
    });
    if (resArr.length == 0) return;
    var majorObj = resArr.length > 0 ? resArr[0] : {};
    var typeArr = majorObj.content;
    v.instance.systemTypeArr = typeArr;//专业列表
}


