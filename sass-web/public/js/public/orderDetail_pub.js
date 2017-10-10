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
                orderDetail_data.pub_model = pub_model;
                if(flag == '1'){
                    pub_model.orderDetailData = _data;
                    orderDetail_data.pub_model.curPage = 'see_orderDetail';
                    orderDetail_pub.getWorkOrderServiceList(orderDetail_data.pub_model,userId, order_id); //查询工单操作列表
                }else{
                     model.orderDetailData = _data;
                     model.curPage = model.pages[5];
                    orderDetail_pub.getWorkOrderServiceList(null,userId, order_id); //查询工单操作列表
                }
            },
            error: function(error) {

            },

            complete: function() {
                $("#list_loading").phide();
            }
        });
    },
    getWorkOrderServiceList: function(pub_model,userId, orderId) { //获取工单操作时间列表
        pajax.post({
             url: 'restWoPlanService/queryDestroyedWoPlanList', //临时使用
            //url: 'restMyWorkOrderService/queryOperateRecord',
            data: {
                user_id: userId,
                order_id: orderId
            },
            success: function(res) {
                var _data = res && res.data ? res.data : [];
                _data = d.orderOperatList; //临时使用
                if(orderDetail_data.goBackFlag == '1'){
                    orderDetail_data.pub_model.orderOperatList = _data;
                }else{
                    model.orderOperatList = _data;
                }
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
            orderDetail_data.pub_model.curPage = '';
        }else if(orderDetail_data.goBackFlag == '2'){
            model.curPage = model.pages[0];
            model.scrapListArr = [];
        }
    },
    arrToString: function(arr) { //普通数组转字符串方法
        var arr = arr || [];
        var str = ''
        if (arr) {
            str = arr.join(",");
        } else {
            str = ""
        }
        return str;
    },
    timeFormatting: function(str) { //时间格式化
        var str = str || '';
        var nstr = str.substr(0, 4) + "-" + str.substr(4, 2) + "-" + str.substr(6, 2) + " " + str.substr(8, 2) + ":" + str.substr(10, 2) + ":" + str.substr(12, 2);
        return nstr;
    },
}

var orderDetail_data = {
    goBackFlag:'',
    pub_model:{},
}