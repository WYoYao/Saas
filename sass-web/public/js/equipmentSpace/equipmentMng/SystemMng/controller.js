var controllerAddSystem = {
    updateSystemInfo: function (argu, type) {

        return new Promise(function (resolve, rejcet) {

            pajax[type ? 'updateBeforeWithFile' : 'post']({
                url: 'restSystemService/updateSystemInfo',
                data: argu,
                success: function (res) {
                    resolve(res);
                },
                error: function (errObj) {
                    rejcet(errObj)
                },
                complete: function () {}
            });
        })
    },
    querySystemInfoPointHis: function (system_id, info_point_code) {

        return new Promise(function (resolve, rejcet) {

            pajax.post({
                url: 'restSystemService/querySystemInfoPointHis',
                data: {
                    system_id: system_id,
                    info_point_code: info_point_code,
                },
                success: function (res) {
                    resolve(res);
                },
                error: function (errObj) {
                    rejcet(errObj)
                },
                complete: function () {}
            });
        })
    },
    querySystemPublicInfo: function (system_id, cb) {

        return new Promise(function (resolve, rejcet) {

            pajax.post({
                url: 'restSystemService/querySystemPublicInfo',
                data: {
                    system_id: system_id
                    //user_id: 'RY1505218031651', //用户id
                    //project_id: 'Pj1301020001', //项目id
                },
                success: function (res) {
                    resolve(res);
                },
                error: function (errObj) {
                    rejcet(errObj)
                },
                complete: function () {}
            });
        })
    },
    querySystemDynamicInfo: function (system_id) {

        return new Promise(function (resolve, reject) {

            pajax.post({
                url: 'restSystemService/querySystemDynamicInfo',
                data: {
                    system_id: system_id
                    //user_id: 'RY1505218031651', //用户id
                    //project_id: 'Pj1301020001', //项目id
                },
                success: function (res) {

                    resolve(res);
                },
                error: function (errObj) {

                    reject(errObj);
                },
                complete: function () {}
            });
        })
    },
    queryBuild: function () {

        // return new Promise(function (resolve, reject) {
        //     setTimeout(function () {

        //         resolve(_.range(10).map((item, index) => {
        //             return {
        //                 "obj_id": ++index,
        //                 "obj_name": '名称' + (index),
        //             }
        //         }))

        //     }, 300);
        // });

        return new Promise(function (resolve, reject) {

            pajax.post({
                url: 'restObjectService/queryBuild',
                data: {
                    //user_id: 'RY1505218031651', //用户id
                    //project_id: 'Pj1301020001', //项目id
                },
                success: function (res) {

                    resolve(res.data);
                },
                error: function (errObj) {

                    reject(errObj);
                },
                complete: function () {}
            });
        })
    },
    queryAllEquipCategoryPro: function () {

        // return new Promise(function (resolve) {

        //     setTimeout(function () {
        //         resolve({
        //             "data": [{
        //                     "code": "AC",
        //                     "name": "空调专业",
        //                     "content": [{
        //                             "code": "CC",
        //                             "name": "中央供冷系统",
        //                             "content": [{
        //                                     "code": "CCCC",
        //                                     "name": "离心机"
        //                                 },
        //                                 {
        //                                     "code": "CCSC",
        //                                     "name": "螺杆机"
        //                                 },
        //                                 {
        //                                     "code": "CCAC",
        //                                     "name": "吸收机"
        //                                 },
        //                                 {
        //                                     "code": "CCAH",
        //                                     "name": "空气源热泵"
        //                                 },
        //                                 {
        //                                     "code": "CCWH",
        //                                     "name": "水源热泵"
        //                                 },
        //                                 {
        //                                     "code": "CCGH",
        //                                     "name": "地源热泵"
        //                                 },
        //                                 {
        //                                     "code": "CCOT",
        //                                     "name": "冷却塔"
        //                                 },
        //                                 {
        //                                     "code": "CCCP",
        //                                     "name": "供冷冷冻水泵"
        //                                 },
        //                                 {
        //                                     "code": "CCOP",
        //                                     "name": "供冷冷却水泵"
        //                                 },
        //                                 {
        //                                     "code": "CCGP",
        //                                     "name": "供冷乙二醇泵"
        //                                 },
        //                                 {
        //                                     "code": "CCFP",
        //                                     "name": "供冷补水泵"
        //                                 },
        //                                 {
        //                                     "code": "CCCF",
        //                                     "name": "供冷定压补水装置"
        //                                 },
        //                                 {
        //                                     "code": "CCPE",
        //                                     "name": "供冷板式换热器"
        //                                 },
        //                                 {
        //                                     "code": "CCVE",
        //                                     "name": "供冷容积式换热器"
        //                                 },
        //                                 {
        //                                     "code": "CCVD",
        //                                     "name": "供冷真空脱气机"
        //                                 },
        //                                 {
        //                                     "code": "CCCD",
        //                                     "name": "供冷水加药装置"
        //                                 },
        //                                 {
        //                                     "code": "CCSD",
        //                                     "name": "供冷软化水装置"
        //                                 },
        //                                 {
        //                                     "code": "CCTU",
        //                                     "name": "供冷全程水处理仪"
        //                                 },
        //                                 {
        //                                     "code": "CCST",
        //                                     "name": "蓄冰热槽"
        //                                 },
        //                                 {
        //                                     "code": "CCDB",
        //                                     "name": "供冷分水器"
        //                                 },
        //                                 {
        //                                     "code": "CCCL",
        //                                     "name": "供冷集水器"
        //                                 }
        //                             ]
        //                         },
        //                         {
        //                             "code": "CH",
        //                             "name": "中央供热系统",
        //                             "content": [{
        //                                     "code": "CHCB",
        //                                     "name": "供热燃煤锅炉"
        //                                 },
        //                                 {
        //                                     "code": "CHFB",
        //                                     "name": "供热燃油锅炉"
        //                                 },
        //                                 {
        //                                     "code": "CHGB",
        //                                     "name": "供热燃气锅炉"
        //                                 },
        //                                 {
        //                                     "code": "CHEB",
        //                                     "name": "供热电锅炉"
        //                                 },
        //                                 {
        //                                     "code": "CHHP",
        //                                     "name": "供热水泵"
        //                                 },
        //                                 {
        //                                     "code": "CHFP",
        //                                     "name": "供热补水泵"
        //                                 },
        //                                 {
        //                                     "code": "CHCF",
        //                                     "name": "供热定压补水装置"
        //                                 },
        //                                 {
        //                                     "code": "CHPE",
        //                                     "name": "供热板式换热器"
        //                                 },
        //                                 {
        //                                     "code": "CHVE",
        //                                     "name": "供热容积式换热器"
        //                                 },
        //                                 {
        //                                     "code": "CHVD",
        //                                     "name": "供热真空脱气机"
        //                                 },
        //                                 {
        //                                     "code": "CHCD",
        //                                     "name": "供热水加药装置"
        //                                 },
        //                                 {
        //                                     "code": "CHSD",
        //                                     "name": "供热软化水装置"
        //                                 },
        //                                 {
        //                                     "code": "CHTU",
        //                                     "name": "供热全程水处理仪"
        //                                 },
        //                                 {
        //                                     "code": "CHDB",
        //                                     "name": "供热分水器"
        //                                 },
        //                                 {
        //                                     "code": "CHCL",
        //                                     "name": "供热集水器"
        //                                 }
        //                             ]
        //                         },
        //                         {
        //                             "code": "AT",
        //                             "name": "空调末端系统",
        //                             "content": [{
        //                                     "code": "ATAH",
        //                                     "name": "空调机组"
        //                                 },
        //                                 {
        //                                     "code": "ATFH",
        //                                     "name": "新风机组"
        //                                 },
        //                                 {
        //                                     "code": "ATFC",
        //                                     "name": "风机盘管"
        //                                 },
        //                                 {
        //                                     "code": "ATSA",
        //                                     "name": "分体空调"
        //                                 },
        //                                 {
        //                                     "code": "ATVR",
        //                                     "name": "变频多联机"
        //                                 },
        //                                 {
        //                                     "code": "ATVA",
        //                                     "name": "VAVBOX"
        //                                 },
        //                                 {
        //                                     "code": "ATFA",
        //                                     "name": "地板空调器"
        //                                 },
        //                                 {
        //                                     "code": "ATIO",
        //                                     "name": "空调风口"
        //                                 },
        //                                 {
        //                                     "code": "ATRD",
        //                                     "name": "散热器"
        //                                 },
        //                                 {
        //                                     "code": "ATFH",
        //                                     "name": "地板采暖设备"
        //                                 }
        //                             ]
        //                         },
        //                         {
        //                             "code": "VT",
        //                             "name": "通风系统",
        //                             "content": [{
        //                                     "code": "VTSF",
        //                                     "name": "通风送风机"
        //                                 },
        //                                 {
        //                                     "code": "VTEF",
        //                                     "name": "通风排风机"
        //                                 },
        //                                 {
        //                                     "code": "VTIF",
        //                                     "name": "通风诱导风机"
        //                                 },
        //                                 {
        //                                     "code": "VTAC",
        //                                     "name": "热风幕"
        //                                 },
        //                                 {
        //                                     "code": "VTAP",
        //                                     "name": "空气净化器"
        //                                 },
        //                                 {
        //                                     "code": "VTDO",
        //                                     "name": "除味装置"
        //                                 },
        //                                 {
        //                                     "code": "VTIO",
        //                                     "name": "通风风口"
        //                                 }
        //                             ]
        //                         },
        //                         {
        //                             "code": "AD",
        //                             "name": "空调人防系统",
        //                             "content": [{
        //                                     "code": "ADEF",
        //                                     "name": "人防排风机"
        //                                 },
        //                                 {
        //                                     "code": "ADFD",
        //                                     "name": "滤毒除湿机"
        //                                 },
        //                                 {
        //                                     "code": "ADIO",
        //                                     "name": "人防风口"
        //                                 }
        //                             ]
        //                         },
        //                         {
        //                             "code": "KL",
        //                             "name": "厨房排油烟系统",
        //                             "content": [{
        //                                     "code": "KLSF",
        //                                     "name": "厨房送风机"
        //                                 },
        //                                 {
        //                                     "code": "KLEF",
        //                                     "name": "厨房排风机"
        //                                 },
        //                                 {
        //                                     "code": "KLAP",
        //                                     "name": "油烟净化器"
        //                                 },
        //                                 {
        //                                     "code": "KLIO",
        //                                     "name": "厨房风口"
        //                                 }
        //                             ]
        //                         }
        //                     ]
        //                 },
        //                 {
        //                     "code": "WS",
        //                     "name": "给排水专业",
        //                     "content": [{
        //                             "code": "WS",
        //                             "name": "水景系统",
        //                             "content": [{
        //                                     "code": "WSCF",
        //                                     "name": "水景循环过滤机组"
        //                                 },
        //                                 {
        //                                     "code": "WSSN",
        //                                     "name": "水景喷头"
        //                                 },
        //                                 {
        //                                     "code": "WSCU",
        //                                     "name": "水景控制器"
        //                                 },
        //                                 {
        //                                     "code": "WSLT",
        //                                     "name": "水景灯具"
        //                                 }
        //                             ]
        //                         },
        //                         {
        //                             "code": "SI",
        //                             "name": "喷灌系统",
        //                             "content": [{
        //                                     "code": "SISU",
        //                                     "name": "喷灌机组"
        //                                 },
        //                                 {
        //                                     "code": "SISN",
        //                                     "name": "喷灌喷头"
        //                                 },
        //                                 {
        //                                     "code": "SICU",
        //                                     "name": "喷灌控制器"
        //                                 }
        //                             ]
        //                         },
        //                         {
        //                             "code": "ST",
        //                             "name": "污水处理系统",
        //                             "content": [{
        //                                     "code": "STLU",
        //                                     "name": "污废水一体式提升机组"
        //                                 },
        //                                 {
        //                                     "code": "STSP",
        //                                     "name": "潜污泵"
        //                                 },
        //                                 {
        //                                     "code": "STOR",
        //                                     "name": "餐饮除油成套设备"
        //                                 },
        //                                 {
        //                                     "code": "STST",
        //                                     "name": "化粪池"
        //                                 }
        //                             ]
        //                         },
        //                         {
        //                             "code": "DH",
        //                             "name": "生活热水系统",
        //                             "content": [{
        //                                     "code": "DHCB",
        //                                     "name": "热水燃煤锅炉"
        //                                 },
        //                                 {
        //                                     "code": "DHFB",
        //                                     "name": "热水燃油锅炉"
        //                                 },
        //                                 {
        //                                     "code": "DHGB",
        //                                     "name": "热水燃气锅炉"
        //                                 },
        //                                 {
        //                                     "code": "DHEB",
        //                                     "name": "热水电锅炉"
        //                                 },
        //                                 {
        //                                     "code": "DHGH",
        //                                     "name": "燃气热水器"
        //                                 },
        //                                 {
        //                                     "code": "DHEH",
        //                                     "name": "电热水器"
        //                                 },
        //                                 {
        //                                     "code": "DHSC",
        //                                     "name": "太阳能集热器"
        //                                 },
        //                                 {
        //                                     "code": "DHHA",
        //                                     "name": "辅热设备"
        //                                 },
        //                                 {
        //                                     "code": "DHPE",
        //                                     "name": "热水板式换热器"
        //                                 },
        //                                 {
        //                                     "code": "DHVE",
        //                                     "name": "热水容积式换热器"
        //                                 },
        //                                 {
        //                                     "code": "DHHP",
        //                                     "name": "生活热水水泵"
        //                                 },
        //                                 {
        //                                     "code": "DHWT",
        //                                     "name": "热水储水箱"
        //                                 }
        //                             ]
        //                         },
        //                         {
        //                             "code": "RW",
        //                             "name": "中水系统",
        //                             "content": [{
        //                                     "code": "RWSU",
        //                                     "name": "中水给水供水机组"
        //                                 },
        //                                 {
        //                                     "code": "RHTU",
        //                                     "name": "中水处理机组"
        //                                 },
        //                                 {
        //                                     "code": "RHWT",
        //                                     "name": "中水储水箱"
        //                                 },
        //                                 {
        //                                     "code": "RHRC",
        //                                     "name": "雨水收集设备"
        //                                 }
        //                             ]
        //                         },
        //                         {
        //                             "code": "DD",
        //                             "name": "直饮水系统",
        //                             "content": [{
        //                                     "code": "DDTU",
        //                                     "name": "直饮水处理机组"
        //                                 },
        //                                 {
        //                                     "code": "DDIH",
        //                                     "name": "即时加热器"
        //                                 }
        //                             ]
        //                         },
        //                         {
        //                             "code": "WD",
        //                             "name": "给排水人防系统",
        //                             "content": [{
        //                                 "code": "WDWT",
        //                                 "name": "人防储水箱"
        //                             }]
        //                         },
        //                         {
        //                             "code": "WH",
        //                             "name": "给排水电伴热系统",
        //                             "content": [{
        //                                     "code": "WHTC",
        //                                     "name": "给排水伴热电缆"
        //                                 },
        //                                 {
        //                                     "code": "WHIB",
        //                                     "name": "给排水伴热保温器"
        //                                 },
        //                                 {
        //                                     "code": "WHCU",
        //                                     "name": "给排水伴热控制器"
        //                                 }
        //                             ]
        //                         },
        //                         {
        //                             "code": "DW",
        //                             "name": "生活给水系统",
        //                             "content": [{
        //                                     "code": "DWSU",
        //                                     "name": "生活给水供水机组"
        //                                 },
        //                                 {
        //                                     "code": "DWTS",
        //                                     "name": "生活给水水箱消毒器"
        //                                 },
        //                                 {
        //                                     "code": "DWUS",
        //                                     "name": "生活给水紫外线消毒器"
        //                                 },
        //                                 {
        //                                     "code": "DWWT",
        //                                     "name": "生活给水储水箱"
        //                                 }
        //                             ]
        //                         },
        //                         {
        //                             "code": "WP",
        //                             "name": "泳池系统",
        //                             "content": [{
        //                                 "code": "WPCF",
        //                                 "name": "泳池循环过滤机组"
        //                             }]
        //                         },
        //                         {
        //                             "code": "FG",
        //                             "name": "燃气系统",
        //                             "content": [{
        //                                     "code": "FGPA",
        //                                     "name": "燃气调压箱"
        //                                 },
        //                                 {
        //                                     "code": "FGLP",
        //                                     "name": "液化石油气瓶"
        //                                 }
        //                             ]
        //                         }
        //                     ]
        //                 },
        //                 {
        //                     "code": "FF",
        //                     "name": "消防专业",
        //                     "content": [{
        //                             "code": "GA",
        //                             "name": "燃气报警系统",
        //                             "content": [{
        //                                     "code": "GAHT",
        //                                     "name": "燃气报警主机"
        //                                 },
        //                                 {
        //                                     "code": "GASE",
        //                                     "name": "燃气探测器"
        //                                 },
        //                                 {
        //                                     "code": "GACV",
        //                                     "name": "燃气切断阀"
        //                                 }
        //                             ]
        //                         },
        //                         {
        //                             "code": "SC",
        //                             "name": "防排烟系统",
        //                             "content": [{
        //                                     "code": "SCEF",
        //                                     "name": "排烟风机"
        //                                 },
        //                                 {
        //                                     "code": "SCFF",
        //                                     "name": "排烟补风机"
        //                                 },
        //                                 {
        //                                     "code": "SCAF",
        //                                     "name": "事故排风机"
        //                                 },
        //                                 {
        //                                     "code": "SCIO",
        //                                     "name": "排烟风口"
        //                                 },
        //                                 {
        //                                     "code": "SCEV",
        //                                     "name": "排烟阀"
        //                                 },
        //                                 {
        //                                     "code": "SCFV",
        //                                     "name": "防火阀"
        //                                 }
        //                             ]
        //                         },
        //                         {
        //                             "code": "EA",
        //                             "name": "漏电火灾报警系统",
        //                             "content": [{
        //                                     "code": "EAHT",
        //                                     "name": "漏电火灾报警主机"
        //                                 },
        //                                 {
        //                                     "code": "EALS",
        //                                     "name": "漏电探测器"
        //                                 },
        //                                 {
        //                                     "code": "EAIS",
        //                                     "name": "电流探测器"
        //                                 },
        //                                 {
        //                                     "code": "EATS",
        //                                     "name": "温度探测器"
        //                                 }
        //                             ]
        //                         },
        //                         {
        //                             "code": "GE",
        //                             "name": "气体灭火系统",
        //                             "content": [{
        //                                     "code": "GEBG",
        //                                     "name": "气体灭火瓶组"
        //                                 },
        //                                 {
        //                                     "code": "GESB",
        //                                     "name": "气体灭火启动瓶"
        //                                 },
        //                                 {
        //                                     "code": "GECU",
        //                                     "name": "气体灭火控制器"
        //                                 },
        //                                 {
        //                                     "code": "GESN",
        //                                     "name": "气体灭火喷头"
        //                                 }
        //                             ]
        //                         },
        //                         {
        //                             "code": "FE",
        //                             "name": "灭火器系统",
        //                             "content": [{
        //                                 "code": "FEFE",
        //                                 "name": "灭火器"
        //                             }]
        //                         },
        //                         {
        //                             "code": "BM",
        //                             "name": "紧急广播及背景音乐系统",
        //                             "content": [{
        //                                     "code": "BMFE",
        //                                     "name": "广播前端设备"
        //                                 },
        //                                 {
        //                                     "code": "BMCU",
        //                                     "name": "广播分区控制器"
        //                                 },
        //                                 {
        //                                     "code": "BMSP",
        //                                     "name": "扬声器"
        //                                 }
        //                             ]
        //                         },
        //                         {
        //                             "code": "FS",
        //                             "name": "消防给水系统",
        //                             "content": [{
        //                                     "code": "FSHP",
        //                                     "name": "消火栓供水加压泵"
        //                                 },
        //                                 {
        //                                     "code": "FSSP",
        //                                     "name": "喷淋供水加压泵"
        //                                 },
        //                                 {
        //                                     "code": "FSMP",
        //                                     "name": "水喷雾供水加压泵"
        //                                 },
        //                                 {
        //                                     "code": "FSAP",
        //                                     "name": "停机坪消防供水加压泵"
        //                                 },
        //                                 {
        //                                     "code": "FSWM",
        //                                     "name": "消防水炮设备"
        //                                 },
        //                                 {
        //                                     "code": "FSPS",
        //                                     "name": "消防稳压设备"
        //                                 },
        //                                 {
        //                                     "code": "FSFT",
        //                                     "name": "泡沫储罐组"
        //                                 },
        //                                 {
        //                                     "code": "FSAC",
        //                                     "name": "空压机"
        //                                 },
        //                                 {
        //                                     "code": "FSWV",
        //                                     "name": "湿式报警阀组"
        //                                 },
        //                                 {
        //                                     "code": "FSDV",
        //                                     "name": "干式报警阀组"
        //                                 },
        //                                 {
        //                                     "code": "FSPV",
        //                                     "name": "预作用报警阀组"
        //                                 },
        //                                 {
        //                                     "code": "FSHB",
        //                                     "name": "消火栓箱"
        //                                 },
        //                                 {
        //                                     "code": "FSOH",
        //                                     "name": "室外消火栓"
        //                                 },
        //                                 {
        //                                     "code": "FSPC",
        //                                     "name": "水泵接合器"
        //                                 },
        //                                 {
        //                                     "code": "FSTC",
        //                                     "name": "消防伴热电缆"
        //                                 },
        //                                 {
        //                                     "code": "FSET",
        //                                     "name": "末端试水装置"
        //                                 }
        //                             ]
        //                         },
        //                         {
        //                             "code": "FR",
        //                             "name": "防火卷帘门系统",
        //                             "content": [{
        //                                 "code": "FRFR",
        //                                 "name": "防火卷帘门"
        //                             }]
        //                         },
        //                         {
        //                             "code": "FA",
        //                             "name": "火灾报警系统",
        //                             "content": [{
        //                                     "code": "FAHT",
        //                                     "name": "火灾报警主机"
        //                                 },
        //                                 {
        //                                     "code": "FADS",
        //                                     "name": "火灾报警显示屏"
        //                                 },
        //                                 {
        //                                     "code": "FALP",
        //                                     "name": "联动琴台"
        //                                 },
        //                                 {
        //                                     "code": "FASE",
        //                                     "name": "火灾探测器"
        //                                 },
        //                                 {
        //                                     "code": "FAAL",
        //                                     "name": "声光报警器"
        //                                 }
        //                             ]
        //                         }
        //                     ]
        //                 },
        //                 {
        //                     "code": "SE",
        //                     "name": "强电专业",
        //                     "content": [{
        //                             "code": "LT",
        //                             "name": "照明系统",
        //                             "content": [{
        //                                     "code": "LTLT",
        //                                     "name": "照明灯具"
        //                                 },
        //                                 {
        //                                     "code": "LTLS",
        //                                     "name": "照明低压开关柜"
        //                                 }
        //                             ]
        //                         },
        //                         {
        //                             "code": "TP",
        //                             "name": "租户配电系统",
        //                             "content": [{
        //                                     "code": "TPLS",
        //                                     "name": "租户低压开关柜"
        //                                 },
        //                                 {
        //                                     "code": "TPBP",
        //                                     "name": "租户母线插接箱"
        //                                 }
        //                             ]
        //                         },
        //                         {
        //                             "code": "TD",
        //                             "name": "变配电系统",
        //                             "content": [{
        //                                     "code": "TDTF",
        //                                     "name": "变压器"
        //                                 },
        //                                 {
        //                                     "code": "TDHS",
        //                                     "name": "高压开关柜"
        //                                 },
        //                                 {
        //                                     "code": "TDLS",
        //                                     "name": "变配电低压开关柜"
        //                                 },
        //                                 {
        //                                     "code": "TDDS",
        //                                     "name": "直流屏"
        //                                 },
        //                                 {
        //                                     "code": "TDBP",
        //                                     "name": "变配电母线插接箱"
        //                                 }
        //                             ]
        //                         },
        //                         {
        //                             "code": "DG",
        //                             "name": "柴发机房系统",
        //                             "content": [{
        //                                     "code": "DGDG",
        //                                     "name": "柴油发电机"
        //                                 },
        //                                 {
        //                                     "code": "DGLS",
        //                                     "name": "柴发低压开关柜"
        //                                 }
        //                             ]
        //                         },
        //                         {
        //                             "code": "SD",
        //                             "name": "强电人防系统",
        //                             "content": [{
        //                                 "code": "SDLS",
        //                                 "name": "人防低压开关柜"
        //                             }]
        //                         },
        //                         {
        //                             "code": "BP",
        //                             "name": "备用电源系统",
        //                             "content": [{
        //                                     "code": "BPBP",
        //                                     "name": "备用电源"
        //                                 },
        //                                 {
        //                                     "code": "BPLS",
        //                                     "name": "备用电源低压开关柜"
        //                                 },
        //                                 {
        //                                     "code": "BPSP",
        //                                     "name": "太阳能电池板"
        //                                 },
        //                                 {
        //                                     "code": "BPWG",
        //                                     "name": "风力发电装置"
        //                                 }
        //                             ]
        //                         },
        //                         {
        //                             "code": "EP",
        //                             "name": "机房动力系统",
        //                             "content": [{
        //                                 "code": "EPLS",
        //                                 "name": "机房动力低压开关柜"
        //                             }]
        //                         },
        //                         {
        //                             "code": "OP",
        //                             "name": "室外动力系统",
        //                             "content": [{
        //                                 "code": "OPLS",
        //                                 "name": "室外动力低压开关柜"
        //                             }]
        //                         },
        //                         {
        //                             "code": "EL",
        //                             "name": "电梯系统",
        //                             "content": [{
        //                                     "code": "ELEL",
        //                                     "name": "直梯"
        //                                 },
        //                                 {
        //                                     "code": "ELES",
        //                                     "name": "扶梯"
        //                                 },
        //                                 {
        //                                     "code": "ELLS",
        //                                     "name": "电梯低压开关柜"
        //                                 }
        //                             ]
        //                         }
        //                     ]
        //                 },
        //                 {
        //                     "code": "SP",
        //                     "name": "安防专业",
        //                     "content": [{
        //                             "code": "VS",
        //                             "name": "视频监控系统",
        //                             "content": [{
        //                                     "code": "VSHT",
        //                                     "name": "监控主机"
        //                                 },
        //                                 {
        //                                     "code": "VSCM",
        //                                     "name": "监控摄像头"
        //                                 },
        //                                 {
        //                                     "code": "VSFE",
        //                                     "name": "监控前端设备"
        //                                 },
        //                                 {
        //                                     "code": "VSVM",
        //                                     "name": "监视器"
        //                                 },
        //                                 {
        //                                     "code": "VSDR",
        //                                     "name": "硬盘录像机"
        //                                 }
        //                             ]
        //                         },
        //                         {
        //                             "code": "EG",
        //                             "name": "门禁系统",
        //                             "content": [{
        //                                     "code": "EGCU",
        //                                     "name": "门禁控制器"
        //                                 },
        //                                 {
        //                                     "code": "EGCR",
        //                                     "name": "门禁读卡器"
        //                                 },
        //                                 {
        //                                     "code": "EGFG",
        //                                     "name": "速通门"
        //                                 }
        //                             ]
        //                         },
        //                         {
        //                             "code": "IA",
        //                             "name": "入侵报警系统",
        //                             "content": [{
        //                                     "code": "IAHT",
        //                                     "name": "入侵报警主机"
        //                                 },
        //                                 {
        //                                     "code": "IASE",
        //                                     "name": "入侵报警探测器"
        //                                 }
        //                             ]
        //                         },
        //                         {
        //                             "code": "NP",
        //                             "name": "巡更系统",
        //                             "content": [{
        //                                     "code": "NPHT",
        //                                     "name": "巡更主机"
        //                                 },
        //                                 {
        //                                     "code": "NPCU",
        //                                     "name": "巡更通讯座"
        //                                 },
        //                                 {
        //                                     "code": "NPPS",
        //                                     "name": "巡更棒"
        //                                 }
        //                             ]
        //                         }
        //                     ]
        //                 },
        //                 {
        //                     "code": "OT",
        //                     "name": "其他",
        //                     "content": [{
        //                             "code": "AE",
        //                             "name": "执行器",
        //                             "content": [{
        //                                     "code": "AEOV",
        //                                     "name": "通断阀"
        //                                 },
        //                                 {
        //                                     "code": "AEAV",
        //                                     "name": "调节阀"
        //                                 },
        //                                 {
        //                                     "code": "AECV",
        //                                     "name": "止回阀"
        //                                 },
        //                                 {
        //                                     "code": "AERV",
        //                                     "name": "减压阀"
        //                                 },
        //                                 {
        //                                     "code": "AESV",
        //                                     "name": "安全阀"
        //                                 },
        //                                 {
        //                                     "code": "AERL",
        //                                     "name": "继电器"
        //                                 },
        //                                 {
        //                                     "code": "AEFC",
        //                                     "name": "变频器"
        //                                 }
        //                             ]
        //                         },
        //                         {
        //                             "code": "TL",
        //                             "name": "工具",
        //                             "content": []
        //                         },
        //                         {
        //                             "code": "SE",
        //                             "name": "传感器",
        //                             "content": [{
        //                                     "code": "SETP",
        //                                     "name": "温度传感器"
        //                                 },
        //                                 {
        //                                     "code": "SERH",
        //                                     "name": "湿度传感器"
        //                                 },
        //                                 {
        //                                     "code": "SEPS",
        //                                     "name": "压力传感器"
        //                                 },
        //                                 {
        //                                     "code": "SECT",
        //                                     "name": "浓度传感器"
        //                                 },
        //                                 {
        //                                     "code": "SESP",
        //                                     "name": "速度传感器"
        //                                 },
        //                                 {
        //                                     "code": "SEFL",
        //                                     "name": "流量传感器"
        //                                 },
        //                                 {
        //                                     "code": "SEDP",
        //                                     "name": "位移传感器"
        //                                 },
        //                                 {
        //                                     "code": "SEEE",
        //                                     "name": "电度表"
        //                                 },
        //                                 {
        //                                     "code": "SESD",
        //                                     "name": "声音传感器"
        //                                 },
        //                                 {
        //                                     "code": "SEHT",
        //                                     "name": "热量传感器"
        //                                 },
        //                                 {
        //                                     "code": "SEVD",
        //                                     "name": "图像传感器"
        //                                 }
        //                             ]
        //                         },
        //                         {
        //                             "code": "PW",
        //                             "name": "管网",
        //                             "content": [{
        //                                     "code": "PWSE",
        //                                     "name": "强电线路"
        //                                 },
        //                                 {
        //                                     "code": "PWWE",
        //                                     "name": "弱电线路"
        //                                 },
        //                                 {
        //                                     "code": "PWGS",
        //                                     "name": "气体管道"
        //                                 },
        //                                 {
        //                                     "code": "PWLQ",
        //                                     "name": "液体管道"
        //                                 }
        //                             ]
        //                         }
        //                     ]
        //                 },
        //                 {
        //                     "code": "WE",
        //                     "name": "弱电专业",
        //                     "content": [{
        //                             "code": "MI",
        //                             "name": "多媒体信息发布系统",
        //                             "content": [{
        //                                     "code": "MIHT",
        //                                     "name": "多媒体主机"
        //                                 },
        //                                 {
        //                                     "code": "MIPL",
        //                                     "name": "播放器"
        //                                 },
        //                                 {
        //                                     "code": "MILS",
        //                                     "name": "LED大屏"
        //                                 },
        //                                 {
        //                                     "code": "MIDS",
        //                                     "name": "多媒体显示屏"
        //                                 },
        //                                 {
        //                                     "code": "MIST",
        //                                     "name": "自助终端机"
        //                                 }
        //                             ]
        //                         },
        //                         {
        //                             "code": "BA",
        //                             "name": "楼宇自控系统",
        //                             "content": [{
        //                                     "code": "BAHT",
        //                                     "name": "楼控主机"
        //                                 },
        //                                 {
        //                                     "code": "BANC",
        //                                     "name": "楼控网络控制器"
        //                                 }
        //                             ]
        //                         },
        //                         {
        //                             "code": "WT",
        //                             "name": "无线对讲系统",
        //                             "content": [{
        //                                     "code": "WTWT",
        //                                     "name": "对讲机"
        //                                 },
        //                                 {
        //                                     "code": "WTRS",
        //                                     "name": "中继台"
        //                                 }
        //                             ]
        //                         },
        //                         {
        //                             "code": "LN",
        //                             "name": "本地网络系统",
        //                             "content": [{
        //                                     "code": "LNRT",
        //                                     "name": "路由器"
        //                                 },
        //                                 {
        //                                     "code": "LNEX",
        //                                     "name": "交换机"
        //                                 },
        //                                 {
        //                                     "code": "LNHF",
        //                                     "name": "硬件防火墙"
        //                                 }
        //                             ]
        //                         },
        //                         {
        //                             "code": "GM",
        //                             "name": "车库管理系统",
        //                             "content": [{
        //                                     "code": "GMHT",
        //                                     "name": "车库主机"
        //                                 },
        //                                 {
        //                                     "code": "GMNC",
        //                                     "name": "车库网络控制器"
        //                                 },
        //                                 {
        //                                     "code": "GMCM",
        //                                     "name": "车库摄像头"
        //                                 },
        //                                 {
        //                                     "code": "GMDS",
        //                                     "name": "车库显示屏"
        //                                 },
        //                                 {
        //                                     "code": "GMGT",
        //                                     "name": "进出闸机"
        //                                 },
        //                                 {
        //                                     "code": "GMMP",
        //                                     "name": "机械车位"
        //                                 },
        //                                 {
        //                                     "code": "GMCP",
        //                                     "name": "充电桩"
        //                                 }
        //                             ]
        //                         },
        //                         {
        //                             "code": "TV",
        //                             "name": "电视信号系统",
        //                             "content": [{
        //                                 "code": "TVFE",
        //                                 "name": "电视前端设备"
        //                             }]
        //                         }
        //                     ]
        //                 }
        //             ]
        //         }.data);
        //     }, 10);
        // })

        return new Promise(function (resolve, reject) {

            pajax.post({
                url: 'restDictService/queryAllEquipCategory',
                data: {

                },
                success: function (res) {
                    resolve(res.data);
                },
                error: function (errObj) {

                    reject(errObj);
                },
                complete: function () {}
            });
        })
    },
    querySystemDynamicInfoForAdd: function (system_category) {

        return new Promise(function (resolve, reject) {

            pajax.post({
                url: 'restSystemService/querySystemDynamicInfoForAdd',
                data: {
                    system_category: system_category
                },
                success: function (res) {
                    resolve(res.data);
                },
                error: function (err) {

                    reject(err);
                },
                complete: function () {}
            });
        })
    },
    addSystem: function (argu) {

        return new Promise(function (resolve, reject) {

            pajax.post({
                url: 'restSystemService/addSystem',
                data: argu,
                success: function (res) {
                    $('#globalnotice').pshow({
                        text: '保存成功',
                        state: 'success'
                    });
                    resolve(res.data);
                },
                error: function (err) {
                    $('#globalnotice').pshow({
                        text: '保存失败',
                        state: 'failure'
                    });
                    reject(err);
                },
                complete: function () {}
            });
        })
    },
    verifySystemName: function (argu) {

        return new Promise(function (resolve, reject) {

            pajax.post({
                url: 'restSystemService/verifySystemName',
                data: argu,
                success: function (res) {

                    if (_.isArray(res) && res.length) {
                        resolve(res[0]);
                    } else {

                        resolve({
                            can_use: false,
                        });
                    }
                },
                error: function (err) {

                    reject(err);
                },
                complete: function () {}
            });
        })
    },
    verifySystemLocalId: function (argu) {

        return new Promise(function (resolve, reject) {

            pajax.post({
                url: 'restSystemService/verifySystemLocalId',
                data: argu,
                success: function (res) {

                    if (_.isArray(res) && res.length) {
                        resolve(res[0]);
                    } else {

                        resolve({
                            can_use: false,
                        });
                    }
                },
                error: function (err) {

                    reject(err);
                },
                complete: function () {}
            });
        })
    },
    verifySystemBimId: function (argu) {

        return new Promise(function (resolve, reject) {

            pajax.post({
                url: 'restSystemService/verifySystemBimId',
                data: argu,
                success: function (res) {

                    if (_.isArray(res) && res.length) {
                        resolve(res[0]);
                    } else {

                        resolve({
                            can_use: false,
                        });
                    }
                },
                error: function (err) {

                    reject(err);
                },
                complete: function () {}
            });
        })
    },

}
controllerAddSystem.init = function () {
    v.initPage("systemMng");

}
controllerAddSystem.queryAllEquipCategory = function (cb) { //查询专业-系统类型-设备类型

    pajax.post({
        url: 'restDictService/queryAllEquipCategory',
        data: {
            //user_id: 'RY1505218031651', //用户id
            //project_id: 'Pj1301020001', //项目id
        },
        success: function (res) {

            var data = res.data || [];
            v.instance.majorTypeArr = v.instance.majorTypeArr.concat(data); //专业列表

        },
        error: function (errObj) {
            console.error('queryAllEquipCategory err');
        },
        complete: function () {}
    });
};
controllerAddSystem.queryBuildSystemTree = function (argu, cb) { //查询建筑-系统列表树


    // setTimeout(function () {
    //     cb(_.range(10).map((item, index) => {

    //         return {
    //             build_id: `build_id${index}`,
    //             build_name: `build_name${index}`,
    //             system: _.range(5).map((item, index) => {
    //                 return {
    //                     system_id: `system_id${index}`,
    //                     system_local_id: `system_local_id${index}`,
    //                     system_local_name: `system_local_name${index}`,
    //                 }
    //             })
    //         }
    //     }))
    // }, 10);
    // return;

    pajax.post({
        url: 'restSystemService/queryBuildSystemTree',
        data: argu,
        success: function (res) {
            var data = res.data || [];
            cb(data);
        },
        error: function (errObj) {
            console.error('queryBuildSystemTree err');
        },
        complete: function () {}
    });
};