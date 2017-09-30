/*路由控制的实现*/
function controller() {};
controller.prototype.rootReq = function(req, res, next) {
    var _this = this;
};

controller.prototype.modulemanage = function(req, res, next) {
    return function(req, res, next) {
        res.render('./pages/modulemanage', { host: commonLibUrl });
    };
}

controller.prototype.platformsettings = function(req, res, next) {
    return function(req, res, next) {
        res.render('./pages/platformsettings', { host: commonLibUrl, index: req.query.index });
    }
}


module.exports = new controller();