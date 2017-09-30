package com.sagacloud.saasmanage.service;

import com.alibaba.fastjson.JSONObject;

public interface OperateModuleServiceI {

	/**
	 * @desc 查询所有操作模块信息
	 * @return
	 */
	public String queryAllOperateModule();
	
	
	/**
	 * @desc 添加模块信息
	 * @param jsonObject
	 * @return
	 * @throws Exception
	 */
	public String addOperateModule(JSONObject jsonObject) throws Exception ;
	
	/**
	 * @desc 根据Id查询模块详细信息 
	 * @param jsonObject
	 * @throws Exception
	 * @return
	 */
	public String queryOperateModuleById(JSONObject jsonObject)  throws Exception;
	
	/**
	 * @desc 操作模块管理-编辑页:根据Id编模块信息
	 * @param jsonObject
	 * @return
	 * @throws Exception
	 */
	public String updateOperateModuleById(JSONObject jsonObject) throws Exception;
	
	/**
	 * @desc 工单配置-新增页:验证操作模块编码是否重复
	 * @param jsonObject
	 * @return
	 * @throws Exception
	 */
	public String verifyModuleCode(JSONObject jsonObject) throws Exception;
	
}
