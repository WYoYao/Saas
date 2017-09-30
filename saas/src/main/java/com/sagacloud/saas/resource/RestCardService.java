package com.sagacloud.saas.resource;

import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.springframework.beans.factory.annotation.Autowired;

import com.alibaba.fastjson.JSONObject;
import com.sagacloud.saas.common.StringUtil;
import com.sagacloud.saas.common.ToolsUtil;
import com.sagacloud.saas.service.CardServiceI;

/**
 * 功能描述：设备名片页
 * @author gezhanbin
 *
 */
@Path("/restCardService")
public class RestCardService {
	
	@Autowired
	private CardServiceI cardService;
	
	/**
	 * 功能描述：设备名片页:查询项目下设备列表
	 * @param jsonStr
	 * @return
	 * @throws Exception 
	 */
	@POST
	@Path("/queryEquipList")
	@Produces(MediaType.APPLICATION_JSON)
	public String queryEquipList(String jsonStr) throws Exception {
		JSONObject jsonObject = JSONObject.parseObject(jsonStr);
		if(StringUtil.isNull(jsonObject, "user_id","project_id")) {
			return ToolsUtil.return_error_json;
		}
		return cardService.queryEquipList(jsonObject);
	}
	
	/**
	 * 功能描述：设备名片页:查询项目下尚未下载设备列表
	 * @param jsonStr
	 * @return
	 * @throws Exception 
	 */
	@POST
	@Path("/queryNotDownloadEquipList")
	@Produces(MediaType.APPLICATION_JSON)
	public String queryNotDownloadEquipList(String jsonStr) throws Exception {
		JSONObject jsonObject = JSONObject.parseObject(jsonStr);
		if(StringUtil.isNull(jsonObject, "user_id","project_id")) {
			return ToolsUtil.return_error_json;
		}
		return cardService.queryNotDownloadEquipList(jsonObject);
	}
	
	/**
	 * 功能描述：空间名片页:查询项目下空间列表
	 * @param jsonStr
	 * @return
	 * @throws Exception 
	 */
	@POST
	@Path("/querySpaceList")
	@Produces(MediaType.APPLICATION_JSON)
	public String querySpaceList(String jsonStr) throws Exception {
		JSONObject jsonObject = JSONObject.parseObject(jsonStr);
		if(StringUtil.isNull(jsonObject, "user_id","project_id")) {
			return ToolsUtil.return_error_json;
		}
		return cardService.querySpaceList(jsonObject);
	}
	
	/**
	 * 功能描述：空间名片页:查询项目下尚未下载空间列表
	 * @param jsonStr
	 * @return
	 * @throws Exception 
	 */
	@POST
	@Path("/queryNotDownloadSpaceList")
	@Produces(MediaType.APPLICATION_JSON)
	public String queryNotDownloadSpaceList(String jsonStr) throws Exception {
		JSONObject jsonObject = JSONObject.parseObject(jsonStr);
		if(StringUtil.isNull(jsonObject, "user_id","project_id")) {
			return ToolsUtil.return_error_json;
		}
		return cardService.queryNotDownloadSpaceList(jsonObject);
	}
	
	/**
	 * 功能描述：定制名片:查询设备选择项
	 * @param jsonStr
	 * @return
	 * @throws Exception 
	 */
	@POST
	@Path("/queryEquipOptions")
	@Produces(MediaType.APPLICATION_JSON)
	public String queryEquipOptions(String jsonStr) throws Exception {
		JSONObject jsonObject = JSONObject.parseObject(jsonStr);
		if(StringUtil.isNull(jsonObject, "user_id","project_id")) {
			return ToolsUtil.return_error_json;
		}
		return cardService.queryEquipOptions(jsonObject);
	}
	
	/**
	 * 功能描述：定制名片:查询空间选择项
	 * @param jsonStr
	 * @return
	 * @throws Exception 
	 */
	@POST
	@Path("/querySpaceOptions")
	@Produces(MediaType.APPLICATION_JSON)
	public String querySpaceOptions(String jsonStr) throws Exception {
		JSONObject jsonObject = JSONObject.parseObject(jsonStr);
		if(StringUtil.isNull(jsonObject, "user_id","project_id")) {
			return ToolsUtil.return_error_json;
		}
		return cardService.querySpaceOptions(jsonObject);
	}
	
	/**
	 * 功能描述：定制名片:保存名片样式
	 * @param jsonStr
	 * @return
	 * @throws Exception 
	 */
	@POST
	@Path("/saveEquipCardStyle")
	@Produces(MediaType.APPLICATION_JSON)
	public String saveEquipCardStyle(String jsonStr) throws Exception {
		JSONObject jsonObject = JSONObject.parseObject(jsonStr);
		if(StringUtil.isNull(jsonObject, "user_id","project_id","obj_type")) {
			return ToolsUtil.return_error_json;
		}
		return cardService.saveEquipCardStyle(jsonObject);
	}
	
	/**
	 * 功能描述：设备名片页:下载设备名片
	 * @param jsonStr
	 * @return
	 * @throws Exception 
	 */
	@POST
	@Path("/downloadEquipCard")
	@Produces(MediaType.APPLICATION_JSON)
	public String downloadEquipCard(String jsonStr) throws Exception {
		JSONObject jsonObject = JSONObject.parseObject(jsonStr);
		if(StringUtil.isNull(jsonObject, "user_id","project_id")) {
			return ToolsUtil.return_error_json;
		}
		return cardService.downloadEquipCard(jsonObject);
	}
}
