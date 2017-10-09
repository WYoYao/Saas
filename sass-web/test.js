var arr = [{
        "info_Points": [{
                "cmpt": "A1",
                "cmpt_data": [],
                "data_type": "Str",
                "info_code": "DesignEvapWaterInTemp",
                "info_name": "设计蒸发器入 口水温",
                "str_value": "1",
                "unit": "℃",
                "isShow": true,
                "type": 4
            },
            {
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
                "str_value": {
                    "code": "1",
                    "name": "220V"
                },
                "unit": "",
                "isShow": true,
                "type": 1
            },
            {
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
                "str_arr_value": [{
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
                "unit": "",
                "isShow": true,
                "type": 2
            },
            {
                "cmpt": "A1",
                "cmpt_data": [],
                "data_type": "Str",
                "info_code": "DesignEvapWaterOutTemp",
                "info_name": "设计蒸发器出口水温",
                "str_value": "2",
                "unit": "℃",
                "isShow": true,
                "type": 4
            },
            {
                "cmpt": "A1",
                "cmp t_data": [],
                "data_type": "Str",
                "info_code": "DesignChillWaterFlow",
                "info_name": "额定蒸发器冷冻水流量",
                "str_value": "1",
                "unit": "m3/h",
                "isShow": true,
                "type": 4
            },
            {
                "cmpt": "A1",
                "cmpt_data": [],
                "data_type": "Str",
                "info_code": "EvapWaterH eatTransArea",
                "info_name": "蒸发器水侧换热面积",
                "str_value": "2",
                "unit": "m2",
                "isShow": true,
                "type": 4
            },
            {
                "cmpt": "A1",
                "cmpt_data": [],
                "data_type": "Str",
                "info_code": "RatedEvapTemp",
                "info_name": "额定蒸发温度",
                "str_value": "2",
                "unit": "℃",
                "isShow": true,
                "type": 4
            },
            {
                "cmpt": "A1",
                "cmpt_data": [],
                "data_type": "Str",
                "info_code": "RatedEvapPress",
                "info_name": "额定蒸发压力",
                "str_value": "1",
                "unit": "MPa",
                "isShow": true,
                "type": 4
            },
            {
                "cmpt": "A1",
                "cmpt_data": [],
                "data_type": "Str",
                "info_code": "E vapPunctureTestPress",
                "info_name": "蒸发器耐压试验压力",
                "str_value": "2",
                "unit": "MPa",
                "isShow": true,
                "type": 4
            },
            {
                "cmpt": "A1",
                "cmpt_data": [],
                "data_type": "Str",
                "info_code": "EvapMaxAllowPress",
                "info_name": "蒸发器最高允许工作压力",
                "str_value": "1",
                "unit": "MPa",
                "isShow": true,
                "type": 4
            }
        ],
        "tag": "蒸发器"
    },
    {
        "info_Points": [{
                "cmpt": "A1",
                "cmpt_data": [],
                "data_type": "Str",
                "info_code": "CompressStage",
                "info_name": "压缩级数",
                "str_value": "2",
                "unit": "级",
                "isShow": true,
                "type": 4
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
                "str_value": {
                    "code": "1",
                    "name": "角转子"
                },
                "unit": "",
                "isShow": true,
                "type": 1
            },
            {
                "cmpt": "A1",
                "cmpt_data": [],
                "data_type": "Str",
                "info_code": "MaxRPM",
                "info_name": "最大转速",
                "str_value": "",
                "unit": "r/min",
                "isShow": true,
                "type": 4
            },
            {
                "cmpt": "A1",
                "cmpt_data": [],
                "data_type": "Str",
                "info_code": "MaxCentrifugalF",
                "info_name": "最大离心力",
                "str_value": "",
                "unit": "N",
                "isShow": true,
                "type": 4
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
                "unit": "",
                "isShow": true,
                "type": 0
            },
            {
                "cmpt": "A1",
                "cmpt_data": [],
                "data_type": "Str",
                "info_code": "ThrottleStage",
                "info _name": "节流级数",
                "str_value": "",
                "unit": "级",
                "isShow": true,
                "type": 4
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
                        "code": "4 ",
                        "name": "其他"
                    }
                ],
                "data_type": "Str",
                "info_code": "PowerType",
                "info_name": "电源类型",
                "unit": "",
                "isShow": true,
                "type": 1
            },
            {
                "cmpt": "A1",
                "cmpt_data": [],
                "data_type": "Str",
                "info_code": "PowerFreq",
                "info_name": "电源频 率",
                "str_value": "",
                "unit": "Hz",
                "isShow": true,
                "type": 4
            },
            {
                "cmpt": "A1",
                "cmpt_data": [],
                "data_type": "Str",
                "info_code": "RatedU",
                "info_name": "额定电压",
                "str_value": "",
                "unit": "V",
                "isShow": true,
                "type": 4
            },
            {
                "cmpt": "A1",
                "cmpt_data": [],
                "data_type": "Str",
                "inf o_code": "RatedI",
                "info_name": "额定电流",
                "str_value": "",
                "unit": "A",
                "isShow": true,
                "type": 4
            },
            {
                "cmpt": "A1",
                "cmpt_data": [],
                "data_type": "Str",
                "info_code": "RatedP",
                "info_name": "额定功率",
                "str_value": "",
                "unit": "kW",
                "isShow": true,
                "type": 4
            },
            {
                "cmpt": "A1",
                " cmpt_data": [],
                "data_type": "Str",
                "info_code": "RatedCool",
                "info_name": "额定制冷量",
                "str_value": "",
                "unit": "kW",
                "isShow": true,
                "type": 4
            },
            {
                "cmpt": "cs0001",
                "cmpt_data": [],
                "data_type": "Str",
                "info_code": "RatedCOP",
                "info_name": "额定 COP",
                "str_value": "",
                "unit": "",
                "isShow": true,
                "type": 0
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
                "unit": "",
                "isShow": true,
                "type": 1
            },
            {
                "cmpt": "A1",
                " cmpt_data": [],
                "data_type": "Str",
                "info_code": "RefrigerantCharge",
                "info_name": "制冷剂充注量",
                "str_value": "",
                "unit": "kg",
                "isShow": true,
                "type": 4
            },
            {
                "cmpt": "A1",
                "cmpt_data": [],
                "data_type": "Str",
                "info_code": "RatedRefrigerantFlow",
                "info_name": "额定制冷剂循环流量",
                "str_value": "",
                "unit": "m3/h",
                "isShow": true,
                "type": 4
            },
            {
                "att_value": [],
                "cmpt": "",
                "cmpt_data": [],
                "data_type": "Att",
                "info_code": "RatedRefrigerateCycle",
                "info_name": "额定工况制冷循环图",
                "unit": "",
                "isShow": true,
                "type": 3
            },
            {
                "cmpt": "A1",
                "cmpt_data": [],
                "data_type": "Str",
                "info_code": "RatedLubeTemp",
                "info_name": "额定油温",
                "str_value": "",
                "unit": "℃",
                "isShow": true,
                "type": 4
            },
            {
                "cmpt": "A1",
                "cmpt_data": [],
                "data_type": "Str",
                "info_code": "LubeCap",
                "i nfo_name": "额定油量",
                "str_value": "",
                "unit": "L",
                "isShow": true,
                "type": 4
            },
            {
                "cmpt": "",
                "cmpt_data": [],
                "data_type": "Str",
                "info_code": "WorkTempRange",
                "info_name": "工作温度范围",
                "str_value": "",
                "unit": "℃",
                "isShow": true,
                "type": 4
            },
            {
                "cmpt": "",
                "cmpt_data": [],
                "data_type": "Str",
                "info_code": "WorkRHRange",
                "info_name": "工作湿度范围",
                "str_value": "",
                "unit": "%RH",
                "isShow": true,
                "type": 4
            },
            {
                "cmpt": "SD1",
                "cmpt_data": [],
                "data_type": "Str",
                "info_code": "IPGrade",
                "info_name": "防护等级",
                "str_ value": "",
                "unit": "",
                "isShow": true,
                "type": 0
            },
            {
                "cmpt": "A1",
                "cmpt_data": [],
                "data_type": "Str",
                "info_code": "Noise",
                "info_name": "噪声",
                "str_value": "",
                "unit": "dB",
                "isShow": true,
                "type": 4
            }
        ],
        "tag": "整机"
    },
    {
        "info_Points": [{
                "cmpt": "A1",
                "cmpt_data": [],
                "data_ type": "Str",
                "info_code": "DesignCondWaterInTemp",
                "info_name": "设计冷凝器入口水温",
                "str_value": "",
                "unit": "℃",
                "isShow": true,
                "type": 0
            },
            {
                "cmpt": "A1",
                "cmpt_data": [],
                "data_type": "Str",
                "info_code": "DesignCondWaterOutTemp",
                "info_n ame": "设计冷凝器出口水温",
                "str_value": "",
                "unit": "℃",
                "isShow": true,
                "type": 4
            },
            {
                "cmpt": "A1",
                "cmpt_data": [],
                "data_type": "Str",
                "info_code": "DesignCoolWaterFlow",
                "info_name": "额定冷凝器冷却水流量",
                "str_value": "",
                "unit": "m3/h",
                "isShow": true,
                "type": 4
            },
            {
                "cmpt": "A1",
                "cmpt_data": [],
                "data_type": "Str",
                "info_code": "CondWaterHeatTransArea",
                "info_name": "冷凝器水侧换热面积",
                "str_value": "",
                "unit": "m2",
                "isShow": true,
                "type": 4
            },
            {
                "cmpt": "A1",
                "cmpt_data": [],
                "data_type": "Str",
                "info_cod e": "RatedCondTemp",
                "info_name": "额定冷凝温度",
                "str_value": "",
                "unit": "℃",
                "isShow": true,
                "type": 4
            },
            {
                "cmpt": "A1",
                "cmpt_data": [],
                "data_type": "Str",
                "info_code": "RatedCondPress",
                "info_name": "额定冷凝压力",
                "str_value": "",
                "unit": " MPa",
                "isShow": true,
                "type": 4
            },
            {
                "cmpt": "A1",
                "cmpt_data": [],
                "data_type": "Str",
                "info_code": "CondPressTestPress",
                "info_name": "冷凝器耐压试验压力",
                "str_value": "",
                "unit": "MPa",
                "isShow": true,
                "type": 4
            },
            {
                "cmpt": "A1",
                "cmpt_data": [],
                "data_type": "Str",
                "info_ code": "CondMaxAllowPress",
                "info_name": "冷凝器最高允许工作压力",
                "str_value": "",
                "unit": "MPa",
                "isShow": true,
                "type": 4
            }
        ],
        "tag": "冷凝器"
    }
];