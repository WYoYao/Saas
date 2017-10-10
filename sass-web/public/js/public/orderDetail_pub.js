var orderDetail_pub = {
	getOrderDetail: function(pub_model,order_id,flag) { //查看工单详情
        var userId = model.user_id;
        pajax.post({
            url: 'restWoPlanService/queryDestroyedWoPlanList', //临时使用
            // url: 'restMyWorkOrderService/queryWorkOrderById',
            data: {
                user_id: userId,
                order_id: order_id
            },
            success: function(res) {
                var _data = res && res.data ? res.data : [];
                _data = d.orderDetailData; //临时使用
                orderDetail_data.goBackFlag = flag;
                if(pub_model){
                    pub_model.orderDetailData = _data;
                }else{
                     model.orderDetailData = _data;
                }
                controller.getWorkOrderServiceList(userId, order_id); //查询工单操作列表
            },
            error: function(error) {

            },

            complete: function() {
                $("#list_loading").phide();
            }
        });
    },
    orderDetail_goBack:function(){//工单详情返回
        if(orderDetail_data.goBackFlag == '1'){
            $("#see_orderDetail_bg").hide();
        }else if(orderDetail_data.goBackFlag == '2'){
            model.curPage = model.pages[0];
            model.scrapListArr = [];
        }
    }
}

var orderDetail_data = {
    goBackFlag:'',
}