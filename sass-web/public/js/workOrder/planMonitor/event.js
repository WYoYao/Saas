
$(function(){
	controller.init();//controller.js初始化
	 $(document).click(function (event) {
        var tg = event.target;
        if (!$(tg).hasClass('choiceObjExampleModal') &&!$(tg).parents('.choiceObjExampleModal').length && $(".choiceObjExampleModal").length && $(".choiceObjExampleModal").is(':visible')) {
            $(".choiceObjExampleModal").hide();
        }
       
    });

});
var pub_method = {
   //公共方法
     
};
var pub_model = {
	obj_example:{},
}