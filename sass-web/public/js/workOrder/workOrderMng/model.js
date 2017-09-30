var workOrderMngModel = { //工单管理模块数据模型
    //------------------------------------------ydx__start------------------------------------------
    pages: ["workOrderList", "see_orderDetail"], //所有页面导航
    curPage: 'workOrderList', //当前页面
    orderDetailData: {}, //工单详情数据
    orderOperatList: [], //工单操作列表
    personPositionList: [], //人员岗位列表
    userInfo:{},//存储用户信息
    order_id:'',//工单id
    orderDetailObj:{},//工单详情传入对象，包括type,fn
    stop_order_content:'',//终止工单输入内容
    //------------------------------------------ydx__end------------------------------------------

    //------------------------------------------yn__start------------------------------------------
    //vue绑定的数据data
    user_id: 'RY1505218031651', //用户id
    project_id: 'Pj1301020001', //项目id
    timeType: [], //时间类型
    workType: [], //工单类型
    workState: [], //工单状态
    createPerson: [], //创建人
    temList: [],
    workList: [], //所有工单
    pageNum: 1, //请求页数

    //------------------------------------------yn__end------------------------------------------
}


var workOrderMngMethod = { //工单管理模块方法
    //------------------------------------------ydx__start------------------------------------------
    timeFormatting: function(str) {
        var str = str || '';
        var nstr = str.substr(0, 4) + "-" + str.substr(4, 2) + "-" + str.substr(6, 2) + " " + str.substr(8, 2) + ":" + str.substr(10, 2) + ":" + str.substr(12, 2);
        return nstr;
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
    openOrderDetail: function(order_id,type,fn) { //打开工单详情
        controller.getOrderDetail(order_id, model);
        workOrderMngModel.order_id = order_id;
        workOrderMngModel.orderDetailObj = {
            type:type,
            fn:fn,
        };
        workOrderMngModel.curPage = workOrderMngModel.pages[1];
    },
    goBackOrderList: function() { //返回工单列表
        workOrderMngModel.orderDetailData = [];
        workOrderMngModel.orderOperatList = [];
        workOrderMngModel.curPage = workOrderMngModel.pages[0];

    },
    createAssignSetHide: function() { //指派隐藏

        $("#createAssignSet").hide();
    },
    timeFormatting: function(str) { //时间格式化
        var str = str || '';
        var nstr = str.substr(0, 4) + "-" + str.substr(4, 2) + "-" + str.substr(6, 2) + " " + str.substr(8, 2) + ":" + str.substr(10, 2) + ":" + str.substr(12, 2);
        return nstr;
    },
    clickAssignSet: function() { //指派设置
        controller.getPersonPositionList();
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
    clickAdditem: function(item) { //弹出框添加选中

        var id = item.id;

        var personPositionList = JSON.parse(JSON.stringify(workOrderMngModel.personPositionList));

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

        workOrderMngModel.personPositionList = personPositionList;

        // Vue.set(this, 'personPositionList', personPositionList);

    },
    
    createAssignSetYes: function() { //指派设置确定
        var valArr = [];
        var arr = JSON.parse(JSON.stringify(workOrderMngModel.personPositionList));
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
        workOrderMngModel.userInfo
        var nextRoute = valArr;
        var operatorName = workOrderMngModel.userInfo.user.name;
        var operatorId =  workOrderMngModel.userInfo.user.person_id;
        console.log(operatorName)
        var _data = {
            "order_id": workOrderMngModel.order_id,
            "operator_id": operatorId,
            "operator_name": operatorName,
            "next_route": nextRoute
        };
        controller.assignOrderSet(_data);
        // var filter_scheduling = $(".createAssignSet_con_filter_person >div").psel();
        // workOrderMngModel.operateOptionList[fIndex].duty[cIndex].next_route = valArr;
        // workOrderMngModel.operateOptionList[fIndex].duty[cIndex].filter_scheduling = filter_scheduling;

        // //设置ppList里面元素选中
        // var newArr = JSON.parse(JSON.stringify(workOrderMngModel.operateOptionList));
        // newArr.forEach(function(item, index1) {
        //     item.duty.forEach(function(info, index2) {
        //         if (!info.ppList) {
        //             info.ppList = workOrderMngModel.falsePersonPosition;

        //         }
        //         info.ppList.map(function(pplist, index3) {
        //             if (info.next_route) {
        //                 info.next_route.forEach(function(next, index4) {
        //                     if (next.name == pplist.name) {
        //                         pplist.isSelected = true;
        //                         if (next.type == '2') {
        //                             pplist.persons.forEach(function(person, index5) {
        //                                 person.isSelected = true;
        //                             })
        //                         }

        //                     }

        //                 })
        //             }

        //         })


        //     })
        // });
        // workOrderModel.workOrderMngModel = JSON.parse(JSON.stringify(newArr))
        // console.log(JSON.stringify(newArr));


        $("#createAssignSet").hide();
    },
    stopOrderSetYes:function(){
        var operatorName = workOrderMngModel.userInfo.user.name;
        var operatorId =  workOrderMngModel.userInfo.user.person_id;
        var _data = {
            "order_id": workOrderMngModel.order_id,
            "operator_id": operatorId,
            "operator_name": operatorName,
            "opinion": workOrderMngModel.stop_order_content
        };
        controller.stopOrderSet(_data);
    },
    stopOrder_con_show:function(){//停止工单显示
        $("#stopOrder").pshow();
    },
    stopOrderSetHide:function(){//停止工单隐藏
        $("#stopOrder").phide();
    },


    //------------------------------------------ydx__end------------------------------------------

    //------------------------------------------yn__start------------------------------------------
    //vue的方法


    //------------------------------------------yn__end------------------------------------------
}