$(function () {
    var instance = spaceInfoModel.instance();
    spaceInfoController.init();
    $(".contTreeHead").on('click', function (event) {
        var $this = $(event.currentTarget);
        var $contTreeList = $this.siblings(".contTreeList");
        if ($contTreeList.is(":visible")) {
            $contTreeList.slideUp();
        } else {
            $contTreeList.slideDown();
        }
    });
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
    $("#spaceNavigBar").on('click', '.circle', function (event) {
        var $this = $(event.currentTarget);
        $("#spaceNavigBar .circle").removeClass("sel");
        $this.addClass("sel");
        var stype = $this.attr("stype");
        document.getElementById(stype).scrollIntoView();
    });

});
function scrollFloor() {
    var scrollHeight = document.getElementById("floorContent").scrollHeight;
    var offsetHeight = document.getElementById("floorContent").offsetHeight;
    if (scrollHeight > offsetHeight) {
        $("#floorContent").scrollTop(scrollHeight);
    }
}
function editItem(event) {
    var instance = spaceInfoModel.instance();
    instance.detailEditSign = false;//其他不可以编辑
    instance.editMode = 'modify';//保存方式
    var $this = $(event.currentTarget);
    var $contShow = $this.parents(".contShow");
    $contShow.hide();
    $contShow.siblings(".editShow").show();
    var ftype = $this.parents(".detailItem").attr("ftype");//哪种属性
    if (instance.editFloatName == 'floor') {
        spaceInfoController.editDetailCopy[ftype] = instance.floorDetail[ftype];//备份
        ftype == 'floor_type' && (true, $('#editFloorType').psel(parseInt(instance.floorDetail.floor_type) - 1));//如果是楼层类型

    }
    if (instance.editFloatName == 'space') {
        spaceInfoController.editDetailCopy[ftype] = instance.spaceDetail[ftype];//备份 todo
        ftype == 'room_func_type_name' && (true, spaceInfoController.editDetailCopy['room_func_type'] = instance.spaceDetail['room_func_type']);//空间类型
        ftype == 'tenant_type_name' && (true, spaceInfoController.editDetailCopy['tenant_type'] = instance.spaceDetail['tenant_type']);//租户类型
    }
}
function cancelEdit(event) {
    var $this = $(event.currentTarget);
    $("#quitEditDialog").pshow({ title: "确定退出编辑吗？", subtitle: "取消编辑将不保存当前编辑信息" });//弹出弹出框
    $("#quitEditBut").data('thisObj', $this);
}
function sureEdit(event) {//弹出编辑确认框
    var $this = $(event.currentTarget);
    $("#saveModeSel").pshow();//弹出弹出框
    var instance = spaceInfoModel.instance();
    var ftype = $this.parents(".detailItem").attr("ftype");
    if (instance.editFloatName == 'floor') {//楼层
        spaceInfoController.queryFloorInfoPointHis(ftype);//查询历史信息
    } else {
        spaceInfoController.querySpaceInfoPointHis(ftype);
    }
    $("#sureEditBut").data('thisObj', $this);
}
function infoEditSure() {//ftype来自于哪里啊
    var instance = spaceInfoModel.instance();
    $("#saveModeSel").phide();//弹出弹出框
    //保存数据
    var $thisObj = $("#sureEditBut").data('thisObj');
    var ftype = $thisObj.parents(".detailItem").attr("ftype");
    if (spaceInfoController.editDetailCopy[ftype] == (instance.editFloatName == 'floor' ? instance.floorDetail[ftype] : instance.spaceDetail[ftype])) {
        $("#spaceNoticeWarn").pshow({ text: "没有修改！", state: "failure" });
        return;
    }
    function call() {//编辑状态隐藏
        var $editShow = $thisObj.parents(".editShow");
        $editShow.hide();
        $editShow.siblings(".contShow").show();
    }
    if (instance.editFloatName == 'floor') {
        var fvalue = instance.floorDetail[ftype];
        if (ftype == 'floor_local_name') {//如果是楼层名字
            function floorCall() {
                spaceInfoController.updateFloorInfo(ftype, fvalue, call);//编辑接口
            }
            spaceInfoController.verifyFloorName(floorCall);//判断名字是否可用
            return;
        }
        spaceInfoController.updateFloorInfo(ftype, fvalue, call);//编辑接口
    }
    if (instance.editFloatName == 'space') {
        ftype == 'room_func_type_name' && (true, ftype = 'room_func_type');//空间类型
        ftype == 'tenant_type_name' && (true, ftype = 'tenant_type');//租户类型
        var fvalue = instance.spaceDetail[ftype];
        if (ftype == 'room_local_name') {//如果是名字
            function spaceCall() {
                spaceInfoController.updateSpaceInfo(ftype, fvalue, call);//编辑接口
            }
            spaceInfoController.verifySpaceName(spaceCall);//判断名字是否可用
            return;
        }
        spaceInfoController.updateSpaceInfo(ftype, fvalue, call);//编辑接口
    }
}
function infoEditCancle() {
    $("#saveModeSel").phide();//弹出弹出框
}
function quitEditSure() {//确认取消编辑
    $("#quitEditDialog").phide();
    var $thisObj = $("#quitEditBut").data('thisObj');
    var instance = spaceInfoModel.instance();
    instance.detailEditSign = true;
    var $editShow = $thisObj.parents(".editShow");
    $editShow.hide();
    $editShow.siblings(".contShow").show();
    var ftype = $thisObj.parents(".detailItem").attr("ftype");//哪种属性
    if (instance.editFloatName == 'floor') {
        Vue.set(instance.floorDetail, ftype, spaceInfoController.editDetailCopy[ftype]);//还原
    }
    if (instance.editFloatName == 'space') {
        ftype == 'room_func_type_name' && (true, Vue.set(instance.spaceDetail, 'room_func_type', spaceInfoController.editDetailCopy['room_func_type']));//空间类型
        ftype == 'tenant_type_name' && (true, Vue.set(instance.spaceDetail, 'tenant_type', spaceInfoController.editDetailCopy['tenant_type']));//空间类型
        Vue.set(instance.spaceDetail, ftype, spaceInfoController.editDetailCopy[ftype]);//还原
    }
}
function quiteEditCancle() {
    $("#quitEditDialog").phide();
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
    var instance = spaceInfoModel.instance();
    $("#removeSpace").show();
    spaceInfoController.queryDestroyedSpace();
    instance.removeShowSign = true;
}
function removeSpaceHide(event) {
    var instance = spaceInfoModel.instance();
    $("#removeSpace").hide();
    instance.removeShowSign = false;
}
function addFloorShow(event, param) {//添加楼层页面显示
    var instance = spaceInfoModel.instance();
    instance.floorDetail = new floorObj();
    spaceInfoController.addFloorSign = param;
    $("#addFloorDiv").show();
    $("#addFloorDiv [floortype='nameInput']").precover();//恢复默认  
    $("#addFloorDiv [floortype='idInput']").precover();//恢复默认  
    $("#addFloorDiv [floortype='typeDrop']").precover();//恢复默认  
}
function saveAddFloor() {
    var instance = spaceInfoModel.instance();
    var floorDetail = instance.floorDetail;
    if (spaceInfoController.addFloorSign == 'up') {
        var upSequence = instance.allFloorInfo.length == 0 ? -1 : instance.allFloorInfo[0].floor_sequence_id;
        var thisSequence = parseInt(upSequence) + 1;
    }
    if (spaceInfoController.addFloorSign == 'down') {
        var downSequence = instance.allFloorInfo.length == 0 ? 0 : instance.allFloorInfo[instance.allFloorInfo.length - 1].floor_sequence_id;
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
function buildLiSel(item) {//建筑的点击事件 首页
    var instance = spaceInfoModel.instance();
    instance.selBuild = item;
    spaceInfoController.queryFloorWithOrder('floor', item);//重新去查询
    spaceInfoController.querySpaceWithGroup();
    instance.floorShowTitle = '建筑下的全部空间';
}
function spaceBuildSel(item) {//空间中的建筑选择
    var instance = spaceInfoModel.instance();
    spaceInfoController.queryFloorWithOrder('space', item);//根据建筑查询楼层
    instance.spaceDetail.build_id = item.obj_id;//选中的建筑id
    instance.spaceDetail.build_local_name = item.obj_name;//选中的建筑名字
    //建筑选择后需要清空楼层
    $("#spaceFloorDrop").precover('请选择楼层');
    instance.spaceDetail.floor_id = '';//选中的楼层id
    instance.spaceDetail.floor_local_name = '';//选中的楼层id
}

function checkAllFloor(event) {//查看右侧所有楼层空间
    var instance = spaceInfoModel.instance();
    instance.floorShowTitle = '建筑下的全部空间';
    instance.allFloorInfo.forEach(function (ele) {
        ele.ischeck = false;
    });
    spaceInfoController.querySpaceWithGroup();

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
function verifyDestroy() {//是否可以拆除
    spaceInfoController.verifyDestroySpace();
}
function destroySure() {//拆除空间
    spaceInfoController.destroySpace();
}
function destroyCancle() {
    $("#desSpaceDialog").phide();
}

var floorTypeArr = [{ name: '普通楼层' }, { name: '中庭' }, { name: '室外' }, { name: '其他' }];
var buildArr = [{ name: '建筑1' }, { name: '建筑2' }, { name: '建筑3' }];
var floorArr = [{ name: '楼层1' }, { name: '楼层2' }, { name: '楼层3' }];
var funcArr = [{ name: '功能1' }, { name: '功能2' }, { name: '功能3' }];
var leaseTypeArr = [{ name: '租赁业态类型1' }, { name: '租赁业态类型2' }, { name: '租赁业态类型3' }];
