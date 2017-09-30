package com.sagacloud.saasmanage.resource;

import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.springframework.beans.factory.annotation.Autowired;

import com.alibaba.fastjson.JSONObject;
import com.sagacloud.saasmanage.common.StringUtil;
import com.sagacloud.saasmanage.common.ToolsUtil;
import com.sagacloud.saasmanage.service.TemplateServiceI;

/**
 * @desc 动态模板管理：模板信息
 * @author gezhanbin
 *
 */

@Path("/restTemplateService")
public class RestTemplateService {

	@Autowired
	private TemplateServiceI templateService;
	
	/**
	 * @desc 动态模板管理：模板信息-列表页:查询对象类型树
	 * @param jsonStr
	 * @return
	 * @throws Exception 
	 */
	@POST
	@Path("/queryObjectCategoryTree")
	@Produces(MediaType.APPLICATION_JSON)
	public String queryObjectCategoryTree(String jsonStr) throws Exception {
		JSONObject jsonObject = JSONObject.parseObject(jsonStr);
		if(StringUtil.isNull(jsonObject, "user_id"))
			return ToolsUtil.return_error_json;
		return templateService.queryObjectCategoryTree(null);
	}
	
	/**
	 * @desc 动态模板管理：模板信息-列表页:查询对象类型信息
	 * @param jsonStr
	 * @return
	 * @throws Exception 
	 */
	@POST
	@Path("/queryObjectCategory")
	@Produces(MediaType.APPLICATION_JSON)
	public String queryObjectCategory(String jsonStr) throws Exception {
		JSONObject jsonObject = JSONObject.parseObject(jsonStr);
		if(StringUtil.isNull(jsonObject, "user_id", "object_name"))
			return ToolsUtil.return_error_json;
		return templateService.queryObjectCategory(jsonObject);
	}
	
	/**
	 * @desc 动态模板管理：模板信息-列表页:查询对象模板信息
	 * @param jsonStr
	 * @return
	 * @throws Exception 
	 */
	@POST
	@Path("/queryObjectTemplate")
	@Produces(MediaType.APPLICATION_JSON)
	public String queryObjectTemplate(String jsonStr) throws Exception {
		JSONObject jsonObject = JSONObject.parseObject(jsonStr);
		if(StringUtil.isNull(jsonObject, "user_id", "code", "type"))
			return ToolsUtil.return_error_json;
		return templateService.queryObjectTemplate(jsonObject);
	}
	
	/**
	 * @desc 动态模板管理：模板信息-列表页:编辑信息点配置信息
	 * @param jsonStr
	 * @return
	 * @throws Exception 
	 */
	@POST
	@Path("/updateInfoPointCmptById")
	@Produces(MediaType.APPLICATION_JSON)
	public String updateInfoPointCmptById(String jsonStr) throws Exception {
		JSONObject jsonObject = JSONObject.parseObject(jsonStr);
		if(StringUtil.isNull(jsonObject, "user_id", "info_cmpt_id"))
			return ToolsUtil.return_error_json;
		return templateService.updateInfoPointCmptById(jsonObject);
	}
	
}
