package com.sagacloud.saas.service;

import com.alibaba.fastjson.JSONObject;

public interface GeneralDictServiceI {

	
	/**
	 * @desc 人员信息-新增页:数据字典-专业
	 * @param jsonObject
	 * @return
	 */
	public String queryGeneralDictByKey(JSONObject jsonObject);
	
	/**
	 * 查询当前用户能使用的工单类型
	 * @param jsonStr
	 * @return
	 * @throws Exception
	 */
	public String queryWorkOrderType(String jsonStr) throws Exception;
	
	
	/**
	 * 功能描述：获取数据字典名称 优先使用本地名称
	 * @param jsonObject
	 * @return
	 */
	public String querydictName(JSONObject jsonObject);
	
}
