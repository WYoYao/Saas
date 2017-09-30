;
(function() {
    /*页面model*/
    function projectManageListModel() {}

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
    };


    v.pushComponent({
        name: 'projectList',
        el: '#project_manage_list',
        data: {
            project_list: [], // 项目列表
            islock: false,
        },
        // 组件加载之前加载数据
        beforeMount: function() {
            var _that = this;
            projectManageList.getProjectManageList(function(res) {

                // 赋值
                _that.project_list = (res.data || [])
                    .map(function(item) {

                        // 转换生成状态名称
                        item.customer_status_name = projectEnum.status[item.customer_status];
                        item.color = projectEnum.colors[item.customer_status];
                        return item;
                    });

            })

        },
        methods: {
            // 每条数据点击事件
            click: function(item) {
                // 被锁定的直接淘汰
                // if (item.customer_status != 1 && item.customer_status != 2) return;

                if (item.customer_status == 1) {
                    // 跳转到对应的新增项目页面
                    goProjectManageInsert({ customer_id: item.customer_id });

                } else if (item.customer_status == 2 || item.customer_status == 3) {
                    // 执行  正常编辑
                    // 跳转到对应的新增项目页面
                    v.instance.islock = item.customer_status == 3;
                    goProjectManageUpdate({ customer_id: item.customer_id });

                }
            }
        }
    })

    /**
     * 
     * 用于查询对应的 省市县  发展水平 气候区域  建筑类型
     * @param {any} regionCode 
     * @param {any} areaCode 
     * @param {any} levelCode 
     * @param {any} buildingType 
     */
    function RegionCode(regionCode, areaCode, levelCode, buildingType) {

        // 创建的必备函数
        this._RegionCode = regionCode;
        this._AreaCode = areaCode;
        this._DevelopmentLevelCode = levelCode;
        this._BuildingType = buildingType;
    }

    // 获取建筑类型列表
    RegionCode.prototype.getBuildingType = function() {

        // 转换个过滤多余的属性
        function covert(item) {

            var result = Object.assign({}, item);
            if (result.content) result.content = void 0;
            return result;
        }

        // 循环遍历所有的contents
        function getContent(con, obj) {

            if (_.isArray(obj.content) && obj.content.length) {

                obj.content.reduce(function(content, item) {

                    return getContent(content, item);
                }, con)
            }

            con.push(covert(obj));

            return con;
        }

        return this._BuildingType
            .reduce(function(con, item, index) {

                con = con.concat(getContent([], item));

                return con;

            }, [])


    }

    // 查询所有行政区编码
    /**
     * 查询所有的实现省份 城市列表
     */
    RegionCode.prototype.getProvince = function() {

        // 将省份的内容部分过滤掉
        return this._RegionCode.map(function(item) {
            return item;
        })
    };

    // 获取所有城市列表
    RegionCode.prototype.getCity = function() {

        return this._RegionCode.reduce(function(con, item) {

            return con.concat(item.cities);
        }, []);
    }


    /**
     * 根据省份查询对应的市列表
     * code 省份的code
     */
    RegionCode.prototype.queryCity = function(code) {

        // 条件筛选
        return (this._RegionCode.filter(function(item) {

            return item.code == code;
        }) || [{ cities: [] }])[0].cities.map(function(item) {

            return item;
        })
    }


    // 获取所有县区列表列表
    RegionCode.prototype.getCounty = function() {

        return this.getCity().reduce(function(con, item) {

            return con.concat(item.districts);
        }, [])
    }


    /**
     * 根据市的 code 查询对应的区县
     */
    RegionCode.prototype.queryCounty = function(code) {

        this._RegionCode
            .reduce(function(con, item) {

                // 返回所有的市的集合
                return con.concat(item.cities)
            }, [])
            .filter(function(item) {

                // 返回对应的曲线
                return item.districts;
            })
    };

    /**
     * 获取气候区或 发展水平 平铺集合
     */
    RegionCode.prototype.getClimateOrDevelopLevel = function(type) {

        // 转换个过滤多余的属性
        function covert(item) {

            var result = Object.assign({}, item);
            if (result.content) result.content = void 0;
            return result;
        }

        // 循环遍历所有的contents
        function getContent(con, obj) {

            if (_.isArray(obj.content) && obj.content.length) {

                obj.content.reduce(function(content, item) {

                    return getContent(content, item);
                }, con)
            }

            con.push(covert(obj));

            return con;
        }

        return (type === true ? this._AreaCode : this._DevelopmentLevelCode)
            .reduce(function(con, item, index) {

                con = con.concat(getContent([], item));

                return con;

            }, [])
    }

    /**
     * 根据气候区或发展水平编码查询对应的气候信息
     * 
     */
    RegionCode.prototype.queryClimateOrDevelopLevel = function(type, code) {

        return this.getClimateOrDevelopLevel(type).filter(function(item) {

            // 筛选对应的气候区
            return item.code == code;
        })[0];

    }

    // 查询的发展水平对应的信息
    RegionCode.prototype.queryDevelopLevel = function(code) {
        return this.queryClimateOrDevelopLevel(false, code);
    }

    // 根据气候区查询对应的信息
    RegionCode.prototype.queryClimate = function(code) {
        return this.queryClimateOrDevelopLevel(true, code);
    }

    /**
     * 根据城市code 查询对应的经纬度和气候区编码的发展水平编码
     */
    RegionCode.prototype.getClimateAndDevelopLevel = function(code) {

        var res, climate, developLevel;

        res = this.getCity.filter(function(item) {

            return item.code == code;
        });

        // 未查询出来直接返回空对象
        if (!res.length) return {};

    };

    /**
     * 获取regionCode 实例
     * cb 控制反转使用的 regionCode 实例
     */
    projectManageListModel.regionCode = function() {

        var _regionCode, _areaCode, _developmentLevelCode, _buildingType, res;
        // 缓存对象
        if (projectManageListModel._regionCode) return projectManageListModel._regionCode;


        projectManageListModel._regionCode = new Promise(function(resolve, reject) {

            // 查询所有行政区编码
            projectManageList.getRegionCode(function(res) {

                _regionCode = res.data;
                if (_regionCode && _areaCode && _developmentLevelCode && _buildingType)
                    resolve(res);
            });

            // 查询所有气候区代码

            projectManageList.getAreaCode(function(res) {
                _areaCode = res.data;
                if (_regionCode && _areaCode && _developmentLevelCode && _buildingType)
                    resolve(res);
            });

            projectManageList.getDevelopmentLevelCode(function(res) {
                _developmentLevelCode = res.data;
                if (_regionCode && _areaCode && _developmentLevelCode && _buildingType)
                    resolve(res);
            });

            projectManageList.getBuildingType(function(res) {
                _buildingType = res.data;
                if (_regionCode && _areaCode && _developmentLevelCode && _buildingType)
                    resolve(res);
            })

        }).then(function(res) {

            var _RegionCodeInit = new RegionCode(_regionCode, _areaCode, _developmentLevelCode, _buildingType)

            return new Promise(function(resolve) {
                resolve(_RegionCodeInit);
            })
        }).catch(function() {
            $("#projectInsertLoading").phide();
        });


        // projectManageListModel._regionCode = new Promise(function(resolve, reject) {

        //     // 查询所有行政区编码
        //     projectManageList.getRegionCode(function(res) {
        //         resolve(res);
        //     });
        // }).then(function(res) {

        //     _regionCode = res.data;
        //     // 查询所有气候区代码
        //     return new Promise(function(resolve, reject) {
        //         projectManageList.getAreaCode(function(res) {
        //             resolve(res);
        //         });
        //     })
        // }).then(function(res) {

        //     _areaCode = res.data;;
        //     //查询所有发展水平代码
        //     return new Promise(function(resolve, reject) {
        //         projectManageList.getDevelopmentLevelCode(function(res) {
        //             resolve(res);
        //         });
        //     })
        // }).then(function(res) {

        //     _developmentLevelCode = res.data;;

        //     return new Promise(function(resolve) {
        //         projectManageList.getBuildingType(function(res) {
        //             resolve(res);
        //         })
        //     })
        // }).then(function(res) {

        //     _buildingType = res.data;

        //     var _RegionCodeInit = new RegionCode(_regionCode, _areaCode, _developmentLevelCode, _buildingType)

        //     return new Promise(function(resolve) {
        //         resolve(_RegionCodeInit);
        //     })
        // });

        return projectManageListModel._regionCode;

    }


    window.projectManageListModel = projectManageListModel;
})();