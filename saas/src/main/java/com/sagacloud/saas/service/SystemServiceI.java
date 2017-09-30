package com.sagacloud.saas.service;

import com.alibaba.fastjson.JSONObject;

public interface SystemServiceI {

	/**
	 * 功能描述：系统管理-详细页:查询系统通用信息
	 * @param jsonObject
	 * @return
	 */
	public String querySystemPublicInfo(JSONObject jsonObject) throws Exception;
	
	/**
	 * 功能描述：系统管理-详细页/新增页:查询系统动态信息
	 * @param jsonObject
	 * @throws Exception
	 * @return
	 */
	public String querySystemDynamicInfo(JSONObject jsonObject) throws Exception;
	
	/**
	 * 功能描述：系统管理-详细页:查询系统信息点的历史信息
	 * @param jsonObject
	 * @throws Exception
	 * @return
	 */
	public String querySystemInfoPointHis(JSONObject jsonObject) throws Exception;
	
	/**
	 * 功能描述：系统管理-新增页/编辑页:验证系统名称是否可以使用
	 * @param jsonObject
	 * @throws Exception
	 * @return
	 */
	public String verifySystemName(JSONObject jsonObject) throws Exception;
	
	/**
	 * 功能描述：系统管理-新增页/编辑页:验证系统编码是否可以使用
	 * @param jsonObject
	 * @throws Exception
	 * @return
	 */
	public String verifySystemLocalId(JSONObject jsonObject) throws Exception;
	
	/**
	 * 功能描述：系统管理-新增页/编辑页:验证系统BIM编码是否可以使用
	 * @param jsonObject
	 * @throws Exception
	 * @return
	 */
	public String verifySystemBimId(JSONObject jsonObject) throws Exception;
	
	/**
	 * 功能描述：系统管理-新增页:添加系统信息
	 * @param jsonObject
	 * @throws Exception
	 * @return
	 */
	public String addSystem(JSONObject jsonObject) throws Exception;
	
	/**
	 * 功能描述：系统管理-新增页:查询系统动态信息
	 * @param jsonObject
	 * @throws Exception
	 * @return
	 */
	public String querySystemDynamicInfoForAdd(JSONObject jsonObject) throws Exception;
	
	/**
	 * 功能描述：系统管理-首页:查询建筑-系统列表树
	 * @param jsonObject
	 * @throws Exception
	 * @return
	 */
	public String queryBuildSystemTree(JSONObject jsonObject) throws Exception;
	
	/**
	 * 功能描述：系统管理-详细页:编辑系统信息
	 * @param jsonObject
	 * @throws Exception
	 * @return
	 */
	public String updateSystemInfo(JSONObject jsonObject) throws Exception;
}
