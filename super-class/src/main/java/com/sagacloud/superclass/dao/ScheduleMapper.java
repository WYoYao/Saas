package com.sagacloud.superclass.dao;

import java.util.List;

import com.sagacloud.superclass.pojo.Schedule;

public interface ScheduleMapper {
    int deleteByPrimaryKey(String scheduleId);

    int insert(Schedule record);

    int insertSelective(Schedule record);

    Schedule selectByPrimaryKey(String scheduleId);

    int updateByPrimaryKeySelective(Schedule record);

    int updateByPrimaryKey(Schedule record);
    
    /**
     * 功能描述：获取该团队下上次生效的排班信息
     * @param teamId
     * @return
     */
    Schedule selectUpEffectiveByTeamId(String teamId);
    
    /**
     * 功能描述：获取该团队下未生效的所有排班表
     * @param teamId
     * @return
     */
    List<Schedule> selectUnEffectiveByTeamId(String teamId);
    
}