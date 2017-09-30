package com.sagacloud.saasmanage.service;

import com.alibaba.fastjson.JSONObject;

public interface FuncPackServiceI {

	/**
	 * @desc 查询所有权限项信息
	 * @param jsonObject
	 * @return
	 */
	public String queryAllFuncPack(JSONObject jsonObject);
	
	
	
	
	/**
	 * @desc 查询功能节点树
	 * @param jsonObject
	 * @return
	 */
	public String queryFuncPointTree(JSONObject jsonObject);
	
	
	
	
	/**
	 * @desc 添加权限项信息
	 * @param jsonObject
	 * @return
	 * @throws Exception
	 */
	public String addFuncPack(JSONObject jsonObject) throws Exception;
	
	/**
	 * @desc 根据Id查询权限项详细信息
	 * @param jsonObject
	 * @return
	 */
	public String queryFuncPackById(JSONObject jsonObject) throws Exception;
	
	/**
	 * @desc 根据Id编权限项信息
	 * @param jsonObject
	 * @return
	 * @throws Exception
	 */
	public String updateFuncPackById(JSONObject jsonObject) throws Exception;
}
