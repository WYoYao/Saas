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
    }
};