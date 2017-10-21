/**
 * @包名称 com.sagacloud.superclass.resource
 * @文件名 RestTeamService.java
 * @创建者 wanghailong
 * @邮箱 wanghailong@persagy.com  
 * @修改描述 
 */

package com.sagacloud.superclass.resource;

import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.springframework.beans.factory.annotation.Autowired;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.sagacloud.superclass.common.JsonUtil;
import com.sagacloud.superclass.common.StringUtil;
import com.sagacloud.superclass.common.ToolsUtil;
import com.sagacloud.superclass.pojo.Team;
import com.sagacloud.superclass.service.TeamServiceI;

/** 
 * 功能描述： 团队服务类型
 * @类型名称 RestTeamService
 * @创建者 gezhanbin
 * @修改描述 
 */
@Path("/restTeamService")
public class RestTeamService {
	
	@Autowired
	private TeamServiceI teamService;
	
	/**
	 * 
	 * 功能描述：创建团队
	 * @param jsonStr
	 * @return
	 * @throws Exception 
	 * 修改描述
	 */
    @Path("/addTeam")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public String addTeam(String jsonStr) throws Exception {
    	JSONObject jsonObject = JSONObject.parseObject(jsonStr);
    	if(StringUtil.isNull(jsonObject, "userId","teamName")) {
    		return ToolsUtil.return_error_json;
    	}
    	return teamService.insertRecord(jsonObject);
    }
    
	/**
	 * 
	 * 功能描述：查询团队详细信息
	 * @param jsonStr
	 * @return
	 * @throws Exception 
	 * @创建者 wanghailong
	 * @邮箱 wanghailong@persagy.com 
	 * 修改描述
	 */
    @Path("/queryTeamById")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public String queryTeamById(String jsonStr) throws Exception {
		JSONObject jsonObject = JSONObject.parseObject(jsonStr);
		if(StringUtil.isNull(jsonObject, "userId","teamId")) {
			return ToolsUtil.return_error_json;
		}
		return teamService.queryTeamById(jsonObject);
    }
    
    
    /**
	 * 
	 * 功能描述：团队管理-验证团队编号
	 * @param jsonStr
	 * @return
	 * @throws Exception 
	 * 修改描述
	 */
    @Path("/verifyTeamNumExist")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public String verifyTeamNumExist(String jsonStr) throws Exception {
    	JSONObject jsonObject = JSONObject.parseObject(jsonStr);
    	if(StringUtil.isNull(jsonObject, "userId","teamNum")) {
    		return ToolsUtil.return_error_json;
    	}
    	return teamService.verifyTeamNumExist(jsonObject);
    }
    
    /**
     * 
     * 功能描述：团队管理-加入团队
     * @param jsonStr
     * @return
     * @throws Exception 
     * 修改描述
     */
    @Path("/joinTeam")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public String joinTeam(String jsonStr) throws Exception {
    	JSONObject jsonObject = JSONObject.parseObject(jsonStr);
    	if(StringUtil.isNull(jsonObject, "userId","teamNum")) {
    		return ToolsUtil.return_error_json;
    	}
    	return teamService.joinTeam(jsonObject);
    }
    
    /**
     * 
     * 功能描述：团队管理-加入团队
     * @param jsonStr
     * @return
     * @throws Exception 
     * 修改描述
     */
    @Path("/queryUserTeamList")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public String queryUserTeamList(String jsonStr) throws Exception {
    	JSONObject jsonObject = JSONObject.parseObject(jsonStr);
    	if(StringUtil.isNull(jsonObject, "userId")) {
    		return ToolsUtil.return_error_json;
    	}
    	return teamService.queryUserTeamList(jsonObject);
    }
    
    /**
     * 
     * 功能描述：团队管理-查询团队成员列表
     * @param jsonStr
     * @return
     * @throws Exception 
     * 修改描述
     */
    @Path("/queryTeamUserList")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public String queryTeamUserList(String jsonStr) throws Exception {
    	JSONObject jsonObject = JSONObject.parseObject(jsonStr);
    	if(StringUtil.isNull(jsonObject, "userId","teamId")) {
    		return ToolsUtil.return_error_json;
    	}
    	return teamService.queryTeamUserList(jsonObject);
    }
    
    /**
     * 
     * 功能描述：团队管理-删除团队成员
     * @param jsonStr
     * @return
     * @throws Exception 
     * 修改描述
     */
    @Path("/removeTeamUser")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public String removeTeamUser(String jsonStr) throws Exception {
    	JSONObject jsonObject = JSONObject.parseObject(jsonStr);
    	if(StringUtil.isNull(jsonObject, "userId","teamId","removeUserId")) {
    		return ToolsUtil.return_error_json;
    	}
    	return teamService.removeTeamUser(jsonObject);
    }
    
    /**
     * 
     * 功能描述：团队管理-修改团队名称
     * @param jsonStr
     * @return
     * @throws Exception 
     * 修改描述
     */
    @Path("/updateTeamName")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public String updateTeamName(String jsonStr) throws Exception {
    	JSONObject jsonObject = JSONObject.parseObject(jsonStr);
    	if(StringUtil.isNull(jsonObject, "userId","teamId","teamName")) {
    		return ToolsUtil.return_error_json;
    	}
    	return teamService.updateTeamName(jsonObject);
    }
    
    /**
     * 
     * 功能描述：团队管理-解散团队
     * @param jsonStr
     * @return
     * @throws Exception 
     * 修改描述
     */
    @Path("/invalidTeam")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public String invalidTeam(String jsonStr) throws Exception {
    	JSONObject jsonObject = JSONObject.parseObject(jsonStr);
    	if(StringUtil.isNull(jsonObject, "userId","teamId")) {
    		return ToolsUtil.return_error_json;
    	}
    	return teamService.invalidTeam(jsonObject);
    }
    

}
