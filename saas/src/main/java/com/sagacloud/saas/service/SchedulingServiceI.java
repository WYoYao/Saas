package com.sagacloud.saas.service;

import javax.servlet.http.HttpServletResponse;

import com.alibaba.fastjson.JSONObject;

public interface SchedulingServiceI {

	
	
	/**
	 * @desc 排班管理模块-排班表主页：上传排班excel文件
	 * @param project_id
	 * @param month
	 * @param inputStream
	 * @return
	 */
	public String uploadSchedulingFile(String project_id, String month, String fileKey);
	
	
	/**
	 * @desc 排班管理模块-排班表主页：查询目前排班计划
	 * @param jsonObject
	 * @return
	 */
	public String queryMonthSchedulingForWeb(JSONObject jsonObject);
	
	/**
	 * @desc 排班管理模块-排班表主页：查询目前排班计划(APP端)
	 * @param jsonObject
	 * @throws Exception
	 * @return
	 */
	public String queryMonthSchedulingForApp(JSONObject jsonObject) throws Exception;
	
	/**
	 * @desc 排班管理模块-排班表主页：添加排班信息
	 * @param jsonObject
	 * @throws Exception
	 * @return
	 */
	public String saveSchedulingPlan(JSONObject jsonObject) throws Exception;
	
	/**
	 * @desc  排班管理模块-排班表主页：下载排班上传模板
	 * @param response
	 * @param project_id
	 * @param month
	 * @param user_id
	 * @return
	 */
	public String downloadSchedulingTemplateFile(HttpServletResponse response,
			String project_id, String month, String user_id);
	
}
