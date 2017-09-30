var controllerbuild = {
    queryBuildList: function(cb) {
        // console.log(`测试数据后面需删除Start`);
        // $("#systemloading").pshow()
        // setTimeout(function() {

        //     var data = _.range(100).map(function(item, index) {
        //         return {
        //             "build_id": (Math.random() * Math.pow(10, 6)).toString().slice(0, 6), //建筑id
        //             "build_code": (Math.random() * Math.pow(10, 6)).toString().slice(0, 6), //建筑编码
        //             "build_name": `建筑名称${index}`, //建筑名称
        //             "build_local_name": `建筑本地名称${index}`, //建筑本地名称
        //             "build_age": "19" + (Math.random() * Math.pow(10, 6)).toString().slice(0, 2), //建筑年代
        //             "build_func_type": (Math.random() * Math.pow(10, 6)).toString().slice(0, 2), //建筑功能类型编码
        //             "build_func_type_name": `建筑功能类型名称${index}` //建筑功能类型名称
        //         }
        //     });
        //     Object.prototype.toString.call(cb).slice(8, -1) == 'Function' ? cb(data) : void 0;
        //     $("#systemloading").phide()
        // })
        // console.log(`测试数据后面需删除End`);
        // return;

        $("#systemloading").pshow()
        pajax.post({
            url: 'restCustomerService/queryBuildList',
            data: {},
            success: function(data) {
                Object.prototype.toString.call(cb).slice(8, -1) == 'Function' ? cb(data.data) : void 0;
            },
            complete: function() {
                $("#systemloading").phide()
            },
        });

    },
    queryBuildInfo: function(argu, cb) {
        // console.log(`测试数据后面需删除Start`);
        // $("#systemloading").pshow()
        // setTimeout(function() {

        //     var data = {
        //         "build_id": argu.build_id, //建筑id,saas库中建筑表id
        //         "build_code": argu.build_code, //建筑体编码，物理世界建筑id
        //         "build_local_id": "建筑本地编码", //建筑本地编码
        //         "build_local_name": "建筑本地名称", //建筑本地名称
        //         "BIMID": "BIM模型中编码", //BIM模型中编码
        //         "build_age": "建筑年代", //建筑年代
        //         "build_func_type": "建筑功能类型", //建筑功能类型
        //         "build_func_type_name": "建筑功能类型名称，页面显示", //建筑功能类型名称，页面显示
        //         "ac_type": (Math.random() * Math.pow(10, 6) >>> 0) % 4 + 1, //空调类型, 1-中央空调系统, 2-分散空调系统, 3-混合系统, 4-其他
        //         "ac_type_name": "空调类型名称，页面显示", //空调类型名称，页面显示
        //         "heat_type": "((Math.random()*Math.pow(10,6)>>>0)%4+1)%5", //采暖类型, 1-城市热网 , 2-锅炉, 3-热泵, 4-其他
        //         "heat_type_name": "采暖类型名称，页面显示", //采暖类型名称，页面显示
        //         "green_build_lev": "((Math.random()*Math.pow(10,6)>>>0)%4+1)%5", //绿建等级, 1-无, 2- 一星级, 3- 二星级 , 3- 三星级, 4-其他
        //         "green_build_lev_name": "绿建等级名称，页面显示", //绿建等级名称，页面显示
        //         "intro": "文字文字简介文字简介文字简介简介", //文字简介
        //         "picture": ["", ""], //建筑图片
        //         "design_cool_load_index": "单位面积设计冷量", //单位面积设计冷量
        //         "design_heat_load_index": "单位面积设计热量", //单位面积设计热量
        //         "design_elec_load_index": "单位面积配电设计容量", //单位面积配电设计容量
        //         "struct_type": (Math.random() * Math.pow(10, 6) >>> 0) % 4 + 1, //建筑结构类型, 1-钢筋混凝土结构, 2-钢架与玻璃幕墙, 3-砖混结构, 4-其他
        //         "struct_type_name": "", //建筑结构类型名称，页面显示
        //         "SFI": (Math.random() * Math.pow(10, 6) >>> 0) % 5 + 1, //抗震设防烈度, 1- 6度, 2- 7度, 3- 8度 ,4- 9度, 5- 其他
        //         "SFI_name": "抗震设防烈度名称，页面显示", //抗震设防烈度名称，页面显示
        //         "shape_coeff": "建筑体形系数", //建筑体形系数
        //         "build_direct": "建筑朝向", //建筑朝向
        //         "build_direct_name": "建筑朝向名称，页面显示", //建筑朝向名称，页面显示
        //         "insulate_type": (Math.random() * Math.pow(10, 6) >>> 0) % 4 + 1, //保温类型, 1-无保温, 2-内保温, 3-外保温, 4-其他
        //         "insulate_type_name": "保温类型名称，页面显示", //保温类型名称，页面显示
        //         "GFA": "建筑总面积", //建筑总面积
        //         "tot_height": "建筑总高度", //建筑总高度
        //         "cover_area": "建筑占地面积", //建筑占地面积
        //         "drawing": [ //图纸
        //             {
        //                 "type": "1",
        //                 "name": "",
        //                 "url": ""
        //             }, //附件类型，1-url，2-附件,暂时只支持url 
        //             {
        //                 "type": "1",
        //                 "name": "",
        //                 "url": ""
        //             }, {
        //                 "type": "2",
        //                 "name": "",
        //                 "key": "",
        //             }
        //         ],
        //         "archive": [ //档案
        //             {
        //                 "type": "1",
        //                 "name": "",
        //                 "url": ""
        //             }, //附件类型，1-url，2-附件,暂时只支持url   
        //             {
        //                 "type": "1",
        //                 "name": "",
        //                 "url": ""
        //             },
        //             {
        //                 "type": "2",
        //                 "name": "",
        //                 "key": ""
        //             },
        //         ],
        //         "consum_model": [ //建筑能耗模型
        //             {
        //                 "type": "1",
        //                 "name": "",
        //                 "url": ""
        //             }, //附件类型，1-url，2-附件,暂时只支持url 
        //             {
        //                 "type": "1",
        //                 "name": "",
        //                 "url": ""
        //             }, {
        //                 "type": "2",
        //                 "name": "",
        //                 "key": "",
        //             }
        //         ],
        //         "permanent_people_num": Math.random() * Math.pow(10, 2) >>> 0 //建筑常驻人数

        //     };
        //     Object.prototype.toString.call(cb).slice(8, -1) == 'Function' ? cb(data) : void 0;
        //     $("#systemloading").phide()
        // });
        // console.log(`测试数据后面需删除End`);
        // return;

        console.log(argu);

        $("#systemloading").pshow();
        pajax.post({
            url: 'restCustomerService/queryBuildInfo',
            data: argu,
            success: function(data) {
                Object.prototype.toString.call(cb).slice(8, -1) == 'Function' ? cb(data) : void 0;
            },
            complete: function() {
                $("#systemloading").phide()
            },
        });
    },
    updateBuildInfo: function(argu, cb) {


        pajax.post({
            url: 'restCustomerService/updateBuildInfo',
            data: argu,
            success: function(data) {
                $("#systempnotice").pshow({ text: "修改成功！", state: "success" });
                Object.prototype.toString.call(cb).slice(8, -1) == 'Function' ? cb(data) : void 0;
            },
            error: function() {
                $("#systempnotice").pshow({ text: "修改失败！", state: "failure" });
            }
        });
    },
    // 修改建筑体信息
    updateBuildInfoFile: function(argu, cb) {

        pajax.updateWithFile({
            url: 'restCustomerService/updateBuildInfo',
            data: argu,
            success: function(data) {
                $("#systempnotice").pshow({ text: "修改成功！", state: "success" });
                Object.prototype.toString.call(cb).slice(8, -1) == 'Function' ? cb(data) : void 0;
            },
            error: function() {
                $("#systempnotice").pshow({ text: "修改失败！", state: "failure" });
            }
        });
    },
    //查询方位信息
    queryAllDirectionCode: function(cb) {
        pajax.post({
            url: 'restDictService/queryAllDirectionCode',
            data: {},
            success: function(data) {
                Object.prototype.toString.call(cb).slice(8, -1) == 'Function' ? cb(data) : void 0;
            },
            error: function() {

            }
        });
    },
    queryBuildInfoPointHis: function(info_point_code, cb) {

        pajax.post({
            url: 'restCustomerService/queryBuildInfoPointHis',
            data: { info_point_code: info_point_code, build_code: v.instance.BuildInfo.build_code },
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
                }) : [];
                Object.prototype.toString.call(cb).slice(8, -1) == 'Function' ? cb(arr) : void 0;
            },
            error: function() {

            }
        });
    },

}