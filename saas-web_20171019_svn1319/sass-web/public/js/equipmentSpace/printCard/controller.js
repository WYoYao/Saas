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
    },
    /*下载设备名片
    */
    downEqCard: function (idArr) {
        pajax.downloadByParam('restCardService/downloadEquipCard', {
            equip_ids: idArr
        });
    },
    /*下载空间名片
    */
    downSpCard: function (idArr) {
        pajax.downloadByParam('restCardService/downloadSpaceCard', {
            space_ids: idArr
        });
    },
    /*获取设备名片设置的可选项
    */
    getEqCardInfoArr: function (successCall, errCall, completeCall) {
        this.sendAjax('restCardService/queryEquipOptions', {}, successCall, errCall, completeCall);
    },
    /*获取空间名片设置的可选项
    */
    getSpCardInfoArr: function (successCall, errCall, completeCall) {
        this.sendAjax('restCardService/querySpaceOptions', {}, successCall, errCall, completeCall);
    },
    /*获取上一次设置的设备名片或空间名片
    */
    getOldCardSet: function (type, successCall, errCall, completeCall) {
        this.sendAjax('restCardService/queryCardInfo', { obj_type: type }, successCall, errCall, completeCall);
    },
    /*保存名片*/
    saveCard: function (object, successCall, errCall, completeCall) {
        this.sendUpdate('restCardService/saveCardStyle', object, successCall, errCall, completeCall);
    }
};