// 上传进度
var scheduleUploadSuccessfull = function() {

    var arr = $("#upload").pval();
    arr = arr.concat($("#upload1").pval());
    if (!arr.length) return;

    var val = $("#upload").pval()[0] || $("#upload1").pval()[0];

    if ($("#upload1").pval().length) {
        v.instance.state = 1;
    }

    v.instance.onPage = 'show';

    var uploadScheduling = new Promise(function(resolve) {
        uploadSchedulingFile(val, v.instance.month, function(tableHead, tableBody, data) {

            // 绑定的头部内容和发布的内容
            v.instance.tableHead = tableHead;
            resolve(tableBody);
        })
    })

    var SchedulingForWeb = new Promise(function(resolve) {

        queryMonthSchedulingForWeb(v.instance.selectmonth, function(tableHead, tableBody, data) {

            resolve(tableBody);
        })

    });

    var argums = {};

    // 合并两个对象
    function ext(key, data) {
        argums[key] = data;
        if (Object.keys(argums).length != 2) return;

        if (!argums['SchedulingForWeb'].length) {

            v.instance.tableBody = argums['uploadScheduling'];
            return;
        }

        var res = {
            nameList: [],
            phoneList: [],
        };

        argums['SchedulingForWeb'].reduce(function(con, item) {

            con.nameList.push(item[0].str);
            con.phoneList.push(item[1].str);
            return con;
        }, res);

        argums['uploadScheduling'].forEach(function(item) {

            // 获取每行的任务
            var info = item[0],
                name = item[0].str,
                tel = item[1].str;

            if (!/^1[3|4|5|7|8][0-9]{9}$/.test(tel)) {
                info.isErrorWord = '此电话号码无效！'
            }

            if (res.phoneList.indexOf(tel) == -1) {
                info.isErrorWord = '此用户当前尚未被录入系统！'
            }
        });

        v.instance.tableBody = argums['uploadScheduling'];


    }

    // 下载文档中的进度查询
    SchedulingForWeb.then(function(tbody) {
        ext('SchedulingForWeb', tbody);

        $("#upload").precover();
    });

    // 上传文档的班次查询
    uploadScheduling.then(function(tbody) {
        ext('uploadScheduling', tbody);
    });

}

// 修改上传的日期控件
var changeMonth = function(data) {

    var res = $(`#${v.instance.monthId}`).psel().startTime.replace(/\-/, '');

    if (res != v.instance.month) {

        $("#upload").precover();
        $("#upload1").precover();

        v.instance.month = res;

        var date = yyyyMM2Date(v.instance.month);

        $(`#${v.instance.getMonthId}`).psel({
            y: date.format('yyyy'),
            M: date.format('MM'),
        })
    }

}

// 修改展示的日期控件
var changeSelectMonth = function() {
    v.instance.selectmonth = $(`#${v.instance.getMonthId}`).psel().startTime.replace(/\-/, '');

    var date = yyyyMM2Date(v.instance.selectmonth);

    $(`#${v.instance.monthId}`).psel({
        y: date.format('yyyy'),
        M: date.format('MM'),
    })

    queryMonthSchedulingForWeb(v.instance.selectmonth, function(tableHead, tableBody, data) {

        if (tableHead.length && tableBody.length) {
            v.instance.onPage = 'show';
            v.instance.tableHead = tableHead;
            v.instance.tableBody = tableBody;

            v.instance.state = 2;
        } else {
            v.instance.state = 1;
            v.instance.onPage = 'upload';
        }
    })
}