package com.sagacloud.saasmanage.resource;


import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.springframework.beans.factory.annotation.Autowired;

import com.alibaba.fastjson.JSONObject;
import com.sagacloud.saasmanage.common.StringUtil;
import com.sagacloud.saasmanage.common.ToolsUtil;
import com.sagacloud.saasmanage.service.FuncPackServiceI;

/**
 * @desc 权限项管理
 * @author gezhanbin
 *
 */
@Path("/restFuncPackService")
public class RestFuncPackService {

	
	@Autowired
	private FuncPackServiceI funcPackService;
	
	/**
	 * @desc 权限项管理-列表页:查询所有权限项信息
	 * @param jsonStr
	 * @return
	 */
	@POST
	@Path("/queryAllFuncPack")
	@Produces(MediaType.APPLICATION_JSON)
	public String queryAllFuncPack(String jsonStr) {
		JSONObject jsonObject = JSONObject.parseObject(jsonStr);
		if(StringUtil.isNull(jsonObject, "user_id"))
			return ToolsUtil.return_error_json;
		return funcPackService.queryAllFuncPack(jsonObject);
	}
	
	
	/**
	 * @desc 权限项管理-新增页:查询功能节点树
	 * @param jsonStr
	 * @return
	 */
	@POST
	@Path("/queryFuncPointTree")
	@Produces(MediaType.APPLICATION_JSON)
	public String queryFuncPointTree(String jsonStr) {
		JSONObject jsonObject = JSONObject.parseObject(jsonStr);
		if(StringUtil.isNull(jsonObject, "user_id"))
			return ToolsUtil.return_error_json;
		
		return funcPackService.queryFuncPointTree(jsonObject);
	}
	
	
	/**
	 * @desc 权限项管理-新增页:添加权限项信息
	 * @param jsonStr
	 * @return
	 * @throws Exception 
	 */
	@POST
	@Path("/addFuncPack")
	@Produces(MediaType.APPLICATION_JSON)
	public String addFuncPack(String jsonStr) throws Exception {
		JSONObject jsonObject = JSONObject.parseObject(jsonStr);
		if(StringUtil.isNull(jsonObject, "user_id","func_pack_name", "description", "func_packs"))
			return ToolsUtil.return_error_json;
		return funcPackService.addFuncPack(jsonObject);
		
	}
	
	/**
	 * @desc 权限项管理-详细页:根据Id查询权限项详细信息
	 * @param jsonStr
	 * @return
	 * @throws Exception 
	 */
	@POST
	@Path("/queryFuncPackById")
	@Produces(MediaType.APPLICATION_JSON)
	public String queryFuncPackById(String jsonStr) throws Exception {
		JSONObject jsonObject = JSONObject.parseObject(jsonStr);
		if(StringUtil.isNull(jsonObject, "user_id","func_pack_id"))
			return ToolsUtil.return_error_json;
			
		return funcPackService.queryFuncPackById(jsonObject);
	}
	
	/**
	 * @desc 权限项管理-编辑页:根据Id编权限项信息
	 * @param jsonStr
	 * @return
	 * @throws Exception
	 */
	@POST
	@Path("/updateFuncPackById")
	@Produces(MediaType.APPLICATION_JSON)
	public String updateFuncPackById(String jsonStr) throws Exception {
		JSONObject jsonObject = JSONObject.parseObject(jsonStr);
		if(StringUtil.isNull(jsonObject, "user_id", "func_pack_id", "func_pack_name", "description", "func_packs"))
			return ToolsUtil.return_error_json;
		return funcPackService.updateFuncPackById(jsonObject);
	}
	
}
