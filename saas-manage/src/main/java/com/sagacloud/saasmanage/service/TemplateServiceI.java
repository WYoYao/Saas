package com.sagacloud.saasmanage.service;

import com.alibaba.fastjson.JSONObject;

public interface TemplateServiceI {

	/**
	 * @desc 查询对象类型树
	 * @param like
	 * @return
	 * @throws Exception
	 */
	public String queryObjectCategoryTree(String like) throws Exception ;
	
	
	/**
	 * @desc 查询对象类型信息
	 * @param jsonObject
	 * @return
	 * @throws Exception
	 */
	public String queryObjectCategory(JSONObject jsonObject) throws Exception;
	
	/**
	 * @desc 查询对象模板信息
	 * @param jsonObject
	 * @return
	 * @throws Exception
	 */
	public String queryObjectTemplate(JSONObject jsonObject) throws Exception;
	
	/**
	 * @desc 编辑信息点配置信息
	 * @param jsonObject
	 * @return
	 * @throws Exception
	 */
	public String updateInfoPointCmptById(JSONObject jsonObject) throws Exception;
	
}
