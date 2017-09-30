package com.sagacloud.saas.resource;

import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.springframework.beans.factory.annotation.Autowired;

import com.alibaba.fastjson.JSONObject;
import com.sagacloud.saas.common.StringUtil;
import com.sagacloud.saas.common.ToolsUtil;
import com.sagacloud.saas.service.EquipCompanyServiceI;

/**
 * 功能描述：设备通信录
 * @author gezhanbin
 *
 */
@Path("/restEquipCompanyService")
public class RestEquipCompanyService {

	@Autowired
	private EquipCompanyServiceI equipCompanyService;
	
	
	/**
	 * 功能描述：设备通信录-列表页:添加公司信息
	 * @param jsonStr
	 * @return
	 * @throws Exception
	 */
	@POST
	@Path("/addEquipCompany")
	@Produces(MediaType.APPLICATION_JSON)
	public String addEquipCompany(String jsonStr) throws Exception {
		JSONObject jsonObject = JSONObject.parseObject(jsonStr);
		if(StringUtil.isNull(jsonObject, "user_id", "project_id","company_type")) {
			return ToolsUtil.return_error_json;
		}
		return equipCompanyService.addEquipCompany(jsonObject);
	}
	
	/**
	 * 功能描述：设备通信录-详细页:根据Id查询公司的详细信息
	 * @param jsonStr
	 * @return
	 * @throws Exception
	 */
	@POST
	@Path("/queryEquipCompanyById")
	@Produces(MediaType.APPLICATION_JSON)
	public String queryEquipCompanyById(String jsonStr) throws Exception {
		JSONObject jsonObject = JSONObject.parseObject(jsonStr);
		if(StringUtil.isNull(jsonObject, "user_id", "company_id")) {
			return ToolsUtil.return_error_json;
		}
		return equipCompanyService.queryEquipCompanyById(jsonObject);
	}
	
	/**
	 * 功能描述：设备通信录-详细页:根据Id查询公司的详细信息
	 * @param jsonStr
	 * @return
	 * @throws Exception
	 */
	@POST
	@Path("/updateEquipCompanyById")
	@Produces(MediaType.APPLICATION_JSON)
	public String updateEquipCompanyById(String jsonStr) throws Exception {
		JSONObject jsonObject = JSONObject.parseObject(jsonStr);
		if(StringUtil.isNull(jsonObject, "user_id", "company_id")) {
			return ToolsUtil.return_error_json;
		}
		return equipCompanyService.updateEquipCompanyById(jsonObject);
	}
	
	/**
	 * 功能描述：设备通信录-详细页:删除公司信息
	 * @param jsonStr
	 * @return
	 * @throws Exception
	 */
	@POST
	@Path("/deleteEquipCompanyById")
	@Produces(MediaType.APPLICATION_JSON)
	public String deleteEquipCompanyById(String jsonStr) throws Exception {
		JSONObject jsonObject = JSONObject.parseObject(jsonStr);
		if(StringUtil.isNull(jsonObject, "user_id", "company_id")) {
			return ToolsUtil.return_error_json;
		}
		return equipCompanyService.deleteEquipCompanyById(jsonObject);
	}
	
	/**
	 * 功能描述：设备通信录-列表页:查询设备通讯录列表
	 * @param jsonStr
	 * @return
	 * @throws Exception
	 */
	@POST
	@Path("/queryEquipCompanyList")
	@Produces(MediaType.APPLICATION_JSON)
	public String queryEquipCompanyList(String jsonStr) throws Exception {
		JSONObject jsonObject = JSONObject.parseObject(jsonStr);
		if(StringUtil.isNull(jsonObject, "user_id", "project_id","company_type")) {
			return ToolsUtil.return_error_json;
		}
		return equipCompanyService.queryEquipCompanyList(jsonObject);
	}
	
	/**
	 * 功能描述：设备通信录-列表页:查询设备通讯录列表
	 * @param jsonStr
	 * @return
	 * @throws Exception
	 */
	@POST
	@Path("/queryEquipCompanySel")
	@Produces(MediaType.APPLICATION_JSON)
	public String queryEquipCompanySel(String jsonStr) throws Exception {
		JSONObject jsonObject = JSONObject.parseObject(jsonStr);
		if(StringUtil.isNull(jsonObject, "user_id", "project_id","company_type")) {
			return ToolsUtil.return_error_json;
		}
		return equipCompanyService.queryEquipCompanySel(jsonObject);
	}
	
	/**
	 * 功能描述：设备通信录-设备调用:添加品牌信息
	 * @param jsonStr
	 * @return
	 * @throws Exception
	 */
	@POST
	@Path("/addCompanyBrand")
	@Produces(MediaType.APPLICATION_JSON)
	public String addCompanyBrand(String jsonStr) throws Exception {
		JSONObject jsonObject = JSONObject.parseObject(jsonStr);
		if(StringUtil.isNull(jsonObject, "user_id", "company_id","brand")) {
			return ToolsUtil.return_error_json;
		}
		return equipCompanyService.addCompanyBrand(jsonObject);
	}
	
	/**
	 * 功能描述：设备通信录-设备调用:添加保险单号
	 * @param jsonStr
	 * @return
	 * @throws Exception
	 */
	@POST
	@Path("/addCompanyInsurerNum")
	@Produces(MediaType.APPLICATION_JSON)
	public String addCompanyInsurerNum(String jsonStr) throws Exception {
		JSONObject jsonObject = JSONObject.parseObject(jsonStr);
		if(StringUtil.isNull(jsonObject, "user_id", "company_id")) {
			return ToolsUtil.return_error_json;
		}
		return equipCompanyService.addCompanyInsurerNum(jsonObject);
	}
	
}
