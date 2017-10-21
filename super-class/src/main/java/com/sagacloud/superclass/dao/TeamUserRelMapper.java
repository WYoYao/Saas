package com.sagacloud.superclass.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import com.sagacloud.superclass.pojo.TeamUserRel;

public interface TeamUserRelMapper {
    int deleteByPrimaryKey(String teamUserId);
    
    /**
     * 功能描述：根据团队id,用户id删除记录
     * @param teamId
     * @param userId
     * @return
     */
    int deleteByUserTeamId(@Param("teamId") String teamId,@Param("userId") String userId);
  
    /**
     * 功能描述：根据团队id删除记录
     * @param teamId
     * @param userId
     * @return
     */
    int deleteByTeamId(String teamId);

    int insert(TeamUserRel record);

    int insertSelective(TeamUserRel record);

    TeamUserRel selectByPrimaryKey(String teamUserId);

    int updateByPrimaryKeySelective(TeamUserRel record);

    int updateByPrimaryKey(TeamUserRel record);
    
    /**
     * 功能描述：根据用户id查询
     * @param userId
     * @return
     */
    List<TeamUserRel> selectByUserId(String userId); 
    
    /**
     * 功能描述：根据团队id查询该团队人数
     * @param teamId
     * @return
     */
    Integer selectUserCountByTeamId(String teamId);
    
    /**
     * 功能描述：根据团队集合，查询各自团队的人员数量
     * @param teamIdSet
     * @return
     */
    List<Map<String, Object>> selectUserCountMapByTeamIds(List<String> teamIdList);
    
    /**
     * 功能描述：根据团队id 查询团队人员信息
     * @param teamId
     * @return
     */
    List<TeamUserRel> selectUserByTeamIds(String teamId);
    
    
}