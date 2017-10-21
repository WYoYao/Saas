;
(function () {
    v.pushComponent({
        name: 'systemMng',
        data: {
            PublicInfoBaseInfo: {}, // 查询的基础数据
            SystemModel: {},
            majorTypeArr: [{
                code: null,
                name: "全部",
                content: []
            }], //专业列表
            systemTypeArr: [{
                code: null,
                name: "全部",
            }], //系统列表
            buildSystemTree: [],
            systemMngCurrentSelector: {
                domain: '',
                system_category: ''
            },
            // 基础信息点
            PublicInfoArr: [{
                    info_code: 'system_local_name',
                    info_name: '系统名称',
                    type: 0,
                },
                {
                    info_code: 'system_local_id',
                    info_name: '系统编码',
                    type: 0,
                },
                {
                    info_code: 'BIMID',
                    info_name: 'BIMID编码',
                    type: 0,
                },
                {
                    info_code: 'build_local_name',
                    info_name: '所属建筑',
                    type: 1,
                },
                {
                    info_code: 'domain_name',
                    info_name: '所属专业',
                    type: 1,
                },
                {
                    info_code: 'system_category_name',
                    info_name: '所属系统类',
                    type: 1,
                }
            ],
            PublicInfo: [],
            // 技术信息点
            DynamicInfo: [],
            // 信息点总和
            totalPoints: [],
            insertSystemModel: {
                "user_id": "", //员工id-当前操作人id，必须
                "project_id": "", //所属项目id，必须
                "build_id": "", //所属建筑id，必须
                "system_local_id": "", //系统本地编码
                "system_local_name": "", //系统本地名称
                "BIMID": "", //BIM编码
                "system_category": "", //系统类型编码
            },
        },
        computed: {

        },
        filters: {
            filterStrValue: function (value) {

                return _.isPlainObject(value) ? value.name : value;
            }
        },
        methods: {
            // 查询建筑结构树
            queryBuildSystem: function (value) {
                var _that = this;
                controllerAddSystem.queryBuildSystemTree(value || _that.systemMngCurrentSelector, function (list) {

                    _that.buildSystemTree = list;
                });
            },
            _clickQuerySystem: function (system_id) {

                return controllerAddSystem.querySystemPublicInfo(system_id)

            },
            _clickQuerySystemDynamicInfo: function (system_id) {

                return controllerAddSystem.querySystemDynamicInfo(system_id)
            },
            queryPoints: function (item) {

                var _that = this;
                var system_id = item.system_id;

                _that.SystemModel = item;

                var querySystemPublicInfo = _that._clickQuerySystem(system_id);

                var querySystemDynamicInfo = _that._clickQuerySystemDynamicInfo(system_id);

                querySystemPublicInfo.then(function (list) {

                    _that.PublicInfoBaseInfo = list;

                    var arr = _that.PublicInfoArr.reduce(function (con, item) {

                        var obj = {
                            "info_code": item.info_code, //信息点编码,字段编码            
                            "info_name": item.info_name, //信息点名称  
                            "unit": "", //单位
                            "data_type": "Str", //value值类型
                            "str_value": list[item.info_code], //信息点值
                            "type": item.type,
                        };

                        // 是下拉菜单
                        if (item.type == 1) {
                            obj.cmpt_data = _that.getcmpt_dataByKey(item.info_code);
                        }

                        con.push(obj);

                        return con;
                    }, []);

                    _that.PublicInfo = {
                        tag: '基础',
                        info_Points: arr,
                    };

                    querySystemDynamicInfo.then(function (list) {

                        _that.DynamicInfo = _that.EquipDynamicInfoCovert(list);

                        _that.totalPoints = [_that.PublicInfo].concat(_that.DynamicInfo);
                    });
                });

            },
            getcmpt_dataByKey: function (key) {
                var _that = this;
                var Enum = {
                    build_local_name: _that.buildSystemTree.map(function (item) {
                        return {
                            code: item.build_id,
                            name: item.build_name,
                        }
                    }),
                    domain_name: _that.majorTypeArr.filter(function (item) {
                        // 查询对应的系统专业
                        // 过滤全部
                        return !!item.code;

                    }).map(function (item) {
                        return {
                            code: item.code,
                            name: item.name,
                            content: item.content,
                        }
                    }),
                    system_category_name: _that.majorTypeArr.reduce(function (con, item) {

                        // 查询对应的系统的类型
                        if (_that.PublicInfoBaseInfo.domain_name == item.name) {
                            con = item.content;
                        }

                        return con;
                    }, []),
                }

            },
            _clickSystemWillSubmit: function (event, item) {
                var _that = this,
                    submitCb, getPoints, info_point_code, type, info_point_code;

                info_point_code = item.info_code;

                getPoints = controllerAddSystem.querySystemInfoPointHis.bind(null, _that.SystemModel.system_id, info_point_code);

                type = item.type;

                var req = {
                    "system_id": _that.SystemModel.system_id,
                    "info_point_code": info_point_code, //修改的信息点编码，必须
                    "info_point_value": "", //修改的信息点的值，必须
                    "valid_time": "",
                };

                // 文本信息获取
                if (type == 0 || type == 4) {

                    req.info_point_value = item.str_value;
                } else if (type == 1) {

                    req.info_point_value = getEquipDynamicInfoBykey("#cbx_Points_id_", info_point_code, 1, item);
                } else if (type == 2) {

                    req.info_point_value = item.cmpt_data
                        .filter(function (x) {
                            return x.isChecked;
                        }).map(function (x) {
                            return x.code;
                        });
                } else if (info.type == 3) {

                    var attachments = getEquipDynamicInfoBykey("#cbx_Points_id_", info_point_code, 4, info);
                    req.attachments = attachments;
                }

                // 成功回调
                submitCb = function (isNewValue) {
                    req.valid_time = isNewValue.isNewValue;

                    controllerAddSystem.updateSystemInfo(req, (type == 3))
                        .then(function () {
                            _that.queryPoints(_that.SystemModel);
                            $('#globalnotice').pshow({
                                text: '保存成功',
                                state: 'success'
                            });

                            $(".editShow").hide();

                            $(".addSystemCont .rightCont .detailFloat .detailItem .contShow").show();
                            // 技术点信息
                            // _that.requeryEquipDynamicInfo();
                        }, function () {
                            _that.queryPoints(_that.SystemModel);
                            $('#globalnotice').pshow({
                                text: '保存失败',
                                state: 'failure'
                            });
                        })
                };

                // 显示提交弹窗
                _that.submitTip(event, submitCb, getPoints);

            },
            _clickSystemWillCancel: function (event, item) {
                var _that = this;

                var cancelCb = function () {

                    _that.queryPoints(_that.SystemModel);

                    $(".editShow").hide();

                    $(".addSystemCont .rightCont .detailFloat .detailItem .contShow").show();
                    // _that.EquipDynamicInfoBak = JSON.parse(JSON.stringify(_that.EquipDynamicInfo));
                };

                // 显示取消弹窗
                _that.cancelTip(event, cancelCb);
            }
        },
        watch: {
            systemMngCurrentSelector: function (newValue, oldValue) {
                var _that = this;

                for (var key in newValue) {
                    if (newValue.hasOwnProperty(key)) {
                        var newElement = newValue[key];
                        var oldElement = oldValue[key];

                        if (newElement != oldElement) {
                            // 检查到查询值不同的时候重新查询列表中的值
                            setTimeout(function () {

                                _that.queryBuildSystem(newValue);
                            }, 0);

                            break;
                        }
                    }
                }
            }
        },
        beforeMount: function () {
            var _that = this;

            //绑定专业信息
            controllerAddSystem.queryAllEquipCategory(function (list) {
                _that.majorTypeArr = list;
            });

            _that.queryBuildSystem();
        }
    })


    v.pushComponent({
        name: 'addSystem',
        data: {

            SystemPoints: [], // 动态信息列表
            SystemScrollBase: [{
                title: "基础",
                id: 'base',
                isSelected: true,
                top: 60,
            }],
            SystemScrollList: [{
                title: "基础",
                id: 'base',
                isSelected: true,
                top: 60,
            }],
            InsertSystemBuildArray: [], // 建筑列表
            InsertSystemAllEquipCategory: [], // 专业类表
            InsertSystemModel: {
                "build_id": "", //所属建筑id，必须
                "system_local_id": "", //系统本地编码
                "system_local_name": "", //系统本地名称
                "BIMID": "", //BIM编码
                "system_category": "", //系统类型编码   
                EList: [] // 设备类型集合           
            },
        },
        computed: {

        },
        filters: {

        },
        methods: {

            _clickInsertSystem: function () {
                var _that = this;

                // 基础数据
                var removeKeys = ['build_id',
                    'system_local_id',
                    'system_local_name',
                    'BIMID',
                    'system_category'
                ];
                var base = removeKeys.reduce(function (con, key) {
                    con[key] = _that.InsertSystemModel[key];
                    return con;
                }, {});

                console.log(base);

                // 动态数据
                var res = _that.getEquipDynamicInfo("SystemPoints", "#cbx_Points_id_");

                var req = Object.assign({}, res, base);

                controllerAddSystem.addSystem(req).then(function () {
                    hideAddSystem();
                })
            },
            querySystemDynamicInfoForAdd: function (system_category) {

                var _that = this;
                /**
                 * 获取创建系统需要的动态信息
                 */
                controllerAddSystem.querySystemDynamicInfoForAdd(system_category).then(function (list) {
                    _that.SystemPoints = _that.EquipDynamicInfoCovert(list);;
                })
            }
        },
        watch: {
            InsertSystemModel: function (n, o) {

                var _that = this;
                // 设备编码被修改
                if (n.system_category != o.system_category) {

                    _that.querySystemDynamicInfoForAdd(n.system_category);
                }
            },
            SystemPoints: function (newValue) {
                var _that = this;
                _that.SystemScrollList = _that.SystemScrollBase.concat(newValue.map(function (item, index) {
                    return {
                        title: item.tag,
                        id: "tag" + index,
                        isSelected: false,
                        top: (_that.SystemScrollBase.length * 120 - 60) + ((index + 1) * 120),
                    }
                }));
            }
        },
        beforeMount: function () {
            var _that = this;

            // 获取两个编辑的下拉框编辑时候的内容
            /**
             * 获取建筑列表
             */
            controllerAddSystem.queryBuild().then(function (list) {
                _that.InsertSystemBuildArray = list;
            });

            /**
             * 绑定所属专业类型
             */
            controllerAddSystem.queryAllEquipCategoryPro().then(function (list) {
                _that.InsertSystemAllEquipCategory = list;
            });
        }
    })
})();




$(function () {
    $(".addSystemCont .rightCont").scroll(function () {
        v.instance.layer.hide();
        v.instance.layer.cancelCb();
    })
})