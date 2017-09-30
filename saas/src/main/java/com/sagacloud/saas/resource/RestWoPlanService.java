package com.sagacloud.saas.resource;

import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.springframework.beans.factory.annotation.Autowired;

import com.alibaba.fastjson.JSONObject;
import com.sagacloud.saas.common.StringUtil;
import com.sagacloud.saas.common.ToolsUtil;
import com.sagacloud.saas.service.WoPlanServiceI;

/**
 * 工单计划
 * @author guosongchao
 * @mail guosongchao@persagy.com
 */
@Path("restWoPlanService")
public class RestWoPlanService {
	
	@Autowired
	private WoPlanServiceI woPlanService;
	
	/**
	 * 查询tab标签列表
	 * @param jsonStr
	 * @return
	 * @throws Exception
	 */
	@Path("queryTabList")
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	public String queryTabList(String jsonStr) throws Exception{
		if(!StringUtil.isNull(JSONObject.parseObject(jsonStr), "user_id", "project_id")){
			return woPlanService.queryTabList(jsonStr);
		}
		return ToolsUtil.return_error_json;
	}
	
	/**
	 * 查询工单计划执行列表
	 * @param jsonStr
	 * @return
	 * @throws Exception
	 */
	@Path("queryWoPlanExecuteList")
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	public String queryWoPlanExecuteList(String jsonStr) throws Exception{
		if(!StringUtil.isNull(JSONObject.parseObject(jsonStr), "user_id", "project_id", "order_type", "start_time", "end_time")){
			return woPlanService.queryWoPlanExecuteList(jsonStr);
		}
		return ToolsUtil.return_error_json;
	}
	
	/**
	 * 查询工单计划执行列表-频率日
	 * @param jsonStr
	 * @return
	 * @throws Exception
	 */
	@Path("queryWoPlanDayExecuteList")
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	public String queryWoPlanDayExecuteList(String jsonStr) throws Exception{
		if(!StringUtil.isNull(JSONObject.parseObject(jsonStr), "user_id", "project_id", "order_type", "start_time", "end_time")){
			return woPlanService.queryWoPlanDayExecuteList(jsonStr);
		}
		return ToolsUtil.return_error_json;
	}
	
	/**
	 * 获得工单事项预览
	 * @param jsonStr
	 * @return
	 * @throws Exception
	 */
	@Path("getWoMattersPreview")
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	public String getWoMattersPreview(String jsonStr) throws Exception{
		JSONObject jsonObject = JSONObject.parseObject(jsonStr);
		if(!StringUtil.isNull(jsonObject, "user_id", "project_id") && !StringUtil.isEmptyList(jsonObject, "draft_matters")){
			return woPlanService.getWoMattersPreview(jsonStr);
		}
		return ToolsUtil.return_error_json;
	}
	
	/**
	 * 发布/添加工单计划
	 * @param jsonStr
	 * @return
	 * @throws Exception
	 */
	@Path("addWoPlan")
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	public String addWoPlan(String jsonStr) throws Exception{
		JSONObject jsonObject = JSONObject.parseObject(jsonStr);
		if(!StringUtil.isNull(jsonObject, "user_id", "project_id", "plan_name", "order_type", "urgency", "ahead_create_time", "freq_cycle", "freq_num", "plan_start_type")
				&& !StringUtil.isEmptyList(jsonObject, "freq_times", "draft_matters", "published_matters")){
			return woPlanService.addWoPlan(jsonStr);
		}
		return ToolsUtil.return_error_json;
	}
	
	/**
	 * 根据Id查询工单计划的详细信息
	 * @param jsonStr
	 * @return
	 * @throws Exception
	 */
	@Path("queryWoPlanById")
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	public String queryWoPlanById(String jsonStr) throws Exception{
		if(!StringUtil.isNull(JSONObject.parseObject(jsonStr), "user_id", "plan_id")){
			return woPlanService.queryWoPlanById(jsonStr);
		}
		return ToolsUtil.return_error_json;
	}
	
	/**
	 * 作废工单计划
	 * @param jsonStr
	 * @return
	 * @throws Exception
	 */
	@Path("destroyWoPlanById")
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	public String destroyWoPlanById(String jsonStr) throws Exception{
		if(!StringUtil.isNull(JSONObject.parseObject(jsonStr), "user_id", "plan_id")){
			return woPlanService.destroyWoPlanById(jsonStr);
		}
		return ToolsUtil.return_error_json;
	}
	
	/**
	 * 查询工单计划的历史列表
	 * @param jsonStr
	 * @return
	 * @throws Exception
	 */
	@Path("queryWoPlanHisList")
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	public String queryWoPlanHisList(String jsonStr) throws Exception{
		if(!StringUtil.isNull(JSONObject.parseObject(jsonStr), "user_id", "project_id", "plan_id")){
			return woPlanService.queryWoPlanHisList(jsonStr);
		}
		return ToolsUtil.return_error_json;
	}
	
	/**
	 * 查询作废的计划列表
	 * @param jsonStr
	 * @return
	 * @throws Exception
	 */
	@Path("queryDestroyedWoPlanList")
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	public String queryDestroyedWoPlanList(String jsonStr) throws Exception{
		if(!StringUtil.isNull(JSONObject.parseObject(jsonStr), "user_id", "project_id")){
			return woPlanService.queryDestroyedWoPlanList(jsonStr);
		}
		return ToolsUtil.return_error_json;
	}
	
	/**
	 * 查询工单计划生成的工单列表
	 * @param jsonStr
	 * @return
	 * @throws Exception
	 */
	@Path("queryWoListByPlanId")
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	public String queryWoListByPlanId(String jsonStr) throws Exception{
		if(!StringUtil.isNull(JSONObject.parseObject(jsonStr), "user_id", "project_id", "plan_id")){
			return woPlanService.queryWoListByPlanId(jsonStr);
		}
		return ToolsUtil.return_error_json;
	}
	
	/**
	 * 根据Id编辑工单计划信息
	 * @param jsonStr
	 * @return
	 * @throws Exception
	 */
	@Path("updateWoPlan")
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	public String updateWoPlan(String jsonStr) throws Exception{
		if(!StringUtil.isNull(JSONObject.parseObject(jsonStr), "user_id", "project_id", "plan_id", "plan_name", "order_type", "urgency")){
			return woPlanService.updateWoPlan(jsonStr);
		}
		return ToolsUtil.return_error_json;
	}
}
