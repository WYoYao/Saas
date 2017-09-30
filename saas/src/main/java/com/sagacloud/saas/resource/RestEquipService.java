package com.sagacloud.saas.resource;

import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.springframework.beans.factory.annotation.Autowired;

import com.alibaba.fastjson.JSONObject;
import com.sagacloud.saas.common.StringUtil;
import com.sagacloud.saas.common.ToolsUtil;
import com.sagacloud.saas.service.EquipServiceI;

/**
 * 功能描述：设备管理
 * @author gezhanbin
 *
 */
@Path("/restEquipService")
public class RestEquipService {

	
	@Autowired
	private EquipServiceI equipService;
	
	/**
	 * 功能描述：设备管理-新增页/编辑页:验证设备编码是否可以使用
	 * @param jsonStr
	 * @return
	 * @throws Exception 
	 */
	@POST
	@Path("/verifyEquipLocalId")
	@Produces(MediaType.APPLICATION_JSON)
	public String verifyEquipLocalId(String jsonStr) throws Exception {
		JSONObject jsonObject = JSONObject.parseObject(jsonStr);
		if(StringUtil.isNull(jsonObject, "user_id","project_id", "equip_id","equip_local_id")) {
			return ToolsUtil.return_error_json;
		}
		return equipService.verifyEquipLocalId(jsonObject);
	}
	
	/**
	 * 功能描述：设备管理-新增页/编辑页:验证设备BIM编码是否可以使用
	 * @param jsonStr
	 * @return
	 * @throws Exception 
	 */
	@POST
	@Path("/verifyEquipBimId")
	@Produces(MediaType.APPLICATION_JSON)
	public String verifyEquipBimId(String jsonStr) throws Exception {
		JSONObject jsonObject = JSONObject.parseObject(jsonStr);
		if(StringUtil.isNull(jsonObject, "user_id","project_id", "equip_id","BIMID")) {
			return ToolsUtil.return_error_json;
		}
		return equipService.verifyEquipBimId(jsonObject);
	}
	
	/**
	 * 功能描述：设备管理-详细页:查询设备信息点的历史信息
	 * @param jsonStr
	 * @return
	 * @throws Exception 
	 */
	@POST
	@Path("/queryEquipInfoPointHis")
	@Produces(MediaType.APPLICATION_JSON)
	public String queryEquipInfoPointHis(String jsonStr) throws Exception {
		JSONObject jsonObject = JSONObject.parseObject(jsonStr);
		if(StringUtil.isNull(jsonObject, "user_id","project_id", "equip_id","info_point_code")) {
			return ToolsUtil.return_error_json;
		}
		return equipService.queryEquipInfoPointHis(jsonObject);
	}
	
	
	/**
	 * 功能描述：设备管理-新增页:查询设备动态信息
	 * @param jsonStr
	 * @return
	 * @throws Exception 
	 */
	@POST
	@Path("/queryEquipDynamicInfoForAdd")
	@Produces(MediaType.APPLICATION_JSON)
	public String queryEquipDynamicInfoForAdd(String jsonStr) throws Exception {
		JSONObject jsonObject = JSONObject.parseObject(jsonStr);
		if(StringUtil.isNull(jsonObject, "user_id","project_id", "equip_category")) {
			return ToolsUtil.return_error_json;
		}
		return equipService.queryEquipDynamicInfoForAdd(jsonObject);
	}
	/**
	 * 功能描述：设备管理-新增页:添加设备信息
	 * @param jsonStr
	 * @return
	 * @throws Exception 
	 */
	@POST
	@Path("/addEquip")
	@Produces(MediaType.APPLICATION_JSON)
	public String addEquip(String jsonStr) throws Exception {
		JSONObject jsonObject = JSONObject.parseObject(jsonStr);
		if(StringUtil.isNull(jsonObject, "user_id","project_id", "build_id","equip_local_id","equip_local_name")) {
			return ToolsUtil.return_error_json;
		}
		return equipService.addEquip(jsonObject);
	}
	
	
	
	/**
	 * @desc 设备管理-详细页:查询设备通用信息
	 * @param jsonStr
	 * @return
	 * @throws Exception
	 */
	@POST
	@Path("/queryEquipPublicInfo")
	@Produces(MediaType.APPLICATION_JSON)
	public String queryEquipPublicInfo(String jsonStr) throws Exception {
		JSONObject jsonObject = JSONObject.parseObject(jsonStr);
		if(StringUtil.isNull(jsonObject, "user_id", "project_id", "equip_id")) {
			return ToolsUtil.return_error_json;
		}
		return equipService.queryEquipPublicInfo(jsonObject);
	}
	
	/**
	 * 功能描述： 设备管理-详细页:查询设备动态信息
	 * @param jsonStr
	 * @return
	 * @throws Exception
	 */
	@POST
	@Path("/queryEquipDynamicInfo")
	@Produces(MediaType.APPLICATION_JSON)
	public String queryEquipDynamicInfo(String jsonStr) throws Exception {
		JSONObject jsonObject = JSONObject.parseObject(jsonStr);
		if(StringUtil.isNull(jsonObject, "user_id", "project_id", "equip_id")) {
			return ToolsUtil.return_error_json;
		}
		return equipService.queryEquipDynamicInfo(jsonObject);
	}
	

	/**
	 * 功能描述：设备管理-详细页:编辑设备信息
	 * @param jsonStr
	 * @return
	 * @throws Exception 
	 */
	@POST
	@Path("/updateEquipInfo")
	@Produces(MediaType.APPLICATION_JSON)
	public String updateEquipInfo(String jsonStr) throws Exception {
		JSONObject jsonObject = JSONObject.parseObject(jsonStr);
		if(StringUtil.isNull(jsonObject, "user_id","project_id","equip_id","info_point_code","info_point_value")) {
			return ToolsUtil.return_error_json;
		}
		return equipService.updateEquipInfo(jsonObject);
	}
	/**
	 * @desc 设备管理-详细页:查询设备相关的工单
	 * @param jsonStr
	 * @return
	 * @throws Exception 
	 */
	@POST
	@Path("/queryEquipRelWorkOrder")
	@Produces(MediaType.APPLICATION_JSON)
	public String queryEquipRelWorkOrder(String jsonStr) throws Exception {
		JSONObject jsonObject = JSONObject.parseObject(jsonStr);
		if(StringUtil.isNull(jsonObject, "user_id","project_id", "equip_id")) {
			return ToolsUtil.return_error_json;
		}
		return equipService.queryEquipRelWorkOrder(jsonObject);
	}
	/**
	 * 功能描述： 设备管理-首页:查询设备统计数量
	 * @param jsonStr
	 * @return
	 * @throws Exception 
	 */
	@POST
	@Path("/queryEquipStatisticCount")
	@Produces(MediaType.APPLICATION_JSON)
	public String queryEquipStatisticCount(String jsonStr) throws Exception {
		JSONObject jsonObject = JSONObject.parseObject(jsonStr);
		if(StringUtil.isNull(jsonObject, "user_id","project_id")) {
			return ToolsUtil.return_error_json;
		}
		return equipService.queryEquipStatisticCount(jsonObject);
	}
	/**
	 * 功能描述：设备管理-首页:查询项目下设备列表
	 * @param jsonStr
	 * @return
	 * @throws Exception 
	 */
	@POST
	@Path("/queryEquipList")
	@Produces(MediaType.APPLICATION_JSON)
	public String queryEquipList(String jsonStr) throws Exception {
		JSONObject jsonObject = JSONObject.parseObject(jsonStr);
		if(StringUtil.isNull(jsonObject, "user_id","project_id","valid")) {
			return ToolsUtil.return_error_json;
		}
		return equipService.queryEquipList(jsonObject);
	}
	/**
	 * 功能描述：设备管理-首页:查询维修中设备列表
	 * @param jsonStr
	 * @return
	 * @throws Exception 
	 */
	@POST
	@Path("/queryRepairEquipList")
	@Produces(MediaType.APPLICATION_JSON)
	public String queryRepairEquipList(String jsonStr) throws Exception {
		JSONObject jsonObject = JSONObject.parseObject(jsonStr);
		if(StringUtil.isNull(jsonObject, "user_id","project_id")) {
			return ToolsUtil.return_error_json;
		}
		return equipService.queryRepairEquipList(jsonObject);
	}
	/**
	 * 功能描述：设备管理-首页:查询维保中设备列表
	 * @param jsonStr
	 * @return
	 * @throws Exception 
	 */
	@POST
	@Path("/queryMaintEquipList")
	@Produces(MediaType.APPLICATION_JSON)
	public String queryMaintEquipList(String jsonStr) throws Exception {
		JSONObject jsonObject = JSONObject.parseObject(jsonStr);
		if(StringUtil.isNull(jsonObject, "user_id","project_id")) {
			return ToolsUtil.return_error_json;
		}
		return equipService.queryMaintEquipList(jsonObject);
	}
	/**
	 * 功能描述：设备管理-首页:查询即将报废设备列表
	 * @param jsonStr
	 * @return
	 * @throws Exception 
	 */
	@POST
	@Path("/queryGoingDestroyEquipList")
	@Produces(MediaType.APPLICATION_JSON)
	public String queryGoingDestroyEquipList(String jsonStr) throws Exception {
		JSONObject jsonObject = JSONObject.parseObject(jsonStr);
		if(StringUtil.isNull(jsonObject, "user_id","project_id")) {
			return ToolsUtil.return_error_json;
		}
		return equipService.queryGoingDestroyEquipList(jsonObject);
	}
	/**
	 * 功能描述：设备管理-首页:验证设备是否可以报废
	 * @param jsonStr
	 * @return
	 * @throws Exception 
	 */
	@POST
	@Path("/verifyDestroyEquip")
	@Produces(MediaType.APPLICATION_JSON)
	public String verifyDestroyEquip(String jsonStr) throws Exception {
		JSONObject jsonObject = JSONObject.parseObject(jsonStr);
		if(StringUtil.isNull(jsonObject, "user_id","project_id","equip_id")) {
			return ToolsUtil.return_error_json;
		}
		return equipService.verifyDestroyEquip(jsonObject);
	}
	/**
	 * 功能描述：设备管理-首页:报废设备
	 * @param jsonStr
	 * @return
	 * @throws Exception 
	 */
	@POST
	@Path("/destroyEquip")
	@Produces(MediaType.APPLICATION_JSON)
	public String destroyEquip(String jsonStr) throws Exception {
		JSONObject jsonObject = JSONObject.parseObject(jsonStr);
		if(StringUtil.isNull(jsonObject, "user_id","project_id","equip_id")) {
			return ToolsUtil.return_error_json;
		}
		return equipService.destroyEquip(jsonObject);
	}
	/**
	 * 功能描述：设备管理-详细页:查询设备名片信息
	 * @param jsonStr
	 * @return
	 * @throws Exception 
	 */
	@POST
	@Path("/queryEquipCardInfo")
	@Produces(MediaType.APPLICATION_JSON)
	public String queryEquipCardInfo(String jsonStr) throws Exception {
		JSONObject jsonObject = JSONObject.parseObject(jsonStr);
		if(StringUtil.isNull(jsonObject, "user_id","project_id","equip_id")) {
			return ToolsUtil.return_error_json;
		}
		return equipService.queryEquipCardInfo(jsonObject);
	}
	
	
	
}
