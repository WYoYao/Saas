package com.sagacloud.superclass.dao;

import java.util.List;

import com.sagacloud.superclass.pojo.ScheduleNoWeeks;

public interface ScheduleNoWeeksMapper {
    int deleteByPrimaryKey(String noWeeksId);
    /**
     * 功能描述：根据排班配置id 删除记录
     * @param scheduleId
     * @return
     */
    int deleteByScheduleId(String scheduleId);
    
    int insert(ScheduleNoWeeks record);

    int insertSelective(ScheduleNoWeeks record);

    ScheduleNoWeeks selectByPrimaryKey(String noWeeksId);

    int updateByPrimaryKeySelective(ScheduleNoWeeks record);

    int updateByPrimaryKey(ScheduleNoWeeks record);
    
    /**
     * 功能描述：根据排班配置id查询数据
     * @param scheduleId
     * @return
     */
    List<ScheduleNoWeeks> selectByScheduleId(String scheduleId);
    
}