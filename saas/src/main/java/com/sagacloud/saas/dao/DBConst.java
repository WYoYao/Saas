package com.sagacloud.saas.dao;

/**
 * 
 * 功能描述： 数据库操作常量
 * @类型名称 DBConst
 * @创建者 wanghailong
 * @邮箱 wanghailong@persagy.com  
 * @修改描述
 */
public class DBConst {
	public final static String DATABASE_NAME = "saas";
	
	public final static String DATABASE_PERSON_SERVICE = "person_service";

	public final static String DATABASE_WORLD_NAME = "physical_world";
	
	public final static String DATABASE_WORK_ORDER = "work_order";

	/****** 表名   ******/
	//saas平台-信息点组件表
	public final static String TABLE_INFO_COMPONENT = "info_component";
	//人员表
	public final static String TABLE_PERSON= "person";
	//临时对象表
	public final static String TABLE_TEMP_OBJECT = "temp_object";
	//项目人员表
	public final static String TABLE_PROJECT_PERSON= "project_person";
	//排班表
	public final static String TABLE_SCHEDULING= "scheduling";
	//排班配置表
	public final static String TABLE_SCHEDULING_CONFIG= "scheduling_config";
	//排班展示表
	public final static String TABLE_SCHEDULING_SHOW= "scheduling_show";
	//客户信息表
	public final static String TABLE_CUSTOMER = "customer";
	//用户习惯表
	public final static String TABLE_USER_CUSTOM = "user_custom";
	//数据平台-项目表
	public final static String TABLE_PROJECT = "projects";
	//建筑表
	public final static String TABLE_BUILDING = "building";
	//角色表
	public final static String TABLE_ROLE = "role";
	//操作模块表
	public final static String TABLE_OPERATE_MODULE = "operate_module";
	//功能包表
	public final static String TABLE_FUNCTION_PACK = "function_pack";
	//通用数据字典表
	public final static String TABLE_GENERAL_DICTIONARY = "general_dictionary";
	//对象工单提醒配置表
	public final static String TABLE_OBJ_WO_REMIND_CONFIG = "obj_wo_remind_config";
	//对象工单关系表
	public final static String TABLE_OBJ_WO_REL = "obj_wo_rel";
	//日志表
	public final static String TABLE_OPERATE_LOG = "operate_log";
	//用户登录日志表
	public final static String TABLE_USER_LOGIN_LOG = "user_login_log";
	//工单-流转方案表
	public final static String TABLE_WO_FLOW_PLAN = "wo_flow_plan";
	//工单-设备通讯录表
	public final static String TABLE_EQUIP_COMPANY_BOOK = "equip_company_book";
	//工单-设备公司关系表
	public final static String TABLE_COMPANY_EQUIP_REL = "company_equip_rel";
	//saas平台-组件关系表
	public final static String TABLE_COMPONENT_RELATION = "component_relation";
	//saas平台-组件关系表
	public final static String TABLE_OBJ_APPEND = "obj_append";
	//工单计划对象关系表
	public final static String TABLE_WO_PLAN_OBJ_RELATION = "wo_plan_obj_rel";
	//对象名片样式表
	public final static String TABLE_OBJ_CARD_STYLE = "obj_card_style";
	/****** 表字段-通用  ******/
	//创建时间，格式yyyyMMddHHmmss
	public final static String TABLE_FIELD_CTEATE_TIME = "create_time";
	//更新时间，格式yyyyMMddHHmmss
	public final static String TABLE_FIELD_UPDATE_TIME = "update_time";
		
	//数据有效状态，true-有效，false-无效
	public final static String TABLE_FIELD_VALID = "valid";
	
	/****** 表字段-id开头  ******/
	public final static String TABLE_LOG_ID_TAG = "RZ";
	public final static String TABLE_ROLE_ID_TAG = "JS";
	//
	public final static String TABLE_CUSTOMER_ID_TAG = "KH";
	//
	public final static String TABLE_BUILDING_ID_TAG = "JZ";
	
	public final static String TABLE_OPERATE_MODULE_ID_TAG = "MK";
	
	public final static String TABLE_FUNCTION_PACK_ID_TAG = "GNB";
	
	public final static String TABLE_SCHEDULING_ID_TAG = "PB";
	
	public final static String TABLE_SCHEDULING_CONFIG_ID_TAG = "PBPZ";
	public final static String TABLE_EQUIP_COMPANY_BOOK_ID_TAG = "TXL";
	
	public static class Result {
		public final static String RESULT = "Result";
		public final static String CONTENT = "Content";
		public final static String COUNT = "Count";
		public final static String SUCCESS = "success";
		public final static String FAILURE = "failure";
		public final static String RESULTMSG = "ResultMsg";
	}
	
	public static class Query {
		public final static String QUERYTYPE = "QueryType";
		public final static String DATABASE = "Database";
		public final static String DATATABLE = "Datatable";
		public final static String DEFINITION = "Definition";
		public final static String NAME = "Name";
		public final static String NAMES = "Names";
		public final static String COLUMNS = "Columns";
		public final static String INDEXS = "Indexs";
		public final static String INDEX = "Index";
		public final static String INSERTOBJECT = "InsertObject";
		public final static String INSERTOBJECTS = "InsertObjects";
		public final static String KEY = "Key";
		public final static String KEYS = "Keys";
		public final static String CRITERIA = "Criteria";
		public final static String CRITERIAS = "criterias";
		public final static String SET = "Set";
	}
	
	public static class Limit {
		public final static String LIMIT = "Limit";
		public final static String SKIP = "Skip";
	}
	
	public static class QueryType {
		public final static String DATABASE_LIST = "database_list";
		public final static String TABLE_LIST = "table_list";
		public final static String TABLE_DETAIL = "table_detail";
		public final static String TABLE_CREATE = "table_create";
		public final static String TABLE_DROP = "table_drop";
		public final static String INDEX_CREATE = "index_create";
		public final static String INDEXS_CREATE = "indexs_create";
		public final static String INDEX_DROP = "index_drop";
		public final static String INDEXS_DROP = "indexs_drop";
		public final static String TABLE_COUNT = "table_count";
		public final static String INSERT = "insert";
		public final static String BATCH_INSERT = "batch_insert";
		public final static String GET = "get";
		public final static String BATCH_GET = "batch_get";
		public final static String REMOVE = "remove";
		public final static String BATCH_REMOVE = "batch_remove";
		public final static String SELECT_COUNT = "select_count";
		public final static String DELETE = "delete";
		public final static String UPDATE = "update";
	}
	
}
