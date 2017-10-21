package com.sagacloud.superclass.service.impl;

import java.text.ParseException;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.sagacloud.superclass.common.DateUtil;
import com.sagacloud.superclass.common.JsonUtil;
import com.sagacloud.superclass.common.StringUtil;
import com.sagacloud.superclass.common.ToolsUtil;
import com.sagacloud.superclass.common.DBConst.Result;
import com.sagacloud.superclass.dao.HolidayMapper;
import com.sagacloud.superclass.dao.ScheduleMapper;
import com.sagacloud.superclass.dao.ScheduleNoShiftMapper;
import com.sagacloud.superclass.dao.ScheduleNoWeeksMapper;
import com.sagacloud.superclass.dao.Schedule_join_userMapper;
import com.sagacloud.superclass.dao.SpecialDayMapper;
import com.sagacloud.superclass.dao.TeamShiftMapper;
import com.sagacloud.superclass.dao.TeamUserRelMapper;
import com.sagacloud.superclass.dao.UserMapper;
import com.sagacloud.superclass.dao.Work_calendarMapper;
import com.sagacloud.superclass.dao.Work_calendar_userMapper;
import com.sagacloud.superclass.pojo.Holiday;
import com.sagacloud.superclass.pojo.Schedule;
import com.sagacloud.superclass.pojo.ScheduleNoShift;
import com.sagacloud.superclass.pojo.ScheduleNoWeeks;
import com.sagacloud.superclass.pojo.Schedule_join_user;
import com.sagacloud.superclass.pojo.SpecialDay;
import com.sagacloud.superclass.pojo.TeamShift;
import com.sagacloud.superclass.pojo.User;
import com.sagacloud.superclass.pojo.Work_calendar;
import com.sagacloud.superclass.pojo.Work_calendar_user;
import com.sagacloud.superclass.service.HolidayServiceI;
import com.sagacloud.superclass.service.ScheduleServiceI;
import com.sagacloud.superclass.service.TeamShiftServiceI;
import com.sagacloud.superclass.service.UserServiceI;

/**
 * 功能描述：排班表
 * @author gezhanbin
 *
 */
@Service("scheduleService")
public class ScheduleServiceImpl implements ScheduleServiceI {

	@Autowired
	private TeamShiftMapper teamShiftMapper;
	
	@Autowired
	private UserServiceI userService;
	@Autowired
	private TeamUserRelMapper teamUserRelMapper;
	@Autowired
	private ScheduleMapper scheduleMapper;
	
	@Autowired
	private SpecialDayMapper specialDayMapper;
	
	@Autowired
	private ScheduleNoShiftMapper scheduleNoShiftMapper;
	
	@Autowired
	private ScheduleNoWeeksMapper scheduleNoWeeksMapper;
	
	@Autowired
	private Work_calendarMapper work_calendarMapper;
	
	@Autowired
	private Work_calendar_userMapper work_calendar_userMapper;
	
	@Autowired
	private HolidayServiceI holidayService;
	

	@Autowired
	private TeamShiftServiceI teamShiftService;
	
	
	@Autowired
	private Schedule_join_userMapper schedule_join_userMapper;
	
	
	
	
	@Override
	public String addShift(JSONObject jsonObject) {
		String userId = jsonObject.getString("userId");
		String teamId = jsonObject.getString("teamId");
		String shiftName = jsonObject.getString("shiftName");
		String shortName = jsonObject.getString("shortName");
		String startTime = jsonObject.getString("startTime");
		String endTime = jsonObject.getString("endTime");
		String maxUserNum = jsonObject.getString("maxUserNum");
		String minUserNum = jsonObject.getString("minUserNum");
		String isMinRestDay = jsonObject.getString("isMinRestDay");
		String isMustJoin = jsonObject.getString("isMustJoin");
		String minJoinNum = jsonObject.getString("minJoinNum");
		
		//查询班次名称，和简称是否已存在
		Integer exist = teamShiftMapper.existShiftNameOrshortName(teamId, shiftName, shortName);
		if(exist != null && exist.intValue() == 1) {
			return JsonUtil.getFailureResultJson("班次名称或者班次简称已存在！");
		}
		
		TeamShift teamShift = new TeamShift();
		String shiftId = ToolsUtil.getUuid();
		teamShift.setShiftId(shiftId);
		teamShift.setTeamId(teamId);
		teamShift.setShiftName(shiftName);
		teamShift.setShortName(shortName);
		teamShift.setStartTime(startTime);
		teamShift.setEndTime(endTime);
		teamShift.setMaxUserNum(maxUserNum);
		teamShift.setMinUserNum(minUserNum);
		teamShift.setIsMinRestDay(isMinRestDay);
		teamShift.setIsMustJoin(isMustJoin);
		teamShift.setMinJoinNum(minJoinNum);
		teamShift.setCreaterId(userId);
		teamShift.setCreateTime(new Date());
		int count = teamShiftMapper.insert(teamShift);
		if(count == 0) {
			return JsonUtil.getFailureResultJson("添加失败！");
		} else {
			JSONObject item = new JSONObject();
			item.put("shiftId", shiftId);
			return JsonUtil.getSuccessRecordJson(item);
		}
	}

	@Override
	public String queryShiftById(JSONObject jsonObject) {
//		String userId = jsonObject.getString("userId");
		String shiftId = jsonObject.getString("shiftId");
		JSONObject item = null;
		TeamShift teamShift = teamShiftMapper.selectByPrimaryKey(shiftId);
		if(teamShift != null) {
			String itemStr = JSON.toJSONStringWithDateFormat(teamShift, DateUtil.sdf_time);
			item = JSONObject.parseObject(itemStr);
			return JsonUtil.getSuccessRecordJson(item);
		} else {
			return JsonUtil.getFailureResultJson("班次不存在!");
		}
	}

	@Override
	public String queryLastShiftList(JSONObject jsonObject) {
		String teamId = jsonObject.getString("teamId");
		Schedule schedule = scheduleMapper.selectUpEffectiveByTeamId(teamId);
		JSONArray contents = new JSONArray();
		if(schedule != null) {
			String shifts_str = schedule.getShifts();
			if(!StringUtil.isNull(shifts_str)) {
				JSONArray shifts = JSONArray.parseArray(shifts_str);
				for (int i = 0; i < shifts.size(); i++) {
					JSONObject shift = shifts.getJSONObject(i);
					contents.add(shift);
				}
			}
		}
		return JsonUtil.getSuccessRecordsJson(contents, contents.size());
	}

	@Override
	public String addSpecialDay(JSONObject jsonObject) throws ParseException {
		String userId = jsonObject.getString("userId");
		String teamId = jsonObject.getString("teamId");
		String specialDayName = jsonObject.getString("specialDayName");
		String specialDayType = jsonObject.getString("specialDayType");
		String startTime = jsonObject.getString("startTime");
		String endTime = jsonObject.getString("endTime");
		if("2".equals(specialDayType) && StringUtil.isNull(endTime)) {
			return ToolsUtil.return_error_json;
		}
		JSONArray shifts = jsonObject.getJSONArray("shifts");
		if(shifts == null || shifts.size() == 0) {
			return ToolsUtil.return_error_json;
		}
		SpecialDay specialDay = new SpecialDay();
		String specialDayId = ToolsUtil.getUuid();
		specialDay.setSpecialDayId(specialDayId);
		specialDay.setTeamId(teamId);
		specialDay.setSpecialDayName(specialDayName);
		specialDay.setSpecialDayType(specialDayType);
		specialDay.setStartTime(DateUtil.parseDate(DateUtil.sdf_Day,startTime));
		if("2".equals(specialDayType) && !StringUtil.isNull(endTime)) {
			specialDay.setEndTime(DateUtil.parseDate(DateUtil.sdf_Day, endTime));
		}
		specialDay.setShifts(shifts.toJSONString());
		specialDay.setCreaterId(userId);
		specialDay.setCreateTime(new Date());
		int count = specialDayMapper.insert(specialDay);
		if(count == 1) {
			JSONObject item = new JSONObject();
			item.put("specialDayId", specialDayId);
			return JsonUtil.getSuccessRecordJson(item);
		} else {
			return JsonUtil.getFailureResultJson("添加失败！");
		}
	}

	@Override
	public String addSchedule(JSONObject jsonObject) throws ParseException {
		String userId = jsonObject.getString("userId");
		String teamId = jsonObject.getString("teamId");
		JSONArray shifts = jsonObject.getJSONArray("shifts");
		String isTurnShift = jsonObject.getString("isTurnShift");
		String turnShiftCycle = jsonObject.getString("turnShiftCycle");
		JSONArray turnShifts = jsonObject.getJSONArray("turnShifts");
		String isWeekendRest = jsonObject.getString("isWeekendRest");
		String isHolidayRest = jsonObject.getString("isHolidayRest");
		String isSpecialDayShift = jsonObject.getString("isSpecialDayShift");
		String specialDayIds = jsonObject.getString("specialDayIds");
		
		if(shifts == null || shifts.size() == 0) {
			return ToolsUtil.return_error_json;
		}
		String scheduleId = ToolsUtil.getUuid();
		Schedule schedule = new Schedule();
		schedule.setScheduleId(scheduleId);
		schedule.setTeamId(teamId);
		schedule.setShifts(shifts.toJSONString());
		schedule.setIsTurnShift(isTurnShift);
		if("1".equals(isTurnShift)) {
			if(StringUtil.isNull(turnShiftCycle) || turnShifts == null || turnShifts.size() != Integer.valueOf(turnShiftCycle)) {
				return ToolsUtil.return_error_json;
			} 
			schedule.setTurnShiftCycle(turnShiftCycle);
			schedule.setTurnShifts(turnShifts.toJSONString());
		}
		schedule.setIsWeekendRest(isWeekendRest);
		schedule.setIsHolidayRest(isHolidayRest);
		schedule.setIsSpecialDayShift(isSpecialDayShift);
		if("1".equals(isSpecialDayShift)) {
			if(StringUtil.isNull(specialDayIds)) {
				return ToolsUtil.return_error_json;
			}
			schedule.setSpecialDayIds(specialDayIds);
		}
		schedule.setStatus("1");
		schedule.setCreaterId(userId);
		Date date = new Date();
		schedule.setCreateTime(date);
		schedule.setUpdateTime(date);
		//查询该团队中以前创建的未生效的排班
		List<Schedule> scheduleIdList = scheduleMapper.selectUnEffectiveByTeamId(teamId);
		
		int count = scheduleMapper.insertSelective(schedule);
		if(count == 1) {
			if(scheduleIdList != null && scheduleIdList.size() > 0) {
				for(Schedule schedule_ : scheduleIdList) {
					String scheduleId_ = schedule_.getScheduleId();
 					//根据schedule_id删除排班配置表：t_schedule
					scheduleMapper.deleteByPrimaryKey(scheduleId_);
					//根据schedule_id删除排班配置-不上某些班次表：t_schedule_no_shift
					scheduleNoShiftMapper.deleteByScheduleId(scheduleId_);
					//根据schedule_id删除排班配置-不上周几表：t_schedule_no_weeks 
					scheduleNoWeeksMapper.deleteByScheduleId(scheduleId_);
					//根据schedule_id删除工作日历表：t_work_calendar
					work_calendarMapper.deleteByScheduleId(scheduleId_);
					//根据schedule_id删除工作日历人员表：t_work_calendar_user
					work_calendar_userMapper.deleteByScheduleId(scheduleId_);
				}
			}
			JSONObject item = new JSONObject();
			item.put("scheduleId", scheduleId);
			return JsonUtil.getSuccessRecordJson(item);
			
		} else {
			return JsonUtil.getFailureResultJson("创建排班表失败！");
		}
	}

	@Override
	public String queryLastSpecialDayList(JSONObject jsonObject) throws ParseException {
//		String userId = jsonObject.getString("userId");
		String teamId = jsonObject.getString("teamId");
		Schedule schedule = scheduleMapper.selectUpEffectiveByTeamId(teamId);
		JSONArray contents = new JSONArray();
		if(schedule != null) {
			String isSpecialDayShift = schedule.getIsSpecialDayShift();
			if("1".equals(isSpecialDayShift)) {
				String specialDayIds_str = schedule.getSpecialDayIds();
				if(!StringUtil.isNull(specialDayIds_str)) {
					String[] specialDayIds = specialDayIds_str.split(",");
					List<String> specialDayIdList = new ArrayList<>();
					for (int i = 0; i < specialDayIds.length; i++) {
						String specialDayId = specialDayIds[i];
						if(!specialDayIdList.contains(specialDayId)) {
							specialDayIdList.add(specialDayId);
						}
					}
					if(specialDayIdList.size() > 0) {
						List<SpecialDay> specialDayList = specialDayMapper.selectByPrimaryKeys(specialDayIdList);
						if(specialDayList != null) {
							for (int i = 0; i < specialDayList.size(); i++) {
								SpecialDay specialDay = specialDayList.get(i);
								Date startTime = specialDay.getStartTime();
								Date endTime = specialDay.getEndTime();
								String shifts_str = specialDay.getShifts();
								String content_str = JSON.toJSONStringWithDateFormat(specialDay, DateUtil.sdf_time);
								JSONObject content = JSONObject.parseObject(content_str);
								JSONArray shifts = JSONArray.parseArray(shifts_str);
								String startTime_str = DateUtil.formatStr(DateUtil.sdf_Day, startTime);;
								String endTime_str = "";
								if(endTime != null) {
									endTime_str = DateUtil.formatStr(DateUtil.sdf_Day, endTime);
								}
								content.put("shifts", shifts);
								content.put("startTime", startTime_str);
								content.put("endTime", endTime_str);
								contents.add(content);
							}
						}
					}
				}
			}
		}
		return JsonUtil.getSuccessRecordsJson(contents, contents.size());
	}

	@Override
	public String updateSchedule(JSONObject jsonObject) throws ParseException {
		String userId = jsonObject.getString("userId");
		String scheduleId = jsonObject.getString("scheduleId");
		String teamId = jsonObject.getString("teamId");
		JSONArray shifts = jsonObject.getJSONArray("shifts");
		String isTurnShift = jsonObject.getString("isTurnShift");
		String turnShiftCycle = jsonObject.getString("turnShiftCycle");
		JSONArray turnShifts = jsonObject.getJSONArray("turnShifts");
		String isWeekendRest = jsonObject.getString("isWeekendRest");
		String isHolidayRest = jsonObject.getString("isHolidayRest");
		String isSpecialDayShift = jsonObject.getString("isSpecialDayShift");
		String specialDayIds = jsonObject.getString("specialDayIds");
		String startTime_str = jsonObject.getString("startTime");
		String endTime_str = jsonObject.getString("endTime");
		String minWorkDays = jsonObject.getString("minWorkDays");
		String maxWeekendRestDays = jsonObject.getString("maxWeekendRestDays");
		String maxConsecutiveRestDays = jsonObject.getString("maxConsecutiveRestDays");
		JSONArray noShifts = jsonObject.getJSONArray("noShifts");
		JSONArray noWeeks = jsonObject.getJSONArray("noWeeks");
		JSONArray joinUsers = jsonObject.getJSONArray("joinUsers");
		Schedule schedule = new Schedule();
		schedule.setScheduleId(scheduleId);
		schedule.setTeamId(teamId);
		if(shifts != null && shifts.size() > 0) {
			schedule.setShifts(shifts.toJSONString());
		}
		schedule.setIsTurnShift(isTurnShift);
		if("1".equals(isTurnShift)) {
			if(StringUtil.isNull(turnShiftCycle) || turnShifts == null || turnShifts.size() != Integer.valueOf(turnShiftCycle)) {
				return ToolsUtil.return_error_json;
			} 
			schedule.setTurnShiftCycle(turnShiftCycle);
			schedule.setTurnShifts(turnShifts.toJSONString());
		}
		schedule.setIsWeekendRest(isWeekendRest);
		schedule.setIsHolidayRest(isHolidayRest);
		schedule.setIsSpecialDayShift(isSpecialDayShift);
		if("1".equals(isSpecialDayShift)) {
			if(StringUtil.isNull(specialDayIds)) {
				return ToolsUtil.return_error_json;
			}
			schedule.setSpecialDayIds(specialDayIds);
		}
		if(!StringUtil.isNull(startTime_str) && !StringUtil.isNull(endTime_str)) {
			//计算排班天数
			Date startTime = DateUtil.parseDate(DateUtil.sdf_Day,startTime_str);
			Date endTime = DateUtil.parseDate(DateUtil.sdf_Day, endTime_str);
			Calendar calendar = Calendar.getInstance();
			calendar.setTime(startTime);
			int startDay = calendar.get(Calendar.DAY_OF_YEAR);
			calendar.setTime(endTime);
			int endDay = calendar.get(Calendar.DAY_OF_YEAR);
			int dayNum = endDay - startDay + 1;
			if(dayNum < 1) {
				return JsonUtil.getFailureResultJson("请选择正确的时间段！");
			}
			schedule.setStartTime(startTime);
			schedule.setEndTime(endTime);
			schedule.setDayNum(dayNum + "");
			schedule.setStatus("2");
		}
		schedule.setMinWorkDays(minWorkDays);
		schedule.setMaxWeekendRestDays(maxWeekendRestDays);
		schedule.setMaxConsecutiveRestDays(maxConsecutiveRestDays);
		Date date = new Date();
		schedule.setUpdateTime(date);
		int count = scheduleMapper.updateByPrimaryKeySelective(schedule);
		if(count == 1) {
			scheduleNoShiftMapper.deleteByScheduleId(scheduleId);
			if(noShifts != null && noShifts.size() > 0) {
				for (int i = 0; i < noShifts.size(); i++) {
					ScheduleNoShift scheduleNoShift = new ScheduleNoShift();
					JSONObject noShift = noShifts.getJSONObject(i);
					JSONArray users = noShift.getJSONArray("users");
					String userIds = "";
					if(users != null && users.size() > 0) {
						for (int j = 0; j < users.size(); j++) {
							JSONObject user = users.getJSONObject(j);
							String userId_ = user.getString("userId");
							if(!StringUtil.isNull(userId_)) {
								userIds += userId_ + ","; 
							}
						}
						if(userIds.endsWith(",")) {
							userIds = userIds.substring(0, userIds.length() - 1);
						}
					}
					String shiftIds = noShift.getString("shiftIds");
					String shiftNames = noShift.getString("shiftNames");
					String noShiftId = ToolsUtil.getUuid();
					scheduleNoShift.setNoShiftId(noShiftId);
					scheduleNoShift.setShiftIds(shiftIds);
					scheduleNoShift.setShiftNames(shiftNames);
					scheduleNoShift.setScheduleId(scheduleId);
					scheduleNoShift.setCreaterId(userId);
					scheduleNoShift.setCreateTime(new Date());
					scheduleNoShift.setUserIds(userIds);
					scheduleNoShiftMapper.insert(scheduleNoShift);
				}
			}
			scheduleNoWeeksMapper.deleteByScheduleId(scheduleId);
			if(noWeeks != null && noWeeks.size() > 0) {
				for (int i = 0; i < noWeeks.size(); i++) {
					ScheduleNoWeeks scheduleNoWeeks = new ScheduleNoWeeks();
					JSONObject noWeek = noWeeks.getJSONObject(i);
					JSONArray users = noWeek.getJSONArray("users");
					String userIds = "";
					if(users != null && users.size() > 0) {
						for (int j = 0; j < users.size(); j++) {
							JSONObject user = users.getJSONObject(j);
							String userId_ = user.getString("userId");
							if(!StringUtil.isNull(userId_)) {
								userIds += userId_ + ","; 
							}
						}
						if(userIds.endsWith(",")) {
							userIds = userIds.substring(0, userIds.length() - 1);
						}
					}
					String weeksCodes = noWeek.getString("weeksCodes");
					String weeksNames = noWeek.getString("weeksNames");
					String noWeeksId = ToolsUtil.getUuid();
					scheduleNoWeeks.setNoWeeksId(noWeeksId);
					scheduleNoWeeks.setWeeksCodes(weeksCodes);
					scheduleNoWeeks.setWeeksNames(weeksNames);
					scheduleNoWeeks.setScheduleId(scheduleId);
					scheduleNoWeeks.setCreaterId(userId);
					scheduleNoWeeks.setCreateTime(new Date());
					scheduleNoWeeks.setUserIds(userIds);
					scheduleNoWeeksMapper.insert(scheduleNoWeeks);
				}
			}
			schedule_join_userMapper.deleteByScheduleId(scheduleId);
			if(joinUsers != null && joinUsers.size() > 0) {
				
				for (int i = 0; i < joinUsers.size(); i++) {
					JSONObject joinUser = joinUsers.getJSONObject(i);
					String userId_ = joinUser.getString("userId");
					Schedule_join_user schedule_join_user = new Schedule_join_user();
					schedule_join_user.setJoinUserId(ToolsUtil.getUuid());
					schedule_join_user.setCreaterId(userId);
					schedule_join_user.setCreateTime(new Date());
					schedule_join_user.setScheduleId(scheduleId);
					schedule_join_user.setUserId(userId_);
					schedule_join_userMapper.insert(schedule_join_user);
				}
			}
			
			
			return JsonUtil.getSuccessResultJson("修改排班配置成功！");
		} else {
			return JsonUtil.getFailureResultJson("修改排班配置失败！");
		}
	}

	@Override
	public String queryScheduleById(JSONObject jsonObject) throws ParseException {
//		String userId = jsonObject.getString("userId");
		String scheduleId = jsonObject.getString("scheduleId");
		Schedule schedule = scheduleMapper.selectByPrimaryKey(scheduleId);
		if(schedule != null) {
			Date startTime = schedule.getStartTime();
			Date endTime = schedule.getEndTime();
			String item_str = JSON.toJSONStringWithDateFormat(schedule, DateUtil.sdf_time);
			JSONObject item = JSONObject.parseObject(item_str);
			String startTime_str = "";
			if(startTime != null) {
				startTime_str = DateUtil.formatStr(DateUtil.sdf_Day, startTime);;
			}
			String endTime_str = "";
			if(endTime != null) {
				endTime_str = DateUtil.formatStr(DateUtil.sdf_Day, endTime);
			}
			item.put("startTime", startTime_str);
			item.put("endTime", endTime_str);
			
			String shifts_str = schedule.getShifts();
			JSONArray shifts = new JSONArray();
			if(!StringUtil.isNull(shifts_str)) {
				shifts = JSONArray.parseArray(shifts_str);
			}
			item.put("shifts", shifts);
			
			String turnShifts_str = schedule.getTurnShifts();
			JSONArray turnShifts = new JSONArray();
			if(!StringUtil.isNull(turnShifts_str)) {
				turnShifts = JSONArray.parseArray(turnShifts_str);
			}
			item.put("turnShifts", turnShifts);
			
			
			
			//排班配置-不上某些班次表：t_schedule_no_shift
			List<ScheduleNoShift> scheduleNoShifts = scheduleNoShiftMapper.selectByScheduleId(scheduleId);
			List<String> userIdList = new ArrayList<>();
			if(scheduleNoShifts != null && scheduleNoShifts.size() > 0) {
				for (int i = 0; i < scheduleNoShifts.size(); i++) {
					ScheduleNoShift scheduleNoShift = scheduleNoShifts.get(i);
					String userIds_str = scheduleNoShift.getUserIds();
					if(!StringUtil.isNull(userIds_str)) {
						String[] userIds = userIds_str.split(",");
						for(String userId_ : userIds) {
							if(!userIdList.contains(userId_)) {
								userIdList.add(userId_);
							}
						}
					}
				}
			}
			//排班配置-不上周几表：t_schedule_no_weeks
			List<ScheduleNoWeeks> scheduleNoWeeks = scheduleNoWeeksMapper.selectByScheduleId(scheduleId);
			if(scheduleNoWeeks != null && scheduleNoWeeks.size() > 0) {
				for (int i = 0; i < scheduleNoWeeks.size(); i++) {
					ScheduleNoWeeks scheduleNoWeek = scheduleNoWeeks.get(i);
					String userIds_str = scheduleNoWeek.getUserIds();
					if(!StringUtil.isNull(userIds_str)) {
						String[] userIds = userIds_str.split(",");
						for(String userId_ : userIds) {
							if(!userIdList.contains(userId_)) {
								userIdList.add(userId_);
							}
						}
					}
				}
			}
			//排班配置-参加班次的成员表：t_schedule_join_user
			List<Schedule_join_user> schedule_join_users = schedule_join_userMapper.selectByScheduleId(scheduleId);
			if(schedule_join_users != null && schedule_join_users.size() > 0) {
				for(Schedule_join_user schedule_join_user : schedule_join_users) {
					String userId_ = schedule_join_user.getUserId();
					if(!StringUtil.isNull(userId_)) {
						if(!userIdList.contains(userId_)) {
							userIdList.add(userId_);
						}
					}
				}
			}
			
			
			Map<String, String> userNameMap = userService.queryUserByUserIdList(userIdList);
			//排班配置-不上某些班次表：t_schedule_no_shift
			if(scheduleNoShifts != null && scheduleNoShifts.size() > 0) {
				JSONArray noShifts = new JSONArray();
				for (int i = 0; i < scheduleNoShifts.size(); i++) {
					ScheduleNoShift scheduleNoShift = scheduleNoShifts.get(i);
					String userIds_str = scheduleNoShift.getUserIds();
					String shiftIds = scheduleNoShift.getShiftIds();
					String shiftNames = scheduleNoShift.getShiftNames();
					JSONObject noShift = new JSONObject();
					noShift.put("shiftIds", shiftIds);
					noShift.put("shiftNames", shiftNames);
					JSONArray users = new JSONArray();
					if(!StringUtil.isNull(userIds_str)) {
						String[] userIds = userIds_str.split(",");
						for(String userId_ : userIds) {
							JSONObject user = new JSONObject();
							user.put("userId", userId_);
							user.put("nickname", userNameMap.get(userId_));
							users.add(user);
						}
					}
					noShift.put("users", users);
					noShifts.add(noShift);
				}
				item.put("noShifts", noShifts);
			}
			//排班配置-不上周几表：t_schedule_no_weeks
			if(scheduleNoWeeks != null && scheduleNoWeeks.size() > 0) {
				JSONArray noWeeks = new JSONArray();
				for (int i = 0; i < scheduleNoWeeks.size(); i++) {
					ScheduleNoWeeks scheduleNoWeek = scheduleNoWeeks.get(i);
					String userIds_str = scheduleNoWeek.getUserIds();
					String weeksCodes = scheduleNoWeek.getWeeksCodes();
					String weeksNames = scheduleNoWeek.getWeeksNames();
					JSONObject noWeek = new JSONObject();
					noWeek.put("weeksCodes", weeksCodes);
					noWeek.put("weeksNames", weeksNames);
					JSONArray users = new JSONArray();
					if(!StringUtil.isNull(userIds_str)) {
						String[] userIds = userIds_str.split(",");
						for(String userId_ : userIds) {
							JSONObject user = new JSONObject();
							user.put("userId", userId_);
							user.put("nickname", userNameMap.get(userId_));
							users.add(user);
						}
					}
					noWeek.put("users", users);
					noWeeks.add(noWeek);
				}
				item.put("noWeeks", noWeeks);
			}
			
			//排班配置-参加班次的成员表：t_schedule_join_user
			if(schedule_join_users != null && schedule_join_users.size() > 0) {
				JSONArray joinUsers = new JSONArray();
				for(Schedule_join_user schedule_join_user : schedule_join_users) {
					String userId_ = schedule_join_user.getUserId();
					if(!StringUtil.isNull(userId_)) {
						String nickname = userNameMap.get(userId_);
						JSONObject joinUser = new JSONObject();
						joinUser.put("userId", userId_);
						joinUser.put("nickname", nickname);
						joinUsers.add(joinUser);
					}
				}
				item.put("joinUsers", joinUsers);
			}
			
			return JsonUtil.getSuccessRecordJson(item);
		} else {
			return JsonUtil.getFailureResultJson("该排班配置不存在！");
		}
		
	}

	@Override
	public String createWorkCalendar(JSONObject jsonObject) throws ParseException {
		String userId = jsonObject.getString("userId");
		String scheduleId = jsonObject.getString("scheduleId");
		Schedule schedule = scheduleMapper.selectByPrimaryKey(scheduleId);
		if(schedule != null) {
			
			String teamId = schedule.getTeamId();
			Date startTime = schedule.getStartTime();
			Date endTime = schedule.getEndTime();
			if(startTime == null || endTime == null) {
				return JsonUtil.getFailureResultJson("开始时间或者结束不存在！");
			}
			//班次
			String shifts_str = schedule.getShifts();
			String isTurnShift = schedule.getIsTurnShift();
			String turnShiftCycle_Str = schedule.getTurnShiftCycle();
			//轮转班次
			String turnShifts_str = schedule.getTurnShifts();
			String isWeekendRest = schedule.getIsWeekendRest();
			String isHolidayRest = schedule.getIsHolidayRest();
			String isSpecialDayShift = schedule.getIsSpecialDayShift();
			String specialDayIds_str = schedule.getSpecialDayIds();
			JSONArray turnShifts = null;
			Integer turnShiftCycle = null;
			//轮转班次
			Map<String, String> turnShiftsMap = new HashMap<>();
			if("1".equals(isTurnShift)) {
				if(StringUtil.isNull(turnShiftCycle_Str)) {
					return JsonUtil.getFailureResultJson("采用轮班制度时，轮班周期为空！");
				}
				if(StringUtil.isNull(turnShifts_str)) {
					return JsonUtil.getFailureResultJson("采用轮班制度时，轮转班次为空！");
				}
				turnShiftCycle = Integer.valueOf(turnShiftCycle_Str);
				turnShifts = JSONArray.parseArray(turnShifts_str);
				for (int i = 0; i < turnShifts.size(); i++) {
					JSONObject turnShift = turnShifts.getJSONObject(i);
					String day = turnShift.getString("day");
					String shiftId_ = turnShift.getString("shiftId");
					String turnShifts_str_temp = null;
					if(!StringUtil.isNull(shiftId_)) {
						JSONArray turnShifts_ = new JSONArray();
						turnShift.remove("turnShift");
						turnShifts_.add(turnShift);
						turnShifts_str_temp = turnShifts_.toJSONString();
					}
					turnShiftsMap.put(day, turnShifts_str_temp);
				}
			}
			//法定节假日表：t_holiday
			Map<Date, String> holidayMap = new HashMap<>();
			if("1".equals(isHolidayRest)) {
				holidayMap = holidayService.queryHolidayMap();
			}
			//特殊日
			Map<Date, String> specialDayMap = new HashMap<>();
			if("1".equals(isSpecialDayShift)) {
				//查询特殊特殊日表：t_special_day
				if(StringUtil.isNull(specialDayIds_str)) {
					return JsonUtil.getFailureResultJson("特殊日单独排班时，没有排班配置！");
				}
				String[] specialDayIds_ = specialDayIds_str.split(",");
				List<String> specialDayIds = new ArrayList<>();
				for (String specialDayId : specialDayIds_) {
					if(!specialDayIds.contains(specialDayId)) {
						specialDayIds.add(specialDayId);
					}
				}
				if(specialDayIds.size() > 0) {
					specialDayMap = querySpecialDayMap(specialDayIds);
				}
			}
			
			
			JSONArray contents = new JSONArray();
			Calendar calendar = Calendar.getInstance();
			calendar.setTime(startTime);
			int dayMark = 0;
			while (calendar.getTime().getTime() <= endTime.getTime()) {
				Date calendarDate = calendar.getTime();
				int weekday = calendar.get(Calendar.DAY_OF_WEEK);
				weekday--;
				if(weekday == 0) {
					weekday = 7;
				}
				//日类型,1-工作日，0-休息日
				String dayType = "1";
				//1、正常排班
				String workShifts_str = null;
				//是否采用轮班制度
				if("1".equals(isTurnShift)) {
					dayMark++;
					//获取轮转排班
					String workShifts_str_temp = turnShiftsMap.get(dayMark + "");
					if(!StringUtil.isNull(workShifts_str_temp)) {
						workShifts_str = workShifts_str_temp;
					} else {
						dayType = "0";
					}
					if(dayMark == turnShiftCycle) {
						dayMark = 0;
					}
				} else {
					workShifts_str = shifts_str;
				}
				
				//2、周末是否休息
				if("1".equals(isWeekendRest)) {
					if(weekday == 6 || weekday == 7) {
						//周末
						dayType = "0";
					}
				}
				//3、法定节假日休息
				if("1".equals(isHolidayRest)) {
					String dayTypeTemp = holidayMap.get(calendarDate);
					if(!StringUtil.isNull(dayTypeTemp)) {
						dayType = dayTypeTemp;
					}
				}
				//4、特殊日单独排班
				if("1".equals(isSpecialDayShift)) {
					String workShifts_str_temp = specialDayMap.get(calendarDate);
					if(!StringUtil.isNull(workShifts_str_temp)) {
						workShifts_str = workShifts_str_temp;
					}
				}
				JSONArray workShifts = null;
				if(!StringUtil.isNull(workShifts_str)) {
					workShifts = JSONArray.parseArray(workShifts_str);
				}
				String workCalId= ToolsUtil.getUuid();
				JSONObject content = new JSONObject();
				content.put("workCalId", workCalId);
				content.put("calendarDate", DateUtil.formatStr(DateUtil.sdf_Day, calendarDate));
				content.put("dayType", dayType);
				if("0".equals(dayType)) {
					workShifts = new JSONArray();
				}
				content.put("workShifts", workShifts);
				contents.add(content);
				Work_calendar work_calendar = new Work_calendar();
				work_calendar.setWorkCalId(workCalId);
				work_calendar.setTeamId(teamId);
				work_calendar.setScheduleId(scheduleId);
				work_calendar.setCalendarDate(calendarDate);
				work_calendar.setDayType(dayType);
				work_calendar.setWorkShifts(workShifts_str);
				work_calendar.setValid("0");
				work_calendar.setCreaterId(userId);
				Date date = new Date();
				work_calendar.setCreateTime(date);
				work_calendar.setUpdateTime(date);
				work_calendarMapper.deleteByScheduleIdCalendarDate(scheduleId, calendarDate);
				work_calendarMapper.insert(work_calendar);
				calendar.add(Calendar.DAY_OF_YEAR, 1);
			}
			return JsonUtil.getSuccessRecordsJson(contents, contents.size());
		} else {
			return JsonUtil.getFailureResultJson("数据不存在！");
		}
	}
	
	private Map<Date, String> querySpecialDayMap(List<String> specialDayIds) throws ParseException {
		Map<Date, String> specialDayMap = new HashMap<>();
		List<SpecialDay> specialDays = specialDayMapper.selectByPrimaryKeys(specialDayIds);
		Calendar calendar = Calendar.getInstance();
		if(specialDays != null && specialDays.size() > 0) {
			for(SpecialDay specialDay : specialDays) {
				String shifts = specialDay.getShifts();
				String specialDayType = specialDay.getSpecialDayType();
				Date startTime = specialDay.getStartTime();
				Date endTime = specialDay.getEndTime();
				calendar.setTime(startTime);
				if("2".equals(specialDayType)) {
					if(endTime == null) {
						endTime = DateUtil.parseDate(DateUtil.sdf_Day, DateUtil.formatStr(DateUtil.sdf_Day, new Date()));
					}
					while (calendar.getTime().getTime() <= endTime.getTime()) {
						specialDayMap.put(calendar.getTime(), shifts);
						calendar.add(Calendar.DAY_OF_YEAR, 1);
					}
				} else {
					specialDayMap.put(startTime, shifts);
				}
			}
		}
		return specialDayMap;
	}
	
	

	@Override
	public String updateWorkCalendar(JSONObject jsonObject) {
//		String userId = jsonObject.getString("userId");
		JSONArray workCals = jsonObject.getJSONArray("workCals");
		if(workCals == null || workCals.size() == 0) {
			return ToolsUtil.return_error_json;
		}
		try {
			for (int i = 0; i < workCals.size(); i++) {
				JSONObject workCal = workCals.getJSONObject(i);
				String workCalId = workCal.getString("workCalId");
				String dayType = workCal.getString("dayType");
				Work_calendar work_calendar = new Work_calendar();
				work_calendar.setWorkCalId(workCalId);
				work_calendar.setDayType(dayType);
				work_calendarMapper.updateByPrimaryKeySelective(work_calendar);
			}
			return JsonUtil.getSuccessResultJson("修改成功！");
		} catch (Exception e) {
			return JsonUtil.getFailureResultJson("修改失败！");
		}
	}

	@Override
	public String startSchedule(JSONObject jsonObject) {
//		String userId = jsonObject.getString("userId");
		String scheduleId = jsonObject.getString("scheduleId");
		Schedule schedule = new Schedule();
		schedule.setScheduleId(scheduleId);
		schedule.setStatus("3");
		int count = scheduleMapper.updateByPrimaryKeySelective(schedule);
		if(count == 1) {
			return JsonUtil.getSuccessResultJson("排班成功！");
		} else {
			return JsonUtil.getFailureResultJson("排班失败");
		}
	}

	@Override
	public String queryWorkCalById(JSONObject jsonObject) {
//		String userId = jsonObject.getString("userId");
		String scheduleId = jsonObject.getString("scheduleId");
		List<Work_calendar> workCalendars = work_calendarMapper.selectByScheduleId(scheduleId);
		JSONArray contents = new JSONArray();
		if(workCalendars != null && workCalendars.size() > 0) {
			for(Work_calendar work_calendar : workCalendars) {
				String workCalId = work_calendar.getWorkCalId();
				Date calendarDate = work_calendar.getCalendarDate();
				String calendarDate_str = "";
				if(calendarDate != null) {
					calendarDate_str = DateUtil.formatStr(DateUtil.sdf_Day, calendarDate);
				}
				String dayType = work_calendar.getDayType();
				String workShifts_str = work_calendar.getWorkShifts();
				JSONArray workShifts = null;
				if(!StringUtil.isNull(workShifts_str)) {
					workShifts = JSONArray.parseArray(workShifts_str);
				}
				JSONObject content = new JSONObject();
				content.put("workCalId", workCalId);
				content.put("calendarDate", calendarDate_str);
				content.put("dayType", dayType);
				if("0".equals(dayType)) {
					workShifts = new JSONArray();
				}
				content.put("workShifts", workShifts);
				contents.add(content);
			}
		}
		return JsonUtil.getSuccessRecordsJson(contents, contents.size());
	}

	@Override
	public String queryWorkCalList(JSONObject jsonObject) {
//		String userId = jsonObject.getString("userId");
		String scheduleId = jsonObject.getString("scheduleId");
		Schedule schedule = scheduleMapper.selectByPrimaryKey(scheduleId);
		JSONArray contents = new JSONArray();
		if(schedule != null) {
			String teamId = schedule.getTeamId();
			
			//团队人数
			int teamUserCount = teamUserRelMapper.selectUserCountByTeamId(teamId);
			
			List<String> shiftIdList = new ArrayList<>();
			List<Work_calendar> workCalendars = work_calendarMapper.selectByScheduleId(scheduleId);
			if(workCalendars != null && workCalendars.size() > 0) {
				for(Work_calendar work_calendar : workCalendars) {
					String dayType = work_calendar.getDayType();
					if("1".equals(dayType)) {
						String workShifts_str = work_calendar.getWorkShifts();
						if(!StringUtil.isNull(workShifts_str)) {
							JSONArray workShifts = JSONArray.parseArray(workShifts_str);
							for (int i = 0; i < workShifts.size(); i++) {
								JSONObject workShift = workShifts.getJSONObject(i);
								String shiftId = workShift.getString("shiftId");
								if(!shiftIdList.contains(shiftId)) {
									shiftIdList.add(shiftId);
								}
							}
						}
					}
				}
			}
			Map<String, TeamShift> teamShiftMap = new HashMap<>();
			if(shiftIdList.size() > 0) {
				//查询排班
				teamShiftMap = teamShiftService.queryShiftShortNameMap(shiftIdList);
			}
			//各个日期下的各个班次的人员个数
			Map<Date, Map<String ,Integer>> calendarShiftCountMap = new HashMap<>();
			//当前日期是否有成员提过要求
			Map<Date, Boolean> calendarHaveDemandMap = new HashMap<>();
			List<Work_calendar_user> workCalendarUsers = work_calendar_userMapper.selectByScheduleId(scheduleId);
			if(workCalendarUsers != null && workCalendarUsers.size() > 0) {
				for (Work_calendar_user work_calendar_user : workCalendarUsers) {
					Date calendarDate = work_calendar_user.getCalendarDate();
					String dayType = work_calendar_user.getDayType();
					String shiftId = work_calendar_user.getShiftId();
					String fromType= work_calendar_user.getFromType();
					if("1".equals(fromType)) {
						calendarHaveDemandMap.put(calendarDate, true);
					}
					
					if("0".equals(dayType)) {
						shiftId = "";
					}
					Map<String,Integer> shiftCountMap = calendarShiftCountMap.get(calendarDate);
					if(shiftCountMap == null) {
						shiftCountMap = new HashMap<>();
						calendarShiftCountMap.put(calendarDate, shiftCountMap);
					}
					Integer count = shiftCountMap.get(shiftId);
					if(count == null) {
						count = 0;
					}
					count++;
					shiftCountMap.put(shiftId, count);
				}
			}
			
			
			if(workCalendars != null && workCalendars.size() > 0) {
				for(Work_calendar work_calendar : workCalendars) {
					Date calendarDate = work_calendar.getCalendarDate();
					String dayType = work_calendar.getDayType();
					
					JSONObject content = new JSONObject();
					content.put("scheduleId", scheduleId);
					content.put("calendarDate", DateUtil.formatStr(DateUtil.sdf_Day, calendarDate));
					content.put("dayType", dayType);
					
					if("1".equals(dayType)) {
						String workShifts_str = work_calendar.getWorkShifts();
						boolean isFull = true;
						if(!StringUtil.isNull(workShifts_str)) {
							JSONArray workShifts = JSONArray.parseArray(workShifts_str);
							for (int i = 0; i < workShifts.size(); i++) {
								JSONObject workShift = workShifts.getJSONObject(i);
								String shiftId = workShift.getString("shiftId");
								TeamShift shift = teamShiftMap.get(shiftId);
								Integer maxUserNum = null;
								if(shift != null) {
									String maxUserNum_ = shift.getMaxUserNum();
									if(!StringUtil.isNull(maxUserNum_)) {
										maxUserNum = Integer.valueOf(maxUserNum_);
									}
								}
								if(maxUserNum == null) {
									maxUserNum = teamUserCount;
								}
								Map<String, Integer> shiftCountMap = calendarShiftCountMap.get(calendarDate);
								Integer userNum = 0;
								if(shiftCountMap != null) {
									userNum = shiftCountMap.get(shiftId);
								}
								if(userNum == null) {
									userNum = 0;
								}
								if(userNum < maxUserNum) {
									isFull = false;
								}
								
							}
						}
						Boolean haveDemand = calendarHaveDemandMap.get(calendarDate);
						
						if(haveDemand == null) {
							haveDemand = false;
						}
						content.put("haveDemand", haveDemand);
						content.put("isFull", isFull);
						contents.add(content);
					} else {
						contents.add(content);
					}
				}
			}
		}
		return JsonUtil.getSuccessRecordsJson(contents, contents.size());
	}

	@Override
	public String queryDayShiftList(JSONObject jsonObject) throws Exception {
		String userId = jsonObject.getString("userId");
		String scheduleId = jsonObject.getString("scheduleId");
		String calendarDate_str = jsonObject.getString("calendarDate");
		Date calendarDate = DateUtil.parseDate(DateUtil.sdf_Day, calendarDate_str);
		Work_calendar work_calendar = work_calendarMapper.selectByScheduleIdCalendarDate(scheduleId, calendarDate);
		JSONArray contents = new JSONArray();
		if(work_calendar != null) {
			String teamId = work_calendar.getTeamId();
			//1、团队人数
			Integer teamUserCount = teamUserRelMapper.selectUserCountByTeamId(teamId);
			String dayType = work_calendar.getDayType();
			String workShifts_str = work_calendar.getWorkShifts();
			if("0".equals(dayType)) {
				return JsonUtil.getFailureResultJson("所选天是公休日！");
			}
			JSONArray workShifts = JSONArray.parseArray(workShifts_str);
			List<String> shiftIdList = new ArrayList<>();
			for (int i = 0; i < workShifts.size(); i++) {
				JSONObject workShift = workShifts.getJSONObject(i);
				String shiftId = workShift.getString("shiftId");
				if(!shiftIdList.contains(shiftId)) {
					shiftIdList.add(shiftId);
				}
			}
			//2、每个班次的最大、最小人数
			Map<String, TeamShift> teamShiftMap = teamShiftService.queryShiftShortNameMap(shiftIdList);
			//3、每个人班次已经报名的人数统计
			List<Work_calendar_user> work_calendar_users = work_calendar_userMapper.selectEffectiveByTeamIdCalendarDate(teamId, calendarDate);
			List<String> userIdList = new ArrayList<>();
			Map<String, List<String>> shiftUserIdMap = new HashMap<>();
			if(work_calendar_users != null && work_calendar_users.size() > 0) {
				for (Work_calendar_user work_calendar_user : work_calendar_users) {
					String dayType_ = work_calendar_user.getDayType();
					String shiftId = work_calendar_user.getShiftId();
					String userId_ = work_calendar_user.getUserId();
					if(!userIdList.contains(userId_)) {
						userIdList.add(userId_);
					}
					if("0".equals(dayType_)) {
						shiftId = "xiuxi";
					}
					List<String> userIdList_ = shiftUserIdMap.get(shiftId);
					if(userIdList_ == null) {
						userIdList_ = new ArrayList<>();
						shiftUserIdMap.put(shiftId, userIdList_);
					}
					userIdList_.add(userId_);
				}
			}
			//获取用户信息
			Map<String, String> userNameMap =  userService.queryUserByUserIdList(userIdList);
			Integer minCount = 0;
			JSONObject xiuxiContent = new JSONObject();
			xiuxiContent.put("scheduleId", scheduleId);
			xiuxiContent.put("calendarDate", calendarDate_str);
			xiuxiContent.put("shiftId", "xiuxi");
			xiuxiContent.put("shiftName", "休息");
			JSONArray restUsers = new JSONArray();
			Integer xiuxiHaveUserNum = 0;
			for (int i = 0; i < workShifts.size(); i++) {
				JSONObject workShift = workShifts.getJSONObject(i);
				String shiftId = workShift.getString("shiftId");
				TeamShift teamShift = teamShiftMap.get(shiftId);
				String shiftName = "";
				String minUserNum_ = "";
				String maxUserNum = "";
				if(teamShift != null) {
					shiftName = teamShift.getShortName();
					minUserNum_ = teamShift.getMinUserNum();
					maxUserNum = teamShift.getMaxUserNum();
				}
				if(StringUtil.isNull(maxUserNum)) {
					maxUserNum = teamUserCount + "";
				}
				if(StringUtil.isNull(minUserNum_)) {
					minUserNum_ = "1";
				}
				Integer minUserNum = Integer.valueOf(minUserNum_);
				minCount += minUserNum;
				JSONArray users = new JSONArray();
				Integer haveUserNum = 0;
				List<String> userIdList_ = shiftUserIdMap.get(shiftId);
				if(userIdList_ != null && userIdList_.size() > 0) {
					haveUserNum = userIdList_.size();
					for(String userId_ : userIdList_) {
						String userName = userNameMap.get(userId_);
						JSONObject user = new JSONObject();
						user.put("userId", userId);
						user.put("nickname", userName);
						if("xiuxi".equals(shiftId)) {
							restUsers.add(user);
						} else {
							users.add(user);
						}
					}
				}
				if(!"xiuxi".equals(shiftId)) {
					JSONObject content = new JSONObject();
					content.put("scheduleId", scheduleId);
					content.put("calendarDate", calendarDate_str);
					content.put("shiftId", shiftId);
					content.put("shiftName", shiftName);
					content.put("users", users);
					content.put("minUserNum", minUserNum + "");
					content.put("haveUserNum", haveUserNum + "");
					content.put("maxUserNum", maxUserNum);
					contents.add(content);
					
				} else {
					xiuxiHaveUserNum = haveUserNum;
				}
			}
			
			xiuxiContent.put("users", restUsers);
			xiuxiContent.put("minUserNum", "0");
			xiuxiContent.put("haveUserNum", xiuxiHaveUserNum + "");
			Integer maxUserNum = teamUserCount - minCount;
			xiuxiContent.put("maxUserNum", maxUserNum + "");
			contents.add(xiuxiContent);
		}
		return JsonUtil.getSuccessRecordsJson(contents, contents.size());
	}

	@Override
	public String saveDayShiftList(JSONObject jsonObject) throws Exception {
		String userId = jsonObject.getString("userId");
		String scheduleId = jsonObject.getString("scheduleId");
		String calendarDate_str = jsonObject.getString("calendarDate");
		Date calendarDate = DateUtil.parseDate(DateUtil.sdf_Day, calendarDate_str);
		JSONArray shifts = jsonObject.getJSONArray("shifts");
		if(shifts == null || shifts.size() == 0) {
			return ToolsUtil.return_error_json;
		}
		//查询当前时间的所有班次的最大人数、最小人数、
		Schedule schedule = scheduleMapper.selectByPrimaryKey(scheduleId);
		if(schedule != null) {
			String teamId = schedule.getTeamId();
			for (int i = 0; i < shifts.size(); i++) {
				JSONObject shift = shifts.getJSONObject(i);
				String shiftId = shift.getString("shiftId");
				JSONArray userIds = shift.getJSONArray("userIds");
				if(userIds == null || userIds.size() == 0) {
					//删除
					if("xiuxi".equals(shiftId)) {
						work_calendar_userMapper.cancelShif(teamId, scheduleId, calendarDate, null, "0", null);
					} else {
						work_calendar_userMapper.cancelShif(teamId, scheduleId, calendarDate, null, null, shiftId);
					}
				} else {
					//先删除再添加
					for (int j = 0; j < userIds.size(); j++) {
						String userId_ = userIds.getString(j);
						Work_calendar_user work_calendar_user = new Work_calendar_user();
						String dayType = "";
						if("xiuxi".equals(shiftId)) {
							work_calendar_userMapper.cancelShif(teamId, scheduleId, calendarDate, userId_, "0", null);
							dayType = "0";
						} else {
							work_calendar_userMapper.cancelShif(teamId, scheduleId, calendarDate, userId_, null, shiftId);
							dayType = "1";
							work_calendar_user.setShiftId(shiftId);
						}
						work_calendar_user.setWorkCalUserId(ToolsUtil.getUuid());
						work_calendar_user.setTeamId(teamId);
						work_calendar_user.setScheduleId(scheduleId);
						work_calendar_user.setCalendarDate(calendarDate);
						work_calendar_user.setDayType(dayType);
						work_calendar_user.setUserId(userId_);
						work_calendar_user.setFromType("2");
						work_calendar_user.setValid("0");
						work_calendar_user.setCreaterId(userId);
						Date date = new Date();
						work_calendar_user.setCreateTime(date);
						work_calendar_user.setUpdateTime(date);
						work_calendar_userMapper.insert(work_calendar_user);
					}
				}
			}
		}
		
		jsonObject.remove("shifts");
		String contents_str = queryDayShiftList(jsonObject);
		JSONArray contents = JSONArray.parseArray(contents_str);
		
		
		boolean isFull = false;
		for (int i = 0; i < contents.size(); i++) {
			JSONObject content = contents.getJSONObject(i);
			String minUserNum_ = content.getString("minUserNum");
			String haveUserNum_ = content.getString("haveUserNum");
			Integer minUserNum = Integer.valueOf(minUserNum_);
			Integer haveUserNum = Integer.valueOf(haveUserNum_);
			if(haveUserNum.intValue() < minUserNum.intValue()) {
				isFull = true;
				break;
			}
		}
		if(isFull) {
			return JsonUtil.getSuccessResultJson("有些班次未能满足参与人数要求！");
		} else {
			return JsonUtil.getSuccessResultJson("");
		}
	}

	@Override
	public String verifySchedule(JSONObject jsonObject) throws Exception {
//		String userId = jsonObject.getString("userId");
		String scheduleId = jsonObject.getString("scheduleId");
		Schedule schedule = scheduleMapper.selectByPrimaryKey(scheduleId);
		JSONArray contents = new JSONArray();
		if(schedule != null) {
			String teamId = schedule.getTeamId();
			
			//团队人数
			int teamUserCount = teamUserRelMapper.selectUserCountByTeamId(teamId);
			
			List<String> shiftIdList = new ArrayList<>();
			List<Work_calendar> workCalendars = work_calendarMapper.selectByScheduleId(scheduleId);
			if(workCalendars != null && workCalendars.size() > 0) {
				for(Work_calendar work_calendar : workCalendars) {
					String dayType = work_calendar.getDayType();
					if("1".equals(dayType)) {
						String workShifts_str = work_calendar.getWorkShifts();
						if(!StringUtil.isNull(workShifts_str)) {
							JSONArray workShifts = JSONArray.parseArray(workShifts_str);
							for (int i = 0; i < workShifts.size(); i++) {
								JSONObject workShift = workShifts.getJSONObject(i);
								String shiftId = workShift.getString("shiftId");
								if(!shiftIdList.contains(shiftId)) {
									shiftIdList.add(shiftId);
								}
							}
						}
					}
				}
			}
			Map<String, TeamShift> teamShiftMap = new HashMap<>();
			if(shiftIdList.size() > 0) {
				//查询排班
				teamShiftMap = teamShiftService.queryShiftShortNameMap(shiftIdList);
			}
			//各个日期下的各个班次的人员个数
			Map<Date, Map<String ,Integer>> calendarShiftCountMap = new HashMap<>();
			List<Work_calendar_user> workCalendarUsers = work_calendar_userMapper.selectByScheduleId(scheduleId);
			if(workCalendarUsers != null && workCalendarUsers.size() > 0) {
				for (Work_calendar_user work_calendar_user : workCalendarUsers) {
					Date calendarDate = work_calendar_user.getCalendarDate();
					String dayType = work_calendar_user.getDayType();
					String shiftId = work_calendar_user.getShiftId();
					
					if("0".equals(dayType)) {
						shiftId = "";
					}
					Map<String,Integer> shiftCountMap = calendarShiftCountMap.get(calendarDate);
					if(shiftCountMap == null) {
						shiftCountMap = new HashMap<>();
						calendarShiftCountMap.put(calendarDate, shiftCountMap);
					}
					Integer count = shiftCountMap.get(shiftId);
					if(count == null) {
						count = 0;
					}
					count++;
					shiftCountMap.put(shiftId, count);
				}
			}
			
			
			if(workCalendars != null && workCalendars.size() > 0) {
				for(Work_calendar work_calendar : workCalendars) {
					Date calendarDate = work_calendar.getCalendarDate();
					String dayType = work_calendar.getDayType();
					
					if("1".equals(dayType)) {
						Map<String,Integer> shiftCountMap = calendarShiftCountMap.get(calendarDate);
						String workShifts_str = work_calendar.getWorkShifts();
						Integer minDayUserNum = 0;
						boolean satisfyFlag = false;
						if(!StringUtil.isNull(workShifts_str)) {
							JSONArray workShifts = JSONArray.parseArray(workShifts_str);
							for (int i = 0; i < workShifts.size(); i++) {
								JSONObject workShift = workShifts.getJSONObject(i);
								String shiftId = workShift.getString("shiftId");
								TeamShift shift = teamShiftMap.get(shiftId);
								Integer minUserNum = null;
								Integer maxUserNum = null;
								if(shift != null) {
									String minUserNum_ = shift.getMinUserNum();
									String maxUserNum_ = shift.getMaxUserNum();
									if(!StringUtil.isNull(minUserNum_)) {
										minUserNum = Integer.valueOf(minUserNum_);
									}
									if(!StringUtil.isNull(maxUserNum_)) {
										maxUserNum = Integer.valueOf(maxUserNum_);
									}
								}
								if(minUserNum == null) {
									minUserNum = 1;
								}
								if(maxUserNum == null) {
									maxUserNum = teamUserCount;
								}
								minDayUserNum += minUserNum;
								Integer userNum = 0;
								if(shiftCountMap != null) {
									userNum = shiftCountMap.get(shiftId);
								}
								if(userNum == null) {
									userNum = 0;
								}
								if(userNum >= minUserNum && userNum <= maxUserNum) {
									satisfyFlag = true;
								}
							}
						}
						Integer restUserCount = teamUserCount - minDayUserNum;
						Integer userNum = 0;
						if(shiftCountMap != null) {
							userNum = shiftCountMap.get("");
						}
						if(userNum != null && userNum > restUserCount) {
							satisfyFlag = false;
						}
						
						if(!satisfyFlag) {
							contents.add(DateUtil.formatStr(DateUtil.sdf_Day, calendarDate));
						}
					}
				}
			}
		}
		String resultType = "1";
		if(contents.size() > 0) {
			resultType = "2";
		}
		JSONObject item = new JSONObject();
		item.put("resultType", resultType);
		item.put("calendarDates", contents);
		
		return JsonUtil.getSuccessRecordJson(item);
	}

	@Override
	public String queryScheduleStatForUser(JSONObject jsonObject) throws Exception {
		String userId = jsonObject.getString("userId");
		String scheduleId = jsonObject.getString("scheduleId");
		JSONArray contents = new JSONArray();
		Schedule schedule = scheduleMapper.selectByPrimaryKey(scheduleId);
		if(schedule == null) {
			return JsonUtil.getFailureResultJson("排班配置不存在！");
		}
//		String teamId = schedule.getTeamId();
		String dayNum_ = schedule.getDayNum();
		List<Work_calendar_user> work_calendar_users = work_calendar_userMapper.selectByScheduleId(scheduleId);
		//用户-班次-个数
		Map<String, Map<String, Integer>> userShiftCountMap = new HashMap<>();
		Map<String, Integer> userRestCountMap = new HashMap<>();
		List<String> shiftIdList = new ArrayList<>();
		List<String> userIdList = new ArrayList<>();
		if(work_calendar_users != null && work_calendar_users.size() > 0) {
			for(Work_calendar_user work_calendar_user : work_calendar_users) {
				String dayType = work_calendar_user.getDayType();
				String shiftId = work_calendar_user.getShiftId();
				String userId_ = work_calendar_user.getUserId();
				if("1".equals(dayType)) {
					if(!StringUtil.isNull(shiftId) && !shiftIdList.contains(shiftId)) {
						shiftIdList.add(shiftId);
					}
					Map<String, Integer> shiftCountMap = userShiftCountMap.get(userId_);
					if(shiftCountMap == null) {
						shiftCountMap = new HashMap<>();
						userShiftCountMap.put(userId_, shiftCountMap);
					}
					Integer count = shiftCountMap.get(shiftId);
					if(count == null) {
						count = 0;
					}
					count++;
					shiftCountMap.put(shiftId, count);
				} else {
					Integer count = userRestCountMap.get(userId_);
					if(count == null) {
						count = 0;
					}
					count++;
					userRestCountMap.put(userId_, count);
					
				}
				if(!userIdList.contains(userId_)) {
					userIdList.add(userId_);
				}
			}
		}
		Map<String, String> userNameMap = userService.queryUserByUserIdList(userIdList);
		Map<String, TeamShift> teamShiftMap = teamShiftService.queryShiftShortNameMap(shiftIdList);
		Map<Integer, JSONObject> contentsMap = new LinkedHashMap<>();
		setItems(contentsMap, 0, null);
		Map<String, Boolean> userShiftFlagMap = new HashMap<>();
		for(String userId_ : userShiftCountMap.keySet()) {
			String userName = userNameMap.get(userId_);
			setItems(contentsMap, 0, userName);
			Map<String, Integer> shiftCountMap = userShiftCountMap.get(userId_);
			Integer mark = 1;
			long minutes = 0;
			for(String shiftId : teamShiftMap.keySet()) {
				TeamShift teamShift = teamShiftMap.get(shiftId);
				String shiftName = "";
				Integer shiftCount = shiftCountMap.get(shiftId);
				String shiftCount_str = "";
				if(shiftCount != null) {
					shiftCount_str = shiftCount + "";
				}
				if(teamShift != null) {
					shiftName = teamShift.getShortName();
					if(!StringUtil.isNull(shiftCount_str)) {
						String startTime_ = teamShift.getStartTime();
						String endTime_ = teamShift.getEndTime();
						if(!StringUtil.isNull(startTime_) && !StringUtil.isNull(endTime_)) {
							Date startTime = DateUtil.parseDate(DateUtil.sdf_Day, "2017-01-01 " + startTime_ + ":00");
							Date endTime = DateUtil.parseDate(DateUtil.sdf_Day, "2017-01-01 " + endTime_ + ":00");
							if(startTime.getTime() > endTime.getTime()) {
								Calendar calendar = Calendar.getInstance();
								calendar.setTime(endTime);
								calendar.add(Calendar.DAY_OF_YEAR, 1);
								endTime = calendar.getTime();
							}
							long sub = endTime.getTime() - startTime.getTime();
							long minute = sub / (1000 * 60l);
							minute++; //加一分钟
							minute = shiftCount * minute;
							minutes += minute;
						}
					}
				}
				Boolean shiftNameFlag = userShiftFlagMap.get(userId_);
				if(shiftNameFlag == null) {
					setItems(contentsMap, mark, shiftName);
					userShiftFlagMap.put(userId_, true);
				}
				setItems(contentsMap, mark, shiftCount_str);
				mark++;
			}
			//每个人的总工作时长(小时)
			Double dayNum = Double.valueOf(dayNum_);
			Double perDayMinutes = minutes / dayNum;
			Double perDayHours = perDayMinutes / 60;
			long perDayHour = Math.round(perDayHours);
			
			long perWeekHour = perDayHour * 7;
			Boolean shiftNameFlag = userShiftFlagMap.get("平均每周工作时长");
			if(shiftNameFlag == null) {
				setItems(contentsMap, mark, "平均每周工作时长");
				userShiftFlagMap.put("平均每周工作时长", true);
			}
			setItems(contentsMap, mark, perWeekHour + "");
			mark++;
			shiftNameFlag = userShiftFlagMap.get("平均每天工作时长");
			if(shiftNameFlag == null) {
				setItems(contentsMap, mark, "平均每天工作时长");
				userShiftFlagMap.put("平均每天工作时长", true);
			}
			setItems(contentsMap, mark, perDayHour + "");
		}
		contents.add(contentsMap.values());
		return JsonUtil.getSuccessRecordsJson(contents, contents.size());
	}
	
	private void setItems(Map<Integer, JSONObject> contentsMap, Integer key, String value) {
		
		JSONObject columnInfo = contentsMap.get(key);
		if(columnInfo == null) {
			columnInfo = new JSONObject();
			contentsMap.put(key, columnInfo);
		}
		
		JSONArray columns = columnInfo.getJSONArray("columns");
		if(columns == null) {
			columns = new JSONArray();
			columnInfo.put("columns", columns);
		}
//		JSONObject item = new JSONObject();
		
		if(StringUtil.isNull(value)) {
			value = "";
		}
		columns.add(value);
	}

	@Override
	public String queryScheduleStatForDay(JSONObject jsonObject) throws Exception {
		String userId = jsonObject.getString("userId");
		String scheduleId = jsonObject.getString("scheduleId");
		JSONArray contents = new JSONArray();
		Schedule schedule = scheduleMapper.selectByPrimaryKey(scheduleId);
		if(schedule == null) {
			return JsonUtil.getFailureResultJson("排班配置不存在！");
		}
		List<Work_calendar_user> work_calendar_users = work_calendar_userMapper.selectByScheduleId(scheduleId);
		//时间-班次-人个数
		Map<Date, Map<String, Integer>> calendarDateShiftCountMap = new LinkedHashMap<>();
		List<String> shiftIdList = new ArrayList<>();
		if(work_calendar_users != null && work_calendar_users.size() > 0) {
			for(Work_calendar_user work_calendar_user : work_calendar_users) {
				String dayType = work_calendar_user.getDayType();
				String shiftId = work_calendar_user.getShiftId();
				Date calendarDate = work_calendar_user.getCalendarDate();
				if("1".equals(dayType)) {
					if(!StringUtil.isNull(shiftId) && !shiftIdList.contains(shiftId)) {
						shiftIdList.add(shiftId);
					}
					Map<String, Integer> shiftCountMap = calendarDateShiftCountMap.get(calendarDate);
					if(shiftCountMap == null) {
						shiftCountMap = new HashMap<>();
						calendarDateShiftCountMap.put(calendarDate, shiftCountMap);
					}
					Integer count = shiftCountMap.get(shiftId);
					if(count == null) {
						count = 0;
					}
					count++;
					shiftCountMap.put(shiftId, count);
				} 
			}
		}
		Map<String, TeamShift> teamShiftMap = teamShiftService.queryShiftShortNameMap(shiftIdList);
		Map<Integer, JSONObject> contentsMap = new LinkedHashMap<>();
		setItems(contentsMap, 0, null);
		Map<Date, Boolean> calendarDateShiftFlagMap = new HashMap<>();
		for(Date calendarDate : calendarDateShiftCountMap.keySet()) {
			setItems(contentsMap, 0, DateUtil.formatStr(DateUtil.sdfMonthDay, calendarDate));
			Map<String, Integer> shiftCountMap = calendarDateShiftCountMap.get(calendarDate);
			Integer mark = 1;
			for(String shiftId : teamShiftMap.keySet()) {
				TeamShift teamShift = teamShiftMap.get(shiftId);
				String shiftName = "";
				Integer shiftCount = shiftCountMap.get(shiftId);
				String shiftCount_str = "";
				if(shiftCount != null) {
					shiftCount_str = shiftCount + "";
				}
				if(teamShift != null) {
					shiftName = teamShift.getShortName();
				}
				Boolean shiftNameFlag = calendarDateShiftFlagMap.get(calendarDate);
				if(shiftNameFlag == null) {
					setItems(contentsMap, mark, shiftName);
					calendarDateShiftFlagMap.put(calendarDate, true);
				}
				setItems(contentsMap, mark, shiftCount_str);
				mark++;
			}
		}
		contents.add(contentsMap.values());
		return JsonUtil.getSuccessRecordsJson(contents, contents.size());
	}

	@Override
	public String effectSchedule(JSONObject jsonObject) throws Exception {
		String userId = jsonObject.getString("userId");
		String scheduleId = jsonObject.getString("scheduleId");
		JSONArray contents = new JSONArray();
		Schedule schedule = scheduleMapper.selectByPrimaryKey(scheduleId);
		if(schedule == null) {
			return JsonUtil.getFailureResultJson("排班配置不存在！");
		}
		return null;
	}

	@Override
	public String queryLastSchedule(JSONObject jsonObject) throws Exception {
		String userId = jsonObject.getString("userId");
		String teamId = jsonObject.getString("teamId");
		
		Schedule schedule = scheduleMapper.selectUpEffectiveByTeamId(teamId);
		if(schedule != null) {
			String scheduleId = schedule.getScheduleId();
			jsonObject.clear();
			jsonObject.put("userId", userId);
			jsonObject.put("scheduleId", scheduleId);
			String queryResult = queryScheduleById(jsonObject);
			JSONObject queryjson = JSONObject.parseObject(queryResult);
			if(Result.SUCCESS.equals(queryjson.getString(Result.RESULT))) {
				JSONObject item = queryjson.getJSONObject("Item");
				item.remove("scheduleId");
				queryResult = queryjson.toJSONString();
			}
			return queryResult;
			
		} else {
			return JsonUtil.getSuccessRecordJson(new JSONObject());
		}
	}
	
	

}
