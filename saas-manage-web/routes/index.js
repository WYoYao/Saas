/*路由*/
module.exports = function(app) {
    var controller = require('../controller/controller');

    // 模块管理页面
    app.get('/modulemanage', controller.modulemanage());
    // 
    app.get('/platformsettings', controller.platformsettings());

};