package com.sagacloud.superclass.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import com.sagacloud.superclass.pojo.TeamShift;
import com.sagacloud.superclass.pojo.User;

public interface TeamShiftMapper {
    int deleteByPrimaryKey(String shiftId);

    int insert(TeamShift record);

    int insertSelective(TeamShift record);

    TeamShift selectByPrimaryKey(String shiftId);

    int updateByPrimaryKeySelective(TeamShift record);

    int updateByPrimaryKey(TeamShift record);
    
    /**
     * 功能描述：判断班次名称 或者班次简称，是否已经存在
     * @param shiftName
     * @param shortName
     * @return
     */
    Integer existShiftNameOrshortName(@Param("teamId") String teamId, @Param("shiftName") String shiftName, @Param("shortName") String shortName);
    
    /**
     * 功能描述：根据班次id组查询
     * @param shiftIdList
     * @return
     */
    List<TeamShift> selectByShiftIdList(List<String> shiftIdList);
    
}