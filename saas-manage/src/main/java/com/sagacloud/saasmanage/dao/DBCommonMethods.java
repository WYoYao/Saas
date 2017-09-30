package com.sagacloud.saasmanage.dao;

import com.sagacloud.json.JSONArray;
import com.sagacloud.json.JSONObject;
import com.sagacloud.json.JSONValue;
import com.sagacloud.saasmanage.common.DateUtil;
import com.sagacloud.saasmanage.common.ToolsUtil;

import org.apache.log4j.Logger;
import java.util.*;

public class DBCommonMethods {
	private static final Logger log = Logger.getLogger(DBCommonMethods.class);

	/**
	 * 
	 * 功能描述：插入记录
	 * @param tableName
	 * @param jsonStr
	 * @return 
	 * @创建者 wanghailong
	 * @邮箱 wanghailong@persagy.com 
	 * @修改描述
	 */
	public static String insertRecord(String tableName, String jsonStr) {
		return insertRecord(DBConst.DATABASE_NAME, tableName, jsonStr);
	}

	/**
	 * 
	 * 功能描述：插入记录，指定操作的数据库
	 * @param Database
	 * @param tableName
	 * @param jsonStr
	 * @return 
	 * @创建者 wanghailong
	 * @邮箱 wanghailong@persagy.com 
	 * @修改描述
	 */
	public static String insertRecord(String Database, String tableName, String jsonStr) {
		JSONObject dataJson = (JSONObject) JSONValue.parse(jsonStr);
		JSONObject insertObject = (JSONObject) dataJson.get("insertObject");
		insertObject = processInsertObj(insertObject);

		JSONObject bodyNode = (JSONObject) JSONValue.parse("{}");
		bodyNode.put("QueryType", "insert");
		bodyNode.put("Database", Database);
		bodyNode.put("Datatable", tableName);
		bodyNode.put("InsertObject", dataJson.get("insertObject"));
		log.info(bodyNode.toString());
		try {
			String result = DBAgent.GetAgent().Query(bodyNode).toString();
			log.info(result);
			return result;
		} catch (Exception e) {
			e.printStackTrace();
			log.error("请求异常：",e);
			return ToolsUtil.errorJsonMsg(Arrays.toString(e.getStackTrace()));
		}
	}
	/**
	 * 
	 * 功能描述：插入一批记录，指定操作的数据库
	 * @param tableName
	 * @param jsonStr
	 * @return 
	 * @创建者 wanghailong
	 * @邮箱 wanghailong@persagy.com 
	 * @修改描述
	 */
	public static String insertBatchRecord(String tableName, String jsonStr) {
		return insertBatchRecord(DBConst.DATABASE_NAME, tableName, jsonStr);
	}
	/**
	 * 
	 * 功能描述：插入一批记录，指定操作的数据库
	 * @param Database
	 * @param tableName
	 * @param jsonStr
	 * @return 
	 * @创建者 wanghailong
	 * @邮箱 wanghailong@persagy.com 
	 * @修改描述
	 */
	public static String insertBatchRecord(String Database, String tableName, String jsonStr) {
		JSONObject dataJson = (JSONObject) JSONValue.parse(jsonStr);
		JSONArray insertObjects = (JSONArray) dataJson.get("insertObjects");
		JSONObject bodyNode = (JSONObject) JSONValue.parse("{}");
		bodyNode.put("QueryType", "batch_insert");
		bodyNode.put("Database", Database);
		bodyNode.put("Datatable", tableName);
		bodyNode.put("InsertObjects", insertObjects);
		log.info(bodyNode.toString());
		try {
			String result = DBAgent.GetAgent().Query(bodyNode).toString();
			log.info(result);
			return result;
		} catch (Exception e) {
			e.printStackTrace();
			log.error("请求异常：",e);
			return ToolsUtil.errorJsonMsg(Arrays.toString(e.getStackTrace()));
		}
	}
	
	/**
	 * 
	 * 功能描述：修改记录
	 * @param tableName
	 * @param jsonStr
	 * @return 
	 * @创建者 wanghailong
	 * @邮箱 wanghailong@persagy.com 
	 * @修改描述
	 */
	public static String updateRecord(String tableName, String jsonStr) {
		return updateRecord(DBConst.DATABASE_NAME, tableName, jsonStr);
	}

	/**
	 * 
	 * 功能描述：修改记录
	 * @param Database
	 * @param tableName
	 * @param jsonStr
	 * @return 
	 * @创建者 wanghailong
	 * @邮箱 wanghailong@persagy.com 
	 * @修改描述
	 */
	public static String updateRecord(String Database, String tableName, String jsonStr) {
		JSONObject dataJson = (JSONObject) JSONValue.parse(jsonStr);
		JSONObject bodyNode = (JSONObject) JSONValue.parse("{}");
		JSONObject set = (JSONObject) dataJson.get("set");
		// 添加更新时间
		if(!set.containsKey(DBConst.TABLE_FIELD_UPDATE_TIME)) {
			set.put(DBConst.TABLE_FIELD_UPDATE_TIME, DateUtil.getNowTimeStr());
		}
		if(set.containsKey(DBConst.TABLE_FIELD_CTEATE_TIME)){
			set.remove(DBConst.TABLE_FIELD_CTEATE_TIME);
		}
		bodyNode.put("QueryType", "update");
		bodyNode.put("Database", Database);
		bodyNode.put("Datatable", tableName);
		bodyNode.put("Criteria", dataJson.get("criteria"));
		bodyNode.put("Set", set);
		log.info(bodyNode.toString());
		try {
			String result = DBAgent.GetAgent().Query(bodyNode).toString();
			log.info(result);
			return result;
		} catch (Exception e) {
			e.printStackTrace();
			log.error("请求异常：",e);
			return ToolsUtil.errorJsonMsg(Arrays.toString(e.getStackTrace()));
		}
	}

	/**
	 * 
	 * 功能描述：删除数据
	 * @param tableName
	 * @param jsonStr
	 * @return 
	 * @创建者 wanghailong
	 * @邮箱 wanghailong@persagy.com 
	 * @修改描述
	 */
	public static String deleteRecord(String tableName, String jsonStr) {
		return deleteRecord(DBConst.DATABASE_NAME, tableName, jsonStr);
	}

	/**
	 * 
	 * 功能描述：删除数据
	 * @param Database
	 * @param tableName
	 * @param jsonStr
	 * @return 
	 * @创建者 wanghailong
	 * @邮箱 wanghailong@persagy.com 
	 * @修改描述
	 */
	public static String deleteRecord(String Database, String tableName, String jsonStr) {
		JSONObject dataJson = (JSONObject) JSONValue.parse(jsonStr);
		JSONObject setNode = (JSONObject) JSONValue.parse("{}");
		setNode.put(DBConst.TABLE_FIELD_VALID, false);
		setNode.put(DBConst.TABLE_FIELD_UPDATE_TIME, DateUtil.getNowTimeStr());

		JSONObject bodyNode = (JSONObject) JSONValue.parse("{}");
		bodyNode.put("QueryType", "update");
		bodyNode.put("Database", Database);
		bodyNode.put("Datatable", tableName);
		bodyNode.put("Criteria", dataJson.get("criteria"));
		bodyNode.put("Set", setNode);
		log.info(bodyNode.toString());
		try {
			String result = DBAgent.GetAgent().Query(bodyNode).toString();
			log.info(result);
			return result;
		} catch (Exception e) {
			e.printStackTrace();
			log.error("请求异常：",e);
			return ToolsUtil.errorJsonMsg(Arrays.toString(e.getStackTrace()));
		}
	}
	
	/**
	 * 功能描述：批量查询符合条件的数据，并合并，包括无效数据
	 * @param tableName
	 * @param jsonStr
	 * @return
	 */
	public static String queryBathchMergeRecordByCriterias(String tableName, String jsonStr){
		return queryBathchMergeRecordByCriterias(DBConst.DATABASE_NAME, tableName, jsonStr);
	}

	/**
	 * 功能描述：批量查询符合条件的数据，并合并，包括无效数据
	 * @param dataBase
	 * @param tableName
	 * @param jsonStr
	 * @return
	 */
	public static String queryBathchMergeRecordByCriterias(String dataBase, String tableName, String jsonStr){
		JSONObject dataJson = (JSONObject) JSONValue.parse(jsonStr);
		JSONObject bodyNode = (JSONObject) JSONValue.parse("{}");
		bodyNode.put("QueryType", "batch_select_merge");
		bodyNode.put("Database", dataBase);
		bodyNode.put("Datatable", tableName);
		bodyNode.put("Criterias", dataJson.get("criterias"));
		log.info(bodyNode.toString());
		try {
			String result = DBAgent.GetAgent().Query(bodyNode).toString();
			log.info(result);
			return result;
		} catch (Exception e) {
			e.printStackTrace();
			log.error("请求异常：",e);
			return ToolsUtil.errorJsonMsg(Arrays.toString(e.getStackTrace()));
		}
	}
	
	/**
	 * 
	 * 功能描述：根据主键查询一条记录数据
	 * @param tableName
	 * @param jsonStr
	 * @return 
	 * @创建者 wanghailong
	 * @邮箱 wanghailong@persagy.com 
	 * @修改描述
	 */
	public static String getRecordBykey(String tableName, String jsonStr) {
		return getRecordBykey(DBConst.DATABASE_NAME, tableName, jsonStr);
	}
	/**
	 * 
	 * 功能描述：根据主键查询一条记录数据
	 * @param Database
	 * @param tableName
	 * @param jsonStr
	 * @return 
	 * @创建者 wanghailong
	 * @邮箱 wanghailong@persagy.com 
	 * @修改描述
	 */
	public static String getRecordBykey(String Database, String tableName, String jsonStr) {
		JSONObject dataJson = (JSONObject) JSONValue.parse(jsonStr);
		JSONObject bodyNode = (JSONObject) JSONValue.parse("{}");
		bodyNode.put("QueryType", "get");
		bodyNode.put("Database", Database);
		bodyNode.put("Datatable", tableName);
		bodyNode.put("Key", dataJson.get("Key"));
		log.info(bodyNode.toString());
		try {
			String result = DBAgent.GetAgent().Query(bodyNode).toString();
			log.info(result);
			return result;
		} catch (Exception e) {
			e.printStackTrace();
			log.error("请求异常：",e);
			return ToolsUtil.errorJsonMsg(Arrays.toString(e.getStackTrace()));
		}
	}
	/**
	 * 
	 * 功能描述：根据主键查询多条记录数据
	 * @param tableName
	 * @param jsonStr
	 * @return 
	 * @创建者 wanghailong
	 * @邮箱 wanghailong@persagy.com 
	 * @修改描述
	 */
	public static String getBatchRecordBykeys1(String tableName, String jsonStr) {
		return getBatchRecordBykeys(DBConst.DATABASE_NAME, tableName, jsonStr);
	}
	/**
	 * 
	 * 功能描述：根据主键查询多条记录数据
	 * @param Database
	 * @param tableName
	 * @param jsonStr
	 * @return 
	 * @创建者 wanghailong
	 * @邮箱 wanghailong@persagy.com 
	 * @修改描述
	 */
	public static String getBatchRecordBykeys(String Database, String tableName, String jsonStr) {
		JSONObject dataJson = (JSONObject) JSONValue.parse(jsonStr);
		JSONObject bodyNode = (JSONObject) JSONValue.parse("{}");
		bodyNode.put("QueryType", "batch_get");
		bodyNode.put("Database", Database);
		bodyNode.put("Datatable", tableName);
		bodyNode.put("Keys", dataJson.get("keys"));
		log.info(bodyNode.toString());
		try {
			String result = DBAgent.GetAgent().Query(bodyNode).toString();
			log.info(result);
			return result;
		} catch (Exception e) {
			e.printStackTrace();
			log.error("请求异常：",e);
			return ToolsUtil.errorJsonMsg(Arrays.toString(e.getStackTrace()));
		}
	}
	/**
	 * 
	 * 功能描述：查询所有数据，包括无效数据
	 * @param tableName
	 * @return 
	 * @创建者 wanghailong
	 * @邮箱 wanghailong@persagy.com 
	 * @修改描述
	 */
	public static String queryAllRecord( String tableName) {
		String jsonStr = "{\"criteria\":{}}" ;
		return queryRecordByCriteria(DBConst.DATABASE_NAME, tableName, jsonStr);
	}

	/**
	 *
	 * 功能描述：查询所有数据，包括无效数据
	 * @param tableName
	 * @return
	 * @创建者 wanghailong
	 * @邮箱 wanghailong@persagy.com
	 * @修改描述
	 */
	public static String queryAllRecord(String dataSource, String tableName) {
		String jsonStr = "{\"criteria\":{}}" ;
		return queryRecordByCriteria(dataSource, tableName, jsonStr);
	}
	/**
	 * 
	 * 功能描述：查询所有有效数据
	 * @param tableName
	 * @return 
	 * @创建者 wanghailong
	 * @邮箱 wanghailong@persagy.com 
	 * @修改描述
	 */
	public static String queryAllValidRecord( String tableName) {
		String jsonStr = "{\"criteria\":{}}" ;
		return queryValidRecordByCriteria(DBConst.DATABASE_NAME, tableName, jsonStr);
	}
	/**
	 * 
	 * 功能描述：查询符合条件的数据，包括无效数据
	 * @param tableName
	 * @param jsonStr
	 * @return 
	 * @创建者 wanghailong
	 * @邮箱 wanghailong@persagy.com 
	 * @修改描述
	 */
	public static String queryRecordByCriteria( String tableName, String jsonStr) {
		return queryRecordByCriteria(DBConst.DATABASE_NAME, tableName, jsonStr);
	}
	
	/**
	 * 
	 * 功能描述：查询符合条件的数据，包括无效数据
	 * @param Database
	 * @param tableName
	 * @param jsonStr
	 * @return 
	 * @创建者 wanghailong
	 * @邮箱 wanghailong@persagy.com 
	 * @修改描述
	 */
	public static String queryRecordByCriteria(String Database, String tableName, String jsonStr) {
		JSONObject dataJson = (JSONObject) JSONValue.parse(jsonStr);
		JSONObject bodyNode = (JSONObject) JSONValue.parse("{}");
		bodyNode.put("QueryType", "select");
		bodyNode.put("Database", Database);
		bodyNode.put("Datatable", tableName);
		bodyNode.put("Criteria", dataJson.get("criteria"));
		log.info(bodyNode.toString());
		try {
			String result = DBAgent.GetAgent().Query(bodyNode).toString();
			log.info(result);
			return result;
		} catch (Exception e) {
			e.printStackTrace();
			log.error("请求异常：",e);
			return ToolsUtil.errorJsonMsg(Arrays.toString(e.getStackTrace()));
		}
	}
	/**
	 * 
	 * 功能描述：查询符合条件的有效数据
	 * @param tableName
	 * @param jsonStr
	 * @return 
	 * @创建者 wanghailong
	 * @邮箱 wanghailong@persagy.com 
	 * @修改描述
	 */
	public static String queryValidRecordByCriteria( String tableName, String jsonStr) {
		return queryValidRecordByCriteria(DBConst.DATABASE_NAME, tableName, jsonStr);
	}
	
	/**
	 * 
	 * 功能描述：查询符合条件的有效数据
	 * @param Database
	 * @param tableName
	 * @param jsonStr
	 * @return 
	 * @创建者 wanghailong
	 * @邮箱 wanghailong@persagy.com 
	 * @修改描述
	 */
	public static String queryValidRecordByCriteria(String Database, String tableName, String jsonStr) {
		JSONObject dataJson = (JSONObject) JSONValue.parse(jsonStr);
		JSONObject bodyNode = (JSONObject) JSONValue.parse("{}");
		bodyNode.put("QueryType", "select");
		bodyNode.put("Database", Database);
		bodyNode.put("Datatable", tableName);
		bodyNode.put("Criteria", dataJson.get("criteria"));
		log.info(bodyNode.toString());
		try {
			JSONObject resJson = DBAgent.GetAgent().Query(bodyNode);
			JSONArray arr = (JSONArray) resJson.get("Content");
			int removeCount = 0;
			for (int i = arr.size() - 1; i > -1; i--) {
				JSONObject node = (JSONObject) arr.get(i);
				if(node.get(DBConst.TABLE_FIELD_VALID) != null && !(Boolean) node.get(DBConst.TABLE_FIELD_VALID)){
					arr.remove(i);
					removeCount += 1;
				}
			}
			resJson.put("Count", (Long)resJson.get("Count")- removeCount);
			log.info(resJson.toString());
			return resJson.toString();
		} catch (Exception e) {
			e.printStackTrace();
			log.error("请求异常：",e);
			return ToolsUtil.errorJsonMsg(Arrays.toString(e.getStackTrace()));
		}
	}
	/**
	 * 
	 * 功能描述：处理新增数据
	 * @param node
	 * @return 
	 * @创建者 wanghailong
	 * @邮箱 wanghailong@persagy.com 
	 * @修改描述
	 */
	private static JSONObject processInsertObj(JSONObject node) {
		if(!node.containsKey(DBConst.TABLE_FIELD_CTEATE_TIME)){
			// 添加创建时间
			node.put(DBConst.TABLE_FIELD_CTEATE_TIME, DateUtil.getNowTimeStr());
		}
		if(!node.containsKey(DBConst.TABLE_FIELD_UPDATE_TIME)){
			// 添加更新时间
			node.put(DBConst.TABLE_FIELD_UPDATE_TIME, DateUtil.getNowTimeStr());
		}
		// 添加数据有效状态，true-有效，false-无效
		node.put(DBConst.TABLE_FIELD_VALID, true);
		return node;
	}
}
