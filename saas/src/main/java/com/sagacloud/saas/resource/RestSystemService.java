package com.sagacloud.saas.resource;

import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.springframework.beans.factory.annotation.Autowired;

import com.alibaba.fastjson.JSONObject;
import com.sagacloud.saas.common.StringUtil;
import com.sagacloud.saas.common.ToolsUtil;
import com.sagacloud.saas.service.SystemServiceI;

/**
 * 功能描述:系统管理
 * @author gezhanbin
 *
 */
@Path("/restSystemService")
public class RestSystemService {

	@Autowired
	private SystemServiceI systemService;
	
	/**
	 * 功能描述：系统管理-详细页:查询系统通用信息
	 * @param jsonStr
	 * @return
	 * @throws Exception 
	 */
	@POST
	@Path("/querySystemPublicInfo")
	@Produces(MediaType.APPLICATION_JSON)
	public String querySystemPublicInfo(String jsonStr) throws Exception {
		JSONObject jsonObject = JSONObject.parseObject(jsonStr);
		if(StringUtil.isNull(jsonObject, "user_id","project_id", "system_id")) {
			return ToolsUtil.return_error_json;
		}
		return systemService.querySystemPublicInfo(jsonObject);
	}
	
	/**
	 * 功能描述：系统管理-详细页/新增页:查询系统动态信息
	 * @param jsonStr
	 * @return
	 * @throws Exception 
	 */
	@POST
	@Path("/querySystemDynamicInfo")
	@Produces(MediaType.APPLICATION_JSON)
	public String querySystemDynamicInfo(String jsonStr) throws Exception {
		JSONObject jsonObject = JSONObject.parseObject(jsonStr);
		if(StringUtil.isNull(jsonObject, "user_id","project_id", "system_id")) {
			return ToolsUtil.return_error_json;
		}
		return systemService.querySystemDynamicInfo(jsonObject);
	}
	
	/**
	 * 功能描述：系统管理-详细页:查询系统信息点的历史信息
	 * @param jsonStr
	 * @return
	 * @throws Exception 
	 */
	@POST
	@Path("/querySystemInfoPointHis")
	@Produces(MediaType.APPLICATION_JSON)
	public String querySystemInfoPointHis(String jsonStr) throws Exception {
		JSONObject jsonObject = JSONObject.parseObject(jsonStr);
		if(StringUtil.isNull(jsonObject, "user_id","project_id", "system_id","info_point_code")) {
			return ToolsUtil.return_error_json;
		}
		return systemService.querySystemInfoPointHis(jsonObject);
	}
	
	/**
	 * 功能描述：系统管理-新增页/编辑页:验证系统名称是否可以使用
	 * @param jsonStr
	 * @return
	 * @throws Exception 
	 */
	@POST
	@Path("/verifySystemName")
	@Produces(MediaType.APPLICATION_JSON)
	public String verifySystemName(String jsonStr) throws Exception {
		JSONObject jsonObject = JSONObject.parseObject(jsonStr);
		if(StringUtil.isNull(jsonObject, "user_id","project_id", "build_id","system_local_name")) {
			return ToolsUtil.return_error_json;
		}
		return systemService.verifySystemName(jsonObject);
	}
	
	/**
	 * 功能描述：系统管理-新增页/编辑页:验证系统编码是否可以使用
	 * @param jsonStr
	 * @return
	 * @throws Exception 
	 */
	@POST
	@Path("/verifySystemLocalId")
	@Produces(MediaType.APPLICATION_JSON)
	public String verifySystemLocalId(String jsonStr) throws Exception {
		JSONObject jsonObject = JSONObject.parseObject(jsonStr);
		if(StringUtil.isNull(jsonObject, "user_id","project_id","system_local_id")) {
			return ToolsUtil.return_error_json;
		}
		return systemService.verifySystemLocalId(jsonObject);
	}
	
	/**
	 * 功能描述：系统管理-新增页/编辑页:验证系统BIM编码是否可以使用
	 * @param jsonStr
	 * @return
	 * @throws Exception 
	 */
	@POST
	@Path("/verifySystemBimId")
	@Produces(MediaType.APPLICATION_JSON)
	public String verifySystemBimId(String jsonStr) throws Exception {
		JSONObject jsonObject = JSONObject.parseObject(jsonStr);
		if(StringUtil.isNull(jsonObject, "user_id","project_id","BIMID")) {
			return ToolsUtil.return_error_json;
		}
		return systemService.verifySystemBimId(jsonObject);
	}
	
	/**
	 * 功能描述：系统管理-新增页:添加系统信息
	 * @param jsonStr
	 * @return
	 * @throws Exception 
	 */
	@POST
	@Path("/addSystem")
	@Produces(MediaType.APPLICATION_JSON)
	public String addSystem(String jsonStr) throws Exception {
		JSONObject jsonObject = JSONObject.parseObject(jsonStr);
		if(StringUtil.isNull(jsonObject, "user_id","project_id", "build_id")) {
			return ToolsUtil.return_error_json;
		}
		return systemService.addSystem(jsonObject);
	}
	
	/**
	 * 功能描述：系统管理-新增页:查询系统动态信息
	 * @param jsonStr
	 * @return
	 * @throws Exception 
	 */
	@POST
	@Path("/querySystemDynamicInfoForAdd")
	@Produces(MediaType.APPLICATION_JSON)
	public String querySystemDynamicInfoForAdd(String jsonStr) throws Exception {
		JSONObject jsonObject = JSONObject.parseObject(jsonStr);
		if(StringUtil.isNull(jsonObject, "user_id","project_id", "system_category")) {
			return ToolsUtil.return_error_json;
		}
		return systemService.querySystemDynamicInfoForAdd(jsonObject);
	}
	
	/**
	 * 功能描述：系统管理-首页:查询建筑-系统列表树
	 * @param jsonStr
	 * @return
	 * @throws Exception 
	 */
	@POST
	@Path("/queryBuildSystemTree")
	@Produces(MediaType.APPLICATION_JSON)
	public String queryBuildSystemTree(String jsonStr) throws Exception {
		JSONObject jsonObject = JSONObject.parseObject(jsonStr);
		if(StringUtil.isNull(jsonObject, "user_id","project_id")) {
			return ToolsUtil.return_error_json;
		}
		return systemService.queryBuildSystemTree(jsonObject);
	}
	
	/**
	 * 功能描述：系统管理-详细页:编辑系统信息
	 * @param jsonStr
	 * @return
	 * @throws Exception 
	 */
	@POST
	@Path("/updateSystemInfo")
	@Produces(MediaType.APPLICATION_JSON)
	public String updateSystemInfo(String jsonStr) throws Exception {
		JSONObject jsonObject = JSONObject.parseObject(jsonStr);
		if(StringUtil.isNull(jsonObject, "user_id","project_id")) {
			return ToolsUtil.return_error_json;
		}
		return systemService.updateSystemInfo(jsonObject);
	}
}
