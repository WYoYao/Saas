var equipmentMngDeatilController = {
    //设备管理-详细页:查询设备通用信息
    queryEquipPublicInfo: function(equip_id) {


        return new Promise(function(resolve, reject) {

            setTimeout(function() {
                // 值为空的时候
                resolve(new EquipPublicInfo())

                // 有值的时候
                // resolve({
                //     "equip_id": "设备id", //设备id,
                //     "equip_local_id": "设备本地编码", //设备本地编码
                //     "equip_local_name": "设备本地名称", //设备本地名称
                //     "BIMID": "BIM编码", //BIM编码
                //     "position": "建筑-楼层-空间", //安装位置
                //     "equip_category_name": "设备类型名称", //设备类型名称
                //     "system_name": "所属系统名称", //所属系统名称
                //     "length": "长", //长
                //     "width": "宽", //宽
                //     "height": "高", //高
                //     "mass": "重量", //重量
                //     "material": "主体材质", //主体材质
                //     "dept": "所属部门", //所属部门
                //     "drawing": [ //设备图纸
                //         {
                //             "type": "1",
                //             "name": "",
                //             "url": ""
                //         }, //附件类型，1-url，2-附件 {
                //         {
                //             "type": "1",
                //             "name": "",
                //             "url": ""
                //         },
                //         {
                //             "type": "2",
                //             "name": "",
                //             "key": ""
                //         }
                //     ],
                //     "picture": ['key1', 'key2'], //设备照片
                //     "check_report": [ //质检报告
                //         {
                //             "type": "1",
                //             "name": "",
                //             "url": ""
                //         }, //附件类型，1-url，2-附件 
                //         {
                //             "type": "1",
                //             "name": "",
                //             "url": ""
                //         }, {
                //             "type": "2",
                //             "name": "",
                //             "key": ""
                //         }
                //     ],
                //     "nameplate": ['key1', 'key2'], //铭牌照片
                //     "archive": [ //设备文档
                //         {
                //             "type": "1",
                //             "name": "",
                //             "url": ""
                //         }, //附件类型，1-url，2-附件 
                //         {
                //             "type": "1",
                //             "name": "",
                //             "url": ""
                //         }, {
                //             "type": "2",
                //             "name": "",
                //             "key": ""
                //         }
                //     ],
                //     "manufacturer": "生产厂家", //生产厂家
                //     "brand": "设备品牌", //设备品牌
                //     "product_date": "生产日期", //生产日期
                //     "serial_num": "出厂编号", //出厂编号
                //     "specification": "设备型号", //设备型号
                //     "supplier": "供应商名称", //供应商名称
                //     "supplier_phone": "供应商联系电话", //供应商联系电话
                //     "supplier_contactor": "供应商联系人", //供应商联系人
                //     "supplier_web": "供应商网址", //供应商网址
                //     "supplier_fax": "供应商传真", //供应商传真
                //     "supplier_email": "供应商电子邮件", //供应商电子邮件
                //     "contract_id": "合同编号", //合同编号
                //     "asset_id": "资产编号", //资产编号
                //     "purchase_price": "采购价格", //采购价格
                //     "principal": "设备负责人", //设备负责人
                //     "maintain_id": "维保编码", //维保编码
                //     "start_date": "投产日期", //投产日期
                //     "maintain_deadline": "合同截止日期", //合同截止日期
                //     "service_life": "10", //使用寿命
                //     "warranty": "2", //设备保修期
                //     "maintain_cycle": "20", //保养周期
                //     "maintainer": "维修商单位名称", //维修商单位名称
                //     "maintainer_phone": "维修商联系电话", //维修商联系电话
                //     "maintainer_contactor": "维修商联系人", //维修商联系人
                //     "maintainer_web": "维修商网址", //维修商网址
                //     "maintainer_fax": "维修商传真", //维修商传真
                //     "maintainer_email": "维修商电子邮件", //维修商电子邮件
                //     "status": "1", //投产状态，1-投产 ，2-未投产 ，3-其他
                //     "insurer": "保险公司", //保险公司
                //     "insurer_num": "保险单号", //保险单号
                //     "insurer_contactor": "保险联系人", //保险联系人
                //     "insurer_phone": "保险联系电话", //保险联系电话
                //     "insurance_file": [ //保险文件
                //         {
                //             "type": "1",
                //             "name": "",
                //             "url": ""
                //         }, //附件类型，1-url，2-附件 
                //         {
                //             "type": "1",
                //             "name": "",
                //             "url": ""
                //         }, {
                //             "type": "2",
                //             "name": "",
                //             "key": ""
                //         }
                //     ]
                // })
            }, 200);

        })


        return new Promise(function(resolve, reject) {

            pajax.post({
                url: 'restEquipService/queryEquipPublicInfo',
                data: { equip_id: equip_id },
                success: function(data) {
                    if (!Object.keys(data).length) {
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
    queryEquipCardInfo: function() {


        return new Promise(function(resolve, reject) {

            setTimeout(function() {

                resolve({
                    "equip_id": "equip_id", //设备id,
                    "equip_qr_code": 'http://note.youdao.com/yws/api/personal/file/09650DA734FC4E4CA020C7C1096CC516?method=download&shareKey=afbe47e4d5d9c9db533e34e5c8c7af88', //设备二维码图片的key
                    "card_info": [ //名片信息项
                        { "info_point_code": "1", "info_point_name": "", "value": "低区给水泵" },
                        { "info_point_code": "2", "info_point_name": "设备类型", "value": "液体管道综合仪表" },
                        { "info_point_code": "3", "info_point_name": "设备编码", "value": "YTGDZHYB001" },
                        { "info_point_code": "4", "info_point_name": "设备型号", "value": "mot1LA7130-2aa91-2n03" },
                        { "info_point_code": "5", "info_point_name": "安装位置", "value": "博锐尚格-B座B2层生活水泵房" },
                        // { "info_point_code": "5", "info_point_name": "安装位置", "value": "博锐尚格-B座B2层生活水泵房" },
                    ]
                });

            }, 200)


        })

        return new Promise(function(resolve, reject) {

            pajax.post({
                url: 'restEquipService/queryEquipCardInfo',
                data: { equip_id: equip_id },
                success: function(data) {
                    if (!Object.keys(data).length) {
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
    queryWorkOrderState: function() {


        return new Promise(function(resolve, reject) {

            pajax.post({
                url: 'restGeneralDictService/queryWorkOrderState',
                data: { "dict_type": "work_order_state" },
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

            setTimeout(function() {

                resolve(_.range(50).map((item, index) => {

                    return {
                        "order_id": "工单id" + index, //工单id
                        "summary": "工单概述" + index, //工单概述
                        "order_state": "工单状态编码" + index, //工单状态编码
                        "order_state_name": "工单状态" + index, //工单状态名称
                        "custom_state_name": "工单自定义状态名称" + index, //工单自定义状态名称
                        "participants": "张三,李四,张三,李四,张三,李四", //参与人/操作人，用"，"隔开
                        "publish_time": (new Date()).format('yyyyMMddhhmmss'), //发布时间，yyyyMMddhhmmss
                        "desc_photos": ["key1", "key2"] //描述中的图片
                    }
                }))
            }, 200);

        })


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
                data: { build_id: build_id },
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

        return new Promise(function(resolve) {
            setTimeout(function() {
                resolve();
            }, 200);
        })

        /**
         * argu 接口调用的参数
         * type 请求类型， false 普通提交 true 上传文本
         */
        return new Promise(function(resolve, reject) {

            pajax[type ? 'updateBeforeWithFile' : 'post']({
                url: 'restEquipService/updateEquipInfo',
                data: argu,
                success: function(data) {
                    if (!Object.keys(data).length) {
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
                data: { company_type: new String(type) },
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
    }
}