package com.sagacloud.superclass.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.sagacloud.superclass.pojo.Tweet;

public interface TweetMapper {
    int deleteByPrimaryKey(String tweetId);

    int insert(Tweet record);

    int insertSelective(Tweet record);

    Tweet selectByPrimaryKey(String tweetId);

    int updateByPrimaryKeySelective(Tweet record);

    int updateByPrimaryKey(Tweet record);
    
    /**
     * 功能描述：根据页面编号查询吐槽信息
     * @param pageNum
     * @param size
     * @return
     */
    List<Tweet> selectByPageNum(@Param("pageNum") String pageNum, @Param("size") Integer size);
    
    
}