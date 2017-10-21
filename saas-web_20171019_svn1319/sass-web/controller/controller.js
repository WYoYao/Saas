/*路由控制的实现*/
var tool = require('common/tool');

function controller() {};

controller.prototype.rootReq = function(req, res, next) {
    var _this = this;
};

controller.prototype.getUserInfo = function(req, res, next) {
    return function(req, res, next) {
        var user = tool.getUserInfo(req);
        res.send({ user: user });
    };
}

controller.prototype.setUserInfo = function(req, res, next) {
    return function(req, res, next) {
        var last_project_id = req.query.last_project_id;
        var user = tool.getUserInfo(req);
        user.last_project_id = last_project_id;
        tool.storeUserInfo(req, res, user);
        res.send({ user: user });
    };
}

controller.prototype.personManage = function(req, res, next) {
    return function(req, res, next) {
        res.render('./pages/basicMng/person/index', { host: commonLibUrl });
    };
}

controller.prototype.systemManage = function(req, res, next) {
    return function(req, res, next) {
        res.render('./pages/basicMng/system/index', { host: commonLibUrl });
    };
}

controller.prototype.scheduleManage = function(req, res, next) {
    return function(req, res, next) {
        var serviceUrl = _config.serviceUrl,
            user = tool.getUserInfo(req),
            customer_id = user.person_id,
            project_id = user.last_project_id;

        res.render('./pages/basicMng/schedule/index', { host: commonLibUrl, serviceUrl: serviceUrl, customer_id: customer_id, project_id: project_id });
    };
}

controller.prototype.equipmentMng = function(req, res, next) {
    return function(req, res, next) {
        res.render('./pages/equipmentSpace/equipmentMng/index', { host: commonLibUrl });
    };
}

controller.prototype.spaceMng = function(req, res, next) {
    return function(req, res, next) {
        res.render('./pages/equipmentSpace/spaceMng/index', { host: commonLibUrl });
    };
}

controller.prototype.equipmentAddress = function(req, res, next) {
    return function(req, res, next) {
        res.render('./pages/equipmentSpace/equipmentAddress/index', { host: commonLibUrl });
    };
}

controller.prototype.printCard = function(req, res, next) {
    return function(req, res, next) {
        res.render('./pages/equipmentSpace/printCard/index', { host: commonLibUrl });
    };
}

controller.prototype.workOrderConfig = function(req, res, next) {
    return function(req, res, next) {
        res.render('./pages/workOrder/workOrderConfig/index', { host: commonLibUrl });
    };
}

controller.prototype.myWorkOrder = function(req, res, next) {
    return function(req, res, next) {
        res.render('./pages/workOrder/myWorkOrder/index', { host: commonLibUrl });
    };
}

controller.prototype.planMonitor = function(req, res, next) {
    return function(req, res, next) {
        res.render('./pages/workOrder/planMonitor/index', { host: commonLibUrl });
    };
}

controller.prototype.workOrderMng = function(req, res, next) {
    return function(req, res, next) {
        res.render('./pages/workOrder/workOrderMng/index', { host: commonLibUrl });
    };
}

controller.prototype.SOP = function(req, res, next) {
    return function(req, res, next) {
        res.render('./pages/workOrder/SOP/index', { host: commonLibUrl });
    };
}

module.exports = new controller();