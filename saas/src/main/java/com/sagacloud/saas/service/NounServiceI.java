package com.sagacloud.saas.service;

import com.alibaba.fastjson.JSONObject;

public interface NounServiceI {

	
	/**
	 * 功能描述： 名词管理-列表页:查询名词类型列表
	 * @param jsonObject
	 * @return
	 */
	public String queryNounTypeList(JSONObject jsonObject);
	
	/**
	 * 功能描述： 名词管理-列表页:查询名词列表
	 * @param jsonObject
	 * @return
	 */
	public String queryNounList(JSONObject jsonObject);
	
	/**
	 * 功能描述：名词管理-列表页:根据Id编辑名词信息
	 * @param jsonObject
	 * @return
	 */
	public String updateNounById(JSONObject jsonObject);
	
	/**
	 * 功能描述：名词管理-列表页:添加名词信息-后台使用
	 * @param jsonObject
	 * @return
	 */
	public String addNounByAdmin(JSONObject jsonObject);
	
	/**
	 * 功能描述：名词管理-列表页:删除名词信息-后台使用
	 * @param jsonObject
	 * @return
	 */
	public String deleteNounByAdmin(JSONObject jsonObject);
	
	/**
	 * 功能描述：名词管理-列表页:修改名词信息-后台使用
	 * @param jsonObject
	 * @return
	 */
	public String updateNounByAdmin(JSONObject jsonObject);
}
