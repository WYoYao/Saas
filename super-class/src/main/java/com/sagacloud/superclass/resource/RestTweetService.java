package com.sagacloud.superclass.resource;

import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.springframework.beans.factory.annotation.Autowired;

import com.alibaba.fastjson.JSONObject;
import com.sagacloud.superclass.common.StringUtil;
import com.sagacloud.superclass.common.ToolsUtil;
import com.sagacloud.superclass.service.TweetServiceI;

/**
 * 功能描述：吐槽
 * @author gezhanbin
 *
 */
@Path("/restTweetService")
public class RestTweetService {

	@Autowired
	private TweetServiceI tweetService;
	
	  
    /**
     * 
     * 功能描述：吐槽-添加吐槽
     * @param jsonStr
     * @return
     * 修改描述
     */
    @POST
    @Path("/addTweet")
    @Produces(MediaType.APPLICATION_JSON)
    public String addTweet(String jsonStr) {
    	JSONObject jsonObject = JSONObject.parseObject(jsonStr);
    	if(StringUtil.isNull(jsonObject, "userId","pageNum","content")) {
    		return ToolsUtil.return_error_json;
    	}
    	return tweetService.addTweet(jsonObject);
    }
    
    /**
     * 
     * 功能描述：吐槽-查询吐槽信息
     * @param jsonStr
     * @return
     * 修改描述
     */
    @POST
    @Path("/queryTweetList")
    @Produces(MediaType.APPLICATION_JSON)
    public String queryTweetList(String jsonStr) {
    	JSONObject jsonObject = JSONObject.parseObject(jsonStr);
    	if(StringUtil.isNull(jsonObject, "userId","pageNum","size")) {
    		return ToolsUtil.return_error_json;
    	}
    	return tweetService.queryTweetList(jsonObject);
    }
	
	
	
	
}
