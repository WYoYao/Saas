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
### 用户登录
>http://localhost:8080/saas-manage/restUserService/login

post请求

参数例子：

    {
      "user_name":"sagaadmin",		//管理员账户,必须
      "user_psw":"saga123456"		//密码,必须
    } 

管理员登录，成功返回例子：

    {
      "Result": "success",
      "Item":{
            "user_id":"sagaadmin",      		//员工id
            "user_name":"sagaadmin",	      	//姓名
            "system_code":"saas",               //系统编码，用于图片服务，
            "image_secret":"***"                //秘钥，用于图片服务，
        }
      "ResultMsg": "登录成功！"
    }
失败返回例子：

    {
      "Result": "failure",
      "ResultMsg": "用户名或者密码错误！"
    }

## 通用数据字典查询
### 数据字典:查询所有行政区编码
>http://localhost:8080/saas-manage/restDictService/queryAllRegionCode

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
                  "code":"110000",		//省级编码
                  "name": "北京市",		//省级名称
                  "type": "2",			//类型，1-省，2-直辖市
                  "cities": [
                      {
                        "code": "110000",			//市编码
                        "name": "北京市",			//市名称
                        "longitude": "116.4",		//经度
                        "latitude": "39.9",			//维度
                        "altitude": "54",			//海拔，单位m
                        "climate": "20",			//气候区编码	
                        "developLevel": "1110",		//发展水平编码
                        "districts": [
                           {
                              "code": "110101",
                              "name": "东城区",
                              "longitude": "116.42",
                              "latitude": "39.93",
                              "altitude": "53"
                           },
                           {.....}
                        ]
                     }
                  ]
            },
            {
                  "code":"130000",		//省级编码
                  "name": "河北省",		//省级名称
                  "type": "1",			//类型，1-省，2-直辖市
                  "cities": [
                     {
                        "code": "130100",
                        "name": "石家庄市",
                        "longitude": "114.52",
                        "latitude": "38.05",
                        "altitude": "80.5"
                        "climate": "20",
                        "developLevel": "1222",
                        "districts": [
                        	{
                              "code": "130102",
                              "name": "长安区",
                              "longitude": "114.52",
                              "latitude": "38.05",
                              "altitude": "74"
                            },
                            {.....}
                        ]
                    }
                  ]
            },
            {...}
      	],
      "Count": 32
    }

接口注意事项：

	1、直辖市的省级编码和名称是与市相同的;
	2、只有市级城市有发展水平和气候区;

### 数据字典:查询所有气候区代码
>http://localhost:8080/saas-manage/restDictService/queryAllClimateAreaCode

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
            "code": "10",
            "name": "严寒地区",
            "content": [
                {
                  "code": "11",
                  "name": "严寒A区",
                  "info": "6000≤HDD18"
                },
                {
                  "code": "12",
                  "name": "严寒B区",
                  "info": "5000≤HDD18＜6000"
                },
                {
                  "code": "13",
                  "name": "严寒C区",
                  "info": "3800≤HDD18＜5000"
                }
            ]
         },
         {
            "code": "20",
            "name": "寒冷地区",
            "content": [
               {
                  "code": "21",
                  "name": "寒冷A区",
                  "info": "2000≤HDD18＜3800，CDD26≤90"
               },
               {
                  "code": "22",
                  "name": "寒冷B区",
                  "info": "2000≤HDD18＜3800，CDD26＞90"
               }
            ]
        },
        {
            "code": "30",
            "name": "夏热冬冷地区",
            "content": [
               {
                  "code": "31",
                  "name": "夏热冬冷A区",
                  "info": "1000≤HDD18＜2000，50＜CDD26≤150"
               },
               {
                  "code": "32",
                  "name": "夏热冬冷B区",
                  "info": "2000≤HDD18＜3800，150＜CDD26≤300"
               },
               {
                  "code": "33",
                  "name": "夏热冬冷C区",
                  "info": "2000≤HDD18＜3800，100＜CDD26≤300"
               }
            ]
         },
         {
            "code": "40",
            "name": "夏热冬暖地区",
            "content": [
               {
                  "code": "40",
                  "name": "夏热冬暖地区",
                  "info": "HDD18＜6000，CDD26＞200"
               }
            ]
         },
         {
            "code": "50",
            "name": "温和地区",
            "content": [
               {
                  "code": "51",
                  "name": "温和A区",
                  "info": "600≤HDD18＜2000，CDD26≤50"
               },
               {
                  "code": "52",
                  "name": "温和B区",
                  "info": "HDD18＜600，CDD26≤50"
               }
            ]
        }
      ]
	}
    
### 数据字典:查询所有发展水平代码
>http://localhost:8080/saas-manage/restDictService/queryAllDevelopLevelCode

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
            "code": "1000",
            "name": "中国",
            "content": [
               {
                  "code": "1100",
                  "name": "直辖市",
                  "content": [
                     {
                        "code": "1110",
                        "name": "一线城市",
                        "content": []
                     },
	                 {
                        "code": "1120",
                        "name": "二线发达城市",
                        "content": []
                	 }
                  ]
               },
    	       {
                  "code": "1200",
                  "name": "省会",
                  "content": [
                     {
                        "code": "1210",
                        "name": "一线城市",
                        "content": []
                     },
        	         {
                        "code": "1220",
                        "name": "二线城市",
                        "content": [
                           {
                              "code": "1221",
                              "name": "二线发达城市"
                           },
                           {
                              "code": "1222",
                              "name": "二线中等发达城市"
                           },
                	       {
                              "code": "1223",
                              "name": "二线发展较弱城市"
                           }
                        ]
                     },
        	         {
                        "code": "1230",
                        "name": "三线城市",
                        "content": []
                     }
                  ]
               },
               {
                  "code": "1300",
                  "name": "自治区首府",
                  "content": [
                     {
                        "code": "1310",
                        "name": "三线城市",
                        "content": []
                     },
                	 {
                        "code": "1320",
                        "name": "无线城市",
                        "content": []
	                 }
                  ]
               },
               {
                  "code": "1400",
                  "name": "地级市",
                  "content": [
                     {
                        "code": "1410",
                        "name": "一线城市",
                        "content": []
                     },
                     {
                        "code": "1420",
                        "name": "二线城市",
                        "content": [
        	               {
                              "code": "1421",
                              "name": "二线发达城市"
                           },
                           {
                              "code": "1422",
                              "name": "二线中等发达城市"
	                       },
                           {
                              "code": "1423",
                              "name": "二线发展较弱城市"
                	       }
                        ]
                     },
	                 {
                        "code": "1430",
                        "name": "三线城市",
                        "content": []
                	 },
                     {
                        "code": "1440",
                        "name": "四线城市",
                        "content": []
                	 },
        	         {
                        "code": "1450",
                        "name": "五线城市",
                        "content": []
                      }
                  ]
               },
        	   {
                  "code": "1500",
                  "name": "县级市",
                  "content": [
                     {
                        "code": "1510",
                        "name": "三线城市",
                        "content": []
                     },
                	 {
                        "code": "1520",
                        "name": "四线城市",
                        "content": []
                     },
                     {
                        "code": "1530",
                        "name": "五线城市",
                        "content": []
                     },
                     {
                        "code": "1540",
                        "name": "六线城市",
                        "content": []
        	         }
                  ]
               },
               {
                  "code": "1600",
                  "name": "港澳台地区",
                  "content": [
                     {
                        "code": "1610",
                        "name": "特别行政区",
                        "content": []
	                 },
                     {
                        "code": "1620",
                        "name": "其他",
                        "content": []
                     }
                  ]
               }
            ]
         },
    	 {
            "code": "2000",
            "name": "海外",
            "content": []
         }
      ]
	}

### 数据字典:查询所有建筑功能
>http://localhost:8080/saas-manage/restDictService/queryAllBuildingType

post请求

参数例子：

    {
      "user_id":"*****"    		//员工id-当前操作人id，必须
    } 

返回例子

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
                    }
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
            }
            ...
        ]
    }
### 数据字典:添加通用数据字典类型
>http://localhost:8080/saas-manage/restGeneralDictService/addGeneralDict

post请求

参数例子：

    {
      "user_id":"***",                    	//员工id-当前操作人id，必须
      "dict_type": "***",          		//类型 必须
      "code":"***",					//编码  必须
      "name":"***",					//系统名称 必须
      "description":"***",				//名词释义(描述)
      "default_use":true,				//默认使用状态 true/false  必须
      "customer_use":{					//客户使用状态
      	"":true					//{project_id:true,project_id:false}
      },
      "customer_name":{					//客户本地名称
      	"":"***"					//{project_id:name,project_id:name}
      }
    } 

返回例子：

    {
      "Result": "success",
      "ResultMsg": ""
    }
    
### 数据字典:报修问题类型
>http://localhost:8080/saas-manage/restGeneralDictService/queryGeneralDictByKey

post请求

参数例子：

    {
      "user_id":"***",                    //员工id-当前操作人id，必须
      "project_id":"***",                 //项目id，必须
      "dict_type": "repair_type"          //报修问题类型 必须
    } 

返回例子：

    {
      "Result": "success",
      "Content": [
         {"code":"9"," name":"其他", "description": "释义***"}
      ],
      "Count": 2,
    }
    
### 数据字典:报修问题类型（后台内部使用）
>http://localhost:8080/saas-manage/restGeneralDictService/queryGeneralDictByDictType

post请求

参数例子：

    {
      "user_id":"***",                    //员工id-当前操作人id，必须
      "dict_type": "repair_type"          //报修问题类型 必须
    } 

返回例子：

    {
      "Result": "success",
      "Content": [
         {
         	"code":"",  				//编码
         	"name":"",					//系统名称
         	"description":"",				//名词释义(描述)
         	"default_use":true/false,		//默认使用状态
         	"customer_use": {				//客户使用状态
         		"key":"value",			//key:项目id,value:true/false
         		"key":"value"			//key:项目id,value:true/false
         	},
         	"customer_name": {			//客户本地名称
         		"key":"value",			//key:项目id,value:项目本地名称
         		"key":"value"			//key:项目id,value:项目本地名称
         	}
         }
      ],
      "Count": 2,
    }
    
    注意事项：
    1、编码名称：如果存在项目本地名称，则使用项目本地名称，否则使用系统名称
    2、当只有当customer_use 中项目id的value值为false时，或者 此value不存在并且default_use默认使用状态为false是，才是无效数据，其他情况都是有效数据。
    
### 数据字典:查询工单类型
>http://localhost:8080/saas-manage/restGeneralDictService/queryGeneralDictByKey

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

# web功能列表
## 客户信息管理/项目信息管理
### 客户信息管理-列表页:查询所有客户信息
>http://localhost:8080/saas-manage/restCustomerService/queryAllCustomer

post请求

参数例子：

    {
      "user_id":"*****"    		//员工id-当前操作人id，必须
      "company_name":"*****" 	//公司名称，非必须
    } 

返回例子：

    {
      "Result": "success",
      "Content": [
        {
          "customer_id":"*****",		//客户id
          "project_name":"*****",		//项目名称
          "project_local_name":"*****",	//项目本地名称
          "company_name":"*****",		//公司名称
          "build_count":5,				//建筑数量
          "contact_person":"*****",		//联系人
          "contact_phone":"*****",		//联系人电话
          "customer_status":"*****"		//客户状态,1-创建中，2-正常，3-被锁定
        },
        {
          "customer_id":"*****",		//客户id
          "project_name":"*****",		//项目名称
          "project_local_name":"*****",	//项目本地名称
          "company_name":"*****",		//公司名称
          "build_count":5,				//建筑数量
          "contact_person":"*****",		//联系人
          "contact_phone":"*****",		//联系人电话
          "customer_status":"*****"		//客户状态,1-创建中，2-正常，3-被锁定
        }
      ],
      "Count": 2,
    }

接口实现注意事项：

	1、支持按照公司名称进行模糊搜索;
	2、列表排序默认按照客户信息创建时间倒序排列,因id是按照时间戳生成的，查询出的数据直接倒序即可；

### 客户信息管理-新增页:查询所有行政区编码
>http://localhost:8080/saas-manage/restDictService/queryAllRegionCode

post请求

参数例子：

    {
      "user_id":"*****"    		//员工id-当前操作人id，必须
    } 

返回例子：参考数据字典查询部分

### 客户信息管理-新增页:查询所有气候区代码
>http://localhost:8080/saas-manage/restDictService/queryAllClimateAreaCode

post请求

参数例子：

    {
      "user_id":"*****"    		//员工id-当前操作人id，必须
    } 

返回例子：参考数据字典查询部分   

### 客户信息管理-新增页:查询所有发展水平代码
>http://localhost:8080/saas-manage/restDictService/queryAllDevelopLevelCode

post请求

参数例子：

    {
      "user_id":"*****"    		//员工id-当前操作人id，必须
    } 

返回例子：参考数据字典查询部分

### 客户信息管理-新增页:查询所有建筑功能
>http://localhost:8080/saas-manage/restDictService/queryAllBuildingType

post请求

参数例子：

    {
      "user_id":"*****"    		//员工id-当前操作人id，必须
    } 

返回例子：参考数据字典查询部分

### 客户信息管理-新增页:验证邮箱是否唯一
>http://localhost:8080/saas-manage/restCustomerService/validCustomerMailForAdd

post请求

参数例子
    
    {
        "user_id":"***",        //员工ID-当前操作人id，必须
        "customer_id":"***",    //客户ID，保存过草稿之后，该值为必须
        "mail":"***"            //公司邮箱
    }
   
成功返回例子
    
    {
        "Result":"success",
        "Item":{
            "can_user":true
        }
    }
    或
    {
        "Result":"success",
        "Item":{
            "can_user":false
        }
    }
   
失败返回例子
    
    {
        "Result":"failure",
        "ResultMsg":""
    }

### 客户信息管理-新增页:保存草稿状态客户信息
>http://localhost:8080/saas-manage/restCustomerService/saveDraftCustomer

post请求

参数例子：参数要求build_list中包含全部建筑体，已保存过的建筑build_id为必须；

    {
      "user_id":"*****",      			//员工id-当前操作人id，必须
      "customer_id":"*****",      		//客户id，保存过草稿之后，该值为必须
      "company_name":"*****",       	//公司名称 ,必须
      "legal_person":"*****",     		//公司法人
      "account":"*****",       			//账号
      "mail":"*****",       			//公司邮箱
      "contact_person":"*****",       	//联系人
      "contact_phone":"*****",       	//联系人电话
      "operation_valid_term_start":"*****", //公司经营有效期限开始日期，YYYY-MM-DD
      "operation_valid_term_end":"*****", 	//公司经营有效期限结束日期，YYYY-MM-DD
      "contract_valid_term_start":"*****",  //托管合同有效期限开始日期，YYYY-MM-DD
      "contract_valid_term_end":"*****",    //托管合同有效期限结束日期，YYYY-MM-DD
      "business_license":"*****",       //营业执照，图片的key
      "pictures":["***","***"],       	//产权证/托管合同，图片key的数组
      "tool_type":"Web",       			//工具类型,Web，Revit
      "project_local_name":"*****",     //项目本地名称
      "province":"*****",       		//省编码
      "city":"*****",       			//市编码
      "district":"*****",       		//市内编码
      "climate_zone":"*****",       	//气候区编码
      "urban_devp_lev":"*****",			//城市发展水平编码
      "longitude":"*****",       		//经度
      "latitude":"*****",       		//维度
      "altitude":"*****",       		//海拔
      "note":"*****",       			//备注
      "build_list":[					//建筑数组
          	 {
          	    "build_id":"*****",    		//建筑id，新增的建筑，该值为非必须
          		"build_local_name":"*****",	//建筑本地名称
          		"build_age":"*****",		//建筑年代
          		"build_func_type":"*****" 	//建筑功能类型编码
          	 },
          	 {
          	    "build_id":"*****",    		//建筑id，新增的建筑，该值为非必须
          		"build_local_name":"*****",	//建筑本地名称
          		"build_age":"*****",		//建筑年代
          		"build_func_type":"*****" 	//建筑功能类型编码
          	 },
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
  
接口实现注意事项：

	1、如果customer_id为空时，则是新增客户信息，否则是修改客户信息，且客户状态为1（新建中）;
	2、如果mail值不为空，则给账号赋值；
	3、如果build_id为空时，则是新增建筑信息，否则是修改建筑信息;

### 客户信息管理-新增页:保存确认状态客户信息
>http://localhost:8080/saas-manage/restCustomerService/saveConfirmCustomer

post请求

参数例子：参数要求build_list中包含全部建筑体，已保存过的建筑build_id为必须；

    {
      "user_id":"*****",      			//员工id-当前操作人id，必须
      "customer_id":"*****",      		//客户id，保存过草稿之后，该值为必须
      "company_name":"*****",       	//公司名称 ,必须
      "legal_person":"*****",     		//公司法人
      "account":"*****",       			//账号
      "mail":"*****",       			//公司邮箱
      "contact_person":"*****",       	//联系人
      "contact_phone":"*****",       	//联系人电话
      "operation_valid_term_start":"*****", //公司经营有效期限开始日期，YYYY-MM-DD
      "operation_valid_term_end":"*****", 	//公司经营有效期限结束日期，YYYY-MM-DD
      "contract_valid_term_start":"*****",  //托管合同有效期限开始日期，YYYY-MM-DD
      "contract_valid_term_end":"*****",    //托管合同有效期限结束日期，YYYY-MM-DD
      "business_license":"*****",       //营业执照，图片的key
      "pictures":["***","***"],       	//产权证/托管合同，图片key的数组
      "tool_type":"Web",       			//工具类型,Web，Revit
      "project_local_name":"*****",     //项目本地名称，必须
      "province":"*****",       		//省编码，必须
      "city":"*****",       			//市编码，必须
      "district":"*****",       		//市内编码，必须
      "climate_zone":"*****",       	//气候区编码
      "urban_devp_lev":"*****",       	//城市发展水平编码
      "longitude":"*****",       		//经度，必须
      "latitude":"*****",       		//维度，必须
      "altitude":"*****",       		//海拔
      "note":"*****",       			//备注
      "build_list":[					//建筑数组
          	 {
          	    "build_id":"*****",    		//建筑id，新增的建筑，该值为非必须
          		"build_local_name":"*****",	//建筑本地名称
          		"build_age":"*****",		//建筑年代
          		"build_func_type":"*****" 	//建筑功能类型编码
          	 },
          	 {
          	    "build_id":"*****",    		//建筑id，新增的建筑，该值为非必须
          		"build_local_name":"*****",	//建筑本地名称
          		"build_age":"*****",		//建筑年代
          		"build_func_type":"*****" 	//建筑功能类型编码
          	 },
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
    
接口实现注意事项：

	1、如果customer_id为空时，则是新增客户信息，否则是修改客户信息，且客户状态为2（正常）;
	2、如果mail值不为空，则给账号赋值；
	3、如果build_id为空时，则是新增建筑信息，否则是修改建筑信息;
	4、调用数据平台接口，生成项目和建筑的相关信息，且在客户信息下保存项目ID、项目名称、建筑体ID、建筑体名称；
	5、生成客户登录密码，并自动向企业邮箱发送登陆账号和密码信息，且向联系人手机发送提示短信；
 
### 客户信息管理-详细页:锁定客户信息
>http://localhost:8080/saas-manage/restCustomerService/lockCustomerById

post请求

参数例子：

    {
      "user_id":"*****",			//员工id-当前操作人id，必须
      "customer_id":"*****"			//客户id ,必须
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

### 客户信息管理-详细页:解锁客户信息
>http://localhost:8080/saas-manage/restCustomerService/unlockCustomerById

post请求

参数例子：

    {
      "user_id":"*****",			//员工id-当前操作人id，必须
      "customer_id":"*****"			//客户id ,必须
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

### 客户信息管理-详细页:重置客户密码
>http://localhost:8080/saas-manage/restCustomerService/resetCustomerPasswd

post请求

参数例子：

    {
      "user_id":"*****",			//员工id-当前操作人id，必须
      "customer_id":"*****"			//客户id ,必须
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

接口实现注意事项：

	1、生成客户登录密码，并自动向企业邮箱发送登陆账号和密码信息，且向联系人手机发送提示短信；
   
### 客户信息管理-详细页:根据Id查询客户详细信息
>http://localhost:8080/saas-manage/restCustomerService/queryCustomerById

post请求

参数例子：

    {
      "user_id":"*****",			//员工id-当前操作人id，必须
      "customer_id":"*****"			//客户id ,必须
    }         

返回例子：

    {
      "Result": "success",
      "Item":{
          "customer_id":"*****",      		//客户id
          "company_name":"*****",       	//公司名称 ,必须
          "legal_person":"*****",     		//公司法人
          "account":"*****",       			//账号
          "mail":"*****",       			//公司邮箱
          "contact_person":"*****",       	//联系人
          "contact_phone":"*****",       	//联系人电话
          "operation_valid_term_start":"*****", //公司经营有效期限开始日期，YYYY-MM-DD
          "operation_valid_term_end":"*****", 	//公司经营有效期限结束日期，YYYY-MM-DD
          "contract_valid_term_start":"*****",  //托管合同有效期限开始日期，YYYY-MM-DD
          "contract_valid_term_end":"*****",    //托管合同有效期限结束日期，YYYY-MM-DD
          "business_license":"*****",       //营业执照，图片的key
          "pictures":["***","***"],       	//产权证/托管合同，图片key的数组
          "tool_type":"Web",       			//工具类型,Web，Revit
          "project_id":"*****",       		//项目id/项目编码
          "project_name":"*****",       	//项目名称
          "project_local_name":"*****",     //项目本地名称
          "province":"*****",       		//省编码
          "city":"*****",       			//市编码
          "district":"*****",       		//市内编码
          "province_city_name":"河北省·石家庄市·长安区",     //省市区域名称
          "climate_zone":"*****",       	//气候区编码
          "climate_zone_name":"*****",      //气候区名称
          "urban_devp_lev":"*****",       	//城市发展水平编码
          "urban_devp_lev_name":"*****",    //城市发展水平名称
          "longitude":"*****",       		//经度
          "latitude":"*****",       		//维度
          "altitude":"*****",       		//海拔
          "note":"*****",       			//备注
          "create_time":"2017-06-20 09:30:00",   //创建时间，yyyy-MM-dd HH:mm:ss
          "build_list":[					//建筑数组
          	 {
          	    "build_id":"*****",       	//建筑id
          	    "build_code":"*****", 		//建筑编码
          		"build_name":"*****",       //建筑名称
          		"build_local_name":"*****", //建筑本地名称
          		"build_age":"*****",       	//建筑年代
          		"build_func_type":"*****",  //建筑功能类型编码
          		"build_func_type_name":"*****", //建筑功能类型名称
          		"create_time":"2017-06-20 09:30:00"  //创建时间，yyyy-MM-dd HH:mm:ss
          	 },
          	 {
          	    "build_id":"*****",       	//建筑id
          	    "build_code":"*****", 		//建筑编码
          		"build_name":"*****",       //建筑名称
          		"build_local_name":"*****", //建筑本地名称
          		"build_age":"*****",       	//建筑年代
          		"build_func_type":"*****",  //建筑功能类型编码
          		"build_func_type_name":"*****", //建筑功能类型名称
          		"create_time":"2017-06-20 09:30:00"  //创建时间，yyyy-MM-dd HH:mm:ss
          	 },
          ]
        }
    } 
    
失败返回例子：

    {
      "Result": "failure",
      "ResultMsg": ""
    } 
    
### 客户信息管理-编辑页:根据Id编辑客户信息
>http://localhost:8080/saas-manage/restCustomerService/updateCustomerById

post请求

参数例子：

    {
      "user_id":"*****",	       		//员工id-当前操作人id，必须
      "customer_id":"*****",      		//客户id ,必须
      "company_name":"*****",       	//公司名称
      "legal_person":"*****",     		//公司法人
      "contact_person":"*****",       	//联系人
      "contact_phone":"*****",       	//联系人电话
      "operation_valid_term_start":"*****", //公司经营有效期限开始日期，YYYY-MM-DD
      "operation_valid_term_end":"*****", 	//公司经营有效期限结束日期，YYYY-MM-DD
      "contract_valid_term_start":"*****",  //托管合同有效期限开始日期，YYYY-MM-DD
      "contract_valid_term_end":"*****",    //托管合同有效期限结束日期，YYYY-MM-DD
      "business_license":"*****",       //营业执照，图片的key
      "pictures":["***","***"],       	//产权证/托管合同，图片key的数组
      "tool_type":"Web",       			//工具类型,Web，Revit
      "longitude":"*****",       		//经度
      "latitude":"*****",       		//维度
      "altitude":"*****",       		//海拔
      "note":"*****"       				//备注
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

### 客户信息管理-编辑页:添加确认状态的建筑信息
>http://localhost:8080/saas-manage/restCustomerService/addConfirmBuild

post请求

参数例子：

    {
      "user_id":"*****",			//员工id-当前操作人id，必须
      "customer_id":"*****",		//客户id ,必须
      "project_id":"*****",			//项目id/项目编码 ,必须
      "build_local_name":"*****",   //建筑本地名称
      "build_age":"*****",			//建筑年代
      "build_func_type":"*****"		//建筑功能类型编码
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

接口实现注意事项：

	1、调用数据平台接口，建筑的相关信息，且在客户信息下保存建筑体ID、建筑体名称；

### 客户信息管理-编辑页:编辑确认状态的建筑信息
>http://localhost:8080/saas-manage/restCustomerService/updateConfirmBuild

post请求

参数例子：

    {
      "user_id":"*****",			//员工id-当前操作人id，必须
      "build_id":"*****",           //建筑id，必须
      "build_code":"*****", 		//建筑编码，必须
      "build_age":"*****",			//建筑年代
      "build_func_type":"*****"		//建筑功能类型编码
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

接口实现注意事项：

	1、调用数据平台接口，建筑的相关信息，且在客户信息下保存建筑体ID、建筑体名称；

## 工单自定义状态管理
### 工单状态管理-列表页:数据字典-工单类型
### 工单状态管理-列表页:查询工单状态列表
>http://localhost:8080/saas-manage/restWoStateService/queryWoStateList

post请求

参数例子：

    {
      "user_id":"*****"    		          //员工id-当前操作人id，必须
      "project_id":"***",                 //项目id，必须
      "order_type":"***",                 //工单类型编码
      "urgency":"高",                     //紧急程度，高、中、低
      "is_repair_use":"1",                //是否业主租户报修专用，1-是，0-否
    } 

返回例子：

    {
      "Result": "success",
      "Content": [
        {
          "custom_state_id":"***",      //主键id
          "state_type":"***",           //状态类型，1-系统内置，2-自定义
          "code":"***",                 //状态编码
          "name":"***",                 //状态名称
          "events":[                    //事件数组
             {
                "event_name":"***",              //触发事件名称
                "condition_desc":"***",          //条件描述,后台生成
                "description":"***"              //说明
             },
             {
                "event_name":"***",              //触发事件名称
                "condition_desc":"***",          //条件描述,后台生成
                "description":"***"              //说明
             }
          ],
          "customer_name":"***"                  //本地名称
        },
        {
          "custom_state_id":"***", 
          "state_type":"***", 
          "code":"***", 
          "name":"***", 
          "events":[ 
             {
                "event_name":"***",              //触发事件名称
                "condition_desc":"***",          //条件描述,后台生成
                "description":"***"              //说明
             }
          ]
        },
        "customer_name":"***"                    //本地名称
      ],
      "Count": 2,
    }

前台：接口调用注意事项：

	1、注意events下多个触发事件时的列表展示样式；
	2、列表页建议在"状态"列前，加一列"状态编码";
	3、state_type的值为1时可以修改名称，为2时可以编辑；

后台：接口实现注意事项：

	1、系统内置的工单状态来：源数据字典表general_dictionary，可以将其触发事件配置在后台文件中；
	2、工单自定义状态来源于：工单自定义状态表：wo_custom_state；
	3、当查询条件 order_type、urgency中一个有值时或者is_repair_use为1时，直接查询工单自定义状态表；
	4、返回数据按照工单编号正序排序；
	


>http://localhost:8080/saas-manage/restGeneralDictService/queryGeneralDictByKey

post请求

参数例子：

    {
      "user_id":"***",                    //员工id-当前操作人id，必须
      "project_id":"***",                 //项目id，必须
      "dict_type": "work_order_type"      //工单类型，必须
    } 

返回值参见通用数据字典

### 工单状态管理-列表页:修改本地名称
>http://localhost:8080/saas-manage/restWoStateService/updateCustomerName

post请求

参数例子：

    {
      "user_id":"***",                    //员工id-当前操作人id，必须
      "project_id":"***",                 //项目id，必须
      "custom_state_id":"***",            //主键id，必须
      "customer_name":"***"               //本地名称
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

	1、系统内置的工单状态可以修改本地名称：源数据字典表general_dictionary；
	
### 工单状态管理-新增页:查询工单状态事件列表
>http://localhost:8080/saas-manage/restWoStateService/queryWoStateEventList

post请求

参数例子：

    {
      "user_id":"***"    		          //员工id-当前操作人id，必须
    } 

返回例子：

    {
      "Result": "success",
      "Content": [
         {
            "event_code": "repair_finish",   //触发事件编码
            "event_name": "报修完成后"         //触发事件名称
         },
         {
            "event_code": "wo_publish",
            "event_name": "正式发出工单时",
            "options": []
         },
         {
            "event_code": "first_exec_receive",
            "event_name": "第一次被有执行操作的人接单时",
            "options": []
         },
         {
            "event_code": "first_exec_feedback",
            "event_name": "第一次更新执行进度时",
            "options": []
         },
         {
            "event_code": "finish_must_feedback",
            "event_name": "完成所有必反馈执行项时",
            "options": []
         },
         {
            "event_code": "finish_all_feedback",
            "event_name": "完成全部执行项时",
            "options": []
         },
         {
            "event_code": "wo_close",
            "event_name": "结束工单时",
            "options": []
         },
         {
            "event_code": "wo_stop",
            "event_name": "中止工单时",
            "options": []
         },
         {
            "event_code": "apply_close",
            "event_name": "申请结束时",
            "options": []
         },
         {
            "event_code": "audit_finish",
            "event_name": "审核完成时",
            "options": []
         },
         {
            "event_code": "auto_wo_running",
            "event_name": "运行中的工单，每隔10分钟自动处理一次",
            "options": []
         }
      ],
      "Count": 11,
    }

前台：接口调用注意事项：

	1、事件"报修完成后"没有选择项，其它事项的选择项需要点击事件后查询；

后台：接口实现注意事项：

	1、数据来源配置文件：wo_custom_state_events.json；
	
### 工单状态管理-新增页:查询工单状态事件下选项列表
>http://localhost:8080/saas-manage/restWoStateService/queryWoStateOptionList

post请求

参数例子：

    {
      "user_id":"***",    		          //员工id-当前操作人id，必须
      "project_id":"***",                 //项目id，必须
      "event_code": "auto_wo_running"     //触发事件编码，必须
    } 

返回例子：

    {
      "Result": "success",
      "Content": [
         {
            "option1_type": "1",     //选项类型:1-状态,2-时间、3-事件、4-公式计算       
            "option1_code": "current_state",
            "option1_name": "当前状态",
            "logics": [
               { "logic_code": "is", "logic_name": "等于" },
               { "logic_code": "contain", "logic_name": "包含" }
            ],
            "options": [
               { "option2_code": "4", "option2_name": "待开始" },
               { "option2_code": "5", "option2_name": "执行中" },
               {***}
            ],		
         },
         {
            "option1_type": "2",            
            "option1_code": "current_time",
            "option1_name": "当前时间",
            "logics": [
               { "logic_code": "lt", "logic_name": "早于" },
               { "logic_code": "gt", "logic_name": "晚于" }
            ],
            "options": [
               { "option2_code": "ask_start_time", "option2_name": "要求开始时间" },
               { "option2_code": "ask_end_time", "option2_name": "要求完成时间" }
            ],
            "operators": [
               { "operators_code": "+", "operators_name": "+" },
               { "operators_code": "-", "operators_name": "-" }
            ]
         },
         {
            "option1_type": "2",            
            "option1_code": "publish_time",
            "option1_name": "正式发出工单时间",
            "logics": [
               { "logic_code": "lt", "logic_name": "早于" },
               { "logic_code": "gt", "logic_name": "晚于" }
            ],
            "options": [
               { "option2_code": "ask_start_time", "option2_name": "要求开始时间" },
               { "option2_code": "ask_end_time", "option2_name": "要求完成时间" }
            ],
            "operators": [
               { "operators_code": "+", "operators_name": "+" },
               { "operators_code": "-", "operators_name": "-" }
            ]
         },
         {
            "option1_type": "2",            
            "option1_code": "first_exec_receive_time",
            "option1_name": "第一次被有执行操作的人接单时间",
            "logics": [
               { "logic_code": "lt", "logic_name": "早于" },
               { "logic_code": "gt", "logic_name": "晚于" }
            ],
            "options": [
               { "option2_code": "ask_start_time", "option2_name": "要求开始时间" },
               { "option2_code": "ask_end_time", "option2_name": "要求完成时间" }
            ],
            "operators": [
               { "operators_code": "+", "operators_name": "+" },
               { "operators_code": "-", "operators_name": "-" }
            ]
         },
         {
            "option1_type": "2",            
            "option1_code": "first_exec_feedback_time",
            "option1_name": "第一次更新执行进度时间",
            "logics": [
               { "logic_code": "lt", "logic_name": "早于" },
               { "logic_code": "gt", "logic_name": "晚于" }
            ],
            "options": [
               { "option2_code": "ask_start_time", "option2_name": "要求开始时间" },
               { "option2_code": "ask_end_time", "option2_name": "要求完成时间" }
            ],
            "operators": [
               { "operators_code": "+", "operators_name": "+" },
               { "operators_code": "-", "operators_name": "-" }
            ]
         },
         {
            "option1_type": "2",            
            "option1_code": "finish_must_feedback_time",
            "option1_name": "完成所有必反馈执行项时间",
            "logics": [
               { "logic_code": "lt", "logic_name": "早于" },
               { "logic_code": "gt", "logic_name": "晚于" }
            ],
            "options": [
               { "option2_code": "ask_start_time", "option2_name": "要求开始时间" },
               { "option2_code": "ask_end_time", "option2_name": "要求完成时间" }
            ],
            "operators": [
               { "operators_code": "+", "operators_name": "+" },
               { "operators_code": "-", "operators_name": "-" }
            ]
         },
         {
            "option1_type": "2",            
            "option1_code": "finish_all_feedback_time",
            "option1_name": "完成全部执行项时间",
            "logics": [
               { "logic_code": "lt", "logic_name": "早于" },
               { "logic_code": "gt", "logic_name": "晚于" }
            ],
            "options": [
               { "option2_code": "ask_start_time", "option2_name": "要求开始时间" },
               { "option2_code": "ask_end_time", "option2_name": "要求完成时间" }
            ],
            "operators": [
               { "operators_code": "+", "operators_name": "+" },
               { "operators_code": "-", "operators_name": "-" }
            ]
         },
         {
            "option1_type": "2",            
            "option1_code": "wo_close_time",
            "option1_name": "结束工单时间",
            "logics": [
               { "logic_code": "lt", "logic_name": "早于" },
               { "logic_code": "gt", "logic_name": "晚于" }
            ],
            "options": [
               { "option2_code": "ask_start_time", "option2_name": "要求开始时间" },
               { "option2_code": "ask_end_time", "option2_name": "要求完成时间" }
            ],
            "operators": [
               { "operators_code": "+", "operators_name": "+" },
               { "operators_code": "-", "operators_name": "-" }
            ]
         },
         {
            "option1_type": "2",            
            "option1_code": "wo_stop_time",
            "option1_name": "中止工单时间",
            "logics": [
               { "logic_code": "lt", "logic_name": "早于" },
               { "logic_code": "gt", "logic_name": "晚于" }
            ],
            "options": [
               { "option2_code": "ask_start_time", "option2_name": "要求开始时间" },
               { "option2_code": "ask_end_time", "option2_name": "要求完成时间" }
            ],
            "operators": [
               { "operators_code": "+", "operators_name": "+" },
               { "operators_code": "-", "operators_name": "-" }
            ]
         },
         {
            "option1_type": "2",            
            "option1_code": "first_apply_time",
            "option1_name": "第一次申请时间",
            "logics": [
               { "logic_code": "lt", "logic_name": "早于" },
               { "logic_code": "gt", "logic_name": "晚于" }
            ],
            "options": [
               { "option2_code": "ask_start_time", "option2_name": "要求开始时间" },
               { "option2_code": "ask_end_time", "option2_name": "要求完成时间" }
            ],
            "operators": [
               { "operators_code": "+", "operators_name": "+" },
               { "operators_code": "-", "operators_name": "-" }
            ]
         },
         {
            "option1_type": "2",            
            "option1_code": "first_audit_time",
            "option1_name": "第一次审核完成时间",
            "logics": [
               { "logic_code": "lt", "logic_name": "早于" },
               { "logic_code": "gt", "logic_name": "晚于" }
            ],
            "options": [
               { "option2_code": "ask_start_time", "option2_name": "要求开始时间" },
               { "option2_code": "ask_end_time", "option2_name": "要求完成时间" }
            ],
            "operators": [
               { "operators_code": "+", "operators_name": "+" },
               { "operators_code": "-", "operators_name": "-" }
            ]
         },
         {
            "option1_type": "2",            
            "option1_code": "last_apply_time",
            "option1_name": "最新一次申请时间",
            "logics": [
               { "logic_code": "lt", "logic_name": "早于" },
               { "logic_code": "gt", "logic_name": "晚于" }
            ],
            "options": [
               { "option2_code": "ask_start_time", "option2_name": "要求开始时间" },
               { "option2_code": "ask_end_time", "option2_name": "要求完成时间" }
            ],
            "operators": [
               { "operators_code": "+", "operators_name": "+" },
               { "operators_code": "-", "operators_name": "-" }
            ]
         },
         {
            "option1_type": "2",            
            "option1_code": "last_audit_time",
            "option1_name": "最新一次审核完成时间",
            "logics": [
               { "logic_code": "lt", "logic_name": "早于" },
               { "logic_code": "gt", "logic_name": "晚于" }
            ],
            "options": [
               { "option2_code": "ask_start_time", "option2_name": "要求开始时间" },
               { "option2_code": "ask_end_time", "option2_name": "要求完成时间" }
            ],
            "operators": [
               { "operators_code": "+", "operators_name": "+" },
               { "operators_code": "-", "operators_name": "-" }
            ]
         },
         {
            "option1_type": "3",            
            "option1_code": "first_apply_reason",
            "option1_name": "第一次申请原因",
            "options": [
               { "option2_code": "apply_close", "option2_name": "工作全部完成" },
               { "option2_code": "apply_stop", "option2_name": "工作中出现异常" }
            ]
         },
         {
            "option1_type": "3",            
            "option1_code": "first_audit_result",
            "option1_name": "第一次审核结果",
            "options": [
               { "option2_code": "audit_pass", "option2_name": "审核通过" },
               { "option2_code": "audit_not_pass", "option2_name": "审核不通过" },
               { "option2_code": "audit_back", "option2_name": "驳回继续处理" }
            ]
        },
        {
            "option1_type": "3",            
            "option1_code": "last_apply_reason",
            "option1_name": "最新一次申请原因",
            "options": [
               { "option2_code": "apply_close", "option2_name": "工作全部完成" },
               { "option2_code": "apply_stop", "option2_name": "工作中出现异常" }
            ]
        },
        {
            "option1_type": "3",            
            "option1_code": "last_audit_result",
            "option1_name": "最新一次审核结果",
            "options": [
               { "option2_code": "audit_pass", "option2_name": "审核通过" },
               { "option2_code": "audit_not_pass", "option2_name": "审核不通过" },
               { "option2_code": "audit_back", "option2_name": "驳回继续处理" }
            ]
        },
        {
            "option1_type": "4",            
            "option1_code": "compute_bool",
            "option1_name": "公式计算bool值",
            "options": [
               { "option2_code": "current_time", "option2_name": "当前时间" },
               { "option2_code": "publish_time", "option2_name": "正式发出工单时间" },
               { "option2_code": "first_exec_receive_time", "option2_name": "第一次被有执行操作的人接单时间" },
               { "option2_code": "first_exec_feedback_time", "option2_name": "第一次更新执行进度时间" },
               { "option2_code": "finish_must_feedback_time", "option2_name": "完成所有必反馈执行项时间" },
               { "option2_code": "finish_all_feedback_time", "option2_name": "完成全部执行项时间" },
               { "option2_code": "wo_close_time", "option2_name": "结束工单时间" },
               { "option2_code": "wo_stop_time", "option2_name": "中止工单时间" },
               { "option2_code": "first_apply_time", "option2_name": "第一次申请时间" },
               { "option2_code": "first_audit_time", "option2_name": "第一次审核完成时间" },
               { "option2_code": "last_apply_time", "option2_name": "最新一次申请时间" },
               { "option2_code": "last_audit_time", "option2_name": "最新一次审核完成时间" },
               { "option2_code": "ask_start_time", "option2_name": "要求开始时间" },
               { "option2_code": "ask_end_time", "option2_name": "要求完成时间" }
            ]
        }
      ],
      "Count": 2,
    }

前台：接口调用注意事项：

	1、注意 选项类型:1-状态,2-时间、3-事件、4-公式计算 ，这四种的页面样式不同，数据格式不同  ；

后台：接口实现注意事项：

	1、数据来源配置文件：wo_custom_state_events_options.json；
	2、更新event_code过滤当前事件能看到选项；
	3、当前状态选项下要查询出工单状态列表，包括自定义状态；

### 工单状态管理-新增页/编辑页:验证状态名称是否可以使用
>http://localhost:8080/saas-manage/restWoStateService/verifyStateName

post请求

参数例子：

    {
      "user_id":"***",                    //员工id-当前操作人id，必须
      "project_id":"***",                 //项目id，必须
      "custom_state_id":"***"             //状态id
      "name":"***"                        //状态名称，必须
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

	1、返回结果为true时，代表该状态名称没有重复，可以使用；
	2、custom_state_id参数，新增验证时不传，编辑验证时必须传；
	
后台：接口实现注意事项：

	1、状态名称验证：同项目下状态名称不可重复，包括系统内置状态中的本地名称和内置名称；
		
### 工单状态管理-新增页:添加工单状态信息
>http://localhost:8080/saas-manage/restWoStateService/addWoState

post请求

参数例子：

    {
      "user_id":"***",    	       //员工id-当前操作人id，必须
      "project_id":"***",          //项目id，必须
      "name":"***",                //状态名称，必须
      "order_type":"***",          //工单类型编码，必须
      "urgency":"***",             //紧急程度，高、中、低，必须
      "is_repair_use":"1",         //是否业主租户报修专用，1-是，0-否，必须
      "events":[                   //触发事件数组，必须
         {
            "event_code":"***",              //触发事件编码
            "event_name":"***",              //触发事件名称
            "condition_type":"***",          //条件类型,1-无条件限制、2-满足以下所有条件、3-满足以下任一条件
            "conditions":[                   //条件数组,
               {                             //当前状态等于
                  "option1_type":"1",        //选项类型:1-状态,2-时间、3-事件、4-公式计算
                  "option1_code":"current_state",
                  "option1_name":"当前状态",
                  "logic_code":"is",
                  "logic_name":"等于",
                  "option2_code":"4",
                  "option2_name":"待开始"
               },  
               {                             //当前状态包含
                  "option1_type":"1",
                  "option1_code":"current_state",
                  "option1_name":"当前状态",
                  "logic_code":"contain",
                  "logic_name":"包含",
                  "option2_code":"4",
                  "option2_name":"待开始"
               },
               {                             //当前时间早于要求开始时间
                  "option1_type":"2",
                  "option1_code":"current_time",
                  "option1_name":"当前时间",
                  "logic_code":"lt",
                  "logic_name":"早于",
                  "option2_code":"ask_start_time",
                  "option2_name":"要求开始时间",
                  "operators_code":"+",
                  "minute":"99"
               },
               {                             //当前时间晚于要求结束时间
                  "option1_type":"2",
                  "option1_code":"current_time",
                  "option1_name":"当前时间",
                  "logic_code":"gt",
                  "logic_name":"晚于",
                  "option2_code":"ask_end_time",
                  "option2_name":"要求完成时间",
                  "operators_code":"-",
                  "minute":"99"
               },
               {                             //第一申请原因：工作全部完成,申请正常结束
                  "option1_type":"3",
                  "option1_code":"first_apply",
                  "option1_name":"第一次申请原因",
                  "option2_code":"close",
                  "option2_name":"工作全部完成"
               },
               {                             //第一审核结果：审核通过
                  "option1_type":"3",
                  "option1_code":"first_audit",
                  "option1_name":"第一次审核结果",
                  "option2_code":"audit_pass",
                  "option2_name":"审核通过"
               },      
               {                             //公式
                  "option1_type":"4",
                  "formula":"current_time - ask_start_time = 99",
                  "formula_desc":"当前时间 - 要求开始时间 = 99 分钟"
               }      
            ]
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
       
前台：接口调用注意事项：

	1、注意 选项类型:1-状态,2-时间、3-事件、4-公式计算 ，这四种的页面样式不同，数据格式不同  ；

后台：接口实现注意事项：

	1、数据保存到工单自定义状态表：wo_custom_state；
	2、自定义工单状态的编码规则："C"+序号，序号从1开始自增，例如：C1；
	3、为每个条件生成"条件描述",保存字段为"condition_desc"；
	
### 工单状态管理-详细页:根据Id查询工单自定义状态信息
>http://localhost:8080/saas-manage/restWoStateService/queryWoStateById

post请求

参数例子：

    {
      "user_id": "***",			        //员工id-当前操作人id，必须
      "project_id":"***",               //项目id，必须
      "custom_state_id": "***"			//工单状态id,必须
    }         

成功返回例子：

    {
      "Result": "success",
      "Item":{
          "custom_state_id":"***",      //主键id
          "project_id":"***",           //项目id
          "code":"***",                 //状态编码
          "name":"***",                 //状态名称
          "order_type":"***",          //工单类型编码
          "order_type_name":"***",     //工单类型名称
          "urgency":"***",             //紧急程度，高、中、低
          "is_repair_use":"1",         //是否业主租户报修专用，1-是，0-否
          "events":[                    //事件数组
             {
                "event_code":"***",              //触发事件编码
                "event_name":"***",              //触发事件名称
                "condition_type":"***",          //条件类型,1-无条件限制、2-满足以下所有条件、3-满足以下任一条件
                "conditions":[                   //条件数组,
                   {                             //当前状态等于
                      "option1_type":"1",        //选项类型:1-状态,2-时间、3-事件、4-公式计算
                      "option1_code":"current_state",
                      "option1_name":"当前状态",
                      "logic_code":"is",
                      "logic_name":"等于",
                      "option2_code":"4",
                      "option2_name":"待开始"
                   },  
                   {                             //当前状态包含
                      "option1_type":"1",
                      "option1_code":"current_state",
                      "option1_name":"当前状态",
                      "logic_code":"contain",
                      "logic_name":"包含",
                      "option2_code":"4",
                      "option2_name":"待开始"
                   },
                   {                             //当前时间早于要求开始时间
                      "option1_type":"2",
                      "option1_code":"current_time",
                      "option1_name":"当前时间",
                      "logic_code":"lt",
                      "logic_name":"早于",
                      "option2_code":"ask_start_time",
                      "option2_name":"要求开始时间",
                      "operators_code":"+",
                      "minute":"99"
                   },
                   {                             //当前时间晚于要求结束时间
                      "option1_type":"2",
                      "option1_code":"current_time",
                      "option1_name":"当前时间",
                      "logic_code":"gt",
                      "logic_name":"晚于",
                      "option2_code":"ask_end_time",
                      "option2_name":"要求完成时间",
                      "operators_code":"-",
                      "minute":"99"
                   },
                   {                             //第一申请原因：工作全部完成,申请正常结束
                      "option1_type":"3",
                      "option1_code":"first_apply",
                      "option1_name":"第一次申请原因",
                      "option2_code":"close",
                      "option2_name":"工作全部完成"
                   },
                   {                             //第一审核结果：审核通过
                      "option1_type":"3",
                      "option1_code":"first_audit",
                      "option1_name":"第一次审核结果",
                      "option2_code":"audit_pass",
                      "option2_name":"审核通过"
                   },      
                   {                             //公式
                      "option1_type":"4",
                      "formula":"current_time - ask_start_time = 99",
                      "formula_desc":"当前时间 - 要求开始时间 = 99 分钟"
                   }      
                ]
             },
             {
                "event_code":"***",              //触发事件编码
                "event_name":"***",              //触发事件名称
                "condition_type":"***",          //条件类型,1-无条件限制、2-满足以下所有条件、3-满足以下任一条件
                "conditions":[***]               //条件数组,
             }
          ],
          "create_time":"2017-06-20 09:30:00"   //创建时间，yyyy-MM-dd HH:mm:ss
      }
    } 
  
失败返回例子：

    {
      "Result": "failure",
      "ResultMsg": ""
    } 
      
### 工单状态管理-编辑页:根据Id编辑工单自定义状态信息
>http://localhost:8080/saas-manage/restWoStateService/updateWoStateById

post请求

参数例子：

    {
      "user_id": "***",			        //员工id-当前操作人id，必须
      "custom_state_id": "***",			//工单状态id,必须
      "name":"***",                	    //状态名称，必须
      "order_type":"***",               //工单类型编码，必须
      "urgency":"***",                  //紧急程度，高、中、低，必须
      "is_repair_use":"1",              //是否业主租户报修专用，1-是，0-否，必须
      "events":[***]                    //触发事件数组,格式同新增，必须
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
		
## 工单操作模块管理
### 操作模块管理-列表页:查询所有操作模块信息
>http://localhost:8080/saas-manage/restOperateModuleService/queryAllOperateModule

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
          "module_id":"*****",      //模块id
          "module_code":"*****",    //模块编码
          "module_name":"*****",    //模块名称
          "description":"*****",    //描述(释义)
          "project_local_names":"项目本地名称"       //专属客户
        },
        {
          "module_id":"*****",      //模块id
          "module_code":"*****",    //模块编码
          "module_name":"*****",    //模块名称
          "description":"*****",    //描述(释义)
          "project_local_names":"项目本地名称1、项目本地名称5"       //专属客户
        }
      ],
      "Count": 2,
    }

接口实现注意事项：

	1、列表排序默认按照创建时间倒序排列,因id是按照时间戳生成的，查询出的数据直接倒序即可；

### 操作模块管理-新增页:查询正常状态的客户信息
>http://localhost:8080/saas-manage/restCustomerService/queryCustomerForNormal

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
          "project_id":"*****",      	//项目id
          "project_local_name":"*****"  //项目本地名称
        },
        {
          "project_id":"*****",      	//项目id
          "project_local_name":"*****"  //项目本地名称
        }
      ],
      "Count": 2,
    }

接口实现注意事项：

	1、只查询正常状态的客户信息;

### 操作模块管理-新增页:验证操作模块编码是否重复
>http://localhost:8080/saas-manage/restOperateModuleService/verifyModuleCode

post请求

参数例子：

    {
      "user_id":"***",                    //员工id-当前操作人id，必须
      "project_id":"***",                 //项目id ,必须
      "module_id": "****",                //模块id,编辑时验证该参数必须
      "module_code":"*****"               //模块编码，必须
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

	1、返回结果为true时，说明模块编码没有重复，可以使用；
	
### 操作模块管理-新增页:添加模块信息
>http://localhost:8080/saas-manage/restOperateModuleService/addOperateModule

post请求

参数例子：

    {
      "user_id":"*****",    	//员工id-当前操作人id，必须
      "module_code":"*****",    //模块编码，必须
      "module_name":"*****",    //模块名称，必须
      "description":"*****",    //描述(释义)
      "project_ids":["*****","*****"]  //专属项目id
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
       
### 操作模块管理-详细页:根据Id查询模块详细信息
>http://localhost:8080/saas-manage/restOperateModuleService/queryOperateModuleById

post请求

参数例子：

    {
      "user_id": "****",			//员工id-当前操作人id，必须
      "module_id": "****"			//模块id,必须
    }         

返回例子：

    {
      "Result": "success",
      "Item":{
          "module_id":"*****",      //模块id
          "module_code":"*****",    //模块编码
          "module_name":"*****",    //模块名称
          "description":"*****",    //描述(释义)
          "project_ids":["*****","*****"],  //专属项目id
          "project_local_names":["*****","*****"],  //项目本地名称
          "create_time":"2017-06-20 09:30:00"   //创建时间，yyyy-MM-dd HH:mm:ss
          }
    } 

### 操作模块管理-编辑页:根据Id编模块信息
>http://localhost:8080/saas-manage/restOperateModuleService/updateOperateModuleById

post请求

参数例子：

    {
      "user_id":"*****",		//员工id-当前操作人id，必须
      "module_id":"*****",		//模块id ,必须
      "module_code":"*****",	//模块编码
      "module_name":"*****",	//模块名称
      "description":"*****",	//描述(释义)
      "project_ids":["*****","*****"],  //专属项目id
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

## 权限项管理/功能包管理
### 权限项管理-列表页:查询所有权限项信息
>http://localhost:8080/saas-manage/restFuncPackService/queryAllFuncPack

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

接口实现注意事项：

	1、列表排序默认按照创建时间倒序排列,因id是按照时间戳生成的，查询出的数据直接倒序即可；

### 权限项管理-新增页:查询功能节点树
>http://localhost:8080/saas-manage/restFuncPackService/queryFuncPointTree

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
          "parent_id": "0",		    //父节点id，根节点时的父节点id为0
          "func_id": "10",		    //菜单功能点id
          "func_name": "基本操作",	//名称
          "func_type": "1		    //功能点类型，1-菜单，2-菜单下的功能点
        },
        {
          "parent_id": "10",
          "func_id": "1001",
          "func_name": "管信息理",
          "func_type": "1"
        },
        {
          "parent_id": "1001",
          "func_id": "100101",
          "func_name": "新增信息",
          "func_type": "2"
        }
      ],
      "Count": 2,
    }

接口实现注意事项：

	1、菜单功能节点数据暂时以文件方式存储：functionPoint.json;
	2、func_id编码规则：父级编码+2位当前编码
	3、func_type：功能点类型，1-菜单，2-菜单下的功能点
	4、parent_id：根节点时的父节点id值为0

### 权限项管理-新增页:添加权限项信息
>http://localhost:8080/saas-manage/restFuncPackService/addFuncPack

post请求

参数例子：

    {
      "user_id":"*****",			//员工id-当前操作人id，必须
      "func_pack_name":"*****",		//权限项名称,必须
      "description":"*****",		//描述,必须
      "func_packs":[func_id1,func_id2]	//功能点func_id的集合,必须
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
       
### 权限项管理-详细页:根据Id查询权限项详细信息
>http://localhost:8080/saas-manage/restFuncPackService/queryFuncPackById

post请求

参数例子：

    {
      "user_id":"*****",			//员工id-当前操作人id，必须
      "func_pack_id":"*****"		//权限项id,必须
    }         

返回例子：

    {
      "Result": "success",
      "Item":{
          "func_pack_id":"*****",      	//权限项id
          "func_pack_name":"*****",    	//权限项名称
          "description":"*****"    		//描述
          "func_packs":[func_id1,func_id2]  //功能点func_id的集合
          "create_time":"2017-06-20 09:30:00"   	//创建时间，yyyy-MM-dd HH:mm:ss
          }
    } 

### 权限项管理-编辑页:根据Id编权限项信息
>http://localhost:8080/saas-manage/restFuncPackService/updateFuncPackById

post请求

参数例子：

    {
      "user_id":"*****",			//员工id-当前操作人id，必须
      "func_pack_id":"*****",		//权限项id,必须
      "func_pack_name":"*****",		//权限项名称
      "description":"*****",		//描述
      "func_packs":[func_id1,func_id2]	//功能点func_id的集合
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

## 动态模板管理
### 动态模板管理：模板信息-列表页:查询对象类型树
>http://localhost:8080/saas-manage/restTemplateService/queryObjectCategoryTree

post请求

参数例子：

    {
      "user_id":"*****"    		//员工id-当前操作人id，必须
    } 

返回例子：说明：专业-系统类型-设备类型树，第二层是专业，第三层系统类型，第四层是设备类型

    {
      "Result": "success"
      "Content": [
        {
          "code": "AC",
          "name": "空调专业",
          "content": [
            {
              "name": "中央供冷系统",
              "code": "CC",
              "type": "system",     //对象类型：system、equip
              "content": [
                {
                  "code": "CCCC",
                  "name": "离心机",
                  "type": "equip"
                },
                {
                  "code": "CCSC",
                  "name": "螺杆机",
                  "type": "equip"
                },
                {
                  "code": "CCAC",
                  "name": "吸收机",
                  "type": "equip"
                },
               ......
               ]
             },
            {
              "name": "中央供热系统",
              "code": "CH",
              "type": "system",
              "content": [
                {
                  "code": "CHCB",
                  "name": "供热燃煤锅炉",
                  "type": "equip"	
                },
                {
                  "code": "CHFB",
                  "name": "供热燃油锅炉",
                  "type": "equip"	
                },
                {
                  "code": "CHGB",
                  "name": "供热燃气锅炉",
                  "type": "equip"	
                },
                {
                  "code": "CHEB",
                  "name": "供热电锅炉",
                  "type": "equip"
                },
               ]
             },
             ......
            ]
          },
         ......
       ]
    }

接口实现注意事项：

	1、通过数据字典可以查询到"专业-系统类型-设备类型树"的数据;

### 动态模板管理：模板信息-列表页:查询对象类型信息
>http://localhost:8080/saas-manage/restTemplateService/queryObjectCategory

post请求

参数例子：

    {
      "user_id":"*****",		//员工id-当前操作人id，必须
      "obj_name":"*****"		//对象名称，必须
    }    

返回例子：

    {
      "Result": "success"
      "Content": [
		{
          "code": "CC",
          "name": "中央供冷系统",
          "type": "system",	//对象类型：system、equip
          "description": "空调专业-中央供冷系统"
		},
		{
          "code": "CCCC",
          "name": "离心机供冷系统",
          "type": "equip",	//对象类型：system、equip
          "description": "空调专业-中央供冷系统-离心机"
		},
		......
       ]
    }

接口实现注意事项：

	1、在上一个接口"对象类型树"的结果中模糊查询;
	2、模糊匹配时不匹配专业的数据；
	3、注意组装描述字段description；

### 动态模板管理：模板信息-列表页:查询对象模板信息
>http://localhost:8080/saas-manage/restTemplateService/queryObjectTemplate

post请求：

说明：项目、建筑、楼层、空间、系统类型、设备类型有信息点模板，专业没有，所以前台点击专业时不需要请求后台；

参数例子：

    {
      "user_id": "*****",	//员工id-当前操作人id，必须
      "code": "CC",    		//对象code，必须
      "type": "system",		//对象类型：system、equip, 必须
    }    

返回例子：

    {
      "Result": "success",
      "Content": [
        {
          "info_cmpt_id":"*****",      	//信息点组件id
          "info_point_code":"*****",    //信息点名称
          "base_cmpt_code":"*****",		//原始组件编码
          "god_hand_cmpt_code":"*****",	//上帝之手组件编码
          "god_hand_note":"*****",		//上帝之手页面标注
          "saas_cmpt_code":"*****",		//Saas平台组件编码
          "saas_note":"*****",			//Saas平台页面标注
          "saas_show_flag":"*****",		//Saas平台是否显示，0-不显示、1-显示、2-不显示且不可编辑
          "app_cmpt_code":"*****"		//工单app组件编码
          "app_note":"*****",			//APP工单执行页面标注
          "app_show_flag":"*****",		//APP采集是否显示，0-不显示、1-显示、2-不显示且不可编辑
        },
        {
          "info_cmpt_id":"*****",      	//信息点组件id
          "info_point_code":"*****",    //信息点名称
          "base_cmpt_code":"*****",		//原始组件编码
          "god_hand_cmpt_code":"*****",	//上帝之手组件编码
          "god_hand_note":"*****",		//上帝之手页面标注
          "saas_cmpt_code":"*****",		//Saas平台组件编码
          "saas_note":"*****",			//Saas平台页面标注
          "saas_show_flag":"*****",		//Saas平台是否显示，0-不显示、1-显示、2-不显示且不可编辑
          "app_cmpt_code":"*****"		//工单app组件编码
          "app_note":"*****",			//APP工单执行页面标注
          "app_show_flag":"*****",		//APP采集是否显示，0-不显示、1-显示、2-不显示且不可编辑
        }
      ],
      "Count": 2,
    }
    
接口实现注意事项：

	1、对象名称（obj_name）根据name在"对象类型树"的结果中查询;
	2、信息点信息调研数据平台的接口查询，注意系统和设备的信息点包含通用的和独有的；
	3、info_cmpt_id组成：
	   info_cmpt_id：对象类型_大类编码_信息点编码
	        对象类型：project、build、floor、space、system、equip
	       大类编码：project、build、floor、space 的默认0，system是2位系统大类编码，equip是4位设备大类编码；
	
	4、将组件关系存在缓存里，根据的信息点的原始组件编码，查询组件对应关系；
	5、将信息点组件存在缓存里，根据info_cmpt_id查询对象模板配置信息
	6、项目和建筑体的信息点，在Saas平台和APP平台不动态生成因此也不可编辑是否显示，即saas_show_flag和app_show_flag值为2；
	7、当Saas平台和APP没有对应的组件时，默认信息点不显示且无法编辑是否显示，即saas_show_flag和app_show_flag值为2；
	8、当Saas平台和APP有与原始组件有对应的组件，且在信息点组件表中没有对应关系时，默认显示，即saas_show_flag和app_show_flag值为1；
	9、当Saas平台和APP有与原始组件有对应的组件，且在信息点组件表中有对应关系时，按照配置信息匹配字段；

### 动态模板管理：模板信息-列表页:编辑信息点配置信息
>http://localhost:8080/saas-manage/restTemplateService/updateInfoPointCmptById

post请求

参数例子：

    {
      "user_id":"*****",			//员工id-当前操作人id，必须
      "info_cmpt_id":"*****",		//信息点组件id,必须
      "god_hand_note":"*****",		//上帝之手页面标注
      "saas_note":"*****",			//Saas平台页面标注
      "saas_show_flag":"*****",		//Saas平台是否显示，0-不显示、1-显示、2-不显示且不可编辑
      "app_note":"*****",			//APP工单执行页面标注
      "app_show_flag":"*****",		//APP采集是否显示，0-不显示、1-显示、2-不显示且不可编辑
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

接口实现注意事项：

	1、先根据info_cmpt_id判断记录是否存在，不存在则新增，存在则修改;

### 动态模板管理：组件对应关系-列表页:查询所有组件关系信息
>http://localhost:8080/saas-manage/restComponentService/queryAllComponentRel

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
          "cmpt_relation_id":"*****",		//组件关系id
          "base_cmpt_code":"*****",			//原始组件编码
          "god_hand_cmpt_code":"*****",		//上帝之手组件编码
          "saas_cmpt_code":"*****",			//Saas平台组件编码
          "app_cmpt_code":"*****"			//工单app组件编码
        },
        {
          "cmpt_relation_id":"*****",		//组件关系id
          "base_cmpt_code":"*****",			//原始组件编码
          "god_hand_cmpt_code":"*****",		//上帝之手组件编码
          "saas_cmpt_code":"*****",			//Saas平台组件编码
          "app_cmpt_code":"*****"			//工单app组件编码
        }
      ],
      "Count": 2,
    }
### 动态模板管理：组件对应关系-编辑页:分组查询组件列表，用于组件的列表选择
>http://localhost:8080/saas-manage/restComponentService/queryComponentGroupByType

post请求

参数例子：

    {
      "user_id":"*****"    		//员工id-当前操作人id，必须
    } 

返回例子：

    {
      "Result": "success",
      "Item": {
            "base": [
               {
                  "cmpt_code":"*****",    		//组件编码
                  "cmpt_name":"*****",    		//组件名称 
               },
               {
                  "cmpt_code":"*****",    		//组件编码
                  "cmpt_name":"*****",    		//组件名称 
               }
            ], 
            "godHand": [
               {
                  "cmpt_code":"*****",    		//组件编码
                  "cmpt_name":"*****",    		//组件名称 
               },
               {
                  "cmpt_code":"*****",    		//组件编码
                  "cmpt_name":"*****",    		//组件名称 
               }
            ],
            "saas": [
               {
                  "cmpt_code":"*****",    		//组件编码
                  "cmpt_name":"*****",    		//组件名称 
               },
               {
                  "cmpt_code":"*****",    		//组件编码
                  "cmpt_name":"*****",    		//组件名称 
               }
            ],
            "app": [
               {
                  "cmpt_code":"*****",    		//组件编码
                  "cmpt_name":"*****",    		//组件名称 
               },
               {
                  "cmpt_code":"*****",    		//组件编码
                  "cmpt_name":"*****",    		//组件名称 
               }
            ]
      }
    }

### 动态模板管理：组件对应关系-编辑页:根据Id编辑组件对应信息
>http://localhost:8080/saas-manage/restComponentService/updateComponentRelById

post请求

参数例子：

    {
      "user_id":"*****",				//员工id-当前操作人id，必须
      "cmpt_relation_id":"*****",		//组件关系id ,必须
      "god_hand_cmpt_code":"*****",    	//上帝之手组件编码
      "saas_cmpt_code":"*****",    		//Saas平台组件编码
      "app_cmpt_code":"*****"    		//工单app组件编码
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

### 动态模板管理：组件信息-列表页:查询所有组件
>http://localhost:8080/saas-manage/restComponentService/queryAllComponent

post请求

参数例子：

    {
      "user_id":"*****",    	//员工id-当前操作人id，必须
      "cmpt_type":"base"      	//组件类型：base、godHand、saas 、app,非必须
    }

返回例子：

    {
      "Result": "success",
      "Content": [
        {
          "cmpt_id":"*****",      		//组件id
          "cmpt_type":"*****",    		//组件类型：base、godHand、saas 、app
          "cmpt_code":"*****",    		//组件编码
          "cmpt_name":"*****",    		//组件名称
          "description":"*****"    		//描述
        },
        {
          "cmpt_id":"*****",      		//组件id
          "cmpt_type":"*****",    		//组件类型：base、godHand、saas 、app
          "cmpt_code":"*****",    		//组件编码
          "cmpt_name":"*****",    		//组件名称
          "description":"*****"    		//描述
        }
      ],
      "Count": 2,
    }

### 动态模板管理：组件信息-新增页:添加组件信息
>http://localhost:8080/saas-manage/restComponentService/addComponent

post请求

参数例子：

    {
      "user_id":"*****",    		//员工id-当前操作人id，必须
      "cmpt_type":"*****",    		//组件类型：base、godHand、saas 、app ,必须
      "cmpt_code":"*****",    		//组件编码 ,必须
      "cmpt_name":"*****",    		//组件名称 ,必须
      "description":"*****"    		//描述 ,必须
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
       
接口实现注意事项：

	1、组件增加时，要验证该类型下，组件编码唯一；
	2、当有原始组件新增时，同时向组件关系表增加一条关系，只有原始组件编码有值；
	


