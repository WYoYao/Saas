v.pushComponent({
    name: 'scheduleUpload',
    data: {
        month: (new Date()).format('yyyyMM'),
        selectmonth: (new Date()).format('yyyyMM'),
        monthId: ptool.produceId(),
        getMonthId: ptool.produceId(),
        uploadProject_id: 'Pj1101080001',
        url: '',
        onPage: 'upload',
        tableHead: [], //表格数据
        tableBody: [], //表格数据
        banc: [{
            time_plan: [],
        }],
        data: {}, // 保存data 数据 查询排版的数据
        state: 1, // 1 预览展示  2 发布后展示 
    },
    methods: {
        // 下载模版s
        _clickDownload: function() {

            var dateObj = $("#" + this.monthId).psel();
            this.month = dateObj ? new Date(dateObj.startTime).format('yyyyMM') : false || this.month;

            window.open(`http://172.16.0.124:9080/saas/restSchedulingService/downloadSchedulingTemplateFile?user_id=RY1503886428173&project_id=Pj1101080001&month=${this.month}`);

        },
        _clikcShowBanc: function() {
            var _that = this;
            querySchedulingConfig(function(list) {
                _that.banc = _.isArray(list) ? list : [{
                    isNew: true,
                    time_plan: [{
                        start: "00:00",
                        end: "00:00",
                    }],
                }];

                setTimeout(function() {

                    var idList = $(".id");
                    var nameList = $(".name");
                    var timeList = $(".time");

                    _that.banc.forEach(function(item, index) {

                        idList.eq(index).pval(item.code);
                        nameList.eq(index).pval(item.name);

                        var datelist = timeList.eq(index).find(".date");
                        var edatelist = timeList.eq(index).find(".edate");
                        item.time_plan.forEach(function(info, i) {

                            console.log(JSON.stringify({ h: info.start.split(':')[0], m: info.start.split(':')[1] }));

                            console.log($("#startTime" + index + i));

                            $("#startTime" + index + i).psel({ h: info.start.split(':')[0] >>> 0, m: info.start.split(':')[1] >>> 0 });
                            $("#startEnd" + index + i).psel({ h: info.end.split(':')[0] >>> 0, m: info.end.split(':')[1] >>> 0 });
                        })
                    })
                }, 0);

            })
            this.onPage = 'banc';
        },
        _addbancItem: function() {

            var _that = this;

            var idList = $(".id");
            var nameList = $(".name");
            var timeList = $(".time");

            _that.banc.forEach(function(item, index) {

                item.code = idList.eq(index).pval();
                item.name = nameList.eq(index).pval();

                // var datelist = timeList.eq(index).find(".date");
                // var edatelist = timeList.eq(index).find(".edate");
                item.time_plan.forEach(function(info, i) {

                    var start = $("#startTime" + index + i).psel().startTime.replace(/\:/g, '') >>> 0;
                    var end = $("#startEnd" + index + i).psel().startTime.replace(/\:/g, '') >>> 0;

                    info.start = start > end ? $("#startEnd" + index + i).psel().startTime : $("#startTime" + index + i).psel().startTime;
                    info.end = start < end ? $("#startEnd" + index + i).psel().startTime : $("#startTime" + index + i).psel().startTime;
                })
            });

            // 验证名称不能为空
            var message = _that.banc.reduce(function(con, item, index) {

                if (con.length) return con;

                return item.code ? (item.name ? con : '班次名称不能未空') : '班次编码不能为空';

            }, '');

            if (message) {
                $("#uploadpnotice").pshow({ text: message, state: "failure" });
                return;
            }

            message = _that.banc.reduce(function(con, item, index) {

                if (con.length) return con;

                if (_that.banc.filter(function(bc) {
                        return bc.name == item.name;
                    }).length > 1) {
                    return '当前班次名称重复';
                }

                if (_that.banc.filter(function(bc) {
                        return bc.code == item.code;
                    }).length > 1) {
                    return '当前班次中编码重复';
                }


                // 验证时间是否重复
                return item.time_plan.reduce(function(con, info, i) {

                    if (con.length) return con;

                    var time = info.start.replace(/\:/g, '') >>> 0;
                    var end = info.end.replace(/\:/g, '') >>> 0;

                    for (i; i < item.time_plan.length; i++) {
                        var obj = item.time_plan[i];
                        var stime = obj.start.replace(/\:/g, '') >>> 0;
                        var send = obj.end.replace(/\:/g, '') >>> 0;

                        if ((time < stime && stime < end) || (time < end && end < end)) {

                            return '第' + (index + 1) + '个班次中时间段重叠';
                        }
                    }

                    return con;



                }, con)

            }, '');

            if (message) {
                $("#uploadpnotice").pshow({ text: message, state: "failure" });
                return;
            }


            saveOrUpdateSchedulingConfig(_that.banc, function() {
                changeSelectMonth();
            });
        },
        _clikcShowUpload: function() {
            this.onPage = 'upload';
            changeSelectMonth();
        },
        // 添加时间计划
        _addtime_plan: function(index) {
            this.banc[index].time_plan.push({
                "end": "00:00", //结束时分  格式HH:mm
                "start": "00:00" //开始时分  格式HH:mm
            });

            setTimeout(function() {
                $(".time").eq(index).find(".date").find("#startTime").psel({ h: '00', m: '00' });
                $(".time").eq(index).find(".edate").find("#startEnd").psel({ h: '00', m: '00' });
            }, 0);
        },
        // 删除时间计划
        _retime_plan: function(index, i) {
            if (this.banc[index].time_plan.length == 1) return;
            this.banc[index].time_plan.splice(i, 1);
        },
        // 删除的班次
        _rebanc: function(createtime) {

            console.log(createtime);

            this.banc = this.banc.filter(function(item) {
                return item.createtime != createtime;
            })

            // console.log(this.banc.splice(index, 1));

            // this.banc.splice(index, 1);
        },
        // 发布内容
        _clickfb: function() {

            $("#upload").precover();
            $("#upload1").precover();

            saveSchedulingPlan(v.instance.tabledata, function() {
                $("#uploadpnotice").pshow({ text: '发布成功', state: "success" });
                changeSelectMonth();
            });
        },
        // 添加班次
        _addbanc: function() {
            this.banc.push({
                createtime: +new Date(),
                name: "",
                code: "",
                time_plan: [{
                    start: "00:00",
                    end: "00:00",
                }],
            });
        },
        // 重新双传
        _reupload: function() {

            this.onPage = 'upload';
            this.state = 1;
            $("#upload").precover();
            $("#upload1").precover();
            changeSelectMonth();

        }
    },
    beforeMount: function() {
        var _that = this;

        $("#" + this.monthId).psel({ y: (new Date()).format('yyyy'), M: (new Date()).format('MM') });
        $("#" + this.getMonthId).psel({ y: (new Date()).format('yyyy'), M: (new Date()).format('MM') });
    },
})