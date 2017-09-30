package com.sagacloud.saas.resource;

import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.springframework.beans.factory.annotation.Autowired;

import com.alibaba.fastjson.JSONObject;
import com.sagacloud.saas.common.StringUtil;
import com.sagacloud.saas.common.ToolsUtil;
import com.sagacloud.saas.service.GeneralDictServiceI;

/**
 * @desc 数据字典
 * @author gezhanbin
 *
 */
@Path("/restGeneralDictService")
public class RestGeneralDictService {
	
	@Autowired
	private GeneralDictServiceI generalDictService;

	/**
	 * @desc 人员信息-新增页:数据字典-专业
	 * @param jsonStr
	 * @return
	 */
	@POST
	@Path("/queryGeneralDictByKey")
	@Produces(MediaType.APPLICATION_JSON)
	public String queryGeneralDictByKey(String jsonStr) {
		JSONObject jsonObject = JSONObject.parseObject(jsonStr);
		if(StringUtil.isNull(jsonObject, "user_id","project_id","dict_type")) {
			return ToolsUtil.return_error_json;
		}
		return generalDictService.queryGeneralDictByKey(jsonObject);
	}

	/**
	 * @desc 人员信息-新增页:数据字典-专业
	 * @param jsonStr
	 * @return
	 */
	@POST
	@Path("/queryWorkOrderState")
	@Produces(MediaType.APPLICATION_JSON)
	public String queryWorkOrderState(String jsonStr) {
		JSONObject jsonObject = JSONObject.parseObject(jsonStr);
		if(StringUtil.isNull(jsonObject, "user_id","project_id","dict_type")) {
			return ToolsUtil.return_error_json;
		}
		//TODO 表设计未出
		return generalDictService.queryGeneralDictByKey(jsonObject);
	}
	
	/**
	 * 查询当前用户能使用的工单类型
	 * @param jsonStr
	 * @return
	 */
	@Path("queryWorkOrderType")
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	public String queryWorkOrderType(String jsonStr) throws Exception {
		if(!StringUtil.isNull(JSONObject.parseObject(jsonStr), "user_id", "project_id", "dict_type")){
			return generalDictService.queryWorkOrderType(jsonStr);
		}
		return ToolsUtil.return_error_json;
	}
}
