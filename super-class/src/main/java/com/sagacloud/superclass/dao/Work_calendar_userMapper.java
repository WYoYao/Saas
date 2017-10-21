package com.sagacloud.superclass.dao;

import java.util.Date;
import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.sagacloud.superclass.pojo.Work_calendar_user;

public interface Work_calendar_userMapper {
    int deleteByPrimaryKey(String workCalUserId);
    /**
     * 功能描述：根据排班配置id 删除记录
     * @param scheduleId
     * @return
     */
    int deleteByScheduleId(String scheduleId);
    
    /**
     * 功能描述：取消某个班次
     * @param teamId
     * @param scheduleId
     * @param calendarDate
     * @param userId
     * @param dayType
     * @param shiftId
     * @return
     */
    int cancelShif(@Param("teamId") String teamId, @Param("scheduleId") String scheduleId,
    		@Param("calendarDate") Date calendarDate, @Param("userId") String userId, 
    		@Param("dayType") String dayType, @Param("shiftId") String shiftId);
    
    
    int insert(Work_calendar_user record);

    int insertSelective(Work_calendar_user record);

    Work_calendar_user selectByPrimaryKey(String workCalUserId);

    int updateByPrimaryKeySelective(Work_calendar_user record);

    int updateByPrimaryKey(Work_calendar_user record);
    
    /**
     * 功能描述：查询指定人某月的工作日历
     * @param teamId
     * @param userId
     * @param startTime
     * @param endTime
     * @return
     */
    List<Work_calendar_user> selectByUserIdMonth(
    		@Param("teamId") String teamId, 
    		@Param("userId") String userId,
    		@Param("startTime") Date startTime, 
    		@Param("endTime") Date endTime);
    
    /**
     * 功能描述：查询某团队下某日的有效排班
     * @param teamId
     * @param calendarDate
     * @return
     */
    List<Work_calendar_user> selectEffectiveByTeamIdCalendarDate(@Param("teamId") String teamId, @Param("calendarDate") Date calendarDate);
    
    /**
     * 功能描述：查询某排班配置下某日的有效排班
     * @param teamId
     * @param calendarDate
     * @return
     */
    List<Work_calendar_user> selectEffectiveByScheduleIdCalendarDate(@Param("teamId") String teamId, @Param("calendarDate") Date calendarDate);
    
    /**
     * 功能描述：根据排班配置id查询数据
     * @param ScheduleId
     * @param userId
     * @return
     */
    List<Work_calendar_user> selectByScheduleId(String scheduleId);
    
    /**
     * 功能描述：查看某个排班配置下，某日，某个班次的人员数量
     * @param scheduleId
     * @param shiftId
     * @param calendarDate
     * @return
     */
    Integer selectCountByScheduleIdCalendarDateShiftId(@Param("scheduleId") String scheduleId,@Param("calendarDate") Date calendarDate, @Param("shiftId") String shiftId);
    
    /**
     * 功能描述：查看某个排班配置下，某日，休息的人数
     * @param scheduleId
     * @param shiftId
     * @param calendarDate
     * @return
     */
    Integer selectRestCountByScheduleIdCalendarDate(@Param("scheduleId") String scheduleId,@Param("calendarDate") Date calendarDate);
    
    
    
}