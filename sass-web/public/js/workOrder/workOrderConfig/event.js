
$(function(){
	controller.init();//controller.js初始化
	//------------------------------------------ydx__start------------------------------------------
	$(document).on("click","#add_more_work",function(){
		if(!$(this).find("ul").is(":visible")){
			$(this).find("ul").show();
		}else{
			$(this).find("ul").hide();
		}
	})



    //------------------------------------------ydx__end------------------------------------------

    //------------------------------------------yn__start------------------------------------------
    //普通事件，组件

    //------------------------------------------yn__end------------------------------------------
});
var yn_method = {
    delConfirm: function (index, content, event) {
        event.stopPropagation();
        workOrderModel.del_plan_id = content;
        console.log(workOrderModel.del_plan_id)
        $("#del-confirm").pshow({title: '确定删除吗？', subtitle: '删除后不可恢复'});
    },
    cancelConfirm: function () {
        $("#del-confirm").phide();
    }
};