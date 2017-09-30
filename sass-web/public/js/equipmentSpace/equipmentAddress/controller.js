var equipmentAddressController = {
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
    /*获取商家列表
    *type 公司类型，1 供应商、2 生产厂家、3 维修商、4 保险公司
    */
    getMerchantArr: function (pageIndex, pageEachNumber, type, successCall, errCall, completeCall) {
        this.sendAjax('restEquipCompanyService/queryEquipCompanyList', {
            company_type: type, page: pageIndex, page_size: pageEachNumber
        }, successCall, errCall, completeCall);
    },
    /*根据ID获取某一个商家*/
    getMerchantById: function (id, successCall, errCall, completeCall) {
        this.sendAjax('restEquipCompanyService/queryEquipCompanyById', {
            company_id: id
        }, successCall, errCall, completeCall);
    },
    /*添加商家*/
    newMerchant: function (object, successCall, errCall, completeCall) {
        this.sendUpdate('restEquipCompanyService/addEquipCompany', object, successCall, errCall, completeCall);
    },
    /*修改商家*/
    updateMerchant: function (object, successCall, errCall, completeCall) {
        this.sendUpdate('restEquipCompanyService/updateEquipCompanyById', object, successCall, errCall, completeCall);
    },
    /*删除商家*/
    removeMerchantById: function (id, successCall, errCall, completeCall) {
        this.sendAjax('restEquipCompanyService/deleteEquipCompanyById', {
            company_id: id
        }, successCall, errCall, completeCall);
    }
};