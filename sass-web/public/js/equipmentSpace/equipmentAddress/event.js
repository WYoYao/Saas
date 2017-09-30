var eqaddresstabArr = [{ name: "供应商名录", icon: 'z' }, { name: "生产商名录", icon: 'z' }, { name: "维修商名录", icon: 'z' }, { name: "保险公司名录", icon: 'z' }];
$(function () {

   

    equipmentLogic.init();
});
//tab事件

function addList() {
    equipmentLogic.saveMerchant();
    $("#eqaddressfloat").phide();
}
//新建float
function addfloatShow() {
    equipmentLogic.newMerchantEvent();
    $("#eqaddressfloat").pshow({ title: '录入供应商' });
    $(".eqaddressFloatWrap").find(".addWrap").show();
    $(".eqaddressFloatWrap").find(".selWrap").hide();
    $("#delEqaddress").hide();
}
//详情float
function selfloatShow() {  
    $("#eqaddressfloat").pshow({ title: '供应商详情' });
    $(".eqaddressFloatWrap").find(".addWrap").hide();
    $(".eqaddressFloatWrap").find(".selWrap").show();
    $("#delEqaddress").show();

    $(".selTemp").removeClass("selTempEdit").addClass("selTempSel");
}
function tabShow() { 
 var el=getCurrTabElement();
 el.show().siblings().hide();

}
function getCurrTabElement() {
    var index = $("#eqaddresstab").psel();
    return $(".eqaddressGridWrap>div").eq(index);
}
//编辑
function editSelClick(event) {
    var par=$(event.currentTarget).parents(".selTemp");
    par.addClass("selTempEdit").removeClass("selTempSel");


    equipmentLogic.editMerchantEvent();
}
//确定
function editConfirm(event) {
    var par = $(event.currentTarget).parents(".selTemp");
    par.addClass("selTempSel").removeClass("selTempEdit");
    var type = par.attr("type");
    equipmentLogic.saveMerchant(type);
}
//取消
function editCancel(event) {
    var par = $(event.currentTarget).parents(".selTemp");
    par.addClass("selTempSel").removeClass("selTempEdit");
}

//添加保险单号
function addInsurerClick(event) {
    var _this = $(event.currentTarget);
    var html=$("#addInsurerTemp").html();
    _this.parents(".insurerWrapPar").append(html);
}
//删除保险单号
function delInsurerClick(event) {
    var _this = $(event.currentTarget);

    _this.parents(".insurerWrap").remove();

}

//添加品牌
function addBrandClick(event) {
    var _this = $(event.currentTarget);
    var html = $("#addBrandTemp").html();
    _this.parents(".brandWrapPar").append(html);
}

//编辑保险————添加保险
function addbxTempClick(event) {
    var _this = $(event.currentTarget);
    var html = $("#editAddbx").html();
    _this.parents(".brandWrapPar").append(html);
}


//删除
function delEqaddress() {
    $("#confirmWindow").pshow({ title: '您确定要删除吗？', subtitle: '被删除的内容将无法恢复' });
}
//删除二次弹窗  确认
function confirmDel() {
    equipmentLogic.removeMerchantById();
    confirmhide();
}
//删除二次弹窗   取消
function confirmhide() {
    $("#confirmWindow").phide();
    }