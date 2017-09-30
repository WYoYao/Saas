package com.sagacloud.saas.resource;

import com.alibaba.fastjson.JSONObject;
import com.sagacloud.saas.common.StringUtil;
import com.sagacloud.saas.common.ToolsUtil;
import com.sagacloud.saas.service.WorkOrderServiceI;

import org.springframework.beans.factory.annotation.Autowired;

import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

/**
 * Created by DOOM on 2017/9/7.
 */
@Path("restWoMonitorService")
public class RestWoMonitorService {

    @Autowired
    private WorkOrderServiceI workOrderService;

    /**
     * 查询项目下所有工单
     * @param jsonStr
     * @return
     * @throws Exception
     */
    @Path("queryAllWorkOrder")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public String queryAllWorkOrder(String jsonStr) throws Exception{
        if(!StringUtil.isNull(JSONObject.parseObject(jsonStr), "user_id", "project_id", "page", "page_size")){
            return workOrderService.queryAllWorkOrder(jsonStr);
        }
        return ToolsUtil.return_error_json;
    }

    /**
     * 根据id查询工单信息
     * @param jsonStr
     * @return
     * @throws Exception
     */
    @Path("queryWorkOrderById")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public String queryWorkOrderById(String jsonStr) throws Exception{
        if(!StringUtil.isNull(JSONObject.parseObject(jsonStr), "user_id", "order_id")){
            return workOrderService.queryWorkOrderById(jsonStr);
        }
        return ToolsUtil.return_error_json;
    }

    /**
     * 查询工单岗位职责
     * @param jsonStr
     * @return
     * @throws Exception
     */
    @Path("queryPostDutyForWorkOrder")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public String queryPostDutyForWorkOrder(String jsonStr) throws Exception{
        if(!StringUtil.isNull(JSONObject.parseObject(jsonStr), "user_id", "project_id", "order_type", "execute_type")){
            return workOrderService.queryPostDutyForWorkOrder(jsonStr);
        }
        return ToolsUtil.return_error_json;
    }

    /**
     * 管理员指派
     * @param jsonStr
     * @return
     * @throws Exception
     */
    @Path("doAssignWithAdmin")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public String doAssignWithAdmin(String jsonStr) throws Exception{
        if(!StringUtil.isNull(JSONObject.parseObject(jsonStr), "user_id", "project_id", "order_id", "operator_id", "operator_name")){
            return workOrderService.doAssignWithAdmin(jsonStr);
        }
        return ToolsUtil.return_error_json;
    }

    /**
     * 直接关闭（中止操作）
     * @param jsonStr
     * @return
     * @throws Exception
     */
    @Path("doStopWithAdmin")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public String doStopWithAdmin(String jsonStr) throws Exception{
        if(!StringUtil.isNull(JSONObject.parseObject(jsonStr), "user_id", "project_id", "order_id", "operator_id", "operator_name", "opinion")){
            return workOrderService.doStopWithAdmin(jsonStr);
        }
        return ToolsUtil.return_error_json;
    }

}
