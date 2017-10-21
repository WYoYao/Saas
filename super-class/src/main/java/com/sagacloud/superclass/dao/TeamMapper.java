package com.sagacloud.superclass.dao;

import com.sagacloud.superclass.pojo.Team;

public interface TeamMapper {
    int deleteByPrimaryKey(String teamId);

    int insert(Team record);

    int insertSelective(Team record);

    Team selectByPrimaryKey(String teamId);

    int updateByPrimaryKeySelective(Team record);

    int updateByPrimaryKey(Team record);
    
    Integer selectMaxTeamNum();
    
    /**
     * 功能描述：根据团队编号查询
     * @param teamNum
     * @return
     */
    Team selectByTeamNum(String teamNum);
    
}