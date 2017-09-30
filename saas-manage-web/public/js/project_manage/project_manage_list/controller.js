/**
 * 装饰器 pajax.post
 */
;
(function(pajax) {
    var post = pajax.post;

    pajax.post = function(obj) {

        // 报错提醒
        if (Object.prototype.toString.call(obj.error).slice(8, -1) != 'Function') {
            obj.error = function(err) {
                console.error(err);
            }
        }

        // 结束关闭loading
        if (Object.prototype.toString.call(obj.complete).slice(8, -1) != 'Function') {
            obj.complete = function(err) {
                console.log('loading end')
            }
        }

        // 开发发送请求展示loading
        console.log('loading end');
        post(obj);
    }

})(pajax);






var projectManageList = {
    init: function(bool) {
        projectManageListModel.instance(bool);
    },
    // 客户信息管理-列表页:查询所有客户信息
    getProjectManageList: function(cb) {

        // 假数据
        // cb({
        //     data: [{
        //         customer_id: '123123',
        //         project_name: '项目名称',
        //         project_local_name: '本地名称',
        //         company_name: '公司名称',
        //         build_count: 5,
        //         contact_preson: 'leo',
        //         contact_phone: '13366659254',
        //         customer_status: '1',
        //     }, {
        //         customer_id: '123123',
        //         project_name: '项目名称',
        //         project_local_name: '本地名称',
        //         company_name: '公司名称',
        //         build_count: 5,
        //         contact_preson: 'leo',
        //         contact_phone: '13366659254',
        //         customer_status: '2',
        //     }, {
        //         customer_id: '123123',
        //         project_name: '项目名称',
        //         project_local_name: '本地名称',
        //         company_name: '公司名称',
        //         build_count: 5,
        //         contact_preson: 'leo',
        //         contact_phone: '13366659254',
        //         customer_status: '3',
        //     }]
        // })

        // return;

        $("#project_list_loading").pshow();
        pajax.post({
            url: 'restCustomerService/queryAllCustomer',
            data: {},
            success: function(data) {
                Object.prototype.toString.call(cb).slice(8, -1) == 'Function' ? cb(data) : void 0;
            },
            complete: function() {

                $("#project_list_loading").phide();
            }
        });

    },
    // 客户信息管理-详细页:根据Id查询客户详细信息
    // getCustomerById: function(customer_id, cb) {

    //     // cb({ "customer_id": "oisjhdroeghs", "company_name": "这个公司名字起的好", "legal_person": "这个法阵啊", "account": "--", "mail": "492260726@qq.com", "contact_person": "王有药", "contact_phone": "13366659254", "operation_valid_term_start": "--", "operation_valid_term_end": "--", "contract_valid_term_start": "--", "contract_valid_term_end": "--", "business_license": "--", "pictures": [], "tool_type": "--", "project_id": "--", "project_name": "--", "project_local_name": "本地有名啊", "province": "110000", "city": "110000", "district": "110101", "province_city_name": "北京市", "climate_zone": "20", "climate_zone_name": "--", "urban_devp_lev": "1110", "urban_devp_lev_name": "--", "longitude": "116.42", "latitude": "39.93", "altitude": "53", "note": "--", "create_time": "--", "build_list": [{ "build_id": "", "build_code": "", "build_name": "", "build_local_name": "", "build_age": "", "build_func_type": "100", "build_func_type_name": "", "create_time": "" }, { "build_id": "", "build_code": "", "build_name": "", "build_local_name": "", "build_age": "", "build_func_type": "222", "build_func_type_name": "", "create_time": "" }], "build_name": "建筑本地名称", "build_age": "19931020" });
    //     // return;
    //     pajax.post({
    //         url: 'restCustomerService/queryCustomerById',
    //         data: { customer_id: customer_id },
    //         success: function(data) {
    //             Object.prototype.toString.call(cb).slice(8, -1) == 'Function' ? cb(data) : void 0;
    //         }
    //     });
    // },
    // 客户信息管理-新增 编辑页:查询所有行政区编码
    getRegionCode: function(cb) {

        // this._regionCode = [{
        //         "code": "110000", //省级编码
        //         "name": "北京市", //省级名称
        //         "type": "2", //类型，1-省，2-直辖市
        //         "cities": [{
        //             "code": "110000", //市编码
        //             "name": "北京市", //市名称
        //             "longitude": "116.4", //经度
        //             "latitude": "39.9", //维度
        //             "altitude": "54", //海拔，单位m
        //             "climate": "20", //气候区编码	
        //             "developLevel": "1110", //发展水平编码
        //             "districts": [{
        //                 "code": "110101",
        //                 "name": "东城区",
        //                 "longitude": "116.42",
        //                 "latitude": "39.93",
        //                 "altitude": "53"
        //             }]
        //         }]
        //     },
        //     {
        //         "code": "130000", //省级编码
        //         "name": "河北省", //省级名称
        //         "type": "1", //类型，1-省，2-直辖市
        //         "cities": [{
        //             "code": "130100",
        //             "name": "石家庄市",
        //             "longitude": "114.52",
        //             "latitude": "38.05",
        //             "altitude": "80.5",
        //             "climate": "20",
        //             "developLevel": "1222",
        //             "districts": [{
        //                 "code": "130102",
        //                 "name": "长安区",
        //                 "longitude": "114.52",
        //                 "latitude": "38.05",
        //                 "altitude": "74"
        //             }]
        //         }]
        //     }
        // ]

        // 查看缓存中有无数据
        if (!this._regionCode) {

            pajax.post({
                url: 'restDictService/queryAllRegionCode',
                data: {},
                success: function(data) {
                    Object.prototype.toString.call(cb).slice(8, -1) == 'Function' ? cb(data) : void 0;
                    this._regionCode = data;
                }
            });
        } else {
            // 缓存中有直接获取
            cb(this._regionCode);
        }

    },
    // 客户信息管理-新增 编辑页:查询所有气候区代码
    getAreaCode: function(cb) {

        // this._areaCode = [{
        //         "code": "10",
        //         "name": "严寒地区",
        //         "content": [{
        //                 "code": "11",
        //                 "name": "严寒A区",
        //                 "info": "6000≤HDD18"
        //             },
        //             {
        //                 "code": "12",
        //                 "name": "严寒B区",
        //                 "info": "5000≤HDD18＜6000"
        //             },
        //             {
        //                 "code": "13",
        //                 "name": "严寒C区",
        //                 "info": "3800≤HDD18＜5000"
        //             }
        //         ]
        //     },
        //     {
        //         "code": "20",
        //         "name": "寒冷地区",
        //         "content": [{
        //                 "code": "21",
        //                 "name": "寒冷A区",
        //                 "info": "2000≤HDD18＜3800，CDD26≤90"
        //             },
        //             {
        //                 "code": "22",
        //                 "name": "寒冷B区",
        //                 "info": "2000≤HDD18＜3800，CDD26＞90"
        //             }
        //         ]
        //     },
        //     {
        //         "code": "30",
        //         "name": "夏热冬冷地区",
        //         "content": [{
        //                 "code": "31",
        //                 "name": "夏热冬冷A区",
        //                 "info": "1000≤HDD18＜2000，50＜CDD26≤150"
        //             },
        //             {
        //                 "code": "32",
        //                 "name": "夏热冬冷B区",
        //                 "info": "2000≤HDD18＜3800，150＜CDD26≤300"
        //             },
        //             {
        //                 "code": "33",
        //                 "name": "夏热冬冷C区",
        //                 "info": "2000≤HDD18＜3800，100＜CDD26≤300"
        //             }
        //         ]
        //     },
        //     {
        //         "code": "40",
        //         "name": "夏热冬暖地区",
        //         "content": [{
        //             "code": "40",
        //             "name": "夏热冬暖地区",
        //             "info": "HDD18＜6000，CDD26＞200"
        //         }]
        //     },
        //     {
        //         "code": "50",
        //         "name": "温和地区",
        //         "content": [{
        //                 "code": "51",
        //                 "name": "温和A区",
        //                 "info": "600≤HDD18＜2000，CDD26≤50"
        //             },
        //             {
        //                 "code": "52",
        //                 "name": "温和B区",
        //                 "info": "HDD18＜600，CDD26≤50"
        //             }
        //         ]
        //     }
        // ];

        // 查看缓存中有无数据
        if (!this._areaCode) {

            pajax.post({
                url: 'restDictService/queryAllClimateAreaCode',
                data: {},
                success: function(data) {
                    Object.prototype.toString.call(cb).slice(8, -1) == 'Function' ? cb(data) : void 0;
                    this._areaCode = data;
                }
            });
        } else {
            // 缓存中有直接获取
            cb(this._areaCode);
        }

    },
    // 客户信息管理-新增 编辑页:查询所有发展水平代码
    getDevelopmentLevelCode: function(cb) {

        // this._developmentLevelCode = [{
        //         "code": "1000",
        //         "name": "中国",
        //         "content": [{
        //                 "code": "1100",
        //                 "name": "直辖市",
        //                 "content": [{
        //                         "code": "1110",
        //                         "name": "一线城市",
        //                         "content": []
        //                     },
        //                     {
        //                         "code": "1120",
        //                         "name": "二线发达城市",
        //                         "content": []
        //                     }
        //                 ]
        //             },
        //             {
        //                 "code": "1200",
        //                 "name": "省会",
        //                 "content": [{
        //                         "code": "1210",
        //                         "name": "一线城市",
        //                         "content": []
        //                     },
        //                     {
        //                         "code": "1220",
        //                         "name": "二线城市",
        //                         "content": [{
        //                                 "code": "1221",
        //                                 "name": "二线发达城市"
        //                             },
        //                             {
        //                                 "code": "1222",
        //                                 "name": "二线中等发达城市"
        //                             },
        //                             {
        //                                 "code": "1223",
        //                                 "name": "二线发展较弱城市"
        //                             }
        //                         ]
        //                     },
        //                     {
        //                         "code": "1230",
        //                         "name": "三线城市",
        //                         "content": []
        //                     }
        //                 ]
        //             },
        //             {
        //                 "code": "1300",
        //                 "name": "自治区首府",
        //                 "content": [{
        //                         "code": "1310",
        //                         "name": "三线城市",
        //                         "content": []
        //                     },
        //                     {
        //                         "code": "1320",
        //                         "name": "无线城市",
        //                         "content": []
        //                     }
        //                 ]
        //             },
        //             {
        //                 "code": "1400",
        //                 "name": "地级市",
        //                 "content": [{
        //                         "code": "1410",
        //                         "name": "一线城市",
        //                         "content": []
        //                     },
        //                     {
        //                         "code": "1420",
        //                         "name": "二线城市",
        //                         "content": [{
        //                                 "code": "1421",
        //                                 "name": "二线发达城市"
        //                             },
        //                             {
        //                                 "code": "1422",
        //                                 "name": "二线中等发达城市"
        //                             },
        //                             {
        //                                 "code": "1423",
        //                                 "name": "二线发展较弱城市"
        //                             }
        //                         ]
        //                     },
        //                     {
        //                         "code": "1430",
        //                         "name": "三线城市",
        //                         "content": []
        //                     },
        //                     {
        //                         "code": "1440",
        //                         "name": "四线城市",
        //                         "content": []
        //                     },
        //                     {
        //                         "code": "1450",
        //                         "name": "五线城市",
        //                         "content": []
        //                     }
        //                 ]
        //             },
        //             {
        //                 "code": "1500",
        //                 "name": "县级市",
        //                 "content": [{
        //                         "code": "1510",
        //                         "name": "三线城市",
        //                         "content": []
        //                     },
        //                     {
        //                         "code": "1520",
        //                         "name": "四线城市",
        //                         "content": []
        //                     },
        //                     {
        //                         "code": "1530",
        //                         "name": "五线城市",
        //                         "content": []
        //                     },
        //                     {
        //                         "code": "1540",
        //                         "name": "六线城市",
        //                         "content": []
        //                     }
        //                 ]
        //             },
        //             {
        //                 "code": "1600",
        //                 "name": "港澳台地区",
        //                 "content": [{
        //                         "code": "1610",
        //                         "name": "特别行政区",
        //                         "content": []
        //                     },
        //                     {
        //                         "code": "1620",
        //                         "name": "其他",
        //                         "content": []
        //                     }
        //                 ]
        //             }
        //         ]
        //     },
        //     {
        //         "code": "2000",
        //         "name": "海外",
        //         "content": []
        //     }
        // ];


        // 查看缓存中有无数据
        if (!this._developmentLevelCode) {

            pajax.post({
                url: 'restDictService/queryAllDevelopLevelCode',
                data: {},
                success: function(data) {
                    Object.prototype.toString.call(cb).slice(8, -1) == 'Function' ? cb(data) : void 0;
                    this._developmentLevelCode = data;
                }
            });
        } else {
            // 缓存中有直接获取
            cb(this._developmentLevelCode);
        }

    },
    // 客户信息管理-新增 编辑页:查询所有建筑功能
    getBuildingType: function(cb) {

        // this._buildingType = [{
        //         "code": "100",
        //         "name": "公共区域",
        //         "content": [{
        //                 "code": "110",
        //                 "name": "盥洗区",
        //                 "content": [{
        //                         "code": "111",
        //                         "name": "卫生间"
        //                     },
        //                     {
        //                         "code": "112",
        //                         "name": "更衣室"
        //                     }
        //                 ]
        //             },
        //             {
        //                 "code": "120",
        //                 "name": "走廊",
        //                 "content": []
        //             }
        //         ]
        //     },
        //     {
        //         "code": "200",
        //         "name": "后勤",
        //         "content": [{
        //                 "code": "210",
        //                 "name": "洁洗区",
        //                 "content": [{
        //                         "code": "211",
        //                         "name": "洗衣房"
        //                     },
        //                     {
        //                         "code": "212",
        //                         "name": "消毒间"
        //                     }
        //                 ]
        //             },
        //             {
        //                 "code": "220",
        //                 "name": "备餐区",
        //                 "content": [{
        //                         "code": "221",
        //                         "name": "厨房"
        //                     },
        //                     {
        //                         "code": "222",
        //                         "name": "洗碗间"
        //                     },
        //                     {
        //                         "code": "223",
        //                         "name": "茶水间"
        //                     }
        //                 ]
        //             }
        //         ]
        //     }
        // ]

        // 查看缓存中有无数据
        if (!this._buildingType) {

            pajax.post({
                url: 'restDictService/queryAllBuildingType',
                data: {},
                success: function(data) {
                    Object.prototype.toString.call(cb).slice(8, -1) == 'Function' ? cb(data) : void 0;
                    this._buildingType = data;
                }
            });
        } else {
            // 缓存中有直接获取
            cb(this._buildingType);
        }

    }
};

$(function() {
    //projectManageList.init();
})