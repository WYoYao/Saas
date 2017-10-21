function spaceInfoController() {
}

spaceInfoController.init = function () {
    spaceInfoController.queryBuild();
    spaceInfoController.queryAllSpaceCode();//查询空能类型
    spaceInfoController.queryAllRentalCode();
    spaceInfoController.querySpaceRemindConfig();//查询空间提醒设置

}
spaceInfoController.addFloorSign = 'up';
spaceInfoController.editDetailCopy = {};
spaceInfoController.editSpaceDetail = {};
spaceInfoController.queryBuild = function () { //查询建筑体
    var instance = spaceInfoController.systemModelObj || spaceInfoModel.instance();
    $("#globalloading").pshow();
    pajax.post({
        url: 'restObjectService/queryBuild',
        data: {
            //user_id: 'RY1505218031651', //用户id
            //project_id: 'Pj1301020001', //项目id
        },
        success: function (res) {
            data = res.data || [];
            if (data.length == 0) { $("#globalloading").phide(); }
            instance.allBuild = data;
            setTimeout(function () {
                $("#buildDropDown").psel(0);
            }, 0);

        },
        error: function (errObj) {
            $("#globalloading").phide();
            console.error('queryBuild err');
        },
        complete: function () {
        }
    });
}
spaceInfoController.queryFloorWithOrder = function (sign, buildItem) { //查询某建筑下楼层信息
    var instance = spaceInfoController.systemModelObj || spaceInfoModel.instance();
    if (sign == 'floor') {
        $("#globalloading").pshow();
    }
    pajax.post({
        url: 'restFloorService/queryFloorWithOrder',
        data: {
            //user_id: 'RY1505218031651', //用户id
            //project_id: 'Pj1301020001', //项目id
            build_id: buildItem.obj_id
        },
        success: function (res) {
            data = res.data || [];
            if (sign == 'floor') {
                instance.allFloorInfo = data;
                var hasNull = false;
                var lastSequence = 0;
                for (var i = 0; i < instance.allFloorInfo.length; i++) {//顺序码可能是null的情况
                    var thisFloor = instance.allFloorInfo[i];
                    if (thisFloor.floor_sequence_id === 0 || !!thisFloor.floor_sequence_id) {//如果顺序码不是空
                        lastSequence = thisFloor.floor_sequence_id;
                        continue;
                    }
                    hasNull = true;
                    thisFloor.floor_sequence_id = lastSequence - 1;
                    lastSequence = lastSequence - 1;
                }
                if (hasNull) {
                    spaceInfoController.updateFloorOrder();
                } else {
                    $("#globalloading").phide();
                }
                setTimeout(function () {
                    scrollFloor();
                }, 0);
            } else {//空间里面的楼层数据
                instance.spaceFloorArr = data;
            }
        },
        error: function (errObj) {
            console.error('queryFloorWithOrder err');
            $("#globalloading").phide();
        },
        complete: function () {
        }
    });
}
spaceInfoController.queryFloorById = function (fitem) { //根据id查询楼层详细信息
    var instance = spaceInfoModel.instance();
    pajax.post({
        url: 'restFloorService/queryFloorById',
        data: {
            //user_id: 'RY1505218031651', //用户id
            //project_id: 'Pj1301020001', //项目id
            floor_id: fitem.floor_id
        },
        success: function (res) {
            data = res || {};
            instance.floorDetail = data;
        },
        error: function (errObj) {
            console.error('queryFloorById err');
        },
        complete: function () {

        }
    });
}
spaceInfoController.fnameRepeat = true;
spaceInfoController.fidRepeat = true;
spaceInfoController.fbimRepeat = true;
spaceInfoController.fverifyNum = 0;
spaceInfoController.verifyFloorName = function (param) { //新增页/编辑页:验证楼层名称是否可以使用
    if (param == 'add') { $("#globalloading").pshow(); }
    var instance = spaceInfoModel.instance();
    pajax.update({
        url: 'restFloorService/verifyFloorName',
        data: {
            //user_id: 'RY1505218031651', //用户id
            //project_id: 'Pj1301020001', //项目id
            build_id: instance.selBuild.obj_id,
            floor_id: param == 'add' ? null : instance.floorDetail.floor_id,             //楼层id，编辑时必须
            floor_local_name: instance.floorDetail.floor_local_name,           //楼层本地名称，必须
        },
        success: function (res) {
            var canUse = ((res || [])[0] || {}).can_use;
            if (canUse) {
                spaceInfoController.fnameRepeat = false;
                if (typeof param == "function") {//编辑
                    param();
                }
            } else {
                if (typeof param == "function") {//编辑
                    $("#globalnotice").pshow({ text: "楼层名称不可以使用！", state: "failure" });
                }
            }
        },
        error: function (errObj) {
            console.error('verifyFloorName err');
        },
        complete: function () {
            if (param == 'add') {
                spaceInfoController.fverifyNum++;
                spaceInfoController.canSaveAddFloor();
            }
        }
    });
}
spaceInfoController.verifyFloorLocalId = function (param) { //新增页/编辑页:验证楼层编码是否可以使用
    var instance = spaceInfoModel.instance();
    pajax.update({
        url: 'restFloorService/verifyFloorLocalId',
        data: {
            //user_id: 'RY1505218031651', //用户id
            //project_id: 'Pj1301020001', //项目id
            floor_id: param == 'add' ? null : instance.floorDetail.floor_id,             //楼层id，编辑时必须
            floor_local_id: instance.floorDetail.floor_local_id,
        },
        success: function (res) {
            var canUse = ((res || [])[0] || {}).can_use;
            if (canUse) {
                spaceInfoController.fidRepeat = false;
            }
        },
        error: function (errObj) {
            console.error('verifyFloorLocalId err');
        },
        complete: function () {
            spaceInfoController.fverifyNum++;
            spaceInfoController.canSaveAddFloor();
        }
    });
}
spaceInfoController.verifyFloorBimId = function (param) { //新增页/编辑页:验证楼层BIM编码是否可以使用
    var instance = spaceInfoModel.instance();
    pajax.update({
        url: 'restFloorService/verifyFloorBimId',
        data: {
            //user_id: 'RY1505218031651', //用户id
            //project_id: 'Pj1301020001', //项目id
            floor_id: param == 'add' ? null : instance.floorDetail.floor_id,             //楼层id，编辑时必须
            BIMID: instance.floorDetail.BIMID,
        },
        success: function (res) {
            var canUse = ((res || [])[0] || {}).can_use;
            if (canUse) {
                spaceInfoController.fbimRepeat = false;
            }
        },
        error: function (errObj) {
            console.error('verifyFloorBimId err');
        },
        complete: function () {
            spaceInfoController.fverifyNum++;
            spaceInfoController.canSaveAddFloor();
        }
    });
}
spaceInfoController.canSaveAddFloor = function () {//是否可以保存
    if (spaceInfoController.fverifyNum < 3) {
        return
    }
    if (spaceInfoController.fnameRepeat) {//如果是服务断了呢
        $("#globalloading").phide();
        $("#globalnotice").pshow({ text: "楼层名称不可以使用！", state: "failure" });
        return;
    }
    if (spaceInfoController.fidRepeat) {
        $("#globalloading").phide();
        $("#globalnotice").pshow({ text: "楼层编码不可以使用！", state: "failure" });
        return;
    }
    if (spaceInfoController.fbimRepeat) {
        $("#globalloading").phide();
        $("#globalnotice").pshow({ text: "楼层BIM编码不可以使用！", state: "failure" });
        return;
    }
    spaceInfoController.addFloor();//保存楼层
}
spaceInfoController.addFloor = function () { //添加楼层信息
    $("#globalloading").pshow();
    var instance = spaceInfoModel.instance();
    var params = {
        //user_id: 'RY1505218031651', //用户id
        //project_id: 'Pj1301020001', //项目id
        build_id: instance.selBuild.obj_id
    }
    params = $.extend({}, params, instance.floorDetail);
    pajax.update({
        url: 'restFloorService/addFloor',
        data: params,
        success: function (res) {
            $("#addFloorDiv").hide();
            spaceInfoController.queryFloorWithOrder('floor', instance.selBuild);
            $("#globalnotice").pshow({ text: "添加楼层成功！", state: "success" });
        },
        error: function (errObj) {
            $("#globalnotice").pshow({ text: "添加楼层失败！", state: "failure" });
            $("#globalloading").phide();
            console.error('addFloor err');
        },
        complete: function () {

        }
    });
}
spaceInfoController.updateFloorInfo = function (ftype, fvalue, cb) { //编辑楼层信息
    var instance = spaceInfoModel.instance();
    var timeObj = $("#editTimeBox").psel().startTime;
    var timeString = timeObj.replace(/-/g, '') + '000000';
    pajax.update({
        url: 'restFloorService/updateFloorInfo',
        data: {
            floor_id: instance.floorDetail.floor_id,       	            //楼层id，必须
            info_point_code: ftype,   //修改的信息点编码，必须
            info_point_value: fvalue,                //修改的信息点的值，必须
            valid_time: instance.editMode == 'modify' ? null : timeString,
        },
        success: function (res) {
            instance.detailEditSign = true;
            if (typeof cb == 'function') {
                cb();
                $("#globalnotice").pshow({ text: "修改信息成功！", state: "success" });
            }
        },
        error: function (errObj) {
            console.error('updateFloorInfo err');
            $("#globalnotice").pshow({ text: "修改信息失败！", state: "failure" });
            Vue.set(instance.floorDetail, ftype, spaceInfoController.editDetailCopy[ftype]);//还原
        },
        complete: function () {

        }
    });
}
spaceInfoController.updateFloorOrder = function () { //更改楼层顺序
    $("#globalloading").pshow();
    var instance = spaceInfoModel.instance();
    var floorArr = [];
    instance.allFloorInfo.forEach(function (ele) {
        floorArr.push({
            floor_id: ele.floor_id,
            floor_sequence_id: ele.floor_sequence_id.toString()
        });
    });
    pajax.update({
        url: 'restFloorService/updateFloorOrder',
        data: {
            //user_id: 'RY1505218031651', //用户id
            //project_id: 'Pj1301020001', //项目id
            floors: floorArr,
        },
        success: function (res) {
        },
        error: function (errObj) {
            console.error('updateFloorOrder err');
        },
        complete: function () {
            $("#globalloading").phide();
        }
    });
}
spaceInfoController.querySpaceWithGroup = function () { //查询某建筑下空间信息
    var instance = spaceInfoModel.instance();
    $("#globalloading").pshow();
    pajax.post({
        url: 'restSpaceService/querySpaceWithGroup',
        data: {
            //user_id: 'RY1505218031651', //用户id
            //project_id: 'Pj1301020001', //项目id
            build_id: instance.selBuild.obj_id,
        },
        success: function (res) {
            data = res.data || [];
            instance.allSpace = data;
        },
        error: function (errObj) {
            console.error('querySpaceWithGroup err');
        },
        complete: function () {
            $("#globalloading").phide();
        }
    });
}
spaceInfoController.querySpaceForFloor = function () { //查询某楼层下空间信息
    var instance = spaceInfoModel.instance();
    $("#globalloading").pshow();
    pajax.post({
        url: 'restSpaceService/querySpaceForFloor',
        data: {
            //user_id: 'RY1505218031651', //用户id
            //project_id: 'Pj1301020001', //项目id
            floor_id: instance.selFloorItem.floor_id
        },
        success: function (res) {
            data = res.data || [];
            instance.floorSpace = data;
        },
        error: function (errObj) {
            console.error('querySpaceForFloor err');
        },
        complete: function () {
            $("#globalloading").phide();
        }
    });
}
spaceInfoController.queryDestroyedSpace = function () { //查询某建筑下已拆除的空间信息
    var instance = spaceInfoModel.instance();
    $("#globalloading").pshow();
    pajax.post({
        url: 'restSpaceService/queryDestroyedSpace',
        data: {
            //user_id: 'RY1505218031651', //用户id
            //project_id: 'Pj1301020001', //项目id
            build_id: instance.selBuild.obj_id,
        },
        success: function (res) {
            data = res.data || [];
            instance.desFloorSpace = data;
        },
        error: function (errObj) {
            console.error('queryDestroyedSpace err');
        },
        complete: function () {
            $("#globalloading").phide();
        }
    });
}
spaceInfoController.querySpaceRemindConfig = function () { //查询空间提醒设置
    var instance = spaceInfoModel.instance();
    pajax.post({
        url: 'restSpaceService/querySpaceRemindConfig',
        data: {
            //user_id: 'RY1505218031651', //用户id
            //project_id: 'Pj1301020001', //项目id
            person_id: 'RY1503886428173'
        },
        success: function (res) {
            data = res.data || [];
            instance.spaceRemind = data;
            instance.spaceRemindCopy = JSON.parse(JSON.stringify(instance.spaceRemind));
        },
        error: function (errObj) {
            console.error('querySpaceRemindConfig err');
        },
        complete: function () {

        }
    });
}
spaceInfoController.saveSpaceRemindConfig = function () { //保存空间提醒设置
    var instance = spaceInfoModel.instance();
    var remind_order_types = [];
    instance.spaceRemind.forEach(function (ele) {//这样可以吗
        if (ele.is_remind) {
            remind_order_types.push(ele.code);
        }
    });
    pajax.update({
        url: 'restSpaceService/saveSpaceRemindConfig',
        data: {
            //user_id: 'RY1505218031651', //用户id
            //project_id: 'Pj1301020001', //项目id
            //person_id: 'RY1503886428173',
            remind_order_types: remind_order_types //选择的需要提醒的工单类型 
        },
        success: function (res) {
            $("#globalnotice").pshow({ text: "设置空间提醒成功！", state: "success" });
            spaceInfoController.querySpaceRemindConfig();//重新获取一次
            if (instance.floorShowTitle == '建筑下的全部空间') {//重新获取空间
                spaceInfoController.querySpaceWithGroup();
            } else {
                spaceInfoController.querySpaceForFloor();
            }
        },
        error: function (errObj) {
            $("#globalnotice").pshow({ text: "设置空间提醒失败！", state: "failure" });
            instance.spaceRemind = JSON.parse(JSON.stringify(instance.spaceRemindCopy));
            console.error('saveSpaceRemindConfig err');
        },
        complete: function () {

        }
    });
}
spaceInfoController.queryAllSpaceCode = function () { //查询空间功能类型
    var instance = spaceInfoController.systemModelObj || spaceInfoModel.instance();
    pajax.post({
        url: 'restDictService/queryAllSpaceCode',
        data: {},
        success: function (res) {
            data = res.data || [];
            instance.allSpaceCode = data;
        },
        error: function (errObj) {
            console.error('queryAllSpaceCode err');
        },
        complete: function () {

        }
    });
}
spaceInfoController.queryAllRentalCode = function () { //查询租赁业态类型
    var instance = spaceInfoController.systemModelObj || spaceInfoModel.instance();
    pajax.post({
        url: 'restDictService/queryAllRentalCode',
        data: {},
        success: function (res) {
            data = res.data || [];
            instance.allRentalCode = data;
        },
        error: function (errObj) {
            console.error('queryAllRentalCode err');
        },
        complete: function () {

        }
    });
}
spaceInfoController.queryFloorInfoPointHis = function (infoCode) { //查询楼层信息点的历史信息
    var instance = spaceInfoModel.instance();
    pajax.post({
        url: 'restFloorService/queryFloorInfoPointHis',
        data: {
            //user_id: 'RY1505218031651', //用户id
            //project_id: 'Pj1301020001', //项目id
            floor_id: instance.floorDetail.floor_id,                 //空间id，必须
            info_point_code: infoCode           //信息点编码 ,即字段的英文标识，必须
        },
        success: function (res) {
            data = res.data || [];
            instance.infoPointHis = data;
        },
        error: function (errObj) {
            console.error('queryFloorInfoPointHis err');
        },
        complete: function () {

        }
    });
}
spaceInfoController.querySpaceInfoPointHis = function (infoCode) { //查询空间信息点的历史信息
    var instance = spaceInfoModel.instance();
    pajax.post({
        url: 'restSpaceService/querySpaceInfoPointHis',
        data: {
            //user_id: 'RY1505218031651', //用户id
            //project_id: 'Pj1301020001', //项目id
            space_id: instance.spaceDetail.space_id,                 //空间id，必须
            info_point_code: infoCode           //信息点编码 ,即字段的英文标识，必须
        },
        success: function (res) {
            data = res.data || [];
            instance.infoPointHis = data;
        },
        error: function (errObj) {
            console.error('querySpaceInfoPointHis err');
        },
        complete: function () {

        }
    });
}
spaceInfoController.snameRepeat = true;
spaceInfoController.sidRepeat = true;
spaceInfoController.sbimRepeat = true;
spaceInfoController.sverifyNum = 0;
spaceInfoController.systemModelObj = null;
spaceInfoController.verifySpaceName = function (param) { //新增页/编辑页:验证空间名称是否可以使用
    if (param == 'add') { $("#globalloading").pshow(); }
    var instance = spaceInfoController.systemModelObj || spaceInfoModel.instance();
    pajax.update({
        url: 'restSpaceService/verifySpaceName',
        data: {
            build_id: instance.spaceDetail.build_id,
            space_id: param == 'add' ? null : instance.spaceDetail.space_id,             //空间id，编辑时必须
            room_local_name: instance.spaceDetail.room_local_name,           //空间名称，必须
        },
        success: function (res) {
            var canUse = ((res || [])[0] || {}).can_use;
            if (canUse) {
                spaceInfoController.snameRepeat = false;
                if (typeof param == "function") {//编辑
                    param();
                }
            } else {
                if (typeof param == "function") {//编辑
                    $("#globalnotice").pshow({ text: "空间名称不可以使用！", state: "failure" });
                }
            }
        },
        error: function (errObj) {
            console.error('verifySpaceName err');
        },
        complete: function () {
            if (param == 'add') {
                spaceInfoController.sverifyNum++;
                spaceInfoController.canSaveAddSpace();
            }
        }
    });
}
spaceInfoController.verifySpaceLocalId = function (param) { //新增页/编辑页:验证空间编码是否可以使用
    var instance = spaceInfoController.systemModelObj || spaceInfoModel.instance();
    pajax.update({
        url: 'restSpaceService/verifySpaceLocalId',
        data: {
            //user_id: 'RY1505218031651', //用户id
            //project_id: 'Pj1301020001', //项目id
            space_id: param == 'add' ? null : instance.spaceDetail.space_id,             //空间id，编辑时必须
            room_local_id: instance.spaceDetail.room_local_id,           //空间编码，必须
        },
        success: function (res) {
            var canUse = ((res || [])[0] || {}).can_use;
            if (canUse) {
                spaceInfoController.sidRepeat = false;
            }
        },
        error: function (errObj) {
            console.error('verifySpaceLocalId err');
        },
        complete: function () {
            spaceInfoController.sverifyNum++;
            spaceInfoController.canSaveAddSpace();
        }
    });
}
spaceInfoController.verifySpaceBimId = function (param) { //新增页/编辑页:验证空间BIM编码是否可以使用
    var instance = spaceInfoController.systemModelObj || spaceInfoModel.instance();
    pajax.update({
        url: 'restSpaceService/verifySpaceBimId',
        data: {
            //user_id: 'RY1505218031651', //用户id
            //project_id: 'Pj1301020001', //项目id
            space_id: param == 'add' ? null : instance.spaceDetail.space_id,             //空间id，编辑时必须
            BIMID: instance.spaceDetail.BIMID,          //空间BIM编码，必须
        },
        success: function (res) {
            var canUse = ((res || [])[0] || {}).can_use;
            if (canUse) {
                spaceInfoController.sbimRepeat = false;
            }
        },
        error: function (errObj) {
            console.error('verifySpaceBimId err');
        },
        complete: function () {
            spaceInfoController.sverifyNum++;
            spaceInfoController.canSaveAddSpace();
        }
    });
}
spaceInfoController.canSaveAddSpace = function () {//是否可以保存
    if (spaceInfoController.sverifyNum < 3) {
        return
    }
    if (spaceInfoController.snameRepeat) {//如果是服务断了呢
        $("#globalloading").phide();
        $("#globalnotice").pshow({ text: "空间名称不可以使用！", state: "failure" });
        return;
    }
    if (spaceInfoController.sidRepeat) {
        $("#globalloading").phide();
        $("#globalnotice").pshow({ text: "空间编码不可以使用！", state: "failure" });
        return;
    }
    if (spaceInfoController.sbimRepeat) {
        $("#globalloading").phide();
        $("#globalnotice").pshow({ text: "空间BIM编码不可以使用！", state: "failure" });
        return;
    }
    spaceInfoController.addSpace();//保存楼层
}
spaceInfoController.addSpace = function () { //添加空间信息
    $("#globalloading").pshow();
    var instance = spaceInfoController.systemModelObj || spaceInfoModel.instance();
    var params = {
        //user_id: 'RY1505218031651', //用户id
        //project_id: 'Pj1301020001', //项目id
    }
    params = $.extend({}, params, instance.spaceDetail)
    pajax.update({
        url: 'restSpaceService/addSpace',
        data: params,
        success: function (res) {
            //$("#addSpaceDiv").hide();
            instance.showPage = '';
            $("#globalnotice").pshow({ text: "添加空间成功！", state: "success" });
            if (spaceInfoController.systemModelObj) {
                $("#globalloading").phide();
                return;
            }
            if (instance.floorShowTitle == '建筑下的全部空间') {
                spaceInfoController.querySpaceWithGroup();
            } else {
                spaceInfoController.querySpaceForFloor();
            }
        },
        error: function (errObj) {
            $("#globalnotice").pshow({ text: "添加空间失败！", state: "failure" });
            $("#globalloading").phide();
            console.error('addSpace err');
        },
        complete: function () {

        }
    });
}
spaceInfoController.querySpaceById = function (sitem) { //根据id查询空间详细信息
    var instance = spaceInfoModel.instance();
    pajax.post({
        url: 'restSpaceService/querySpaceById',
        data: {
            //user_id: 'RY1505218031651', //用户id
            //project_id: 'Pj1301020001', //项目id
            space_id: sitem.space_id
        },
        success: function (res) {
            data = res || {};
            instance.spaceDetail = data;
        },
        error: function (errObj) {
            console.error('querySpaceById err');
        },
        complete: function () {

        }
    });
}
spaceInfoController.verifyDestroySpace = function () { //验证空间是否可以拆除
    var instance = spaceInfoModel.instance();
    pajax.update({
        url: 'restSpaceService/verifyDestroySpace',
        data: {
            //user_id: 'RY1505218031651', //用户id
            //project_id: 'Pj1301020001', //项目id
            space_id: instance.spaceDetail.space_id,             //空间id，
        },
        success: function (res) {
            var canDestroy = ((res || [])[0] || {}).can_destroy;
            var remind = ((res || [])[0] || {}).remind;
            if (canDestroy) {
                $("#desSpaceDialog").pshow({ title: "您确定要作废该空间吗？", subtitle: "作废后，您只能在“已拆除空间”页面查看到它的详情" });
            } else {
                $("#globalnotice").pshow({ text: remind, state: "failure" });
            }
        },
        error: function (errObj) {
            console.error('verifyDestroySpace err');
        },
        complete: function () {

        }
    });
}
spaceInfoController.destroySpace = function () { //拆除空间
    var instance = spaceInfoModel.instance();
    pajax.update({
        url: 'restSpaceService/destroySpace',
        data: {
            //user_id: 'RY1505218031651', //用户id
            //project_id: 'Pj1301020001', //项目id
            space_id: instance.spaceDetail.space_id,            //空间id，
        },
        success: function (res) {
            $("#globalnotice").pshow({ text: "拆除空间成功！", state: "success" });
            $("#desSpaceDialog").phide();
            $("#spaceCheckFloat").phide();//弹出框隐藏
            if (instance.floorShowTitle == '建筑下的全部空间') {
                spaceInfoController.querySpaceWithGroup();
            } else {
                spaceInfoController.querySpaceForFloor();
            }
        },
        error: function (errObj) {
            console.error('destroySpace err');
            $("#globalnotice").pshow({ text: "拆除空间失败！", state: "failure" });
        },
        complete: function () {

        }
    });
}
spaceInfoController.updateSpaceInfo = function (ftype, fvalue, cb) { //编辑空间信息
    var instance = spaceInfoModel.instance();
    var timeObj = $("#editTimeBox").psel().startTime;
    var timeString = timeObj.replace(/-/g, '') + '000000';
    pajax.update({
        url: 'restSpaceService/updateSpaceInfo',
        data: {
            space_id: instance.spaceDetail.space_id,             //空间id，
            info_point_code: ftype,   //修改的信息点编码，必须
            info_point_value: fvalue,                //修改的信息点的值，必须
            valid_time: instance.editMode == 'modify' ? null : timeString,
        },
        success: function (res) {
            instance.detailEditSign = true;
            if (typeof cb == 'function') {
                cb();
                $("#globalnotice").pshow({ text: "修改信息成功！", state: "success" });
            }
        },
        error: function (errObj) {
            console.error('updateSpaceInfo err');
            $("#globalnotice").pshow({ text: "修改信息失败！", state: "failure" });
            ftype == 'room_func_type_name' && (true, Vue.set(instance.spaceDetail, 'room_func_type', spaceInfoController.editDetailCopy['room_func_type']));//空间类型
            ftype == 'tenant_type_name' && (true, Vue.set(instance.spaceDetail, 'tenant_type', spaceInfoController.editDetailCopy['tenant_type']));//空间类型
            Vue.set(instance.spaceDetail, ftype, spaceInfoController.editDetailCopy[ftype]);//还原
        },
        complete: function () {

        }
    });
}
