var eqaddresstabArr = [{ name: "供应商名录", icon: 'z' }, { name: "生产商名录", icon: 'z' }, { name: "维修商名录", icon: 'z' }, { name: "保险公司名录", icon: 'z' }];
$(function () {

   

    equipmentLogic.init();
});
//tab事件
function xx() {
    
console.log(1)
}
function floatShow() {
    $("#eqaddressfloat").pshow({title:'录入供应商'});
}
function tabShow() { 
 var el=getCurrTabElement();
 el.show().siblings().hide();

}
function getCurrTabElement() {
    var index = $("#eqaddresstab").psel();
    return $(".eqaddressGridWrap>div").eq(index);
}
