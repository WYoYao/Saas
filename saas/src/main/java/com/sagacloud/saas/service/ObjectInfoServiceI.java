package com.sagacloud.saas.service;

import java.util.Map;

import com.alibaba.fastjson.JSONObject;

public interface ObjectInfoServiceI {

	
	/**
	 * 功能描述：查询数据平台数据历史数据
	 * @param id
	 * @param infoPointCode
	 * @param project_id
	 * @param secret
	 * @return
	 * @throws Exception
	 */
	public String queryObjectInfoHis(String id, String infoPointCode, String project_id, String secret) throws Exception;

	/**
	 * 功能描述：判断数据平台数据是否存在
	 * @param objectParentId
	 * @param objectId
	 * @param objectParam
	 * @param objectValue
	 * @param type
	 * @param project_id
	 * @param secret
	 * @return
	 */
	public String verifyObjectInfo(String objectParentId, String objectId, String objectParam, 
			String objectValue, String type, String project_id, String secret) throws Exception;
	
	/**
	 * 功能描述：修改数据平台数据值
	 * @param id
	 * @param infoPointCode
	 * @param info_point_value
	 * @param valid_time
	 * @param project_id
	 * @param secret
	 * @return
	 * @throws Exception
	 */
	public String updateObjectInfo(String id, String infoPointCode, Object info_point_value, 
			String valid_time, String project_id, String secret) throws Exception;
	
	/**
	 * 功能描述：查询系统或者设备的动态信息
	 * @param objectType
	 * @param typeCode
	 * @param objectItem
	 * @return
	 * @throws Exception
	 */
	public Map<String, JSONObject> queryObjectDynamicInfo(String objectType, String typeCode, JSONObject objectItem) throws Exception;
	
	/**
	 * 功能描述：查询数据平台单个对象信息
	 * @param id
	 * @param project_id
	 * @param secret
	 * @return
	 * @throws Exception
	 */
	public JSONObject queryObject(String id, String project_id, String secret) throws Exception;
	
}
