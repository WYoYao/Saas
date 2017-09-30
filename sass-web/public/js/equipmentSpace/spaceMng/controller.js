function spaceInfoController() {
}

spaceInfoController.init = function () {
    spaceInfoController.queryBuild();

    //spaceInfoController.queryFloorWithOrder();
    //spaceInfoController.querySpaceWithGroup();
    //spaceInfoController.querySpaceRemindConfig();

}
spaceInfoController.addFloorSign = 'up';
spaceInfoController.editFloorDetail = {};
spaceInfoController.queryBuild = function () { //查询建筑体
    var instance = spaceInfoModel.instance();
    instance.allBuild = [{
        obj_id: "Bd100108001",
        obj_name: "建筑11"
    }, {
        obj_id: "Bd100108002",
        obj_name: "建筑22"
    }, {
        obj_id: "Bd100108003",
        obj_name: "建筑33"
    }];
    setTimeout(function () {
        $("#buildDropDown").psel(0);
    }, 0);

    pajax.post({
        url: 'restObjectService/queryBuild',
        data: {
        },
        success: function (res) {
            data = res.data || [];
            instance.allBuild = data;
            $("#buildDropDown").psel(0);
        },
        error: function (errObj) {
            console.error('queryBuild err');
        },
        complete: function () {

        }
    });
}
spaceInfoController.queryFloorWithOrder = function (sign, buildItem) { //查询某建筑下楼层信息
    var instance = spaceInfoModel.instance();
    instance.allFloorInfo = [{
        "floor_id": "222",
        "floor_local_id": "002",
        "floor_local_name": "2层",
        "floor_sequence_id": "1", //楼层顺序码   
        "floor_type": "1",
        "area": "1000",
        "net_height": "100",
        "floor_func_type": "描述文字"
    }, {
        "floor_id": "111",
        "floor_local_id": "001",
        "floor_local_name": "1层",
        "floor_sequence_id": "0", //楼层顺序码   
        "floor_type": "1",
        "area": "1000",
        "net_height": "100",
        "floor_func_type": "描述文字"
    }, {
        "floor_id": "000",
        "floor_local_id": "000",
        "floor_local_name": "B1",
        "floor_sequence_id": "-1", //楼层顺序码   
        "floor_type": "2",
        "area": "1000",
        "net_height": "100",
        "floor_func_type": "描述文字"
    }
    ];
    if (sign == 'space') {
        instance.spaceFloorArr = instance.allFloorInfo;
    }

    pajax.post({
        url: 'restFloorService/queryFloorWithOrder',
        data: {
            build_id: buildItem.obj_id
        },
        success: function (res) {
            data = res.data || [];
            if (sign == 'floor') {
                instance.allFloorInfo = data;
            } else {
                instance.spaceFloorArr = data;
            }

        },
        error: function (errObj) {
            console.error('queryFloorWithOrder err');
        },
        complete: function () {

        }
    });
}
spaceInfoController.queryFloorById = function (fitem) { //根据id查询楼层详细信息
    var instance = spaceInfoModel.instance();
    instance.floorDetail = {
        "floor_id": "666",
        "floor_local_id": "666",
        "floor_local_name": "66",       //楼层本地名称
        "floor_sequence_id": "66",        //楼层顺序码
        "BIMID": "aaaa",                  //BIM编码
        "floor_type": "1",
        "area": "66",
        "net_height": "66",
        "floor_func_type": "shuoming",        //楼层功能
        "permanent_people_num": "66",  //楼层常驻人数
        "out_people_flow": "66",         //逐时流出人数
        "in_people_flow": "66",          //逐时流入人数
        "exsit_people_num": "66"         //逐时楼层内现有人数
    };
    pajax.post({
        url: 'restFloorService/queryFloorById',
        data: {
            floor_id: fitem.floor_id
        },
        success: function (res) {
            data = res.data || [];
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
    var params = instance.floorDetail;
    params.build_id = instance.selBuild.obj_id;
    pajax.update({
        url: 'restFloorService/addFloor',
        data: params,
        success: function (res) {

        },
        error: function (errObj) {
            console.error('addFloor err');
        },
        complete: function () {

        }
    });
}
spaceInfoController.updateFloorInfo = function (ftype, fvalue) { //编辑楼层信息
    var instance = spaceInfoModel.instance();
    pajax.update({
        url: 'restFloorService/updateFloorInfo',
        data: {
            floor_id: instance.floorDetail.floor_id,       	            //楼层id，必须
            info_point_code: ftype,   //修改的信息点编码，必须
            info_point_value: fvalue,                //修改的信息点的值，必须
            valid_time: "20170108062907"
        },
        success: function (res) {

        },
        error: function (errObj) {
            console.error('updateFloorInfo err');
        },
        complete: function () {

        }
    });
}
spaceInfoController.updateFloorOrder = function () { //更改楼层顺序
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
            floors: floorArr,
        },
        success: function (res) {

        },
        error: function (errObj) {
            console.error('updateFloorOrder err');
        },
        complete: function () {

        }
    });
}
spaceInfoController.querySpaceWithGroup = function () { //查询某建筑下空间信息
    var instance = spaceInfoModel.instance();
    instance.allSpace = [{
        "floor_id": "222",               //楼层id
        "floor_local_name": "2层",       //楼层本地名称
        "spaces": [                      //楼层下空间信息
            {
                "space_id": "aaa",        //空间id
                "room_local_id": "aaa编码",   //空间编码
                "room_local_name": "aaa名字", //空间本地名称
                "room_func_type_name": "aaa功能",   //空间功能类型名称
                "work_orders": [{
                    "order_type": "1",                //工单类型编码
                    "orders": [                       //该类型下的工单
                        {
                            "order_id": "gongdan1",           //工单id，
                            "summary": "gongdan1",            //工单概述
                            "order_state_name": "gongdan1"    //工单状态名称
                        },
                        {
                            "order_id": "gongdan2",
                            "summary": "gongdan2",
                            "order_state_name": "gongdan2"
                        }
                    ]
                }, {
                    "order_type": "2",
                    "orders": [{
                        "order_id": "gongdan3",
                        "summary": "gongdan3",
                        "order_state_name": "gongdan3"
                    }]
                }]
            },
        {
            "space_id": "bbb",        //空间id
            "room_local_id": "bbb",   //空间编码
            "room_local_name": "bbb", //空间本地名称
            "room_func_type_name": "bbb",   //空间功能类型名称
        }]
    }, {
        "floor_id": "111",               //楼层id
        "floor_local_name": "1层",       //楼层本地名称
        "spaces": [                      //楼层下空间信息
            {
                "space_id": "cccc",        //空间id
                "room_local_id": "ccc",   //空间编码
                "room_local_name": "ccc", //空间本地名称
                "room_func_type_name": "cccc",   //空间功能类型名称
            },
            {
                "space_id": "ddd",        //空间id
                "room_local_id": "ddd",   //空间编码
                "room_local_name": "ddd", //空间本地名称
                "room_func_type_name": "ddd",   //空间功能类型名称
                "work_orders": [{
                    "order_type": "1",                //工单类型编码
                    "orders": [                       //该类型下的工单
                        {
                            "order_id": "gongdan1",           //工单id，
                            "summary": "gongdan1",            //工单概述
                            "order_state_name": "gongdan1"    //工单状态名称
                        },
                        {
                            "order_id": "gongdan2",
                            "summary": "gongdan2",
                            "order_state_name": "gongdan2"
                        }
                    ]
                }]
            }]
    }
    ];
    pajax.post({
        url: 'restSpaceService/querySpaceWithGroup',
        data: {
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

        }
    });
}
spaceInfoController.querySpaceForFloor = function (fitem) { //查询某楼层下空间信息
    var instance = spaceInfoModel.instance();
    instance.floorSpace = [{
        "space_id": "aaam",            //空间id
        "room_local_id": "aaam",       //空间编码
        "room_local_name": "aaam",     //空间本地名称
        "room_func_type_name": "aaam", //空间功能类型名称
        "work_orders": [
            {
                "order_type": "1",                //工单类型编码
                "orders": [                       //该类型下的工单
                    {
                        "order_id": "gongdan1",           //工单id，
                        "summary": "gongdan1",            //工单概述
                        "order_state_name": "gongdan1"    //工单状态名称
                    },
                    {
                        "order_id": "gongdan2",
                        "summary": "gongdan2",
                        "order_state_name": "gongdan2"
                    }
                ]
            }, {
                "order_type": "2",
                "orders": [{
                    "order_id": "gongdan3",
                    "summary": "gongdan3",
                    "order_state_name": "gongdan3"
                }]
            }]
    }, {
        "space_id": "bbbm",            //空间id
        "room_local_id": "bbbm",       //空间编码
        "room_local_name": "bbb",     //空间本地名称
        "room_func_type_name": "bbb", //空间功能类型名称
        "work_orders": [
            {
                "order_type": "1",                //工单类型编码
                "orders": [                       //该类型下的工单
                    {
                        "order_id": "gongdan1",           //工单id，
                        "summary": "gongdan1",            //工单概述
                        "order_state_name": "gongdan1"    //工单状态名称
                    },
                    {
                        "order_id": "gongdan2",
                        "summary": "gongdan2",
                        "order_state_name": "gongdan2"
                    }
                ]
            }]
    }];
    pajax.post({
        url: 'restSpaceService/querySpaceForFloor',
        data: {
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

        }
    });
}
spaceInfoController.queryDestroyedSpace = function () { //查询某建筑下已拆除的空间信息
    var instance = spaceInfoModel.instance();
    instance.desFloorSpace = [{
        "floor_id": "222",               //楼层id
        "floor_local_name": "2层",       //楼层本地名称
        "spaces": [                      //楼层下空间信息
            {
                "space_id": "aaa",        //空间id
                "room_local_id": "aaa",   //空间编码
                "room_local_name": "aaa", //空间本地名称
                "room_func_type_name": "aaa",   //空间功能类型名称
            },
            {
                "space_id": "bbb",        //空间id
                "room_local_id": "bbb",   //空间编码
                "room_local_name": "bbb", //空间本地名称
                "room_func_type_name": "bbb",   //空间功能类型名称
            }]
    }, {
        "floor_id": "111",               //楼层id
        "floor_local_name": "1层",       //楼层本地名称
        "spaces": [                      //楼层下空间信息
            {
                "space_id": "cccc",        //空间id
                "room_local_id": "ccc",   //空间编码
                "room_local_name": "ccc", //空间本地名称
                "room_func_type_name": "cccc",   //空间功能类型名称
            },
            {
                "space_id": "ddd",        //空间id
                "room_local_id": "ddd",   //空间编码
                "room_local_name": "ddd", //空间本地名称
                "room_func_type_name": "ddd",   //空间功能类型名称
            }]
    }];
    pajax.post({
        url: 'restSpaceService/queryDestroyedSpace',
        data: {
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

        }
    });
}
spaceInfoController.querySpaceRemindConfig = function () { //查询空间提醒设置
    var instance = spaceInfoModel.instance();
    instance.spaceRemind = [
    { "code": "1", "name": "保养", "is_remind": true, },
    { "code": "2", "name": "维修", "is_remind": true, },
    { "code": "3", "name": "巡检", "is_remind": true, },
    { "code": "4", "name": "运行", "is_remind": false, },
    { "code": "5", "name": "安防", "is_remind": false, }];

    instance.spaceRemindCopy = JSON.parse(JSON.stringify(instance.spaceRemind));

    pajax.post({
        url: 'restSpaceService/querySpaceRemindConfig',
        data: {
            person_id: ''
        },
        success: function (res) {
            data = res.data || [];
            instance.spaceRemind = data;
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
            person_id: '',
            remind_order_types: remind_order_types //选择的需要提醒的工单类型 
        },
        success: function (res) {
        },
        error: function (errObj) {
            console.error('saveSpaceRemindConfig err');
        },
        complete: function () {

        }
    });
}
spaceInfoController.queryAllSpaceCode = function () { //查询空间功能类型
    var instance = spaceInfoModel.instance();
    pajax.post({
        url: 'restDictService/queryAllSpaceCode',
        data: {
        },
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
    pajax.post({
        url: 'restDictService/queryAllRentalCode',
        data: {
        },
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
spaceInfoController.snameRepeat = true;
spaceInfoController.sidRepeat = true;
spaceInfoController.sbimRepeat = true;
spaceInfoController.sverifyNum = 0;
spaceInfoController.verifySpaceName = function (param) { //新增页/编辑页:验证空间名称是否可以使用
    var instance = spaceInfoModel.instance();
    pajax.update({
        url: 'restSpaceService/verifySpaceName',
        data: {
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
        $("#spaceNoticeWarn").pshow({ text: "楼层名称不可以使用！", state: "failure" });
        return;
    }
    if (spaceInfoController.sidRepeat) {
        $("#spaceNoticeWarn").pshow({ text: "楼层编码不可以使用！", state: "failure" });
        return;
    }
    if (spaceInfoController.sbimRepeat) {
        $("#spaceNoticeWarn").pshow({ text: "楼层BIM编码不可以使用！", state: "failure" });
        return;
    }
    spaceInfoController.addSpace();//保存楼层
}
spaceInfoController.addSpace = function () { //添加空间信息
    var instance = spaceInfoModel.instance();
    var params = instance.spaceDetail;
    pajax.update({
        url: 'restSpaceService/addSpace',
        data: params,
        success: function (res) {

        },
        error: function (errObj) {
            console.error('addSpace err');
        },
        complete: function () {

        }
    });
    spaceInfoController.querySpaceById = function () { //根据id查询空间详细信息
        var instance = spaceInfoModel.instance();
        instance.spaceDetail = {


        }
        pajax.post({
            url: 'restSpaceService/querySpaceById',
            data: {
                space_id: ''
            },
            success: function (res) {
                data = res.data || [];
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
        pajax.update({
            url: 'restSpaceService/verifyDestroySpace',
            data: {
                space_id: "",             //空间id，
            },
            success: function (res) {

            },
            error: function (errObj) {
                console.error('verifyDestroySpace err');
            },
            complete: function () {

            }
        });
    }
    spaceInfoController.destroySpace = function () { //拆除空间
        pajax.update({
            url: 'restSpaceService/destroySpace',
            data: {
                space_id: "",             //空间id，
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
    spaceInfoController.updateSpaceInfo = function () { //编辑空间信息
        pajax.update({
            url: 'restSpaceService/updateSpaceInfo',
            data: {
                space_id: "",             //空间id，
                info_point_code: "room_local_name",    //修改的信息点编码，必须
                info_point_value: "六层电梯间",            //修改的信息点的值，必须
                valid_time: "20170108062907"           //生效时间，格式：yyyymmddhhmmss，可以为空
            },
            success: function (res) {

            },
            error: function (errObj) {
                console.error('updateSpaceInfo err');
            },
            complete: function () {

            }
        });
    }
}