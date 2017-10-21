package com.sagacloud.superclass.dao;

import com.sagacloud.superclass.pojo.Operate_log;

public interface Operate_logMapper {
    int deleteByPrimaryKey(String logId);

    int insert(Operate_log record);

    int insertSelective(Operate_log record);

    Operate_log selectByPrimaryKey(String logId);

    int updateByPrimaryKeySelective(Operate_log record);

    int updateByPrimaryKey(Operate_log record);
}