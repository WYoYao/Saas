package com.sagacloud.saas.service;

import com.alibaba.fastjson.JSONObject;

public interface CardServiceI {

	/**
	 * 功能描述：设备名片页:查询项目下设备列表
	 * @param jsonObject
	 * @return
	 * @throws Exception
	 */
	public String queryEquipList(JSONObject jsonObject) throws Exception;
	
	/**
	 * 功能描述：设备名片页:查询项目下尚未下载设备列表
	 * @param jsonObject
	 * @return
	 * @throws Exception
	 */
	public String queryNotDownloadEquipList(JSONObject jsonObject) throws Exception;
	
	/**
	 * 功能描述：空间名片页:查询项目下空间列表
	 * @param jsonObject
	 * @return
	 * @throws Exception
	 */
	public String querySpaceList(JSONObject jsonObject) throws Exception;
	
	/**
	 * 功能描述：空间名片页:查询项目下尚未下载空间列表
	 * @param jsonObject
	 * @return
	 * @throws Exception
	 */
	public String queryNotDownloadSpaceList(JSONObject jsonObject) throws Exception;
	
	/**
	 * 功能描述：定制名片:查询设备选择项
	 * @param jsonObject
	 * @return
	 * @throws Exception
	 */
	public String queryEquipOptions(JSONObject jsonObject) throws Exception;
	
	/**
	 * 功能描述：定制名片:查询空间选择项
	 * @param jsonObject
	 * @return
	 * @throws Exception
	 */
	public String querySpaceOptions(JSONObject jsonObject) throws Exception;
	
	/**
	 * 功能描述：定制名片:保存名片样式
	 * @param jsonObject
	 * @return
	 * @throws Exception
	 */
	public String saveEquipCardStyle(JSONObject jsonObject) throws Exception;
	
	/**
	 * 功能描述：设备名片页:下载设备名片
	 * @param jsonObject
	 * @return
	 * @throws Exception
	 */
	public String downloadEquipCard(JSONObject jsonObject) throws Exception;
	
}
