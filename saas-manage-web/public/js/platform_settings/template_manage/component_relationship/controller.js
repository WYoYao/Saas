// 所有组件关系列表
var componentRelationshipController = {
    // 查询所有不同的组件关系
    getAllComponentRel: function(cb) {
        // cb(_.range(100).map(function(item, index) {
        //     return {
        //         "cmpt_relation_id": index, //组件关系id
        //         "base_cmpt_code": index, //原始组件编码
        //         "god_hand_cmpt_code": index, //上帝之手组件编码
        //         "saas_cmpt_code": index, //Saas平台组件编码
        //         "app_cmpt_code": index, //工单app组件编码
        //     };
        // }));

        // return;

        pajax.post({
            url: 'restComponentService/queryAllComponentRel',
            data: {},
            success: function(data) {
                arr = _.isArray(data.data) ? data.data : [];
                Object.prototype.toString.call(cb).slice(8, -1) == 'Function' ? cb(arr) : void 0;
            }
        });
    },
    //动态模板管理：组件对应关系-编辑页:分组查询组件列表，用于组件的列表选择
    ComponentGroupByType: function(cb) {

        // cb({
        //     base: _.range(100).map(function(item, index) {
        //         return {
        //             "cmpt_code": index, //组件编码
        //             "cmpt_name": 'base组件名称' + index, //组件名称 
        //         };
        //     }),
        //     godHand: _.range(100).map(function(item, index) {
        //         return {
        //             "cmpt_code": index, //组件编码
        //             "cmpt_name": 'godHand组件名称' + index, //组件名称 
        //         };
        //     }),
        //     saas: _.range(100).map(function(item, index) {
        //         return {
        //             "cmpt_code": index, //组件编码
        //             "cmpt_name": 'saas组件名称' + index, //组件名称 
        //         };
        //     }),
        //     app: _.range(100).map(function(item, index) {
        //         return {
        //             "cmpt_code": index, //组件编码
        //             "cmpt_name": 'app组件名称' + index, //组件名称 
        //         };
        //     })
        // });

        // return;

        pajax.post({
            url: 'restComponentService/queryComponentGroupByType',
            data: {},
            success: function(data) {

                Object.prototype.toString.call(cb).slice(8, -1) == 'Function' ? cb(data) : void 0;
            }
        });
    },

    updateComponentRelById: function(argu, cb) {

        // cb({ Result: "success" })

        // return;
        pajax.post({
            url: 'restComponentService/updateComponentRelById',
            data: argu,
            success: function(data) {

                if (Object.keys(data).length) {

                    $("#popNoticeWarn").pshow({ text: "更新失败！", state: "failure" });
                } else {

                    $("#popNoticeWarn").pshow({ text: "更新成功！", state: "success" });

                    Object.prototype.toString.call(cb).slice(8, -1) == 'Function' ? cb({
                        "Result": "success",
                        "ResultMsg": "",
                    }) : void 0;
                }

            }
        });
    }

}