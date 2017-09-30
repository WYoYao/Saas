$(function () {
    var instance = spaceInfoModel.instance();
    spaceInfoController.init();

});

function editItem(event) {
    var instance = spaceInfoModel.instance();
    instance.detailEditSign = false;//其他不可以编辑
    var $this = $(event.currentTarget);
    var $contShow = $this.parents(".contShow");
    $contShow.hide();
    $contShow.siblings(".editShow").show();
    var ftype = $this.parents(".detailItem").attr("ftype");//哪种属性
    spaceInfoController.editDetailCopy[ftype] = instance.floorDetail[ftype];//备份
    if (ftype == 'floor_type') {//如果是楼层类型
        $('#editFloorType').psel(parseInt(instance.floorDetail.floor_type) - 1);
    }
}
function cancelEdit(event) {
    var $this = $(event.currentTarget);
    var instance = spaceInfoModel.instance();
    instance.detailEditSign = true;
    var $editShow = $(event.currentTarget).parents(".editShow");
    $editShow.hide();
    $editShow.siblings(".contShow").show();
    var ftype = $this.parents(".detailItem").attr("ftype");//哪种属性
    //instance.floorDetail[ftype] = spaceInfoController.editDetailCopy[ftype];//还原
    Vue.set(instance.floorDetail, ftype, spaceInfoController.editDetailCopy[ftype]);//还原
}
function sureEdit(event) {//保存编辑
    var $this = $(event.currentTarget);
    var instance = spaceInfoModel.instance();
    var ftype = $this.parents(".detailItem").attr("ftype");
    var fvalue = instance.floorDetail[ftype];
    if (ftype == 'floor_local_name') {//如果是楼层名字
        function callback() {
            spaceInfoController.updateFloorInfo(ftype, fvalue);//编辑接口
        }
        spaceInfoController.verifyFloorName(callback);//判断名字是否可用
        return;
    }
    spaceInfoController.updateFloorInfo(ftype, fvalue);//编辑接口
}

function showWarnSet() {
    $("#spaceWarnSet").pshow();
}
function sureWarnSet() {
    $("#spaceWarnSet").phide();
    spaceInfoController.saveSpaceRemindConfig();
}
function cancelWarnSet() {
    var instance = spaceInfoModel.instance();
    $("#spaceWarnSet").phide();
    instance.spaceRemind = JSON.parse(JSON.stringify(instance.spaceRemindCopy));

}
function checkRemoveSpace(event) {//查看已经拆除的空间
    $("#removeSpace").show();
    spaceInfoController.queryDestroyedSpace();
}
function removeSpaceHide(event) {
    $("#removeSpace").hide();
}
function addFloorShow(event, param) {//添加楼层页面显示
    var instance = spaceInfoModel.instance();
    instance.floorDetail = new floorObj();
    spaceInfoController.addFloorSign = param;
    $("#addFloorDiv").show();
    $("#addFloorType").precover();
}
function saveAddFloor() {
    var instance = spaceInfoModel.instance();
    var floorDetail = instance.floorDetail;
    if (spaceInfoController.addFloorSign == 'up') {
        var upSequence = instance.allFloorInfo[0].floor_sequence_id;
        var thisSequence = parseInt(upSequence) + 1;
    }
    if (spaceInfoController.addFloorSign == 'down') {
        var downSequence = instance.allFloorInfo[instance.allFloorInfo.length - 1].floor_sequence_id;
        var thisSequence = parseInt(downSequence) - 1;
    }
    floorDetail.floor_sequence_id = thisSequence;

    if (!floorDetail.floor_local_name.ptrimHeadTail()) {
        $("#spaceNoticeWarn").pshow({ text: "楼层名称不能为空！", state: "failure" });
        return;
    }
    if (!floorDetail.floor_local_id.ptrimHeadTail()) {
        $("#spaceNoticeWarn").pshow({ text: "楼层编码不能为空！", state: "failure" });
        return;
    }

    //验证是有重复
    spaceInfoController.fnameRepeat = true;
    spaceInfoController.fidRepeat = true;
    spaceInfoController.fbimRepeat = true;
    spaceInfoController.fverifyNum = 0;
    spaceInfoController.verifyFloorBimId('add');
    spaceInfoController.verifyFloorLocalId('add');
    spaceInfoController.verifyFloorName('add');

}
function floorTypeSel(event) {//请选择楼层性质
    var instance = spaceInfoModel.instance();
    var thisIndex = event.pEventAttr.index;
    instance.floorDetail.floor_type = parseInt(thisIndex) + 1;
}
function addFloorHide(event) {
    $("#addFloorDiv").hide();
}
function addSpaceShow(event) {
    var instance = spaceInfoModel.instance();
    $("#addSpaceDiv").show();
    instance.spaceDetail = new spaceObj();
    $("#spaceBuildDrop").precover('请选择建筑');
    $("#spaceFloorDrop").precover('请选择楼层');
}
function addSpaceHide(event) {
    $("#addSpaceDiv").hide();
}
function buildLiSel(item) {//建筑的点击事件
    var instance = spaceInfoModel.instance();
    instance.selBuild = item;
    spaceInfoController.queryFloorWithOrder('floor', item);//重新去查询
    spaceInfoController.querySpaceWithGroup();
    spaceInfoController.querySpaceRemindConfig();
    instance.floorShowTitle = '建筑下的全部空间';;
}
function spaceBuildSel(item) {//空间中的建筑选择
    var instance = spaceInfoModel.instance();
    spaceInfoController.queryFloorWithOrder('space', item);//根据建筑查询楼层
    instance.spaceDetail.build_id = item.obj_id;//选中的建筑id
    instance.spaceDetail.build_local_name = item.obj_name;//选中的建筑名字
}

function checkAllFloor(event) {//查看右侧所有楼层空间
    var instance = spaceInfoModel.instance();
    instance.floorShowTitle = '建筑下的全部空间';
    instance.allFloorInfo.forEach(function (ele) {
        ele.ischeck = false;
    });
}
function spaceFloorSel(item) {//空间中的楼层选择
    var instance = spaceInfoModel.instance();
    instance.spaceDetail.floor_id = item.floor_id;//选中的楼层id
    instance.spaceDetail.floor_local_name = item.floor_local_name;//选中的楼层id
}

function saveAddSpace() {
    var instance = spaceInfoModel.instance();
    var spaceDetail = instance.spaceDetail;

    if (!spaceDetail.build_id) {
        $("#spaceNoticeWarn").pshow({ text: "所属建筑不能为空！", state: "failure" });
        return;
    }
    if (!spaceDetail.room_local_name.ptrimHeadTail()) {
        $("#spaceNoticeWarn").pshow({ text: "空间名称不能为空！", state: "failure" });
        return;
    }
    if (!spaceDetail.room_local_id.ptrimHeadTail()) {
        $("#spaceNoticeWarn").pshow({ text: "空间编号不能为空！", state: "failure" });
        return;
    }
    //验证是有重复
    spaceInfoController.snameRepeat = true;
    spaceInfoController.sidRepeat = true;
    spaceInfoController.sbimRepeat = true;
    spaceInfoController.sverifyNum = 0;
    spaceInfoController.verifySpaceName('add');
    spaceInfoController.verifySpaceLocalId('add');
    spaceInfoController.verifySpaceBimId('add');

}

var floorTypeArr = [{ name: '普通楼层' }, { name: '中庭' }, { name: '室外' }, { name: '其他' }];
var buildArr = [{ name: '建筑1' }, { name: '建筑2' }, { name: '建筑3' }];
var floorArr = [{ name: '楼层1' }, { name: '楼层2' }, { name: '楼层3' }];
var funcArr = [{ name: '功能1' }, { name: '功能2' }, { name: '功能3' }];
var leaseTypeArr = [{ name: '租赁业态类型1' }, { name: '租赁业态类型2' }, { name: '租赁业态类型3' }];
