/**
 * @包名称 com.sagacloud.common
 * @文件名 DataRequestPathUtil.java
 * @创建者 wanghailong
 * @邮箱 wanghailong@persagy.com  
 * @修改描述 
 */

package com.sagacloud.saasmanage.common;

/** 
 * 功能描述： 数据请求路径工具类
 * @类型名称 DataRequestPathUtil
 * @创建者 wanghailong
 * @邮箱 wanghailong@persagy.com  
 * @修改描述 
 */
public class DataRequestPathUtil {
	/**** 短信平台请求路径 ***/
	//post：短信平台-发送模板
	public final static String smsPlat_send_template = "BASEPATH/restSmsService/sendTemplate?appCode=APPCODE";
	//post：短信平台-发送邮件
	public final static String smsPlat_send_mail = "BASEPATH/restMailRegisterService/sendMail?appCode=APPCODE";
	
	/**** 数据平台--数据字典、信息点--请求路径 ***/
	//get：数据平台-数据字典查询
	public final static String dataPlat_dict_query = "BASEPATH/dict/query/PARAM";
	//get: 数据平台-数据字典查询-系统和设备独有信息列表
	public final static String dataPlat_infocode_query_ID = "BASEPATH/infocode/query?ID=PARAM";
	//get:数据平台-项目-管理员查询
	public final static String dataPlat_project_query = "BASEPATH/mng/project/query?secret=SECRET";

	/**** 数据平台--创建--请求路径 ***/
	//post:数据平台-项目-创建
	public final static String dataPlat_project_create = "BASEPATH/mng/project/create?secret=SECRET";
	//post:数据平台-建筑-创建
	public final static String dataPlat_building_create = "BASEPATH/mng/building/create?secret=SECRET";

	/**** 数据平台--更新--请求路径 ***/
	//post:数据平台-对象-批量更新
	public final static String dataPlat_object_batch_update = "BASEPATH/object/batch_update?projectId=PROJECTID&secret=SECRET";

	/**    人员信息服务请求路径      ***/
	//post：Person_service  人员管理:根据Id查询人员详细信息
	public final static String persaon_service_query_person_by_personid = "BASEPATH/restPersonService/queryPersonById";
		
}
