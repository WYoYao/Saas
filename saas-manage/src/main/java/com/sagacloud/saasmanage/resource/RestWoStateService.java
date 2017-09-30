package com.sagacloud.saasmanage.resource;

import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.springframework.beans.factory.annotation.Autowired;

import com.alibaba.fastjson.JSONObject;
import com.sagacloud.saasmanage.common.StringUtil;
import com.sagacloud.saasmanage.common.ToolsUtil;
import com.sagacloud.saasmanage.service.WoStateServiceI;

/**
 * 
 * @author guosongchao
 *
 */
@Path("restWoStateService")
public class RestWoStateService {
	
	@Autowired
	private WoStateServiceI woStateService;
	
	/**
	 * 查询工单状态列表
	 * @param jsonStr
	 * @return
	 * @throws Exception
	 */
	@Path("queryWoStateList")
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	public String queryWoStateList(String jsonStr) throws Exception{
		if(!StringUtil.isNull(JSONObject.parseObject(jsonStr), "user_id", "project_id")){
			return woStateService.queryWoStateList(jsonStr);
		}
		return ToolsUtil.return_error_json;
	}
	
	/**
	 * 修改本地名称
	 * @param jsonStr
	 * @return
	 * @throws Exception
	 */
	@Path("updateCustomerName")
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	public String updateCustomerName(String jsonStr) throws Exception{
		if(!StringUtil.isNull(JSONObject.parseObject(jsonStr), "user_id", "project_id", "custom_state_id")){
			return woStateService.updateCustomerName(jsonStr);
		}
		return ToolsUtil.return_error_json;
	}
	
	/**
	 * 查询工单状态事件列表
	 * @param jsonStr
	 * @return
	 * @throws Exception
	 */
	@Path("queryWoStateEventList")
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	public String queryWoStateEventList(String jsonStr) throws Exception{
		if(!StringUtil.isNull(JSONObject.parseObject(jsonStr), "user_id")){
			return woStateService.queryWoStateEventList(jsonStr);
		}
		return ToolsUtil.return_error_json;
	}
	
	/**
	 * 查询工单状态事件下选项列表
	 * @param jsonStr
	 * @return
	 * @throws Exception
	 */
	@Path("queryWoStateOptionList")
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	public String queryWoStateOptionList(String jsonStr) throws Exception{
		if(!StringUtil.isNull(JSONObject.parseObject(jsonStr), "user_id", "project_id", "event_code")){
			return woStateService.queryWoStateOptionList(jsonStr);
		}
		return ToolsUtil.return_error_json;
	}
	
	/**
	 * 验证状态名称是否可以使用
	 * @param jsonStr
	 * @return
	 * @throws Exception
	 */
	@Path("verifyStateName")
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	public String verifyStateName(String jsonStr) throws Exception{
		if(!StringUtil.isNull(JSONObject.parseObject(jsonStr), "user_id", "project_id", "name")){
			return woStateService.verifyStateName(jsonStr);
		}
		return ToolsUtil.return_error_json;
	}
	
	/**
	 * 添加工单状态信息
	 * @param jsonStr
	 * @return
	 * @throws Exception
	 */
	@Path("addWoState")
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	public String addWoState(String jsonStr) throws Exception{
		JSONObject jsonObject = JSONObject.parseObject(jsonStr);
		if(!StringUtil.isNull(jsonObject, "user_id", "project_id", "name", "order_type", "urgency", "is_repair_use") && !StringUtil.isEmptyList(jsonObject, "events")){
			return woStateService.addWoState(jsonStr);
		}
		return ToolsUtil.return_error_json;
	}
	
	/**
	 * 根据Id查询工单自定义状态信息
	 * @param jsonStr
	 * @return
	 * @throws Exception
	 */
	@Path("queryWoStateById")
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	public String queryWoStateById(String jsonStr) throws Exception{
		JSONObject jsonObject = JSONObject.parseObject(jsonStr);
		if(!StringUtil.isNull(jsonObject, "user_id", "project_id", "custom_state_id")){
			return woStateService.queryWoStateById(jsonStr);
		}
		return ToolsUtil.return_error_json;
	}
	
	/**
	 * 根据Id编辑工单自定义状态信息
	 * @param jsonStr
	 * @return
	 * @throws Exception
	 */
	@Path("updateWoStateById")
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	public String updateWoStateById(String jsonStr) throws Exception{
		JSONObject jsonObject = JSONObject.parseObject(jsonStr);
		if(!StringUtil.isNull(jsonObject, "user_id", "custom_state_id", "name", "order_type", "urgency", "is_repair_use") && !StringUtil.isEmptyList(jsonObject, "events")){
			return woStateService.updateWoStateById(jsonStr);
		}
		return ToolsUtil.return_error_json;
	}
}
