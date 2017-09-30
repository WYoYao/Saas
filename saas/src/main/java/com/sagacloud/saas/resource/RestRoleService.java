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
import com.sagacloud.saas.service.RoleServiceI;

/**
 * @desc 角色
 * @author gezhanbin
 *
 */
@Path("/restRoleService")
public class RestRoleService {

	
	@Autowired
	private RoleServiceI roleService;
	
	/**
	 * @desc 角色管理-新增/编辑页:查询权限项列表
	 * @param jsonStr
	 * @return
	 */
	@POST
	@Path("/queryFuncPackList")
	@Produces(MediaType.APPLICATION_JSON)
	public String queryFuncPackList(String jsonStr) {
		JSONObject jsonObject = JSONObject.parseObject(jsonStr);
		if(StringUtil.isNull(jsonObject, "user_id"))
			return ToolsUtil.return_error_json;
		return roleService.queryFuncPackList(jsonObject);
	}
	
	/**
	 * @desc 角色管理-新增页:添加角色信息
	 * @param jsonStr
	 * @return
	 * @throws Exception 
	 */
	@POST
	@Path("/addRole")
	@Produces(MediaType.APPLICATION_JSON)
	public String addRole(String jsonStr) throws Exception {
		JSONObject jsonObject = JSONObject.parseObject(jsonStr);
		if(StringUtil.isNull(jsonObject, "user_id","project_id","role_name"))
			return ToolsUtil.return_error_json;
		
		JSONArray func_pack_ids = jsonObject.getJSONArray("func_pack_ids");
		if(func_pack_ids == null || func_pack_ids.isEmpty()) {
			return ToolsUtil.return_error_json;
		}
		return roleService.addRole(jsonObject);
	}
	
	/**
	 * @desc 角色管理-列表页:查询角色列表
	 * @param jsonStr
	 * @return
	 */
	@POST
	@Path("/queryRoleList")
	@Produces(MediaType.APPLICATION_JSON)
	public String queryRoleList(String jsonStr) {
		JSONObject jsonObject = JSONObject.parseObject(jsonStr);
		if(StringUtil.isNull(jsonObject, "user_id","project_id"))
			return ToolsUtil.return_error_json;
		return roleService.queryRoleList(jsonObject);
	}
	
	/**
	 * @desc 角色管理-编辑页:根据id查询角色功能权限信息
	 * @param jsonStr
	 * @return
	 */
	@POST
	@Path("/queryRoleFuncPack")
	@Produces(MediaType.APPLICATION_JSON)
	public String queryRoleFuncPack(String jsonStr) {
		JSONObject jsonObject = JSONObject.parseObject(jsonStr);
		if(StringUtil.isNull(jsonObject, "user_id","role_id"))
			return ToolsUtil.return_error_json;
		return roleService.queryRoleFuncPack(jsonObject);
	}
	
	/**
	 * @desc 角色管理-详细页:根据id查询角色详细信息
	 * @param jsonStr
	 * @return
	 */
	@POST
	@Path("/queryRoleDetailById")
	@Produces(MediaType.APPLICATION_JSON)
	public String queryRoleDetailById(String jsonStr) {
		JSONObject jsonObject = JSONObject.parseObject(jsonStr);
		if(StringUtil.isNull(jsonObject, "user_id","role_id"))
			return ToolsUtil.return_error_json;
		return roleService.queryRoleDetailById(jsonObject);
	}
	
	/**
	 * @desc 角色管理-编辑页:根据Id编辑角色信息
	 * @param jsonStr
	 * @return
	 * @throws Exception 
	 */
	@POST
	@Path("/updateRoleById")
	@Produces(MediaType.APPLICATION_JSON)
	public String updateRoleById(String jsonStr) throws Exception {
		JSONObject jsonObject = JSONObject.parseObject(jsonStr);
		if(StringUtil.isNull(jsonObject, "user_id","role_id","project_id","role_name"))
			return ToolsUtil.return_error_json;
		JSONArray func_pack_ids = jsonObject.getJSONArray("func_pack_ids");
		if(func_pack_ids == null || func_pack_ids.isEmpty()) {
			return ToolsUtil.return_error_json;
		}
		return roleService.updateRoleById(jsonObject);
	}
}
