package com.sagacloud.superclass.service.impl;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.sagacloud.superclass.common.JsonUtil;
import com.sagacloud.superclass.common.ToolsUtil;
import com.sagacloud.superclass.dao.TweetMapper;
import com.sagacloud.superclass.pojo.Tweet;
import com.sagacloud.superclass.service.TweetServiceI;

@Service("tweetService")
public class TweetServiceImpl implements TweetServiceI {
	@Autowired
	private TweetMapper tweetMapper;
	
	@Override
	public String addTweet(JSONObject jsonObject) {
		String userId = jsonObject.getString("userId");
		String pageNum = jsonObject.getString("pageNum");
		String content = jsonObject.getString("content");
		Tweet weet = new Tweet();
		weet.setTweetId(ToolsUtil.getUuid());
		weet.setPageNum(pageNum);
		weet.setUserId(userId);
		weet.setContent(content);
		weet.setCreateTime(new Date());
		int count = tweetMapper.insert(weet);
		if(count == 1) {
			return JsonUtil.getSuccessResultJson("添加成功!");
		} else {
			return JsonUtil.getFailureResultJson("添加失败!");
		}
	}

	@Override
	public String queryTweetList(JSONObject jsonObject) {
		String userId = jsonObject.getString("userId");
		String pageNum = jsonObject.getString("pageNum");
		String size_ = jsonObject.getString("size");
		Integer size = Integer.valueOf(size_);
		List<Tweet> tweets = tweetMapper.selectByPageNum(pageNum, size);
		JSONArray contents = new JSONArray();
		if(tweets != null && tweets.size() > 0) {
			for(Tweet tweet : tweets) {
				String userId_ = tweet.getUserId();
				String content_str = tweet.getContent();
				JSONObject content = new JSONObject();
				content.put("userId", userId);
				content.put("content", content_str);
				contents.add(content);
			}
		}
		
		return JsonUtil.getSuccessRecordsJson(contents, contents.size());
	}
	
}
