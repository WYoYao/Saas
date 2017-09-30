var EquipPublicInfo = function() {
    return {
        "equip_id": "", //设备id,
        "equip_local_id": "", //设备本地编码
        "equip_local_name": "", //设备本地名称
        "BIMID": "", //BIM编码
        "position": "", //安装位置
        "equip_category_name": "", //设备类型名称
        "system_name": "", //所属系统名称
        "length": "", //长
        "width": "", //宽
        "height": "", //高
        "mass": "", //重量
        "material": "", //主体材质
        "dept": "", //所属部门
        "drawing": [ //设备图纸
            // {
            //     "type": "1", //附件类型，1-url，2-附件 {
            //     "name": "",
            //     "url": ""
            // },
        ],
        "picture": [], //设备照片
        "check_report": [ //质检报告
            // { //附件类型，1-url，2-附件 
            //     "type": "1",
            //     "name": "",
            //     "url": ""
            // },
        ],
        "nameplate": [], //铭牌照片
        "archive": [ //设备文档
            // { //附件类型，1-url，2-附件 
            //     "type": "1",
            //     "name": "",
            //     "url": ""
            // }
        ],
        "manufacturer": "", //生产厂家
        "brand": "", //设备品牌
        "product_date": "", //生产日期
        "serial_num": "", //出厂编号
        "specification": "", //设备型号
        "supplier": "", //供应商名称
        "supplier_phone": "", //供应商联系电话
        "supplier_contactor": "", //供应商联系人
        "supplier_web": "", //供应商网址
        "supplier_fax": "", //供应商传真
        "supplier_email": "", //供应商电子邮件
        "contract_id": "", //合同编号
        "asset_id": "", //资产编号
        "purchase_price": "", //采购价格
        "principal": "", //设备负责人
        "maintain_id": "", //维保编码
        "start_date": "", //投产日期
        "maintain_deadline": "", //合同截止日期
        "service_life": 0, //使用寿命
        "warranty": "", //设备保修期
        "maintain_cycle": 0, //保养周期
        "maintainer": "", //维修商单位名称
        "maintainer_phone": "", //维修商联系电话
        "maintainer_contactor": "", //维修商联系人
        "maintainer_web": "", //维修商网址
        "maintainer_fax": "", //维修商传真
        "maintainer_email": "", //维修商电子邮件
        "status": "1", //投产状态，1-投产 ，2-未投产 ，3-其他
        "insurer": "", //保险公司
        "insurer_num": "", //保险单号
        "insurer_contactor": "", //保险联系人
        "insurer_phone": "", //保险联系电话
        "insurance_file": [ //保险文件
            // { //附件类型，1-url，2-附件 
            //     "type": "1",
            //     "name": "",
            //     "url": ""
            // }
        ]
    }
}

var CardInfo = function() {
    return {
        "equip_id": "", //设备id,
        "equip_qr_code": '', //设备二维码图片的key
        "card_info": [ //名片信息项
            { "info_point_code": "", "info_point_name": "", "value": "" },
        ]
    }
}


;
(function() {

    // 保险集合
    var insuranceArr = [{
            el: $("#addid_insurer"),
            type: 1,
            key: 'insurer',
            list: this.insurerList,
            SearchKey: 'company_name',
        },
        {
            el: $("#addid_insurer_num"),
            type: 1,
            key: 'insurer_num',
            list: this.insurer_infos,
            SearchKey: 'insurer_num',
        }
    ];

    // 供应购买集合
    var buyArr = [{
            el: $("#addid_supplier"),
            type: 1,
            key: 'supplier',
            list: this.supplierList,
            SearchKey: 'company_name',
        }, {
            el: $("#addid_contract_id"),
            type: 0,
            key: 'contract_id'
        },
        {
            el: $("#addid_asset_id"),
            type: 0,
            key: 'asset_id'
        },
        {
            el: $("#addid_purchase_price"),
            type: 0,
            key: 'purchase_price'
        }
    ];

    // 厂家集合
    var factoryArr = [{
            el: $("#addid_manufacturer"),
            type: 1,
            key: 'manufacturer',
            list: this.manufacturerList,
            SearchKey: 'company_name',
        },
        {
            el: $("#addid_brand"),
            type: 1,
            key: 'brand',
            list: this.brands,
            SearchKey: 'name',
        },
        {
            el: $("#addid_product_date"),
            type: 4,
            key: 'product_date'
        },
        {
            el: $("#addid_serial_num"),
            type: 0,
            key: 'serial_num'
        },
        {
            el: $("#addid_specification"),
            type: 0,
            key: 'specification'
        }
    ];

    // 运行维保集合
    var maintenanceArr = [{
            el: $("#addid_principal"),
            type: 0,
            key: 'principal'
        },
        {
            el: $("#addid_maintain_id"),
            type: 0,
            key: 'maintain_id'
        },
        {
            el: $("#addid_start_date"),
            type: 4,
            key: 'start_date'
        },
        {
            el: $("#addid_maintain_deadline"),
            type: 4,
            key: 'maintain_deadline'
        },
        {
            el: $("#addid_service_life"),
            type: 0,
            key: 'service_life'
        },
        {
            el: $("#addid_warranty"),
            type: 0,
            key: 'warranty'
        },
        {
            el: $("#addid_maintain_cycle"),
            type: 0,
            key: 'maintain_cycle'
        }, {
            el: $("#addid_maintainer"),
            type: 1,
            key: 'maintainer',
            list: this.maintainerList,
            SearchKey: 'company_name',
        }, {
            el: $("#addid_status"),
            type: 1,
            key: 'status',
            list: this.statusList,
            SearchKey: 'name',
        }
    ];

    // 基础信息集合
    var baseArr = [{
            el: $("#addid_equip_local_name"),
            type: 0,
            key: 'equip_local_name'
        }, //设备名称
        {
            el: $("#addid_equip_local_id"),
            type: 0,
            key: 'equip_local_id'
        }, //设备编码
        {
            el: $("#addid_BIMID"),
            type: 0,
            key: 'BIMID'
        }, //BIM模型中编码
        {
            el: $("#addid_position3").psel() ? $("#addid_position3") : (
                $("#addid_position2").psel() ? $("#addid_position2") : $("#addid_position1")
            ),
            type: 1,
            key: 'position',
            list: $("#addid_position3").psel() ? Build2.content : (
                $("#addid_position2").psel() ? this.Build1.content : this.BuildFloorSpaceTree
            ),
            SearchKey: 'obj_name',
        }, //安装位置
        {
            el: $("#addid_system_name"),
            type: 1,
            key: 'system_name',
            list: this.SystemDomain,
            SearchKey: 'name',
        }, //所属系统
        {
            el: $("#addid_equip_category_name"),
            type: 1,
            key: 'equip_category_name',
            list: this.SystemDomain,
            SearchKey: 'name',
        }, //设备类型
        {
            el: $("#addid_length"),
            type: 0,
            key: 'length'
        }, //长
        {
            el: $("#addid_width"),
            type: 0,
            key: 'width'
        }, //宽
        {
            el: $("#addid_height"),
            type: 0,
            key: 'height'
        }, //高
        {
            el: $("#addid_mass"),
            type: 0,
            key: 'mass'
        }, //重量
        {
            el: $("#addid_material"),
            type: 0,
            key: 'material'
        }, //主体材质
        {
            el: $("#addid_dept"),
            type: 0,
            key: 'dept'
        }, //所属部门
        {
            el: $("#addid_drawing"),
            type: 3,
            key: 'drawing'
        }, //设备图纸
        {
            el: $("#addid_picture"),
            type: 2,
            key: 'picture'
        }, //设备照片
        {
            el: $("#addid_check_report"),
            type: 3,
            key: 'check_report'
        }, //质检报告
        {
            el: $("#addid_nameplate"),
            type: 2,
            key: 'nameplate'
        }, //铭牌照片
        {
            el: $("#addid_archive"),
            type: 3,
            key: 'archive'
        } //设备文档
    ];

    v.pushComponent({
        name: 'equipmentMngDeatil',
        data: {
            equip_id: '', // 设备ID
            EquipInfo: new EquipPublicInfo(),
            CardInfo: new CardInfo(),
            WorkOrderState: [], // 工单状态集合
            WorkOrderCode: '', // 选中的工单状态
            EquipRelWorkOrder: [], // 查询到的工单集合
            SystemDomain: [], // 所属系统
            AllEquipCategory: [], // 设备类型
            // 安装位置开始
            BuildFloorSpaceTree: [], //设备空间树  （安装位置）
            Build1: { // 新建下拉菜单中建筑的选择项
                content: [],
            },
            Build2: { // 新建下拉菜单中楼层的选择项
                content: [],
            },
            // 安装位置结束
            // 生产厂家 开始
            manufacturerList: [], // 生产厂家集合
            brands: [], // 品牌
            // 生产厂家 结束
            // 供应&购买 开始
            supplierList: [], // 供应商列表
            // 供应&购买 结束
            // 维保开始
            maintainerList: [], //维修商 集合
            statusList: [{ name: "投产", code: 1 }, { name: "未投产", code: 2 }, { name: "其他", code: 3 }],
            // 维保结束
            // 保险开始
            insurerList: [], // 保险公司集合
            insurer_infos: [], // 当前保险公司下的保险单号
            // 保险结束
            baseTab: 0, // 当前显示的Tab 选项栏
            view: {
                add: {
                    base: {
                        isSHowAddBlock: false,
                    },
                    factory: {
                        isSHowAddBlock: false,
                    },
                    buy: {
                        isSHowAddBlock: false,
                    },
                    maintenance: {
                        isSHowAddBlock: false,
                    },
                    insurance: {
                        isSHowAddBlock: false,
                    },
                }
            }
        },
        computed: {
            // 部门信息是否未空
            baseIsNull: function() {
                var keys = ['equip_local_name',
                    'BIMID',
                    'position',
                    'equip_category_name',
                    'system_name',
                    'length',
                    'width',
                    'height',
                    'mass',
                    'material',
                    'dept',
                    'drawing',
                    'picture',
                    'check_report',
                    'nameplate',
                    'archive'
                ];

                //返回验证是否全部为空
                return this.fev(this.EquipInfo, keys);

            },
            // 厂家信息是否未空
            factoryIsNull: function() {
                var keys = [
                    "manufacturer",
                    "brand",
                    "product_date",
                    "serial_num",
                    "specification"
                ];

                //返回验证是否全部为空
                return this.fev(this.EquipInfo, keys);
            },
            //供应&购买是否未空
            buyIsNull: function() {
                var keys = [
                    "supplier",
                    "supplier_phone",
                    "supplier_contactor",
                    "supplier_web",
                    "supplier_fax",
                    "supplier_email",
                    "contract_id",
                    "asset_id",
                    "purchase_price"
                ];

                //返回验证是否全部为空
                return this.fev(this.EquipInfo, keys);
            },
            //运行&维保是否未空
            maintenanceIsNull: function() {
                var keys = [
                    "principal",
                    "maintain_id",
                    "start_date",
                    "maintain_deadline",
                    "service_life",
                    "warranty",
                    "maintain_cycle",
                    "maintainer",
                    "maintainer_phone",
                    "maintainer_contactor",
                    "maintainer_web",
                    "maintainer_fax",
                    "maintainer_email",
                    "status"
                ];

                //返回验证是否全部为空
                return this.fev(this.EquipInfo, keys);
            },
            //保险是否未空
            insuranceIsNull: function() {
                var keys = [
                    "insurer",
                    "insurer_num",
                    "insurer_contactor",
                    "insurer_phone",
                    "insurance_file"
                ];

                //返回验证是否全部为空
                return this.fev(this.EquipInfo, keys);
            }
        },
        filters: {

        },
        methods: {
            /**
             * 生成转换上传文件或图片的格式
             * @param {any} type 1 图片 2其他格式的附件 
             */
            pvalConvertAttachments: function(type) {

                /**
                 * 返回生成对应的提交属性的Object
                 *  @param {any} arr 上传组件获取的 Array 数组
                 *  @param {any} key 对应的提交的属性
                 * @param {any} isMore 是否是多文件上传
                 */
                return function(arr, key, isMore) {

                    return arr.map(function(item) {

                        return {
                            path: item.url, //文//件的下载地址， 即网站后台(非java端) 后台返回的下载地址。 必须 *
                            toPro: key, //此文件对应的属性名称 *
                            multiFile: isMore || true, //是否是多附件， 默认true *
                            fileName: item.name, // 文件真实名称 *
                            fileSuffix: item.suffix, //文件后缀,不带点// *
                            isNewFile: (item.isNewFile != void 0) ? item.isNewFile : true, // 是不是新文件， 默认true， 为false时将不进行文件上传 *
                            fileType: type, //文件类型， 1 图片 2 非图片， 暂时只有fm系统会用到； 默认1 /
                        }
                    })
                }
            },
            /**
             * 树状接口通过的属性查询出对应的值
             * 根据传入 key value 值查询对应的树的内容
             */
            filterItemByKeyValue: function(list, key, value) {

                if (!_.isArray(list)) return;

                function fltbyName(con, item) {

                    if (item[key] == value) con = item;

                    return con;

                }

                return list.reduce(fltbyName);

            },
            /**
             * 新增部分 转换为可以提交的参数
             */
            convert2Controller: function(item) {

                var req = {
                    equip_id: this.equip_id,
                    info_point_code: item.key,
                    //                  正常文本    安装位置         所属系统//设备类型
                    info_point_value: item.value || item.obj_name || item.name || item.company_name || item.insurer_num || '',
                };

                return req;
            },
            /**
             * 将对应的每个实例进行转换通过提交
             * {
             *      el: '', // dom Jquery 对象
             *      type: '', // dom 结构类型
             *      key: '', //  对应的key 值
             *      list: [], // 下滑栏菜选择需要查询的list
             *      SearchKey: '', //  下滑栏菜单的查询的查询的时候的需要选择的对应的 key 值
             *  }
             */
            convert2ide: function(item) {
                var el = item.el,
                    type = item.type || 0,
                    key = item.key,
                    list = item.list || [],
                    SearchKey = item.SearchKey || void 0,
                    value,
                    req = {};

                if (type == 0) {
                    // 文本
                    value = el.pval();

                    req = this.convert2Controller({
                        key: key,
                        value: value
                    });

                } else if (type == 1) {

                    // 下拉菜单
                    var obj_name = el.psel().text;

                    var info = this.filterItemByKeyValue(list, SearchKey, obj_name)

                    // key 值需要确定
                    req = this.convert2Controller(Object.assign({}, info, { key: key }));

                } else if (type == 2) {
                    // 图片
                    var attachments = this.pvalConvertAttachments(1)(el.pval(), key);

                    req.attachments = attachments;

                } else if (type == 3) {
                    // 文件
                    var attachments = this.pvalConvertAttachments(1)(el.pval(), key);

                    req.attachments = attachments;
                } else if (type == 4) {
                    // 日期控件
                    value = el.psel().startTime;

                    req = this.convert2Controller({
                        key: key,
                        value: value
                    });
                }

                if (!req.info_point_value && req.attachments && !req.attachments.lenght) {
                    return function() {
                        return new Promise(function(resolve, reject) {
                            resolve();
                        })
                    }
                }

                // 返回 Promise 对象
                return equipmentMngDeatilController.updateEquipInfo.bind(this, req, (type == 2 || type == 3));
            },
            // 新建信息 （**多条新建信息同时发送**）
            someSend: function(arr) {

                var result = [];

                function fn() {
                    if (result.length == arr.length) {

                        if (result.filter(function(str) {
                                return str == 'resolve'
                            }).length == arr.length) {

                            $("#equipmentMngpnotice").pshow({ text: '添加成功', state: "success" });

                        } else {
                            $("#equipmentMngpnotice").pshow({ text: '添加失败', state: "failure" });
                        }
                    }
                }

                arr.map(this.convert2ide).forEach(function(item, index) {

                    return item().then(function() {

                        result.push('resolve');
                        fn()

                    }, function() {

                        result.push('reject');
                        fn()
                    }).catch(function() {

                        result.push('catch');
                    })
                });
            },
            // 添加保险信息
            _clickAddinsurance: function() {

                this.someSend(insuranceArr);
            },
            //添加购买信息
            _clickAddbuy: function() {

                this.someSend(buyArr);
            },
            // 添加厂家信息
            _clickAddfactory: function() {

                this.someSend(factoryArr);
            },
            // 添加运行维保
            _clickAddMaintenance: function() {

                this.someSend(maintenanceArr);
            },
            // 添加基础信息
            _clickAddBase: function() {

                this.someSend(baseArr);
            },
            /**
             * 验证一个实例中的部分属性是否全部为空
             * obj 需要验证的实例
             * keys 需要验证的属性集合
             * return ture 全部为空 return false 全部不为空
             */
            fev: function(obj, keys) {

                for (var index = 0; index < keys.length; index++) {

                    var value = obj[keys[index]];

                    if (_.isString(value) && value.length) {

                        return false;
                        break;
                    } else if (_.isArray(value) && value.length) {

                        return false;
                        break;
                    }

                    return true;

                }
            },
            // 数组的获取对应高度
            covertHeight: function(arr, minh, maxh, sh) {
                // 获取总高度
                var totalHeight = $("#verticalAlxescontentb").height() - 50,
                    len = arr.lenght,
                    ih = 0, //计算后单个高度的距离
                    itemTop = 0;

                // 附加默认值
                minh = minh || 60;
                maxh = maxh || 120;
                sh = sh || 0;

                ih = (totalHeight / len);

                itemTop = ih < minh ? minh : (minh < ih && ih < maxh) ? ih : maxh;

                return arr.map(function(item, index) {

                    item.top = index * itemTop + sh;

                    return item;

                })
            }
        },
        beforeMount: function() {

            var _that = this;

            /**
             * 设备管理-详细页:查询设备名片信息
             */
            equipmentMngDeatilController.queryEquipCardInfo(_that.equip_id)
                .then(function(CardInfo) {
                    _that.CardInfo = CardInfo;
                })


            /**
             * 根据设备ID 查询设备管理-详细页:查询设备通用信息
             */
            equipmentMngDeatilController.queryEquipPublicInfo(_that.equip_id)
                .then(function(info) {
                    // 附加通用信息
                    _that.EquipInfo = info;

                    /**
                     * 根据建筑ID查询所属的位置
                     * 获取安装位置下拉选项
                     */
                    equipmentMngDeatilController.queryBuildFloorSpaceTree(info.build_id)
                        .then(function(list) {

                            //BuildFloorSpaceTree

                            // 转换为可选择的Tree
                            var f = function(item) {
                                var z = arguments.callee;
                                item.issel = true;
                                item.name = item.obj_name;
                                if (_.isArray(item.content)) {
                                    item.content = item.content.map(z);
                                }

                                return item;
                            };

                            _that.BuildFloorSpaceTree = list.map(f);
                        })

                })

            /**
             * 查询工单状态下拉菜单
             */
            equipmentMngDeatilController.queryWorkOrderState()
                .then(function(list) {
                    _that.WorkOrderState = list;

                    //查询完之后默认查询第一个
                    _that.WorkOrderCode = list.length ? list[0].code : '';
                });


            /**
             * 所属系统 下拉菜单
             */
            equipmentMngDeatilController.queryAllEquipCategory()
                .then(function(list) {

                    // 绑定所属系统的下拉菜单 (**需要转换第二级**)
                    _that.SystemDomain = list.reduce(function(con, item) {

                        return con.concat(item.content.map(function(info) {

                            return info;
                        }));
                    }, []);
                });

            /**
             * 生产厂家下拉列表
             */
            equipmentMngDeatilController.queryEquipCompanySel(2)
                .then(function(list) {
                    _that.manufacturerList = list;

                    $("#addid_brand").pdisable(true);
                })

            /**
             * 供应商下拉列表
             */
            equipmentMngDeatilController.queryEquipCompanySel(1)
                .then(function(list) {
                    _that.supplierList = list;
                })

            /**
             * 维修商名称 下拉列表
             */
            equipmentMngDeatilController.queryEquipCompanySel(3)
                .then(function(list) {
                    _that.maintainerList = list;
                })

            /**
             * 保险公司名称 下拉列表
             */
            equipmentMngDeatilController.queryEquipCompanySel(4)
                .then(function(list) {
                    _that.insurerList = list;
                })







            // 选择选项卡
            $("#baseTab").psel(_that.baseTab);


        },
        watch: {
            // 查询设备相关的工单
            WorkOrderCode: function(newVal, oldVal) {

                var _that = this;

                if (newVal != oldVal) {

                    equipmentMngDeatilController.queryEquipRelWorkOrder({

                        order_type: newVal,
                        equip_id: _that.equip_id,
                    }).then(function(list) {

                        _that.EquipRelWorkOrder = list;
                    })
                };
            },
            Build1: function(newVal, oldVal) {
                var _that = this;

                if (newVal != oldVal) {
                    // 清空按钮选项
                    $("#addid_position2").precover();
                    $("#addid_position3").precover();
                    $("#addid_position3").pdisable(true)
                }
            },
            Build2: function(newVal, oldVal) {
                var _that = this;

                if (newVal != oldVal) {
                    $("#addid_position3").precover();
                    $("#addid_position3").pdisable(false)
                }
            },
            brands: function(newVal, oldVal) {
                var _that = this;
                if (newVal != oldVal) {
                    $("#addid_brand").precover();
                    $("#addid_brand").pdisable(false)
                }
            },
            insurer_infos: function(newVal, oldVal) {
                var _that = this;
                if (newVal != oldVal) {
                    $("#addid_insurer_num").precover();
                    $("#addid_insurer_num").pdisable(false)
                }
            }
        },
    })
})();