;
(function () {

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
            detailIndex:0,
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
            consum_model:{
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
                build_direct: [],
                build_func_type: [],
            },
        },
        methods: {
            _download: function (item) {

                console.log(item.key);
            },
            _clickbuildgoBack: function () {
                this.buildPageIndex = true;
            },
            _clickGoDeatil: function (index) {
                
                // 初始化详情的数据

                var _that = this;
                var item = this.BuildList[index];

                v.initPage("build");

                _that.detailIndex=index;


                var req = {
                    build_id: item.build_id, //建筑id,必须
                    build_code: item.build_code //建筑编码,必须
                }

                this.buildPageIndex = false;

                controllerbuild.queryBuildInfo(req, function (data) {
                    _that.BuildInfo = data;

                    /**
                     * 绑定图片控件
                     */
                    $("#pictureUpload").precover();
                    $("#pictureUpload").pval(data.picture.map(function (item) {

                        return {
                            url: item.key,
                            name: item.name,
                        }
                    }));

                    $("#uploadDrawing").precover();
                    $("#uploadDrawing").pval(data.drawing.map(function (item) {

                        return {
                            url: item.key,
                            name: item.name,
                        }
                    }))

                    $("#uploadArchive").precover();
                    $("#uploadArchive").pval(data.archive.map(function (item) {

                        return {
                            url: item.key,
                            name: item.name,
                        }
                    }))

                    $("#uploadConsum_model").precover();
                    $("#uploadConsum_model").pval(data.consum_model.map(function (item) {

                        return {
                            url: item.key,
                            name: item.name,
                        }
                    }))
                })
            },
            setBuild: function (key, value) {
                // 将修改后的值传递实体中
                this.BuildInfo[key] = value;

                // 将修改后的值传入到列表中
                var index = this.BuildList.map(function (item) {

                    return item.build_id;
                }).indexOf(this.BuildInfo.build_id);

                var item = this.BuildList[index];

                item[key] = value;

                Vue.set(this.BuildList, index, item);


            },
            _uploadPicture: function () {
                var _that = this;

                var pictures = $("#pictureUpload").pval().map(function (item) {

                    return {
                        type: 1,
                        name: item.name,
                        attachments: {
                            path: item.url,
                            toPro: 'key',
                            multiFile: false,
                            fileName: item.name,
                            fileSuffix: item.suffix,
                            isNewFile: item.isNewFile,
                            fileType: 2
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


                controllerbuild.updateBuildInfoFile(arr, function () {

                    v.instance.picture.isShowIDE=!v.instance.picture.isShowIDE;
                    
                    _that._clickGoDeatil(_that.detailIndex);
                });

            },
            _uploadDrawing: function () {
                var _that = this;

                var drawings = $("#uploadDrawing").pval().map(function (item) {

                    return {
                        type: 1,
                        name: item.name,
                        attachments: {
                            path: item.url,
                            toPro: 'key',
                            multiFile: false,
                            fileName: item.name,
                            fileSuffix: item.suffix,
                            isNewFile: item.isNewFile,
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


                controllerbuild.updateBuildInfoFile(arr, function () {
                    v.instance.drawing.isShowIDE=!v.instance.drawing.isShowIDE;
                    _that._clickGoDeatil(_that.detailIndex);
                });

            },
            _uploadArchive: function () {
                var _that = this;

                var archives = $("#uploadArchive").pval().map(function (item) {

                    return {
                        type: 1,
                        name: item.name,
                        attachments: {
                            path: item.url,
                            toPro: 'key',
                            multiFile: false,
                            fileName: item.name,
                            fileSuffix: item.suffix,
                            isNewFile: item.isNewFile,
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


                controllerbuild.updateBuildInfoFile(arr, function () {
                    v.instance.archive.isShowIDE=!v.instance.archive.isShowIDE;
                    _that._clickGoDeatil(_that.detailIndex);
                });

            },
            _uploadConsum_model: function () {
                var _that = this;

                var consum_model = $("#uploadConsum_model").pval().filter(function (item) {
                    return !!item.suffix;
                }).map(function (item) {

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
                    "info_point_code": "consum_model", //修改的信息点(图纸)编码，必须
                    "info_point_value": consum_model,
                    "valid_time": new Date().format('yyyyMMddhhmmss'),
                };


                controllerbuild.updateBuildInfoFile(arr, function () {

                    _that._clickGoDeatil(_that.detailIndex);
                });

            },
            _clearPicture: function () {
                $("#pictureUpload").pval();
            }
        },
        beforeMount: function () {
            var _that = this;
            controllerbuild.queryBuildList(function (data) {
                _that.BuildList = data;
            })

            controllerbuild.queryAllBuildingCode(function(list){
                _that.EnumType.build_func_type=list;
            })

            controllerbuild.queryAllDirectionCode(function(list){
                _that.EnumType.build_direct=list;
            })

        },
    })
})();