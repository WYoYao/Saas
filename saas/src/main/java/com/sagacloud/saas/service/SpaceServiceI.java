package com.sagacloud.saas.service;

import com.alibaba.fastjson.JSONObject;

public interface SpaceServiceI {

	/**
	 * 功能描述：空间管理-首页:查询某建筑下空间信息
	 * @param jsonObject
	 * @return
	 */
	public String querySpaceWithGroup(JSONObject jsonObject) throws Exception;
	
	/**
	 * 功能描述：空间管理-首页:查询某楼层下空间信息
	 * @param jsonObject
	 * @return
	 */
	public String querySpaceForFloor(JSONObject jsonObject) throws Exception;
	
	/**
	 * 功能描述：空间管理-首页:查询某建筑下已拆除的空间信息
	 * @param jsonObject
	 * @return
	 */
	public String queryDestroyedSpace(JSONObject jsonObject) throws Exception;
	
	/**
	 * 功能描述：空间管理-首页:保存空间提醒设置
	 * @param jsonObject
	 * @return
	 */
	public String saveSpaceRemindConfig(JSONObject jsonObject) throws Exception;
	
	/**
	 * 功能描述：空间管理-首页:查询空间提醒设置
	 * @param jsonObject
	 * @return
	 */
	public String querySpaceRemindConfig(JSONObject jsonObject) throws Exception;
	
	/**
	 * 功能描述：空间管理-新增页:验证空间名称是否可以使用
	 * @param jsonObject
	 * @return
	 */
	public String verifySpaceName(JSONObject jsonObject) throws Exception;
	
	/**
	 * 功能描述：空间管理-新增页/编辑页:验证空间编码是否可以使用
	 * @param jsonObject
	 * @return
	 */
	public String verifySpaceLocalId(JSONObject jsonObject) throws Exception;
	
	/**
	 * 功能描述：空间管理-新增页/编辑页:验证空间BIM模型中编码是否可以使用
	 * @param jsonObject
	 * @return
	 */
	public String verifySpaceBimId(JSONObject jsonObject) throws Exception;
	
	/**
	 * 功能描述：空间管理-新增页:添加空间信息
	 * @param jsonObject
	 * @return
	 */
	public String addSpace(JSONObject jsonObject) throws Exception;
	
	/**
	 * 功能描述：空间管理-详细页:根据id查询空间详细信息
	 * @param jsonObject
	 * @return
	 */
	public String querySpaceById(JSONObject jsonObject) throws Exception;
	
	/**
	 * 功能描述：空间管理-详细页:拆除空间
	 * @param jsonObject
	 * @return
	 */
	public String destroySpace(JSONObject jsonObject) throws Exception;
	
	/**
	 * 功能描述：空间管理-详细页:编辑空间信息
	 * @param jsonObject
	 * @return
	 */
	public String updateSpaceInfo(JSONObject jsonObject) throws Exception;
	
	/**
	 * 功能描述：空间管理-详细页:查询空间信息点的历史信息
	 * @param jsonObject
	 * @return
	 */
	public String querySpaceInfoPointHis(JSONObject jsonObject) throws Exception;
	
	
	/**
	 * 功能描述：空间管理-详细页:验证空间是否可以拆除
	 * @param jsonObject
	 * @return
	 */
	public String verifyDestroySpace(JSONObject jsonObject) throws Exception;
	
	
	
}
