package com.sagacloud.superclass.dao;

import java.util.Date;
import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.sagacloud.superclass.pojo.Work_calendar;

public interface Work_calendarMapper {
    int deleteByPrimaryKey(String workCalId);
    /**
     * 功能描述：根据排班配置id 删除记录
     * @param scheduleId
     * @return
     */
    int deleteByScheduleId(String scheduleId);
    
    /**
     * 功能描述：根据排版配置与时间删除数据
     * @param scheduleId
     * @param calendarDate
     * @return
     */
    int deleteByScheduleIdCalendarDate(@Param("scheduleId") String scheduleId, @Param("calendarDate") Date calendarDate);
    
    int insert(Work_calendar record);

    int insertSelective(Work_calendar record);

    Work_calendar selectByPrimaryKey(String workCalId);

    int updateByPrimaryKeySelective(Work_calendar record);

    int updateByPrimaryKey(Work_calendar record);
    
    /**
     * 功能描述：根据排班配置id，获取数据
     * @param scheduleId
     * @return
     */
    List<Work_calendar> selectByScheduleId(String scheduleId);
    
    /**
     * 功能描述：根据排班配置id，日期 获取数据
     * @param scheduleId
     * @return
     */
    Work_calendar selectByScheduleIdCalendarDate(@Param("scheduleId") String scheduleId, @Param("calendarDate") Date calendarDate);
    
    
}