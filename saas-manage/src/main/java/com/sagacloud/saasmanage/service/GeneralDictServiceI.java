package com.sagacloud.saasmanage.service;

import com.alibaba.fastjson.JSONObject;

public interface GeneralDictServiceI {

	
	/**
	 * @desc 数据字典:字典类型
	 * @param jsonObject
	 * @return
	 */
	public String queryGeneralDictByKey(JSONObject jsonObject) throws Exception;

	
	/**
	 * @desc 数据字典:字典类型(后台内部使用)
	 * @param jsonObject
	 * @return
	 */
	public String queryGeneralDictByDictType(JSONObject jsonObject);
	
	
	/**
	 * @desc 数据字典:添加字典类型
	 * @param jsonObject
	 * @return
	 */
	public String addGeneralDict(JSONObject jsonObject);
}
