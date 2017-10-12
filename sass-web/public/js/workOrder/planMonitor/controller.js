var controller = {
    /*数据请求*/
    getTabList: function() { //tab相关数据请求
        $("#list_loading").pshow();
        pajax.post({
            url: 'restWoPlanService/queryTabList',
            data: {},
            success: function(res) {
                var _data = res && res.data ? res.data : [];
                // _data = [ //临时使用
                //     { "code": "1", "name": "维保", "description": "释义***" },
                //     { "code": "2", "name": "维修", "description": "释义***" },
                //     { "code": "3", "name": "巡检", "description": "释义***" },
                //     { "code": "4", "name": "运行", "description": "释义***" }
                // ]
                var list = JSON.parse(JSON.stringify(_data));
                list.forEach(function(info, index) {
                    info["name"] = info.tab_name;
                    if (index == '0') {
                        info["icon"] = "z"
                    } else {
                        info["icon"] = "z"
                    }
                });
                // console.log(list)
                model.buttonMenus = list;
                methods.getListMonthDate(null,null,list[0].code); //获取当前月和上下月天数
                

            },
            error: function(error) {

            },

            complete: function() {
                $("#list_loading").phide();
            }
        });
    },
    getPlanListDay: function(_data) { //获取计划列表（日）
        $("#list_loading").pshow();
        pajax.post({
            url: 'restWoPlanService/queryWoPlanDayExecuteList',
            data: _data,
            success: function(res) {
                var _data = res && res.data ? res.data : [];
                // _data = d.tableListDay;
                var dataList = JSON.parse(JSON.stringify(_data));
                var currList = JSON.parse(JSON.stringify(model.tableListDay));
                //空白表格数据与返回数据比对,标记有状态的一天
                //将数据返回的表格类型转换成对比数据格式
                var newDataList = dataList.map(function(list) {
                    list["renderListDay"] = []; //渲染页面数据
                    list["dataCompareList"] = [];
                    for (var i = 0; i < list.max_freq_num; i++) {
                        list["renderListDay"].push(currList); //每一天的数据
                        list["dataCompareList"][i] = [];
                    };
                    list.work_order_date.forEach(function(item, index) {
                        item.work_orders.forEach(function(info, index2) {
                            list.dataCompareList[index2].push(info);
                            list.dataCompareList[index2][index]["date"] = item.date;
                        })
                    });
                    return list;
                });
                //对比数据
                var arr1 = JSON.parse(JSON.stringify(newDataList));
                // console.log(JSON.stringify(arr1))
                arr1.forEach(function(parent) {

                    var renderListDay = parent.renderListDay;

                    var dataCompareList = parent.dataCompareList;

                    renderListDay.forEach(function(info, i) {

                        var renderDay = dataCompareList[i];

                        info.forEach(function(item, index) {
                            // console.log(item);

                            renderDay.forEach(function(y) {

                                if (item.markDay == y.date) {
                                    info[index] = Object.assign({}, item, y);

                                    // info[index].leo = '有重复的';
                                    // console.log('有重复的');
                                }

                            })

                        })
                    })

                });
                // console.log(JSON.stringify(arr1))
                model.renderTableListDay = JSON.parse(JSON.stringify(arr1));
                // console.log(JSON.stringify(newDataList));


            },
            error: function(error) {

            },

            complete: function() {
                $("#list_loading").phide();
            }
        });
    },
    getPlanListCommon: function(_data) { //获取计划列表（年、月、周）
        $("#list_loading").pshow();
        pajax.post({
            url: 'restWoPlanService/queryWoPlanExecuteList',
            data: _data,
            success: function(res) {
                var _data = res && res.data ? res.data : [];
                // _data = d.tableListCommon;
                var dataList = JSON.parse(JSON.stringify(_data));
                var currList = JSON.parse(JSON.stringify(model.tableListDay));
                var newList = dataList.map(function(item, index1) { //返回数据列表
                    item["dataCompareList"] = [];
                    item["newList"] = currList;
                    var arr1 = JSON.parse(JSON.stringify(item.work_orders));
                    item["dataCompareList"] = arr1.concat(); //复制
                    item.work_orders.forEach(function(info) {
                        info.ask_start_time = info.ask_start_time.substring(0, 4) + "-" + info.ask_start_time.substring(4, 6) + "-" + info.ask_start_time.substring(6, 8);
                        info.ask_end_time = info.ask_end_time.substring(0, 4) + "-" + info.ask_end_time.substring(4, 6) + "-" + info.ask_end_time.substring(6, 8);
                    });
                    item["dataCompareList"].forEach(function(info) {
                        info.ask_start_time = info.ask_start_time.substring(0, 4) + "-" + info.ask_start_time.substring(4, 6) + "-" + info.ask_start_time.substring(6, 8);
                        info.ask_end_time = info.ask_end_time.substring(0, 4) + "-" + info.ask_end_time.substring(4, 6) + "-" + info.ask_end_time.substring(6, 8);
                        info.ask_start_time = new Date(info.ask_start_time).getTime()
                        info.ask_end_time = new Date(info.ask_end_time).getTime()

                    });
                    return item
                });

                var transList_Y = JSON.parse(JSON.stringify(newList)); //得到转成时间戳后的辅助数组，进行比较大小，数据处理
                transList_Y.map(function(tran, index) {
                    // transList_Y[index]["render_list"] = [];
                    var res = tran.dataCompareList.reduce(function(con, item, index2, arr) {
                        if (!index2) {
                            con.push([item]);
                            return con;
                        };
                        var before = arr[index2 - 1];
                        var total = (item.ask_start_time - before.ask_end_time) / 86400000;
                        if (total <= 0) { //某一天重合放到一个新数组
                            con.push([item])
                        } else {
                            con[con.length - 1].push(item);
                            // item.ask_start_time = methods.tranY_M_D(item.ask_start_time);
                            // item.ask_end_time = methods.tranY_M_D(item.ask_end_time);
                        };
                        return con
                    }, []);
                    transList_Y[index]["dataCompareList"] = res;
                });
                transList_Y.forEach(function(item, index1) {
                    // item.dataCompareList[index1]["step"] = [];
                    item.dataCompareList = item.dataCompareList.map(function(info, index2) {
                        return { step: info }
                    })
                    // return item
                });
                //转换数据格式，对当前数组内前后天进行补齐
                transList_Y.forEach(function(info, index1) {
                    var differMS = 1000 * 60 * 60 * 24;
                    var st = info.newList[index1].markDay;
                    var et = info.newList[info.newList.length - 1].markDay
                    var _st = st.substring(0, 4) + '-' + st.substring(4, 6) + '-' + st.substring(6, 8);
                    var _et = et.substring(0, 4) + '-' + et.substring(4, 6) + '-' + et.substring(6, 8);
                    // console.log(_st, _et);
                    var startTimeMs = Date.parse(new Date(_st));
                    var endTimeMs = Date.parse(new Date(_et));
                    // console.log(startTimeMs,endTimeMs)
                    // console.log(methods.tranY_M_D(endTimeMs))
                    var rightTab_liWidth = model.rightTab_liWidth;
                    for (var i = 0; i < info.dataCompareList.length; i++) {
                        var obj = info.dataCompareList[i];
                        obj.step1 = [];
                        for (var j = 0; j < obj.step.length; j++) {
                            var item = obj.step[j];
                            var k1 = j == 0 ? startTimeMs : obj.step[j - 1].ask_end_time + differMS;
                            for (var k = k1; k < item.ask_end_time; k += differMS) {
                                if (k >= item.ask_start_time && k < item.ask_end_time) {
                                    obj.step1.push({ mark: (item.ask_end_time - item.ask_start_time) / differMS + 1, order_state: item.order_state, order_id: item.order_id, ask_start_time: item.ask_start_time, ask_end_time: item.ask_end_time, is_next_order: item.is_next_order })
                                    break
                                } else {
                                    // obj.step1.push({mark:1,ask_start_time:k,ask_end_time:k+differMS})
                                    obj.step1.push({ mark: 1, order_state: "none" })
                                }
                            }
                        }
                        //对后面的所有天补齐
                        var k1 = obj.step[obj.step.length - 1].ask_end_time + differMS;
                        var k2 = endTimeMs;
                        for (var k = k1; k <= k2; k += differMS) {
                            obj.step1.push({ mark: 1, order_state: "none" })
                        }
                    }
                });
                model.renderTableListCommon = transList_Y;
                // console.log(JSON.stringify(model.renderTableListCommon));
            },
            error: function(error) {

            },
            complete: function() {
                $("#list_loading").phide();
            }
        });
    },
    getOrderStateList: function() { //查询工单状态列表
        $("#list_loading").pshow();
        pajax.post({
            url: 'restGeneralDictService/queryGeneralDictByKey',
            data: {
                dict_type: "work_order_state"
            },
            success: function(res) {
                var _data = res && res.data ? res.data : [];
                // _data = [
                //     { "code": "4", "name": "待开始" },
                //     { "code": "5", "name": "执行中" },
                //     { "code": "6", "name": "待审核" },
                //     { "code": "8", "name": "完成" },
                //     { "code": "9", "name": "中止" },
                //     // { "code": "C1", "name": "已分配" },
                //     // { "code": "C2", "name": "未执行" },
                // ]
                var list = JSON.parse(JSON.stringify(_data));
                var arr1 = JSON.parse(JSON.stringify(list));
                arr1.unshift({ "code": "", "name": "全部" });
                var arr2 = JSON.parse(JSON.stringify(list));
                arr2.unshift({ "code": "next", "name": "下次待发出工单" });
                model.orderStateList = arr1;
                model.orderStateList_img = arr2;
            },
            error: function(error) {

            },

            complete: function() {
                $("#list_loading").phide();
            }
        });
    },
    getOrderTypeList: function() { //查询工单类型列表
        pajax.post({
            url: 'restGeneralDictService/queryGeneralDictByKey',
            data: {
                dict_type: "work_order_type"
            },
            success: function(res) {
                var _data = res && res.data ? res.data : [];
                // _data = [{ "code": "1", "name": "保养", "description": "xxx" }, //临时使用
                //     { "code": "2", "name": "维修", "description": "xxx" },
                //     { "code": "3", "name": "巡检", "description": "xxx" },
                //     { "code": "4", "name": "运行", "description": "xxx" }
                // ]
                model.orderList = _data;

            },
            error: function(error) {

            },

            complete: function() {
                $("#list_loading").phide();
            }
        });
    },
    getScrapList: function() { //作废列表
        $("#list_loading").pshow();
        var userId = model.user_id;
        var projectId = model.project_id;
        pajax.post({
            url: 'restWoPlanService/queryDestroyedWoPlanList',
            data: {},
            success: function(res) {
                var _data = res && res.data ? res.data : [];
                // _data = d.scrapList; //临时使用
                model.scrapListArr = _data;
            },
            error: function(error) {

            },

            complete: function() {
                $("#list_loading").phide();
            }
        });
    },
    getScrapDetail: function(planId) { //作废详情信息
        $("#list_loading").pshow();
        var userId = model.user_id;
        pajax.post({
            url: 'restWoPlanService/queryWoPlanById',
            data: {
                plan_id: planId,
            },
            success: function(res) {
                var _data = res ? res : {};
                // _data = d.planDetail; //临时使用
                model.scrapPlanDetail = _data;
                model.curPage = model.pages[2];

            },
            error: function(error) {

            },

            complete: function() {
                $("#list_loading").phide();
            }
        });
    },
    getOldOrderList: function(data) { //查询作废计划列表
        $("#list_loading").pshow();
        pajax.post({
            url: 'restWoPlanService/queryWoListByPlanId',
            data: data,
            success: function(res) {
                var _data = res && res.data ? res.data : [];
                // _data = d.oldOrderList; //临时使用
                model.oldOrderList = _data;
                model.curPage = model.pages[3];

            },
            error: function(error) {

            },

            complete: function() {
                $("#list_loading").phide();
            }
        });
    },
    getHistoryRecordList: function() { //查询历史记录
        $("#list_loading").pshow();
        pajax.post({
            // url: 'restWoPlanService/queryDestroyedWoPlanList', //临时使用
            url: 'restWoPlanService/queryWoPlanHisList',
            data: {
                plan_id: model.plan_id
            },
            success: function(res) {
                var _data = res && res.data ? res.data : [];
                // _data = d.historyRecordList; //临时使用
                model.historyRecordList = _data;
                $("#floatWindow").pshow();
            },
            error: function(error) {

            },

            complete: function() {
                $("#list_loading").phide();
            }
        });
    },
    getPlanDetailById: function(planId) { //根据id查看计划详情
        $("#list_loading").pshow();
        pajax.post({
            // url: 'restWoPlanService/queryDestroyedWoPlanList', //临时使用
            url: 'restWoPlanService/queryWoPlanById',
            data: {
                plan_id: planId
            },
            success: function(res) {
                var _data = res ? res : {};
                // _data = d.planDetailData; //临时使用
                model.plan_id = planId;
                model.planDetailData = _data;
                // $("#floatWindow").pshow();

            },
            error: function(error) {

            },

            complete: function() {
                $("#list_loading").phide();
            }
        });
    },
    getScrapOperat: function() { //确定作废操作
        pajax.post({
            url: 'restWoPlanService/destroyWoPlanById',
            data: {
                plan_id: model.planId
            },
            success: function(res) {
                model.curPage = model.pages[0];
            },
            error: function(error) {

            },

            complete: function() {
                $("#list_loading").phide();
            }
        });
    },
    
    
    getPlanCreateNext:function(_data){//创建计划预览
        pajax.post({
            // url: 'restWoPlanService/queryDestroyedWoPlanList', //临时使用
            url: 'restWoPlanService/getWoMattersPreview',
            data: _data,
            success: function(res) {
                var _data = res && res.published_matters ? res.published_matters : {};
                // _data = d.planCreateData; //临时使用
                model.planCreateDetail = _data;
                model.curPage = model.pages[7];
            },
            error: function(error) {

            },

            complete: function() {
                $("#list_loading").phide();
            }
        });
    },
    getObjExample:function(_data){//获取对象实例请求
        pajax.post({
            url: 'restWoPlanService/queryDestroyedWoPlanList', //临时使用
            // url: 'restObjectService/queryObjectByClass',
            data: _data,
            success: function(res) {
                var _data = res && res.data ? res.data : [];
                _data = d.objExample; //临时使用
                model.planObjExampleArr = _data;
                // console.log(_data)
                $("#choiceObjExample").show();
            },
            error: function(error) {

            },

            complete: function() {
                $("#list_loading").phide();
            }
        });
    },
    getAddOrderPlan:function(_data){//添加工单计划
        $("#list_loading").pshow();
        pajax.update({
            url: 'restWoPlanService/addWoPlan',
            data: _data,
            success: function(res) {
                $("#publishNotice").pshow({ text: '发布成功', state: "success" });
            },
            error: function(error) {
                 $("#publishNotice").pshow({ text: '发布失败，请重试', state: "failure" });
            },
            complete: function() {
                $("#list_loading").phide();
            }
        });
    },
    getEditOrderPlan:function(_data){//编辑计划保存
        $("#list_loading").pshow();
        pajax.update({
            url: 'restWoPlanService/updateWoPlan',
            data: _data,
            success: function(res) {
                $("#publishNotice").pshow({ text: '发布成功', state: "success" });
            },
            error: function(error) {
                 $("#publishNotice").pshow({ text: '发布失败，请重试', state: "failure" });
            },
            complete: function() {
                $("#list_loading").phide();
            }
        });
        
    },
   


}