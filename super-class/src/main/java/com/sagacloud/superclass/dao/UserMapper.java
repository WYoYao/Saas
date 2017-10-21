package com.sagacloud.superclass.dao;

import java.util.List;

import com.sagacloud.superclass.pojo.User;

public interface UserMapper {
    int deleteByPrimaryKey(String userId);

    int insert(User record);

    int insertSelective(User record);

    User selectByPrimaryKey(String userId);
    
    User selectByPhoneNum(String phoneNum);

    int updateByPrimaryKeySelective(User record);

    int updateByPrimaryKey(User record);
    
    /**
     * 功能描述：根据用户id组，查询用户信息
     * @param userIds
     * @return
     */
    List<User> selectInByIds(List<String> userIdList);
    
    
}