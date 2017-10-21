var controllerproject = {
    queryProjectInfo: function(cb) {


        // console.log(`测试数据后面需删除Start`);
        // $("#systemloading").pshow()
        // setTimeout(function() {

        //     var data = {
        //         "project_id": "项目ID", //项目ID
        //         "project_local_id": "项目本地编号", //项目本地编号
        //         "project_local_name": "项目本地名称", //项目本地名称
        //         "BIMID": "BIM模型中编码", //BIM模型中编码
        //         "province": "省编码", //省编码
        //         "city": "市编码", //市编码
        //         "district": "市内编码", //市内编码
        //         "province_city_name": "河北省·石家庄市·长安区", //省市区域名称
        //         "climate_zone": "气候区编码", //气候区编码
        //         "climate_zone_name": "气候区名称", //气候区名称
        //         "urban_devp_lev": "城市发展水平编码", //城市发展水平编码
        //         "urban_devp_lev_name": "城市发展水平名称", //城市发展水平名称
        //         "longitude": "经度", //经度
        //         "latitude": "维度", //维度
        //         "altitude": "海拔", //海拔
        //         "group": "所属集团", //所属集团
        //         "owner": "业主", //业主
        //         "designer": "设计方", //设计方
        //         "constructor": "施工方", //施工方
        //         "property": "物业公司", //物业公司
        //         "group_manage_zone": "集团管理分区", //集团管理分区
        //         "group_operate_zone": "集团经营分区", //集团经营分区
        //         "1st_weather": "未来第1天,天气状态编码", //未来第1天,天气状态编码
        //         "1st_weather_name": "未来第1天,天气状态名称", //未来第1天,天气状态名称，页面显示
        //         "1stTdb": "未来第1天,空气（干球）温度", //未来第1天,空气（干球）温度
        //         "1stRH": "未来第1天,空气相对湿度", //未来第1天,空气相对湿度
        //         "1stPM2.5": "未来第1天,空气PM2.5质量浓度", //未来第1天,空气PM2.5质量浓度
        //         "1stPM10": "未来第1天,空气PM10浓度", //未来第1天,空气PM10浓度
        //         "2nd_weather": "未来第2天,天气状态编码", //未来第2天,天气状态编码
        //         "2nd_weather_name": "未来第2天,天气状态名称，页面显示", //未来第2天,天气状态名称，页面显示
        //         "2ndTdb": "未来第2天,空气（干球）温度", //未来第2天,空气（干球）温度
        //         "2ndRH": "未来第2天,空气相对湿度", //未来第2天,空气相对湿度
        //         "2ndPM2.5": "未来第2天,空气PM2.5质量浓度", //未来第2天,空气PM2.5质量浓度
        //         "2ndPM10": "未来第2天,空气PM10浓度", //未来第2天,空气PM10浓度
        //         "3rd_weather": "未来第3天,天气状态编码", //未来第3天,天气状态编码
        //         "3rd_weather_name": "未来第3天,天气状态名称，页面显示", //未来第3天,天气状态名称，页面显示
        //         "3rdTdb": "未来第3天,空气（干球）温度", //未来第3天,空气（干球）温度
        //         "3rdRH": "未来第3天,空气相对湿度", //未来第3天,空气相对湿度
        //         "3rdPM2.5": "未来第3天,空气PM2.5质量浓度", //未来第3天,空气PM2.5质量浓度
        //         "3rdPM10": "未来第3天,空气PM10浓度", //未来第3天,空气PM10浓度
        //         "out_weather": "当前室外环境,天气状态编码", //当前室外环境,天气状态编码
        //         "out_weather_name": "当前室外环境,天气状态名称，页面显示", //当前室外环境,天气状态名称，页面显示
        //         "outTdb": "当前室外环境,空气（干球）温度", //当前室外环境,空气（干球）温度
        //         "outRH": "当前室外环境,空气相对湿度", //当前室外环境,空气相对湿度
        //         "outD": "当前室外环境,空气绝对湿度", //当前室外环境,空气绝对湿度
        //         "outTwb": "当前室外环境,空气湿球温度", //当前室外环境,空气湿球温度
        //         "outTd": "当前室外环境,空气露点温度", //当前室外环境,空气露点温度
        //         "outH": "当前室外环境,空气焓", //当前室外环境,空气焓
        //         "outRou": "当前室外环境,空气密度", //当前室外环境,空气密度
        //         "outTg": "当前室外环境,环境黑球温度", //当前室外环境,环境黑球温度
        //         "out_press": "当前室外环境,空气压力", //当前室外环境,空气压力
        //         "outCO2": "当前室外环境,空气CO2浓度", //当前室外环境,空气CO2浓度
        //         "outCO": "当前室外环境,空气CO浓度", //当前室外环境,空气CO浓度
        //         "outPM2.5": "当前室外环境,空气PM2.5浓度", //当前室外环境,空气PM2.5浓度
        //         "outPM10": "当前室外环境,空气PM10浓度", //当前室外环境,空气PM10浓度
        //         "outDust": "当前室外环境,空气烟尘浓度", //当前室外环境,空气烟尘浓度
        //         "outVOC": "当前室外环境,空气VOC浓度", //当前室外环境,空气VOC浓度
        //         "outCH4": "当前室外环境,空气甲烷浓度", //当前室外环境,空气甲烷浓度
        //         "out_vision": "当前室外环境,空气能见度", //当前室外环境,空气能见度
        //         "outAQI": "当前室外环境,空气质量指数", //当前室外环境,空气质量指数
        //         "outLux": "当前室外环境,环境照度", //当前室外环境,环境照度
        //         "outRI": "当前室外环境,全辐射强度", //当前室外环境,全辐射强度
        //         "out_horizontal_RI": "当前室外环境,水平面辐射强度", //当前室外环境,水平面辐射强度
        //         "out_vertical_RI": "当前室外环境,垂直面辐射强度", //当前室外环境,垂直面辐射强度
        //         "out_noise": "当前室外环境,环境噪声", //当前室外环境,环境噪声
        //         "out_ave_wind_v": "当前室外环境,空气平均风速", //当前室外环境,空气平均风速
        //         "out_wind_scale": "当前室外环境,空气风力等级编码", //当前室外环境,空气风力等级编码
        //         "out_wind_scale_name": "当前室外环境,空气风力等级名称，页面显示", //当前室外环境,空气风力等级名称，页面显示
        //         "out_wind_vx": "当前室外环境,空气X向风速", //当前室外环境,空气X向风速
        //         "out_wind_vy": "当前室外环境,空气Y向风速", //当前室外环境,空气Y向风速
        //         "out_wind_vz": "当前室外环境,空气Z向风速", //当前室外环境,空气Z向风速
        //         "out_wind_direct": "当前室外环境,空气风向编码", //当前室外环境,空气风向编码
        //         "out_wind_direct_name": "当前室外环境,空气风向名称，页面显示", //当前室外环境,空气风向名称，页面显示
        //         "day_precipitation": "当前室外环境,日降水量", //当前室外环境,日降水量
        //         "precipitation_type": +new Date() % 7 == 0 ? +new Date() % 7 + 1 : +new Date() % 7, //当前室外环境,降水类型，1-无， 2-雨， 3-雪 ，4-雾露霜 ，5-雨夹雪， 6-其他
        //         "precipitation_type_name": "当前室外环境,降水类型名称", //当前室外环境,降水类型名称，页面显示
        //         "SRT": "2017-08-01 12:45:31", //当前室外环境,日出时间
        //         "SST": "2017-08-01 15:45:31" //当前室外环境,日落时间
        //     };
        //     Object.prototype.toString.call(cb).slice(8, -1) == 'Function' ? cb(data) : void 0;
        //     $("#systemloading").phide()
        // })
        // console.log(`测试数据后面需删除End`);
        // return;

        $("#systemloading").pshow()
        pajax.post({
            url: 'restCustomerService/queryProjectInfo',
            data: {},
            success: function(data) {
                Object.prototype.toString.call(cb).slice(8, -1) == 'Function' ? cb(data) : void 0;
            },
            complete: function() {
                $("#systemloading").phide()
            },
        });

    },
    queryProjectInfoPointHis: function(info_point_code, cb) {


        // console.log(`测试数据后面需删除Start`);
        // setTimeout(function() {

        //     var data = [
        //         { "date": 20170210121212, "value": (+Math.pow(10, 6) * Math.random()).toString().slice(0, 6) },
        //         { "date": 20170211131212, "value": (+Math.pow(10, 6) * Math.random()).toString().slice(0, 6) },
        //         { "date": 20170212131212, "value": (+Math.pow(10, 6) * Math.random()).toString().slice(0, 6) }
        //     ];
        //     Object.prototype.toString.call(cb).slice(8, -1) == 'Function' ? cb(data) : void 0;
        //     $("#systemloading").phide()
        // })
        // console.log(`测试数据后面需删除End`);
        // return;

        pajax.post({
            url: 'restCustomerService/queryProjectInfoPointHis',
            data: { info_point_code: info_point_code },
            success: function(data) {
                function convert(str) {

                    var str = new Object(str).toString();

                    if (!_.isString(str) && /^\d{14}$/.test(str)) throw new Error('arguments must be a String of "yyyyMMddhhmmss"');



                    var y = str.slice(0, 4);
                    var M = str.slice(4, 6);
                    var d = str.slice(6, 8);
                    var h = str.slice(8, 10);
                    var m = str.slice(10, 12);
                    var s = str.slice(12, 14);

                    return new Date(`${y}/${M}/${d} ${h}:${m}:${s}`);
                };
                var arr = _.isArray(data.data) ? data.data.map(function(item) {

                    item.date = convert(item.date);

                    return item;
                }).slice(0,3) : [];
                Object.prototype.toString.call(cb).slice(8, -1) == 'Function' ? cb(arr) : void 0;
            },
            complete: function() {

            },
        });

    },
    updateProjectInfo: function(res, cb) {


        // console.log(`测试数据后面需删除Start`);
        // setTimeout(function() {
        //     $("#systempnotice").pshow({ text: "修改成功！", state: "success" });
        //     Object.prototype.toString.call(cb).slice(8, -1) == 'Function' ? cb() : void 0;

        // })
        // console.log(`测试数据后面需删除End`);
        // return;


        pajax.post({
            url: 'restCustomerService/updateProjectInfo',
            data: res,
            success: function(data) {
                if (!Object.keys(data).length) {
                    cb();
                    $("#systempnotice").pshow({ text: "修改成功！", state: "success" });
                }
            },
            error: function() {
                $("#systempnotice").pshow({ text: "修改失败！", state: "failure" });
            },
            complete: function() {},
        });

    }
}