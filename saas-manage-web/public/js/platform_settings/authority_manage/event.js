
var buttonMenus = [{ name: '工单操作模块管理' }, { name: '权限项管理' }, { name: '动态模板管理' }]

function addAuthorityShow() { //显示添加权限
    var instance = v.instance;
    instance.allfPointTree = JSON.parse(JSON.stringify(instance.funcPointTree));
    authorityController.funcIdPacks = [];
    $("#addApackName").precover();
    $("#addApackExplain").precover();
    $("#authorityAdd").css("display", "block");
}

function addAuthorityHide() { //隐藏添加权限
    $("#authorityConfirm").pshow({ title: "确定要离开页面吗？", subtitle: "您编辑的信息尚未保存，离开会使内容丢失" });
}
function authConfirmSure() {//确定关闭
    $("#authorityConfirm").phide();
    if ($("#authorityAdd").is(":visible") && authorityController.tagIndex !== null) {//切换上面菜单
        $("#authorityAdd").css("display", "none");
        $("#navBar").psel(authorityController.tagIndex);
        authorityController.tagIndex = null;
        return;
    }
    if ($("#authorityAdd").is(":visible") && authorityController.tagIndex === null) {//如果是添加权限
        $("#authorityAdd").css("display", "none");
        return;
    }
    //编辑权限
    var instance = v.instance;
    instance.allfPointTree = JSON.parse(JSON.stringify(instance.allfTreeBackup));//恢复备份 为了查看弹出框 todo
    authorityController.funcIdPacks = JSON.parse(JSON.stringify(instance.selFuncPack.func_packs));//最原始的
    $("#authorityCheck").phide();
    $("#authorityEdit").phide();

}
function authConfirmCancel() {
    authorityController.tagIndex = null;
    $("#authorityConfirm").phide();
}
function saveAddAuthority() {//添加权限保存
    var funcPackName = $("#addApackName").pval().ptrimHeadTail();
    var description = $("#addApackExplain").pval().ptrimHeadTail();
    if (funcPackName === '') {
        $("#popNoticeWarn").pshow({ text: "权限项名称不能为空！", state: "failure" });
        return;
    }
    if (description === '') {
        $("#popNoticeWarn").pshow({ text: "权限项说明不能为空！", state: "failure" });
        return;
    }
    if (description.length > 100) {
        $("#popNoticeWarn").pshow({ text: "权限项说明字数不能超过100个！", state: "failure" });
        return;
    }
    if (authorityController.funcIdPacks.length == 0) {
        $("#popNoticeWarn").pshow({ text: "请选择包含的功能点！", state: "failure" });
        return;
    }
    authorityController.addFuncPack();
    $("#authorityAdd").css("display", "none");
}

function editAuthorityShow(event) {//编辑权限显示
    var instance = v.instance;
    //$("#authorityCheck").phide();
    $("#editApackName").precover();
    $("#editApackExplain").precover();
    $("#editApackName").pval(instance.selFuncPack.func_pack_name);
    $("#editApackExplain").pval(instance.selFuncPack.description);
    $("#authorityEdit").pshow();
}
function authorityEditHide(event) {//弹出侧弹框
    $("#authorityConfirm").pshow({ title: "确定要离开页面吗？", subtitle: "您编辑的信息尚未保存，离开会使内容丢失" });
    return false;
}

function editAuthoritySave() {//编辑权限保存
    var funcPackName = $("#editApackName").pval().ptrimHeadTail();
    var description = $("#editApackExplain").pval().ptrimHeadTail();
    if (funcPackName === '') {
        $("#popNoticeWarn").pshow({ text: "权限项名称不能为空！", state: "failure" });
        return;
    }
    if (description === '') {
        $("#popNoticeWarn").pshow({ text: "权限项说明不能为空！", state: "failure" });
        return;
    }
    if (description.length > 100) {
        $("#popNoticeWarn").pshow({ text: "权限项说明字数不能超过100个！", state: "failure" });
        return;
    }
    if (authorityController.funcIdPacks.length == 0) {
        $("#popNoticeWarn").pshow({ text: "请选择包含的功能点！", state: "failure" });
        return;
    }
    $("#authorityEdit").phide();
    authorityController.updateFuncPackById();
}

function addFuncOpera(event) {
    var instance = v.instance;
    for (var i = 0; i < instance.allfPointTree.length; i++) {
        var thisRoot = instance.allfPointTree[i];
        setFuncTreeAdd(thisRoot, authorityController.funcIdPacks, null);
    }
}
function setFuncTreeAdd(fpoint, funcIdPacks, parentFunc) {//把选中的功能点添加上
    if (fpoint.isSel && !fpoint.isAdd) {
        fpoint.isAdd = true;
        //fpoint.isSel = false;
        funcIdPacks.push(fpoint.func_id);
        setParentAdd(parentFunc, funcIdPacks);//如果父亲没有添加 添加上父亲
    }
    fpoint.isSel = false;
    var fchildren = fpoint.child || [];
    for (var i = 0; i < fchildren.length; i++) {
        setFuncTreeAdd(fchildren[i], funcIdPacks, fpoint);
    }
    return;
}
function setParentAdd(parentFunc, funcIdPacks) {
    if (parentFunc && !parentFunc.isAdd) {
        parentFunc.isAdd = true;
        funcIdPacks.push(parentFunc.func_id);
        if (parentFunc.parent_id == 0) { return; }
        var grandParen = findFuncById(parentFunc.parent_id);
        setParentAdd(grandParen, funcIdPacks);
    }
}

function delFuncOpera(event) {
    var instance = v.instance;
    for (var i = 0; i < instance.allfPointTree.length; i++) {
        var thisRoot = instance.allfPointTree[i];
        setFuncTreeDel(thisRoot, authorityController.funcIdPacks, null);
    }
}
function setFuncTreeDel(fpoint, funcIdPacks, parentFunc) {//把选中的功能点去掉
    if (fpoint.isSel && fpoint.isAdd) {
        fpoint.isAdd = false;
        //fpoint.isSel = false;
        var index = funcIdPacks.indexOf(fpoint.func_id);
        if (index > -1) { funcIdPacks.splice(index, 1); }
        ///setParentDel(parentFunc, funcIdPacks); //如果孩子节点都去掉了 也去掉父亲节点
    }
    fpoint.isSel = false;
    var fchildren = fpoint.child || [];
    for (var i = 0; i < fchildren.length; i++) {
        setFuncTreeDel(fchildren[i], funcIdPacks, fpoint);
    }
    return;
}
function setParentDel(parentFunc, funcIdPacks) {
    if (!parentFunc) return;
    var addfChild = parentFunc.child.filter(function (item) { return item.isAdd });
    if (parentFunc && parentFunc.isAdd && addfChild.length == 0) {//孩子节点都去掉了
        parentFunc.isAdd = false;
        var index = funcIdPacks.indexOf(parentFunc.func_id);
        if (index > -1) { funcIdPacks.splice(index, 1); }
        if (parentFunc.parent_id == 0) { return; }
        var grandParen = findFuncById(parentFunc.parent_id);
        setParentDel(grandParen, funcIdPacks);
    }
}

//工单管理
function addModuleShow(event) {//新增模块
    var instance = v.instance
    $("#modNameInput").precover();
    $("#modCodeInput").precover();
    $("#modDescripInput").precover();
    instance.selProjectArr = [];
    instance.normalCustomers.forEach(function (ele, index) {
        ele.isSel = false;
    });
    $("#operaModuleEdit").pshow({ title: '新增模块' });
    instance.addModuleSign = true;
}
function moduleEditSure(event) {//模块编辑确认
    var instance = v.instance;
    var nameInput = $("#modNameInput").pval().ptrimHeadTail();
    var codeInput = $("#modCodeInput").pval().ptrimHeadTail();
    var descripInput = $("#modDescripInput").pval().ptrimHeadTail();
    if (!nameInput) {
        $("#popNoticeWarn").pshow({ text: "模块名称不能是空!", state: "failure" });
        return;
    }
    if (!codeInput) {
        $("#popNoticeWarn").pshow({ text: "模块编码不能是空!", state: "failure" });
        return;
    }
    if (!descripInput) {
        $("#popNoticeWarn").pshow({ text: "模块释义不能是空!", state: "failure" });
        return;
    }
    if (descripInput.length > 50) {
        $("#popNoticeWarn").pshow({ text: "模块释义字数不能超过50个!", state: "failure" });
        return;
    }
    var pidArr = [];
    instance.selProjectArr.forEach(function (ele, index) {//选择的项目
        pidArr.push(ele.project_id);
    });
    var parameter = {
        module_code: $("#modCodeInput").pval(),
        module_name: $("#modNameInput").pval(),
        description: $("#modDescripInput").pval(),
        project_ids: pidArr
    }

    if (instance.addModuleSign) {//如果是新增
        authorityController.addOperateModule(parameter);
    } else {
        authorityController.updateOperateModuleById(parameter);
    }

    $("#operaModuleEdit").phide();
}
function moduleEditCancle(event) {
    $("#operaModuleEdit").phide();
}
function projectSelSure(event) {//选择项目确定
    var instance = v.instance;
    instance.selProjectArr = [];
    for (var i = 0; i < instance.normalCustomers.length; i++) {
        var customer = instance.normalCustomers[i];
        if (customer.isSel) {
            //customer.isSel = false;
            instance.selProjectArr.push(customer);//把勾选的放入数组
        }
    }
}
