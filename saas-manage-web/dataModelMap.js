var dataModelMap = {
    'restCustomerService/resetCustomerPasswd': {
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
    'restCustomerService/saveConfirmCustomer': {
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
    'restCustomerService/unlockCustomerById': {
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
    'restCustomerService/lockCustomerById': {
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
    'restCustomerService/addConfirmBuild': {
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
    "restCustomerService/updateConfirmBuild": {
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
    "restTemplateService/updateInfoPointCmptById": {
        "type": "object",
        "note": "未输入note",
        "proArr": [{
                "name": "user_id",
                "type": "string",
                "note": "user_id"
            },
            {
                "name": "info_cmpt_id",
                "type": "string",
                "note": "info_cmpt_id"
            },
            {
                "name": "god_hand_note",
                "type": "string",
                "note": "god_hand_note"
            },
            {
                "name": "saas_note",
                "type": "string",
                "note": "saas_note"
            },
            {
                "name": "saas_show_flag",
                "type": "string",
                "note": "saas_show_flag"
            },
            {
                "name": "app_note",
                "type": "string",
                "note": "app_note"
            },
            {
                "name": "app_show_flag",
                "type": "string",
                "note": "app_show_flag"
            }
        ]
    },
    "restDictService/queryAllRegionCode": {
        note: '查询所有行政区编码',
        type: 'array',
        proArr: [{
                note: '省级编码',
                name: 'code',
                type: 'string'
            }, {
                note: '省级名称',
                name: 'name',
                type: 'string'
            }, {
                note: '类型',
                name: 'type',
                type: 'number'
            },
            {
                note: '',
                name: 'cities',
                type: 'array',
                proArr: [{
                    note: '市级编码',
                    name: 'code',
                    type: 'string'
                }, {
                    note: '市级名称',
                    name: 'name',
                    type: 'string'
                }, {
                    note: '经度',
                    name: 'longitude',
                    type: 'string'
                }, {
                    note: '维度',
                    name: 'latitude',
                    type: 'string'
                }, {
                    note: '海拔，单位m',
                    name: 'altitude',
                    type: 'string'
                }, {
                    note: '气候区编码',
                    name: 'climate',
                    type: 'string'
                }, {
                    note: '发展水平编码',
                    name: 'developLevel',
                    type: 'string'
                }, {
                    note: '',
                    name: 'districts',
                    type: 'array',
                    proArr: [{
                            note: '市级编码',
                            name: 'code',
                            type: 'string'
                        },
                        {
                            note: '市级名称',
                            name: 'name',
                            type: 'string'
                        },
                        {
                            note: '经度',
                            name: 'longitude',
                            type: 'string'
                        },
                        {
                            note: '维度',
                            name: 'latitude',
                            type: 'string'
                        },
                        {
                            note: '海拔，单位m',
                            name: 'altitude',
                            type: 'string'
                        }
                    ]
                }, {
                    note: '市级编码',
                    name: 'code',
                    type: 'string'
                }, {
                    note: '市级名称',
                    name: 'name',
                    type: 'string'
                }]
            }
        ]
    },
    "restDictService/queryAllClimateAreaCode": {
        "type": "array",
        "note": "查询所有气候区代码",
        "proArr": [{
            "name": "code",
            "type": "string",
            "note": "code"
        }, {
            "name": "name",
            "type": "string",
            "note": "name"
        }, {
            "name": "content",
            "type": "array",
            "note": "content",
            "proArr": [{
                "name": "code",
                "type": "string",
                "note": "code"
            }, {
                "name": "name",
                "type": "string",
                "note": "name"
            }, {
                "name": "info",
                "type": "string",
                "note": "info"
            }]
        }]
    },
    "restDictService/queryAllDevelopLevelCode": {
        "type": "array",
        "note": "数据字典:查询所有发展水平代码",
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
            }
        ]
    },
    "restDictService/queryAllDevelopLevelCode": {
        "type": "array",
        "note": "数据字典:查询所有建筑功能",
        "proArr": [{
            "name": "code",
            "type": "string",
            "note": "code"
        }, {
            "name": "name",
            "type": "string",
            "note": "name"
        }, {
            "name": "content",
            "type": "array",
            "note": "content",
            "proArr": [{
                "name": "code",
                "type": "string",
                "note": "code"
            }, {
                "name": "name",
                "type": "string",
                "note": "name"
            }, {
                "name": "content",
                "type": "array",
                "note": "content",
                "proArr": [{
                    "name": "code",
                    "type": "string",
                    "note": "code"
                }, {
                    "name": "name",
                    "type": "string",
                    "note": "name"
                }]
            }]
        }]
    },
    "restCustomerService/updateCustomerById": {
        "type": "object",
        "note": "未输入note",
        "proArr": [{
                "name": "user_id",
                "type": "string",
                "note": "user_id"
            },
            {
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
                "type": "fileLink",
                "note": "business_license",
                "fileType": "1"
            },
            {
                "name": "pictures",
                "type": "fileArray",
                "note": "pictures",
                "proArr": [],
                "fileType": "1"
            },
            {
                "name": "tool_type",
                "type": "string",
                "note": "tool_type"
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
                "name": "note",
                "type": "string",
                "note": "note"
            }
        ]
    },
    "restCustomerService/saveDraftCustomer": {
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
                "type": "fileLink",
                "note": "business_license",
                "fileType": "1"
            },
            {
                "name": "pictures",
                "type": "fileArray",
                "note": "pictures",
                "proArr": [],
                "fileType": "1"
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
                "name": "note",
                "type": "string",
                "note": "note"
            },
            {
                "name": "create_time",
                "type": "string",
                "note": "create_time"
            },
            {
                "name": "build_list",
                "type": "array",
                "note": "build_list",
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
                    },
                    {
                        "name": "create_time",
                        "type": "string",
                        "note": "create_time"
                    }
                ]
            }
        ]
    },
    "restTemplateService/queryObjectCategoryTree": {
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
                        "name": "name",
                        "type": "string",
                        "note": "name"
                    },
                    {
                        "name": "code",
                        "type": "string",
                        "note": "code"
                    },
                    {
                        "name": "type",
                        "type": "string",
                        "note": "type"
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
                                "name": "type",
                                "type": "string",
                                "note": "type"
                            }
                        ]
                    }
                ]
            }
        ]
    },
    "restComponentService/queryAllComponentRel": {
        "type": "array",
        "note": "未输入note",
        "proArr": [{
                "name": "cmpt_relation_id",
                "type": "string",
                "note": "cmpt_relation_id"
            },
            {
                "name": "base_cmpt_code",
                "type": "string",
                "note": "base_cmpt_code"
            },
            {
                "name": "god_hand_cmpt_code",
                "type": "string",
                "note": "god_hand_cmpt_code"
            },
            {
                "name": "saas_cmpt_code",
                "type": "string",
                "note": "saas_cmpt_code"
            },
            {
                "name": "app_cmpt_code",
                "type": "string",
                "note": "app_cmpt_code"
            }
        ]
    },
    "restComponentService/updateComponentRelById": {
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
    "restComponentService/addComponent": {
        "type": "object",
        "note": "未输入note",
        "proArr": [{
                "name": "Result",
                "type": "string",
                "note": "Result"
            },
            {
                "name": "Count",
                "type": "number",
                "note": "Count"
            },
            {
                "name": "Content",
                "type": "array",
                "note": "Content",
                "proArr": []
            }
        ]
    },
    "restComponentService/queryComponentGroupByType": {
        "type": "object",
        "note": "未输入note",
        "proArr": [{
                "name": "base",
                "type": "array",
                "note": "base",
                "proArr": [{
                        "name": "cmpt_code",
                        "type": "string",
                        "note": "cmpt_code"
                    },
                    {
                        "name": "cmpt_name",
                        "type": "string",
                        "note": "cmpt_name"
                    }
                ]
            },
            {
                "name": "godHand",
                "type": "array",
                "note": "godHand",
                "proArr": [{
                        "name": "cmpt_code",
                        "type": "string",
                        "note": "cmpt_code"
                    },
                    {
                        "name": "cmpt_name",
                        "type": "string",
                        "note": "cmpt_name"
                    }
                ]
            },
            {
                "name": "saas",
                "type": "array",
                "note": "saas",
                "proArr": [{
                        "name": "cmpt_code",
                        "type": "string",
                        "note": "cmpt_code"
                    },
                    {
                        "name": "cmpt_name",
                        "type": "string",
                        "note": "cmpt_name"
                    }
                ]
            },
            {
                "name": "app",
                "type": "array",
                "note": "app",
                "proArr": [{
                        "name": "cmpt_code",
                        "type": "string",
                        "note": "cmpt_code"
                    },
                    {
                        "name": "cmpt_name",
                        "type": "string",
                        "note": "cmpt_name"
                    }
                ]
            }
        ]
    },
    "restComponentService/queryAllComponent": {
        "type": "array",
        "note": "未输入note",
        "proArr": [{
                "name": "cmpt_id",
                "type": "string",
                "note": "cmpt_id"
            },
            {
                "name": "cmpt_type",
                "type": "string",
                "note": "cmpt_type"
            },
            {
                "name": "cmpt_code",
                "type": "string",
                "note": "cmpt_code"
            },
            {
                "name": "cmpt_name",
                "type": "string",
                "note": "cmpt_name"
            },
            {
                "name": "description",
                "type": "string",
                "note": "description"
            }
        ]
    },
    "restTemplateService/queryObjectTemplate": {
        "type": "array",
        "note": "未输入note",
        "proArr": [{
                "name": "info_cmpt_id",
                "type": "string",
                "note": "info_cmpt_id"
            },
            {
                "name": "info_point_code",
                "type": "string",
                "note": "info_point_code"
            },
            {
                "name": "base_cmpt_code",
                "type": "string",
                "note": "base_cmpt_code"
            },
            {
                "name": "god_hand_cmpt_code",
                "type": "string",
                "note": "god_hand_cmpt_code"
            },
            {
                "name": "god_hand_note",
                "type": "string",
                "note": "god_hand_note"
            },
            {
                "name": "saas_cmpt_code",
                "type": "string",
                "note": "saas_cmpt_code"
            },
            {
                "name": "saas_note",
                "type": "string",
                "note": "saas_note"
            },
            {
                "name": "saas_show_flag",
                "type": "string",
                "note": "saas_show_flag"
            },
            {
                "name": "app_cmpt_code",
                "type": "string",
                "note": "app_cmpt_code"
            },
            {
                "name": "app_note",
                "type": "string",
                "note": "app_note"
            },
            {
                "name": "app_show_flag",
                "type": "string",
                "note": "app_show_flag"
            }
        ]
    },
    "restDictService/queryAllBuildingType": {
        "type": "array",
        "note": "未输入note",
        "proArr": [{
            "name": "code",
            "type": "string",
            "note": "code"
        }, {
            "name": "name",
            "type": "string",
            "note": "name"
        }, {
            "name": "content",
            "type": "array",
            "note": "content",
            "proArr": [{
                "name": "code",
                "type": "string",
                "note": "code"
            }, {
                "name": "name",
                "type": "string",
                "note": "name"
            }, {
                "name": "content",
                "type": "array",
                "note": "content",
                "proArr": [{
                    "name": "code",
                    "type": "string",
                    "note": "code"
                }, {
                    "name": "name",
                    "type": "string",
                    "note": "name"
                }]
            }]
        }]
    },
    "restCustomerService/queryAllCustomer": {
        "type": "array",
        "note": "客户信息管理-列表页:查询所有客户信息",
        "proArr": [{
            "name": "customer_id",
            "type": "string",
            "note": "customer_id"
        }, {
            "name": "project_name",
            "type": "string",
            "note": "project_name"
        }, {
            "name": "project_local_name",
            "type": "string",
            "note": "project_local_name"
        }, {
            "name": "company_name",
            "type": "string",
            "note": "company_name"
        }, {
            "name": "build_count",
            "type": "number",
            "note": "build_count"
        }, {
            "name": "contact_person",
            "type": "string",
            "note": "contact_person"
        }, {
            "name": "contact_phone",
            "type": "string",
            "note": "contact_phone"
        }, {
            "name": "customer_status",
            "type": "string",
            "note": "customer_status"
        }]
    },
    "restCustomerService/queryCustomerById": {
        "type": "object",
        "note": "客户信息管理-详细页:根据Id查询客户详细信息",
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
                "type": "fileLink",
                "note": "business_license",
                "fileType": "1"
            },
            {
                "name": "pictures",
                "type": "fileArray",
                "note": "pictures",
                "proArr": [],
                "fileType": "1"
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
                "name": "note",
                "type": "string",
                "note": "note"
            },
            {
                "name": "create_time",
                "type": "string",
                "note": "create_time"
            },
            {
                "name": "build_list",
                "type": "array",
                "note": "build_list",
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
                    },
                    {
                        "name": "create_time",
                        "type": "string",
                        "note": "create_time"
                    }
                ]
            }
        ]
    },




    'restFuncPackService/queryAllFuncPack': {
        note: '权限项管理-查询所有权限项信息',
        type: 'array',
        proArr: [{
            note: '权限项id',
            name: 'func_pack_id',
            mapName: '',
            type: 'string'
        }, {
            note: '权限项名称',
            name: 'func_pack_name',
            mapName: '',
            type: 'string'
        }, {
            note: '描述',
            name: 'description',
            mapName: '',
            type: 'string'
        }]
    },
    'restFuncPackService/queryFuncPackById': {
        note: '根据id查询权限项详细信息',
        type: 'object',
        proArr: [{
            note: '权限项id',
            name: 'func_pack_id',
            mapName: '',
            type: 'string'
        }, {
            note: '权限项名称',
            name: 'func_pack_name',
            mapName: '',
            type: 'string'
        }, {
            note: '描述',
            name: 'description',
            mapName: '',
            type: 'string'
        }, {
            note: '功能点id的集合',
            name: 'func_packs',
            mapName: '',
            type: 'array'
        }, {
            note: '创建时间',
            name: 'create_time',
            mapName: '',
            type: 'string'
        }]
    },
    'restFuncPackService/queryFuncPointTree': {
        note: '查询所有的功能点树',
        type: 'tree',
        mapParentId: 'parent_id',
        mapParentIdTo: 'func_id',
        proArr: [{
            note: '功能点id',
            name: 'func_id',
            mapName: '',
            type: 'string'
        }, {
            note: '功能点名称',
            name: 'func_name',
            mapName: '',
            type: 'string'
        }, {
            note: '功能点类型',
            name: 'func_type',
            mapName: '',
            type: 'string'
        }, {
            note: '父亲点id',
            name: 'parent_id',
            mapName: '',
            type: 'string'
        }, {
            note: '是否选择',
            name: 'isSel',
            mapName: '',
            type: 'boolean'
        }, {
            note: '是否添加',
            name: 'isAdd',
            mapName: '',
            type: 'boolean'
        }]
    },


    'restOperateModuleService/queryAllOperateModule': {
        note: '操作模块管理-查询所有操作模块信息',
        type: 'array',
        proArr: [{
            note: '模块id',
            name: 'module_id',
            mapName: '',
            type: 'string'
        }, {
            note: '模块编码',
            name: 'module_code',
            mapName: '',
            type: 'string'
        }, {
            note: '模块名称',
            name: 'module_name',
            mapName: '',
            type: 'string'
        }, {
            note: '释义',
            name: 'description',
            mapName: '',
            type: 'string'
        }, {
            note: '专属客户 项目本地名称 字符串还是数组',
            name: 'project_local_names',
            mapName: '',
            type: 'string'
        }, ]
    },
    'restCustomerService/queryCustomerForNormal': {
        note: '操作模块管理-查询正常状态的客户信息',
        type: 'array',
        proArr: [{
            note: '项目id',
            name: 'project_id',
            mapName: '',
            type: 'string',
            isToSpecial: false
        }, {
            note: '项目本地名称',
            name: 'project_local_name',
            mapName: '',
            type: 'string'
        }, {
            note: '选中',
            name: 'isSel',
            mapName: '',
            type: 'boolean'
        }]
    },
    'restOperateModuleService/queryOperateModuleById': {
        note: '操作模块管理-根据Id查询模块详细信息',
        type: 'array',
        proArr: [{
            note: '模块id',
            name: 'module_id',
            mapName: '',
            type: 'string'
        }, {
            note: '模块编码',
            name: 'module_code',
            mapName: '',
            type: 'string'
        }, {
            note: '模块名称',
            name: 'module_name',
            mapName: '',
            type: 'string'
        }, {
            note: '释义',
            name: 'description',
            mapName: '',
            type: 'string'
        }, {
            note: '专属项目id',
            name: 'project_ids',
            mapName: '',
            type: 'array'
        }, {
            note: '项目本地名称',
            name: 'project_local_names',
            mapName: '',
            type: 'array'
        }, {
            note: '创建时间，yyyy-MM-dd HH:mm:ss',
            name: 'create_time',
            mapName: '',
            type: 'string'
        }]
    },


};




module.exports = dataModelMap;