// 提交草稿只对项目名称做效验
var projectManageSubmitlock = function() {

    var params = v.instance.customerUpdate;

    if (v.instance.islock) {

        projectManageUpdate.unlockCustomerById({ customer_id: params.customer_id }, function(res) {
            v.instance.islock = false;
            v.instance.project_list.map(function(item) {
                if (item.customer_id == params.customer_id) {
                    item.customer_status = v.instance.islock ? 3 : 2;
                }
            })
        })

    } else {

        projectManageUpdate.postProjectManageSubmitlock({ customer_id: params.customer_id }, function(res) {
            v.instance.islock = true;
            v.instance.project_list.map(function(item) {
                if (item.customer_id == params.customer_id) {
                    item.customer_status = v.instance.islock ? 3 : 2;
                }
            })

        })
    }

};

;
(function() {
    // 对应的图片几个转换成为的对应的上传附件
    function Covert(key, imgobj) {
        return {
            path: imgobj.url,
            fileName: imgobj.name,
            multiFile: key == 'pictures',
            toPro: key,
            fileSuffix: imgobj.suffix,
            fileType: 1,
            isNewFile: !!imgobj.suffix
        }
    };

    window.ubusinessImgChange = function() {
        debugger;
        var attachments = $("#ubusinessImg").pval().map(Covert.bind(this, 'business_license'))


        projectManageUpdate.postProjectManageSubmitUpdate({
            customer_id: v.instance.customerUpdate.customer_id,
            // business_license: '',
            attachments: attachments
        })
    };

    window.upicturesImgChange = function() {

        var attachments = $("#upicturesImg").pval().map(Covert.bind(this, 'pictures'))

        projectManageUpdate.postProjectManageSubmitUpdate({
            customer_id: v.instance.customerUpdate.customer_id,
            // pictures: '',
            attachments: attachments
        })

    };

    // 选择建筑类型列表
    window.selUpdatebuildingType = function(obj, target) {

        var index = /\d+/g.exec(target._currentTarget.getAttribute('id'));
        var build = v.instance.customerUpdate.build_list[index];
        build.build_func_type = obj.code;
    }

    // 选择建筑类型列表
    window.selinsertBuildType = function(obj, target) {

        var index = /\d+/g.exec(target._currentTarget.getAttribute('id'));
        var build = v.instance.insertBuildList[index];
        build.build_func_type = obj.code;
        build.build_func_type_name = obj.name;
    }
})();