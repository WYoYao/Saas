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

	1、图片key在项目下要唯一；
	2、建议key的格式：项目缩写_图片名称，例如:superClass_1503483253599.png，在该格式中图片名称要在本项目下唯一；
	

### 图片获取
>url：image-service/common/image_get?systemId=***&key=www



#App功能接口服务
## 用户登录
### 发送验证码
>http://localhost:8080/super-class/restUserService/smsSendCode

post请求

    {
      "phoneNum":"***"                      //手机号，必须，
    } 

成功返回例子

    {
      "Result": "success",
      "ResultMsg": "操作成功！"

### 用户登录
>http://localhost:8080/super-class/restUserService/userLogin

post请求

参数例子：

    {
      "phoneNum":"***",                     //手机号,必须
      "userPsw":"***"                       //验证码,必须
    } 

成功返回例子：

    {
      "Result": "success",
      "Item":{
          "userId":"***",                   //用户id
          "nickname":"***",                 //用户昵称
          "phoneNum":"***",                 //手机号
          "headPortrait":"***",             //系统头像key
          "systemId":"superClass",          //系统编码，用于图片服务，
          "imageSecret":"***",              //秘钥，用于图片服务，
          "lastTeamId":"***",               //上一次所在团队id
          "lastTeamName":"***",             //上一次所在团队名称
          "isMyCreate":true,                //团队是否自己创建的
          "createrId":"***",                //创建人id
          "createTime":"***",               //创建时间，yyyy-MM-dd HH:mm:ss
          "updateTime":"***",               //更新时间，yyyy-MM-dd HH:mm:ss
          "valid":"***"                     //有效状态，1-有效，0-无效
        },
        "ResultMsg": "登录成功！"
    } 

失败返回例子：

    {
      "Result": "failure",
      "ResultMsg": "验证码错误！"
    }

前台：接口调用注意事项：

	1、返回数据中lastTeamId的值为上一次所在团队id，默认为当前团队；
	
后台：接口实现注意事项：

	1、先验证手机号和验证码是否正确；	
	2、判断该手机号的用户是否存在，不存在则创建一个新用户；
	3、数据表：t_user；



 }

### 切换团队-记录用户最后一次所在的团队
>http://localhost:8080/super-class/restUserService/saveLastTeam

post请求

参数例子：

    {
      "userId":"***",                       //用户id-当前操作人id，必须
      "lastTeamId":"***"                    //上一次所在团队id，必须
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

	1、用户每次切换团队时都要调用此方法，存储用户最后一次所在团队；

后台：接口实现注意事项：

	1、数据保存到表：t_user_custom；	
	2、先判断表中是否存在该用户的记录，没有就添加，有就修改；
	
## 工作历
### 工作历-查询指定人某月的工作日历
>http://localhost:8080/super-class/restWorkCalService/queryMonthWorkCalByUserId

post请求

    {
      "userId":"***",                       //用户id-当前操作人id，必须
      "teamId":"***",                       //团队id，必须
      "yearMonth":"***",                    //年月，格式yyyyMM，必须
      "queryUserId":"***"                   //需要查询的用户id，必须
    } 

返回例子：

    {
      "Result": "success",
      "Content": [
         {
            "calendarDate":"***",           //日历的天,格式：yyyy-MM-dd
            "dayType":"***",                //日类型,1-工作日，0-休息日
            "shiftId":"***",                //班次id
            "shiftName":"***"               //班次名称
         },
         {
            "calendarDate":"***",
            "dayType":"***", 
            "shiftId":"***",
            "shiftName":"***"
         },
         {***}
      ],
      "Count": 7,
    }

前台：接口调用注意事项：

	1、返回数据是按照calendarDate的时间正序排序的；
 
后台：接口实现注意事项：
    
	1、数据来源主表：t_work_calendar_user；
	2、查询当前团队下，需要查询的用户、生效的排班，且calendarDate的日期在所查询的月份内；
	3、shiftName返回班次的简称；
	4、返回的数据按照calendarDate的时间正序排序；
	
### 工作历-查询某日的排班
>http://localhost:8080/super-class/restWorkCalService/queryDayWorkCal

post请求

    {
      "userId":"***",                       //用户id-当前操作人id，必须
      "teamId":"***",                       //团队id，必须
      "calendarDate":"***"                  //日历的天,格式：yyyy-MM-dd，必须
    } 

返回例子：

    {
      "Result": "success",
      "Content": [
         {
            "shiftId":"***",                //班次id
            "shiftName":"***",              //班次名称
            "users":[
               {
                  "userId":"***",           //用户id
                  "nickname":"***",         //用户昵称
               },
               {***}
            ]
         },
         {
            "shiftId":"***", 
            "shiftName":"***",
            "users":[
               {
                  "userId":"***",
                  "nickname":"***",
               },
               {***}
            ]
         },
         {
            "shiftId":"xiuxi", 
            "shiftName":"休息",
            "users":[
               {
                  "userId":"***",
                  "nickname":"***",
               },
               {***}
            ]
         }
      ],
      "Count": 3
    }

前台：接口调用注意事项：

	1、返回数据是按照calendarDate的时间正序排序的；
	
后台：接口实现注意事项：
    
	1、数据来源主表：t_work_calendar_user；
	2、查询当前团队下，生效的，且calendarDate日期的排班；
	3、返回数据按照排班分组，表中"shift_id"的值为空的，为一组放在最后，排班名称为"休息"；
	
### 工作历-查询未生效的排班
>http://localhost:8080/super-class/restWorkCalService/queryInvalidSchedule

post请求

    {
      "userId":"***",                       //用户id-当前操作人id，必须
      "teamId":"***"                        //团队id，必须
    } 

返回例子：

    {
      "Result": "success",
      "Content": [
         {
            "scheduleId":"***",             //排班id
            "startTime":"***",              //开始时间,格式：yyyy-MM-dd,该值可能不存在
            "endTime":"***",                //结束时间,格式：yyyy-MM-dd,该值可能不存在
            "status":"***",                 //进度状态,1-设置排班、2-生成日历、3-已开始排班
            "isCreater":"1"                 //是否创建者（管理员），1-是，0-否
         }
      ],
      "Count": 1
    }

前台：接口调用注意事项：

	1、返回数据中Count的值为0时，代表没有未生效的排班；
	2、"startTime"和"endTime"的值可能不存在，代表排班还没有设置开始时间和结束时间；
	3、isCreater值为1时，当前人是管理者，有【管理】按钮权限；
	4、isCreater值为0，且status值为3时，一般人员才能看到，并且可以提要求；
	5、注意排班的进度状态，不同状态点击【管理】按钮，展开的页面是不一样的；
	
后台：接口实现注意事项：
    
	1、数据来源主表：t_schedule；
	2、查询当前团队下，status的值小于4的排班；

## 团队管理
### 团队管理-查询人员所在团队列表
>http://localhost:8080/super-class/restTeamService/queryUserTeamList

post请求

参数例子：

    {
      "userId":"***"                        //用户id-当前操作人id，必须
    }         

返回例子：

    {
      "Result": "success",
      "Content": [
         {
            "teamId":"***",                 //团队id
            "teamName":"***",               //团队名称
            "teamNum":"***",                //团队号码
            "userCount":"18",               //团队成员数量
            "isMyCreate":true,              //是否自己创建的
            "createrId":"***"               //创建人id
         },
         {
            "teamId":"***", 
            "teamName":"***", 
            "teamNum":"***", 
            "userCount":"13",
            "isMyCreate":false,
            "createrId":"***"
         },
         {***}
      ],
      "Count": 7,
    }
    
后台：接口实现注意事项：
    
	1、查询当前用户所属的有效的团队，过滤团队的有效状态；
	2、自己创建的放前边，加入的放后边，同类型的按照创建时间倒序排序；
	
###  团队管理-创建团队
>http://localhost:8080/super-class/restTeamService/addTeam

post请求

参数例子：

    {
      "userId":"***",                       //用户id-当前操作人id，必须
      "teamName":"***"                      //团队名称，必须
    }  


成功返回例子：

    {
      "Result": "success",
      "Item":{
          "teamId":"***"                   //团队id
      }
      "ResultMsg": "",
    }

失败返回例子：

    {
      "Result": "failure",
      "ResultMsg": ""
    }

	
后台：接口实现注意事项：
    
	1、为团队生成编号；

###  团队管理-验证团队编号
>http://localhost:8080/super-class/restTeamService/verifyTeamNumExist

post请求

参数例子：

    {
      "userId":"***",                       //用户id-当前操作人id，必须
      "teamNum":"***"                       //团队号码，必须
    }  


成功返回例子：

    {
      "Result": "success",
      "Item": {"isExist":true}
      "ResultMsg": "",
    }

失败返回例子：

    {
      "Result": "failure",
      "ResultMsg": ""
    }

前台：接口调用注意事项：

	1、返回数据中isExist为true时，代表该该团队编号已经存在；
	
	
###  团队管理-加入团队
>http://localhost:8080/super-class/restTeamService/joinTeam

post请求

参数例子：

    {
      "userId":"***",                       //用户id-当前操作人id，必须
      "teamNum":"***"                       //团队号码，必须
    }  


成功返回例子：

    {
      "Result": "success",
      "Item":{
          "teamId":"***",                   //团队id
          "teamName":"***",                 //团队名称
          "teamNum":"***",                  //团队号码
          "createrId":"***",                //创建人id
          "createTime":"***",               //创建时间，yyyy-MM-dd HH:mm:ss
          "updateTime":"***",               //更新时间，yyyy-MM-dd HH:mm:ss
          "valid":"***"                     //有效状态，1-有效，0-无效
      }
    }

失败返回例子：

    {
      "Result": "failure",
      "ResultMsg": "该团队号不存在！"
    }

	
后台：接口实现注意事项：
    
	1、验证团队号是否存在，验证团队人数是否达到上限300人，验证不通过则返回"failure"，并提示，
	2、验证通过后则建立用户和团队的关系，并返回团队信息；
	3、加入团队成功后，按照规则生成通知；
	
	
### 团队管理-根据查询团队详细信息
>http://localhost:8080/super-class/restTeamService/queryTeamById

post请求

参数例子：

    {
      "userId":"***",                       //用户id-当前操作人id，必须
      "teamId":"***"                        //团队id ,必须
    }         

返回例子：

    {
      "Result": "success",
      "Item":{
          "teamId":"***",                   //团队id
          "teamName":"***",                 //团队名称
          "teamNum":"***",                  //团队号码
          "userCount":"18",                 //团队成员数量
          "createrId":"***",                //创建人id
          "createTime":"***",               //创建时间，yyyy-MM-dd HH:mm:ss
          "updateTime":"***",               //更新时间，yyyy-MM-dd HH:mm:ss
          "valid":"***"                     //有效状态，1-有效，0-无效，即被解散
      }
    } 
    
后台：接口实现注意事项：
    
	1、团队成员数量来自团队人员关系表：t_team_user_rel；
	
### 团队管理-查询团队成员列表
>http://localhost:8080/super-class/restTeamService/queryTeamUserList

post请求

参数例子：

    {
      "userId":"***",                       //用户id-当前操作人id，必须
      "teamId":"***"                        //团队id ,必须
    }         

返回例子：

    {
      "Result": "success",
      "Content": [
         {
            "userId":"***",                 //用户id
            "nickname":"***",               //用户昵称
            "headPortrait":"***",           //系统头像key
            "userType":"***",               //用户类型，1-管理员（创建者），2-成员
            "isCurrentUser":"1"             //是否当前用户，1-是，0-否
         },
         {
            "userId":"***", 
            "nickname":"***",    
            "headPortrait":"***", 
            "userType":"***",       
            "isCurrentUser":"0"
         },
         {***}
      ],
      "Count": 7,
    }
    
后台：接口实现注意事项：
    
	1、"是否当前用户"根据请求时的用户id判断；
	2、返回数据按照user_type,nickname 生序排序；
  
###  团队管理-删除团队成员
>http://localhost:8080/super-class/restTeamService/removeTeamUser

post请求

参数例子：

    {
      "userId":"***",                       //用户id-当前操作人id，必须
      "teamId":"***",                       //团队id，必须
      "removeUserId":"***",                 //需要删除的用户id，必须
      
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
    
	1、将该用户与团队的关系删除；
	
###  团队管理-解散团队
>http://localhost:8080/super-class/restTeamService/invalidTeam

post请求

参数例子：

    {
      "userId":"***",                       //用户id-当前操作人id，必须
      "teamId":"***"                        //团队id，必须
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
    
	1、修改团队的有效状态为无效；
	
###  团队管理-修改团队名称
>http://localhost:8080/super-class/restTeamService/updateTeamName

post请求

参数例子：

    {
      "userId":"***",                       //用户id-当前操作人id，必须
      "teamId":"***",                       //团队id，必须
      "teamName":"***"                      //团队名称，必须
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

	
###  团队管理-上传工作日历
>http://localhost:8080/super-class/restTeamService/uploadWorkCalendar

post请求

参数例子：

    {
      "userId":"***",                       //用户id-当前操作人id，必须
      "teamId":"***",                       //团队id，必须
      "uploadAddr":"***",                   //上传地址，必须
      "startTime":"***",                    //开始时间，yyyy-MM-dd，必须
      "endTime":"***"                       //结束时间，yyyy-MM-dd，必须
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
    
	1、修改表t_work_calendar_user，批量修改满足条件的记录，将上传地址upload_addr加上新的地址，上传地址之间，用","分割；
	2、过滤条件，当前团队下、有效数据，且upload_addr值不包含当前地址的数据；

## 排班表管理
### 创建排班表-查询上次排班中的班次列表
>http://localhost:8080/super-class/restScheduleService/queryLastShiftList

post请求

参数例子：

    {
      "userId":"***",                       //用户id-当前操作人id，必须
      "teamId":"***"                        //团队id，必须
    }         

返回例子：

    {
      "Result": "success",
      "Content": [
         {
            "shiftId":"***",                //班次id
            "shiftName":"***"               //班次名称
         },
         {
            "shiftId":"***",                //班次id
            "shiftName":"***"               //班次名称
         },
         {***}
      ],
      "Count": 7,
    }
    
后台：接口实现注意事项：
    
	1、数据来源排班配置表：t_schedule；
	2、查询上次已生效的排班中的班次列表；

### 创建排班表-查询上次排班配置
>http://localhost:8080/super-class/restScheduleService/queryLastSchedule

post请求

参数例子：

    {
      "userId":"***",                       //用户id-当前操作人id，必须
      "teamId":"***"                        //所属团队id，必须
    }         

返回例子：

    {
      "Result": "success",
      "Item":{
          "teamId":"***",                   //所属团队id
          "shifts":[                        //班次，必须
             {"shiftId":"***","shiftName":"***"},
             {"shiftId":"***","shiftName":"***"},
             {***}
          ],
          "isTurnShift":"***",               //是否采用轮班制度，1-是，0-否
          "turnShiftCycle":"5",              //轮班周期,单位天
          "turnShifts":[                     //轮转班次
             {"day":"1","shiftId":"***","shiftName":"***"},
             {"day":"2","shiftId":"***","shiftName":"***"},
             {"day":"3"},                    //没有班次的天
             {"day":"4","shiftId":"***","shiftName":"***"},
             {***}
          ],
          "isWeekendRest":"***",             //是否周末休息，1-是，0-否
          "isHolidayRest":"***",             //法定节假日休息，1-是，0-否
          "isSpecialDayShift":"***",         //特殊日单独排班，1-是，0-否
          "specialDayIds":"***",             //特殊日id串，特殊日id之间用","分割
          "startTime":"***",                 //开始时间,格式：yyyy-MM-dd
          "endTime":"***",                   //结束时间,格式：yyyy-MM-dd
          "minWorkDays":"***",               //最少工作的天数
          "maxWeekendRestDays":"***",        //最多能在周末休息的天数
          "maxConsecutiveRestDays":"***",    //每周最多允许连休的天数
          "noShifts":[                       //不上某些班次，可以是多个
             {
                "users":[
                   {"userId":"***","nickname":"***"},//用户id和昵称
                   {"userId":"***","nickname":"***"},//用户id和昵称
                   {***}
                ],
                "shiftIds":"***",            //不上某些班次的id串,班次id，用","分割
                "shiftNames":"***"           //不上的某些班次的name串,班次name，用"、"分割
             },
             {***}
          ],
          "noWeeks":[                        //周几不上班，可以是多个
             {
                "users":[
                   {"userId":"***","nickname":"***"},//用户id和昵称
                   {"userId":"***","nickname":"***"},//用户id和昵称
                   {***}
                ],
                "weeksCodes":"***",          //不上的周几code串,code用","分割，例如"1,2"
                "weeksNames":"***"           //不上的周几的name串,周几name，用"、"分割,例如"周一、周二"
             },
             {***}
          ],
          "joinUsers":[                     //参加班次的特殊成员
             {
                "userId":"***",             //用户id
                "nickname":"***",           //用户昵称
             },
             {***}
          ]
      }
    } 
 
 失败返回例子：

    {
      "Result": "failure",
      "ResultMsg": ""
    }
       
前台：接口调用注意事项：

	1、 "Item":{}代表没有上次配置；
	2、周几的code-name对应关系：1-周一，2-周二，...7-周日；
	  
后台：接口实现注意事项：
    
	1、数据来源：
	       排班配置表：t_schedule；
	       排班配置-不上某些班次表：t_schedule_no_shift;
	       排班配置-不上周几表：t_schedule_no_weeks;
	       
### 创建排班表-查询班次详细信息
>http://localhost:8080/super-class/restScheduleService/queryShiftById

post请求

参数例子：

    {
      "userId":"***",                       //用户id-当前操作人id，必须
      "shiftId":"***",                      //班次id ,必须
    }         

返回例子：

    {
      "Result": "success",
      "Item":{
          "shiftId":"***",                  //班次id
          "teamId":"***",                   //所属团队id
          "shiftName":"***",                //班次名称
          "shortName":"***",                //班次简称
          "startTime":"***",                //开始时间，hhmm
          "endTime":"***",                  //结束时间，hhmm
          "maxUserNum":"***",               //最多人数,可能有空值
          "minUserNum":"***",               //最少人数,可能有空值
          "isMinRestDay":"***",             //完成本班次后至少休息1天，1-是，0-否
          "isMustJoin":"***",               //有必须参加本班次的成员，1-是，0-否
          "minJoinNum":"***",               //必须参加成员中至少人数,可能有空值
          "createrId":"***",                //创建人id
          "createTime":"***"                //创建时间，yyyy-MM-dd HH:mm:ss
      }
    } 
    
后台：接口实现注意事项：
    
	1、数据来源班次表：t_team_shift；	
	
### 创建排班表-新增班次
>http://localhost:8080/super-class/restScheduleService/addShift

post请求

参数例子：

    {
      "userId":"***",                       //用户id-当前操作人id，必须
      "teamId":"***",                       //所属团队id，必须
      "shiftName":"***",                    //班次名称，必须
      "shortName":"***",                    //班次简称，必须
      "startTime":"***",                    //开始时间，hhmm，必须
      "endTime":"***",                      //结束时间，hhmm，必须
      "maxUserNum":"***",                   //最多人数,可能有空值
      "minUserNum":"***",                   //最少人数,可能有空值
      "isMinRestDay":"***",                 //完成本班次后至少休息1天，1-是，0-否
      "isMustJoin":"***",                   //有必须参加本班次的成员，1-是，0-否
      "minJoinNum":"***"                    //必须参加成员中至少人数,可能有空值
    }         

成功返回例子：

    {
      "Result": "success",
      "Item":{
          "shiftId":"***"                   //班次id
      }
      "ResultMsg": ""
    }

失败返回例子：

    {
      "Result": "failure",
      "ResultMsg": ""
    }
前台：接口调用注意事项：

	1、注意班次不提供修改方法，页面中修改时也是创建一个新的，更换返回后的班次id；
	  
后台：接口实现注意事项：
    
	1、数据来源班次表：t_team_shift；
	2、参加本班次的成员是将用户id用","间隔保存到表中的；

### 创建排班表-查询上次排班中的特殊日列表
>http://localhost:8080/super-class/restScheduleService/queryLastSpecialDayList

post请求

参数例子：

    {
      "userId":"***",                       //用户id-当前操作人id，必须
      "teamId":"***"                        //团队id，必须
    }         

返回例子：

    {
      "Result": "success",
      "Content": [
         {
            "specialDayId":"***",           //特殊日id
            "teamId":"***",                 //所属团队id
            "specialDayName":"***",         //特殊日名称
            "specialDayType":"***",         //特殊日类型，1-单日、2-日期段
            "startTime":"***",              //开始时间,格式：yyyy-MM-dd
            "endTime":"***",                //结束时间,格式：yyyy-MM-dd,类型是单日时该值不存在
            "shifts":[                      //特殊日的班次
               {"shiftId":"***","shiftName":"***"},
               {"shiftId":"***","shiftName":"***"},
               {***}
            ],
            "createrId":"***",              //创建人id
            "createTime":"***"              //创建时间，yyyy-MM-dd HH:mm:ss
         },
         {
            "specialDayId":"***",
            "teamId":"***",
            "specialDayName":"***",
            "specialDayType":"***",
            "startTime":"***",
            "endTime":"***",
            "shifts":[
               {"shiftId":"***","shiftName":"***"},
               {"shiftId":"***","shiftName":"***"},
               {***}
            ],
            "createrId":"***",
            "createTime":"***"         
         },
         {***}
      ],
      "Count": 3,
    }
    
后台：接口实现注意事项：
    
	1、数据来源排班配置表：t_schedule和特殊日表：t_special_day；
	2、查询上次已生效的排班中的特殊日信息；

### 创建排班表-新增特殊日
>http://localhost:8080/super-class/restScheduleService/addSpecialDay

post请求

参数例子：

    {
      "userId":"***",                       //用户id-当前操作人id，必须
      "teamId":"***",                       //所属团队id，必须
      "specialDayName":"***",               //特殊日名称，必须
      "specialDayType":"***",               //特殊日类型，1-单日、2-日期段，必须
      "startTime":"***",                    //开始时间,格式：yyyy-MM-dd，必须
      "endTime":"***",                      //结束时间,格式：yyyy-MM-dd,类型是单日时不传该值
      "shifts":[                            //特殊日的班次，必须
         {"shiftId":"***","shiftName":"***"},
         {"shiftId":"***","shiftName":"***"},
         {***}
      ],
    }         

成功返回例子：

    {
      "Result": "success",
      "Item":{
          "specialDayId":"***",            //特殊日id
      }
      "ResultMsg": ""
    }

失败返回例子：

    {
      "Result": "failure",
      "ResultMsg": ""
    }
前台：接口调用注意事项：

	1、注意特殊日不提供修改方法，页面中修改时也是创建一个新的，更换返回后的特殊日id；
	  
后台：接口实现注意事项：
    
	1、数据来源特殊日表：t_special_day；
	
### 创建排班表-新增排班配置
>http://localhost:8080/super-class/restScheduleService/addSchedule

post请求

参数例子：

    {
      "userId":"***",                       //用户id-当前操作人id，必须
      "teamId":"***",                       //所属团队id，必须
      "shifts":[                            //班次，必须
         {"shiftId":"***","shiftName":"***"},
         {"shiftId":"***","shiftName":"***"},
         {***}
      ],
      "isTurnShift":"***",                  //是否采用轮班制度，1-是，0-否
      "turnShiftCycle":"5",                 //轮班周期,单位天
      "turnShifts":[                        //轮转班次
         {"day":"1","shiftId":"***","shiftName":"***"},
         {"day":"2","shiftId":"***","shiftName":"***"},
         {"day":"3"},                        //没有班次的天
         {"day":"4","shiftId":"***","shiftName":"***"},
         {***}
      ],
      "isWeekendRest":"***",                //是否周末休息，1-是，0-否
      "isHolidayRest":"***",                //法定节假日休息，1-是，0-否
      "isSpecialDayShift":"***",            //特殊日单独排班，1-是，0-否
      "specialDayIds":"***",                //特殊日id串，特殊日id之间用","分割
      "joinUsers":[                         //参加班次的特殊成员
         {
            "userId":"***",                 //用户id
            "nickname":"***",               //用户昵称
         },
         {***}
      ]
    }         

成功返回例子：

    {
      "Result": "success",
      "Item":{
          "scheduleId":"***",              //排班配置id
      }
      "ResultMsg": ""
    }

失败返回例子：

    {
      "Result": "failure",
      "ResultMsg": ""
    }
前台：接口调用注意事项：

	1、周几的code-name对应关系：1-周一，2-周二，...7-周日；
	  
后台：接口实现注意事项：
    
	1、数据来源：
	       排班配置表：t_schedule；
	       排班配置-不上某些班次表：t_schedule_no_shift;
	       排班配置-不上周几表：t_schedule_no_weeks;
	       
### 创建排班表-修改排班配置
>http://localhost:8080/super-class/restScheduleService/updateSchedule

post请求

参数例子：

    {
      "userId":"***",                       //用户id-当前操作人id，必须
      "scheduleId":"***",                   //排班配置id，必须
      "teamId":"***",                       //所属团队id，必须
      "shifts":[                            //班次，必须
         {"shiftId":"***","shiftName":"***"},
         {"shiftId":"***","shiftName":"***"},
         {***}
      ],
      "isTurnShift":"***",                  //是否采用轮班制度，1-是，0-否
      "turnShiftCycle":"5",                 //轮班周期,单位天
      "turnShifts":[                        //轮转班次
         {"day":"1","shiftId":"***","shiftName":"***"},
         {"day":"2","shiftId":"***","shiftName":"***"},
         {"day":"3"},                        //没有班次的天
         {"day":"4","shiftId":"***","shiftName":"***"},
         {***}
      ],
      "isWeekendRest":"***",                //是否周末休息，1-是，0-否
      "isHolidayRest":"***",                //法定节假日休息，1-是，0-否
      "isSpecialDayShift":"***",            //特殊日单独排班，1-是，0-否
      "specialDayIds":"***",                //特殊日id串，特殊日id之间用","分割
      "startTime":"***",                    //开始时间,格式：yyyy-MM-dd
      "endTime":"***",                      //结束时间,格式：yyyy-MM-dd
      "minWorkDays":"***",                  //最少工作的天数
      "maxWeekendRestDays":"***",           //最多能在周末休息的天数
      "maxConsecutiveRestDays":"***",       //每周最多允许连休的天数
      "noShifts":[                          //不上某些班次，可以是多个
         {
            "users":[
                {"userId":"***","nickname":"***"},//用户id和昵称
                {"userId":"***","nickname":"***"},//用户id和昵称
                {***}
            ],
            "shiftIds":"***",               //不上某些班次的id串,班次id，用","分割
            "shiftNames":"***"              //不上的某些班次的name串,班次name，用"、"分割
         },
         {***}
      ],
      "noWeeks":[                           //周几不上班，可以是多个
         {
            "users":[
                {"userId":"***","nickname":"***"},//用户id和昵称
                {"userId":"***","nickname":"***"},//用户id和昵称
                {***}
            ],
            "weeksCodes":"***",             //不上的周几code串,code用","分割，例如"1,2"
            "weeksNames":"***"              //不上的周几的name串,周几name，用"、"分割,例如"周一、周二"
         },
         {***}
      ],
      "joinUsers":[                         //参加班次的特殊成员
         {
            "userId":"***",                 //用户id
            "nickname":"***",               //用户昵称
         },
         {***}
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
前台：接口调用注意事项：

	1、周几的code-name对应关系：1-周一，2-周二，...7-周日；
	  
后台：接口实现注意事项：
    
	1、数据来源：
	       排班配置表：t_schedule；
	       排班配置-不上某些班次表：t_schedule_no_shift;
	       排班配置-不上周几表：t_schedule_no_weeks;
	       
### 创建排班表-查询排班详细信息
>http://localhost:8080/super-class/restScheduleService/queryScheduleById

post请求

参数例子：

    {
      "userId":"***",                       //用户id-当前操作人id，必须
      "scheduleId":"***"                    //排班配置id ,必须
    }         

返回例子：

    {
      "Result": "success",
      "Item":{
          "scheduleId":"***",               //排班配置id
          "teamId":"***",                   //所属团队id
          "shifts":[                        //班次，必须
             {"shiftId":"***","shiftName":"***"},
             {"shiftId":"***","shiftName":"***"},
             {***}
          ],
          "isTurnShift":"***",               //是否采用轮班制度，1-是，0-否
          "turnShiftCycle":"5",              //轮班周期,单位天
          "turnShifts":[                     //轮转班次
             {"day":"1","shiftId":"***","shiftName":"***"},
             {"day":"2","shiftId":"***","shiftName":"***"},
             {"day":"3"},                    //没有班次的天
             {"day":"4","shiftId":"***","shiftName":"***"},
             {***}
          ],
          "isWeekendRest":"***",             //是否周末休息，1-是，0-否
          "isHolidayRest":"***",             //法定节假日休息，1-是，0-否
          "isSpecialDayShift":"***",         //特殊日单独排班，1-是，0-否
          "specialDayIds":"***",             //特殊日id串，特殊日id之间用","分割
          "startTime":"***",                 //开始时间,格式：yyyy-MM-dd
          "endTime":"***",                   //结束时间,格式：yyyy-MM-dd
          "minWorkDays":"***",               //最少工作的天数
          "maxWeekendRestDays":"***",        //最多能在周末休息的天数
          "maxConsecutiveRestDays":"***",    //每周最多允许连休的天数
          "noShifts":[                       //不上某些班次，可以是多个
             {
                "users":[
                   {"userId":"***","nickname":"***"},//用户id和昵称
                   {"userId":"***","nickname":"***"},//用户id和昵称
                   {***}
                ],
                "shiftIds":"***",            //不上某些班次的id串,班次id，用","分割
                "shiftNames":"***"           //不上的某些班次的name串,班次name，用"、"分割
             },
             {***}
          ],
          "noWeeks":[                        //周几不上班，可以是多个
             {
                "users":[
                   {"userId":"***","nickname":"***"},//用户id和昵称
                   {"userId":"***","nickname":"***"},//用户id和昵称
                   {***}
                ],
                "weeksCodes":"***",          //不上的周几code串,code用","分割，例如"1,2"
                "weeksNames":"***"           //不上的周几的name串,周几name，用"、"分割,例如"周一、周二"
             },
             {***}
          ],
          "joinUsers":[                     //参加班次的特殊成员
             {
                "userId":"***",             //用户id
                "nickname":"***",           //用户昵称
             },
             {***}
          ],
          "status":"***",                   //进度状态,1-设置排班、2-生成日历、3-已开始排班、4-已生效
          "createrId":"***",                //创建人id
          "createTime":"***",               //创建时间，yyyy-MM-dd HH:mm:ss
          "updateTime":"***"                //更新时间，yyyy-MM-dd HH:mm:ss
      }
    } 
    
前台：接口调用注意事项：

	1、周几的code-name对应关系：1-周一，2-周二，...7-周日；
	  
后台：接口实现注意事项：
    
	1、数据来源：
	       排班配置表：t_schedule；
	       排班配置-不上某些班次表：t_schedule_no_shift;
	       排班配置-不上周几表：t_schedule_no_weeks;
	
### 创建排班表-生成日历
>http://localhost:8080/super-class/restScheduleService/createWorkCalendar

post请求

参数例子：

    {
      "userId":"***",                       //用户id-当前操作人id，必须
      "scheduleId":"***"                    //排班配置id，必须
    }         

成功返回例子：

    {
      "Result": "success",
      "Content": [
         {
            "workCalId":"***",              //工作日历id
            "calendarDate":"***",           //日历的天，yyyy-MM-dd
            "dayType":"***",                //日类型,1-工作日，0-休息日
            "workShifts":[                  //特殊日的班次
               {"shiftId":"***","shiftName":"***"},//班次的id和简称
               {"shiftId":"***","shiftName":"***"},
               {***}
            ]
         },
         {
            "workCalId":"***", 
            "calendarDate":"***", 
            "dayType":"***", 
            "workShifts":[ 
               {"shiftId":"***","shiftName":"***"},
               {"shiftId":"***","shiftName":"***"},
               {***}
            ]
         },
         {***}
      ],
      "Count": 30,
      "ResultMsg": ""
    }

失败返回例子：

    {
      "Result": "failure",
      "ResultMsg": ""
    }
前台：接口调用注意事项：

	1、点击【下一步】调用此方法前，请先保存排班数据；
	2、返回数据是按照calendarDate的正序排序的；
	  
后台：接口实现注意事项：
    
	1、数据来源：
	       排班配置表：t_schedule；
	       排班配置-不上某些班次表：t_schedule_no_shift;
	       排班配置-不上周几表：t_schedule_no_weeks;
	     工作日历表：t_work_calendar;
	2、根据排班配置生成工作日历表中的数据，排班周期内每天生成一条记录，休息日中也要有工作班次的数据；
	3、如果启动了"法定节假日休息",则生成日历前要查询法定节假日表：t_holiday，看看哪些日期收到了影响；
	4、特殊日的班次用自己的，其它日期的班次用排班配置中的；
	5、通过开始时间和结束时间计算排班的天数，包括开始时间和结束时间；
	6、将生成工作日历数据返回给前台，按照calendarDate的正序排序；
	7、注意生成日历成功后，按照规则生成通知；
	
### 创建排班表-修改休息日
>http://localhost:8080/super-class/restScheduleService/updateWorkCalendar

post请求

参数例子：

    {
      "userId":"***",                       //用户id-当前操作人id，必须
      "workCals":[                          //工作日历，必须
         {
            "workCalId":"***",              //工作日历id
            "dayType":"***"                 //日类型,1-工作日，0-休息日
         },
         {
            "workCalId":"***",
            "dayType":"***"
         },
         {***}
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
前台：接口调用注意事项：

	1、workCals中是需要修改的日历；
	  
后台：接口实现注意事项：
    
	1、数据来源：
	     工作日历表：t_work_calendar;

### 创建排班表-开始排班
>http://localhost:8080/super-class/restScheduleService/startSchedule

post请求

参数例子：

    {
      "userId":"***",                       //用户id-当前操作人id，必须
      "scheduleId":"***"                    //排班配置id，必须
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
    
	1、数据来源 排班配置表：t_schedule；
	2、修改t_schedule中的status值为3，1-设置排班、2-生成日历、3-已开始排班、4-已生效；

## 管理排班		       
### 管理排班表-查询排班生成的日历-状态是2时
>http://localhost:8080/super-class/restScheduleService/queryWorkCalById

post请求

参数例子：

    {
      "userId":"***",                       //用户id-当前操作人id，必须
      "scheduleId":"***"                    //排班配置id，必须
    }         

成功返回例子：

    {
      "Result": "success",
      "Content": [
         {
            "workCalId":"***",              //工作日历id
            "calendarDate":"***",           //日历的天，yyyy-MM-dd
            "dayType":"***",                //日类型,1-工作日，0-休息日
            "workShifts":[                  //特殊日的班次
               {"shiftId":"***","shiftName":"***"},//班次的id和简称
               {"shiftId":"***","shiftName":"***"},
               {***}
            ]
         },
         {
            "workCalId":"***", 
            "calendarDate":"***", 
            "dayType":"***", 
            "workShifts":[ 
               {"shiftId":"***","shiftName":"***"},
               {"shiftId":"***","shiftName":"***"},
               {***}
            ]
         },
         {***}
      ],
      "Count": 30,
      "ResultMsg": ""
    }

失败返回例子：

    {
      "Result": "failure",
      "ResultMsg": ""
    }
前台：接口调用注意事项：

	1、该接口用于排班的"status"的为"2"时，点击【管理】查询排班生成的日历；
	  
后台：接口实现注意事项：
    
	1、数据来源：
	     工作日历表：t_work_calendar;
	2、查询该排班id下的日历数据，按照calendarDate的正序排序；   
	
### 管理排班表-查询排班生成的日历-状态是3时
>http://localhost:8080/super-class/restScheduleService/queryWorkCalList

post请求

    {
      "userId":"***",                       //用户id-当前操作人id，必须
      "scheduleId":"***"                    //排班id，必须
    } 

返回例子：

    {
      "Result": "success",
      "Content": [
         {
            "scheduleId":"***",             //排班id
            "calendarDate":"***",           //日历的天,格式：yyyy-MM-dd
            "dayType":"***",                //日类型,1-工作日，0-休息日
            "haveDemand":true,              //成员是否提交过需求
            "isFull":true                   //是否已满
         },
         {
            "scheduleId":"***",  
            "calendarDate":"***",
            "dayType":"***", 
            "haveDemand":true,
            "isFull":false
         },
         {***}
      ],
      "Count": 36
    }

前台：接口调用注意事项：

	1、该接口用于排班的"status"的为"3"时，点击【管理】查询排班生成的日历；
	2、返回数据是按照calendarDate的时间正序排序的；
 
后台：接口实现注意事项：
    
	1、数据来源:
	       工作日历表：t_work_calendar;
	       工作日历人员表：t_work_calendar_user;
	2、calendarDate和dayType来源表t_work_calendar；
	3、haveDemand和isFull根据表t_work_calendar_user中数据判断；
	4、当该日期下的所有班次的人数都达到最大人数时，isFull的值为true，否则为false；


### 管理排班表-查询某日的班次列表
>http://localhost:8080/super-class/restScheduleService/queryDayShiftList

post请求

    {
      "userId":"***",                       //用户id-当前操作人id，必须
      "scheduleId":"***",                   //排班id，必须
      "calendarDate":"***"                  //日历的天,格式：yyyy-MM-dd，必须
    } 

返回例子：

    {
      "Result": "success",
      "Content": [
         {
            "scheduleId":"***",             //排班id
            "calendarDate":"***",           //日历的天,格式：yyyy-MM-dd
            "shiftId":"***",                //班次id
            "shiftName":"***",              //班次名称，简称
            "users":[                       //班次中的用户
               {
                  "userId":"***",           //用户id
                  "nickname":"***"          //用户昵称
               },
               {***}
            ],
            "minUserNum":"***",             //最少人数限制
            "haveUserNum":"***",            //已经报名的用户数量
            "maxUserNum"                    //最多人数限制
         },
         {
            "scheduleId":"***",
            "calendarDate":"***",
            "shiftId":"***",
            "shiftName":"***",
            "users":[
               {
                  "userId":"***",
                  "nickname":"***"
               },
               {***}
            ],
            "minUserNum":"***",
            "haveUserNum":"***",
            "maxUserNum" 
         },
         {
            "scheduleId":"***",
            "calendarDate":"***",
            "shiftId":"xiuxi", 
            "shiftName":"休息",
            "users":[
               {
                  "userId":"***",
                  "nickname":"***"
               },
               {***}
            ],
            "minUserNum":"0",               //休息的最少人数默认0 
            "haveUserNum":"***",
            "maxUserNum"                    //休息的最多人数 ，团队人数-当天所有班次要求最少人数总和
         }
      ],
      "Count": 3
    }

前台：接口调用注意事项：

	1、根据minUserNum和haveUserNum的值控制字体颜色；
	
后台：接口实现注意事项：
    
	1、数据来源:
	       工作日历表：t_work_calendar;
	       工作日历人员表：t_work_calendar_user;
	2、shiftId和shiftName来源表t_work_calendar，在最后加"休息"的班次，其班次id为"xiuxi"，shiftName显示简称；
	3、users和haveUserNum来源表t_work_calendar_user的统计，表中day_type的值为0的是填报休假的人；
	4、"休息"的maxUserNum值算法：团队人数-当天所有班次要求最少人数总和；
	5、休息的最少人数默认0 
	
### 管理排班表-保存某日的班次数据
>http://localhost:8080/super-class/restScheduleService/saveDayShiftList	

post请求

    {
      "userId":"***",                       //用户id-当前操作人id，必须
      "scheduleId":"***",                   //排班id，必须
      "calendarDate":"***",                 //日历的天,格式：yyyy-MM-dd，必须
      "shifts":[                            //班次数组，必须
         {
            "shiftId":"***",                //班次id，必须
            "userIds":["***","***"]         //班次中的用户id数组，班次中没有人时，这个参数可以不传
         },
         {
            "shiftId":"***"
            "userIds":["***","***"]
         },
         {***}
      ]

    } 

成功返回例子：

    {
      "Result": "success",
      "ResultMsg": "有些班次未能满足参与人数要求！"
    }

失败返回例子：

    {
      "Result": "failure",
      "ResultMsg": ""
    }

	
后台：接口实现注意事项：
    
	1、数据源:
	       工作日历人员表：t_work_calendar_user;
	2、每个班次下人员数据保存前都要与该排班中当天本班次下原来的人员做对比，找出变化的(增加的和删除的)；
	3、对于班次下变化的人员进行修改，对应生成通知（只有成员提的需求被删除时，给成员发通知），并验证是否存在班次未能满足参与人数要求；
	4、如果存在班次未能满足参与人数要求,提示前台；

### 管理排班表-立即生效验证
>http://localhost:8080/super-class/restScheduleService/verifySchedule

post请求

    {
      "userId":"***",                       //用户id-当前操作人id，必须
      "scheduleId":"***"                    //排班id，必须
    } 

成功返回例子：

    {
      "Result": "success",
      "Item":{
          "resultType":"***",               //结果类型，1-可以生效，2-有些日期的班次未满足参与人数要求
          "calendarDates":["***","***"]     //未满足参与人数要求的日期数组
          
      }
      "ResultMsg": ""
    }

失败返回例子：

    {
      "Result": "failure",
      "ResultMsg": ""
    }

	
后台：接口实现注意事项：
    
	1、数据源:
	       排班配置表：t_schedule
	       工作日历表：t_work_calendar;
	       工作日历人员表：t_work_calendar_user;
	2、验证该排班下是否存在日期的班次未能满足最少参与人数，注意"休息"的maxUserNum值算法：团队人数-当天所有班次要求最少人数总和；

		
### 管理排班表-立即生效
>http://localhost:8080/super-class/restScheduleService/effectSchedule

post请求

    {
      "userId":"***",                       //用户id-当前操作人id，必须
      "scheduleId":"***"                    //排班id，必须
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
    
	1、数据源:
	       排班配置表：t_schedule
	       工作日历表：t_work_calendar;
	       工作日历人员表：t_work_calendar_user;
	2、执行生效时：
	   2.1 先修改t_schedule、t_work_calendar、t_work_calendar_user中该排班数据的状态；
	   2.2删除t_work_calendar、t_work_calendar_user中其它排班与该排班重叠的数据；
	3、注意按照规则生成通知；
	
### 管理排班表-一键填充
>http://localhost:8080/super-class/restScheduleService/aKeyFillSchedule

post请求

    {
      "userId":"***",                       //用户id-当前操作人id，必须
      "scheduleId":"***"                    //排班id，必须
    } 

成功返回例子：

    {
      "Result": "success",
      "Content": [
         "reminds":["***","***"],           //未满足条件提醒
         "schedules":[                      //日历数组             
            {
               "scheduleId":"***",          //排班id
               "calendarDate":"***",        //日历的天,格式：yyyy-MM-dd
               "dayType":"***",             //日类型,1-工作日，0-休息日
               "haveDemand":true,           //成员是否提交过需求
               "isFull":true                //是否已满
            },
            {
               "scheduleId":"***",  
               "calendarDate":"***",
               "dayType":"***", 
               "haveDemand":true,
               "isFull":false
            },
            {***}
         ]，

      ],
      "ResultMsg": ""
    }

失败返回例子：

    {
      "Result": "failure",
      "ResultMsg": ""
    }

	
前台：接口调用注意事项：

	1、reminds中每一个字符串为一个未满足的条件；
	2、返回数据是按照calendarDate的时间正序排序的；
 
后台：接口实现注意事项：
    
	1、数据来源:
	       工作日历表：t_work_calendar;
	       工作日历人员表：t_work_calendar_user;
	2、calendarDate和dayType来源表t_work_calendar；
	3、haveDemand和isFull根据表t_work_calendar_user中数据判断；
	4、当该日期下的所有班次的人数都达到最大人数时，isFull的值为true，否则为false；
	5、注意每次一键生成的数据加入到表t_work_calendar_user之前，需要先清除之前一键生成的数据；
	
### 管理排班表-按人查看统计
>http://localhost:8080/super-class/restScheduleService/queryScheduleStatForUser

post请求

    {
      "userId":"***",                       //用户id-当前操作人id，必须
      "scheduleId":"***"                    //排班id，必须
    } 

成功返回例子：

    {
      "Result": "success",
      "Content": [
        {
          "columns":["","张三","李四","王五","陈六",***]
        },
        {
          "columns":["早班","5","5","5","5",***]
        },
        {
          "columns":["中班","1","","","",***]
        },
        {***},
        {
          "columns":["平均每周工作时长","50小时","50小时","50小时","50小时",***]
        },
        {
          "columns":["平均每天工作时长","50小时","50小时","50小时","50小时",***]
        }
      ],
      "Count": 7,
    } 

失败返回例子：

    {
      "Result": "failure",
      "ResultMsg": ""
    }

	
后台：接口实现注意事项：
    
	1、数据源:
	       工作日历人员表：t_work_calendar_user;
	2、休息只统计t_work_calendar_user中的休假，不算周末和节假日等所有成员的公休日；
	3、统计时长四舍五入取整，5小时30分时显示6小时， 5小时29分钟，显示5小时 
	
	
### 管理排班表-按日查看统计
>http://localhost:8080/super-class/restScheduleService/queryScheduleStatForDay

post请求

    {
      "userId":"***",                       //用户id-当前操作人id，必须
      "scheduleId":"***"                    //排班id，必须
    } 

成功返回例子：

    {
      "Result": "success",
      "Content": [
        {
          "columns":["","9月2日","9月3日","9月4日","9月5日",***]
        },
        {
          "columns":["早班","5人","5人","5人","5人",***]
        },
        {
          "columns":["中班","1人","2人","2人","5人",***]
        },
        {***}
      ],
      "Count": 7,
    } 

失败返回例子：

    {
      "Result": "failure",
      "ResultMsg": ""
    }

	
后台：接口实现注意事项：
    
	1、数据源:
	       工作日历人员表：t_work_calendar_user;
		
## 成员提要求
### 提要求-查询工作日历列表
>http://localhost:8080/super-class/restDemandService/queryWorkCalList

post请求

    {
      "userId":"***",                       //用户id-当前操作人id，必须
      "scheduleId":"***"                    //排班id，必须
    } 

返回例子：

    {
      "Result": "success",
      "Content": [
         {
            "scheduleId":"***",             //排班id
            "calendarDate":"***",           //日历的天,格式：yyyy-MM-dd
            "dayType":"***",                //日类型,1-工作日，0-休息日
            "shiftName":"***",              //自己的班次名称,包括休假
            "isFull":true                   //是否已满
         },
         {
            "scheduleId":"***",  
            "calendarDate":"***",
            "dayType":"***", 
            "shiftName":"***", 
            "isFull":false
         },
         {***}
      ],
      "Count": 36
    }

前台：接口调用注意事项：

	1、返回数据是按照calendarDate的时间正序排序的；
 
后台：接口实现注意事项：
    
	1、数据来源:
	       工作日历表：t_work_calendar;
	       工作日历人员表：t_work_calendar_user;
	2、calendarDate和dayType来源表t_work_calendar；
	3、shiftName来源表t_work_calendar_user，显示简称，表中day_type的值为0时，shiftName的值为休假；
	4、当该日期下的所有班次的人数都达到最大人数时，isFull的值为true，否则为false；
	
### 提要求-查询提醒信息
>http://localhost:8080/super-class/restDemandService/queryRemindByScheduleId

post请求

    {
      "userId":"***",                       //用户id-当前操作人id，必须
      "scheduleId":"***"                    //排班id，必须
    } 

返回例子：

    {
      "Result": "success",
      "Item":{
          "remind":"排班周期内，您最多可以选择2天休息 ，其中可选周末休息1天", //提醒内容，可能空值
      }
    }
 
后台：接口实现注意事项：
    
	1、数据来源:
	       排班配置表：t_schedule;
	2、看设计，注意提示内容生成的规则；
	
### 提要求-查询某日的班次列表
>http://localhost:8080/super-class/restDemandService/queryDayShiftList

post请求

    {
      "userId":"***",                       //用户id-当前操作人id，必须
      "scheduleId":"***",                   //排班id，必须
      "calendarDate":"***"                  //日历的天,格式：yyyy-MM-dd，必须
    } 

返回例子：

    {
      "Result": "success",
      "Content": [
         {
            "scheduleId":"***",             //排班id
            "calendarDate":"***",           //日历的天,格式：yyyy-MM-dd
            "shiftId":"***",                //班次id
            "shiftName":"***",              //班次名称，简称
            "userNames":"***",              //用户昵称串，用"、"号隔开
            "haveUserNum":"***",            //已经报名的用户数量
            "maxUserNum"                    //最多人数限制
         },
         {
            "scheduleId":"***",
            "calendarDate":"***",
            "shiftId":"***",
            "shiftName":"***",
            "userNames":"***",
            "haveUserNum":"***",
            "maxUserNum" 
         },
         {
            "scheduleId":"***",
            "calendarDate":"***",
            "shiftId":"xiuxi", 
            "shiftName":"休息",
            "userNames":"***",
            "haveUserNum":"***",
            "maxUserNum"                    //休息的最多人数 ，团队人数-当天所有班次要求最少人数总和
         }
      ],
      "Count": 3
    }

前台：接口调用注意事项：

	1、当haveUserNum和maxUserNum的值相等时，代表该班次人员已满；
	
后台：接口实现注意事项：
    
	1、数据来源:
	       工作日历表：t_work_calendar;
	       工作日历人员表：t_work_calendar_user;
	2、shiftId和shiftName来源表t_work_calendar，在最后加"休息"的班次，其班次id为"xiuxi"，shiftName显示简称；
	3、userNames和haveUserNum来源表t_work_calendar_user的统计，表中day_type的值为0的是填报休假的人；
	4、"休息"的maxUserNum值算法：团队人数-当天所有班次要求最少人数总和；
	
### 提要求-加入某个班次
>http://localhost:8080/super-class/restDemandService/joinShif

post请求

    {
      "userId":"***",                       //用户id-当前操作人id，必须
      "teamId":"***",                       //团队id，必须
      "scheduleId":"***",                   //排班id，必须
      "calendarDate":"***",                 //日历的天,格式：yyyy-MM-dd，必须
      "shiftId":"***"                       //班次id，必须
    } 

成功返回例子：

    {
      "Result": "success",
      "Item":{
          "resultType":"***",               //结果类型，1-加入成功，2-超出可选休息天数，3-该班次人数已满
      }
      "ResultMsg": ""
    }

失败返回例子：

    {
      "Result": "failure",
      "ResultMsg": ""
    }

	
后台：接口实现注意事项：
    
	1、数据源:
	       工作日历人员表：t_work_calendar_user;
	2、shiftId的值为"xiuxi"时，要验证是否超出可选休息天数，否则验证该班次人数是否已满；
	3、注意"休息"时数据的存储：day_type值为0，shift_id值为空；
	4、注意按照规则生成通知；
	
### 提要求-取消某个班次
>http://localhost:8080/super-class/restDemandService/cancelShif

post请求

    {
      "userId":"***",                       //用户id-当前操作人id，必须
      "teamId":"***",                       //团队id，必须
      "scheduleId":"***",                   //排班id，必须
      "calendarDate":"***",                 //日历的天,格式：yyyy-MM-dd，必须
      "shiftId":"***"                       //班次id，必须
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
    
	1、数据源:
	       工作日历人员表：t_work_calendar_user;
	2、删除表中满足条件的数据，注意"休息"时是删除day_type值为0的数据；
	3、注意按照规则生成通知；
	
## 吐槽
### 吐槽-查询吐槽信息
>http://localhost:8080/super-class/restTweetService/queryTweetList

post请求

参数例子：

    {
      "userId":"***",                       //用户id-当前操作人id，必须
      "pageNum":"***",                      //页面编号，必须
      "size":"***"                          //返回数量
    }         

返回例子：

    {
      "Result": "success",
      "Content": [
         {
            "userId":"***",                //吐槽用户id
            "content":"***"                //内容
         },
         {
            "userId":"***",
            "content":"***"
         },
         {***}
      ],
      "Count": 500,
    }
    
后台：接口实现注意事项：
    
	1、数据来源吐槽表：t_tweet；
	2、查询页面编号下的吐槽数据，按照创建时间倒序返回size的数据，size空时返回当前页面编码下的所有吐槽；
	 
### 吐槽-添加吐槽
>http://localhost:8080/super-class/restTweetService/addTweet

post请求

    {
      "userId":"***",                       //用户id-当前操作人id，必须
      "pageNum":"***",                      //页面编号，必须
      "content":"***"                       //内容，必须
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
    
	1、数据来源吐槽表：t_tweet；
	
## 通知
### 通知-查询我的通知列表
>http://localhost:8080/super-class/restInformService/queryMyInformList

post请求

参数例子：

    {
      "userId":"***",                       //用户id-当前操作人id，必须
      "page":1,                             //当前页号，默认从第1页开始
      "pageSize":50                         //每页返回数量，不传时不分页
    }         

返回例子：

    {
      "Result": "success",
      "Content": [
         {
            "informType":"***",            //通知类型，子项见后边
            "content":"***",               //内容
            "status":"***",                //状态，0-未读、1-已读
            "createTime":"***"             //创建时间，yyyy-MM-dd HH:mm:ss
         },
         {
            "informType":"***",
            "content":"***", 
            "status":"***",
            "createTime":"***"
         },
         {***}
      ],
      "Count": 50,
    }
   
前台：接口调用注意事项：

	1、通知类型：1. 成员加入团队，2. 新增排班计划，3. 团队新增生效的工作历，4. 成员的排班被管理者调整，5. 成员的排班调整
后台：接口实现注意事项：
    
	1、数据来源通知表：t_inform；
	2、返回数据按照创建时间倒序排序；
	 
### 通知-标记通知已读
>http://localhost:8080/super-class/restInformService/readMyInform

post请求

参数例子：

    {
      "userId":"***"                        //用户id-当前操作人id，必须
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
    
	1、数据来源通知表：t_inform；
	2、将用户下所有未读的通知标记成已读；
		     
## 个人中心
### 个人中心-查询用户详细信息
>http://localhost:8080/super-class/restUserService/queryUserById

post请求

参数例子：

    {
      "userId":"***",                       //用户id-当前操作人id，必须
      "queryUserId":"***"                   //需要查询的用户id
    }         

成功返回例子：

    {
      "Result": "success",
      "Item":{
          "userId":"***",                   //用户id
          "nickname":"***",                 //用户昵称
          "phoneNum":"***",                 //手机号
          "headPortrait":"***",             //系统头像key
          "systemId":"superClass",          //系统编码，用于图片服务，
          "imageSecret":"***",              //秘钥，用于图片服务，
          "lastTeamId":"***",               //上一次所在团队id
          "createrId":"***",                //创建人id
          "createTime":"***",               //创建时间，yyyy-MM-dd HH:mm:ss
          "updateTime":"***",               //更新时间，yyyy-MM-dd HH:mm:ss
          "valid":"***"                     //有效状态，1-有效，0-无效
      },
      "ResultMsg": "",
    }

失败返回例子：

    {
      "Result": "failure",
      "ResultMsg": ""
    } 
    
### 个人中心-修改用户信息
>http://localhost:8080/super-class/restUserService/updateUser

post请求

参数例子：

    {
      "userId":"***",                       //用户id-当前操作人id，必须
      "nickname":"***",                     //昵称
      "headPortrait":"***"                  //系统头像的key
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

### 个人中心-修改用户手机号
>http://localhost:8080/super-class/restUserService/updateUserPhoneNum

post请求

参数例子：

    {
      "userId":"***",                       //用户id-当前操作人id，必须
      "phoneNum":"***",                     //手机号,必须
      "userPsw":"***"                       //验证码,必须
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


#web功能接口服务
## 合并排班    
>http://localhost:8080/super-class/restTeamService/downloadWorkCalendar

post请求

参数例子：

    {
      "uploadAddr":"***",                   //上传地址，必须
      "startTime":"***",                    //开始时间，yyyy-MM-dd，必须
      "endTime":"***"                       //结束时间，yyyy-MM-dd，必须
    }  


成功值：

 	数据流

 
后台：接口实现注意事项：
    
	1、数据来源主表：工作日历人员表：t_work_calendar_user;
	2、查询表中创建时间在查询时间段范围内，且upload_addr的值包含上传地址的数据，按照团队分组；
	3、生成数据格式参照模板《合并排班表yyyymmdd-yyyymmdd.xlsx》；
               
           