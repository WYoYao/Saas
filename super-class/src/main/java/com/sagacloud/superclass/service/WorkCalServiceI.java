package com.sagacloud.superclass.service;

import com.alibaba.fastjson.JSONObject;

public interface WorkCalServiceI {

	/**
	 * 功能描述：工作历-查询未生效的排班
	 * @param jsonObject
	 * @return
	 */
	String queryInvalidSchedule(JSONObject jsonObject);
	
	/**
	 * 功能描述：工作历-查询指定人某月的工作日历
	 * @param jsonObject
	 * @return
	 */
	String queryMonthWorkCalByUserId(JSONObject jsonObject) throws Exception;
	
	/**
	 * 功能描述：工作历-查询某日的排班
	 * @param jsonObject
	 * @return
	 */
	String queryDayWorkCal(JSONObject jsonObject) throws Exception;
}
