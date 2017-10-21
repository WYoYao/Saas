var equipmentMngList = {
    // 查询建筑体
    queryBuild: function() {

        // return new Promise(function(resolve, reject) {
        //     setTimeout(function() {

        //         resolve(_.range(10).map((item, index) => {
        //             return {
        //                 "obj_id": ++index,
        //                 "obj_name": '名称' + (index),
        //             }
        //         }))

        //     }, 300);
        // })

        return new Promise(function(resolve, reject) {

            pajax.post({
                url: 'restObjectService/queryBuild',
                data: {},
                success: function(data) {

                    resolve(data.data);

                },
                error: function(err) {
                    reject(err);
                },
                complete: function() {},
            });
        })

    },
    // 查询专业
    queryProfession: function() {

        // return new Promise(function(resolve, reject) {

        //     setTimeout(function() {
        //         resolve({
        //             "data": [{
        //                     "code": "AC",
        //                     "name": "空调",
        //                     "description": "--",
        //                     "dict_type": "--"
        //                 },
        //                 {
        //                     "code": "FF",
        //                     "name": "消防",
        //                     "description": "--",
        //                     "dict_type": "--"
        //                 },
        //                 {
        //                     "code": "OT",
        //                     "name": "其他",
        //                     "description": "其他",
        //                     "dict_type": "--"
        //                 },
        //                 {
        //                     "code": "SE",
        //                     "name": "强电",
        //                     "description": "--",
        //                     "dict_type": "--"
        //                 },
        //                 {
        //                     "code": "SP",
        //                     "name": "安防",
        //                     "description": "--",
        //                     "dict_type": "--"
        //                 },
        //                 {
        //                     "code": "WE",
        //                     "name": "弱电",
        //                     "description": "--",
        //                     "dict_type": "--"
        //                 },
        //                 {
        //                     "code": "WS",
        //                     "name": "给排水",
        //                     "description": "--",
        //                     "dict_type": "--"
        //                 }
        //             ]
        //         }.data)
        //     }, 200);

        // })

        return new Promise(function(resolve, reject) {

            pajax.post({
                url: 'restGeneralDictService/queryGeneralDictByKey',
                data: { "dict_type": "domain_require" },
                success: function(data) {

                    resolve(data.data);

                },
                error: function(err) {
                    reject(err);
                },
                complete: function() {},
            });
        })
    },
    // 查询系统专业下所有系统
    querySystemForSystemDomain: function(argu) {

        return new Promise(function(resolve, reject) {

            pajax.post({
                url: 'restObjectService/querySystemForSystemDomain',
                data: argu,
                success: function(data) {

                    resolve(data.data);

                },
                error: function(err) {
                    reject(err);
                },
                complete: function() {},
            });
        })
    },
    // 查询设备统计数量
    queryEquipStatisticCount: function() {

        /**
         * 测试数据后面删除
         */
        // console.log('测试数据后面删除\n')
        // return new Promise(function(resolve) {
        //     setTimeout(function() {
        //         resolve({
        //             "equip_total": parseInt(Math.random() * Math.pow(10, 2)), //设备总数,运行中总数
        //             "new_count": parseInt(Math.random() * Math.pow(10, 3)), //本周新数量，没有则返回0
        //             "repair_count": parseInt(Math.random() * Math.pow(10, 4)), //当前维修中数量，没有则返回0
        //             "maint_count": parseInt(Math.random() * Math.pow(10, 5)), //当前维保中数量，没有则返回0
        //             "going_destroy_count": parseInt(Math.random() * Math.pow(10, 6)) //即将报废数量，没有则返回0
        //         })
        //     }, 100);
        // })
        // console.log('测试数据后面删除\n')


        return new Promise(function(resolve, reject) {

            pajax.post({
                url: 'restEquipService/queryEquipStatisticCount',
                data: {},
                success: function(data) {

                    resolve(data);

                },
                error: function(err) {
                    reject(err);
                },
                complete: function() {},
            });
        })
    },
    //设备管理-首页:查询项目下设备列表
    queryEquipList: function(argu, cb) {


        page = argu.page - 1;

        return new Promise(function(resolve, reject) {


            pajax.post({
                url: 'restEquipService/queryEquipList',
                data: argu,
                success: function(data) {

                    data.data.count=data.count;
                    resolve(data.data);
                },
                error: function() {
                    reject(err);
                },
                complete: function() {
                    $("#systemloading").phide()
                },
            });
        })

    },
    //设备管理-首页:查询维修中设备列表
    queryRepairEquipList: function(argu, cb) {

        page = argu.page - 1;

        return new Promise(function(resolve, reject) {


            pajax.post({
                url: 'restEquipService/queryRepairEquipList',
                data: argu,
                success: function(data) {
                    data.data.count=data.count;
                    resolve(data.data);
                },
                error: function() {
                    reject(err);
                },
                complete: function() {
                    $("#systemloading").phide()
                },
            });
        })

    },
    //设备管理-首页:查询维保中设备列表
    queryMaintEquipList: function(argu, cb) {

        page = argu.page - 1;

        return new Promise(function(resolve, reject) {


            pajax.post({
                url: 'restEquipService/queryMaintEquipList',
                data: argu,
                success: function(data) {
                    data.data.count=data.count;
                    resolve(data.data);
                },
                error: function() {
                    reject(err);
                },
                complete: function() {
                    $("#systemloading").phide()
                },
            });
        })

    },
    //设备管理-首页:查询即将报废设备列表
    queryGoingDestroyEquipList: function(argu, cb) {

        page = argu.page - 1;

        return new Promise(function(resolve, reject) {


            pajax.post({
                url: 'restEquipService/queryGoingDestroyEquipList',
                data: argu,
                success: function(data) {
                    data.data.count=data.count;
                    resolve(data.data);
                },
                error: function() {
                    reject(err);
                },
                complete: function() {
                    $("#systemloading").phide()
                },
            });
        })

    },
    // 设备管理列表四个查询统一入口
    queryEquipEnum: function(type, argu, cb) {
        var _that = this;
        var EnumType = {
            equip_total: _that.queryEquipList,
            repair_count: _that.queryRepairEquipList,
            maint_count: _that.queryMaintEquipList,
            going_destroy_count: _that.queryGoingDestroyEquipList,
        };

        return EnumType[type](argu);
    },
    //设备管理-首页:验证设备是否可以报废
    verifyDestroyEquip: function(equip_id) {

        // return new Promise(function(resolve, reject) {

        //     setTimeout(() => {
        //         resolve({
        //             "can_destroy": !!((+new Date()) % 2),
        //             "remind": "不能报废时的提醒内容", //不能报废时的提醒内容 
        //         })
        //     })

        // })

        return new Promise(function(resolve, reject) {

            pajax.post({
                url: 'restEquipService/verifyDestroyEquip',
                data: {equip_id:equip_id},
                success: function(data) {
                    resolve(data);
                },
                error: function() {
                    reject(err);
                },
                complete: function() {

                },
            });
        })
    },
    //设备管理-首页:报废设备
    destroyEquip: function(equip_id) {

        return new Promise(function(resolve, reject) {

            pajax.post({
                url: 'restEquipService/destroyEquip',
                data:  {equip_id:equip_id},
                success: function(data) {
                    if (!Object.keys(data).length) {
                        v.instance._clickInsertBack();
                        $("#globalnotice").pshow({text:"编辑成功",state:"success"});
                        resolve(data);
                    } else {

                        $("#globalnotice").pshow({text:"编辑失败",state:"failure"});
                        reject(data);

                    }
                },
                error: function() {
                    reject(err);
                },
                complete: function() {

                },
            });
        })
    }
}