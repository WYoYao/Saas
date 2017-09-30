var workOrderModel = { //工单管理模块数据模型
    //------------------------------------------ydx__start------------------------------------------
    pages: ['schemeList', 'createWorkOrderCommon'], //页面
    curPage: 'schemeList', //当前页面
    user_id: 'RY1505218031651', //用户id
    project_id: 'Pj1301020001', //项目id
    plan_id: '', //工单计划id
    orderList: [], //工单下拉,
    timerTypeList: [], //时间下拉
    choiceOrderType: {},
    choiceTimerType: {},
    editOrderCon: '', //编辑时工单内容
    editOrderCode: '', //编辑时工单code
    editTimerCon: '', //编辑时时间内容
    editTimerCode: '', //编辑时时间code
    allPositionDuty: [], //全部岗位职责列表
    falsePersonPosition: [], //人员岗位false列表
    truePersonPosition: [], //人员岗位true列表
    // rightPositionDutyList:[],//右侧保存列表
    // centerPositionDutyList:[],//中间操作列表
    personPositionList: [], //人员岗位列表
    listShow: false, //职责列表显示
    operateOptionList: [], //岗位人员渲染对象
    operateOptionFaIndex: '', //父级index
    operateOptionChildIndex: '', //子级index
    currStepDutyName: '', //当前执行步骤名称
    currStepDutyCode: '', //当前执行步骤code
    positionPersonModelList: [ //岗位人员模块
        // {
        //     "type": "2",
        //     "name": "岗位名称",
        //     "duty": [

        //     ]


        // },
        // {
        //     "type": "2",
        //     "name": "岗位名称",
        //     "duty": [

        //     ]

        // }
    ],
    createAssignSetList: [], //指派人员列表
    createReminds:[],//提示消息文本

    //------------------------------------------ydx__end------------------------------------------

    //------------------------------------------yn__start------------------------------------------
    //vue绑定的数据data
    schemeList: [], //列表页:查询项目下所有方案
    del_plan_id: "", //方案计划id
    tipMsg: "", //提醒信息
    detailScheme: {} //流转方案详情
    //------------------------------------------yn__end------------------------------------------
}


var workOrderMethod = { //工单管理模块方法
    //------------------------------------------ydx__start------------------------------------------
    newCreateOrder: function() { //创建公单
        this.plan_id = '';
        this.personPositionList = [];
        this.operateOptionList = [];
        this.editOrderCon = '';
        this.editTimerCon = '';
        this.editOrderCode = '';
        this.editTimerCode = '';
        this.createReminds = [];
        workOrderModel.curPage = workOrderModel.pages[1];
    },
    goBackOrderList: function() { //返回
        this.plan_id = '';
        this.personPositionList = [];
        this.operateOptionList = [];
        this.editOrderCon = '';
        this.editTimerCon = '';
        this.editOrderCode = '';
        this.editTimerCode = '';
        this.createReminds = [];
        workOrderModel.curPage = workOrderModel.pages[0];
    },
    editOrderListInfo: function(obj) { //编辑
        workOrderModel.plan_id = obj.plan_id;
        var userId = workOrderModel.user_id;
        var projectId = workOrderModel.project_id;
        workOrderModel.curPage = workOrderModel.pages[1];
        // console.log(obj);
        var data = {
            plan_id: workOrderModel.plan_id
        }
        controller.getEditOrderDetail(data);

    },
    deletePersonPosition: function(items, index) { //删除人和岗位
        var arr = JSON.parse(JSON.stringify(workOrderModel.operateOptionList));
        arr.splice(index, 1);
        workOrderModel.operateOptionList = arr;
    },
    // 模态框相关
    stepsToPerformWorkHide: function() { //执行工作步骤隐藏
        $("#stepsToPerformWork").phide();
    },
    createWorkOrderSetHide: function() { //新建工单设置隐藏
        $("#createWorkOrderSet").phide();
    },
    checkOrderSetHide: function() { //审核工单hide

        $("#checkOrderSet").hide();
    },

    createAssignSetHide: function() { //指派隐藏

        $("#createAssignSet").hide();
    },
    addPersonPosition: function() { //添加人员或岗位click
        controller.getPersonPositionList(); //获取人员岗位请求
        $("#choicePersonPosition").pshow();
    },
    choicePersonPosiSetHide: function() { //选择人员隐藏
        $("#choicePersonPosition").phide()
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
    choicePositionResult: function(e) { //岗位选中事件
        return;
        var postionBool = $(e.currentTarget).psel();
        var persionList = $(e.currentTarget).parent().parent().parent().find("li");
        if (postionBool) {
            for (var i = 0; i < persionList.length; i++) {
                persionList.find(".persion_checkbox >div")[i].psel(true);
            }
        } else {
            for (var i = 0; i < persionList.length; i++) {
                persionList.find(".persion_checkbox >div")[i].psel(false);
            }
        }
    },
    choicePersonResult: function(e, index) { //选择人事件
        return;
        var persionList = $(e.currentTarget).parent().parent().parent().find("li");
        var persionListLength = $(e.currentTarget).parent().parent().parent().find("li").length;
        var tag = 0;
        for (var i = 0; i < persionList.length; i++) {
            if (persionList.find(".persion_checkbox >div")[i].psel()) {
                tag++;
            }

        }
        if (persionListLength === tag) {
            persionList.parent().parent().find(".position_checkbox >div").psel(true, false);
        } else {
            persionList.parent().parent().find(".position_checkbox >div").psel(false, false);

        }
    },
    addPositionPersonModel: function() { //点击确定添加人或岗位
        var valArr = [];
        var arr = JSON.parse(JSON.stringify(workOrderModel.personPositionList));

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
        // console.log(JSON.stringify(valArr))
        var _data = workOrderModel.allPositionDuty; //执行步骤列表全集
        var perPosiList = JSON.parse(JSON.stringify(workOrderModel.falsePersonPosition)); //下级路由选择人和岗位列表
        valArr.forEach(function(info) {
            info.duty = [];
            info.right = JSON.parse(JSON.stringify(_data));
            // info.duty.ppList = JSON.parse(JSON.stringify(perPosiList));

        });
        // console.log(JSON.stringify(valArr));
        workOrderModel.operateOptionList = JSON.parse(JSON.stringify(valArr));
        $("#choicePersonPosition").hide();

    },
    clickAdditem: function(item) { //弹出框添加选中

        var id = item.id;

        var personPositionList = JSON.parse(JSON.stringify(workOrderModel.personPositionList));

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

        workOrderModel.personPositionList = personPositionList;

        // Vue.set(this, 'personPositionList', personPositionList);

    },

    //添加更多职责
    addMoreDuty: function(items, itIndex, right, index) {
        items[itIndex].duty.push(items[itIndex].right[index]);
        items[itIndex].right.splice(index, 1);
    },
    removeDutyData: function(items, itIndex, duty, index) { //移除职责
        items[itIndex].right.unshift(items[itIndex].duty[index]);
        items[itIndex].duty.splice(index, 1);
    },
    //点击执行步骤弹出框
    clickDutyShowModal: function(allList, arr, name, code, faIndex, childIndex) {
        var _this = this;
        //将父级和当前的index存储到model;
        //operateOptionFaIndex:'',//父级index
        //operateOptionChildIndex:'',//子级index
        // console.log(JSON.parse(JSON.stringify(allList)))
        var _data = JSON.parse(JSON.stringify(workOrderModel.falsePersonPosition));
        // console.log(name,code,faIndex,childIndex);
        workOrderModel.operateOptionFaIndex = faIndex;
        workOrderModel.operateOptionChildIndex = childIndex;
        workOrderModel.currStepDutyName = name;
        workOrderModel.currStepDutyCode = code;
        // if (name == '选择人员或岗位') {
        //     $("#choicePersonPosition").pshow();

        // } 
        /*创建工单*/
        if (code == 'create') {
            if (!_this.plan_id) { //新建
                // console.log(allList);
                // allList.duty.forEach(function(info,index2){
                //     info.ppList = _data
                // });

                _this.personPositionList = arr.ppList ? arr.ppList : _data;
                // _this.
                var state = $(".createWorkOrderSet_con_filter_person >div").psel(); //过滤
                $(".createWorkOrderSet_con_filter_person >div").psel(state);
                var moreFlag = $("#moreOperaBtn > div").psel();
                if (moreFlag) {
                    $("#moreOperaBtn > div").psel(true);
                } else {
                    $("#oneOperaBtn >div").psel(true)
                }

            } else { //编辑
                _this.personPositionList = arr.ppList; //返回编辑读取人员列表
                var state = arr.filter_scheduling ? true : false; //是否过滤
                $(".createWorkOrderSet_con_filter_person >div").psel(state);
                var moreFlag1 = arr.executie_mode;
                if (moreFlag == '2') {
                    $("#moreOperaBtn > div").psel(true);
                } else {
                    $("#oneOperaBtn >div").psel(true)
                }
            }
            $("#createWorkOrderSet").pshow();
        }
        /* 执行工作步骤*/
        else if (code == 'execute') {
            if (!_this.plan_id) {
                var flag = $(".stepsToPerformWork_con_operat >div").psel();
                $(".stepsToPerformWork_con_operat >div").psel(flag);
                $(".stepsToPerformWork_con_operat >div").psel()
            } else {
                var flag = arr.limit_domain;
                $(".stepsToPerformWork_con_operat >div").psel(flag)
            }
            $("#stepsToPerformWork").pshow();
        }
        /*指派工单*/
        else if (code == 'assign') {
            if (!_this.plan_id) {
                var state = $(".createAssignSet_con_filter_person >div").psel();
                $(".createAssignSet_con_filter_person >div").psel(state);
                var trueList = _data.map(function(item) {
                    item.isSelected = true;

                    item.id = ptool.produceId();

                    if (item.type == 2) {

                        item.persons = item.persons.map(function(info) {

                            info.isSelected = true;
                            info.id = ptool.produceId();
                            return info;
                        })
                    }

                    return item;
                });
                _this.personPositionList = arr.ppList ? arr.ppList : trueList;
            } else {
                // console.log(arr)
                var state = arr.filter_scheduling ? true : false;
                $(".createAssignSet_con_filter_person >div").psel(state);
                _this.personPositionList = arr.ppList;
            };
            $("#createAssignSet").pshow();
        }
        /* 审核申请*/
        else if (code == 'audit') {
            if (!_this.plan_id) {
                var flag = $(".checkOrderSet_con_operat >div").psel();
                $(".checkOrderSet_con_operat >div").psel(flag);
                $(".checkOrderSet_con_operat >div").psel()
            } else {
                var flag = arr.limit_domain;
                if (flag == "1") {
                    $("#stepsToPerformWork_con_operat_open").psel(true)
                } else {
                    $("#stepsToPerformWork_con_operat_close").psel(true)
                }
            }
            $("#checkOrderSet").pshow();

        }
    },
    createWorkOrderSetYes: function() { //新建工单确定
        var fIndex = workOrderModel.operateOptionFaIndex;
        var cIndex = workOrderModel.operateOptionChildIndex;
        var name = workOrderModel.currStepDutyName;
        var code = workOrderModel.currStepDutyCode;
        var valArr = [];
        var arr = JSON.parse(JSON.stringify(workOrderModel.personPositionList));
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
        // console.log(JSON.stringify(valArr));


        var filter_scheduling = $(".createWorkOrderSet_con_filter_person >div").psel();
        var executie_mode = $(".createWorkOrderSet_con_opera_choice >div").psel() ? '2' : '1';
        workOrderModel.operateOptionList[fIndex].duty[cIndex].next_route = valArr;
        workOrderModel.operateOptionList[fIndex].duty[cIndex].executie_mode = executie_mode;
        workOrderModel.operateOptionList[fIndex].duty[cIndex].filter_scheduling = filter_scheduling;
        //设置ppList里面元素选中
        var newArr = JSON.parse(JSON.stringify(workOrderModel.operateOptionList));
        newArr.forEach(function(item, index1) {
            item.duty.forEach(function(info, index2) {
                if (!info.ppList) {
                    info.ppList = workOrderModel.falsePersonPosition;

                }
                info.ppList.map(function(pplist, index3) {
                    if (info.next_route) {
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
                    }

                })


            })
        });
        workOrderModel.operateOptionList = JSON.parse(JSON.stringify(newArr))
        // console.log(JSON.stringify(newArr));

        // workOrderModel.operateOptionList[fIndex].next_route.[cIndex]
        //这里获得的valArr是next_route的结果
        $("#createWorkOrderSet").hide();

    },
    createAssignSetYes: function() { //指派设置确定
        var fIndex = workOrderModel.operateOptionFaIndex;
        var cIndex = workOrderModel.operateOptionChildIndex;
        var name = workOrderModel.currStepDutyName;
        var code = workOrderModel.currStepDutyCode;
        var valArr = [];
        var arr = JSON.parse(JSON.stringify(workOrderModel.personPositionList));
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
        // console.log(JSON.stringify(valArr));
        var filter_scheduling = $(".createAssignSet_con_filter_person >div").psel();
        workOrderModel.operateOptionList[fIndex].duty[cIndex].next_route = valArr;
        workOrderModel.operateOptionList[fIndex].duty[cIndex].filter_scheduling = filter_scheduling;

        //设置ppList里面元素选中
        var newArr = JSON.parse(JSON.stringify(workOrderModel.operateOptionList));
        newArr.forEach(function(item, index1) {
            item.duty.forEach(function(info, index2) {
                if (!info.ppList) {
                    info.ppList = workOrderModel.falsePersonPosition;

                }
                info.ppList.map(function(pplist, index3) {
                    if (info.next_route) {
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
                    }

                })


            })
        });
        workOrderModel.operateOptionList = JSON.parse(JSON.stringify(newArr))
        // console.log(JSON.stringify(newArr));


        $("#createAssignSet").hide();
    },
    stepsToPerformWorkYes: function() { //执行工作步骤确定
        var fIndex = workOrderModel.operateOptionFaIndex;
        var cIndex = workOrderModel.operateOptionChildIndex;
        var name = workOrderModel.currStepDutyName;
        var code = workOrderModel.currStepDutyCode;
        var filter_scheduling = !$(".stepsToPerformWork_con_operat >div").psel();
        workOrderModel.operateOptionList[fIndex].duty[cIndex].filter_scheduling = filter_scheduling;
        $("#stepsToPerformWork").hide();
    },
    checkOrderSetYes: function() { //审核确定
        var fIndex = workOrderModel.operateOptionFaIndex;
        var cIndex = workOrderModel.operateOptionChildIndex;
        var name = workOrderModel.currStepDutyName;
        var code = workOrderModel.currStepDutyCode;
        var audit_close_way = $(".checkOrderSet_con_operat >div").psel() ? '2' : '1';
        workOrderModel.operateOptionList[fIndex].duty[cIndex].audit_close_way = audit_close_way;
        $("#checkOrderSet").hide();
    },
    choiceOrderFn: function(model, event) {
        // console.log(model, event)
        workOrderModel.choiceOrderType = model;

    },
    choiceTimerFn: function(model, event) {
        // console.log(model, event)
        workOrderModel.choiceTimerType = model;
    },

    workOrderCommonSave: function() { //保存
        this.createReminds = [];//清空提示数组
        var post_and_duty = JSON.parse(JSON.stringify(workOrderModel.operateOptionList));
        var userId = workOrderModel.user_id;
        var projectId = workOrderModel.project_id;
        var planId = workOrderModel.plan_id;
        var orderType = workOrderModel.choiceOrderType.code ? workOrderModel.choiceOrderType.code : '';
        var orderTypeName = workOrderModel.choiceOrderType.name ? workOrderModel.choiceOrderType.name : '';
        var executeType = workOrderModel.choiceTimerType.code ? workOrderModel.choiceTimerType.code : '';
        var executeTypeName = workOrderModel.choiceTimerType.name ? workOrderModel.choiceTimerType.name : '';
        post_and_duty.forEach(function(item) {
            delete item.right;
            item.duty.forEach(function(info) {
                delete info.ppList;
                if(info.control_code == 'create'){
                    delete info.audit_close_way;
                    delete info.limit_domain;
                }else if(info.control_code == 'assign'){
                    delete info.audit_close_way;
                    delete info.limit_domain;
                    delete info.executie_mode;
                }else if(info.control_code == 'execute'){
                    delete info.audit_close_way;
                    delete info.filter_scheduling;
                    delete info.executie_mode;
                }else if(info.control_code == 'apply'){
                    delete info.audit_close_way;
                    delete info.filter_scheduling;
                    delete info.limit_domain;
                    delete info.executie_mode;
                }else if(info.control_code == 'audit'){
                    delete info.filter_scheduling;
                    delete info.limit_domain;
                    delete info.executie_mode;
                }else if(info.control_code == 'stop'){
                    delete info.audit_close_way;
                    delete info.filter_scheduling;
                    delete info.limit_domain;
                    delete info.executie_mode;
                }else if(info.control_code == 'close'){
                    delete info.audit_close_way;
                    delete info.filter_scheduling;
                    delete info.limit_domain;
                    delete info.executie_mode;
                }

            })
        });
        // console.log(JSON.stringify(post_and_duty))
            var order,
                timer,
                result3,
                result4,
                result5,
                result6;
            var commitData = {
                order_type: orderType,
                execute_type: executeType,
                post_and_duty: post_and_duty
            };
            var pustAndDutyData = {//验证工单执行是否正确
                order_type: orderType,
                execute_type: executeType,
                post_and_duty: post_and_duty  
            };
            var typeData = {//验证工单类型提交data
                // plan_id: planId,
                order_type: orderType,
                execute_type: executeType
            };

        if (!planId) {
            
            if (orderType != '') {
                order = true;
                $("#timerTypeError").hide();
            } else {
                $("#timerTypeError").show();
                order = false;
            };
            if (executeType != '') {
                timer = true;
                $("#orderTypeError").hide();
            } else {
                timer = false;
                $("#orderTypeError").show();
            };
            if (order && timer) {

                controller.getErrorFlowPlanType(typeData, commitData,pustAndDutyData, orderTypeName, executeTypeName)

            } else {
                $("#publishNotice").pshow({ text: '保存失败，请重试', state: "failure" });
            }

        } else {
            orderType = workOrderModel.editOrderCode;
            executeType = workOrderModel.editTimerCode;
            var pustAndDutyData = {
                // plan_id: planId,
                order_type: orderType,
                execute_type: executeType,
                post_and_duty: post_and_duty
            };
            var editData = {
                order_type: orderType,
                execute_type: executeType,
                post_and_duty: post_and_duty
            };
            controller.getEditErrorPostAndDuty(pustAndDutyData,editData)//编辑验证
            // controller.getEiteWorkOrderSave(data);
        }


    }




    //------------------------------------------ydx__end------------------------------------------


    //------------------------------------------yn__start------------------------------------------
    //vue的方法


    //------------------------------------------yn__end------------------------------------------
}