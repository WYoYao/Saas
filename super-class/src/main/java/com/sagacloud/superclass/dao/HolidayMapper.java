package com.sagacloud.superclass.dao;

import java.util.List;

import com.sagacloud.superclass.pojo.Holiday;

public interface HolidayMapper {
    int deleteByPrimaryKey(String holidayId);

    int insert(Holiday record);

    int insertSelective(Holiday record);

    Holiday selectByPrimaryKey(String holidayId);

    int updateByPrimaryKeySelective(Holiday record);

    int updateByPrimaryKey(Holiday record);
    
    /**
     * 功能描述：获取所有信息
     * @return
     */
    List<Holiday> select();
    
}