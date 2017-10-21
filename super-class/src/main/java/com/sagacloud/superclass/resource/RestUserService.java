package com.sagacloud.superclass.resource;

import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.springframework.beans.factory.annotation.Autowired;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.sagacloud.superclass.common.StringUtil;
import com.sagacloud.superclass.common.ToolsUtil;
import com.sagacloud.superclass.service.UserServiceI;

/**
 * 功能描述：用户登录
 * @author gezhanbin
 *
 */
@Path("/restUserService")
public class RestUserService {

	@Autowired
	private UserServiceI userService;
	/**
	 * @desc 个人登录：发送验证码
	 * @param jsonStr
	 * @return
	 * @throws Exception 
	 */
	
	@POST
	@Path("/smsSendCode")
	@Produces(MediaType.APPLICATION_JSON)
	public String smsSendCode(String jsonStr) throws Exception {
		JSONObject jsonObject = JSONObject.parseObject(jsonStr);
		if(StringUtil.isNull(jsonObject, "phoneNum")) {
			return ToolsUtil.return_error_json;
		}
		return userService.smsSendCode(jsonObject);
	}
	
	/**
	 *
	 * 功能描述：用户登录 
	 *
	 * @param jsonStr
	 * @return
	 * @throws Exception
	 * @创建者 wanghailong
	 * @邮箱 wanghailong@persagy.com 修改描述
	 */
	@Path("/userLogin")
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	public String userLogin(String jsonStr) throws Exception {

		JSONObject jsonObj = JSON.parseObject(jsonStr);
		String phoneNum = jsonObj.getString("phoneNum");
		String userPsw = jsonObj.getString("userPsw");
		if (!StringUtil.isNull(phoneNum, userPsw)) {
			// 返回结果
			return userService.userLogin(jsonObj);
		} else {
			return ToolsUtil.return_error_json;
		}

	}
	
	/**
	 *
	 * 功能描述：切换团队-记录用户最后一次所在的团队
	 *
	 * @param jsonStr
	 * @return
	 * @throws Exception
	 * @创建者 wanghailong
	 * @邮箱 wanghailong@persagy.com 修改描述
	 */
	@Path("/saveLastTeam")
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	public String saveLastTeam(String jsonStr) throws Exception {
		
		JSONObject jsonObject = JSON.parseObject(jsonStr);
		String userId = jsonObject.getString("userId");
		String lastTeamId = jsonObject.getString("lastTeamId");
		if (!StringUtil.isNull(userId, lastTeamId)) {
			// 返回结果
			return userService.saveLastTeam(jsonObject);
		} else {
			return ToolsUtil.return_error_json;
		}
		
	}
	
	/**
	 *
	 * 功能描述：个人中心-查询用户详细信息
	 *
	 * @param jsonStr
	 * @return
	 * @throws Exception
	 * @创建者 wanghailong
	 * @邮箱 wanghailong@persagy.com 修改描述
	 */
	@Path("/queryUserById")
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	public String queryUserById(String jsonStr) throws Exception {
		
		JSONObject jsonObject = JSON.parseObject(jsonStr);
		String userId = jsonObject.getString("userId");
		String queryUserId = jsonObject.getString("queryUserId");
		if (!StringUtil.isNull(userId, queryUserId)) {
			// 返回结果
			return userService.queryUserById(jsonObject);
		} else {
			return ToolsUtil.return_error_json;
		}
		
	}
	
	/**
	 *
	 * 功能描述：个人中心-修改用户信息
	 *
	 * @param jsonStr
	 * @return
	 * @throws Exception
	 * @创建者 wanghailong
	 * @邮箱 wanghailong@persagy.com 修改描述
	 */
	@Path("/updateUser")
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	public String updateUser(String jsonStr) throws Exception {
		
		JSONObject jsonObject = JSON.parseObject(jsonStr);
		String userId = jsonObject.getString("userId");
		if (!StringUtil.isNull(userId)) {
			// 返回结果
			return userService.updateUser(jsonObject);
		} else {
			return ToolsUtil.return_error_json;
		}
		
	}
	
	/**
	 *
	 * 功能描述：个人中心-修改用户手机号 
	 *
	 * @param jsonStr
	 * @return
	 * @throws Exception
	 * @创建者 wanghailong
	 * @邮箱 wanghailong@persagy.com 修改描述
	 */
	@Path("/updateUserPhoneNum")
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	public String updateUserPhoneNum(String jsonStr) throws Exception {

		JSONObject jsonObject = JSON.parseObject(jsonStr);
		if (!StringUtil.isNull(jsonObject,"userId", "phoneNum","userPsw")) {
			// 返回结果
			return userService.updateUserPhoneNum(jsonObject);
		} else {
			return ToolsUtil.return_error_json;
		}

	}
	
}
