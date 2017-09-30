package com.sagacloud.saasmanage.service;

import com.alibaba.fastjson.JSONObject;

public interface ComponentServiceI {

	/**
	 * @desc 查询所有组件关系信息
	 * @param jsonObject
	 * @return
	 */
	public String queryAllComponentRel(JSONObject jsonObject);
	
	
	/**
	 * @desc 分组查询组件列表，用于组件的列表选择
	 * @param jsonObject
	 * @return
	 */
	public String queryComponentGroupByType(JSONObject jsonObject);
	
	/**
	 * @desc 根据Id编辑组件对应信息
	 * @param jsonObject
	 * @throws Exception
	 * @return
	 */
	public String updateComponentRelById(JSONObject jsonObject) throws Exception ;
	/**
	 * @desc 查询所有组件
	 * @param jsonObject
	 * @return
	 */
	public String queryAllComponent(JSONObject jsonObject);
	
	
	/**
	 * @desc 添加组件信息
	 * @param jsonObject
	 * @return
	 * @throws Exception
	 */
	public String addComponent(JSONObject jsonObject) throws Exception;
	
	
}
