/*路由控制的实现*/
function controller() {
    this.tool = require('common/tool');
};

controller.prototype.getUserInfo = function () {
    var _this = this;
    return function (req, res, next) {
        var user = _this.tool.getUserInfo(req);
        res.send(user);
    };
};

controller.prototype.getNavigation = function () {
    var _this = this;
    return function (req, res, next) {
        res.send(_config.navigation);
    };
};

controller.prototype.redirectWorkOrder = function () {
    return function (req, res, next) {
        res.render('./workorderengine/layout', { host: commonLibUrl });
    };
};
controller.prototype.redirectUnAccessMonitor = function () {
    return function (req, res, next) {
        res.render('./unaccessmonitor/layout', { host: commonLibUrl });
    };
};
module.exports = new controller();