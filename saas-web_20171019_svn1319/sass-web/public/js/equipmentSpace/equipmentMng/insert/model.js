;
(function () {

    //添加设备信息中的文本信息
    var EquipTextArr = {
        "equip_local_name": {
            "isShould": true,
            "name": "设备名称",
            "message": "设备名称不可为空,最多20个字"
        },
        "equip_local_id": {
            "isShould": true,
            "name": "设备编码",
            "message": "设备编码不可为空,最多20个字"
        },
        "BIMID": {
            "isShould": false,
            "name": "BIM模型中编码",
            "message": "BIM模型中编码不可为空,最多20个字"
        },
        "length": {
            "isShould": false,
            "name": "设备长度",
            "message": "设备长度请输入10位以内数字"
        },
        "width": {
            "isShould": false,
            "name": "设备宽度",
            "message": "设备宽度请输入10位以内数字"
        },
        "height": {
            "isShould": false,
            "name": "设备高度",
            "message": "设备高度请输入10位以内数字"
        },
        "mass": {
            "isShould": false,
            "name": "设备重量",
            "message": "设备重量请输入10位以内数字"
        },
        "material": {
            "isShould": false,
            "name": "主要材质",
            "message": "主要材质最多20个字符"
        },
        "dept": {
            "isShould": false,
            "name": "所属部门",
            "message": "所属部门最多20个字符"
        },
        "serial_num": {
            "isShould": false,
            "name": "出厂编号",
            "message": "出厂编号最多50个字符"
        },
        "specification": {
            "isShould": false,
            "name": "设备型号",
            "message": "设备型号最多50个字符"
        },
        "contract_id": {
            "isShould": false,
            "name": "合同编号",
            "message": "合同编号最多50个字符"
        },
        "asset_id": {
            "isShould": false,
            "name": "资产编号",
            "message": "资产编号最多50个字符"
        },
        "purchase_price": {
            "isShould": false,
            "name": "采购价格",
            "message": "采购价格请输入10位以内数字"
        },
        "principal": {
            "isShould": false,
            "name": "设备负责人",
            "message": "设备负责人最多5个字"
        },
        "maintain_id": {
            "isShould": false,
            "name": "维保编码",
            "message": "维保编码最多50个字符"
        },
        "service_life": {
            "isShould": false,
            "name": "使用寿命",
            "message": "使用寿命请输入10位以内整数"
        },
        "warranty": {
            "isShould": false,
            "name": "设备保修期",
            "message": "设备保修期请输入10位以内整数"
        },
        "maintain_cycle": {
            "isShould": false,
            "name": "包养周期",
            "message": "包养周期请输入10位以内整数"
        }
    };

    v.pushComponent({
        name: 'equipmentMngInsert',
        data: {
            // BuildFloorSpaceTree:[], // 安装位置结构树
            attachments: {}, // 上传文件的分类集合
            SystemForBuild: [], //  建筑结构下的系统实例
            insertModel: {}, // 提交的订单资料
            EquipDynamicInfoList: [], // 设备动态信息
            iv: { // 控制树状菜单的显示隐藏
                build_id: false,
                system_id: false,
                equip_category: false,
            },
            // 新建四个维修厂商需要的属性 Start
            tabSelName: "",
            selMerchantToUpdate: {
                "brands": [],
                "insurer_info": [],
                "company_name": "",
                "contacts": "",
                "phone": "",
                "web": "",
                "fax": "",
                "email": ""
            },
            tabSelIndex: 0,
            // 新建四个维修厂商需要的属性 End
            // 新建位置需要的属性 Start
            allRentalCode: [],
            spaceDetail: {},
            allBuild: [],
            spaceFloorArr: [],
            allSpaceCode: [],
            allRentalCode: [],
            // 新建位置需要的属性 End

            ScrollBase: [{
                title: "基础",
                id: 'base',
                isSelected: true,
                top: 60,
            }, {
                title: "厂家",
                id: 'service',
                isSelected: false,
                top: 180,
            }, {
                title: "供应&购买",
                id: 'buy',
                isSelected: false,
                top: 300,
            }, {
                title: "运行&维保",
                id: 'run',
                isSelected: false,
                top: 420,
            }, {
                title: "保险",
                id: 'bao',
                isSelected: false,
                top: 540,
            }],
            ScrollList: [{
                title: "基础",
                id: 'base',
                isSelected: true,
                top: 60,
            }, {
                title: "厂家",
                id: 'service',
                isSelected: false,
                top: 180,
            }, {
                title: "供应&购买",
                id: 'buy',
                isSelected: false,
                top: 300,
            }, {
                title: "运行&维保",
                id: 'run',
                isSelected: false,
                top: 420,
            }, {
                title: "保险",
                id: 'bao',
                isSelected: false,
                top: 540,
            }],
        },
        computed: {
            // ScrollList:function(){
            //     var _that=this;

            //     return _that.ScrollBase.concat(_that.EquipDynamicInfoList.map(function(item,index){
            //         return {
            //             title:item.tag,
            //             id:"tag"+index,
            //             isSelected:false,
            //             top:(_that.ScrollBase.length*120-60)+((index+1)*120),
            //         }
            //     }));
            // }
        },
        filters: {

        },
        methods: {
            // 切换进度轴
            toggleSel: function (item, vkey, el) {
                var _that = this;
                vkey = vkey || "ScrollList",
                    el = el || "SrcollInsert_";

                // 滚动内容
                document.getElementById(el + item.id).scrollIntoView();

                // 改变高亮
                _that[vkey] = _that[vkey].map(function (info) {

                    info.isSelected = info.id == item.id;

                    return info;
                });

            },
            //保存添加系统
            _clickInsertSystemLayer:function(){
                this._clickInsertSystem();
                $("#float_system").phide();
            },
            // 隐藏添加系统
            _clickInsertLayerCancelSystem:function(){
                $("#float_system").phide();
            },
            //隐藏四个服务厂商
            _clickInsertLayerCancel: function () {
                var _that = this;
                if (_that.tabSelIndex > -1) {
                    $("#eqaddressfloat").phide();
                    _that.tabSelIndex = -1;
                }
            },
            // 展示四个服务厂商 提交
            _clickInsertLayerSubmit: function () {
                var _that = this;
                equipmentLogic.saveMerchant(null, function () {
                    _that._clickInsertLayerCancel();
                });
            },
            // 展示四个服务厂商
            showInsertLayerByService: function (item) {

                var _that = this,
                    type = item.type;

                _that.tabSelName = item.name;
                _that.tabSelIndex = type - 1;
                // 初始化调用
                equipmentLogic.newMerchantEvent();
                $("#eqaddressfloat").pshow({
                    title: item.title
                });
            },
            // 添加新建空间
            _clickInsertLayerSubmitByPostion: function () {
                saveAddSpace();

                $("#equipmentMngpnotice").pshow({
                    text: '添加成功',
                    state: "success"
                });

                this._clickInsertLayerCancelByPostion();
            },
            // 取消添加新建空间
            _clickInsertLayerCancelByPostion: function () {
                $("#float_postion").phide();
            },
            // 展示展示新建位置
            showInsertLayerByPostion: function (item) {

                addSpaceShow(null, this);
                $("#float_postion").pshow({
                    title: item.title
                });
            },
            // 展示展示新建位置
            showInsertLayerBySystem: function (item) {

                v.initPage("addSystem");

                $("#float_system").pshow({
                    title: item.title
                });
            },
            // 新建位置
            _ClickAddBlock: function (name) {

                var Enum = {
                    postion: { // 位置
                        title: '添加新位置',
                        type: 5,
                    },
                    system: { // 系统
                        title: '添加新系统',
                        type: 6,
                    },
                    factory: { // 厂家
                        title: '添加新厂家',
                        type: 2,
                        name: '生产厂家'
                    },
                    brand: { // 品牌
                        title: '添加新品牌',

                    },
                    buy: { // 供应商
                        title: '添加新供应商',
                        type: 1,
                        name: '供应商'
                    },
                    service: { // 维修商
                        title: '添加新维修商',
                        type: 3,
                        name: '维修商'
                    },
                    insurance: { // 保险公司
                        title: '添加新保险公司',
                        type: 4,
                        name: '保险公司'
                    },
                    Insurance_num: { // 保险单号
                        title: '添加新保险单号'
                    }

                };

                var item = Enum[name];

                if (item.type <= 4) {
                    this.showInsertLayerByService(item);
                } else if (item.type == 5) {
                    this.showInsertLayerByPostion(item);
                } else if (item.type == 6) {
                    this.showInsertLayerBySystem(item);
                }

            },
            // 查询设备动态信息
            queryEquipDynamicInfoForAdd: function (equip_category) {
                var _that = this;
                controllerInsert.queryEquipDynamicInfoForAdd(equip_category)
                    .then(function (list) {

                        _that.EquipDynamicInfoList = _that.EquipDynamicInfoCovert(list);
                    })
            },
            // 查询技术信息
            getEquipDynamicInfo: function (vkey, el) {

                var _that = this;
                res = {},
                    list = _that[vkey];
                // tag 循环
                return list.reduce(function (con, item) {
                    // points 循环
                    return item.info_Points.reduce(function (con, info) {


                        if ((info.type == 0 || info.type == 4) && info.str_value.length) {

                            con[info.info_code] = info.str_value;

                        } else if (info.type == 1) {

                            var text = getEquipDynamicInfoBykey(el, info.info_code, 1, info);
                            if (text) con[info.info_code] = text;

                        } else if (info.type == 2) {

                            var arr = info.cmpt_data
                                .filter(function (x) {
                                    return x.isChecked;
                                }).map(function (x) {
                                    return x.code;
                                });

                            if (arr.length) con[info.info_code] = arr;

                        } else if (info.type == 3) {

                            var attachments = getEquipDynamicInfoBykey(el, info.info_code, 4, info);

                            con.attachments = con.attachments || [];
                            con.attachments = con.attachments.concat(attachments);
                        }

                        return con;

                    }, con)
                }, {});

            },
            // 保存设备
            _SubmitEquip: function () {
                var _that = this;

                var textNameArr = Object.keys(EquipTextArr);

                // 返回全部的Jquery 对象
                var elArr = textNameArr.map(function (key) {

                    return $("#insert_" + key);
                });

                // 验证所有的文本控件的验证是否通过
                for (var index = 0; index < elArr.length; index++) {
                    var element = elArr[index];
                    var itemByEnum = EquipTextArr[textNameArr[index]];


                    if (itemByEnum.isShould && !element.pverifi()) {

                        // 必填字段验证不通过
                        $("#equipmentMngpnotice").pshow({
                            text: itemByEnum.message,
                            state: "failure"
                        });

                        return;
                    } else if (!element.pverifi() && (element.pval()).length && !itemByEnum.isShould) {

                        // 非必填字段 已填写格式错误 不通过
                        $("#equipmentMngpnotice").pshow({
                            text: itemByEnum.message,
                            state: "failure"
                        });

                        return;
                    }

                };


                var textReq = elArr.reduce(function (con, item, index) {

                    con[textNameArr[index]] = item.pval();

                    return con;
                }, {});


                var uploadReq = Object.keys(_that.attachments)
                    .reduce(function (con, key, index) {

                        return con.concat(_that.attachments[key]);
                    }, []);
                uploadReq = {
                    attachments: uploadReq
                };

                var request = Object.assign({}, textReq, uploadReq, _that.insertModel);


                var EquipDynamicInfo = _that.getEquipDynamicInfo("EquipDynamicInfoList", "#EDI");

                // 合并技术参数和基本参数的上传附件
                if (EquipDynamicInfo.attachments && EquipDynamicInfo.attachments.length) {
                    request.attachments = request.attachments || [];

                    request.attachments = request.attachments.concat(EquipDynamicInfo.attachments);

                };

                request = Object.assign({}, EquipDynamicInfo, request);

                controllerInsert.addEquip(request)
                    .then(function () {
                        $("#equipmentMngpnotice").pshow({
                            text: '添加成功',
                            state: "success"
                        });

                        v.initPage("equipmentMng");
                        _that.onPage="list";
                    });
            },
        },
        beforeMount: function () {
            var _that = this;

            // 查询安装位置
            equipmentMngDeatilController.queryBuildFloorSpaceTree()
                .then(function (list) {

                    _that.BuildFloorSpaceTree = list;
                });

            // 查询所属系统
            equipmentMngDeatilController.queryAllEquipCategory()
                .then(function (list) {

                    _that.SystemDomain = list;
                });

            // 获取所有设备
            equipmentMngDeatilController.queryAllEquipCategory()
                .then(function (list) {

                    function disable(item) {
                        var disable = arguments.callee;

                        if (_.isArray(item.content)) {
                            item.disabled = true;
                            item.content = item.content.map(disable);
                        } else {
                            item.disabled = false;
                        }

                        return item;
                    }

                    _that.AllEquipCategory = list.map(disable);
                })

            /**
             * 生产厂家下拉列表
             */
            equipmentMngDeatilController.queryEquipCompanySel(2)
                .then(function (list) {
                    _that.manufacturerList = list.map(function (item) {
                        item.name = item.company_name;
                        item.code = item.company_id;

                        return item;
                    });
                });

            /**
             * 供应商下拉列表
             */
            equipmentMngDeatilController.queryEquipCompanySel(1)
                .then(function (list) {
                    _that.supplierList = list.map(function (item) {
                        item.name = item.company_name;
                        item.code = item.company_id;

                        return item;
                    });
                });

            /**
             * 维修商名称 下拉列表
             */
            equipmentMngDeatilController.queryEquipCompanySel(3)
                .then(function (list) {
                    _that.maintainerList = list.map(function (item) {
                        item.name = item.company_name;
                        item.code = item.company_id;

                        return item;
                    });
                });

            /**
             * 保险公司名称 下拉列表
             */
            equipmentMngDeatilController.queryEquipCompanySel(4)
                .then(function (list) {
                    _that.insurerList = list.map(function (item) {
                        item.name = item.company_name;
                        item.code = item.company_id;

                        return item;
                    });
                });

            $("#insert_" + 'brand').pdisable(true);
            $("#insert_" + 'insurer_num').pdisable(true);

            // 添加四厂需要的调用的事件
            window.equipmentAddressModal = _that;
            // 添加空间需要调用的事件
            spceBindClick();


        },
        watch: {
            EquipDynamicInfoList: function (newValue) {
                var _that = this;
                _that.ScrollList = _that.ScrollBase.concat(newValue.map(function (item, index) {
                    return {
                        title: item.tag,
                        id: "tag" + index,
                        isSelected: false,
                        top: (_that.ScrollBase.length * 120 - 60) + ((index + 1) * 120),
                    }
                }));
            },
            insertModel: function (newValue, oldValue) {

                var _that = this;

                if (newValue.build_id != oldValue.build_id) {


                    var build_id=_that.BuildFloorSpaceTree.reduce(function(build_id,item){

                        var callee=arguments.callee;

                        if(build_id)return build_id;

                        if(item.obj_id==newValue.build_id){

                            return item.Parent_obj_id;
                        };

                        if(_.isArray(item.content)){

                            return item.content.reduce(callee,build_id);

                        }


                    },'');

                    // 当 build_id 修改的之后修改的对应的 系统属性的选择的下拉数据源
                    controllerInsert.querySystemForBuild(build_id)
                        .then(function (list) {
                            _that.SystemForBuild = list;
                        })
                };

            },
            EquipInfoBak: function (newValue, oldValue) {

                var _that = this;

                if (newValue.build_id != oldValue.build_id) {
                    // 当 build_id 修改的之后修改的对应的 系统属性的选择的下拉数据源

                    // 初始化没有值的时候，执行查询对应的值
                    if(newValue.build_id=="--" || !newValue.build_id.length)return;

                    controllerInsert.querySystemForBuild(newValue.build_id)
                        .then(function (list) {
                            _that.SystemForBuild = list;
                        })
                };

            }
        },
    })
})();