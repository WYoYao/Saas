var projectManageUpdate = {
    init: function(customer) {
        projectManageUpdateModel.instance(customer);
    },
    // 锁定客户信息
    postProjectManageSubmitlock: function(data, cb) {

        pajax.post({
            url: 'restCustomerService/lockCustomerById',
            data: data,
            success: function(data) {
                $("#projectManagePopNoticeWarn").pshow({ text: "锁定成功！", state: "success" });
                Object.prototype.toString.call(cb).slice(8, -1) == 'Function' ? cb(data) : void 0;
            },
            error: function(errObj) {
                $("#projectManagePopNoticeWarn").pshow({ text: "锁定失败！", state: "failure" });
            },
        });
    },
    // 解锁客户信息
    unlockCustomerById: function(data, cb) {

        pajax.post({
            url: 'restCustomerService/unlockCustomerById',
            data: data,
            success: function(data) {
                $("#projectManagePopNoticeWarn").pshow({ text: "解锁成功！", state: "success" });
                Object.prototype.toString.call(cb).slice(8, -1) == 'Function' ? cb(data) : void 0;
            },
            error: function(errObj) {
                $("#projectManagePopNoticeWarn").pshow({ text: "解锁失败！", state: "failure" });
            },
        });
    },
    // 客户信息管理-详细页:根据Id查询客户详细信息
    getCustomerById: function(customer_id, cb) {

        // cb({
        //     "customer_id": "KH1504528641566",
        //     "company_name": "上格云",
        //     "legal_person": "上格云法人",
        //     "account": "1121729785@qq.com",
        //     "mail": "1121729785@qq.com",
        //     "contact_person": "--",
        //     "contact_phone": "13511064984",
        //     "operation_valid_term_start": "2017-09-04 20:37:21",
        //     "operation_valid_term_end": "2017-09-04 20:37:21",
        //     "contract_valid_term_start": "2017-09-04 20:37:21",
        //     "contract_valid_term_end": "2017-09-04 20:37:21",
        //     "business_license": "--",
        //     "pictures": [],
        //     "tool_type": "Web",
        //     "project_id": "Pj1301020024",
        //     "project_name": "河北省石家庄市长安区0024号项目",
        //     "project_local_name": "上格云",
        //     "province": "130000",
        //     "city": "130100",
        //     "district": "130102",
        //     "province_city_name": "--",
        //     "climate_zone": "30",
        //     "climate_zone_name": "--",
        //     "urban_devp_lev": "1210",
        //     "urban_devp_lev_name": "--",
        //     "longitude": "114.52",
        //     "latitude": "38.05",
        //     "altitude": "74",
        //     "note": "--",
        //     "create_time": "2017-09-04 20:37:21",
        //     "build_list": [{
        //             "build_id": "JZ1504681932960",
        //             "build_code": "Bd1301020024001",
        //             "build_name": "001号建筑体",
        //             "build_local_name": "上格云-1号楼",
        //             "build_age": "00",
        //             "build_func_type": "300",
        //             "build_func_type_name": "--",
        //             "create_time": "2017-09-06 15:12:12"
        //         },
        //         {
        //             "build_id": "JZ1504681933016",
        //             "build_code": "Bd1301020024002",
        //             "build_name": "002号建筑体",
        //             "build_local_name": "上格云-2号楼",
        //             "build_age": "00",
        //             "build_func_type": "300",
        //             "build_func_type_name": "--",
        //             "create_time": "2017-09-06 15:12:13"
        //         }
        //     ]
        // });
        // return;
        pajax.post({
            url: 'restCustomerService/queryCustomerById',
            data: customer_id,
            success: function(data) {

                data.operation_valid_term_start = data.operation_valid_term_start || (new Date()).format('yyyy-MM-dd');
                data.operation_valid_term_end = data.operation_valid_term_end || (new Date()).format('yyyy-MM-dd');
                data.contract_valid_term_start = data.contract_valid_term_start || (new Date()).format('yyyy-MM-dd');
                data.contract_valid_term_end = data.contract_valid_term_end || (new Date()).format('yyyy-MM-dd');

                Object.prototype.toString.call(cb).slice(8, -1) == 'Function' ? cb(data) : void 0;
            }
        });
    },
    postProjectManageSubmitUpdate: function(data, cb) {

        var isUpload = data.hasOwnProperty('attachments');

        pajax[isUpload ? 'updateWithFile' : 'post']({
            url: 'restCustomerService/updateCustomerById',
            data: data,
            success: function(data) {
                $("#projectManagePopNoticeWarn").pshow({ text: "保存成功！", state: "success" });
                Object.prototype.toString.call(cb).slice(8, -1) == 'Function' ? cb(data) : void 0;
            },
            error: function(errObj) {
                $("#projectManagePopNoticeWarn").pshow({ text: "保存失败！", state: "failure" });
            },
        });
    },
    resetCustomerPasswd: function(req) {
        pajax.post({
            url: 'restCustomerService/resetCustomerPasswd',
            data: Object.assign({}, {
                customer_id: v.instance.customerUpdate.customer_id,
            }, req),
            success: function(data) {
                $("#projectManagePopNoticeWarn").pshow({ text: "重置密码成功！", state: "success" });
                Object.prototype.toString.call(cb).slice(8, -1) == 'Function' ? cb(data) : void 0;
            },
            error: function(errObj) {
                $("#projectManagePopNoticeWarn").pshow({ text: "重置密码失败！", state: "failure" });
            },
        });
    },
    updateConfirmBuild: function(data, cb) {
        pajax.post({
            url: 'restCustomerService/updateConfirmBuild',
            data: Object.assign({}, {
                customer_id: v.instance.customerUpdate.customer_id,
            }, data),
            success: function(data) {
                $("#projectManagePopNoticeWarn").pshow({ text: "保存成功！", state: "success" });
                Object.prototype.toString.call(cb).slice(8, -1) == 'Function' ? cb(data) : void 0;
            },
            error: function(errObj) {
                $("#projectManagePopNoticeWarn").pshow({ text: "保存失败！", state: "failure" });
            },
        });
    },
    addConfirmBuild: function(data, cb) {
        pajax.post({
            url: 'restCustomerService/addConfirmBuild',
            data: Object.assign({}, {
                customer_id: v.instance.customerUpdate.customer_id,
                project_id: v.instance.customerUpdate.project_id,
            }, data),
            success: function(data) {
                $("#projectManagePopNoticeWarn").pshow({ text: "保存成功！", state: "success" });
                Object.prototype.toString.call(cb).slice(8, -1) == 'Function' ? cb(data) : void 0;
            },
            error: function(errObj) {
                $("#projectManagePopNoticeWarn").pshow({ text: "保存失败！", state: "failure" });
            },
        });
    }
};

$(function() {
    //projectManageUpdate.init();
})