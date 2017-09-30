package com.sagacloud.saas.resource;

import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.springframework.beans.factory.annotation.Autowired;

import com.alibaba.fastjson.JSONObject;
import com.sagacloud.saas.common.StringUtil;
import com.sagacloud.saas.common.ToolsUtil;
import com.sagacloud.saas.service.FloorServiceI;

/**
 * 功能描述：楼层管理
 * @author gezhanbin
 *
 */
@Path("/restFloorService")
public class RestFloorService {

	
	@Autowired
	private FloorServiceI floorService;
	
	/**
	 * 功能描述：空间管理-首页:添加楼层信息
	 * @param jsonStr
	 * @return
	 * @throws Exception 
	 */
	@POST
	@Path("/addFloor")
	@Produces(MediaType.APPLICATION_JSON)
	public String addFloor(String jsonStr) throws Exception {
		JSONObject jsonObject = JSONObject.parseObject(jsonStr);
		if(StringUtil.isNull(jsonObject, "user_id","project_id",
				"build_id","floor_local_id",
				"floor_local_name","floor_sequence_id",
				"floor_type")) {
			return ToolsUtil.return_error_json;
		}
		return floorService.addFloor(jsonObject);
	}
	
	/**
	 * 功能描述：空间管理-首页:查询某建筑下楼层信息
	 * @param jsonStr
	 * @return
	 * @throws Exception 
	 */
	@POST
	@Path("/queryFloorWithOrder")
	@Produces(MediaType.APPLICATION_JSON)
	public String queryFloorWithOrder(String jsonStr) throws Exception {
		JSONObject jsonObject = JSONObject.parseObject(jsonStr);
		if(StringUtil.isNull(jsonObject, "user_id","project_id", "build_id")) {
			return ToolsUtil.return_error_json;
		}
		return floorService.queryFloorWithOrder(jsonObject);
	}
	
	/**
	 * 功能描述：空间管理-首页:根据id查询楼层详细信息
	 * @param jsonStr
	 * @return
	 * @throws Exception 
	 */
	@POST
	@Path("/queryFloorById")
	@Produces(MediaType.APPLICATION_JSON)
	public String queryFloorById(String jsonStr) throws Exception {
		JSONObject jsonObject = JSONObject.parseObject(jsonStr);
		if(StringUtil.isNull(jsonObject, "user_id","project_id")) {
			return ToolsUtil.return_error_json;
		}
		return floorService.queryFloorById(jsonObject);
	}
	
	/**
	 * 功能描述：空间管理-首页:更改楼层顺序
	 * @param jsonStr
	 * @return
	 * @throws Exception 
	 */
	@POST
	@Path("/updateFloorOrder")
	@Produces(MediaType.APPLICATION_JSON)
	public String updateFloorOrder(String jsonStr) throws Exception {
		JSONObject jsonObject = JSONObject.parseObject(jsonStr);
		if(StringUtil.isNull(jsonObject, "user_id","project_id")) {
			return ToolsUtil.return_error_json;
		}
		return floorService.updateFloorOrder(jsonObject);
	}
	
	/**
	 * 功能描述：空间管理-详细页:编辑楼层信息
	 * @param jsonStr
	 * @return
	 * @throws Exception 
	 */
	@POST
	@Path("/updateFloorInfo")
	@Produces(MediaType.APPLICATION_JSON)
	public String updateFloorInfo(String jsonStr) throws Exception {
		JSONObject jsonObject = JSONObject.parseObject(jsonStr);
		if(StringUtil.isNull(jsonObject, "user_id","project_id", "floor_id","info_point_code","info_point_value")) {
			return ToolsUtil.return_error_json;
		}
		return floorService.updateFloorInfo(jsonObject);
	}
	
	
	/**
	 * 功能描述：空间管理-新增页/编辑页:验证楼层名称是否可以使用
	 * @param jsonStr
	 * @return
	 * @throws Exception 
	 */
	@POST
	@Path("/verifyFloorName")
	@Produces(MediaType.APPLICATION_JSON)
	public String verifySpaceName(String jsonStr) throws Exception {
		JSONObject jsonObject = JSONObject.parseObject(jsonStr);
		if(StringUtil.isNull(jsonObject, "user_id","project_id","floor_local_name")) {
			return ToolsUtil.return_error_json;
		}
		return floorService.verifyFloorName(jsonObject);
	}
	
	/**
	 * 功能描述：空间管理-新增页/编辑页:验证楼层编码是否可以使用
	 * @param jsonStr
	 * @return
	 * @throws Exception 
	 */
	@POST
	@Path("/verifyFloorLocalId")
	@Produces(MediaType.APPLICATION_JSON)
	public String verifyFloorLocalId(String jsonStr) throws Exception {
		JSONObject jsonObject = JSONObject.parseObject(jsonStr);
		if(StringUtil.isNull(jsonObject, "user_id","project_id","floor_local_id")) {
			return ToolsUtil.return_error_json;
		}
		return floorService.verifyFloorLocalId(jsonObject);
	}
	
	/**
	 * 功能描述：空间管理-新增页/编辑页:验证楼层BIM模型中编码是否可以使用
	 * @param jsonStr
	 * @return
	 * @throws Exception 
	 */
	@POST
	@Path("/verifyFloorBimId")
	@Produces(MediaType.APPLICATION_JSON)
	public String verifyFloorBimId(String jsonStr) throws Exception {
		JSONObject jsonObject = JSONObject.parseObject(jsonStr);
		if(StringUtil.isNull(jsonObject, "user_id","project_id","BIMID")) {
			return ToolsUtil.return_error_json;
		}
		return floorService.verifyFloorBimId(jsonObject);
	}
	
	/**
	 * 功能描述：空间管理-详细页:查询楼层信息点的历史信息
	 * @param jsonStr
	 * @return
	 * @throws Exception 
	 */
	@POST
	@Path("/queryFloorInfoPointHis")
	@Produces(MediaType.APPLICATION_JSON)
	public String queryFloorInfoPointHis(String jsonStr) throws Exception {
		JSONObject jsonObject = JSONObject.parseObject(jsonStr);
		if(StringUtil.isNull(jsonObject, "user_id","project_id","floor_id","info_point_code")) {
			return ToolsUtil.return_error_json;
		}
		return floorService.queryFloorInfoPointHis(jsonObject);
	}
	
	/**
	 * 功能描述：空间名片页:查询某建筑下楼层列表
	 * @param jsonStr
	 * @return
	 * @throws Exception 
	 */
	@POST
	@Path("/queryFloorList")
	@Produces(MediaType.APPLICATION_JSON)
	public String queryFloorList(String jsonStr) throws Exception {
		JSONObject jsonObject = JSONObject.parseObject(jsonStr);
		if(StringUtil.isNull(jsonObject, "user_id","project_id","build_id")) {
			return ToolsUtil.return_error_json;
		}
		return floorService.queryFloorList(jsonObject);
	}
	
}
