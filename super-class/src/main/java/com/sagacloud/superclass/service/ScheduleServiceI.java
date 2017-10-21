package com.sagacloud.superclass.service;

import java.text.ParseException;

import com.alibaba.fastjson.JSONObject;

public interface ScheduleServiceI {

	/**
	 * 功能描述：创建排班表-新增班次
	 * @param jsonObject
	 * @return
	 */
	String addShift(JSONObject jsonObject);
	
	/**
	 * 功能描述：创建排班表-查询班次详细信息
	 * @param jsonObject
	 * @return
	 */
	String queryShiftById(JSONObject jsonObject);
	
	/**
	 * 功能描述：创建排班表-查询上次排班中的班次列表
	 * @param jsonObject
	 * @return
	 */
	String queryLastShiftList(JSONObject jsonObject);
	
	/**
	 * 功能描述：创建排班表-新增特殊日
	 * @param jsonObject
	 * @throws ParseException
	 * @return
	 */
	String addSpecialDay(JSONObject jsonObject) throws ParseException;
	
	/**
	 * 功能描述：创建排班表-查询上次排班中的特殊日列表
	 * @param jsonObject
	 * @throws ParseException
	 * @return
	 */
	String queryLastSpecialDayList(JSONObject jsonObject) throws ParseException;
	
	/**
	 * 功能描述：创建排班表-新增排班配置
	 * @param jsonObject
	 * @throws ParseException
	 * @return
	 */
	String addSchedule(JSONObject jsonObject) throws ParseException;
	
	/**
	 * 功能描述：创建排班表-修改排班配置
	 * @param jsonObject
	 * @throws ParseException
	 * @return
	 */
	String updateSchedule(JSONObject jsonObject) throws ParseException;
	
	/**
	 * 功能描述：创建排班表-查询排班详细信息
	 * @param jsonObject
	 * @throws ParseException
	 * @return
	 */
	String queryScheduleById(JSONObject jsonObject) throws ParseException;
	
	/**
	 * 功能描述：创建排班表-生成日历
	 * @param jsonObject
	 * @throws ParseException
	 * @return
	 */
	String createWorkCalendar(JSONObject jsonObject) throws ParseException;
	
	/**
	 * 功能描述：创建排班表-修改休息日
	 * @param jsonObject
	 * @return
	 */
	String updateWorkCalendar(JSONObject jsonObject);
	
	/**
	 * 功能描述：创建排班表-开始排班
	 * @param jsonObject
	 * @return
	 */
	String startSchedule(JSONObject jsonObject);
	
	/**
	 * 功能描述：管理排班表-查询排班生成的日历-状态是2时
	 * @param jsonObject
	 * @return
	 */
	String queryWorkCalById(JSONObject jsonObject);
	
	/**
	 * 功能描述：管理排班表-查询排班生成的日历-状态是3时
	 * @param jsonObject
	 * @return
	 */
	String queryWorkCalList(JSONObject jsonObject);
	
	/**
	 * 功能描述：管理排班表-查询某日的班次列表
	 * @param jsonObject
	 * @throws Exception
	 * @return
	 */
	String queryDayShiftList(JSONObject jsonObject) throws Exception;
	
	/**
	 * 功能描述：管理排班表-保存某日的班次数据
	 * @param jsonObject
	 * @throws Exception
	 * @return
	 */
	String saveDayShiftList(JSONObject jsonObject) throws Exception;
	
	/**
	 * 功能描述：管理排班表-立即生效验证
	 * @param jsonObject
	 * @throws Exception
	 * @return
	 */
	String verifySchedule(JSONObject jsonObject) throws Exception;
	
	/**
	 * 功能描述：管理排班表-按人查看统计
	 * @param jsonObject
	 * @throws Exception
	 * @return
	 */
	String queryScheduleStatForUser(JSONObject jsonObject) throws Exception;
	
	/**
	 * 功能描述：管理排班表-按日查看统计
	 * @param jsonObject
	 * @throws Exception
	 * @return
	 */
	String queryScheduleStatForDay(JSONObject jsonObject) throws Exception;
	
	/**
	 * 功能描述：管理排班表-立即生效
	 * @param jsonObject
	 * @throws Exception
	 * @return
	 */
	String effectSchedule(JSONObject jsonObject) throws Exception;
	
	/**
	 * 功能描述：创建排班表-查询上次排班配置
	 * @param jsonObject
	 * @throws Exception
	 * @return
	 */
	String queryLastSchedule(JSONObject jsonObject) throws Exception;
}
