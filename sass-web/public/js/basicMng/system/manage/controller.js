var controllermanage = {
    queryCustomerById: function(cb) {


        // console.log(`测试数据后面需删除Start`);
        // $("#systemloading").pshow()
        // setTimeout(function() {

        //     var data = {
        //         "customer_id": "客户id", //客户id
        //         "company_name": "公司名称", //公司名称 ,必须
        //         "legal_person": "公司法人", //公司法人
        //         "account": "账号", //账号
        //         "mail": "公司邮箱", //公司邮箱
        //         "contact_person": "联系人王", //联系人
        //         "contact_phone": "13366659254", //联系人电话
        //         "operation_valid_term_start": "1293-10-20", //公司经营有效期限开始日期，YYYY-MM-DD
        //         "operation_valid_term_end": "1293-10-20", //公司经营有效期限结束日期，YYYY-MM-DD
        //         "contract_valid_term_start": "1293-10-20", //托管合同有效期限开始日期，YYYY-MM-DD
        //         "contract_valid_term_end": "1293-10-20", //托管合同有效期限结束日期，YYYY-MM-DD
        //         "business_license": "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=369992704,1124840615&fm=27&gp=0.jpg", //营业执照，图片的key
        //         "pictures": ["https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=369992704,1124840615&fm=27&gp=0.jpg", "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=369992704,1124840615&fm=27&gp=0.jpg"], //产权证/托管合同，图片key的数组
        //         "tool_type": "Web", //工具类型,Web，Revit
        //         "project_id": "项目编码", //项目id/项目编码
        //         "project_name": "项目名称", //项目名称
        //         "project_local_name": "项目本地名称" //项目本地名称
        //     };
        //     Object.prototype.toString.call(cb).slice(8, -1) == 'Function' ? cb(data) : void 0;
        //     $("#systemloading").phide()
        // })
        // console.log(`测试数据后面需删除End`);
        // return;

        $("#systemloading").pshow()
        pajax.post({
            url: 'restCustomerService/queryCustomerById',
            data: {},
            success: function(data) {
                Object.prototype.toString.call(cb).slice(8, -1) == 'Function' ? cb(data || new Customer()) : void 0;
            },
            complete: function() {
                $("#systemloading").phide()
            },
        });
    }
}