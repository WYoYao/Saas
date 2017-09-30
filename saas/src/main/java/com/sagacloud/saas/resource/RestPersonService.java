package com.sagacloud.saas.resource;

import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.springframework.beans.factory.annotation.Autowired;

import com.alibaba.fastjson.JSONObject;
import com.sagacloud.saas.common.StringUtil;
import com.sagacloud.saas.common.ToolsUtil;
import com.sagacloud.saas.service.PersonServiceI;

/**
 * @desc 人员信息
 * @author gezhanbin
 *
 */
@Path("/restPersonService")
public class RestPersonService {

	@Autowired
	private PersonServiceI personService;
	
	
	/**
	 * @desc 人员信息-新增页:添加人员信息
	 * @param jsonStr
	 * @return
	 * @throws Exception 
	 */
	@POST
	@Path("/addPerson")
	@Produces(MediaType.APPLICATION_JSON)
	public String addPerson(String jsonStr) throws Exception {
		JSONObject jsonObject = JSONObject.parseObject(jsonStr);
		if(StringUtil.isNull(jsonObject, "user_id","project_id","name","id_number","phone_num","gender")) {
			return ToolsUtil.return_error_json;
		}
		return personService.addPerson(jsonObject);
	}
	
	/**
	 * @desc 人员信息-列表页:查询项目下岗位列表
	 * @param jsonStr
	 * @return
	 * @throws Exception 
	 */
	@POST
	@Path("/queryPositionsByProjectId")
	@Produces(MediaType.APPLICATION_JSON)
	public String queryPositionsByProjectId(String jsonStr) throws Exception {
		JSONObject jsonObject = JSONObject.parseObject(jsonStr);
		if(StringUtil.isNull(jsonObject, "user_id","project_id")) {
			return ToolsUtil.return_error_json;
		}
		return personService.queryPositionsByProjectId(jsonObject);
	}
	
	/**
	 * @desc 人员信息-新增页:查询项目下标签列表
	 * @param jsonStr
	 * @return
	 * @throws Exception 
	 */
	@POST
	@Path("/queryPersonTagsByProjectId")
	@Produces(MediaType.APPLICATION_JSON)
	public String queryPersonTagsByProjectId(String jsonStr) throws Exception {
		JSONObject jsonObject = JSONObject.parseObject(jsonStr);
		if(StringUtil.isNull(jsonObject, "user_id","project_id")) {
			return ToolsUtil.return_error_json;
		}
		return personService.queryPersonTagsByProjectId(jsonObject);
	}
	
	/**
	 * @desc 人员信息-列表页:查询人员列表
	 * @param jsonStr
	 * @return
	 * @throws Exception 
	 */
	@POST
	@Path("/queryPersonList")
	@Produces(MediaType.APPLICATION_JSON)
	public String queryPersonList(String jsonStr) throws Exception {
		JSONObject jsonObject = JSONObject.parseObject(jsonStr);
		if(StringUtil.isNull(jsonObject, "user_id","project_id","person_status")) {
			return ToolsUtil.return_error_json;
		}
		return personService.queryPersonList(jsonObject);
	}
	
	/**
	 * @desc 人员信息-列表页:查询人员缩略图
	 * @param jsonStr
	 * @return
	 * @throws Exception 
	 */
	@POST
	@Path("/queryPersonWithGroup")
	@Produces(MediaType.APPLICATION_JSON)
	public String queryPersonWithGroup(String jsonStr) throws Exception {
		JSONObject jsonObject = JSONObject.parseObject(jsonStr);
		if(StringUtil.isNull(jsonObject, "user_id","project_id","person_status")) {
			return ToolsUtil.return_error_json;
		}
		return personService.queryPersonWithGroup(jsonObject);
	}
	
	/**
	 * @desc 人员信息-详细页:根据查询人员详细信息
	 * @param jsonStr
	 * @return
	 * @throws Exception 
	 */
	@POST
	@Path("/queryPersonDetailById")
	@Produces(MediaType.APPLICATION_JSON)
	public String queryPersonDetailById(String jsonStr) throws Exception {
		JSONObject jsonObject = JSONObject.parseObject(jsonStr);
		if(StringUtil.isNull(jsonObject, "user_id","project_id","person_id")) {
			return ToolsUtil.return_error_json;
		}
		return personService.queryPersonDetailById(jsonObject);
	}
	
	/**
	 * @desc 人员信息-详细页:根据Id废弃（离职）人员信息
	 * @param jsonStr
	 * @return
	 * @throws Exception 
	 */
	@POST
	@Path("/discardPersonById")
	@Produces(MediaType.APPLICATION_JSON)
	public String discardPersonById(String jsonStr) throws Exception {
		JSONObject jsonObject = JSONObject.parseObject(jsonStr);
		if(StringUtil.isNull(jsonObject, "user_id","project_id","person_id")) {
			return ToolsUtil.return_error_json;
		}
		return personService.discardPersonById(jsonObject);
	}
	
	/**
	 * @desc 人员信息-详细页:根据Id恢复已废弃的人员信息
	 * @param jsonStr
	 * @return
	 * @throws Exception 
	 */
	@POST
	@Path("/regainPersonById")
	@Produces(MediaType.APPLICATION_JSON)
	public String regainPersonById(String jsonStr) throws Exception {
		JSONObject jsonObject = JSONObject.parseObject(jsonStr);
		if(StringUtil.isNull(jsonObject, "user_id","project_id","person_id")) {
			return ToolsUtil.return_error_json;
		}
		return personService.regainPersonById(jsonObject);
	}
	
	/**
	 * @desc 人员信息-编辑页:根据Id编辑人员信息
	 * @param jsonStr
	 * @return
	 * @throws Exception 
	 */
	@POST
	@Path("/updatePersonById")
	@Produces(MediaType.APPLICATION_JSON)
	public String updatePersonById(String jsonStr) throws Exception {
		JSONObject jsonObject = JSONObject.parseObject(jsonStr);
		if(StringUtil.isNull(jsonObject, "user_id","project_id","person_id","name","id_number","phone_num","gender")) {
			return ToolsUtil.return_error_json;
		}
		return personService.updatePersonById(jsonObject);
	}

	/**
	 * @desc 工单监控-列表页:查询项目下人员列表
	 * @param jsonStr
	 * @return
	 * @throws Exception
	 */
	@POST
	@Path("/queryProjectPersonSel")
	@Produces(MediaType.APPLICATION_JSON)
	public String queryProjectPersonSel(String jsonStr) throws Exception {
		JSONObject jsonObject = JSONObject.parseObject(jsonStr);
		if(StringUtil.isNull(jsonObject, "user_id","project_id")) {
			return ToolsUtil.return_error_json;
		}
		return personService.queryProjectPersonSel(jsonObject);
	}

	/**
	 * @desc 工单配置-新增页:查询岗位下在职的人
	 * @param jsonStr
	 * @return
	 * @throws Exception
	 */
	@POST
	@Path("/queryValidPersonForPosition")
	@Produces(MediaType.APPLICATION_JSON)
	public String queryValidPersonForPosition(String jsonStr) throws Exception {
		JSONObject jsonObject = JSONObject.parseObject(jsonStr);
		if(StringUtil.isNull(jsonObject, "user_id","project_id")) {
			return ToolsUtil.return_error_json;
		}
		return personService.queryValidPersonForPosition(jsonObject);
	}

	/**
	 * @desc 工单配置-新增页:查询项目岗位人员列表
	 * @param jsonStr
	 * @return
	 * @throws Exception
	 */
	@POST
	@Path("/queryPositionPersonSel")
	@Produces(MediaType.APPLICATION_JSON)
	public String queryPositionPersonSel(String jsonStr) throws Exception {
		JSONObject jsonObject = JSONObject.parseObject(jsonStr);
		if(StringUtil.isNull(jsonObject, "user_id","project_id")) {
			return ToolsUtil.return_error_json;
		}
		return personService.queryPositionPersonSel(jsonObject);
	}
	
}
