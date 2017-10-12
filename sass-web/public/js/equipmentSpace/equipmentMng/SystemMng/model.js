;
(function () {
    v.pushComponent({
        name: 'systemMng',
        data: {
            SystemModel:{},
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
                    info_name: '系统名称'
                },
                {
                    info_code: 'system_local_id',
                    info_name: '系统编码'
                },
                {
                    info_code: 'BIMID',
                    info_name: 'BIMID编码'
                },
                {
                    info_code: 'build_local_name',
                    info_name: '所属建筑'
                },
                {
                    info_code: 'domain_name',
                    info_name: '所属专业'
                },
                {
                    info_code: 'system_category_name',
                    info_name: '所属系统类'
                }
            ],
            PublicInfo: [],
            // 技术信息点
            DynamicInfo: [],
            // 信息点总和
            totalPoints: [{
                info_Points:[{name:1}],
            },{
                info_Points:[{name:1}],
            }],
            insertSystemModel:{
                "user_id":"",                   //员工id-当前操作人id，必须
                "project_id":"",                //所属项目id，必须
                "build_id":"",                  //所属建筑id，必须
                "system_local_id": "",          //系统本地编码
                "system_local_name": "",        //系统本地名称
                "BIMID":"",                     //BIM编码
                "system_category":"",           //系统类型编码
            }
        },
        computed: {

        },
        filters: {

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

                _that.SystemModel=item;

                var querySystemPublicInfo = _that._clickQuerySystem(system_id);

                var querySystemDynamicInfo = _that._clickQuerySystemDynamicInfo(system_id);

                querySystemPublicInfo.then(function (list) {

                    var arr = _that.PublicInfoArr.reduce(function (con, item) {

                        con.push({
                            "info_code": item.info_code, //信息点编码,字段编码            
                            "info_name": item.info_name, //信息点名称  
                            "unit": "", //单位
                            "data_type": "Str", //value值类型
                            "str_value": list[item.info_code], //信息点值
                            "type": 0,
                        })

                        return con;
                    }, []);

                    _that.PublicInfo = {
                        tag: '基础',
                        info_Points: arr,
                    };

                    querySystemDynamicInfo.then(function (list) {

                        _that.DynamicInfo = _that.EquipDynamicInfoCovert(list);

                        _that.totalPoints=_that.PublicInfo.concat(_that.DynamicInfo);
                    });
                });

            },
            _clickSystemWillSubmit:function(event,item){
                var _that = this,
                    submitCb, getPoints,info_point_code,type,info_point_code;

                info_point_code=item.info_point_code;
                
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
                    req.isNewValue = isNewValue;

                    equipmentMngDeatilController.updateSystemInfo(req, (type == 3))
                        .then(function () {
                            
                            // 技术点信息
                            // _that.requeryEquipDynamicInfo();
                        })
                };

                // 显示提交弹窗
                _that.submitTip(event, submitCb, getPoints);





            },
            _clickSystemWillCancel:function(event,item){
                var _that = this;

                var cancelCb = function () {

                    console.log("error");
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
})();