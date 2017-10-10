var eqaddresstabArr = [{ name: "供应商名录", icon: 'z' }, { name: "生产商名录", icon: 'z' }, { name: "维修商名录", icon: 'z' }, { name: "保险公司名录", icon: 'z' }];
$(function () {
    $(document).on("click", function () {
        $(".insuranceGridPop").hide();
    });

    equipmentLogic.init();
});
//tab事件

function addList() {
    equipmentLogic.saveMerchant(null, function () {
        $("#eqaddressfloat").phide();
    });
}
//新建float
function addfloatShow() {
    equipmentLogic.newMerchantEvent();
    $("#eqaddressfloat").pshow({ title: '录入' + equipmentAddressModal.tabSelName });
    $(".eqaddressFloatWrap").find(".addWrap").show();
    $(".eqaddressFloatWrap").find(".selWrap").hide();
    $("#delEqaddress").hide();
    $(document).click();
}
//详情float
function selfloatShow() {
    $("#eqaddressfloat").pshow({ title:  equipmentAddressModal.tabSelName+'详情' });
    $(".eqaddressFloatWrap").find(".addWrap").hide();
    $(".eqaddressFloatWrap").find(".selWrap").show();
    $("#delEqaddress").show();

    $(".selTemp").removeClass("selTempEdit").addClass("selTempSel");
}
function tabShow() {
    var el = getCurrGridElement();
    el.show().siblings().hide();
    $(document).click();
}
function getCurrGridElement() {
    var index = $("#eqaddresstab").psel();
    return $(".eqaddressGridWrap>div").eq(index);
}
//编辑
function editSelClick(event) {
    var par = $(event.currentTarget).parents(".selTemp");
    par.addClass("selTempEdit").removeClass("selTempSel");


    equipmentLogic.editMerchantEvent();
}
//确定
function editConfirm(event) {
    var currJqTarget = $(event.currentTarget);
    var par = currJqTarget.parents(".selTemp");
    var type = par.attr("type");
    equipmentLogic.saveMerchant(type, function () {
        currJqTarget.next().click();
    });
}
//取消
function editCancel(target) {
    var par = $(target).parents(".selTemp");
    par.addClass("selTempSel").removeClass("selTempEdit");
}

//添加保险单号
function addInsurerClick(event) {
    equipmentLogic.addBrandOrInsure();
}

//删除保险单号或删除品牌
function delInsurerClick(event) {
    var index = parseInt($(event.currentTarget).attr('ji'));
    equipmentLogic.removeBrandOrInsure(index);
}

//添加品牌
function addBrandClick(event) {
    equipmentLogic.addBrandOrInsure();
}


//删除
function delEqaddress() {
    $("#confirmWindow").pshow({ title: '您确定要删除该' + equipmentAddressModal.tabSelName + '吗？', subtitle: '被删除的内容将无法恢复' });
}
//删除二次弹窗  确认
function confirmDel() {
    confirmhide();
    equipmentLogic.removeMerchantById(function () {
        $("#eqaddressfloat").phide();
    });
}
//删除二次弹窗   取消
function confirmhide() {
    $("#confirmWindow").phide();
}

/*阻止a标签的click冒泡*/
function aStopPro(event) {
    event.stopPropagation();
}