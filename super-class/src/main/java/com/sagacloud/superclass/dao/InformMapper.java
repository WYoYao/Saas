package com.sagacloud.superclass.dao;

import com.sagacloud.superclass.pojo.Inform;

public interface InformMapper {
    int deleteByPrimaryKey(String informId);

    int insert(Inform record);

    int insertSelective(Inform record);

    Inform selectByPrimaryKey(String informId);

    int updateByPrimaryKeySelective(Inform record);

    int updateByPrimaryKey(Inform record);
}