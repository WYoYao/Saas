var myWorkOrderLogger = {
    init: function () {
        commonData.publicModel = myWorkOrderModel;
        new Vue({
            el: '#myWorkOrder',
            data: myWorkOrderModel,
            methods: myWorkOrderMethod,
        });

        //publicMethod.addMatter();

        var workObj = {
            dataObj: {
                user_id: myWorkOrderModel.user_id,
                project_id: myWorkOrderModel.project_id,
                dict_type: "work_order_type"      //工单类型，必须
            },
            noticeSuccessObj: {text: '获取工单类型成功', state: "success"},
            noticeFailureObj: {text: '获取工单类型失败', state: "failure"}

        };
        var drafWorkObj = {
            // user_id: myWorkOrderModel.user_id,                        //员工id-当前操作人id，必须
            // project_id: myWorkOrderModel.project_id,                     //项目id，必须
            // "user_id":"RY1505218031651",
            // "project_id": "Pj1301020001",
            page: myWorkOrderModel.pageNum,                       //当前页号，必须
            page_size: 50                        //每页返回数量，必须
        };
        var obj = {
            user_id: myWorkOrderModel.user_id,
            project_id: myWorkOrderModel.project_id,
            need_return_criteria: true	      //返回结果是否需要带筛选条
        };
        myWorkOrderController.queryWorkOrderType(workObj);//查询工单类型
        myWorkOrderController.queryWorkOrder('restMyWorkOrderService/queryMyDraftWorkOrder', drafWorkObj);//查询草稿箱内工单
        //myWorkOrderController.querySopListForSel(obj);
        myWorkOrderController.queryUserWoInputMode();//用户输入方式
    }
}

