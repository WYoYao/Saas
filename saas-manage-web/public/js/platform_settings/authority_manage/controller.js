function authorityController() { }
authorityController.init = function () {
    //权限管理
    authorityController.getQueryAllFuncPack();
    authorityController.queryFuncPointTree();
    //工单管理
    authorityController.queryAllOperateModule();
    authorityController.queryCustomerForNormal();
}

authorityController.funcIdPacks = [];
authorityController.tagIndex = null;
authorityController.getQueryAllFuncPack = function () { //权限项目列表
    var instance = v.instance;
    $("#project_list_loading").pshow();
    pajax.post({
        url: 'restFuncPackService/queryAllFuncPack',
        data: {
            user_id: ''
        },
        success: function (res) {
            data = res.data || [];
            instance.allFuncPack = data;
        },
        error: function (errObj) {
            console.error('getQueryAllFuncPack err');
        },
        complete: function () {
            $("#project_list_loading").phide();
        }
    });
}
authorityController.funcPointArr = [];
authorityController.queryFuncPointTree = function () { //获取功能点树
    var instance = v.instance;
    pajax.post({
        url: 'restFuncPackService/queryFuncPointTree',
        data: {
            user_id: ''
        },
        success: function (data) {
            instance.funcPointTree = data || [];
        },
        error: function (errObj) {
            console.error('queryFuncPointTree err');
        },
        complete: function () { }
    });
}

authorityController.addFuncPack = function () { //添加权限项
    $("#project_list_loading").pshow();
    var instance = v.instance;
    pajax.update({
        url: 'restFuncPackService/addFuncPack',
        data: {
            user_id: '',
            func_pack_name: $("#addApackName").pval(),
            description: $("#addApackExplain").pval(),
            func_packs: authorityController.funcIdPacks,
        },
        success: function (res) {
            $("#popNoticeWarn").pshow({ text: "添加成功！", state: "success" });
            authorityController.getQueryAllFuncPack(); //重新去获取列表
        },
        error: function (errObj) {
            $("#project_list_loading").phide();
            $("#popNoticeWarn").pshow({ text: "添加失败！", state: "failure" });
            console.error('addFuncPack err');
        },
        complete: function () {
        }
    });
}
authorityController.queryFuncPackById = function (fitem) { //查询权限项
    var instance = v.instance;
    pajax.post({
        url: 'restFuncPackService/queryFuncPackById',
        data: {
            user_id: '',
            func_pack_id: fitem.func_pack_id,
        },
        success: function (res) {
            //data = res.data || [];
            data = res;
            instance.selFuncPack = data;
            authorityController.funcIdPacks = JSON.parse(JSON.stringify(instance.selFuncPack.func_packs)); //最原始的
            instance.allfPointTree = JSON.parse(JSON.stringify(instance.funcPointTree));
            for (var i = 0; i < authorityController.funcIdPacks.length; i++) {
                var funcId = authorityController.funcIdPacks[i];
                var resFunc = findFuncById(funcId);
                if (resFunc) {
                    resFunc.isAdd = true;
                }
            }
            //完成 allfPointTree的赋值
            instance.allfTreeBackup = JSON.parse(JSON.stringify(instance.allfPointTree)); //备份 为了编辑
        },
        error: function (errObj) {
            console.error('queryFuncPackById err');
        },
        complete: function () { }
    });
}

function findFuncById(funcId) { //根据id找到对应的功能点
    var thisFunc = null;
    for (var j = 0; j < v.instance.allfPointTree.length; j++) {
        var thisRoot = v.instance.allfPointTree[j];
        thisFunc = findFuncChild(thisRoot, funcId); //根据id找到对应的功能点
        if (thisFunc) break;
    }
    return thisFunc;
}

function findFuncChild(fpoint, funcId) {
    if (fpoint.func_id == funcId) {
        return fpoint;
    }
    var res = null;
    var fchildren = fpoint.child || [];
    for (var m = 0; m < fchildren.length; m++) {
        res = findFuncChild(fchildren[m], funcId);
        if (res) break;
    }
    return res;
}
authorityController.updateFuncPackById = function () { //编辑权限项
    $("#project_list_loading").pshow();
    var instance = v.instance;
    pajax.update({
        url: 'restFuncPackService/updateFuncPackById',
        data: {
            user_id: '',
            func_pack_id: instance.selFuncPack.func_pack_id,
            func_pack_name: $("#editApackName").pval(),
            description: $("#editApackExplain").pval(),
            func_packs: authorityController.funcIdPacks,
        },
        success: function (res) {
            $("#popNoticeWarn").pshow({ text: "编辑成功！", state: "success" });
            authorityController.getQueryAllFuncPack();
            authorityController.queryFuncPackById(instance.selFuncPack); //重新查询编辑项
        },
        error: function (errObj) {
            $("#project_list_loading").phide();
            $("#popNoticeWarn").pshow({ text: "编辑失败！", state: "failure" });
            console.error('updateFuncPackById err');
        },
        complete: function () {
        }
    });
}

//工单模块的管理
authorityController.queryAllOperateModule = function () { //查询所有操作模块信息
    var instance = v.instance;
    $("#project_list_loading").pshow();
    pajax.post({
        url: 'restOperateModuleService/queryAllOperateModule',
        data: {
            user_id: 'dd',
        },
        success: function (res) {
            data = res.data || [];
            instance.operateModules = data;
        },
        error: function (errObj) {
            console.error('queryAllOperateModule err');
        },
        complete: function () {
            $("#project_list_loading").phide();
        }
    });
}
authorityController.queryCustomerForNormal = function () { //查询正常状态的客户信息
    var instance = v.instance;
    pajax.post({
        url: 'restCustomerService/queryCustomerForNormal',
        data: {
            user_id: 'dd',
        },
        success: function (res) {
            data = res.data || [];
            instance.normalCustomers = data;
        },
        error: function (errObj) {
            console.error('queryCustomerForNormal err');
        },
        complete: function () { }
    });
}
authorityController.queryOperateModuleById = function (mitem, cb) { //根据Id查询模块详细信息
    var instance = v.instance;
    pajax.post({
        url: 'restOperateModuleService/queryOperateModuleById',
        data: {
            user_id: '',
            module_id: mitem.module_id
        },
        success: function (res) {
            data = res.data || [];
            instance.selOperaModule = data[0];
            cb();
        },
        error: function (errObj) {
            console.error('queryOperateModuleById err');
        },
        complete: function () { }
    });
}
authorityController.addOperateModule = function (paramArr) { //添加模块信息
    $("#project_list_loading").pshow();
    pajax.update({
        url: 'restOperateModuleService/addOperateModule',
        data: {
            user_id: 'dd',
            module_code: paramArr.module_code,
            module_name: paramArr.module_name,
            description: paramArr.description,
            project_ids: paramArr.project_ids
        },
        success: function (res) {
            $("#popNoticeWarn").pshow({ text: "添加成功！", state: "success" });
            authorityController.queryAllOperateModule();
        },
        error: function (errObj) {
            $("#project_list_loading").phide();
            $("#popNoticeWarn").pshow({ text: "添加失败！", state: "failure" });
            console.error('addOperateModule err');
        },
        complete: function () {

        }
    });
}
authorityController.updateOperateModuleById = function (paramArr) { //编辑模块信息
    $("#project_list_loading").pshow();
    var instance = v.instance;
    pajax.update({
        url: 'restOperateModuleService/updateOperateModuleById',
        data: {
            user_id: 'dd',
            module_id: instance.selOperaModule.module_id,
            module_code: paramArr.module_code,
            module_name: paramArr.module_name,
            description: paramArr.description,
            project_ids: paramArr.project_ids
        },
        success: function (res) {
            $("#popNoticeWarn").pshow({ text: "编辑成功！", state: "success" });
            authorityController.queryAllOperateModule();
        },
        error: function (errObj) {
            $("#project_list_loading").phide();
            $("#popNoticeWarn").pshow({ text: "编辑失败！", state: "failure" });
            console.error('updateOperateModuleById err');
        },
        complete: function () { }
    });
}