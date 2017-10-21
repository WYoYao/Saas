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
import com.sagacloud.superclass.common.ToolsUtil;
import com.sagacloud.superclass.dao.HolidayMapper;
import com.sagacloud.superclass.dao.ScheduleMapper;
import com.sagacloud.superclass.dao.TeamMapper;
import com.sagacloud.superclass.dao.TeamShiftMapper;
import com.sagacloud.superclass.dao.TeamUserRelMapper;
import com.sagacloud.superclass.dao.UserMapper;
import com.sagacloud.superclass.dao.Work_calendarMapper;
import com.sagacloud.superclass.dao.Work_calendar_userMapper;
import com.sagacloud.superclass.pojo.Schedule;
import com.sagacloud.superclass.pojo.Team;
import com.sagacloud.superclass.pojo.TeamShift;
import com.sagacloud.superclass.pojo.Work_calendar;
import com.sagacloud.superclass.pojo.Work_calendar_user;
import com.sagacloud.superclass.service.DemandServiceI;
import com.sagacloud.superclass.service.HolidayServiceI;
import com.sagacloud.superclass.service.TeamShiftServiceI;
import com.sagacloud.superclass.service.UserServiceI;

/**
 * 功能描述：提要求
 * @author gezhanbin
 *
 */
@Service("demandService")
public class DemandServiceImpl implements DemandServiceI {
	@Autowired
	private TeamShiftServiceI teamShiftService;
	
	@Autowired
	private Work_calendarMapper work_calendarMapper;
	
	@Autowired
	private Work_calendar_userMapper work_calendar_userMapper;
	
	@Autowired
	private ScheduleMapper scheduleMapper;
	
	@Autowired
	private TeamUserRelMapper teamUserRelMapper;

	@Autowired
	private HolidayServiceI holidayService;
	
	@Autowired
	private UserServiceI userService;
	
	@Autowired
	private TeamShiftMapper teamShiftMapper;
	
	@Override
	public String queryWorkCalList(JSONObject jsonObject) {
		String userId = jsonObject.getString("userId");
		String scheduleId = jsonObject.getString("scheduleId");
		
		Schedule schedule = scheduleMapper.selectByPrimaryKey(scheduleId);
		JSONArray contents = new JSONArray();
		if(schedule != null) {
			String teamId = schedule.getTeamId();
			List<String> shiftIdList = new ArrayList<>();
			String isTurnShift = schedule.getIsTurnShift();
			if("1".equals(isTurnShift)) {
				String turnShifts_str = schedule.getTurnShifts();
				if(!StringUtil.isNull(turnShifts_str)) {
					JSONArray turnShifts = JSONArray.parseArray(turnShifts_str);
					for (int i = 0; i < turnShifts.size(); i++) {
						JSONObject turnShift = turnShifts.getJSONObject(i);
						String shiftId = turnShift.getString("shiftId");
						if(!StringUtil.isNull(shiftId) && !shiftIdList.contains(shiftId)) {
							shiftIdList.add(shiftId);
						}
					}
				}
			} else {
				String shifts_str = schedule.getShifts();
				if(!StringUtil.isNull(shifts_str)) {
					JSONArray shifts = JSONArray.parseArray(shifts_str);
					for (int i = 0; i < shifts.size(); i++) {
						JSONObject shift = shifts.getJSONObject(i);
						String shiftId = shift.getString("shiftId");
						if(!StringUtil.isNull(shiftId) && !shiftIdList.contains(shiftId)) {
							shiftIdList.add(shiftId);
						}
					}
				}
			}
			String isSpecialDayShift = schedule.getIsSpecialDayShift();
			if("1".equals(isSpecialDayShift)) {
				String specialDayIds_str = schedule.getSpecialDayIds();
				if(!StringUtil.isNull(specialDayIds_str)) {
					String[] specialDayIds = specialDayIds_str.split(",");
					for(String shiftId : specialDayIds) {
						if(!StringUtil.isNull(shiftId) && !shiftIdList.contains(shiftId)) {
							shiftIdList.add(shiftId);
						}
					}
				}
			}
			//查询排班
			Map<String, TeamShift> teamShiftMap = new HashMap<>();
			if(shiftIdList.size() > 0) {
				teamShiftMap = teamShiftService.queryShiftShortNameMap(shiftIdList);
			}
			//团队人数
			int teamUserCount = teamUserRelMapper.selectUserCountByTeamId(teamId);
			
			//各个日期下的各个班次的人员个数
			Map<Date, Map<String ,Integer>> calendarShiftCountMap = new HashMap<>();
			//当前人员日期--班次id
			Map<Date, String> currentUserCalendarShiftMap = new HashMap<>();
			//当前人员日期--日期类型  1-工作日，0-休假
			Map<Date, String> currentUserCalendarDayTypeMap = new HashMap<>();
			List<Work_calendar_user> workCalendarUsers = work_calendar_userMapper.selectByScheduleId(scheduleId);
			if(workCalendarUsers != null && workCalendarUsers.size() > 0) {
				for (Work_calendar_user work_calendar_user : workCalendarUsers) {
					Date calendarDate = work_calendar_user.getCalendarDate();
					String dayType = work_calendar_user.getDayType();
					String shiftId = work_calendar_user.getShiftId();
					String userId_ = work_calendar_user.getUserId();
					if("0".equals(dayType)) {
						shiftId = "";
					}
					if(userId.equals(userId_)) {
						currentUserCalendarShiftMap.put(calendarDate, shiftId);
						currentUserCalendarDayTypeMap.put(calendarDate, dayType);
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
			List<Work_calendar> workCalendars = work_calendarMapper.selectByScheduleId(scheduleId);
			if(workCalendars != null && workCalendars.size() > 0) {
				for(Work_calendar work_calendar : workCalendars) {
					Date calendarDate = work_calendar.getCalendarDate();
					String dayType = work_calendar.getDayType();
					//查询当前日期的日期类型、班次id、班次名称、班次人说上线
					//查询班次
					String shiftName = "";
					String shiftId = currentUserCalendarShiftMap.get(calendarDate);
//					Integer maxUserNum = null;
					if(!StringUtil.isNull(shiftId)) {
						TeamShift shift = teamShiftMap.get(shiftId);
						if(shift != null) {
							shiftName = shift.getShiftName();
//							String maxUserNum_ = shift.getMaxUserNum();
//							if(!StringUtil.isNull(maxUserNum_)) {
//								maxUserNum = Integer.valueOf(maxUserNum_);
//							}
						}
					}
//					if(maxUserNum == null) {
//						maxUserNum = teamUserCount;
//					}
					String dayType_ = currentUserCalendarDayTypeMap.get(calendarDate);
					if("0".equals(dayType_)) {
						shiftName = "休假";
					}
					Map<String, Integer> shiftCountMap = calendarShiftCountMap.get(calendarDate);
					Boolean isFull = false;
					if(shiftCountMap != null) {
						for(Map.Entry<String, Integer> entry : shiftCountMap.entrySet()) {
							String shiftId_ = entry.getKey();
							Integer count = entry.getValue();
							TeamShift shift = teamShiftMap.get(shiftId_);
							if(shift == null) {
								continue;
							}
							
							String maxUserNum_str = shift.getMaxUserNum();
							if(StringUtil.isNull(maxUserNum_str)) {
								continue;
							}
							Integer maxUserNum_ = Integer.valueOf(maxUserNum_str);
							if(count < maxUserNum_) {
								isFull = false;
								break;
							}
							
						}
					}
					
					JSONObject content = new JSONObject();
					content.put("scheduleId", scheduleId);
					content.put("calendarDate", DateUtil.formatStr(DateUtil.sdf_Day, calendarDate));
					content.put("dayType", dayType);
					if("0".equals(dayType)) {
						shiftName = "";
						isFull = null;
					}
					content.put("shiftName", shiftName);
					content.put("isFull", isFull);
					contents.add(content);
				}
			}
		}
		return JsonUtil.getSuccessRecordsJson(contents, contents.size());
	}

	@Override
	public String queryRemindByScheduleId(JSONObject jsonObject) {
//		String userId = jsonObject.getString("userId");
		String scheduleId = jsonObject.getString("scheduleId");
		Schedule schedule = scheduleMapper.selectByPrimaryKey(scheduleId);
		String remind = "";
		if(schedule != null) {
			Date startTime = schedule.getStartTime();
			Date endTime = schedule.getEndTime();
//			String dayNum_str = schedule.getDayNum();
			String isWeekendRest = schedule.getIsWeekendRest();
			String isHolidayRest = schedule.getIsHolidayRest();
			String minWorkDays_str = schedule.getMinWorkDays();
			String maxWeekendRestDays = schedule.getMaxWeekendRestDays();
			if(!StringUtil.isNull(minWorkDays_str)) {
				//排班周期内，您最多可以选择2天休息 ，其中可选周末休息1天
				Integer workdays = 0;
				if("1".equals(isWeekendRest) || "1".equals(isHolidayRest)) {
					if(startTime != null && endTime != null) {
						Map<Date, String> holidayMap = new HashMap<>();
						if("1".equals(isHolidayRest)) {
							holidayMap = holidayService.queryHolidayMap();
						}
						Calendar calendar = Calendar.getInstance();
						calendar.setTime(startTime);
						while(calendar.getTimeInMillis() <= endTime.getTime()) {
							Date calenderDate = calendar.getTime();
							boolean workFlag = true;
							if("1".equals(isWeekendRest)) {
								int weekday = calendar.get(Calendar.DAY_OF_WEEK);
								weekday--;
								if(weekday == 0) {
									weekday = 7;
								}
								if(weekday > 5) {
									//非工作日
									workFlag = false;
								}
							} 
							
							if("1".equals(isHolidayRest)) {
								String dayType = holidayMap.get(calenderDate);
								if("0".equals(dayType)) {
									workFlag = false;
								} else if("1".equals(dayType)) {
									workFlag = true;
								}
							}
							if(workFlag) {
								workdays++;
							}
						}
					}
				}
				Integer minWorkDays = Integer.valueOf(minWorkDays_str);
				int subDay = 0;
				if(workdays >= minWorkDays) {
					subDay = workdays - minWorkDays;
				}
				if(!StringUtil.isNull(maxWeekendRestDays)) {
					remind = "排班周期内，您最多可以选择" + subDay + "天休息 ，其中可选周末休息" + maxWeekendRestDays + "天";
				} else {
					remind = "排班周期内，您最多可以选择" + subDay + "天休息";
				}
			} else if(!StringUtil.isNull(maxWeekendRestDays)) {
				//排班周期内，其中可选周末休息1天
				remind = "排班周期内，其中可选周末休息" + maxWeekendRestDays + "天";
			}
		}
		JSONObject item = new JSONObject();
		item.put("remind", remind);
		
		return JsonUtil.getSuccessRecordJson(item);
	}

	@Override
	public String queryDayShiftList(JSONObject jsonObject) throws Exception {
//		String userId = jsonObject.getString("userId");
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
			String xiuxiUserNames = "";
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
				if(!StringUtil.isNull(maxUserNum)) {
					maxUserNum = teamUserCount + "";
				}
				if(!StringUtil.isNull(minUserNum_)) {
					minUserNum_ = "1";
				}
				Integer minUserNum = Integer.valueOf(minUserNum_);
				minCount += minUserNum;
				String userNames = "";
				Integer haveUserNum = 0;
				List<String> userIdList_ = shiftUserIdMap.get(shiftId);
				if(userIdList_ != null && userIdList_.size() > 0) {
					haveUserNum = userIdList_.size();
					for(String userId_ : userIdList_) {
						String userName = userNameMap.get(userId_);
						if(!StringUtil.isNull(userName)) {
							if("xiuxi".equals(shiftId)) {
								xiuxiUserNames = userName + ",";
							} else {
								userNames += userName + ",";
							}
						}
					}
					if(!"".equals(userNames)) {
						userNames = userNames.substring(0, userNames.length() - 1);
					}
				}
				if(!"xiuxi".equals(shiftId)) {
					JSONObject content = new JSONObject();
					content.put("scheduleId", scheduleId);
					content.put("calendarDate", calendarDate_str);
					content.put("shiftId", shiftId);
					content.put("shiftName", shiftName);
					content.put("userNames", userNames);
					content.put("haveUserNum", haveUserNum + "");
					content.put("maxUserNum", maxUserNum);
					contents.add(content);
					
				} else {
					xiuxiHaveUserNum = haveUserNum;
					if(!"".equals(xiuxiUserNames)) {
						xiuxiUserNames = xiuxiUserNames.substring(0, xiuxiUserNames.length() - 1);
					}
				}
			}
			
			xiuxiContent.put("userNames", xiuxiUserNames);
			xiuxiContent.put("haveUserNum", xiuxiHaveUserNum + "");
			Integer maxUserNum = teamUserCount - minCount;
			xiuxiContent.put("maxUserNum", maxUserNum + "");
			contents.add(xiuxiContent);
		}
		return JsonUtil.getSuccessRecordsJson(contents, contents.size());
	}

	@Override
	public String joinShif(JSONObject jsonObject) throws Exception {
		String userId = jsonObject.getString("userId");
		String teamId = jsonObject.getString("teamId");
		String scheduleId = jsonObject.getString("scheduleId");
		String calendarDate_str = jsonObject.getString("calendarDate");
		Date calendarDate = DateUtil.parseDate(DateUtil.sdf_Day, calendarDate_str);
		String shiftId = jsonObject.getString("shiftId");
		String resultType = "";
		if("xiuxi".equals(shiftId)) {
			//要验证是否超出可选休息天数，
			Work_calendar work_calendar = work_calendarMapper.selectByScheduleIdCalendarDate(scheduleId, calendarDate);
			if(work_calendar != null) {
				return JsonUtil.getFailureResultJson("该排班配置，该天数据不存在!");
			}
			//0、查询团队的人数
			Integer teamUserCount = teamUserRelMapper.selectUserCountByTeamId(teamId);
			//1、查询该天所有的班次的最小值
			String dayType = work_calendar.getDayType();
			String workShifts_str = work_calendar.getWorkShifts();
			if("0".equals(dayType)) {
				return JsonUtil.getFailureResultJson("所选天是公休日！");
			}
			JSONArray workShifts = JSONArray.parseArray(workShifts_str);
			List<String> shiftIdList = new ArrayList<>();
			for (int i = 0; i < workShifts.size(); i++) {
				JSONObject workShift = workShifts.getJSONObject(i);
				String shiftId_ = workShift.getString("shiftId");
				if(!shiftIdList.contains(shiftId_)) {
					shiftIdList.add(shiftId_);
				}
			}
			//2、每个班次的最大、最小人数
			Integer minNum = 0;
			Map<String, TeamShift> teamShiftMap = teamShiftService.queryShiftShortNameMap(shiftIdList);
			for(Map.Entry<String, TeamShift> entry : teamShiftMap.entrySet()) {
				TeamShift teamShift = entry.getValue();
				String minUserNum_str = teamShift.getMinUserNum();
				if(StringUtil.isNull(minUserNum_str)) {
					minUserNum_str = "1";
				}
				Integer minUserNum = Integer.valueOf(minUserNum_str);
				minNum += minUserNum;
			}
			Integer xiuxiMaxUserNum = teamUserCount - minNum;
			//2、查询该天已经报名的人员数量
			Integer count = work_calendar_userMapper.selectRestCountByScheduleIdCalendarDate(scheduleId, calendarDate);
			if(count >= xiuxiMaxUserNum) {
				resultType = "2";
			} else {
				Work_calendar_user work_calendar_user = new Work_calendar_user();
				work_calendar_user.setWorkCalUserId(ToolsUtil.getUuid());
				work_calendar_user.setTeamId(teamId);
				work_calendar_user.setScheduleId(scheduleId);
				work_calendar_user.setCalendarDate(calendarDate);
				work_calendar_user.setDayType("0");
				work_calendar_user.setUserId(userId);
				work_calendar_user.setFromType("1");
				work_calendar_user.setValid("0");
				work_calendar_user.setCreaterId(userId);
				Date date = new Date();
				work_calendar_user.setCreateTime(date);
				work_calendar_user.setUpdateTime(date);
				work_calendar_userMapper.insert(work_calendar_user);
				resultType = "3";
			}
			
		} else {
			//验证该班次人数是否已满
			TeamShift teamShift = teamShiftMapper.selectByPrimaryKey(shiftId);
			String maxUserNum_str = "";
			if(teamShift != null) {
				maxUserNum_str = teamShift.getMaxUserNum();
			}
			if(StringUtil.isNull(maxUserNum_str)) {
				Integer teamUserCount = teamUserRelMapper.selectUserCountByTeamId(teamId);
				maxUserNum_str = teamUserCount + "";
			}
			Integer maxUserNum = Integer.valueOf(maxUserNum_str);
			//判断改班次已有多少人报名
			Integer count = work_calendar_userMapper.selectCountByScheduleIdCalendarDateShiftId(scheduleId,calendarDate, shiftId);
			if(count >= maxUserNum) {
				resultType = "3";
			} else {
				Work_calendar_user work_calendar_user = new Work_calendar_user();
				work_calendar_user.setWorkCalUserId(ToolsUtil.getUuid());
				work_calendar_user.setTeamId(teamId);
				work_calendar_user.setScheduleId(scheduleId);
				work_calendar_user.setCalendarDate(calendarDate);
				work_calendar_user.setDayType("1");
				work_calendar_user.setShiftId(shiftId);
				work_calendar_user.setUserId(userId);
				work_calendar_user.setFromType("1");
				work_calendar_user.setValid("0");
				work_calendar_user.setCreaterId(userId);
				Date date = new Date();
				work_calendar_user.setCreateTime(date);
				work_calendar_user.setUpdateTime(date);
				work_calendar_userMapper.insert(work_calendar_user);
				resultType = "3";
			}
		}
		JSONObject item = new JSONObject();
		item.put("resultType", resultType);
		return JsonUtil.getSuccessRecordJson(item);
	}

	@Override
	public String cancelShif(JSONObject jsonObject) throws Exception {
		String userId = jsonObject.getString("userId");
		String teamId = jsonObject.getString("teamId");
		String scheduleId = jsonObject.getString("scheduleId");
		String calendarDate_str = jsonObject.getString("calendarDate");
		Date calendarDate = DateUtil.parseDate(DateUtil.sdf_Day, calendarDate_str);
		String shiftId = jsonObject.getString("shiftId");
		int count = 0;
		if("xiuxi".equals(shiftId)) {
			//"休息"时是删除day_type值为0的数据
			count = work_calendar_userMapper.cancelShif(teamId, scheduleId, calendarDate, userId, "0", null);
		} else {
			//删除表中满足条件的数据
			count = work_calendar_userMapper.cancelShif(teamId, scheduleId, calendarDate, userId, null, shiftId);
		}
		if(count == 1) {
			return JsonUtil.getSuccessResultJson("取消成功！");
		} else {
			return JsonUtil.getFailureResultJson("取消失败！");
		}
	}

}
