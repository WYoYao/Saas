package com.sagacloud.saasmanage.resource;

import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.springframework.beans.factory.annotation.Autowired;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.sagacloud.saasmanage.common.StringUtil;
import com.sagacloud.saasmanage.common.ToolsUtil;
import com.sagacloud.saasmanage.dao.DBCommonMethods;
import com.sagacloud.saasmanage.dao.DBConst;
import com.sagacloud.saasmanage.service.ComponentServiceI;

/**
 * @desc 动态模板管理：组件对应关系-
 * @author gezhanbin
 *
 */
@Path("/restComponentService")
public class RestComponentService {

	@Autowired
	private ComponentServiceI componentService;
	
	/**
	 * @desc 动态模板管理：组件对应关系-列表页:查询所有组件关系信息
	 * @param jsonStr
	 * @return
	 */
	@POST
	@Path("/queryAllComponentRel")
	@Produces(MediaType.APPLICATION_JSON)
	public String queryAllComponentRel(String jsonStr) {
		JSONObject jsonObject = JSONObject.parseObject(jsonStr);
		if(StringUtil.isNull(jsonObject, "user_id"))
			return ToolsUtil.return_error_json;
		return componentService.queryAllComponentRel(jsonObject);
	}
	
	/**
	 * @desc 动态模板管理：组件对应关系-编辑页:分组查询组件列表，用于组件的列表选择
	 * @param jsonStr
	 * @return
	 */
	@POST
	@Path("/queryComponentGroupByType")
	@Produces(MediaType.APPLICATION_JSON)
	public String queryComponentGroupByType(String jsonStr) {
		JSONObject jsonObject = JSONObject.parseObject(jsonStr);
		if(StringUtil.isNull(jsonObject, "user_id"))
			return ToolsUtil.return_error_json;
		return componentService.queryComponentGroupByType(jsonObject);
	}
	
	/**
	 * @desc 动态模板管理：组件对应关系-编辑页:根据Id编辑组件对应信息
	 * @param jsonStr
	 * @return
	 * @throws Exception 
	 */
	@POST
	@Path("/updateComponentRelById")
	@Produces(MediaType.APPLICATION_JSON)
	public String updateComponentRelById(String jsonStr) throws Exception {
		JSONObject jsonObject = JSONObject.parseObject(jsonStr);
		if(StringUtil.isNull(jsonObject, "user_id", "cmpt_relation_id"))
			return ToolsUtil.return_error_json;
		return componentService.updateComponentRelById(jsonObject);
	}
	/**
	 * @desc 动态模板管理：组件信息-列表页:查询所有组件
	 * @param jsonStr
	 * @return
	 */
	
	@POST
	@Path("/queryAllComponent")
	@Produces(MediaType.APPLICATION_JSON)
	public String queryAllComponent(String jsonStr){
		JSONObject jsonObject = JSONObject.parseObject(jsonStr);
		if(StringUtil.isNull(jsonObject, "user_id"))
			return ToolsUtil.return_error_json;
		return componentService.queryAllComponent(jsonObject);
	}
	/**
	 * @desc 动态模板管理：组件信息-新增页:添加组件信息
	 * @param jsonStr
	 * @return
	 * @throws Exception 
	 */
	@POST
	@Path("/addComponent")
	@Produces(MediaType.APPLICATION_JSON)
	public String addComponent(String jsonStr) throws Exception {
		JSONObject jsonObject = JSONObject.parseObject(jsonStr);
		if(StringUtil.isNull(jsonObject, "user_id","cmpt_type","cmpt_code","cmpt_name","description"))
			return ToolsUtil.return_error_json;
		return componentService.addComponent(jsonObject);
	}
	
	
	/**
	 * @desc 动态模板管理：批量插入
	 * @param jsonStr
	 * @return
	 */
	@POST
	@Path("/addComponents")
	@Produces(MediaType.APPLICATION_JSON)
	public String addComponents(String jsonStr){
		JSONArray jsonObjects = JSONArray.parseArray(jsonStr);
		JSONObject jsonObject = new JSONObject();
		jsonObject.put("insertObjects", jsonObjects);
		DBCommonMethods.insertBatchRecord(DBConst.TABLE_DYNAMIC_COMPONENT, jsonObject.toJSONString());
		return "";
	}
	
	
	/**
	 * @desc 动态模板管理：批量插入
	 * @param jsonStr
	 * @return
	 */
	@POST
	@Path("/addInfoComponents")
	@Produces(MediaType.APPLICATION_JSON)
	public String addInfoComponents(String jsonStr){
		JSONArray jsonObjects = JSONArray.parseArray(jsonStr);
		
//		for (int i = 0; i < jsonObjects.size(); i++) {
//			JSONObject jsonObject = jsonObjects.getJSONObject(i);
//			String 
//			
//			jsonObject.put("info_cmpt_id", value);
//		}
		
//		jsonObject.put(Query.INSERTOBJECTS, jsonObjects);
//		DBCommonMethods.insertBatchRecord(DBConst.TABLE_INFO_COMPONENT, jsonObject.toJSONString());
		return "";
	}
	
	
	
	
}
