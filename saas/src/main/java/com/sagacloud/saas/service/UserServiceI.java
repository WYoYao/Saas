package com.sagacloud.saas.service;

import com.alibaba.fastjson.JSONObject;

public interface UserServiceI {

	/**
	 * @desc 企业用户登录
	 * @param jsonObject
	 * @throws Exception
	 * @return
	 */
	public String companyLogin(JSONObject jsonObject) throws Exception;
	/**
	 * @desc 用户退出登录
	 * @param user_id
	 * @return
	 */
	public String logout(String user_id);
	
	/**
	 * @desc 企业用户登录
	 * @param jsonObject
	 * @throws Exception
	 * @return
	 */
	public String smsSendCode(JSONObject jsonObject) throws Exception;
	/**
	 * @desc 个人登录
	 * @param jsonObject
	 * @throws Exception
	 * @return
	 */
	public String personLogin(JSONObject jsonObject) throws Exception;
	/**
	 * @desc 切换项目-记录用户最后一次所在的项目
	 * @param jsonObject
	 * @throws Exception
	 * @return
	 */
	public String savePersonUseProject(JSONObject jsonObject) throws Exception;
	/**
	 * @desc 保存用户使用的工单输入方式
	 * @param jsonObject
	 * @throws Exception
	 * @return
	 */
	public String saveUserWoInputMode(JSONObject jsonObject) throws Exception;
	/**
	 * @desc 个人登录-根据Id编辑人员信息
	 * @param jsonObject
	 * @throws Exception
	 * @return
	 */
	public String updatePersonById(JSONObject jsonObject) throws Exception;
	
}
