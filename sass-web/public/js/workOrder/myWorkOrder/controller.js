var myWorkOrderController = {

    //------------------------------------------zy__start------------------------------------------
    //新增页:保存工单草稿
    saveDraftWorkOrder: function (obj) {
        console.log("保存的数据是：")
        console.log(obj)
        $('#globalloading').pshow();
        pajax.post({
            url: 'restMyWorkOrderService/saveDraftWorkOrder',
            data: obj,
            success: function (result) {
                var data = result ? result : {};
                commonData.publicModel.workOrderDraft.order_id = data.order_id;
                $('#globalnotice').pshow({text: '草稿保存成功', state: 'success'});
            },
            error: function (err) {
                $('#globalnotice').pshow({text: '草稿保存失败，请重试', state: 'failure'});
            },
            complete: function () {
                $('#globalloading').phide();
            }
        });
    },

    //新增页:预览工单草稿
    previewWorkOrder: function (obj) {
        $('#globalloading').pshow();
        pajax.post({
            url: 'restMyWorkOrderService/previewWorkOrder',
            data: obj,
            success: function (result) {
                var data = result ? result : {};
                commonData.publicModel.orderDetailData = data.wo_body || {};
                orderDetail_pub.getOrderDetail(commonData.publicModel, commonData.publicModel.orderDetailData.order_id, '4', data);
                commonData.publicModel.LorC = 0;
            },
            error: function (err) {
            },
            complete: function () {
                $('#globalloading').phide();
            }
        });
    },

    //我的工单-新增页:发布工单
    publishWorkOrder: function (obj) {
        pajax.update({
            url: 'restMyWorkOrderService/publishWorkOrder',
            data: {
                order_id: commonData.publicModel.workOrderDraft.order_id,
                wo_body: obj
            },
            success: function (result) {
                $('#globalnotice').pshow({text: '发布成功', state: 'success'});
                commonData.publicModel.LorC = true;
                setTimeout(function () {
                    $("#work-already").psel(0, true);
                }, 0);
            },
            error: function (err) {
                $('#globalnotice').pshow({text: '发布失败，请重试', state: 'failure'});
            },
            complete: function () {
                $('#globalloading').phide();
            }
        });
    },

    //根据id查询工单详细信息-发布后的     //To Use
    queryWorkOrderById: function (order_id) {
        $('#globalloading').pshow();
        pajax.post({
            url: 'restWoMonitorService/queryWorkOrderById',
            data: {
                order_id: order_id
            },
            success: function (result) {
                var data = result ? result : {};

            },
            error: function (err) {
            },
            complete: function () {
                $('#globalloading').phide();
            }
        });
    },

    //我的工单-编辑页:编辑工单草稿


    //------------------------------------------zy__end------------------------------------------

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
                commonData.publicModel.workTypeL = allArr.concat(data);
                commonData.publicModel.workTypeC = data;

                // commonData.publicModel.workType = data;
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
                commonData.publicModel.temList = commonData.publicModel.temList.concat(data);
                commonData.publicModel.workList = commonData.publicModel.temList;
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
        if ($("#work-already").psel()) {
            commonData.publicModel.workAlreadyID = commonData.publicModel.workAlready[$("#work-already").psel().index].id;
        }
        if ($("#work-type").psel()) {
            var orderType = commonData.publicModel.workTypeL[$("#work-type").psel().index].code;
        }
        //判断url
        var url = commonData.publicModel.workAlreadyID == "0" ? "restMyWorkOrderService/queryMyDraftWorkOrder" : commonData.publicModel.workAlreadyID == "1" ? "restMyWorkOrderService/queryMyPublishWorkOrder" : "restMyWorkOrderService/queryMyParticipantWorkOrder";
        orderType = orderType == "all" ? "" : orderType;
        commonData.publicModel.pageNum = 1;
        if (orderType == "") {
            var conditionObj = {
                // user_id: userId,                        //员工id-当前操作人id，必须
                // project_id: proId,                     //项目id，必须
                page: commonData.publicModel.pageNum,                       //当前页号，必须
                page_size: 50                        //每页返回数量，必须
            };
        } else {
            conditionObj = {
                order_type: null,                      //工单类型编码
                page: commonData.publicModel.pageNum,                       //当前页号，必须
                page_size: 50                        //每页返回数量，必须
            };
        }

        commonData.publicModel.temList = [];
        myWorkOrderController.queryWorkOrder(url, conditionObj);
    },
    /*根据Id删除草稿工单*/
    deleteDraftWorkOrderById: function () {
        $('#loadCover').pshow();
        commonData.publicModel.workList = [];
        pajax.post({
            url: 'restMyWorkOrderService/deleteDraftWorkOrderById',
            data: {
                order_id: commonData.publicModel.del_plan_id
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
                myWorkOrderController.selAlreadyEvent(); //此处重新获取一遍列表
            }
        });
    },
    /*查询用户输入方式*/
    queryUserWoInputMode: function () {
        $('#loadCover').pshow();
        commonData.publicModel.workList = [];
        pajax.post({
            url: 'restUserService/queryUserWoInputMode',
            data: {},
            success: function (result) {
                var input_mode = result && result.input_mode ? result.input_mode : "";//工单输入方式，0-未记录过，1-自由输入，2-结构化输入
                commonData.publicModel.regular = input_mode == 0 ? false : input_mode == 1 ? false : true;
                $("#switch-slide").psel(commonData.publicModel.regular);
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
        };
        if (order_id) {
            editDraftObj[order_id] = order_id;
        }

        $('#globalloading').pshow();
        pajax.post({
            url: 'restMyWorkOrderService/queryDraftWorkOrderById',      ////根据id查询工单详细信息-草稿的
            data: {
                order_id: order_id
            },
            success: function (result) {
                var data = result ? result : {};
                commonData.publicModel.workOrderDraft = result;

                commonData.publicModel.allMatters = result.matters;
                console.log("查询到的详细工单内容是:")
                console.log(commonData.publicModel.workOrderDraft)
                publicMethod.setEditDraft()

            },
            error: function (err) {
            },
            complete: function () {
                $('#globalloading').phide();
            }
        });

    },
    /*查询建筑体*/
    queryBuild: function (dom, param2, isPop3) {
        commonData.publicModel.buildList = [];
        $('#loadCover').pshow();
        pajax.post({
            url: 'restObjectService/queryBuild',
            data: {},
            success: function (result) {
                var data = result && result.data ? result.data : [];
                commonData.publicModel.curObjType = 'build';

                commonData.publicModel.buildList = data;
                commonData.publicModel.curLevelList = JSON.parse(JSON.stringify(data));
                /*isPop3 ? publicMethod.isSelectedObj1() : */
                publicMethod.isSelectedObj(null, commonData.types[0]);
                if (commonData.publicModel.work_c) {
                    publicMethod.setCurPop(1, commonData.types[3]);
                } else {
                    publicMethod.setCurPop(1, commonData.types[0]);
                }
                /*isPop3 ? publicMethod.setCurPop3(1) : */
                //$(event).parent(".none-both").hide().siblings(".only-checkbox").show();
                // commonData.publicModel.workType = data;
            },
            error: function (err) {
            },
            complete: function () {
                $('#loadCover').phide();
            }
        });
    },
    //查询楼层(左侧一级)  //10、查询空间（左侧两级）
    queryFloor: function (dom, deleteFloorLevel) {
        commonData.publicModel.leftLevel = [];
        commonData.publicModel.lastLevel = [];
        $('#loadCover').pshow();
        pajax.post({
            url: 'restObjectService/queryFloor',        //未返回对象类型
            data: {
                need_back_parents: deleteFloorLevel
            },
            success: function (result) {
                var data = result && result.data ? result.data : [];
                //data = JSON.parse(JSON.stringify(leftOneLevel));        //To Delete
                if (deleteFloorLevel) {
                    for (var i = 0; i < data.length; i++) {
                        data[i].contentCopy = JSON.parse(JSON.stringify(data[i].content));
                        data[i].content = null;
                        // commonData.publicModel.lastLevel.push(data[i].contentCopy);
                    }
                    commonData.publicModel.leftLevel = data;
                    commonData.publicModel.curObjType = 'floor';

                } else {
                    commonData.publicModel.leftLevel = data;
                    commonData.publicModel.curObjType = 'space';
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
        commonData.publicModel.leftLevel = [];
        commonData.publicModel.lastLevel = [];
        commonData.publicModel.infoArray = [];
        $('#loadCover').pshow();
        pajax.post({
            url: 'restObjectService/querySystem',        //未返回对象类型
            data: {
                need_back_parents: deleteFloorLevel
            },
            success: function (result) {
                var data = result && result.data ? result.data : [];
                //data = JSON.parse(JSON.stringify(leftOneLevel));        //To Delete
                if (deleteFloorLevel) {
                    for (var i = 0; i < data.length; i++) {
                        data[i].contentCopy = JSON.parse(JSON.stringify(data[i].content));
                        data[i].content = null;
                        // commonData.publicModel.lastLevel.push(data[i].contentCopy);
                    }
                    commonData.publicModel.leftLevel = data;
                    commonData.publicModel.curObjType = 'system';
                    $(dom).parent(".none-both").hide().siblings(".both-all").show();

                }
                /*else {
                 commonData.publicModel.leftLevel = data;
                 commonData.publicModel.curObjType = 'space';
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
        commonData.publicModel.lastLevel = [];
        $('#loadCover').pshow();
        pajax.post({
            url: 'restObjectService/querySpace',        //未返回对象类型
            data: {
                need_back_parents: deleteFloorLevel,
                obj_id: obj_id,            //对象id,建筑或者楼层的id,必须
                obj_type: obj_type,	     //对象类型，build、floor,必须

            },
            success: function (result) {
                var data = result && result.data ? result.data : [];
                commonData.publicModel.lastLevel = data;
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
    /*查询设备实例(左侧三级) 即：查询建筑-楼层-空间列表树*/
    queryBuildFloorSpaceTree: function (dom) {
        commonData.publicModel.curSelectedDomain = {};
        commonData.publicModel.curSelectedSystem = {};
        commonData.publicModel.leftLevel = [];
        commonData.publicModel.lastLevel = [];
        commonData.publicModel.infoArray = [];
        $('#loadCover').pshow();
        pajax.post({
            url: 'restObjectService/queryBuildFloorSpaceTree',        //未返回对象类型
            data: {},
            success: function (result) {
                var data = result && result.data ? result.data : [];
                commonData.publicModel.curObjType = 'equip';
                commonData.publicModel.leftLevel = data;
                $(dom).parent(".none-both").hide().siblings(".both-all").show();
                $("#myWork-list-notice").pshow({text: '设备查询成功', state: "success"});
                myWorkOrderController.queryGeneralDictByKey()

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
    queryEquip: function (obj) {
        commonData.publicModel.lastLevel = [];
        $('#loadCover').pshow();
        pajax.post({
            url: 'restObjectService/queryEquip',        //未返回对象类型
            data: obj,
            success: function (result) {
                var data = result && result.data ? result.data : [];
                commonData.publicModel.lastLevel = data;
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
    queryGeneralDictByKey: function () {
        commonData.publicModel.domainList = [];
        $('#loadCover').pshow();
        pajax.post({
            url: 'restGeneralDictService/queryGeneralDictByKey',        //未返回对象类型
            data: {
                dict_type: "domain_require"
            },
            success: function (result) {
                var data = result && result.data ? result.data : [];
                commonData.publicModel.domainList = data;
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
    querySystemForSystemDomain: function (content) {
        commonData.publicModel.systemList = [];
        $('#loadCover').pshow();
        pajax.post({
            url: 'restObjectService/querySystemForSystemDomain',        //未返回对象类型
            data: {
                system_domain: content.code
            },
            success: function (result) {
                var data = result && result.data ? result.data : [];
                commonData.publicModel.systemList = data;
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
        commonData.publicModel.sopList = [];
        commonData.publicModel.sopCriteria = [];
        $('#loadCover').pshow();
        pajax.post({
            url: 'restSopService/querySopListForSel',
            data: obj,
            success: function (result) {
                var sop = result && result.content ? result.content : [];
                var sopCriteria = result && result.criteria ? result.criteria : {};
                commonData.publicModel.sopList = sop;
                commonData.publicModel.sopCriteria = sopCriteria;
                publicMethod.setCriteriaStatus('brands', 'selectedBrands', false);
                publicMethod.setCriteriaStatus('order_type', 'selectedOrder_type', true, 'code');
                publicMethod.setCriteriaStatus('fit_objs', 'selectedFit_objs', true, 'obj_id');
                publicMethod.setCriteriaStatus('labels', 'selectedLabels', false);

                commonData.publicModel.curLevelList = JSON.parse(JSON.stringify(commonData.publicModel.sopList));

                var value = obj.sop_name;
                for (var i = 0; i < sop.length; i++) {
                    var item = sop[i];
                    if (item.sop_name) item.sop_name_arr = publicMethod.strToMarkedArr(item.sop_name, value);
                }

                if (commonData.firstSetMore) {
                    publicMethod.initSopModal();
                }
                /*isPop3 ? publicMethod.isSelectedObj1() : */
                publicMethod.isSelectedObj(null, commonData.types[1]);
                /*isPop3 ? publicMethod.setCurPop3(1) : */
                publicMethod.setCurPop(null, commonData.types[1]);
            },
            error: function (err) {
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
                commonData.publicModel.detailSopData = data;
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
    queryInfoPointForObject: function (obj, jqInfoPointPop) {
        commonData.publicModel.infoArray = [];
        $('#loadCover').pshow();
        commonData.publicModel.selectedObj = obj;
        // obj.checked = !obj.checked;
        pajax.post({
            url: 'restObjectService/queryInfoPointForObject',
            data: {
                // user_id: commonData.publicModel.user_id,
                obj_id: obj.obj_id,
                obj_type: obj.obj_type || commonData.publicModel.curObjType
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
                commonData.publicModel.infoArray = data;
                if (jqInfoPointPop) jqInfoPointPop.show();
                commonData.publicModel.isCustomizeBtnAble = true;
            },
            error: function (err) {
            },
            complete: function () {
                $('#loadCover').phide();
            }
        });
    },
    //12、添加自定义对象
    addTempObjectWithType: function (obj, isConfirmCustomizeObj, isShowPop) {
        pajax.update({
            url: 'restObjectService/addTempObjectWithType',
            data: obj,
            success: function (result) {
                publicMethod.addedTempObjectWithType(obj, isConfirmCustomizeObj, isShowPop);
            },
            error: function (err) {
            },
            complete: function () {
            }
        });
    },
    //搜索物理世界对象
    searchObject: function (keyword, notShowPop) {
        $('#loadCover').pshow();
        pajax.post({
            url: 'restObjectService/searchObject',
            data: {
                keyword: keyword
            },
            success: function (result) {
                var data = result && result.data ? result.data : [];
                if (!notShowPop) {
                    var value = keyword;
                    for (var i = 0; i < data.length; i++) {
                        var item = data[i];
                        if (item.obj_name) item.obj_name_arr = publicMethod.strToMarkedArr(item.obj_name, value);
                        if (item.parents) {
                            for (var j = 0; j < item.parents.length; j++) {
                                var item1 = item.parents[j];

                                item1.linked_names = item1.parent_names.join('>');
                                if (item1.linked_names) item1.linked_names_arr = publicMethod.strToMarkedArr(item1.linked_names, value);
                            }
                        }
                    }

                    //判断输入的对象是否能匹配搜索结果列表中的某个对象，可以在弹窗关闭时再进行判断
                    //commonMethod.isMatchExistingObj(keyword, data);

                    //createSopModel.searchedObjectList = data;
                    commonData.publicModel.curLevelList = data;
                    commonData.publicModel.curObjType = 'search';
                    //commonMethod.updateObjs();
                    if (data.length) {
                        publicMethod.setCurPop(0, commonData.types[0]);
                    } else {        //无匹配的结果时转换为自定义形式
                        publicMethod.setCurPop(3, commonData.types[0]);
                    }
                    publicMethod.isSelectedObj(null, commonData.types[0]);
                    //publicMethod.locationPop(commonData.textwrap, commonData.textdiv, commonData.textareapop, commonData.text);     //定位
                    publicMethod.locationPop(null, commonData.types[0]);
                } else {
                    publicMethod.updateObjs(0, keyword, commonData.types[0]);
                }

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
