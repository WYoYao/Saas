;
(function() {
    /*页面model*/
    function projectManageInsertModel() {}

    // 项目状态枚举
    var projectEnum = {
        // 状态枚举
        status: {
            1: '创建中',
            2: '正常',
            3: '被锁定',
        },
        colors: {
            1: 'creating',
            2: 'normal',
            3: 'lock',
        }
    }


    // 单个项目类
    projectManageInsertModel.Customer = function() {

        return {
            "customer_id": "", //客户id
            "company_name": "", //公司名称 ,必须
            "legal_person": "", //公司法人
            "account": "", //账号
            "mail": "", //公司邮箱
            "contact_person": "", //联系人
            "contact_phone": "", //联系人电话
            "operation_valid_term_start": "", //公司经营有效期限开始日期，YYYY-MM-DD
            "operation_valid_term_end": "", //公司经营有效期限结束日期，YYYY-MM-DD
            "contract_valid_term_start": "", //托管合同有效期限开始日期，YYYY-MM-DD
            "contract_valid_term_end": "", //托管合同有效期限结束日期，YYYY-MM-DD
            "business_license": "", //营业执照，图片的key
            "pictures": [], //产权证/托管合同，图片key的数组
            "tool_type": "", //工具类型,Web，Revit
            "project_id": "", //项目id/项目编码
            "project_name": "", //项目名称
            "project_local_name": "", //项目本地名称
            "province": "", //省编码
            "city": "", //市编码
            "district": "", //市内编码
            "province_city_name": "", //省市区域名称
            "climate_zone": "", //气候区编码
            "climate_zone_name": "", //气候区名称
            "urban_devp_lev": "", //城市发展水平编码
            "urban_devp_lev_name": "", //城市发展水平名称
            "longitude": "", //经度
            "latitude": "", //维度
            "altitude": "", //海拔
            "note": "", //备注
            "create_time": "", //创建时间，yyyy-MM-dd HH:mm:ss
            "build_list": [ //建筑数组
                // {
                //     "build_id": "", //建筑id
                //     "build_code": "", //建筑编码
                //     "build_name": "", //建筑名称
                //     "build_local_name": "", //建筑本地名称
                //     "build_age": "", //建筑年代
                //     "build_func_type": "", //建筑功能类型编码
                //     "build_func_type_name": "", //建筑功能类型名称
                //     "create_time": "2017-06-20 09:30:00" //创建时间，yyyy-MM-dd HH:mm:ss
                // },
            ]
        }
    };

    // 建筑类
    projectManageInsertModel.Build = function() {
        return {
            "build_id": "", //建筑id
            "build_code": "", //建筑编码
            "build_name": "", //建筑名称
            "build_local_name": "", //建筑本地名称
            "build_age": "", //建筑年代
            "build_func_type": "", //建筑功能类型编码
            "build_func_type_name": "", //建筑功能类型名称
            "create_time": "" //创建时间，yyyy-MM-dd HH:mm:ss
        }
    }


    v.pushComponent({
        name: 'prokestInsert',
        el: '#project_manage_insert',
        data: {
            Customer: new projectManageInsertModel.Customer(),
            provinceList: [],
            cityList: [],
            countyList: [],
            areaCodeList: [],
            climateList: [],
            developLevelList: [],
            buildingTypeList: [],
        },
        // 组件加载之前加载数据
        beforeMount: function() {

            // $("#projectInsertLoading").pshow();

            var _that = this;

            // 获取城市相关对象
            var regionCode = projectManageListModel.regionCode();
            // 绑定相关的选项
            regionCode.then(function(res) {

                // 获取气候区列表
                _that.climateList = res.getClimateOrDevelopLevel(true);
                // 获取发展水平列表
                _that.developLevelList = res.getClimateOrDevelopLevel(false);
                // 绑定列表
                _that.provinceList = res.getProvince();
                // 绑定建筑类型列表
                _that.buildingTypeList = res.getBuildingType();

            })

            if (v.instance.Customer.customer_id) {


                var getCustomer = new Promise(function(resolve) {

                    var customer_id = v.instance.Customer.customer_id;

                    projectManageInsert.getCustomerById(customer_id, function(info) {

                        _that.Customer = info;

                        resolve(info);
                    })
                });

                /**
                 * 绑定证书等图片控件
                 */
                getCustomer.then(function(info) {

                    $("#businessImg").precover();
                    $("#picturesImg").precover();

                    if (info.business_license.length) {
                        $("#businessImg").pval([{ name: 'isOld', url: info.business_license }]);
                    }

                    if (_.isArray(info.pictures) && info.pictures.length) {
                        $("#picturesImg").pval(info.pictures.map(function(str) {
                            return {
                                name: 'isOld',
                                url: str,
                            };
                        }));
                    }
                })

                /**
                 * 绑定日历控件
                 */
                getCustomer.then(function() {

                    // 绑定日历对应时间
                    $("#operationDate").psel({
                        startTime: /^\d{4}\-\d{1,2}-\d{1,2}$/g.test(v.instance.Customer.operation_valid_term_start) ? new Date(v.instance.Customer.operation_valid_term_start) : new Date(),
                        endTime: /^\d{4}\-\d{1,2}-\d{1,2}$/g.test(v.instance.Customer.operation_valid_term_end) ? new Date(v.instance.Customer.operation_valid_term_end) : new Date()
                    })

                    $("#contractDate").psel({
                        startTime: /^\d{4}\-\d{1,2}-\d{1,2}$/g.test(v.instance.Customer.contract_valid_term_start) ? new Date(v.instance.Customer.contract_valid_term_start) : new Date(),
                        endTime: /^\d{4}\-\d{1,2}-\d{1,2}$/g.test(v.instance.Customer.contract_valid_term_end) ? new Date(v.instance.Customer.contract_valid_term_end) : new Date()
                    })

                })

                /**
                 * 绑定各个建筑类型
                 */
                getCustomer.then(function() {

                    /**
                     * 绑定各个建筑类型
                     */
                    if (_.isArray(_that.Customer.build_list) && _that.Customer.build_list.length) {

                        _that.Customer.build_list.forEach(function(item, index) {

                            if (!item.build_func_type) {
                                $("#developLevelId" + index).precover();
                            }

                            var i = queryIndexByKey(v.instance.buildingTypeList, { code: item.build_func_type });
                            if (i >= 0) {
                                $("#developLevelId" + index).psel(i);
                                return;
                            }

                        }, this);
                    }

                })

                // 用户加载完毕绑定对应的信息
                getCustomer.then(function() {

                    // 提前保存的省市县气候发展水平
                    var city = v.instance.Customer.city,
                        district = v.instance.Customer.district,
                        longitude = v.instance.Customer.longitude,
                        latitude = v.instance.Customer.latitude,
                        altitude = v.instance.Customer.altitude,
                        climate_zone = v.instance.Customer.climate_zone,
                        urban_devp_lev = v.instance.Customer.urban_devp_lev;

                    /**
                     * 绑定省下拉菜单
                     */
                    if (v.instance.Customer.province) {
                        var index = queryIndexByKey(v.instance.provinceList, { code: v.instance.Customer.province });
                        if (index < 0) {

                            $("#sheng").precover();
                        } else {

                            $("#sheng").psel(index);
                        }
                    };

                    return new Promise(function(resolve) {

                        setTimeout(function() {

                            resolve({
                                city: city,
                                district: district,
                                longitude: longitude,
                                latitude: latitude,
                                altitude: altitude,
                                climate_zone: climate_zone,
                                urban_devp_lev: urban_devp_lev
                            });

                        }, 0);
                    })

                }).then(function(Customer) {

                    var _Customer = Customer,
                        city = _Customer.city,
                        district = _Customer.district,
                        longitude = _Customer.longitude,
                        latitude = _Customer.latitude,
                        altitude = _Customer.altitude,
                        climate_zone = _Customer.climate_zone,
                        urban_devp_lev = _Customer.urban_devp_lev;

                    //v.instance.Customer.city = city;

                    // 绑定市
                    if (city) {
                        var index = queryIndexByKey(v.instance.cityList, { code: city });
                        if (index < 0) {

                            $("#shi").precover();
                        } else {

                            $("#shi").psel(index);
                        }
                    }

                    return new Promise(function(resolve) {

                        setTimeout(function() {

                            resolve({
                                city: city,
                                district: district,
                                longitude: longitude,
                                latitude: latitude,
                                altitude: altitude,
                                climate_zone: climate_zone,
                                urban_devp_lev: urban_devp_lev
                            });

                        }, 0);
                    })



                }).then(function(Customer) {

                    var _Customer = Customer,
                        city = _Customer.city,
                        district = _Customer.district,
                        longitude = _Customer.longitude,
                        latitude = _Customer.latitude,
                        altitude = _Customer.altitude,
                        climate_zone = _Customer.climate_zone,
                        urban_devp_lev = _Customer.urban_devp_lev;
                    //v.instance.Customer.district = district;

                    // 绑定县
                    if (district) {

                        var index = queryIndexByKey(v.instance.countyList, { code: district });
                        if (index < 0) {

                            $("#xian").precover();
                        } else {

                            $("#xian").psel(index);
                        }

                    }

                    return new Promise(function(resolve) {

                        setTimeout(function() {

                            resolve({
                                city: city,
                                district: district,
                                longitude: longitude,
                                latitude: latitude,
                                altitude: altitude,
                                climate_zone: climate_zone,
                                urban_devp_lev: urban_devp_lev
                            });

                        }, 0);
                    })

                }).then(function(Customer) {

                    var _Customer = Customer,
                        city = _Customer.city,
                        district = _Customer.district,
                        longitude = _Customer.longitude,
                        latitude = _Customer.latitude,
                        altitude = _Customer.altitude,
                        climate_zone = _Customer.climate_zone,
                        urban_devp_lev = _Customer.urban_devp_lev;

                    // 绑定经纬度
                    v.instance.Customer.longitude = longitude;
                    v.instance.Customer.latitude = latitude;
                    v.instance.Customer.altitude = altitude;

                    // 绑定气候区，发展水平
                    v.instance.Customer.climate_zone = climate_zone;
                    v.instance.Customer.urban_devp_lev = urban_devp_lev;

                    // 绑定气候区
                    if (v.instance.Customer.climate_zone) {
                        var index = queryIndexByKey(v.instance.climateList, { code: v.instance.Customer.climate_zone });
                        if (index < 0) {
                            $("#climateId").precover();
                        } else {
                            $("#climateId").psel(index);
                        }
                    }

                    // 绑定发展水平
                    if (v.instance.Customer.urban_devp_lev) {
                        var index = queryIndexByKey(v.instance.developLevelList, { code: v.instance.Customer.urban_devp_lev });
                        if (index < 0) {
                            $("#developLevelId").precover();
                        } else {
                            $("#developLevelId").psel(index);
                        }
                    }

                })
            }
        },
        methods: {
            // 为子组件赋值使用
            setInsert: function(key, value) {

                this.Customer[key] = value;
            },
            addBuild: function() {

                // 初始化结构
                if (!_.isArray(this.Customer.build_list)) this.Customer.build_list = [];

                this.Customer.build_list.push(new projectManageInsertModel.Build())

            },
            deleteBuild: function(index) {

                this.Customer.build_list.splice(index, 1);
            },
            clickToolType: function(bool) {
                this.Customer.tool_type = bool ? 'Web' : 'Revit';
            }
        }
    });

    window.projectManageInsertModel = projectManageInsertModel;

})();