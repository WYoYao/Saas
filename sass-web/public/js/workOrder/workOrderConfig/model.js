var workOrderModel = { //工单管理模块数据模型
    //------------------------------------------ydx__start------------------------------------------
    pages: ['schemeList', 'createWorkOrderCommon'], //页面
    curPage: 'schemeList', //当前页面
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
        $("#orderTypeSelect").precover("请选择工单类型");
        $("#timerTypeSelect").precover("请选择时间类型");
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
        $("#orderTypeError").hide();
        $("#timerTypeError").hide();
    },
    editOrderListInfo: function(obj) { //编辑
        workOrderModel.plan_id = obj.plan_id;
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
        // setTimeout(function(){
        //     $("#stepsToPerformWork_con_operat_open").psel(true);
        // },500)
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


        if(!workOrderModel.personPositionList.length){
            controller.getPersonPositionList(); //获取人员岗位请求
        }

        // var _personList = workOrderModel.falsePersonPosition;
        // if(_personList == undefined){
        //     controller.getPersonPositionList(); //获取人员岗位请求
        // }else if(_personList.length >0){
        //     workOrderModel.personPositionList = _personList;
        // }else{
        //     controller.getPersonPositionList(); //获取人员岗位请求
        // }
        $("#choicePersonPosition").pshow();
    },
    choicePersonPosiSetHide: function() { //选择人员隐藏
        $("#choicePersonPosition").phide()
    },
    personPositionShow: function(e,argu) { //岗位人员列表显示


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

        workOrderModel.personPositionList=workOrderModel.personPositionList.map(function(item){
            
            item.isLock=item.isSelected?true:false;
            return item;
        });

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
        // var perPosiList = JSON.parse(JSON.stringify(workOrderModel.falsePersonPosition)); //下级路由选择人和岗位列表
        valArr.forEach(function(info) {
            info.duty = [];
            info.right = JSON.parse(JSON.stringify(_data));
            // info.duty.ppList = JSON.parse(JSON.stringify(perPosiList));
        });


        valArrMap=valArr.map(function(x){
            return x.name;
        });

        oolMap=workOrderModel.operateOptionList.map(function(x){
            return x.name;
        })

        // 获取新增项
        var resultArr= valArrMap.reduce(function(con,name,i){
            var index=oolMap.indexOf(name);
            if(index==-1){
                con.push(i);
            }

            return con;
        },[]).map(function(index){
            return valArr[index];
        });

        // console.log(JSON.stringify(valArr));
        // workOrderModel.operateOptionList = JSON.parse(JSON.stringify(valArr));

        workOrderModel.operateOptionList=(workOrderModel.operateOptionList || []).concat(resultArr);
        $("#choicePersonPosition").hide();

    },
    clickAdditem: function(item) { //弹出框添加选中

        if(item.isLock)return;

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
            var _filter = workOrderModel.operateOptionList[faIndex].duty[childIndex].filter_scheduling;//过滤人员
            var _executieMode = workOrderModel.operateOptionList[faIndex].duty[childIndex].executie_mode;//执行方式
            var _ppList = workOrderModel.operateOptionList[faIndex].duty[childIndex].ppList;
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
            if (!_this.plan_id) { //新建

                _this.personPositionList = arr.ppList ? arr.ppList : _data;
                /*过滤人员*/
                if(_filter == undefined){
                    $("#new_filter_person").psel(true);
                }else if(_filter == true){
                    $("#new_filter_person").psel(true);
                }else{
                    $("#new_filter_person").psel(false);
                }
                /*执行方式*/
                if(_executieMode == undefined){
                    $("#moreOperaBtn").psel(true);
                }else if(_executieMode == '2'){
                    $("#moreOperaBtn").psel(true);
                }else{
                    $("#moreOperaBtn").psel(false);
                }
                /*人员列表*/
                if(_ppList == undefined){
                    _this.personPositionList = trueList;
                }else if(_ppList.length >0){
                     _this.personPositionList = _ppList;
                }else{
                    _this.personPositionList = trueList;
                }


            } else { //编辑
                _this.personPositionList = arr.ppList; //返回编辑读取人员列表
                if(_filter == true){
                    $("#new_filter_person").psel(true);
                }else{
                    $("#new_filter_person").psel(false);
                }
                
                if(_executieMode == '2'){
                    $("#moreOperaBtn").psel(true);
                }else{
                    $("#moreOperaBtn").psel(false);
                }
            }
            $("#createWorkOrderSet").pshow();
        }
        /* 执行工作步骤*/
        else if (code == 'execute') {
            var _state = workOrderModel.operateOptionList[faIndex].duty[childIndex].limit_domain;
            if(!_this.plan_id){
                if(_state == undefined){
                    $("#zhixing_open").psel(true);
                }else if(_state == true){
                    $("#zhixing_open").psel(true);
                }else{
                    $("#zhixing_close").psel(true);
                }

            }else{
                if(_state == true){
                    $("#zhixing_open").psel(true);
                }else{
                    $("#noUseBtn").psel(true);
                }    
            }
            $("#stepsToPerformWork").pshow();
        }
        /*指派工单*/
        else if (code == 'assign') {
            var _state =  workOrderModel.operateOptionList[faIndex].duty[childIndex].filter_scheduling;
            var _ppList = workOrderModel.operateOptionList[faIndex].duty[childIndex].ppList;
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
                if(_ppList == undefined){
                    _this.personPositionList = trueList;
                }else if(_ppList.length >0){
                     _this.personPositionList = _ppList;
                }else{
                    _this.personPositionList = trueList;
                }

                if(_state == undefined){
                    $("#zhipai_filter").psel(false);
                }else if(_state == true){
                    $("#zhipai_filter").psel(true);
                }else{
                    $("#zhipai_filter").psel(false);
                }
            } else {//编辑
                if(_state == true){
                    $("#zhipai_filter").psel(true);
                }else{
                    $("#zhipai_filter").psel(false);
                }
                _this.personPositionList = arr.ppList;
            };
            $("#createAssignSet").pshow();
        }
        /* 审核申请*/
        else if (code == 'audit') {
            var _check = workOrderModel.operateOptionList[faIndex].duty[childIndex].audit_close_way;//1手动，2自动
            if (!_this.plan_id) {
                if(_check == undefined){
                    $("#shenhe_open").psel(true);
                }else if(_check == '2'){
                    $("#shenhe_open").psel(true);
                }else{
                    $("#shenhe_close").psel(true);
                }
            } else {
                // var flag = arr.limit_domain;
                if (_check == '2') {
                     $("#shenhe_open").psel(true);
                } else {
                    $("#shenhe_close").psel(true);
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
        workOrderModel.operateOptionList[fIndex].duty[cIndex].executie_mode = executie_mode;//执行方式
        workOrderModel.operateOptionList[fIndex].duty[cIndex].filter_scheduling = filter_scheduling;//过滤人员范围
        //设置ppList里面元素选中
        // var newArr = JSON.parse(JSON.stringify(workOrderModel.operateOptionList));
        // newArr.forEach(function(item, index1) {
        //     item.duty.forEach(function(info, index2) {
        //         if (!info.ppList) {
        //             info.ppList = workOrderModel.falsePersonPosition;

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
        // workOrderModel.operateOptionList = JSON.parse(JSON.stringify(newArr))
        workOrderModel.operateOptionList[fIndex].duty[cIndex].ppList = JSON.parse(JSON.stringify(workOrderModel.personPositionList));
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
        // var newArr = JSON.parse(JSON.stringify(workOrderModel.operateOptionList));
        // newArr.forEach(function(item, index1) {
        //     item.duty.forEach(function(info, index2) {
        //         if (!info.ppList) {
        //             info.ppList = workOrderModel.falsePersonPosition;

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

        workOrderModel.operateOptionList[fIndex].duty[cIndex].ppList = JSON.parse(JSON.stringify(workOrderModel.personPositionList));
        // console.log(JSON.stringify(newArr));


        $("#createAssignSet").hide();
    },
    stepsToPerformWorkYes: function() { //执行工作步骤确定
        var fIndex = workOrderModel.operateOptionFaIndex;
        var cIndex = workOrderModel.operateOptionChildIndex;
        var name = workOrderModel.currStepDutyName;
        var code = workOrderModel.currStepDutyCode;
        var limit_domain = $(".stepsToPerformWork_con_operat >div").psel();
        workOrderModel.operateOptionList[fIndex].duty[cIndex].limit_domain = limit_domain;
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
                if(post_and_duty.length > 0){
                    controller.getErrorFlowPlanType(typeData, commitData,pustAndDutyData, orderTypeName, executeTypeName)
                    
                }else{
                     $("#publishNotice").pshow({ text: '保存失败，请添加岗位或人员', state: "failure" });
                }

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
                plan_id: planId,
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