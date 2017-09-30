package com.sagacloud.saas.resource;

import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.springframework.beans.factory.annotation.Autowired;

import com.alibaba.fastjson.JSONObject;
import com.sagacloud.saas.common.StringUtil;
import com.sagacloud.saas.common.ToolsUtil;
import com.sagacloud.saas.service.UserServiceI;

/**
 * @desc 用户登录
 * @author gezhanbin
 *
 */
@Path("/restUserService")
public class RestUserService {

	@Autowired
	private UserServiceI userService;
	
	/**
	 * @desc 企业用户登录
	 * @param jsonStr
	 * @return
	 * @throws Exception 
	 */
	
	@POST
	@Path("/companyLogin")
	@Produces(MediaType.APPLICATION_JSON)
	public String companyLogin(String jsonStr) throws Exception {
		JSONObject jsonObject = JSONObject.parseObject(jsonStr);
		if(StringUtil.isNull(jsonObject, "user_name","user_psw")) {
			return ToolsUtil.return_error_json;
		}
		return userService.companyLogin(jsonObject);
	}
	
	/**
	 * @desc 用户退出登录
	 * @param jsonStr
	 * @return
	 */
	
	@POST
	@Path("/logout")
	@Produces(MediaType.APPLICATION_JSON)
	public String logout(String jsonStr){
		JSONObject jsonObject = JSONObject.parseObject(jsonStr);
		String user_id = jsonObject.getString("user_id");
		if(StringUtil.isNull(user_id)) {
			return ToolsUtil.return_error_json;
		}
		return userService.logout(user_id);
	}
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
		if(StringUtil.isNull(jsonObject, "phone_num")) {
			return ToolsUtil.return_error_json;
		}
		return userService.smsSendCode(jsonObject);
	}
	/**
	 * @desc 个人登录
	 * @param jsonStr
	 * @return
	 * @throws Exception 
	 */
	
	@POST
	@Path("/personLogin")
	@Produces(MediaType.APPLICATION_JSON)
	public String personLogin(String jsonStr) throws Exception {
		JSONObject jsonObject = JSONObject.parseObject(jsonStr);
		if(StringUtil.isNull(jsonObject, "user_name","user_psw")) {
			return ToolsUtil.return_error_json;
		}
		return userService.personLogin(jsonObject);
	}
	
	/**
	 * @desc 切换项目-记录用户最后一次所在的项目
	 * @param jsonStr
	 * @return
	 * @throws Exception 
	 */
	
	@POST
	@Path("/savePersonUseProject")
	@Produces(MediaType.APPLICATION_JSON)
	public String savePersonUseProject(String jsonStr) throws Exception {
		JSONObject jsonObject = JSONObject.parseObject(jsonStr);
		if(StringUtil.isNull(jsonObject, "user_id","project_id")) {
			return ToolsUtil.return_error_json;
		}
		return userService.savePersonUseProject(jsonObject);
	}
	
	/**
	 * 保存用户使用的工单输入方式
	 * @param jsonStr
	 * @return
	 * @throws Exception
	 */
	@POST
	@Path("saveUserWoInputMode")
	@Produces(MediaType.APPLICATION_JSON)
	public String saveUserWoInputMode(String jsonStr) throws Exception{
		JSONObject jsonObject = JSONObject.parseObject(jsonStr);
		if(StringUtil.isNull(jsonObject, "user_id", "input_mode")){
			return ToolsUtil.return_error_json;
		}
		return userService.saveUserWoInputMode(jsonObject);
	}
	
	/**
	 * 个人登录-根据Id编辑人员信息
	 * @param jsonStr
	 * @return
	 * @throws Exception
	 */
	@POST
	@Path("updatePersonById")
	@Produces(MediaType.APPLICATION_JSON)
	public String updatePersonById(String jsonStr) throws Exception{
		JSONObject jsonObject = JSONObject.parseObject(jsonStr);
		if(StringUtil.isNull(jsonObject, "user_id", "person_id")){
			return ToolsUtil.return_error_json;
		}
		return userService.updatePersonById(jsonObject);
	}
	
	
}
