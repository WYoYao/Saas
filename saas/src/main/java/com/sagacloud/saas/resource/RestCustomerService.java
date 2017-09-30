package com.sagacloud.saas.resource;

import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.springframework.beans.factory.annotation.Autowired;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.sagacloud.saas.common.StringUtil;
import com.sagacloud.saas.common.ToolsUtil;
import com.sagacloud.saas.service.CustomerServiceI;

/**
 * @desc 账户管理
 * @author gezhanbin
 *
 */
@Path("/restCustomerService")
public class RestCustomerService {

	@Autowired
	private CustomerServiceI customerService;
	
	/**
	 * @desc 账户管理-根据Id查询客户基本信息
	 * @param jsonStr
	 * @return
	 */
	
	@POST
	@Path("/queryCustomerById")
	@Produces(MediaType.APPLICATION_JSON)
	public String queryCustomerById(String jsonStr) {
		JSONObject jsonObject = JSONObject.parseObject(jsonStr);
		if(StringUtil.isNull(jsonObject, "user_id","customer_id")) {
			return ToolsUtil.return_error_json;
		}
		return customerService.queryCustomerById(jsonObject);
	} 
	
	/**
	 * @desc 账户管理-修改密码:验证原密码是否正确
	 * @param jsonStr
	 * @return
	 * @throws Exception 
	 */
	
	@POST
	@Path("/verifyCustomerPasswd")
	@Produces(MediaType.APPLICATION_JSON)
	public String verifyCustomerPasswd(String jsonStr) throws Exception {
		JSONObject jsonObject = JSONObject.parseObject(jsonStr);
		if(StringUtil.isNull(jsonObject, "user_id","customer_id", "old_passwd")) {
			return ToolsUtil.return_error_json;
		}
		return customerService.verifyCustomerPasswd(jsonObject);
	} 
	
	/**
	 * @desc 账户管理-修改密码:保存密码
	 * @param jsonStr
	 * @return
	 * @throws Exception 
	 */
	
	@POST
	@Path("/updateCustomerPasswd")
	@Produces(MediaType.APPLICATION_JSON)
	public String updateCustomerPasswd(String jsonStr) throws Exception {
		JSONObject jsonObject = JSONObject.parseObject(jsonStr);
		if(StringUtil.isNull(jsonObject, "user_id","customer_id","new_passwd", "old_passwd")) {
			return ToolsUtil.return_error_json;
		}
		return customerService.updateCustomerPasswd(jsonObject);
	} 
	
	/**
	 * @desc 项目信息-查询项目详细信息
	 * @param jsonStr
	 * @return
	 * @throws Exception 
	 */
	
	@POST
	@Path("/queryProjectInfo")
	@Produces(MediaType.APPLICATION_JSON)
	public String queryProjectInfo(String jsonStr) throws Exception {
		JSONObject jsonObject = JSONObject.parseObject(jsonStr);
		if(StringUtil.isNull(jsonObject, "user_id","project_id")) {
			return ToolsUtil.return_error_json;
		}
		return customerService.queryProjectInfo(jsonObject);
	} 
	/**
	 * @desc 项目信息-查询项目信息点的历史信息
	 * @param jsonStr
	 * @return
	 * @throws Exception 
	 */
	
	@POST
	@Path("/queryProjectInfoPointHis")
	@Produces(MediaType.APPLICATION_JSON)
	public String queryProjectInfoPointHis(String jsonStr) throws Exception {
		JSONObject jsonObject = JSONObject.parseObject(jsonStr);
		if(StringUtil.isNull(jsonObject, "user_id","project_id", "info_point_code")) {
			return ToolsUtil.return_error_json;
		}
		return customerService.queryProjectInfoPointHis(jsonObject);
	} 
	
	/**
	 * @desc 项目信息-编辑提交信息点信息 （ 未完成）
	 * @param jsonStr
	 * @return
	 * @throws Exception 
	 */
	
	@POST
	@Path("/updateProjectInfo")
	@Produces(MediaType.APPLICATION_JSON)
	public String updateProjectInfo(String jsonStr) throws Exception {
		JSONObject jsonObject = JSONObject.parseObject(jsonStr);
		if(StringUtil.isNull(jsonObject, "user_id","project_id", "info_point_code","info_point_value")) {
			return ToolsUtil.return_error_json;
		}
		return customerService.updateProjectInfo(jsonObject);
	} 
	
	/**
	 * @desc 建筑体-查询项目下建筑列表
	 * @param jsonStr
	 * @return
	 * @throws Exception 
	 */
	
	@POST
	@Path("/queryBuildList")
	@Produces(MediaType.APPLICATION_JSON)
	public String queryBuildList(String jsonStr) throws Exception {
		JSONObject jsonObject = JSONObject.parseObject(jsonStr);
		if(StringUtil.isNull(jsonObject, "user_id","customer_id")) {
			return ToolsUtil.return_error_json;
		}
		return customerService.queryBuildList(jsonObject);
	} 
	
	/**
	 * @desc 建筑体-查询建筑详细信息
	 * @param jsonStr
	 * @return
	 * @throws Exception 
	 */
	
	@POST
	@Path("/queryBuildInfo")
	@Produces(MediaType.APPLICATION_JSON)
	public String queryBuildInfo(String jsonStr) throws Exception {
		JSONObject jsonObject = JSONObject.parseObject(jsonStr);
		if(StringUtil.isNull(jsonObject, "user_id","build_id","build_code")) {
			return ToolsUtil.return_error_json;
		}
		return customerService.queryBuildInfo(jsonObject);
	} 
	
	/**
	 * @desc 建筑体-编辑提交信息点信息
	 * @param jsonStr
	 * @return
	 * @throws Exception 
	 */
	
	@POST
	@Path("/updateBuildInfo")
	@Produces(MediaType.APPLICATION_JSON)
	public String updateBuildInfo(String jsonStr) throws Exception {
		JSONObject jsonObject = JSONObject.parseObject(jsonStr);
		if(StringUtil.isNull(jsonObject, "user_id","build_id","build_code","info_point_code")) {
			return ToolsUtil.return_error_json;
		}
		Object obj = jsonObject.get("info_point_value");
		if(obj == null) {
			return ToolsUtil.return_error_json;
		}
		if(obj instanceof JSONArray) {
			JSONArray info_point_value = jsonObject.getJSONArray("info_point_value");
			if(info_point_value == null || info_point_value.isEmpty()) {
				return ToolsUtil.return_error_json;
			}
		} else {
			String info_point_value = jsonObject.getString("info_point_value");
			if(StringUtil.isNull(info_point_value)) {
				return ToolsUtil.return_error_json;
			}
		}
		return customerService.updateBuildInfo(jsonObject);
	} 
	
	
	
	
	
	
	/**
	 * @desc 建筑体-查询建筑信息点的历史信息
	 * @param jsonStr
	 * @return
	 * @throws Exception 
	 */
	
	@POST
	@Path("/queryBuildInfoPointHis")
	@Produces(MediaType.APPLICATION_JSON)
	public String queryBuildInfoPointHis(String jsonStr) throws Exception {
		JSONObject jsonObject = JSONObject.parseObject(jsonStr);
		if(StringUtil.isNull(jsonObject, "user_id","project_id", "info_point_code","build_code")) {
			return ToolsUtil.return_error_json;
		}
		return customerService.queryBuildInfoPointHis(jsonObject);
	} 
}
