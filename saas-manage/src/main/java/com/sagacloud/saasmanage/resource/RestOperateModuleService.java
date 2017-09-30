package com.sagacloud.saasmanage.resource;

import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.springframework.beans.factory.annotation.Autowired;

import com.alibaba.fastjson.JSONObject;
import com.sagacloud.saasmanage.common.StringUtil;
import com.sagacloud.saasmanage.common.ToolsUtil;
import com.sagacloud.saasmanage.service.OperateModuleServiceI;

/**
 * @desc 操作模块管理
 * @author gezhanbin
 *
 */
@Path("/restOperateModuleService")
public class RestOperateModuleService {
	
	@Autowired
	private OperateModuleServiceI operateModuleService;
	
	/**
	 * @desc 操作模块管理-列表页:查询所有操作模块信息
	 * @param jsonStr
	 * @return
	 * @throws Exception 
	 */
	@POST
	@Path("/queryAllOperateModule")
	@Produces(MediaType.APPLICATION_JSON)
	public String queryAllOperateModule(String jsonStr) throws Exception {
		JSONObject jsonObject = JSONObject.parseObject(jsonStr);
		if(StringUtil.isNull(jsonObject, "user_id"))
			return ToolsUtil.return_error_json;
		return operateModuleService.queryAllOperateModule();
	}
	
	
	/**
	 * @desc 操作模块管理-新增页:添加模块信息
	 * @param jsonStr
	 * @return
	 * @throws Exception 
	 */
	@POST
	@Path("/addOperateModule")
	@Produces(MediaType.APPLICATION_JSON)
	public String addOperateModule(String jsonStr) throws Exception {
		JSONObject jsonObject = JSONObject.parseObject(jsonStr);
		if(StringUtil.isNull(jsonObject, "user_id", "module_code", "module_name", "description"))
			return ToolsUtil.return_error_json;
		return operateModuleService.addOperateModule(jsonObject);
	}
	
	/**
	 * @desc 操作模块管理-详细页:根据Id查询模块详细信息
	 * @param jsonStr
	 * @return
	 * @throws Exception 
	 */
	
	@POST
	@Path("/queryOperateModuleById")
	@Produces(MediaType.APPLICATION_JSON)
	public String queryOperateModuleById(String jsonStr) throws Exception {
		JSONObject jsonObject = JSONObject.parseObject(jsonStr);
		if(StringUtil.isNull(jsonObject, "user_id", "module_id"))
			return ToolsUtil.return_error_json;
		return operateModuleService.queryOperateModuleById(jsonObject);
	}
	
	/**
	 * 功能描述：操作模块管理-编辑页:根据Id编模块信息
	 * @param jsonStr
	 * @return
	 * @throws Exception
	 */
	@POST
	@Path("/updateOperateModuleById")
	@Produces(MediaType.APPLICATION_JSON)
	public String updateOperateModuleById(String jsonStr) throws Exception {
		JSONObject jsonObject = JSONObject.parseObject(jsonStr);
		if(StringUtil.isNull(jsonObject, "user_id", "module_id", "module_code", "module_name", "description"))
			return ToolsUtil.return_error_json;
		return operateModuleService.updateOperateModuleById(jsonObject);
		
	}
	
	/**
	 * 功能描述：工单配置-新增页:验证操作模块编码是否重复
	 * @param jsonStr
	 * @return
	 * @throws Exception
	 */
	@POST
	@Path("/verifyModuleCode")
	@Produces(MediaType.APPLICATION_JSON)
	public String verifyModuleCode(String jsonStr) throws Exception {
		JSONObject jsonObject = JSONObject.parseObject(jsonStr);
		if(StringUtil.isNull(jsonObject, "user_id", "module_code"))
			return ToolsUtil.return_error_json;
		return operateModuleService.verifyModuleCode(jsonObject);
		
	}
	
	
}
