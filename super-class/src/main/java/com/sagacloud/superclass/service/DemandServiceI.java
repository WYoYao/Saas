package com.sagacloud.superclass.service;

import com.alibaba.fastjson.JSONObject;

public interface DemandServiceI {

	
	/**
	 * 功能描述：提要求-查询工作日历列表
	 * @param jsonObject
	 * @return
	 */
	public String queryWorkCalList(JSONObject jsonObject);
	
	/**
	 * 功能描述：提要求-查询提醒信息
	 * @param jsonObject
	 * @return
	 */
	public String queryRemindByScheduleId(JSONObject jsonObject);
	
	/**
	 * 功能描述：提要求-查询某日的班次列表
	 * @param jsonObject
	 * @throws Exception
	 * @return
	 */
	public String queryDayShiftList(JSONObject jsonObject) throws Exception;
	
	/**
	 * 功能描述：提要求-加入某个班次
	 * @param jsonObject
	 * @throws Exception
	 * @return
	 */
	public String joinShif(JSONObject jsonObject) throws Exception;
	
	/**
	 * 功能描述：提要求-取消某个班次
	 * @param jsonObject
	 * @throws Exception
	 * @return
	 */
	public String cancelShif(JSONObject jsonObject) throws Exception;
}
