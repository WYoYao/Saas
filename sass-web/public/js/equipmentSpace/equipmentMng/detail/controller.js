var equipmentMngDeatilController = {
    queryEquipDynamicInfo: function(equip_id) {

        return new Promise(function(resolve, reject) {

            pajax.post({
                url: 'restEquipService/queryEquipDynamicInfo',
                data: {
                    equip_id: equip_id
                },
                success: function(data) {
                    resolve(data.data);
                },
                error: function() {
                    reject(err);
                },
                complete: function() {

                },
            });
        })
    },
    //设备管理-详细页:查询设备通用信息
    queryEquipPublicInfo: function(equip_id) {

        return new Promise(function(resolve, reject) {

            pajax.post({
                url: 'restEquipService/queryEquipPublicInfo',
                data: {
                    equip_id: equip_id
                },
                success: function(data) {
                    if (Object.keys(data).length) {
                        resolve(data);
                    } else {
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

    },
    //设备管理-详细页:查询设备名片信息
    queryEquipCardInfo: function(equip_id) {

        return new Promise(function(resolve, reject) {

            pajax.post({
                url: 'restEquipService/queryEquipCardInfo',
                data: {
                    equip_id: equip_id
                },
                success: function(data) {
                    if (Object.keys(data).length) {
                        resolve(data);
                    } else {
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
    },
    // 查询工单类型
    queryGeneralDictByKey: function() {

        return new Promise(function(resolve, reject) {

            pajax.post({
                url: 'restGeneralDictService/queryGeneralDictByKey',
                data: {
                    "dict_type": "work_order_type"
                },
                success: function(data) {
                    if (data.data) {
                        resolve(data.data);
                    } else {
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
    },
    //设备管理-详细页:查询设备相关的工单
    queryEquipRelWorkOrder: function(argu) {


        return new Promise(function(resolve, reject) {


            pajax.post({
                url: 'restEquipService/queryEquipRelWorkOrder',
                data: argu,
                success: function(data) {
                    if (data.data) {
                        resolve(data.data);
                    } else {
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
    },
    // 对象选择:查询设备实例:查询建筑-楼层-空间列表树 (**安装位置**)
    queryBuildFloorSpaceTree: function(build_id) {

        return new Promise(function(resolve, reject) {

            pajax.post({
                url: 'restObjectService/queryBuildFloorSpaceTree',
                data: {
                    build_id: build_id
                },
                success: function(data) {

                    if (data.data) {
                        resolve(data.data.map(function(item){
                            var obj_id=item.obj_id;

                            item.Parent_obj_id=item.obj_id;

                            item.content=item.content.map(function(info){

                                info.Parent_obj_id=obj_id;

                                info.content=info.content.map(function(x){

                                    x.Parent_obj_id=obj_id;

                                    return x;
                                });

                                return info;
                            });

                            return item;

                        }));
                    } else {
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
    },
    // 对象选择:查询设备实例-系统专业下所有系统 (**所属系统**)
    querySystemForSystemDomain: function() {

        return new Promise(function(resolve, reject) {

            pajax.post({
                url: 'restObjectService/querySystemForSystemDomain',
                data: {},
                success: function(data) {
                    if (data.data) {
                        resolve(data.data);
                    } else {
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
    },
    //设备管理-新增页:查询专业-系统类型-设备类型 (** 所属系统 下拉菜单 **) 第二级
    queryAllEquipCategory: function() {

        return new Promise(function(resolve, reject) {

            pajax.post({
                url: 'restDictService/queryAllEquipCategory',
                data: {},
                success: function(data) {
                    if (data.data) {
                        resolve(data.data);
                    } else {
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
    },
    //设备管理-详细页:编辑设备信息
    updateEquipInfo: function(argu, type) {

        /**
         * argu 接口调用的参数
         * type 请求类型， false 普通提交 true 上传文本
         */
        return new Promise(function(resolve, reject) {

            if(!argu.info_point_value.length && !argu.attachments){
                $("#globalnotice").pshow({text:"编辑值不能为空",state:"failure"});
                return;
            }

            pajax[type ? 'updateWithFile' : 'post']({
                url: 'restEquipService/updateEquipInfo',
                data: argu,
                success: function(data) {
                    $("#globalnotice").pshow({text:"编辑成功",state:"success"});
                    resolve();
                },
                error: function() {
                    $("#globalnotice").pshow({text:"编辑失败",state:"failure"});
                    reject();
                },
                complete: function() {

                },
            });
        })
    },
    //设备管理-新增页:设备通讯录选择：供应商、生产厂家、维修商、保险公司
    queryEquipCompanySel: function(type) {

        /**
         * 1-供应商、2-生产厂家、3-维修商、4-保险公司
         * argu 接口调用的参数
         * type 请求类型， false 普通提交 true 上传文本
         */
        return new Promise(function(resolve, reject) {

            pajax.post({
                url: 'restEquipCompanyService/queryEquipCompanySel',
                data: {
                    company_type: new String(type)
                },
                success: function(data) {
                    if ((data.data).length) {
                        resolve(data.data);
                    } else {
                        reject(data);
                    }
                },
                error: function() {
                    reject();
                },
                complete: function() {

                },
            });
        })

        'restEquipCompanyService/queryEquipCompanySel'
    },
    //设备管理-详细页:查询设备信息点的历史信息
    queryEquipInfoPointHis: function(equip_id, info_point_code, cb) {

        pajax.post({
            url: 'restEquipService/queryEquipInfoPointHis',
            data: {
                equip_id: equip_id,
                info_point_code: info_point_code,
            },
            success: function(data) {

                if (data.data) {

                    cb(data.data.map(function(item) {
                        // 将后台返回的时间字符串格式化为可以实例的时间格式
                        item.date = item.date.replace(/^(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})$/g, function() {
                            var arr = Array.prototype.slice.call(arguments);
                            return arr.slice(1, 4).join('/') + " " + arr.slice(4, 7).join(':');
                        });

                        return item;
                    }))

                }
            },
            error: function() {

            },
            complete: function() {

            },
        });
    }
}