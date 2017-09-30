var controllerupload = {

}


;
(function() {

    window.yyyyMM2Date = function(month) {
        var arrmonth = Array.prototype.slice.call(month);

        return new Date(arrmonth.splice(0, 4).join('') + '/' + arrmonth.join('') + '/01');
    }

    // 获取每个月的日期 星期
    function getTime(month) {

        // 传入的yyyyMM 转换成时间类型
        month = month ? yyyyMM2Date(month) : void 0;

        var time = month ? month : new Date,
            year = time.getFullYear(),
            month = time.getMonth() + 1,
            startTime = new Date(year + "-" + month + "-01"),
            endTime = new Date(new Date((month == 12 ? year + 1 : year) + "-" + (month == 12 ? 1 : (month + 1)) + "-01") - 86400000);

        var weekEnum = ["一", "二", "三", "四", "五", "六", "日"];

        return _.range(endTime.getDate() - startTime.getDate() + 1).map(function(item, index) {

            ++index;
            return {
                date: index,
                week: weekEnum[new Date(+startTime + index * 24 * 60 * 60 * 1000).getUTCDay()],
            };
        });
    };

    // Execel 返回格式转换成对应的Object 类型
    function Exe2Data(month, data, cb) {

        // 返回的头和内容
        var tableHead, tableBody;

        // 数据转换开始
        // 去最开始的0
        var arr = data.map(function(item) {
            item.columns.shift()
            return item.columns;
        });

        var DateList = getTime(month),
            dateList = [],
            weekList = [];

        DateList.forEach(function(element) {
            dateList.push(element.date);
            weekList.push(element.week);
        });

        // 绑定给对应的头两行数据
        arr[0] = arr[0].splice(0, 3).concat(weekList);
        arr[1] = arr[1].splice(0, 3).concat(dateList);

        // 分出头的内容
        tableHead = arr.splice(0, 2);

        // 查询所有班次的类型做判断，来判断的内容部分是否有不错误的内容
        querySchedulingConfig(function(list) {

            // 获取所有类型的集合
            var keylist = list.map(function(item) {

                return item.code.toString();
            })

            tableBody = arr.map(function(item, index) {

                return dateList.reduce(function(con, item, index) {

                    // 当返回的长度小于当前的长度的时候的补充空表的部分
                    if (con.length - 3 == index) {

                        con.push('');
                    }
                    return con;
                }, item);
            }).map(function(item) {

                return item.map(function(str, index) {

                    return {
                        str: str,
                        isError: index > 2 ? (str ? keylist.indexOf(str) == -1 : false) : false,
                    }
                })
            });

            cb(tableHead, tableBody, data);
        })

    }

    window.uploadSchedulingFile = function(val, month, cb) {

        // 假返回数据
        // var data = [
        //     { "columns": ["0", "", "", "星期", "二", "三", "四"] },
        //     { "columns": ["0", "姓名", "电话", "职位", "1", "2", "3"] },
        //     { "columns": ["0", "葛占彬", "18610130405", "大王", "1", "2", "D"] },
        //     { "columns": ["0", "郭松涛", "135110", "大王", "2", "3", "4"] },
        //     { "columns": ["0", "何鑫欣", "15501057502", "国师", "1", "A", "C"] },
        //     { "columns": ["0", "孟祥永1", "18500611380", "将军", "C", "2", "6"] },
        //     { "columns": ["0", "汪存文", "15801075390", "老太君", "4", "3", "6"] },
        //     { "columns": ["0", "王海龙", "13488718088", "哈哈", "8", "a", "d"] }
        // ];

        // Exe2Data(month, data, cb);
        // return;

        pajax.updateWithFile({
            url: 'restSchedulingService/uploadSchedulingFile',
            data: {
                month: month, //月份, 格式：yyyyMM，必须
                attachments: {
                    path: val.url,
                    toPro: 'file',
                    multiFile: false,
                    fileName: val.name,
                    fileSuffix: val.suffix,
                    isNewFile: true,
                    fileType: 2,
                }
            },
            success: function(data) {
                v.instance.tabledata = JSON.parse(JSON.stringify(data));
                Exe2Data(month, data, cb);
            }
        });
    }

    //排班管理-排班表主页:查询目前排班计划 (web端)
    window.queryMonthSchedulingForWeb = function(month, cb) {
        // 假返回数据
        // var data = [
        //     { "columns": ["0", "", "", "星期", "二", "三", "四"] },
        //     { "columns": ["0", "姓名", "电话", "职位", "1", "2", "3"] },
        //     { "columns": ["0", "葛占彬", "18610130405", "大王", "1", "2", "D"] },
        //     { "columns": ["0", "郭松涛", "13511064984", "大王", "2", "3", "4"] },
        //     { "columns": ["0", "何鑫欣", "15501057502", "国师", "1", "A", "C"] },
        //     { "columns": ["0", "孟祥永", "18500611380", "将军", "C", "2", "6"] },
        //     { "columns": ["0", "汪存文", "15801075390", "老太君", "4", "3", "6"] },
        //     { "columns": ["0", "王海龙", "13488718088", "哈哈", "8", "a", "d"] }
        // ];

        // if (window.index == void 0) {
        //     window.index = 0;
        // }
        // index++;
        // if (index % 2 == 0) {

        //     Exe2Data(month, data, cb);
        // } else {

        //     cb([], [], data);
        // }

        // return;

        $("#systemloading").pshow()
        pajax.post({
            url: 'restSchedulingService/queryMonthSchedulingForWeb',
            data: {
                month: month
            },
            success: function(data) {
                if (data.data.length) {
                    Exe2Data(month, data.data, cb);
                } else {
                    cb([], [], data.data);
                }
            },
            complete: function() {
                $("#systemloading").phide()
            },
        });


    }


    // 获取排版设置
    window.querySchedulingConfig = function(cb) {

        // cb([{
        //     "code": 'A', //编号	
        //     "name": 'name', //名称
        //     "create_time": (new Date()).format('yyyyMMddHHmmss'), //创建时间 	格式：yyyyMMddHHmmss
        //     "time_plan": [ //排班计划时间
        //         {
        //             "end": (new Date()).format('HH:mm'), //结束时分  格式HH:mm
        //             "start": (new Date()).format('HH:mm') //开始时分  格式HH:mm
        //         },
        //         {
        //             "end": (new Date()).format('HH:mm'), //结束时分  格式HH:mm
        //             "start": (new Date()).format('HH:mm') //开始时分  格式HH:mm
        //         }
        //     ]
        // }, {
        //     "code": 'B', //编号	
        //     "name": 'Bname', //名称
        //     "create_time": (new Date()).format('yyyyMMddHHmmss'), //创建时间 	格式：yyyyMMddHHmmss
        //     "time_plan": [ //排班计划时间
        //         {
        //             "end": (new Date()).format('HH:mm'), //结束时分  格式HH:mm
        //             "start": (new Date()).format('HH:mm') //开始时分  格式HH:mm
        //         },
        //         {
        //             "end": (new Date()).format('HH:mm'), //结束时分  格式HH:mm
        //             "start": (new Date()).format('HH:mm') //开始时分  格式HH:mm
        //         }
        //     ]
        // }, {
        //     "code": 'C', //编号	
        //     "name": 'Cname', //名称
        //     "create_time": (new Date()).format('yyyyMMddHHmmss'), //创建时间 	格式：yyyyMMddHHmmss
        //     "time_plan": [ //排班计划时间
        //         {
        //             "end": (new Date()).format('HH:mm'), //结束时分  格式HH:mm
        //             "start": (new Date()).format('HH:mm') //开始时分  格式HH:mm
        //         },
        //         {
        //             "end": (new Date()).format('HH:mm'), //结束时分  格式HH:mm
        //             "start": (new Date()).format('HH:mm') //开始时分  格式HH:mm
        //         }
        //     ]
        // }, {
        //     "code": 'E', //编号	
        //     "name": 'Ename', //名称
        //     "create_time": (new Date()).format('yyyyMMddHHmmss'), //创建时间 	格式：yyyyMMddHHmmss
        //     "time_plan": [ //排班计划时间
        //         {
        //             "end": (new Date()).format('HH:mm'), //结束时分  格式HH:mm
        //             "start": (new Date()).format('HH:mm') //开始时分  格式HH:mm
        //         },
        //         {
        //             "end": (new Date()).format('HH:mm'), //结束时分  格式HH:mm
        //             "start": (new Date()).format('HH:mm') //开始时分  格式HH:mm
        //         }
        //     ]
        // }]);
        // return;

        $("#systemloading").pshow()
        pajax.post({
            url: 'restSchedulingConfigService/querySchedulingConfig',
            data: {},
            success: function(data) {
                cb(data.data);
            },
            complete: function() {
                $("#systemloading").phide()
            },
        });
    }

    // 排班管理-排班表主页:添加排班信息
    window.saveOrUpdateSchedulingConfig = function(contents, cb) {

        // cb();
        // return;

        pajax.post({
            url: 'restSchedulingConfigService/saveOrUpdateSchedulingConfig',
            data: {
                scheduling_configs: contents,
            },
            success: function(data) {
                $("#uploadpnotice").pshow({ text: '保存成功', state: "success" });
                cb(data);
            },
            error: function() {
                $("#uploadpnotice").pshow({ text: '保存失败', state: "failure" });
            },
            complete: function() {

            },
        });
    }

    window.saveSchedulingPlan = function(argu, cb) {

        pajax.post({
            url: 'restSchedulingService/saveSchedulingPlan',
            data: {
                month: v.instance.month,
                contents: argu,
            },
            success: function(data) {
                $("#uploadpnotice").pshow({ text: "发布成功！", state: "success" });
                Object.prototype.toString.call(cb).slice(8, -1) == 'Function' ? cb(data) : void 0;
            },
            error: function() {
                $("#uploadpnotice").pshow({ text: "发布失败！", state: "failure" });
            }
        });

        console.log(argu);

    }

})();