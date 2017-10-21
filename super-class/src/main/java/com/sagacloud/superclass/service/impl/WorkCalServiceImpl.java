package com.sagacloud.superclass.service.impl;

import java.text.ParseException;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.sagacloud.superclass.common.DateUtil;
import com.sagacloud.superclass.common.JsonUtil;
import com.sagacloud.superclass.common.StringUtil;
import com.sagacloud.superclass.dao.ScheduleMapper;
import com.sagacloud.superclass.dao.Work_calendar_userMapper;
import com.sagacloud.superclass.pojo.Schedule;
import com.sagacloud.superclass.pojo.TeamShift;
import com.sagacloud.superclass.pojo.Work_calendar_user;
import com.sagacloud.superclass.service.TeamShiftServiceI;
import com.sagacloud.superclass.service.UserServiceI;
import com.sagacloud.superclass.service.WorkCalServiceI;

/**
 * 功能描述：工作历
 * @author gezhanbin
 *
 */
@Service("WorkCalService")
public class WorkCalServiceImpl implements WorkCalServiceI {


	@Autowired
	private ScheduleMapper scheduleMapper;
	
	@Autowired
	private Work_calendar_userMapper work_calendar_userMapper;
	
	@Autowired
	private TeamShiftServiceI teamShiftService;

	@Autowired
	private UserServiceI userService;
	
	@Override
	public String queryInvalidSchedule(JSONObject jsonObject) {
		String userId = jsonObject.getString("userId");
		String teamId = jsonObject.getString("teamId");
		//查询该团队中以前创建的未生效的排班
		List<Schedule> scheduleIdList = scheduleMapper.selectUnEffectiveByTeamId(teamId);
		JSONArray contents = new JSONArray();
		if(scheduleIdList != null) {
			for(Schedule schedule : scheduleIdList) {
				String scheduleId = schedule.getScheduleId();
				Date startTime = schedule.getStartTime();
				Date endTime = schedule.getEndTime();
				String startTime_str = "";
				if(startTime != null) {
					startTime_str = DateUtil.formatStr(DateUtil.sdf_Day, startTime);
				}
				String endTime_str = "";
				if(endTime != null) {
					endTime_str = DateUtil.formatStr(DateUtil.sdf_Day, endTime);
				}
				
				
				String status = schedule.getStatus();
				String createrId = schedule.getCreaterId();
				String isCreater = "0";
				if(userId.equals(createrId)) {
					isCreater = "1";
				}
				JSONObject content = new JSONObject();
				content.put("scheduleId", scheduleId);
				content.put("startTime", startTime_str);
				content.put("endTime", endTime_str);
				content.put("status", status);
				content.put("isCreater", isCreater);
				contents.add(content);
			}
		}
		return JsonUtil.getSuccessRecordsJson(contents, contents.size());
	}

	@Override
	public String queryMonthWorkCalByUserId(JSONObject jsonObject) throws Exception {
//		String userId = jsonObject.getString("userId");
		String teamId = jsonObject.getString("teamId");
		//年月，格式yyyyMM，必须
		String yearMonth = jsonObject.getString("yearMonth");
		String queryUserId = jsonObject.getString("queryUserId");
		
		Date startTime = DateUtil.parseDate(DateUtil.sdfMonth, yearMonth);
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(startTime);
		calendar.add(Calendar.MONTH, 1);
		Date endTime = calendar.getTime();
		List<Work_calendar_user> work_calendar_users = work_calendar_userMapper.selectByUserIdMonth(teamId, queryUserId, startTime, endTime);
		JSONArray contents = new JSONArray();
		if(work_calendar_users != null && work_calendar_users.size() > 0) {
			List<String> shiftIdList = new ArrayList<>();
			for (int i = 0; i < work_calendar_users.size(); i++) {
				Work_calendar_user work_calendar_user = work_calendar_users.get(i);
				String shiftId = work_calendar_user.getShiftId();
				if(!StringUtil.isNull(shiftId)) {
					if(!shiftIdList.contains(shiftId)) {
						shiftIdList.add(shiftId);
					}
				}
			}
			Map<String, TeamShift> teamShiftMap = teamShiftService.queryShiftShortNameMap(shiftIdList);
			
			for (int i = 0; i < work_calendar_users.size(); i++) {
				Work_calendar_user work_calendar_user = work_calendar_users.get(i);
				Date calendarDate = work_calendar_user.getCalendarDate();
				String dayType = work_calendar_user.getDayType();
				String shiftId = work_calendar_user.getShiftId();
				if(!StringUtil.isNull(shiftId)) {
					if(!shiftIdList.contains(shiftId)) {
						shiftIdList.add(shiftId);
					}
				}
				JSONObject item = new JSONObject();
				item.put("calendarDate", DateUtil.formatStr(DateUtil.sdf_Day, calendarDate));
				item.put("dayType", dayType);
				item.put("shiftId", shiftId);
				String shiftName = "";
				if(!StringUtil.isNull(shiftId)) {
					TeamShift teamShift = teamShiftMap.get(shiftId);
					if(teamShift != null) {
						shiftName = teamShift.getShortName();
					}
				}
				item.put("shiftName", shiftName);
				contents.add(item);
			}
		} 
		return JsonUtil.getSuccessRecordsJson(contents, contents.size());
	}

	@Override
	public String queryDayWorkCal(JSONObject jsonObject) throws Exception {
		String userId = jsonObject.getString("userId");
		String teamId = jsonObject.getString("teamId");
		String calendarDate_str = jsonObject.getString("calendarDate");
		Date calendarDate = DateUtil.parseDate(DateUtil.sdf_Day, calendarDate_str);
		List<Work_calendar_user> workCalendarUsers = work_calendar_userMapper.selectEffectiveByTeamIdCalendarDate(teamId, calendarDate);
		JSONArray contents = new JSONArray();
		if(workCalendarUsers != null && workCalendarUsers.size() > 0) {
			List<String> shiftIdList = new ArrayList<>();
			List<String> userIdList = new ArrayList<>();
			Map<String, JSONObject> workCalendarUserMap = new HashMap<>();
			//休息的人员
			JSONArray users_ = new JSONArray();
			for(Work_calendar_user work_calendar_user : workCalendarUsers) {
				String userId_ = work_calendar_user.getUserId();
				String shiftId = work_calendar_user.getShiftId();
				if(!StringUtil.isNull(shiftId)) {
					if(!shiftIdList.contains(shiftId)) {
						shiftIdList.add(shiftId);
					}
					JSONObject shift = workCalendarUserMap.get(shiftId);
					if(shift == null) {
						shift = new JSONObject();
						shift.put("shiftId", shiftId);
						workCalendarUserMap.put(shiftId, shift);
					}
					JSONArray users = shift.getJSONArray("users");
					if(users == null) {
						users = new JSONArray();
						shift.put("users", users);
					}
					JSONObject user = new JSONObject();
					user.put("userId", userId_);
					user.put("nickname", "");
					users.add(user);
				} else {
					users_.add(userId_);
				}
				userIdList.add(userId_);
			}
			//查询排班
			Map<String, TeamShift> teamShiftMap = teamShiftService.queryShiftShortNameMap(shiftIdList);
			//查询用户
			Map<String, String> userNameMap = userService.queryUserByUserIdList(userIdList);
			
			for(Map.Entry<String, JSONObject> entry : workCalendarUserMap.entrySet()) {
				JSONObject shift = entry.getValue();
				String shiftId = shift.getString("shiftId");
				String shiftName = "";
				TeamShift teamShift = teamShiftMap.get(shiftId);
				if(teamShift != null) {
					shiftName = teamShift.getShortName();
				}
				shift.put("shiftName", shiftName);
				JSONArray users = shift.getJSONArray("users");
				if(users != null && users.size() > 0) {
					for (int i = 0; i < users.size(); i++) {
						JSONObject user = users.getJSONObject(i);
						String userId_ = user.getString("userId");
						String nickname = userNameMap.get(userId_);
						user.put("nickname", nickname);
					}
				}
				contents.add(shift);
			}
			//休息的人员
			if(users_.size() > 0) {
				JSONObject shift = new JSONObject();
				shift.put("shiftId", "");
				shift.put("shiftName", "休息");
				JSONArray users = new JSONArray();
				for (int i = 0; i < users_.size(); i++) {
					String userId_ = users_.getString(i);
					String nickname = userNameMap.get(userId_);
					JSONObject user = new JSONObject();
					user.put("userId", userId);
					user.put("nickname", nickname);
					users.add(user);
				}
				shift.put("users", users);
				contents.add(shift);
			}
		}
		return JsonUtil.getSuccessRecordsJson(contents, contents.size());
	}

	
	
}
