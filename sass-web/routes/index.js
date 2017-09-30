/*路由*/
module.exports = function(app) {
    var controller = require('../controller/controller');

    //用户信息
    app.get('/userInfo', controller.getUserInfo());

    app.get('/setUser', controller.setUserInfo());

    // 人员管理
    app.get('/person', controller.personManage());

    // 系统管理
    app.get('/system', controller.systemManage());

    // 排版管理
    app.get('/schedule', controller.scheduleManage());

    // 设备管理
    app.get('/equipmentMng', controller.equipmentMng());

    // 空间管理
    app.get('/spaceMng', controller.spaceMng());

    // 设备通讯录
    app.get('/equipmentAddress', controller.equipmentAddress());

    // 打印设备空间名片
    app.get('/printCard', controller.printCard());

    // 工单配置
    app.get('/workOrderConfig', controller.workOrderConfig());

    // 我的工单
    app.get('/myWorkOrder', controller.myWorkOrder());

    // 计划监控
    app.get('/planMonitor', controller.planMonitor());

    // 工单管理
    app.get('/workOrderMng', controller.workOrderMng());

    // 知识库管理
    app.get('/SOP', controller.SOP());

};