var globalController = {
    /*获取建筑*/
    getBuild: function (successCall, errCall, completeCall) {
        pajax.post({
            url: 'restObjectService/queryBuild',
            success: successCall,
            error: function () {
                console.error('globalController.getBuild err');
                if (typeof errCall == 'function') errCall();
            },
            complete: completeCall,
        });
    },
    /*获取专业*/
    getMajor: function (successCall, errCall, completeCall) {
        pajax.post({
            url: 'restGeneralDictService/queryGeneralDictByKey',
            data: {
                dict_type: 'domain_require'
            },
            success: successCall,
            error: function () {
                console.error('globalController.getMajor err');
                if (typeof errCall == 'function') errCall();
            },
            complete: completeCall
        });
    },
    /*获取某专业下的系统*/
    getSystemByMajorCode: function (majorCode, successCall, errCall, completeCall) {
        pajax.post({
            url: 'restObjectService/querySystemForSystemDomain',
            data: {
                system_domain: majorCode
            },
            success: successCall,
            error: function (err) {
                console.error('globalController.getSystemByMajorCode err');
                if (typeof errCall == 'function') errCall();
            },
            complete: completeCall
        });
    },
    /*搜索物理世界对象*/
    searchObject: function (keyword, successCall, errCall, completeCall) {
        pajax.post({
            url: 'restObjectService/searchObject',
            data: {
                keyword: keyword
            },
            success: successCall,
            error: function (err) {
                console.error('globalController.searchObject err');
                if (typeof errCall == 'function') errCall();
            },
            complete: completeCall
        });
    },
    /*查询楼层*/
    getFloor: function (needParents, successCall, errCall, completeCall) {
        pajax.post({
            url: 'restObjectService/queryFloor',
            data: {
                need_back_parents: needParents
            },
            success: successCall,
            error: function (err) {
                console.error('globalController.getFloor err');
                if (typeof errCall == 'function') errCall();
            },
            complete: completeCall
        });
    },
    /*查询空间*/
    getSpace: function (paramObj, successCall, errCall, completeCall) {
        pajax.post({
            url: 'restObjectService/querySpace',
            data: paramObj,
            success: successCall,
            error: function (err) {
                console.error('globalController.getSpace err');
                if (typeof errCall == 'function') errCall();
            },
            complete: completeCall
        });
    },
    /*查询系统实例*/
    getSystem: function (successCall, errCall, completeCall) {
        pajax.post({
            url: 'restObjectService/querySystem',
            data: {
                need_back_parents: true
            },
            success: successCall,
            error: function (err) {
                console.error('globalController.getSystem err');
                if (typeof errCall == 'function') errCall();
            },
            complete: completeCall
        });
    },
    /*查询建筑-楼层-空间列表树*/
    getBuildFloorSpaceTree: function (successCall, errCall, completeCall) {
        pajax.post({
            url: 'restObjectService/queryBuildFloorSpaceTree',
            success: successCall,
            error: function (err) {
                console.error('globalController.getBuildFloorSpaceTree err');
                if (typeof errCall == 'function') errCall();
            },
            complete: completeCall
        });
    },
    /*查询设备实例*/
    getEquip: function (paramObj, successCall, errCall, completeCall) {
        pajax.post({
            url: 'restObjectService/queryEquip',
            data: paramObj,
            success: successCall,
            error: function (err) {
                console.error('globalController.getEquip err');
                if (typeof errCall == 'function') errCall();
            },
            complete: completeCall
        });
    },
    /*查询工具/部件列表*/
    getTempObject: function (paramObj, successCall, errCall, completeCall) {
        pajax.post({
            url: 'restObjectService/queryTempObjectList',
            data: paramObj,
            success: successCall,
            error: function (err) {
                console.error('globalController.getTempObject err');
                if (typeof errCall == 'function') errCall();
            },
            complete: completeCall
        });
    },
    /*搜索信息点*/
    searchInfoPoint: function (keyword, successCall, errCall, completeCall) {
        pajax.post({
            url: 'restObjectService/searchInfoPoint',
            data: {
                keyword: keyword
            },
            success: successCall,
            error: function (err) {
                console.error('globalController.searchInfoPoint err');
                if (typeof errCall == 'function') errCall();
            },
            complete: completeCall
        });
    },
    /*查询对象下信息点*/
    getInfoPoint: function (paramObj, successCall, errCall, completeCall) {
        pajax.post({
            url: 'restObjectService/queryInfoPointForObject',
            data: paramObj,
            success: successCall,
            error: function (err) {
                console.error('globalController.getInfoPoint err');
                if (typeof errCall == 'function') errCall();
            },
            complete: completeCall
        });
    },
    /*查询工单类型*/
    getWorkOrderType: function (successCall, errCall, completeCall) {
        pajax.post({
            url: 'restGeneralDictService/queryGeneralDictByKey',
            data: {
                dict_type: 'work_order_type'
            },
            success: successCall,
            error: function (err) {
                console.error('globalController.getWorkOrderType err');
                if (typeof errCall == 'function') errCall();
            },
            complete: completeCall
        });
    },

};