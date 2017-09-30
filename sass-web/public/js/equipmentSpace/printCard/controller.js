var cardPrintController = {
    sendAjax: function (url, data, successCall, errCall, completeCall) {
        pajax.post({
            url: url,
            data: data,
            success: successCall,
            error: errCall,
            complete: completeCall
        });
    },
    sendUpdate: function (url, data, successCall, errCall, completeCall) {
        pajax.updateWithFile({
            url: url,
            data: data,
            success: successCall,
            error: errCall,
            complete: completeCall
        });
    },
    /*获取尚未下载的设备列表
    */
    getNotDownEqArr: function (paramObj, successCall, errCall, completeCall) {
        this.sendAjax('restCardService/queryNotDownloadEquipList', paramObj, successCall, errCall, completeCall);
    },
    /*根据条件获取设备列表
    */
    geEqArrByCriteria: function (paramObj, successCall, errCall, completeCall) {
        this.sendAjax('restCardService/queryEquipList', paramObj, successCall, errCall, completeCall);
    },
    /*获取尚未下载的空间列表
    */
    getNotDownSpArr: function (paramObj, successCall, errCall, completeCall) {
        this.sendAjax('restCardService/queryNotDownloadSpaceList', paramObj, successCall, errCall, completeCall);
    },
    /*根据条件获取空间列表
    */
    geSpArrByCriteria: function (paramObj, successCall, errCall, completeCall) {
        this.sendAjax('restCardService/querySpaceList', paramObj, successCall, errCall, completeCall);
    },
    /*获取某建筑下的楼层
    */
    getFloorByBuild: function (buildId, successCall, errCall, completeCall) {
        this.sendAjax('restFloorService/queryFloorList', {
            build_id: buildId
        }, successCall, errCall, completeCall);
    }
};