# 说明：
## 测试方式
使用chrome的postman插件模拟发送post方法。

## 数据返回格式
列表查询成功返回格式：

    {
      "Result": "success",
      "Content": [{...},{...}],
      "Count": 2
    }

单条记录查询成功返回格式：

    {
      "Result": "success",
      "Item": {...}
    }

失败返回例子：

    {
      "Result": "failure",
      "ResultMsg": ""
    }

#通用功能接口服务
## 用户登录
### 企业用户登录
>http://localhost:8080/saas/restUserService/companyLogin

post请求

参数例子：

    {
        "user_name":"***",     //公司账户登录,必须
        "user_psw":"***",      //密码,必须
        "user_ip":"***",       //用户ip
        "browser":"***",       //浏览器
        "terminal":"***",      //终端
        "system":"***"         //操作系统
    } 

成功返回例子：

    {
      "Result": "success",
      "Item":{
            "customer_id":"***",            //客户信息id
            "company_name":"***",           //公司名称
            "project_id":"***",             //项目id
            "project_local_name":"***",     //项目本地名称
            "system_code":"saas",           //系统编码，用于图片服务，
            "image_secret":"***",           //秘钥，用于图片服务，
            "tool_type":"Web",              //工具类型,Web，Revit
            "last_project_id":"***"         //上一次所在项目，
        }
      "ResultMsg": "登录成功！"
    }

失败返回例子：

    {
      "Result": "failure",
      "ResultMsg": ""
    }

前台：接口调用注意事项：

	1、last_project_id为用户最后一次所操作的项目，用于用户默认项目；
	2、当tool_type的值为Revit时，用户对楼层、空间、系统、设备不在具有创建和编辑权限，只能查看；
	    
后台：接口实现注意事项：

	1、数据来源表：customer
	2、user_name对应的是表中的account，密码是MD5加密存储的，所以验证密码时，要先将密码MD5加密;
	3、记录用户登录日志，logout_time默认值 -1；
	4、tool_type的值根据项目id到客户信息中去查询；
	
### 个人登录：发送验证码
>http://localhost:8080/saas/restUserService/smsSendCode

post请求

    {
        "phone_num":"***"    //手机号，必须，
    } 

成功返回例子

    {
      "Result": "success",
      "ResultMsg": "操作成功！"
    }

### 个人登录
>http://localhost:8080/saas/restUserService/personLogin

post请求

参数例子：

    {
        "user_name":"***",     //手机号,必须
        "user_psw":"***",      //验证码,必须
        "user_ip":"***",       //用户ip
        "browser":"***",       //浏览器
        "terminal":"***",      //终端
        "system":"***"         //操作系统
    } 

成功返回例子：

    {
      "Result": "success",
      "Item":{
          "person_id":"***",                //员工id
          "name":"***",                     //姓名 
          "id_number":"***",                //身份证号码
          "phone_num":"***",                //手机号 
          "gender":"***",                   //性别，male-男、female-女
          "birthday":"yyyy-MM-dd",          //出生年月
          "system_code":"saas",             //系统编码，用于图片服务，
          "image_secret":"***",             //秘钥，用于图片服务，
          "create_time":"20170620093000",   //创建时间，yyyyMMddHHmmss
          "last_project_id":"***",          //上一次所在项目，
          "project_persons":[
             {
                "project_id":"***",             //项目id 
                "project_local_name":"***",     //项目本地名称
                "person_num":"***",             //员工编号
                "position":"***",               //岗位
                "custom_tag":["***","***"],     //自定义标签
                "specialty":["***","***"],      //专业编码
                "id_photo":key,                 //证件照片
                "head_portrait":"key",          //系统头像
                "person_status":"1",            //人员状态, 1-在职，0-离职
                "roles":{role_id:role_name,role_id:role_name},  //角色
                "func_packs":["1001","1002"],   //菜单、功能权限组，编码
                "tool_type":"Web",              //工具类型,Web，Revit
                "rights":{"wo_create":true}     //特殊权限，wo_create -创建工单
                "create_time":"20170620093000"  //创建时间，yyyyMMddHHmmss
             },
             {
                "project_id":"***",             //项目id 
                "project_local_name":"***",     //项目本地名称
                "person_num":"***",             //员工编号
                "position":"***",               //岗位
                "custom_tag":["***","***"],     //自定义标签
                "specialty":["***","***"],      //专业编码
                "id_photo":key,                 //证件照片
                "head_portrait":"key",          //系统头像
                "person_status":"1",            //人员状态, 1-在职，0-离职
                "roles":{role_id:role_name,role_id:role_name},  //角色
                "func_packs":["***","***"],      //菜单、功能权限组，编码
                "tool_type":"Web",              //工具类型,Web，Revit
                "rights":{"wo_create":false}       //特殊权限，wo_create -创建工单
                "create_time":"20170620093000"  //创建时间，yyyyMMddHHmmss
             }
          ]
        },
        "ResultMsg": "登录成功！"
    } 

失败返回例子：

    {
      "Result": "failure",
      "ResultMsg": "用户名或者密码错误！"
    }
前台：接口调用注意事项：

	1、last_project_id为用户最后一次所操作的项目，用于用户默认项目；
	2、当tool_type的值为Revit时，用户对楼层、空间、系统、设备不在具有创建和编辑权限，只能查看；
	3、在权限rights中"wo_create":true时，用户在该项目下有创建工单权限；
	4、func_packs中的权限码是用户可操作的功能菜单，控制菜单显隐，对应关系如下：
	   1001-人员管理、1002-设备管理、1003-空间管理、1004-设备通讯录、1005-打印设备空间名片
	   1006-我的工单、1007-工单监控、1008-工单配置、1009-计划监控、1010-排班管理、1011-知识库管理

后台：接口实现注意事项：

	1、修改原接口实现，人员信息从人员信息服务中查询，保持返回数据格式不变；	
	2、只查询在职员工，离职员工不许登录；
	3、last_project_id数据来源用户习惯表：user_custom
	4、根据角色id，查询人员在该项目下所具有的的权限；
	5、记录用户登录日志，logout_time默认值 -1；
	6、tool_type的值根据项目id到客户信息中去查询；
	7、rights中wo_create的权限需要查询所属项目下的工单方案，如果当前的人的id或者岗位有创建工单的控制模块，则返回true,否则返回false；；

### 个人登录-根据Id编辑人员信息
>http://localhost:8080/saas/restUserService/updatePersonById

post请求

参数例子：

    {
      "user_id":"***",                  //员工id-当前操作人id，必须
      "person_id":"***",                //员工id ,必须
      "project_id":"***",               //项目id
      "name":"***",                     //姓名 
      "id_number":"***",                //身份证号码
      "phone_num":"***",                //手机号 
      "gender":"***",                   //性别，male-男、female-女
      "birthday":"yyyy-MM-dd",          //出生年月
      "head_portrait":"key"             //系统头像
    }         

成功返回例子：

    {
      "Result": "success",
      "ResultMsg": "",
    }

失败返回例子：

    {
      "Result": "failure",
      "ResultMsg": ""
    } 

前台：接口调用注意事项：

	1、user_id为员工id-当前操作人id，用于记录操作日志，后面的所有方法都会带这个参数；
	2、修改"系统头像"时，项目id为必须参数；

后台：接口实现注意事项：

	1、调整原来接口，员工信息统一来源于人员服务person-service；
	2、废弃掉restPersonService中无用的方法；
	
### 用户退出登录
>http://localhost:8080/saas/restUserService/logout

post请求

参数例子：

    {
      "user_id":"***",                    //员工id-当前操作人id，必须
    } 

成功返回例子：

    {
      "Result": "success",
      "ResultMsg": "登录成功！"
    }

失败返回例子：

    {
      "Result": "failure",
      "ResultMsg": ""
    }
    
后台：接口实现注意事项：

	1、用户登录日志，修改当前用户最新一条登录记录的退出时间，即logout_time值为"-1"的最新的一条记录；
	
		
### 切换项目-记录用户最后一次所在的项目
>http://localhost:8080/saas/restUserService/savePersonUseProject

post请求

参数例子：

    {
      "user_id":"***",                    //员工id-当前操作人id，必须
      "project_id":"***"                  //项目id，必须
    } 

成功返回例子：

    {
      "Result": "success",
      "ResultMsg": "",
    }

失败返回例子：

    {
      "Result": "failure",
      "ResultMsg": ""
    }
    
前台：接口调用注意事项：

	1、用户每次切换项目时都要调用此方法，存储用户最后一次所在项目；

后台：接口实现注意事项：

	1、数据保存到表：user_custom；	
	2、先判断表中是否存在该用户的记录，没有就添加，有就修改；
	
## 通用数据字典查询
### 数据字典:查询工单流转的控制模块
>http://localhost:8080/saas/restGeneralDictService/queryGeneralDictByKey

post请求

参数例子：

    {
      "user_id":"***",                    //员工id-当前操作人id，必须
      "project_id":"***",                 //项目id，必须
      "dict_type": "wo_control_module"    //工单控制模块，必须
    } 

返回例子：

    {
      "Result": "success",
      "Content": [
         {"code":"create"," name":"新建工单", "description": "释义***"},
         {"code":"assign"," name":"指派工单", "description": "释义***"},
         {"code":"execute"," name":"执行工作步骤/更新工作进度", "description": "释义***"},
         {"code":"apply"," name":"提交申请", "description": "释义***"},
         {"code":"audit"," name":"审核", "description": "释义***"},
         {"code":"stop"," name":"中止工单", "description": "释义***"},
         {"code":"close"," name":"结束工单", "description": "释义***"}
      ],
      "Count": 7,
    }
    
后台：接口实现注意事项：

	1、数据来源saas库下表：general_dictionary；
	2、返回当前项目下启动数据项和默认启动的数据项；
	3、name优先返回本地名称，没有本地名称返回原有名称；
	
### 数据字典:查询工单类型
>http://localhost:8080/saas/restGeneralDictService/queryGeneralDictByKey

post请求

参数例子：

    {
      "user_id":"***",                    //员工id-当前操作人id，必须
      "project_id":"***",                 //项目id，必须
      "dict_type": "work_order_type"      //工单类型，必须
    } 

返回例子：

    {
      "Result": "success",
      "Content": [
         {"code": "1", "name": "维保", "description": "释义***"},
         {"code": "2", "name": "维修", "description": "释义***"},
         {"code": "3", "name": "巡检", "description": "释义***"},
         {"code": "4", "name": "运行", "description": "释义***"}
      ],
      "Count": 4,
    }
  
后台：接口实现注意事项：

	1、数据来源saas库下表：general_dictionary；
	2、返回当前项目下启动数据项和默认启动的数据项；
	3、name优先返回本地名称，没有本地名称返回原有名称；
	
### 数据字典:查询专业需求
>http://localhost:8080/saas/restGeneralDictService/queryGeneralDictByKey

post请求

参数例子：

    {
      "user_id":"***",                    //员工id-当前操作人id，必须
      "project_id":"***",                 //项目id，必须
      "dict_type": "domain_require"       //字典类型
    } 

返回例子：

    {
      "Result": "success",
      "Content": [
         {"code": "SE", "name": "强电", "description": "释义***"},
         {"code": "WE", "name": "弱电", "description": "释义***"},
         {"code": "AC", "name": "空调", "description": "释义***"}
      ],
      "Count": 5,
    }

后台：接口实现注意事项：

	1、数据来源saas库下表：general_dictionary；
	2、返回当前项目下启动数据项和默认启动的数据项；
	3、name优先返回本地名称，没有本地名称返回原有名称；

### 数据字典:查询工单执行类型
>http://localhost:8080/saas/restGeneralDictService/queryGeneralDictByKey

post请求

参数例子：

    {
      "user_id":"***",                    //员工id-当前操作人id，必须
      "project_id":"***",                 //项目id
      "dict_type": "wo_execute_type"      //工单执行类型，必须
    } 

返回例子：

    {
      "Result": "success",
      "Content": [
         {"code":"all","name":"全部", "description": "释义***"},
         {"code":"temp","name":"临时性", "description": "释义***"},
         {"code":"plan","name":"计划性", "description": "释义***"}
      ],
      "Count": 3,
    }
    
后台：接口实现注意事项：

	1、数据来源saas库下表：general_dictionary；
	2、返回当前项目下启动数据项和默认启动的数据项；
	3、name优先返回本地名称，没有本地名称返回原有名称；
	
### 数据字典:查询工单状态
>http://localhost:8080/saas/restGeneralDictService/queryWorkOrderState

post请求

参数例子：

    {
      "user_id":"***",                    //员工id-当前操作人id，必须
      "project_id":"***",                 //项目id，必须
      "dict_type": "work_order_state"     //工单状态，必须
    } 

返回例子：

    {
      "Result": "success",
      "Content": [
         {"code":"4"," name":"待开始", "description": "释义***"},
         {"code":"5"," name":"执行中", "description": "释义***"},
         {"code":"6"," name":"待审核", "description": "释义***"},
         {"code":"8"," name":"完成", "description": "释义***"},
         {"code":"9"," name":"中止", "description": "释义***"},
         {"code":"C1"," name":"已分配", "description": "释义***"},
         {"code":"C2"," name":"未执行", "description": "释义***"}
      ],
      "Count": 7,
    }
    
	
后台：接口实现注意事项：

	1、工单状态包括：系统内置状态 和 自定义状态 ；
	2、系统内置状态 数据来源saas库下表：general_dictionary，name优先使用本地名称；
	3、自定义状态 数据来源saas库下表：wo_custom_state，查询当前项目下有效的数据，返回中description对应condition_desc；

### 数据字典:查询方位信息
>http://localhost:8080/saas/restDictService/queryAllDirectionCode

post请求，无参数

返回例子：

    {
      "Result": "success",
      "ResultMsg": "",
      "Content": [
        {
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
      ]
    }
    
### 数据字典:查询建筑功能类型
>http://localhost:8080/saas/restDictService/queryAllBuildingCode

post请求，无参数

返回例子：

    {
      "Result": "success",
      "ResultMsg": "",
      "Content": [
         {
            "code": "100",
            "name": "商业综合体",
            "content": [
                {
                    "code": "110",
                    "name": "单独功能区多建筑"
                },
                {
                    "code": "120",
                    "name": "复合功能区单建筑"
                }
            ]
        },
        {
            "code": "200",
            "name": "办公建筑",
            "content": [
                {
                    "code": "210",
                    "name": "政府办公楼"
                },
                {
                    "code": "220",
                    "name": "商业写字楼",
                    "content": [
                        {
                            "code": "221",
                            "name": "国际顶级写字楼"
                        },
                        {
                            "code": "222",
                            "name": "甲级写字楼"
                        },
                        {
                            "code": "223",
                            "name": "乙级写字楼"
                        }
                    ]
                }
            ]
        },
        {***}
      ]
    }

前台：接口调用注意事项：

	1、返回数据是三级树形结构；
	
### 数据字典:查询空间功能类型
>http://localhost:8080/saas/restDictService/queryAllSpaceCode

post请求，无参数

返回例子：


    {
      "Result": "success",
      "ResultMsg": "",
      "Content": [
         {
            "code": "100",
            "name": "公共区域",
            "content": [
                {
                    "code": "110",
                    "name": "盥洗区",
                    "content": [
                        {
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
                },
                {***}
            ]
        },
        {
            "code": "200",
            "name": "后勤",
            "content": [
                {
                    "code": "210",
                    "name": "洁洗区",
                    "content": [
                        {
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
                    "content": [
                        {
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
        },
        {***}
      ]
    }
    
前台：接口调用注意事项：

	1、返回数据是三级树形结构；
	

### 数据字典:查询租赁业态类型
>http://localhost:8080/saas/restDictService/queryAllRentalCode

post请求，无参数

返回例子：


    {
      "Result": "success",
      "ResultMsg": "",
      "Content": [
         {
            "code": "100",
            "name": "餐饮",
            "content": [
                {
                    "code": "110",
                    "name": "高档酒楼",
                    "content": []
                },
                {
                    "code": "120",
                    "name": "中餐炒菜",
                    "content": [
                        {
                            "code": "121",
                            "name": "高档时尚"
                        },
                        {
                            "code": "122",
                            "name": "中低档大众"
                        }
                    ]
                },
                {***}
            ]
        },
        {
            "code": "200",
            "name": "服装",
            "content": [
                {
                    "code": "210",
                    "name": "奢侈品",
                    "content": []
                },
                {
                    "code": "220",
                    "name": "高档单店",
                    "content": []
                }
            ]
        },
        {***}
      ]
    }
    
前台：接口调用注意事项：

	1、返回数据是三级树形结构；
	

        
## 通用对象查询
### 对象选择:搜索物理世界对象
>http://localhost:8080/saas/restObjectService/searchObject

post请求

参数例子：

    {
      "user_id": "****",         //员工id-当前操作人id，必须
      "project_id": "****",      //项目id,必须
      "keyword": "****",         //关键字
    }         

成功返回例子：

    {
      "Result": "success",
      "Content": [
        {
          "obj_id:"***",            //对象id
          "obj_name:"对象名称1",     //对象名称
          "obj_type":"equip",       //对象类型,子项见后边
          "parents":[                //父级有以下的一个或者几个
                {"parent_ids":["***","***","***"],"parent_names":["建筑1","楼层1","空间"]},
                {"parent_ids":["***","***"],"parent_names":["专业1","系统1"]},
                {"parent_ids":["***","***","***"],"parent_names":["专业1","系统大类","设备大类"]}
          ]
        },
        {
          "obj_id:"***",            //对象id
          "obj_name:"对象名称1",     //对象名称
          "obj_type":"equip",       //对象类型,子项见后边
          "parents":[                //父级有以下的一个或者几个
                {"parent_ids":["***","***","***"],"parent_names":["建筑1","楼层1","空间"]},
                {"parent_ids":["***","***"],"parent_names":["专业1","系统1"]},
                {"parent_ids":["***","***","***"],"parent_names":["专业1","系统大类","设备大类"]}
          ]
        }
      ],
      "Count": 2,
    }

失败返回例子：

    {
      "Result": "failure",
      "ResultMsg": ""
    } 

前台：接口调用注意事项：

	1、obj_tye:build-建筑、floor-楼层、space-空间、system-系统实例、equip-设备实例，system_class-系统类、equip_class-设备类，component-部件，tool-工具；

后台：接口实现注意事项：

	1、注意对象类型的转化；
	
	
### 对象选择:查询对象分类
>http://localhost:8080/saas/restObjectService/queryObjClassForObjSel

post请求

参数例子：

    {
      "user_id": "****"         //员工id-当前操作人id，必须
    }         

成功返回例子：

    {
      "Result": "success",
      "Content": [
        {
          "obj_type:"build",        //对象类型编码
          "obj_type_name:"建筑体"    //对象类型名称
        },
        {
          "obj_type:"floor",
          "obj_type_name:"楼层"
        },
        {
          "obj_type:"space",
          "obj_type_name:"空间"
        },
        {
          "obj_type:"system",
          "obj_type_name:"系统"
        },
        {
          "obj_type:"equip",
          "obj_type_name:"设备"
        },
        {
          "obj_type:"component",
          "obj_type_name:"部件"
        },
        {
          "obj_type:"tool",
          "obj_type_name:"工具"
        }
      ],
      "Count": 2,
    }

失败返回例子：

    {
      "Result": "failure",
      "ResultMsg": ""
    } 

前台：接口调用注意事项：

	1、该接口用于对象选择，也可以不从后台获取，直接写死在前台

后台：接口实现注意事项：

	1、写在配置文件中；
	
### 对象选择:查询建筑体
>http://localhost:8080/saas/restObjectService/queryBuild

post请求

参数例子：

    {
      "user_id": "****",         //员工id-当前操作人id，必须
      "project_id":"***"         //项目id，必须
    }         

成功返回例子：

    {
      "Result": "success",
      "Content": [
        {
          "obj_id:"Bd100108001",    //建筑id
          "obj_name:"建筑1"          //建筑本地名称
        },
        {
          "obj_id:"Bd100108002",
          "obj_name:"建筑2"
        }
      ],
      "Count": 2,
    }

失败返回例子：

    {
      "Result": "failure",
      "ResultMsg": ""
    } 

前台：接口调用注意事项：

	1、选中一个对象要记录的内容如下：
       "obj_id:"***",        //建筑id
       "obj_name":"***",     //建筑名
       "obj_type":"build",	 //对象类型

### 对象选择:查询楼层
>http://localhost:8080/saas/restObjectService/queryFloor

post请求

参数例子：

    {
      "user_id": "****",         //员工id-当前操作人id,必须
      "project_id":"***",        //项目id,必须
      "need_back_parents":true   //返回数据叶子节点是否需要带父级,必须
    }         

成功返回例子：

    {
      "Result": "success",
      "Content": [
        {
          "obj_id:"Bd100108001",     //建筑id
          "obj_name:"建筑1",          //建筑本地名称
          "content":[
              {
                  "obj_id:"Fl100108001001",  //楼层id
                  "obj_name":"楼层1",        //楼层本地名称
                  "parents":[
                  	  {"parent_ids":["Bd100108001"],"parent_names":["建筑1"]}
                  ]
              },
              {
                  "obj_id:"Fl100108001002",
                  "obj_name":"楼层2",
                  "parents":[
                  	  {"parent_ids":["Bd100108001"],"parent_names":["建筑1"]}
                  ]
              },
              {...}
          ],
        },
        {
          "obj_id:"Bd100108002",
          "obj_name:"建筑2",
          "content":[
              {
                  "obj_id:"Fl100108002001",  //楼层id
                  "obj_name":"楼层1",        //楼层本地名称
                  "parents":[
                  	  {"parent_ids":["Bd1001080021"],"parent_names":["建筑2"]}
                  ]
              },
              {
                  "obj_id:"Fl100108002002",
                  "obj_name":"楼层2",
                  "parents":[
                  	  {"parent_ids":["Bd100108002"],"parent_names":["建筑2"]}
                  ]
              },
              {...}
          ],
        }
      ],
      "Count": 2,
    }

失败返回例子：

    {
      "Result": "failure",
      "ResultMsg": ""
    } 

前台：接口调用注意事项：

	1、选中一个对象要记录的内容如下：
       "obj_id:"***",        //楼层id
       "obj_name":"***",     //楼层名称
       "obj_type":"floor",	 //对象类型
       "parents":[
            {"parent_ids":["***"],"parent_names":["***"]}
        ]
 
### 对象选择:查询空间
>http://localhost:8080/saas/restObjectService/querySpace

post请求

参数例子：

    {
      "user_id": "****",         //员工id-当前操作人id,必须
      "project_id":"***",        //项目id,必须
      "obj_id":"***",            //对象id,建筑或者楼层的id,必须
      "obj_type":"floor",	     //对象类型，build、floor,必须
      "need_back_parents":true   //返回数据叶子节点是否需要带父级,必须
    }         

成功返回例子：

    {
      "Result": "success",
      "Content": [
        {
          "obj_id:"Sp100108001001001",     //空间id
          "obj_name:"空间1",                //空间名称
          "parents":[
              {
                 "parent_ids":["Bd100108001","Fl100108001001"],
                 "parent_names":["建筑1","楼层1"]
              }
        },
        {
          "obj_id:"Sp100108002001002",     //空间id
          "obj_name:"空间2",                //空间名称
          "parents":[
              {
                 "parent_ids":["Bd100108002","Fl100108002001"],
                 "parent_names":["建筑2","楼层1"]
              }
        }
      ],
      "Count": 2,
    }

失败返回例子：

    {
      "Result": "failure",
      "ResultMsg": ""
    } 

前台：接口调用注意事项：

	1、查看空间时，左侧建筑-楼层树调用查询楼层接口，且"need_back_parents"：false
	2、选中一个对象要记录的内容如下：
       "obj_id:"***",        //空间id
       "obj_name":"***",     //空间名称
       "obj_type":"space",	 //对象类型
       "parents":[
            {"parent_ids":["***","***"],"parent_names":["***","***"]}
        ]

### 对象选择:查询系统实例
>http://localhost:8080/saas/restObjectService/querySystem

post请求

参数例子：

    {
      "user_id": "****",         //员工id-当前操作人id,必须
      "project_id":"***",        //项目id,必须
      "need_back_parents":true   //返回数据叶子节点是否需要带父级,必须
    }         

成功返回例子：

    {
      "Result": "success",
      "Content": [
        {
          "obj_id:"AC",            //专业编码
          "obj_name":"空调",        //专业名称
          "content":[
              {
                  "obj_id:"Sy100108001***001",     //系统id
                  "obj_name":"系统1",               //系统名称
                  "parents":[
                  	  { "parent_ids":["AC"], "parent_names":["空调"] },
                  	  {  "parent_ids":["Bd100108001"], "parent_names":["建筑1"] },
                   ]
              },
              {...}
          ],
        },
        {
          "obj_id:"AC",            //专业编码
          "obj_name":"空调",        //专业名称
          "content":[
              {
                  "obj_id:"Sy100108001***002",     //系统id
                  "obj_name":"系统2",               //系统名称
                  "parents":[
                  	  { "parent_ids":["AC"], "parent_names":["空调"] },
                  	  {  "parent_ids":["Bd100108002"], "parent_names":["建筑2"] },
                   ]
              },
              {...}
          ],
        }
      ],
      "Count": 2,
    }

失败返回例子：

    {
      "Result": "failure",
      "ResultMsg": ""
    } 

前台：接口调用注意事项：

	1、选中一个对象要记录的内容如下：
       "obj_id:"***",        //系统id
       "obj_name":"***",     //系统名称
       "obj_type":"space",	 //对象类型
       "parents":[
            {"parent_ids":["***","***"],"parent_names":["***","***"]}
        ]

后台：接口实现注意事项：

	1、专业名称要查询名称表中是否本地名称;

### 对象选择:查询设备实例-专业需求
>http://localhost:8080/saas/restGeneralDictService/queryGeneralDictByKey

post请求

参数例子：

    {
      "user_id":"***",                    //员工id-当前操作人id，必须
      "project_id":"***",                 //项目id，必须
      "dict_type": "domain_require"       //字典类型
    } 
返回值参见通用数据字典

### 对象选择:查询设备实例-系统专业下所有系统
>http://localhost:8080/saas/restObjectService/querySystemForSystemDomain

post请求

参数例子：

    {
        "user_id":"***",                    //员工id-当前操作人id，必须
        "project_id": "Pj1101010002"       	//项目id, 必须
        "system_domain":"*****",            //系统所属专业编码, 必须
    } 

成功返回格式：

    {
      "Result": "success",
      "Content": [
        {
            "system_id": "*****",			//系统id
            "system_name": "*****",			//系统名称
        },
        {
            "system_id": "*****",			//系统id
            "system_name": "*****",			//系统名称
        }
      ],
      "Count": 2
    }
    
前台：接口调用注意事项：

	1、system_domain是专业需求中的code；

### 对象选择:查询设备实例:查询建筑-楼层-空间列表树
>http://localhost:8080/saas/restObjectService/queryBuildFloorSpaceTree

post请求

参数例子

    {
      "user_id":"***",                       //员工id-当前操作人id，必须
      "project_id":"Pj1101010002"            //所属项目id, 必须
    }

成功返回例子

    {
      "Result": "success",
      "Content": [
        {
          "obj_id:"***",                    //建筑id
          "obj_name:"对象名称1",             //建筑名称
          "obj_type":"build",               //对象类型
          "content"[
              {
                "obj_id": "***",           //楼层id 
                "obj_name": "***",         //楼层名称
                "obj_type":"floor",        //对象类型，floor-楼层、space-空间
                "content": [
                    {
                       "obj_id": "***",     //空间id
                       "obj_name": "***",   //空间名称
                       "obj_type":"space"   //对象类型，space-空间
                    },
                    {...}
                ]
            },
            {
                "obj_id": "***",            //空间id
                "obj_name": "***",          //空间名称
                "obj_type":"space"          //对象类型，floor-楼层、space-空间
            }
            {...}
          ]
        },
        {
          "obj_id:"***",                    //建筑id
          "obj_name:"对象名称1",             //建筑名称
          "obj_type":"build",               //对象类型
          "content"[
              {
                "obj_id": "***",           //楼层id 
                "obj_name": "***",         //楼层名称
                "obj_type":"floor",        //对象类型，floor-楼层、space-空间
                "content": [
                    {
                       "obj_id": "***",     //空间id
                       "obj_name": "***",   //空间名称
                       "obj_type":"space"   //对象类型，space-空间
                    },
                    {...}
                ]
            },
            {...}
          ]
        }
      ]
    }

失败返回例子

    {
      "Result": "failure",
      "ResultMsg": ""
    }
    	
### 对象选择:查询设备实例
>http://localhost:8080/saas/restObjectService/queryEquip

post请求

参数例子：

    {
      "user_id": "****",         //员工id-当前操作人id,必须
      "project_id":"***",        //项目id,必须
      "build_id":"***",          //建筑id
      "space_id":"***",          //空间id
      "domain_code":"***",       //专业编码
      "system_id": "*****",      //系统id
      "need_back_parents":true   //返回数据叶子节点是否需要带父级,必须
    }         

成功返回例子：

    {
      "Result": "success",
      "Content": [
        {
          "obj_id:"***",            //对象id
          "obj_name:"对象名称1",     //对象名称
          "parents":[                //父级有以下的一个或者几个
             {"parent_ids":["***","***","***"],"parent_names":["建筑1","楼层1","空间"]},
             {"parent_ids":["***","***"],"parent_names":["专业1","系统1"]}
          ]
        },
        {
          "obj_id:"***",            //对象id
          "obj_name:"对象名称1",     //对象名称
          "parents":[                //父级有以下的一个或者几个
             {"parent_ids":["***","***","***"],"parent_names":["建筑1","楼层1","空间"]},
             {"parent_ids":["***","***"],"parent_names":["专业1","系统1"]}
          ]
        }
      ],
      "Count": 2,
    }

失败返回例子：

    {
      "Result": "failure",
      "ResultMsg": ""
    }  

前台：接口调用注意事项：

	1、build_id、space_id，当前左侧树选中哪个节点就传对应的参数
	2、如果上边选择系统了，就将系统id（system_id）也传入到参数中
	3、选中一个对象要记录的内容如下：
       "obj_id:"***",        //设备id
       "obj_name":"***",     //设备名称
       "obj_type":"equip",	 //对象类型
       "parents":[
            {"parent_ids":["***","***"],"parent_names":["***","***"]}
        ]

后台：接口实现注意事项：

	1、专业名称要查询名称表中是否本地名称;

### 对象选择：查询工具/部件列表
>http://localhost:8080/saas/restObjectService/queryTempObjectList

post请求

参数例子：

    {
      "user_id":"***",                    //员工id-当前操作人id，必须
      "project_id":"***",                 //项目id，必须
      "obj_type":"2",                     //对象类型，1、自定义对象、2-部件、3-工具、4-品牌、5、自定义标签、9其它，必须
      "obj_name":"***",                   //对象名称
    } 

成功返回例子：

    {
      "Result": "success",
      "Content": [
        {
            "obj_id": "*****",          //对象id
            "obj_type":"*",             //对象类型
            "obj_name": "*****"         //对象名称
        },
        {
            "obj_id": "*****",          //对象id
            "obj_type":"*",             //对象类型
            "obj_name": "*****"         //对象名称
        }
      ],
      "Count": 2
    }

后台：接口实现注意事项：

	1、对象名称值不为空时，支持模糊查询;
	
### 添加自定义对象
>http://localhost:8080/saas/restObjectService/addTempObjectWithType

post请求

参数例子：

    {
      "user_id":"***",                    //员工id-当前操作人id，必须
      "project_id":"***",                 //项目id，必须
      "obj_type":"2",                     //对象类型，1、自定义对象、2-部件、3-工具、4-品牌、5、自定义标签、9其它，必须
      "obj_name":"***",                   //对象名称
      "obj_names":["***","***"]           //对象名称数组
    } 

成功返回例子：

    {
      "Result": "success",
      "ResultMsg": "",
    }

失败返回例子：

    {
      "Result": "failure",
      "ResultMsg": ""
    }

前台：接口调用注意事项：

	1、obj_name 和 obj_names两个参数必须有一个不为空；

后台：接口实现注意事项：

	1、验证：obj_name 和 obj_names两个参数必须有一个不为空；
	   
## 通用信息点查询     
### 信息点选择:搜索信息点
>http://localhost:8080/saas/restObjectService/searchInfoPoint

post请求

参数例子：

    {
      "user_id": "****",         //员工id-当前操作人id，必须
      "project_id": "****",      //项目id,必须
      "keyword": "****",         //关键字
    }         

成功返回例子：

	{
      "Result": "success",
      "Content": [
        {
          "obj_id:"***",            //对象id
          "obj_name:"对象名称1",     //对象名称
          "obj_type":"equip",       //对象类型,子项见后边
          "parents":[                //父级有以下的一个或者几个
                {"parent_ids":["***","***","***"],"parent_names":["建筑1","楼层1","空间"]},
                {"parent_ids":["***","***"],"parent_names":["专业1","系统1"]},
                {"parent_ids":["***","***","***"],"parent_names":["专业1","系统大类","设备大类"]}
          ],
		  "info_point":{"id":"***","code":"****","name":"****"}
        },
        {
          "obj_id:"***",            //对象id
          "obj_name:"对象名称1",     //对象名称
          "obj_type":"equip",       //对象类型,子项见后边
          "parents":[                //父级有以下的一个或者几个
                {"parent_ids":["***","***","***"],"parent_names":["建筑1","楼层1","空间"]},
                {"parent_ids":["***","***"],"parent_names":["专业1","系统1"]},
                {"parent_ids":["***","***","***"],"parent_names":["专业1","系统大类","设备大类"]}
          ],
		  "info_point":{"id":"***","code":"****","name":"****"}
        }
      ],
      "Count": 2,
    }

失败返回例子：

    {
      "Result": "failure",
      "ResultMsg": ""
    } 

前台：接口调用注意事项：

	1、obj_tye:build-建筑、floor-楼层、space-空间、system-系统实例、equip-设备实例，system_class-系统类、equip_class-设备类；

后台：接口实现注意事项：

	1、注意对象类型的转化；
    2、信息点id组成：
	        信息点id：对象类型_大类编码_信息点编码
	        对象类型：project、build、floor、space、system、equip
	       大类编码：project、build、floor、space 的默认0，system是2位系统大类编码，equip是4位设备大类编码；    
	          		
### 信息点选择:查询对象分类
>http://localhost:8080/saas/restObjectService/queryObjClassForInfoPointSel

post请求

参数例子：

    {
      "user_id": "****"         //员工id-当前操作人id，必须
    }         

成功返回例子：

    {
      "Result": "success",
      "Content": [
        {
          "obj_type:"system",      //对象类型编码
          "obj_type_name:"系统"     //对象类型名称
        },
        {
          "obj_type:"equip",
          "obj_type_name:"设备"
        }
      ],
      "Count": 2,
    }

失败返回例子：

    {
      "Result": "failure",
      "ResultMsg": ""
    } 

前台：接口调用注意事项：

	1、该接口用于信息点选择，查询对象分类；

后台：接口实现注意事项：

	1、写在配置文件中；
	
### 信息点选择:查询对象

说明：信息点选择时，不同类型下左侧对象的查询同对象选择时的查询，对象下信息点的查询见后面方法；

### 信息点选择:查询对象下信息点
>http://localhost:8080/saas/restObjectService/queryInfoPointForObject

post请求

参数例子：

    {
      "user_id": "****"         //员工id-当前操作人id，必须
      "obj_id:"***",            //对象id，必须
      "obj_type":"equip",       //对象类型,子项见后边，必须
    }       

成功返回例子：

    {
      "Result": "success",
      "Content": [
        {
          "id:"***",       //信息点id
          "code:"***",     //信息点编码
          "name":"***"     //信息点名称
        },
        {
          "id:"***",       //信息点id
          "code:"***",     //信息点编码
          "name":"***"     //信息点名称
        }
      ],
      "Count": 2,
    }

失败返回例子：

    {
      "Result": "failure",
      "ResultMsg": ""
    } 

前台：接口调用注意事项：

	1、obj_tye:build-建筑、floor-楼层、space-空间、system-系统实例、equip-设备实例，system_class-系统类、equip_class-设备类；

后台：接口实现注意事项：

	1、注意对象类型的转化；
    2、信息点id组成：
	        信息点id：对象类型_大类编码_信息点编码
	        对象类型：project、build、floor、space、system、equip
	       大类编码：project、build、floor、space 的默认0，system是2位系统大类编码，equip是4位设备大类编码； 
	3、现在支持查询系统、设备的私有信息点；

## 图片上传与下载
### 图片上传
>url：image-service/common/image_upload?systemId=***&secret=***&key=www

>例：http://192.168.20.225:8080/image-service/common/image_upload?systemId=***&secret=***&key=www

post体

图片文件输入流

返回

    {  
      "Result":"success",
      "ResultMsg":""
    }

前台：接口调用注意事项：

	1、因图片服务在app工单系统、saas系统、saas运营系统等系统中通用，图片存在一个目录下，所有key在这几个项目下要唯一；
	2、建议key的格式：项目缩写_图片名称，例如:wo_1503483253599.png、saas_1503483253599.png，在该格式中图片名称要在本项目下唯一；
	

### 图片获取
>url：image-service/common/image_get?systemId=***&key=www

## 附件上传与下载
### 附件上传
>url：image-service/common/file_upload?systemId=dev&secret=***&key=www

>例：http://192.168.20.225:8080/image-service/common/file_upload?systemId=***&secret=***&key=www

post体

图片文件输入流

返回

    {  
      "Result":"success",
      "ResultMsg":""
    }

前台：接口调用注意事项：

	1、因附件服务在app工单系统、saas系统、saas运营系统等系统中通用，附件存在一个目录下，所有key在这几个项目下要唯一；
	2、建议key的格式：项目缩写_时间_附件名称，例如:wo_1503483253599_附件名称.xlsx、saas_1503483253599_附件名称.xlsx；
	

### 附件获取
>url：image-service/common/file_get/{key}?systemId=dev

>例：image-service/common/file_get/www?systemId=dev, 其中key为www。

# 系统管理
## 账户管理
### 账户管理-根据Id查询客户基本信息
>http://localhost:8080/saas/restCustomerService/queryCustomerById

post请求

参数例子：

    {
      "user_id":"***",             //员工id-当前操作人id，必须
      "customer_id":"***"          //客户id ,必须
    }         

返回例子：

    {
      "Result": "success",
      "Item":{
          "customer_id":"***",                //客户id
          "company_name":"***",               //公司名称 ,必须
          "legal_person":"***",               //公司法人
          "account":"***",                    //账号
          "mail":"***",                       //公司邮箱
          "contact_person":"***",             //联系人
          "contact_phone":"***",              //联系人电话
          "operation_valid_term_start":"***", //公司经营有效期限开始日期，YYYY-MM-DD
          "operation_valid_term_end":"***",   //公司经营有效期限结束日期，YYYY-MM-DD
          "contract_valid_term_start":"***",  //托管合同有效期限开始日期，YYYY-MM-DD
          "contract_valid_term_end":"***",    //托管合同有效期限结束日期，YYYY-MM-DD
          "business_license":"***",           //营业执照，图片的key
          "pictures":["***","***"],           //产权证/托管合同，图片key的数组
          "tool_type":"Web",                  //工具类型,Web，Revit
          "project_id":"***",                 //项目id/项目编码
          "project_name":"***",               //项目名称
          "project_local_name":"***"          //项目本地名称
        }
    } 

### 账户管理-修改密码:验证原密码是否正确
>http://localhost:8080/saas/restCustomerService/verifyCustomerPasswd

post请求

参数例子：

    {
      "user_id":"***",                    //员工id-当前操作人id，必须
      "customer_id":"***",                //客户id，必须
      "old_passwd":"***"                  //旧密码，必须
    } 

成功返回例子：

    {
      "Result": "success",
      "Item": {"is_passwd":true}
      "ResultMsg": "",
    }

失败返回例子：

    {
      "Result": "failure",
      "ResultMsg": ""
    }

后台：接口实现注意事项：

	1、验证时注意客户密码是MD5加密的；   
	
### 账户管理-修改密码:保存密码
>http://localhost:8080/saas/restCustomerService/updateCustomerPasswd

post请求

参数例子：

    {
      "user_id":"***",                    //员工id-当前操作人id，必须
      "customer_id":"***",                //客户id，必须
      "old_passwd":"***"                  //旧密码，必须
      "new_passwd":"***"                  //新密码，必须
    } 

成功返回例子：

    {
      "Result": "success",
      "ResultMsg": "",
    }

失败返回例子：

    {
      "Result": "failure",
      "ResultMsg": ""
    }

后台：接口实现注意事项：

	1、修改前要先验证原密码是否正确；   	 

## 项目信息
### 项目信息-查询项目详细信息
>http://localhost:8080/saas/restCustomerService/queryProjectInfo

post请求

参数例子：

    {
      "user_id":"***",                  //员工id-当前操作人id，必须
      "project_id":"***"                //项目id,项目编码 ,必须

    }         

成功返回例子：

    {
      "Result": "success",
      "Item":{
          "project_id":"***",             //项目id
          "project_local_id":"***",       //项目本地编号
          "project_local_name":"***",     //项目本地名称
          "BIMID":"***",                  //BIM编码
          "province":"***",               //省编码
          "city":"***",                   //市编码
          "district":"***",               //市内编码
          "province_city_name":"河北省·石家庄市·长安区",     //省市区域名称
          "climate_zone":"***",           //气候区编码
          "climate_zone_name":"***",      //气候区名称
          "urban_devp_lev":"***",         //城市发展水平编码
          "urban_devp_lev_name":"***",    //城市发展水平名称
          "longitude":"***",              //经度
          "latitude":"***",               //维度
          "altitude":"***",               //海拔
          "group":"***",                  //所属集团
          "owner":"***",                  //业主
          "designer":"***",               //设计方
          "constructors":"***",           //施工方
          "property":"***",               //物业公司
          "group_manage_zone":"***",      //集团管理分区
          "group_operate_zone":"***",     //集团经营分区
          "1st_weather":"***",            //未来第1天,天气状态编码
          "1st_weather_name":"***",       //未来第1天,天气状态名称，页面显示
          "1stTdb":"***",                 //未来第1天,空气（干球）温度
          "1stRH":"***",                  //未来第1天,空气相对湿度
          "1stPM2.5":"***",               //未来第1天,空气PM2.5质量浓度
          "1stPM10":"***",                //未来第1天,空气PM10浓度
          "2nd_weather":"***",            //未来第2天,天气状态编码
          "2nd_weather_name":"***",       //未来第2天,天气状态名称，页面显示
          "2ndTdb":"***",                 //未来第2天,空气（干球）温度
          "2ndRH":"***",                  //未来第2天,空气相对湿度
          "2ndPM2.5":"***",               //未来第2天,空气PM2.5质量浓度
          "2ndPM10":"***",                //未来第2天,空气PM10浓度
          "3rd_weather":"***",            //未来第3天,天气状态编码
          "3rd_weather_name":"***",       //未来第3天,天气状态名称，页面显示
          "3rdTdb":"***",                 //未来第3天,空气（干球）温度
          "3rdRH":"***",                  //未来第3天,空气相对湿度
          "3rdPM2.5":"***",               //未来第3天,空气PM2.5质量浓度
          "3rdPM10":"***",                //未来第3天,空气PM10浓度
          "out_weather":"***",            //当前室外环境,天气状态编码
          "out_weather_name":"***",       //当前室外环境,天气状态名称，页面显示
          "outTdb":"***",                 //当前室外环境,空气（干球）温度
          "outRH":"***",                  //当前室外环境,空气相对湿度
          "outD":"***",                   //当前室外环境,空气绝对湿度
          "outTwb":"***",                 //当前室外环境,空气湿球温度
          "outTd":"***",                  //当前室外环境,空气露点温度
          "outH":"***",                   //当前室外环境,空气焓
          "outRou":"***",                 //当前室外环境,空气密度
          "outTg":"***",                  //当前室外环境,环境黑球温度
          "out_press":"***",              //当前室外环境,空气压力
          "outCO2":"***",                 //当前室外环境,空气CO2浓度
          "outCO":"***",                  //当前室外环境,空气CO浓度
          "outPM2.5":"***",               //当前室外环境,空气PM2.5浓度
          "outPM10":"***",                //当前室外环境,空气PM10浓度
          "outDust":"***",                //当前室外环境,空气烟尘浓度
          "outVOC":"***",                 //当前室外环境,空气VOC浓度
          "outCH4":"***",                 //当前室外环境,空气甲烷浓度
          "out_vision":"***",             //当前室外环境,空气能见度
          "outAQI":"***",                 //当前室外环境,空气质量指数
          "outLux":"***",                 //当前室外环境,环境照度
          "outRI":"***",                  //当前室外环境,全辐射强度
          "out_horizontal_RI":"***",      //当前室外环境,水平面辐射强度
          "out_vertical_RI":"***",        //当前室外环境,垂直面辐射强度
          "out_noise":"***",              //当前室外环境,环境噪声
          "out_ave_wind_v":"***",         //当前室外环境,空气平均风速
          "out_wind_scale":"***",         //当前室外环境,空气风力等级编码
          "out_wind_scale_name":"***",    //当前室外环境,空气风力等级名称，页面显示
          "out_wind_vx":"***",            //当前室外环境,空气X向风速
          "out_wind_vy":"***",            //当前室外环境,空气Y向风速
          "out_wind_vz":"***",            //当前室外环境,空气Z向风速
          "out_wind_direct":"***",        //当前室外环境,空气风向编码
          "out_wind_direct_name":"***",   //当前室外环境,空气风向名称，页面显示
          "day_precipitation":"***",      //当前室外环境,日降水量
          "precipitation_type":"***",     //当前室外环境,降水类型，1-无， 2-雨， 3-雪 ，4-雾露霜 ，5-雨夹雪， 6-其他
          "precipitation_type_name":"***",//当前室外环境,降水类型名称，页面显示
          "SRT":"***",                    //当前室外环境,日出时间
          "SST":"***"                     //当前室外环境,日落时间
      }       			
    } 

失败返回例子：

    {
      "Result": "failure",
      "ResultMsg": ""
    } 

后台：接口实现注意事项：

	1、查询数据平台中项目数据；
	2、从数据平台查询后，在service层要做字段匹配转化，参考"/doc/建筑空间类对象.xlsx"；
	3、查询数据平台数据字典，转化天气状态、空气风力等级、空气风向等编码对应的名称；
	
### 项目信息-查询项目信息点的历史信息
>http://localhost:8080/saas/restCustomerService/queryProjectInfoPointHis

post请求

参数例子：

    {
      "user_id":"***",                  //员工id-当前操作人id，必须
      "project_id":"***",               //项目id,项目编码 ,必须
      "info_point_code":"***"           //信息点编码 ,即字段的英文标识，必须

    }         

成功返回例子：

    {
      "Result": "success",
      "Content": [
        {"date":yyyymmddhhmmss,"value":"***"},
        {"date":yyyymmddhhmmss,"value":"***"},
        {"date":yyyymmddhhmmss,"value":"***"}
      ],
      "Count": 3,
    }
失败返回例子：

    {
      "Result": "failure",
      "ResultMsg": ""
    } 

后台：接口实现注意事项：

	1、查询数据平台中项目数据；
	2、在service层先做字段匹配转化，再从数据平台查询项目信息，参考"/doc/建筑空间类对象.xlsx"；
	3、信息点"xxx"的历史信息在项目信息中查找字段"xxx_his"的值，格式为：
	 "xxx_his" :[{"date":yyyymmddhhmmss,"value":""},{"date":"20170517170000","value":""}],
    4、返回的信息点历史要以时间倒序排序，注意时间格式的转化；

### 项目信息-编辑提交信息点信息
>http://localhost:8080/saas/restCustomerService/updateProjectInfo

post请求

参数例子：

    {
        "user_id":"***",                        //员工id-当前操作人id，必须
        "project_id":"Pj1101080001",            //所属项目id，必须
        "info_point_code":"project_local_name", //修改的信息点编码，必须
        "info_point_value":"广联达测试2",          //修改的信息点的值，必须
        "valid_time":"***"                      //生效时间，格式：yyyymmddhhmmss，可以为空
    }

成功返回例子：

    {
      "Result": "success",
      "ResultMsg": ""
    }

失败返回例子：

    {
      "Result": "failure",
      "ResultMsg": ""
    }

前台：接口调用注意事项：
    
    1、生效时间不传输或者为空时，默认是"修正输入错误";
    2、"该信息有变化"时，生效时间为必须；
    3、可修改的信息点"info_point_code"有：
       "project_local_id",       //项目本地编号
       "project_local_name",     //项目本地名称
       "BIMID",                  //BIM编码
       "group",                  //所属集团
       "owner",                  //业主
       "designer",               //设计方
       "constructor",            //施工方
       "property",               //物业公司
       "group_manage_zone",      //集团管理分区
       "group_operate_zone",     //集团经营分区

后台：接口实现注意事项：

	1、项目本地名称修改时，是saas平台客户信息和数据平台项目信息都修改，其它字段只是修改数据平台项目信息；
	2、在service层先做字段匹配转化，再从数据平台查询项目的信息，参考"/doc/建筑空间类对象.xlsx"；
	3、要修改信息点值的同时，保存该信息点的历史记录；
	4、信息点"xxx"的历史信息在项目信息中查找字段"xxx_his"的值，格式为：
	 "xxx_his" :[{"date":yyyymmddhhmmss,"value":""},{"date":"20170517170000","value":""}],
	5、valid_time为空时，是修改该信息点历史记录时间最新一个的值，valid_time不为空时，加一条信息的历史记录，注意时间格式，valid_time不为空时保存格式："xxx_his":"20170108062907"；

## 建筑体	
### 建筑体-查询项目下建筑列表
>http://localhost:8080/saas/restCustomerService/queryBuildList

post请求

参数例子：

    {
      "user_id":"***",              //员工id-当前操作人id，必须
      "customer_id":"***"			//客户id ,必须
    }         
       

成功返回例子：

    {
      "Result": "success",
      "Content": [
        {
          "build_id":"***",       	    //建筑id
          "build_code":"***",           //建筑编码
          "build_name":"***",           //建筑名称
          "build_local_name":"***",     //建筑本地名称
          "build_age":"***",       	    //建筑年代
          "build_func_type":"***",      //建筑功能类型编码
          "build_func_type_name":"***"  //建筑功能类型名称
        },
        {
          "build_id":"***",       	    //建筑id
          "build_code":"***",           //建筑编码
          "build_name":"***",           //建筑名称
          "build_local_name":"***",     //建筑本地名称
          "build_age":"***",       	    //建筑年代
          "build_func_type":"***",      //建筑功能类型编码
          "build_func_type_name":"***"  //建筑功能类型名称
        },
        {***}
      ],
      "Count": 3,
    }
失败返回例子：

    {
      "Result": "failure",
      "ResultMsg": ""
    } 


后台：接口实现注意事项：

	1、查询saas数据中客户下的建筑信息，来源表：building；
	2、列表排序默认按照创建时间倒序排列,因id是按照时间戳生成的，查询出的数据可以按照id倒序排序；
	
### 建筑体-查询建筑详细信息
>http://localhost:8080/saas/restCustomerService/queryBuildInfo

post请求

参数例子：

    {
      "user_id":"***",                  //员工id-当前操作人id，必须
      "project_id":"***"                //项目id,项目编码 ,必须
      "build_id":"***",                 //建筑id,必须
      "build_code":"***"                //建筑编码,必须

    }         

成功返回例子：

    {
      "Result": "success",
      "Item":{
          "build_id":"***",       	      //建筑id,saas库中建筑表id
          "build_code":"***",             //建筑体编码，物理世界建筑id
          "build_local_id":"***",         //建筑本地编码
          "build_local_name":"***",       //建筑本地名称
          "BIMID":"***",                  //BIM编码
          "build_age":"***",              //建筑年代
          "build_func_type":"***",        //建筑功能类型
          "build_func_type_name":"***",   //建筑功能类型名称，页面显示
          "ac_type":"***",                //空调类型, 1-中央空调系统, 2-分散空调系统, 3-混合系统, 4-其他
          "ac_type_name":"***",           //空调类型名称，页面显示
          "heat_type":"***",              //采暖类型, 1-城市热网 , 2-锅炉, 3-热泵, 4-其他
          "heat_type_name":"***",         //采暖类型名称，页面显示
          "green_build_lev":"***",        //绿建等级, 1-无, 2- 一星级, 3- 二星级 , 3- 三星级, 4-其他
          "green_build_lev_name":"***",   //绿建等级名称，页面显示
          "intro":"***",                  //文字简介
          "picture":["***","***"],        //建筑图片
          "design_cool_load_index":"***", //单位面积设计冷量
          "design_heat_load_index":"***", //单位面积设计热量
          "design_elec_load_index":"***", //单位面积配电设计容量
          "struct_type":"***",            //建筑结构类型, 1-钢筋混凝土结构, 2-钢架与玻璃幕墙, 3-砖混结构, 4-其他
          "struct_type_name":"***",       //建筑结构类型名称，页面显示
          "SFI":"***",                    //抗震设防烈度, 1- 6度, 2- 7度, 3- 8度 ,4- 9度, 5- 其他
          "SFI_name":"***",               //抗震设防烈度名称，页面显示
          "shape_coeff":"***",            //建筑体形系数
          "build_direct":"***",           //建筑朝向
          "build_direct_name":"***",      //建筑朝向名称，页面显示
          "insulate_type":"***",          //保温类型, 1-无保温, 2-内保温, 3-外保温, 4-其他
          "insulate_type_name":"***",     //保温类型名称，页面显示
          "GFA":"***",                    //建筑总面积
          "tot_height":"***",             //建筑总高度
          "cover_area":"***",             //建筑占地面积
          "drawing"[                      //图纸
          	{"type":"1","name":"***","url":"***}, //附件类型，1-url，2-附件
          	{"type":"1","name":"***","url":"***},
          	{"type":"2","name":"***","key":"***}
          ],   
          "archive"[                      //档案
          	{"type":"1","name":"***","url":"***}, //附件类型，1-url，2-附件
          	{"type":"1","name":"***","url":"***},
          	{"type":"2","name":"***","key":"***}
          ],   
          "consum_model"[               //建筑能耗模型
          	{"type":"1","name":"***","url":"***}, //附件类型，1-url，2-附件
          	{"type":"1","name":"***","url":"***},
          	{"type":"2","name":"***","key":"***}
          ],  
          "permanent_people_num":"***"    //建筑常驻人数

      }       			
    } 

失败返回例子：

    {
      "Result": "failure",
      "ResultMsg": ""
    } 

后台：接口实现注意事项：

	1、查询数据平台中建筑数据；
	2、从数据平台查询后，在service层要做字段匹配转化，参考"/doc/建筑空间类对象.xlsx"；
	3、查询数据平台数据字典，建筑功能类型、空气风向 等编码对应的名称；
	4、详细中已列出的字典数据可以保持在配置文件中，Json串，查询详细时，能将对应编码转化名称；

###  建筑体-查询建筑信息点的历史信息
>http://localhost:8080/saas/restCustomerService/queryBuildInfoPointHis

post请求

参数例子：

    {
      "user_id":"***",                  //员工id-当前操作人id，必须
      "project_id":"***",               //项目id,项目编码 ,必须
      "build_code":"***",               //建筑体编码，物理世界建筑id，必须
      "info_point_code":"***"           //信息点编码 ,即字段的英文标识，必须

    }         

成功返回例子：

    {
      "Result": "success",
      "Content": [
        {"date":yyyymmddhhmmss,"value":"***"},
        {"date":yyyymmddhhmmss,"value":"***"},
        {"date":yyyymmddhhmmss,"value":"***"}
      ],
      "Count": 3,
    }
失败返回例子：

    {
      "Result": "failure",
      "ResultMsg": ""
    } 

后台：接口实现注意事项：

	1、查询数据平台中建筑数据；
	2、在service层先做字段匹配转化，再从数据平台查询建筑信息，参考"/doc/建筑空间类对象.xlsx"；
	3、信息点"xxx"的历史信息在建筑信息中查找字段"xxx_his"的值，格式为：
	 "xxx_his" :[{"date":yyyymmddhhmmss,"value":""},{"date":"20170517170000","value":""}],
    4、返回的信息点历史要以时间倒序排序，注意时间格式的转化；
    
### 建筑体-编辑提交信息点信息
>http://localhost:8080/saas/restCustomerService/updateBuildInfo

post请求

参数例子：

    {
        "user_id":"***",                        //员工id-当前操作人id，必须
        "project_id":"***"                      //项目id,项目编码 ,必须
        "build_id":"***",       	            //建筑id,saas库中建筑表id，必须
        "build_code":"***",                     //建筑体编码，物理世界建筑id，必须
        "info_point_code":"build_local_name",   //修改的信息点编码，必须
        "info_point_value":"北京万达索菲特大厦",    //修改的信息点的值，必须
        "valid_time":"20170108062907" 	        //生效时间，格式：yyyymmddhhmmss，可以为空
    }
    
附件字段例子：

    {
        "user_id":"***",                        //员工id-当前操作人id，必须
        "build_id":"***",       	            //建筑id,saas库中建筑表id，必须
        "build_code":"***",                     //建筑体编码，物理世界建筑id，必须
        "info_point_code":"drawing",            //修改的信息点(图纸)编码，必须
        "info_point_value"[                      //修改的信息点(图纸)的值，必须
          	{"type":"1","name":"***","url":"***}, //附件类型，1-url，2-附件
          	{"type":"1","name":"***","url":"***},
          	{"type":"2","name":"***","key":"***}
          ],
        "valid_time":"20170108062907" 	        //生效时间，格式：yyyymmddhhmmss，可以为空
    }


    
成功返回例子：

    {
      "Result": "success",
      "ResultMsg": ""
    }

失败返回例子：

    {
      "Result": "failure",
      "ResultMsg": ""
    }

前台：接口调用注意事项：
    
    1、生效时间不传输或者为空时，默认是"修正输入错误";
    2、"该信息有变化"时，生效时间为必须；

后台：接口实现注意事项：

	1、建筑的"建筑本地名称"、"建筑年代"、"建筑功能类型"修改时，是saas平台建筑信息和数据平台建筑信息都修改，其它字段只是修改数据平台建筑信息，注意build_id是saas库中建筑表id，build_code是物理世界（数据平台）建筑id；
	2、在service层先做字段匹配转化，参考"/doc/建筑空间类对象.xlsx"；
	3、要修改信息点值的同时，保存该信息点的历史记录；
	4、valid_time为空时，是修改该信息点历史记录时间最新一个的值，valid_time不为空时，加一条信息的历史记录，注意时间格式，valid_time不为空时保存格式："xxx_his":"20170108062907"；

## 名词管理
### 名词管理-列表页:查询名词类型列表
>http://localhost:8080/saas/restNounService/queryNounTypeList

post请求

参数例子：

    {
      "user_id":"***",         //员工id-当前操作人id，必须
      "project_id":"***"       //项目id，必须
    } 

返回例子：

    {
      "Result": "success",
      "Content": [
        {
          "noun_type":"work_order_type",       //名词类型
          "noun_type_name":"工单类型"           //名词类型名称
        },
        {
          "noun_type":"wo_control_module",
          "noun_type_name":"操作模块名" 
        },
        {
          "noun_type":"domain_require",
          "noun_type_name":"专业"
        },
        {
          "noun_type":"wo_control_require",
          "noun_type_name":"控制需求文字描述"
        }
      ],
      "Count": 4,
    }
	
后台：接口实现注意事项：

	1、将上边4个数据做成json串，存储在后台文件中；	
	
### 名词管理-列表页:查询名词列表
>http://localhost:8080/saas/restNounService/queryNounList

post请求

参数例子：

    {
      "user_id":"***",                 //员工id-当前操作人id，必须
      "project_id":"***"               //项目id，必须
      "noun_type":"work_order_type",   //名词类型-工单类型，必须
    } 

返回例子：

    {
      "Result": "success",
      "Content": [
        {
          "dict_id":"***",             //主键id
          "code":"***",                //编码
          "name":"***",                //系统标准名称
          "description":"***",         //编码
          "customer_use":true,         //是否使用该项
          "customer_name":"***"        //本地名称
          
        },
        {
          "dict_id":"***",     
          "code":"***",             
          "name":"***",               
          "description":"***",       
          "customer_use":false,      
          "customer_name":"***"    
        }
      ],
      "Count": 2
    }
	
后台：接口实现注意事项：

	1、数据来源表：general_dictionary
	2、customer_use中没有该项目设置时，返回默认状态；	
	
### 名词管理-列表页:根据Id编辑名词信息
>http://localhost:8080/saas/restNounService/updateNounById

post请求

参数例子：

    {
      "user_id":"*****",                //员工id-当前操作人id，必须
      "project_id":"*****",             //项目id ,必须
      "dict_id": "****",                //名词主键id,必须
      "customer_use":false,             //是否使用该项
      "customer_name":"***"             //本地名称
    }         

成功返回例子：

    {
      "Result": "success",
      "ResultMsg": "",
    }

失败返回例子：

    {
      "Result": "failure",
      "ResultMsg": ""
    } 
	
### 名词管理-列表页:添加名词信息-后台使用
>http://localhost:8080/saas/restNounService/addNounByAdmin

post请求

参数例子：

    {
      "user_id":"*****",                //员工id-当前操作人id，必须
      "dict_type":"***"                 //字典类型
      "code":"***",                     //编码
      "name":"***",                     //系统标准名称
      "description":"***",              //名词释义(描述)
      "default_use":false               //默认使用状态
    }         

成功返回例子：

    {
      "Result": "success",
      "ResultMsg": "",
    }

失败返回例子：

    {
      "Result": "failure",
      "ResultMsg": ""
    }

### 名词管理-列表页:删除名词信息-后台使用
>http://localhost:8080/saas/restNounService/deleteNounByAdmin

post请求

参数例子：

    {
      "user_id":"*****",                //员工id-当前操作人id，必须
      "dict_id": "****"                 //名词主键id,必须
    }         

成功返回例子：

    {
      "Result": "success",
      "ResultMsg": "",
    }

失败返回例子：

    {
      "Result": "failure",
      "ResultMsg": ""
    }
    
### 名词管理-列表页:修改名词信息-后台使用
>http://localhost:8080/saas/restNounService/updateNounByAdmin

post请求

参数例子：

    {
      "user_id":"*****",                //员工id-当前操作人id，必须
      "dict_type":"***"                 //字典类型
      "code":"***",                     //编码
      "name":"***",                     //系统标准名称
      "description":"***",              //名词释义(描述)
      "default_use":false               //默认使用状态
    }         

成功返回例子：

    {
      "Result": "success",
      "ResultMsg": "",
    }

失败返回例子：

    {
      "Result": "failure",
      "ResultMsg": ""
    }
        
# 人员管理
## 人员信息
### 人员信息-列表页:查询项目下岗位列表
>http://localhost:8080/saas/restPersonService/queryPositionsByProjectId

post请求

参数例子：

    {
      "user_id":"*****",         //员工id-当前操作人id，必须
      "project_id":"*****"       //项目id，必须
    } 

返回例子：

    {
      "Result": "success",
      "Item":{
          "positions":["***","***"]     		//岗位信息
      }
    }

后台：接口实现注意事项：

	1、查询该项目下在职人员的岗位列表；	
	
### 人员信息-列表页:查询人员列表
>http://localhost:8080/saas/restPersonService/queryPersonList

post请求

参数例子：

    {
      "user_id":"*****",         //员工id-当前操作人id，必须
      "project_id":"*****",      //项目id，必须
      "position":"*****",        //岗位
      "person_status":"*****"    //人员状态，1-在职，0-离职，必须
    } 

返回例子：

    {
      "Result": "success",
      "Content": [
        {
          "person_id":"*****",               //员工id
          "project_id":"*****",              //所属项目id 
          "person_num":"*****",              //员工编号
          "name":"*****",                    //姓名 
          "phone_num":"*****",               //手机号 
          "position":"*****",                //岗位
          "specialty_name":"专业1、专业2",     //专业名称字符串
          "id_photo":key,                    //证件照片
          "person_status":"1",               //人员状态, 1-在职，0-离职
          "roles":"角色1、角色2"               //角色名称字符串
        },
        {
          "person_id":"*****",               //员工id
          "project_id":"*****",              //所属项目id 
          "person_num":"*****",              //员工编号
          "name":"*****",                    //姓名 
          "phone_num":"*****",               //手机号 
          "position":"*****",                //岗位
          "specialty_name":"专业1、专业2",     //专业名称字符串
          "id_photo":key,                    //证件照片
          "person_status":"1",               //人员状态, 1-在职，0-离职
          "roles":"角色1、角色2"               //角色名称字符串
        }
      ],
      "Count": 2,
    }
前台：接口调用注意事项：
	
	1、roles值不存在的，是还未添加角色的。
	
后台：接口实现注意事项：

	1、专业名称查询专业数据字典，优先使用本地名称；	
	2、列表显示为项目人员的创建时间倒序显示；
	
### 人员信息-列表页:查询人员缩略图
>http://localhost:8080/saas/restPersonService/queryPersonWithGroup

post请求

参数例子：

    {
      "user_id":"*****",         //员工id-当前操作人id，必须
      "project_id":"*****",      //项目id，必须
      "person_status":"*****"    //人员状态，1-在职，0-离职，必须
    } 

返回例子：

    {
      "Result": "success",
      "Content": [
        { 
          "position":"*****",               //岗位
          "persons":[                       //员工数组
             {
                "person_id":"*****",        //员工id
                "project_id":"*****",       //所属项目id 
                "person_num":"*****",       //员工编号
                "name":"*****",             //姓名 
                "id_photo":key,             //证件照片
                "head_portrait":"key"       //系统头像
             },
             {***}
          ]
        },
        { 
          "position":"*****",               //岗位
          "persons":[                       //员工数组
             {
                "person_id":"*****",        //员工id
                "project_id":"*****",       //所属项目id 
                "person_num":"*****",       //员工编号
                "name":"*****",             //姓名 
                "id_photo":key,             //证件照片
                "head_portrait":"key"       //系统头像
             },
             {***}
          ]
        }
      ],
      "Count": 2,
    }
	
后台：接口实现注意事项：

	1、同岗位下的员工排序为创建时间倒序；	
	2、岗位顺序可以为人员排序后，人员信息中岗位出现的先后顺序；

### 人员信息-新增页:数据字典-专业
>http://localhost:8080/saas/restGeneralDictService/queryGeneralDictByKey

post请求

参数例子：

    {
      "user_id":"***",                    //员工id-当前操作人id，必须
      "project_id":"***",                 //项目id，必须
      "dict_type": "domain_require"       //字典类型
    } 

返回值参见通用数据字典

### 人员信息-新增页:查询项目下标签列表
>http://localhost:8080/saas/restPersonService/queryPersonTagsByProjectId

post请求

参数例子：

    {
      "user_id":"*****",         //员工id-当前操作人id，必须
      "project_id":"*****"       //项目id，必须
    } 

返回例子：

    {
      "Result": "success",
      "Item":{
         "custom_tags":["***","***"]     		//自定义标签
      }
    }
 
后台：接口实现注意事项：

	1、查询该项目下在职人员的标签列表；	
	   
### 人员信息-新增页:添加人员信息
>http://localhost:8080/saas/restPersonService/addPerson

post请求

参数例子：

    {
      "user_id":"*****",                //员工id-当前操作人id，必须
      "project_id":"*****",             //项目id ,必须
      "name":"*****",                   //姓名 ,必须
      "id_number":"*****",              //身份证号码 ,必须
      "phone_num":"*****",              //手机号 ,必须
      "gender":"*****",                 //性别，male-男、female-女,必须
      "birthday":"yyyy-MM-dd",          //出生年月
      "person_num":"*****",             //员工编号
      "position":"*****",               //岗位
      "custom_tag":["***","***"],       //自定义标签
      "specialty":["***","***"],        //专业编码
      "id_photo":key,                   //证件照片
      "head_portrait":"key",            //系统头像
      "roles":{role_id:role_name,role_id:role_name}  //角色
    } 

成功返回例子：

    {
      "Result": "success",
      "ResultMsg": "",
    }

失败返回例子：

    {
      "Result": "failure",
      "ResultMsg": ""
    }
       
### 人员信息-详细页:根据查询人员详细信息
>http://localhost:8080/saas/restPersonService/queryPersonDetailById

post请求

参数例子：

    {
      "user_id":"*****",                //员工id-当前操作人id，必须
      "project_id":"*****",       		//项目id ,必须
      "person_id": "****"               //人员id,必须
    }         

返回例子：

    {
      "Result": "success",
      "Item":{
          "person_id":"*****",              //员工id
          "project_id":"*****",             //所属项目id 
          "name":"*****",                   //姓名 
          "id_number":"*****",              //身份证号码
          "phone_num":"*****",              //手机号 
          "gender":"*****",                 //性别，male-男、female-女
          "birthday":"yyyy-MM-dd",          //出生年月
          "person_num":"*****",             //员工编号
          "position":"*****",               //岗位
          "custom_tag":["***","***"],       //自定义标签
          "specialty":["***","***"],        //专业编码
          "specialty_name":[                //已选中专业对象
              {"code":"***","name":"***"},
              {***}
           ],
          "id_photo":key,                   //证件照片
          "head_portrait":"key",            //系统头像
          "person_status":"1",              //人员状态, 1-在职，0-离职
          "roles":{role_id:role_name,role_id:role_name}  //角色
          }
    } 
    
### 人员信息-详细页:根据Id废弃（离职）人员信息
>http://localhost:8080/saas/restPersonService/discardPersonById

post请求

参数例子：

    {
      "user_id":"*****",                //员工id-当前操作人id，必须
      "project_id":"*****",             //项目id ,必须
      "person_id": "****"               //人员id,必须
    }         

成功返回例子：

    {
      "Result": "success",
      "ResultMsg": "",
    }

失败返回例子：

    {
      "Result": "failure",
      "ResultMsg": ""
    } 

### 人员信息-详细页:根据Id恢复已废弃的人员信息
>http://localhost:8080/saas/restPersonService/regainPersonById

post请求

参数例子：

    {
      "user_id":"*****",                //员工id-当前操作人id，必须
      "project_id":"*****",       		//项目id ,必须
      "person_id": "****"               //人员id,必须
    }         

成功返回例子：

    {
      "Result": "success",
      "ResultMsg": "",
    }

失败返回例子：

    {
      "Result": "failure",
      "ResultMsg": ""
    } 
    
### 人员信息-编辑页:根据Id编辑人员信息
>http://localhost:8080/saas/restPersonService/updatePersonById

post请求

参数例子：

    {
      "user_id":"*****",                //员工id-当前操作人id，必须
      "project_id":"*****",             //项目id ,必须
      "person_id": "****",              //人员id,必须
      "name":"*****",                   //姓名 ,必须
      "id_number":"*****",              //身份证号码 ,必须
      "phone_num":"*****",              //手机号 ,必须
      "gender":"*****",                 //性别，male-男、female-女,必须
      "birthday":"yyyy-MM-dd",          //出生年月
      "person_num":"*****",             //员工编号
      "position":"*****",               //岗位
      "custom_tag":["***","***"],       //自定义标签
      "specialty":["***","***"],        //专业编码
      "id_photo":key,                   //证件照片
      "head_portrait":"key",            //系统头像
      "roles":{role_id:role_name,role_id:role_name}  //角色
    }         

成功返回例子：

    {
      "Result": "success",
      "ResultMsg": "",
    }

失败返回例子：

    {
      "Result": "failure",
      "ResultMsg": ""
    } 

## 角色管理
### 角色管理-列表页:查询角色列表
>http://localhost:8080/saas/restRoleService/queryRoleList

post请求

参数例子：

    {
      "user_id":"*****",         //员工id-当前操作人id，必须
      "project_id":"*****"       //项目id，必须
    } 

返回例子：

    {
      "Result": "success",
      "Content": [
        {
          "role_id":"*****",                //员工id
          "project_id":"*****",             //所属项目id 
          "role_name":"*****",              //角色名称
          "func_pack_ids":[id,id],          //功能权限组
          "func_pack_names":[name,name]     //功能权限组
        },
        {
          "role_id":"*****",                //员工id
          "project_id":"*****",             //所属项目id 
          "role_name":"*****",              //角色名称
          "func_pack_ids":[id,id],          //功能权限组
          "func_pack_names":[name,name]     //功能权限组
        }
      ],
      "Count": 2,
    }
	
后台：接口实现注意事项：

	1、数据来源：角色表role；	
	2、func_pack_names数据来源 :功能包表function_pack；
	
### 角色管理-新增/编辑页:查询权限项列表
>http://localhost:8080/saas/restRoleService/queryFuncPackList

post请求

参数例子：

    {
      "user_id":"*****"    		//员工id-当前操作人id，必须
    } 

返回例子：

    {
      "Result": "success",
      "Content": [
        {
          "func_pack_id":"*****",      	//权限项id
          "func_pack_name":"*****",    	//权限项名称
          "description":"*****"    		//描述
        },
        {
          "func_pack_id":"*****",      	//权限项id
          "func_pack_name":"*****",    	//权限项名称
          "description":"*****"    		//描述
        }
      ],
      "Count": 2,
    }


后台：接口实现注意事项：

	1、数据来源：功能包表function_pack；	
	2、列表排序默认按照创建时间正序排列；

### 角色管理-新增页:添加角色信息
>http://localhost:8080/saas/restRoleService/addRole

post请求

参数例子：

    {
      "user_id":"*****",                //员工id-当前操作人id，必须
      "project_id":"*****",             //项目id ,必须
      "role_name":"*****",              //角色姓名 ,必须
      "func_pack_ids":[id,id]           //功能权限组，具有的权限,必须
    } 

成功返回例子：

    {
      "Result": "success",
      "ResultMsg": "",
    }

失败返回例子：

    {
      "Result": "failure",
      "ResultMsg": ""
    }

### 角色管理-详细页:根据id查询角色详细信息
>http://localhost:8080/saas/restRoleService/queryRoleDetailById

post请求

参数例子：

    {
      "user_id":"*****",                //员工id-当前操作人id，必须
      "role_id":"*****"                 //角色id ,必须
    }         

返回例子：

    {
      "Result": "success",
      "Item":{
          "role_id":"*****",                //角色id
          "project_id":"*****",             //项目id
          "role_name":"*****",              //角色姓名
          "func_pack_list":[                //功能权限组，具有的权限
             {
                "func_pack_id":"*****",     //权限项id
                "func_pack_name":"*****",   //权限项名称
                "description":"*****"    	//描述
             },
             {
                "func_pack_id":"*****",     //权限项id
                "func_pack_name":"*****",   //权限项名称
                "description":"*****"    	//描述
             }
          ]          
      }
    } 
    
### 角色管理-编辑页:根据id查询角色功能权限信息
>http://localhost:8080/saas/restRoleService/queryRoleFuncPack

post请求

参数例子：

    {
      "user_id":"*****",                //员工id-当前操作人id，必须
      "role_id":"*****"                 //角色id ,必须
    }         

返回例子：

    {
      "Result": "success",
      "Item":{
          "role_id":"*****",                //角色id
          "project_id":"*****",             //项目id
          "role_name":"*****",              //角色姓名
          "func_pack_ids":[id,id]           //功能权限组，具有的权限          
      }
    } 
    
### 角色管理-编辑页:根据Id编辑角色信息
>http://localhost:8080/saas/restRoleService/updateRoleById

post请求

参数例子：

    {
      "user_id":"*****",                //员工id-当前操作人id，必须
      "role_id":"*****",                //角色id ,必须
      "project_id":"*****",             //项目id ,必须
      "role_name":"*****",              //角色姓名 ,必须
      "func_pack_ids":[id,id]           //功能权限组，具有的权限,必须
    }         

成功返回例子：

    {
      "Result": "success",
      "ResultMsg": "",
    }

失败返回例子：

    {
      "Result": "failure",
      "ResultMsg": ""
    } 

# 工单管理
## 工单数据格式
### 保存工单草稿

参数例子：
     
    {
      "user_id":"***",                    //员工id-当前操作人id，必须
      "order_id":"***",                   //工单id，id为空时新增，不为空时是修改
      "project_id":"***",                 //项目id，必须
      "order_type":"***",                 //工单类型
	  "order_type_name":"***",            //工单类型名称
      "urgency":"***",                    //紧急程度，高、中、低
	  "start_time_type":"1",              //开始时间类型,1-发单后立即开始，2-自定义开始时间
	  "ask_start_time":"20170620180000",  //要求开始时间,yyyyMMddhhmmss
	  "ask_end_limit":"2",                //要求固定时间内完成,单位小时
	  "ask_end_time":"20170622180000",    //要求结束时间,yyyyMMddhhmmss
      "input_mode":"1",                   //输入方式，1-自由输入，2-结构化输入
      "order_from_id":"***",              //工单来源id，报修转工单时，这里是报修单id
	  "matters":[                         //步骤信息
		  {	
	  	    "matter_name":"***",          //事项名称
	  	    "description":"****",         //事项描述
	  	    "desc_forepart":"****",       //描述内容前段,结构化时用
	  	    "desc_aftpart":"****",        //描述内容后段,结构化时用
	  	    "desc_photos":[key1,key2],    //描述中的图片
	  	    "desc_objs":[                 //描述中涉及的对象				  
	  	       {
	  	          "obj_id:"***",          //对象id，obj_name有值，obj_id没有值时代表是自定义对象
	  	          "obj_name:"对象名称1"    //对象名称
	  	       },
	  	       {***}
	  	    ],
	  	    "desc_sops":[                 //描述中涉及的sop	
	  	       {
	  	          "sop_id:"***",          //sop的id
	  	          "sop_name:"对象名称1",   //sop名称
	  	          "version":"V1.3"        //sop版本
	  	       },
	  	       {***}
	  	    ],
	  	    "desc_works":[                //描述中涉及的工作内容	
	  	       {  
	  	          "work_name":"***",      //工作内容名称
	  	          "pre_conform":"*****",  //强制确认
	  	          "content":"***",        //操作内容
	  	          //操作内容中涉及的对象
	  	          "content_objs":[
	  	             {
	  	                "obj_id:"***",	        //对象id
	  	                "obj_name:"对象名称1",	//对象名称
	  	                "obj_type":"equip"      //对象类型,子项见后边
	  	             },
	  	             {....}
	  	          ],   
	  	          "notice""***",        //注意事项
	  	          "confirm_result":[	//需确认的操作结果
	  	             {
	  	                "obj_id:"***",
	  	                "obj_name:"***",
	  	                "obj_type":"***",
	  	                "parents":[
	  	                   {"parent_ids":["***","***","***"],"parent_names":["建筑1","楼层1","空间"]},
	  	                   {"parent_ids":["***","***"],"parent_names":["专业1","系统1"]},
	  	                   {"parent_ids":["***","***","***"],"parent_names":["专业1","系统大类","设备大类"]}
	  	                ]
	  	                "info_points":[  
	  	                   {  "id":"***","code":"****","name":"****"},
	  	                   {  "id":"***","code":"****","name":"****"}
	  	                ],
	  	                "customs":[//自定义项，type：1-文本，2-单选，3-多选,4、无单位的数字,5、有单位的数字
	  	                   {  "name":"确认信息2","type":"1"},
	  	                   {  "name":"确认信息2","type":"2","items":["选项1","选项2","选项3"]},
	  	                   {  "name":"确认信息3","type":"3","items":["选项1","选项2","选项3"]},
	  	                   {  "name":"确认信息4","type":"4"},
	  	                   {  "name":"确认信息5","type":"5","unit":"***"}
	  	                ]
	  	             }，
	  	             {...}
	  	          ],
	  	          "domain":"***",                //专业code
	  	          "domain_name":"***"            //专业名称
	  	       },
	  	       {***}
	  	    ],
	  	    "required_control":[code,code]
		 },
		 {***}
	  ],     
	  
    }
### 查看工单详细-草稿
 
 返回结果中Item的数据格式如下：
  
      {
         "order_id":"***",                   //工单id
         "project_id":"***",                 //项目id
         "order_type":"***",                 //工单类型
	     "order_type_name":"***",            //工单类型名称
         "urgency":"***",                    //紧急程度，高、中、低
	     "start_time_type":"1",              //开始时间类型,1-发单后立即开始，2-自定义开始时间
	     "ask_start_time":"20170620180000",  //要求开始时间,yyyyMMddhhmmss
	     "ask_end_limit":"2.5",              //要求固定时间内完成,单位小时
	     "ask_end_time":"20170622180000",    //要求结束时间,yyyyMMddhhmmss
         "input_mode":"1",                   //输入方式，1-自由输入，2-结构化输入
         "order_from_type":"***",            //工单来源类型,1-正常创建，2-工单计划，3-报修转工单，默认1
         "order_from_id":"***",              //工单来源id，报修转工单时，这里是报修单id
	     "matters":[                         //步骤信息
		    {	
	  	       "matter_name":"***",          //事项名称
	  	       "description":"****",         //事项描述
	  	       "desc_forepart":"****",       //描述内容前段,结构化时用
	  	       "desc_aftpart":"****",        //描述内容后段,结构化时用
	  	       "desc_photos":[key1,key2],    //描述中的图片
	  	       "desc_objs":[                 //描述中涉及的对象				  
	  	          {
	  	             "obj_id:"***",          //对象id，obj_name有值，obj_id没有值时代表是自定义对象
	  	             "obj_name:"对象名称1"    //对象名称
	  	          },
	  	          {***}
	  	       ],
	  	       "desc_sops":[                 //描述中涉及的sop	
	  	          {
	  	             "sop_id:"***",          //sop的id
	  	             "sop_name:"对象名称1",   //sop名称
	  	             "version":"V1.3"        //sop版本
	  	          },
	  	          {***}
	  	       ],
	  	       "desc_works":[                //描述中涉及的工作内容	
	  	          {  
	  	             "work_name":"***",      //工作内容名称
	  	             "pre_conform":"*****",  //强制确认
	  	             "content":"***",        //操作内容
	  	             //操作内容中涉及的对象
	  	             "content_objs":[
	  	                {
	  	                   "obj_id:"***",	        //对象id
	  	                   "obj_name:"对象名称1",    //对象名称
	  	                   "obj_type":"equip"       //对象类型,子项见后边
	  	                },
	  	                {....}
	  	             ],   
	  	             "notice""***",        //注意事项
	  	             "confirm_result":[	   //需确认的操作结果
	  	                {
	  	                   "obj_id:"***",
	  	                   "obj_name:"***",
	  	                   "obj_type":"***",
	  	                   "parents":[
	  	                      {"parent_ids":["***","***","***"],"parent_names":["建筑1","楼层1","空间"]},
	  	                      {"parent_ids":["***","***"],"parent_names":["专业1","系统1"]},
	  	                      {"parent_ids":["***","***","***"],"parent_names":["专业1","系统大类","设备大类"]}
	  	                   ]
	  	                   "info_points":[  
	  	                      {  "id":"***","code":"****","name":"****"},
	  	                      {  "id":"***","code":"****","name":"****"}
	  	                   ],
	  	                   "customs":[//自定义项，type：1-文本，2-单选，3-多选,4、无单位的数字,5、有单位的数字
	  	                      {  "name":"确认信息1","type":"1"},
	  	                      {  "name":"确认信息2","type":"2","items":["选项1","选项2","选项3"]},
	  	                      {  "name":"确认信息3","type":"3","items":["选项1","选项2","选项3"]},
	  	                      {  "name":"确认信息4","type":"4"},
	  	                      {  "name":"确认信息5","type":"5","unit":"***"}
	  	                   ]
	  	                }，
	  	                {...}
	  	             ],
	  	             "domain":"***",	             //专业code
	  	             "domain_name":"***"	         //专业名称
	  	          },
	  	          {***}
	  	       ],
	  	       "required_control":[code,code]
		    },
		    {***}
	     ]          
      }

### 查看工单详细-预览

返回例子：

    {
      "Result": "success",
      "Item":{
          "wo_body":{},               //工单主体数据,格式同工单详细，事项-对象-步骤中没有feedback,具体格式见后面    			
    } 


	1 wo_body 格式参见如下：
	
	{
      "order_id":"***",                   //工单id，id为空时新增，不为空时是修改
      "project_id":"***",                 //项目id
      "order_type":"***",                 //工单类型
	  "order_type_name":"***",            //工单类型名称
	  "execute_type":"***",               //工单执行类型编码,数据字典查名称
      "urgency":"***",                    //紧急程度，高、中、低
      "executie_mode" :"***",             //工单执行方式编码,数据字典查名称
	  "start_time_type":"1",              //开始时间类型,1-发单后立即开始，2-自定义开始时间
	  "ask_start_time":"20170620180000",  //要求开始时间,yyyyMMddhhmmss
	  "ask_end_limit":"2",                //要求固定时间内完成,单位小时
	  "ask_end_time":"20170622180000",    //要求结束时间,yyyyMMddhhmmss
	  "required_tools":["***","***"],     //所需工具
	  "summary":"***",                    //工单概述,事项名称的串连
	  "order_from_type":"***",            //工单来源类型,1-正常创建，2-工单计划，3-报修转工单，默认1
	  "order_from_id":"***",              //工单来源id，报修转工单时，这里是报修单id
      "domain_list":[code1,code2],        //工单中专业列表，code
      "matters":[                         //工单事项
         {	
            "$ID":"***",                  //引擎需要的id，同matter_id，后台使用
            "matter_id":"***",            //事项id
            "matter_name":"***",          //事项名称
            "matter_steps":[              //事项步骤				
               {
                  "$ID":"***",            //引擎需要的id，同obj_step_id，后台使用
                  "obj_step_id":"***",    //对象步骤id
                  "description":"***",    //事项概述
                  "obj_id":"***",         //对象id，可能为空
                  "obj_name":"***",       //对象名称 ，可能为空
                  "steps":[               //步骤
                     {
                        "step_id":"***",             //步骤id,obj_step_id+"_"+step_sequence组成
                        "step_sequence":"1-1",       //步骤序号 
                        "step_type":"3",             //步骤类型：1-文字输入,2-上传照片,3-拍照,4-扫码,5-工作内容,6-签字,
                        "content":"到达指定位置拍照"    //操作内容描述
                     },
                     {
                        "step_id":"***",             //步骤id,obj_step_id+"_"+step_sequence组成
                        "step_sequence":"1-2",       //步骤序号 
                        "step_type":"4",             //步骤类型：1-文字输入,2-上传照片,3-拍照,4-扫码,5-工作内容,6-签字,
                        "content":"到达指定位置扫码"    //操作内容描述
                     },
                     {
                        "step_id":"***",             //步骤id,obj_step_id+"_"+step_sequence组成
                        "step_sequence":"2-1",       //步骤序号 
                        "step_type":"5",              
                        "pre_conform":"*****",       //强制确认
                        "content":"***",             //操作内容
                        //操作内容中涉及的对象
                        "content_objs":[
                           {
                              "obj_id":"***",           //对象id
                              "obj_name":"对象名称1",    //对象名称
                              "obj_type":"equip"        //对象类型,子项见后边
                           },
                           {....}
                        ],   
                        "notice""***",                //注意事项
                        "confirm_result":[	          //需确认的操作结果
                           {
                              "obj_id:"***",
                              "obj_name:"***",
                              "obj_type":"***",
                              "parents":[
	  	                         {"parent_ids":["***","***","***"],"parent_names":["建筑1","楼层1","空间"]},
	  	                         {"parent_ids":["***","***"],"parent_names":["专业1","系统1"]}
                              ]
                              "info_points":[			//信息点组件数据源类型-待定
	  	                         {  "id":"***","code":"***","name":"***","unit":"***","cmpt":"A"},
	  	                         {  "id":"***","code":"***","name":"***","unit":"***","cmpt":"B","cmpt_data":[***]}
                              ],
                              "customs":[//自定义项，type：1-文本，2-单选，3-多选,4、无单位的数字,5、有单位的数字
	  	                         {  "name":"确认信息2","type":"1"},
	  	                         {  "name":"确认信息2","type":"2","items":["选项1","选项2","选项3"]},
	  	                         {  "name":"确认信息3","type":"3","items":["选项1","选项2","选项3"]},
	  	                         {  "name":"确认信息4","type":"4"},
	  	                         {  "name":"确认信息5","type":"5","unit":"***"}
                              ]
                           },
                           {...}
                        ],
                        "domain":"***",               //专业code
                        "domain_name":"***"           //专业名称
                     },
                     {
                        "step_id":"***",             //步骤id,obj_step_id+"_"+step_sequence组成
                        "step_sequence":"2-2",       //步骤序号 
                        "step_type":"5",              
                        "pre_conform":"*****",       //强制确认
                        "content":"***",             //操作内容
                        //操作内容中涉及的对象
                        "content_objs":[
                           {
                              "obj_id":"***",         //对象id
                              "obj_name":"对象名称1",  //对象名称
                              "obj_type":"equip"      //对象类型,子项见后边
                           },
                           {....}
                        ],   
                        "notice""***",                //注意事项
                        "confirm_result":[	          //需确认的操作结果
                           {
                              "obj_id:"***",
                              "obj_name:"***",
                              "obj_type":"***",
                              "parents":[
	  	                         {"parent_ids":["***","***","***"],"parent_names":["建筑1","楼层1","空间"]},
	  	                         {"parent_ids":["***","***"],"parent_names":["专业1","系统1"]}
                              ]
                              "info_points":[			//信息点组件数据源类型-待定
	  	                         {  "id":"***","code":"***","name":"***","unit":"***","cmpt":"A"},
	  	                         {  "id":"***","code":"***","name":"***","unit":"***","cmpt":"B","cmpt_data":[{"code": "***","name": "***"},{***}]}
                              ],
                              "customs":[//自定义项，type：1-文本，2-单选，3-多选,4、无单位的数字,5、有单位的数字
	  	                         {  "name":"确认信息1","type":"1"},
	  	                         {  "name":"确认信息2","type":"2","items":["选项1","选项2","选项3"]},
	  	                         {  "name":"确认信息3","type":"3","items":["选项1","选项2","选项3"]},
	  	                         {  "name":"确认信息4","type":"4"},
	  	                         {  "name":"确认信息5","type":"5","unit":"***"}
                              ]
                           },
                           {...}
                        ],
                        "domain":"***",              //专业code
                        "domain_name":"***"          //专业名称
                     },
                     {***}
                  ]
		       },
		       {
		          "$ID":"***",            //引擎需要的id，同obj_step_id，后台使用
		          "obj_step_id":"***",    //对象步骤id
		          "steps":[               //步骤
		             {
		                "step_id":"***",             //步骤id,obj_step_id+"_"+step_sequence组成
		                "step_sequence":"3-1",       //步骤序号 
		                "step_type":"6",             //步骤类型：1-文字输入，3-拍照，4-扫码、5-工作内容、6-签字，
		                "content":"结束该事项时签字"   //操作内容描述
		             } 
		          ]
		       },
		       {***}
            ],
            "desc_photos":[key1,key2],    //描述中的图片
            "desc_sops":[                 //描述中涉及的sop	
	  	       {
	  	          "sop_id:"***",          //sop的id
	  	          "sop_name:"对象名称1",   //sop名称
	  	          "version":"V1.3"        //sop版本
	  	       },
			   {***}
            ],
			
		 },
		 {***}
	  ]                
      "create_time":"20170620093000",     //创建时间，yyyyMMddhhmmss
      "valid":true                        //有效状态 true：有效，false：失效
    }
          
### 查看工单详细-已发布

返回例子：

    {
      "Result": "success",
      "Item":{
          "work_order":{                    //工单令牌信息,
                "order_id":"***",           //工单id
                "wo_body":{}                //工单主体数据,格式见后面
          }       			
    } 


	1 wo_body 格式参见如下：
	
	{
      "order_id":"***",                   //工单id，id为空时新增，不为空时是修改
      "project_id":"***",                 //项目id，必须
      "order_type":"***",                 //工单类型
	  "order_type_name":"***",            //工单类型名称
	  "execute_type":"***",               //工单执行类型编码,数据字典查名称
      "urgency":"***",                    //紧急程度，高、中、低
      "executie_mode" :"***",             //工单执行方式编码,数据字典查名称
	  "start_time_type":"1",              //开始时间类型,1-发单后立即开始，2-自定义开始时间
	  "ask_start_time":"20170620180000",  //要求开始时间,yyyyMMddhhmmss
	  "ask_end_limit":"2",                //要求固定时间内完成,单位小时
	  "ask_end_time":"20170622180000",    //要求结束时间,yyyyMMddhhmmss
	  "required_tools":["***","***"],     //所需工具
	  "order_state":"***",                //工单状态编码
	  "order_state_name":"***",           //工单状态名称
	  "custom_state":"***",               //工单自定义状态编码
	  "custom_state_name":"***",          //工单自定义状态名称
	  "summary":"***",                    //工单概述,事项名称的串连
	  "order_from_type":"***",            //工单来源类型,1-正常创建，2-工单计划，3-报修转工单，默认1
	  "order_from_id":"***",              //工单来源id，报修转工单时，这里是报修单id
      "creator_id":"***" ,                //创建人id
      "creator_name":"***",               //创建人名字
      "domain_list":[code1,code2],        //工单中专业列表，code
      "limit_domain":true,                //专业限制
      "matters":[                         //工单事项
         {	
            "$ID":"***",                  //引擎需要的id，同matter_id，后台使用
            "matter_id":"***",            //事项id
            "matter_name":"***",          //事项名称
            "matter_steps":[              //事项步骤				
               {
                  "$ID":"***",            //引擎需要的id，同obj_step_id，后台使用
                  "obj_step_id":"***",    //对象步骤id
                  "description":"***",    //事项概述
                  "obj_id":"***",         //对象id，可能为空
                  "obj_name":"***",       //对象名称 ，可能为空
                  "steps":[               //步骤
                     {
                        "step_id":"***",             //步骤id,obj_step_id+"_"+step_sequence组成
                        "step_sequence":"1-1",       //步骤序号 
                        "step_type":"3",             //步骤类型：1-文字输入,2-上传照片,3-拍照,4-扫码,5-工作内容,6-签字,
                        "content":"到达指定位置拍照"    //操作内容描述
                     },
                     {
                        "step_id":"***",             //步骤id,obj_step_id+"_"+step_sequence组成
                        "step_sequence":"1-2",       //步骤序号 
                        "step_type":"4",             //步骤类型：1-文字输入,2-上传照片,3-拍照,4-扫码,5-工作内容,6-签字,
                        "content":"到达指定位置扫码"    //操作内容描述
                     },
                     {
                        "step_id":"***",             //步骤id,obj_step_id+"_"+step_sequence组成
                        "step_sequence":"2-1",       //步骤序号 
                        "step_type":"5",              
                        "pre_conform":"*****",       //强制确认
                        "content":"***",             //操作内容
                        //操作内容中涉及的对象
                        "content_objs":[
                           {
                              "obj_id":"***",           //对象id
                              "obj_name":"对象名称1",    //对象名称
                              "obj_type":"equip"        //对象类型,子项见后边
                           },
                           {....}
                        ],   
                        "notice""***",                //注意事项
                        "confirm_result":[	          //需确认的操作结果
                           {
                              "obj_id:"***",
                              "obj_name:"***",
                              "obj_type":"***",
                              "parents":[
	  	                         {"parent_ids":["***","***","***"],"parent_names":["建筑1","楼层1","空间"]},
	  	                         {"parent_ids":["***","***"],"parent_names":["专业1","系统1"]}
                              ]
                              "info_points":[			//信息点组件数据源类型-待定
	  	                         {  "id":"***","code":"***","name":"***","unit":"***","cmpt":"A"},
	  	                         {  "id":"***","code":"***","name":"***","unit":"***","cmpt":"B","cmpt_data":[***]}
                              ],
                              "customs":[//自定义项，type：1-文本，2-单选，3-多选,4、无单位的数字,5、有单位的数字
	  	                         {  "name":"确认信息2","type":"1"},
	  	                         {  "name":"确认信息2","type":"2","items":["选项1","选项2","选项3"]},
	  	                         {  "name":"确认信息3","type":"3","items":["选项1","选项2","选项3"]},
	  	                         {  "name":"确认信息4","type":"4"},
	  	                         {  "name":"确认信息5","type":"5","unit":"***"}
                              ]
                           },
                           {...}
                        ],
                        "domain":"***",               //专业code
                        "domain_name":"***"           //专业名称
                     },
                     {
                        "step_id":"***",             //步骤id,obj_step_id+"_"+step_sequence组成
                        "step_sequence":"2-2",       //步骤序号 
                        "step_type":"5",              
                        "pre_conform":"*****",       //强制确认
                        "content":"***",             //操作内容
                        //操作内容中涉及的对象
                        "content_objs":[
                           {
                              "obj_id":"***",         //对象id
                              "obj_name":"对象名称1",  //对象名称
                              "obj_type":"equip"      //对象类型,子项见后边
                           },
                           {....}
                        ],   
                        "notice""***",                //注意事项
                        "confirm_result":[	          //需确认的操作结果
                           {
                              "obj_id:"***",
                              "obj_name:"***",
                              "obj_type":"***",
                              "parents":[
	  	                         {"parent_ids":["***","***","***"],"parent_names":["建筑1","楼层1","空间"]},
	  	                         {"parent_ids":["***","***"],"parent_names":["专业1","系统1"]}
                              ]
                              "info_points":[			//信息点组件数据源类型-待定
	  	                         {  "id":"***","code":"***","name":"***","unit":"***","cmpt":"A"},
	  	                         {  "id":"***","code":"***","name":"***","unit":"***","cmpt":"B","cmpt_data":[{"code": "***","name": "***"},{***}]}
                              ],
                              "customs":[//自定义项，type：1-文本，2-单选，3-多选,4、无单位的数字,5、有单位的数字
	  	                         {  "name":"确认信息1","type":"1"},
	  	                         {  "name":"确认信息2","type":"2","items":["选项1","选项2","选项3"]},
	  	                         {  "name":"确认信息3","type":"3","items":["选项1","选项2","选项3"]},
	  	                         {  "name":"确认信息4","type":"4"},
	  	                         {  "name":"确认信息5","type":"5","unit":"***"}
                              ]
                           },
                           {...}
                        ],
                        "domain":"***",              //专业code
                        "domain_name":"***"          //专业名称
                     },
                     {***}
                  ],  
                  "feedback" :[                     //反馈信息
                     {
                        "$ID"："****",              //引擎需要的id，同step_id，后台使用
                        "step_id":"***",            //步骤id
                        "step_sequence":"1-1",      //步骤序号 
                        "step_type":"5",            //步骤类型：1-文字输入,2-上传照片,3-拍照,4-扫码,5-工作内容,6-签字,
                        "pre_conform_result":"前提已确认",	//前提确认结果
                        "description"："****",      //反馈描述
                        "confirm_result":[	          //需确认的操作结果
                           {
                              "obj_id:"***",
                              "obj_name:"***",
                              "info_points":[			  //信息点信息反馈
	  	                         { "id":"***","code":"***","name":"***","unit":"***","value":"123"},//单值
	  	                         { "id":"***","code":"***","name":"***","unit":"***","values":["123","456"]}//数组值
                              ],
                              "customs":[//自定义项反馈，type：1-文本，2-单选，3-多选,4、无单位的数字,5、有单位的数字
	  	                         { "name":"确认信息1","type":"1","content": "****" },
	  	                         { "name":"确认信息2","type":"2","item":"***"},
	  	                         { "name":"确认信息3","type":"3","items":["***","***"]},
	  	                         { "name":"确认信息4","type":"4","value":"123" },
	  	                         { "name":"确认信息5","type":"5","value":"456","unit":"***"}
                              ]
                           },
                           {...}
                        ],
                        "photos":["key"，"key"],//图片key
                        "executor_id":"***",//执行人Id
                        "operate_time" //操作时间，yyyyMMddHHmmss
                     },
                     {
                        "step_sequence":"1-1",       //步骤序号 
                        "step_type":"3",             //步骤类型：1-文字输入，3-拍照，4-扫码、5-工作内容、6-签字，
                        "content":"到达指定位置拍照" //操作内容描述
                     },
                     {***}
		          ], 
		          "executors":["name1","name2"]     //执行人
		       },
		       {
		          "$ID":"***",            //引擎需要的id，同obj_step_id，后台使用
		          "obj_step_id":"***",    //对象步骤id
		          "steps":[               //步骤
		             {
		                "step_id":"***",             //步骤id,obj_step_id+"_"+step_sequence组成
		                "step_sequence":"3-1",       //步骤序号 
		                "step_type":"6",             //步骤类型：1-文字输入，3-拍照，4-扫码、5-工作内容、6-签字，
		                "content":"结束该事项时签字"   //操作内容描述
		             } 
		          ],
		          "feedback" :[                     //反馈信息
		             {
		                "$ID"："****",             //引擎需要的id，同step_id，后台使用
		                "step_id":"***",           //步骤id
		                "step_sequence":"3-1",     //步骤序号 
		                "description"："****",     //反馈描述
		                "photos":["key"，"key"],   //图片key
		                "executor_id":"***",       //执行人Id
		                "operate_time"             //操作时间，yyyyMMddHHmmss
		             },
		             {***}
		          ], 
		          "executors":["name1","name2"]     //执行人
		       },
		       {***}
            ],
            "desc_photos":[key1,key2],    //描述中的图片
            "desc_sops":[                 //描述中涉及的sop	
	  	       {
	  	          "sop_id:"***",          //sop的id
	  	          "sop_name:"对象名称1",   //sop名称
	  	          "version":"V1.3"        //sop版本
	  	       },
			   {***}
            ],
			
		 },
		 {***}
	  ],          
      "wo_exec_controls":[                //执行控制信息
		  {
			"$ID":"****",                 //引擎需要的id，同exec_control_id，后台使用
			"exec_control_id":"***",
			"control_code":"***",         //控制模板编码,名称查询数据字典
			"operator_id":"***",          //操作人id
			"operator_name":"***",        //操作人名字
			"operate_start_time":"***",   //操作开始时间, yyyyMMddHHmmss
			"operate_end_time":"***",     //操作结束时间, yyyyMMddHHmmss
			"apply_type":"finish",        //申请类型，finish-正常结束，stop-中止
			"audit_result" :"***",        //审核结果,1-通过，0-不通过
			"opinion" :"***",             //意见
			"next_route":["xx岗位","张杰" ], //下级路由
			"create_time":"***"           //操作时间, yyyyMMddHHmmss
		  },
         {...}
	  ],       
      "publish_time":"20170620093000",    //发布时间，yyyyMMddhhmmss
      "create_time":"20170620093000",     //创建时间，yyyyMMddhhmmss
      "close_time":"20170620093000",      //结束时间，yyyyMMddhhmmss
      "valid":true                        //有效状态 true：有效，false：失效
    }


## 我的工单
### 我的工单-列表页:查询当前用户能使用的工单类型
>http://localhost:8080/saas/restGeneralDictService/queryWorkOrderType

post请求

参数例子：

    {
      "user_id":"***",                    //员工id-当前操作人id，必须
      "project_id":"***",                 //项目id，必须
      "dict_type": "work_order_type"      //工单类型，必须
    } 

返回例子：

    {
      "Result": "success",
      "Content": [
         {"code": "1", "name": "维保", "description": "释义***"},
         {"code": "2", "name": "维修", "description": "释义***"},
         {"code": "3", "name": "巡检", "description": "释义***"},
         {"code": "4", "name": "运行", "description": "释义***"}
      ],
      "Count": 4,
    }
  
前台：接口调用注意事项：

	1、通用数据字典，每个项目有自己的定义，所以切换项目后要重新查询、加载数据字典；
	
后台：接口实现注意事项：

	1、查询当前项目下的工单方案，返回当前人有创建工单模块的工单类型合集；

### 我的工单-列表页:查询我的草稿工单
>http://localhost:8080/saas/restMyWorkOrderService/queryMyDraftWorkOrder

post请求

参数例子：

    {
      "user_id":"***",                  //员工id-当前操作人id，必须
      "project_id":"***",               //项目id 
      "order_type":"***",               //工单类型code码
      "page":1,                         //当前页号，默认从第1页开始
      "page_size":50                    //每页返回数量，不传时不分页
    } 

返回例子：

    {
      "Result": "success",
      "Content": [
        {
          "order_id":"***",           //工单id
          "order_type":"***",         //工单类型
          "order_type_name":"***",    //工单类型名称
          "summary":"",               //工单概述
          "create_time":"***"         //创建时间,yyyyMMddHHmmss
        },
        {
          "order_id":"***",           //工单id
          "order_type":"***",         //工单类型
          "order_type_name":"***",    //工单类型名称
          "summary":"",               //工单概述
          "create_time":"***  "       //创建时间,yyyyMMddHHmmss
        }
      ],
      "Count": 2,
    } 

后台：接口实现注意事项：

	1、查询工单系统下接口；
	
### 我的工单-列表页:查询我发布的工单
>http://localhost:8080/saas/restMyWorkOrderService/queryMyPublishWorkOrder

post请求

参数例子：

    {
      "user_id":"***",                  //员工id-当前操作人id，必须
      "project_id":"***",               //项目id，必须 
      "order_type":"***",               //工单类型code码
      "page":1,                         //当前页号，必须
      "page_size":50                    //每页返回数量，必须
    } 

返回例子：

    {
      "Result": "success",
      "Content": [
        {
          "order_id":"***",                   //工单id
          "order_type":"***",                 //工单类型
          "order_type_name":"***",            //工单类型名称
          "summary":"",                       //工单概述
          "ask_start_time":"20170620180000",  //要求开始时间,yyyyMMddhhmmss
          "ask_end_time":"20170622180000",    //要求结束时间,yyyyMMddhhmmss
          "order_state":"***",                //工单状态编码
          "order_state_name":"***"            //工单状态名称
        },
        {
          "order_id":"***",                   //工单id
          "order_type":"***",                 //工单类型
          "order_type_name":"***",            //工单类型名称
          "summary":"",                       //工单概述
          "ask_start_time":"20170620180000",  //要求开始时间,yyyyMMddhhmmss
          "ask_end_time":"20170622180000",    //要求结束时间,yyyyMMddhhmmss
          "order_state":"***",                //工单状态编码
          "order_state_name":"***"            //工单状态名称
        }
      ],
      "Count": 2,
    } 

后台：接口实现注意事项：

	1、查询工单系统下接口；

### 我的工单-列表页:查询我参与的工单
>http://localhost:8080/saas/restMyWorkOrderService/queryMyParticipantWorkOrder

post请求

参数例子：

    {
      "user_id":"***",                  //员工id-当前操作人id，必须
      "project_id":"***",               //项目id，必须 
      "order_type":"***",               //工单类型code码
      "page":1,                         //当前页号，必须
      "page_size":50                    //每页返回数量，必须
    } 

返回例子：

    {
      "Result": "success",
      "Content": [
        {
          "order_id":"***",                   //工单id
          "order_type":"***",                 //工单类型
          "order_type_name":"***",            //工单类型名称
          "summary":"",                       //工单概述
          "ask_start_time":"20170620180000",  //要求开始时间,yyyyMMddhhmmss
          "ask_end_time":"20170622180000",    //要求结束时间,yyyyMMddhhmmss
          "order_state":"***",                //工单状态编码
          "order_state_name":"***"            //工单状态名称
        },
        {
          "order_id":"***",                   //工单id
          "order_type":"***",                 //工单类型
          "order_type_name":"***",            //工单类型名称
          "summary":"",                       //工单概述
          "ask_start_time":"20170620180000",  //要求开始时间,yyyyMMddhhmmss
          "ask_end_time":"20170622180000",    //要求结束时间,yyyyMMddhhmmss
          "order_state":"***",                //工单状态编码
          "order_state_name":"***"            //工单状态名称
        }
      ],
      "Count": 2,
    } 

后台：接口实现注意事项：

	1、查询工单系统下接口；

### 我的工单-列表页:删除草稿工单
>http://localhost:8080/saas/restMyWorkOrderService/deleteDraftWorkOrderById

post请求

    {
      "user_id":"***",                //员工id-当前操作人id，必须
      "order_id":"***"                //工单id ,必须
    }         

成功返回例子：

    {
      "Result": "success",
      "ResultMsg": "",
    }

失败返回例子：

    {
      "Result": "failure",
      "ResultMsg": ""
    } 
    
后台：接口实现注意事项：

	1、查询工单系统下接口；
	
### 我的工单-列表页:预览草稿工单
>http://localhost:8080/saas/restMyWorkOrderService/previewWorkOrderById

post请求

    {
      "user_id":"***",                //员工id-当前操作人id，必须
      "order_id":"***"                //工单id ,必须
    }         

返回例子：

    {
      "Result": "success",
      "Item":{
          "wo_body":{},               //工单主体数据,格式同工单详细，事项-对象-步骤中没有feedback			
    } 
  
前台：接口调用注意事项：
	
	1、返回数据中：确认结果中obj_type的类型是system_class、equip_class时代表是抽象类，页面需要红色标记出；

后台：接口实现注意事项：

	1、查询工单系统下接口；

### 我的工单-详细页:根据id查询工单详细信息-发布后的
>http://localhost:8080/saas/restMyWorkOrderService/queryWorkOrderById

post请求

参数例子：

    {
      "user_id":"***",                //员工id-当前操作人id，必须
      "order_id":"***"                //工单id ,必须
    }         

返回例子：

    {
      "Result": "success",
      "Item":{
                        数据格式见："查看工单详细-已发布"        
      }
    } 

后台：接口实现注意事项：

	1、查询工单系统下接口；

### 我的工单-详细页:查询工单的操作记录
>http://localhost:8080/saas/restMyWorkOrderService/queryOperateRecord

post请求

参数例子：

    {
      "user_id":"***",          //员工id-当前操作人id，必须
      "order_id":"***"          //工单id,必须
    }  

成功返回例子：

    {
      "Result": "success",
      "Content": [
        {
          "operator_name":"***",  //操作人姓名
          "start_time":"***",     //开始时间,yyyyMMddHHmmss 
          "use_times":"3天21小时"  //耗时
     
        },
        {
          "operator_name":"***",  //操作人姓名
          "start_time":"***",     //开始时间,yyyyMMddHHmmss 
          "use_times":"21小时43分" //耗时
        }
      ],
      "Count": 2,
    }
失败返回例子：

    {
      "Result": "failure",
      "ResultMsg": ""
    } 

前台：接口调用注意事项：
	
	1、用于工单详细页面中下边的操作记录查询，只有发布后的工单有；
	
后台：接口实现注意事项：

	1、查询工单系统下接口；
		
### 我的工单-编辑页:根据id查询工单详细信息-草稿的
>http://localhost:8080/saas/restMyWorkOrderService/queryDraftWorkOrderById

post请求

参数例子：

    {
      "user_id":"***",                //员工id-当前操作人id，必须
      "order_id":"***"                //工单id ,必须
    }         

返回例子：

    {
      "Result": "success",
      "Item":{
                        数据格式见："查看工单详细-草稿"        
      }
    } 

后台：接口实现注意事项：

	1、查询工单系统下接口；
	
### 我的工单-编辑页:编辑工单草稿
>http://localhost:8080/saas/restMyWorkOrderService/updateDraftWorkOrder
post请求

参数例子：数据格式同"保存工单草稿","order_id"不能为空;

   
成功返回例子：

    {
      "Result": "success",
      "ResultMsg": "",
    }

失败返回例子：

    {
      "Result": "failure",
      "ResultMsg": ""
    } 

前台：接口调用注意事项：
	
	1、因数据字典在每个项目下都可以自定义，工单类型、专业 保存时code和名称都要保存，便于查看详细时处理；
	2、编辑工单时，其它方法同创建工单；

后台：接口实现注意事项：

	1、调用工单系统下接口；

### 我的工单-新增页/编辑页:保存用户使用的工单输入方式
>http://localhost:8080/saas/restUserService/saveUserWoInputMode

post请求

参数例子：

    {
      "user_id":"***",                    //员工id-当前操作人id，必须
      "input_mode":"***"                  //工单输入方式，1-自由输入，2-结构化输入，必须
    } 

成功返回例子：

    {
      "Result": "success",
      "ResultMsg": "",
    }

失败返回例子：

    {
      "Result": "failure",
      "ResultMsg": ""
    }
    
前台：接口调用注意事项：

	1、用户切换工单输入方式后，存储用户所选择的工单输入方式；

后台：接口实现注意事项：

	1、数据保存到表：user_custom；	
	2、先判断表中是否存在该用户的记录，没有就添加，有就修改；
		
### 我的工单-新增页:查询用户使用的工单输入方式
>http://localhost:8080/saas/restUserService/queryUserWoInputMode

post请求

参数例子：

    {
      "user_id":"***"                     //员工id-当前操作人id，必须
    } 

成功返回例子：

    {
      "Result": "success",
      "Item": {
         "input_mode":"***"                  //工单输入方式，0-未记录过，1-自由输入，2-结构化输入
      }
      "ResultMsg": "",
    }

失败返回例子：

    {
      "Result": "failure",
      "ResultMsg": ""
    }
    
前台：接口调用注意事项：

	1、用户切换工单输入方式后，存储用户所选择的工单输入方式；

后台：接口实现注意事项：

	1、数据保存到表：user_custom；	
	2、先判断表中是否存在该用户的记录，没有就添加，有就修改；
	
	
### 我的工单-新增页:数据字典-工单管控需求
>http://localhost:8080/saas/restGeneralDictService/queryGeneralDictByKey

post请求

参数例子：

    {
      "user_id":"***",                    //员工id-当前操作人id，必须
      "project_id":"***",                 //项目id，必须
      "dict_type": "wo_control_require"   //工单管控需求，必须
    } 

返回值参见通用数据字典

前台：接口调用注意事项：

	1、通用数据字典，每个项目有自己的定义，所以切换项目后要重新查询、加载数据字典；
	2、注意@自定义对象的存储方式；


### 我的工单-新增页:选择对象

前台：接口调用注意事项：

	1、@选择对象，参考前边的"通用对象查询"；	
	
### 我的工单-新增页:查询可供选择的sop
>http://localhost:8080/saas/restSopService/querySopListForSel
post请求

参数例子：

    {
      "user_id":"***",                    //员工id-当前操作人id，必须
      "project_id":"***",                 //项目id，必须
      "sop_id": "****"                    //sop的id,当sop修订中时选择引用sop时必须传，其它情况不传
      "sop_name":"***",                   //sop名称，支持模糊查询
      "brands":["***","***"],             //品牌
      "labels":["***","***"],             //自定义标签
      "order_type":["***","***"],         //工单类型的code
      "fit_obj_ids":["***","***"],        //适用对象id
      "need_return_criteria":true	      //返回结果是否需要带筛选条件
    } 

返回例子：

    {
      "Result": "success",
      "Item": {
          "criteria":{
              "brands":["brand1","brand2",...],     //品牌
              "labels":["label1","label2",...],     //自定义标签
              "order_type":[                        //工单类型
          		    {"code":"***","name":"***"},
          	    	{"code":"***","name":"***"}
              ],		
              "fit_objs":[                          //适用对象
          		    {"obj_id":"***","obj_name":"***"},
          		    {"obj_id":"***","obj_name":"***"}
              ]
          },
          "content": [
            {
              "sop_id":"*****",         //sop的主键id、sop编号
              "sop_name":"*****",       //sop的名字
              "version":"V1.3"          //当前版本号
            },
            {
              "sop_id":"*****",         //sop的主键id、sop编号
              "sop_name":"*****",       //sop的名字
              "version":"V1.3"          //当前版本号
            }
          ],
          "count": 2
      }
    }
    
前台：接口调用注意事项：

	1、当"need_return_criteria":true 时，查询结果会带新的筛选条件；
    
后台：接口实现注意事项：

	1、直接调用sop已有接口查询；
	
### 我的工单-新增页:查询sop的详细信息
>http://localhost:8080/saas/restSopService/querySopDetailById

post请求

参数例子：

    {
      "user_id": "****",           //员工id-当前操作人id，必须
      "sop_id:"***",               //sop的id，必须
      "version:"V0.3"              //版本号，必须
    }         

返回例子：

    {
      "Result": "success",
      "Item":{
              Item内容参照后边 "sop内容数据结构详解"
          }
    } 

前台：接口调用注意事项：

	1、

后台：接口实现注意事项：

	1、直接调用sop已有接口查询；

sop内容数据结构详解

返回结果中Item的数据格式如下：

    {
      "sop_id":"***",                     //sop的id
      "project_id":"***",                 //项目id
      "sop_name":"***",                   //sop名称
	  "domains":["code1","code2"],        //专业编码
	  "order_type":["code1","code2"],     //工单类型
	  "tools":[                           //工具,编辑时来源步骤中的工具，只能在步骤中删除
		  {"tool"："name","from_step":true}, //from_step为true时代表是步骤中的工具
		  {"tool"："name","from_step":true},
		  {"tool"："name"},
	  ],  
	  "fit_objs":[                         //适用对象，适用范围中的建筑/楼层/空间/系统/设备
	  	  {
	  	    "obj_id:"***",                 //对象id
	  	    "obj_name:"对象名称1",          //对象名称
	  	    "obj_type":"system",           //对象类型,子项见后边
	  	    "is_revise":true               //待修订标记
          },
          {
	  	    "obj_id:"***",                 //对象id
	  	    "obj_name:"对象名称1",          //对象名称
	  	    "obj_type":"equip"             //对象类型,子项见后边
          },
	  ],	  
	  "brands":["name","name"],           //品牌
	  "labels":["name","name"],           //标签
	  "related_data":[                    //相关资料
		  { "name:"***", "url:"***" },
		  { "name:"***", "url:"***" }
	  ],
	  "steps":[                          //步骤信息
		  {	
	  	    "from_sop":true,             //是否引用的SOP,注意：此为多步骤sop的引用
			"sop_id":"****",             //sop_id
			"sop_name":"****",           //sop名称
			"version":"V1.3",             //sop版本
			"step_count":2,              //sop中步骤数量
			"stauts_explain":"已发布，修订中",//sop状态
			"upadte_time":"2017-09-10 10:30:32"	//最后更新时间,yyyy-MM-dd HH:mm:ss	
		  },
		  {	
	  	    "from_sop":false,            //是否是引用的SOP
	  	    "step_content":[
	  	       {  
	  	          "from_sop":false,      //是否引用的SOP
	  	          "pre_conform":"*******",  //强制确认
	  	          "content":"*****",     //操作内容
	  	          //操作内容中涉及的对象
	  	          "content_objs":[
	  	             {
	  	                "obj_id:"***",	        //对象id
	  	                "obj_name:"对象名称1",	//对象名称
	  	                "obj_type":"equip",		//对象类型,子项见后边
	  	                "is_revise":true        //待修订标记
	  	                "parents":[
	  	                   {"parent_ids":["***","***","***"],"parent_names":["建筑1","楼层1","空间"]},
	  	                   {"parent_ids":["***","***"],"parent_names":["专业1","系统1"]},
	  	                   {"parent_ids":["***","***","***"],"parent_names":["专业1","系统大类","设备大类"]}
	  	                ]
	  	             },
	  	             {....}
	  	          ],   
	  	          "notice""*****",              //注意事项
	  	          "confirm_result":[	        //需确认的操作结果
	  	             {
	  	                "obj_id:"***",
	  	                "obj_name:"***",
	  	                "obj_type":"***",
	  	                "is_revise":true        //待修订标记
	  	                "parents":[
	  	                   {"parent_ids":["***","***","***"],"parent_names":["建筑1","楼层1","空间"]},
	  	                   {"parent_ids":["***","***"],"parent_names":["专业1","系统1"]},
	  	                   {"parent_ids":["***","***","***"],"parent_names":["专业1","系统大类","设备大类"]}
	  	                ]
	  	                "info_points":[  
	  	                   {  "id":"***","code":"****","name":"****","is_revise":true},
	  	                   {  "id":"***","code":"****","name":"****"}
	  	                ],
	  	                "customs":[//自定义项，type：1-文本，2-单选，3-多选,4、无单位的数字,5、有单位的数字
	  	                   {  "name":"确认信息2","type":"1"},
	  	                   {  "name":"确认信息2","type":"2","items":["选项1","选项2","选项3"]},
	  	                   {  "name":"确认信息3","type":"3","items":["选项1","选项2","选项3"]},
						   {  "name":"确认信息4","type":"4"},
						   {  "name":"确认信息5","type":"5","unit":"***"}
	  	                ]
	  	             }，
	  	             {...}
	  	          ],
	  	          "domain":"*****"	       //专业code
	  	       },
	  	       {
	  	          "from_sop":true,         //step_content中只能有单步骤的sop
	  	          "sop_id":"****",         //sop_id
	  	          "sop_name":"****",       //sop名称
	  	          "version":"V1.3",        //sop版本
	  	          "step_count":1,          //sop中步骤数量
	  	          "stauts_explain":"已发布，修订中",//sop状态
	  	          "upadte_time":"2017-09-10 10:30:32"	//最后更新时间,yyyy-MM-dd HH:mm:ss	
	  	       },
	  	       {...}
		  	]
		  },
		  {	
		  	"from_sop":false,              //是否是引用的SOP
		  	"step_content":[...]
		  },
	  ],     
	  "sop_status":"***",                  //sop状态，0-草稿、1-已发布、2-已作废
	  "publish_status":"***",              //发布后状态，1-正常、2-待修订、3-修订中，草稿中的sop，该字段无值
	  "version":"V0.2",                    //版本，发布后的sop该字段有值
	  "version_count":2,                   //版本数量，发布后的sop该字段有值
	  "version_explain":"***",             //当前版本描述
	  "create_time":"20170620093000",      //创建时间，yyyyMMddHHmmss，页面没有用到，类型不转化
	  "update_time":"20170620093000"       //最后更新时间，yyyyMMddHHmmss，页面没有用到，类型不转化
    } 

### 我的工单-新增页:验证对象和sop是否匹配
>http://localhost:8080/saas/restSopService/verifyObjectAndSop

post请求

参数例子：

    {
      "user_id": "****",           //员工id-当前操作人id，必须
      "objs:[                      //对象数组，必须
         {"obj_id":"***","obj_name":"***"},
         {"obj_id":"***","obj_name":"***"}
      ],           
      "sop_ids:["sop_id","sop_id"] //sop数组，必须
    }         

成功返回例子：

    {
      "Result": "success",
      "Content": [
        {
          "obj_name":"***",         //对象名称
          "sop_name":"***"          //sop名称
        },
        {
          "obj_name":"***",         //对象名称
          "sop_name":"***"          //sop名称
        }
      ],
      "Count": 2,
    }
失败返回例子：

    {
      "Result": "failure",
      "ResultMsg": ""
    } 

前台：接口调用注意事项：
	
	1、返回结果中都是对象与sop不匹配的数据；
	2、返回的Count为0，证明没有不匹配数据；

后台：接口实现注意事项：

	1、查询对象id在sop的"适用对象"中是否存在，不存在即为不匹配，组装一条返回记录；

### 我的工单-新增页:保存工单草稿
>http://localhost:8080/saas/restMyWorkOrderService/saveDraftWorkOrder

post请求

参数例子：数据格式同"保存工单草稿","order_id"为空时新增，不为空时是修改;

成功返回例子：

    {
      "Result": "success",
      "Item": {
         "order_id":"***",         //工单id，工单修改、发布时使用
      }
      "ResultMsg": "",
    }

失败返回例子：

    {
      "Result": "failure",
      "ResultMsg": ""
    } 

前台：接口调用注意事项：
	
	1、因数据字典在每个项目下都可以自定义，工单类型、专业 保存时code和名称都要保存，便于查看详细时处理；
	2、注意@自定义对象的存储方式；

后台：接口实现注意事项：

	1、调用工单系统下接口；
	

### 我的工单-新增页:预览工单草稿
>http://localhost:8080/saas/restMyWorkOrderService/previewWorkOrder

post请求

参数内容同"保存工单草稿"

返回例子：

    {
      "Result": "success",
      "Item":{
          "wo_body":{},               //工单主体数据,格式同工单详细，事项-对象-步骤中没有feedback			
    } 
  
前台：接口调用注意事项：
	
	1、请求数据参数：如果已经保存过草稿，order_id参数也必须传；
	2、返回数据中：确认结果中obj_type的类型是system_class、equip_class时代表是抽象类，页面需要红色标记出；

后台：接口实现注意事项：

	1、调用工单系统下接口；

### 我的工单-新增页:预览工单-查询大类下的对象实例
>http://localhost:8080/saas/restObjectService/queryObjectByClass

post请求

参数例子：

    {
      "user_id": "****",         //员工id-当前操作人id,必须
      "project_id":"***",        //项目id,必须
      "obj_id":"***",            //大类编码，系统大类编码 或者 设备大类编码,必须
      "obj_type":"***"           //对象类型，system_class、equip_class,必须
    }         

成功返回例子：

    {
      "Result": "success",
      "Content": [
        {
          "obj_id:"***",            //对象id
          "obj_name:"对象名称1",     //对象名称
          "obj_type":"equip"        //对象类型，system、equip
          "parents":[               //父级有以下的一个或者几个
                {"parent_ids":["***","***","***"],"parent_names":["建筑1","楼层1","空间"]},
                {"parent_ids":["***","***"],"parent_names":["专业1","系统1"]}
          ]
        },
        {
          "obj_id:"***",            //对象id
          "obj_name:"对象名称1",     //对象名称
          "obj_type":"equip"        //对象类型，system、equip
          "parents":[               //父级有以下的一个或者几个
                {"parent_ids":["***","***","***"],"parent_names":["建筑1","楼层1","空间"]},
                {"parent_ids":["***","***"],"parent_names":["专业1","系统1"]}
          ]
        }
      ],
      "Count": 2,
    }

失败返回例子：

    {
      "Result": "failure",
      "ResultMsg": ""
    } 

前台：接口调用注意事项：

	1、工单预览时，点击变红的抽象类时，调用该方法查询其下的实例；

后台：接口实现注意事项：

	1、专业名称要查询名称表中是否本地名称;
	
### 我的工单-新增页:发布工单
>http://localhost:8080/saas/restMyWorkOrderService/publishWorkOrder

post请求

参数例子：

    {
      "user_id":"***",              //员工id-当前操作人id，必须
      "order_id":"***",             //工单id，如果工单保存过，该参数必须传
      "wo_body":{},                 //工单主体数据,格式同预览时结构；  
    }         

成功返回例子：

    {
      "Result": "success",
      "ResultMsg": "",
    }

失败返回例子：

    {
      "Result": "failure",
      "ResultMsg": ""
    } 

前台：接口调用注意事项：

	1、user_id为员工id-当前操作人id，用于记录操作日志，后面的所有方法都会带这个参数；
	2、wo_body中的结构同预览时的结构，数据中的工具可能增加，抽象类对象替换成了对象实例；

后台：接口实现注意事项：

	1、调用工单系统下接口；

## 工单监控

### 工单监控-列表页:数据字典-工单类型
>http://localhost:8080/saas/restGeneralDictService/queryGeneralDictByKey

post请求

参数例子：

    {
      "user_id":"***",                    //员工id-当前操作人id，必须
      "project_id":"***",                 //项目id，必须
      "dict_type": "work_order_type"      //工单类型，必须
    } 

返回值参见通用数据字典

### 工单监控-列表页:数据字典-工单状态
>http://localhost:8080/saas/restGeneralDictService/queryWorkOrderState

post请求

参数例子：

    {
      "user_id":"***",                    //员工id-当前操作人id，必须
      "project_id":"***",                 //项目id，必须
      "dict_type": "work_order_state"     //工单状态，必须
    } 


返回值参见通用数据字典

### 工单监控-列表页:查询项目下人员列表
>http://localhost:8080/saas/restPersonService/queryProjectPersonSel

post请求

参数例子：

    {
      "user_id":"***",         //员工id-当前操作人id，必须
      "project_id":"***"       //项目id，必须
    } 

返回例子：

    {
      "Result": "success",
      "Content": [
        {
          "person_id":"***",               //员工id
          "name":"***"                     //姓名 
        },
        {
          "person_id":"***",               //员工id
          "name":"***"                     //姓名 
        }
      ],
      "Count": 2,
    }

	
后台：接口实现注意事项：

	1、查询项目下在职人员；	
	
### 工单监控-列表页:查询项目下所有工单
>http://localhost:8080/saas/restWoMonitorService/queryAllWorkOrder

post请求

参数例子：

    {
      "user_id":"***",                    //员工id-当前操作人id，必须
      "project_id":"***",                 //项目id，必须
      "time_type":"***",                  //时间类型，temp-临时，plan计划
      "order_type":"***",                 //工单类型编码
      "order_state":"***",                //工单状态编码
      "creator_id":"***",                 //创建人id
      "page":1,                           //当前页号，必须
      "page_size":50                      //每页返回数量，必须
    } 

返回例子：

    {
      "Result": "success",
      "Content": [
        {
          "order_id":"***",             //工单id
          "order_type":"***",           //工单类型
          "order_type_name":"***",      //工单类型名称
          "summary":"",                 //工单概述
          "order_state":"***",          //工单状态编码
          "order_state_name":"***",     //工单状态名称
          "custom_state":"***",         //工单自定义状态
          "custom_state_name":"***",    //工单自定义状态名称
          "create_time":"***"           //创建时间,yyyyMMddHHmmss
        },
        {
          "order_id":"***",             //工单id
          "order_type":"***",           //工单类型
          "order_type_name":"***",      //工单类型名称
          "summary":"",                 //工单概述
          "order_state":"***",          //工单状态编码
          "order_state_name":"***",     //工单状态名称
          "custom_state":"***",         //工单自定义状态
          "custom_state_name":"***",    //工单自定义状态名称
          "create_time":"***"           //创建时间,yyyyMMddHHmmss
        }
      ],
      "Count": 2,
    }  
后台：接口实现注意事项：

	1、调用工单系统下接口；
	
### 工单监控-详细页:根据Id查询工单详细信息

>http://localhost:8080/saas/restWoMonitorService/queryWorkOrderById

post请求

参数例子：

    {
      "user_id":"***",                //员工id-当前操作人id，必须
      "order_id":"***"                //工单id ,必须
    }         

返回例子：

    {
      "Result": "success",
      "Item":{
                        数据格式见："查看工单详细-已发布"        
      }
    } 

后台：接口实现注意事项：

	1、调用工单系统下接口；

### 工单监控-详细页-直接指派:查询工单岗位职责
>http://localhost:8080/saas/restWoMonitorService/queryPostDutyForWorkOrder

post请求

参数例子：

    {
      "user_id":"***",               //员工id-当前操作人id，必须
      "project_id":"***",            //项目id, 必须
      "order_type":"***",       	 //工单类型编码 ,必须
      "execute_type":"***"    	     //工单执行类型编码,必须
    }  

返回例子：

    {
      "Result": "success",
      "Content": [
          {
             "type":"2",             //类型，2-岗位，3-人员
             "name":"岗位名称",       //岗位名称
             "persons":[
                {"person_id":"1111","name":"人员名称"},
                {"person_id":"2222","name":"人员名称"}
             ]
          }, 
          {
             "type":"3",             //类型，2-岗位，3-人员
             "person_id":"1111",     //人员id
             "name":"人员名称-岗位名称" //人员名称
          }
      ],
      "Count": 2,
    } 

失败返回例子：

    {
      "Result": "failure",
      "ResultMsg": ""
    } 

后台：接口实现注意事项：

	1、调用工单系统下接口；
	
### 工单监控-详细页-直接指派:管理员指派
>http://localhost:8080/saas/restWoMonitorService/doAssignWithAdmin

post请求

参数例子：

    {
      "user_id":"***",              //员工id-当前操作人id，必须
      "project_id":"***",           //项目id, 必须
      "order_id":"***",             //工单id,必须
      "operator_id":"***",          //操作人id,必须
      "operator_name""***",         //操作人名字,必须
      "next_route":[                //下级路由，指派、申请、审批驳回时该项要有值
         {"type":"2","name":"岗位名称"},
         {"type":"3","person_id":"1111","name":"人员名称"}
      ]     
    }  

成功返回例子：

    {
      "Result": "success",
      "ResultMsg": "",
    }

失败返回例子：

    {
      "Result": "failure",
      "ResultMsg": ""
    } 
   
前台：接口调用注意事项：

	1、当选中的下级路由是岗位时，传参只传岗位就可以，不用传岗位下的人；
     
后台：接口实现注意事项：

	1、调用工单系统下接口；
	
### 工单监控-详细页-直接关闭（中止操作）
>http://localhost:8080/saas/restWoMonitorService/doStopWithAdmin

post请求

参数例子：

    {
      "user_id":"***",              //员工id-当前操作人id，必须
      "project_id":"***",           //项目id, 必须
      "order_id":"***",             //工单id,必须
      "operator_id":"***",          //操作人id,必须
      "operator_name""***",         //操作人名字,必须
      "opinion" :"***"              //意见   ,必须
    }  

成功返回例子：

    {
      "Result": "success",
      "ResultMsg": "",
    }

失败返回例子：

    {
      "Result": "failure",
      "ResultMsg": ""
    } 	
	
后台：接口实现注意事项：

	1、调用工单系统下接口；
	

## 工单配置/工单方案
### 工单配置-列表页:查询项目下所有方案
>http://localhost:8080/saas/restFlowPlanService/queryProjectFlowPlan

post请求

参数例子：

    {
      "user_id":"***",                 //员工id-当前操作人id，必须
      "project_id":"***"               //项目id，必须
    } 

返回例子：

    {
      "Result": "success",
      "Content": [
        {
          "plan_id":"***",              //方案计划id
          "order_type":"***",           //工单类型编码
          "order_type_name":"***",      //工单类型名称
          "execute_type":"***",         //类型编码
          "execute_type_name":"***",    //类型名称
          "plan_status":"***",          //方案状态，0-需维护，1-正常
          "create_time":"***"           //创建时间
        },
        {
          "plan_id":"***",              //方案计划id
          "order_type":"***",           //工单类型编码
          "order_type_name":"***",      //工单类型名称
          "execute_type":"***",         //类型编码
          "execute_type_name":"***",    //类型名称
          "plan_status":"***",          //方案状态，0-需维护，1-正常
          "create_time":"***"           //创建时间
        }
      ],
      "Count": 2,
    }

后台：接口实现注意事项：

	1、调用工单系统下接口；

### 工单配置-列表页:查询流转方案提醒消息
>http://localhost:8080/saas/restFlowPlanService/queryFlowPlanRemindMsg

post请求

参数例子：

    {
      "user_id":"***",                 //员工id-当前操作人id，必须
      "project_id":"***"               //项目id，必须
    } 

有提醒信息时返回格式：

    {
      "Result": "success",
      "Item": {
         "remind":"您当前有以下工单类型尚未配置流转方案：维修工单、维保工单"
      }
    }

无提醒信息时返回格式：

    {
      "Result": "success",
      "Item": {
         "remind":""
      }
    }


失败返回例子：

    {
      "Result": "failure",
      "ResultMsg": ""
    }

后台：接口实现注意事项：

	1、查询当前项目下启动的工单类型，如果存在工单类型下没有方案的，则给出提示；
	
### 工单配置-列表页:根据Id删除流转方案信息
>http://localhost:8080/saas/restFlowPlanService/deleteFlowPlanById

post请求

参数例子：

    {
      "user_id":"***",             //员工id-当前操作人id，必须
      "plan_id":"***"              //方案计划id,必须
    }         

成功返回例子：

    {
      "Result": "success",
      "ResultMsg": "",
    }

失败返回例子：

    {
      "Result": "failure",
      "ResultMsg": ""
    } 

### 工单配置-新增页:数据字典-工单类型
>http://localhost:8080/saas/restGeneralDictService/queryGeneralDictByKey

post请求

参数例子：

    {
      "user_id":"***",                    //员工id-当前操作人id，必须
      "project_id":"***",                 //项目id，必须
      "dict_type": "work_order_type"      //工单类型，必须
    } 

返回值参见通用数据字典

### 工单配置-新增页:数据字典-时间类型（工单执行类型）
>http://localhost:8080/saas/restGeneralDictService/queryGeneralDictByKey

post请求

参数例子：

    {
      "user_id":"***",                    //员工id-当前操作人id，必须
      "project_id":"***",                 //项目id
      "dict_type": "wo_execute_type"      //工单执行类型，必须
    } 

返回值参见通用数据字典
	
### 工单配置-新增页:查询项目岗位人员列表
>http://localhost:8080/saas/restPersonService/queryPositionPersonSel

post请求

参数例子：

    {
      "user_id":"***",                  //员工id-当前操作人id，必须
      "project_id":"***"                //项目id，必须
    } 

返回例子：

    {
      "Result": "success",
      "Content": [
        {
          "type":"2",                 //类型，2-岗位，3-人
          "name":"岗位名称1",          //岗位名称
          "persons"[                  //岗位下的人员
             {"person_id":"12222","name":"张三"},
             {"person_id":"23333","name":"李四"}
          ]
        },
        {
          "type":"2",
          "name":"岗位名称2",
          "persons"[
             {"person_id":"12222","name":"张三"},
             {"person_id":"23333","name":"李四"}
          ]
        },
        {
          "type":"3",
          "person_id":"***",            //员工id
          "name":"***"                  //姓名 
        }
      ],
      "Count": 2,
    }

	
后台：接口实现注意事项：

	1、查询项目下在职人员；		


### 工单配置-新增页:查询岗位下在职的人
>http://localhost:8080/saas/restPersonService/queryValidPersonForPosition

post请求

参数例子：

    {
      "user_id":"***",                  //员工id-当前操作人id，必须
      "project_id":"***",               //项目id，必须
      "position":["***","***"]          //岗位名称，必须
    }

返回例子：

    {
      "Result": "success",
      "Content": [
        {
          "position":"***",            //岗位名称
          "persons":[                  //岗位下人员列表
             {"person_id":"1111","name":"人员名称'},
             {"person_id":"2222","name":"人员名称'},
             {***}
          ]
        },
        {
          "position":"***",            //岗位名称
          "persons":[                  //岗位下人员列表
             {"person_id":"1111","name":"人员名称'},
             {"person_id":"2222","name":"人员名称'},
             {***}
          ]
        }
      ],
      "Count": 2,
    }
 
前台：接口调用注意事项：

	1、在新建、指派、申请等控制模块需要选择下级路由时，查询方案中所有岗位下的人；
	
	   
### 工单配置-新增页:数据字典-工单流转的控制模块
>http://localhost:8080/saas/restGeneralDictService/queryGeneralDictByKey

post请求

参数例子：

    {
      "user_id":"***",                    //员工id-当前操作人id，必须
      "project_id":"***",                 //项目id，必须
      "dict_type": "wo_control_module"    //工单控制模块，必须
    } 

返回值参见通用数据字典

### 工单配置-新增页:验证是否可以创建某种类型方案
>http://localhost:8080/saas/restFlowPlanService/verifyFlowPlanType

post请求

参数例子：

    {
      "user_id":"***",                    //员工id-当前操作人id，必须
      "project_id":"***",                 //项目id ,必须
      "plan_id":"***"                     //方案计划id,编辑时验证该参数必须
      "order_type":"***",                 //工单类型编码 ,必须
      "execute_type":"***"                //工单执行类型编码、时间类型,必须
    } 

成功返回例子：

    {
      "Result": "success",
      "Item": {"can_use":true}
      "ResultMsg": "",
    }

失败返回例子：

    {
      "Result": "failure",
      "ResultMsg": ""
    }

前台：接口调用注意事项：

	1、返回结果为true时，说工单类型、时间类型没有重复，可以创建方案；

### 工单配置-新增页:验证工单方案岗位职责
>http://localhost:8080/saas/restFlowPlanService/verifyPostAndDuty

post请求

参数例子：

    {
      "user_id":"***",                  //员工id-当前操作人id，必须
      "project_id":"***",               //项目id ,必须
      "post_and_duty":[***]             //岗位职责 ,格式同添加，必须
    } 

成功返回例子：

    {
      "Result": "success",
      "Item":{
          "is_pass":false,              //岗位职责是否合格
          "reminds":["***","***"],      //不合格时的提醒内容 
          "post_and_duty":[             //不合格时的岗位职责
             {
                "type":"2",                  //类型，2-岗位，3-人
                "name":"岗位名称",
                "duty":["create","assign"]   //不合格时职责内控制模块编码，control_code的值
             },
             {
                "type":"3",
	            "person_id":"12222",
                "name":"张三",
                "duty":["apply"]
             },
          ]
      }
      "ResultMsg": "",
    }

失败返回例子：

    {
      "Result": "failure",
      "ResultMsg": ""
    }
 
前台：接口调用注意事项：

	1、返回结果is_pass的值为true时，代表岗位职责验证合格；	
	
### 工单配置-新增页:添加工单流转方案信息
>http://localhost:8080/saas/restFlowPlanService/addFlowPlan

post请求

参数例子：

    {
      "user_id":"***",                  //员工id-当前操作人id，必须
      "project_id":"***",               //项目id ,必须
      "order_type":"***",               //工单类型编码 ,必须
      "execute_type":"***",             //工单执行类型编码,必须
      "post_and_duty":[***]             //岗位职责 ,必须
    } 

	post_and_duty 格式如下：

    [{"type":"2", "name":"岗位名称", "duty":[***] },{...}]; type:2-岗位，3-人员

	post_and_duty 格式例子：

	[
	   {
	      "type":"2",                  //类型，2-岗位，3-人
	      "name":"岗位名称",
	      "duty":[
	         {
	            "control_code":"xxxx",
	            "control_name":"新建工单",
	            "executie_mode":"1",  //工单执行方式,1-单人串行，2-多人并行
	            "filter_scheduling":false,
	            "next_route":[
	               {"type":"2","name":"岗位名称'},
	               {"type":"3","person_id":"1111","name":"人员名称'}
	            ]
	         },
	         {
	            "control_code":"xxxx",
	            "control_name":"指派",
	            "filter_scheduling":false,
	            "next_route":[
	               {"type":"2","name":"岗位名称'},
	               {"type":"3","person_id":"1111","name":"人员名称'}
	            ]
	         },
	         {
	            "control_code":"xxxx",
	            "control_name":"执行工作步骤",
	            "limit_domain":true                //专业限制
	         },
	         {
	            "control_code":"xxxx",
	            "control_name":"申请",
	         },
	         {
	            "control_code":"xxxx",
	            "control_name":"审核",
	            "audit_close_way":"1"  // 审核结束方式，1-手动点击结束，2-审核后自动结束
	         },
	         {
	            "control_code":"xxxx",
	            "control_name":"中止",
	         },
	         {
	            "control_code":"xxxx",
	            "control_name":"结束",
	         },
	      ]
	   },
	   {
	      "type":"2",
	      "name":"岗位名称",
	      "duty":[...]
	   }
	   {
	      "type":"3",
	      "person_id":"12222",
	      "name":"张三",
	      "duty":[...]
	   }
	]

成功返回例子：

    {
      "Result": "success",
      "ResultMsg": "",
    }

失败返回例子：

    {
      "Result": "failure",
      "ResultMsg": ""
    }
 
后台：接口实现注意事项：

	1、调用工单系统下接口；
	      
### 工单配置-详细页:根据Id查询流转方案详细信息
>http://localhost:8080/saas/restFlowPlanService/queryFlowPlanById

post请求

参数例子：

    {
      "user_id":"***",                  //员工id-当前操作人id，必须
      "plan_id":"***"                   //方案计划id,必须
    }         

返回例子：

    {
      "Result": "success",
      "Item":{
          "plan_id":"***",              //方案计划id
          "project_id":"***",           //项目id 
          "order_type":"***",           //工单类型编码
          "order_type_name":"***",      //工单类型名称
          "execute_type":"***",         //类型编码
          "execute_type_name":"***",    //类型名称
          "post_and_duty":[***],        //岗位职责 
          "plan_status" :"1",           //方案状态,0-需维护，1-正常
          "create_time":"***",          //创建时间，yyyyMMddHHmmss
          "valid":true                  //有效状态       true：有效，false：失效
      }
    } 

	post_and_duty 格式参见新增时

后台：接口实现注意事项：

	1、调用工单系统下接口；
	
### 工单配置-编辑页:根据Id编辑流转方案信息
>http://localhost:8080/saas/restFlowPlanService/updateFlowPlanById

post请求

参数例子：

    {
      "user_id":"***",                  //员工id-当前操作人id，必须
      "plan_id":"*****",                //方案计划id ,必须
      "order_type":"*****",             //工单类型编码 
      "execute_type":"*****",           //工单执行类型编码
      "post_and_duty":[*****]           //岗位职责 
    }  

	post_and_duty 格式参见新增时     

成功返回例子：

    {
      "Result": "success",
      "ResultMsg": "",
    }

失败返回例子：

    {
      "Result": "failure",
      "ResultMsg": ""
    } 
    
后台：接口实现注意事项：

	1、调用工单系统下接口；
	   
## 排班管理
### 排班管理-排班表主页:下载排班表excel模板
>http://localhost:8080/saas/restSchedulingService/downloadSchedulingTemplateFile?user_id=***&project_id=***&month=***

get请求

返回值

	数据流


前台：接口调用注意事项：

	1、month数据格式为yyyyMM；

### 排班管理-排班表主页:上传排班excel文件
>http://localhost:8080/saas/restSchedulingService/uploadSchedulingFile

post请求

参考例子


	{	
      "user_id":"***",                  //当前用户主键，必须
      "file":****,                      //文件流，必须
      "project_id":"***",               //项目主键，必须
      "month":"***"                     //月份, 格式：yyyyMM，必须
	}



失败返回例子：

    {
      "Result": "failure",
      "ResultMsg": ""
    }
    
 成功返回例子：
	 
    {
      "Count": 8,
      "Result": "success",
      "Content": [
         {"columns":["0","","","星期","二","三","四",***]},
         {"columns":["0","姓名","电话","职位","1","2","3",***]},
         {"columns":["0","葛占彬","18610130405","大王","A","B","",***]},
         {"columns":["0","郭松涛","13511064984","大王","C","","D",***]},
         {"columns":["0","何鑫欣","15501057502","国师","C","A","C",***]},
         {"columns":["0","孟祥永","18500611380","将军","C","D","C",***]},
         {"columns":["0","汪存文","15801075390","老太君","B","B","B",***]},
         {"columns":["0","王海龙","13488718088","哈哈","A","","",***]}
	    ]
    }
	
前台：接口调用注意事项：

	1、columns 的第一个元素0/1 代表当前行是否含有无效数据   0-不含无效数据   1-含有无效数据;
	2、返回数据用于页面预览，此时还没有保存排班数据，预览点击确定后才会保存排班数据。

### 排班管理-排班表主页:添加排班信息
>http://localhost:8080/saas/restSchedulingService/saveSchedulingPlan

post请求

参考例子

	{
      "user_id":"***",                //当前用户主键，必须
      "project_id":"***",             //项目主键，必须
      "month":"***",                  //月份,格式：yyyyMM，必须
      "contents"[                     //必须
         {"columns":["0","","","星期","二","三","四",***]},
         {"columns":["0","姓名","电话","职位","1","2","3",***]},
         {"columns":["0","葛占彬","18610130405","大王","A","B","",***]},
         {"columns":["0","郭松涛","13511064984","大王","C","","D",***]},
         {"columns":["0","何鑫欣","15501057502","国师","C","A","C",***]},
         {"columns":["0","孟祥永","18500611380","将军","C","D","C",***]},
         {"columns":["0","汪存文","15801075390","老太君","B","B","B",***]},
         {"columns":["0","王海龙","13488718088","哈哈","A","","",***]}
      ]
	}



失败返回例子：

    {
      "Result": "failure",
      "ResultMsg": ""
    }
    
 成功返回例子：
 
 
    {
      "Result": "success",
      "ResultMsg": ""
    }

接口实现注意事项：


### 排班管理-排班表主页:查询目前排班计划 (web端)
>http://localhost:8080/saas/restSchedulingService/queryMonthSchedulingForWeb

post请求

参考例子

	{
      "user_id":"***",                //当前用户主键，必须
      "project_id":"***",             //项目主，必须
      "month":"***"                   //月份, 格式：yyyyMM，必须
	}



失败返回例子：

    {
      "Result": "failure",
      "ResultMsg": ""
    }
    
 成功返回例子：
 
	{
      "Count": 8,
      "Result": "success",
      "Content": [
         {"columns":["0","","","星期","二","三","四",***]},
         {"columns":["0","姓名","电话","职位","1","2","3",***]},
         {"columns":["0","葛占彬","18610130405","大王","A","B","",***]},
         {"columns":["0","郭松涛","13511064984","大王","C","","D",***]},
         {"columns":["0","何鑫欣","15501057502","国师","C","A","C",***]},
         {"columns":["0","孟祥永","18500611380","将军","C","D","C",***]},
         {"columns":["0","汪存文","15801075390","老太君","B","B","B",***]},
         {"columns":["0","王海龙","13488718088","哈哈","A","","",***]}
      ]
	}
 
### 排班管理-排班表主页:查询目前排班计划 (APP端)
>http://localhost:8080/saas/restSchedulingService/queryMonthSchedulingForApp

post请求

参考例子

	{
      "user_id":"***",                //当前用户主键，必须
      "project_id":"***",             //项目主键，必须
      "month":"***"                   //月份,格式：yyyyMM，必须
	}



失败返回例子：

    {
      "Result": "failure",
      "ResultMsg": ""
    }
    
 成功返回例子：
 
    {
      "Result": "success",
      "Content": [
        {
          "columns":["","姓名","张三","李四","王五","陈六",***]
        },
        {
          "columns":["","职位","暖通工程师","强电主管","强电工程师","强电工程师",***]
        },
        {
          "columns":["三","1","A","C","B","C",***]
        },
        {
          "columns":["四","2","B","A","C","A",***]
        },
        {***}
      ],
      "Count": 32,
    } 
 
### 排班管理-排班类型设置页面:查询排班类型
>http://localhost:8080/saas/restSchedulingConfigService/querySchedulingConfig

post请求

参考例子

	{
      "user_id":"***",                //当前用户主键，必须
      "project_id":"***"              //项目主键，必须
	}



失败返回例子：

    {
      "Result": "failure",
      "ResultMsg": ""
    }
    
 成功返回例子：
 
	 {
      "Result": "success",
      "Content": [
        {
          "code": "***",                //编号	
          "name": "***",                //名称
          "create_time": "***",         //创建时间 	格式：yyyyMMddHHmmss
          "time_plan": [                //排班计划时间
             {
                "end": "***",           //结束时分  格式HH:mm
                "start": "***"          //开始时分  格式HH:mm
             },
             {
                "end": "***",           //结束时分  格式HH:mm
                "start": "***"          //开始时分  格式HH:mm
             }
          ]
        },
        {
          "code": "***",
          "name": "***",
          "create_time": "***",
          "time_plan": [
             {
                "end": "***",
                "start": "***"
             }
          ]
        }
      ],
      "Count": 2
	}
 
 
### 排班管理-排班类型设置页面:添加排班类型--已报废
>http://localhost:8080/saas/restSchedulingConfigService/saveSchedulingConfig

post请求

参考例子

	{
      "user_id":"***",                //当前用户主键，必须
      "project_id":"***",             //项目主键，必须
      "code":"***",                   //编号，必须
      "name":"***",                   //名称，必须
      "time_plan":[                   //排班计划时间，必须
        {
          "start":***",               //开始时分  格式HH:mm
          "end":"***"                 //结束时分  格式HH:mm
        }
      ]
	}



失败返回例子：

    {
      "Result": "failure",
      "ResultMsg": ""
    }
    
 成功返回例子：
 
	{
      "Result": "success",
      "ResultMsg": ""
     }
    
### 排班管理-排班类型设置页面:修改排班类型--已报废
>http://localhost:8080/saas/restSchedulingConfigService/updateSchedulingConfig

post请求

参考例子

	{
	      "user_id":"***",                 		//当前用户主键，必须
	      "scheduling_configs": [			//修改信息  必须
		      "scheduling_config_id":"***",    //类型主键，必须
		      "code":"***",                    //编号，必须
		      "name":"***",                    //名称，必须
		      "time_plan":[                    //排班计划时间，必须
		        {
		          "start":"***",               //开始时分  格式HH:mm
		          "end":"***"                  //结束时分  格式HH:mm
		        }
		      ]
	      ]
	}



失败返回例子：

    {
      "Result": "failure",
      "ResultMsg": ""
    }
    
 成功返回例子：
 
	{
      "Result": "success",
      "ResultMsg": ""
     }
    
    
### 排班管理-排班类型设置页面:保存排班类型
>http://localhost:8080/saas/restSchedulingConfigService/saveOrUpdateSchedulingConfig

post请求

参考例子

	{
	      "user_id":"***",                 		//当前用户主键，必须
	      "project_id":"***",             //项目主键，必须
	      "scheduling_configs": [			//修改信息  必须
	      	{
			      "code":"***",                    //编号，必须
			      "name":"***",                    //名称，必须
			      "time_plan":[                    //排班计划时间，必须
			        {
			          "start":"***",               //开始时分  格式HH:mm
			          "end":"***"                  //结束时分  格式HH:mm
			        }
			      ]
		      },
		      {
		      	***
		      }
	      ]
	}



失败返回例子：

    {
      "Result": "failure",
      "ResultMsg": ""
    }
    
 成功返回例子：
 
	{
      "Result": "success",
      "ResultMsg": ""
     }
    
    
    
### 排班管理-排班类型设置页面:删除排班类型
>http://localhost:8080/saas/restSchedulingConfigService/deleteSchedulingConfig

post请求

参考例子

	{
      "user_id":"***",              //当前用户主键，必须
      "scheduling_config_id":"***",	//类型主键，必须
	}



失败返回例子：

    {
      "Result": "failure",
      "ResultMsg": ""
    }
    
 成功返回例子：
 
	{
      "Result": "success",
      "ResultMsg": ""
     }
     
## 计划监控
### 计划监控-列表页:查询tab标签列表
>http://localhost:8080/saas/restWoPlanService/queryTabList
post请求

参数例子：

    {
      "user_id":"***",                    //员工id-当前操作人id，必须
      "project_id": "***"                 //项目id，必须
    } 

成功返回格式：

    {
      "Result": "success",
      "Content": [
        {
          "order_type":"***",             //工单类型编码
          "tab_name":"***"                //tab名称，"工单类型名称"+"计划"
        },
        {
          "order_type":"***", 
          "tab_name":"***" 
        }
      ],
      "Count": 2,
    }

	
后台：接口实现注意事项：

	1、工单类型名称优先使用本地名称，没有 本地名称则使用默认名称；	
	
### 计划监控-列表页:数据字典-工单状态
>http://localhost:8080/saas/restGeneralDictService/queryWorkOrderState

post请求

参数例子：

    {
      "user_id":"***",                    //员工id-当前操作人id，必须
      "project_id":"***",                 //项目id，必须
      "dict_type": "work_order_state"     //工单状态，必须
    } 


返回值参见通用数据字典

前台：接口调用注意事项：

	1、返回中不包含"下次待发出工单"；
	2、每种工单状态对应的图标配置在前台的文件中；
	
### 计划监控-列表页:查询工单计划执行列表
>http://localhost:8080/saas/restWoPlanService/queryWoPlanExecuteList
post请求

参数例子：

    {
      "user_id":"***",                    //员工id-当前操作人id，必须
      "project_id":"***",                 //项目id，必须
      "order_type":"***",                 //工单类型编码，必须
      "plan_name":"***",                  //计划名称，支持模糊查询
      "freq_cycle":"***",                 //计划频率-周期，y/m/w，必须
      "start_time":"20170730000000",      //计划执行开始时间，yyyyMMddhhmmss，必须
      "end_time":"20170902235959"         //计划执行结束时间，yyyyMMddhhmmss，必须
      
    } 

成功返回格式：

    {
      "Result": "success",
      "Content": [
        {
          "plan_id":"***",                //计划id
          "plan_name":"***",              //计划名称
          "plan_end_time":"***",          //计划结束时间，yyyyMMddhhmmss
          "freq_cycle":"m",               //计划频率-周期，y/m/w
          "freq_num":2,                   //计划频率-次数
          "freq_cycle_desc":"每月2次",     //计划频率描述
          "row_count":3,                   //行数
          "work_orders":[                 //时间段内生成工单数组
             {
                "order_id":"***",         //工单id，该值不存在时，为下次待发出工单
                "ask_start_time":"***",   //要求开始时间,yyyyMMddhhmmss
                "ask_end_time":"***",     //要求结束时间,yyyyMMddhhmmss
                "order_state":"***"       //工单状态编码，优先返回自定义状态
             },
             {
                "order_id":"***",
                "ask_start_time":"***",
                "ask_end_time":"***",
                "order_state":"***"
             },
             {
                "ask_start_time":"***",
                "ask_end_time":"***",
                "is_next_order":true
             }
          ]            
        },
       {
          "plan_id":"***",                //计划id
          "plan_name":"***",              //计划名称
          "plan_end_time":"***",          //计划结束时间，yyyyMMddhhmmss
          "freq_cycle":"m",               //计划频率-周期，y/m/w
          "freq_num":2,                   //计划频率-次数
          "freq_cycle_desc":"每月2次",     //计划频率描述
          "work_orders":[                 //时间段内生成工单数组
             {
                "order_id":"***",
                "ask_start_time":"***",
                "ask_end_time":"***",
                "order_state":"***"
             },
             {
                "order_id":"***",
                "ask_start_time":"***",
                "ask_end_time":"***",
                "order_state":"***"
             }
          ]            
        }
      ],
      "Count": 2,
    }


前台：接口调用注意事项：

	1、该接口用于查询频率不是日的工单计划执行情况；
	2、工单数组中order_id的值不存在的，且ask_start_time的值不为空时，为下次待发出工单；
	3、work_orders中数据按是照创建时间正序排序的；
		
后台：接口实现注意事项：

	1、工单主体信息来源工单计划表：wo_plan，查询有效的数据；
	2、work_orders中数据数据来源工单计划生成工单表：wo_plan_create_wo，根据创建时间范围进行查找；
	3、work_orders中数据按照创建时间正序排序；
	4、从查询的当前时间，查询每个计划的下次待发出工单，如果该工单在查询的时间范围内，则将其加在工单数组的最后一条，没有工单id；
	
### 计划监控-列表页:查询工单计划执行列表-频率日
>http://localhost:8080/saas/restWoPlanService/queryWoPlanDayExecuteList
post请求

参数例子：

    {
      "user_id":"***",                    //员工id-当前操作人id，必须
      "project_id":"***",                 //项目id，必须
      "order_type":"***",                 //工单类型编码，必须
      "plan_name":"***",                  //计划名称，支持模糊查询
      "freq_cycle":"d",                   //计划频率-周期，d，必须
      "start_time":"20170730000000",      //计划执行开始时间，yyyyMMddhhmmss，必须
      "end_time":"20170902235959"         //计划执行结束时间，yyyyMMddhhmmss，必须
      
    } 

成功返回格式：

    {
      "Result": "success",
      "Content": [
        {
          "plan_id":"***",                //计划id
          "plan_name":"***",              //计划名称
          "plan_end_time":"***",          //计划结束时间，yyyyMMddhhmmss
          "freq_cycle":"d",               //计划频率-周期，d
          "freq_num":3,                   //计划频率-次数
          "max_freq_num":3,               //计划频率-次数，时间段内最大频次数
          "freq_cycle_desc":"每日3次",     //计划频率描述
          "work_order_date":[             //时间段内生成工单数组
             {
                "date":"20170911",        //日期,yyyyMMdd
                "work_orders":[           //时间段内生成工单数组
                   {
                      "order_id":"***",        //工单id
                      "freq_seq":1,            //工单生成的频次序号
                      "ask_start_time":"***",  //工单要求开始时间,yyyyMMddhhmmss
                      "ask_end_time":"***",    //工单要求结束时间,yyyyMMddhhmmss
                      "order_state":"***"      //工单状态编码
                  },
                  {
                      "freq_seq":2
                  },
                  {
                      "order_id":"***",
                      "freq_seq":3,
                      "ask_start_time":"***",
                      "ask_end_time":"***",
                      "order_state":"***"
                  }
               ]           
             },
             {
                "date":"20170913",        //日期,yyyyMMdd
                "work_orders":[           //时间段内生成工单数组
                   {
                      "order_id":"***",
                      "freq_seq":1,
                      "ask_start_time":"***",
                      "ask_end_time":"***",
                      "order_state":"***"
                  },
                  {
                      "order_id":"***",
                      "freq_seq":2,
                      "ask_start_time":"***",
                      "ask_end_time":"***",
                      "order_state":"***"
                  },
                  {
                      "freq_seq":3,
                      "ask_start_time":"***",//下次待发出工单；
                      "ask_end_time":"***",
                      "is_next_order":true
                  }
               ]           
             },
             {***}
          ]            
        },
       {
          "plan_id":"***",                //计划id
          "plan_name":"***",              //计划名称
          "plan_end_time":"***",          //计划结束时间，yyyyMMddhhmmss
          "freq_cycle":"d",               //计划频率-周期，d
          "freq_num":6,                   //计划频率-次数
          "max_freq_num":8,               //计划频率-次数，时间段内最大频次数
          "freq_cycle_desc":"每日6次",     //计划频率描述
          "work_order_date":[***]            
        }
      ],
      "Count": 2,
    }


前台：接口调用注意事项：

	1、该接口用于查询频率是日的工单计划执行情况"；
	2、max_freq_num为时间段内最大频次数，可作为该计划工单区域的行数；
	3、freq_seq为工单生成的频次序号；
	4、工单数组中order_id的值不存在的，且ask_start_time的值不为空时，为下次待发出工单；
	5、工单数组中order_id和ask_start_time的值都不存在时，该频次没有工单；
	5、work_order_date中返回数据只包含有工单的日期；
	6、work_order_date中数据按是照创建时间正序排序的；
		
后台：接口实现注意事项：

	1、工单主体信息来源工单计划表：wo_plan，查询有效的数据；
	2、work_order_date中数据数据来源工单计划生成工单表：wo_plan_create_wo，根据创建时间范围进行查找；
	3、work_order_date中数据按照创建时间正序排序，回数据只包含有工单的日期，日期内某个频次没有工单时，只返回freq_seq的值，用于占位；
	4、从查询的当前时间，查询每个计划的下次待发出工单，如果该工单在查询的时间范围内，则将其加在work_order_date数组的最后一条，没有工单id；
  
### 工单监控-列表页:数据字典-工单类型
>http://localhost:8080/saas/restGeneralDictService/queryGeneralDictByKey

post请求

参数例子：

    {
      "user_id":"***",                    //员工id-当前操作人id，必须
      "project_id":"***",                 //项目id，必须
      "dict_type": "work_order_type"      //工单类型，必须
    } 

返回值参见通用数据字典


	
### 计划监控-新增页:获得工单事项预览
>http://localhost:8080/saas/restWoPlanService/getWoMattersPreview

post请求

参数例子：

    {
      "user_id":"***",                  //员工id-当前操作人id，必须
      "project_id":"***",               //项目id,必须
      "draft_matters":[***]             //工单事项数组，必须,格式参照工单草稿保存            
    } 


成功返回例子：

    {
      "Result": "success",
      "Item":{
          "published_matters":[***]               //工单事项数组,格式同工单预览中的matters			
    } 

失败返回例子：

    {
      "Result": "failure",
      "ResultMsg": ""
    }
 

### 计划监控-新增页-预览计划:查询大类下的对象实例
>http://localhost:8080/saas/restObjectService/queryObjectByClass

post请求

参数例子：

    {
      "user_id": "****",         //员工id-当前操作人id,必须
      "project_id":"***",        //项目id,必须
      "obj_id":"***",            //大类编码，系统大类编码 或者 设备大类编码,必须
      "obj_type":"***"           //对象类型，system_class、equip_class,必须
    }         

成功返回例子：

    {
      "Result": "success",
      "Content": [
        {
          "obj_id:"***",            //对象id
          "obj_name:"对象名称1",     //对象名称
          "obj_type":"equip"        //对象类型，system、equip
          "parents":[               //父级有以下的一个或者几个
                {"parent_ids":["***","***","***"],"parent_names":["建筑1","楼层1","空间"]},
                {"parent_ids":["***","***"],"parent_names":["专业1","系统1"]}
          ]
        },
        {
          "obj_id:"***",            //对象id
          "obj_name:"对象名称1",     //对象名称
          "obj_type":"equip"        //对象类型，system、equip
          "parents":[               //父级有以下的一个或者几个
                {"parent_ids":["***","***","***"],"parent_names":["建筑1","楼层1","空间"]},
                {"parent_ids":["***","***"],"parent_names":["专业1","系统1"]}
          ]
        }
      ],
      "Count": 2,
    }

失败返回例子：

    {
      "Result": "failure",
      "ResultMsg": ""
    } 

前台：接口调用注意事项：

	1、工单预览时，点击变红的抽象类时，调用该方法查询其下的实例；

后台：接口实现注意事项：

	1、专业名称要查询名称表中是否本地名称;
	
### 计划监控-新增页:发布/添加工单计划
>http://localhost:8080/saas/restWoPlanService/addWoPlan

post请求

参数例子：

    {
      "user_id":"***",                  //员工id-当前操作人id ,必须
      "project_id":"***",               //项目id ,必须
      "plan_name":"***",                //工单计划名称 ,必须
      "order_type":"***",               //工单类型编码 ,必须
      "urgency":"***",                  //紧急程度,高、中、低 ,必须
      "ahead_create_time":12,           //提前创建工单时间 ,必须
      "freq_cycle":"m",                 //计划频率-周期,y/m/w/d ,必须
      "freq_num":4,                     //计划频率-次数 ,必须
      "freq_times":[                    //计划频率-时间 ,必须
         {
            "start_time":{
               "cycle":"w",             //周期,y/m/w/d
               "time_day":"1",          //周一，1号，“0612”,6月12日
               "time_hour":"10",        //10时
               "time_minute":"15"       //15分
            },
            "end_time":{
               "cycle":"w",          
               "time_day":"1",       
               "time_hour":"20",    
               "time_minute":"15" 
            }
         },
         {
            "start_time":{
               "cycle":"w",             //周期,y/m/w/d
               "time_day":"1",          //周一，1号，“0612”,6月12日
               "time_hour":"10",        //10时
               "time_minute":"15"       //15分
            },
            "end_time":{
               "cycle":"w",          
               "time_day":"1",       
               "time_hour":"20",    
               "time_minute":"15" 
            }
         },
         {***}
      ]
      "plan_start_type":"***",             //计划开始类型,1-发布成功后立即，2-指定时间 ,必须
      "plan_start_time":"***",             //计划开始时间,yyyyMMddhhmmss
      "plan_end_time":"***",               //计划结束时间,yyyyMMddhhmmss，空值时代表一直有效
      "draft_matters":[***],               //工单事项数组,草稿的matters  ,必须
      "published_matters":[***]            //工单事项数组,预览后的matters  ,必须           
    } 


成功返回例子：

    {
      "Result": "success",
      "ResultMsg": "",
    }

失败返回例子：

    {
      "Result": "failure",
      "ResultMsg": ""
    }
 
### 计划监控-详细页:根据Id查询工单计划的详细信息
>http://localhost:8080/saas/restWoPlanService/queryWoPlanById

post请求

参数例子：

    {
      "user_id":"***",                  //员工id-当前操作人id，必须
      "plan_id":"***"                   //工单计划id,必须
    }         

返回例子：

    {
      "Result": "success",
      "Item":{
          "plan_id":"***",                  //工单计划id
          "project_id":"***",               //项目id
          "plan_name":"***",                //工单计划名称
          "order_type":"***",               //工单类型编码
          "order_type_name":"***",          //工单类型名称
          "urgency":"***",                  //紧急程度,高、中、低
          "ahead_create_time":12,           //提前创建工单时间
          "freq_cycle":"m",                 //计划频率-周期,y/m/w/d
          "freq_num":4,                     //计划频率-次数
          "freq_times":[                    //计划频率-时间
             {
                "start_time":{
                   "cycle":"w",             //周期,y/m/w/d
                   "time_day":"1",          //周一，1号，“0612”,6月12日
                   "time_hour":"10",        //10时
                   "time_minute":"15"       //15分
                },
                "end_time":{
                   "cycle":"w",          
                   "time_day":"1",       
                   "time_hour":"20",    
                   "time_minute":"15" 
                }
             },
             {
                "start_time":{
                   "cycle":"w",             //周期,y/m/w/d
                   "time_day":"1",          //周一，1号，“0612”,6月12日
                   "time_hour":"10",        //10时
                   "time_minute":"15"       //15分
                },
                "end_time":{
                   "cycle":"w",          
                   "time_day":"1",       
                   "time_hour":"20",    
                   "time_minute":"15" 
                }
             },
             {***}
          ]
          "plan_start_type":"***",             //计划开始类型,1-发布成功后立即，2-指定时间
          "plan_start_time":"***",             //计划开始时间,yyyyMMddhhmmss
          "plan_end_time":"***",               //计划结束时间,yyyyMMddhhmmss，空值时代表一直有效
          "draft_matters":[***],               //工单事项数组,草稿的matters 
          "destroy_person_id":"***",           //报废人id
          "destroy_person_named":"***",        //报废人name
          "destroy_time":"***",                //报废时间,yyyyMMddhhmmss
          "create_time":"20170620093000",      //创建时间，yyyyMMddHHmmss
          "update_time":"20170620093000"       //最后更新时间，yyyyMMddHHmmss  
      }
    } 


前台：接口调用注意事项：

	1、工单计划详细页中的工作事项取自draft_matters；
	
### 计划监控-详细页:作废工单计划
>http://localhost:8080/saas/restWoPlanService/destroyWoPlanById

post请求

参数例子：

    {
      "user_id":"***",                  //员工id-当前操作人id，必须
      "plan_id":"***"                   //工单计划id,必须
    }         

成功返回例子：

    {
      "Result": "success",
      "ResultMsg": "",
    }

失败返回例子：

    {
      "Result": "failure",
      "ResultMsg": ""
    }
  
后台：接口实现注意事项：

	1、修改工单计划的有效状态，并保存作废人id和作废时间;
	2、计划作废后，将计划关联的对象关系作废，wo_plan_obj_rel

### 计划监控-详细页:查询工单计划的历史列表
>http://localhost:8080/saas/restWoPlanService/queryWoPlanHisList
post请求

参数例子：

    {
      "user_id":"***",                    //员工id-当前操作人id，必须
      "project_id":"***",                 //项目id，必须
      "plan_id":"***"                     //工单计划id，必须
    } 

成功返回格式：

    {
      "Result": "success",
      "Content": [
        {
          "plan_id":"***",                  //工单计划id
          "project_id":"***",               //项目id
          "plan_name":"***",                //工单计划名称
          "order_type":"***",               //工单类型编码
          "order_type_name":"***",          //工单类型名称
          "urgency":"***",                  //紧急程度,高、中、低
          "ahead_create_time":12,           //提前创建工单时间
          "freq_cycle":"m",                 //计划频率-周期,y/m/w/d
          "freq_num":4,                     //计划频率-次数
          "freq_times":[                    //计划频率-时间
             {
                "start_time":{
                   "cycle":"w",             //周期,y/m/w/d
                   "time_day":"1",          //周一，1号，“0612”,6月12日
                   "time_hour":"10",        //10时
                   "time_minute":"15"       //15分
                },
                "end_time":{
                   "cycle":"w",          
                   "time_day":"1",       
                   "time_hour":"20",    
                   "time_minute":"15" 
                }
             },
             {
                "start_time":{
                   "cycle":"w",             //周期,y/m/w/d
                   "time_day":"1",          //周一，1号，“0612”,6月12日
                   "time_hour":"10",        //10时
                   "time_minute":"15"       //15分
                },
                "end_time":{
                   "cycle":"w",          
                   "time_day":"1",       
                   "time_hour":"20",    
                   "time_minute":"15" 
                }
             },
             {***}
          ]
          "plan_start_type":"***",             //计划开始类型,1-发布成功后立即，2-指定时间
          "plan_start_time":"***",             //计划开始时间,yyyyMMddhhmmss
          "plan_end_time":"***",               //计划结束时间,yyyyMMddhhmmss，空值时代表一直有效
          "draft_matters":[***],               //工单事项数组,草稿的matters 
          "create_time":"20170620093000",      //创建时间，yyyyMMddHHmmss
          "update_time":"20170620093000"       //最后更新时间，yyyyMMddHHmmss         
        },
       {***}
      ],
      "Count": 2,
    }


前台：接口调用注意事项：

	1、返回的数据是按照版本倒序排序的；
		
后台：接口实现注意事项：

	1、数据来源表：工单计划（wo_plan）和工单计划历史（wo_plan_his）；
	2、返回的数据是按照版本倒序排序的；

### 计划监控-详细页:查询作废的计划列表
>http://localhost:8080/saas/restWoPlanService/queryDestroyedWoPlanList
post请求

参数例子：

    {
      "user_id":"***",                    //员工id-当前操作人id，必须
      "project_id":"***"                  //项目id，必须
    } 

成功返回格式：

    {
      "Result": "success",
      "Content": [
        {
          "plan_id":"***",                  //工单计划id
          "project_id":"***",               //项目id
          "plan_name":"***",                //工单计划名称
          "matters_desc":"***",             //工作事项概述,将事项名称连接起来的字符串，用"、"隔开
          "plan_start_time":"***",          //计划开始时间,yyyyMMddhhmmss
          "plan_end_time":"***",            //计划结束时间,yyyyMMddhhmmss，空值时代表一直有效
          "destroy_person_named":"***"      //报废人name         
        },
       {***}
      ],
      "Count": 2,
    }


		
后台：接口实现注意事项：

	1、查询工单计划表中无效数据；
	2、返回的数据是按照创建时间倒序排序的；

### 计划监控-详细页:查询工单计划生成的工单列表
>http://localhost:8080/saas/restWoPlanService/queryWoListByPlanId
post请求

参数例子：

    {
      "user_id":"***",                    //员工id-当前操作人id，必须
      "project_id":"***"                  //项目id，必须
      "plan_id":"***",                    //工单计划id，必须
      "order_state":"***",                //工单状态编码
      "page":1,                           //当前页号，默认从第1页开始
      "page_size":50                      //每页返回数量，不传时不分页
    } 

成功返回格式：

    {
      "Result": "success",
      "Content": [
        {
          "order_id":"***",                 //工单id
          "create_time":"20170620093000",   //创建时间，yyyyMMddhhmmss
          "close_time":"20170620093000",    //结束时间，yyyyMMddhhmmss
          "participants":"张三，李四",        //参与人/操作人，用"，"隔开
          "order_state_name":"***"          //工单状态名称        
        },
       {***}
      ],
      "Count": 2,
    }


		
后台：接口实现注意事项：

	1、从wo_plan_create_wo表中查询出当前计划生成的工单id；
	2、order_state的值中不包含"C"时，为系统内置工单状态，对应过滤order_state的值；否则为自定义工单状态，在查询结果中逐条过滤wo_body中的custom_state的值;
	3、返回数据中order_state_name的值为：内置工单状态名称+","+自定义工单状态名称；
	4、参与人从工单令牌executors中查询；
	5、返回数据按照工单创建时间倒序排序；
			  
### 计划监控-新增页:根据Id编辑工单计划信息
>http://localhost:8080/saas/restWoPlanService/updateWoPlan

post请求

参数例子：

    {
      "user_id":"***",                  //员工id-当前操作人id，必须
      "project_id":"***",               //项目id ,必须
      "plan_id":"***",                  //工单计划id,必须
      "plan_name":"***",                //工单计划名称,必须
      "order_type":"***",               //工单类型编码,必须
      "urgency":"***",                  //紧急程度,高、中、低,必须
      "ahead_create_time":12,           //提前创建工单时间 ,必须
      "freq_cycle":"m",                 //计划频率-周期,y/m/w/d ,必须
      "freq_num":4,                     //计划频率-次数 ,必须
      "freq_times":[                    //计划频率-时间 ,必须
         {
            "start_time":{
               "cycle":"w",             //周期,y/m/w/d
               "time_day":"1",          //周一，1号，“0612”,6月12日
               "time_hour":"10",        //10时
               "time_minute":"15"       //15分
            },
            "end_time":{
               "cycle":"w",          
               "time_day":"1",       
               "time_hour":"20",    
               "time_minute":"15" 
            }
         },
         {
            "start_time":{
               "cycle":"w",             //周期,y/m/w/d
               "time_day":"1",          //周一，1号，“0612”,6月12日
               "time_hour":"10",        //10时
               "time_minute":"15"       //15分
            },
            "end_time":{
               "cycle":"w",          
               "time_day":"1",       
               "time_hour":"20",    
               "time_minute":"15" 
            }
         },
         {***}
      ]
      "plan_start_type":"***",             //计划开始类型,1-发布成功后立即，2-指定时间 ,必须
      "plan_start_time":"***",             //计划开始时间,yyyyMMddhhmmss
      "plan_end_time":"***",               //计划结束时间,yyyyMMddhhmmss，空值时代表一直有效
      "draft_matters":[***],               //工单事项数组,草稿的matters  ,必须
      "published_matters":[***]            //工单事项数组,预览后的matters   ,必须          
    } 


成功返回例子：

    {
      "Result": "success",
      "ResultMsg": "",
    }

失败返回例子：

    {
      "Result": "failure",
      "ResultMsg": ""
    }

前台：接口调用注意事项：

	1、编辑时传输的数据比添加时多了个plan_id；

后台：接口实现注意事项：

	1、注意版本之间因时间重叠的合并规则;
		
	 
# 设备空间管理
## 设备管理
### 设备管理-首页:查询建筑列表
>http://localhost:8080/saas/restObjectService/queryBuild

输入、输出参见："对象选择:查询建筑体"

### 设备管理-首页:专业需求
>http://localhost:8080/saas/restGeneralDictService/queryGeneralDictByKey

post请求

参数例子：

    {
      "user_id":"***",                    //员工id-当前操作人id，必须
      "project_id":"***",                 //项目id，必须
      "dict_type": "domain_require"       //字典类型
    } 
返回值参见通用数据字典

### 设备管理-首页:系统专业下所有系统
>http://localhost:8080/saas/restObjectService/querySystemForSystemDomain

post请求

参数例子：

    {
      "user_id":"***",                    //员工id-当前操作人id，必须
      "project_id": "Pj1101010002",       //项目id, 必须
      "build_id": "***",                  //建筑id
      "system_domain":"*****"             //系统所属专业编码, 必须
    } 

成功返回格式：

    {
      "Result": "success",
      "Content": [
        {
            "system_id": "*****",			//系统id
            "system_name": "*****",			//系统名称
        },
        {
            "system_id": "*****",			//系统id
            "system_name": "*****",			//系统名称
        }
      ],
      "Count": 2
    }
    
前台：接口调用注意事项：

	1、system_domain是专业需求中的code；

### 设备管理-首页:查询设备统计数量

>http://localhost:8080/saas/restEquipService/queryEquipStatisticCount
post请求

参数例子：

    {
      "user_id":"***",                    //员工id-当前操作人id，必须
      "project_id": "Pj1101010002"        //项目id, 必须
    } 

成功返回格式：


    {
      "Result": "success",
      "Item":{
          "equip_total":28019,          //设备总数,运行中总数
          "new_count":18,               //本周新数量，没有则返回0
          "repair_count":9,             //当前维修中数量，没有则返回0
          "maint_count":26,             //当前维保中数量，没有则返回0
          "going_destroy_count":9       //即将报废数量，没有则返回0
        }
    }
 
失败返回例子：

    {
      "Result": "failure",
      "ResultMsg": ""
    }
后台：接口实现注意事项：

	1、设备总数:统计运行中的设备数量，即有效的；
	2、本周新数量：根据创建时间范围查询；
	3、当前维修中数量、维保数量：查询工单系统下对象工单关系表（obj_wo_rel）；
	4、即将报废数量：范围查询设备字段"预计报废时间:expect_scrap_date",该时间是设备信息保存时根据"投产日期"和"使用寿命"计算出来的；
	
### 设备管理-首页:查询项目下设备列表

>http://localhost:8080/saas/restEquipService/queryEquipList
post请求

参数例子：

    {
      "user_id":"***",                    //员工id-当前操作人id，必须
      "project_id": "Pj1101010002",       //项目id, 必须
      "build_id":"***",                   //建筑id
      "domain_code":"***",                //专业编码
      "system_id": "*****",               //系统id
      "keyword": "****",                  //关键字,
      "valid":true,                       //有效状态 ，true-有效/运行中，false-失效/作废，必须
      "page":1,                           //当前页号，默认从第1页开始，必须
      "page_size":50                      //每页返回数量，不传时不分页，必须
    } 

成功返回格式：

    {
      "Result": "success",
      "Content": [
        {
          "equip_id":"***",             //设备id,
          "equip_local_id":"***",       //设备本地编码
          "equip_local_name":"***",     //设备本地名称
          "specification":"***",        //设备型号
          "position":"建筑-楼层-空间",    //所在位置
          "supplier":"***",             //供应商名称
          "create_time":"***",          //创建时间/录入时间,yyyyMMddHHmmss
          "destroy_remind_type":"1",     //报废提醒类型，1-距离时间，2-超出时间
          "destroy_remind":"***"        //报废提醒
        },
        {
          "equip_id":"***",
          "equip_local_id":"***",  
          "equip_local_name":"***",     
          "specification":"***",      
          "position":"建筑-楼层-空间",   
          "supplier":"***",            
          "create_time":"***",    
          "destroy_remind_type":"1",     
          "destroy_remind":"***"       
        }
      ],
      "Count": 2
    }
    
前台：接口调用注意事项：

	1、有报废提醒则提示，没有则不提示；
	2、关键字支持 设备本地名称 和 设备本地编码搜索；
	
后台：接口实现注意事项：

	1、当system_id不是所属build_id下的时候，直接返回空数组即可；
	2、报废提醒查询字段"预计报废时间:expect_scrap_date",该时间是设备信息保存时根据"投产日期"和"使用寿命"计算出来的；
	3、报废提醒内容及其规则参见设计页面要求；
	4、从数据平台查询后，在service层要做字段匹配转化，参考"/doc/设备设施类对象(通用).xlsx"；
	5、所在位置不是设备本身字段信息，是通过关系查询出来的；

### 设备管理-首页搜索设备（弃用）

>http://localhost:8080/saas/restEquipService/searchEquip
post请求

参数例子：

    {
      "user_id":"***",                    //员工id-当前操作人id，必须
      "project_id": "Pj1101010002",       //项目id, 必须
      "keyword": "****",                  //关键字,
      "valid":true,                       //有效状态 ，true-有效/运行中，false-失效/作废，必须
      "page":1,                           //当前页号，默认从第1页开始，必须
      "page_size":50                      //每页返回数量，不传时不分页，必须
    } 

成功返回格式同上一个接口:"设备管理-首页:查询项目下设备列表";

### 设备管理-首页:查询维修中设备列表

>http://localhost:8080/saas/restEquipService/queryRepairEquipList
post请求

参数例子：

    {
      "user_id":"***",                    //员工id-当前操作人id，必须
      "project_id": "Pj1101010002",       //项目id, 必须
      "build_id":"***",                   //建筑id
      "domain_code":"***",                //专业编码
      "page":1,                           //当前页号，默认从第1页开始
      "page_size":50                      //每页返回数量，不传时不分页
    } 

成功返回格式：

    {
      "Result": "success",
      "Content": [
        {
          "equip_id":"***",             //设备id,
          "equip_local_id":"***",       //设备本地编码
          "equip_local_name":"***",     //设备本地名称
          "specification":"***",        //设备型号
          "position":"建筑-楼层-空间",    //所在位置
          "maintainer":"***",           //维修商单位名称
          "work_orders":[
             {
                "order_id":"***",                   //工单id
                "summary":"***",                    //工单概述,事项名称的串连
                "order_state_desc":"***"            //工单状态描述
             },
             {
                "order_id":"***",                   //工单id
                "summary":"***",                    //工单概述,事项名称的串连
                "order_state_desc":"***"            //工单状态描述
             }
          ]
        },
        {
          "equip_id":"***",
          "equip_local_id":"***",  
          "equip_local_name":"***",     
          "specification":"***",      
          "position":"建筑-楼层-空间",   
          "maintainer":"***",
          "work_orders":[
             {
                "order_id":"***",
                "summary":"***",
                "order_state_desc":"***"
             }
          ]     
        },
        {
          "equip_id":"***",
          "equip_local_id":"***",  
          "equip_local_name":"***",     
          "specification":"***",      
          "position":"建筑-楼层-空间",   
          "maintainer":"***"    
        }
      ],
      "Count": 2
    }
    
后台：接口实现注意事项：

	1、维修中设备：查询工单系统下对象工单关系表（obj_wo_rel），返回数据按照该表中创建时间倒序排序；

### 设备管理-首页:查询维保中设备列表

>http://localhost:8080/saas/restEquipService/queryMaintEquipList
post请求

参数例子：

    {
      "user_id":"***",                    //员工id-当前操作人id，必须
      "project_id": "Pj1101010002",       //项目id, 必须
      "build_id":"***",                   //建筑id
      "domain_code":"***",                //专业编码
      "page":1,                           //当前页号，默认从第1页开始
      "page_size":50                      //每页返回数量，不传时不分页
    } 

成功返回格式：

    {
      "Result": "success",
      "Content": [
        {
          "equip_id":"***",             //设备id,
          "equip_local_id":"***",       //设备本地编码
          "equip_local_name":"***",     //设备本地名称
          "specification":"***",        //设备型号
          "position":"建筑-楼层-空间",    //所在位置
          "work_orders":[
             {
                "order_id":"***",                   //工单id
                "summary":"***",                    //工单概述,事项名称的串连
                "order_state_desc":"***"            //工单状态描述
             },
             {
                "order_id":"***",                   //工单id
                "summary":"***",                    //工单概述,事项名称的串连
                "order_state_desc":"***"            //工单状态描述
             }
          ]
        },
        {
          "equip_id":"***",
          "equip_local_id":"***",  
          "equip_local_name":"***",     
          "specification":"***",      
          "position":"建筑-楼层-空间",   
          "work_orders":[
             {
                "order_id":"***",
                "summary":"***",
                "order_state_desc":"***"
             }
          ]     
        },
        {
          "equip_id":"***",
          "equip_local_id":"***",  
          "equip_local_name":"***",     
          "specification":"***",      
          "position":"建筑-楼层-空间"  
        }
      ],
      "Count": 3
    }
    
后台：接口实现注意事项：

	1、维保中设备：查询工单系统下对象工单关系表（obj_wo_rel），返回数据按照该表中创建时间倒序排序；
	
### 设备管理-首页:查询即将报废设备列表

>http://localhost:8080/saas/restEquipService/queryGoingDestroyEquipList
post请求

参数例子：

    {
      "user_id":"***",                    //员工id-当前操作人id，必须
      "project_id": "***",                //项目id, 必须
      "build_id":"***",                   //建筑id
      "domain_code":"***",                //专业编码
      "page":1,                           //当前页号，默认从第1页开始
      "page_size":50                      //每页返回数量，不传时不分页
    } 

成功返回格式：

    {
      "Result": "success",
      "Content": [
        {
          "equip_id":"***",             //设备id,
          "equip_local_id":"***",       //设备本地编码
          "equip_local_name":"***",     //设备本地名称
          "specification":"***",        //设备型号
          "position":"建筑-楼层-空间",    //所在位置
          "start_date":"***",           //投产日期,yyyyMMddHHmmss
          "service_life":"10",          //使用寿命
          "destroy_remind":"***"        //报废提醒
        },
        {
          "equip_id":"***",
          "equip_local_id":"***",
          "equip_local_name":"***",
          "specification":"***",
          "position":"建筑-楼层-空间",
          "start_date":"***",
          "service_life":"10",
          "destroy_remind":"***" 
        }
      ],
      "Count": 2
    }
    
后台：接口实现注意事项：

	1、即将报废设备：范围查询设备字段"预计报废时间:expect_scrap_date",该时间是设备信息保存时根据"投产日期"和"使用寿命"计算出来的；
	2、报废提醒内容及其规则参见设计页面要求；
	3、返回按照expect_scrap_date的正序排序；
	
### 设备管理-首页:验证设备是否可以报废
>http://localhost:8080/saas/restEquipService/verifyDestroyEquip

post请求

参数例子：

    {
      "user_id":"***",                    //员工id-当前操作人id，必须
      "project_id":"***",                 //项目id，必须
      "equip_id":"***",                   //设备id，必须
    } 

成功返回例子：

    {
      "Result": "success",
      "Item": {
         "can_destroy":false
         "remind":"***",                 //不能报废时的提醒内容 
      }
      "ResultMsg": "",
    }

失败返回例子：

    {
      "Result": "failure",
      "ResultMsg": ""
    }

前台：接口调用注意事项：

	1、返回结果中can_destroy为true时，代表该设备可以被报废；

后台：接口实现注意事项：

	1、验证工单计划中是否包含该设备对象，查询工单计划对象关系表：wo_plan_obj_rel，包含则提醒内容"工单计划中包含此设备，不可报废!"；	
	

### 设备管理-首页:报废设备
>http://localhost:8080/saas/restEquipService/destroyEquip

post请求

参数例子：

    {
      "user_id":"***",                  //员工id-当前操作人id，必须
      "project_id":"***",               //项目id, 必须
      "equip_id":"***",                 //设备id，必须  
    }  

成功返回例子：

    {
      "Result": "success",
      "ResultMsg": "",
    }

失败返回例子：

    {
      "Result": "failure",
      "ResultMsg": ""
    } 
   
     
后台：接口实现注意事项：

	1、删除、销毁设备信息；
	2、删除设备所在空间关系；
	3、删除设备所属系统关系；
			
### 设备管理-详细页:查询设备通用信息
>http://localhost:8080/saas/restEquipService/queryEquipPublicInfo

post请求

参数例子：

    {
      "user_id":"***",                  //员工id-当前操作人id，必须
      "project_id":"***",               //项目id, 必须
      "equip_id":"***"                  //设备id,设备编码 ,必须
    }         

成功返回例子：

    {
      "Result": "success",
      "Item":{
          "equip_id":"***"              //设备id,
          "equip_local_id":"***",       //设备本地编码
          "equip_local_name":"***",     //设备本地名称
          "BIMID":"***",                //BIM编码
          "build_id":"***",             //所属建筑id
          "position":"建筑-楼层-空间"     //安装位置
          "equip_category_name":"***",  //设备类型名称
          "system_name":"***",          //所属系统名称
          "length":"***",               //长
          "width":"***",                //宽
          "height":"***",               //高
          "mass":"***",                 //重量
          "material":"***",             //主体材质
          "dept":"***",                 //所属部门
          "drawing"[                    //设备图纸
          	{"type":"1","name":"***","url":"***}, //附件类型，1-url，2-附件
          	{"type":"1","name":"***","url":"***},
          	{"type":"2","name":"***","key":"***}
          ],
          "picture":[key1,key2],        //设备照片
          "check_report"[               //质检报告
          	{"type":"1","name":"***","url":"***}, //附件类型，1-url，2-附件
          	{"type":"1","name":"***","url":"***},
          	{"type":"2","name":"***","key":"***}
          ],   
          "nameplate":[key1,key2],      //铭牌照片
          "archive"[                    //设备文档
          	{"type":"1","name":"***","url":"***}, //附件类型，1-url，2-附件
          	{"type":"1","name":"***","url":"***},
          	{"type":"2","name":"***","key":"***}
          ],
          "manufacturer":"***",         //生产厂家
          "brand":"***",                //设备品牌
          "product_date":"***",         //生产日期
          "serial_num":"***",           //出厂编号
          "specification":"***",        //设备型号
          "supplier":"***",             //供应商名称
          "supplier_phone":"***",       //供应商联系电话
          "supplier_contactor":"***",   //供应商联系人
          "supplier_web":"***",         //供应商网址
          "supplier_fax":"***",         //供应商传真
          "supplier_email":"***",       //供应商电子邮件
          "contract_id":"***",          //合同编号
          "asset_id":"***",             //资产编号
          "purchase_price":"***",       //采购价格
          "principal":"***",            //设备负责人
          "maintain_id":"***",          //维保编码
          "start_date":"***",           //投产日期
          "maintain_deadline":"***",    //合同截止日期
          "service_life":"10",          //使用寿命
          "warranty":"2",               //设备保修期
          "maintain_cycle":"20",        //保养周期
          "maintainer":"***",           //维修商单位名称
          "maintainer_phone":"***",     //维修商联系电话
          "maintainer_contactor":"***", //维修商联系人
          "maintainer_web":"***",       //维修商网址
          "maintainer_fax":"***",       //维修商传真
          "maintainer_email":"***",     //维修商电子邮件
          "status":"1",                 //投产状态，1-投产 ，2-未投产 ，3-其他
          "insurer":"***",              //保险公司
          "insurer_num":"***",          //保险单号
          "insurer_contactor":"***",    //保险联系人
          "insurer_phone":"***",        //保险联系电话
          "insurance_file"[             //保险文件
          	{"type":"1","name":"***","url":"***}, //附件类型，1-url，2-附件
          	{"type":"1","name":"***","url":"***},
          	{"type":"2","name":"***","key":"***}
          ]
      }       			
    } 

失败返回例子：

    {
      "Result": "failure",
      "ResultMsg": ""
    } 

前台：接口调用注意事项：

	1、注意附件类型，1-url，2-附件；

后台：接口实现注意事项：

	1、设备库本地没有表，直接操作数据平台；
	2、从数据平台查询后，在service层要做字段匹配转化，参考"/doc/设备设施类对象(通用).xlsx"；
	3、保存数据之前，在service层也要做字段匹配转化；
	4、安装位置、设备类型名称、所属系统名称  、服务空间    这四个字段不是设备本身字段信息，是通过关系查询出来的

### 设备管理-详细页:查询设备动态信息
>http://localhost:8080/saas/restEquipService/queryEquipDynamicInfo

post请求

参数例子：

    {
      "user_id":"***",                  //员工id-当前操作人id，必须
      "project_id":"***",               //项目id, 必须
      "equip_id":"***"                  //设备id,设备编码 ,必须
    }         

成功返回例子：

    {
      "Result": "success",
      "Content": [
        {
          "tag":"***",            //标签
          "info_Points"[          //标签下信息点
             {
                "info_code":"***",      //信息点编码,字段编码            
                "info_name":"***",      //信息点名称  
                "unit":"***",           //单位
                "data_type":"Str"       //value值类型
                "str_value":"***",      //信息点值
                "cmpt":"***",           //组件编码
                "cmpt_data":[           //组件的数据源，用于列表选择
                  {"code": "***","name": "***"},
                  {***}
                ]
             },
             {
                "info_code":"***",
                "info_name":"***",
                "unit":"***",
                "data_type":"StrArr"
                "str_arr_value":["***","***"]
                "cmpt":"***",
                "cmpt_data":[           //组件的数据源，用于列表选择
                  {"code": "***","name": "***"},
                  {***}
                ]
             },
             {
                "info_code":"***",
                "info_name":"***",
                "unit":"***",
                "data_type":"Att"
                "att_value"[
                  {"type":"1","name":"***","url":"***}, //附件类型，1-url，2-附件
                  {"type":"1","name":"***","url":"***},
                  {"type":"2","name":"***","key":"***}
                ],
                "cmpt":"***"
             },
             {***}
          ]
        },
        {
          "tag":"***",            //标签
          "info_Points"[          //标签下信息点
           {***}
          ]
        },
        {***}
      ],
      "Count": 22,
    }
失败返回例子：

    {
      "Result": "failure",
      "ResultMsg": ""
    } 

前台：接口调用注意事项：

	1、data_type是value值类型，暂时有：Str-字符串，StrArr-字符串数组，Att-附件，注意附件数据的格式；
	2、cmpt_data中是组件中的数据来源，如选择时的列表；

后台：接口实现注意事项：

	1、根据设备id查询出设备信息；
	2、根据设备类型查询出设备的私有的信息点，只查询技术参数的信息点；
	3、根据saas-manage系统中的配置，过滤出在saas中可以显示的信息点；
	4、组装数据：
	   a)data_type对应信息点数据中dataType，"Attachment"匹配为"Att"，包含"组"或者"Arr"的匹配为"StrArr",其它的默认都是"Str";
	   b)将信息点数据中dataSource的数据，转化为cmpt_data对应格式的数据;
	   c)"cmpt"的值是该信息点在saas中使用组件的编码；
	   d)返回数据中的"***_value"值，是设备信息中对应信息点的值；
	   e)返回数据按照标签分组，没有二级标签时，只返回1组，"tag"的值为"技术参数",技术参数下有二级标签时，按照二级标签分组；

### 设备管理-详细页:查询设备名片信息
>http://localhost:8080/saas/restEquipService/queryEquipCardInfo

post请求

参数例子：

    {
      "user_id":"***",                  //员工id-当前操作人id，必须
      "project_id":"***",               //项目id, 必须
      "equip_id":"***"                  //设备id,设备编码 ,必须
    }         

成功返回例子：

    {
      "Result": "success",
      "Item":{
          "equip_id":"***"              //设备id,
          "equip_qr_code":key,          //设备二维码图片的key
          "card_info":[                 //名片信息项
             {"info_point_code":"***","info_point_name":"***","value":"***"},
             {"info_point_code":"***","info_point_name":"***","value":"***"},
             {"info_point_code":"***","info_point_name":"***","value":"***"},
             {"info_point_code":"***","info_point_name":"***","value":"***"},
             {"info_point_code":"***","info_point_name":"***","value":"***"}
          ] 
      }           			
    } 

失败返回例子：

    {
      "Result": "failure",
      "ResultMsg": ""
    } 

前台：接口调用注意事项：

	1、名片左侧数据来自card_info，按照数组顺序显示info_point_name和value；

后台：接口实现注意事项：

	1、查询数据平台的设备信息；
	2、从数据平台查询后，在service层要做字段匹配转化，参考"/doc/设备设施类对象(通用).xlsx"；
	3、查询设备名片样式，生成名片信息项；

### 设备管理-详细页:下载设备名片

>http://localhost:8080/saas/restEquipService/downloadEquipCard
post请求

参数例子：

    {
      "user_id":"***",                    //员工id-当前操作人id，必须
      "project_id":"***",                 //项目id, 必须
      "equip_id":"***"                    //设备id, 必须
    } 

成功返回格式：

 
    
后台：接口实现注意事项：

	1、查找到设备名片样式配置，对象名片样式表：obj_card_style；
	2、下载设备名片，生成pdf文件；
	3、修改saas下对象附加表obj_append中的"download_flag"的值为1，标记为已下载；
	
### 设备管理-详细页:查询设备信息点的历史信息
>http://localhost:8080/saas/restEquipService/queryEquipInfoPointHis

post请求

参数例子：

    {
      "user_id":"***",                  //员工id-当前操作人id，必须
      "project_id":"***",               //项目id,项目编码 ,必须
      "equip_id":"***",                 //设备id，必须 
      "info_point_code":"***"           //信息点编码 ,即字段的英文标识，必须

    }         

成功返回例子：

    {
      "Result": "success",
      "Content": [
        {"date":yyyymmddhhmmss,"value":"***"},
        {"date":yyyymmddhhmmss,"value":"***"},
        {"date":yyyymmddhhmmss,"value":"***"}
      ],
      "Count": 3,
    }
失败返回例子：

    {
      "Result": "failure",
      "ResultMsg": ""
    } 

后台：接口实现注意事项：

	1、查询数据平台中设备数据；
	2、在service层先做字段匹配转化，再从数据平台查询设备信息，参考"/doc/设备设施类对象(通用).xlsx"；
	3、信息点"xxx"的历史信息在设备信息中查找字段"xxx_his"的值，格式为：
	 "xxx_his" :[{"date":yyyymmddhhmmss,"value":""},{"date":"20170517170000","value":""}],
    4、返回的信息点历史要以时间倒序排序，注意时间格式的转化；
    
### 设备管理-详细页:编辑设备信息
>http://localhost:8080/saas/restEquipService/updateEquipInfo

post请求

参数例子：

    {
        "user_id":"***",                        //员工id-当前操作人id，必须
        "project_id":"***"                      //项目id,项目编码 ,必须
        "equip_id":"***",                       //设备id，必须 
        "info_point_code":"equip_local_name",   //修改的信息点编码，必须
        "info_point_value":"低区给水泵",          //修改的信息点的值，必须
        "valid_time":"20170108062907"           //生效时间，格式：yyyymmddhhmmss，可以为空
    }
    
成功返回例子：

    {
      "Result": "success",
      "ResultMsg": ""
    }

失败返回例子：

    {
      "Result": "failure",
      "ResultMsg": ""
    }

前台：接口调用注意事项：
    
    1、生效时间不传输或者为空时，默认是"修正输入错误";
    2、"该信息有变化"时，生效时间为必须；

后台：接口实现注意事项：

	1、调用数据平台修改空间信息；
	2、注意"manufacturer_id"、"supplier_id"、"maintainer_id"、"insurer_id"修改时，其对应的公司信息是一起修改的；
	3、在service层先做字段匹配转化，参考"/doc/建筑空间类对象.xlsx"；
	4、要修改信息点值的同时，保存该信息点的历史记录；
	5、valid_time为空时，是修改该信息点历史记录时间最新一个的值，valid_time不为空时，加一条信息的历史记录，注意时间格式，valid_time不为空时保存格式："xxx_his":"20170108062907"；
		
### 设备管理-详细页:查询设备相关的工单
>http://localhost:8080/saas/restEquipService/queryEquipRelWorkOrder

post请求

参数例子：

    {
      "user_id":"***",                  //员工id-当前操作人id，必须
      "project_id":"***",               //项目id，必须 
      "equip_id":"***",                 //设备id，必须 
      "order_type":"*****",             //工单类型code码
      "page":1,                         //当前页号，默认从第1页开始
      "page_size":50                    //每页返回数量，不传时不分页
    } 

返回例子：

    {
      "Result": "success",
      "Content": [
        {
          "order_id":"***",           //工单id
          "summary":"***",            //工单概述
          "order_state":"***",        //工单状态编码
          "order_state_name":"***",   //工单状态名称
          "custom_state_name":"***",  //工单自定义状态名称
          "participants":"张三，李四",          //参与人/操作人，用"，"隔开
          "publish_time":"20170620093000",    //发布时间，yyyyMMddhhmmss
          "desc_photos":[key1,key2]           //描述中的图片
        },
        {
          "order_id":"***",     
          "summary":"***",          
          "order_state":"***",    
          "order_state_name":"***",  
          "participants":"张三，李四",  
          "publish_time":"20170620093000"   
        }
      ],
      "Count": 2,
    } 

前台：接口调用注意事项：
	
	1、页面显示注意"工单状态名称"和"工单自定义状态名称"显示规则 ；

后台：接口实现注意事项：

	1、数据来源：查询工单引擎的接口，调用对象关联工单查询接口；
	2、参与人从工单令牌executors中查询；
	3、返回数据按照工单创建时间倒序排序；

### 设备管理-详细页:根据Id查询工单详细信息

>http://localhost:8080/saas/restWoMonitorService/queryWorkOrderById

post请求

参数例子：

    {
      "user_id":"***",                //员工id-当前操作人id，必须
      "order_id":"***"                //工单id ,必须
    }         

返回例子：

    {
      "Result": "success",
      "Item":{
                        数据格式见："查看工单详细-已发布"        
      }
    } 


### 设备管理-新增页:查询建筑-楼层-空间列表树
>http://localhost:8080/saas/restObjectService/queryBuildFloorSpaceTree

post请求

参数例子

    {
      "user_id":"***",                       //员工id-当前操作人id，必须
      "project_id":"***",                    //所属项目id, 必须
      "build_id":"***"                       //所属建筑id
    }

返回值参见"对象选择:查询设备实例:查询建筑-楼层-空间列表树";

### 设备管理-新增页-查询建筑下的系统实例
>http://localhost:8080/saas/restObjectService/querySystemForBuild

post请求

参数例子：

    {
      "user_id":"***",                    //员工id-当前操作人id，必须
      "project_id": "***"                 //项目id, 必须
      "build_id":"***",                   //所属建筑id，必须
    } 

成功返回格式：

    {
      "Result": "success",
      "Content": [
        {
            "system_id":"***",          //系统id
            "system_name":"***",        //系统名称
            "domain":"***",             //系统所属专业编码
            "system_category":"***"     //系统类型编码
        },
        {
            "system_id":"***",          //系统id
            "system_name":"***",        //系统名称
            "domain":"***",             //系统所属专业编码
            "system_category":"***"     //系统类型编码
        }
      ],
      "Count": 2
    }
    
	
### 设备管理-新增页:查询专业-系统类型-设备类型
>http://localhost:8080/saas/restDictService/queryAllEquipCategory

post请求，无参数

返回例子：说明：第一层是专业，第二层系统类型，第三层是设备类型

    {
      "Result": "success"
      "Content": [
        {
          "code": "AC",
          "name": "空调",
          "content": [
            {
              "code": "CC",
              "name": "中央供冷系统",
              "content": [
                {
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
               ......
               ]
             },
            {
              "name": "中央供热系统",
              "code": "CH",
              "content": [
                {
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
               ]
             },
             ......
            ]
          },
         ......
       ]
    }
 
 前台：接口调用注意事项：

	1、页面显示时可以用系统实例中的domain 和 system_category定位到设备类型，对应的都是code；

后台：接口实现注意事项：

	1、专业名称要查询名称表中是否本地名称;
		   
### 设备管理-新增页:设备通讯录选择：供应商、生产厂家、维修商、保险公司
>http://localhost:8080/saas/restEquipCompanyService/queryEquipCompanySel
post请求

参数例子：

    {
      "user_id":"***",                 //员工id-当前操作人id，必须
      "project_id":"***",              //项目id，必须
      "company_type":"***",            //公司类型，1-供应商、2-生产厂家、3-维修商、4-保险公司，必须
      "company_name":"***",            //公司名称，支持模糊查询
      "page":1,                        //当前页号，默认从第1页开始
      "page_size":50                   //每页返回数量，不传时不分页
    }

返回值参见"设备通信录-选择页:设备通讯录选择";

### 设备管理-新增页:添加空间、楼层

说明：详见空间管理下相关接口；

### 设备管理-新增页:添加系统

说明：详见系统 管理下相关接口；

### 设备管理-新增页/编辑页:验证设备编码是否可以使用
>http://localhost:8080/saas/restEquipService/verifyEquipLocalId

post请求

参数例子：

    {
      "user_id":"***",                    //员工id-当前操作人id，必须
      "project_id":"***",                 //项目id，必须
      "equip_id":"***",                   //设备id，编辑时必须
      "equip_local_id":"***"              //设备本地编码，必须,
    } 

成功返回例子：

    {
      "Result": "success",
      "Item": {"can_use":true}
      "ResultMsg": "",
    }

失败返回例子：

    {
      "Result": "failure",
      "ResultMsg": ""
    }

前台：接口调用注意事项：

	1、返回结果为true时，代表该设备编码没有重复，可以使用；
	2、equip_id参数，新增验证时不传，编辑验证时必须传；

后台：接口实现注意事项：

	1、设备编码验证：项目下不可重复；
	
### 设备管理-新增页/编辑页:验证设备BIM编码是否可以使用
>http://localhost:8080/saas/restEquipService/verifyEquipBimId

post请求

参数例子：

    {
      "user_id":"***",                    //员工id-当前操作人id，必须
      "project_id":"***",                 //项目id，必须
      "equip_id":"***",                   //设备id，编辑时必须
      "BIMID":"***",                      //BIM编码，必须,
    } 

成功返回例子：

    {
      "Result": "success",
      "Item": {"can_use":true}
      "ResultMsg": "",
    }

失败返回例子：

    {
      "Result": "failure",
      "ResultMsg": ""
    }

前台：接口调用注意事项：

	1、返回结果为true时，代表该BIMID没有重复，可以使用；
	2、equip_id参数，新增验证时不传，编辑验证时必须传；

后台：接口实现注意事项：

	1、BIM编码验证：项目下不可重复；
		
### 设备管理-新增页:添加设备信息
>http://localhost:8080/saas/restEquipService/addEquip

post请求

参数例子：

    {
      "user_id":"***",                   //员工id-当前操作人id，必须
      "project_id":"***",                //所属项目id，必须
      "build_id":"***",                  //所属建筑id，必须
      "space_id":"***",                  //所在空间id
      "system_id":"***",                 //所属系统id
      "equip_local_id":"***",            //设备本地编码，必须
      "equip_local_name":"***",          //设备本地名称，必须
      "BIMID":"***",                     //BIM编码
      "equip_category":"***",            //设备类型编码
      "length":"***",                    //长
      "width":"***",                     //宽
      "height":"***",                    //高
      "mass":"***",                      //重量
      "material":"***",                  //主体材质
      "dept":"***",                      //所属部门
      "picture":[key1,key2],             //设备照片
      "drawing"[                         //设备图纸
          {"type":"1","name":"***","url":"***}, //附件类型，1-url，2-附件
          {"type":"1","name":"***","url":"***},
          {"type":"2","name":"***","key":"***}
      ],
      "check_report"[                    //质检报告
          {"type":"1","name":"***","url":"***}, //附件类型，1-url，2-附件
          {"type":"1","name":"***","url":"***},
          {"type":"2","name":"***","key":"***}
      ],   
      "nameplate":[key1,key2],           //铭牌照片
      "archive"[                         //设备文档
          {"type":"1","name":"***","url":"***}, //附件类型，1-url，2-附件
          {"type":"1","name":"***","url":"***},
          {"type":"2","name":"***","key":"***}
      ],
      "manufacturer_id":"***",           //生产厂家id
      "manufacturer":"***",              //生产厂家
      "brand":"***",                     //设备品牌
      "product_date":"***",              //生产日期，yyyyMMddhhmmss
      "serial_num":"***",                //出厂编号
      "specification":"***",             //设备型号
      "supplier_id":"***",               //供应商id
      "supplier":"***",                  //供应商名称
      "contract_id":"***",               //合同编号
      "asset_id":"***",                  //资产编号
      "purchase_price":"***",            //采购价格
      "principal":"***",                 //设备负责人
      "maintain_id":"***",               //维保编码
      "start_date":"***",                //投产日期，yyyyMMddhhmmss
      "maintain_deadline":"***",         //合同截止日期，yyyyMMddhhmmss
      "service_life":"10",               //使用寿命
      "warranty":"2",                    //设备保修期
      "maintain_cycle":"20",             //保养周期
      "maintainer_id":"***",             //维修商单位id
      "maintainer":"***",                //维修商单位名称
      "status":"1",                      //投产状态，1-投产 ，2-未投产 ，3-其他
      "insurer_id":"***",                //保险公司id
      "insurer":"***",                   //保险公司名称
      "insurer_num":"***",               //保险单号
      
      -----之下是动态信息保存3种格式，信息点编码，就是动态信息中info_code的值
      "信息点编码":"***",                 //字符串值
      "信息点编码":["***","***"],         //数组值
      "信息点编码"[                       //附件
          	{"type":"1","name":"***","url":"***}, //附件类型，1-url，2-附件
          	{"type":"1","name":"***","url":"***},
          	{"type":"2","name":"***","key":"***}
          ]
    }  


成功返回例子：

    {
      "Result": "success",i
      "ResultMsg": "",
    }

失败返回例子：

    {
      "Result": "failure",
      "ResultMsg": ""
    }

 前台：接口调用注意事项：

	1、注意动态信息点保存时的数据格式；
	
后台：接口实现注意事项：
    
	1、设备库本地没有表，直接操作数据平台；
	2、保存前先根据"supplier_id"、"maintainer_id"、"insurer_id"找到其公司信息，补全设备中相关的信息；
	3、根据"投产日期"和"使用寿命"计算出预计报废时间保存到设备信息中，使用字段"expect_scrap_date",便于查询即将报废的设备；
	4、从数据平台查询后，在service层要做字段匹配转化，参考"/doc/建筑空间类对象.xlsx"；
	5、保存数据之前，在service层也要做字段匹配转化；
	6、生成设备二维码图片，图片的key保存到设备的字段equip_qr_code，二维码中内容：url/eq(jf)?objId=*** ，url的值放在配置文件中；
	7、向saas下对象附加表obj_append中新增一条记录，默认download_flag值为0，未下载；

### 设备管理-新增页:查询设备动态信息
>http://localhost:8080/saas/restEquipService/queryEquipDynamicInfoForAdd

post请求

参数例子：

    {
      "user_id":"***",                  //员工id-当前操作人id，必须
      "project_id":"***",               //项目id, 必须
      "equip_category":"***",           //设备类型编码 ,必须
    }         

成功返回例子：

    {
      "Result": "success",
      "Content": [
        {
          "tag":"***",            //标签
          "info_Points"[          //标签下信息点
             {
                "info_code":"***",      //信息点编码,字段编码            
                "info_name":"***",      //信息点名称  
                "unit":"***",           //单位
                "data_type":"Str"       //value值类型
                "str_value":"***",      //信息点值
                "cmpt":"***",           //组件编码
                "cmpt_data":[           //组件的数据源，用于列表选择
                  {"code": "***","name": "***"},
                  {***}
                ]
             },
             {
                "info_code":"***",
                "info_name":"***",
                "unit":"***",
                "data_type":"StrArr"
                "str_arr_value":["***","***"]
                "cmpt":"***",
                "cmpt_data":[           //组件的数据源，用于列表选择
                  {"code": "***","name": "***"},
                  {***}
                ]
             },
             {
                "info_code":"***",
                "info_name":"***",
                "unit":"***",
                "data_type":"Att"
                "att_value"[
                  {"type":"1","name":"***","url":"***}, //附件类型，1-url，2-附件
                  {"type":"1","name":"***","url":"***},
                  {"type":"2","name":"***","key":"***}
                ],
                "cmpt":"***"
             },
             {***}
          ]
        },
        {
          "tag":"***",            //标签
          "info_Points"[          //标签下信息点
           {***}
          ]
        },
        {***}
      ],
      "Count": 22,
    }
失败返回例子：

    {
      "Result": "failure",
      "ResultMsg": ""
    } 

前台：接口调用注意事项：

	1、data_type是value值类型，暂时有：Str-字符串，StrArr-字符串数组，Att-附件，注意附件数据的格式；
	2、cmpt_data中是组件中的数据来源，如选择时的列表；

后台：接口实现注意事项：

	1、根据设备id查询出设备信息；
	2、根据设备类型查询出设备的私有的信息点，只查询技术参数的信息点；
	3、根据saas-manage系统中的配置，过滤出在saas中可以显示的信息点；
	4、组装数据：
	   a)data_type对应信息点数据中dataType，"Attachment"匹配为"Att"，包含"组"或者"Arr"的匹配为"StrArr",其它的默认都是"Str";
	   b)将信息点数据中dataSource的数据，转化为cmpt_data对应格式的数据;
	   c)"cmpt"的值是该信息点在saas中使用组件的编码；
	   d)返回数据中的"***_value"值，是设备信息中对应信息点的值；
	   e)返回数据按照标签分组，没有二级标签时，只返回1组，"tag"的值为"技术参数",技术参数下有二级标签时，按照二级标签分组；
	   
## 系统管理
### 系统管理-首页:查询专业-系统类型
>http://localhost:8080/saas/restDictService/queryAllEquipCategory

输入、输出参见："设备管理-新增页:查询专业-系统类型-设备类型"


### 系统管理-首页:查询建筑-系统列表树
>http://localhost:80800/saas/restSystemService/queryBuildSystemTree

post请求

参数例子

    {
      "user_id":"***",                   //员工id-当前操作人id，必须
      "project_id":"***",                //所属项目id，必须
      "domain":"***",                    //所属专业编码
      "system_category":"***"            //系统类型编码
    }

成功返回例子

    {
      "Result": "success",
      "Content": [
        {
          "build_id": "***",               //建筑id
          "build_name": "***",			   //建筑名称
          "system"[
              {
                "system_id": "***",		   //系统id
                "system_local_id": "***",  //系统本地编码
                "system_local_name": "***" //系统本地名称
            },
            {...}
          ]
        },
        {
          "build_id": "***",	
          "build_name": "***",
          "system"[
              {
                "system_id": "***",	
                "system_local_id": "***",	 
                "system_local_name": "***"  
            },
            {...}
          ]
        },
        {
          "build_id": "***",	
          "build_name": "***" //该建筑在当前筛选项下尚无系统

        }
        
      ]
    }

失败返回例子

    {
      "Result": "failure",
      "ResultMsg": ""
    }

后台：接口实现注意事项：
    
	1、建筑下没有符合条件的系统实例时，也返回建筑信息；

### 系统管理-详细页:查询系统通用信息
>http://localhost:8080/saas/restSystemService/querySystemPublicInfo

post请求

参数例子：

    {
      "user_id":"***",                  //员工id-当前操作人id，必须
      "project_id":"***",               //项目id, 必须
      "system_id": "***"                //系统id ,必须
    }         

成功返回例子：

    {
      "Result": "success",
      "Item":{
          "system_id": "***",            //系统id
          "system_local_id": "***",      //系统本地编码
          "system_local_name": "***",    //系统本地名称
          "BIMID":"***",                 //BIM编码
          "build_local_name":"***",      //建筑本地名称
          "domain_name":"***",           //所属专业名称
          "system_category_name":"***"   //系统类型名称
      }       			
    } 

失败返回例子：

    {
      "Result": "failure",
      "ResultMsg": ""
    } 


后台：接口实现注意事项：

	1、专业名称查询专业数据字典，优先使用本地名称；

### 系统管理-详细页:查询系统动态信息
>http://localhost:8080/saas/restSystemService/querySystemDynamicInfo

post请求

参数例子：

    {
      "user_id":"***",                  //员工id-当前操作人id，必须
      "project_id":"***",               //项目id, 必须
      "system_id": "***"                //系统id ,必须
    }         

成功返回例子：

    {
      "Result": "success",
      "Content": [
        {
          "tag":"***",            //标签
          "info_Points"[          //标签下信息点
             {
                "info_code":"***",      //信息点编码,字段编码            
                "info_name":"***",      //信息点名称  
                "unit":"***",           //单位
                "data_type":"Str"       //value值类型
                "str_value":"***",      //信息点值
                "cmpt":"***",           //组件编码
                "cmpt_data":[           //组件的数据源，用于列表选择
                  {"code": "***","name": "***"},
                  {***}
                ]
             },
             {
                "info_code":"***",
                "info_name":"***",
                "unit":"***",
                "data_type":"StrArr"
                "str_arr_value":["***","***"]
                "cmpt":"***",
                "cmpt_data":[           //组件的数据源，用于列表选择
                  {"code": "***","name": "***"},
                  {***}
                ]
             },
             {
                "info_code":"***",
                "info_name":"***",
                "unit":"***",
                "data_type":"Att"
                "att_value"[
                  {"type":"1","name":"***","url":"***}, //附件类型，1-url，2-附件
                  {"type":"1","name":"***","url":"***},
                  {"type":"2","name":"***","key":"***}
                ],
                "cmpt":"***"
             },
             {***}
          ]
        },
        {
          "tag":"***",            //标签
          "info_Points"[          //标签下信息点
           {***}
          ]
        },
        {***}
      ],
      "Count": 22,
    }
失败返回例子：

    {
      "Result": "failure",
      "ResultMsg": ""
    } 

前台：接口调用注意事项：

	1、data_type是value值类型，暂时有：Str-字符串，StrArr-字符串数组，Att-附件，注意附件数据的格式；
	2、cmpt_data中是组件中的数据来源，如选择时的列表；

后台：接口实现注意事项：

	1、根据系统id查询出系统信息；
	2、根据设备类型查询出系统的私有的信息点，只查询技术参数的信息点；
	3、根据saas-manage系统中的配置，过滤出在saas中可以显示的信息点；
	4、组装数据：
	   a)data_type对应信息点数据中dataType，"Attachment"匹配为"Att"，包含"组"或者"Arr"的匹配为"StrArr",其它的默认都是"Str";
	   b)将信息点数据中dataSource的数据，转化为cmpt_data对应格式的数据;
	   c)"cmpt"的值是该信息点在saas中使用组件的编码；
	   d)返回数据中的"***_value"值，是系统信息中对应信息点的值；
	   e)返回数据按照标签分组，没有二级标签时，只返回1组，"tag"的值为"技术参数",技术参数下有二级标签时，按照二级标签分组；

### 系统管理-详细页:查询系统信息点的历史信息
>http://localhost:8080/saas/restSystemService/querySystemInfoPointHis

post请求

参数例子：

    {
      "user_id":"***",                  //员工id-当前操作人id，必须
      "project_id":"***",               //项目id,项目编码 ,必须
      "system_id": "***"                //系统id ,必须
      "info_point_code":"***"           //信息点编码 ,即字段的英文标识，必须

    }         

成功返回例子：

    {
      "Result": "success",
      "Content": [
        {"date":yyyymmddhhmmss,"value":"***"},
        {"date":yyyymmddhhmmss,"value":"***"},
        {"date":yyyymmddhhmmss,"value":"***"}
      ],
      "Count": 3,
    }
失败返回例子：

    {
      "Result": "failure",
      "ResultMsg": ""
    } 

后台：接口实现注意事项：

	1、查询数据平台中系统数据；
	2、在service层先做字段匹配转化，再从数据平台查询系统信息，参考"/doc/设备设施类对象(通用).xlsx"；
	3、信息点"xxx"的历史信息在系统信息中查找字段"xxx_his"的值，格式为：
	 "xxx_his" :[{"date":yyyymmddhhmmss,"value":""},{"date":"20170517170000","value":""}],
    4、返回的信息点历史要以时间倒序排序，注意时间格式的转化；
    
### 系统管理-详细页:编辑系统信息
>http://localhost:8080/saas/restSystemService/updateSystemInfo

post请求

参数例子：

    {
        "user_id":"***",                        //员工id-当前操作人id，必须
        "project_id":"***"                      //项目id,项目编码 ,必须
        "system_id": "***"                      //系统id，必须 
        "info_point_code":"system_local_name",  //修改的信息点编码，必须
        "info_point_value":"制冷机1",            //修改的信息点的值，必须
        "valid_time":"20170108062907"           //生效时间，格式：yyyymmddhhmmss，可以为空
    }
    
成功返回例子：

    {
      "Result": "success",
      "ResultMsg": ""
    }

失败返回例子：

    {
      "Result": "failure",
      "ResultMsg": ""
    }

前台：接口调用注意事项：
    
    1、生效时间不传输或者为空时，默认是"修正输入错误";
    2、"该信息有变化"时，生效时间为必须；

后台：接口实现注意事项：

	1、调用数据平台修改空间信息；
	2、注意"manufacturer_id"、"supplier_id"、"maintainer_id"、"insurer_id"修改时，其对应的公司信息是一起修改的；
	3、在service层先做字段匹配转化，参考"/doc/建筑空间类对象.xlsx"；
	4、要修改信息点值的同时，保存该信息点的历史记录；
	5、valid_time为空时，是修改该信息点历史记录时间最新一个的值，valid_time不为空时，加一条信息的历史记录，注意时间格式，valid_time不为空时保存格式："xxx_his":"20170108062907"；
	

### 系统管理-新增页:查询建筑列表
>http://localhost:8080/saas/restObjectService/queryBuild

输入、输出参见："对象选择:查询建筑体"

### 系统管理-新增页:查询专业-系统类型
>http://localhost:8080/saas/restDictService/queryAllEquipCategory

输入、输出参见："设备管理-新增页:查询专业-系统类型-设备类型"

### 系统管理-新增页/编辑页:验证系统名称是否可以使用
>http://localhost:8080/saas/restSystemService/verifySystemName

post请求

参数例子：

    {
      "user_id":"***",                    //员工id-当前操作人id，必须
      "project_id":"***",                 //项目id，必须
      "build_id": "***"                   //所属建筑id，必须
      "system_id": "***",                 //系统id，编辑时必须
      "system_local_name": "***"          //系统本地名称，必须
    } 

成功返回例子：

    {
      "Result": "success",
      "Item": {"can_use":true}
      "ResultMsg": "",
    }

失败返回例子：

    {
      "Result": "failure",
      "ResultMsg": ""
    }

前台：接口调用注意事项：

	1、返回结果为true时，代表该系统名称没有重复，可以使用；
	2、system_id参数，新增验证时不传，编辑验证时必须传；
	
后台：接口实现注意事项：

	1、系统本地名称验证：同一建筑下名称不可重复；
	
### 系统管理-新增页/编辑页:验证系统编码是否可以使用
>http://localhost:8080/saas/restSystemService/verifySystemLocalId

post请求

参数例子：

    {
      "user_id":"***",                    //员工id-当前操作人id，必须
      "project_id":"***",                 //项目id，必须
      "system_id": "***",                 //系统id，编辑时必须
      "system_local_id": "***"            //系统本地编码，必须,
    } 

成功返回例子：

    {
      "Result": "success",
      "Item": {"can_use":true}
      "ResultMsg": "",
    }

失败返回例子：

    {
      "Result": "failure",
      "ResultMsg": ""
    }

前台：接口调用注意事项：

	1、返回结果为true时，代表该系统编码没有重复，可以使用；
	2、system_id参数，新增验证时不传，编辑验证时必须传；

后台：接口实现注意事项：

	1、设备编码验证：项目下不可重复；
	
### 系统管理-新增页/编辑页:验证系统BIM编码是否可以使用
>http://localhost:8080/saas/restSystemService/verifySystemBimId

post请求

参数例子：

    {
      "user_id":"***",                    //员工id-当前操作人id，必须
      "project_id":"***",                 //项目id，必须
      "system_id": "***",                 //系统id，编辑时必须
      "BIMID":"***"                       //BIM编码，必须,
    } 

成功返回例子：

    {
      "Result": "success",
      "Item": {"can_use":true}
      "ResultMsg": "",
    }

失败返回例子：

    {
      "Result": "failure",
      "ResultMsg": ""
    }

前台：接口调用注意事项：

	1、返回结果为true时，代表该BIMID没有重复，可以使用；
	2、system_id参数，新增验证时不传，编辑验证时必须传；

后台：接口实现注意事项：

	1、BIM编码验证：项目下不可重复；
	
### 系统管理-新增页:添加系统信息
>http://localhost:8080/saas/restSystemService/addSystem

post请求

参数例子：

    {
      "user_id":"***",                   //员工id-当前操作人id，必须
      "project_id":"***",                //所属项目id，必须
      "build_id":"***",                  //所属建筑id，必须
      "system_local_id": "***",          //系统本地编码
      "system_local_name": "***",        //系统本地名称
      "BIMID":"***",                     //BIM编码
      "system_category":"***",           //系统类型编码
      
      -----之下是动态信息保存3种格式，信息点编码，就是动态信息中info_code的值
      "信息点编码":"***",                 //字符串值
      "信息点编码":["***","***"],         //数组值
      "信息点编码"[                       //附件
          	{"type":"1","name":"***","url":"***}, //附件类型，1-url，2-附件
          	{"type":"1","name":"***","url":"***},
          	{"type":"2","name":"***","key":"***}
          ]
    }  


成功返回例子：

    {
      "Result": "success",i
      "ResultMsg": "",
    }

失败返回例子：

    {
      "Result": "failure",
      "ResultMsg": ""
    }

 前台：接口调用注意事项：

	1、注意动态信息点保存时的数据格式；
	
后台：接口实现注意事项：
    
	1、系统本地没有表，直接操作数据平台；
	2、从数据平台查询后，在service层要做字段匹配转化，参考"/doc/设备设施类对象(通用).xlsx"；
	3、保存数据之前，在service层也要做字段匹配转化；	

### 系统管理-新增页:查询系统动态信息
>http://localhost:8080/saas/restSystemService/querySystemDynamicInfoForAdd

post请求

参数例子：

    {
      "user_id":"***",                  //员工id-当前操作人id，必须
      "project_id":"***",               //项目id, 必须
      "system_category":"***",          //系统类型编码,必须
    }         

成功返回例子：

    {
      "Result": "success",
      "Content": [
        {
          "tag":"***",            //标签
          "info_Points"[          //标签下信息点
             {
                "info_code":"***",      //信息点编码,字段编码            
                "info_name":"***",      //信息点名称  
                "unit":"***",           //单位
                "data_type":"Str"       //value值类型
                "str_value":"***",      //信息点值
                "cmpt":"***",           //组件编码
                "cmpt_data":[           //组件的数据源，用于列表选择
                  {"code": "***","name": "***"},
                  {***}
                ]
             },
             {
                "info_code":"***",
                "info_name":"***",
                "unit":"***",
                "data_type":"StrArr"
                "str_arr_value":["***","***"]
                "cmpt":"***",
                "cmpt_data":[           //组件的数据源，用于列表选择
                  {"code": "***","name": "***"},
                  {***}
                ]
             },
             {
                "info_code":"***",
                "info_name":"***",
                "unit":"***",
                "data_type":"Att"
                "att_value"[
                  {"type":"1","name":"***","url":"***}, //附件类型，1-url，2-附件
                  {"type":"1","name":"***","url":"***},
                  {"type":"2","name":"***","key":"***}
                ],
                "cmpt":"***"
             },
             {***}
          ]
        },
        {
          "tag":"***",            //标签
          "info_Points"[          //标签下信息点
           {***}
          ]
        },
        {***}
      ],
      "Count": 22,
    }
失败返回例子：

    {
      "Result": "failure",
      "ResultMsg": ""
    } 

前台：接口调用注意事项：

	1、data_type是value值类型，暂时有：Str-字符串，StrArr-字符串数组，Att-附件，注意附件数据的格式；
	2、cmpt_data中是组件中的数据来源，如选择时的列表；

后台：接口实现注意事项：

	1、根据系统id查询出系统信息；
	2、根据设备类型查询出系统的私有的信息点，只查询技术参数的信息点；
	3、根据saas-manage系统中的配置，过滤出在saas中可以显示的信息点；
	4、组装数据：
	   a)data_type对应信息点数据中dataType，"Attachment"匹配为"Att"，包含"组"或者"Arr"的匹配为"StrArr",其它的默认都是"Str";
	   b)将信息点数据中dataSource的数据，转化为cmpt_data对应格式的数据;
	   c)"cmpt"的值是该信息点在saas中使用组件的编码；
	   d)返回数据中的"***_value"值，是系统信息中对应信息点的值；
	   e)返回数据按照标签分组，没有二级标签时，只返回1组，"tag"的值为"技术参数",技术参数下有二级标签时，按照二级标签分组；
	   
## 空间管理
### 空间管理-首页:查询建筑列表
>http://localhost:8080/saas/restObjectService/queryBuild

输入、输出参见："对象选择:查询建筑体"
     
### 空间管理-首页:查询某建筑下楼层信息
>http://localhost:8080/saas/restFloorService/queryFloorWithOrder

post请求

参数例子：

    {
      "user_id":"***",                    //员工id-当前操作人id，必须
      "project_id": "***",                //项目id，必须
      "build_id": "***"                   //所属建筑id，必须
    } 

成功返回格式：

    {
      "Result": "success",
      "Content": [
        {
          "floor_id":"***",               //楼层id
          "floor_local_id":"007",         //楼层编码
          "floor_local_name":"7层",       //楼层本地名称
          "floor_sequence_id":"7",        //楼层顺序码
          "floor_type":"1",               //楼层性质，1. 普通楼层 2. 中庭 3. 室外 4. 其他
          "area":"1000",                  //楼层面积
          "net_height":"100",             //楼层高
          "floor_func_type":"***"         //楼层功能
        },
        {
          "floor_id":"***",               //楼层id
          "floor_local_id":"***",         //楼层编码
          "floor_local_name":"***",       //楼层本地名称
          "floor_sequence_id":"***",      //楼层顺序码
          "floor_type":"***",             //楼层性质，1. 普通楼层 2. 中庭 3. 室外 4. 其他
          "area":"***",                   //楼层面积
          "net_height":"***",             //楼层高
          "floor_func_type":"***"         //楼层功能
        }
      ],
      "Count": 2,
    }

前台：接口调用注意事项：

	1、返回数据按照楼层顺序码倒序排序；	
	
后台：接口实现注意事项：

	1、返回数据按照楼层顺序码倒序排序；	

### 空间管理-新增页/编辑页:验证楼层名称是否可以使用
>http://localhost:8080/saas/restFloorService/verifyFloorName

post请求

参数例子：

    {
      "user_id":"***",                    //员工id-当前操作人id，必须
      "project_id":"***",                 //项目id，必须
      "build_id": "***"                   //所属建筑id，必须
      "floor_id": "***"                   //楼层id，编辑时必须
      "floor_local_name":"***",           //楼层本地名称，必须
    } 

成功返回例子：

    {
      "Result": "success",
      "Item": {"can_use":true}
      "ResultMsg": "",
    }

失败返回例子：

    {
      "Result": "failure",
      "ResultMsg": ""
    }

前台：接口调用注意事项：

	1、返回结果为true时，代表该楼层名称没有重复，可以使用；
	2、floor_id参数，新增验证时不传，编辑验证时必须传；
	
后台：接口实现注意事项：

	1、楼层本地名称验证：同一建筑下名称不可重复；
	
### 空间管理-新增页/编辑页:验证楼层编码是否可以使用
>http://localhost:8080/saas/restFloorService/verifyFloorLocalId

post请求

参数例子：

    {
      "user_id":"***",                    //员工id-当前操作人id，必须
      "project_id":"***",                 //项目id，必须
      "floor_id": "***"                   //楼层id，编辑时必须
      "floor_local_id":"***",             //楼层编码，必须,
    } 

成功返回例子：

    {
      "Result": "success",
      "Item": {"can_use":true}
      "ResultMsg": "",
    }

失败返回例子：

    {
      "Result": "failure",
      "ResultMsg": ""
    }

前台：接口调用注意事项：

	1、返回结果为true时，代表该楼层编码没有重复，可以使用；
	2、floor_id参数，新增验证时不传，编辑验证时必须传；

后台：接口实现注意事项：

	1、楼层编码验证：项目下不可重复；
	
### 空间管理-新增页/编辑页:验证楼层BIM编码是否可以使用
>http://localhost:8080/saas/restFloorService/verifyFloorBimId

post请求

参数例子：

    {
      "user_id":"***",                    //员工id-当前操作人id，必须
      "project_id":"***",                 //项目id，必须
      "floor_id": "***"                   //楼层id，编辑时必须
      "BIMID":"***",                      //BIM编码，必须,
    } 

成功返回例子：

    {
      "Result": "success",
      "Item": {"can_use":true}
      "ResultMsg": "",
    }

失败返回例子：

    {
      "Result": "failure",
      "ResultMsg": ""
    }

前台：接口调用注意事项：

	1、返回结果为true时，代表该BIMID没有重复，可以使用；
	2、floor_id参数，新增验证时不传，编辑验证时必须传；

后台：接口实现注意事项：

	1、BIM编码验证：项目下不可重复；
			
### 空间管理-新增页:添加楼层信息
>http://localhost:8080/saas/restFloorService/addFloor

post请求

参数例子：

    {
      "user_id":"***",                  //员工id-当前操作人id，必须
      "project_id":"***",               //项目id ,必须
      "build_id": "***"                 //所属建筑id，必须,
      "floor_local_id":"***",           //楼层编码，必须,
      "floor_local_name":"***",         //楼层本地名称，必须,
      "floor_sequence_id":"***",        //楼层顺序码，必须,
      "BIMID":"***",                    //BIM编码
      "floor_type":"***",               //楼层性质，1. 普通楼层 2. 中庭 3. 室外 4. 其他，必须,
      "area":"***",                     //楼层面积
      "net_height":"***",               //楼层高
      "floor_func_type":"***",          //楼层功能
      "permanent_people_num":"***",     //楼层常驻人数
      "out_people_flow":"***",          //逐时流出人数
      "in_people_flow":"***",           //逐时流入人数
      "exsit_people_num":"***"          //逐时楼层内现有人数
    } 

成功返回例子：

    {
      "Result": "success",
      "ResultMsg": "",
    }

失败返回例子：

    {
      "Result": "failure",
      "ResultMsg": ""
    }
 
后台：接口实现注意事项：

	1、楼层本地没有表，直接操作数据平台；
	2、从数据平台查询后，在service层要做字段匹配转化，参考"/doc/建筑空间类对象.xlsx"；
	3、保存数据之前，在service层也要做字段匹配转化；
	
### 空间管理-详细页:根据id查询楼层详细信息
>http://localhost:8080/saas/restFloorService/queryFloorById

post请求

参数例子：

    {
      "user_id":"***",                    //员工id-当前操作人id，必须
      "project_id": "***",                //项目id，必须
      "floor_id": "***"                   //楼层id，必须
    }         

返回例子：

    {
      "Result": "success",
      "Item":{
          "floor_id":"***",               //楼层id
          "floor_local_id":"007",         //楼层编码
          "floor_local_name":"7层",       //楼层本地名称
          "floor_sequence_id":"7",        //楼层顺序码
          "BIMID":"***",                  //BIM编码
          "floor_type":"1",               //楼层性质，1. 普通楼层 2. 中庭 3. 室外 4. 其他
          "area":"1000",                  //楼层面积
          "net_height":"100",             //楼层高
          "floor_func_type":"***",        //楼层功能
          "permanent_people_num":"100",   //楼层常驻人数
          "out_people_flow":"20",         //逐时流出人数
          "in_people_flow":"30",          //逐时流入人数
          "exsit_people_num":"50"         //逐时楼层内现有人数
      }
    } 

### 空间管理-详细页:查询楼层信息点的历史信息
>http://localhost:8080/saas/restFloorService/queryFloorInfoPointHis

post请求

参数例子：

    {
      "user_id":"***",                  //员工id-当前操作人id，必须
      "project_id":"***",               //项目id,项目编码 ,必须
      "floor_id":"***",                 //楼层id，必须
      "info_point_code":"***"           //信息点编码 ,即字段的英文标识，必须

    }         

成功返回例子：

    {
      "Result": "success",
      "Content": [
        {"date":yyyymmddhhmmss,"value":"***"},
        {"date":yyyymmddhhmmss,"value":"***"},
        {"date":yyyymmddhhmmss,"value":"***"}
      ],
      "Count": 3,
    }
失败返回例子：

    {
      "Result": "failure",
      "ResultMsg": ""
    } 

后台：接口实现注意事项：

	1、查询数据平台中楼层数据；
	2、在service层先做字段匹配转化，再从数据平台查询楼层信息，参考"/doc/建筑空间类对象.xlsx"；
	3、信息点"xxx"的历史信息在楼层信息中查找字段"xxx_his"的值，格式为：
	 "xxx_his" :[{"date":yyyymmddhhmmss,"value":""},{"date":"20170517170000","value":""}],
    4、返回的信息点历史要以时间倒序排序，注意时间格式的转化；
    
### 空间管理-详细页:编辑楼层信息
>http://localhost:8080/saas/restFloorService/updateFloorInfo

post请求

参数例子：

    {
        "user_id":"***",                        //员工id-当前操作人id，必须
        "project_id":"***"                      //项目id,项目编码 ,必须
        "floor_id":"***",       	            //楼层id，必须
        "info_point_code":"floor_local_name",   //修改的信息点编码，必须
        "info_point_value":"7层",                //修改的信息点的值，必须
        "valid_time":"20170108062907"           //生效时间，格式：yyyymmddhhmmss，可以为空
    }
    
成功返回例子：

    {
      "Result": "success",
      "ResultMsg": ""
    }

失败返回例子：

    {
      "Result": "failure",
      "ResultMsg": ""
    }

前台：接口调用注意事项：
    
    1、生效时间不传输或者为空时，默认是"修正输入错误";
    2、"该信息有变化"时，生效时间为必须；

后台：接口实现注意事项：

	1、调用数据平台修改空间信息；
	2、在service层先做字段匹配转化，参考"/doc/建筑空间类对象.xlsx"；
	3、要修改信息点值的同时，保存该信息点的历史记录；
	4、valid_time为空时，是修改该信息点历史记录时间最新一个的值，valid_time不为空时，加一条信息的历史记录，注意时间格式，valid_time不为空时保存格式："xxx_his":"20170108062907"；
		
		
### 空间管理-首页:更改楼层顺序
>http://localhost:8080/saas/restFloorService/updateFloorOrder

post请求

参数例子：

    {
      "user_id":"***",                    //员工id-当前操作人id，必须
      "project_id": "***",                //项目id，必须
      "floors":[                          //楼层顺序信息，必须
         {"floor_id":"***","floor_sequence_id":"***"},
         {"floor_id":"***","floor_sequence_id":"***"},
         {***}
      ]
    }  


成功返回例子：

    {
      "Result": "success",
      "ResultMsg": "",
    }

失败返回例子：

    {
      "Result": "failure",
      "ResultMsg": ""
    } 
    
前台：接口调用注意事项：

	1、该接口用于楼层拖拽后，更新楼层顺序编号；	
	
### 空间管理-首页:查询某建筑下空间信息
>http://localhost:8080/saas/restSpaceService/querySpaceWithGroup

post请求

参数例子：

    {
      "user_id":"***",                    //员工id-当前操作人id，必须
      "project_id": "***",                //项目id，必须
      "build_id": "***"                   //所属建筑id，必须
    } 

成功返回格式：

    {
      "Result": "success",
      "Content": [
        {
          "floor_id":"***",               //楼层id
          "floor_local_name":"7层",       //楼层本地名称
          "spaces":[                      //楼层下空间信息
              {
                 "space_id":"***",        //空间id
                 "room_local_id":"***",   //空间编码
                 "room_local_name":"***", //空间本地名称
                 "room_func_type_name":"***",   //空间功能类型名称
                 "work_orders":[
                    {
                       "order_type":"1",                //工单类型编码
                       "orders":[                       //该类型下的工单
                          {
                            "order_id":"***",           //工单id，
                            "summary":"***",            //工单概述
                            "order_state_name":"***"    //工单状态名称
                          },
                          {
                            "order_id":"***",
                            "summary":"***",
                            "order_state_name":"***"
                          }
                       ]
                    },
                    {
                       "order_type":"2",
                       "orders":[***]
                    }
                    
                 ]
              },
              {
                 "space_id":"***",        //空间id
                 "room_local_id":"***",   //空间编码
                 "room_local_name":"***", //空间本地名称
                 "room_func_type_name":"***",   //空间功能类型名称
                 "work_orders":[***]
              },
              {***}
          ]
        },
        {
          "floor_id":"***",
          "floor_local_name":"6层",      
          "spaces":[                    
              {
                 "space_id":"***",      
                 "room_local_id":"***",  
                 "room_local_name":"***",
                 "room_func_type_name":"***",
                 "work_orders":[***]
              },
              {
                 "space_id":"***",       
                 "room_local_id":"***",  
                 "room_local_name":"***", 
                 "room_func_type_name":"***",
                 "work_orders":[***] 
              }
          ]
        }
      ],
      "Count": 2,
    }

前台：接口调用注意事项：

	1、返回的空间数据按照楼层序号倒序分组，没有楼层的空间为第一组；
	2、空间下的工单类型，只会返回类型下有执行中工单的工单类型；	
	
后台：接口实现注意事项：

	1、先查询出建筑下的所有有效的空间，按照楼层序号倒序分组，没有楼层的空间为第一组；
	2、同组中的空间按照空间编码生序排序，小的在前边；
	3、查询空间下的工单：
	  3.1、从对象工单提醒配置表（obj_wo_remind_config）下查询出该空间需要提醒的工单类型；
	  3.2、根据对象id和工单类型，从对象工单关系表（obj_wo_rel）中查询 出空间下正在执行中的工单；
	  3.3、考虑效率问题，可以将obj_wo_remind_config和obj_wo_rel中数据放在缓存中；
    
### 空间管理-首页:查询某楼层下空间信息
>http://localhost:8080/saas/restSpaceService/querySpaceForFloor

post请求

参数例子：

    {
      "user_id":"***",                    //员工id-当前操作人id，必须
      "project_id": "***",                //项目id，必须
      "floor_id": "***"                   //楼层id，必须
    } 

成功返回格式：

    {
      "Result": "success",
      "Content": [
         {
            "space_id":"***",            //空间id
            "room_local_id":"***",       //空间编码
            "room_local_name":"***",     //空间本地名称
            "room_func_type_name":"***", //空间功能类型名称
            "work_orders":[
               {
                  "order_type":"1",                //工单类型编码
                  "orders":[                       //该类型下的工单
                     {
                        "order_id":"***",           //工单id，
                        "summary":"***",            //工单概述
                        "order_state_name":"***"    //工单状态名称
                     },
                     {
                        "order_id":"***",
                        "summary":"***",
                        "order_state_name":"***"
                     }
                  ]
               },
               {
                  "order_type":"2",
                  "orders":[***]
               }
                    
            ]
         },
         {
            "space_id":"***",            //空间id
            "room_local_id":"***",       //空间编码
            "room_local_name":"***",     //空间本地名称
            "room_func_type_name":"***", //空间功能类型名称
            "work_orders":[***]
         },
         {***}
      ],
      "Count": 2,
    }

前台：接口调用注意事项：

	2、空间下的工单类型，只会返回类型下有执行中工单的工单类型；	
	
后台：接口实现注意事项：

	1、楼层下的空间按照空间编码生序排序，小的在前边；
	2、查询空间下的工单：
	  2.1、从对象工单提醒配置表（obj_wo_remind_config）下查询出该空间需要提醒的工单类型；
	  2.2、根据对象id和工单类型，从对象工单关系表（obj_wo_rel）中查询 出空间下正在执行中的工单；
	  2.3、考虑效率问题，可以将obj_wo_remind_config和obj_wo_rel中数据放在缓存中；

### 空间管理-首页:查询某建筑下已拆除的空间信息
>http://localhost:8080/saas/restSpaceService/queryDestroyedSpace

post请求

参数例子：

    {
      "user_id":"***",                    //员工id-当前操作人id，必须
      "project_id": "***",                //项目id，必须
      "build_id": "***"                   //所属建筑id，必须
    } 

成功返回格式：

    {
      "Result": "success",
      "Content": [
        {
          "floor_id":"***",               //楼层id
          "floor_local_name":"7层",       //楼层本地名称
          "spaces":[                      //楼层下空间信息
              {
                 "space_id":"***",        //空间id
                 "room_local_id":"***",   //空间编码
                 "room_local_name":"***", //空间本地名称
                 "room_func_type_name":"***"   //空间功能类型名称
              },
              {
                 "space_id":"***",        //空间id
                 "room_local_id":"***",   //空间编码
                 "room_local_name":"***", //空间本地名称
                 "room_func_type_name":"***"   //空间功能类型名称
              },
              {***}
          ]
        },
        {
          "floor_id":"***",
          "floor_local_name":"6层",      
          "spaces":[                    
              {
                 "space_id":"***",      
                 "room_local_id":"***",  
                 "room_local_name":"***",
                 "room_func_type_name":"***"
              },
              {
                 "space_id":"***",       
                 "room_local_id":"***",  
                 "room_local_name":"***", 
                 "room_func_type_name":"***"
              }
          ]
        }
      ],
      "Count": 2,
    }

前台：接口调用注意事项：

	1、返回的空间数据按照楼层序号倒序分组，没有楼层的空间为第一组；
	
后台：接口实现注意事项：

	1、先查询出建筑下的所有已删除的空间，按照楼层序号倒序分组，没有楼层的空间为第一组；
	2、同组中的空间按照空间编码生序排序，小的在前边；
	  	  
### 空间管理-首页:查询空间提醒设置
>http://localhost:8080/saas/restSpaceService/querySpaceRemindConfig

post请求

参数例子：

    {
      "user_id":"***",                    //员工id-当前操作人id，必须
      "project_id": "***",                //项目id，必须
      "person_id":"***"                   //人员id ,必须 
    } 

成功返回格式：

    {
      "Result": "success",
      "Content": [
         {"code": "1", "name": "保养", "is_remind": true},
         {"code": "2", "name": "维修", "is_remind": true},
         {"code": "3", "name": "巡检", "is_remind": true},
         {"code": "4", "name": "运行", "is_remind": false}
      ],
      "Count": 4,
    }

前台：接口调用注意事项：

	1、返回数据按照楼层顺序码倒序排序；	
	
后台：接口实现注意事项：

	1、返回数据按照楼层顺序码倒序排序；
	
### 空间管理-首页:保存空间提醒设置
>http://localhost:8080/saas/restSpaceService/saveSpaceRemindConfig

post请求

参数例子：

    {
      "user_id":"***",                   //员工id-当前操作人id，必须
      "project_id":"***",                //项目id ,必须
      "person_id":"***",                 //人员id ,必须 
      "remind_order_types":["***","***"] //选择的需要提醒的工单类型,必须 
    }  


成功返回例子：

    {
      "Result": "success",
      "ResultMsg": "",
    }

失败返回例子：

    {
      "Result": "failure",
      "ResultMsg": ""
    }

前台：接口调用注意事项：

	1、remind_order_types的值只传选中的工单类型编码数组；	
	
后台：接口实现注意事项：

	1、数据保存到对象工单提醒配置表：obj_wo_remind_config；	
	2、obj_type的值默认为"space"

### 空间管理-新增页:查询空间功能类型
>http://localhost:8080/saas/restDictService/queryAllSpaceCode

post请求，无参数

返回值参见通用数据字典

### 空间管理-新增页:查询租赁业态类型
>http://localhost:8080/saas/restDictService/queryAllRentalCode

post请求，无参数

返回值参见通用数据字典

### 空间管理-新增页/编辑页:验证空间名称是否可以使用
>http://localhost:8080/saas/restSpaceService/verifySpaceName

post请求

参数例子：

    {
      "user_id":"***",                    //员工id-当前操作人id，必须
      "project_id":"***",                 //项目id，必须
      "build_id": "***",                  //所属建筑id，必须
      "space_id":"***",                   //空间id,空间编码
      "room_local_name":"***"             //空间名称，必须
    } 

成功返回例子：

    {
      "Result": "success",
      "Item": {"can_use":true}
      "ResultMsg": "",
    }

失败返回例子：

    {
      "Result": "failure",
      "ResultMsg": ""
    }

前台：接口调用注意事项：

	1、返回结果为true时，代表该空间名称没有重复，可以使用；
	2、space_id参数，新增验证时不传，编辑验证时必须传；

后台：接口实现注意事项：

	1、空间本地名称验证：同一建筑下名称不可重复；

### 空间管理-新增页/编辑页:验证空间编码是否可以使用
>http://localhost:8080/saas/restSpaceService/verifySpaceLocalId

post请求

参数例子：

    {
      "user_id":"***",                    //员工id-当前操作人id，必须
      "project_id":"***",                 //项目id，必须
      "space_id":"***",                   //空间id,空间编码，编辑时必须
      "room_local_id":"***"               //空间编码，必须,
    } 

成功返回例子：

    {
      "Result": "success",
      "Item": {"can_use":true}
      "ResultMsg": "",
    }

失败返回例子：

    {
      "Result": "failure",
      "ResultMsg": ""
    }

前台：接口调用注意事项：

	1、返回结果为true时，代表该空间编码没有重复，可以使用；
	2、space_id参数，新增验证时不传，编辑验证时必须传；

后台：接口实现注意事项：

	1、空间编码验证：项目下不可重复；
	
### 空间管理-新增页/编辑页:验证空间BIM编码是否可以使用
>http://localhost:8080/saas/restSpaceService/verifySpaceBimId

post请求

参数例子：

    {
      "user_id":"***",                    //员工id-当前操作人id，必须
      "project_id":"***",                 //项目id，必须
      "space_id":"***",                   //空间id,空间编码，编辑时必须
      "BIMID":"***",                      //BIM编码，必须,
    } 

成功返回例子：

    {
      "Result": "success",
      "Item": {"can_use":true}
      "ResultMsg": "",
    }

失败返回例子：

    {
      "Result": "failure",
      "ResultMsg": ""
    }

前台：接口调用注意事项：

	1、返回结果为true时，代表该BIMID没有重复，可以使用；
	2、space_id参数，新增验证时不传，编辑验证时必须传；

后台：接口实现注意事项：

	1、BIM编码验证：项目下不可重复；
	
### 空间管理-新增页:添加空间信息
>http://localhost:8080/saas/restSpaceService/addSpace

post请求

参数例子：

    {
      "user_id":"***",                   //员工id-当前操作人id，必须
      "project_id":"***",                //项目id ,必须
      "build_id": "***"                  //所属建筑id，必须
      "floor_id":"***",                  //楼层id，必须
      "room_local_id":"***",             //空间本地编码
      "room_local_name":"***",           //空间名称
      "BIMID":"***"                      //BIM编码
      "room_func_type":"***",            //空间功能区类型
      "length":"***",                    //长
      "width":"***",                     //宽
      "height":"***",                    //高
      "area":"***",                      //面积
      "elec_cap":"***",                  //配电容量
      "intro":"***",                     //备注文字
      "tenant_type":"***",               //租赁业态类型
      "tenant":"***",                    //所属租户
      "permanent_people_num":"***",      //空间内常驻人数
      "out_people_flow":"***",           //逐时流出人数
      "in_people_flow":"***",            //逐时流入人数
      "exsit_people_num":"***",          //逐时空间内现有人数
      "elec_power":"***",                //用电功率
      "cool_consum":"***",               //逐时冷量
      "heat_consum":"***",               //逐时热量
      "ac_water_press":"***",            //空调水压力
      "water_consum":"***",              //用水量
      "water_press":"***",               //自来水压力
      "hot_water_consum":"***",          //热水用水量
      "hot_water_press":"***",           //热水压力
      "gas_consum":"***",                //用燃气量
      "gas_press":"***",                 //燃气压力
      "PMV":"***",                       //热舒适PMV
      "PPD":"***"                        //热舒适PPD
    }  


成功返回例子：

    {
      "Result": "success",
      "ResultMsg": "",
    }

失败返回例子：

    {
      "Result": "failure",
      "ResultMsg": ""
    }

后台：接口实现注意事项：

	1、设备库本地没有表，直接操作数据平台；
	2、从数据平台查询后，在service层要做字段匹配转化，参考"/doc/建筑空间类对象.xlsx"；
	3、保存数据之前，在service层也要做字段匹配转化；
	4、生成空间二维码图片，图片的key保存到空间的字段room_qr_code，二维码中内容：url/eq(jf)?objId=*** ，url的值放在配置文件中；
	5、向saas下对象附加表obj_append中新增一条记录，默认download_flag值为0，未下载

### 空间管理-详细页:根据id查询空间详细信息
>http://localhost:8080/saas/restSpaceService/querySpaceById
post请求

参数例子：

    {
      "user_id":"***",                  //员工id-当前操作人id，必须
      "project_id":"***",               //项目id, 必须
      "space_id":"***"                  //空间id,空间编码 ,必须

    }         

成功返回例子：

    {
      "Result": "success",
      "Item":{
          "space_id":"***"              //空间id,
          "build_id": "***"             //所属建筑id
          "build_local_name": "***"     //所属建筑名称
          "floor_local_name":"7层",     //所属楼层名称
          "room_local_id":"***",        //空间本地编码
          "room_local_name":"***",      //空间名称
          "BIMID":"***"                 //BIM编码
          "room_func_type":"***",       //空间功能区类型
          "room_func_type_name":"***",  //空间功能区类型名称
          "length":"***",               //长
          "width":"***",                //宽
          "height":"***",               //高
          "area":"***",                 //面积
          "elec_cap":"***",             //配电容量
          "intro":"***",                //备注文字
          "tenant_type":"***",          //租赁业态类型
          "tenant_type_name":"***",     //租赁业态类型名称
          "tenant":"***",               //所属租户
          "permanent_people_num":"***", //空间内常驻人数
          "out_people_flow":"***",      //逐时流出人数
          "in_people_flow":"***",       //逐时流入人数
          "exsit_people_num":"***",     //逐时空间内现有人数
          "elec_power":"***",           //用电功率
          "cool_consum":"***",          //逐时冷量
          "heat_consum":"***",          //逐时热量
          "ac_water_press":"***",       //空调水压力
          "water_consum":"***",         //用水量
          "water_press":"***",          //自来水压力
          "hot_water_consum":"***",     //热水用水量
          "hot_water_press":"***",      //热水压力
          "gas_consum":"***",           //用燃气量
          "gas_press":"***",            //燃气压力
          "PMV":"***",                  //热舒适PMV
          "PPD":"***"                   //热舒适PPD
      }       			
    } 

失败返回例子：

    {
      "Result": "failure",
      "ResultMsg": ""
    } 

后台：接口实现注意事项：

	1、设备库本地没有表，直接操作数据平台；
	2、从数据平台查询后，在service层要做字段匹配转化，参考"/doc/建筑空间类对象.xlsx"；
	3、保存数据之前，在service层也要做字段匹配转化；

### 空间管理-详细页:验证空间是否可以拆除
>http://localhost:8080/saas/restSpaceService/verifyDestroySpace

post请求

参数例子：

    {
      "user_id":"***",                    //员工id-当前操作人id，必须
      "project_id":"***",                 //项目id，必须
      "space_id":"***"                    //空间id,空间编码，必须
    } 

成功返回例子：

    {
      "Result": "success",
      "Item": {
         "can_destroy":false
         "remind":"***",                 //不能拆除时的提醒内容 
      }
      "ResultMsg": "",
    }

失败返回例子：

    {
      "Result": "failure",
      "ResultMsg": ""
    }

前台：接口调用注意事项：

	1、返回结果中can_destroy为true时，代表该空间可以被拆除；

后台：接口实现注意事项：

	1、验证空间下是否有设备，有设备则can_destroy返回false,提醒内容"当前空间下还有设备，不可拆除!"；
	2、如果空间下没有设备，则验证工单计划中是否包含该空间对象，查询工单计划对象关系表：wo_plan_obj_rel，包含则提醒内容"工单计划中包含此空间，不可拆除!"；
			
### 空间管理-详细页:拆除空间
>http://localhost:8080/saas/restSpaceService/destroySpace

post请求

参数例子：

    {
      "user_id":"***",                  //员工id-当前操作人id，必须
      "project_id":"***",               //项目id, 必须
      "space_id":"***"                  //空间id,空间编码 ,必须   
    }  

成功返回例子：

    {
      "Result": "success",
      "ResultMsg": "",
    }

失败返回例子：

    {
      "Result": "failure",
      "ResultMsg": ""
    } 
   
     
后台：接口实现注意事项：

	1、删除、销毁空间信息；

### 空间管理-详细页:查询空间信息点的历史信息
>http://localhost:8080/saas/restSpaceService/querySpaceInfoPointHis

post请求

参数例子：

    {
      "user_id":"***",                  //员工id-当前操作人id，必须
      "project_id":"***",               //项目id,项目编码 ,必须
      "space_id":"***",                 //空间id，必须
      "info_point_code":"***"           //信息点编码 ,即字段的英文标识，必须

    }         

成功返回例子：

    {
      "Result": "success",
      "Content": [
        {"date":yyyymmddhhmmss,"value":"***"},
        {"date":yyyymmddhhmmss,"value":"***"},
        {"date":yyyymmddhhmmss,"value":"***"}
      ],
      "Count": 3,
    }
失败返回例子：

    {
      "Result": "failure",
      "ResultMsg": ""
    } 

后台：接口实现注意事项：

	1、查询数据平台中空间数据；
	2、在service层先做字段匹配转化，再从数据平台查询空间信息，参考"/doc/建筑空间类对象.xlsx"；
	3、信息点"xxx"的历史信息在空间信息中查找字段"xxx_his"的值，格式为：
	 "xxx_his" :[{"date":yyyymmddhhmmss,"value":""},{"date":"20170517170000","value":""}],
    4、返回的信息点历史要以时间倒序排序，注意时间格式的转化；
    
### 空间管理-详细页:编辑空间信息
>http://localhost:8080/saas/restSpaceService/updateSpaceInfo

post请求

参数例子：

    {
        "user_id":"***",                        //员工id-当前操作人id，必须
        "project_id":"***"                      //项目id,项目编码 ,必须
        "space_id":"***",       	            //空间id，必须
        "info_point_code":"room_local_name",    //修改的信息点编码，必须
        "info_point_value":"六层电梯间",            //修改的信息点的值，必须
        "valid_time":"20170108062907"           //生效时间，格式：yyyymmddhhmmss，可以为空
    }
    
成功返回例子：

    {
      "Result": "success",
      "ResultMsg": ""
    }

失败返回例子：

    {
      "Result": "failure",
      "ResultMsg": ""
    }

前台：接口调用注意事项：
    
    1、生效时间不传输或者为空时，默认是"修正输入错误";
    2、"该信息有变化"时，生效时间为必须；

后台：接口实现注意事项：

	1、调用数据平台修改空间信息；
	2、在service层先做字段匹配转化，参考"/doc/建筑空间类对象.xlsx"；
	3、要修改信息点值的同时，保存该信息点的历史记录；
	4、valid_time为空时，是修改该信息点历史记录时间最新一个的值，valid_time不为空时，加一条信息的历史记录，注意时间格式，valid_time不为空时保存格式："xxx_his":"20170108062907"；
		
## 设备通信录
### 设备通信录-列表页:查询设备通讯录列表
>http://localhost:8080/saas/restEquipCompanyService/queryEquipCompanyList

post请求

参数例子：

    {
      "user_id":"***",                 //员工id-当前操作人id，必须
      "project_id":"***",              //项目id，必须
      "company_type":"***",            //公司类型，1-供应商、2-生产厂家、3-维修商、4-保险公司，必须
      "page":1,                        //当前页号，默认从第1页开始
      "page_size":50                   //每页返回数量，不传时不分页
    } 

返回例子：

    {
      "Result": "success",
      "Content": [
        {
          "company_id":"***",           //公司id
          "company_type":"***",         //公司类型，1-供应商、2-生产厂家、3-维修商、4-保险公司
          "company_name":"***",         //公司名称
          "contacts":"***",             //联系人
          "phone":"***",                //联系电话
          "web":"***",                  //网址
          "fax":"***",                  //传真
          "email":"***",                //电子邮件
          "brands":["***","***"],       //设备品牌数组，生产厂家的字段
          "insurer_info":[              //保险单信息，保险公司的字段
             {
                "insurer_num":"***",    //保险单号
                "insurance_file":{"type":"1","name":"***","url":"***}     //保险文件，1-url，2-附件
             },
             {***}
          ]
        },
        {
          "company_id":"***",
          "company_type":"***",
          "company_name":"***",
          "contacts":"***",   
          "phone":"***",    
          "web":"***",  
          "fax":"***",   
          "email":"***",     
          "brands":["***","***"], 
          "insurer_info":[            
             {
                "insurer_num":"***", 
                "insurance_file":{"type":"1","name":"***","url":"***}     //保险文件，1-url，2-附件
             },
             {***}
          ]
        }
      ],
      "Count": 2,
    }

后台：接口实现注意事项：

	1、数据来源表设备通讯录表：equip_company_book；
	2、返回数据按照公司名称字典顺序排序；

### 设备通信录-列表页:添加公司信息
>http://localhost:8080/saas/restEquipCompanyService/addEquipCompany

post请求

参数例子：

    {
      "user_id":"***",                  //员工id-当前操作人id，必须
      "project_id":"***",               //项目id ,必须
      "company_type":"***",             //公司类型，1-供应商、2-生产厂家、3-维修商、4-保险公司
      "company_name":"***",             //公司名称
      "contacts":"***",                 //联系人
      "phone":"***",                    //联系电话
      "web":"***",                      //网址
      "fax":"***",                      //传真
      "email":"***",                    //电子邮件
      "brands":["***","***"],           //设备品牌数组，生产厂家的字段
      "insurer_info":[                  //保险单信息，保险公司的字段
         {
             "insurer_num":"***",       //保险单号
             "insurance_file":{"type":"1","name":"***","url":"***}     //保险文件，1-url，2-附件
         },
         {***}
      ]
    } 

成功返回例子：

    {
      "Result": "success",
      "ResultMsg": "",
    }

失败返回例子：

    {
      "Result": "failure",
      "ResultMsg": ""
    }

后台：接口实现注意事项：

	1、公司信息保存到设备通讯录表：equip_company_book；
	2、同时保存公司和设备的关系
	 
### 设备通信录-详细页:根据Id查询公司的详细信息
>http://localhost:8080/saas/restEquipCompanyService/queryEquipCompanyById

post请求

参数例子：

    {
      "user_id":"***",                      //员工id-当前操作人id，必须
      "company_id":"***"                    //公司id,必须
    }         

返回例子：

    {
      "Result": "success",
      "Item":{
          "company_id":"***",               //公司id
          "project_id":"***",               //项目id
          "company_type":"***",             //公司类型，1-供应商、2-生产厂家、3-维修商、4-保险公司
          "company_name":"***",             //公司名称
          "contacts":"***",                 //联系人
          "phone":"***",                    //联系电话
          "web":"***",                      //网址
          "fax":"***",                      //传真
          "email":"***",                    //电子邮件
          "brands":["***","***"],       //设备品牌数组，生产厂家的字段
          "insurer_info":[                  //保险单信息，保险公司的字段
             {
                 "insurer_num":"***",       //保险单号
                 "insurance_file":{"type":"1","name":"***","url":"***}     //保险文件，1-url，2-附件
             },
             {***}
          ],
          "can_delete":false,                //是否可删除
          "create_time":"20170620093000",   //创建时间，yyyyMMddHHmmss
          "update_time":"20170620093000"    //最后更新时间，yyyyMMddHHmmss  
      }
    } 

前台：接口调用注意事项：
    
    1、can_delete的值为true时，可以删除;
  
后台：接口实现注意事项：

	1、公司没有被设备使用时，公司信息可以被删除，使用后不能删除，查询公司设备关系表：company_equip_rel，有该公司的设备关系就不能删除；
	    
### 设备通信录-详细页:编辑公司信息
>http://localhost:8080/saas/restEquipCompanyService/updateEquipCompanyById

post请求

参数例子：

    {
      "user_id":"***",                      //员工id-当前操作人id，必须
      "project_id":"***",                   //项目id ,必须
      "company_id":"***",                   //公司id,必须
      "company_type":"***",                 //公司类型，1-供应商、2-生产厂家、3-维修商、4-保险公司
      "company_name":"***",                 //公司名称
      "contacts":"***",                     //联系人
      "phone":"***",                        //联系电话
      "web":"***",                          //网址
      "fax":"***",                          //传真
      "email":"***",                        //电子邮件
      "brands":["***","***"],               //设备品牌数组，生产厂家的字段
      "insurer_info":[                      //保险单信息，保险公司的字段
         {
            "insurer_num":"***",            //保险单号
            "insurance_file":{"type":"1","name":"***","url":"***}     //保险文件，1-url，2-附件
         },
         {***}
      ],
    } 
    
成功返回例子：

    {
      "Result": "success",
      "ResultMsg": ""
    }

失败返回例子：

    {
      "Result": "failure",
      "ResultMsg": ""
    }

前台：接口调用注意事项：
    
    1、编辑保存时，保存对应编辑的字段即可;
    2、"保险单信息"是数组格式，保存时要把编辑后的数据整体保存；
    
后台：接口实现注意事项：

	1、公司信息被修改后，引用公司的相关设备中信息也要连动修改，查询公司设备关系表：company_equip_rel，找到设备，修改设备下相关信息，不传生效时间；
    
### 设备通信录-详细页:删除公司信息
>http://localhost:8080/saas/restEquipCompanyService/deleteEquipCompanyById

post请求

参数例子：

    {
      "user_id":"***",                      //员工id-当前操作人id，必须
      "company_id":"***"                    //公司id,必须
    } 
    
成功返回例子：

    {
      "Result": "success",
      "ResultMsg": ""
    }

失败返回例子：

    {
      "Result": "failure",
      "ResultMsg": ""
    }

### 设备通信录-选择页:设备通讯录选择
>http://localhost:8080/saas/restEquipCompanyService/queryEquipCompanySel

post请求

参数例子：

    {
      "user_id":"***",                 //员工id-当前操作人id，必须
      "project_id":"***",              //项目id，必须
      "company_type":"***",            //公司类型，1-供应商、2-生产厂家、3-维修商、4-保险公司，必须
      "company_name":"***",            //公司名称，支持模糊查询
      "page":1,                        //当前页号，默认从第1页开始
      "page_size":50                   //每页返回数量，不传时不分页
    } 

返回例子：

    {
      "Result": "success",
      "Content": [
        {
          "company_id":"***",           //公司id
          "company_type":"***",         //公司类型，1-供应商、2-生产厂家、3-维修商、4-保险公司
          "company_name":"***",         //公司名称
          "contacts":"***",             //联系人
          "phone":"***",                //联系电话
          "web":"***",                  //网址
          "fax":"***",                  //传真
          "email":"***",                //电子邮件
          "brands":["***","***"],       //设备品牌数组，生产厂家的字段
          "insurer_info":[              //保险单信息，保险公司的字段
             {
                "insurer_num":"***",    //保险单号
                "insurance_file":{"type":"1","name":"***","url":"***}     //保险文件，1-url，2-附件
             },
             {***}
          ]
        },
        {
          "company_id":"***",
          "company_type":"***",
          "company_name":"***",
          "contacts":"***",   
          "phone":"***",    
          "web":"***",  
          "fax":"***",   
          "email":"***",     
          "brands":["***","***"],     
          "insurer_info":[            
             {
                "insurer_num":"***", 
                "insurance_file":{"type":"1","name":"***","url":"***}     //保险文件，1-url，2-附件
             },
             {***}
          ]
        }
      ],
      "Count": 2,
    }

后台：接口实现注意事项：

	1、数据来源表设备通讯录表：equip_company_book；
	2、支持公司名称模糊查询；
	3、返回数据按照公司名称字典顺序排序；
	
### 设备通信录-设备调用:添加品牌信息
>http://localhost:8080/saas/restEquipCompanyService/addCompanyBrand

post请求

参数例子：

    {
      "user_id":"***",                      //员工id-当前操作人id，必须
      "company_id":"***",                   //公司id,必须
      "brand":"***"                         //品牌名,必须
    } 
    
成功返回例子：

    {
      "Result": "success",
      "ResultMsg": ""
    }

失败返回例子：

    {
      "Result": "failure",
      "ResultMsg": ""
    }

    
后台：接口实现注意事项：

	1、根据公司id查询到公司信息，在其品牌数组中加入新的品牌；
	
### 设备通信录-设备调用:添加保险单号
>http://localhost:8080/saas/restEquipCompanyService/addCompanyInsurerNum

post请求

参数例子：

    {
      "user_id":"***",                      //员工id-当前操作人id，必须
      "company_id":"***",                   //公司id,必须
      "insurer_info":{                      //保险单信息,必须
          "insurer_num":"***",              //保险单号
          "insurance_file":{"type":"1","name":"***","url":"***}     //保险文件，1-url，2-附件
      }
    } 
    
成功返回例子：

    {
      "Result": "success",
      "ResultMsg": ""
    }

失败返回例子：

    {
      "Result": "failure",
      "ResultMsg": ""
    }

    
后台：接口实现注意事项：

	1、根据公司id查询到公司信息，在其保险单信息数组中加入新的；
	

## 打印设备空间名片
### 设备名片页:查询建筑列表
>http://localhost:8080/saas/restObjectService/queryBuild

输入、输出参见："对象选择:查询建筑体"

### 设备名片页:专业需求
>http://localhost:8080/saas/restGeneralDictService/queryGeneralDictByKey

post请求

参数例子：

    {
      "user_id":"***",                    //员工id-当前操作人id，必须
      "project_id":"***",                 //项目id，必须
      "dict_type": "domain_require"       //字典类型
    } 
返回值参见通用数据字典

### 设备名片页:系统专业下所有系统
>http://localhost:8080/saas/restObjectService/querySystemForSystemDomain

post请求

参数例子：

    {
      "user_id":"***",                    //员工id-当前操作人id，必须
      "project_id": "Pj1101010002"        //项目id, 必须
      "system_domain":"*****",            //系统所属专业编码, 必须
    } 

成功返回格式：

    {
      "Result": "success",
      "Content": [
        {
            "system_id": "*****",			//系统id
            "system_name": "*****",			//系统名称
        },
        {
            "system_id": "*****",			//系统id
            "system_name": "*****",			//系统名称
        }
      ],
      "Count": 2
    }
    
前台：接口调用注意事项：

	1、system_domain是专业需求中的code；


### 设备名片页:查询项目下设备列表

>http://localhost:8080/saas/restCardService/queryEquipList
post请求

参数例子：

    {
      "user_id":"***",                    //员工id-当前操作人id，必须
      "project_id":"***",                 //项目id, 必须
      "build_id":"***",                   //建筑id
      "domain_code":"***",                //专业编码
      "system_id":"*****",                //系统id
      "page":1,                           //当前页号，默认从第1页开始，必须
      "page_size":50                      //每页返回数量，不传时不分页，必须
    } 

成功返回格式：

    {
      "Result": "success",
      "Content": [
        {
          "equip_id":"***",             //设备id,
          "equip_local_id":"***",       //设备本地编码
          "equip_local_name":"***",     //设备本地名称
          "specification":"***",        //设备型号
          "position":"建筑-楼层-空间",    //所在位置
          "supplier":"***",             //供应商名称
          "download_flag":"1",          //下载标记，0-未下载，1-已下载
          "create_time":"***"           //创建时间/录入时间,yyyyMMddHHmmss
        },
        {
          "equip_id":"***",
          "equip_local_id":"***",  
          "equip_local_name":"***",     
          "specification":"***",      
          "position":"建筑-楼层-空间",   
          "supplier":"***",     
          "download_flag":"1",          //下载标记，0-未下载，1-已下载       
          "create_time":"***"      
        }
      ],
      "Count": 2
    }
    
后台：接口实现注意事项：

	1、默认查询有效的设备；
	2、从数据平台查询后，在service层要做字段匹配转化，参考"/doc/设备设施类对象(通用).xlsx"；
	3、所在位置不是设备本身字段信息，是通过关系查询出来的；
	4、设备名片下载标记查询saas下对象附加表obj_append；

### 设备名片页:查询项目下尚未下载设备列表

>http://localhost:8080/saas/restCardService/queryNotDownloadEquipList
post请求

参数例子：

    {
      "user_id":"***",                    //员工id-当前操作人id，必须
      "project_id":"***",                 //项目id, 必须
      "page":1,                           //当前页号，默认从第1页开始，必须
      "page_size":50                      //每页返回数量，不传时不分页，必须
    } 

成功返回格式：

    {
      "Result": "success",
      "Content": [
        {
          "equip_id":"***",             //设备id,
          "equip_local_id":"***",       //设备本地编码
          "equip_local_name":"***",     //设备本地名称
          "specification":"***",        //设备型号
          "position":"建筑-楼层-空间",    //所在位置
          "supplier":"***",             //供应商名称
          "create_time":"***"           //创建时间/录入时间,yyyyMMddHHmmss
        },
        {
          "equip_id":"***",
          "equip_local_id":"***",  
          "equip_local_name":"***",     
          "specification":"***",      
          "position":"建筑-楼层-空间",   
          "supplier":"***",            
          "create_time":"***"      
        }
      ],
      "Count": 2
    }
    
后台：接口实现注意事项：

	1、从saas下对象附加表obj_append中查询尚未下载的有效的设备列表；
	2、根据id数组查询设备信息；
	3、从数据平台查询后，在service层要做字段匹配转化，参考"/doc/设备设施类对象(通用).xlsx"；
	4、所在位置不是设备本身字段信息，是通过关系查询出来的；
		
### 设备名片页:下载设备名片

>http://localhost:8080/saas/restCardService/downloadEquipCard
post请求

参数例子：

    {
      "user_id":"***",                    //员工id-当前操作人id，必须
      "project_id":"***",                 //项目id, 必须
      "equip_ids":["***","***"]           //设备id数组, 必须
    } 

成功返回格式：

 
    
后台：接口实现注意事项：

	1、查找到设备名片样式配置，对象名片样式表：obj_card_style；
	2、下载设备名片，生成pdf文件；
	3、修改saas下对象附加表obj_append中的"download_flag"的值为1，标记为已下载；
	
### 空间名片页:查询某建筑下楼层列表
>http://localhost:8080/saas/restFloorService/queryFloorList

post请求

参数例子：

    {
      "user_id":"***",                    //员工id-当前操作人id，必须
      "project_id": "***",                //项目id，必须
      "build_id": "***"                   //所属建筑id，必须
    } 

成功返回格式：

    {
      "Result": "success",
      "Content": [
        {
          "floor_id":"***",               //楼层id
          "floor_local_name":"1层"        //楼层本地名称
        },
        {
          "floor_id":"***",               //楼层id
          "floor_local_name":"***"        //楼层本地名称
        }
      ],
      "Count": 2,
    }

前台：接口调用注意事项：

	1、返回数据按照楼层顺序码正序排序；	
	
后台：接口实现注意事项：

	1、返回数据按照楼层顺序码正序排序；	
	
### 空间名片页:查询项目下空间列表

>http://localhost:8080/saas/restCardService/querySpaceList
post请求

参数例子：

    {
      "user_id":"***",                    //员工id-当前操作人id，必须
      "project_id":"***",                 //项目id, 必须
      "build_id":"***",                   //建筑id
      "floor_id":"***",                   //楼层id
      "page":1,                           //当前页号，默认从第1页开始，必须
      "page_size":50                      //每页返回数量，不传时不分页，必须
    } 

成功返回格式：

    {
      "Result": "success",
      "Content": [
        {
          "space_id":"***",             //空间id,
          "room_local_name":"***",      //空间名称
          "room_func_type_name":"***",  //空间功能区类型名称
          "intro":"***",                //备注文字
          "download_flag":"1",          //下载标记，0-未下载，1-已下载
          "create_time":"***"           //创建时间/录入时间,yyyyMMddHHmmss
        },
        {
          "space_id":"***",  
          "room_local_name":"***",     
          "room_func_type_name":"***",  
          "intro":"***",      
          "download_flag":"1",   
          "create_time":"***"          
        }
      ],
      "Count": 2
    }
    
后台：接口实现注意事项：

	1、默认查询有效的空间；
	2、从数据平台查询后，在service层要做字段匹配转化，参考"/doc/设备设施类对象(通用).xlsx"；
	3、空间名片下载标记查询saas下对象附加表obj_append；

### 空间名片页:查询项目下尚未下载空间列表

>http://localhost:8080/saas/restCardService/queryNotDownloadSpaceList
post请求

参数例子：

    {
      "user_id":"***",                    //员工id-当前操作人id，必须
      "project_id":"***",                 //项目id, 必须
      "page":1,                           //当前页号，默认从第1页开始，必须
      "page_size":50                      //每页返回数量，不传时不分页，必须
    } 

成功返回格式：

    {
      "Result": "success",
      "Content": [
        {
          "space_id":"***",             //空间id,
          "room_local_name":"***",      //空间名称
          "room_func_type_name":"***",  //空间功能区类型名称
          "intro":"***",                //备注文字
          "create_time":"***"           //创建时间/录入时间,yyyyMMddHHmmss
        },
        {
          "space_id":"***",  
          "room_local_name":"***",     
          "room_func_type_name":"***",  
          "intro":"***",                 
          "create_time":"***"          
        }
      ],
      "Count": 2
    }
    
后台：接口实现注意事项：

	1、从saas下对象附加表obj_append中查询尚未下载的有效的空间列表；
	2、根据id数组查询空间信息；
	3、从数据平台查询后，在service层要做字段匹配转化，参考"/doc/设备设施类对象(通用).xlsx"；
	
### 空间名片页:下载空间名片

>http://localhost:8080/saas/restCardService/downloadSpaceCard
post请求

参数例子：

    {
      "user_id":"***",                    //员工id-当前操作人id，必须
      "project_id":"***",                 //项目id, 必须
      "space_ids":["***","***"]           //空间id数组, 必须
    } 

成功返回格式：

 
    
后台：接口实现注意事项：

	1、查找到空间名片样式配置，对象名片样式表：obj_card_style；
	2、下载空间名片，生成pdf文件；
	3、修改saas下对象附加表obj_append中的"download_flag"的值为1，标记为已下载；
	
### 定制名片:查询设备选择项
>http://localhost:8080/saas/restCardService/queryEquipOptions

post请求

参数例子：

    {
      "user_id":"***",                    //员工id-当前操作人id，必须
      "project_id": "***"                 //项目id，必须
    } 

成功返回格式：

    {
      "Result": "success",
      "Content": [
        {
          "info_point_code":"equip_local_name",   //信息点编码
          "info_point_name":"设备名称"             //信息点名称
        },
        {
          "info_point_code":"equip_local_id", 
          "info_point_name":"设备编码"          
        },
        {
          "info_point_code":"specification", 
          "info_point_name":"设备型号"          
        },
        {
          "info_point_code":"equip_category", 
          "info_point_name":"设备类型"          
        },
        {
          "info_point_code":"position", 
          "info_point_name":"安装位置"          
        },
        {
          "info_point_code":"system_id", 
          "info_point_name":"所属系统"          
        },
        {
          "info_point_code":"dept", 
          "info_point_name":"所属部门"          
        },
        {
          "info_point_code":"brand", 
          "info_point_name":"设备品牌"          
        },
        {
          "info_point_code":"start_date", 
          "info_point_name":"投产日期"          
        },
        {
          "info_point_code":"principal", 
          "info_point_name":"负责人"          
        },
        {
          "info_point_code":"service_life", 
          "info_point_name":"使用寿命"          
        },
        {
          "info_point_code":"maintainer", 
          "info_point_name":"维修商"          
        },
        {
          "info_point_code":"not_have", 
          "info_point_name":"无"          
        }
      ],
      "Count": 13,
    }

	
后台：接口实现注意事项：

	1、将选择项做成json字符串，放在配置文件中；
	2、下载设备名片时注意，设备类型、安装位置、所属系统等值不在设备基本信息中； 
	
### 定制名片:查询空间选择项
>http://localhost:8080/saas/restCardService/querySpaceOptions

post请求

参数例子：

    {
      "user_id":"***",                    //员工id-当前操作人id，必须
      "project_id": "***"                 //项目id，必须
    } 

成功返回格式：

    {
      "Result": "success",
      "Content": [
        {
          "info_point_code":"room_local_name",   //信息点编码
          "info_point_name":"空间名称"             //信息点名称
        },
        {
          "info_point_code":"room_local_id", 
          "info_point_name":"空间编码"          
        },
        {
          "info_point_code":"room_func_type_name", 
          "info_point_name":"功能区类型"          
        },
        {
          "info_point_code":"elec_cap", 
          "info_point_name":"配电容量"          
        },
        {
          "info_point_code":"position", 
          "info_point_name":"位置"          
        },
        {
          "info_point_code":"tenant_type_name", 
          "info_point_name":"租赁业态类型"          
        },
        {
          "info_point_code":"intro", 
          "info_point_name":"备注"          
        },
        {
          "info_point_code":"not_have", 
          "info_point_name":"无"          
        }
      ],
      "Count": 13,
    }

	
后台：接口实现注意事项：

	1、将选择项做成json字符串，放在配置文件中；
	2、下载设备名片时注意，设备类型、安装位置、所属系统等值不在设备基本信息中； 
### 定制名片:保存名片样式
>http://localhost:8080/saas/restCardService/saveEquipCardStyle
	
post请求

参数例子：

    {
      "user_id":"***",                      //员工id-当前操作人id，必须
      "project_id": "***",                  //项目id，必须
      "obj_type": "***",                    //对象类型，space、equip，必须
      "card_info":[                         //名片信息项，必须
         {"info_point_code":"***","info_point_name":"***"},
         {"info_point_code":"***","info_point_name":"***"},
         {"info_point_code":"***","info_point_name":"***"},
         {"info_point_code":"***","info_point_name":"***"},
         {"info_point_code":"***","info_point_name":"***"}
      ]                         
    } 
    
成功返回例子：

    {
      "Result": "success",
      "ResultMsg": ""
    }

失败返回例子：

    {
      "Result": "failure",
      "ResultMsg": ""
    }

    
后台：接口实现注意事项：

	1、保存到对象名片样式表：obj_card_style中；	
	
# 埋点
## 埋点-选择对象
>http://localhost:8080/saas/restBuryPointService/saveObjSel

post请求

参数例子：

    {
      "user_id":"***",               //员工id-当前操作人id，必须
      "project_id":"***",            //所属项目id，必须
      "from_type":"***",             //入口来源，1-新建SOP、2-新建工单、3-新建工单-添加工作内容，必须
      "hand_at":"***",               //手动@，1-是，0-否，必须
      "click_at_button":"***",       //点击@按钮，1-是，0-否，必须
      "click_class_option":"***",    //点击入口选项，1-是，0-否，必须
      "class_option_name":"***",     //选择入口选项，点击的入口项具体的文字，包括通用设备、通用系统、建筑、楼层、空间等
      "input_text":"***",            //直接输入文字，1-是，0-否，必须，@之后若输入过文字，则记录为1
      "click_custom_button":"***",   //点击自定义按钮，1-是，0-否，必须，
      "custom_result":"***",         //自定义结果
      "click_domain_button":"***",   //点击专业按钮，1-是，0-否，必须
      "click_system_button":"***",   //点击系统按钮，1-是，0-否，必须
      "final_result":"***"           //最终结果

    } 

成功返回例子：

    {
      "Result": "success",
      "ResultMsg": "",
    }

失败返回例子：

    {
      "Result": "failure",
      "ResultMsg": ""
    }

	
后台：接口实现注意事项：

	1、保存到saas下的web埋点-对象选择表：bp_obj_sel；
	
## 埋点-选择信息点
>http://localhost:8080/saas/restBuryPointService/saveInfoPointSel

post请求

参数例子：

    {
      "user_id":"***",               //员工id-当前操作人id，必须
      "project_id":"***",            //所属项目id，必须
      "from_type":"***",             //入口来源，1. 新建SOP、2. 新建工单-添加工作内容，必须
      "click_add_obj_info_point":"***",  //点击添加新对象和信息点按钮，1-是，0-否，必须
      "click_add_info_point":"***",  //点击添加信息点按钮，1-是，0-否，必须
      "click_class_option":"***",    //点击入口选项，1-是，0-否，必须
      "class_option_name":"***",     //选择入口选项，点击的入口项具体的文字，包括通用设备、通用系统、建筑、楼层、空间等
      "click_search_button":"***",   //点击搜索按钮，1-是，0-否，必须
      "search_use_enter_key":"***",   //搜索时使用回车键触发，1-是，0-否，必须
      "keyword_num":"2",             //输入关键词数量
      "click_custom_button":"***",   //点击自定义按钮，1-是，0-否，必须
      "custom_result":"***",         //自定义结果
      "final_result":"***"           //最终结果，选择的最终结果的文字（对象/部件/工具，包括自定义等）

    } 

成功返回例子：

    {
      "Result": "success",
      "ResultMsg": "",
    }

失败返回例子：

    {
      "Result": "failure",
      "ResultMsg": ""
    }

后台：接口实现注意事项：

	1、保存到saas下的web埋点-信息点选择表：bp_info_point_sel；	


## 埋点-选择SOP
>http://localhost:8080/saas/restBuryPointService/saveSopSel

post请求

参数例子：

    {
      "user_id":"***",               //员工id-当前操作人id，必须
      "project_id":"***",            //所属项目id，必须
      "hand_hash_key":"***",         //手动#，1-是，0-否，必须
      "click_hash_key":"***",        //点击#按钮，1-是，0-否，必须
      "input_text":"***",            //直接输入文字，1-是，0-否，必须
      "custom_sop_name":"***",       //自定义的SOP，输入#之后直接输入的文字，且该文字对应不到数据库中的SOP上时，这里把输入的文字记录下来
      "click_sop_name":"***",        //点击列表中SOP名称，1-是，0-否，必须
      "click_sop_screen_button":"***"//点击SOP的筛选按钮，1-是，0-否，必须

    } 

成功返回例子：

    {
      "Result": "success",
      "ResultMsg": "",
    }

失败返回例子：

    {
      "Result": "failure",
      "ResultMsg": ""
    }


后台：接口实现注意事项：

	1、保存到saas下的web埋点-sop选择表：bp_sop_sel；	
	
## 埋点-添加工作内容
>http://localhost:8080/saas/restBuryPointService/saveAddWork

post请求

参数例子：

    {
      "user_id":"***",               //员工id-当前操作人id，必须
      "project_id":"***",            //所属项目id，必须
      "click_close_button":"***",    //点击X按钮，1-是，0-否，必须
      "click_confirm_button":"***"   //点击确定按钮，1-是，0-否，必须
    } 

成功返回例子：

    {
      "Result": "success",
      "ResultMsg": "",
    }

失败返回例子：

    {
      "Result": "failure",
      "ResultMsg": ""
    }


后台：接口实现注意事项：

	1、保存到saas下的web埋点-添加工作内容表：bp_add_work；

## 埋点-新建工单
>http://localhost:8080/saas/restBuryPointService/saveAddWorkOrder

post请求

参数例子：

    {
      "user_id":"***",               //员工id-当前操作人id，必须
      "project_id":"***",            //所属项目id，必须
      "order_id":"***",              //工单id，必须
      "obj_num":"***",               //对象数量，必须
      "sop_num":"***",               //sop数量，必须
      "work_num":"***",              //工作内容数量，必须
      "new_tool_num":"***"           //添加的工具数量，1-是，0-否，必须
    } 

成功返回例子：

    {
      "Result": "success",
      "ResultMsg": "",
    }

失败返回例子：

    {
      "Result": "failure",
      "ResultMsg": ""
    }

前台：接口调用注意事项：
	
	1、工单发布成功之后调用该方法；
	
后台：接口实现注意事项：

	1、保存到saas下的web埋点-新建工单表：bp_add_work_order；
	
## 埋点-模式切换
>http://localhost:8080/saas/restBuryPointService/saveWoInputMode

post请求

参数例子：

    {
      "user_id":"***",               //员工id-当前操作人id，必须
      "order_id":"***",              //工单id，必须
      "free_input":"***",            //自由输入模式，1-是，0-否，必须
      "structure_input":"***"        //结构化输入模式，1-是，0-否，必须
    } 

成功返回例子：

    {
      "Result": "success",
      "ResultMsg": "",
    }

失败返回例子：

    {
      "Result": "failure",
      "ResultMsg": ""
    }
	
后台：接口实现注意事项：

	1、保存到saas下的web埋点-模式切换表：bp_wo_input_mode；
	
## 埋点-修订变更面板
>http://localhost:8080/saas/restBuryPointService/saveLookReviseExplain

post请求

参数例子：

    {
      "user_id":"***",               //员工id-当前操作人id，必须
      "project_id":"***"             //所属项目id，必须
    } 

成功返回例子：

    {
      "Result": "success",
      "ResultMsg": "",
    }

失败返回例子：

    {
      "Result": "failure",
      "ResultMsg": ""
    }
	
后台：接口实现注意事项：

	1、保存到saas下的web埋点-查看修订说明表：bp_look_revise_explain；
	
## 埋点-流转配置预置报错-后台记录

后台：接口实现注意事项：

	1、工单方案验证时记录报错提示内容；
	2、保存到saas下的web埋点-流转配置预置报错表：bp_flow_plan_error；
	
## 埋点-工单监控
>http://localhost:8080/saas/restBuryPointService/saveWoMonitor

post请求

参数例子：

    {
      "user_id":"***",               //员工id-当前操作人id，必须
      "project_id":"***"             //所属项目id，必须
      "order_id":"***",              //工单id，必须
      "do_assign":"***",             //执行指派操作，1-是，0-否，必须
      "do_stop":"***",               //执行中止操作，1-是，0-否，必须
      "order_type_name":"***",       //工单类型名称，必须
      "executie_mode_name":"***"     //时间类型名称，工单执行方式名称，必须
    } 

成功返回例子：

    {
      "Result": "success",
      "ResultMsg": "",
    }

失败返回例子：

    {
      "Result": "failure",
      "ResultMsg": ""
    }
	
后台：接口实现注意事项：

	1、保存到saas下的web埋点-工单监控表：bp_wo_monitor；