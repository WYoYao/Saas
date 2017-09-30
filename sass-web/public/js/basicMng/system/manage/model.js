;
(function() {

    var Customer = function() {
        return {
            "customer_id": "", //客户id
            "company_name": "", //公司名称 ,必须
            "legal_person": "", //公司法人
            "account": "", //账号
            "mail": "", //公司邮箱
            "contact_person": "", //联系人
            "contact_phone": "", //联系人电话
            "operation_valid_term_start": "", //公司经营有效期限开始日期，YYYY-MM-DD
            "operation_valid_term_end": "", //公司经营有效期限结束日期，YYYY-MM-DD
            "contract_valid_term_start": "", //托管合同有效期限开始日期，YYYY-MM-DD
            "contract_valid_term_end": "", //托管合同有效期限结束日期，YYYY-MM-DD
            "business_license": "", //营业执照，图片的key
            "pictures": [], //产权证/托管合同，图片key的数组
            "tool_type": "Web", //工具类型,Web，Revit
            "project_id": "", //项目id/项目编码
            "project_name": "", //项目名称
            "project_local_name": "" //项目本地名称
        };
    }

    v.pushComponent({
        name: 'manage',
        data: {
            Customer: new Customer(),
        },
        methods: {},
        beforeMount: function() {
            var _that = this;
            controllermanage.queryCustomerById(function(data) {
                _that.Customer = data;
            })
        },
    })

})();