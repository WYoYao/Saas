var controller = {
    init: function() {
        new Vue({
            el: '#workOrderManage',
            data: workOrderModel,
            methods: workOrderMethod,

        });
        controller.queryFlowPlanRemindMsg(); //工单配置-列表页:提醒信息
        controller.queryProjectFlowPlan(); //工单配置-列表页:查询项目下所有方案
        controller.getOrderTypeList(); //查询工单类型列表
        controller.getOrderImplementType(); //查询工单执行类型
        controller.getAllPositionDuty(); //岗位职责
        controller.getPersonPositionList();


    },


    //------------------------------------------ydx__start------------------------------------------

    getOrderTypeList: function() { //查询工单类型列表
        pajax.post({
            url: 'restGeneralDictService/queryGeneralDictByKey',
            data: {
                dict_type: "work_order_type"
            },
            success: function(res) {
                var _data = res && res.data ? res.data : [];
                // _data = [{ "code": "1", "name": "保养", "description": "xxx" },       //临时使用
                //     { "code": "2", "name": "维修", "description": "xxx" },
                //     { "code": "3", "name": "巡检", "description": "xxx" },
                //     { "code": "4", "name": "运行", "description": "xxx" }
                // ]
                workOrderModel.orderList = _data;

            },
            error: function(error) {

            },

            complete: function() {
                $("#list_loading").phide();
            }
        });
    },
    getOrderImplementType: function() { //查询工单执行类型
        pajax.post({
            url: 'restGeneralDictService/queryGeneralDictByKey',
            data: {
                dict_type: "wo_execute_type"
            },
            success: function(res) {
                var _data = res && res.data ? res.data : [];
                // _data = [{ "code": "all", "name": "全部", "description": "xxx" },     //临时使用
                //     { "code": "temp", "name": "临时性", "description": "xxx" },
                //     { "code": "plan", "name": "计划性", "description": "xxx" }
                // ]
                _data.forEach(function(item,index){
                    if(index !='0'){
                        item.name = item.name + "性";
                    }
                })
                workOrderModel.timerTypeList = _data;

            },
            error: function(error) {

            },

            complete: function() {
                $("#list_loading").phide();
            }
        });
    },
    getAllPositionDuty: function() { //查询岗位职责
        pajax.post({
            url: 'restGeneralDictService/queryGeneralDictByKey',
            data: {
                dict_type: "wo_control_module"
            },
            success: function(res) {
                var _data = res && res.data ? res.data : [];                        
                // _data = [{ "code": "create", "name": "新建工单", "description": "xxx" },    //临时使用
                //     { "code": "assign", "name": "指派工单", "description": "xxx" },
                //     { "code": "execute", "name": "执行工作步骤", "description": "xxx" },
                //     { "code": "apply", "name": "提交申请", "description": "xxx" },
                //     { "code": "audit", "name": "审核申请", "description": "xxx" },
                //     { "code": "stop", "name": "终止工单", "description": "xxx" },
                //     { "code": "close", "name": "结束工单", "description": "xxx" }
                // ];
                var newData = JSON.parse(JSON.stringify(_data));
                newData.forEach(function(items) {
                    items['control_code'] = items['code'];
                    items['control_name'] = items['name'];
                    delete items['code'];
                    delete items['name'];
                    delete items['description'];
                    delete items['dict_type'];
                })
                // console.log(_data);
                workOrderModel.allPositionDuty = JSON.parse(JSON.stringify(newData));

            },
            error: function(error) {

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
                        })
                    }

                    return item;
                });

                workOrderModel.falsePersonPosition = JSON.parse(JSON.stringify(falseList));
                workOrderModel.oneStep_personPositionList = JSON.parse(JSON.stringify(falseList));
                workOrderModel.oneStep_personPositionList_yes = JSON.parse(JSON.stringify(falseList));
                workOrderModel.personPositionList = workOrderModel.personPositionList.length > 0 ? workOrderModel.personPositionList : workOrderModel.falsePersonPosition;




            },
            error: function(error) {

            },

            complete: function() {

            }
        });
    },
    getWorkOrderSave: function(_data) { //新建保存
        pajax.post({
            url: 'restFlowPlanService/addFlowPlan',
            data: _data,
            success: function(res) {
                $("#publishNotice").pshow({ text: '保存成功', state: "success" });
                workOrderModel.curPage = workOrderModel.pages[0];
                controller.queryProjectFlowPlan();
            },
            error: function(error) {
                $("#publishNotice").pshow({ text: '保存失败，请重试', state: "failure" });
            },

            complete: function() {

            }
        });
    },
    getEditOrderDetail: function(_data) { //编辑读取详情
        $('#loadCover').pshow();
        pajax.post({
            // url: 'restGeneralDictService/queryGeneralDictByKey', //临时使用
            url: 'restFlowPlanService/queryFlowPlanById',
            data: _data,
            success: function(result) {
                var data = result ? result : {};
                // var data = templateObj;
                var rightArr = [];
                var rightList = JSON.parse(JSON.stringify(workOrderModel.allPositionDuty));
                var res = data.post_and_duty.map(function(item) {

                    var filter = item.duty.map(function(a) {
                        return a.control_code;
                    });

                    item.right = rightList.map(function(info) {
                        return {
                            control_code: info.control_code,
                            control_name: info.control_name
                        }
                    }).filter(function(b) {
                        return filter.indexOf(b.control_code) == -1;
                    })

                    return item;
                });

                // console.log(JSON.stringify(res));
                workOrderModel.editOrderCon = data.order_type_name;
                workOrderModel.editTimerCon = data.execute_type_name;
                workOrderModel.editOrderCode = data.order_type;
                workOrderModel.editTimerCode = data.execute_type;
                // setTimeout(function() { //设置下拉框选中
                    

                // }, 0);
                //添加下级路由数据构造
                var perPosiList = JSON.parse(JSON.stringify(workOrderModel.falsePersonPosition));
                var newArr = res.map(function(item) {
                    var duty = item.duty.map(function(b) {
                        if (b.control_code == 'create' || b.control_code == 'assign') {
                            b["ppList"] = [];
                            b["ppList"] = JSON.parse(JSON.stringify(perPosiList));
                        } else {
                            b["ppList"] = [];
                        }
                        return b

                    })
                    return item
                });
                // var newArr2 = JSON.parse(JSON.stringify(newArr));
                //设置选中元素状态
                newArr.forEach(function(item, index1) {
                    item.duty.forEach(function(info, index2) {
                        info.ppList.forEach(function(pplist, index3) {
                            info.next_route.forEach(function(next, index4) {
                                if (next.name == pplist.name) {
                                    pplist.isSelected = true;
                                    if (next.type == '2') {
                                        pplist.persons.forEach(function(person, index5) {
                                            person.isSelected = true;
                                        })
                                    }

                                }

                            })
                        })
                    })
                });
                workOrderModel.operateOptionList = JSON.parse(JSON.stringify(newArr))
                // console.log(JSON.stringify(newArr));


            },
            error: function(error) {

            },

            complete: function() {
                $('#loadCover').phide();
            }
        });
    },
    getEditWorkOrderSave: function(_data) { //编辑保存
        pajax.post({
            url: 'restFlowPlanService/updateFlowPlanById',
            data: _data,
            success: function(result) {
                $("#publishNotice").pshow({ text: '保存成功', state: "success" });
                workOrderModel.curPage = workOrderModel.pages[0];
            },
            error: function(error) {
                $("#publishNotice").pshow({ text: '保存失败，请重试', state: "failure" });
            },
            complete: function() {

            }
        });
    },
    getErrorFlowPlanType: function(typeData, commitData, pustAndDutyData, orderTypeName, executeTypeName) { //验证工单类型、时间类型
        pajax.post({
            url: 'restFlowPlanService/verifyFlowPlanType',
            data: typeData,
            success: function(result) {
                if (result && result.can_use) {
                    controller.getErrorPostAndDuty(pustAndDutyData, commitData);

                } else {
                    $("#publishNotice").pshow({ text: executeTypeName + orderTypeName + '方案已存在,不可重复!', state: "failure" });

                }
            },
            error: function(error) {
                $("#publishNotice").pshow({ text: '保存失败，请重试', state: "failure" });
            },
            complete: function() {

            }
        });
    },
    getErrorPostAndDuty: function(pustAndDutyData, commitData) {//新建提交验证
        pajax.post({
            url: 'restFlowPlanService/verifyPostAndDuty',
            data: pustAndDutyData,
            success: function(result) {

                // result = {                                                      //假数据需真实数据测试
                //     isPass: false,
                //     reminds: ["提示消息1", "提示消息2", "提示消息3"],           //临时使用
                //     post_and_duty: [{
                //         'type': 2,
                //         'name': '岗位A',
                //         'duty': ["create"]
                //     }, {
                //         'type': 3,
                //         'personId': '66666',
                //         'name': '人员A',
                //         'duty': ["apply"]
                //     }]
                // }

                if (result && result.is_pass) {
                    controller.getWorkOrderSave(commitData);

                } else {
                    var operateOptionList = JSON.parse(JSON.stringify(workOrderModel.operateOptionList));
                    workOrderModel.createReminds = result.reminds;
                    var postAndDutyError = JSON.parse(JSON.stringify(result.post_and_duty));
                    postAndDutyError.forEach(function(errorDuty) {
                        if (errorDuty.type == '2') {
                            operateOptionList.forEach(function(list) {
                                if (list.name == errorDuty.name && list.type == errorDuty.type) {
                                    // console.log(errorDuty.duty);
                                    list.duty.forEach(function(info) {
                                        // info["redBorder"] = null;
                                        errorDuty.duty.forEach(function(item) {
                                            if (item == info.control_code){
                                                info["redBorder"] = true;
                                                // console.log(info.control_name)
                                            }
                                        })
                                    })

                                }
                            })
                        }else if(errorDuty.type == '3'){
                            operateOptionList.forEach(function(list) {
                                if (list.personId == errorDuty.person_id) {
                                    // console.log(errorDuty.duty);
                                    list.duty.forEach(function(info) {
                                        // info["redBorder"] = null;
                                        errorDuty.duty.forEach(function(item) {
                                            if (item == info.control_code && list.type == errorDuty.type){
                                                info["redBorder"] = true;
                                                // console.log(info.control_name)
                                            }
                                        })
                                    })

                                }
                            })
                        }
                    });

                    workOrderModel.operateOptionList = JSON.parse(JSON.stringify(operateOptionList));

                }


            },
            error: function(error) {

            },
            complete: function() {

            }
        });
    },
    getEditErrorPostAndDuty: function(pustAndDutyData, editData) {//编辑提交验证
        pajax.post({
            url: 'restFlowPlanService/verifyPostAndDuty',
            data: pustAndDutyData,
            success: function(result) {
                if (result && result.is_pass) {
                    controller.getEditWorkOrderSave(editData);

                } else {
                    var operateOptionList = JSON.parse(JSON.stringify(workOrderModel.operateOptionList));
                    workOrderModel.createReminds = result.reminds;
                    var postAndDutyError = JSON.parse(JSON.stringify(result.post_and_duty));
                    postAndDutyError.forEach(function(errorDuty) {
                        if (errorDuty.type == '2') {
                            operateOptionList.forEach(function(list) {
                                if (list.name == errorDuty.name && list.type == errorDuty.type) {
                                    // console.log(errorDuty.duty);
                                    list.duty.forEach(function(info) {
                                        // info["redBorder"] = null;
                                        errorDuty.duty.forEach(function(item) {
                                            if (item == info.control_code){
                                                info["redBorder"] = true;
                                                // console.log(info.control_name)
                                            }
                                        })
                                    })

                                }
                            })
                        }else if(errorDuty.type == '3'){
                            operateOptionList.forEach(function(list) {
                                if (list.personId == errorDuty.person_id) {
                                    // console.log(errorDuty.duty);
                                    list.duty.forEach(function(info) {
                                        // info["redBorder"] = null;
                                        errorDuty.duty.forEach(function(item) {
                                            if (item == info.control_code && list.type == errorDuty.type){
                                                info["redBorder"] = true;
                                                // console.log(info.control_name)
                                            }
                                        })
                                    })

                                }
                            })
                        }
                    });

                    workOrderModel.operateOptionList = JSON.parse(JSON.stringify(operateOptionList));

                }


            },
            error: function(error) {
                $("#publishNotice").pshow({ text: '保存失败，请重试', state: "failure" });
            },
            complete: function() {

            }
        });
    },


    //------------------------------------------ydx__end------------------------------------------
    //------------------------------------------yn__start------------------------------------------

    //------------------------------------------yn__end------------------------------------------


    //------------------------------------------yn__start------------------------------------------
    // ajax请求
    /*工单配置-列表页:查询项目下所有方案*/
    queryProjectFlowPlan: function() {
        $('#loadCover').pshow();
        pajax.post({
            url: 'restFlowPlanService/queryProjectFlowPlan',
            data: {},
            success: function(result) {
                var data = result && result.data ? result.data : [];
                workOrderModel.schemeList = data;
                $("#scheme-notice").pshow({ text: '获取数据成功', state: "success" });
            },
            error: function(err) {
                $("#scheme-notice").pshow({ text: '获取数据失败', state: "failure" });
            },
            complete: function() {
                $('#loadCover').phide();
            }
        });
    },
    /*工单配置-列表页:查询项目下所有方案 提示信息*/
    queryFlowPlanRemindMsg: function() {
        $('#loadCover').pshow();
        pajax.post({
            url: 'restFlowPlanService/queryFlowPlanRemindMsg',
            data: {},
            success: function(result) {
                var data = result && result.Item && result.Item.remind ? result.Item.remind : "";
                if (result.Result == "success") {
                    workOrderModel.tipMsg = data;
                    $("#scheme-notice").pshow({ text: '获取提醒信息成功', state: "success" });
                } else {
                    workOrderModel.tipMsg = "";
                    $("#scheme-notice").pshow({ text: '获取提醒信息成功', state: "success" });
                }
            },
            error: function(err) {
                $("#scheme-notice").pshow({ text: '获取数据失败', state: "failure" });
            },
            complete: function() {
                $('#loadCover').phide();
            }
        });
    },
    /*工单配置-列表页:根据Id删除流转方案信息*/
    deleteFlowPlanById: function() {
        $('#loadCover').pshow();
        workOrderModel.schemeList = [];
        pajax.update({
            url: 'restFlowPlanService/deleteFlowPlanById',
            data: {
                plan_id:workOrderModel.del_plan_id,

            },
            success: function(result) {
                    $("#scheme-notice").pshow({ text: '删除成功', state: "success" });
            },
            error: function(err) {
                $("#scheme-notice").pshow({ text: '删除失败', state: "failure" });
            },
            complete: function() {
                $('#loadCover').phide();
                $("#del-confirm").phide();
                controller.queryProjectFlowPlan(); //工单配置-列表页:查询项目下所有方案,此处重新获取一遍列表
            }
        });
    },
    /*工单配置-列表页:根据Id查询流转方案详细信息*/
    queryFlowPlanById: function(index, content, event) {
        $('#loadCover').pshow();
        pajax.post({
            url: 'restFlowPlanService/queryFlowPlanById',
            data: {
                plan_id: content
            },
            success: function(result) {
                console.log(result);
                workOrderModel.detailScheme = result;
            },
            error: function(err) {
                $("#scheme-notice").pshow({ text: '查询失败', state: "failure" });
            },
            complete: function() {
                $('#loadCover').phide();
                $("#floatWindow").pshow({ title: '流转方案详情' })
            }
        });
    }

    //------------------------------------------yn__end------------------------------------------

};