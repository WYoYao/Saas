package com.sagacloud.saas.resource;

import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.springframework.beans.factory.annotation.Autowired;

import com.alibaba.fastjson.JSONObject;
import com.sagacloud.saas.common.StringUtil;
import com.sagacloud.saas.common.ToolsUtil;
import com.sagacloud.saas.service.SpaceServiceI;

/**
 * 功能描述：空间管理
 * @author gezhanbin
 *
 */
@Path("/restSpaceService")
public class RestSpaceService {

	@Autowired
	private SpaceServiceI spaceService; 
	
	/**
	 * 功能描述：空间管理-首页:查询某建筑下空间信息
	 * @param jsonStr
	 * @return
	 * @throws Exception 
	 */
	@POST
	@Path("/querySpaceWithGroup")
	@Produces(MediaType.APPLICATION_JSON)
	public String querySpaceWithGroup(String jsonStr) throws Exception {
		JSONObject jsonObject = JSONObject.parseObject(jsonStr);
		if(StringUtil.isNull(jsonObject, "user_id","project_id", "build_id")) {
			return ToolsUtil.return_error_json;
		}
		return spaceService.querySpaceWithGroup(jsonObject);
	}
	
	/**
	 * 功能描述：空间管理-首页:查询某楼层下空间信息
	 * @param jsonStr
	 * @return
	 * @throws Exception 
	 */
	@POST
	@Path("/querySpaceForFloor")
	@Produces(MediaType.APPLICATION_JSON)
	public String querySpaceForFloor(String jsonStr) throws Exception {
		JSONObject jsonObject = JSONObject.parseObject(jsonStr);
		if(StringUtil.isNull(jsonObject, "user_id","project_id", "floor_id")) {
			return ToolsUtil.return_error_json;
		}
		return spaceService.querySpaceForFloor(jsonObject);
	}
	
	/**
	 * 功能描述：空间管理-首页:查询某建筑下已拆除的空间信息
	 * @param jsonStr
	 * @return
	 * @throws Exception 
	 */
	@POST
	@Path("/queryDestroyedSpace")
	@Produces(MediaType.APPLICATION_JSON)
	public String queryDestroyedSpace(String jsonStr) throws Exception {
		JSONObject jsonObject = JSONObject.parseObject(jsonStr);
		if(StringUtil.isNull(jsonObject, "user_id","project_id", "build_id")) {
			return ToolsUtil.return_error_json;
		}
		return spaceService.queryDestroyedSpace(jsonObject);
	}
	
	
	
	/**
	 * 功能描述：空间管理-首页:保存空间提醒设置
	 * @param jsonStr
	 * @return
	 * @throws Exception 
	 */
	@POST
	@Path("/querySpaceRemindConfig")
	@Produces(MediaType.APPLICATION_JSON)
	public String querySpaceRemindConfig(String jsonStr) throws Exception {
		JSONObject jsonObject = JSONObject.parseObject(jsonStr);
		if(StringUtil.isNull(jsonObject, "user_id","project_id", "person_id")) {
			return ToolsUtil.return_error_json;
		}
		return spaceService.querySpaceRemindConfig(jsonObject);
	}
	
	/**
	 * 功能描述：空间管理-首页:查询空间提醒设置
	 * @param jsonStr
	 * @return
	 * @throws Exception 
	 */
	@POST
	@Path("/saveSpaceRemindConfig")
	@Produces(MediaType.APPLICATION_JSON)
	public String saveSpaceRemindConfig(String jsonStr) throws Exception {
		JSONObject jsonObject = JSONObject.parseObject(jsonStr);
		if(StringUtil.isNull(jsonObject, "user_id","project_id")) {
			return ToolsUtil.return_error_json;
		}
		return spaceService.saveSpaceRemindConfig(jsonObject);
	}
	
	/**
	 * 功能描述：空间管理-新增页:验证空间名称是否可以使用
	 * @param jsonStr
	 * @return
	 * @throws Exception 
	 */
	@POST
	@Path("/verifySpaceName")
	@Produces(MediaType.APPLICATION_JSON)
	public String verifySpaceName(String jsonStr) throws Exception {
		JSONObject jsonObject = JSONObject.parseObject(jsonStr);
		if(StringUtil.isNull(jsonObject, "user_id","project_id","build_id","room_local_name")) {
			return ToolsUtil.return_error_json;
		}
		return spaceService.verifySpaceName(jsonObject);
	}
	
	/**
	 * 功能描述：空间管理-新增页/编辑页:验证空间编码是否可以使用
	 * @param jsonStr
	 * @return
	 * @throws Exception 
	 */
	@POST
	@Path("/verifySpaceLocalId")
	@Produces(MediaType.APPLICATION_JSON)
	public String verifySpaceLocalId(String jsonStr) throws Exception {
		JSONObject jsonObject = JSONObject.parseObject(jsonStr);
		if(StringUtil.isNull(jsonObject, "user_id","project_id","room_local_id")) {
			return ToolsUtil.return_error_json;
		}
		return spaceService.verifySpaceLocalId(jsonObject);
	}
	
	/**
	 * 功能描述：空间管理-新增页/编辑页:验证空间BIM模型中编码是否可以使用
	 * @param jsonStr
	 * @return
	 * @throws Exception 
	 */
	@POST
	@Path("/verifySpaceBimId")
	@Produces(MediaType.APPLICATION_JSON)
	public String verifySpaceBimId(String jsonStr) throws Exception {
		JSONObject jsonObject = JSONObject.parseObject(jsonStr);
		if(StringUtil.isNull(jsonObject, "user_id","project_id","BIMID")) {
			return ToolsUtil.return_error_json;
		}
		return spaceService.verifySpaceBimId(jsonObject);
	}
	
	/**
	 * 功能描述：空间管理-新增页:添加空间信息
	 * @param jsonStr
	 * @return
	 * @throws Exception 
	 */
	@POST
	@Path("/addSpace")
	@Produces(MediaType.APPLICATION_JSON)
	public String addSpace(String jsonStr) throws Exception {
		JSONObject jsonObject = JSONObject.parseObject(jsonStr);
		if(StringUtil.isNull(jsonObject, "user_id","project_id","floor_id")) {
			return ToolsUtil.return_error_json;
		}
		return spaceService.addSpace(jsonObject);
	}
	
	/**
	 * 功能描述：空间管理-详细页:根据id查询空间详细信息
	 * @param jsonStr
	 * @return
	 * @throws Exception 
	 */
	@POST
	@Path("/querySpaceById")
	@Produces(MediaType.APPLICATION_JSON)
	public String querySpaceById(String jsonStr) throws Exception {
		JSONObject jsonObject = JSONObject.parseObject(jsonStr);
		if(StringUtil.isNull(jsonObject, "user_id","project_id","space_id")) {
			return ToolsUtil.return_error_json;
		}
		return spaceService.querySpaceById(jsonObject);
	}
	
	/**
	 * 功能描述：空间管理-详细页:拆除空间
	 * @param jsonStr
	 * @return
	 * @throws Exception 
	 */
	@POST
	@Path("/destroySpace")
	@Produces(MediaType.APPLICATION_JSON)
	public String destroySpace(String jsonStr) throws Exception {
		JSONObject jsonObject = JSONObject.parseObject(jsonStr);
		if(StringUtil.isNull(jsonObject, "user_id","project_id","space_id")) {
			return ToolsUtil.return_error_json;
		}
		return spaceService.destroySpace(jsonObject);
	}
	
	/**
	 * 功能描述：空间管理-详细页:编辑空间信息
	 * @param jsonStr
	 * @return
	 * @throws Exception 
	 */
	@POST
	@Path("/updateSpaceInfo")
	@Produces(MediaType.APPLICATION_JSON)
	public String updateSpaceInfo(String jsonStr) throws Exception {
		JSONObject jsonObject = JSONObject.parseObject(jsonStr);
		if(StringUtil.isNull(jsonObject, "user_id","project_id","space_id","info_point_code","info_point_value")) {
			return ToolsUtil.return_error_json;
		}
		return spaceService.updateSpaceInfo(jsonObject);
	}
	
	/**
	 * 功能描述：空间管理-详细页:查询空间信息点的历史信息
	 * @param jsonStr
	 * @return
	 * @throws Exception 
	 */
	@POST
	@Path("/querySpaceInfoPointHis")
	@Produces(MediaType.APPLICATION_JSON)
	public String querySpaceInfoPointHis(String jsonStr) throws Exception {
		JSONObject jsonObject = JSONObject.parseObject(jsonStr);
		if(StringUtil.isNull(jsonObject, "user_id","project_id","space_id","info_point_code")) {
			return ToolsUtil.return_error_json;
		}
		return spaceService.querySpaceInfoPointHis(jsonObject);
	}
	
	/**
	 * 功能描述：空间管理-详细页:验证空间是否可以拆除
	 * @param jsonStr
	 * @return
	 * @throws Exception 
	 */
	@POST
	@Path("/verifyDestroySpace")
	@Produces(MediaType.APPLICATION_JSON)
	public String verifyDestroySpace(String jsonStr) throws Exception {
		JSONObject jsonObject = JSONObject.parseObject(jsonStr);
		if(StringUtil.isNull(jsonObject, "user_id","project_id","space_id")) {
			return ToolsUtil.return_error_json;
		}
		return spaceService.verifyDestroySpace(jsonObject);
	}
	
	
	
}
