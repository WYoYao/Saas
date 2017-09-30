package com.sagacloud.saas.resource;

import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.springframework.beans.factory.annotation.Autowired;

import com.alibaba.fastjson.JSONObject;
import com.sagacloud.saas.common.StringUtil;
import com.sagacloud.saas.common.ToolsUtil;
import com.sagacloud.saas.service.NounServiceI;

/**
 * 功能描述：名词管理
 * @author gezhanbin
 *
 */
@Path("/restNounService")
public class RestNounService {

	
	@Autowired
	private NounServiceI nounService;
	
	
	/**
	 * 功能描述： 名词管理-列表页:查询名词类型列表
	 * @param jsonStr
	 * @return
	 */
	@POST
	@Path("/queryNounTypeList")
	@Produces(MediaType.APPLICATION_JSON)
	public String queryNounTypeList(String jsonStr) {
		JSONObject jsonObject = JSONObject.parseObject(jsonStr);
		if(StringUtil.isNull(jsonObject, "user_id","project_id")) {
			return ToolsUtil.return_error_json;
		}
		return nounService.queryNounTypeList(jsonObject);
	}
	
	/**
	 * 功能描述： 名词管理-列表页:查询名词列表
	 * @param jsonStr
	 * @return
	 */
	@POST
	@Path("/queryNounList")
	@Produces(MediaType.APPLICATION_JSON)
	public String queryNounList(String jsonStr) {
		JSONObject jsonObject = JSONObject.parseObject(jsonStr);
		if(StringUtil.isNull(jsonObject, "user_id","project_id","noun_type")) {
			return ToolsUtil.return_error_json;
		}
		return nounService.queryNounList(jsonObject);
	}
	
	/**
	 * 功能描述： 名词管理-列表页:根据Id编辑名词信息
	 * @param jsonStr
	 * @return
	 */
	@POST
	@Path("/updateNounById")
	@Produces(MediaType.APPLICATION_JSON)
	public String updateNounById(String jsonStr) {
		JSONObject jsonObject = JSONObject.parseObject(jsonStr);
		if(StringUtil.isNull(jsonObject, "user_id","project_id","dict_id")) {
			return ToolsUtil.return_error_json;
		}
		return nounService.updateNounById(jsonObject);
	}
	
	/**
	 * 功能描述：名词管理-列表页:添加名词信息-后台使用
	 * @param jsonStr
	 * @return
	 */
	@POST
	@Path("/addNounByAdmin")
	@Produces(MediaType.APPLICATION_JSON)
	public String addNounByAdmin(String jsonStr) {
		JSONObject jsonObject = JSONObject.parseObject(jsonStr);
		if(StringUtil.isNull(jsonObject, "user_id")) {
			return ToolsUtil.return_error_json;
		}
		return nounService.addNounByAdmin(jsonObject);
	}
	
	/**
	 * 功能描述：名词管理-列表页:删除名词信息-后台使用
	 * @param jsonStr
	 * @return
	 */
	@POST
	@Path("/deleteNounByAdmin")
	@Produces(MediaType.APPLICATION_JSON)
	public String deleteNounByAdmin(String jsonStr) {
		JSONObject jsonObject = JSONObject.parseObject(jsonStr);
		if(StringUtil.isNull(jsonObject, "user_id","dict_id")) {
			return ToolsUtil.return_error_json;
		}
		return nounService.deleteNounByAdmin(jsonObject);
	}
	
	/**
	 * 功能描述：名词管理-列表页:修改名词信息-后台使用
	 * @param jsonStr
	 * @return
	 */
	@POST
	@Path("/updateNounByAdmin")
	@Produces(MediaType.APPLICATION_JSON)
	public String updateNounByAdmin(String jsonStr) {
		JSONObject jsonObject = JSONObject.parseObject(jsonStr);
		if(StringUtil.isNull(jsonObject, "user_id","dict_id")) {
			return ToolsUtil.return_error_json;
		}
		return nounService.updateNounByAdmin(jsonObject);
	}
}
