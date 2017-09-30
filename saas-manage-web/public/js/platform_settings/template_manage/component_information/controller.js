var componentInformationController = {
    getAllComponent: function(cb) {
        // cb(_.range(50).map(function(item, index) {
        //         return {
        //             "cmpt_id": index, //组件id
        //             "cmpt_type": 'base', //组件类型：base、godHand、saas 、app
        //             "cmpt_code": index, //组件编码
        //             "cmpt_name": 'base' + index, //组件名称
        //             "description": 'base描述' + index //描述
        //         };
        //     }).concat(
        //         _.range(50).map(function(item, index) {
        //             return {
        //                 "cmpt_id": index, //组件id
        //                 "cmpt_type": 'godHand', //组件类型：base、godHand、saas 、app
        //                 "cmpt_code": index, //组件编码
        //                 "cmpt_name": 'godHand' + index, //组件名称
        //                 "description": 'godHand描述' + index //描述
        //             };
        //         })
        //     )
        //     .concat(
        //         _.range(50).map(function(item, index) {
        //             return {
        //                 "cmpt_id": index, //组件id
        //                 "cmpt_type": 'saas', //组件类型：base、godHand、saas 、app
        //                 "cmpt_code": index, //组件编码
        //                 "cmpt_name": 'saas' + index, //组件名称
        //                 "description": 'saas描述' + index //描述
        //             };
        //         })
        //     ).concat(
        //         _.range(50).map(function(item, index) {
        //             return {
        //                 "cmpt_id": index, //组件id
        //                 "cmpt_type": 'app', //组件类型：base、godHand、saas 、app
        //                 "cmpt_code": index, //组件编码
        //                 "cmpt_name": 'app' + index, //组件名称
        //                 "description": 'app描述' + index //描述
        //             };
        //         })
        //     ));

        // return;

        pajax.post({
            url: 'restComponentService/queryAllComponent',
            data: {},
            success: function(data) {

                var arr = _.isArray(data.data) ? data.data : [];
                Object.prototype.toString.call(cb).slice(8, -1) == 'Function' ? cb(arr) : void 0;
            }
        });
    },
    addComponent: function(argu, cb) {
        // cb({
        //     "Result": "success",
        //     "ResultMsg": "",
        // });

        // return;

        pajax.post({
            url: 'restComponentService/addComponent',
            data: argu,
            success: function(data) {

                if (Object.keys(data).length) {

                    $("#popNoticeWarn").pshow({ text: "添加失败！", state: "failure" });
                } else {

                    $("#popNoticeWarn").pshow({ text: "添加成功！", state: "success" });

                    Object.prototype.toString.call(cb).slice(8, -1) == 'Function' ? cb({
                        "Result": "success",
                        "ResultMsg": "",
                    }) : void 0;
                }

            }
        });
    }
}