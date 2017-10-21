package com.sagacloud.superclass.service;

import com.alibaba.fastjson.JSONObject;

public interface TweetServiceI {

	/**
	 * 供能描述：吐槽-添加吐槽
	 * @param jsonObject
	 * @return
	 */
	public String addTweet(JSONObject jsonObject);
	
	/**
	 * 供能描述：吐槽-查询吐槽信息
	 * @param jsonObject
	 * @return
	 */
	public String queryTweetList(JSONObject jsonObject);
}
