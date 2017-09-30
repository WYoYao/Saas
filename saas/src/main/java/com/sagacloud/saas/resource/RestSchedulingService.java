package com.sagacloud.saas.resource;



import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import org.springframework.beans.factory.annotation.Autowired;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.sagacloud.saas.common.StringUtil;
import com.sagacloud.saas.common.ToolsUtil;
import com.sagacloud.saas.service.SchedulingServiceI;

/**
 * @desc 排班
 * @author gezhanbin
 *
 */
@Path("/restSchedulingService")
public class RestSchedulingService {
	
	
	@Autowired
	private SchedulingServiceI schedulingService;
	
	
	/**
	 * @desc 排班管理模块-排班表主页：上传排班excel文件
	 * @param form
	 * @return
	 */
	@POST
	@Path("/uploadSchedulingFile")
	@Produces(MediaType.APPLICATION_JSON)
	public String uploadSchedulingFile(String jsonStr){
		JSONObject jsonObject = JSONObject.parseObject(jsonStr);
		String user_id = jsonObject.getString("user_id");
		String project_id = jsonObject.getString("project_id");
		String month = jsonObject.getString("month");
		String fileKey = jsonObject.getString("file");
		
		if(StringUtil.isNull(user_id, project_id, month,fileKey)) {
			return ToolsUtil.return_error_json;
		}
		
		return schedulingService.uploadSchedulingFile(project_id, month, fileKey);
	}
//	
//	/**
//	 * @desc 排班管理模块-排班表主页：上传排班excel文件
//	 * @param form
//	 * @return
//	 */
//	@POST
//	@Path("/uploadSchedulingFile")
//	@Consumes(MediaType.MULTIPART_FORM_DATA)
//	@Produces(MediaType.APPLICATION_JSON)
//	public String uploadSchedulingFile(FormDataMultiPart form){
//		FormDataBodyPart filePart = form.getField("file");
//		FormDataBodyPart userPart = form.getField("user_id");
//		FormDataBodyPart projectIdPart = form.getField("project_id");
//		FormDataBodyPart monthPart = form.getField("month");
//		
//		if(userPart == null || filePart == null || projectIdPart == null || monthPart == null) {
//			return ToolsUtil.return_error_json;
//		}
//		String user_id = userPart.getValue();
//		String project_id = projectIdPart.getValue();
//		String month = monthPart.getValue();
//		InputStream inputStream = filePart.getValueAs(InputStream.class);
//		if(StringUtil.isNull(user_id, project_id, month) || inputStream == null) {
//			return ToolsUtil.return_error_json;
//		}
//		
//		return schedulingService.uploadSchedulingFile(project_id, month, inputStream);
//	}
	
	/**
	 * @desc 排班管理模块-排班表主页：查询目前排班计划  (web端)
	 * @param jsonStr
	 * @return
	 */
	@POST
	@Path("/queryMonthSchedulingForWeb")
	@Produces(MediaType.APPLICATION_JSON)
	public String queryMonthSchedulingForWeb(String jsonStr) {
		JSONObject jsonObject = JSONObject.parseObject(jsonStr);
		if(StringUtil.isNull(jsonObject, "user_id","project_id","month")) {
			return ToolsUtil.return_error_json;
		}
		return schedulingService.queryMonthSchedulingForWeb(jsonObject);
	}
	/**
	 * @desc 排班管理模块-排班表主页：查询目前排班计划  (APP端)
	 * @param jsonStr
	 * @return
	 * @throws Exception 
	 */
	@POST
	@Path("/queryMonthSchedulingForApp")
	@Produces(MediaType.APPLICATION_JSON)
	public String queryMonthSchedulingForApp(String jsonStr) throws Exception {
		JSONObject jsonObject = JSONObject.parseObject(jsonStr);
		if(StringUtil.isNull(jsonObject, "user_id","project_id","month")) {
			return ToolsUtil.return_error_json;
		}
		return schedulingService.queryMonthSchedulingForApp(jsonObject);
	}
	
	/**
	 * @desc 排班管理模块-排班表主页：添加排班信息
	 * @param jsonStr
	 * @return
	 * @throws Exception 
	 */
	@POST
	@Path("/saveSchedulingPlan")
	@Produces(MediaType.APPLICATION_JSON)
	public String saveSchedulingPlan(String jsonStr) throws Exception {
		JSONObject jsonObject = JSONObject.parseObject(jsonStr);
		if(StringUtil.isNull(jsonObject, "user_id","project_id","month")) {
			return ToolsUtil.return_error_json;
		}
		JSONArray contents = jsonObject.getJSONArray("contents");
		if(contents == null || contents.isEmpty()) {
			return ToolsUtil.return_error_json;
		}
		return schedulingService.saveSchedulingPlan(jsonObject);
	}
	
	/**
	 * @desc 排班管理模块-排班表主页：下载排班上传模板
	 * @param jsonStr
	 * @return
	 */
	@GET
	@Path("/downloadSchedulingTemplateFile")
	@Produces(MediaType.APPLICATION_OCTET_STREAM)
	public String downloadSchedulingTemplateFile(@Context HttpServletResponse response,
			@QueryParam("project_id") String project_id, 
			@QueryParam("month") String month, 
			@QueryParam("user_id") String user_id){
		if(StringUtil.isNull(user_id,project_id,month)) {
			return ToolsUtil.return_error_json;
		}
		
		return schedulingService.downloadSchedulingTemplateFile(response, project_id, month, user_id);
		
	}
	
	
}
