var equipmentMngDeatilController = {
    queryEquipDynamicInfo: function(equip_id) {

        return new Promise(function(resolve, reject) {

            setTimeout(function() {
                resolve([{
                        "info_Points": [{
                                "cmpt": "A1",
                                "cmpt_data": [

                                ],
                                "data_type": "Str",
                                "info_code": "DesignEvapWaterInTemp",
                                "info_name": "设计蒸发器入 口水温",
                                "str_value": "1",
                                "unit": "℃"
                            }, {
                                "cmpt": "SD11",
                                "cmpt_data": [{
                                        "code": "1",
                                        "name": "220V"
                                    },
                                    {
                                        "code": "2",
                                        "name": "380V"
                                    },
                                    {
                                        "code": "3",
                                        "name": "10kV"
                                    },
                                    {
                                        "code": "4 ",
                                        "name": "其他"
                                    }
                                ],
                                "data_type": "Str",
                                "info_code": "PowerType",
                                "info_name": "电源类型",
                                "str_value": "1",
                                "unit": ""
                            }, {
                                "cmpt": "SD12",
                                "cmpt_data": [{
                                        "code": "1",
                                        "name": "220V"
                                    },
                                    {
                                        "code": "2",
                                        "name": "380V"
                                    },
                                    {
                                        "code": "3",
                                        "name": "10kV"
                                    },
                                    {
                                        "code": "4 ",
                                        "name": "其他"
                                    }
                                ],
                                "data_type": "StrArr",
                                "info_code": "PowerType",
                                "info_name": "电源类型",
                                "str_arr_value": ['1', '3'],
                                "unit": ""
                            },
                            {
                                "cmpt": "A1",
                                "cmpt_data": [

                                ],
                                "data_type": "Str",
                                "info_code": "DesignEvapWaterOutTemp",
                                "info_name": "设计蒸发器出口水温",
                                "str_value": "2",
                                "unit": "℃"
                            },
                            {
                                "cmpt": "A1",
                                "cmp t_data": [

                                ],
                                "data_type": "Str",
                                "info_code": "DesignChillWaterFlow",
                                "info_name": "额定蒸发器冷冻水流量",
                                "str_value": "1",
                                "unit": "m3/h"
                            },
                            {
                                "cmpt": "A1",
                                "cmpt_data": [

                                ],
                                "data_type": "Str",
                                "info_code": "EvapWaterH eatTransArea",
                                "info_name": "蒸发器水侧换热面积",
                                "str_value": "2",
                                "unit": "m2"
                            },
                            {
                                "cmpt": "A1",
                                "cmpt_data": [

                                ],
                                "data_type": "Str",
                                "info_code": "RatedEvapTemp",
                                "info_name": "额定蒸发温度",
                                "str_value": "2",
                                "unit": "℃"
                            },
                            {
                                "cmpt": "A1",
                                "cmpt_data": [

                                ],
                                "data_type": "Str",
                                "info_code": "RatedEvapPress",
                                "info_name": "额定蒸发压力",
                                "str_value": "1",
                                "unit": "MPa"
                            },
                            {
                                "cmpt": "A1",
                                "cmpt_data": [

                                ],
                                "data_type": "Str",
                                "info_code": "E vapPunctureTestPress",
                                "info_name": "蒸发器耐压试验压力",
                                "str_value": "2",
                                "unit": "MPa"
                            },
                            {
                                "cmpt": "A1",
                                "cmpt_data": [

                                ],
                                "data_type": "Str",
                                "info_code": "EvapMaxAllowPress",
                                "info_name": "蒸发器最高允许工作压力",
                                "str_value": "1",
                                "unit": "MPa"
                            }
                        ],
                        "tag": "蒸发器"
                    },
                    {
                        "info_Points": [{
                                "cmpt": "A1",
                                "cmpt_data": [

                                ],
                                "data_type": "Str",
                                "info_code": "CompressStage",
                                "info_name": "压缩级数",
                                "str_value": "2",
                                "unit": "级"
                            },
                            {
                                "cmpt": " SD1",
                                "cmpt_data": [{
                                        "code": "1",
                                        "name": "角转子"
                                    },
                                    {
                                        "code": "2",
                                        "name": "酶标转子"
                                    },
                                    {
                                        "code": "3",
                                        "name": "间歇转子"
                                    },
                                    {
                                        "code": "4",
                                        "name": "水平转子"
                                    },
                                    {
                                        "code": "5",
                                        "name": "连续流转子"
                                    },
                                    {
                                        "code": "6",
                                        "name": "其他"
                                    }
                                ],
                                "data_type": "Str",
                                "info_code": "RotorType",
                                "info_name": "转子类型",
                                "str_value": "1",
                                "unit": ""
                            },
                            {
                                "cmpt": "A1",
                                "cmpt_data": [

                                ],
                                "data_type": "Str",
                                "info_code": "MaxRPM",
                                "info_name": "最大转速",
                                "str_value": "",
                                "unit": "r/min"
                            },
                            {
                                "cmpt": "A1",
                                "cmpt_data": [

                                ],
                                "data_type": "Str",
                                "info_code": "MaxCentrifugalF",
                                "info_name": "最大离心力",
                                "str_value": "",
                                "unit": "N"
                            }
                        ],
                        "tag": "压缩机"
                    },
                    {
                        "info_Points": [{
                                "cmpt": "SD1",
                                "cmpt_da ta": [{
                                        "code": "1",
                                        "name": "手动膨胀阀"
                                    },
                                    {
                                        "code": "2",
                                        "name": "热力膨胀阀"
                                    },
                                    {
                                        "code": "3",
                                        "name": "电子膨胀阀"
                                    },
                                    {
                                        "code": "4",
                                        "name": "浮球节流阀"
                                    },
                                    {
                                        "code": "5",
                                        "name": "节流孔板"
                                    },
                                    {
                                        "code": "6",
                                        "name": "毛细管"
                                    },
                                    {
                                        " code": "7",
                                        "name": "其他"
                                    }
                                ],
                                "data_type": "Str",
                                "info_code": "ValveType",
                                "info_name": "节流阀种类",
                                "str_value": "2",
                                "unit": ""
                            },
                            {
                                "cmpt": "A1",
                                "cmpt_data": [

                                ],
                                "data_type": "Str",
                                "info_code": "ThrottleStage",
                                "info _name": "节流级数",
                                "str_value": "",
                                "unit": "级"
                            }
                        ],
                        "tag": "节流元件"
                    },
                    {
                        "info_Points": [{
                                "cmpt": "SD1",
                                "cmpt_data": [{
                                        "code": "1",
                                        "name": "220V"
                                    },
                                    {
                                        "code": "2",
                                        "name": "380V"
                                    },
                                    {
                                        "code": "3",
                                        "name": "10kV"
                                    },
                                    {
                                        "code": "4",
                                        "name": "其他"
                                    }
                                ],
                                "data_type": "Str",
                                "info_code": "PowerType",
                                "info_name": "电源类型",
                                "str_value": "4",
                                "unit": ""
                            },
                            {
                                "cmpt": "A1",
                                "cmpt_data": [

                                ],
                                "data_type": "Str",
                                "info_code": "PowerFreq",
                                "info_name": "电源频 率",
                                "str_value": "",
                                "unit": "Hz"
                            },
                            {
                                "cmpt": "A1",
                                "cmpt_data": [

                                ],
                                "data_type": "Str",
                                "info_code": "RatedU",
                                "info_name": "额定电压",
                                "str_value": "",
                                "unit": "V"
                            },
                            {
                                "cmpt": "A1",
                                "cmpt_data": [

                                ],
                                "data_type": "Str",
                                "inf o_code": "RatedI",
                                "info_name": "额定电流",
                                "str_value": "",
                                "unit": "A"
                            },
                            {
                                "cmpt": "A1",
                                "cmpt_data": [

                                ],
                                "data_type": "Str",
                                "info_code": "RatedP",
                                "info_name": "额定功率",
                                "str_value": "",
                                "unit": "kW"
                            },
                            {
                                "cmpt": "A1",
                                " cmpt_data": [

                                ],
                                "data_type": "Str",
                                "info_code": "RatedCool",
                                "info_name": "额定制冷量",
                                "str_value": "",
                                "unit": "kW"
                            },
                            {
                                "cmpt": "cs0001",
                                "cmpt_data": [

                                ],
                                "data_type": "Str",
                                "info_code": "RatedCOP",
                                "info_name": "额定 COP",
                                "str_value": "",
                                "unit": ""
                            },
                            {
                                "cmpt": "SD1",
                                "cmpt_data": [{
                                        "code": "1",
                                        "name": "R134a"
                                    },
                                    {
                                        "code": "2",
                                        "name": "R125"
                                    },
                                    {
                                        "code": "3",
                                        "name": "R32"
                                    },
                                    {
                                        "code": "4",
                                        "name": "R143a"
                                    },
                                    {
                                        "code": "5",
                                        "name": "R22"
                                    },
                                    {
                                        "code ": "6",
                                        "name": "R717(NH3)"
                                    },
                                    {
                                        "code": "7",
                                        "name": "R744(CO2)"
                                    },
                                    {
                                        "code": "8",
                                        "name": "其他"
                                    }
                                ],
                                "data_type": "Str",
                                "info_code": "RefrigerantType",
                                "info_name": "制冷剂类型",
                                "str_value": "8",
                                "unit": ""
                            },
                            {
                                "cmpt": "A1",
                                " cmpt_data": [

                                ],
                                "data_type": "Str",
                                "info_code": "RefrigerantCharge",
                                "info_name": "制冷剂充注量",
                                "str_value": "",
                                "unit": "kg"
                            },
                            {
                                "cmpt": "A1",
                                "cmpt_data": [

                                ],
                                "data_type": "Str",
                                "info_code": "RatedRefrigerantFlow",
                                "info_name": "额定制冷剂循环流量",
                                "str_value": "",
                                "unit": "m3/h"
                            },
                            {
                                "att_value": [

                                ],
                                "cmpt": "",
                                "cmpt_data": [

                                ],
                                "data_type": "Att",
                                "info_code": "RatedRefrigerateCycle",
                                "info_name": "额定工况制冷循环图",
                                "unit": ""
                            },
                            {
                                "cmpt": "A1",
                                "cmpt_data": [

                                ],
                                "data_type": "Str",
                                "info_code": "RatedLubeTemp",
                                "info_name": "额定油温",
                                "str_value": "",
                                "unit": "℃"
                            },
                            {
                                "cmpt": "A1",
                                "cmpt_data": [

                                ],
                                "data_type": "Str",
                                "info_code": "LubeCap",
                                "i nfo_name": "额定油量",
                                "str_value": "",
                                "unit": "L"
                            },
                            {
                                "cmpt": "",
                                "cmpt_data": [

                                ],
                                "data_type": "Str",
                                "info_code": "WorkTempRange",
                                "info_name": "工作温度范围",
                                "str_value": "",
                                "unit": "℃"
                            },
                            {
                                "cmpt": "",
                                "cmpt_data": [

                                ],
                                "data_type": "Str",
                                "info_code": "WorkRHRange",
                                "info_name": "工作湿度范围",
                                "str_value": "",
                                "unit": "%RH"
                            },
                            {
                                "cmpt": "SD1",
                                "cmpt_data": [

                                ],
                                "data_type": "Str",
                                "info_code": "IPGrade",
                                "info_name": "防护等级",
                                "str_ value": "防护value",
                                "unit": ""
                            },
                            {
                                "cmpt": "A1",
                                "cmpt_data": [

                                ],
                                "data_type": "Str",
                                "info_code": "Noise",
                                "info_name": "噪声",
                                "str_value": "",
                                "unit": "dB"
                            }
                        ],
                        "tag": "整机"
                    },
                    {
                        "info_Points": [{
                                "cmpt": "A1",
                                "cmpt_data": [

                                ],
                                "data_ type": "Str",
                                "info_code": "DesignCondWaterInTemp",
                                "info_name": "设计冷凝器入口水温",
                                "str_value": "",
                                "unit": "℃"
                            },
                            {
                                "cmpt": "A1",
                                "cmpt_data": [

                                ],
                                "data_type": "Str",
                                "info_code": "DesignCondWaterOutTemp",
                                "info_n ame": "设计冷凝器出口水温",
                                "str_value": "",
                                "unit": "℃"
                            },
                            {
                                "cmpt": "A1",
                                "cmpt_data": [

                                ],
                                "data_type": "Str",
                                "info_code": "DesignCoolWaterFlow",
                                "info_name": "额定冷凝器冷却水流量",
                                "str_value": "",
                                "unit": "m3/h"
                            },
                            {
                                "cmpt": "A1",
                                "cmpt_data": [

                                ],
                                "data_type": "Str",
                                "info_code": "CondWaterHeatTransArea",
                                "info_name": "冷凝器水侧换热面积",
                                "str_value": "",
                                "unit": "m2"
                            },
                            {
                                "cmpt": "A1",
                                "cmpt_data": [

                                ],
                                "data_type": "Str",
                                "info_cod e": "RatedCondTemp",
                                "info_name": "额定冷凝温度",
                                "str_value": "",
                                "unit": "℃"
                            },
                            {
                                "cmpt": "A1",
                                "cmpt_data": [

                                ],
                                "data_type": "Str",
                                "info_code": "RatedCondPress",
                                "info_name": "额定冷凝压力",
                                "str_value": "",
                                "unit": " MPa"
                            },
                            {
                                "cmpt": "A1",
                                "cmpt_data": [

                                ],
                                "data_type": "Str",
                                "info_code": "CondPressTestPress",
                                "info_name": "冷凝器耐压试验压力",
                                "str_value": "",
                                "unit": "MPa"
                            },
                            {
                                "cmpt": "A1",
                                "cmpt_data": [

                                ],
                                "data_type": "Str",
                                "info_ code": "CondMaxAllowPress",
                                "info_name": "冷凝器最高允许工作压力",
                                "str_value": "",
                                "unit": "MPa"
                            }
                        ],
                        "tag": "冷凝器"
                    }
                ])
            }, 200);
        })

        // return new Promise(function(resolve, reject) {

        //     pajax.post({
        //         url: 'restEquipService/queryEquipDynamicInfo',
        //         data: {
        //             equip_id: equip_id
        //         },
        //         success: function(data) {
        //             if (!Object.keys(data).length) {
        //                 resolve(data);
        //             } else {
        //                 reject(data);
        //             }
        //         },
        //         error: function() {
        //             reject(err);
        //         },
        //         complete: function() {

        //         },
        //     });
        // })
    },
    //设备管理-详细页:查询设备通用信息
    queryEquipPublicInfo: function(equip_id) {


        return new Promise(function(resolve, reject) {

            setTimeout(function() {
                // 值为空的时候
                // resolve(new EquipPublicInfo())

                // 有值的时候
                resolve({
                    "equip_id": "设备id", //设备id,
                    "equip_local_id": "设备本地编码", //设备本地编码
                    "equip_local_name": "设备本地名称", //设备本地名称
                    "BIMID": "BIM编码", //BIM编码
                    "position": "建筑-楼层-空间", //安装位置
                    "equip_category_name": "人防排风机", //设备类型名称
                    "system_name": "空调人防系统", //所属系统名称
                    "length": "长", //长
                    "width": "宽", //宽
                    "height": "高", //高
                    "mass": "重量", //重量
                    "material": "主体材质", //主体材质
                    "dept": "所属部门", //所属部门
                    "drawing": [ //设备图纸
                        {
                            "type": "1",
                            "name": "设备图纸1",
                            "url": "http://note.youdao.com/yws/api/personal/file/09650DA734FC4E4CA020C7C1096CC516?method=download&shareKey=afbe47e4d5d9c9db533e34e5c8c7af88?ft=1"
                        }, //附件类型，1-url，2-附件 {
                        {
                            "type": "1",
                            "name": "设备图纸2",
                            "url": "http://note.youdao.com/yws/api/personal/file/09650DA734FC4E4CA020C7C1096CC516?method=download&shareKey=afbe47e4d5d9c9db533e34e5c8c7af88?ft=1"
                        },
                        {
                            "type": "2",
                            "name": "设备图纸3",
                            "key": "http://note.youdao.com/yws/api/personal/file/09650DA734FC4E4CA020C7C1096CC516?method=download&shareKey=afbe47e4d5d9c9db533e34e5c8c7af88?ft=1"
                        }
                    ],
                    "picture": ['http://note.youdao.com/yws/api/personal/file/09650DA734FC4E4CA020C7C1096CC516?method=download&shareKey=afbe47e4d5d9c9db533e34e5c8c7af88', 'http://note.youdao.com/yws/api/personal/file/09650DA734FC4E4CA020C7C1096CC516?method=download&shareKey=afbe47e4d5d9c9db533e34e5c8c7af88'], //设备照片
                    "check_report": [ //质检报告
                        {
                            "type": "1",
                            "name": "质检报告1",
                            "url": "http://note.youdao.com/yws/api/personal/file/09650DA734FC4E4CA020C7C1096CC516?method=download&shareKey=afbe47e4d5d9c9db533e34e5c8c7af88?ft=1"
                        }, //附件类型，1-url，2-附件 {
                        {
                            "type": "1",
                            "name": "质检报告2",
                            "url": "http://note.youdao.com/yws/api/personal/file/09650DA734FC4E4CA020C7C1096CC516?method=download&shareKey=afbe47e4d5d9c9db533e34e5c8c7af88?ft=1"
                        },
                        {
                            "type": "2",
                            "name": "质检报告3",
                            "key": "http://note.youdao.com/yws/api/personal/file/09650DA734FC4E4CA020C7C1096CC516?method=download&shareKey=afbe47e4d5d9c9db533e34e5c8c7af88?ft=1"
                        }
                    ],
                    "nameplate": ['http://note.youdao.com/yws/api/personal/file/09650DA734FC4E4CA020C7C1096CC516?method=download&shareKey=afbe47e4d5d9c9db533e34e5c8c7af88', 'http://note.youdao.com/yws/api/personal/file/09650DA734FC4E4CA020C7C1096CC516?method=download&shareKey=afbe47e4d5d9c9db533e34e5c8c7af88'], //铭牌照片
                    "archive": [ //设备文档
                        {
                            "type": "1",
                            "name": "设备文档1",
                            "url": "http://note.youdao.com/yws/api/personal/file/09650DA734FC4E4CA020C7C1096CC516?method=download&shareKey=afbe47e4d5d9c9db533e34e5c8c7af88?ft=1"
                        }, //附件类型，1-url，2-附件 {
                        {
                            "type": "1",
                            "name": "设备文档2",
                            "url": "http://note.youdao.com/yws/api/personal/file/09650DA734FC4E4CA020C7C1096CC516?method=download&shareKey=afbe47e4d5d9c9db533e34e5c8c7af88?ft=1"
                        },
                        {
                            "type": "2",
                            "name": "设备文档3",
                            "key": "http://note.youdao.com/yws/api/personal/file/09650DA734FC4E4CA020C7C1096CC516?method=download&shareKey=afbe47e4d5d9c9db533e34e5c8c7af88?ft=1"
                        }
                    ],
                    "manufacturer": "生产厂家3", //生产厂家
                    "brand": "品牌3", //设备品牌
                    "product_date": "1993-10-20", //生产日期
                    "serial_num": "出厂编号", //出厂编号
                    "specification": "设备型号", //设备型号
                    "supplier": "供应商8888", //供应商名称
                    "supplier_phone": "供应商联系电话", //供应商联系电话
                    "supplier_contactor": "供应商联系人", //供应商联系人
                    "supplier_web": "供应商网址", //供应商网址
                    "supplier_fax": "供应商传真", //供应商传真
                    "supplier_email": "供应商电子邮件", //供应商电子邮件
                    "contract_id": "合同编号", //合同编号
                    "asset_id": "资产编号", //资产编号
                    "purchase_price": "采购价格", //采购价格
                    "principal": "设备负责人", //设备负责人
                    "maintain_id": "维保编码", //维保编码
                    "start_date": "1998-10-10", //投产日期
                    "maintain_deadline": "1999-10-10", //合同截止日期
                    "service_life": "10", //使用寿命
                    "warranty": "2", //设备保修期
                    "maintain_cycle": "20", //保养周期
                    "maintainer": "维修商2", //维修商单位名称
                    "maintainer_phone": "维修商联系电话", //维修商联系电话
                    "maintainer_contactor": "维修商联系人", //维修商联系人
                    "maintainer_web": "维修商网址", //维修商网址
                    "maintainer_fax": "维修商传真", //维修商传真
                    "maintainer_email": "维修商电子邮件", //维修商电子邮件
                    "status": "2", //投产状态，1-投产 ，2-未投产 ，3-其他
                    "insurer": "保险公司77", //保险公司
                    "insurer_num": "77777", //保险单号
                    "insurer_contactor": "保险联系人", //保险联系人
                    "insurer_phone": "保险联系电话", //保险联系电话
                    "insurance_file": [ //保险文件
                        {
                            "type": "1",
                            "name": "",
                            "url": ""
                        }, //附件类型，1-url，2-附件 
                        {
                            "type": "1",
                            "name": "",
                            "url": ""
                        }, {
                            "type": "2",
                            "name": "",
                            "key": ""
                        }
                    ]
                })
            }, 200);

        })


        return new Promise(function(resolve, reject) {

            pajax.post({
                url: 'restEquipService/queryEquipPublicInfo',
                data: {
                    equip_id: equip_id
                },
                success: function(data) {
                    if (!Object.keys(data).length) {
                        resolve(data);
                    } else {
                        reject(data);
                    }
                },
                error: function() {
                    reject(err);
                },
                complete: function() {

                },
            });
        })

    },
    //设备管理-详细页:查询设备名片信息
    queryEquipCardInfo: function() {


        return new Promise(function(resolve, reject) {

            setTimeout(function() {

                resolve({
                    "equip_id": "equip_id", //设备id,
                    "equip_qr_code": 'http://note.youdao.com/yws/api/personal/file/09650DA734FC4E4CA020C7C1096CC516?method=download&shareKey=afbe47e4d5d9c9db533e34e5c8c7af88', //设备二维码图片的key
                    "card_info": [ //名片信息项
                        {
                            "info_point_code": "1",
                            "info_point_name": "",
                            "value": "低区给水泵"
                        },
                        {
                            "info_point_code": "2",
                            "info_point_name": "设备类型",
                            "value": "液体管道综合仪表"
                        },
                        {
                            "info_point_code": "3",
                            "info_point_name": "设备编码",
                            "value": "YTGDZHYB001"
                        },
                        {
                            "info_point_code": "4",
                            "info_point_name": "设备型号",
                            "value": "mot1LA7130-2aa91-2n03"
                        },
                        {
                            "info_point_code": "5",
                            "info_point_name": "安装位置",
                            "value": "博锐尚格-B座B2层生活水泵房"
                        },
                        // { "info_point_code": "5", "info_point_name": "安装位置", "value": "博锐尚格-B座B2层生活水泵房" },
                    ]
                });

            }, 200)


        })

        return new Promise(function(resolve, reject) {

            pajax.post({
                url: 'restEquipService/queryEquipCardInfo',
                data: {
                    equip_id: equip_id
                },
                success: function(data) {
                    if (!Object.keys(data).length) {
                        resolve(data);
                    } else {
                        reject(data);
                    }
                },
                error: function() {
                    reject(err);
                },
                complete: function() {

                },
            });
        })
    },
    // 查询工单类型
    queryWorkOrderState: function() {

        return new Promise(function(resolve, reject) {
            setTimeout(function() {
                resolve({
                    "data": [{
                            "code": "1",
                            "name": "草稿",
                            "description": "--"
                        },
                        {
                            "code": "4",
                            "name": "待开始",
                            "description": "--"
                        },
                        {
                            "code": "5",
                            "name": "执行中",
                            "description": "--"
                        },
                        {
                            "code": "6",
                            "name": "待审核",
                            "description": "--"
                        },
                        {
                            "code": "8",
                            "name": "完成",
                            "description": "--"
                        },
                        {
                            "code": "9",
                            "name": "中止",
                            "description": "--"
                        }
                    ]
                }.data)
            }, 200);
        })


        return new Promise(function(resolve, reject) {

            pajax.post({
                url: 'restGeneralDictService/queryWorkOrderState',
                data: {
                    "dict_type": "work_order_state"
                },
                success: function(data) {
                    if (data.data) {
                        resolve(data.data);
                    } else {
                        reject(data);
                    }
                },
                error: function() {
                    reject(err);
                },
                complete: function() {

                },
            });

        })
    },
    //设备管理-详细页:查询设备相关的工单
    queryEquipRelWorkOrder: function(argu) {

        return new Promise(function(resolve, reject) {

            setTimeout(function() {

                resolve(_.range(50).map((item, index) => {

                    return {
                        "order_id": "工单id" + index, //工单id
                        "summary": "工单概述" + index, //工单概述
                        "order_state": "工单状态编码" + index, //工单状态编码
                        "order_state_name": "工单状态" + index, //工单状态名称
                        "custom_state_name": "工单自定义状态名称" + index, //工单自定义状态名称
                        "participants": "张三,李四,张三,李四,张三,李四", //参与人/操作人，用"，"隔开
                        "publish_time": (new Date()).format('yyyyMMddhhmmss'), //发布时间，yyyyMMddhhmmss
                        "desc_photos": ["key1", "key2"] //描述中的图片
                    }
                }))
            }, 200);

        })


        return new Promise(function(resolve, reject) {


            pajax.post({
                url: 'restEquipService/queryEquipRelWorkOrder',
                data: argu,
                success: function(data) {
                    if (data.data) {
                        resolve(data.data);
                    } else {
                        reject(data);
                    }
                },
                error: function() {
                    reject(err);
                },
                complete: function() {

                },
            });
        })
    },
    // 对象选择:查询设备实例:查询建筑-楼层-空间列表树 (**安装位置**)
    queryBuildFloorSpaceTree: function(build_id) {

        return new Promise(function(resolve, reject) {

            setTimeout(function() {
                resolve({
                    "data": [{
                            "obj_id": "Bd1301020001003",
                            "obj_name": "尚格云-001-3号楼",
                            "obj_type": "build",
                            "content": [{
                                    "obj_id": "Fl1301020001003001",
                                    "obj_name": "3号楼-1层",
                                    "obj_type": "floor",
                                    "content": [{
                                            "obj_id": "Sp1301020001003001001",
                                            "obj_name": "3号楼-1层-房间1",
                                            "obj_type": "space",
                                            "parents": []
                                        },
                                        {
                                            "obj_id": "Sp1301020001003001002",
                                            "obj_name": "3号楼-1层-房间2",
                                            "obj_type": "space",
                                            "parents": []
                                        },
                                        {
                                            "obj_id": "Sp1301020001003001003",
                                            "obj_name": "3号楼-1层-房间3",
                                            "obj_type": "space",
                                            "parents": []
                                        },
                                        {
                                            "obj_id": "Sp1301020001003001004",
                                            "obj_name": "3号楼-1层-房间4",
                                            "obj_type": "space",
                                            "parents": []
                                        },
                                        {
                                            "obj_id": "Sp1301020001003001005",
                                            "obj_name": "3号楼-1层-房间5",
                                            "obj_type": "space",
                                            "parents": []
                                        },
                                        {
                                            "obj_id": "Sp1301020001003001006",
                                            "obj_name": "3号楼-1层-房间6",
                                            "obj_type": "space",
                                            "parents": []
                                        },
                                        {
                                            "obj_id": "Sp1301020001003001007",
                                            "obj_name": "3号楼-1层-房间7",
                                            "obj_type": "space",
                                            "parents": []
                                        },
                                        {
                                            "obj_id": "Sp1301020001003001008",
                                            "obj_name": "3号楼-1层-房间8",
                                            "obj_type": "space",
                                            "parents": []
                                        },
                                        {
                                            "obj_id": "Sp1301020001003001009",
                                            "obj_name": "3号楼-1层-房间9",
                                            "obj_type": "space",
                                            "parents": []
                                        },
                                        {
                                            "obj_id": "Sp130102000100300100A",
                                            "obj_name": "3号楼-1层-房间10",
                                            "obj_type": "space",
                                            "parents": []
                                        },
                                        {
                                            "obj_id": "Sp130102000100300100B",
                                            "obj_name": "3号楼-1层-房间11",
                                            "obj_type": "space",
                                            "parents": []
                                        }
                                    ]
                                },
                                {
                                    "obj_id": "Fl1301020001003002",
                                    "obj_name": "3号楼-2层",
                                    "obj_type": "floor",
                                    "content": [{
                                            "obj_id": "Sp1301020001003002001",
                                            "obj_name": "3号楼-2层-房间1",
                                            "obj_type": "space",
                                            "parents": []
                                        },
                                        {
                                            "obj_id": "Sp1301020001003002002",
                                            "obj_name": "3号楼-2层-房间2",
                                            "obj_type": "space",
                                            "parents": []
                                        },
                                        {
                                            "obj_id": "Sp1301020001003002003",
                                            "obj_name": "3号楼-2层-房间3",
                                            "obj_type": "space",
                                            "parents": []
                                        },
                                        {
                                            "obj_id": "Sp1301020001003002004",
                                            "obj_name": "3号楼-2层-房间4",
                                            "obj_type": "space",
                                            "parents": []
                                        },
                                        {
                                            "obj_id": "Sp1301020001003002005",
                                            "obj_name": "3号楼-2层-房间5",
                                            "obj_type": "space",
                                            "parents": []
                                        },
                                        {
                                            "obj_id": "Sp1301020001003002006",
                                            "obj_name": "3号楼-2层-房间6",
                                            "obj_type": "space",
                                            "parents": []
                                        },
                                        {
                                            "obj_id": "Sp1301020001003002007",
                                            "obj_name": "3号楼-2层-房间7",
                                            "obj_type": "space",
                                            "parents": []
                                        }
                                    ]
                                },
                                {
                                    "obj_id": "Fl1301020001003003",
                                    "obj_name": "3号楼-3层",
                                    "obj_type": "floor",
                                    "content": [{
                                            "obj_id": "Sp1301020001003003001",
                                            "obj_name": "3号楼-3层-房间1",
                                            "obj_type": "space",
                                            "parents": []
                                        },
                                        {
                                            "obj_id": "Sp1301020001003003002",
                                            "obj_name": "3号楼-3层-房间2",
                                            "obj_type": "space",
                                            "parents": []
                                        },
                                        {
                                            "obj_id": "Sp1301020001003003003",
                                            "obj_name": "3号楼-3层-房间3",
                                            "obj_type": "space",
                                            "parents": []
                                        },
                                        {
                                            "obj_id": "Sp1301020001003003004",
                                            "obj_name": "3号楼-3层-房间4",
                                            "obj_type": "space",
                                            "parents": []
                                        },
                                        {
                                            "obj_id": "Sp1301020001003003005",
                                            "obj_name": "3号楼-3层-房间5",
                                            "obj_type": "space",
                                            "parents": []
                                        }
                                    ]
                                },
                                {
                                    "obj_id": "Fl1301020001003004",
                                    "obj_name": "3号楼-4层",
                                    "obj_type": "floor",
                                    "content": [{
                                            "obj_id": "Sp1301020001003004001",
                                            "obj_name": "3号楼-4层-房间1",
                                            "obj_type": "space",
                                            "parents": []
                                        },
                                        {
                                            "obj_id": "Sp1301020001003004002",
                                            "obj_name": "3号楼-4层-房间2",
                                            "obj_type": "space",
                                            "parents": []
                                        },
                                        {
                                            "obj_id": "Sp1301020001003004003",
                                            "obj_name": "3号楼-4层-房间3",
                                            "obj_type": "space",
                                            "parents": []
                                        },
                                        {
                                            "obj_id": "Sp1301020001003004004",
                                            "obj_name": "3号楼-4层-房间4",
                                            "obj_type": "space",
                                            "parents": []
                                        },
                                        {
                                            "obj_id": "Sp1301020001003004005",
                                            "obj_name": "3号楼-4层-房间5",
                                            "obj_type": "space",
                                            "parents": []
                                        },
                                        {
                                            "obj_id": "Sp1301020001003004006",
                                            "obj_name": "3号楼-4层-房间6",
                                            "obj_type": "space",
                                            "parents": []
                                        },
                                        {
                                            "obj_id": "Sp1301020001003004007",
                                            "obj_name": "3号楼-4层-房间7",
                                            "obj_type": "space",
                                            "parents": []
                                        }
                                    ]
                                },
                                {
                                    "obj_id": "Fl1301020001003005",
                                    "obj_name": "3号楼-5层",
                                    "obj_type": "floor",
                                    "content": []
                                },
                                {
                                    "obj_id": "Fl1301020001003006",
                                    "obj_name": "3号楼-6层",
                                    "obj_type": "floor",
                                    "content": []
                                },
                                {
                                    "obj_id": "Fl1301020001003007",
                                    "obj_name": "3号楼-7层",
                                    "obj_type": "floor",
                                    "content": []
                                },
                                {
                                    "obj_id": "Fl1301020001003008",
                                    "obj_name": "3号楼-8层",
                                    "obj_type": "floor",
                                    "content": []
                                },
                                {
                                    "obj_id": "Fl1301020001003009",
                                    "obj_name": "3号楼-9层",
                                    "obj_type": "floor",
                                    "content": []
                                },
                                {
                                    "obj_id": "Fl130102000100300A",
                                    "obj_name": "3号楼-10层",
                                    "obj_type": "floor",
                                    "content": []
                                },
                                {
                                    "obj_id": "Fl130102000100300B",
                                    "obj_name": "3号楼-11层",
                                    "obj_type": "floor",
                                    "content": []
                                },
                                {
                                    "obj_id": "Fl130102000100300C",
                                    "obj_name": "3号楼-12层",
                                    "obj_type": "floor",
                                    "content": [{
                                            "obj_id": "Sp130102000100300C001",
                                            "obj_name": "3号楼-12层-房间1",
                                            "obj_type": "space",
                                            "parents": []
                                        },
                                        {
                                            "obj_id": "Sp130102000100300C002",
                                            "obj_name": "3号楼-12层-房间2",
                                            "obj_type": "space",
                                            "parents": []
                                        },
                                        {
                                            "obj_id": "Sp130102000100300C003",
                                            "obj_name": "3号楼-12层-房间3",
                                            "obj_type": "space",
                                            "parents": []
                                        }
                                    ]
                                },
                                {
                                    "obj_id": "Fl130102000100300D",
                                    "obj_name": "3号楼--01层",
                                    "obj_type": "floor",
                                    "content": [{
                                            "obj_id": "Sp130102000100300D001",
                                            "obj_name": "3号楼-D层-房间1",
                                            "obj_type": "space",
                                            "parents": []
                                        },
                                        {
                                            "obj_id": "Sp130102000100300D002",
                                            "obj_name": "3号楼-D层-房间2",
                                            "obj_type": "space",
                                            "parents": []
                                        },
                                        {
                                            "obj_id": "Sp130102000100300D003",
                                            "obj_name": "3号楼-D层-房间3",
                                            "obj_type": "space",
                                            "parents": []
                                        },
                                        {
                                            "obj_id": "Sp130102000100300D004",
                                            "obj_name": "3号楼-D层-房间4",
                                            "obj_type": "space",
                                            "parents": []
                                        },
                                        {
                                            "obj_id": "Sp130102000100300D005",
                                            "obj_name": "3号楼-D层-房间5",
                                            "obj_type": "space",
                                            "parents": []
                                        },
                                        {
                                            "obj_id": "Sp130102000100300D006",
                                            "obj_name": "3号楼-D层-房间6",
                                            "obj_type": "space",
                                            "parents": []
                                        },
                                        {
                                            "obj_id": "Sp130102000100300D007",
                                            "obj_name": "3号楼-D层-房间7",
                                            "obj_type": "space",
                                            "parents": []
                                        },
                                        {
                                            "obj_id": "Sp130102000100300D008",
                                            "obj_name": "3号楼-D层-房间8",
                                            "obj_type": "space",
                                            "parents": []
                                        },
                                        {
                                            "obj_id": "Sp130102000100300D009",
                                            "obj_name": "3号楼-D层-房间9",
                                            "obj_type": "space",
                                            "parents": []
                                        }
                                    ]
                                },
                                {
                                    "obj_id": "Fl130102000100300E",
                                    "obj_name": "3号楼--02层",
                                    "obj_type": "floor",
                                    "content": [{
                                        "obj_id": "Sp130102000100300E001",
                                        "obj_name": "3号楼-E层-房间1",
                                        "obj_type": "space",
                                        "parents": []
                                    }]
                                },
                                {
                                    "obj_id": "Fl130102000100300F",
                                    "obj_name": "3号楼--03层",
                                    "obj_type": "floor",
                                    "content": [{
                                            "obj_id": "Sp130102000100300F001",
                                            "obj_name": "3号楼-F层-房间1",
                                            "obj_type": "space",
                                            "parents": []
                                        },
                                        {
                                            "obj_id": "Sp130102000100300F002",
                                            "obj_name": "3号楼-F层-房间2",
                                            "obj_type": "space",
                                            "parents": []
                                        },
                                        {
                                            "obj_id": "Sp130102000100300F003",
                                            "obj_name": "3号楼-F层-房间3",
                                            "obj_type": "space",
                                            "parents": []
                                        },
                                        {
                                            "obj_id": "Sp130102000100300F004",
                                            "obj_name": "3号楼-F层-房间4",
                                            "obj_type": "space",
                                            "parents": []
                                        },
                                        {
                                            "obj_id": "Sp130102000100300F005",
                                            "obj_name": "3号楼-F层-房间5",
                                            "obj_type": "space",
                                            "parents": []
                                        }
                                    ]
                                },
                                {
                                    "obj_id": "Fl130102000100300G",
                                    "obj_name": "3号楼--04层",
                                    "obj_type": "floor",
                                    "content": []
                                }
                            ]
                        },
                        {
                            "obj_id": "Bd130102000100C",
                            "obj_name": "这个自己用",
                            "obj_type": "build",
                            "content": []
                        },
                        {
                            "obj_id": "Bd1301020001002",
                            "obj_name": "上格云-001-2号楼",
                            "obj_type": "build",
                            "content": [{
                                    "obj_id": "Fl1301020001002001",
                                    "obj_name": "2号楼-1层",
                                    "obj_type": "floor",
                                    "content": [{
                                            "obj_id": "Sp1301020001002001001",
                                            "obj_name": "2号楼-1层-1号房间",
                                            "obj_type": "space",
                                            "parents": []
                                        },
                                        {
                                            "obj_id": "Sp1301020001002001002",
                                            "obj_name": "2号楼-1层-2号房间",
                                            "obj_type": "space",
                                            "parents": []
                                        },
                                        {
                                            "obj_id": "Sp1301020001002001003",
                                            "obj_name": "2号楼-1层-3号房间",
                                            "obj_type": "space",
                                            "parents": []
                                        },
                                        {
                                            "obj_id": "Sp1301020001002001004",
                                            "obj_name": "2号楼-1层-4号房间",
                                            "obj_type": "space",
                                            "parents": []
                                        },
                                        {
                                            "obj_id": "Sp1301020001002001005",
                                            "obj_name": "2号楼-1层-5号房间",
                                            "obj_type": "space",
                                            "parents": []
                                        },
                                        {
                                            "obj_id": "Sp1301020001002001006",
                                            "obj_name": "2号楼-1层-6号房间",
                                            "obj_type": "space",
                                            "parents": []
                                        },
                                        {
                                            "obj_id": "Sp1301020001002001007",
                                            "obj_name": "2号楼-1层-7号房间",
                                            "obj_type": "space",
                                            "parents": []
                                        },
                                        {
                                            "obj_id": "Sp1301020001002001008",
                                            "obj_name": "2号楼-1层-9号房间",
                                            "obj_type": "space",
                                            "parents": []
                                        },
                                        {
                                            "obj_id": "Sp1301020001002001009",
                                            "obj_name": "2号楼-2层-4号房间",
                                            "obj_type": "space",
                                            "parents": []
                                        }
                                    ]
                                },
                                {
                                    "obj_id": "Fl1301020001002002",
                                    "obj_name": "2号楼-2层",
                                    "obj_type": "floor",
                                    "content": []
                                },
                                {
                                    "obj_id": "Fl1301020001002003",
                                    "obj_name": "2号楼-3层",
                                    "obj_type": "floor",
                                    "content": []
                                },
                                {
                                    "obj_id": "Fl1301020001002004",
                                    "obj_name": "2号楼-4层",
                                    "obj_type": "floor",
                                    "content": []
                                },
                                {
                                    "obj_id": "Fl1301020001002005",
                                    "obj_name": "2号楼-5层",
                                    "obj_type": "floor",
                                    "content": []
                                },
                                {
                                    "obj_id": "Fl1301020001002006",
                                    "obj_name": "2号楼-6层",
                                    "obj_type": "floor",
                                    "content": []
                                }
                            ]
                        },
                        {
                            "obj_id": "Bd130102000100B",
                            "obj_name": "自己添加的5",
                            "obj_type": "build",
                            "content": []
                        },
                        {
                            "obj_id": "Bd1301020001001",
                            "obj_name": "上格云-001-1号楼",
                            "obj_type": "build",
                            "content": [{
                                    "obj_id": "Fl1301020001001001",
                                    "obj_name": "1号楼-1层",
                                    "obj_type": "floor",
                                    "content": [{
                                            "obj_id": "Sp1301020001001001001",
                                            "obj_name": "1号楼-1层-1号房间",
                                            "obj_type": "space",
                                            "parents": []
                                        },
                                        {
                                            "obj_id": "Sp1301020001001001002",
                                            "obj_name": "1号楼-1层-2号房间",
                                            "obj_type": "space",
                                            "parents": []
                                        },
                                        {
                                            "obj_id": "Sp1301020001001001003",
                                            "obj_name": "1号楼-1层-3号房间",
                                            "obj_type": "space",
                                            "parents": []
                                        }
                                    ]
                                },
                                {
                                    "obj_id": "Fl1301020001001002",
                                    "obj_name": "1号楼-2层",
                                    "obj_type": "floor",
                                    "content": [{
                                            "obj_id": "Sp1301020001001002001",
                                            "obj_name": "1号楼-2层-1号房间",
                                            "obj_type": "space",
                                            "parents": []
                                        },
                                        {
                                            "obj_id": "Sp1301020001001002002",
                                            "obj_name": "1号楼-2层-2号房间",
                                            "obj_type": "space",
                                            "parents": []
                                        },
                                        {
                                            "obj_id": "Sp1301020001001002003",
                                            "obj_name": "1号楼-2层-3号房间",
                                            "obj_type": "space",
                                            "parents": []
                                        },
                                        {
                                            "obj_id": "Sp1301020001001002004",
                                            "obj_name": "1号楼-2层-4号房间",
                                            "obj_type": "space",
                                            "parents": []
                                        },
                                        {
                                            "obj_id": "Sp1301020001001002005",
                                            "obj_name": "1号楼-2层-5号房间",
                                            "obj_type": "space",
                                            "parents": []
                                        }
                                    ]
                                },
                                {
                                    "obj_id": "Fl1301020001001003",
                                    "obj_name": "1号楼-3层",
                                    "obj_type": "floor",
                                    "content": []
                                },
                                {
                                    "obj_id": "Fl1301020001001004",
                                    "obj_name": "1号楼-4层",
                                    "obj_type": "floor",
                                    "content": []
                                },
                                {
                                    "obj_id": "Fl1301020001001005",
                                    "obj_name": "1号楼-5层",
                                    "obj_type": "floor",
                                    "content": []
                                },
                                {
                                    "obj_id": "Fl1301020001001006",
                                    "obj_name": "1号楼-6层",
                                    "obj_type": "floor",
                                    "content": []
                                }
                            ]
                        },
                        {
                            "obj_id": "Bd130102000100A",
                            "obj_name": "自己添加的4",
                            "obj_type": "build",
                            "content": []
                        },
                        {
                            "obj_id": "Bd1301020001007",
                            "obj_name": "这个名字好",
                            "obj_type": "build",
                            "content": []
                        },
                        {
                            "obj_id": "Bd1301020001006",
                            "obj_name": "自己添加的",
                            "obj_type": "build",
                            "content": []
                        },
                        {
                            "obj_id": "Bd1301020001005",
                            "obj_name": "今天很高兴",
                            "obj_type": "build",
                            "content": []
                        },
                        {
                            "obj_id": "Bd1301020001004",
                            "obj_name": "自己添加的",
                            "obj_type": "build",
                            "content": []
                        },
                        {
                            "obj_id": "Bd1301020001009",
                            "obj_name": "自己添加的3",
                            "obj_type": "build",
                            "content": []
                        },
                        {
                            "obj_id": "Bd1301020001008",
                            "obj_name": "躺着中枪",
                            "obj_type": "build",
                            "content": []
                        }
                    ]
                }.data)
            }, 200);
        })

        return new Promise(function(resolve, reject) {

            pajax.post({
                url: 'restObjectService/queryBuildFloorSpaceTree',
                data: {
                    build_id: build_id
                },
                success: function(data) {
                    if (data.data) {
                        resolve(data.data);
                    } else {
                        reject(data);
                    }
                },
                error: function() {
                    reject(err);
                },
                complete: function() {

                },
            });

        })
    },
    // 对象选择:查询设备实例-系统专业下所有系统 (**所属系统**)
    querySystemForSystemDomain: function() {

        return new Promise(function(resolve, reject) {

            pajax.post({
                url: 'restObjectService/querySystemForSystemDomain',
                data: {},
                success: function(data) {
                    if (data.data) {
                        resolve(data.data);
                    } else {
                        reject(data);
                    }
                },
                error: function() {
                    reject(err);
                },
                complete: function() {

                },
            });
        })
    },
    //设备管理-新增页:查询专业-系统类型-设备类型 (** 所属系统 下拉菜单 **) 第二级
    queryAllEquipCategory: function() {

        return new Promise(function(resolve, reject) {

            setTimeout(function() {
                resolve({
                    "data": [{
                            "code": "AC",
                            "name": "空调专业",
                            "content": [{
                                    "code": "CC",
                                    "name": "中央供冷系统",
                                    "content": [{
                                            "code": "CCCC",
                                            "name": "离心机"
                                        },
                                        {
                                            "code": "CCSC",
                                            "name": "螺杆机"
                                        },
                                        {
                                            "code": "CCAC",
                                            "name": "吸收机"
                                        },
                                        {
                                            "code": "CCAH",
                                            "name": "空气源热泵"
                                        },
                                        {
                                            "code": "CCWH",
                                            "name": "水源热泵"
                                        },
                                        {
                                            "code": "CCGH",
                                            "name": "地源热泵"
                                        },
                                        {
                                            "code": "CCOT",
                                            "name": "冷却塔"
                                        },
                                        {
                                            "code": "CCCP",
                                            "name": "供冷冷冻水泵"
                                        },
                                        {
                                            "code": "CCOP",
                                            "name": "供冷冷却水泵"
                                        },
                                        {
                                            "code": "CCGP",
                                            "name": "供冷乙二醇泵"
                                        },
                                        {
                                            "code": "CCFP",
                                            "name": "供冷补水泵"
                                        },
                                        {
                                            "code": "CCCF",
                                            "name": "供冷定压补水装置"
                                        },
                                        {
                                            "code": "CCPE",
                                            "name": "供冷板式换热器"
                                        },
                                        {
                                            "code": "CCVE",
                                            "name": "供冷容积式换热器"
                                        },
                                        {
                                            "code": "CCVD",
                                            "name": "供冷真空脱气机"
                                        },
                                        {
                                            "code": "CCCD",
                                            "name": "供冷水加药装置"
                                        },
                                        {
                                            "code": "CCSD",
                                            "name": "供冷软化水装置"
                                        },
                                        {
                                            "code": "CCTU",
                                            "name": "供冷全程水处理仪"
                                        },
                                        {
                                            "code": "CCST",
                                            "name": "蓄冰热槽"
                                        },
                                        {
                                            "code": "CCDB",
                                            "name": "供冷分水器"
                                        },
                                        {
                                            "code": "CCCL",
                                            "name": "供冷集水器"
                                        }
                                    ]
                                },
                                {
                                    "code": "CH",
                                    "name": "中央供热系统",
                                    "content": [{
                                            "code": "CHCB",
                                            "name": "供热燃煤锅炉"
                                        },
                                        {
                                            "code": "CHFB",
                                            "name": "供热燃油锅炉"
                                        },
                                        {
                                            "code": "CHGB",
                                            "name": "供热燃气锅炉"
                                        },
                                        {
                                            "code": "CHEB",
                                            "name": "供热电锅炉"
                                        },
                                        {
                                            "code": "CHHP",
                                            "name": "供热水泵"
                                        },
                                        {
                                            "code": "CHFP",
                                            "name": "供热补水泵"
                                        },
                                        {
                                            "code": "CHCF",
                                            "name": "供热定压补水装置"
                                        },
                                        {
                                            "code": "CHPE",
                                            "name": "供热板式换热器"
                                        },
                                        {
                                            "code": "CHVE",
                                            "name": "供热容积式换热器"
                                        },
                                        {
                                            "code": "CHVD",
                                            "name": "供热真空脱气机"
                                        },
                                        {
                                            "code": "CHCD",
                                            "name": "供热水加药装置"
                                        },
                                        {
                                            "code": "CHSD",
                                            "name": "供热软化水装置"
                                        },
                                        {
                                            "code": "CHTU",
                                            "name": "供热全程水处理仪"
                                        },
                                        {
                                            "code": "CHDB",
                                            "name": "供热分水器"
                                        },
                                        {
                                            "code": "CHCL",
                                            "name": "供热集水器"
                                        }
                                    ]
                                },
                                {
                                    "code": "AT",
                                    "name": "空调末端系统",
                                    "content": [{
                                            "code": "ATAH",
                                            "name": "空调机组"
                                        },
                                        {
                                            "code": "ATFH",
                                            "name": "新风机组"
                                        },
                                        {
                                            "code": "ATFC",
                                            "name": "风机盘管"
                                        },
                                        {
                                            "code": "ATSA",
                                            "name": "分体空调"
                                        },
                                        {
                                            "code": "ATVR",
                                            "name": "变频多联机"
                                        },
                                        {
                                            "code": "ATVA",
                                            "name": "VAVBOX"
                                        },
                                        {
                                            "code": "ATFA",
                                            "name": "地板空调器"
                                        },
                                        {
                                            "code": "ATIO",
                                            "name": "空调风口"
                                        },
                                        {
                                            "code": "ATRD",
                                            "name": "散热器"
                                        },
                                        {
                                            "code": "ATFH",
                                            "name": "地板采暖设备"
                                        }
                                    ]
                                },
                                {
                                    "code": "VT",
                                    "name": "通风系统",
                                    "content": [{
                                            "code": "VTSF",
                                            "name": "通风送风机"
                                        },
                                        {
                                            "code": "VTEF",
                                            "name": "通风排风机"
                                        },
                                        {
                                            "code": "VTIF",
                                            "name": "通风诱导风机"
                                        },
                                        {
                                            "code": "VTAC",
                                            "name": "热风幕"
                                        },
                                        {
                                            "code": "VTAP",
                                            "name": "空气净化器"
                                        },
                                        {
                                            "code": "VTDO",
                                            "name": "除味装置"
                                        },
                                        {
                                            "code": "VTIO",
                                            "name": "通风风口"
                                        }
                                    ]
                                },
                                {
                                    "code": "AD",
                                    "name": "空调人防系统",
                                    "content": [{
                                            "code": "ADEF",
                                            "name": "人防排风机"
                                        },
                                        {
                                            "code": "ADFD",
                                            "name": "滤毒除湿机"
                                        },
                                        {
                                            "code": "ADIO",
                                            "name": "人防风口"
                                        }
                                    ]
                                },
                                {
                                    "code": "KL",
                                    "name": "厨房排油烟系统",
                                    "content": [{
                                            "code": "KLSF",
                                            "name": "厨房送风机"
                                        },
                                        {
                                            "code": "KLEF",
                                            "name": "厨房排风机"
                                        },
                                        {
                                            "code": "KLAP",
                                            "name": "油烟净化器"
                                        },
                                        {
                                            "code": "KLIO",
                                            "name": "厨房风口"
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "code": "WS",
                            "name": "给排水专业",
                            "content": [{
                                    "code": "WS",
                                    "name": "水景系统",
                                    "content": [{
                                            "code": "WSCF",
                                            "name": "水景循环过滤机组"
                                        },
                                        {
                                            "code": "WSSN",
                                            "name": "水景喷头"
                                        },
                                        {
                                            "code": "WSCU",
                                            "name": "水景控制器"
                                        },
                                        {
                                            "code": "WSLT",
                                            "name": "水景灯具"
                                        }
                                    ]
                                },
                                {
                                    "code": "SI",
                                    "name": "喷灌系统",
                                    "content": [{
                                            "code": "SISU",
                                            "name": "喷灌机组"
                                        },
                                        {
                                            "code": "SISN",
                                            "name": "喷灌喷头"
                                        },
                                        {
                                            "code": "SICU",
                                            "name": "喷灌控制器"
                                        }
                                    ]
                                },
                                {
                                    "code": "ST",
                                    "name": "污水处理系统",
                                    "content": [{
                                            "code": "STLU",
                                            "name": "污废水一体式提升机组"
                                        },
                                        {
                                            "code": "STSP",
                                            "name": "潜污泵"
                                        },
                                        {
                                            "code": "STOR",
                                            "name": "餐饮除油成套设备"
                                        },
                                        {
                                            "code": "STST",
                                            "name": "化粪池"
                                        }
                                    ]
                                },
                                {
                                    "code": "DH",
                                    "name": "生活热水系统",
                                    "content": [{
                                            "code": "DHCB",
                                            "name": "热水燃煤锅炉"
                                        },
                                        {
                                            "code": "DHFB",
                                            "name": "热水燃油锅炉"
                                        },
                                        {
                                            "code": "DHGB",
                                            "name": "热水燃气锅炉"
                                        },
                                        {
                                            "code": "DHEB",
                                            "name": "热水电锅炉"
                                        },
                                        {
                                            "code": "DHGH",
                                            "name": "燃气热水器"
                                        },
                                        {
                                            "code": "DHEH",
                                            "name": "电热水器"
                                        },
                                        {
                                            "code": "DHSC",
                                            "name": "太阳能集热器"
                                        },
                                        {
                                            "code": "DHHA",
                                            "name": "辅热设备"
                                        },
                                        {
                                            "code": "DHPE",
                                            "name": "热水板式换热器"
                                        },
                                        {
                                            "code": "DHVE",
                                            "name": "热水容积式换热器"
                                        },
                                        {
                                            "code": "DHHP",
                                            "name": "生活热水水泵"
                                        },
                                        {
                                            "code": "DHWT",
                                            "name": "热水储水箱"
                                        }
                                    ]
                                },
                                {
                                    "code": "RW",
                                    "name": "中水系统",
                                    "content": [{
                                            "code": "RWSU",
                                            "name": "中水给水供水机组"
                                        },
                                        {
                                            "code": "RHTU",
                                            "name": "中水处理机组"
                                        },
                                        {
                                            "code": "RHWT",
                                            "name": "中水储水箱"
                                        },
                                        {
                                            "code": "RHRC",
                                            "name": "雨水收集设备"
                                        }
                                    ]
                                },
                                {
                                    "code": "DD",
                                    "name": "直饮水系统",
                                    "content": [{
                                            "code": "DDTU",
                                            "name": "直饮水处理机组"
                                        },
                                        {
                                            "code": "DDIH",
                                            "name": "即时加热器"
                                        }
                                    ]
                                },
                                {
                                    "code": "WD",
                                    "name": "给排水人防系统",
                                    "content": [{
                                        "code": "WDWT",
                                        "name": "人防储水箱"
                                    }]
                                },
                                {
                                    "code": "WH",
                                    "name": "给排水电伴热系统",
                                    "content": [{
                                            "code": "WHTC",
                                            "name": "给排水伴热电缆"
                                        },
                                        {
                                            "code": "WHIB",
                                            "name": "给排水伴热保温器"
                                        },
                                        {
                                            "code": "WHCU",
                                            "name": "给排水伴热控制器"
                                        }
                                    ]
                                },
                                {
                                    "code": "DW",
                                    "name": "生活给水系统",
                                    "content": [{
                                            "code": "DWSU",
                                            "name": "生活给水供水机组"
                                        },
                                        {
                                            "code": "DWTS",
                                            "name": "生活给水水箱消毒器"
                                        },
                                        {
                                            "code": "DWUS",
                                            "name": "生活给水紫外线消毒器"
                                        },
                                        {
                                            "code": "DWWT",
                                            "name": "生活给水储水箱"
                                        }
                                    ]
                                },
                                {
                                    "code": "WP",
                                    "name": "泳池系统",
                                    "content": [{
                                        "code": "WPCF",
                                        "name": "泳池循环过滤机组"
                                    }]
                                },
                                {
                                    "code": "FG",
                                    "name": "燃气系统",
                                    "content": [{
                                            "code": "FGPA",
                                            "name": "燃气调压箱"
                                        },
                                        {
                                            "code": "FGLP",
                                            "name": "液化石油气瓶"
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "code": "FF",
                            "name": "消防专业",
                            "content": [{
                                    "code": "GA",
                                    "name": "燃气报警系统",
                                    "content": [{
                                            "code": "GAHT",
                                            "name": "燃气报警主机"
                                        },
                                        {
                                            "code": "GASE",
                                            "name": "燃气探测器"
                                        },
                                        {
                                            "code": "GACV",
                                            "name": "燃气切断阀"
                                        }
                                    ]
                                },
                                {
                                    "code": "SC",
                                    "name": "防排烟系统",
                                    "content": [{
                                            "code": "SCEF",
                                            "name": "排烟风机"
                                        },
                                        {
                                            "code": "SCFF",
                                            "name": "排烟补风机"
                                        },
                                        {
                                            "code": "SCAF",
                                            "name": "事故排风机"
                                        },
                                        {
                                            "code": "SCIO",
                                            "name": "排烟风口"
                                        },
                                        {
                                            "code": "SCEV",
                                            "name": "排烟阀"
                                        },
                                        {
                                            "code": "SCFV",
                                            "name": "防火阀"
                                        }
                                    ]
                                },
                                {
                                    "code": "EA",
                                    "name": "漏电火灾报警系统",
                                    "content": [{
                                            "code": "EAHT",
                                            "name": "漏电火灾报警主机"
                                        },
                                        {
                                            "code": "EALS",
                                            "name": "漏电探测器"
                                        },
                                        {
                                            "code": "EAIS",
                                            "name": "电流探测器"
                                        },
                                        {
                                            "code": "EATS",
                                            "name": "温度探测器"
                                        }
                                    ]
                                },
                                {
                                    "code": "GE",
                                    "name": "气体灭火系统",
                                    "content": [{
                                            "code": "GEBG",
                                            "name": "气体灭火瓶组"
                                        },
                                        {
                                            "code": "GESB",
                                            "name": "气体灭火启动瓶"
                                        },
                                        {
                                            "code": "GECU",
                                            "name": "气体灭火控制器"
                                        },
                                        {
                                            "code": "GESN",
                                            "name": "气体灭火喷头"
                                        }
                                    ]
                                },
                                {
                                    "code": "FE",
                                    "name": "灭火器系统",
                                    "content": [{
                                        "code": "FEFE",
                                        "name": "灭火器"
                                    }]
                                },
                                {
                                    "code": "BM",
                                    "name": "紧急广播及背景音乐系统",
                                    "content": [{
                                            "code": "BMFE",
                                            "name": "广播前端设备"
                                        },
                                        {
                                            "code": "BMCU",
                                            "name": "广播分区控制器"
                                        },
                                        {
                                            "code": "BMSP",
                                            "name": "扬声器"
                                        }
                                    ]
                                },
                                {
                                    "code": "FS",
                                    "name": "消防给水系统",
                                    "content": [{
                                            "code": "FSHP",
                                            "name": "消火栓供水加压泵"
                                        },
                                        {
                                            "code": "FSSP",
                                            "name": "喷淋供水加压泵"
                                        },
                                        {
                                            "code": "FSMP",
                                            "name": "水喷雾供水加压泵"
                                        },
                                        {
                                            "code": "FSAP",
                                            "name": "停机坪消防供水加压泵"
                                        },
                                        {
                                            "code": "FSWM",
                                            "name": "消防水炮设备"
                                        },
                                        {
                                            "code": "FSPS",
                                            "name": "消防稳压设备"
                                        },
                                        {
                                            "code": "FSFT",
                                            "name": "泡沫储罐组"
                                        },
                                        {
                                            "code": "FSAC",
                                            "name": "空压机"
                                        },
                                        {
                                            "code": "FSWV",
                                            "name": "湿式报警阀组"
                                        },
                                        {
                                            "code": "FSDV",
                                            "name": "干式报警阀组"
                                        },
                                        {
                                            "code": "FSPV",
                                            "name": "预作用报警阀组"
                                        },
                                        {
                                            "code": "FSHB",
                                            "name": "消火栓箱"
                                        },
                                        {
                                            "code": "FSOH",
                                            "name": "室外消火栓"
                                        },
                                        {
                                            "code": "FSPC",
                                            "name": "水泵接合器"
                                        },
                                        {
                                            "code": "FSTC",
                                            "name": "消防伴热电缆"
                                        },
                                        {
                                            "code": "FSET",
                                            "name": "末端试水装置"
                                        }
                                    ]
                                },
                                {
                                    "code": "FR",
                                    "name": "防火卷帘门系统",
                                    "content": [{
                                        "code": "FRFR",
                                        "name": "防火卷帘门"
                                    }]
                                },
                                {
                                    "code": "FA",
                                    "name": "火灾报警系统",
                                    "content": [{
                                            "code": "FAHT",
                                            "name": "火灾报警主机"
                                        },
                                        {
                                            "code": "FADS",
                                            "name": "火灾报警显示屏"
                                        },
                                        {
                                            "code": "FALP",
                                            "name": "联动琴台"
                                        },
                                        {
                                            "code": "FASE",
                                            "name": "火灾探测器"
                                        },
                                        {
                                            "code": "FAAL",
                                            "name": "声光报警器"
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "code": "SE",
                            "name": "强电专业",
                            "content": [{
                                    "code": "LT",
                                    "name": "照明系统",
                                    "content": [{
                                            "code": "LTLT",
                                            "name": "照明灯具"
                                        },
                                        {
                                            "code": "LTLS",
                                            "name": "照明低压开关柜"
                                        }
                                    ]
                                },
                                {
                                    "code": "TP",
                                    "name": "租户配电系统",
                                    "content": [{
                                            "code": "TPLS",
                                            "name": "租户低压开关柜"
                                        },
                                        {
                                            "code": "TPBP",
                                            "name": "租户母线插接箱"
                                        }
                                    ]
                                },
                                {
                                    "code": "TD",
                                    "name": "变配电系统",
                                    "content": [{
                                            "code": "TDTF",
                                            "name": "变压器"
                                        },
                                        {
                                            "code": "TDHS",
                                            "name": "高压开关柜"
                                        },
                                        {
                                            "code": "TDLS",
                                            "name": "变配电低压开关柜"
                                        },
                                        {
                                            "code": "TDDS",
                                            "name": "直流屏"
                                        },
                                        {
                                            "code": "TDBP",
                                            "name": "变配电母线插接箱"
                                        }
                                    ]
                                },
                                {
                                    "code": "DG",
                                    "name": "柴发机房系统",
                                    "content": [{
                                            "code": "DGDG",
                                            "name": "柴油发电机"
                                        },
                                        {
                                            "code": "DGLS",
                                            "name": "柴发低压开关柜"
                                        }
                                    ]
                                },
                                {
                                    "code": "SD",
                                    "name": "强电人防系统",
                                    "content": [{
                                        "code": "SDLS",
                                        "name": "人防低压开关柜"
                                    }]
                                },
                                {
                                    "code": "BP",
                                    "name": "备用电源系统",
                                    "content": [{
                                            "code": "BPBP",
                                            "name": "备用电源"
                                        },
                                        {
                                            "code": "BPLS",
                                            "name": "备用电源低压开关柜"
                                        },
                                        {
                                            "code": "BPSP",
                                            "name": "太阳能电池板"
                                        },
                                        {
                                            "code": "BPWG",
                                            "name": "风力发电装置"
                                        }
                                    ]
                                },
                                {
                                    "code": "EP",
                                    "name": "机房动力系统",
                                    "content": [{
                                        "code": "EPLS",
                                        "name": "机房动力低压开关柜"
                                    }]
                                },
                                {
                                    "code": "OP",
                                    "name": "室外动力系统",
                                    "content": [{
                                        "code": "OPLS",
                                        "name": "室外动力低压开关柜"
                                    }]
                                },
                                {
                                    "code": "EL",
                                    "name": "电梯系统",
                                    "content": [{
                                            "code": "ELEL",
                                            "name": "直梯"
                                        },
                                        {
                                            "code": "ELES",
                                            "name": "扶梯"
                                        },
                                        {
                                            "code": "ELLS",
                                            "name": "电梯低压开关柜"
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "code": "SP",
                            "name": "安防专业",
                            "content": [{
                                    "code": "VS",
                                    "name": "视频监控系统",
                                    "content": [{
                                            "code": "VSHT",
                                            "name": "监控主机"
                                        },
                                        {
                                            "code": "VSCM",
                                            "name": "监控摄像头"
                                        },
                                        {
                                            "code": "VSFE",
                                            "name": "监控前端设备"
                                        },
                                        {
                                            "code": "VSVM",
                                            "name": "监视器"
                                        },
                                        {
                                            "code": "VSDR",
                                            "name": "硬盘录像机"
                                        }
                                    ]
                                },
                                {
                                    "code": "EG",
                                    "name": "门禁系统",
                                    "content": [{
                                            "code": "EGCU",
                                            "name": "门禁控制器"
                                        },
                                        {
                                            "code": "EGCR",
                                            "name": "门禁读卡器"
                                        },
                                        {
                                            "code": "EGFG",
                                            "name": "速通门"
                                        }
                                    ]
                                },
                                {
                                    "code": "IA",
                                    "name": "入侵报警系统",
                                    "content": [{
                                            "code": "IAHT",
                                            "name": "入侵报警主机"
                                        },
                                        {
                                            "code": "IASE",
                                            "name": "入侵报警探测器"
                                        }
                                    ]
                                },
                                {
                                    "code": "NP",
                                    "name": "巡更系统",
                                    "content": [{
                                            "code": "NPHT",
                                            "name": "巡更主机"
                                        },
                                        {
                                            "code": "NPCU",
                                            "name": "巡更通讯座"
                                        },
                                        {
                                            "code": "NPPS",
                                            "name": "巡更棒"
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "code": "OT",
                            "name": "其他",
                            "content": [{
                                    "code": "AE",
                                    "name": "执行器",
                                    "content": [{
                                            "code": "AEOV",
                                            "name": "通断阀"
                                        },
                                        {
                                            "code": "AEAV",
                                            "name": "调节阀"
                                        },
                                        {
                                            "code": "AECV",
                                            "name": "止回阀"
                                        },
                                        {
                                            "code": "AERV",
                                            "name": "减压阀"
                                        },
                                        {
                                            "code": "AESV",
                                            "name": "安全阀"
                                        },
                                        {
                                            "code": "AERL",
                                            "name": "继电器"
                                        },
                                        {
                                            "code": "AEFC",
                                            "name": "变频器"
                                        }
                                    ]
                                },
                                {
                                    "code": "TL",
                                    "name": "工具",
                                    "content": []
                                },
                                {
                                    "code": "SE",
                                    "name": "传感器",
                                    "content": [{
                                            "code": "SETP",
                                            "name": "温度传感器"
                                        },
                                        {
                                            "code": "SERH",
                                            "name": "湿度传感器"
                                        },
                                        {
                                            "code": "SEPS",
                                            "name": "压力传感器"
                                        },
                                        {
                                            "code": "SECT",
                                            "name": "浓度传感器"
                                        },
                                        {
                                            "code": "SESP",
                                            "name": "速度传感器"
                                        },
                                        {
                                            "code": "SEFL",
                                            "name": "流量传感器"
                                        },
                                        {
                                            "code": "SEDP",
                                            "name": "位移传感器"
                                        },
                                        {
                                            "code": "SEEE",
                                            "name": "电度表"
                                        },
                                        {
                                            "code": "SESD",
                                            "name": "声音传感器"
                                        },
                                        {
                                            "code": "SEHT",
                                            "name": "热量传感器"
                                        },
                                        {
                                            "code": "SEVD",
                                            "name": "图像传感器"
                                        }
                                    ]
                                },
                                {
                                    "code": "PW",
                                    "name": "管网",
                                    "content": [{
                                            "code": "PWSE",
                                            "name": "强电线路"
                                        },
                                        {
                                            "code": "PWWE",
                                            "name": "弱电线路"
                                        },
                                        {
                                            "code": "PWGS",
                                            "name": "气体管道"
                                        },
                                        {
                                            "code": "PWLQ",
                                            "name": "液体管道"
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "code": "WE",
                            "name": "弱电专业",
                            "content": [{
                                    "code": "MI",
                                    "name": "多媒体信息发布系统",
                                    "content": [{
                                            "code": "MIHT",
                                            "name": "多媒体主机"
                                        },
                                        {
                                            "code": "MIPL",
                                            "name": "播放器"
                                        },
                                        {
                                            "code": "MILS",
                                            "name": "LED大屏"
                                        },
                                        {
                                            "code": "MIDS",
                                            "name": "多媒体显示屏"
                                        },
                                        {
                                            "code": "MIST",
                                            "name": "自助终端机"
                                        }
                                    ]
                                },
                                {
                                    "code": "BA",
                                    "name": "楼宇自控系统",
                                    "content": [{
                                            "code": "BAHT",
                                            "name": "楼控主机"
                                        },
                                        {
                                            "code": "BANC",
                                            "name": "楼控网络控制器"
                                        }
                                    ]
                                },
                                {
                                    "code": "WT",
                                    "name": "无线对讲系统",
                                    "content": [{
                                            "code": "WTWT",
                                            "name": "对讲机"
                                        },
                                        {
                                            "code": "WTRS",
                                            "name": "中继台"
                                        }
                                    ]
                                },
                                {
                                    "code": "LN",
                                    "name": "本地网络系统",
                                    "content": [{
                                            "code": "LNRT",
                                            "name": "路由器"
                                        },
                                        {
                                            "code": "LNEX",
                                            "name": "交换机"
                                        },
                                        {
                                            "code": "LNHF",
                                            "name": "硬件防火墙"
                                        }
                                    ]
                                },
                                {
                                    "code": "GM",
                                    "name": "车库管理系统",
                                    "content": [{
                                            "code": "GMHT",
                                            "name": "车库主机"
                                        },
                                        {
                                            "code": "GMNC",
                                            "name": "车库网络控制器"
                                        },
                                        {
                                            "code": "GMCM",
                                            "name": "车库摄像头"
                                        },
                                        {
                                            "code": "GMDS",
                                            "name": "车库显示屏"
                                        },
                                        {
                                            "code": "GMGT",
                                            "name": "进出闸机"
                                        },
                                        {
                                            "code": "GMMP",
                                            "name": "机械车位"
                                        },
                                        {
                                            "code": "GMCP",
                                            "name": "充电桩"
                                        }
                                    ]
                                },
                                {
                                    "code": "TV",
                                    "name": "电视信号系统",
                                    "content": [{
                                        "code": "TVFE",
                                        "name": "电视前端设备"
                                    }]
                                }
                            ]
                        }
                    ]
                }.data)
            }, 200);
        })


        return new Promise(function(resolve, reject) {

            pajax.post({
                url: 'restDictService/queryAllEquipCategory',
                data: {},
                success: function(data) {
                    if (data.data) {
                        resolve(data.data);
                    } else {
                        reject(data);
                    }
                },
                error: function() {
                    reject(err);
                },
                complete: function() {

                },
            });
        })
    },
    //设备管理-详细页:编辑设备信息
    updateEquipInfo: function(argu, type) {

        // return new Promise(function(resolve) {
        //     setTimeout(function() {
        //         resolve();
        //     }, 200);
        // })

        /**
         * argu 接口调用的参数
         * type 请求类型， false 普通提交 true 上传文本
         */
        return new Promise(function(resolve, reject) {

            pajax[type ? 'updateBeforeWithFile' : 'post']({
                url: 'restEquipService/updateEquipInfo',
                data: argu,
                success: function(data) {
                    if (!Object.keys(data).length) {
                        resolve(argu);
                    } else {
                        reject(data);
                    }
                },
                error: function() {
                    reject();
                },
                complete: function() {

                },
            });
        })
    },
    //设备管理-新增页:设备通讯录选择：供应商、生产厂家、维修商、保险公司
    queryEquipCompanySel: function(type) {

        return new Promise(function(resolve, reject) {

            setTimeout(function() {

                if (type == 2) {

                    resolve({
                        "data": [{
                                "company_id": "TXL1505804873286",
                                "company_type": "2",
                                "company_name": "生产厂家1_",
                                "contacts": "葛占1_",
                                "phone": "18611111111",
                                "web": "www.bbbb1_.com",
                                "fax": "22222",
                                "email": "bbbb1_@qq.com",
                                "brands": [
                                    "品牌1",
                                    "品牌2"
                                ],
                                "insurer_info": []
                            },
                            {
                                "company_id": "TXL1505805416976",
                                "company_type": "2",
                                "company_name": "生产厂家2",
                                "contacts": "葛占2",
                                "phone": "186222222445",
                                "web": "www.bbbb2.com",
                                "fax": "333333",
                                "email": "bbbb2@qq.com",
                                "brands": [
                                    "品牌4",
                                    "品牌3",
                                    "品牌5"
                                ],
                                "insurer_info": []
                            },
                            {
                                "company_id": "TXL1505805440349",
                                "company_type": "2",
                                "company_name": "生产厂家3",
                                "contacts": "葛占3",
                                "phone": "1862657657",
                                "web": "www.bbbb3.com",
                                "fax": "33343433",
                                "email": "bbbb3@qq.com",
                                "brands": [
                                    "品牌1",
                                    "品牌3"
                                ],
                                "insurer_info": []
                            },
                            {
                                "company_id": "TXL1505805743422",
                                "company_type": "2",
                                "company_name": "生产厂家7777",
                                "contacts": "葛77",
                                "phone": "18619977",
                                "web": "www.bbbb77.com",
                                "fax": "22299777",
                                "email": "bbbb77@qq.com",
                                "brands": [
                                    "品牌7",
                                    "品牌3"
                                ],
                                "insurer_info": []
                            },
                            {
                                "company_id": "TXL1505805728347",
                                "company_type": "2",
                                "company_name": "生产厂家9999",
                                "contacts": "葛999",
                                "phone": "186199999",
                                "web": "www.bbbb9.com",
                                "fax": "2229992",
                                "email": "bbbb9@qq.com",
                                "brands": [
                                    "品牌9",
                                    "品牌3"
                                ],
                                "insurer_info": []
                            }
                        ]
                    }.data)
                } else if (type == 1) {

                    resolve({
                        "data": [{
                                "company_id": "TXL1505805363664",
                                "company_type": "1",
                                "company_name": "供应商2",
                                "contacts": "葛占彬2",
                                "phone": "186222222",
                                "web": "www.aaaa2.com",
                                "fax": "154141",
                                "email": "aaaa2@qq.com",
                                "brands": [],
                                "insurer_info": []
                            },
                            {
                                "company_id": "TXL1505805383215",
                                "company_type": "1",
                                "company_name": "供应商3",
                                "contacts": "葛占彬3",
                                "phone": "186333333",
                                "web": "www.aaaa3.com",
                                "fax": "14564561",
                                "email": "aaaa3@qq.com",
                                "brands": [],
                                "insurer_info": []
                            },
                            {
                                "company_id": "TXL1505805763770",
                                "company_type": "1",
                                "company_name": "供应商777",
                                "contacts": "葛占彬77",
                                "phone": "1861015178878",
                                "web": "www.aaaa5555.com",
                                "fax": "1548999",
                                "email": "aaaa444@qq.com",
                                "brands": [],
                                "insurer_info": []
                            },
                            {
                                "company_id": "TXL1505805778845",
                                "company_type": "1",
                                "company_name": "供应商8888",
                                "contacts": "葛占彬88",
                                "phone": "1861015178",
                                "web": "www.aaaa556.com",
                                "fax": "154869",
                                "email": "aaaa494@qq.com",
                                "brands": [],
                                "insurer_info": []
                            }
                        ]
                    }.data)
                } else if (type == 3) {

                    resolve({
                        "data": [{
                                "company_id": "TXL1505804928828",
                                "company_type": "3",
                                "company_name": "维修商1",
                                "contacts": "彬1",
                                "phone": "1863333333",
                                "web": "www.cccc1.com",
                                "fax": "33333",
                                "email": "cccc1@qq.com",
                                "brands": [],
                                "insurer_info": []
                            },
                            {
                                "company_id": "TXL1505805457302",
                                "company_type": "3",
                                "company_name": "维修商2",
                                "contacts": "彬2",
                                "phone": "1864353423",
                                "web": "www.cccc1.com",
                                "fax": "33333",
                                "email": "cccc1@qq.com",
                                "brands": [],
                                "insurer_info": []
                            },
                            {
                                "company_id": "TXL1505805473606",
                                "company_type": "3",
                                "company_name": "维修商3",
                                "contacts": "彬3",
                                "phone": "186436758",
                                "web": "www.cccc3.com",
                                "fax": "5789",
                                "email": "cccc76@qq.com",
                                "brands": [],
                                "insurer_info": []
                            },
                            {
                                "company_id": "TXL1505805689629",
                                "company_type": "3",
                                "company_name": "维修商66",
                                "contacts": "彬66",
                                "phone": "1863666",
                                "web": "www.cccc666.com",
                                "fax": "3366",
                                "email": "cccc66@qq.com",
                                "brands": [],
                                "insurer_info": []
                            }
                        ]
                    }.data)
                } else if (type == 4) {

                    resolve({
                        "data": [{
                                "company_id": "TXL1505804970670",
                                "company_type": "4",
                                "company_name": "保险公司1_",
                                "contacts": "占1_",
                                "phone": "1864444444",
                                "web": "--",
                                "fax": "--",
                                "email": "--",
                                "brands": [],
                                "insurer_info": [{
                                        "insurer_num": "11111_",
                                        "insurance_file": {
                                            "type": "1",
                                            "name": "nama111_",
                                            "url": "/pfiledownload/68%2C74%2C74%2C70%2C3a%2C2f%2C2f%2C77%2C77%2C77%2C2e%2C61%2C61%2C61%2C61%2C5f%2C2e%2C63%2C6f%2C6d%2C2f?ft=1",
                                            "key": ""
                                        }
                                    },
                                    {
                                        "insurer_num": "22222_",
                                        "insurance_file": {
                                            "type": "1",
                                            "name": "nama222_",
                                            "url": "/pfiledownload/68%2C74%2C74%2C70%2C3a%2C2f%2C2f%2C77%2C77%2C77%2C2e%2C62%2C62%2C62%2C62%2C5f%2C2e%2C63%2C6f%2C6d%2C2f?ft=1",
                                            "key": ""
                                        }
                                    },
                                    {
                                        "insurer_num": "11112",
                                        "insurance_file": {
                                            "type": "1",
                                            "name": "nama111_",
                                            "url": "/pfiledownload/68%2C74%2C74%2C70%2C3a%2C2f%2C2f%2C77%2C77%2C77%2C2e%2C61%2C61%2C61%2C61%2C5f%2C2e%2C63%2C6f%2C6d%2C2f?ft=1",
                                            "key": ""
                                        }
                                    }
                                ]
                            },
                            {
                                "company_id": "TXL1505805567346",
                                "company_type": "4",
                                "company_name": "保险公司3",
                                "contacts": "葛占彬234",
                                "phone": "186789567",
                                "web": "--",
                                "fax": "--",
                                "email": "--",
                                "brands": [],
                                "insurer_info": [{
                                        "insurer_num": "122312",
                                        "insurance_file": {
                                            "type": "1",
                                            "name": "nama232",
                                            "url": "/pfiledownload/68%2C74%2C74%2C70%2C3a%2C2f%2C2f%2C77%2C77%2C77%2C2e%2C61%2C61%2C61%2C61%2C65%2C65%2C65%2C2e%2C63%2C6f%2C6d%2C2f?ft=1",
                                            "key": ""
                                        }
                                    },
                                    {
                                        "insurer_num": "4878",
                                        "insurance_file": {
                                            "type": "1",
                                            "name": "nama68",
                                            "url": "/pfiledownload/68%2C74%2C74%2C70%2C3a%2C2f%2C2f%2C77%2C77%2C77%2C2e%2C62%2C62%2C62%2C62%2C75%2C64%2C2e%2C63%2C6f%2C6d%2C2f?ft=1",
                                            "key": ""
                                        }
                                    }
                                ]
                            },
                            {
                                "company_id": "TXL1505805652663",
                                "company_type": "4",
                                "company_name": "保险公司6",
                                "contacts": "葛占彬666444",
                                "phone": "1867877776666",
                                "web": "--",
                                "fax": "--",
                                "email": "--",
                                "brands": [],
                                "insurer_info": [{
                                        "insurer_num": "77777",
                                        "insurance_file": {
                                            "type": "1",
                                            "name": "nama232",
                                            "url": "/pfiledownload/68%2C74%2C74%2C70%2C3a%2C2f%2C2f%2C77%2C77%2C77%2C2e%2C61%2C61%2C61%2C61%2C65%2C65%2C65%2C2e%2C63%2C6f%2C6d%2C2f?ft=1",
                                            "key": ""
                                        }
                                    },
                                    {
                                        "insurer_num": "88888",
                                        "insurance_file": {
                                            "type": "1",
                                            "name": "nama68",
                                            "url": "/pfiledownload/68%2C74%2C74%2C70%2C3a%2C2f%2C2f%2C77%2C77%2C77%2C2e%2C62%2C62%2C62%2C62%2C75%2C64%2C2e%2C63%2C6f%2C6d%2C2f?ft=1",
                                            "key": ""
                                        }
                                    }
                                ]
                            },
                            {
                                "company_id": "TXL1505805664184",
                                "company_type": "4",
                                "company_name": "保险公司77",
                                "contacts": "葛占彬777",
                                "phone": "186787777",
                                "web": "--",
                                "fax": "--",
                                "email": "--",
                                "brands": [],
                                "insurer_info": [{
                                        "insurer_num": "77777",
                                        "insurance_file": {
                                            "type": "1",
                                            "name": "nama232",
                                            "url": "/pfiledownload/68%2C74%2C74%2C70%2C3a%2C2f%2C2f%2C77%2C77%2C77%2C2e%2C61%2C61%2C61%2C61%2C65%2C65%2C65%2C2e%2C63%2C6f%2C6d%2C2f?ft=1",
                                            "key": ""
                                        }
                                    },
                                    {
                                        "insurer_num": "88888",
                                        "insurance_file": {
                                            "type": "1",
                                            "name": "nama68",
                                            "url": "/pfiledownload/68%2C74%2C74%2C70%2C3a%2C2f%2C2f%2C77%2C77%2C77%2C2e%2C62%2C62%2C62%2C62%2C75%2C64%2C2e%2C63%2C6f%2C6d%2C2f?ft=1",
                                            "key": ""
                                        }
                                    }
                                ]
                            }
                        ]
                    }.data)
                }


            }, 200);
        })

        /**
         * 1-供应商、2-生产厂家、3-维修商、4-保险公司
         * argu 接口调用的参数
         * type 请求类型， false 普通提交 true 上传文本
         */
        return new Promise(function(resolve, reject) {

            pajax.post({
                url: 'restEquipCompanyService/queryEquipCompanySel',
                data: {
                    company_type: new String(type)
                },
                success: function(data) {
                    if ((data.data).length) {
                        resolve(data.data);
                    } else {
                        reject(data);
                    }
                },
                error: function() {
                    reject();
                },
                complete: function() {

                },
            });
        })

        'restEquipCompanyService/queryEquipCompanySel'
    },
    //设备管理-详细页:查询设备信息点的历史信息
    queryEquipInfoPointHis: function(equip_id, info_point_code, cb) {

        setTimeout(function() {
            console.log('测试数据生产环境的需要')
            cb([
                { "date": 20151020100000, "value": "操作1" },
                { "date": 20161020100000, "value": "操作2" },
                { "date": 20171020100000, "value": "操作3" }
            ])
        }, 200);

        return;

        pajax.post({
            url: 'restEquipService/queryEquipInfoPointHis',
            data: {
                equip_id: equip_id,
                info_point_code: info_point_code,
            },
            success: function(data) {

                if (data.data) {

                    cb(data.data.map(function(item) {
                        // 将后台返回的时间字符串格式化为可以实例的时间格式
                        item.date = item.date.replace(/^(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})$/g, function() {
                            var arr = Array.prototype.slice.call(arguments);
                            return arr.slice(1, 4).join('/') + " " + arr.slice(4, 7).join(':');
                        })
                    }))

                }
            },
            error: function() {

            },
            complete: function() {

            },
        });
    }
}