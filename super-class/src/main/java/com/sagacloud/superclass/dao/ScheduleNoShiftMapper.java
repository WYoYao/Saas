package com.sagacloud.superclass.dao;

import java.util.List;

import com.sagacloud.superclass.pojo.ScheduleNoShift;

public interface ScheduleNoShiftMapper {
    int deleteByPrimaryKey(String noShiftId);
    /**
     * 功能描述：根据排班配置id 删除记录
     * @param scheduleId
     * @return
     */
    int deleteByScheduleId(String scheduleId);

    int insert(ScheduleNoShift record);

    int insertSelective(ScheduleNoShift record);

    ScheduleNoShift selectByPrimaryKey(String noShiftId);

    int updateByPrimaryKeySelective(ScheduleNoShift record);

    int updateByPrimaryKey(ScheduleNoShift record);
    
    /**
     * 功能描述：根据排班配置id查询数据
     * @param scheduleId
     * @return
     */
    List<ScheduleNoShift> selectByScheduleId(String scheduleId);
    
    
}