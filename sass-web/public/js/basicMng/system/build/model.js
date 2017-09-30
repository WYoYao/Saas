;
(function() {

    function BuildInfo() {
        return {
            "build_id": "", //建筑id,saas库中建筑表id
            "build_code": "", //建筑体编码，物理世界建筑id
            "build_local_id": "", //建筑本地编码
            "build_local_name": "", //建筑本地名称
            "BIMID": "", //BIM模型中编码
            "build_age": "", //建筑年代
            "build_func_type": "", //建筑功能类型
            "build_func_type_name": "", //建筑功能类型名称，页面显示
            "ac_type": 1, //空调类型, 1-中央空调系统, 2-分散空调系统, 3-混合系统, 4-其他
            "ac_type_name": "", //空调类型名称，页面显示
            "heat_type": 1, //采暖类型, 1-城市热网 , 2-锅炉, 3-热泵, 4-其他
            "heat_type_name": "", //采暖类型名称，页面显示
            "green_build_lev": 1, //绿建等级, 1-无, 2- 一星级, 3- 二星级 , 3- 三星级, 4-其他
            "green_build_lev_name": "", //绿建等级名称，页面显示
            "intro": "", //文字简介
            "picture": [], //建筑图片
            "design_cool_load_index": "", //单位面积设计冷量
            "design_heat_load_index": "", //单位面积设计热量
            "design_elec_load_index": "", //单位面积配电设计容量
            "struct_type": 1, //建筑结构类型, 1-钢筋混凝土结构, 2-钢架与玻璃幕墙, 3-砖混结构, 4-其他
            "struct_type_name": "", //建筑结构类型名称，页面显示
            "SFI": 1, //抗震设防烈度, 1- 6度, 2- 7度, 3- 8度 ,4- 9度, 5- 其他
            "SFI_name": "", //抗震设防烈度名称，页面显示
            "shape_coeff": "", //建筑体形系数
            "build_direct": "", //建筑朝向
            "build_direct_name": "", //建筑朝向名称，页面显示
            "insulate_type": 1, //保温类型, 1-无保温, 2-内保温, 3-外保温, 4-其他
            "insulate_type_name": "", //保温类型名称，页面显示
            "GFA": "", //建筑总面积
            "tot_height": "", //建筑总高度
            "cover_area": "", //建筑占地面积
            "drawing": [ //图纸

            ],
            "archive": [ //档案

            ],
            "consum_model": [ //建筑能耗模型

            ],
            "permanent_people_num": 0 //建筑常驻人数
        }
    }

    v.pushComponent({
        name: 'build',
        data: {
            BuildList: [],
            buildPageIndex: true,
            BuildInfo: new BuildInfo(),
            uploadImg: {
                isShowIDE: false,
            },
            drawing: {
                isShowIDE: false,
            },
            archive: {
                isShowIDE: false,
            },
            // BuildInfo: {
            //     "build_id": 'build_id', //建筑id,saas库中建筑表id
            //     "build_code": 'build_code', //建筑体编码，物理世界建筑id
            //     "build_local_id": "建筑本地编码", //建筑本地编码
            //     "build_local_name": "建筑本地名称", //建筑本地名称
            //     "BIMID": "BIM模型中编码", //BIM模型中编码
            //     "build_age": "建筑年代", //建筑年代
            //     "build_func_type": "建筑功能类型", //建筑功能类型
            //     "build_func_type_name": "建筑功能类型名称，页面显示", //建筑功能类型名称，页面显示
            //     "ac_type": (Math.random() * Math.pow(10, 6) >>> 0) % 4 + 1, //空调类型, 1-中央空调系统, 2-分散空调系统, 3-混合系统, 4-其他
            //     "ac_type_name": "空调类型名称，页面显示", //空调类型名称，页面显示
            //     "heat_type": ((Math.random() * Math.pow(10, 6) >>> 0) % 4 + 1) % 5, //采暖类型, 1-城市热网 , 2-锅炉, 3-热泵, 4-其他
            //     "heat_type_name": "采暖类型名称，页面显示", //采暖类型名称，页面显示
            //     "green_build_lev": ((Math.random() * Math.pow(10, 6) >>> 0) % 4 + 1) % 5, //绿建等级, 1-无, 2- 一星级, 3- 二星级 , 3- 三星级, 4-其他
            //     "green_build_lev_name": "绿建等级名称，页面显示", //绿建等级名称，页面显示
            //     "intro": "文字简介", //文字简介
            //     "picture": ["", ""], //建筑图片
            //     "design_cool_load_index": "单位面积设计冷量", //单位面积设计冷量
            //     "design_heat_load_index": "单位面积设计热量", //单位面积设计热量
            //     "design_elec_load_index": "单位面积配电设计容量", //单位面积配电设计容量
            //     "struct_type": (Math.random() * Math.pow(10, 6) >>> 0) % 4 + 1, //建筑结构类型, 1-钢筋混凝土结构, 2-钢架与玻璃幕墙, 3-砖混结构, 4-其他
            //     "struct_type_name": "", //建筑结构类型名称，页面显示
            //     "SFI": (Math.random() * Math.pow(10, 6) >>> 0) % 5 + 1, //抗震设防烈度, 1- 6度, 2- 7度, 3- 8度 ,4- 9度, 5- 其他
            //     "SFI_name": "抗震设防烈度名称，页面显示", //抗震设防烈度名称，页面显示
            //     "shape_coeff": "建筑体形系数", //建筑体形系数
            //     "build_direct": "建筑朝向", //建筑朝向
            //     "build_direct_name": "建筑朝向名称，页面显示", //建筑朝向名称，页面显示
            //     "insulate_type": (Math.random() * Math.pow(10, 6) >>> 0) % 4 + 1, //保温类型, 1-无保温, 2-内保温, 3-外保温, 4-其他
            //     "insulate_type_name": "保温类型名称，页面显示", //保温类型名称，页面显示
            //     "GFA": "建筑总面积", //建筑总面积
            //     "tot_height": "建筑总高度", //建筑总高度
            //     "cover_area": "建筑占地面积", //建筑占地面积
            //     "drawing": [ //图纸
            //         {
            //             "type": "1",
            //             "name": "图纸1",
            //             "url": "http://bpic.588ku.com/element_pic/16/11/23/17a4c3756176452f92db616d57de0b5f.jpg!/fw/245/quality/90/unsharp/true/compress/true"
            //         }, //附件类型，1-url，2-附件,暂时只支持url 
            //         {
            //             "type": "1",
            //             "name": "图纸2",
            //             "url": "http://bpic.588ku.com/element_pic/16/11/23/17a4c3756176452f92db616d57de0b5f.jpg!/fw/245/quality/90/unsharp/true/compress/true"
            //         }, {
            //             "type": "2",
            //             "name": "图纸3",
            //             "url": "http://bpic.588ku.com/element_pic/16/11/23/17a4c3756176452f92db616d57de0b5f.jpg!/fw/245/quality/90/unsharp/true/compress/true",
            //         }
            //     ],
            //     "archive": [ //档案
            //         {
            //             "type": "1",
            //             "name": "档案1",
            //             "url": "http://bpic.588ku.com/element_pic/16/11/23/17a4c3756176452f92db616d57de0b5f.jpg!/fw/245/quality/90/unsharp/true/compress/true"
            //         }, //附件类型，1-url，2-附件,暂时只支持url   
            //         {
            //             "type": "1",
            //             "name": "档案2",
            //             "url": "http://bpic.588ku.com/element_pic/16/11/23/17a4c3756176452f92db616d57de0b5f.jpg!/fw/245/quality/90/unsharp/true/compress/true"
            //         },
            //         {
            //             "type": "2",
            //             "name": "档案3",
            //             "url": "http://bpic.588ku.com/element_pic/16/11/23/17a4c3756176452f92db616d57de0b5f.jpg!/fw/245/quality/90/unsharp/true/compress/true"
            //         },
            //     ],
            //     "consum_model": [ //建筑能耗模型
            //         {
            //             "type": "1",
            //             "name": "建筑能耗模型1",
            //             "url": "http://bpic.588ku.com/element_pic/16/11/23/17a4c3756176452f92db616d57de0b5f.jpg!/fw/245/quality/90/unsharp/true/compress/true"
            //         }, //附件类型，1-url，2-附件,暂时只支持url 
            //         {
            //             "type": "1",
            //             "name": "建筑能耗模型2",
            //             "url": "http://bpic.588ku.com/element_pic/16/11/23/17a4c3756176452f92db616d57de0b5f.jpg!/fw/245/quality/90/unsharp/true/compress/true"
            //         }, {
            //             "type": "2",
            //             "name": "建筑能耗模型3",
            //             "url": "http://bpic.588ku.com/element_pic/16/11/23/17a4c3756176452f92db616d57de0b5f.jpg!/fw/245/quality/90/unsharp/true/compress/true",
            //         }
            //     ],
            //     "permanent_people_num": Math.random() * Math.pow(10, 2) >>> 0 //建筑常驻人数
            // },
            EnumType: {
                ac_type: [{ // 空调
                        code: 1,
                        name: '中央空调系统',
                    },
                    {
                        code: 2,
                        name: '分散空调系统',
                    },
                    {
                        code: 3,
                        name: '混合系统',
                    },
                    {
                        code: 4,
                        name: '其他',
                    }
                ],
                heat_type: [{ //采暖类型
                        code: 1,
                        name: '城市热网',
                    },
                    {
                        code: 2,
                        name: '锅炉',
                    },
                    {
                        code: 3,
                        name: '热泵',
                    },
                    {
                        code: 4,
                        name: '其他',
                    }
                ],
                green_build_lev: [{ //绿建等级
                        code: 1,
                        name: '无',
                    },
                    {
                        code: 2,
                        name: '一星级',
                    },
                    {
                        code: 3,
                        name: '二星级',
                    },
                    {
                        code: 4,
                        name: '三星级',
                    },
                    {
                        code: 5,
                        name: '三星级',
                    }
                ],
                struct_type: [{ //建筑结构类型
                        code: 1,
                        name: '钢筋混凝土结构',
                    },
                    {
                        code: 2,
                        name: '钢架与玻璃幕墙',
                    },
                    {
                        code: 3,
                        name: '砖混结构',
                    },
                    {
                        code: 4,
                        name: '其他',
                    }
                ],
                SFI: [{ //抗震设防烈度
                        code: 1,
                        name: '6度',
                    },
                    {
                        code: 2,
                        name: '7度',
                    },
                    {
                        code: 3,
                        name: '8度',
                    },
                    {
                        code: 4,
                        name: '9度',
                    },
                    {
                        code: 5,
                        name: '其他',
                    }
                ],
                insulate_type: [{ //保温类型
                        code: 1,
                        name: '无保温',
                    },
                    {
                        code: 2,
                        name: '内保温',
                    },
                    {
                        code: 3,
                        name: '外保温',
                    },
                    {
                        code: 4,
                        name: '其他',
                    },
                ],
                build_direct: [{
                        "code": "1",
                        "name": "北",
                        "angle": "0°",
                        "directionCode": "N"
                    },
                    {
                        "code": "2",
                        "name": "东北偏北",
                        "angle": "22.5°",
                        "directionCode": "NNE"
                    },
                    {
                        "code": "3",
                        "name": "东北",
                        "angle": "0°",
                        "directionCode": "NE"
                    },
                    {
                        "code": "4",
                        "name": "东北偏东",
                        "angle": "0°",
                        "directionCode": "ENE"
                    },
                    {
                        "code": "5",
                        "name": "东",
                        "angle": "0°",
                        "directionCode": "E"
                    },
                    {
                        "code": "6",
                        "name": "东南偏东",
                        "angle": "0°",
                        "directionCode": "ESE"
                    },
                    {
                        "code": "7",
                        "name": "东南",
                        "angle": "0°",
                        "directionCode": "SE"
                    },
                    {
                        "code": "8",
                        "name": "东南偏南",
                        "angle": "0°",
                        "directionCode": "SSE"
                    },
                    {
                        "code": "9",
                        "name": "南",
                        "angle": "0°",
                        "directionCode": "S"
                    },
                    {
                        "code": "A",
                        "name": "西南偏南",
                        "angle": "0°",
                        "directionCode": "SSW"
                    },
                    {
                        "code": "B",
                        "name": "西南",
                        "angle": "0°",
                        "directionCode": "SW"
                    },
                    {
                        "code": "C",
                        "name": "西南偏西",
                        "angle": "0°",
                        "directionCode": "WSW"
                    },
                    {
                        "code": "D",
                        "name": "西",
                        "angle": "0°",
                        "directionCode": "W"
                    },
                    {
                        "code": "E",
                        "name": "西北偏西",
                        "angle": "0°",
                        "directionCode": "WNW"
                    },
                    {
                        "code": "F",
                        "name": "西北",
                        "angle": "0°",
                        "directionCode": "NW"
                    },
                    {
                        "code": "G",
                        "name": "西北偏北",
                        "angle": "337.5°",
                        "directionCode": "NNW"
                    },
                    {
                        "code": "H",
                        "name": "全向/无向",
                        "angle": "",
                        "directionCode": "C"
                    }
                ],
                build_func_type: [{
                        "code": "100",
                        "name": "公共区域",
                        "content": [{
                                "code": "110",
                                "name": "盥洗区",
                                "content": [{
                                        "code": "111",
                                        "name": "卫生间"
                                    },
                                    {
                                        "code": "112",
                                        "name": "更衣室"
                                    }
                                ]
                            },
                            {
                                "code": "120",
                                "name": "走廊",
                                "content": []
                            }
                        ]
                    },
                    {
                        "code": "200",
                        "name": "后勤",
                        "content": [{
                                "code": "210",
                                "name": "洁洗区",
                                "content": [{
                                        "code": "211",
                                        "name": "洗衣房"
                                    },
                                    {
                                        "code": "212",
                                        "name": "消毒间"
                                    }
                                ]
                            },
                            {
                                "code": "220",
                                "name": "备餐区",
                                "content": [{
                                        "code": "221",
                                        "name": "厨房"
                                    },
                                    {
                                        "code": "222",
                                        "name": "洗碗间"
                                    },
                                    {
                                        "code": "223",
                                        "name": "茶水间"
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
        },
        methods: {
            _download: function(item) {

                console.log(item.key);
            },
            _clickbuildgoBack: function() {
                this.buildPageIndex = true;
            },
            _clickGoDeatil: function(index) {

                var _that = this;
                var item = this.BuildList[index];

                var req = {
                    build_id: item.build_id, //建筑id,必须
                    build_code: item.build_code //建筑编码,必须
                }

                this.buildPageIndex = false;

                controllerbuild.queryBuildInfo(req, function(data) {
                    _that.BuildInfo = data;

                    /**
                     * 绑定图片控件
                     */

                    $("#pictureUpload").pval(data.picture.map(function(item) {

                        return {
                            url: item.key,
                            name: item.name,
                        }
                    }));

                    $("#uploadDrawing").pval(data.drawing.map(function(item) {

                        return {
                            url: item.key,
                            name: item.name,
                        }
                    }))

                    $("#uploadArchive").pval(data.archive.map(function(item) {

                        return {
                            url: item.key,
                            name: item.name,
                        }
                    }))
                })
            },
            setBuild: function(key, value) {
                // 将修改后的值传递实体中
                this.BuildInfo[key] = value;

                // 将修改后的值传入到列表中
                var index = this.BuildList.map(function(item) {

                    return item.build_id;
                }).indexOf(this.BuildInfo.build_id);

                var item = this.BuildList[index];

                item[key] = value;

                Vue.set(this.BuildList, index, item);


            },
            _uploadPicture: function() {

                var pictures = $("#pictureUpload").pval().filter(function(item) {
                    return !!item.suffix;
                }).map(function(item) {

                    return {
                        type: 1,
                        name: item.name,
                        attachments: {
                            path: item.url,
                            toPro: 'key',
                            multiFile: false,
                            fileName: item.name,
                            fileSuffix: item.suffix,
                            isNewFile: true,
                            fileType: 1
                        }
                    };
                });

                var arr = {
                    "build_id": v.instance.BuildInfo.build_id, //建筑id,saas库中建筑表id，必须
                    "build_code": v.instance.BuildInfo.build_code, //建筑体编码，物理世界建筑id，必须
                    "info_point_code": "picture", //修改的信息点(图纸)编码，必须
                    "info_point_value": pictures,
                    "valid_time": new Date().format('yyyyMMddhhmmss'),
                };


                controllerbuild.updateBuildInfoFile(arr);

            },
            _uploadDrawing: function() {

                var drawings = $("#uploadDrawing").pval().filter(function(item) {
                    return !!item.suffix;
                }).map(function(item) {

                    return {
                        type: 1,
                        name: item.name,
                        attachments: {
                            path: item.url,
                            toPro: 'key',
                            multiFile: false,
                            fileName: item.name,
                            fileSuffix: item.suffix,
                            isNewFile: true,
                            fileType: 2
                        }
                    };
                });

                var arr = {
                    "build_id": v.instance.BuildInfo.build_id, //建筑id,saas库中建筑表id，必须
                    "build_code": v.instance.BuildInfo.build_code, //建筑体编码，物理世界建筑id，必须
                    "info_point_code": "drawing", //修改的信息点(图纸)编码，必须
                    "info_point_value": drawings,
                    "valid_time": new Date().format('yyyyMMddhhmmss'),
                };


                controllerbuild.updateBuildInfoFile(arr);

            },
            _uploadArchive: function() {

                var archives = $("#uploadArchive").pval().filter(function(item) {
                    return !!item.suffix;
                }).map(function(item) {

                    return {
                        type: 1,
                        name: item.name,
                        attachments: {
                            path: item.url,
                            toPro: 'key',
                            multiFile: false,
                            fileName: item.name,
                            fileSuffix: item.suffix,
                            isNewFile: true,
                            fileType: 2
                        }
                    };
                });

                var arr = {
                    "build_id": v.instance.BuildInfo.build_id, //建筑id,saas库中建筑表id，必须
                    "build_code": v.instance.BuildInfo.build_code, //建筑体编码，物理世界建筑id，必须
                    "info_point_code": "archive", //修改的信息点(图纸)编码，必须
                    "info_point_value": archives,
                    "valid_time": new Date().format('yyyyMMddhhmmss'),
                };


                controllerbuild.updateBuildInfoFile(arr);

            },
            _clearPicture: function() {
                $("#pictureUpload").pval();
            }
        },
        beforeMount: function() {
            var _that = this;
            controllerbuild.queryBuildList(function(data) {
                _that.BuildList = data;
            })
        },
    })
})();