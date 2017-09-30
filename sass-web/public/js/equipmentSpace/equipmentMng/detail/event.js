// 选择查询对应的工单
var _clickWorkOrderCode = function(val) {
    v.instance.WorkOrderCode = val.code;
}

var headerbdata = [{ name: "基础信息" }, { name: "技术参数" }]

var headerbCall = function() {

    v.instance.baseTab = $("#baseTab").psel();
}

var addbuild1 = function(item) {
    v.instance.Build1 = item;
}

var addbuild2 = function(item) {
    v.instance.Build2 = item;
}

var addid_manufacturer_sel = function(item) {
    v.instance.brands = item.brands.map(function(info) {
        return { name: info };
    });
}

var addid_insurer_sel = function(item) {
    v.instance.insurer_infos = item.insurer_info;
}