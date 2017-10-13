var controllerAddSystem = {
}
controllerAddSystem.init = function () {
    controllerAddSystem.queryAllEquipCategory();
    controllerAddSystem.queryBuildSystemTree();

}
controllerAddSystem.queryAllEquipCategory = function () { //查询专业-系统类型-设备类型
    pajax.post({
        url: 'restDictService/queryAllEquipCategory',
        data: {
            //user_id: 'RY1505218031651', //用户id
            //project_id: 'Pj1301020001', //项目id
        },
        success: function (res) {
            var data = res.data || [];
            v.instance.majorTypeArr = v.instance.majorTypeArr.concat(data);//专业列表

        },
        error: function (errObj) {
            console.error('queryAllEquipCategory err');
        },
        complete: function () {
        }
    });
}
controllerAddSystem.queryBuildSystemTree = function () { //查询建筑-系统列表树

    pajax.post({
        url: 'restSystemService/queryBuildSystemTree',
        data: {
            //user_id: 'RY1505218031651', //用户id
            //project_id: 'Pj1301020001', //项目id
        },
        success: function (res) {
            var data = res.data || [];
            v.instance.buildSystemTree = data;
        },
        error: function (errObj) {
            console.error('queryBuildSystemTree err');
        },
        complete: function () {
        }
    });
}