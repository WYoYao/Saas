package com.sagacloud.saas.service;

import com.alibaba.fastjson.JSONObject;

public interface CustomerServiceI {

	/**
	 * @desc 账户管理-根据Id查询客户基本信息
	 * @param jsonObject
	 * @return
	 */
	public String queryCustomerById(JSONObject jsonObject);
	
	/**
	 * @desc 账户管理-修改密码:验证原密码是否正确
	 * @param jsonObject
	 * @throws Exception
	 * @return
	 */
	public String verifyCustomerPasswd(JSONObject jsonObject) throws Exception ;
	
	/**
	 * @desc 账户管理-修改密码:保存密码
	 * @param jsonObject
	 * @throws Exception
	 * @return
	 */
	public String updateCustomerPasswd(JSONObject jsonObject) throws Exception ;
	
	/**
	 * @desc 项目信息-查询项目详细信息
	 * @param jsonObject
	 * @throws Exception
	 * @return
	 */
	public String queryProjectInfo(JSONObject jsonObject) throws Exception ;
	
	/**
	 * @desc 项目信息-查询项目信息点的历史信息
	 * @param jsonObject
	 * @throws Exception
	 * @return
	 */
	public String queryProjectInfoPointHis(JSONObject jsonObject) throws Exception ;
	
	/**
	 * @desc 项目信息-编辑提交信息点信息
	 * @param jsonObject
	 * @throws Exception
	 * @return
	 */
	public String updateProjectInfo(JSONObject jsonObject) throws Exception ;
	
	/**
	 * @desc 建筑体-查询项目下建筑列表
	 * @param jsonObject
	 * @throws Exception
	 * @return
	 */
	public String queryBuildList(JSONObject jsonObject) throws Exception ;
	
	/**
	 * @desc 建筑体-查询建筑详细信息
	 * @param jsonObject
	 * @throws Exception
	 * @return
	 */
	public String queryBuildInfo(JSONObject jsonObject) throws Exception ;
	
	/**
	 * @desc 建筑体-编辑提交信息点信息
	 * @param jsonObject
	 * @throws Exception
	 * @return
	 */
	public String updateBuildInfo(JSONObject jsonObject) throws Exception ;
	
	/**
	 * @desc 建筑体-查询建筑信息点的历史信息
	 * @param jsonObject
	 * @throws Exception
	 * @return
	 */
	public String queryBuildInfoPointHis(JSONObject jsonObject) throws Exception ;
}
