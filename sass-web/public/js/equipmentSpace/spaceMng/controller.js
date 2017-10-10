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
    var instance = spaceInfoModel.instance();
    $("#spaceLoading").pshow();
    pajax.post({
        url: 'restObjectService/queryBuild',
        data: {
            user_id: 'RY1505218031651', //用户id
            project_id: 'Pj1301020001', //项目id
        },
        success: function (res) {
            data = res.data || [];
            instance.allBuild = data;
            setTimeout(function () {
                $("#buildDropDown").psel(0);
            }, 0);

        },
        error: function (errObj) {
            console.error('queryBuild err');
        },
        complete: function () {
            $("#spaceLoading").phide();
        }
    });
}
spaceInfoController.queryFloorWithOrder = function (sign, buildItem) { //查询某建筑下楼层信息
    var instance = spaceInfoModel.instance();
    if (sign == 'floor') {
        $("#spaceLoading").pshow();
    }
    pajax.post({
        url: 'restFloorService/queryFloorWithOrder',
        data: {
            user_id: 'RY1505218031651', //用户id
            project_id: 'Pj1301020001', //项目id
            build_id: buildItem.obj_id
        },
        success: function (res) {
            data = res.data || [];
            if (sign == 'floor') {
                instance.allFloorInfo = data;
            } else {//空间里面的楼层数据
                instance.spaceFloorArr = data;
            }

        },
        error: function (errObj) {
            console.error('queryFloorWithOrder err');
        },
        complete: function () {
            $("#spaceLoading").phide();
        }
    });
}
spaceInfoController.queryFloorById = function (fitem) { //根据id查询楼层详细信息
    var instance = spaceInfoModel.instance();
    //instance.floorDetail = {
    //    "floor_id": "666",
    //    "floor_local_id": "666",
    //    "floor_local_name": "66",       //楼层本地名称
    //    "floor_sequence_id": "66",        //楼层顺序码
    //    "BIMID": "aaaa",                  //BIM编码
    //    "floor_type": "1",
    //    "area": "66",
    //    "net_height": "66",
    //    "floor_func_type": "shuoming",        //楼层功能
    //    "permanent_people_num": "66",  //楼层常驻人数
    //    "out_people_flow": "66",         //逐时流出人数
    //    "in_people_flow": "66",          //逐时流入人数
    //    "exsit_people_num": "66"         //逐时楼层内现有人数
    //};
    pajax.post({
        url: 'restFloorService/queryFloorById',
        data: {
            user_id: 'RY1505218031651', //用户id
            project_id: 'Pj1301020001', //项目id
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
    var instance = spaceInfoModel.instance();
    pajax.update({
        url: 'restFloorService/verifyFloorName',
        data: {
            user_id: 'RY1505218031651', //用户id
            project_id: 'Pj1301020001', //项目id
            build_id: instance.selBuild.obj_id,
            floor_id: param == 'add' ? null : instance.floorDetail.floor_id,             //楼层id，编辑时必须
            floor_local_name: instance.floorDetail.floor_local_name,           //楼层本地名称，必须
        },
        success: function (res) {
            spaceInfoController.fnameRepeat = false;
            if (typeof param == "function") {//编辑
                param();//todo  错误tips
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
            user_id: 'RY1505218031651', //用户id
            project_id: 'Pj1301020001', //项目id
            floor_id: param == 'add' ? null : instance.floorDetail.floor_id,             //楼层id，编辑时必须
            floor_local_id: instance.floorDetail.floor_local_id,
        },
        success: function (res) {
            spaceInfoController.fidRepeat = false;

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
            user_id: 'RY1505218031651', //用户id
            project_id: 'Pj1301020001', //项目id
            floor_id: param == 'add' ? null : instance.floorDetail.floor_id,             //楼层id，编辑时必须
            BIMID: instance.floorDetail.BIMID,
        },
        success: function (res) {
            spaceInfoController.fbimRepeat = false;
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
        $("#spaceNoticeWarn").pshow({ text: "楼层名称不可以使用！", state: "failure" });
        return;
    }
    if (spaceInfoController.fidRepeat) {
        $("#spaceNoticeWarn").pshow({ text: "楼层编码不可以使用！", state: "failure" });
        return;
    }
    if (spaceInfoController.fbimRepeat) {
        $("#spaceNoticeWarn").pshow({ text: "楼层BIM编码不可以使用！", state: "failure" });
        return;
    }
    spaceInfoController.addFloor();//保存楼层
}
spaceInfoController.addFloor = function () { //添加楼层信息
    var instance = spaceInfoModel.instance();
    var params = {
        user_id: 'RY1505218031651', //用户id
        project_id: 'Pj1301020001', //项目id
        build_id: instance.selBuild.obj_id
    }
    params = $.extend({}, params, instance.floorDetail)
    pajax.update({
        url: 'restFloorService/addFloor',
        data: params,
        success: function (res) {
            $("#addFloorDiv").hide();
            spaceInfoController.queryFloorWithOrder('floor', instance.selBuild);
            $("#spaceNoticeWarn").pshow({ text: "添加楼层成功！", state: "success" });
        },
        error: function (errObj) {
            $("#spaceNoticeWarn").pshow({ text: "添加楼层失败！", state: "failure" });
            console.error('addFloor err');
        },
        complete: function () {

        }
    });
}
spaceInfoController.updateFloorInfo = function (ftype, fvalue, cb) { //编辑楼层信息
    var instance = spaceInfoModel.instance();
    var timeObj = $("#editTimeBox").psel();
    pajax.update({
        url: 'restFloorService/updateFloorInfo',
        data: {
            floor_id: instance.floorDetail.floor_id,       	            //楼层id，必须
            info_point_code: ftype,   //修改的信息点编码，必须
            info_point_value: fvalue,                //修改的信息点的值，必须
            valid_time: instance.editMode == 'modify' ? null : timeObj.startTime,
        },
        success: function (res) {
            instance.detailEditSign = true;
            if (typeof cb == 'function') {
                cb();
            }
        },
        error: function (errObj) {
            console.error('updateFloorInfo err');
        },
        complete: function () {

        }
    });
}
spaceInfoController.updateFloorOrder = function () { //更改楼层顺序
    $("#spaceLoading").pshow();
    var instance = spaceInfoModel.instance();
    var floorArr = [];
    instance.allFloorInfo.forEach(function (ele) {
        floorArr.push({
            floor_id: ele.floor_id,
            floor_sequence_id: ele.floor_sequence_id
        });
    });
    pajax.update({
        url: 'restFloorService/updateFloorOrder',
        data: {
            user_id: 'RY1505218031651', //用户id
            project_id: 'Pj1301020001', //项目id
            floors: floorArr,
        },
        success: function (res) {
        },
        error: function (errObj) {
            console.error('updateFloorOrder err');
        },
        complete: function () {
            $("#spaceLoading").phide();
        }
    });
}
spaceInfoController.querySpaceWithGroup = function () { //查询某建筑下空间信息
    var instance = spaceInfoModel.instance();
    $("#spaceLoading").pshow();
    pajax.post({
        url: 'restSpaceService/querySpaceWithGroup',
        data: {
            user_id: 'RY1505218031651', //用户id
            project_id: 'Pj1301020001', //项目id
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
            $("#spaceLoading").phide();
        }
    });
}
spaceInfoController.querySpaceForFloor = function (fitem) { //查询某楼层下空间信息
    var instance = spaceInfoModel.instance();
    $("#spaceLoading").pshow();
    pajax.post({
        url: 'restSpaceService/querySpaceForFloor',
        data: {
            user_id: 'RY1505218031651', //用户id
            project_id: 'Pj1301020001', //项目id
            floor_id: fitem.floor_id
        },
        success: function (res) {
            data = res.data || [];
            instance.floorSpace = data;
        },
        error: function (errObj) {
            console.error('querySpaceForFloor err');
        },
        complete: function () {
            $("#spaceLoading").phide();
        }
    });
}
spaceInfoController.queryDestroyedSpace = function () { //查询某建筑下已拆除的空间信息
    var instance = spaceInfoModel.instance();
    $("#spaceLoading").pshow();
    pajax.post({
        url: 'restSpaceService/queryDestroyedSpace',
        data: {
            user_id: 'RY1505218031651', //用户id
            project_id: 'Pj1301020001', //项目id
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
            $("#spaceLoading").phide();
        }
    });
}
spaceInfoController.querySpaceRemindConfig = function () { //查询空间提醒设置
    var instance = spaceInfoModel.instance();
    //instance.spaceRemind = [
    //    { "code": "1", "name": "保养", "is_remind": true, },
    //    { "code": "2", "name": "维修", "is_remind": true, },
    //    { "code": "3", "name": "巡检", "is_remind": true, },
    //    { "code": "4", "name": "运行", "is_remind": false, },
    //    { "code": "5", "name": "安防", "is_remind": false, }];
    pajax.post({
        url: 'restSpaceService/querySpaceRemindConfig',
        data: {
            user_id: 'RY1505218031651', //用户id
            project_id: 'Pj1301020001', //项目id
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
            user_id: 'RY1505218031651', //用户id
            project_id: 'Pj1301020001', //项目id
            person_id: 'RY1503886428173',
            remind_order_types: remind_order_types //选择的需要提醒的工单类型 
        },
        success: function (res) {
            $("#spaceNoticeWarn").pshow({ text: "设置空间提醒成功！", state: "success" });
            spaceInfoController.querySpaceRemindConfig();//重新获取一次
        },
        error: function (errObj) {
            $("#spaceNoticeWarn").pshow({ text: "设置空间提醒失败！", state: "failure" });
            console.error('saveSpaceRemindConfig err');
        },
        complete: function () {

        }
    });
}
spaceInfoController.queryAllSpaceCode = function () { //查询空间功能类型
    var instance = spaceInfoModel.instance();
    //instance.allSpaceCode = [{
    //    "code": "100",
    //    "name": "公共区域",
    //    "content": [{
    //        "code": "110",
    //        "name": "盥洗区",
    //        "content": [
    //            {
    //                "code": "111",
    //                "name": "卫生间"
    //            },
    //            {
    //                "code": "112",
    //                "name": "更衣室"
    //            }
    //        ]
    //    }, {
    //        "code": "120",
    //        "name": "走廊",
    //        "content": []
    //    }]
    //},
    //    {
    //        "code": "200",
    //        "name": "后勤",
    //        "content": [
    //            {
    //                "code": "210",
    //                "name": "洁洗区",
    //                "content": [
    //                    {
    //                        "code": "211",
    //                        "name": "洗衣房"
    //                    },
    //                    {
    //                        "code": "212",
    //                        "name": "消毒间"
    //                    }
    //                ]
    //            },
    //            {
    //                "code": "220",
    //                "name": "备餐区",
    //                "content": [
    //                    {
    //                        "code": "221",
    //                        "name": "厨房"
    //                    },
    //                    {
    //                        "code": "222",
    //                        "name": "洗碗间"
    //                    },
    //                    {
    //                        "code": "223",
    //                        "name": "茶水间"
    //                    }
    //                ]
    //            }
    //        ]
    //    }
    //];
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
    var instance = spaceInfoModel.instance();
    //instance.allRentalCode = [
    //    {
    //        "code": "100",
    //        "name": "餐饮",
    //        "content": [
    //            {
    //                "code": "110",
    //                "name": "高档酒楼",
    //                "content": []
    //            },
    //            {
    //                "code": "120",
    //                "name": "中餐炒菜",
    //                "content": [
    //                    {
    //                        "code": "121",
    //                        "name": "高档时尚"
    //                    },
    //                    {
    //                        "code": "122",
    //                        "name": "中低档大众"
    //                    }
    //                ]
    //            }
    //        ]
    //    },
    //    {
    //        "code": "200",
    //        "name": "服装",
    //        "content": [
    //            {
    //                "code": "210",
    //                "name": "奢侈品",
    //                "content": []
    //            },
    //            {
    //                "code": "220",
    //                "name": "高档单店",
    //                "content": []
    //            }
    //        ]
    //    }
    //];
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
    instance.infoPointHis = [
        { "date": '2016-08-12', "value": "222" },
        { "date": '2016-08-12', "value": "333" },
        { "date": '2016-08-12', "value": "555" }];
    pajax.post({
        url: 'restFloorService/queryFloorInfoPointHis',
        data: {
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
    instance.infoPointHis = [
        { "date": '2016-08-12', "value": "222" },
        { "date": '2016-08-12', "value": "333" },
        { "date": '2016-08-12', "value": "555" }];
    pajax.post({
        url: 'restSpaceService/querySpaceInfoPointHis',
        data: {
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
spaceInfoController.verifySpaceName = function (param) { //新增页/编辑页:验证空间名称是否可以使用
    var instance = spaceInfoModel.instance();
    pajax.update({
        url: 'restSpaceService/verifySpaceName',
        data: {
            user_id: 'RY1505218031651', //用户id
            project_id: 'Pj1301020001', //项目id
            build_id: instance.spaceDetail.build_id,
            space_id: param == 'add' ? null : instance.spaceDetail.space_id,             //空间id，编辑时必须
            room_local_name: instance.spaceDetail.room_local_name,           //空间名称，必须
        },
        success: function (res) {
            spaceInfoController.snameRepeat = false;
            if (typeof param == "function") {//编辑
                param();//todo  错误tips
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
    var instance = spaceInfoModel.instance();
    pajax.update({
        url: 'restSpaceService/verifySpaceLocalId',
        data: {
            user_id: 'RY1505218031651', //用户id
            project_id: 'Pj1301020001', //项目id
            space_id: param == 'add' ? null : instance.spaceDetail.space_id,             //空间id，编辑时必须
            room_local_id: instance.spaceDetail.room_local_id,           //空间编码，必须
        },
        success: function (res) {
            spaceInfoController.sidRepeat = false;
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
    var instance = spaceInfoModel.instance();
    pajax.update({
        url: 'restSpaceService/verifySpaceBimId',
        data: {
            user_id: 'RY1505218031651', //用户id
            project_id: 'Pj1301020001', //项目id
            space_id: param == 'add' ? null : instance.spaceDetail.space_id,             //空间id，编辑时必须
            BIMID: instance.spaceDetail.BIMID,          //空间BIM编码，必须
        },
        success: function (res) {
            spaceInfoController.sbimRepeat = false;
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
        $("#spaceNoticeWarn").pshow({ text: "空间名称不可以使用！", state: "failure" });
        return;
    }
    if (spaceInfoController.sidRepeat) {
        $("#spaceNoticeWarn").pshow({ text: "空间编码不可以使用！", state: "failure" });
        return;
    }
    if (spaceInfoController.sbimRepeat) {
        $("#spaceNoticeWarn").pshow({ text: "空间BIM编码不可以使用！", state: "failure" });
        return;
    }
    spaceInfoController.addSpace();//保存楼层
}
spaceInfoController.addSpace = function () { //添加空间信息
    var instance = spaceInfoModel.instance();
    var params = {
        user_id: 'RY1505218031651', //用户id
        project_id: 'Pj1301020001', //项目id
    }
    params = $.extend({}, params, instance.spaceDetail)
    pajax.update({
        url: 'restSpaceService/addSpace',
        data: params,
        success: function (res) {
            $("#addSpaceDiv").hide();
           // spaceInfoController.queryFloorWithOrder('floor', instance.selBuild);
            $("#spaceNoticeWarn").pshow({ text: "添加空间成功！", state: "success" });
        },
        error: function (errObj) {
            $("#spaceNoticeWarn").pshow({ text: "添加空间失败！", state: "success" });
            console.error('addSpace err');
        },
        complete: function () {

        }
    });
}
spaceInfoController.querySpaceById = function (sitem) { //根据id查询空间详细信息
    var instance = spaceInfoModel.instance();
    //instance.spaceDetail = {
    //    "space_id": "aaa",           //空间id,
    //    "build_id": "666",          //所属建筑id
    //    "build_local_name": "建筑22",   //所属建筑名称
    //    "floor_local_name": "2层",     //所属楼层名称
    //    "room_local_id": "333",        //空间本地编码
    //    "room_local_name": "dfas",      //空间名称
    //    "BIMID": "fdf",          //BIM编码
    //    "room_func_type": "111",       //空间功能区类型
    //    "room_func_type_name": "卫生间",  //空间功能区类型名称
    //    "length": "55",               //长
    //    "width": "44",                //宽
    //    "height": "66",               //高
    //    "area": "33",                 //面积
    //    "elec_cap": "443",             //配电容量
    //    "intro": "dfgdfgdf",                //备注文字
    //    "tenant_type": "110",          //租赁业态类型
    //    "tenant_type_name": "高档酒店",     //租赁业态类型名称
    //    "tenant": "rter",               //所属租户
    //    "permanent_people_num": "cvb", //空间内常驻人数
    //    "out_people_flow": "878",      //逐时流出人数
    //    "in_people_flow": "66",       //逐时流入人数
    //    "exsit_people_num": "88",     //逐时空间内现有人数
    //    "elec_power": "77",           //用电功率
    //    "cool_consum": "88",          //逐时冷量
    //    "heat_consum": "99",          //逐时热量
    //    "ac_water_press": "788",       //空调水压力
    //    "water_consum": "999",         //用水量
    //    "water_press": "666",          //自来水压力
    //    "hot_water_consum": "77",     //热水用水量
    //    "hot_water_press": "999",      //热水压力
    //    "gas_consum": "777",           //用燃气量
    //    "gas_press": "888",            //燃气压力
    //    "PMV": "888",                  //热舒适PMV
    //    "PPD": "666"                   //热舒适PPD
    //}
    pajax.post({
        url: 'restSpaceService/querySpaceById',
        data: {
            user_id: 'RY1505218031651', //用户id
            project_id: 'Pj1301020001', //项目id
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
    pajax.post({
        url: 'restSpaceService/verifyDestroySpace',
        data: {
            space_id: instance.spaceDetail.space_id,             //空间id，
        },
        success: function (res) {
            $("#spaceNoticeWarn").pshow({ text: "当前空间下还有设备，不可拆除 ！", state: "failure" });
            $("#spaceNoticeWarn").pshow({ text: "工单计划中尚包含此空间，不可拆除 ！", state: "failure" });
            $("#desSpaceDialog").pshow({ title: "您确定要作废该空间吗？", subtitle: "作废后，您只能在“已拆除空间”页面查看到它的详情" });

        },
        error: function (errObj) {
            console.error('verifyDestroySpace err');
        },
        complete: function () {
            $("#desSpaceDialog").pshow({ title: "您确定要作废该空间吗？", subtitle: "作废后，您只能在“已拆除空间”页面查看到它的详情" });

        }
    });
}
spaceInfoController.destroySpace = function () { //拆除空间
    var instance = spaceInfoModel.instance();
    pajax.update({
        url: 'restSpaceService/destroySpace',
        data: {
            space_id: instance.spaceDetail.space_id,            //空间id，
        },
        success: function (res) {
        },
        error: function (errObj) {
            console.error('destroySpace err');
        },
        complete: function () {

        }
    });
}
spaceInfoController.updateSpaceInfo = function (ftype, fvalue, cb) { //编辑空间信息
    var instance = spaceInfoModel.instance();
    var timeObj = $("#editTimeBox").psel();
    pajax.update({
        url: 'restSpaceService/updateSpaceInfo',
        data: {
            space_id: instance.spaceDetail.space_id,             //空间id，
            info_point_code: ftype,   //修改的信息点编码，必须
            info_point_value: fvalue,                //修改的信息点的值，必须
            valid_time: instance.editMode == 'modify' ? null : timeObj.startTime,
        },
        success: function (res) {
            instance.detailEditSign = true;
            if (typeof cb == 'function') {
                cb();
            }
        },
        error: function (errObj) {
            console.error('updateSpaceInfo err');
        },
        complete: function () {

        }
    });
}
