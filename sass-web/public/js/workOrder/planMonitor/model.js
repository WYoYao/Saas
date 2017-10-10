var model = {
    pages: [ //所有页面导航
        "listCommon", //计划列表
        "planMonitor_scraplist", //计划作废列表
        "planMonitor_scrapDetail", //计划作废详情
        "oldOrderRecordList", //历史记录列表
        "see_palnDetail", //查看计划详情
        "see_orderDetail", //查看工单详情
        "planCreate", //创建计划
        "planCreate_next", //下一步

    ],
    goBackFlag: '', //工单详情返回标记
    curPage: 'listCommon', //当前页面
    user_id: '1', //用户id 暂时使用
    project_id: '1', //项目id  暂时使用
    plan_id: '', //计划id
    orderStateList: [], //工单状态列表
    choiceOrderType: {}, //选择的工单状态
    buttonMenus: [{}],
    prevDayDate: [], //上个月天数
    currDayDate: [], //当前月天数
    nextDayDate: [], //下个月天数
    M_currMonth: '', //当前月份
    year: '', //当前年
    tableListDay: [], //列表表格(每日)默认数据
    renderTableListDay: [], //列表表格(每日)渲染
    renderTableListCommon: [], //列表表格年月日渲染
    rightTab_liWidth: '', //每个单元格的宽
    scrapListArr: [], //作废列表数据
    scrapPlanDetail: {}, //作废计划详情
    orderList: [], //工单类型表
    oldOrderList: [], //过去的工单记录列表
    orderStateList: [], //工单状态列表
    choiceOrderType: {}, //工单类型
    historyRecordList: [], //历史记录列表
    planDetailData: {}, //计划详情
    orderDetailData: {}, //工单详情
    orderOperatList: [], //工单操作列表
    orderStateList_img: [], //工单状态列表用于列表中解析对应图标
    cycleListData: [
        { name: "每日", type: "d" },
        { name: "每周", type: "w" },
        { name: "每月", type: "m" },
        { name: "每年", type: "y" }
    ],
    cycleType: "d", //列表周期记录  
    //计划创建
    orderLevelList: [ //工单紧急程度
        { name: "高" },
        { name: "中" },
        { name: "低" }
    ],
    planRateLeft: [
        { name: "年" },
        { name: "月" },
        { name: "周" },
        { name: "日" },

    ], //计划频率年月周天
    planRateRig: [

    ],
    rateYear: '', //年频率数
    rateMonth: '', //月频率数
    rateWeek: '', //周频率数
    rateDay: '', //日频率数
    weekChoice_List: [ //选择星期列表
        { name: "周一" },
        { name: "周二" },
        { name: "周三" },
        { name: "周四" },
        { name: "周五" },
        { name: "周六" },
        { name: "周日" }
    ],
    effectTime_startList: [ //生效时间
        {
            name: "发布成功后立即",

        }, {
            name: "自定义"
        }
    ],
    effectTime_endList: [{
        name: "一直有效",

    }, {
        name: "自定义"
    }],
    seePlanId: '', //查看计划id
    orderTypeObj: { code: "1", name: "" }, //工单类型列表存
    newPlanObj: { //新建计划提交对象
        plan_name: '', //计划名称
        order_type: '', //工单类型code,
        urgency: '', //紧急程度,高、中、低
        ahead_create_time: '', //提前创建工单时间
        freq_cycle: '', //ymwd周期
        freq_num: '', //计划频率次数
        freq_times: [], //计划频率-时间
        plan_start_type: '', //计划开始时间1,发布成功立即2,指定时间
        plan_start_time: '', //开始时间
        plan_end_time: '', //结束时间
        draft_matters: [], //工单事项数组草稿matters
        published_matters: [], //工单事项数组，预览matters

    },
    newPlan_frequencyArr: [], //创建计划频率开始结束时间
    newPlan_startTime: "", //创建计划计划开始时间
    newPlan_endTime: "", //创建计划计划结束时间
    planCreateDetail: [], //计划创建预览
    planObjExampleArr: [], //对象实例数组
    toolList:[],//工具列表
    selectedTool:[],//工具存储数组


}

var methods = {
    openScrapDetail: function(planId) { //打开作废计划详情
        model.plan_id = planId;
        controller.getScrapDetail(planId);
    },
    scrapDetailGoBack: function() { //作废详情页返回
        this.curPage = this.pages[1];
        model.scrapPlanDetail = {};
    },
    createNewPlan: function() { //创建计划
        var _index = $("#navBar").psel() ? $("#navBar").psel() : 0;
        model.orderTypeCode = model.buttonMenus[_index].code;
        model.orderTypeName = model.buttonMenus[_index].name;
        this.curPage = this.pages[6];
    },
    editNewPlan: function() { //编辑计划

    },
    choiceOrderFn: function(modelData, event) { //过去发出的作废工单切换选项
        //console.log(modelData, event.pEventAttr.currItem.code)
        this.choiceTimerType = modelData;
        var userId = model.user_id;
        var projectId = model.project_id;
        var orderState = event.pEventAttr.currItem.code;
        var page = 1;
        var pageSize = 50;
        var data = {
            user_id: userId,
            project_id: projectId,
            plan_id: model.planId,
            order_state: orderState,
            page: page,
            page_size: pageSize
        };
        controller.getOldOrderList(data)
    },

    scrapModalHide: function() { //作废模态框隐藏
        $("#scrapModal").phide();
    },
    historyModalShow: function() { //历史记录侧弹框显示
        controller.getHistoryRecordList();
    },
    orderRecordListShow: function(planId) { //作废历史记录列表
        controller.getOrderStateList(); //获取工单状态列表
        model.planId = planId; //进入过去发出的工单列表页存储
        var userId = model.user_id;
        var projectId = model.project_id;
        var orderState = model.choiceOrderType.code;
        var page = 1;
        var pageSize = 50;
        var data = {
            user_id: userId,
            project_id: projectId,
            plan_id: planId,
            order_state: orderState,
            page: page,
            page_size: pageSize
        };
        controller.getOldOrderList(data)
    },
    oldRecordGoBack: function() { //历史工单记录返回
        model.planId = '';
        model.oldOrderList = '';
        this.curPage = this.pages[2];

    },
    goBackPlanList: function() { //返回计划列表
        this.curPage = this.pages[0];
        model.scrapListArr = [];
    },
    clickScrapPlan: function() { //作废提示框显示
        $("#scrapModal").pshow();
    },
    clickEditPlan: function() { //点击修改计划
        var planDetailObj = model.planDetailData;
        console.log(JSON.stringify(planDetailObj));
        this.curPage = this.pages[6];
        //设置计划相关信息
        $("#plan_name").pval(planDetailObj.plan_name); //计划名称
        model.orderTypeName = planDetailObj.order_type_name + '计划';
        $("#orderUrgency").psel(planDetailObj.urgency);
        $("#aheadCreateTime").pval(planDetailObj.ahead_create_time);
        var _arrLength = planDetailObj.freq_times.length;
        if (planDetailObj.freq_cycle == 'y') { //年
            $("#planRateLeft").psel('年');
            model.rateYear = _arrLength;
        } else if (planDetailObj.freq_cycle == 'm') { //月
            $("#planRateLeft").psel('月');
            model.rateMonth = _arrLength;

        } else if (planDetailObj.freq_cycle == 'w') { //周
            $("#planRateLeft").psel('周');
            model.rateWeek = _arrLength;

        } else if (planDetailObj.freq_cycle == 'd') { //日
            $("#planRateLeft").psel('日');
            model.rateDay = _arrLength;

        }
        var _num = planDetailObj.freq_num;
        // console.log(_num.toString())
        setTimeout(function() {
            $("#planRateRig").psel(_num.toString()); //频率

        }, 0);
        //设置计划频率时间开始
        setTimeout(function() {
            if (planDetailObj.freq_cycle == 'y') { //年
                var _arr = planDetailObj.freq_times;
                var _newArr = [];
                for (var i = 0; i < _arr.length; i++) {
                    var _stM = _arr[i].start_time.time_day.substr(0, 2);
                    var _std = _arr[i].start_time.time_day.substr(3, 2);
                    var _sth = _arr[i].start_time.time_hour;
                    var _stm = _arr[i].start_time.time_minute;
                    var _etM = _arr[i].end_time.time_day.substr(0, 2);
                    var _etd = _arr[i].end_time.time_day.substr(3, 2);
                    var _eth = _arr[i].end_time.time_hour;
                    var _etm = _arr[i].end_time.time_minute;
                    _newArr.push({ st: { M: _stM, d: _std, h: _sth, m: _stm }, et: { M: _etM, d: _etd, h: _eth, m: _etm } })
                    $("#yearStartTime" + i).psel({ M: _stM, d: _std, h: _sth, m: _stm });
                    $("#yearEndTime" + i).psel({ M: _etM, d: _etd, h: _eth, m: _etm });
                }
                console.log(_newArr);
            } else if (planDetailObj.freq_cycle == 'm') { //月
                var _arr = planDetailObj.freq_times;
                var _newArr = [];
                for (var i = 0; i < _arr.length; i++) {
                    var _std = _arr[i].start_time.time_day;
                    var _sth = _arr[i].start_time.time_hour;
                    var _stm = _arr[i].start_time.time_minute;
                    var _etd = _arr[i].end_time.time_day;
                    var _eth = _arr[i].end_time.time_hour;
                    var _etm = _arr[i].end_time.time_minute;
                    _newArr.push({ st: { d: _std, h: _sth, m: _stm }, et: { d: _etd, h: _eth, m: _etm } })
                    $("#monthStartTime" + i).psel({ d: _std, h: _sth, m: _stm });
                    $("#monthEndTime" + i).psel({d: _etd, h: _eth, m: _etm });
                }

            } else if (planDetailObj.freq_cycle == 'w') { //周
                var _arr = planDetailObj.freq_times;
                var _newArr = [];
                for (var i = 0; i < _arr.length; i++) {
                    var _std = methods.filter_weekDetail_trans(_arr[i].start_time.time_day);
                    var _sth = _arr[i].start_time.time_hour;
                    var _stm = _arr[i].start_time.time_minute;
                    var _etd = methods.filter_weekDetail_trans(_arr[i].end_time.time_day);
                    var _eth = _arr[i].end_time.time_hour;
                    var _etm = _arr[i].end_time.time_minute;
                    _newArr.push({ st: { d: _std, h: _sth, m: _stm }, et: { d: _etd, h: _eth, m: _etm } })
                    $("#weekChoiceList_prev" + i).psel(_std);
                    $("#weekChoiceList_next" + i).psel(_etd);
                    $("#weekStartTime" + i).psel({ h: _sth, m: _stm });
                    $("#weekEndTime" + i).psel({h: _eth, m: _etm });
                }


            } else if (planDetailObj.freq_cycle == 'd') { //日
                var _arr = planDetailObj.freq_times;
                var _newArr = [];
                for (var i = 0; i < _arr.length; i++) {
                    var _sth = _arr[i].start_time.time_hour;
                    var _stm = _arr[i].start_time.time_minute;
                    var _eth = _arr[i].end_time.time_hour;
                    var _etm = _arr[i].end_time.time_minute;
                    _newArr.push({ st: {h: _sth, m: _stm }, et: {h: _eth, m: _etm } })
                    $("#dayStartTime" + i).psel({h: _sth, m: _stm });
                    $("#dayEndTime" + i).psel({h: _eth, m: _etm });
                }

            }
        }, 10);
        //设置计划频率时间结束

        //设置计划开始时间
        if(planDetailObj.plan_start_time !=""){
            $("#choice_planStartTime").psel("自定义");
            $("#plan_startTime >div").pshow();
            setTimeout(function(){
                var str = planDetailObj.plan_start_time;
                $("#plan_startTime >div").psel({y:str.substr(0,4),M:str.substr(4,2),d:str.substr(6,2),h:str.substr(8,2),m:str.substr(10,2)})
            });

        }else{
            $("#choice_planStartTime").psel("发布成功后立即");
            $("#plan_startTime>div").phide();
        }
        //设置计划结束时间
        if(planDetailObj.plan_end_time !=""){
            $("#choice_planEndTime").psel("自定义");
            $("#plan_endTime >div").pshow();
            setTimeout(function(){
                var str = planDetailObj.plan_end_time;
                $("#plan_endTime>div").psel({y:str.substr(0,4),M:str.substr(4,2),d:str.substr(6,2),h:str.substr(8,2),m:str.substr(10,2)})

            },10)
        }else{
            $("#choice_planEndTime").psel("一直有效");
            $("#plan_endTime >div").phide();
        }




    },
    //*tab切换
    tabChange: function(model, event) {
        var _this = this;
        var vueModel = window.model;
        var _index = event.pEventAttr.index;
        _this.getListMonthDate(null, null, null);
    },
    mGetDate: function(_year, _month) { //获取每个月天数
        // console.log(_year)
        var d = new Date(_year, _month, 0);
        return d.getDate();
    },

    getListMonthDate: function(_year, _month, _code) { //获取当前月和上下月天数
        var _this = this;
        var date = new Date();
        if (!model.year) {
            model.year = date.getFullYear();
        }
        var year = model.year ? model.year : date.getFullYear();
        var currMonth = date.getMonth() + 1;
        if (_month) {
            model.M_currMonth = _month;
        } else {
            model.M_currMonth = currMonth;
        }
        var prevMonthLength = {};
        var currMonthLength = {};
        var nextMonthLength = {};
        // 11 12 1 model.year = 2017
        // 12 1 2 model.year = 2018
        // 判断上月
        if (_month) {
            prevMonthLength["length"] = _month - 1 > 0 ? _this.mGetDate(year, _month - 1) : _this.mGetDate(year - 1, _month + 11);
            prevMonthLength["month"] = _month - 1 > 0 ? _month - 1 : _month + 11;
            if (_month - 1 == '0') {
                prevMonthLength["year"] = year - 1;
            } else {
                prevMonthLength["year"] = year;
            }
        } else {
            prevMonthLength["length"] = currMonth - 1 > 0 ? _this.mGetDate(year, currMonth - 1) : _this.mGetDate(year - 1, currMonth + 11);
            prevMonthLength["month"] = currMonth - 1 > 0 ? currMonth - 1 : currMonth + 11;
            if (currMonth - 1 == '0') {
                prevMonthLength["year"] = year - 1;
            } else {
                prevMonthLength["year"] = year;
            }

        };
        //当前月
        if (_month) {
            currMonthLength["length"] = _this.mGetDate(year, _month);
            currMonthLength["month"] = _month;
            currMonthLength["year"] = year;
        } else {
            currMonthLength["length"] = _this.mGetDate(year, currMonth);
            currMonthLength["month"] = currMonth;
            currMonthLength["year"] = year;
        }
        //判断下月
        if (_month) {
            nextMonthLength["length"] = _month + 1 < 13 ? _this.mGetDate(year, _month + 1) : _this.mGetDate(year + 1, _month - 11);
            nextMonthLength["month"] = _month + 1 < 13 ? _month + 1 : _month - 11;
            if (_month - 12 == '0') {
                nextMonthLength["year"] = year + 1;
            } else {
                nextMonthLength["year"] = year;
            }
        } else {
            nextMonthLength["length"] = currMonth + 1 < 13 ? _this.mGetDate(year, currMonth + 1) : _this.mGetDate(year + 1, currMonth - 11)
            nextMonthLength["month"] = currMonth + 1 < 13 ? currMonth + 1 : currMonth - 11;
            if (currMonth - 12 == '0') {
                nextMonthLength["year"] = year + 1;
            } else {
                nextMonthLength["year"] = year;
            }

        }

        //console.log(prevMonthLength,currMonthLength,nextMonthLength);
        var prevArr = [];
        var currArr = [];
        var nextArr = [];
        //上月
        for (var i = 0; i < prevMonthLength.length; i++) {
            prevArr.push({
                "year": prevMonthLength.year,
                "month": prevMonthLength.month,
                "day": i + 1,
                "markDay": (year) + "" + (prevMonthLength.month < 10 ? "0" + prevMonthLength.month : prevMonthLength.month) + "" + (i + 1)
            })
        };
        //当前月
        for (var j = 0; j < currMonthLength.length; j++) {
            currArr.push({
                "year": currMonthLength.year,
                "month": currMonthLength.month,
                "day": j + 1,
                "markDay": (year) + "" + (currMonthLength.month < 10 ? "0" + currMonthLength.month : currMonthLength.month) + "" + (j < 9 ? "0" + (j + 1) : j + 1)
            })
        };
        //下月
        for (var k = 0; k < nextMonthLength.length; k++) {
            nextArr.push({
                "year": nextMonthLength.year,
                "month": nextMonthLength.month,
                "day": k + 1,
                "markDay": (year) + "" + (nextMonthLength.month < 10 ? "0" + nextMonthLength.month : nextMonthLength.month) + "" + (k < 9 ? "0" + (k + 1) : k + 1)
            })
        };
        var newPrevArr = prevArr.slice(prevMonthLength.length - 2);
        var newNextArr = nextArr.slice(0, 2);
        //console.log(newPrevArr[0].markDay,newNextArr[newNextArr.length-1].markDay);
        var _startTime = newPrevArr[0].markDay + "000000"; //获取开始时间
        var _endTime = newNextArr[newNextArr.length - 1].markDay + "235959"; //获取结束时间
        // 设置列表内天数
        // _this.prevDayDate = newPrevArr;
        var toDayArr = newPrevArr.concat(currArr, newNextArr)
        model.currDayDate = JSON.parse(JSON.stringify(toDayArr));
        var emptyTableListDay = JSON.parse(JSON.stringify(toDayArr));
        model.tableListDay = emptyTableListDay.map(function(info) {
            info.day = "";
            return info
        });

        var liWidth = $(".searchList_table_title_date").width() / model.currDayDate.length;
        var liLength = toDayArr.length;


        var totalWdith = $(".searchList_table_title_date").width();
        var prevWidth = liWidth.toFixed(2) * 2;
        var nextWidth = liWidth.toFixed(2) * 2;
        var currWidth = totalWdith - prevWidth - nextWidth;
        // console.log(liLength+"++++++++++++"+totalWdith/liLength);
        $("#searchList_top_prevMonth").width(prevWidth);
        $("#searchList_top_nextMonth").width(nextWidth);
        $("#searchList_top_currMonth").width(currWidth);
        model.rightTab_liWidth = (totalWdith / liLength).toFixed(2);
        setTimeout(function() {
            $("#searchList_bott_currMonth >ul >li").css("width", totalWdith / liLength);

        }, 0);
        var cycleType = model.cycleType; //判断请求的频率类型，
        if (cycleType == "d") {
            var _index = $("#navBar").psel() ? $("#navBar").psel() : 0;
            var orderType = _code ? _code : model.buttonMenus[_index].code ? model.buttonMenus[_index].code : '1';
            var planName = $("#sop_name_search1 input").val();
            // var startTime = _startTime;
            // var endTime = _endTime;
            var _data = {
                user_id: model.user_id,
                project_id: model.project_id,
                order_type: orderType,
                plan_name: planName,
                freq_cycle: model.cycleType,
                start_time: _startTime,
                end_time: _endTime
            };
            console.log(JSON.stringify(_data))
            controller.getPlanListDay(_data); //频率类型为天的
        } else {
            controller.getPlanListCommon(_data); //频率类型为年、月、周
        }


    },
    getListMonth: function() { //获取当前月和上下月份
        var _this = this;
        var date = new Date();
        var currMonth = date.getMonth() + 1
        // console.log(currMonth);
        _this.currMonth = currMonth;
    },
    searchPrevMonth: function(event) { //切换上一月数据
        var _this = this;
        var prev = parseInt($(event.target).text());
        console.log(prev);
        if (prev == 12) {
            model.year--;
        }
        _this.getListMonthDate(null, prev);
    },
    searchNextMonth: function(event) { //切换下一月数据
        var _this = this;
        var next = parseInt($(event.target).text());
        console.log(next);
        if (next == 1) {
            model.year++;
        }
        _this.getListMonthDate(null, next);
    },
    openScrapList: function() { //打开作废计划列表
        model.curPage = model.pages[1];
        controller.getScrapList();
    },
    arrTransfString: function(arr, key) { //数组对象转字符串通用
        var str = '';
        var newArr = [];
        arr.forEach(function(item) {
            newArr.push(item[key])
        });
        return str = newArr.join(" ")
    },

    transfYMWD: function(str) { //通过年月周天转换对应的中文
        var obj = {
            y: "年",
            m: "月",
            w: "周",
            d: "日",
        }
        return obj[str]
    },

    seePlanDetailShow: function(planId) { //查看计划详情
        model.seePlanId = planId; //计划id存储
        controller.getPlanDetailById(planId);
        if (planId) {
            model.curPage = model.pages[4];

        }
    },
    scrapBtnYes: function() { //确定作废
        controller.getScrapOperat();
    },
    clickSeeOrderDetail: function(order_id) { //点击列表内工单列表查看工单详情
        orderDetail_pub.getOrderDetail(null, order_id, "2");
        // if (order_id) {
        //     model.curPage = model.pages[5];

        // }
    },
    cycleTabChange: function(index, type) { //列表内周期tab切换
        var type = type || '';
        this.cycleType = type;
        if (index == 0) {
            $("#searchList_table_day").show();
            $("#searchList_table_common").hide();
            this.getListMonthDate(null, null);
            // controller.getPlanListDay(); //计划列表（日）
        } else {
            $("#searchList_table_day").hide();
            $("#searchList_table_common").show();
            this.getListMonthDate(null, null);
            // controller.getPlanListCommon();
        }
    },
    tranY_M_D: function formatDate(obj) {
        var date = new Date(obj);
        var y = 1900 + date.getYear();
        var m = "0" + (date.getMonth() + 1);
        var d = "0" + date.getDate();
        return y + "" + m.substring(m.length - 2, m.length) + "" + d.substring(d.length - 2, d.length);
    },
    filterItemByKeyValue: function(list, key, value) { //数组过滤key,value
        function fltbyName(con, item) {
            if (item[key] == value) con = item;
            return con;
        }
        return list.reduce(fltbyName);
    },
    setYMWD_type: function(pp_model, e) { //设置频率类型
        var rateType = pp_model.name;
        model.rateMonth = ''; //月频率数
        model.rateWeek = ''; //周频率数
        model.rateDay = ''; //日频率数
        model.rateYear = '';
        if (rateType == '年') {
            model.planRateRig = [];
            for (var i = 0; i < 365; i++) {
                model.planRateRig.push({ "name": i + 1 });
            }; //年频率数
        } else if (rateType == '月') {
            model.planRateRig = [];
            for (var i = 1; i <= 12; i++) {
                model.planRateRig.push({ "name": i }); //月频率数
            };
        } else if (rateType == '周') {
            model.planRateRig = [];
            for (var i = 1; i <= 7; i++) { //周频率数
                model.planRateRig.push({ "name": i });
            };
        } else if (rateType == '日') {
            model.planRateRig = [];
            for (var i = 1; i <= 31; i++) { //频率数
                model.planRateRig.push({ "name": i });
            };
        }
        // console.log(JSON.stringify(pmodel))
        console.log(JSON.stringify(model.rateYear))
    },
    set_RateNum: function(pp_model, e) { //设置频率次数
        var planId = model.seePlanId;
        if (!planId) {
            var rateType = $("#planRateLeft").psel().text;
            var rateTime = pp_model.name;
            console.log(rateTime)
            console.log(rateType)
            if (rateType == '年') {
                model.rateYear = rateTime;
                model.rateMonth = ''; //月频率数
                model.rateWeek = ''; //周频率数
                model.rateDay = ''; //日频率数
                setTimeout(function() {
                    for (var i = 0; i < rateTime; i++) {
                        $("#yearStartTime" + i).psel({ M: "01", d: "01", h: "00", m: "00" });
                        $("#yearEndTime" + i).psel({ M: "01", d: "01", h: "00", m: "00" });
                    }
                }, 0);


            } else if (rateType == '月') {
                model.rateYear = '';
                model.rateMonth = rateTime; //月频率数
                model.rateWeek = ''; //周频率数
                model.rateDay = ''; //日频率数
                setTimeout(function() {
                    for (var i = 0; i < rateTime; i++) {
                        $("#monthStartTime" + i).psel({ d: "01", h: "00", m: "00" });
                        $("#monthEndTime" + i).psel({ d: "01", h: "00", m: "00" });
                    }
                }, 0);
            } else if (rateType == '周') {
                model.rateYear = '';
                model.rateMonth = ''; //月频率数
                model.rateWeek = rateTime; //周频率数
                model.rateDay = ''; //日频率数
                setTimeout(function() {
                    for (var i = 0; i < rateTime; i++) {
                        $("#weekStartTime" + i).psel({ w: "01", h: "00", m: "00" });
                        $("#weekEndTime" + i).psel({ w: "01", h: "00", m: "00" });
                    }
                }, 0)
            } else if (rateType == '日') {
                model.rateYear = '';
                model.rateMonth = ''; //月频率数
                model.rateWeek = ''; //周频率数
                model.rateDay = rateTime; //日频率数
                setTimeout(function() {
                    for (var i = 0; i < rateTime; i++) {
                        $("#dayStartTime" + i).psel({ h: "00", m: "00" });
                        $("#dayEndTime" + i).psel({ h: "00", m: "00" });
                    }
                }, 0)
            }
        }

    },
    goBackPlanCreate: function() { //返回计划创建
        this.curPage = this.pages[6];
    },
    next_btn_step: function() { //下一步
        model.newPlanObj.plan_name = $("#plan_name").pval(); //计划名称
        model.newPlanObj.order_type = model.orderTypeCode; //工单类型code
        model.newPlanObj.urgency = $("#orderUrgency").psel().text;
        model.newPlanObj.ahead_create_time = $("#aheadCreateTime").pval();
        var freqCycle = $("#planRateLeft").psel().text;
        console.log(freqCycle);
        var freqTimes = []; //存储计划频率每一次的时间
        if (freqCycle == "年") {
            model.newPlan_frequencyArr = [];
            model.newPlanObj.freq_cycle = "y";
            var yearArr = [];
            var arrLength = model.rateYear;
            console.log(arrLength);
            for (var i = 0; i < arrLength; i++) {
                //开始时间
                var st_str = $("#yearStartTime" + i).psel().startTime;
                var st_yM = st_str.substr(0, 2) + st_str.substr(3, 2);
                var st_h = st_str.substr(6, 2);
                var st_m = st_str.substr(9, 2);
                var obj_st = {
                    cycle: "y",
                    time_day: st_yM,
                    time_hour: st_h,
                    time_minute: st_m
                };
                // 结束时间
                var ed_str = $("#yearEndTime" + i).psel().startTime;
                var ed_yM = ed_str.substr(0, 2) + ed_str.substr(3, 2);
                var ed_h = ed_str.substr(6, 2);
                var ed_m = ed_str.substr(9, 2);
                var obj_et = {
                    cycle: "y",
                    time_day: ed_yM,
                    time_hour: ed_h,
                    time_minute: ed_m
                };
                yearArr.push({ start_time: obj_st, end_time: obj_et });
                model.newPlan_frequencyArr.push({ //组装年时间显示
                    st: st_yM.substr(0, 2) + '-' + st_yM.substr(2, 2) + ' ' + st_h + ':' + st_m,
                    et: ed_yM.substr(0, 2) + '-' + ed_yM.substr(2, 2) + ' ' + ed_h + ':' + ed_m
                });
            };
            model.newPlanObj.freq_times = yearArr;
            console.log(JSON.stringify(yearArr));
        } else if (freqCycle == "月") {
            model.newPlanObj.freq_cycle = "m";
            model.newPlan_frequencyArr = [];
            var monthArr = [];
            var arrLength = model.rateMonth;
            for (var i = 0; i < arrLength; i++) {
                //开始时间
                var st_str = $("#monthStartTime" + i).psel().startTime;
                var st_d = st_str.substr(0, 2);
                var st_h = st_str.substr(3, 2);
                var st_m = st_str.substr(6, 2);
                var obj_st = {
                    cycle: "m",
                    time_day: st_d,
                    time_hour: st_h,
                    time_minute: st_m
                };
                // 结束时间
                var ed_str = $("#monthEndTime" + i).psel().startTime;
                var ed_d = ed_str.substr(0, 2);
                var ed_h = ed_str.substr(3, 2);
                var ed_m = ed_str.substr(6, 2);
                var obj_et = {
                    cycle: "m",
                    time_day: ed_d,
                    time_hour: ed_h,
                    time_minute: ed_m
                };
                monthArr.push({ start_time: obj_st, end_time: obj_et });
                model.newPlan_frequencyArr.push({ //组装月份时间显示
                    st: st_d + ' ' + st_h + ':' + st_m,
                    et: ed_d + ' ' + ed_h + ':' + ed_m
                });
            };
            model.newPlanObj.freq_times = monthArr;
            console.log(JSON.stringify(monthArr));
        } else if (freqCycle == "周") {
            model.newPlanObj.freq_cycle = "w";
            model.newPlan_frequencyArr = [];
            var weekArr = [];
            var arrLength = model.rateWeek;
            for (var i = 0; i < arrLength; i++) {
                //开始时间
                var st_str = $("#weekStartTime" + i).psel().startTime;
                var st_dz = $("#weekChoiceList_prev" + i).psel().text; //周开始中文显示
                var st_d = methods.filter_weekDetail($("#weekChoiceList_prev" + i).psel().text);
                var st_h = st_str.substr(0, 2);
                var st_m = st_str.substr(3, 2);
                var obj_st = {
                    cycle: "w",
                    time_day: st_d,
                    time_hour: st_h,
                    time_minute: st_m
                };
                //结束时间
                var ed_str = $("#weekEndTime" + i).psel().startTime;
                var ed_dz = $("#weekChoiceList_next" + i).psel().text; //周结束中文显示
                var ed_d = methods.filter_weekDetail($("#weekChoiceList_next" + i).psel().text);
                var ed_h = ed_str.substr(0, 2);
                var ed_m = ed_str.substr(3, 2);
                var obj_et = {
                    cycle: "w",
                    time_day: ed_d,
                    time_hour: ed_h,
                    time_minute: ed_m
                };
                weekArr.push({ start_time: obj_st, end_time: obj_et });
                model.newPlan_frequencyArr.push({
                    st: st_dz + ' ' + st_h + ':' + st_m,
                    et: ed_dz + ' ' + ed_h + ':' + ed_m
                });
                console.log(JSON.stringify(weekArr))
            };
            model.newPlanObj.freq_times = weekArr;

        } else if (freqCycle == "日") {
            model.newPlanObj.freq_cycle = "d";
            model.newPlan_frequencyArr = [];
            var dayArr = [];
            var arrLength = model.rateDay;
            for (var i = 0; i < arrLength; i++) {
                //开始时间
                var st_str = $("#dayStartTime" + i).psel().startTime;
                // var st_d = st_str.substr(0,2);
                var st_d = '';

                var st_h = st_str.substr(0, 2);
                var st_m = st_str.substr(3, 2);
                var obj_st = {
                    cycle: "d",
                    time_day: st_d,
                    time_hour: st_h,
                    time_minute: st_m
                };
                // 结束时间
                var ed_str = $("#dayEndTime" + i).psel().startTime;
                // var ed_d = ed_str.substr(0,2);
                var ed_d = '';

                var ed_h = ed_str.substr(0, 2);
                var ed_m = ed_str.substr(3, 2);
                var obj_et = {
                    cycle: "d",
                    time_day: ed_d,
                    time_hour: ed_h,
                    time_minute: ed_m
                };
                dayArr.push({ start_time: obj_st, end_time: obj_et });
                model.newPlan_frequencyArr.push({
                    st: st_h + ':' + st_m,
                    et: ed_h + ':' + ed_m
                });
            };
            model.newPlanObj.freq_times = dayArr;
            console.log(JSON.stringify(dayArr));

        }
        model.newPlanObj.freq_num = $("#planRateRig").psel().text; //计划频率
        var choiceSt = $("#choice_planStartTime").psel().text;
        var choiceEt = $("#choice_planEndTime").psel().text;
        if (choiceSt == '发布成功后立即') { //判断选择开始时间类型
            model.newPlanObj.plan_start_time = ""; //计划开始时间
        } else {
            var str = $("#plan_startTime >div").psel().startTime;
            var newStr = str.substr(0, 4) + str.substr(5, 2) + str.substr(8, 2) + str.substr(11, 2) + str.substr(14, 2) + '00';
            model.newPlanObj.plan_start_time = newStr; //计划开始时间
        };

        if (choiceEt == '一直有效') { //判断选择结束时间类型
            model.newPlanObj.plan_start_time = ""; //计划结束时间
        } else {
            var str = $("#plan_endTime >div").psel().startTime;
            var newStr = str.substr(0, 4) + str.substr(5, 2) + str.substr(8, 2) + str.substr(11, 2) + str.substr(14, 2) + '00';
            model.newPlanObj.plan_end_time = newStr; //计划结束时间
        };
        console.log(JSON.stringify(model.newPlanObj))
        //缺少验证
        var matters = [];//用于存储右侧操作后的结果数组
        model.newPlanObj.draft_matters = matters;
        var _data = {
            "draft_matters":matters
        };
        controller.getPlanCreateNext(_data);

    },
    filter_weekDetail: function(str) {
        var obj = {
            "周一": 1,
            "周二": 2,
            "周三": 3,
            "周四": 4,
            "周五": 5,
            "周六": 6,
            "周日": 7,
        };
        return obj[str]
    },
    filter_weekDetail_trans: function(str) {
        var obj = {
            "01":"周一",
            "02":"周二",
            "03":"周三",
            "04":"周四",
            "05":"周五",
            "06":"周六",
            "07":"周日",
        };
        return obj[str]
    },
    plan_startTime_show: function(pp_model, e) {
        console.log(pp_model.name, e);
        if (pp_model.name == '自定义') {
            $("#plan_startTime").show();
        } else {
            $("#plan_startTime").hide();

        }
    },
    plan_endTime_show: function(pp_model, e) {
        console.log(pp_model.name, e);
        if (pp_model.name == '自定义') {
            $("#plan_endTime").show();
        } else {
            $("#plan_endTime").hide();

        }
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
        var _scrollTop = $(".see_planDetail_page_grid").scrollTop();
        var _left = $(event.target).offset().left + 120 + 'px';
        var _top = $(event.target).offset().top - '315' + _scrollTop + 'px';
        console.log($(event.target).offset().top);
        $(".choiceObjExampleModal").css("left", _left);
        $(".choiceObjExampleModal").css("top", _top);
        controller.getObjExample(_data); //获取对象实例请求
    },
    choiceObjExampleYes: function() {

    },
    replaceObjExample: function(_obj) { //替换对象实例(创建计划下一步)
        console.log(_obj)
        pub_model.obj_example.obj_id = _obj.obj_id;
        pub_model.obj_example.obj_name = _obj.obj_name;
        pub_model.obj_example.obj_type = _obj.obj_type;
        pub_model.obj_example.parents = _obj.parents;
        $(".choiceObjExampleModal").hide();
    },
    publishPlanCreate: function() { //发布&编辑计划
        var _data = {
            user_id: model.userId,
            project_id: model.projectId,
            plan_name: model.newPlanObj.plan_name, //计划名称
            order_type: model.newPlanObj.order_type, //计划类型
            urgency: model.newPlanObj.urgency, //紧急程度
            ahead_create_time: model.newPlanObj.ahead_create_time, //提前时间
            freq_cycle: model.newPlanObj.freq_cycle, //计划频率-周期
            freq_num: model.newPlanObj.freq_num, //次数
            freq_times: model.newPlanObj.freq_times, //时间
            plan_start_type: model.newPlanObj.plan_start_type, //计划开始类型
            plan_start_time: model.newPlanObj.plan_start_time, //计划开始时间
            plan_end_time: model.newPlanObj.plan_end_time, //计划结束时间
            draft_matters: model.newPlanObj.draft_matters, //草稿matters
            published_matters: model.planCreateDetail.matters, //预览后的matters
        };
        console.log(JSON.stringify(_data));
        var planId = model.seePlanId || '';
        if(planId){
            _data.plan_id = planId;
            controller.getEditOrderPlan(_data);//编辑计划
        }else{
            controller.getAddOrderPlan(_data);//新建计划
        }
    },
    clickToolListShow:function(){//工具列表显示
        $(".tool-select-list").show();
        $(".tool-select-list").css({"left":"200px","top":"40px"})
        var _data = {
            obj_type:"3",
            obj_name:''
        };
        controller.getToolList(_data);
    },
    toggleSelTool: function (p_model, event) {//选中工具
        p_model.checked = !p_model.checked;
        model.toolList = JSON.parse(JSON.stringify(model.toolList));
        if(p_model.checked){
            model.selectedTool.push(p_model)
        }else{
            for(var i=0;i<model.selectedTool.length;i++){
                if(model.selectedTool[i].obj_id == p_model.obj_id){
                    model.selectedTool.splice(i, 1);
                    break;
                }
            };
        }
       
      
        console.log(JSON.stringify(model.selectedTool))
        

    },
    choiceToolYes:function(){//确定选择工具
        var arr = [];
        for(var i =0;i<model.selectedTool.length;i++){
            arr.push(model.selectedTool[i].obj_name)
        }
        model.orderDetailData.required_tools = arr;
        $("#nextStepSelToolPop").hide();
    }


}