var projectManageInsert = {
    // 客户信息管理-列表页:查询所有客户信息
    getprojectManageInsert: function(cb) {

        pajax.post({
            url: 'restCustomerService/queryAllCustomer',
            data: {},
            success: function(data) {
                Object.prototype.toString.call(cb).slice(8, -1) == 'Function' ? cb(data) : void 0;
            }
        });
    },
    // 客户信息管理-详细页:根据Id查询客户详细信息
    getCustomerById: function(customer_id, cb) {

        pajax.post({
            url: 'restCustomerService/queryCustomerById',
            data: { customer_id: customer_id },
            success: function(data) {
                Object.prototype.toString.call(cb).slice(8, -1) == 'Function' ? cb(data) : void 0;
            }
        });
    },
    // 提交草稿和保存文件
    postCustomer: function(isDraft, data, cb, isWithFile) {

        if (!data.customer_id) {
            delete data.customer_id;
        }



        pajax[isWithFile ? 'updateWithFile' : 'post']({
            url: isDraft ? 'restCustomerService/saveDraftCustomer' : 'restCustomerService/saveConfirmCustomer',
            data: data,
            success: function(data) {

                $("#projectManagePopNoticeWarn").pshow({ text: "保存成功！", state: "success" });
                Object.prototype.toString.call(cb).slice(8, -1) == 'Function' ? cb() : void 0;
            },
            error: function(errObj) {
                $("#projectManagePopNoticeWarn").pshow({ text: "保存失败！", state: "failure" });
            },

        });
    },

};