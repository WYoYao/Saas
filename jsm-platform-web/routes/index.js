/*路由*/
module.exports = function(app) {
    var controller = require('../controller/controller');

    //用户信息
    app.get('/userinfo', controller.getUserInfo());

    //左侧导航
    app.get('/navigation', controller.getNavigation());

    //工单引擎服务管理
    app.get('/workorderenginemanage', controller.redirectWorkOrder());

    //非法访问监控管理
   app.get('/unaccessmonitormanage', controller.redirectUnAccessMonitor());
};