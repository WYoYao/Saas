package com.sagacloud.superclass.dao;

import java.util.List;

import com.sagacloud.superclass.pojo.Schedule_join_user;

public interface Schedule_join_userMapper {
    int deleteByPrimaryKey(String joinUserId);
    /**
     * 功能描述：根据排班配置id 删除记录
     * @param scheduleId
     * @return
     */
    int deleteByScheduleId(String scheduleId);
    
    int insert(Schedule_join_user record);

    int insertSelective(Schedule_join_user record);

    Schedule_join_user selectByPrimaryKey(String joinUserId);

    int updateByPrimaryKeySelective(Schedule_join_user record);

    int updateByPrimaryKey(Schedule_join_user record);
    
    /**
     * 功能描述：根据排版配置
     * @param scheduleId
     * @return
     */
    List<Schedule_join_user> selectByScheduleId(String scheduleId);
}