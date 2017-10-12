var orderDetail_pub = {
    getOrderDetail: function (pub_model, order_id, flag) {
        if (flag == '4') {
            orderDetail_data.goBackFlag = flag;
            orderDetail_data.pub_model = pub_model;
            orderDetail_data.pub_model.curPage = 'see_orderDetail';
            orderDetail_pub.getUserInfo();//获取人员信息
        } else {
            orderDetail_pub.getPublishedOrderDetail(pub_model, order_id, flag);
        }
    },

    getPublishedOrderDetail: function(pub_model, order_id, flag) { //查看工单详情
        var userId = model.user_id;
        $("#list_loading").pshow();
        pajax.post({
            // url: 'restWoPlanService/queryDestroyedWoPlanList', //临时使用
            url: 'restMyWorkOrderService/queryWorkOrderById',
            data: {
                order_id: order_id
            },
            success: function(res) {
                var _obj = res  ? res : {};
                var _data = _obj.work_order.wo_body;
                // _data = d.orderDetailData; //临时使用
                orderDetail_data.goBackFlag = flag;
                orderDetail_data.pub_model = pub_model;
                if (flag == '1') {//空间内展示
                    pub_model.orderDetailData = _data;
                    orderDetail_data.pub_model.curPage = 'see_orderDetail';
                    orderDetail_pub.getWorkOrderServiceList(orderDetail_data.pub_model, userId, order_id); //查询工单操作列表
                } else if(flag == '2') {//计划监控
                    pub_model.orderDetailData = _data = _data;
                    orderDetail_data.pub_model.curPage = 'see_orderDetail';
                    orderDetail_pub.getWorkOrderServiceList(orderDetail_data.pub_model, userId, order_id); //查询工单操作列表
                    orderDetail_pub.getUserInfo();//获取人员信息
                }else if(flag == '3'){//工单管理
                    pub_model.orderDetailData = _data;
                    orderDetail_data.pub_model.curPage = 'see_orderDetail';
                    orderDetail_pub.getWorkOrderServiceList(orderDetail_data.pub_model, userId, order_id); //查询工单操作列表
                    orderDetail_pub.getUserInfo();//获取人员信息
                }
            },
            error: function(error) {

            },

            complete: function() {
                $("#list_loading").phide();
            }
        });
    },
    getWorkOrderServiceList: function(pub_model, userId, orderId, flag) { //获取工单操作时间列表
        pajax.post({
            // url: 'restWoPlanService/queryDestroyedWoPlanList', //临时使用
            url: 'restMyWorkOrderService/queryOperateRecord',
            data: {
                user_id: userId,
                order_id: orderId
            },
            success: function(res) {
                var _data = res && res.data ? res.data : [];
                _data = d.orderOperatList; //临时使用
                if (orderDetail_data.goBackFlag == '1') {
                    orderDetail_data.pub_model.orderOperatList = _data;
                } else {
                    model.orderOperatList = _data;
                    if (flag == '4') orderDetail_data.pub_model.LorC = 0;
                }
            },
            error: function(error) {

            },

            complete: function() {
                $("#list_loading").phide();
            }
        });
    },
    getToolList: function(_data) { //选择工具
        pajax.post({
            // url: 'restWoPlanService/queryDestroyedWoPlanList', //临时使用
            url: 'saas/restObjectService/queryTempObjectList',
            data: _data,
            success: function(res) {
                var _data = res && res.data ? res.data : [];
                //_data = [{ obj_id: "11", obj_type: "3", obj_name: "锤子" }, { obj_id: "11", obj_type: "3", obj_name: "十字镐" }];
                model.toolList = _data;
                console.log(_data)
                // $("#choiceObjExample").show();
            },
            error: function(error) {

            },

            complete: function() {
                $("#list_loading").phide();
            }
        });
    },
    stopOrderSet: function(_data) { //中止工单请求
        pajax.update({
            url: 'restWoMonitorService/doStopWithAdmin',
            data: _data,
            success: function(res) {
                $("#publishNotice").pshow({ text: '中止成功', state: "success" });
                $("#stopOrder").phide();
            },
            error: function(error) {
                $("#publishNotice").pshow({ text: '中止失败,请重试', state: "failure" });
            },

            complete: function() {
                $("#list_loading").phide();
            }
        });
    },
    assignOrderSet: function(_data) { //指派工单请求
        pajax.update({
            url: 'restWoMonitorService/doAssignWithAdmin',
            data: _data,
            success: function(res) {
                $("#publishNotice").pshow({ text: '指派成功', state: "success" });
            },
            error: function(error) {
                $("#publishNotice").pshow({ text: '指派失败,请重试', state: "failure" });
            },

            complete: function() {
                $("#list_loading").phide();
            }
        });
    },
    getPersonPositionList: function() { //获取人员或岗位信息
        pajax.post({
            url: 'restPersonService/queryPositionPersonSel',
            data: {},
            success: function(res) {
                var _data = res && res.data ? res.data : [];

                // workOrderModel.personPositionList = _data.map(function(item) {
                var falseList = _data.map(function(item) {
                    item.isSelected = false;

                    item.id = ptool.produceId();

                    if (item.type == 2) {

                        item.persons = item.persons.map(function(info) {

                            info.isSelected = false;
                            info.id = ptool.produceId();
                            return info;
                        });
                    };

                    return item;
                });
                $("#createAssignSet").pshow();
                 orderDetail_data.pub_model.personPositionList = JSON.parse(JSON.stringify(falseList));
                //console.log(JSON.stringify(orderDetail_data.personPositionList))
                // orderDetail_data.personPositionList = orderDetail_data.personPositionList.length > 0 ? orderDetail_data.personPositionList : orderDetail_data.falsePersonPosition;
            },
            error: function(error) {

            },

            complete: function() {

            }
        });
    },
    orderDetail_goBack: function() { //工单详情返回
        if (orderDetail_data.goBackFlag == '1') {//空间返回
            orderDetail_data.pub_model.curPage = '';
        } else if (orderDetail_data.goBackFlag == '2') {//计划监控
            model.curPage = model.pages[0];
            model.scrapListArr = [];
        } else if(orderDetail_data.goBackFlag == '3'){//工单管理
            console.log(orderDetail_data.pub_model)
            orderDetail_data.pub_model.curPage = orderDetail_data.pub_model.pages[0];
        } else if(orderDetail_data.goBackFlag == '4'){//工单创建
            orderDetail_data.pub_model.LorC = false;
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
    clickToolListShow: function(event) { //工具列表显示
        $(".tool-select-list").show();
        var _left = $(event.target).offset().left + 40 + 'px';
        $(".tool-select-list").css({ "left": _left, "top": "30px" })
        var _data = {
            obj_type: "3",
            obj_name: ''
        };
        orderDetail_pub.getToolList(_data);
    },
    toggleSelTool: function(p_model, event) { //选中工具
        p_model.checked = !p_model.checked;
        model.toolList = JSON.parse(JSON.stringify(model.toolList));
        if (p_model.checked) {
            model.selectedTool.push(p_model)
        } else {
            for (var i = 0; i < model.selectedTool.length; i++) {
                if (model.selectedTool[i].obj_id == p_model.obj_id) {
                    model.selectedTool.splice(i, 1);
                    break;
                }
            };
        }


        console.log(JSON.stringify(model.selectedTool))


    },
    choiceToolYes: function() { //确定选择工具
        var arr = [];
        for (var i = 0; i < model.selectedTool.length; i++) {
            arr.push(model.selectedTool[i].obj_name)
        }
        model.orderDetailData.required_tools = arr;
        $("#nextStepSelToolPop").hide();
    },
    clickAssignSet: function() { //指派设置
        orderDetail_pub.getPersonPositionList();
    },
    personPositionShow: function(e) { //岗位人员列表显示
        var $target = $(e.target);

        var $person_position_list = $target.parent().parent().find(".choicePersonPosition_con_persion_position");
        if (!$person_position_list.is(":visible")) {
            // console.log(1)
            $person_position_list.show();
            $target.text("b")
        } else {
            $person_position_list.hide();
            $target.text("r")
        }
    },
    createAssignSetHide: function() { //指派隐藏

        $("#createAssignSet").hide();
    },
    clickAdditem: function(item) { //弹出框添加选中

        var id = item.id;

        var personPositionList = JSON.parse(JSON.stringify( orderDetail_data.pub_model.personPositionList));

        personPositionList.forEach(function(item) {

            if (item.id == id) {

                item.isSelected = !item.isSelected;

                // 当父级被选中的时候子级跟随变化
                if (item.type == 2) {
                    item.persons.map(function(t) {

                        t.isSelected = item.isSelected;
                        return t;
                    })
                }
            } else if (item.type == 2) {
                item.isSelected = item.persons.reduce(function(con, info) {
                    info.isSelected = info.id == id ? !info.isSelected : info.isSelected;
                    if (!con) return con;
                    return info.isSelected;
                }, true);
            }
        })

        orderDetail_data.pub_model.personPositionList = personPositionList;

        // Vue.set(this, 'personPositionList', personPositionList);

    },

    createAssignSetYes: function() { //指派设置确定
        var valArr = [];
        var arr = JSON.parse(JSON.stringify(orderDetail_data.pub_model.personPositionList));
        arr.forEach(function(ele) {
            if (ele.isSelected) {
                if (ele.type == 2) {
                    valArr.push({ "name": ele.name, "type": ele.type })
                } else if (ele.type == 3) {
                    valArr.push({ "name": ele.name, "type": ele.type, "person_id": ele.person_id })

                }
            }
            if (ele.type == "2" && !ele.isSelected) {
                ele.persons.forEach(function(p) {
                    if (p.isSelected) {
                        valArr.push({ "name": p.name, "type": "3", "person_id": p.person_id })

                    }
                })
            }
        });
        console.log(JSON.stringify(valArr));
        orderDetail_data.userInfo;
        var nextRoute = valArr;
        var operatorName = orderDetail_data.userInfo.user.name;
        var operatorId = orderDetail_data.userInfo.user.person_id;
        console.log(operatorName)
        var _data = {
            "order_id": orderDetail_data.order_id,
            "operator_id": operatorId,
            "operator_name": operatorName,
            "next_route": nextRoute
        };
        orderDetail_pub.assignOrderSet(_data);
        $("#createAssignSet").hide();
    },
    stopOrderSetYes: function() {//中止工单确定
        var operatorName = orderDetail_data.userInfo.user.name;
        var operatorId = orderDetail_data.userInfo.user.person_id;
        var _data = {
            "order_id": orderDetail_data.order_id,
            "operator_id": operatorId,
            "operator_name": operatorName,
            "opinion": orderDetail_data.stop_order_content
        };
        controller.stopOrderSet(_data);
    },
    getUserInfo: function() {//获取用户信息
        $.ajax({
            url: '/userInfo',
            type: 'get',
            data: {},
            success: function(result) {
                orderDetail_data.userInfo = result;
                // console.log(JSON.stringify(workOrderMngModel.userInfo.user))
            },
            error: function(error) {},
            complete: function() {}
        });
    },
    stopOrder_con_show: function() { //停止工单显示
        $("#stopOrder").pshow();
    },
    stopOrderSetHide: function() { //停止工单隐藏
        $("#stopOrder").phide();
    },
    choiceObjExample: function(_obj, event, objId, objType) { //选择对象实例
        var _data = {
            user_id: model.userId,
            project_id: model.projectId,
            obj_id: objId,
            obj_type: objType
        };
        pub_model.obj_example = _obj;
        console.log(pub_model.obj_example);
        var _scrollTop = $(".see_orderDetail_page_grid").scrollTop();
        var _left = $(event.target).offset().left + 120 + 'px';
        var _top = $(event.target).offset().top - '240' + _scrollTop + 'px';
        console.log($(event.target).offset().top);
        $(".choiceObjExampleModal").css("left", _left);
        $(".choiceObjExampleModal").css("top", _top);
        controller.getObjExample(_data); //获取对象实例请求
    },
}

var orderDetail_data = {
    goBackFlag: '', //调用对象传入标记1只有展示工单详情无任何操作，2需要显示选择对象实例，选择工具，可以指派，可以中止工单
    pub_model: {}, //调用对象传入自己的model
    userInfo: {}, //用户信息存储
    personPositionList:[],//人员岗位列表
    stop_order_content:'',//中止工单内容

}