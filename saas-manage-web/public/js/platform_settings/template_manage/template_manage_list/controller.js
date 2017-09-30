// 动态模版管理路由控制
var templateManageController = {
    //模板信息-列表页:查询对象类型树
    queryObjectCategoryTree: function(argu, cb) {

        pajax.post({
            url: 'restTemplateService/queryObjectCategoryTree',
            data: argu,
            success: function(res) {
                data = res.data || [];
                if (_.isFunction) {
                    cb(data);
                }
            },
            error: function(errObj) {
                // console.error('queryFuncPointTree err');
            },
            complete: function() {

            }
        });
    },
    // 模板信息-列表页:查询对象模板信息
    queryObjectTemplate: function(argu, cb) {

        // cb(_.range(100).map(function(item, index) {
        //     return {
        //         "info_cmpt_id": ptool.produceId(), //信息点组件id
        //         "info_point_code": ptool.produceId(), //信息点名称
        //         "base_cmpt_code": "原始组件编码", //原始组件编码
        //         "god_hand_cmpt_code": "上帝之手组件编码", //上帝之手组件编码
        //         "god_hand_note": "上帝之手页面标注", //上帝之手页面标注
        //         "saas_cmpt_code": "Saas平台组件编码", //Saas平台组件编码
        //         "saas_note": "Saas平台页面标注", //Saas平台页面标注
        //         "saas_show_flag": index % 3, //Saas平台是否显示，0-不显示、1-显示、2-不显示且不可编辑
        //         "app_cmpt_code": "工单app组件编码", //工单app组件编码
        //         "app_note": "APP工单执行页面标注", //APP工单执行页面标注
        //         "app_show_flag": index % 3, //APP采集是否显示，0-不显示、1-显示、2-不显示且不可编辑
        //     }
        // }));
        // return;

        $("#project_list_loading").pshow();
        pajax.post({
            url: 'restTemplateService/queryObjectTemplate',
            data: argu,
            success: function(res) {
                data = res.data || [];
                if (_.isFunction) {
                    cb(data);
                }
            },
            error: function(errObj) {
                // console.error('queryFuncPointTree err');
            },
            complete: function() {

                $("#project_list_loading").phide();
            }
        });
    },
    updateInfoPointCmptById: function(argu, cb) {


        for (var key in argu) {
            if (argu.hasOwnProperty(key)) {
                var element = argu[key];
                argu[key] = String(element);
            }
        }

        // cb({});
        // return;

        pajax.get({
            url: 'restTemplateService/updateInfoPointCmptById',
            data: argu,
            success: function(res) {

                $("#popNoticeWarn").pshow({ text: "更新成功！", state: "success" });

                // if (Object.keys(data).length) {

                //     $("#popNoticeWarn").pshow({ text: "更新失败！", state: "failure" });
                // } else {

                //     $("#popNoticeWarn").pshow({ text: "更新成功！", state: "success" });

                //     Object.prototype.toString.call(cb).slice(8, -1) == 'Function' ? cb({
                //         "Result": "success",
                //         "ResultMsg": "",
                //     }) : void 0;
                // }
            },
            error: function(errObj) {
                $("#popNoticeWarn").pshow({ text: "更新失败！", state: "failure" });
                // console.error('queryFuncPointTree err');
            },
            complete: function() {

            }
        });
    }
}