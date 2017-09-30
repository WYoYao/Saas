package com.sagacloud.saas.resource;

import com.alibaba.fastjson.JSONObject;
import com.sagacloud.saas.common.StringUtil;
import com.sagacloud.saas.common.ToolsUtil;
import com.sagacloud.saas.service.FlowPlanServiceI;

import org.springframework.beans.factory.annotation.Autowired;

import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

/**
 * Created by guosongchao on 2017/9/7.
 */
@Path("restFlowPlanService")
public class RestFlowPlanService {

    @Autowired
    private FlowPlanServiceI flowPlanService;

    /**
     * 查询项目下所有方案
     * @param jsonStr
     * @return
     * @throws Exception
     */
    @Path("queryProjectFlowPlan")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public String queryProjectFlowPlan(String jsonStr) throws Exception{
        if(!StringUtil.isNull(JSONObject.parseObject(jsonStr), "user_id", "project_id")){
            return flowPlanService.queryProjectFlowPlan(jsonStr);
        }
        return ToolsUtil.return_error_json;
    }

    /**
     * 查询流转方案提醒消息
     * @param jsonStr
     * @return
     * @throws Exception
     */
    @Path("queryFlowPlanRemindMsg")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public String queryFlowPlanRemindMsg(String jsonStr) throws Exception{
        if(!StringUtil.isNull(JSONObject.parseObject(jsonStr), "user_id", "project_id")){
            return flowPlanService.queryFlowPlanRemindMsg(jsonStr);
        }
        return ToolsUtil.return_error_json;
    }

    /**
     * 根据Id删除流转方案信息
     * @param jsonStr
     * @return
     * @throws Exception
     */
    @Path("deleteFlowPlanById")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public String deleteFlowPlanById(String jsonStr) throws Exception{
        if(!StringUtil.isNull(JSONObject.parseObject(jsonStr), "user_id", "plan_id")){
            return flowPlanService.deleteFlowPlanById(jsonStr);
        }
        return ToolsUtil.return_error_json;
    }

    /**
     * 验证是否可以创建某种类型方案
     * @param jsonStr
     * @return
     * @throws Exception
     */
    @Path("verifyFlowPlanType")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public String verifyFlowPlanType(String jsonStr) throws Exception{
    	if(!StringUtil.isNull(JSONObject.parseObject(jsonStr), "user_id", "project_id", "order_type", "execute_type")){
    		return flowPlanService.verifyFlowPlanType(jsonStr);
    	}
    	return ToolsUtil.return_error_json;
    }
    
    /**
	 * 功能描述：验证工单方案岗位职责
	 * @param jsonStr
	 * @return
	 * @throws Exception
	 */
	@Path("verifyPostAndDuty")
	@POST
	@Produces(MediaType.APPLICATION_JSON)
    public String verifyPostAndDuty(String jsonStr) throws Exception{
    	JSONObject jsonObject = JSONObject.parseObject(jsonStr);
		if(!StringUtil.isNull(jsonObject, "user_id", "project_id") && !StringUtil.isEmptyList(jsonObject, "post_and_duty")){
			return flowPlanService.verifyPostAndDuty(jsonStr);
		}
		return ToolsUtil.return_error_json;
    }
    
    /**
     * 添加工单流转方案信息
     * @param jsonStr
     * @return
     * @throws Exception
     */
    @Path("addFlowPlan")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public String addFlowPlan(String jsonStr) throws Exception{
        JSONObject jsonObject = JSONObject.parseObject(jsonStr);
        if(!StringUtil.isNull(jsonObject, "user_id", "project_id", "order_type", "execute_type") && !StringUtil.isEmptyList(jsonObject, "post_and_duty")){
            return flowPlanService.addFlowPlan(jsonStr);
        }
        return ToolsUtil.return_error_json;
    }

    /**
     * 根据Id查询流转方案详细信息
     * @param jsonStr
     * @return
     * @throws Exception
     */
    @Path("queryFlowPlanById")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public String queryFlowPlanById(String jsonStr) throws Exception{
        if(!StringUtil.isNull(JSONObject.parseObject(jsonStr), "user_id", "plan_id")){
            return flowPlanService.queryFlowPlanById(jsonStr);
        }
        return ToolsUtil.return_error_json;
    }

    /**
     * 根据Id编辑流转方案信息
     * @param jsonStr
     * @return
     * @throws Exception
     */
    @Path("updateFlowPlanById")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public String updateFlowPlanById(String jsonStr) throws Exception{
        if(!StringUtil.isNull(JSONObject.parseObject(jsonStr), "user_id", "plan_id")){
            return flowPlanService.updateFlowPlanById(jsonStr);
        }
        return ToolsUtil.return_error_json;
    }
}
