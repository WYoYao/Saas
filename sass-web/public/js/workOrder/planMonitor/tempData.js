var d = {
    scrapList: [{
        plan_id: '111',
        project_id: '22',
        plan_name: '消防水泵维保计划',
        matters_desc: '消防水泵维保计划1,消防水泵维保计划2,消防水泵维保计划3',
        plan_start_time: '2017.09.01',
        plan_end_time: '2017.09.09',
        destroy_person_named: '张三'
    }, {
        plan_id: '111',
        project_id: '22',
        plan_name: '消防水泵维保计划',
        matters_desc: '消防水泵维保计划1,消防水泵维保计划2,消防水泵维保计划3',
        plan_start_time: '2017.09.01',
        plan_end_time: '2017.09.09',
        destroy_person_named: '张三'
    }, {
        plan_id: '111',
        project_id: '22',
        plan_name: '消防水泵维保计划',
        matters_desc: '消防水泵维保计划1,消防水泵维保计划2,消防水泵维保计划3',
        plan_start_time: '2017.09.01',
        plan_end_time: '2017.09.09',
        destroy_person_named: '张三'
    }],
    planDetail: {
        plan_id: "aaaaaa",
        project_id: "aaaaa",
        plan_name: "消防水泵维保计划",
        order_type: "1",
        order_type_name: "维保",
        urgency: "高",
        ahead_create_time: "10",
        freq_cycle: "w",
        freq_num: "22",
        freq_times: [{
            "start_time": {
                "cycle": "w", //周期,y/m/w/d
                "time_day": "06.12", //周一，1号，“0612”,6月12日
                "time_hour": "10", //10时
                "time_minute": "15" //15分
            },
            "end_time": {
                "cycle": "w",
                "time_day": "06.12",
                "time_hour": "20",
                "time_minute": "15"
            }

        }, {
            "start_time": {
                "cycle": "w", //周期,y/m/w/d
                "time_day": "06.12", //周一，1号，“0612”,6月12日
                "time_hour": "10", //10时
                "time_minute": "15" //15分
            },
            "end_time": {
                "cycle": "w",
                "time_day": "06.12",
                "time_hour": "20",
                "time_minute": "15"
            }

        }, {
            "start_time": {
                "cycle": "w", //周期,y/m/w/d
                "time_day": "06.12", //周一，1号，“0612”,6月12日
                "time_hour": "10", //10时
                "time_minute": "15" //15分
            },
            "end_time": {
                "cycle": "w",
                "time_day": "06.12",
                "time_hour": "20",
                "time_minute": "15"
            }

        }],
        plan_start_type: "1", //计划开始类型,1-发布成功后立即，2-指定时间
        plan_start_time: "2017-09-19 12:12:00",
        plan_end_time: "2017-09-19 12:12:00",
        draft_matters: [ //步骤信息
            {
                "matter_name": "未命名事项1", //事项名称
                "description": "这是事项描述这是事项描述这是事项描述这是事项描述这是事项描述这是事项描述这是事项描述", //事项描述
                "desc_forepart": "描述内容前段", //描述内容前段,结构化时用
                "desc_aftpart": "描述内容后段", //描述内容后段,结构化时用
                "desc_photos": ["key"], //描述中的图片
                "desc_objs": [ //描述中涉及的对象                 
                    {
                        "obj_id": "111", //对象id，obj_name有值，obj_id没有值时代表是自定义对象
                        "obj_name": "@消防水泵控制A"
                    },
                    {
                        "obj_id": "222", //对象id，obj_name有值，obj_id没有值时代表是自定义对象
                        "obj_name": "@消防水泵控制b"
                    },
                    {
                        "obj_id": "333", //对象id，obj_name有值，obj_id没有值时代表是自定义对象
                        "obj_name": "@消防水泵控制c"
                    },

                ],
                "desc_sops": [ //描述中涉及的sop  
                    {
                        "sop_id": "111", //sop的id
                        "sop_name": "#季度检修保养",
                        "version": "v1.3" //sop版本
                    },

                ],
                "desc_works": [ //描述中涉及的工作内容    
                    {
                        "work_id": "work_id", //工作内容id
                        "work_name": "work_name", //工作内容名称
                        "pre_conform": "pre_conform", //强制确认
                        "content": "content", //操作内容
                        "content_objs": [{ //操作内容中涉及的对象
                                "obj_id": "",
                                "obj_name": "", //对象名称
                                "obj_type": "equip" //对象类型,子项见后边
                            },

                        ],
                        "notice": "***", //注意事项
                        "confirm_result": [ //需确认的操作结果
                            {
                                "obj_id": "11",
                                "obj_name": "啦啦",
                                "obj_type": "啦啦",
                                "parents": [
                                    { "parent_ids": ["***", "***", "***"], "parent_names": ["建筑1", "楼层1", "空间"] },
                                    { "parent_ids": ["***", "***"], "parent_names": ["专业1", "系统1"] },
                                    { "parent_ids": ["***", "***", "***"], "parent_names": ["专业1", "系统大类", "设备大类"] }
                                ],
                                "info_points": [
                                    { "id": "***", "code": "****", "name": "****", "unit": "m", "value": "120" },
                                    { "id": "***", "code": "****", "name": "****", "unit": "m", "value": "200" }
                                ],
                                "customs": [ //自定义项，type：1-文本，2-单选，3-多选,4、无单位的数字,5、有单位的数字
                                    { "name": "确认信息1", "type": "1" },
                                    { "name": "确认信息2", "type": "2", "items": ["选项1", "选项2", "选项3"] },
                                    { "name": "确认信息3", "type": "3", "items": ["选项1", "选项2", "选项3"] },
                                    { "name": "确认信息4", "type": "4" },
                                    { "name": "确认信息5", "type": "5", "unit": "***" }
                                ]
                            }, {

                            }


                        ],
                        "domain": "***", //专业code
                        "domain_name": "***" //专业名称
                    },

                ],
                "required_control": ["code", "code"]
            },
            {
                "matter_name": "未命名事项1", //事项名称
                "description": "这是事项描述这是事项描述这是事项描述这是事项描述这是事项描述这是事项描述这是事项描述", //事项描述
                "desc_forepart": "描述内容前段", //描述内容前段,结构化时用
                "desc_aftpart": "描述内容后段", //描述内容后段,结构化时用
                "desc_photos": [], //描述中的图片
                "desc_objs": [ //描述中涉及的对象                 
                    {
                        "obj_id": "111", //对象id，obj_name有值，obj_id没有值时代表是自定义对象
                        "obj_name": "@消防水泵控制A"
                    },
                    {
                        "obj_id": "222", //对象id，obj_name有值，obj_id没有值时代表是自定义对象
                        "obj_name": "@消防水泵控制b"
                    },
                    {
                        "obj_id": "333", //对象id，obj_name有值，obj_id没有值时代表是自定义对象
                        "obj_name": "@消防水泵控制c"
                    },

                ],
                "desc_sops": [ //描述中涉及的sop  
                    {
                        "sop_id": "111", //sop的id
                        "sop_name": "#季度检修保养",
                        "version": "v1.3" //sop版本
                    },

                ],
                "desc_works": [ //描述中涉及的工作内容    
                    {
                        "work_id": "work_id", //工作内容id
                        "work_name": "work_name", //工作内容名称
                        "pre_conform": "pre_conform", //强制确认
                        "content": "content", //操作内容
                        "content_objs": [{ //操作内容中涉及的对象
                                "obj_id": "",
                                "obj_name": "", //对象名称
                                "obj_type": "equip" //对象类型,子项见后边
                            },

                        ],
                        "notice": "***", //注意事项
                        "confirm_result": [ //需确认的操作结果
                            {
                                "obj_id": "11",
                                "obj_name": "啦啦",
                                "obj_type": "啦啦",
                                "parents": [
                                    { "parent_ids": ["***", "***", "***"], "parent_names": ["建筑1", "楼层1", "空间"] },
                                    { "parent_ids": ["***", "***"], "parent_names": ["专业1", "系统1"] },
                                    { "parent_ids": ["***", "***", "***"], "parent_names": ["专业1", "系统大类", "设备大类"] }
                                ],
                                "info_points": [
                                    { "id": "***", "code": "****", "name": "****" },
                                    { "id": "***", "code": "****", "name": "****" }
                                ],
                                "customs": [ //自定义项，type：1-文本，2-单选，3-多选,4、无单位的数字,5、有单位的数字
                                    { "name": "确认信息1", "type": "1" },
                                    { "name": "确认信息2", "type": "2", "items": ["选项1", "选项2", "选项3"] },
                                    { "name": "确认信息3", "type": "3", "items": ["选项1", "选项2", "选项3"] },
                                    { "name": "确认信息4", "type": "4" },
                                    { "name": "确认信息5", "type": "5", "unit": "***" }
                                ]
                            }, {

                            }


                        ],
                        "domain": "***", //专业code
                        "domain_name": "***" //专业名称
                    },

                ],
                "required_control": ["code", "code"]
            },

        ],
        destroy_person_id: "111",
        destroy_person_named: "李四",
        destroy_time: "2017-09-19 12:12:00",
        create_time: "2017-09-19 12:12:00",
        update_time: "2017-09-19 12:12:00",

    },
    oldOrderList: [{
            order_id: "111",
            create_time: "2017.05.01 08:00",
            close_time: "2017.05.01 08:00",
            participants: "张三,李四",
            order_state_name: "执行中"
        },
        {
            order_id: "111",
            create_time: "2017.05.01 08:00",
            close_time: "2017.05.01 08:00",
            participants: "张三,李四",
            order_state_name: "执行中"
        }, {
            order_id: "111",
            create_time: "2017.05.01 08:00",
            close_time: "2017.05.01 08:00",
            participants: "张三,李四",
            order_state_name: "执行中"
        }, {
            order_id: "111",
            create_time: "2017.05.01 08:00",
            close_time: "2017.05.01 08:00",
            participants: "张三,李四",
            order_state_name: "执行中"
        }
    ],
    historyRecordList: [{
        plan_id: "aaaaaa",
        project_id: "aaaaa",
        plan_name: "消防水泵维保计划",
        order_type: "1",
        order_type_name: "维保",
        urgency: "高",
        ahead_create_time: "10",
        freq_cycle: "w",
        freq_num: "22",
        freq_times: [{
            "start_time": {
                "cycle": "w", //周期,y/m/w/d
                "time_day": "06.12", //周一，1号，“0612”,6月12日
                "time_hour": "10", //10时
                "time_minute": "15" //15分
            },
            "end_time": {
                "cycle": "w",
                "time_day": "06.12",
                "time_hour": "20",
                "time_minute": "15"
            }

        }, {
            "start_time": {
                "cycle": "w", //周期,y/m/w/d
                "time_day": "06.12", //周一，1号，“0612”,6月12日
                "time_hour": "10", //10时
                "time_minute": "15" //15分
            },
            "end_time": {
                "cycle": "w",
                "time_day": "06.12",
                "time_hour": "20",
                "time_minute": "15"
            }

        }, {
            "start_time": {
                "cycle": "w", //周期,y/m/w/d
                "time_day": "06.12", //周一，1号，“0612”,6月12日
                "time_hour": "10", //10时
                "time_minute": "15" //15分
            },
            "end_time": {
                "cycle": "w",
                "time_day": "06.12",
                "time_hour": "20",
                "time_minute": "15"
            }

        }],
        plan_start_type: "1", //计划开始类型,1-发布成功后立即，2-指定时间
        plan_start_time: "2017.09.19 12:12:00",
        plan_end_time: "2017.09.19 12:12:00",
        draft_matters: [ //步骤信息
            {
                "matter_name": "未命名事项1", //事项名称
                "description": "这是事项描述这是事项描述这是事项描述这是事项描述这是事项描述这是事项描述这是事项描述", //事项描述
                "desc_forepart": "描述内容前段", //描述内容前段,结构化时用
                "desc_aftpart": "描述内容后段", //描述内容后段,结构化时用
                "desc_photos": [], //描述中的图片
                "desc_objs": [ //描述中涉及的对象                 
                    {
                        "obj_id": "111", //对象id，obj_name有值，obj_id没有值时代表是自定义对象
                        "obj_name": "@消防水泵控制A"
                    },
                    {
                        "obj_id": "222", //对象id，obj_name有值，obj_id没有值时代表是自定义对象
                        "obj_name": "@消防水泵控制b"
                    },
                    {
                        "obj_id": "333", //对象id，obj_name有值，obj_id没有值时代表是自定义对象
                        "obj_name": "@消防水泵控制c"
                    },

                ],
                "desc_sops": [ //描述中涉及的sop  
                    {
                        "sop_id": "111", //sop的id
                        "sop_name": "#季度检修保养",
                        "version": "v1.3" //sop版本
                    },

                ],
                "desc_works": [ //描述中涉及的工作内容    
                    {
                        "work_id": "work_id", //工作内容id
                        "work_name": "work_name", //工作内容名称
                        "pre_conform": "pre_conform", //强制确认
                        "content": "content", //操作内容
                        "content_objs": [{ //操作内容中涉及的对象
                                "obj_id": "",
                                "obj_name": "", //对象名称
                                "obj_type": "equip" //对象类型,子项见后边
                            },

                        ],
                        "notice": "***", //注意事项
                        "confirm_result": [ //需确认的操作结果
                            {
                                "obj_id": "11",
                                "obj_name": "啦啦",
                                "obj_type": "啦啦",
                                "parents": [
                                    { "parent_ids": ["***", "***", "***"], "parent_names": ["建筑1", "楼层1", "空间"] },
                                    { "parent_ids": ["***", "***"], "parent_names": ["专业1", "系统1"] },
                                    { "parent_ids": ["***", "***", "***"], "parent_names": ["专业1", "系统大类", "设备大类"] }
                                ],
                                "info_points": [
                                    { "id": "***", "code": "****", "name": "****" },
                                    { "id": "***", "code": "****", "name": "****" }
                                ],
                                "customs": [ //自定义项，type：1-文本，2-单选，3-多选,4、无单位的数字,5、有单位的数字
                                    { "name": "确认信息1", "type": "1" },
                                    { "name": "确认信息2", "type": "2", "items": ["选项1", "选项2", "选项3"] },
                                    { "name": "确认信息3", "type": "3", "items": ["选项1", "选项2", "选项3"] },
                                    { "name": "确认信息4", "type": "4" },
                                    { "name": "确认信息5", "type": "5", "unit": "***" }
                                ]
                            }, {

                            }


                        ],
                        "domain": "***", //专业code
                        "domain_name": "***" //专业名称
                    },

                ],
                "required_control": ["code", "code"]
            },
            {
                "matter_name": "未命名事项1", //事项名称
                "description": "这是事项描述这是事项描述这是事项描述这是事项描述这是事项描述这是事项描述这是事项描述", //事项描述
                "desc_forepart": "描述内容前段", //描述内容前段,结构化时用
                "desc_aftpart": "描述内容后段", //描述内容后段,结构化时用
                "desc_photos": [], //描述中的图片
                "desc_objs": [ //描述中涉及的对象                 
                    {
                        "obj_id": "111", //对象id，obj_name有值，obj_id没有值时代表是自定义对象
                        "obj_name": "@消防水泵控制A"
                    },
                    {
                        "obj_id": "222", //对象id，obj_name有值，obj_id没有值时代表是自定义对象
                        "obj_name": "@消防水泵控制b"
                    },
                    {
                        "obj_id": "333", //对象id，obj_name有值，obj_id没有值时代表是自定义对象
                        "obj_name": "@消防水泵控制c"
                    },

                ],
                "desc_sops": [ //描述中涉及的sop  
                    {
                        "sop_id": "111", //sop的id
                        "sop_name": "#季度检修保养",
                        "version": "v1.3" //sop版本
                    },

                ],
                "desc_works": [ //描述中涉及的工作内容    
                    {
                        "work_id": "work_id", //工作内容id
                        "work_name": "work_name", //工作内容名称
                        "pre_conform": "pre_conform", //强制确认
                        "content": "content", //操作内容
                        "content_objs": [{ //操作内容中涉及的对象
                                "obj_id": "",
                                "obj_name": "", //对象名称
                                "obj_type": "equip" //对象类型,子项见后边
                            },

                        ],
                        "notice": "***", //注意事项
                        "confirm_result": [ //需确认的操作结果
                            {
                                "obj_id": "11",
                                "obj_name": "啦啦",
                                "obj_type": "啦啦",
                                "parents": [
                                    { "parent_ids": ["***", "***", "***"], "parent_names": ["建筑1", "楼层1", "空间"] },
                                    { "parent_ids": ["***", "***"], "parent_names": ["专业1", "系统1"] },
                                    { "parent_ids": ["***", "***", "***"], "parent_names": ["专业1", "系统大类", "设备大类"] }
                                ],
                                "info_points": [
                                    { "id": "***", "code": "****", "name": "****" },
                                    { "id": "***", "code": "****", "name": "****" }
                                ],
                                "customs": [ //自定义项，type：1-文本，2-单选，3-多选,4、无单位的数字,5、有单位的数字
                                    { "name": "确认信息1", "type": "1" },
                                    { "name": "确认信息2", "type": "2", "items": ["选项1", "选项2", "选项3"] },
                                    { "name": "确认信息3", "type": "3", "items": ["选项1", "选项2", "选项3"] },
                                    { "name": "确认信息4", "type": "4" },
                                    { "name": "确认信息5", "type": "5", "unit": "***" }
                                ]
                            }, {

                            }


                        ],
                        "domain": "***", //专业code
                        "domain_name": "***" //专业名称
                    },

                ],
                "required_control": ["code", "code"]
            },

        ],
        destroy_person_id: "111",
        destroy_person_named: "李四",
        destroy_time: "2017-09-19 12:12:00",
        create_time: "2017-09-19 12:12:00",
        update_time: "2017-09-19 12:12:00",

    }, {
        plan_id: "aaaaaa",
        project_id: "aaaaa",
        plan_name: "消防水泵维保计划",
        order_type: "1",
        order_type_name: "维保",
        urgency: "高",
        ahead_create_time: "10",
        freq_cycle: "w",
        freq_num: "22",
        freq_times: [{
            "start_time": {
                "cycle": "w", //周期,y/m/w/d
                "time_day": "06.12", //周一，1号，“0612”,6月12日
                "time_hour": "10", //10时
                "time_minute": "15" //15分
            },
            "end_time": {
                "cycle": "w",
                "time_day": "06.12",
                "time_hour": "20",
                "time_minute": "15"
            }

        }, {
            "start_time": {
                "cycle": "w", //周期,y/m/w/d
                "time_day": "06.12", //周一，1号，“0612”,6月12日
                "time_hour": "10", //10时
                "time_minute": "15" //15分
            },
            "end_time": {
                "cycle": "w",
                "time_day": "06.12",
                "time_hour": "20",
                "time_minute": "15"
            }

        }, {
            "start_time": {
                "cycle": "w", //周期,y/m/w/d
                "time_day": "06.12", //周一，1号，“0612”,6月12日
                "time_hour": "10", //10时
                "time_minute": "15" //15分
            },
            "end_time": {
                "cycle": "w",
                "time_day": "06.12",
                "time_hour": "20",
                "time_minute": "15"
            }

        }],
        plan_start_type: "1", //计划开始类型,1-发布成功后立即，2-指定时间
        plan_start_time: "2017-09-19 12:12:00",
        plan_end_time: "2017-09-19 12:12:00",
        draft_matters: [ //步骤信息
            {
                "matter_name": "未命名事项1", //事项名称
                "description": "这是事项描述这是事项描述这是事项描述这是事项描述这是事项描述这是事项描述这是事项描述", //事项描述
                "desc_forepart": "描述内容前段", //描述内容前段,结构化时用
                "desc_aftpart": "描述内容后段", //描述内容后段,结构化时用
                "desc_photos": [], //描述中的图片
                "desc_objs": [ //描述中涉及的对象                 
                    {
                        "obj_id": "111", //对象id，obj_name有值，obj_id没有值时代表是自定义对象
                        "obj_name": "@消防水泵控制A"
                    },
                    {
                        "obj_id": "222", //对象id，obj_name有值，obj_id没有值时代表是自定义对象
                        "obj_name": "@消防水泵控制b"
                    },
                    {
                        "obj_id": "333", //对象id，obj_name有值，obj_id没有值时代表是自定义对象
                        "obj_name": "@消防水泵控制c"
                    },

                ],
                "desc_sops": [ //描述中涉及的sop  
                    {
                        "sop_id": "111", //sop的id
                        "sop_name": "#季度检修保养",
                        "version": "v1.3" //sop版本
                    },

                ],
                "desc_works": [ //描述中涉及的工作内容    
                    {
                        "work_id": "work_id", //工作内容id
                        "work_name": "work_name", //工作内容名称
                        "pre_conform": "pre_conform", //强制确认
                        "content": "content", //操作内容
                        "content_objs": [{ //操作内容中涉及的对象
                                "obj_id": "",
                                "obj_name": "", //对象名称
                                "obj_type": "equip" //对象类型,子项见后边
                            },

                        ],
                        "notice": "***", //注意事项
                        "confirm_result": [ //需确认的操作结果
                            {
                                "obj_id": "11",
                                "obj_name": "啦啦",
                                "obj_type": "啦啦",
                                "parents": [
                                    { "parent_ids": ["***", "***", "***"], "parent_names": ["建筑1", "楼层1", "空间"] },
                                    { "parent_ids": ["***", "***"], "parent_names": ["专业1", "系统1"] },
                                    { "parent_ids": ["***", "***", "***"], "parent_names": ["专业1", "系统大类", "设备大类"] }
                                ],
                                "info_points": [
                                    { "id": "***", "code": "****", "name": "****" },
                                    { "id": "***", "code": "****", "name": "****" }
                                ],
                                "customs": [ //自定义项，type：1-文本，2-单选，3-多选,4、无单位的数字,5、有单位的数字
                                    { "name": "确认信息1", "type": "1" },
                                    { "name": "确认信息2", "type": "2", "items": ["选项1", "选项2", "选项3"] },
                                    { "name": "确认信息3", "type": "3", "items": ["选项1", "选项2", "选项3"] },
                                    { "name": "确认信息4", "type": "4" },
                                    { "name": "确认信息5", "type": "5", "unit": "***" }
                                ]
                            }, {

                            }


                        ],
                        "domain": "***", //专业code
                        "domain_name": "***" //专业名称
                    },

                ],
                "required_control": ["code", "code"]
            },
            {
                "matter_name": "未命名事项1", //事项名称
                "description": "这是事项描述这是事项描述这是事项描述这是事项描述这是事项描述这是事项描述这是事项描述", //事项描述
                "desc_forepart": "描述内容前段", //描述内容前段,结构化时用
                "desc_aftpart": "描述内容后段", //描述内容后段,结构化时用
                "desc_photos": [], //描述中的图片
                "desc_objs": [ //描述中涉及的对象                 
                    {
                        "obj_id": "111", //对象id，obj_name有值，obj_id没有值时代表是自定义对象
                        "obj_name": "@消防水泵控制A"
                    },
                    {
                        "obj_id": "222", //对象id，obj_name有值，obj_id没有值时代表是自定义对象
                        "obj_name": "@消防水泵控制b"
                    },
                    {
                        "obj_id": "333", //对象id，obj_name有值，obj_id没有值时代表是自定义对象
                        "obj_name": "@消防水泵控制c"
                    },

                ],
                "desc_sops": [ //描述中涉及的sop  
                    {
                        "sop_id": "111", //sop的id
                        "sop_name": "#季度检修保养",
                        "version": "v1.3" //sop版本
                    },

                ],
                "desc_works": [ //描述中涉及的工作内容    
                    {
                        "work_id": "work_id", //工作内容id
                        "work_name": "work_name", //工作内容名称
                        "pre_conform": "pre_conform", //强制确认
                        "content": "content", //操作内容
                        "content_objs": [{ //操作内容中涉及的对象
                                "obj_id": "",
                                "obj_name": "", //对象名称
                                "obj_type": "equip" //对象类型,子项见后边
                            },

                        ],
                        "notice": "***", //注意事项
                        "confirm_result": [ //需确认的操作结果
                            {
                                "obj_id": "11",
                                "obj_name": "啦啦",
                                "obj_type": "啦啦",
                                "parents": [
                                    { "parent_ids": ["***", "***", "***"], "parent_names": ["建筑1", "楼层1", "空间"] },
                                    { "parent_ids": ["***", "***"], "parent_names": ["专业1", "系统1"] },
                                    { "parent_ids": ["***", "***", "***"], "parent_names": ["专业1", "系统大类", "设备大类"] }
                                ],
                                "info_points": [
                                    { "id": "***", "code": "****", "name": "****" },
                                    { "id": "***", "code": "****", "name": "****" }
                                ],
                                "customs": [ //自定义项，type：1-文本，2-单选，3-多选,4、无单位的数字,5、有单位的数字
                                    { "name": "确认信息1", "type": "1" },
                                    { "name": "确认信息2", "type": "2", "items": ["选项1", "选项2", "选项3"] },
                                    { "name": "确认信息3", "type": "3", "items": ["选项1", "选项2", "选项3"] },
                                    { "name": "确认信息4", "type": "4" },
                                    { "name": "确认信息5", "type": "5", "unit": "***" }
                                ]
                            }, {

                            }


                        ],
                        "domain": "***", //专业code
                        "domain_name": "***" //专业名称
                    },

                ],
                "required_control": ["code", "code"]
            },

        ],
        destroy_person_id: "111",
        destroy_person_named: "李四",
        destroy_time: "2017-09-19 12:12:00",
        create_time: "2017-09-19 12:12:00",
        update_time: "2017-09-19 12:12:00",

    }, ],
    planDetailData: {
        plan_id: "aaaaaa",
        project_id: "aaaaa",
        plan_name: "消防水泵维保计划",
        order_type: "1",
        order_type_name: "维保",
        urgency: "高",
        ahead_create_time: "10",
        freq_cycle: "w",
        freq_num: "22",
        freq_times: [{
            "start_time": {
                "cycle": "w", //周期,y/m/w/d
                "time_day": "06.12", //周一，1号，“0612”,6月12日
                "time_hour": "10", //10时
                "time_minute": "15" //15分
            },
            "end_time": {
                "cycle": "w",
                "time_day": "06.12",
                "time_hour": "20",
                "time_minute": "15"
            }

        }, {
            "start_time": {
                "cycle": "w", //周期,y/m/w/d
                "time_day": "06.12", //周一，1号，“0612”,6月12日
                "time_hour": "10", //10时
                "time_minute": "15" //15分
            },
            "end_time": {
                "cycle": "w",
                "time_day": "06.12",
                "time_hour": "20",
                "time_minute": "15"
            }

        }, {
            "start_time": {
                "cycle": "w", //周期,y/m/w/d
                "time_day": "06.12", //周一，1号，“0612”,6月12日
                "time_hour": "10", //10时
                "time_minute": "15" //15分
            },
            "end_time": {
                "cycle": "w",
                "time_day": "06.12",
                "time_hour": "20",
                "time_minute": "15"
            }

        }],
        plan_start_type: "1", //计划开始类型,1-发布成功后立即，2-指定时间
        plan_start_time: "2017-09-19 12:12:00",
        plan_end_time: "2017-09-19 12:12:00",
        draft_matters: [ //步骤信息
            {
                "matter_name": "未命名事项1", //事项名称
                "description": "这是事项描述这是事项描述这是事项描述这是事项描述这是事项描述这是事项描述这是事项描述", //事项描述
                "desc_forepart": "描述内容前段", //描述内容前段,结构化时用
                "desc_aftpart": "描述内容后段", //描述内容后段,结构化时用
                "desc_photos": [], //描述中的图片
                "desc_objs": [ //描述中涉及的对象                 
                    {
                        "obj_id": "111", //对象id，obj_name有值，obj_id没有值时代表是自定义对象
                        "obj_name": "@消防水泵控制A"
                    },
                    {
                        "obj_id": "222", //对象id，obj_name有值，obj_id没有值时代表是自定义对象
                        "obj_name": "@消防水泵控制b"
                    },
                    {
                        "obj_id": "333", //对象id，obj_name有值，obj_id没有值时代表是自定义对象
                        "obj_name": "@消防水泵控制c"
                    },

                ],
                "desc_sops": [ //描述中涉及的sop  
                    {
                        "sop_id": "111", //sop的id
                        "sop_name": "#季度检修保养",
                        "version": "v1.3" //sop版本
                    },

                ],
                "desc_works": [ //描述中涉及的工作内容    
                    {
                        "work_id": "work_id", //工作内容id
                        "work_name": "work_name", //工作内容名称
                        "pre_conform": "pre_conform", //强制确认
                        "content": "content", //操作内容
                        "content_objs": [{ //操作内容中涉及的对象
                                "obj_id": "",
                                "obj_name": "", //对象名称
                                "obj_type": "equip" //对象类型,子项见后边
                            },

                        ],
                        "notice": "***", //注意事项
                        "confirm_result": [ //需确认的操作结果
                            {
                                "obj_id": "11",
                                "obj_name": "啦啦",
                                "obj_type": "啦啦",
                                "parents": [
                                    { "parent_ids": ["***", "***", "***"], "parent_names": ["建筑1", "楼层1", "空间"] },
                                    { "parent_ids": ["***", "***"], "parent_names": ["专业1", "系统1"] },
                                    { "parent_ids": ["***", "***", "***"], "parent_names": ["专业1", "系统大类", "设备大类"] }
                                ],
                                "info_points": [
                                    { "id": "***", "code": "****", "name": "****" },
                                    { "id": "***", "code": "****", "name": "****" }
                                ],
                                "customs": [ //自定义项，type：1-文本，2-单选，3-多选,4、无单位的数字,5、有单位的数字
                                    { "name": "确认信息1", "type": "1" },
                                    { "name": "确认信息2", "type": "2", "items": ["选项1", "选项2", "选项3"] },
                                    { "name": "确认信息3", "type": "3", "items": ["选项1", "选项2", "选项3"] },
                                    { "name": "确认信息4", "type": "4" },
                                    { "name": "确认信息5", "type": "5", "unit": "***" }
                                ]
                            }, {

                            }


                        ],
                        "domain": "***", //专业code
                        "domain_name": "***" //专业名称
                    },

                ],
                "required_control": ["code", "code"]
            },
            {
                "matter_name": "未命名事项1", //事项名称
                "description": "这是事项描述这是事项描述这是事项描述这是事项描述这是事项描述这是事项描述这是事项描述", //事项描述
                "desc_forepart": "描述内容前段", //描述内容前段,结构化时用
                "desc_aftpart": "描述内容后段", //描述内容后段,结构化时用
                "desc_photos": [], //描述中的图片
                "desc_objs": [ //描述中涉及的对象                 
                    {
                        "obj_id": "111", //对象id，obj_name有值，obj_id没有值时代表是自定义对象
                        "obj_name": "@消防水泵控制A"
                    },
                    {
                        "obj_id": "222", //对象id，obj_name有值，obj_id没有值时代表是自定义对象
                        "obj_name": "@消防水泵控制b"
                    },
                    {
                        "obj_id": "333", //对象id，obj_name有值，obj_id没有值时代表是自定义对象
                        "obj_name": "@消防水泵控制c"
                    },

                ],
                "desc_sops": [ //描述中涉及的sop  
                    {
                        "sop_id": "111", //sop的id
                        "sop_name": "#季度检修保养",
                        "version": "v1.3" //sop版本
                    },

                ],
                "desc_works": [ //描述中涉及的工作内容    
                    {
                        "work_id": "work_id", //工作内容id
                        "work_name": "work_name", //工作内容名称
                        "pre_conform": "pre_conform", //强制确认
                        "content": "content", //操作内容
                        "content_objs": [{ //操作内容中涉及的对象
                                "obj_id": "",
                                "obj_name": "", //对象名称
                                "obj_type": "equip" //对象类型,子项见后边
                            },

                        ],
                        "notice": "***", //注意事项
                        "confirm_result": [ //需确认的操作结果
                            {
                                "obj_id": "11",
                                "obj_name": "啦啦",
                                "obj_type": "啦啦",
                                "parents": [
                                    { "parent_ids": ["***", "***", "***"], "parent_names": ["建筑1", "楼层1", "空间"] },
                                    { "parent_ids": ["***", "***"], "parent_names": ["专业1", "系统1"] },
                                    { "parent_ids": ["***", "***", "***"], "parent_names": ["专业1", "系统大类", "设备大类"] }
                                ],
                                "info_points": [
                                    { "id": "***", "code": "****", "name": "****" },
                                    { "id": "***", "code": "****", "name": "****" }
                                ],
                                "customs": [ //自定义项，type：1-文本，2-单选，3-多选,4、无单位的数字,5、有单位的数字
                                    { "name": "确认信息1", "type": "1" },
                                    { "name": "确认信息2", "type": "2", "items": ["选项1", "选项2", "选项3"] },
                                    { "name": "确认信息3", "type": "3", "items": ["选项1", "选项2", "选项3"] },
                                    { "name": "确认信息4", "type": "4" },
                                    { "name": "确认信息5", "type": "5", "unit": "***" }
                                ]
                            }, {

                            }


                        ],
                        "domain": "***", //专业code
                        "domain_name": "***" //专业名称
                    },

                ],
                "required_control": ["code", "code"]
            },

        ],
        destroy_person_id: "111",
        destroy_person_named: "李四",
        destroy_time: "2017-09-19 12:12:00",
        create_time: "2017-09-19 12:12:00",
        update_time: "2017-09-19 12:12:00",

    },
    orderDetailData: {
        "order_id": "111", //工单id，id为空时新增，不为空时是修改
        "project_id": "1111", //项目id，必须
        "order_type": "", //工单类型
        "order_type_name": "维修", //工单类型名称
        "execute_type": "xxx", //工单执行类型编码,数据字典查名称
        "urgency": "高", //紧急程度，高、中、低
        "executie_mode": "***", //工单执行方式编码,数据字典查名称
        "start_time_type": "1", //开始时间类型,1-发单后立即开始，2-自定义开始时间
        "ask_start_time": "20170620180000", //要求开始时间,yyyyMMddhhmmss
        "ask_end_limit": "2", //要求固定时间内完成,单位小时
        "ask_end_time": "20170622180000", //要求结束时间,yyyyMMddhhmmss
        "required_tools": ["工具A", "工具B"], //所需工具
        "order_state": "***", //工单状态编码
        "order_state_name": "***", //工单状态名称
        "custom_state": "***", //工单自定义状态编码
        "custom_state_name": "***", //工单自定义状态名称
        "summary": "***", //工单概述,事项名称的串连
        "order_from_type": "***", //工单来源类型,1-正常创建，2-工单计划，3-报修转工单，默认1
        "order_from_id": "***", //工单来源id，报修转工单时，这里是报修单id
        "creator_id": "***", //创建人id
        "creator_name": "***", //创建人名字
        "domain_list": ["code1", "code2"], //工单中专业列表，code
        "limit_domain": true, //专业限制
        "matters": [ //工单事项
            {
                "$ID": "***", //引擎需要的id，同matter_id，后台使用
                "matter_id": "***", //事项id
                "matter_name": "维保计划1", //事项名称
                "matter_steps": [ //事项步骤                
                    {
                        "$ID": "***", //引擎需要的id，同obj_step_id，后台使用
                        "obj_step_id": "***", //对象步骤id
                        "description": "@消防水泵#季度巡检补充检查", //事项概述
                        "obj_id": "***", //对象id，可能为空
                        "obj_name": "***", //对象名称 ，可能为空
                        "steps": [ //步骤
                            {
                                "step_id": "***", //步骤id,obj_step_id+"_"+step_sequence组成
                                "step_sequence": "1-1", //步骤序号 
                                "step_type": "3", //步骤类型：1-文字输入,2-上传照片,3-拍照,4-扫码,5-工作内容,6-签字,
                                "content": "到达指定位置拍照" //操作内容描述
                            },
                            {
                                "step_id": "***", //步骤id,obj_step_id+"_"+step_sequence组成
                                "step_sequence": "1-2", //步骤序号 
                                "step_type": "4", //步骤类型：1-文字输入,2-上传照片,3-拍照,4-扫码,5-工作内容,6-签字,
                                "content": "到达指定位置扫码" //操作内容描述
                            },
                            {
                                "step_id": "***", //步骤id,obj_step_id+"_"+step_sequence组成
                                "step_sequence": "2-1", //步骤序号 
                                "step_type": "5",
                                "pre_conform": "*****", //强制确认
                                "content": "***", //操作内容
                                //操作内容中涉及的对象
                                "content_objs": [{
                                    "obj_id": "***", //对象id
                                    "obj_name": "对象名称1", //对象名称
                                    "obj_type": "equip" //对象类型,子项见后边
                                }, ],
                                "notice": "确认电闸已经关闭", //注意事项
                                "pre_conform": "确认电闸已经关闭", //强制确认
                                "confirm_result": [ //需确认的操作结果
                                    {
                                        "obj_id": " ** * ",
                                        "obj_name": " 设备类 ",
                                        "obj_type": "***",
                                        "parents": [
                                            
                                            { "parent_ids": ["***", "***"], "parent_names": ["专业1", "系统1"] }
                                        ],
                                        "info_points": [ //信息点组件数据源类型-待定
                                            { "id": "***", "code": "***", "name": "信息点", "unit": "m", "value": "120", "cmpt": "A" },
                                            { "id": "***", "code": "***", "name": "信息点", "unit": "m", "value": "200", "cmpt": "B", "cmpt_data": [] }
                                        ],
                                        "customs": [ //自定义项，type：1-文本，2-单选，3-多选,4、无单位的数字,5、有单位的数字
                                            { "name": "确认信息2", "type": "1" },
                                            { "name": "确认信息2", "type": "2", "items": ["选项1", "选项2", "选项3"] },
                                            { "name": "确认信息3", "type": "3", "items": ["选项1", "选项2", "选项3"] },
                                            { "name": "确认信息4", "type": "4" },
                                            { "name": "确认信息5", "type": "5", "unit": "***" }
                                        ]
                                    },
                                ],
                                "domain": "***", //专业code
                                "domain_name": "***" //专业名称
                            },
                            {
                                "step_id": "***", //步骤id,obj_step_id+"_"+step_sequence组成
                                "step_sequence": "2-2", //步骤序号 
                                "step_type": "5",
                                "pre_conform": "*****", //强制确认
                                "content": "***", //操作内容
                                //操作内容中涉及的对象
                                "content_objs": [{
                                    "obj_id": "***", //对象id
                                    "obj_name": "对象名称1", //对象名称
                                    "obj_type": "equip" //对象类型,子项见后边
                                }, ],
                                "notice": "***", //注意事项

                                "confirm_result": [ //需确认的操作结果
                                    {
                                        "obj_id": "** * ",
                                        "obj_name": " ** * ",
                                        "obj_type": "***",
                                        "parents": [
                                            { "parent_ids": ["***", "***", "***"], "parent_names": ["建筑1", "楼层1", "空间"] },
                                            
                                        ],
                                        "info_points": [ //信息点组件数据源类型-待定
                                            { "id": "***", "code": "***", "name": "***", "unit": "m", "value": "120", "cmpt": "A" },
                                            { "id": "***", "code": "***", "name": "***", "unit": "m", "value": "200", "cmpt": "B", "cmpt_data": [{ "code": "***", "name": "***" }] }
                                        ],
                                        "customs": [ //自定义项，type：1-文本，2-单选，3-多选,4、无单位的数字,5、有单位的数字
                                            { "name": "确认信息1", "type": "1" },
                                            { "name": "确认信息2", "type": "2", "items": ["选项1", "选项2", "选项3"] },
                                            { "name": "确认信息3", "type": "3", "items": ["选项1", "选项2", "选项3"] },
                                            { "name": "确认信息4", "type": "4" },
                                            { "name": "确认信息5", "type": "5", "unit": "***" }
                                        ]
                                    },
                                ],
                                "domain": "***", //专业code
                                "domain_name": "***" //专业名称
                            },
                        ],
                        "feedback": [ //反馈信息
                            {
                                "$ID": "****", //引擎需要的id，同step_id，后台使用
                                "step_id": "***", //步骤id
                                "step_sequence": "1-1", //步骤序号 
                                "step_type": "5", //步骤类型：1-文字输入,2-上传照片,3-拍照,4-扫码,5-工作内容,6-签字,
                                "pre_conform_result": "前提已确认", //前提确认结果
                                "description": "已完成", //反馈描述

                                "info_points": [ //信息点信息反馈
                                    { "id": "***", "code": "***", "name": "***", "unit": "m", "value": "123" },
                                    { "id": "***", "code": "***", "name": "***", "unit": "m", "value": "456" }
                                ],
                                "customs": [ //自定义项，type的值不存在或者为1时，返回"content"  
                                    { "name": "确认信息1", "type": "1", "content": "信息1" },
                                    { "name": "确认信息2", "type": "2", "item": "信息2" },
                                    { "name": "确认信息3", "type": "3", "items": ["信息3", "信息3"] },
                                    { "name": "确认信息4", "type": "4", "value": "123" },
                                    { "name": "确认信息5", "type": "5", "value": "456", "unit": "***" }
                                ], //确认信息选项
                                "photos": ["key", "key"], //图片key
                                "executor_id": "***", //执行人Id
                                "operate_time": "" //操作时间，yyyyMMddHHmmss
                            },
                            {
                                "step_sequence": "1-1", //步骤序号 
                                "step_type": "3", //步骤类型：1-文字输入，3-拍照，4-扫码、5-工作内容、6-签字，
                                "pre_conform_result": "前提已确认",
                                "content": "到达指定位置拍照" //操作内容描述
                            },
                        ],
                        "executors": ["name1", "name2"] //执行人
                    },
                    {
                        "$ID": "***", //引擎需要的id，同obj_step_id，后台使用
                        //"obj_step_id": "***", 对象步骤id
                        //"description": "@消防水泵#季度巡检补充检查", 事项概述
                        "steps": [ //步骤
                            {
                                "step_id": "***", //步骤id,obj_step_id+"_"+step_sequence组成
                                "step_sequence": "3-1", //步骤序号 
                                "step_type": "6", //步骤类型：1-文字输入，3-拍照，4-扫码、5-工作内容、6-签字，
                                "content": "结束该事项时签字" //操作内容描述
                            }
                        ],
                        "feedback": [ //反馈信息
                            {
                                "$ID": "****", //引擎需要的id，同step_id，后台使用,

                                "step_id": "***", //步骤id
                                "step_sequence": "3-1", //步骤序号 
                                "description": "****", //反馈描述

                                "photos": ["key", "key"

                                ], //图片key
                                "executor_id": "***", //执行人Id
                                "operate_time": "" //操作时间，yyyyMMddHHmmss
                            },

                        ],
                        "executors": ["张三"] //执行人
                    },

                ],
                "desc_photos": ["key1", "key2"], //描述中的图片
                "desc_sops": [ //描述中涉及的sop  
                    {
                        "sop_id": "",
                        "sop_name": "对象名称1", //sop名称
                        "version": "V1.3" //sop版本
                    },

                ],

            },


        ],
        "wo_exec_controls": [ //执行控制信息
            {
                "$ID": "****", //引擎需要的id，同exec_control_id，后台使用
                "exec_control_id": "***",
                "control_code": "apply", //控制模板编码,名称查询数据字典
                "operator_id": "***", //操作人id
                "operator_name": "张三", //操作人名字
                "operate_start_time": "20170902021200", //操作开始时间, yyyyMMddHHmmss
                "operate_end_time": "***", //操作结束时间, yyyyMMddHHmmss
                "apply_type": "finish", //申请类型，finish-正常结束，stop-中止
                "audit_result": "0", //审核结果,1-通过，0-不通过
                "opinion": "***", //意见
                "next_route": ["xx岗位", "张杰"], //下级路由
                "create_time": "***" //操作时间, yyyyMMddHHmmss
            },

        ],
        "publish_time": "20170620093000", //发布时间，yyyyMMddhhmmss
        "create_time": "20170620093000", //创建时间，yyyyMMddhhmmss
        "valid": true //有效状态 true：有效，false：失效
    },
    tableListData: [{
            "plan_id": "***", //计划id
            "plan_name": "***", //计划名称
            "plan_end_time": "***", //计划结束时间，yyyyMMddhhmmss
            "freq_cycle": "d", //计划频率-周期，y/m/w/d
            "freq_num": 3, //计划频率-次数
            "freq_cycle_desc": "每日3次", //计划频率描述
            "work_order_date": [ //时间段内生成工单数组
                {
                    "date": "20170911", //日期,yyyyMMdd
                    "work_orders": [ //时间段内生成工单数组
                        {
                            "order_id": "***",
                            "ask_start_time": "***",
                            "ask_end_time": "***",
                            "order_state": "***"
                        },
                        {
                            "ask_start_time": "" //该频次没有工单；
                        },
                        {
                            "order_id": "***",
                            "ask_start_time": "***",
                            "ask_end_time": "***",
                            "order_state": "***"
                        }
                    ]
                },
                {
                    "date": "20170913", //日期,yyyyMMdd
                    "work_orders": [ //时间段内生成工单数组
                        {
                            "order_id": "***",
                            "ask_start_time": "***",
                            "ask_end_time": "***",
                            "order_state": "***"
                        },
                        {
                            "order_id": "***",
                            "ask_start_time": "***",
                            "ask_end_time": "***",
                            "order_state": "***"
                        },
                        {
                            "ask_start_time": "***", //下次待发出工单；
                            "ask_end_time": "***"
                        }
                    ]
                },

            ]
        },
        {
            "plan_id": "***", //计划id
            "plan_name": "***", //计划名称
            "plan_end_time": "***", //计划结束时间，yyyyMMddhhmmss
            "freq_cycle": "d", //计划频率-周期，y/m/w/d
            "freq_num": 6, //计划频率-次数
            "freq_cycle_desc": "每日6次", //计划频率描述
            "work_order_date": []
        }
    ],
    orderOperatList: [{
            "operator_name": "张三", //操作人姓名
            "start_time": "20170921154700", //开始时间,yyyyMMddHHmmss 
            "use_times": "3天21小时" //耗时

        },
        {
            "operator_name": "李四", //操作人姓名
            "start_time": "20170921154700", //开始时间,yyyyMMddHHmmss 
            "use_times": "21小时43分" //耗时
        }
    ],
    tableListDay: [{
            "plan_id": "***", //计划id
            "plan_name": "维保计划", //计划名称
            "plan_end_time": "***", //计划结束时间，yyyyMMddhhmmss
            "freq_cycle": "d", //计划频率-周期，y/m/w/d
            "freq_num": 3, //计划频率-次数
            "max_freq_num": 3, //计划频率-次数，时间段内最大频次数
            "freq_cycle_desc": "每日3次", //计划频率描述
            "work_order_date": [ //时间段内生成工单数组
                {
                    "date": "20170911", //日期,yyyyMMdd
                    "work_orders": [ //时间段内生成工单数组
                        {
                            "order_id": "11",
                            "ask_start_time": "***",
                            "ask_end_time": "***",
                            "order_state": "8"
                        },
                        {
                            "ask_start_time": "" //该频次没有工单；
                        },
                        {
                            "order_id": "22",
                            "ask_start_time": "***",
                            "ask_end_time": "***",
                            "order_state": "6"
                        }
                    ]
                },
                {
                    "date": "20170913", //日期,yyyyMMdd
                    "work_orders": [ //时间段内生成工单数组
                        {
                            "order_id": "33",
                            "ask_start_time": "***",
                            "ask_end_time": "***",
                            "order_state": "5"
                        },
                        {
                            "order_id": "44",
                            "ask_start_time": "***",
                            "ask_end_time": "***",
                            "order_state": "4"
                        },
                        {
                            "ask_start_time": "20170809", //下次待发出工单；
                            "ask_end_time": "***"
                        }
                    ]
                },

            ]
        },
        {
            "plan_id": "***", //计划id
            "plan_name": "维保计划2", //计划名称
            "plan_end_time": "***", //计划结束时间，yyyyMMddhhmmss
            "freq_cycle": "d", //计划频率-周期，y/m/w/d
            "freq_num": 2, //计划频率-次数
            "max_freq_num": 2,
            "freq_cycle_desc": "每日6次", //计划频率描述
            "work_order_date": []
        }
    ],
    tableListCommon: [{
            "plan_id": "222", //计划id
            "plan_name": "计划1", //计划名称
            "plan_end_time": "***", //计划结束时间，yyyyMMddhhmmss
            "freq_cycle": "m", //计划频率-周期，y/m/w
            "freq_num": 2, //计划频率-次数
            "freq_cycle_desc": "每月2次", //计划频率描述
            "row_count": 3, //行数
            "work_orders": [ //时间段内生成工单数组
                {
                    "order_id": "111", //工单id，该值不存在时，为下次待发出工单
                    "ask_start_time": "20171001180300", //要求开始时间,yyyyMMddhhmmss
                    "ask_end_time": "20171003180300", //要求结束时间,yyyyMMddhhmmss
                    "order_state": "4" //工单状态编码，优先返回自定义状态
                },
                {
                    "order_id": "121",
                    "ask_start_time": "20171004180300",
                    "ask_end_time": "20171008180300",
                    "order_state": "5"
                },
                {
                    "order_id": "131",
                    "ask_start_time": "20171007180300",
                    "ask_end_time": "20171012180300",
                    "order_state": "6"
                },
                {
                    "order_id": "141",
                    "ask_start_time": "20171015180300",
                    "ask_end_time": "20171018180300",
                    "order_state": "8"
                },
                {
                    "ask_start_time": "20171018180300",
                    "ask_end_time": "20171020180300",
                    "is_next_order": true
                },
                {
                    "ask_start_time": "20171022180300",
                    "ask_end_time": "20171023180300",
                    "is_next_order": true
                }
            ]
        },
        // {
        //     "plan_id": "333", //计划id
        //     "plan_name": "计划2", //计划名称
        //     "plan_end_time": "***", //计划结束时间，yyyyMMddhhmmss
        //     "freq_cycle": "m", //计划频率-周期，y/m/w
        //     "freq_num": 2, //计划频率-次数
        //     "freq_cycle_desc": "每月2次", //计划频率描述
        //     "work_orders": [ //时间段内生成工单数组
        //         {
        //             "order_id": "***",
        //             "ask_start_time": "***",
        //             "ask_end_time": "***",
        //             "order_state": "***"
        //         },
        //         {
        //             "order_id": "***",
        //             "ask_start_time": "***",
        //             "ask_end_time": "***",
        //             "order_state": "***"
        //         }
        //     ]
        // }
    ],
    planCreateData: {
        "order_id": "111", //工单id，id为空时新增，不为空时是修改
        "project_id": "1111", //项目id，必须
        "order_type": "", //工单类型
        "order_type_name": "维修", //工单类型名称
        "execute_type": "xxx", //工单执行类型编码,数据字典查名称
        "urgency": "高", //紧急程度，高、中、低
        "executie_mode": "***", //工单执行方式编码,数据字典查名称
        "start_time_type": "1", //开始时间类型,1-发单后立即开始，2-自定义开始时间
        "ask_start_time": "20170620180000", //要求开始时间,yyyyMMddhhmmss
        "ask_end_limit": "2", //要求固定时间内完成,单位小时
        "ask_end_time": "20170622180000", //要求结束时间,yyyyMMddhhmmss
        "required_tools": ["工具A", "工具B"], //所需工具
        "order_state": "***", //工单状态编码
        "order_state_name": "***", //工单状态名称
        "custom_state": "***", //工单自定义状态编码
        "custom_state_name": "***", //工单自定义状态名称
        "summary": "***", //工单概述,事项名称的串连
        "order_from_type": "***", //工单来源类型,1-正常创建，2-工单计划，3-报修转工单，默认1
        "order_from_id": "***", //工单来源id，报修转工单时，这里是报修单id
        "creator_id": "***", //创建人id
        "creator_name": "***", //创建人名字
        "domain_list": ["code1", "code2"], //工单中专业列表，code
        "limit_domain": true, //专业限制
        "matters": [ //工单事项
            {
                "$ID": "***", //引擎需要的id，同matter_id，后台使用
                "matter_id": "***", //事项id
                "matter_name": "维保计划1", //事项名称
                "matter_steps": [ //事项步骤                
                    {
                        "$ID": "***", //引擎需要的id，同obj_step_id，后台使用
                        "obj_step_id": "***", //对象步骤id
                        "description": "@消防水泵#季度巡检补充检查", //事项概述
                        "obj_id": "***", //对象id，可能为空
                        "obj_name": "***", //对象名称 ，可能为空
                        "steps": [ //步骤
                            {
                                "step_id": "***", //步骤id,obj_step_id+"_"+step_sequence组成
                                "step_sequence": "1-1", //步骤序号 
                                "step_type": "3", //步骤类型：1-文字输入,2-上传照片,3-拍照,4-扫码,5-工作内容,6-签字,
                                "content": "到达指定位置拍照" //操作内容描述
                            },
                            {
                                "step_id": "***", //步骤id,obj_step_id+"_"+step_sequence组成
                                "step_sequence": "1-2", //步骤序号 
                                "step_type": "4", //步骤类型：1-文字输入,2-上传照片,3-拍照,4-扫码,5-工作内容,6-签字,
                                "content": "到达指定位置扫码" //操作内容描述
                            },
                            {
                                "step_id": "***", //步骤id,obj_step_id+"_"+step_sequence组成
                                "step_sequence": "2-1", //步骤序号 
                                "step_type": "5",
                                "pre_conform": "*****", //强制确认
                                "content": "***", //操作内容
                                //操作内容中涉及的对象
                                "content_objs": [{
                                    "obj_id": "***", //对象id
                                    "obj_name": "对象名称1", //对象名称
                                    "obj_type": "equip" //对象类型,子项见后边
                                }, ],
                                "notice": "确认电闸已经关闭", //注意事项
                                "pre_conform": "确认电闸已经关闭", //强制确认
                                "confirm_result": [ //需确认的操作结果
                                    {
                                        "obj_id": " ** * ",
                                        "obj_name": " 设备类 ",
                                        "obj_type": "***",
                                        "parents": [
                                            { "parent_ids": ["***", "***"], "parent_names": ["专业1", "系统1"] }
                                        ],
                                        "info_points": [ //信息点组件数据源类型-待定
                                            { "id": "***", "code": "***", "name": "信息点", "unit": "m", "value": "120", "cmpt": "A" },
                                            { "id": "***", "code": "***", "name": "信息点", "unit": "m", "value": "200", "cmpt": "B", "cmpt_data": [] }
                                        ],
                                        "customs": [ //自定义项，type：1-文本，2-单选，3-多选,4、无单位的数字,5、有单位的数字
                                            { "name": "确认信息2", "type": "1" },
                                            { "name": "确认信息2", "type": "2", "items": ["选项1", "选项2", "选项3"] },
                                            { "name": "确认信息3", "type": "3", "items": ["选项1", "选项2", "选项3"] },
                                            { "name": "确认信息4", "type": "4" },
                                            { "name": "确认信息5", "type": "5", "unit": "***" }
                                        ]
                                    },
                                    {
                                        "obj_id": " ** * ",
                                        "obj_name": " 设备类 ",
                                        "obj_type": "***",
                                        "parents": [
                                            { "parent_ids": ["***", "***", "***"], "parent_names": ["建筑1", "楼层1", "空间"] },
                                            
                                        ],
                                        "info_points": [ //信息点组件数据源类型-待定
                                            { "id": "***", "code": "***", "name": "信息点", "unit": "m", "value": "120", "cmpt": "A" },
                                            { "id": "***", "code": "***", "name": "信息点", "unit": "m", "value": "200", "cmpt": "B", "cmpt_data": [] }
                                        ],
                                        "customs": [ //自定义项，type：1-文本，2-单选，3-多选,4、无单位的数字,5、有单位的数字
                                            { "name": "确认信息2", "type": "1" },
                                            { "name": "确认信息2", "type": "2", "items": ["选项1", "选项2", "选项3"] },
                                            { "name": "确认信息3", "type": "3", "items": ["选项1", "选项2", "选项3"] },
                                            { "name": "确认信息4", "type": "4" },
                                            { "name": "确认信息5", "type": "5", "unit": "***" }
                                        ]
                                    },
                                ],
                                "domain": "***", //专业code
                                "domain_name": "***" //专业名称
                            },
                            {
                                "step_id": "***", //步骤id,obj_step_id+"_"+step_sequence组成
                                "step_sequence": "2-2", //步骤序号 
                                "step_type": "5",
                                "pre_conform": "*****", //强制确认
                                "content": "***", //操作内容
                                //操作内容中涉及的对象
                                "content_objs": [{
                                    "obj_id": "***", //对象id
                                    "obj_name": "对象名称1", //对象名称
                                    "obj_type": "equip" //对象类型,子项见后边
                                }, ],
                                "notice": "***", //注意事项

                                "confirm_result": [ //需确认的操作结果
                                    {
                                        "obj_id": "** * ",
                                        "obj_name": " ** * ",
                                        "obj_type": "***",
                                        "parents": [
                                            { "parent_ids": ["***", "***", "***"], "parent_names": ["建筑1", "楼层1", "空间"] },
                                            
                                        ],
                                        "info_points": [ //信息点组件数据源类型-待定
                                            { "id": "***", "code": "***", "name": "***", "unit": "m", "value": "120", "cmpt": "A" },
                                            { "id": "***", "code": "***", "name": "***", "unit": "m", "value": "200", "cmpt": "B", "cmpt_data": [{ "code": "***", "name": "***" }] }
                                        ],
                                        "customs": [ //自定义项，type：1-文本，2-单选，3-多选,4、无单位的数字,5、有单位的数字
                                            { "name": "确认信息1", "type": "1" },
                                            { "name": "确认信息2", "type": "2", "items": ["选项1", "选项2", "选项3"] },
                                            { "name": "确认信息3", "type": "3", "items": ["选项1", "选项2", "选项3"] },
                                            { "name": "确认信息4", "type": "4" },
                                            { "name": "确认信息5", "type": "5", "unit": "***" }
                                        ]
                                    },
                                ],
                                "domain": "***", //专业code
                                "domain_name": "***" //专业名称
                            },
                        ],

                        "executors": ["name1", "name2"] //执行人
                    },
                    {
                        "$ID": "***", //引擎需要的id，同obj_step_id，后台使用
                        //"obj_step_id": "***", 对象步骤id
                        //"description": "@消防水泵#季度巡检补充检查", 事项概述
                        "steps": [ //步骤
                            {
                                "step_id": "***", //步骤id,obj_step_id+"_"+step_sequence组成
                                "step_sequence": "3-1", //步骤序号 
                                "step_type": "6", //步骤类型：1-文字输入，3-拍照，4-扫码、5-工作内容、6-签字，
                                "content": "结束该事项时签字" //操作内容描述
                            }
                        ],

                        "executors": ["张三"] //执行人
                    },

                ],
                "desc_photos": ["key1", "key2"], //描述中的图片
                "desc_sops": [ //描述中涉及的sop  
                    {
                        "sop_id": "",
                        "sop_name": "对象名称1", //sop名称
                        "version": "V1.3" //sop版本
                    },

                ],

            },


        ],
        "wo_exec_controls": [ //执行控制信息
            {
                "$ID": "****", //引擎需要的id，同exec_control_id，后台使用
                "exec_control_id": "***",
                "control_code": "apply", //控制模板编码,名称查询数据字典
                "operator_id": "***", //操作人id
                "operator_name": "张三", //操作人名字
                "operate_start_time": "20170902021200", //操作开始时间, yyyyMMddHHmmss
                "operate_end_time": "***", //操作结束时间, yyyyMMddHHmmss
                "apply_type": "finish", //申请类型，finish-正常结束，stop-中止
                "audit_result": "0", //审核结果,1-通过，0-不通过
                "opinion": "***", //意见
                "next_route": ["xx岗位", "张杰"], //下级路由
                "create_time": "***" //操作时间, yyyyMMddHHmmss
            },

        ],
        "publish_time": "20170620093000", //发布时间，yyyyMMddhhmmss
        "create_time": "20170620093000", //创建时间，yyyyMMddhhmmss
        "valid": true //有效状态 true：有效，false：失效
    },

    objExample: [{
            "obj_id": "111", //对象id
            "obj_name": "对象名称1", //对象名称
            "obj_type": "system", //对象类型，system、equip
            "parents": [ //父级有以下的一个或者几个
                { "parent_ids": ["***", "***", "***"], "parent_names": ["建筑1", "楼层1", "空间"] },
                
            ]
        },
        {
            "obj_id": "222", //对象id
            "obj_name": "对象名称1", //对象名称
            "obj_type": "equip" ,//对象类型，system、equip
            "parents": [ //父级有以下的一个或者几个
               
                { "parent_ids": ["***", "***"], "parent_names": ["专业1", "系统1"] }
            ]
        }
    ],
}