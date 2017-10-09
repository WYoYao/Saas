var controller = {
    init: function () {
        new Vue({
            el: '#myWorkOrder',
            data: myWorkOrderModel,
            methods: myWorkOrderMethod,
        });

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
        controller.queryWorkOrderType(workObj);//查询工单类型
        controller.queryWorkOrder('restMyWorkOrderService/queryMyDraftWorkOrder', drafWorkObj);//查询草稿箱内工单
        controller.querySopListForSel(obj);
        controller.queryUserWoInputMode();//用户输入方式
    },


    //------------------------------------------ydx__start------------------------------------------


    //------------------------------------------ydx__end------------------------------------------
    //------------------------------------------yn__start------------------------------------------

    //------------------------------------------yn__end------------------------------------------


    //------------------------------------------yn__start------------------------------------------
    // ajax请求
    /* 时间类型/工单类型 */
    queryWorkOrderType: function (postObj) {
        $('#loadCover').pshow();
        pajax.post({
            url: 'restGeneralDictService/queryWorkOrderType',
            data: postObj.dataObj,
            success: function (result) {
                var data = result && result.data ? result.data : [];
                var allArr = [
                    {
                        code: "all",
                        name: "全部",
                        description: "",
                        dic_type: 'work_order_type'
                    }
                ];
                myWorkOrderModel.workTypeL = allArr.concat(data);
                myWorkOrderModel.workTypeC = data;

                // myWorkOrderModel.workType = data;
                $("#myWork-list-notice").pshow(postObj.noticeSuccessObj);
            },
            error: function (err) {
                $("#myWork-list-notice").pshow(postObj.noticeFailureObj);
            },
            complete: function () {
                $('#loadCover').phide();
            }
        });
    },
    queryWorkOrder: function (url, conditionObj) {
        $('#loadCover').pshow();
        pajax.post({
            url: url,
            data: conditionObj,
            success: function (result) {
                var data = result && result.data ? result.data : [];
                myWorkOrderModel.temList = myWorkOrderModel.temList.concat(data);
                myWorkOrderModel.workList = myWorkOrderModel.temList;
                $("#myWork-list-notice").pshow({text: '获取工单列表成功', state: "success"});
            },
            error: function (err) {
                $("#myWork-list-notice").pshow({text: '获取工单列表失败', state: "failure"});
            },
            complete: function () {
                $('#loadCover').phide();
            }
        });
    },
    selAlreadyEvent: function () {
        var userId = myWorkOrderModel.user_id;
        var proId = myWorkOrderModel.project_id;
        if ($("#work-already").psel()) {
            myWorkOrderModel.workAlreadyID = myWorkOrderModel.workAlready[$("#work-already").psel().index].id;
        }
        if ($("#work-type").psel()) {
            var orderType = myWorkOrderModel.workTypeL[$("#work-type").psel().index].code;
        }
        //判断url
        var url = myWorkOrderModel.workAlreadyID == "0" ? "restMyWorkOrderService/queryMyDraftWorkOrder" : myWorkOrderModel.workAlreadyID == "1" ? "restMyWorkOrderService/queryMyPublishWorkOrder" : "restMyWorkOrderService/queryMyParticipantWorkOrder";
        orderType = orderType == "all" ? "" : orderType;
        myWorkOrderModel.pageNum = 1;
        if (orderType == "") {
            var conditionObj = {
                user_id: userId,                        //员工id-当前操作人id，必须
                project_id: proId,                     //项目id，必须
                page: myWorkOrderModel.pageNum,                       //当前页号，必须
                page_size: 50                        //每页返回数量，必须
            };
        } else {
            conditionObj = {
                user_id: userId,                        //员工id-当前操作人id，必须
                project_id: proId,                     //项目id，必须
                order_type: null,                      //工单类型编码
                page: myWorkOrderModel.pageNum,                       //当前页号，必须
                page_size: 50                        //每页返回数量，必须
            };
        }

        myWorkOrderModel.temList = [];
        controller.queryWorkOrder(url, conditionObj);
    },
    /*根据Id删除草稿工单*/
    deleteDraftWorkOrderById: function () {
        $('#loadCover').pshow();
        myWorkOrderModel.workList = [];
        pajax.post({
            url: 'restMyWorkOrderService/deleteDraftWorkOrderById',
            data: {
                user_id: myWorkOrderModel.user_id,
                order_id: myWorkOrderModel.del_plan_id
            },
            success: function (result) {
                if (result.Result == "success") {
                    $("#myWork-list-notice").pshow({text: '删除成功', state: "success"});
                } else {
                    $("#myWork-list-notice").pshow({text: '删除失败', state: "failure"});

                }

            },
            error: function (err) {
                $("#myWork-list-notice").pshow({text: '删除失败', state: "failure"});
            },
            complete: function () {
                $('#loadCover').phide();
                $("#del-confirm").phide();
                controller.selAlreadyEvent(); //此处重新获取一遍列表
            }
        });
    },
    /*查询用户输入方式*/
    queryUserWoInputMode: function () {
        $('#loadCover').pshow();
        myWorkOrderModel.workList = [];
        pajax.post({
            url: 'restUserService/queryUserWoInputMode',
            data: {
            },
            success: function (result) {
                var input_mode = result && result.input_mode ? result.input_mode : "";//工单输入方式，0-未记录过，1-自由输入，2-结构化输入
               console.log(input_mode)
                myWorkOrderModel.regular=input_mode==0?false:input_mode==1?false:true;
                $("#switch-slide").psel(myWorkOrderModel.regular);
            },
            error: function (err) {
                $("#myWork-list-notice").pshow({text: '查询失败', state: "failure"});
            },
            complete: function () {
                $('#loadCover').phide();
            }
        });
    },
    /*编辑草稿*/
    editDraft: function (index, order_id, event) {
        event.stopPropagation();
        var editDraftObj = {
            user_id: myWorkOrderModel.user_id,                        //员工id-当前操作人id，必须
        };
        if (order_id) {
            editDraftObj[order_id] = order_id;

        }
        // $('#loadCover').pshow();
        // pajax.post({
        //     url: 'restMyWorkOrderService/updateDraftWorkOrder',
        //     data: editDraftObj,
        //     success: function (result) {
        //
        //         // $("#myWork-list-notice").pshow({text: '获取工单列表成功', state: "success"});
        //     },
        //     error: function (err) {
        //         // $("#myWork-list-notice").pshow({text: '获取工单列表失败', state: "failure"});
        //     },
        //     complete: function () {
        //         $('#loadCover').phide();
        //     }
        // });

    },
    /*查询建筑体*/
    queryBuild: function (event) {
        myWorkOrderModel.buildList = [];
        $('#loadCover').pshow();
        pajax.post({
            url: 'restObjectService/queryBuild',
            data: {
                user_id: myWorkOrderModel.user_id,                        //员工id-当前操作人id，必须
                project_id: myWorkOrderModel.project_id,                     //项目id，必须
            },
            success: function (result) {
                var data = result && result.data ? result.data : [];
                myWorkOrderModel.curObjType = 'build';
                myWorkOrderModel.buildList = data;
                $(event).parent(".none-both").hide().siblings(".only-checkbox").show();
                // myWorkOrderModel.workType = data;
                $("#myWork-list-notice").pshow({text: '建筑体查询成功', state: "success"});
            },
            error: function (err) {
                $("#myWork-list-notice").pshow({text: '建筑体查询失败', state: "failure"});
            },
            complete: function () {
                $('#loadCover').phide();
            }
        });
    },
    //查询楼层(左侧一级)  //10、查询空间（左侧两级）
    queryFloor: function (dom, deleteFloorLevel) {
        myWorkOrderModel.leftLevel = [];
        myWorkOrderModel.lastLevel = [];
        $('#loadCover').pshow();
        pajax.post({
            url: 'restObjectService/queryFloor',        //未返回对象类型
            data: {
                user_id: myWorkOrderModel.user_id,
                project_id: myWorkOrderModel.project_id,
                need_back_parents: deleteFloorLevel
            },
            success: function (result) {
                var data = result && result.data ? result.data : [];
                //data = JSON.parse(JSON.stringify(leftOneLevel));        //To Delete
                if (deleteFloorLevel) {
                    for (var i = 0; i < data.length; i++) {
                        data[i].contentCopy = JSON.parse(JSON.stringify(data[i].content));
                        data[i].content = null;
                        // myWorkOrderModel.lastLevel.push(data[i].contentCopy);
                    }
                    myWorkOrderModel.leftLevel = data;
                    myWorkOrderModel.curObjType = 'floor';

                } else {
                    myWorkOrderModel.leftLevel = data;
                    myWorkOrderModel.curObjType = 'space';
                }
                $(dom).parent(".none-both").hide().siblings(".both-all").show();


            },
            error: function (err) {
                $("#myWork-list-notice").pshow({text: '楼层查询失败', state: "failure"});

            },
            complete: function () {
                $('#loadCover').phide();
            }
        });
    },
    /*查询系统，左侧一级*/
    querySystem: function (dom, deleteFloorLevel) {
        myWorkOrderModel.leftLevel = [];
        myWorkOrderModel.lastLevel = [];
        $('#loadCover').pshow();
        pajax.post({
            url: 'restObjectService/querySystem',        //未返回对象类型
            data: {
                user_id: myWorkOrderModel.user_id,
                project_id: myWorkOrderModel.project_id,
                need_back_parents: deleteFloorLevel
            },
            success: function (result) {
                var data = result && result.data ? result.data : [];
                //data = JSON.parse(JSON.stringify(leftOneLevel));        //To Delete
                if (deleteFloorLevel) {
                    for (var i = 0; i < data.length; i++) {
                        data[i].contentCopy = JSON.parse(JSON.stringify(data[i].content));
                        data[i].content = null;
                        // myWorkOrderModel.lastLevel.push(data[i].contentCopy);
                    }
                    myWorkOrderModel.leftLevel = data;
                    myWorkOrderModel.curObjType = 'system';
                    $(dom).parent(".none-both").hide().siblings(".both-all").show();

                } /*else {
                    myWorkOrderModel.leftLevel = data;
                    myWorkOrderModel.curObjType = 'space';
                }*/

            },
            error: function (err) {
                $("#myWork-list-notice").pshow({text: '楼层查询失败', state: "failure"});

            },
            complete: function () {
                $('#loadCover').phide();
            }
        });
    },
    /*查询空间，左侧两级*/
    querySpace: function (obj_id, obj_type, deleteFloorLevel) {
        myWorkOrderModel.lastLevel = [];
        $('#loadCover').pshow();
        pajax.post({
            url: 'restObjectService/querySpace',        //未返回对象类型
            data: {
                user_id: myWorkOrderModel.user_id,
                project_id: myWorkOrderModel.project_id,
                need_back_parents: deleteFloorLevel,
                obj_id: obj_id,            //对象id,建筑或者楼层的id,必须
                obj_type: obj_type,	     //对象类型，build、floor,必须

            },
            success: function (result) {
                var data = result && result.data ? result.data : [];
                myWorkOrderModel.lastLevel = data;
                $("#myWork-list-notice").pshow({text: '空间查询成功', state: "success"});


            },
            error: function (err) {
                $("#myWork-list-notice").pshow({text: '空间查询失败', state: "failure"});

            },
            complete: function () {
                $('#loadCover').phide();
            }
        });
    },
    /*查询设备，左侧三级*/
    queryBuildFloorSpaceTree: function (dom) {
        myWorkOrderModel.leftLevel = [];
        myWorkOrderModel.lastLevel = [];
        $('#loadCover').pshow();
        pajax.post({
            url: 'restObjectService/queryBuildFloorSpaceTree',        //未返回对象类型
            data: {
                user_id: myWorkOrderModel.user_id,
                project_id: myWorkOrderModel.project_id,
                // need_back_parents: deleteFloorLevel,
                // obj_id: obj_id,            //对象id,建筑或者楼层的id,必须
                // obj_type: obj_type,	     //对象类型，build、floor,必须

            },
            success: function (result) {
                var data = result && result.data ? result.data : [];
                myWorkOrderModel.curObjType = 'equip';
                myWorkOrderModel.leftLevel = data;
                $(dom).parent(".none-both").hide().siblings(".both-all").show();
                $("#myWork-list-notice").pshow({text: '设备查询成功', state: "success"});
                controller.queryGeneralDictByKey()

            },
            error: function (err) {
                $("#myWork-list-notice").pshow({text: '设备查询失败', state: "failure"});

            },
            complete: function () {
                $('#loadCover').phide();
            }
        });
    },
    /*查询设备实例*/
    queryEquip:function (obj) {
        myWorkOrderModel.lastLevel = [];
        $('#loadCover').pshow();
        pajax.post({
            url: 'restObjectService/queryEquip',        //未返回对象类型
            data: obj,
            success: function (result) {
                var data = result && result.data ? result.data : [];
                myWorkOrderModel.lastLevel = data;
                $("#myWork-list-notice").pshow({text: '设备查询成功', state: "success"});
            },
            error: function (err) {
                $("#myWork-list-notice").pshow({text: '设备查询失败', state: "failure"});

            },
            complete: function () {
                $('#loadCover').phide();
            }
        });
    },
    /*查询设备实例--专业*/
    queryGeneralDictByKey:function(){
        myWorkOrderModel.domainList = [];
        $('#loadCover').pshow();
        pajax.post({
            url: 'restGeneralDictService/queryGeneralDictByKey',        //未返回对象类型
            data: {
                user_id: myWorkOrderModel.user_id,
                project_id: myWorkOrderModel.project_id,
                dict_type: "domain_require"
            },
            success: function (result) {
                var data = result && result.data ? result.data : [];
                myWorkOrderModel.domainList = data;
                $("#myWork-list-notice").pshow({text: '专业查询成功', state: "success"});
            },
            error: function (err) {
                $("#myWork-list-notice").pshow({text: '专业查询失败', state: "failure"});

            },
            complete: function () {
                $('#loadCover').phide();
            }
        });
    },
    /*查询设备实例系统专业下的系统*/
    querySystemForSystemDomain:function(content){
        myWorkOrderModel.systemList = [];
        $('#loadCover').pshow();
        pajax.post({
            url: 'restObjectService/querySystemForSystemDomain',        //未返回对象类型
            data: {
                user_id: myWorkOrderModel.user_id,
                project_id: myWorkOrderModel.project_id,
                system_domain: content.code
            },
            success: function (result) {
                var data = result && result.data ? result.data : [];
                myWorkOrderModel.systemList = data;
                $("#myWork-list-notice").pshow({text: '系统查询成功', state: "success"});
            },
            error: function (err) {
                $("#myWork-list-notice").pshow({text: '系统查询失败', state: "failure"});

            },
            complete: function () {
                $('#loadCover').phide();
            }
        });
    },

    /*查询可供选择的sop*/
    querySopListForSel: function (obj) {/**/
        myWorkOrderModel.sopList = [];
        myWorkOrderModel.sopCriteria = [];
        $('#loadCover').pshow();
        pajax.post({
            url: 'restSopService/querySopListForSel',
            data: obj,
            success: function (result) {
                var sop = result && result.content ? result.content : [];
                var sopCriteria = result && result.criteria ? result.criteria : {};
                myWorkOrderModel.sopList = sop;
                myWorkOrderModel.sopCriteria = sopCriteria;
                myWorkOrderMethod.setCriteriaStatus('brands', 'selectedBrands', false);
                myWorkOrderMethod.setCriteriaStatus('order_type', 'selectedOrder_type', true, 'code');
                myWorkOrderMethod.setCriteriaStatus('fit_objs', 'selectedFit_objs', true, 'obj_id');
                myWorkOrderMethod.setCriteriaStatus('labels', 'selectedLabels', false);
            },
            error: function (err) {
                $("#myWork-list-notice").pshow({text: '查询sop失败', state: "failure"});
            },
            complete: function () {
                $('#loadCover').phide();
            }
        });
    },
    /*sop详细信息*/
    querySopDetailById: function (sop, obj) {/**/
        $('#loadCover').pshow();
        pajax.post({
            url: 'restSopService/querySopDetailById',
            data: obj,
            success: function (result) {
                var data = result ? result : {};
                myWorkOrderModel.detailSopData = data;
            },
            error: function (err) {
                $("#myWork-list-notice").pshow({text: '查询sop详情失败', state: "failure"});
            },
            complete: function () {
                $('#loadCover').phide();
            }
        });
    },
    //13、查询对象下信息点
    /*queryInfoPointForObject: function (jqInfoPointPop) {
        $('#loadCover').pshow();
        pajax.post({
            url: 'restObjectService/queryInfoPointForObject',
            data: {
                user_id: commonData.user_id,
                obj_id: commonData.infoPoint_obj.obj_id,
                obj_type: commonData.infoPoint_obj.obj_type || createSopModel.curObjType
            },
            success: function (result) {
                var data = result && result.data ? result.data : [];
                //data = JSON.parse(JSON.stringify(infoPointList));
                var info_points = commonData.infoPoint_obj.info_points || [];
                if (commonData.belongChoosedObj) {
                    for (var i = 0; i < data.length; i++) {
                        var checked = false;
                        for (var j = 0; j < info_points.length; j++) {
                            if (data[i].id === info_points[j].id) {
                                checked = true;
                                break;
                            }
                        }
                        if (checked) data[i].checked = true;
                    }
                }
                createSopModel.infoPointList = data;
                if (jqInfoPointPop) jqInfoPointPop.show();
                createSopModel.isCustomizeBtnAble = true;
            },
            error: function (err) {
            },
            complete: function () {
                $('#loadCover').phide();
            }
        });
    },*/
    queryInfoPointForObject: function (obj,jqInfoPointPop) {
        myWorkOrderModel.infoArray=[];
        $('#loadCover').pshow();
        myWorkOrderModel.selectedObj = obj;
        // obj.checked = !obj.checked;
        pajax.post({
            url: 'restObjectService/queryInfoPointForObject',
            data: {
                // user_id: myWorkOrderModel.user_id,
                obj_id: obj.obj_id,
                obj_type: obj.obj_type ||  myWorkOrderModel.curObjType
            },
            success: function (result) {
                var data = result && result.data ? result.data : [];
                //data = JSON.parse(JSON.stringify(infoPointList));
                var info_points = commonData.infoPoint_obj.info_points || [];
                if (commonData.belongChoosedObj) {
                    for (var i = 0; i < data.length; i++) {
                        var checked = false;
                        for (var j = 0; j < info_points.length; j++) {
                            if (data[i].id === info_points[j].id) {
                                checked = true;
                                break;
                            }
                        }
                        if (checked) data[i].checked = true;
                    }
                }
                myWorkOrderModel.infoArray=data;
                /*var info_points = commonData.infoPoint_obj.info_points || [];
                if (commonData.belongChoosedObj) {
                    for (var i = 0; i < data.length; i++) {
                        var checked = false;
                        for (var j = 0; j < info_points.length; j++) {
                            if (data[i].id === info_points[j].id) {
                                checked = true;
                                break;
                            }
                        }
                        if (checked) data[i].checked = true;
                    }
                }
                createSopModel.infoPointList = data;
                if (jqInfoPointPop) jqInfoPointPop.show();
                createSopModel.isCustomizeBtnAble = true;*/
            },
            error: function (err) {
            },
            complete: function () {
                $('#loadCover').phide();
            }
        });
    },
    //------------------------------------------yn__end------------------------------------------

}