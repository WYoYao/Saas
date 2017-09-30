package com.sagacloud.saas.service;

import com.alibaba.fastjson.JSONObject;

public interface SchedulingConfigServiceI {

	
	/**
	 * @desc 排班管理模块-排班类型设置页面：查询排班类型
	 * @param jsonObject
	 * @return
	 */
	public String querySchedulingConfig(JSONObject jsonObject);
	
	/**
	 * @desc 排班管理模块-排班类型设置页面：添加排班类型
	 * @param jsonObject
	 * @throws Exception
	 * @return
	 */
	public String saveSchedulingConfig(JSONObject jsonObject) throws Exception;
	
	/**
	 * @desc 排班管理模块-排班类型设置页面：修改排班类型
	 * @param jsonObject
	 * @throws Exception
	 * @return
	 */
	public String updateSchedulingConfig(JSONObject jsonObject) throws Exception;
	
	/**
	 * @desc 排班管理模块-排班类型设置页面：删除排班类型
	 * @param jsonObject
	 * @throws Exception
	 * @return
	 */
	public String deleteSchedulingConfig(JSONObject jsonObject) throws Exception;
	
	/**
	 * @desc 排班管理模块-排班类型设置页面：保存排班类型
	 * @param jsonObject
	 * @throws Exception
	 * @return
	 */
	public String saveOrUpdateSchedulingConfig(JSONObject jsonObject) throws Exception;
}
