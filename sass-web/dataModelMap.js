//设备管理-首页:查询设备统计数量


/*数据model映射配置，支持无限嵌套*/
var dataModelMap = {
    'restEquipService/queryMaintEquipList': {
        "type": "array",
        "note": "未输入note",
        "proArr": [{
                "name": "create_time",
                "type": "string",
                "note": "create_time"
            },
            {
                "name": "equip_id",
                "type": "string",
                "note": "equip_id"
            },
            {
                "name": "equip_local_name",
                "type": "string",
                "note": "equip_local_name"
            },
            {
                "name": "position",
                "type": "string",
                "note": "position"
            },
            {
                "name": "work_orders",
                "type": "array",
                "note": "work_orders",
                "proArr": [{
                        "name": "order_id",
                        "type": "string",
                        "note": "order_id"
                    },
                    {
                        "name": "order_state_desc",
                        "type": "string",
                        "note": "order_state_desc"
                    },
                    {
                        "name": "summary",
                        "type": "string",
                        "note": "summary"
                    }
                ]
            }
        ]
    },
    'restSystemService/addSystem': {
        "type": "object",
        "note": "未输入note",
        "proArr": [{
                "name": "Result",
                "type": "string",
                "note": "Result"
            },
            {
                "name": "ResultMsg",
                "type": "string",
                "note": "ResultMsg"
            }
        ]
    },
    'restSystemService/querySystemDynamicInfoForAdd': {
        "type": "array",
        "note": "未输入note",
    },
    'restSystemService/updateSystemInfo': {
        "type": "object",
        "note": "未输入note",
        "proArr": [{
                "name": "Result",
                "type": "string",
                "note": "Result"
            },
            {
                "name": "ResultMsg",
                "type": "string",
                "note": "ResultMsg"
            }
        ]
    },
    'restSystemService/querySystemInfoPointHis': {
        "type": "array",
        "note": "未输入note",
        "proArr": [{
                "name": "date",
                "type": "string",
                "note": "date"
            },
            {
                "name": "value",
                "type": "string",
                "note": "value"
            }
        ]
    },
    'restSystemService/querySystemDynamicInfo': {

    },
    'restSystemService/querySystemPublicInfo': {
        "type": "object",
        "note": "未输入note",
        "proArr": [{
                "name": "system_id",
                "type": "string",
                "note": "system_id"
            },
            {
                "name": "system_local_id",
                "type": "string",
                "note": "system_local_id"
            },
            {
                "name": "system_local_name",
                "type": "string",
                "note": "system_local_name"
            },
            {
                "name": "BIMID",
                "type": "string",
                "note": "BIMID"
            },
            {
                "name": "build_local_name",
                "type": "string",
                "note": "build_local_name"
            },
            {
                "name": "domain_name",
                "type": "string",
                "note": "domain_name"
            },
            {
                "name": "system_category_name",
                "type": "string",
                "note": "system_category_name"
            }
        ]
    },
    'restEquipService/queryGoingDestroyEquipList': {
        "type": "array",
        "note": "未输入note",
        "proArr": [
            {
                "name": "destroy_remind",
                "type": "string",
                "note": "destroy_remind"
            },
            {
                "name": "destroy_remind_type",
                "type": "string",
                "note": "destroy_remind_type"
            },
            {
                "name": "equip_id",
                "type": "string",
                "note": "equip_id"
            },
            {
                "name": "equip_local_id",
                "type": "string",
                "note": "equip_local_id"
            },
            {
                "name": "equip_local_name",
                "type": "string",
                "note": "equip_local_name"
            },
            {
                "name": "maintainer",
                "type": "string",
                "note": "maintainer"
            },
            {
                "name": "position",
                "type": "string",
                "note": "position"
            },
            {
                "name": "service_life",
                "type": "string",
                "note": "service_life"
            },
            {
                "name": "specification",
                "type": "string",
                "note": "specification"
            },
            {
                "name": "start_date",
                "type": "string",
                "note": "start_date"
            }
        ]
    },
    'restEquipService/queryRepairEquipList': {
        "type": "array",
        "note": "未输入note",
        "proArr": [
            {
                "name": "create_time",
                "type": "string",
                "note": "create_time"
            },
            {
                "name": "equip_id",
                "type": "string",
                "note": "equip_id"
            },
            {
                "name": "equip_local_id",
                "type": "string",
                "note": "equip_local_id"
            },
            {
                "name": "equip_local_name",
                "type": "string",
                "note": "equip_local_name"
            },
            {
                "name": "position",
                "type": "string",
                "note": "position"
            },
            {
                "name": "work_orders",
                "type": "array",
                "note": "work_orders",
                "proArr": [
                    {
                        "name": "order_id",
                        "type": "string",
                        "note": "order_id"
                    },
                    {
                        "name": "order_state_desc",
                        "type": "string",
                        "note": "order_state_desc"
                    },
                    {
                        "name": "summary",
                        "type": "string",
                        "note": "summary"
                    }
                ]
            }
        ]
    },
    'restEquipService/queryEquipPublicInfo': {
        "type": "object",
        "note": "未输入note",
        "proArr": [
            {
                "name": "equip_id",
                "type": "string",
                "note": "equip_id"
            },
            {
                "name": "equip_local_id",
                "type": "string",
                "note": "equip_local_id"
            },
            {
                "name": "equip_local_name",
                "type": "string",
                "note": "equip_local_name"
            },
            {
                "name": "BIMID",
                "type": "string",
                "note": "BIMID"
            },
            {
                "name": "build_id",
                "type": "string",
                "note": "build_id"
            },
            {
                "name": "position",
                "type": "string",
                "note": "position"
            },
            {
                "name": "equip_category_name",
                "type": "string",
                "note": "equip_category_name"
            },
            {
                "name": "system_name",
                "type": "string",
                "note": "system_name"
            },
            {
                "name": "length",
                "type": "string",
                "note": "length"
            },
            {
                "name": "width",
                "type": "string",
                "note": "width"
            },
            {
                "name": "height",
                "type": "string",
                "note": "height"
            },
            {
                "name": "mass",
                "type": "string",
                "note": "mass"
            },
            {
                "name": "material",
                "type": "string",
                "note": "material"
            },
            {
                "name": "dept",
                "type": "string",
                "note": "dept"
            },
            {
                "name": "drawing",
                "type": "array",
                "note": "drawing",
                "proArr": [{
                    "name": "key",
                    "type": "fileLink",
                    "fileType": "1"
                },
                    {
                        "name": "name",
                        "type": "string",
                        "note": "name"
                    },
                    {
                        "name": "type",
                        "type": "number",
                        "note": "type"
                    }
                ]
            },
            {
                "name": "picture",
                "type": "fileArray",
                "note": "picture",
            },
            {
                "name": "check_report",
                "type": "array",
                "note": "check_report",
                "proArr": [{
                    "name": "key",
                    "type": "fileLink",
                    "fileType": "1"
                },
                    {
                        "name": "name",
                        "type": "string",
                        "note": "name"
                    },
                    {
                        "name": "type",
                        "type": "number",
                        "note": "type"
                    }
                ]
            },
            {
                "name": "nameplate",
                "type": "array",
                "note": "nameplate",
                "proArr": "fileArray"
            },
            {
                "name": "archive",
                "type": "array",
                "note": "archive",
                "proArr": [{
                    "name": "key",
                    "type": "fileLink",
                    "fileType": "1"
                },
                    {
                        "name": "name",
                        "type": "string",
                        "note": "name"
                    },
                    {
                        "name": "type",
                        "type": "number",
                        "note": "type"
                    }
                ]
            },
            {
                "name": "manufacturer",
                "type": "string",
                "note": "manufacturer"
            },
            {
                "name": "brand",
                "type": "string",
                "note": "brand"
            },
            {
                "name": "product_date",
                "type": "string",
                "note": "product_date"
            },
            {
                "name": "serial_num",
                "type": "string",
                "note": "serial_num"
            },
            {
                "name": "specification",
                "type": "string",
                "note": "specification"
            },
            {
                "name": "supplier",
                "type": "string",
                "note": "supplier"
            },
            {
                "name": "supplier_phone",
                "type": "string",
                "note": "supplier_phone"
            },
            {
                "name": "supplier_contactor",
                "type": "string",
                "note": "supplier_contactor"
            },
            {
                "name": "supplier_web",
                "type": "string",
                "note": "supplier_web"
            },
            {
                "name": "supplier_fax",
                "type": "string",
                "note": "supplier_fax"
            },
            {
                "name": "supplier_email",
                "type": "string",
                "note": "supplier_email"
            },
            {
                "name": "contract_id",
                "type": "string",
                "note": "contract_id"
            },
            {
                "name": "asset_id",
                "type": "string",
                "note": "asset_id"
            },
            {
                "name": "purchase_price",
                "type": "string",
                "note": "purchase_price"
            },
            {
                "name": "principal",
                "type": "string",
                "note": "principal"
            },
            {
                "name": "maintain_id",
                "type": "string",
                "note": "maintain_id"
            },
            {
                "name": "start_date",
                "type": "string",
                "note": "start_date"
            },
            {
                "name": "maintain_deadline",
                "type": "string",
                "note": "maintain_deadline"
            },
            {
                "name": "service_life",
                "type": "string",
                "note": "service_life"
            },
            {
                "name": "warranty",
                "type": "string",
                "note": "warranty"
            },
            {
                "name": "maintain_cycle",
                "type": "string",
                "note": "maintain_cycle"
            },
            {
                "name": "maintainer",
                "type": "string",
                "note": "maintainer"
            },
            {
                "name": "maintainer_phone",
                "type": "string",
                "note": "maintainer_phone"
            },
            {
                "name": "maintainer_contactor",
                "type": "string",
                "note": "maintainer_contactor"
            },
            {
                "name": "maintainer_web",
                "type": "string",
                "note": "maintainer_web"
            },
            {
                "name": "maintainer_fax",
                "type": "string",
                "note": "maintainer_fax"
            },
            {
                "name": "maintainer_email",
                "type": "string",
                "note": "maintainer_email"
            },
            {
                "name": "status",
                "type": "string",
                "note": "status"
            },
            {
                "name": "insurer",
                "type": "string",
                "note": "insurer"
            },
            {
                "name": "insurer_num",
                "type": "string",
                "note": "insurer_num"
            },
            {
                "name": "insurer_contactor",
                "type": "string",
                "note": "insurer_contactor"
            },
            {
                "name": "insurer_phone",
                "type": "string",
                "note": "insurer_phone"
            },
            {
                "name": "insurance_file",
                "type": "array",
                "note": "insurance_file",
                "proArr": [
                    {
                        "name": "key",
                        "type": "fileLink",
                        "fileType": "1"
                    },
                    {
                        "name": "name",
                        "type": "string",
                        "note": "name"
                    },
                    {
                        "name": "type",
                        "type": "number",
                        "note": "type"
                    }
                ]
            }
        ]
    },
    'restEquipService/queryEquipDynamicInfoForAdd': {
        "type": "array",
        "note": "未输入note",
    },
    'restEquipService/addEquip': {
        "type": "object",
        "note": "未输入note",
        "proArr": [{
            "name": "Result",
            "type": "string",
            "note": "Result"
        },
            {
                "name": "ResultMsg",
                "type": "string",
                "note": "ResultMsg"
            }
        ]
    },
    'restObjectService/querySystemForBuild': {
        "type": "array",
        "note": "未输入note",
    },
    'restEquipService/queryEquipInfoPointHis': {
        "type": "array",
        "note": "未输入note",
    },
    'restEquipService/queryEquipDynamicInfo': {
        "type": "array",
        "note": "未输入note",
    },
    'restEquipCompanyService/queryEquipCompanySel': {
        "type": "array",
        "note": "未输入note",
        "proArrBy": 'merchantInfo'
    },
    'restEquipService/updateEquipInfo': {
        "type": "object",
        "note": "未输入note",
        "proArr": [{
            "name": "Result",
            "type": "string",
            "note": "Result"
        },
            {
                "name": "ResultMsg",
                "type": "string",
                "note": "ResultMsg"
            }
        ]
    },
    'restDictService/queryAllEquipCategory': {
        "type": "array",
        "note": "未输入note",
        "proArr": [{
            "name": "code",
            "type": "string",
            "note": "code"
        },
            {
                "name": "name",
                "type": "string",
                "note": "name"
            },
            {
                "name": "content",
                "type": "array",
                "note": "content",
                "proArr": [{
                    "name": "code",
                    "type": "string",
                    "note": "code"
                },
                    {
                        "name": "name",
                        "type": "string",
                        "note": "name"
                    },
                    {
                        "name": "content",
                        "type": "array",
                        "note": "content",
                        "proArr": [{
                            "name": "code",
                            "type": "string",
                            "note": "code"
                        },
                            {
                                "name": "name",
                                "type": "string",
                                "note": "name"
                            }
                        ]
                    }
                ]
            }
        ]
    },
    'restEquipService/queryEquipRelWorkOrder': {
        "type": "array",
        "note": "未输入note",
        "proArr": [{
            "name": "order_id",
            "type": "string",
            "note": "order_id"
        },
            {
                "name": "summary",
                "type": "string",
                "note": "summary"
            },
            {
                "name": "order_state",
                "type": "string",
                "note": "order_state",
                "isToSpecial": false
            },
            {
                "name": "order_state_name",
                "type": "string",
                "note": "order_state_name"
            },
            {
                "name": "custom_state_name",
                "type": "string",
                "note": "custom_state_name"
            },
            {
                "name": "participants",
                "type": "string",
                "note": "participants"
            },
            {
                "name": "publish_time",
                "type": "string",
                "note": "publish_time"
            },
            {
                "name": "desc_photos",
                "type": "array",
                "note": "desc_photos",
                "proArr": []
            }
        ]
    },
    'restEquipService/queryEquipCardInfo': {
        "type": "object",
        "note": "未输入note",
        "proArr": [{
            "name": "equip_id",
            "type": "string",
            "note": "equip_id"
        },
            {
                "name": "equip_qr_code",
                "type": "fileLink",
                "fileType": 1,
                "note": "equip_qr_code"
            },
            {
                "name": "card_info",
                "type": "array",
                "note": "card_info",
                "proArr": [{
                    "name": "info_point_code",
                    "type": "string",
                    "note": "info_point_code"
                },
                    {
                        "name": "info_point_name",
                        "type": "string",
                        "note": "info_point_name"
                    },
                    {
                        "name": "value",
                        "type": "string",
                        "note": "value"
                    }
                ]
            }
        ]
    },
    'restEquipService/destroyEquip': {
        "type": "object",
        "note": "未输入note",
        "proArr": [{
            "name": "Result",
            "type": "string",
            "note": "Result"
        },
            {
                "name": "ResultMsg",
                "type": "string",
                "note": "ResultMsg"
            }
        ]
    },
    'restEquipService/verifyDestroyEquip': {
        "type": "object",
        "note": "未输入note",
        "proArr": [{
            "name": "can_destroy",
            "type": "boolean",
            "note": "can_destroy"
        },
            {
                "name": "remind",
                "type": "string",
                "note": "remind"
            }
        ]
    },
    'equipList': [{
        "name": "equip_id",
        "type": "string",
        "note": "equip_id"
    }, {
        "name": "equip_local_id",
        "type": "string",
        "note": "equip_local_id"
    }, {
        "name": "equip_local_name",
        "type": "string",
        "note": "equip_local_name"
    }, {
        "name": "specification",
        "type": "string",
        "note": "specification"
    }, {
        "name": "position",
        "type": "string",
        "note": "position"
    }, {
        "name": "supplier",
        "type": "string",
        "note": "supplier"
    }, {
        "name": "download_flag",
        "type": "string",
        "note": "是否下载过 0 为下载   1 已下载"
    }, {
        "name": "create_time",
        "type": "date",
        "note": "create_time",
        "format": 'y.M.d h:m'
    }, {
        "name": "destroy_remind_type",
        "type": "string",
        "note": "报废提醒类型，1-距离时间，2-超出时间"
    }, {
        "name": "destroy_remind",
        "type": "string",
        "note": "destroy_remind"
    }],
    'restEquipService/queryEquipList': {
        "type": "array",
        "note": "设备管理首页-查询项目下设备列表",
        "proArrBy": 'equipList'
    },
    'restSchedulingConfigService/saveOrUpdateSchedulingConfig': {
        "type": "object",
        "note": "未输入note",
        "proArr": [{
            "name": "Result",
            "type": "string",
            "note": "Result"
        },
            {
                "name": "ResultMsg",
                "type": "string",
                "note": "ResultMsg"
            }
        ]
    },
    'restEquipService/queryEquipStatisticCount': {
        "type": "object",
        "note": "设备管理-首页:查询设备统计数量",
        "proArr": [{
            "name": "equip_total",
            "type": "number",
            "note": "equip_total"
        },
            {
                "name": "new_count",
                "type": "number",
                "note": "new_count"
            },
            {
                "name": "repair_count",
                "type": "number",
                "note": "repair_count"
            },
            {
                "name": "maint_count",
                "type": "number",
                "note": "maint_count"
            },
            {
                "name": "going_destroy_count",
                "type": "number",
                "note": "going_destroy_count"
            }
        ]
    },
    'restSystemService/queryBuildSystemTree': {
        "type": "array",
        "note": "未输入note",
        "proArr": [{
            "name": "build_id",
            "type": "string",
            "note": "build_id"
        },
            {
                "name": "build_name",
                "type": "string",
                "note": "build_name"
            },
            {
                "name": "system",
                "type": "array",
                "note": "system",
                "proArr": [{
                    "name": "system_id",
                    "type": "string",
                    "note": "system_id"
                },
                    {
                        "name": "system_local_id",
                        "type": "string",
                        "note": "system_local_id"
                    },
                    {
                        "name": "system_local_name",
                        "type": "string",
                        "note": "system_local_name"
                    }
                ]
            }
        ]
    },
    'restSchedulingService/saveSchedulingPlan': {
        "type": "object",
        "note": "未输入note",
        "proArr": [{
            "name": "Result",
            "type": "string",
            "note": "Result"
        },
            {
                "name": "ResultMsg",
                "type": "string",
                "note": "ResultMsg"
            }
        ]
    },
    'restSchedulingService/queryMonthSchedulingForWeb': {
        "type": "array",
        "note": "未输入note",
        // "proArr": [{
        //     "name": "columns",
        //     "type": "array",
        //     "note": "columns",
        //     "proArr": [{
        //         "name": "0",
        //         "type": "string",
        //         "note": "0"
        //     }]
        // }]
    },
    'restNounService/updateNounById': {
        "type": "object",
        "note": "未输入note",
        "proArr": [{
            "name": "Result",
            "type": "string",
            "note": "Result"
        },
            {
                "name": "ResultMsg",
                "type": "string",
                "note": "ResultMsg"
            }
        ]
    },
    'restNounService/queryNounList': {
        "type": "array",
        "note": "未输入note",
        "proArr": [{
            "name": "dict_id",
            "type": "string",
            "note": "dict_id"
        },
            {
                "name": "code",
                "type": "string",
                "note": "code"
            },
            {
                "name": "name",
                "type": "string",
                "note": "name"
            },
            {
                "name": "description",
                "type": "string",
                "note": "description"
            },
            {
                "name": "customer_use",
                "type": "boolean",
                "note": "customer_use"
            },
            {
                "name": "customer_name",
                "type": "string",
                "note": "customer_name"
            }
        ]
    },
    "restNounService/queryNounTypeList": {
        "type": "array",
        "note": "未输入note",
        "proArr": [{
            "name": "noun_type",
            "type": "string",
            "note": "noun_type"
        },
            {
                "name": "noun_type_name",
                "type": "string",
                "note": "noun_type_name"
            }
        ]
    },
    "restCustomerService/queryBuildInfoPointHis": {
        "type": "array",
        "note": "未输入note",
        "proArr": [{
            "name": "date",
            "type": "string",
            "note": "date"
        },
            {
                "name": "value",
                "type": "string",
                "note": "value"
            }
        ]
    },
    "restDictService/queryAllDirectionCode": {
        "type": "array",
        "note": "未输入note",
        "proArr": [{
            "name": "code",
            "type": "string",
            "note": "code"
        },
            {
                "name": "name",
                "type": "string",
                "note": "name"
            },
            {
                "name": "angle",
                "type": "string",
                "note": "angle"
            },
            {
                "name": "directionCode",
                "type": "string",
                "note": "directionCode"
            }
        ]
    },
    "restCustomerService/updateBuildInfo": {
        "type": "object",
        "note": "未输入note",
        "proArr": [{
            "name": "Result",
            "type": "string",
            "note": "Result"
        },
            {
                "name": "ResultMsg",
                "type": "string",
                "note": "ResultMsg"
            }
        ]
    },
    "restCustomerService/queryProjectInfoPointHis": {
        "type": "array",
        "note": "未输入note",
        "proArr": [{
            "name": "date",
            "type": "string",
            "note": "date"
        },
            {
                "name": "value",
                "type": "string",
                "note": "value"
            }
        ]
    },
    "restCustomerService/queryBuildInfo": {
        "type": "object",
        "note": "未输入note",
        "proArr": [{
            "name": "build_id",
            "type": "string",
            "note": "build_id"
        },
            {
                "name": "build_code",
                "type": "string",
                "note": "build_code"
            },
            {
                "name": "build_local_id",
                "type": "string",
                "note": "build_local_id"
            },
            {
                "name": "build_local_name",
                "type": "string",
                "note": "build_local_name"
            },
            {
                "name": "BIMID",
                "type": "string",
                "note": "BIMID"
            },
            {
                "name": "build_age",
                "type": "string",
                "note": "build_age"
            },
            {
                "name": "build_func_type",
                "type": "string",
                "note": "build_func_type"
            },
            {
                "name": "build_func_type_name",
                "type": "string",
                "note": "build_func_type_name"
            },
            {
                "name": "ac_type",
                "type": "string",
                "note": "ac_type"
            },
            {
                "name": "ac_type_name",
                "type": "string",
                "note": "ac_type_name"
            },
            {
                "name": "heat_type",
                "type": "string",
                "note": "heat_type"
            },
            {
                "name": "heat_type_name",
                "type": "string",
                "note": "heat_type_name"
            },
            {
                "name": "green_build_lev",
                "type": "string",
                "note": "green_build_lev"
            },
            {
                "name": "green_build_lev_name",
                "type": "string",
                "note": "green_build_lev_name"
            },
            {
                "name": "intro",
                "type": "string",
                "note": "intro"
            },
            {
                "name": "picture",
                "type": "array",
                "note": "picture",
                "proArr": [{
                    "name": "key",
                    "type": "fileLink",
                    "fileType": "1"
                },
                    {
                        "name": "name",
                        "type": "string",
                        "note": "name"
                    },
                    {
                        "name": "type",
                        "type": "number",
                        "note": "type"
                    }
                ]
            },
            {
                "name": "design_cool_load_index",
                "type": "string",
                "note": "design_cool_load_index"
            },
            {
                "name": "design_heat_load_index",
                "type": "string",
                "note": "design_heat_load_index"
            },
            {
                "name": "design_elec_load_index",
                "type": "string",
                "note": "design_elec_load_index"
            },
            {
                "name": "struct_type",
                "type": "string",
                "note": "struct_type"
            },
            {
                "name": "struct_type_name",
                "type": "string",
                "note": "struct_type_name"
            },
            {
                "name": "SFI",
                "type": "string",
                "note": "SFI"
            },
            {
                "name": "SFI_name",
                "type": "string",
                "note": "SFI_name"
            },
            {
                "name": "shape_coeff",
                "type": "string",
                "note": "shape_coeff"
            },
            {
                "name": "build_direct",
                "type": "string",
                "note": "build_direct"
            },
            {
                "name": "build_direct_name",
                "type": "string",
                "note": "build_direct_name"
            },
            {
                "name": "insulate_type",
                "type": "string",
                "note": "insulate_type"
            },
            {
                "name": "insulate_type_name",
                "type": "string",
                "note": "insulate_type_name"
            },
            {
                "name": "GFA",
                "type": "string",
                "note": "GFA"
            },
            {
                "name": "tot_height",
                "type": "string",
                "note": "tot_height"
            },
            {
                "name": "cover_area",
                "type": "string",
                "note": "cover_area"
            },
            {
                "name": "drawing",
                "type": "array",
                "note": "drawing",
                "proArr": [{
                    "name": "key",
                    "type": "fileLink",
                    "fileType": "2"
                },
                    {
                        "name": "name",
                        "type": "string",
                        "note": "name"
                    },
                    {
                        "name": "type",
                        "type": "number",
                        "note": "type"
                    }
                ]
            },
            {
                "name": "archive",
                "type": "array",
                "note": "archive",
                "proArr": [{
                    "name": "key",
                    "type": "fileLink",
                    "fileType": "2"
                },
                    {
                        "name": "name",
                        "type": "string",
                        "note": "name"
                    },
                    {
                        "name": "type",
                        "type": "number",
                        "note": "type"
                    }
                ]
            },
            {
                "name": "consum_model",
                "type": "array",
                "note": "consum_model",
                "proArr": [{
                    "name": "key",
                    "type": "string",
                    "note": "key"
                },
                    {
                        "name": "name",
                        "type": "string",
                        "note": "name"
                    },
                    {
                        "name": "type",
                        "type": "number",
                        "note": "type"
                    }
                ]
            },
            {
                "name": "permanent_people_num",
                "type": "string",
                "note": "permanent_people_num"
            }
        ]
    },
    "restCustomerService/queryBuildList": {
        "type": "array",
        "note": "未输入note",
        "proArr": [{
            "name": "build_id",
            "type": "string",
            "note": "build_id"
        },
            {
                "name": "build_code",
                "type": "string",
                "note": "build_code"
            },
            {
                "name": "build_name",
                "type": "string",
                "note": "build_name"
            },
            {
                "name": "build_local_name",
                "type": "string",
                "note": "build_local_name"
            },
            {
                "name": "build_age",
                "type": "string",
                "note": "build_age"
            },
            {
                "name": "build_func_type",
                "type": "string",
                "note": "build_func_type"
            },
            {
                "name": "build_func_type_name",
                "type": "string",
                "note": "build_func_type_name"
            }
        ]
    },
    "restCustomerService/updateProjectInfo": {
        "type": "object",
        "note": "未输入note",
        "proArr": [{
            "name": "Result",
            "type": "string",
            "note": "Result"
        },
            {
                "name": "ResultMsg",
                "type": "string",
                "note": "ResultMsg"
            }
        ]
    },
    "restCustomerService/queryCustomerById": {
        "type": "object",
        "note": "未输入note",
        "proArr": [{
            "name": "customer_id",
            "type": "string",
            "note": "customer_id"
        },
            {
                "name": "company_name",
                "type": "string",
                "note": "company_name"
            },
            {
                "name": "legal_person",
                "type": "string",
                "note": "legal_person"
            },
            {
                "name": "account",
                "type": "string",
                "note": "account"
            },
            {
                "name": "mail",
                "type": "string",
                "note": "mail"
            },
            {
                "name": "contact_person",
                "type": "string",
                "note": "contact_person"
            },
            {
                "name": "contact_phone",
                "type": "string",
                "note": "contact_phone"
            },
            {
                "name": "operation_valid_term_start",
                "type": "string",
                "note": "operation_valid_term_start"
            },
            {
                "name": "operation_valid_term_end",
                "type": "string",
                "note": "operation_valid_term_end"
            },
            {
                "name": "contract_valid_term_start",
                "type": "string",
                "note": "contract_valid_term_start"
            },
            {
                "name": "contract_valid_term_end",
                "type": "string",
                "note": "contract_valid_term_end"
            },
            {
                "name": "business_license",
                "type": "string",
                "note": "business_license"
            },
            {
                "name": "pictures",
                "type": "array",
                "note": "pictures",
                "proArr": [{
                    "name": "0",
                    "type": "string",
                    "note": "0"
                },
                    {
                        "name": "1",
                        "type": "string",
                        "note": "1"
                    },
                    {
                        "name": "2",
                        "type": "string",
                        "note": "2"
                    }
                ]
            },
            {
                "name": "tool_type",
                "type": "string",
                "note": "tool_type"
            },
            {
                "name": "project_id",
                "type": "string",
                "note": "project_id"
            },
            {
                "name": "project_name",
                "type": "string",
                "note": "project_name"
            },
            {
                "name": "project_local_name",
                "type": "string",
                "note": "project_local_name"
            }
        ]
    },
    "restCustomerService/queryProjectInfo": {
        "type": "object",
        "note": "未输入note",
        "proArr": [{
            "name": "project_id",
            "type": "string",
            "note": "project_id"
        },
            {
                "name": "project_local_id",
                "type": "string",
                "note": "project_local_id"
            },
            {
                "name": "project_local_name",
                "type": "string",
                "note": "project_local_name"
            },
            {
                "name": "BIMID",
                "type": "string",
                "note": "BIMID"
            },
            {
                "name": "province",
                "type": "string",
                "note": "province"
            },
            {
                "name": "city",
                "type": "string",
                "note": "city"
            },
            {
                "name": "district",
                "type": "string",
                "note": "district"
            },
            {
                "name": "province_city_name",
                "type": "string",
                "note": "province_city_name"
            },
            {
                "name": "climate_zone",
                "type": "string",
                "note": "climate_zone"
            },
            {
                "name": "climate_zone_name",
                "type": "string",
                "note": "climate_zone_name"
            },
            {
                "name": "urban_devp_lev",
                "type": "string",
                "note": "urban_devp_lev"
            },
            {
                "name": "urban_devp_lev_name",
                "type": "string",
                "note": "urban_devp_lev_name"
            },
            {
                "name": "longitude",
                "type": "string",
                "note": "longitude"
            },
            {
                "name": "latitude",
                "type": "string",
                "note": "latitude"
            },
            {
                "name": "altitude",
                "type": "string",
                "note": "altitude"
            },
            {
                "name": "group",
                "type": "string",
                "note": "group"
            },
            {
                "name": "owner",
                "type": "string",
                "note": "owner"
            },
            {
                "name": "designer",
                "type": "string",
                "note": "designer"
            },
            {
                "name": "constructor",
                "type": "string",
                "note": "constructor"
            },
            {
                "name": "property",
                "type": "string",
                "note": "property"
            },
            {
                "name": "group_manage_zone",
                "type": "string",
                "note": "group_manage_zone"
            },
            {
                "name": "group_operate_zone",
                "type": "string",
                "note": "group_operate_zone"
            },
            {
                "name": "1st_weather",
                "type": "string",
                "note": "1st_weather"
            },
            {
                "name": "1st_weather_name",
                "type": "string",
                "note": "1st_weather_name"
            },
            {
                "name": "1stTdb",
                "type": "string",
                "note": "1stTdb"
            },
            {
                "name": "1stRH",
                "type": "string",
                "note": "1stRH"
            },
            {
                "name": "1stPM2.5",
                "type": "string",
                "note": "1stPM2.5"
            },
            {
                "name": "1stPM10",
                "type": "string",
                "note": "1stPM10"
            },
            {
                "name": "2nd_weather",
                "type": "string",
                "note": "2nd_weather"
            },
            {
                "name": "2nd_weather_name",
                "type": "string",
                "note": "2nd_weather_name"
            },
            {
                "name": "2ndTdb",
                "type": "string",
                "note": "2ndTdb"
            },
            {
                "name": "2ndRH",
                "type": "string",
                "note": "2ndRH"
            },
            {
                "name": "2ndPM2.5",
                "type": "string",
                "note": "2ndPM2.5"
            },
            {
                "name": "2ndPM10",
                "type": "string",
                "note": "2ndPM10"
            },
            {
                "name": "3rd_weather",
                "type": "string",
                "note": "3rd_weather"
            },
            {
                "name": "3rd_weather_name",
                "type": "string",
                "note": "3rd_weather_name"
            },
            {
                "name": "3rdTdb",
                "type": "string",
                "note": "3rdTdb"
            },
            {
                "name": "3rdRH",
                "type": "string",
                "note": "3rdRH"
            },
            {
                "name": "3rdPM2.5",
                "type": "string",
                "note": "3rdPM2.5"
            },
            {
                "name": "3rdPM10",
                "type": "string",
                "note": "3rdPM10"
            },
            {
                "name": "out_weather",
                "type": "string",
                "note": "out_weather"
            },
            {
                "name": "out_weather_name",
                "type": "string",
                "note": "out_weather_name"
            },
            {
                "name": "outTdb",
                "type": "string",
                "note": "outTdb"
            },
            {
                "name": "outRH",
                "type": "string",
                "note": "outRH"
            },
            {
                "name": "outD",
                "type": "string",
                "note": "outD"
            },
            {
                "name": "outTwb",
                "type": "string",
                "note": "outTwb"
            },
            {
                "name": "outTd",
                "type": "string",
                "note": "outTd"
            },
            {
                "name": "outH",
                "type": "string",
                "note": "outH"
            },
            {
                "name": "outRou",
                "type": "string",
                "note": "outRou"
            },
            {
                "name": "outTg",
                "type": "string",
                "note": "outTg"
            },
            {
                "name": "out_press",
                "type": "string",
                "note": "out_press"
            },
            {
                "name": "outCO2",
                "type": "string",
                "note": "outCO2"
            },
            {
                "name": "outCO",
                "type": "string",
                "note": "outCO"
            },
            {
                "name": "outPM2.5",
                "type": "string",
                "note": "outPM2.5"
            },
            {
                "name": "outPM10",
                "type": "string",
                "note": "outPM10"
            },
            {
                "name": "outDust",
                "type": "string",
                "note": "outDust"
            },
            {
                "name": "outVOC",
                "type": "string",
                "note": "outVOC"
            },
            {
                "name": "outCH4",
                "type": "string",
                "note": "outCH4"
            },
            {
                "name": "out_vision",
                "type": "string",
                "note": "out_vision"
            },
            {
                "name": "outAQI",
                "type": "string",
                "note": "outAQI"
            },
            {
                "name": "outLux",
                "type": "string",
                "note": "outLux"
            },
            {
                "name": "outRI",
                "type": "string",
                "note": "outRI"
            },
            {
                "name": "out_horizontal_RI",
                "type": "string",
                "note": "out_horizontal_RI"
            },
            {
                "name": "out_vertical_RI",
                "type": "string",
                "note": "out_vertical_RI"
            },
            {
                "name": "out_noise",
                "type": "string",
                "note": "out_noise"
            },
            {
                "name": "out_ave_wind_v",
                "type": "string",
                "note": "out_ave_wind_v"
            },
            {
                "name": "out_wind_scale",
                "type": "string",
                "note": "out_wind_scale"
            },
            {
                "name": "out_wind_scale_name",
                "type": "string",
                "note": "out_wind_scale_name"
            },
            {
                "name": "out_wind_vx",
                "type": "string",
                "note": "out_wind_vx"
            },
            {
                "name": "out_wind_vy",
                "type": "string",
                "note": "out_wind_vy"
            },
            {
                "name": "out_wind_vz",
                "type": "string",
                "note": "out_wind_vz"
            },
            {
                "name": "out_wind_direct",
                "type": "string",
                "note": "out_wind_direct"
            },
            {
                "name": "out_wind_direct_name",
                "type": "string",
                "note": "out_wind_direct_name"
            },
            {
                "name": "day_precipitation",
                "type": "string",
                "note": "day_precipitation"
            },
            {
                "name": "precipitation_type",
                "type": "string",
                "note": "precipitation_type"
            },
            {
                "name": "precipitation_type_name",
                "type": "string",
                "note": "precipitation_type_name"
            },
            {
                "name": "SRT",
                "type": "string",
                "note": "SRT"
            },
            {
                "name": "SST",
                "type": "string",
                "note": "SST"
            }
        ]
    },
    "restSchedulingConfigService/querySchedulingConfig": {
        "type": "array",
        "note": "未输入note",
        "proArr": [{
            "name": "code",
            "type": "string",
            "note": "code"
        },
            {
                "name": "name",
                "type": "string",
                "note": "name"
            },
            {
                "name": "create_time",
                "type": "string",
                "note": "create_time"
            },
            {
                "name": "time_plan",
                "type": "array",
                "note": "time_plan",
                "proArr": [{
                    "name": "end",
                    "type": "string",
                    "note": "end"
                },
                    {
                        "name": "start",
                        "type": "string",
                        "note": "start"
                    }
                ]
            }
        ]
    },
    "restSchedulingService/uploadSchedulingFile": {
        "type": "object",
        "note": "未输入note",
        "proArr": [{
            "name": "Content",
            "type": "array",
            "note": "Content",
            "proArr": [{
                "name": "columns",
                "type": "array",
                "note": "columns",
                "proArr": [{
                    "name": "0",
                    "type": "string",
                    "note": "0"
                },
                    {
                        "name": "1",
                        "type": "string",
                        "note": "1"
                    }
                ]
            }]
        },
            {
                "name": "Count",
                "type": "number",
                "note": "Count"
            },
            {
                "name": "Result",
                "type": "string",
                "note": "Result"
            }
        ]
    },
    "restPersonService/queryPositionsByProjectId": {
        "note": "查询项目下岗位列表",
        "mapName": "",
        "type": "array"
    },
    "restPersonService/queryPersonList": {
        "note": "人员信息-列表页:查询人员列表",
        "type": "array",
        "proArr": [{
            "note": "员工id",
            "name": "person_id",
            "mapName": "",
            "type": "string"
        },
            {
                "note": "所属项目id",
                "name": "project_id",
                "mapName": "",
                "type": "string"
            },
            {
                "note": "员工编号",
                "name": "person_num",
                "mapName": "",
                "type": "string"
            },
            {
                "note": "姓名",
                "name": "name",
                "mapName": "",
                "type": "string"
            },
            {
                "note": "手机号",
                "name": "phone_num",
                "mapName": "",
                "type": "string"
            },
            {
                "note": "岗位",
                "name": "position",
                "mapName": "",
                "type": "string"
            },
            {
                "note": "专业名称",
                "name": "specialty_name",
                "mapName": "",
                "type": "string"
            },
            {
                "note": "证件照片",
                "name": "id_photo",
                "mapName": "",
                "type": "string",
                "isToSpecial": false
            },
            {
                "note": "人员状态",
                "name": "person_status",
                "mapName": "",
                "type": "string"
            },
            {
                "note": "角色",
                "name": "roles",
                "mapName": "",
                "type": "string",
                "isToSpecial": false
            }
        ]
    },
    "restPersonService/queryPersonWithGroup": {
        "note": "人员信息-列表页:查询人员缩略图",
        "type": "array",
        "proArr": [{
            "note": "岗位",
            "name": "position",
            "mapName": "",
            "type": "string",
            "isToSpecial": false
        },
            {
                "note": "员工数组",
                "name": "persons",
                "mapName": "",
                "type": "array",
                "proArr": [{
                    "note": "员工id",
                    "name": "person_id",
                    "mapName": "",
                    "type": "string"
                },
                    {
                        "note": "所属项目id",
                        "name": "project_id",
                        "mapName": "",
                        "type": "string"
                    },
                    {
                        "note": "员工编号",
                        "name": "person_num",
                        "mapName": "",
                        "type": "string"
                    },
                    {
                        "note": "姓名",
                        "name": "name",
                        "mapName": "",
                        "type": "string"
                    },
                    {
                        "note": "系统头像",
                        "name": "head_portrait",
                        "mapName": "",
                        "type": "fileLink",
                        "fileType": 1
                    }
                ]
            }
        ]
    },
    "restPersonService/queryPersonDetailById": {
        "note": "人员信息-详细页:根据查询人员详细信息",
        "type": "object",
        "proArr": [{
            "note": "员工id",
            "name": "person_id",
            "mapName": "",
            "type": "string"
        },
            {
                "note": "所属项目id",
                "name": "project_id",
                "mapName": "",
                "type": "string"
            },
            {
                "note": "姓名",
                "name": "name",
                "mapName": "",
                "type": "string"
            },
            {
                "note": "身份证号码",
                "name": "id_number",
                "mapName": "",
                "type": "string"
            },
            {
                "note": "手机号",
                "name": "phone_num",
                "mapName": "",
                "type": "string"
            },
            {
                "note": "性别",
                "name": "gender",
                "mapName": "",
                "type": "string"
            },
            {
                "note": "出生年月 yyyy-MM-dd",
                "name": "birthday",
                "mapName": "",
                "type": "string",
                "isToSpecial": false
            },
            {
                "note": "员工编号",
                "name": "person_num",
                "mapName": "",
                "type": "string",
                "isToSpecial": false
            },
            {
                "note": "岗位",
                "name": "position",
                "mapName": "",
                "type": "string",
                "isToSpecial": false
            },
            {
                "note": "自定义标签",
                "name": "custom_tag",
                "mapName": "",
                "type": "array"
            },
            {
                "note": "专业编码",
                "name": "specialty",
                "mapName": "",
                "type": "array"
            },
            {
                "note": "专业对象",
                "name": "specialty_name",
                "mapName": "",
                "type": "array",
                "proArr": [{
                    "note": "id",
                    "name": "code",
                    "mapName": "",
                    "type": "string"
                },
                    {
                        "note": "名字",
                        "name": "name",
                        "mapName": "",
                        "type": "string"
                    }
                ]
            },
            {
                "note": "证件照片",
                "name": "id_photo",
                "mapName": "",
                "type": "fileLink",
                "fileType": 1
            },
            {
                "note": "系统头像",
                "name": "head_portrait",
                "mapName": "",
                "type": "fileLink",
                "fileType": 1
            },
            {
                "note": "人员状态",
                "name": "person_status",
                "mapName": "",
                "type": "string"
            },
            {
                "note": "角色",
                "name": "roles",
                "mapName": "",
                "type": "object"
            },
            {
                "note": "角色",
                "name": "role_ids",
                "mapName": "",
                "type": "array"
            },
            {
                "note": "角色",
                "name": "role_array",
                "mapName": "",
                "type": "array",
                "proArr": [{
                    "note": "id",
                    "name": "role_id",
                    "mapName": "",
                    "type": "string"
                },
                    {
                        "note": "名字",
                        "name": "role_name",
                        "mapName": "",
                        "type": "string"
                    }
                ]
            }
        ]
    },
    "restRoleService/queryRoleList": {
        "note": "角色管理-列表页:查询角色列表",
        "type": "array",
        "proArr": [{
            "note": "角色id",
            "name": "role_id",
            "mapName": "",
            "type": "string"
        },
            {
                "note": "所属项目id",
                "name": "project_id",
                "mapName": "",
                "type": "string"
            },
            {
                "note": "角色名称",
                "name": "role_name",
                "mapName": "",
                "type": "string"
            },
            {
                "note": "功能权限组",
                "name": "func_pack_ids",
                "mapName": "",
                "type": "array"
            },
            {
                "note": "功能权限组",
                "name": "func_pack_names",
                "mapName": "",
                "type": "array"
            }
        ]
    },
    "restRoleService/queryFuncPackList": {
        "note": "角色管理-查询权限项列表",
        "type": "array",
        "proArr": [{
            "note": "权限项id",
            "name": "func_pack_id",
            "mapName": "",
            "type": "string"
        },
            {
                "note": "权限项名称",
                "name": "func_pack_name",
                "mapName": "",
                "type": "string"
            },
            {
                "note": "描述",
                "name": "description",
                "mapName": "",
                "type": "string"
            },
            {
                "note": "是否选中",
                "name": "issel",
                "mapName": "",
                "type": "boolean"
            }
        ]
    },
    "restRoleService/queryRoleDetailById": {
        "note": "角色管理-根据id查询角色详细信息",
        "type": "object",
        "proArr": [{
            "note": "角色id",
            "name": "role_id",
            "mapName": "",
            "type": "string"
        },
            {
                "note": "项目id",
                "name": "project_id",
                "mapName": "",
                "type": "string"
            },
            {
                "note": "角色姓名",
                "name": "role_name",
                "mapName": "",
                "type": "string"
            },
            {
                "note": "功能权限组，具有的权限",
                "name": "func_pack_list",
                "mapName": "",
                "type": "array",
                "proArr": [{
                    "note": "权限项id",
                    "name": "func_pack_id",
                    "mapName": "",
                    "type": "string"
                },
                    {
                        "note": "权限项名称",
                        "name": "func_pack_name",
                        "mapName": "",
                        "type": "string"
                    },
                    {
                        "note": "描述",
                        "name": "description",
                        "mapName": "",
                        "type": "string"
                    }
                ]
            }
        ]
    },
    "restGeneralDictService/queryGeneralDictByKey": {
        "note": "数据字典 查询专业",
        "type": "array",
        "proArr": [{
            "note": "id",
            "name": "code",
            "mapName": "",
            "type": "string"
        },
            {
                "note": "名字",
                "name": "name",
                "mapName": "",
                "type": "string"
            },
            {
                "note": "释义",
                "name": "description",
                "mapName": "",
                "type": "string"
            },
            {
                "note": "key值",
                "name": "dict_type",
                "mapName": "",
                "type": "string"
            }
        ]
    },
    "restPersonService/queryPersonTagsByProjectId": {
        "note": "查询项目下标签列表",
        "mapName": "",
        "type": "array"
    },
    "restFlowPlanService/verifyFlowPlanType": {
        "note": "验证是否可以创建某种方案",
        "type": "object",
        "proArr": [{
            "note": "can_use",
            "name": "can_use",
            "type": "string"
        }]
    },
    'restFlowPlanService/verifyPostAndDuty': {
        note: '验证工单岗位职责',
        type: 'object',
        proArr: [{
            note: '岗位职责是否合格',
            name: 'is_pass',
            type: 'boolean'
        }, {
            note: '不合格提醒内容',
            name: 'reminds',
            type: 'array'
        }, {
            note: '不合格岗位职责',
            name: 'post_and_duty',
            type: 'array',
            proArr: [{
                note: '类型2岗位3人',
                name: 'type',
                type: 'string'
            }, {
                note: '岗位或人员名称',
                name: 'name',
                type: 'string'
            }, {
                note: 'person_id',
                name: 'person_id',
                type: 'string'
            }, {
                note: '职责code',
                name: 'duty',
                type: 'array',

            }]
        }]
    },
    "restFlowPlanService/queryProjectFlowPlan": {
        "note": "查询项目下所有方案",
        "mapName": "",
        "type": "array",
        "proArr": [{
            "note": "方案计划id",
            "name": "plan_id",
            "mapName": "",
            "type": "string"
        },
            {
                "note": "工单类型编码",
                "name": "order_type",
                "mapName": "",
                "type": "string"
            },
            {
                "note": "工单类型名称",
                "name": "order_type_name",
                "mapName": "",
                "type": "string"
            },
            {
                "note": "类型编码",
                "name": "execute_type",
                "mapName": "",
                "type": "string"
            },
            {
                "note": "时间类型名称",
                "name": "execute_type_name",
                "mapName": "",
                "type": "string"
            },
            {
                "note": "方案状态，0-需维护，1-正常",
                "name": "plan_status",
                "mapName": "",
                "type": "string"
            },
            {
                "note": "创建时间",
                "name": "create_time",
                "mapName": "",
                "type": "string"
            }
        ]
    },
    "restFlowPlanService/deleteFlowPlanById": {
        "note": "根据Id删除流转方案信息",
        "mapName": "",
        "type": "object",
        "proArr": [{
            "note": "返回结果状态",
            "name": "Result",
            "mapName": "",
            "type": "string"
        },
            {
                "note": "返回结果状态信息",
                "name": "ResultMsg",
                "mapName": "",
                "type": "string"
            }
        ]
    },
    "restFlowPlanService/queryFlowPlanRemindMsg": {
        "note": "查询流转方案提醒消息",
        "mapName": "",
        "type": "object",
        "proArr": [{
            "note": "返回结果状态",
            "name": "Result",
            "mapName": "",
            "type": "string"
        },
            {
                "note": "提醒信息",
                "name": "Item",
                "mapName": "",
                "type": "object",
                "proArr": [{
                    "note": "信息",
                    "name": "remind",
                    "mapName": "",
                    "type": "string"
                }]
            },
            {
                "note": "返回结果状态信息",
                "name": "ResultMsg",
                "mapName": "",
                "type": "string"
            }
        ]
    },
    "restPersonService/queryProjectPersonSel": {
        "note": "查询项目下人员列表",
        "type": "array",
        "proArr": [{
            "note": "员工id",
            "name": "person_id",
            "type": "string"
        },
            {
                "note": "员工姓名",
                "name": "name",
                "type": "string"
            }
        ]
    },
    "restPersonService/queryValidPersonForPosition": {
        "note": "查询岗位下在职人员",
        "type": "array",
        "proArr": [{
            "note": "岗位名称",
            "name": "position",
            "type": "string"
        },
            {
                "note": "岗位下人员列表",
                "name": "persons",
                "proArr": [{
                    "note": "员工id",
                    "name": "person_id",
                    "type": "string"
                },
                    {
                        "note": "员工姓名",
                        "name": "name",
                        "type": "string"
                    }
                ]
            }
        ]
    },
    "restFlowPlanService/queryFlowPlanById": {
        "note": "根据id查询详细信息",
        "type": "object",
        "proArr": [{
            "note": "方案id",
            "name": "plan_id",
            "type": "string"
        },
            {
                "note": "项目id",
                "name": "project_id",
                "type": "string"
            },
            {
                "note": "工单类型code",
                "name": "order_type",
                "type": "string"
            },
            {
                "note": "工单类型名称",
                "name": "order_type_name",
                "type": "string"
            },
            {
                "note": "类型编码",
                "name": "execute_type",
                "type": "string"
            },
            {
                "note": "时间类型名称",
                "name": "execute_type_name",
                "type": "string"
            },
            {
                "note": "岗位职责",
                "name": "post_and_duty",
                "type": "array",
                "proArr": [{
                    "note": "类型,2代表岗位,3代表人",
                    "name": "type",
                    "type": "string"
                },
                    {
                        "note": "岗位名称",
                        "name": "name",
                        "type": "string"
                    },
                    {
                        "note": "不同职责对应的数据结构",
                        "name": "duty",
                        "type": "array",
                        "proArr": [{
                            "note": "code",
                            "name": "control_code",
                            "type": "string"
                        },
                            {
                                "note": "职责名称",
                                "name": "control_name",
                                "type": "string"
                            },
                            {
                                "note": "是否需要按照排班表过滤每次指派的人员范围",
                                "name": "filter_scheduling",
                                "type": "boolean"
                            },
                            {
                                "note": "是否启动专业控制",
                                "name": "limit_domain",
                                "type": "boolean"
                            },
                            {
                                "note": "审核结束方式,1-手动点击结束,2-审核后自动结束",
                                "name": "audit_close_way",
                                "type": "number",
                                "isToSpecial": false
                            },
                            {
                                "note": "工单执行方式,1-只允许单人串行执行,2-允许多人并行执行",
                                "name": "executie_mode",
                                "type": "string"
                            },
                            {
                                "note": "下级路由",
                                "name": "next_route",
                                "type": "array",
                                "proArr": [{
                                    "note": "类型,2岗位,3人",
                                    "name": "type",
                                    "type": "number"
                                },
                                    {
                                        "note": "岗位名称/人员名称",
                                        "name": "name",
                                        "type": "string"
                                    },
                                    {
                                        "note": "员工id",
                                        "name": "person_id",
                                        "type": "string",
                                        "isToSpecial": false
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                "note": "方案状态",
                "name": "plan_status",
                "type": "string"
            },
            {
                "note": "创建时间",
                "name": "create_time",
                "type": "string"
            },
            {
                "note": "有效状态",
                "name": "valid",
                "type": "string"
            }
        ]
    },
    "restFlowPlanService/addFlowPlan": {
        "note": "流转方案新建保存",
        "type": "object",
        "proArr": [{
            "note": "方案id",
            "name": "plan_id",
            "type": "string"
        },
            {
                "note": "项目id",
                "name": "project_id",
                "type": "string"
            },
            {
                "note": "工单类型code",
                "name": "order_type",
                "type": "string"
            },
            {
                "note": "工单类型名称",
                "name": "order_type_name",
                "type": "string"
            },
            {
                "note": "类型编码",
                "name": "execute_type",
                "type": "string"
            },
            {
                "note": "时间类型名称",
                "name": "execute_type_name",
                "type": "string"
            },
            {
                "note": "工单执行方式,1-只允许单人串行执行,2-允许多人并行执行",
                "name": "executie_mode",
                "type": "string"
            },
            {
                "note": "岗位职责",
                "name": "post_and_duty",
                "proArr": [{
                    "note": "类型,2代表岗位,3代表人",
                    "name": "type",
                    "type": "string"
                },
                    {
                        "note": "岗位名称",
                        "name": "name",
                        "type": "string"
                    },
                    {
                        "note": "不同职责对应的数据结构",
                        "name": "duty",
                        "type": "array",
                        "proArr": [{
                            "note": "code",
                            "name": "control_code",
                            "type": "string"
                        },
                            {
                                "note": "职责名称",
                                "name": "control_name",
                                "type": "string"
                            },
                            {
                                "note": "是否需要按照排班表过滤每次指派的人员范围",
                                "name": "filter_scheduling",
                                "type": "boolean"
                            },
                            {
                                "note": "是否启动专业控制",
                                "name": "limit_domain",
                                "type": "boolean"
                            },
                            {
                                "note": "审核结束方式,1-手动点击结束,2-审核后自动结束",
                                "name": "audit_close_way",
                                "type": "number",
                                "isToSpecial": false
                            },
                            {
                                "note": "下级路由",
                                "name": "next_route",
                                "proArr": [{
                                    "note": "类型,2岗位,3人",
                                    "name": "type",
                                    "type": "number"
                                },
                                    {
                                        "note": "岗位名称/人员名称",
                                        "name": "name",
                                        "type": "string"
                                    },
                                    {
                                        "note": "员工id",
                                        "name": "person_id",
                                        "type": "string"
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                "note": "方案状态",
                "name": "plan_status",
                "type": "string"
            },
            {
                "note": "创建时间",
                "name": "create_time",
                "type": "string"
            },
            {
                "note": "有效状态",
                "name": "valid",
                "type": "string"
            }
        ]
    },
    "restFlowPlanService/updateFlowPlanById": {
        "note": "根据id查询详细信息",
        "type": "object",
        "proArr": [{
            "note": "方案id",
            "name": "plan_id",
            "type": "string"
        },
            {
                "note": "项目id",
                "name": "project_id",
                "type": "string"
            },
            {
                "note": "工单类型code",
                "name": "order_type",
                "type": "string"
            },
            {
                "note": "工单类型名称",
                "name": "order_type_name",
                "type": "string"
            },
            {
                "note": "类型编码",
                "name": "execute_type",
                "type": "string"
            },
            {
                "note": "时间类型名称",
                "name": "execute_type_name",
                "type": "string"
            },
            {
                "note": "岗位职责",
                "name": "post_and_duty",
                "type": "array",
                "proArr": [{
                    "note": "类型,2代表岗位,3代表人",
                    "name": "type",
                    "type": "string"
                },
                    {
                        "note": "岗位名称",
                        "name": "name",
                        "type": "string"
                    },
                    {
                        "note": "员工id",
                        "name": "person_id",
                        "type": "string",
                        "isToSpecial": false
                    },
                    {
                        "note": "不同职责对应的数据结构",
                        "name": "duty",
                        "type": "array",
                        "proArr": [{
                            "note": "code",
                            "name": "control_code",
                            "type": "string"
                        },
                            {
                                "note": "职责名称",
                                "name": "control_name",
                                "type": "string"
                            },
                            {
                                "note": "是否需要按照排班表过滤每次指派的人员范围",
                                "name": "filter_scheduling",
                                "type": "boolean"
                            },
                            {
                                "note": "是否启动专业控制",
                                "name": "limit_domain",
                                "type": "boolean"
                            },
                            {
                                "note": "审核结束方式,1-手动点击结束,2-审核后自动结束",
                                "name": "audit_close_way",
                                "type": "number",
                                "isToSpecial": false
                            },
                            {
                                "note": "工单执行方式,1-只允许单人串行执行,2-允许多人并行执行",
                                "name": "executie_mode",
                                "type": "string"
                            },
                            {
                                "note": "下级路由",
                                "name": "next_route",
                                "type": "array",
                                "proArr": [{
                                    "note": "类型,2岗位,3人",
                                    "name": "type",
                                    "type": "number"
                                },
                                    {
                                        "note": "岗位名称/人员名称",
                                        "name": "name",
                                        "type": "string"
                                    },
                                    {
                                        "note": "员工id",
                                        "name": "person_id",
                                        "type": "string",
                                        "isToSpecial": false
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                "note": "方案状态",
                "name": "plan_status",
                "type": "string"
            },
            {
                "note": "创建时间",
                "name": "create_time",
                "type": "string"
            },
            {
                "note": "有效状态",
                "name": "valid",
                "type": "string"
            }
        ]
    },
    "restPersonService/queryPositionPersonSel": {
        "note": "查询岗位和人员列表",
        "type": "array",
        "proArr": [{
            "note": "类型2岗位3人",
            "name": "type",
            "type": "string"
        },
            {
                "note": "岗位名称人员名称",
                "name": "name",
                "type": "string"
            },
            {
                "note": "员工id",
                "name": "person_id",
                "type": "string"
            },
            {
                "note": "岗位下人员列表",
                "name": "persons",
                "type": "array",
                "proArr": [{
                    "note": "员工id",
                    "name": "person_id",
                    "type": "string"
                },
                    {
                        "note": "员工姓名",
                        "name": "name",
                        "type": "string"
                    }
                ]
            }
        ]
    },
    "restGeneralDictService/queryWorkOrderState": {
        "note": "工单状态",
        "type": "array",
        "proArr": [{
            "note": "编号",
            "name": "code",
            "type": "string"
        },
            {
                "note": "状态名称",
                "name": "name",
                "type": "string"
            },
            {
                "note": "注释",
                "name": "description",
                "type": "string"
            }
        ]
    },
    "restWoMonitorService/queryAllWorkOrder": {
        "note": "所有工单",
        "type": "array",
        "proArr": [{
            "note": "工单id",
            "name": "order_id",
            "type": "string"
        },
            {
                "note": "工单类型",
                "name": "order_type",
                "type": "string"
            },
            {
                "note": "工单类型名称",
                "name": "order_type_name",
                "type": "string"
            },
            {
                "note": "工单概述",
                "name": "summary",
                "type": "string"
            },
            {
                "note": "工单状态编码",
                "name": "order_state",
                "type": "string",
                "isToSpecial": false
            },
            {
                "note": "工单状态名称",
                "name": "order_state_name",
                "type": "string"
            },
            {
                "note": "工单自定义状态",
                "name": "custom_state",
                "type": "string"
            },
            {
                "note": "工单自定义状态名称",
                "name": "custom_state_name",
                "type": "string"
            },
            {
                "note": "创建时间",
                "name": "create_time",
                "type": "string"
            }
        ]
    },
    "restGeneralDictService/queryWorkOrderType": {
        "note": "查询当前用户能使用的工单类型",
        "type": "array",
        "proArr": [{
            "note": "id",
            "name": "code",
            "mapName": "",
            "type": "string"
        },
            {
                "note": "名字",
                "name": "name",
                "mapName": "",
                "type": "string"
            },
            {
                "note": "释义",
                "name": "description",
                "mapName": "",
                "type": "string"
            },
            {
                "note": "类型key值",
                "name": "dict_type",
                "mapName": "",
                "type": "string"
            }
        ]
    },
    "restMyWorkOrderService/queryMyDraftWorkOrder": {
        "note": "我的草稿箱工单",
        "type": "array",
        "proArr": [{
            "note": "工单id",
            "name": "order_id",
            "type": "string"
        },
            {
                "note": "工单类型",
                "name": "order_type",
                "type": "string"
            },
            {
                "note": "工单类型名称",
                "name": "order_type_name",
                "type": "string"
            },
            {
                "note": "工单概述",
                "name": "summary",
                "type": "string"
            },
            {
                "note": "创建时间",
                "name": "create_time",
                "type": "string"
            }
        ]
    },
    "restMyWorkOrderService/queryMyPublishWorkOrder": {
        "note": "我发布的工单",
        "type": "array",
        "proArr": [{
            "note": "工单id",
            "name": "order_id",
            "type": "string"
        },
            {
                "note": "工单类型",
                "name": "order_type",
                "type": "string"
            },
            {
                "note": "工单类型名称",
                "name": "order_type_name",
                "type": "string"
            },
            {
                "note": "工单概述",
                "name": "summary",
                "type": "string"
            },
            {
                "note": "要求开始时间",
                "name": "ask_start_time",
                "type": "string"
            },
            {
                "note": "要求结束时间",
                "name": "ask_end_time",
                "type": "string"
            },
            {
                "note": "工单状态编码",
                "name": "order_state",
                "type": "string",
                "isToSpecial": false
            },
            {
                "note": "工单状态名称",
                "name": "order_state_name",
                "type": "string"
            }
        ]
    },
    "restMyWorkOrderService/queryMyParticipantWorkOrder": {
        "note": "我参与的工单",
        "type": "array",
        "proArr": [{
            "note": "工单id",
            "name": "order_id",
            "type": "string"
        },
            {
                "note": "工单类型",
                "name": "order_type",
                "type": "string"
            },
            {
                "note": "工单类型名称",
                "name": "order_type_name",
                "type": "string"
            },
            {
                "note": "工单概述",
                "name": "summary",
                "type": "string"
            },
            {
                "note": "要求开始时间",
                "name": "ask_start_time",
                "type": "string"
            },
            {
                "note": "要求结束时间",
                "name": "ask_end_time",
                "type": "string"
            },
            {
                "note": "工单状态编码",
                "name": "order_state",
                "type": "string",
                "isToSpecial": false
            },
            {
                "note": "工单状态名称",
                "name": "order_state_name",
                "type": "string"
            }
        ]
    },
    "restMyWorkOrderService/deleteDraftWorkOrderById": {
        "note": "删除草稿工单",
        "mapName": "",
        "type": "object",
        "proArr": [{
            "note": "返回结果状态",
            "name": "Result",
            "mapName": "",
            "type": "string"
        },
            {
                "note": "返回结果状态信息",
                "name": "ResultMsg",
                "mapName": "",
                "type": "string"
            }
        ]
    },
    "restWoPlanService/queryTabList": {
        "note": "查询计划监控tab标签列表",
        "type": "array",
        "proArr": [{
            "note": "工单类型编码",
            "name": "order_type",
            "type": "string"
        }, {
            "note": "tab名称",
            "name": "tab_name",
            "type": "string"
        }]
    },
    "restWoPlanService/queryWoPlanExecuteList": {
        "note": "查询工单计划执行列表",
        "type": "array",
        "proArr": [{
            "note": "计划id",
            "name": "plan_id",
            "type": "string"
        }, {
            "note": "计划名称",
            "name": "plan_name",
            "type": "string"
        }, {
            "note": "计划结束时间",
            "name": "plan_end_time",
            "type": "string"
        }, {
            "note": "计划频率-周期",
            "name": "freq_cycle",
            "type": "string"
        }, {
            "note": "计划频率-次数",
            "name": "freq_num",
            "type": "number"
        }, {
            "note": "计划频率描述",
            "name": "freq_cycle_desc",
            "type": "string"
        }, {
            "note": "行数",
            "name": "row_count",
            "type": "number"
        }, {
            "note": "时间段内生成工单数组",
            "name": "work_orders",
            "type": "array",
            "proArr": [{
                "note": "工单id",
                "name": "order_id",
                "type": "string"

            }, {
                "note": "要求开始时间",
                "name": "ask_start_time",
                "type": "string"

            }, {
                "note": "要求结束时间",
                "name": "ask_end_time",
                "type": "string"

            }, {
                "note": "工单状态编码",
                "name": "order_state",
                "type": "string",
                "isToSpecial": false

            }, {
                "note": "是否为下次待发出工单",
                "name": "is_next_order",
                "type": "boolean"

            }]

        }]
    },
    "restWoPlanService/queryWoPlanDayExecuteList": {
        "note": "查询工单计划执行列表-频率日",
        "type": "array",
        "proArr": [{
            "note": "计划id",
            "name": "plan_id",
            "type": "string"
        }, {
            "note": "计划名称",
            "name": "plan_name",
            "type": "string"
        }, {
            "note": "计划结束时间",
            "name": "plan_end_time",
            "type": "string"
        }, {
            "note": "最大频次数",
            "name": "max_freq_num",
            "type": "string"
        }, {
            "note": "计划频率-周期",
            "name": "freq_cycle",
            "type": "string"
        }, {
            "note": "计划频率-次数",
            "name": "freq_num",
            "type": "number"
        }, {
            "note": "计划频率描述",
            "name": "freq_cycle_desc",
            "type": "string"
        }, {
            "note": "时间段内生成工单数组",
            "name": "work_order_date",
            "type": "array",
            "proArr": [
                {
                    "note": "日期",
                    "name": "date",
                    "type": "string"
                }, {
                    "note": "work_orders",
                    "name": "work_orders",
                    "type": "array",
                    "proArr": [
                        {
                            "note": "工单id",
                            "name": "order_id",
                            "type": "string"
                        }, {
                            "note": "工单生成的频次序号",
                            "name": "freq_seq",
                            "type": "number"
                        }, {
                            "note": "工单要求开始时间-yyyyMMddhhmmss",
                            "name": "ask_start_time",
                            "type": "string"
                        }, {
                            "note": "工单要求结束时间",
                            "name": "ask_end_time",
                            "type": "string"
                        }, {
                            "note": "工单状态编码",
                            "name": "order_state",
                            "type": "string",
                            "isToSpecial": false
                        }]
                }]
        }]
    },
    "restWoPlanService/queryWoPlanById": {
        "note": "根据Id查询工单计划的详细信息",
        "type": "object",
        "proArr": [{
            "note": "计划id",
            "name": "plan_id",
            "type": "string"
        }, {
            "note": "项目id",
            "name": "project_id",
            "type": "string"
        }, {
            "note": "工单计划名称",
            "name": "plan_name",
            "type": "string"
        }, {
            "note": "工单类型编码",
            "name": "order_type",
            "type": "string"
        }, {
            "note": "工单类型名称",
            "name": "order_type_name",
            "type": "string"
        }, {
            "note": "紧急程度,高、中、低",
            "name": "urgency",
            "type": "string"
        }, {
            "note": "提前创建工单时间",
            "name": "ahead_create_time",
            "type": "string"
        }, {
            "note": "计划频率-周期-y/m/w/d",
            "name": "freq_cycle",
            "type": "string"
        }, {
            "note": "计划频率-次数",
            "name": "freq_num",
            "type": "string"
        }, {
            "note": "计划频率-时间",
            "name": "freq_times",
            "type": "array",
            "proArr": [{
                "note": "开始时间",
                "name": "start_time",
                "type": "object",
                "proArr": [{
                    "note": "周期-y/m/w/d",
                    "name": "cycle",
                    "type": "string"
                }, {
                    "note": "周一",
                    "name": "time_day",
                    "type": "string"
                }, {
                    "note": "时",
                    "name": "time_hour",
                    "type": "string"
                }, {
                    "note": "分",
                    "name": "time_minute",
                    "type": "string"
                },]
            }, {
                "note": "结束时间",
                "name": "end_time",
                "type": "object",
                "proArr": [{
                    "note": "周期-y/m/w/d",
                    "name": "cycle",
                    "type": "string"
                }, {
                    "note": "周一",
                    "name": "time_day",
                    "type": "string"
                }, {
                    "note": "时",
                    "name": "time_hour",
                    "type": "string"
                }, {
                    "note": "分",
                    "name": "time_minute",
                    "type": "string"
                },]
            }]
        }, {
            "note": "计划开始类型,1-发布成功后立即，2-指定时间",
            "name": "plan_start_type",
            "type": "string"
        }, {
            "note": "计划开始时间",
            "name": "plan_start_time",
            "type": "string"
        }, {
            "note": "计划结束时间",
            "name": "plan_end_time",
            "type": "string"
        }, {
            "note": "工单事项数组,草稿的matters",
            "name": "draft_matters",
            "type": "array",
            "proArrBy": "plan_matters"
        }, {
            "note": "报废人id",
            "name": "destroy_person_id",
            "type": "string"
        }, {
            "note": "报废人name",
            "name": "destroy_person_named",
            "type": "string"
        }, {
            "note": "报废时间",
            "name": "destroy_time",
            "type": "string"
        }, {
            "note": "创建时间",
            "name": "create_time",
            "type": "string"
        }, {
            "note": "最后更新时间",
            "name": "update_time",
            "type": "string"
        }]
    },
    "restWoPlanService/queryWoPlanHisList": {
        "note": "查询工单计划的历史列表",
        "type": "array",
        "proArr": [{
            "note": "工单计划id",
            "name": "plan_id",
            "type": "string"
        }, {
            "note": "项目id",
            "name": "project_id",
            "type": "string"
        }, {
            "note": "工单计划名称",
            "name": "plan_name",
            "type": "string"
        }, {
            "note": "工单类型编码",
            "name": "order_type",
            "type": "string"
        }, {
            "note": "工单类型名称",
            "name": "order_type_name",
            "type": "string"
        }, {
            "note": "紧急程度,高、中、低",
            "name": "urgency",
            "type": "string"
        }, {
            "note": "提前创建工单时",
            "name": "ahead_create_time",
            "type": "string"
        }, {
            "note": "计划频率",
            "name": "freq_cycle",
            "type": "string"
        }, {
            "note": "计划频率-次数",
            "name": "freq_num",
            "type": "string"
        }, {
            "note": "计划频率-时间",
            "name": "freq_times",
            "type": "array",
            "proArr": [{
                "note": "开始时间",
                "name": "start_time",
                "type": "object",
                "proArr": [{
                    "note": "周期,y/m/w/d",
                    "name": "cycle",
                    "type": "string"
                }, {
                    "note": "1号",
                    "name": "time_day",
                    "type": "string"
                }, {
                    "note": "10时",
                    "name": "time_hour",
                    "type": "string"
                }, {
                    "note": "15分",
                    "name": "time_minute",
                    "type": "string"
                },]
            }, {
                "note": "结束时间",
                "name": "end_time",
                "type": "object",
                "proArr": [{
                    "note": "周期,y/m/w/d",
                    "name": "cycle",
                    "type": "string"
                }, {
                    "note": "1号",
                    "name": "time_day",
                    "type": "string"
                }, {
                    "note": "10时",
                    "name": "time_hour",
                    "type": "string"
                }, {
                    "note": "15分",
                    "name": "time_minute",
                    "type": "string"
                },]
            }]
        }, {
            "note": "计划开始类型,1-发布成功后立即，2-指定时间",
            "name": "plan_start_type",
            "type": "string"
        }, {
            "note": "计划开始时间",
            "name": "plan_start_time",
            "type": "string"
        }, {
            "note": "计划结束时间",
            "name": "plan_end_time",
            "type": "string"
        }, {
            "note": "工单事项数组,草稿的matters",
            "name": "draft_matters",
            "type": "array",
            "proArrBy": "plan_matters"
        }, {
            "note": "创建时间,yyyyMMddHHmmss",
            "name": "create_time",
            "type": "string"
        }, {
            "note": "最后更新时间,yyyyMMddHHmmss ",
            "name": "update_time",
            "type": "string"
        },]
    },
    "restWoPlanService/queryDestroyedWoPlanList": {
        "note": "查询作废的计划列表",
        "type": "array",
        "proArr": [{
            "note": "工单计划id",
            "name": "plan_id",
            "type": "string"
        }, {
            "note": "项目id",
            "name": "project_id",
            "type": "string"
        }, {
            "note": "工单计划名称",
            "name": "plan_name",
            "type": "string"
        }, {
            "note": "工作事项概述,将事项名称连接起来的字符串",
            "name": "matters_desc",
            "type": "string"
        }, {
            "note": "计划开始时间",
            "name": "plan_start_time",
            "type": "string"
        }, {
            "note": "计划结束时间",
            "name": "plan_end_time",
            "type": "string"
        }, {
            "note": "报废人name",
            "name": "destroy_person_name",
            "type": "string"
        }]
    },
    "restWoPlanService/queryWoListByPlanId": {
        "note": "查询工单计划生成的工单列表",
        "type": "array",
        "proArr": [{
            "note": "工单id",
            "name": "order_id",
            "type": "string"
        }, {
            "note": "创建时间",
            "name": "create_time",
            "type": "string"
        }, {
            "note": "结束时间",
            "name": "close_time",
            "type": "string"
        }, {
            "note": "参与人/操作人",
            "name": "participants",
            "type": "string"
        }, {
            "note": "工单状态名称",
            "name": "order_state_name",
            "type": "string"
        }]
    },
    "restWoPlanService/getWoMattersPreview": {
        "note": "计划监控-新增页:获得工单事项预览",
        "type": "object",
        "proArr": [{
            "note": "工单事项数组",
            "name": "published_matters",
            "type": "array",
            "proArrBy": "order_matters"
        }]
    },
    "restObjectService/queryObjectByClass": {
        "note": "查询大类下的对象实例",
        "type": "array",
        "proArr": [{
            "note": "对象id",
            "name": "obj_id",
            "type": "string"
        }, {
            "note": "对象名称",
            "name": "obj_name",
            "type": "string"
        }, {
            "note": "对象类型system、equip",
            "name": "obj_type",
            "type": "string"
        }, {
            "note": "父级有以下的一个或者几个",
            "name": "parents",
            "type": "array",
            "proArr": [{
                "note": "parent_ids",
                "name": "parent_ids",
                "type": "array"
            }, {
                "note": "parent_names",
                "name": "parent_names",
                "type": "array"
            }]
        },]
    },
    "restWoPlanService/updateWoPlan": {
        "note": "根据Id编辑工单计划信息",
        "type": "object",
        "proArr": [{
            "note": "员工id",
            "name": "user_id",
            "type": "string"
        }, {
            "note": "项目id",
            "name": "project_id",
            "type": "string"
        }, {
            "note": "工单计划id",
            "name": "plan_id",
            "type": "string"
        }, {
            "note": "工单计划名称",
            "name": "plan_name",
            "type": "string"
        }, {
            "note": "工单类型编码",
            "name": "order_type",
            "type": "string"
        }, {
            "note": "紧急程度,高、中、低",
            "name": "urgency",
            "type": "string"
        }, {
            "note": "提前创建工单时间",
            "name": "ahead_create_time",
            "type": "string"
        }, {
            "note": "计划频率-周期,y/m/w/d",
            "name": "freq_cycle",
            "type": "string"
        }, {
            "note": "计划频率-次数",
            "name": "freq_num",
            "type": "string"
        }, {
            "note": "计划频率-时间",
            "name": "freq_times",
            "type": "array",
            "proArr": [{
                "note": "开始时间",
                "name": "start_time",
                "type": "object",
                "proArr": [{
                    "note": "周期,y/m/w/d",
                    "name": "cycle",
                    "type": "string"
                }, {
                    "note": "1号",
                    "name": "time_day",
                    "type": "string"
                }, {
                    "note": "10时",
                    "name": "time_hour",
                    "type": "string"
                }, {
                    "note": "15分",
                    "name": "time_minute",
                    "type": "string"
                },]
            }, {
                "note": "结束时间",
                "name": "end_time",
                "type": "object",
                "proArr": [{
                    "note": "周期,y/m/w/d",
                    "name": "cycle",
                    "type": "string"
                }, {
                    "note": "1号",
                    "name": "time_day",
                    "type": "string"
                }, {
                    "note": "10时",
                    "name": "time_hour",
                    "type": "string"
                }, {
                    "note": "15分",
                    "name": "time_minute",
                    "type": "string"
                },]
            }]
        }, {
            "note": "计划开始类型,1-发布成功后立即，2-指定时间",
            "name": "plan_start_type",
            "type": "string"
        }, {
            "note": "计划开始时间",
            "name": "plan_start_time",
            "type": "string"
        }, {
            "note": "计划结束时间",
            "name": "plan_end_time",
            "type": "string"
        }, {
            "note": "工单事项数组,草稿的matters",
            "name": "draft_matters",
            "type": "array",
            "proArrBy": "order_matters"
        }, {
            "note": "工单事项数组,预览后的matters",
            "name": "published_matters",
            "type": "array"
        },]
    },
    'plan_matters': [ //计划详情matters,同我的草稿中的matters
        {
            "note": "事项名称",
            "name": "matter_name",
            "type": "string"
        }, {
            "note": "事项描述",
            "name": "description",
            "type": "string"
        }, {
            "note": "描述内容前段,结构化时用",
            "name": "desc_forepart",
            "type": "string"
        }, {
            "note": "描述内容后段,结构化时用",
            "name": "desc_aftpart",
            "type": "string"
        }, {
            "note": "描述中的图片",
            "name": "desc_photos",
            "type": "fileLink"
        }, {
            "note": "描述中涉及的对象",
            "name": "desc_objs",
            "type": "array",
            "proArr": [{
                "note": "对象id",
                "name": "obj_id",
                "type": "string"
            }, {
                "note": "对象名称",
                "name": "obj_name",
                "type": "string"
            },]
        }, {
            "note": "描述中涉及的sop",
            "name": "desc_sops",
            "type": "array",
            "proArr": [{
                "note": "sop的id",
                "name": "sop_id",
                "type": "string",
            }, {
                "note": "sop_name",
                "name": "sop_name",
                "type": "string",
            }, {
                "note": "version",
                "name": "version",
                "type": "string",
            },]
        }, {
            "note": "描述中涉及的工作内容",
            "name": "desc_works",
            "type": "array",
            "proArr": [{
                "note": "工作内容id",
                "name": "work_id",
                "type": "string",
            }, {
                "note": "工作内容名称",
                "name": "work_name",
                "type": "string",
            }, {
                "note": "强制确认",
                "name": "pre_conform",
                "type": "string",
            }, {
                "note": "操作内容",
                "name": "content",
                "type": "string",
            }, {
                "note": "操作内容中涉及的对象",
                "name": "content_objs",
                "type": "array",
                "proArr": [{
                    "note": "对象id",
                    "name": "obj_id",
                    "type": "string",
                }, {
                    "note": "对象名称",
                    "name": "obj_name",
                    "type": "string",
                }, {
                    "note": "对象类型,",
                    "name": "obj_type",
                    "type": "string",
                },]
            }, {
                "note": "注意事项",
                "name": "notice",
                "type": "string",
            }, {
                "note": "需确认的操作结果",
                "name": "confirm_result",
                "type": "array",
                "proArr": [{
                    "note": "obj_id",
                    "name": "obj_id",
                    "type": "string",
                }, {
                    "note": "obj_name",
                    "name": "obj_name",
                    "type": "string",
                }, {
                    "note": "obj_type",
                    "name": "obj_type",
                    "type": "string",
                }, {
                    "note": "parents",
                    "name": "parents",
                    "type": "array",
                    "proArr": [{
                        "note": "parent_ids",
                        "name": "parent_ids",
                        "type": "array",
                    }, {
                        "note": "parent_names",
                        "name": "parent_names",
                        "type": "array",
                    },]
                }, {
                    "note": "info_points",
                    "name": "info_points",
                    "type": "array",
                    "proArr": [{
                        "note": "info_points",
                        "name": "info_points",
                        "type": "array",
                        "proArr": [{
                            "note": "id",
                            "name": "id",
                            "type": "string",
                        }, {
                            "note": "code",
                            "name": "code",
                            "type": "string",
                        }, {
                            "note": "name",
                            "name": "name",
                            "type": "string",
                        },]
                    }]
                }, {
                    "note": "自定义项",
                    "name": "customs",
                    "type": "array",
                    "proArr": [{
                        "note": "name",
                        "name": "name",
                        "type": "string",
                    }, {
                        "note": "name",
                        "type": "name",
                        "type": "string",
                    }, {
                        "note": "items",
                        "name": "items",
                        "type": "array",
                    }, {
                        "note": "unit",
                        "name": "unit",
                        "type": "string",
                    },]
                },]
            }, {
                "note": "专业code",
                "name": "domain",
                "type": "string",
            }, {
                "note": "专业名称",
                "name": "domain_name",
                "type": "string",
            },]
        }, {
            "note": "required_control",
            "name": "required_control",
            "type": "array"
        }
    ],
    'order_matters': [ //工单详情matters,同已发布中matters
        {
            "note": "引擎需要的id",
            "name": "$ID",
            "type": "string"
        }, {
            "note": "事项id",
            "name": "matter_id",
            "type": "string"
        }, {
            "note": "事项名称",
            "name": "matter_name",
            "type": "string"
        }, {
            "note": "事项步骤",
            "name": "matter_steps",
            "type": "array",
            "proArr": [{
                "note": "引擎需要的id",
                "name": "$ID",
                "type": "string"
            }, {
                "note": "对象步骤id",
                "name": "obj_step_id",
                "type": "string"
            }, {
                "note": "事项概述",
                "name": "description",
                "type": "string"
            }, {
                "note": "对象id",
                "name": "obj_id",
                "type": "string"
            }, {
                "note": "对象名称",
                "name": "obj_name",
                "type": "string"
            }, {
                "note": "步骤",
                "name": "steps",
                "type": "array",
                "proArr": [{
                    "note": "步骤id",
                    "name": "step_id",
                    "type": "string"
                }, {
                    "note": "步骤序号",
                    "name": "step_sequence",
                    "type": "string"
                }, {
                    "note": "步骤类型：1-文字输入,2-上传照片,3-拍照,4-扫码,5-工作内容,6-签字",
                    "name": "step_type",
                    "type": "string"
                }, {
                    "note": "强制确认",
                    "name": "pre_conform",
                    "type": "string"
                }, {
                    "note": "操作内容描述",
                    "name": "content",
                    "type": "string"
                }, {
                    "note": "操作内容中涉及的对象",
                    "name": "content_objs",
                    "type": "array",
                    "proArr": [{
                        "note": "对象id",
                        "name": "obj_id",
                        "type": "string"
                    }, {
                        "note": "对象名称1",
                        "name": "obj_name",
                        "type": "string"
                    }, {
                        "note": "对象类型",
                        "name": "obj_type",
                        "type": "string"
                    },]
                }, {
                    "note": "注意事项",
                    "name": "notice",
                    "type": "string"
                }, {
                    "note": "需确认的操作结果",
                    "name": "confirm_result",
                    "type": "array",
                    "proArr": [{
                        "note": "对象id",
                        "name": "obj_id",
                        "type": "string"
                    }, {
                        "note": "对象名称",
                        "name": "obj_name",
                        "type": "string"
                    }, {
                        "note": "对象id",
                        "name": "obj_type",
                        "type": "string"
                    }, {
                        "note": "parents",
                        "name": "parents",
                        "type": "array",
                        "proArr": [{
                            "note": "parent_ids",
                            "name": "parent_ids",
                            "type": "array"
                        }, {
                            "note": "parent_names",
                            "name": "parent_names",
                            "type": "array"
                        }]
                    }, {
                        "note": "信息点组件数据源类型-待定",
                        "name": "info_points",
                        "type": "array",
                        "proArr": [{
                            "note": "id",
                            "name": "id",
                            "type": "string"
                        }, {
                            "note": "code",
                            "name": "code",
                            "type": "string"
                        }, {
                            "note": "name",
                            "name": "name",
                            "type": "string"
                        }, {
                            "note": "unit",
                            "name": "unit",
                            "type": "string"
                        }, {
                            "note": "cmpt",
                            "name": "cmpt",
                            "type": "string"
                        }, {
                            "note": "cmpt_data",
                            "name": "cmpt_data",
                            "type": "string"
                        }]
                    }, {
                        "note": "自定义项，type：1-文本，2-单选，3-多选,4、无单位的数字,5、有单位的数字",
                        "name": "customs",
                        "type": "array",
                        "proArr": [{
                            "note": "name",
                            "name": "name",
                            "type": "string"
                        }, {
                            "note": "type",
                            "name": "type",
                            "type": "string"
                        }, {
                            "note": "items",
                            "name": "items",
                            "type": "array"
                        }, {
                            "note": "unit",
                            "name": "unit",
                            "type": "string"
                        }]
                    }]
                }, {
                    "note": "专业code",
                    "name": "domain",
                    "type": "string"
                }, {
                    "note": "专业名称",
                    "name": "domain_name",
                    "type": "string"
                },]
            }, {
                "note": "反馈信息",
                "name": "feedback",
                "type": "array",
                "proArr": [{
                    "note": "引擎需要的id",
                    "name": "$ID",
                    "type": "string"
                }, {
                    "note": "步骤id",
                    "name": "step_id",
                    "type": "string"
                }, {
                    "note": "步骤序号",
                    "name": "step_sequence",
                    "type": "string"
                }, {
                    "note": "步骤类型：1-文字输入,2-上传照片,3-拍照,4-扫码,5-工作内容,6-签字,",
                    "name": "step_type",
                    "type": "string"
                }, {
                    "note": "前提确认结果",
                    "name": "pre_conform_result",
                    "type": "string"
                }, {
                    "note": "反馈描述",
                    "name": "description",
                    "type": "string"
                }, {
                    "note": "需确认的操作结果",
                    "name": "confirm_result",
                    "type": "array",
                    "proArr": [{
                        "note": "obj_id",
                        "name": "obj_id",
                        "type": "string"
                    }, {
                        "note": "obj_name",
                        "name": "obj_name",
                        "type": "string"
                    }, {
                        "note": "信息点信息反馈",
                        "name": "info_points",
                        "type": "array",
                        "proArr": [{
                            "note": "id",
                            "name": "id",
                            "type": "string"
                        }, {
                            "note": "code",
                            "name": "code",
                            "type": "string"
                        }, {
                            "note": "name",
                            "name": "name",
                            "type": "string"
                        }, {
                            "note": "value",
                            "name": "value",
                            "type": "string"
                        }, {
                            "note": "unit",
                            "name": "unit",
                            "type": "string"
                        }]
                    }, {
                        "note": "自定义项,type的值不存在或者为1时,返回content",
                        "name": "customs",
                        "type": "array",
                        "proArr": [{
                            "note": "name",
                            "name": "name",
                            "type": "string"
                        }, {
                            "note": "type",
                            "name": "type",
                            "type": "string"
                        }, {
                            "note": "content",
                            "name": "content",
                            "type": "string"
                        }, {
                            "note": "item",
                            "name": "item",
                            "type": "string"
                        }, {
                            "note": "items",
                            "name": "items",
                            "type": "array"
                        }, {
                            "note": "value",
                            "name": "value",
                            "type": "string"
                        }, {
                            "note": "unit",
                            "name": "unit",
                            "type": "string"
                        }]
                    }]
                }, {
                    "note": "图片key",
                    "name": "photos",
                    "type": "fileLink"
                }, {
                    "note": "执行人Id",
                    "name": "executor_id",
                    "type": "string"
                }, {
                    "note": "操作时间，yyyyMMddHHmmss",
                    "name": "operate_time",
                    "type": "string"
                }]
            }, {
                "note": "执行人",
                "name": "executors",
                "type": "array"
            }]
        }, {
            "note": "sop的id",
            "name": "sop_id",
            "type": "string"
        }, {
            "note": "sop名称",
            "name": "sop_name",
            "type": "string",
        }, {
            "note": "sop版本",
            "name": "version",
            "type": "string",
        }
    ],
    'restGeneralDictService/restWoPlanService': {
        "note": "查询tab标签列表",
        "type": "array",
        "proArr": [{
            "note": "工单类型编码",
            "name": "order_type",
            "type": "string"
        }, {
            "note": "tab名称",
            "name": "tab_name",
            "type": "string"
        },]
    },
    'restMyWorkOrderService/queryOperateRecord': {
        "note": "查询工单操作记录",
        "type": "array",
        "proArr": [{
            "note": "操作人姓名",
            "name": "operator_name",
            "type": "string"
        }, {
            "note": "开始时间",
            "name": "start_time",
            "type": "string"
        }, {
            "note": "耗时",
            "name": "use_times",
            "type": "string"
        }]
    },
    'restMyWorkOrderService/previewWorkOrder': {
        "note": "查看工单详细-预览, 用于：1、我的工单-新增页:预览工单草稿",
        "type": "object",
        "proArr": [{
            "note": "工单主体",
            "name": "wo_body",
            "type": "object",
            "proArr": [{
                "note": "工单id",
                "name": "order_id",
                "type": "string",
                "isToSpecial": false
            }, {
                "note": "项目id",
                "name": "project_id",
                "type": "string",
                "isToSpecial": false
            }, {
                "note": "工单类型",
                "name": "order_type",
                "type": "string",
                "isToSpecial": false
            }, {
                "note": "工单类型名称",
                "name": "order_type_name",
                "type": "string",
                "isToSpecial": false
            }, {
                "note": "工单执行类型编码,数据字典查名称",
                "name": "execute_type",
                "type": "string",
                "isToSpecial": false
            }, {
                "note": "紧急程度，高、中、低",
                "name": "urgency",
                "type": "string",
                "isToSpecial": false
            }, {
                "note": "工单执行方式编码,数据字典查名称",
                "name": "executie_mode",
                "type": "string",
                "isToSpecial": false
            }, {
                "note": "开始时间类型,1-发单后立即开始，2-自定义开始时间",
                "name": "start_time_type",
                "type": "string"
            }, {
                "note": "要求开始时间",
                "name": "ask_start_time",
                "type": "string",
                "isToSpecial": false
            }, {
                "note": "要求固定时间内完成,单位小时",
                "name": "ask_end_limit",
                "type": "string",
                "isToSpecial": false
            }, {
                "note": "要求结束时间",
                "name": "ask_end_time",
                "type": "string",
                "isToSpecial": false
            }, {
                "note": "所需工具",
                "name": "required_tools",
                "type": "array"
            }, {
                "note": "工单概述,事项名称的串连",
                "name": "summary",
                "type": "string",
                "isToSpecial": false
            }, {
                "note": "工单来源类型,1-正常创建，2-工单计划，3-报修转工单，默认1",
                "name": "order_from_type",
                "type": "string",
                "isToSpecial": false
            }, {
                "note": "工单来源id，报修转工单时，这里是报修单id",
                "name": "order_from_id",
                "type": "string",
                "isToSpecial": false
            }, {
                "note": "工单中专业列表",
                "name": "domain_list",
                "type": "array"
            }, {
                "note": "工单事项",
                "name": "matters",
                "type": "array",
                "proArrBy": "order_matters"
            }, {
                "note": "创建时间",
                "name": "create_time",
                "type": "string",
                "isToSpecial": false
            }, {
                "note": "有效状态 true：有效，false：失效",
                "name": "valid",
                "type": "boolean"
            }]
        }]

    },
    'restMyWorkOrderService/queryDraftWorkOrderById': {
        "note": "我的工单-编辑页:根据id查询工单详细信息-草稿的",
        "type": "object",
        "proArr": [
            {
                "note": "工单id",
                "name": "order_id",
                "type": "string"
            }, {
                "note": "项目id",
                "name": "project_id",
                "type": "string"
            }, {
                "note": "工单类型",
                "name": "order_type",
                "type": "string"
            }, {
                "note": "工单类型名称",
                "name": "order_type_name",
                "type": "string"
            }, {
                "note": "紧急程度，高、中、低",
                "name": "urgency",
                "type": "string"
            }, {
                "note": "开始时间类型,1-发单后立即开始，2-自定义开始时间",
                "name": "start_time_type",
                "type": "string"
            }, {
                "note": "要求开始时间",
                "name": "ask_start_time",
                "type": "string"
            }, {
                "note": "要求固定时间内完成,单位小时",
                "name": "ask_end_limit",
                "type": "string"
            }, {
                "note": "输入方式",
                "name": "input_mode",
                "type": "string"
            }, {
                "note": "要求结束时间",
                "name": "ask_end_time",
                "type": "string"
            }, {
                "note": "工单来源类型,1-正常创建，2-工单计划，3-报修转工单，默认1",
                "name": "order_from_type",
                "type": "string"
            }, {
                "note": "工单来源id，报修转工单时，这里是报修单id",
                "name": "order_from_id",
                "type": "string"
            }, {
                "note": "工单事项",
                "name": "matters",
                "type": "array",
                "proArrBy": "order_matters"
            }]
    },
    'restWoMonitorService/queryWorkOrderById': {
        "note": "根据id查询工单详细信息-发布后的",
        "type": "object",
        "proArr": [
            {
                "note": "work_order",
                "name": "work_order",
                "type": "object",
                "proArr": [
                    {
                        "note": "工单id",
                        "name": "order_id",
                        "type": "string"
                    }, {
                        "note": "wo_body",
                        "name": "wo_body",
                        "type": "object",
                        "proArr": [
                            {
                                "note": "工单id",
                                "name": "order_id",
                                "type": "string"
                            }, {
                                "note": "项目id",
                                "name": "project_id",
                                "type": "string"
                            }, {
                                "note": "工单类型",
                                "name": "order_type",
                                "type": "string"
                            }, {
                                "note": "工单类型名称",
                                "name": "order_type_name",
                                "type": "string"
                            }, {
                                "note": "工单执行类型编码,数据字典查名称",
                                "name": "execute_type",
                                "type": "string"
                            }, {
                                "note": "紧急程度，高、中、低",
                                "name": "urgency",
                                "type": "string"
                            }, {
                                "note": "工单执行方式编码,数据字典查名称",
                                "name": "executie_mode",
                                "type": "string"
                            }, {
                                "note": "开始时间类型,1-发单后立即开始，2-自定义开始时间",
                                "name": "start_time_type",
                                "type": "string"
                            }, {
                                "note": "要求开始时间",
                                "name": "ask_start_time",
                                "type": "string"
                            }, {
                                "note": "要求固定时间内完成,单位小时",
                                "name": "ask_end_limit",
                                "type": "string"
                            }, {
                                "note": "要求结束时间",
                                "name": "ask_end_time",
                                "type": "string"
                            }, {
                                "note": "所需工具",
                                "name": "required_tools",
                                "type": "array"
                            }, {
                                "note": "工单状态编码",
                                "name": "order_state",
                                "type": "string",
                                "isToSpecial": false
                            }, {
                                "note": "工单状态名称",
                                "name": "order_state_name",
                                "type": "string"
                            }, {
                                "note": "工单自定义状态编码",
                                "name": "custom_state",
                                "type": "string"
                            }, {
                                "note": "工单自定义状态名称",
                                "name": "custom_state_name",
                                "type": "string"
                            }, {
                                "note": "工单概述,事项名称的串连",
                                "name": "summary",
                                "type": "string"
                            }, {
                                "note": "工单来源类型,1-正常创建，2-工单计划，3-报修转工单，默认1",
                                "name": "order_from_type",
                                "type": "string"
                            }, {
                                "note": "工单来源id，报修转工单时，这里是报修单id",
                                "name": "order_from_id",
                                "type": "string"
                            }, {
                                "note": "创建人id",
                                "name": "creator_id",
                                "type": "string"
                            }, {
                                "note": "创建人名字",
                                "name": "creator_name",
                                "type": "string"
                            }, {
                                "note": "工单中专业列表",
                                "name": "domain_list",
                                "type": "array"
                            }, {
                                "note": "专业限制",
                                "name": "limit_domain",
                                "type": "string"
                            }, {
                                "note": "工单事项",
                                "name": "matters",
                                "type": "array",
                                "proArrBy": "order_matters"
                            }, {
                                "note": "执行控制信息",
                                "name": "wo_exec_controls",
                                "type": "array",
                                "proArr": [{
                                    "note": "引擎需要的id",
                                    "name": "$ID",
                                    "type": "string"
                                }, {
                                    "note": "exec_control_id",
                                    "name": "exec_control_id",
                                    "type": "string"
                                }, {
                                    "note": "控制模板编码,名称查询数据字典",
                                    "name": "control_code",
                                    "type": "string"
                                }, {
                                    "note": "操作人名字",
                                    "name": "operator_name",
                                    "type": "string"
                                }, {
                                    "note": "操作开始时间",
                                    "name": "operate_start_time",
                                    "type": "string"
                                }, {
                                    "note": "操作结束时间",
                                    "name": "operate_end_time",
                                    "type": "string"
                                }, {
                                    "note": "申请类型，finish-正常结束，stop-中止",
                                    "name": "apply_type",
                                    "type": "string"
                                }, {
                                    "note": "审核结果,1-通过，0-不通过",
                                    "name": "audit_result",
                                    "type": "string"
                                }, {
                                    "note": "意见",
                                    "name": "opinion",
                                    "type": "string"
                                }, {
                                    "note": "下级路由",
                                    "name": "next_route",
                                    "type": "array"
                                },
                                    {
                                        "note": "操作时间",
                                        "name": "create_time",
                                        "type": "string"
                                    }
                                ]
                            }, {
                                "note": "发布时间",
                                "name": "publish_time",
                                "type": "string"
                            }, {
                                "note": "创建时间",
                                "name": "create_time",
                                "type": "string"
                            }, {
                                "note": "有效状态 true：有效，false：失效",
                                "name": "valid",
                                "type": "boolean"
                            }]
                    }]
            }]

    },
    'restUserService/queryUserWoInputMode': {
        "note": "新增页:查询用户使用的工单输入方式",
        "type": "object",
        "proArr": [{
            "note": "用户id",
            "name": "user_id",
            "type": "string"
        }, {
            "note": "用户输入方式,0-未记录过，1-自由输入，2-结构化输入",
            "name": "input_mode",
            "type": "string"
        }]
    },
    'restUserService/saveUserWoInputMode': {
        "note": "新增页/编辑页:保存用户使用的工单输入方式",
        "type": "object",
        "proArr": [{
            "note": "用户id",
            "name": "user_id",
            "type": "string"
        }, {
            "note": "用户输入方式,1-自由输入，2-结构化输入,必须",
            "name": "input_mode",
            "type": "string"
        }]
    },
    "restSopService/querySopListForSel": {
        note: '查询可供选择的sop',
        type: 'object',
        proArr: [{
            note: '筛选条件参数',
            name: 'criteria',
            type: 'object',
            proArr: [{
                note: '品牌',
                name: 'brands',
                type: 'array'
            }, {
                note: '自定义标签',
                name: 'labels',
                type: 'array'
            }, {
                note: '工单类型',
                name: 'order_type',
                type: 'array',
                proArr: [{
                    note: '编码',
                    name: 'code',
                    type: 'string'
                }, {
                    note: '名称',
                    name: 'name',
                    type: 'string'
                }]
            }, {
                note: '适用对象',
                name: 'fit_objs',
                type: 'array',
                proArr: [{
                    note: 'id',
                    name: 'obj_id',
                    type: 'string'
                }, {
                    note: '名称',
                    name: 'obj_name',
                    type: 'string'
                }]
            }]
        }, {
            note: 'sop列表',
            name: 'content',
            type: 'array',
            proArr: [{
                note: 'sop id',
                name: 'sop_id',
                type: 'string'
            }, {
                note: 'sop名称',
                name: 'sop_name',
                type: 'string'
            }, {
                note: '当前版本号',
                name: 'version',
                type: 'string'
            }, {
                note: '步骤数量',
                name: 'step_count',
                type: 'number'
            }, {
                note: '最后修改时间',
                name: 'update_time',
                type: 'date'
            }]
        }]
    },
    'restObjectService/queryObjClassForObjSel': {
        note: '查询对象分类',
        type: 'array',
        proArr: [{
            note: '对象类型编码',
            name: 'obj_type',
            type: 'string'
        }, {
            note: '对象类型名称',
            name: 'obj_type_name',
            type: 'string'
        }]
    },
    "restObjectService/queryBuild": {
        note: '查询建筑体',
        type: 'array',
        proArr: [{
            note: '对象id',
            name: 'obj_id',
            type: 'string'
        }, {
            note: '对象名称',
            name: 'obj_name',
            type: 'string'
        }]
    },
    "restObjectService/queryFloor": {
        note: '查询楼层',
        type: 'array',
        proArr: [{
            note: '对象id',
            name: 'obj_id',
            type: 'string'
        }, {
            note: '对象名称',
            name: 'obj_name',
            type: 'string'
        }, {
            note: '下级列表',
            name: 'content',
            type: 'array',
            proArr: [{
                note: '对象id',
                name: 'obj_id',
                type: 'string'
            }, {
                note: '对象名称',
                name: 'obj_name',
                type: 'string'
            }, {
                note: '父级',
                name: 'parents',
                type: 'array',
                proArr: [{
                    note: '父级id列表',
                    name: 'parent_ids',
                    type: 'array'
                }, {
                    note: '父级名称列表',
                    name: 'parent_names',
                    type: 'array'
                }]
            }]
        }]
    },
    "restObjectService/querySpace": {
        note: '查询空间结果',
        type: 'array',
        proArr: [{
            note: '对象id',
            name: 'obj_id',
            type: 'string'
        }, {
            note: '对象名称',
            name: 'obj_name',
            type: 'string'
        }, {
            note: '父级',
            name: 'parents',
            type: 'array',
            proArr: [{
                note: '父级id列表',
                name: 'parent_ids',
                type: 'array'
            }, {
                note: '父级名称列表',
                name: 'parent_names',
                type: 'array'
            }]
        }]

    },
    "restObjectService/querySystem": {
        note: '查询系统实例',
        type: 'array',
        proArr: [{
            note: '对象id',
            name: 'obj_id',
            type: 'string'
        }, {
            note: '对象名称',
            name: 'obj_name',
            type: 'string'
        }, {
            note: '下级列表',
            name: 'content',
            type: 'array',
            proArr: [{
                note: '对象id',
                name: 'obj_id',
                type: 'string'
            }, {
                note: '对象名称',
                name: 'obj_name',
                type: 'string'
            }, {
                note: '父级',
                name: 'parents',
                type: 'array',
                proArr: [{
                    note: '父级id列表',
                    name: 'parent_ids',
                    type: 'array'
                }, {
                    note: '父级名称列表',
                    name: 'parent_names',
                    type: 'array'
                }]
            }]
        }]
    },
    "restObjectService/querySystemForSystemDomain": {
        note: '查询设备实例-系统专业下所有系统',
        type: 'array',
        proArr: [{
            note: 'id',
            name: 'system_id',
            type: 'string'
        }, {
            note: '名称',
            name: 'system_name',
            type: 'string'
        }]
    },

    "restObjectService/queryBuildFloorSpaceTree": {
        note: '查询建筑-楼层-空间列表树',
        type: 'array',
        proArr: [{
            note: '对象id',
            name: 'obj_id',
            type: 'string'
        }, {
            note: '对象名称',
            name: 'obj_name',
            type: 'string'
        }, {
            note: '对象类型',
            name: 'obj_type',
            type: 'string'
        }, {
            note: '下级列表',
            name: 'content',
            type: 'array',
            proArr: [{
                note: '对象id',
                name: 'obj_id',
                type: 'string'
            }, {
                note: '对象名称',
                name: 'obj_name',
                type: 'string'
            }, {
                note: '对象类型',
                name: 'obj_type',
                type: 'string'
            }, {
                note: '下级列表',
                name: 'content',
                type: 'array',
                proArr: [{
                    note: '对象id',
                    name: 'obj_id',
                    type: 'string'
                }, {
                    note: '对象名称',
                    name: 'obj_name',
                    type: 'string'
                }, {
                    note: '对象类型',
                    name: 'obj_type',
                    type: 'string'
                }, {
                    note: '父级',
                    name: 'parents',
                    type: 'array',
                    proArr: [{
                        note: '父级id列表',
                        name: 'parent_ids',
                        type: 'array'
                    }, {
                        note: '父级名称列表',
                        name: 'parent_names',
                        type: 'array'
                    }]
                }]
            }]
        }]
    },

    "restObjectService/queryEquip": {
        note: '查询设备实例结果',
        type: 'array',
        proArr: [{
            note: '对象id',
            name: 'obj_id',
            type: 'string'
        }, {
            note: '对象名称',
            name: 'obj_name',
            type: 'string'
        }, {
            note: '父级',
            name: 'parents',
            type: 'array',
            proArr: [{
                note: '父级id列表',
                name: 'parent_ids',
                type: 'array'
            }, {
                note: '父级名称列表',
                name: 'parent_names',
                type: 'array'
            }]
        }]

    },
    "restObjectService/queryTempObjectList": {
        note: '查询工具/部件列表',
        type: 'array',
        proArr: [{
            note: '对象id',
            name: 'obj_id',
            type: 'string'
        }, {
            note: '对象名称',
            name: 'obj_name',
            type: 'string'
        }, {
            note: '对象类型',
            name: 'obj_type',
            type: 'string'
        }]
    },
    "restObjectService/searchInfoPoint": {
        note: '搜索信息点',
        type: 'array',
        proArr: [{
            note: '对象id',
            name: 'obj_id',
            type: 'string'
        }, {
            note: '对象名称',
            name: 'obj_name',
            type: 'string'
        }, {
            note: '对象类型',
            name: 'obj_type',
            type: 'string'
        }, {
            note: '父级',
            name: 'parents',
            type: 'array',
            proArr: [{
                note: '父级id列表',
                name: 'parent_ids',
                type: 'array'
            }, {
                note: '父级名称列表',
                name: 'parent_names',
                type: 'array'
            }]
        }, {
            note: '信息点',
            name: 'info_point',
            type: 'object',
            proArr: [{
                note: 'id',
                name: 'id',
                type: 'string'
            }, {
                note: '编码',
                name: 'code',
                type: 'string'
            }, {
                note: '名称',
                name: 'name',
                type: 'string'
            }]
        }]

    },
    "restObjectService/queryInfoPointForObject": {
        note: '查询对象下信息点',
        type: 'array',
        proArr: [{
            note: 'id',
            name: 'id',
            type: 'string'
        }, {
            note: '编码',
            name: 'code',
            type: 'string'
        }, {
            note: '名称',
            name: 'name',
            type: 'string'
        }]
    },
    "restUserService/smsSendCode": {
        note: '发送验证码',
        type: 'array'
    },
    'sopDetail': [{
        note: 'sop的id',
        name: 'sop_id',
        type: 'string'
    }, {
        note: '项目id',
        name: 'project_id',
        type: 'string'
    }, {
        note: 'sop名称',
        name: 'sop_name',
        type: 'string'
    }, {
        note: '专业编码',
        name: 'domains',
        type: 'array'
    }, {
        note: '工单类型',
        name: 'order_type',
        type: 'array'
    }, {
        note: '工具',
        name: 'tools',
        type: 'array',
        proArr: [{
            note: '工具名称',
            name: 'tool',
            type: 'string'
        }, {
            note: '是否是步骤中的工具',
            name: 'from_step',
            type: 'boolean'
        }]
    }, {
        note: '适用对象',
        name: 'fit_objs',
        type: 'array',
        proArr: [{
            note: '对象id',
            name: 'obj_id',
            type: 'string'
        }, {
            note: '对象名称',
            name: 'obj_name',
            type: 'string'
        }, {
            note: '对象类型',
            name: 'obj_type',
            type: 'string'
        }, {
            note: '待修订标记',
            name: 'is_revise',
            type: 'boolean'
        }]
    }, {
        note: '品牌',
        name: 'brands',
        type: 'array'
    }, {
        note: '标签',
        name: 'labels',
        type: 'array'
    }, {
        note: '相关资料',
        name: 'related_data',
        type: 'array',
        proArr: [{
            note: '名称',
            name: 'name',
            type: 'string'
        }, {
            note: '链接地址',
            name: 'url',
            type: 'string'
        }]
    }, {
        note: '步骤信息',
        name: 'steps',
        type: 'array',
        proArr: [{
            note: '是否为引用的SOP',
            name: 'from_sop',
            type: 'boolean'
        }, {
            note: 'sop_id-引用SOP专用',
            name: 'sop_id',
            type: 'string'
        }, {
            note: 'sop名称-引用SOP专用',
            name: 'sop_name',
            type: 'string'
        }, {
            note: 'sop版本-引用SOP专用',
            name: 'version',
            type: 'string'
        }, {
            note: 'sop中步骤数量-引用SOP专用',
            name: 'step_count',
            type: 'number'
        }, {
            note: 'sop状态-引用SOP专用',
            name: 'stauts_explain',
            type: 'string'
        }, {
            note: '最后更新时间-引用SOP专用',
            name: 'upadte_time',
            type: 'date',
            format: 'yyyy-MM-dd'
        }, {
            note: '步骤内容-非引用SOP专用',
            name: 'step_content',
            type: 'array',
            proArr: [{
                note: '是否为引用的SOP',
                name: 'from_sop',
                type: 'boolean'
            }, {
                note: '强制确认-非引用SOP专用',
                name: 'pre_conform',
                type: 'string'
            }, {
                note: '操作内容-非引用SOP专用',
                name: 'content',
                type: 'string'
            }, {
                note: '操作内容中涉及的对象-非引用SOP专用',
                name: 'content_objs',
                type: 'array',
                proArr: [{
                    note: '对象id',
                    name: 'obj_id',
                    type: 'string'
                }, {
                    note: '对象名称',
                    name: 'obj_name',
                    type: 'string'
                }, {
                    note: '对象类型',
                    name: 'obj_type',
                    type: 'string'
                }, {
                    note: '待修订标记',
                    name: 'is_revise',
                    type: 'boolean'
                }, {
                    note: '父级',
                    name: 'parents',
                    type: 'array',
                    proArr: [{
                        note: 'id列表',
                        name: 'parent_ids',
                        type: 'array'
                    }, {
                        note: '名称列表',
                        name: 'parent_names',
                        type: 'array'
                    }]
                }]
            }, {
                note: '注意事项-非引用SOP专用',
                name: 'notice',
                type: 'string'
            }, {
                note: '需确认的操作结果-非引用SOP专用',
                name: 'confirm_result',
                type: 'array',
                proArr: [{
                    note: '对象id',
                    name: 'obj_id',
                    type: 'string'
                }, {
                    note: '对象名称',
                    name: 'obj_name',
                    type: 'string'
                }, {
                    note: '对象类型',
                    name: 'obj_type',
                    type: 'string'
                }, {
                    note: '待修订标记',
                    name: 'is_revise',
                    type: 'boolean'
                }, {
                    note: '父级',
                    name: 'parents',
                    type: 'array',
                    proArr: [{
                        note: 'id列表',
                        name: 'parent_ids',
                        type: 'array'
                    }, {
                        note: '名称列表',
                        name: 'parent_names',
                        type: 'array'
                    }]
                }, {
                    note: '信息点',
                    name: 'info_points',
                    type: 'array',
                    proArr: [{
                        note: 'id',
                        name: 'id',
                        type: 'string'
                    }, {
                        note: '编码',
                        name: 'code',
                        type: 'string'
                    }, {
                        note: '名称',
                        name: 'name',
                        type: 'string'
                    }, {
                        note: '待修订标记',
                        name: 'is_revise',
                        type: 'boolean'
                    }]
                }, {
                    note: '自定义项，type：1-输入，2-单选，3-多选',
                    name: 'customs',
                    type: 'array',
                    proArr: [{
                        note: '名称',
                        name: 'name',
                        type: 'string'
                    }, {
                        note: '类型',
                        name: 'type',
                        type: 'string'
                    }, {
                        note: '选项列表',
                        name: 'items',
                        type: 'array'
                    }]
                }]
            }, {
                note: '专业code-非引用SOP专用',
                name: 'domain',
                type: 'string'
            }, {
                note: 'sop_id-引用SOP专用',
                name: 'sop_id',
                type: 'string'
            }, {
                note: 'sop名称-引用SOP专用',
                name: 'sop_name',
                type: 'string'
            }, {
                note: 'sop版本-引用SOP专用',
                name: 'version',
                type: 'string'
            }, {
                note: 'sop中步骤数量-引用SOP专用-step_content中只能有单步骤的sop',
                name: 'step_count',
                type: 'number'
            }, {
                note: 'sop状态-引用SOP专用',
                name: 'stauts_explain',
                type: 'string'
            }, {
                note: '最后更新时间-引用SOP专用',
                name: 'upadte_time',
                type: 'date',
                format: 'yyyy-MM-dd'
            }]
        }]
    }, {
        note: 'sop状态，0-草稿、1-已发布、2-已作废',
        name: 'sop_status',
        type: 'string'
    }, {
        note: '发布后状态，1-正常、2-待修订、3-修订中，草稿中的sop，该字段无值',
        name: 'publish_status',
        type: 'string'
    }, {
        note: '版本，发布后的sop该字段有值',
        name: 'version',
        type: 'string'
    }, {
        note: '版本数量，发布后的sop该字段有值',
        name: 'version_count',
        type: 'number'
    }, {
        note: '当前版本描述',
        name: 'version_explain',
        type: 'string'
    }, {
        note: '创建时间，yyyyMMddHHmmss',
        name: 'create_time',
        type: 'string'
    }, {
        note: '最后更新时间，yyyyMMddHHmmss',
        name: 'update_time',
        type: 'string'
    }],
    //根据id查询历史sop或者引用sop
    'restSopService/querySopDetailById': {
        note: '根据id查询历史sop或者引用sop',
        type: 'object',
        proArrBy: 'sopDetail'
    },


    "restFloorService/queryFloorWithOrder": {
        "note": "查询某建筑下楼层信息",
        "type": "array",
        "proArr": [{
            "note": "楼层id",
            "name": "floor_id",
            "mapName": "",
            "type": "string",
            "isToSpecial": false
        }, {
            "note": "楼层编码",
            "name": "floor_local_id",
            "mapName": "",
            "type": "string",
        }, {
            "note": "楼层本地名称",
            "name": "floor_local_name",
            "mapName": "",
            "type": "string",
        }, {
            "note": "楼层顺序码",
            "name": "floor_sequence_id",
            "mapName": "",
            "type": "string",
            "isToSpecial": false
        }, {
            "note": "楼层性质，1. 普通楼层 2. 中庭 3. 室外 4. 其他",
            "name": "floor_type",
            "mapName": "",
            "type": "string",
        }, {
            "note": "楼层面积",
            "name": "area",
            "mapName": "",
            "type": "string",
        },
            {
                "note": "楼层高",
                "name": "net_height",
                "mapName": "",
                "type": "string",
            }, {
                "note": "楼层功能",
                "name": "floor_func_type",
                "mapName": "",
                "type": "string",
            }, {
                "note": "是否选中",
                "name": "ischeck",
                "mapName": "",
                "type": "boolean",
            }
        ]
    },
    "restFloorService/queryFloorById": {
        "note": "根据id查询楼层详细信息",
        "type": "object",
        "proArr": [{
            "note": "楼层id",
            "name": "floor_id",
            "mapName": "",
            "type": "string",
            "isToSpecial": false
        }, {
            "note": "楼层编码",
            "name": "floor_local_id",
            "mapName": "",
            "type": "string",
            "isToSpecial": false
        }, {
            "note": "楼层本地名称",
            "name": "floor_local_name",
            "mapName": "",
            "type": "string",
            "isToSpecial": false
        }, {
            "note": "楼层顺序码",
            "name": "floor_sequence_id",
            "mapName": "",
            "type": "string",
            "isToSpecial": false,
        }, {
            "note": "BIM编码",
            "name": "BIMID",
            "mapName": "",
            "type": "string",
            "isToSpecial": false
        }, {
            "note": "楼层性质，1. 普通楼层 2. 中庭 3. 室外 4. 其他",
            "name": "floor_type",
            "mapName": "",
            "type": "string",
            "isToSpecial": false
        }, {
            "note": "楼层面积",
            "name": "area",
            "mapName": "",
            "type": "string",
            "isToSpecial": false
        },
            {
                "note": "楼层高",
                "name": "net_height",
                "mapName": "",
                "type": "string",
                "isToSpecial": false
            }, {
                "note": "楼层功能",
                "name": "floor_func_type",
                "mapName": "",
                "type": "string",
                "isToSpecial": false
            }, {
                "note": "楼层常驻人数",
                "name": "permanent_people_num",
                "mapName": "",
                "type": "string",
                "isToSpecial": false
            },
            {
                "note": "逐时流出人数",
                "name": "out_people_flow",
                "mapName": "",
                "type": "string",
                "isToSpecial": false
            }, {
                "note": "逐时流入人数",
                "name": "in_people_flow",
                "mapName": "",
                "type": "string",
                "isToSpecial": false
            }, {
                "note": "逐时楼层内现有人数",
                "name": "exsit_people_num",
                "mapName": "",
                "type": "string",
                "isToSpecial": false
            },
        ]
    },
    "restSpaceService/querySpaceWithGroup": {
        "note": "查询某建筑下空间信息",
        "type": "array",
        "proArr": [{
            "note": "楼层id",
            "name": "floor_id",
            "mapName": "",
            "type": "string",
            "isToSpecial": false
        }, {
            "note": "楼层本地名称",
            "name": "floor_local_name",
            "mapName": "",
            "type": "string",
            "isToSpecial": false
        }, {
            "note": "空间",
            "name": "spaces",
            "mapName": "",
            "type": "array",
            "proArr": [{
                "note": "空间id",
                "name": "space_id",
                "mapName": "",
                "type": "string",
                "isToSpecial": false
            }, {
                "note": "空间编码",
                "name": "room_local_id",
                "mapName": "",
                "type": "string",
            }, {
                "note": "空间本地名称",
                "name": "room_local_name",
                "mapName": "",
                "type": "string",
            }, {
                "note": "空间功能类型名称",
                "name": "room_func_type_name",
                "mapName": "",
                "type": "string",
            }, {
                "note": "工单",
                "name": "work_orders",
                "mapName": "",
                "type": "array",
                "proArr": [{
                    "note": "工单类型编码",
                    "name": "order_type",
                    "mapName": "",
                    "type": "string",
                }, {
                    "note": "该类型下的工单",
                    "name": "orders",
                    "mapName": "",
                    "type": "array",
                    "proArr": [{
                        "note": "工单id",
                        "name": "order_id",
                        "mapName": "",
                        "type": "string",
                    }, {
                        "note": "工单概述",
                        "name": "summary",
                        "mapName": "",
                        "type": "string",
                    }, {
                        "note": "工单状态名称",
                        "name": "order_state_name",
                        "mapName": "",
                        "type": "string",
                    }]
                }]
            }]
        }]
    },
    "restSpaceService/querySpaceForFloor": {
        "note": "查询某楼层下空间信息",
        "type": "array",
        "proArr": [{
            "note": "空间id",
            "name": "space_id",
            "mapName": "",
            "type": "string",
            "isToSpecial": false
        }, {
            "note": "空间编码",
            "name": "room_local_id",
            "mapName": "",
            "type": "string",
        }, {
            "note": "空间本地名称",
            "name": "room_local_name",
            "mapName": "",
            "type": "string",
        }, {
            "note": "空间功能类型名称",
            "name": "room_func_type_name",
            "mapName": "",
            "type": "string",
        }, {
            "note": "工单",
            "name": "work_orders",
            "mapName": "",
            "type": "array",
            "proArr": [{
                "note": "工单类型编码",
                "name": "order_type",
                "mapName": "",
                "type": "string",
            }, {
                "note": "该类型下的工单",
                "name": "orders",
                "mapName": "",
                "type": "array",
                "proArr": [{
                    "note": "工单id",
                    "name": "order_id",
                    "mapName": "",
                    "type": "string",
                }, {
                    "note": "工单概述",
                    "name": "summary",
                    "mapName": "",
                    "type": "string",
                }, {
                    "note": "工单状态名称",
                    "name": "order_state_name",
                    "mapName": "",
                    "type": "string",
                }]
            }]
        }]
    },
    "restSpaceService/queryDestroyedSpace": {
        "note": "查询某建筑下已拆除的空间信息",
        "type": "array",
        "proArr": [{
            "note": "楼层id",
            "name": "floor_id",
            "mapName": "",
            "type": "string",
            "isToSpecial": false
        }, {
            "note": "楼层本地名称",
            "name": "floor_local_name",
            "mapName": "",
            "type": "string",
            "isToSpecial": false
        }, {
            "note": "空间",
            "name": "spaces",
            "mapName": "",
            "type": "array",
            "proArr": [{
                "note": "空间id",
                "name": "space_id",
                "mapName": "",
                "type": "string",
                "isToSpecial": false
            }, {
                "note": "空间编码",
                "name": "room_local_id",
                "mapName": "",
                "type": "string",
            }, {
                "note": "空间本地名称",
                "name": "room_local_name",
                "mapName": "",
                "type": "string",
            }, {
                "note": "空间功能类型名称",
                "name": "room_func_type_name",
                "mapName": "",
                "type": "string",
            }]
        }]
    },
    "restSpaceService/querySpaceRemindConfig": {
        "note": "查询空间提醒设置",
        "type": "array",
        "proArr": [{
            "note": "code",
            "name": "code",
            "mapName": "",
            "type": "string",
            "isToSpecial": false
        }, {
            "note": "名称",
            "name": "name",
            "mapName": "",
            "type": "string",
        }, {
            "note": "是否提醒",
            "name": "is_remind",
            "mapName": "",
            "type": "boolean",
        }]
    },
    "restDictService/queryAllSpaceCode": {
        "note": "查询空间功能类型",
        "type": "array",
        "proArr": [{
            "note": "code",
            "name": "code",
            "mapName": "",
            "type": "string",
            "isToSpecial": false
        }, {
            "note": "名称",
            "name": "name",
            "mapName": "",
            "type": "string",
        }, {
            "note": "内容",
            "name": "content",
            "mapName": "",
            "type": "array",
            "proArr": [{
                "note": "code",
                "name": "code",
                "mapName": "",
                "type": "string",
                "isToSpecial": false
            }, {
                "note": "名称",
                "name": "name",
                "mapName": "",
                "type": "string",
            }, {
                "note": "内容",
                "name": "content",
                "mapName": "",
                "type": "array",
                "proArr": [{
                    "note": "code",
                    "name": "code",
                    "mapName": "",
                    "type": "string",
                    "isToSpecial": false
                }, {
                    "note": "名称",
                    "name": "name",
                    "mapName": "",
                    "type": "string",
                }]
            }],
        }]
    },
    "restDictService/queryAllRentalCode": {
        "note": "查询租赁业态类型",
        "type": "array",
        "proArr": [{
            "note": "code",
            "name": "code",
            "mapName": "",
            "type": "string",
            "isToSpecial": false
        }, {
            "note": "名称",
            "name": "name",
            "mapName": "",
            "type": "string",
        }, {
            "note": "内容",
            "name": "content",
            "mapName": "",
            "type": "array",
            "proArr": [{
                "note": "code",
                "name": "code",
                "mapName": "",
                "type": "string",
                "isToSpecial": false
            }, {
                "note": "名称",
                "name": "name",
                "mapName": "",
                "type": "string",
            }, {
                "note": "内容",
                "name": "content",
                "mapName": "",
                "type": "array",
                "proArr": [{
                    "note": "code",
                    "name": "code",
                    "mapName": "",
                    "type": "string",
                    "isToSpecial": false
                }, {
                    "note": "名称",
                    "name": "name",
                    "mapName": "",
                    "type": "string",
                }]
            }],
        }]
    },
    "restSpaceService/querySpaceById": {
        "note": "根据id查询空间详细信息",
        "type": "object",
        "proArr": [{
            "note": "空间id",
            "name": "space_id",
            "mapName": "",
            "type": "string",
            "isToSpecial": false
        }, {
            "note": "所属建筑id",
            "name": "build_id",
            "mapName": "",
            "type": "string",
            "isToSpecial": false
        }, {
            "note": "所属建筑名称",
            "name": "build_local_name",
            "mapName": "",
            "type": "string",
            "isToSpecial": false
        }, {
            "note": "所属楼层名称",
            "name": "floor_local_name",
            "mapName": "",
            "type": "string",
            "isToSpecial": false
        }, {
            "note": "空间本地编码",
            "name": "room_local_id",
            "mapName": "",
            "type": "string",
            "isToSpecial": false
        }, {
            "note": "空间名称",
            "name": "room_local_name",
            "mapName": "",
            "type": "string",
            "isToSpecial": false
        }, {
            "note": "BIM编码",
            "name": "BIMID",
            "mapName": "",
            "type": "string",
            "isToSpecial": false
        }, {
            "note": "空间功能区类型",
            "name": "room_func_type",
            "mapName": "",
            "type": "string",
            "isToSpecial": false
        }, {
            "note": "空间功能区类型名称",
            "name": "room_func_type_name",
            "mapName": "",
            "type": "string",
            "isToSpecial": false
        }, {
            "note": "长度",
            "name": "length",
            "mapName": "",
            "type": "string",
            "isToSpecial": false
        }, {
            "note": "宽",
            "name": "width",
            "mapName": "",
            "type": "string",
            "isToSpecial": false
        }, {
            "note": "高",
            "name": "height",
            "mapName": "",
            "type": "string",
            "isToSpecial": false
        }, {
            "note": "面积",
            "name": "area",
            "mapName": "",
            "type": "string",
            "isToSpecial": false
        }, {
            "note": "配电容量",
            "name": "elec_cap",
            "mapName": "",
            "type": "string",
            "isToSpecial": false
        }, {
            "note": "备注文字",
            "name": "intro",
            "mapName": "",
            "type": "string",
            "isToSpecial": false
        }, {
            "note": "租赁业态类型",
            "name": "tenant_type",
            "mapName": "",
            "type": "string",
            "isToSpecial": false
        }, {
            "note": "租赁业态类型名称",
            "name": "tenant_type_name",
            "mapName": "",
            "type": "string",
            "isToSpecial": false
        }, {
            "note": "所属租户",
            "name": "tenant",
            "mapName": "",
            "type": "string",
            "isToSpecial": false
        }, {
            "note": "空间内常驻人数",
            "name": "permanent_people_num",
            "mapName": "",
            "type": "string",
            "isToSpecial": false
        }, {
            "note": "逐时流出人数",
            "name": "out_people_flow",
            "mapName": "",
            "type": "string",
            "isToSpecial": false
        }, {
            "note": "逐时流入人数",
            "name": "in_people_flow",
            "mapName": "",
            "type": "string",
            "isToSpecial": false
        }, {
            "note": "逐时空间内现有人数",
            "name": "exsit_people_num",
            "mapName": "",
            "type": "string",
            "isToSpecial": false
        }, {
            "note": "用电功率",
            "name": "elec_power",
            "mapName": "",
            "type": "string",
            "isToSpecial": false
        }, {
            "note": "逐时冷量",
            "name": "cool_consum",
            "mapName": "",
            "type": "string",
            "isToSpecial": false
        }, {
            "note": "逐时热量",
            "name": "heat_consum",
            "mapName": "",
            "type": "string",
            "isToSpecial": false
        }, {
            "note": "空调水压力",
            "name": "ac_water_press",
            "mapName": "",
            "type": "string",
            "isToSpecial": false
        }, {
            "note": "用水量",
            "name": "water_consum",
            "mapName": "",
            "type": "string",
            "isToSpecial": false
        }, {
            "note": "自来水压力",
            "name": "water_press",
            "mapName": "",
            "type": "string",
            "isToSpecial": false
        }, {
            "note": "热水用水量",
            "name": "hot_water_consum",
            "mapName": "",
            "type": "string",
            "isToSpecial": false
        }, {
            "note": "热水压力",
            "name": "hot_water_press",
            "mapName": "",
            "type": "string",
            "isToSpecial": false
        }, {
            "note": "用燃气量",
            "name": "gas_consum",
            "mapName": "",
            "type": "string",
            "isToSpecial": false
        }, {
            "note": "燃气压力",
            "name": "gas_press",
            "mapName": "",
            "type": "string",
            "isToSpecial": false
        }, {
            "note": "热舒适PMV",
            "name": "PMV",
            "mapName": "",
            "type": "string",
            "isToSpecial": false
        }, {
            "note": "热舒适PPD",
            "name": "PPD",
            "mapName": "",
            "type": "string",
            "isToSpecial": false
        }]
    },
    "restFloorService/queryFloorInfoPointHis": {
        "note": "查询楼层信息点的历史信息",
        "type": "array",
        "proArr": [{
            "note": "时间",
            "name": "date",
            "mapName": "",
            "type": "string",
            "isToSpecial": false
        }, {
            "note": "值",
            "name": "value",
            "mapName": "",
            "type": "string",
            "isToSpecial": false
        }]
    },
    "restSpaceService/querySpaceInfoPointHis": {
        "note": "查询空间信息点的历史信息",
        "type": "array",
        "proArr": [{
            "note": "时间",
            "name": "date",
            "mapName": "",
            "type": "string",
            "isToSpecial": false
        }, {
            "note": "值",
            "name": "value",
            "mapName": "",
            "type": "string",
            "isToSpecial": false
        }]
    },
    'merchantInfo': [{
        "note": "商家ID",
        "name": "company_id",
        "type": "string"
    }, {
        "note": "商家名称",
        "name": "company_name",
        "type": "string"
    }, {
        "note": "联系人",
        "name": "contacts",
        "type": "string"
    }, {
        "note": "联系电话",
        "name": "phone",
        "type": "string"
    }, {
        "note": "网址",
        "name": "web",
        "type": "string"
    }, {
        "note": "传真",
        "name": "fax",
        "type": "string"
    }, {
        "note": "电子邮件",
        "name": "email",
        "type": "string"
    }, {
        "note": "是否可以删除",
        "name": "can_delete",
        "type": "boolean"
    }, {
        "note": "设备品牌数组，生产厂家专用",
        "name": "brands",
        "type": "array"
    }, {
        "note": "保险单信息，保险公司专用",
        "name": "insurer_info",
        "type": "array",
        "proArr": [{
            "note": "保险单号",
            "name": "insurer_num",
            "type": "string"
        }, {
            "note": "保险文件",
            "name": "insurance_file",
            "type": "object",
            "proArr": [{
                "note": "保险文件名称",
                "name": "name",
                "type": "string"
            }, {
                "note": "保险文件标识",
                "name": "url",
                "type": "fileLink",
                "fileType": 2
            }]
        }]
    }],
    'restEquipCompanyService/queryEquipCompanyList': {
        "note": "商家列表",
        "type": "array",
        "proArrBy": 'merchantInfo'
    },
    'restEquipCompanyService/queryEquipCompanyById': {
        "note": "某一个商家信息",
        "type": "object",
        "proArrBy": 'merchantInfo'
    },
    'restCardService/queryEquipList': {
        "type": "array",
        "note": "设备名片页-已下载的设备列表",
        "proArrBy": 'equipList'
    },
    'restCardService/queryNotDownloadEquipList': {
        "type": "array",
        "note": "设备名片页-未下载的设备列表",
        "proArrBy": 'equipList'
    },
    'restCardService/queryCardInfo': {
        "note": "设备名片页-上一次设置的设备名片或空间名片",
        "type": "object",
        "proArr": [{
            "note": "项目id",
            "name": "project_id",
            "type": "string"
        }, {
            "note": "对象类型，space、equip",
            "name": "obj_type",
            "type": "string"
        }, {
            "note": "标题和logo",
            "name": "card_title",
            "type": "object",
            "proArr": [{
                "note": "标题",
                "name": "title",
                "type": "string"
            }, {
                "note": "logo的key",
                "name": "logo",
                "type": "fileLink"
            }]
        }, {
            "note": "名片信息项",
            "name": "card_info",
            "type": "array",
            "proArr": [{
                "note": "信息项编码",
                "name": "info_point_code",
                "type": "string"
            }, {
                "note": "信息项名称",
                "name": "info_point_name",
                "type": "string"
            }]
        }]
    },
    'restCardService/queryEquipOptions': {
        "note": "设备名片页-设备选择项",
        "type": "array",
        "proArr": [{
            "note": "信息点编码",
            "name": "info_point_code",
            "type": "string"
        }, {
            "note": "信息点名称",
            "name": "info_point_name",
            "type": "string"
        }]
    },
    'restCardService/querySpaceOptions': {
        "note": "设备名片页-空间选择项",
        "type": "array",
        "proArr": [{
            "note": "信息点编码",
            "name": "info_point_code",
            "type": "string"
        }, {
            "note": "信息点名称",
            "name": "info_point_name",
            "type": "string"
        }]
    },
    'spaceInfo': [{
        "note": "空间id",
        "name": "space_id",
        "type": "string"
    }, {
        "note": "空间本地名称",
        "name": "room_local_name",
        "type": "string"
    }, {
        "note": "空间功能类型名称",
        "name": "room_func_type_name",
        "type": "string"
    }, {
        "note": "备注",
        "name": "intro",
        "type": "string"
    }, {
        "note": "是否下载的标记 0 未下载   1 已下载",
        "name": "download_flag",
        "type": "string"
    }, {
        "note": "创建时间",
        "name": "create_time",
        "type": "date",
        "format": "y.M.d h:m"
    }],
    'restCardService/querySpaceList': {
        "type": "array",
        "note": "设备名片页-已下载的空间列表",
        "proArrBy": 'spaceInfo'
    },
    'restCardService/queryNotDownloadSpaceList': {
        "type": "array",
        "note": "设备名片页-未下载的空间列表",
        "proArrBy": 'spaceInfo'
    },
    'restFloorService/queryFloorList': {
        "type": "array",
        "note": "设备名片页-获取某建筑下的楼层",
        "proArr": [{
            "note": "楼层ID",
            "name": "floor_id",
            "type": "string"
        }, {
            "note": "楼层名称",
            "name": "floor_local_name",
            "type": "string"
        }]
    },
    "restMyWorkOrderService/saveDraftWorkOrder": {
        "type": "object",
        "note": "我的工单-新增页:保存工单草稿",
        "proArr": [{
            "note": "工单id",
            "name": "order_id",
            "type": "string"
        }]
    },
    "restObjectService/searchObject": {
        note: '搜索物理世界对象',
        type: 'array',
        proArr: [{
            note: '对象id',
            name: 'obj_id',
            type: 'string'
        }, {
            note: '对象名称',
            name: 'obj_name',
            type: 'string'
        }, {
            note: '对象类型',
            name: 'obj_type',
            type: 'string'
        }, {
            note: '父级',
            name: 'parents',
            type: 'array',
            proArr: [{
                note: '父级id列表',
                name: 'parent_ids',
                type: 'array'
            }, {
                note: '父级名称列表',
                name: 'parent_names',
                type: 'array'
            }]
        }]
    },
};
module.exports = dataModelMap;