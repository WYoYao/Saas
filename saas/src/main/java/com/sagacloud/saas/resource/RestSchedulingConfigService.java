package com.sagacloud.saas.resource;

import java.util.HashSet;
import java.util.Set;

import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.springframework.beans.factory.annotation.Autowired;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.sagacloud.saas.common.StringUtil;
import com.sagacloud.saas.common.ToolsUtil;
import com.sagacloud.saas.service.SchedulingConfigServiceI;

/**
 * @desc 排班配置
 * @author gezhanbin
 *
 */
@Path("/restSchedulingConfigService")
public class RestSchedulingConfigService {
	
	@Autowired
	private SchedulingConfigServiceI schedulingConfigService;
	
	
	
	/**
	 * @desc 排班管理模块-排班类型设置页面：查询排班类型
	 * @param jsonStr
	 * @return
	 */
	@POST
	@Path("/querySchedulingConfig")
	@Produces(MediaType.APPLICATION_JSON)
	public String querySchedulingConfig(String jsonStr) {
		JSONObject jsonObject = JSONObject.parseObject(jsonStr);
		if(StringUtil.isNull(jsonObject, "user_id","project_id")) {
			return ToolsUtil.return_error_json;
		}
		return schedulingConfigService.querySchedulingConfig(jsonObject);
	}
	
	/**
	 * @desc 排班管理模块-排班类型设置页面：添加排班类型
	 * @param jsonStr
	 * @return
	 * @throws Exception 
	 */
	@POST
	@Path("/saveSchedulingConfig")
	@Produces(MediaType.APPLICATION_JSON)
	public String saveSchedulingConfig(String jsonStr) throws Exception {
		JSONObject jsonObject = JSONObject.parseObject(jsonStr);
		if(StringUtil.isNull(jsonObject, "user_id","project_id", "code","name")) {
			return ToolsUtil.return_error_json;
		}
		JSONArray time_plan = jsonObject.getJSONArray("time_plan");
		if(time_plan == null || time_plan.isEmpty()) {
			return ToolsUtil.return_error_json;
		}
		return schedulingConfigService.saveSchedulingConfig(jsonObject);
	}
	
	/**
	 * @desc 排班管理模块-排班类型设置页面：修改排班类型
	 * @param jsonStr
	 * @return
	 * @throws Exception 
	 */
	@POST
	@Path("/updateSchedulingConfig")
	@Produces(MediaType.APPLICATION_JSON)
	public String updateSchedulingConfig(String jsonStr) throws Exception {
		JSONObject jsonObject = JSONObject.parseObject(jsonStr);
		if(StringUtil.isNull(jsonObject, "user_id","scheduling_config_id", "code","name")) {
			return ToolsUtil.return_error_json;
		}
		JSONArray time_plan = jsonObject.getJSONArray("time_plan");
		if(time_plan == null || time_plan.isEmpty()) {
			return ToolsUtil.return_error_json;
		}
		return schedulingConfigService.updateSchedulingConfig(jsonObject);
	}
	
	/**
	 * @desc 排班管理模块-排班类型设置页面：保存排班类型
	 * @param jsonStr
	 * @return
	 * @throws Exception 
	 */
	@POST
	@Path("/saveOrUpdateSchedulingConfig")
	@Produces(MediaType.APPLICATION_JSON)
	public String saveOrUpdateSchedulingConfig(String jsonStr) throws Exception {
		JSONObject jsonObject = JSONObject.parseObject(jsonStr);
		if(StringUtil.isNull(jsonObject, "user_id","project_id")) {
			return ToolsUtil.return_error_json;
		}
		JSONArray scheduling_configs = jsonObject.getJSONArray("scheduling_configs");
		if(scheduling_configs == null || scheduling_configs.size() == 0) {
			return ToolsUtil.return_error_json;
		}
		Set<String> codeSet = new HashSet<>();
		Set<String> nameSet = new HashSet<>();
		for (int i = 0; i < scheduling_configs.size(); i++) {
			JSONObject scheduling_config = scheduling_configs.getJSONObject(i);
			String code = scheduling_config.getString("code");
			String name = scheduling_config.getString("name");
			if(StringUtil.isNull(code,name)) {
				return ToolsUtil.return_error_json;
			}
			JSONArray time_plan = scheduling_config.getJSONArray("time_plan");
			if(time_plan == null || time_plan.isEmpty()) {
				return ToolsUtil.return_error_json;
			}
			if(codeSet.contains(code)) {
				return ToolsUtil.errorJsonMsg("编码重复！");
			}
			codeSet.add(code);
			
			if(nameSet.contains(name)) {
				return ToolsUtil.errorJsonMsg("名称重复！");
			}
			nameSet.add(name);
		}
		
		return schedulingConfigService.saveOrUpdateSchedulingConfig(jsonObject);
	}
	
	
	/**
	 * @desc 排班管理模块-排班类型设置页面：删除排班类型
	 * @param jsonStr
	 * @return
	 * @throws Exception 
	 */
	@POST
	@Path("/deleteSchedulingConfig")
	@Produces(MediaType.APPLICATION_JSON)
	public String deleteSchedulingConfig(String jsonStr) throws Exception {
		JSONObject jsonObject = JSONObject.parseObject(jsonStr);
		if(StringUtil.isNull(jsonObject, "user_id","scheduling_config_id")) {
			return ToolsUtil.return_error_json;
		}
		return schedulingConfigService.deleteSchedulingConfig(jsonObject);
	}
	
	
}
