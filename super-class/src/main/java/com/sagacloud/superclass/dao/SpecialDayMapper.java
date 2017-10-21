package com.sagacloud.superclass.dao;

import java.util.List;

import com.sagacloud.superclass.pojo.SpecialDay;

public interface SpecialDayMapper {
    int deleteByPrimaryKey(String specialDayId);

    int insert(SpecialDay record);

    int insertSelective(SpecialDay record);

    SpecialDay selectByPrimaryKey(String specialDayId);

    int updateByPrimaryKeySelective(SpecialDay record);

    int updateByPrimaryKey(SpecialDay record);
    
    /**
     * 功能描述：根据主键组查询数据
     * @param specialDayIds
     * @return
     */
    List<SpecialDay> selectByPrimaryKeys(List<String> specialDayIds);
    
    /**
     * 功能描述：根据团队id查询所有特殊日
     * @param teamId
     * @return
     */
    List<SpecialDay> selectByTeamId(String teamId);
    
    
}