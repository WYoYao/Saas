;
(function() {

    var ProjectInfo = function() {
        return {
            "project_id": "", //项目ID
            "project_local_id": "", //项目本地编号
            "project_local_name": "", //项目本地名称
            "BIMID": "", //BIM模型中编码
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
            "group": "", //所属集团
            "owner": "", //业主
            "designer": "", //设计方
            "constructor": "", //施工方
            "property": "", //物业公司
            "group_manage_zone": "", //集团管理分区
            "group_operate_zone": "", //集团经营分区
            "1st_weather": "", //未来第1天,天气状态编码
            "1st_weather_name": "", //未来第1天,天气状态名称，页面显示
            "1stTdb": "", //未来第1天,空气（干球）温度
            "1stRH": "", //未来第1天,空气相对湿度
            "1stPM2.5": "", //未来第1天,空气PM2.5质量浓度
            "1stPM10": "", //未来第1天,空气PM10浓度
            "2nd_weather": "", //未来第2天,天气状态编码
            "2nd_weather_name": "", //未来第2天,天气状态名称，页面显示
            "2ndTdb": "", //未来第2天,空气（干球）温度
            "2ndRH": "", //未来第2天,空气相对湿度
            "2ndPM2.5": "", //未来第2天,空气PM2.5质量浓度
            "2ndPM10": "", //未来第2天,空气PM10浓度
            "3rd_weather": "", //未来第3天,天气状态编码
            "3rd_weather_name": "", //未来第3天,天气状态名称，页面显示
            "3rdTdb": "", //未来第3天,空气（干球）温度
            "3rdRH": "", //未来第3天,空气相对湿度
            "3rdPM2.5": "", //未来第3天,空气PM2.5质量浓度
            "3rdPM10": "", //未来第3天,空气PM10浓度
            "out_weather": "", //当前室外环境,天气状态编码
            "out_weather_name": "", //当前室外环境,天气状态名称，页面显示
            "outTdb": "", //当前室外环境,空气（干球）温度
            "outRH": "", //当前室外环境,空气相对湿度
            "outD": "", //当前室外环境,空气绝对湿度
            "outTwb": "", //当前室外环境,空气湿球温度
            "outTd": "", //当前室外环境,空气露点温度
            "outH": "", //当前室外环境,空气焓
            "outRou": "", //当前室外环境,空气密度
            "outTg": "", //当前室外环境,环境黑球温度
            "out_press": "", //当前室外环境,空气压力
            "outCO2": "", //当前室外环境,空气CO2浓度
            "outCO": "", //当前室外环境,空气CO浓度
            "outPM2.5": "", //当前室外环境,空气PM2.5浓度
            "outPM10": "", //当前室外环境,空气PM10浓度
            "outDust": "", //当前室外环境,空气烟尘浓度
            "outVOC": "", //当前室外环境,空气VOC浓度
            "outCH4": "", //当前室外环境,空气甲烷浓度
            "out_vision": "", //当前室外环境,空气能见度
            "outAQI": "", //当前室外环境,空气质量指数
            "outLux": "", //当前室外环境,环境照度
            "outRI": "", //当前室外环境,全辐射强度
            "out_horizontal_RI": "", //当前室外环境,水平面辐射强度
            "out_vertical_RI": "", //当前室外环境,垂直面辐射强度
            "out_noise": "", //当前室外环境,环境噪声
            "out_ave_wind_v": "", //当前室外环境,空气平均风速
            "out_wind_scale": "", //当前室外环境,空气风力等级编码
            "out_wind_scale_name": "", //当前室外环境,空气风力等级名称，页面显示
            "out_wind_vx": "", //当前室外环境,空气X向风速
            "out_wind_vy": "", //当前室外环境,空气Y向风速
            "out_wind_vz": "", //当前室外环境,空气Z向风速
            "out_wind_direct": "", //当前室外环境,空气风向编码
            "out_wind_direct_name": "", //当前室外环境,空气风向名称，页面显示
            "day_precipitation": "", //当前室外环境,日降水量
            "precipitation_type": "", //当前室外环境,降水类型，1-无， 2-雨， 3-雪 ，4-雾露霜 ，5-雨夹雪， 6-其他
            "precipitation_type_name": "", //当前室外环境,降水类型名称，页面显示
            "SRT": "", //当前室外环境,日出时间
            "SST": "" //当前室外环境,日落时间
        }
    };

    // 需要编辑的字段的保存常量
    // var _keys = ["project_local_id", "project_local_name", "BIMID", "group", "owner", "designer", "constructor", "property", "group_manage_zone", "group_operate_zone"];
    // // 编辑时需要用到的类型
    // var _objs = {
    //     key: '', // key
    //     value: '', //值
    //     showIDE: false, //是否展示编辑框
    //     willSubmit: false, //准备提交，控制提交的再次确认框
    //     willCancel: false, // 准备取消 ,控制取消再次确认框
    //     changeType: false, // 提交类型 true 发布新的内容的，false 修改旧的内容
    //     newValue: '', //新的内容
    //     isError: false,
    //     PointHis: []
    // };
    // // 生成转换的方法
    // var convert = createIDEObject(_keys, _objs);

    v.pushComponent({
        name: 'project',
        data: {
            ProjectInfo: new ProjectInfo(),
        },
        methods: {
            // 显示编辑框
            _clickShowIDE: function(item) {

                item.showIDE = true;
            },
            // 显示提交确认框
            _clickWillSubmit: function(item) {

                item.willSubmit = true;

                // 查询历史记录判断是否可以首次直接提交
                controllerproject.queryProjectInfoPointHis(function(arr) {

                    item.PointHis = arr;
                })
            },
            // 显示取消确认框
            _clickWillCancel: function(item) {

                item.willCancel = true;
            },
            // 修改的提交时候的窗台
            _clickChangeType: function(item, bool) {

                item.changeType = bool;
            },
            // 提交修改
            _clickSubmit: function(item) {

                item.value = item.newValue;
                item.showIDE = false; //是否展示编辑框
                item.willSubmit = false; //准备提交，控制提交的再次确认框
                item.willCancel = false; // 准备取消 ,控制取消再次确认框
                item.changeType = false; // 提交类型 true 发布新的内容的，false 修改旧的内容
                item.newValue = ''; //新的内容
                item.isError = false;
            },
            // 取消编辑
            _clickCancelIDE: function(item) {
                item.newValue = item.value;
                item.showIDE = false; //是否展示编辑框
                item.willSubmit = false; //准备提交，控制提交的再次确认框
                item.willCancel = false; // 准备取消 ,控制取消再次确认框
                item.changeType = false; // 提交类型 true 发布新的内容的，false 修改旧的内容
                item.isError = false;
            },
            _clickCancelCancelIDE: function(item) {
                item.willCancel = false;
            },
            setProject: function(key, value) {
                // 将修改后的值传递列表中
                this.ProjectInfo[key] = value;
            }
        },
        beforeMount: function() {

            var _that = this;
            controllerproject.queryProjectInfo(function(data) {

                // 转换成可编辑的结构树
                _that.ProjectInfo = data;
            })

        },
    })
})();