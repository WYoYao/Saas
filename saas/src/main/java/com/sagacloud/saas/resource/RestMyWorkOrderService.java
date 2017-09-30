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
 * Created by guosongchao on 2017/9/6.
 */
@Path("restMyWorkOrderService")
public class RestMyWorkOrderService {

    @Autowired
    private WorkOrderServiceI workOrderService;

    /**
     * 查询我的草稿工单
     * @param jsonStr
     * @return
     * @throws Exception
     */
    @Path("queryMyDraftWorkOrder")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public String queryMyDraftWorkOrder(String jsonStr) throws Exception{
        if(!StringUtil.isNull(JSONObject.parseObject(jsonStr), "user_id", "project_id")){
            return workOrderService.queryMyDraftWorkOrder(jsonStr);
        }
        return ToolsUtil.return_error_json;
    }

    /**
     * 查询我发布的工单
     * @param jsonStr
     * @return
     * @throws Exception
     */
    @Path("queryMyPublishWorkOrder")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public String queryMyPublishWorkOrder(String jsonStr) throws Exception{
        if(!StringUtil.isNull(JSONObject.parseObject(jsonStr), "user_id", "project_id", "page", "page_size")){
            return workOrderService.queryMyPublishWorkOrder(jsonStr);
        }
        return ToolsUtil.return_error_json;
    }

    /**
     * 查询我参与的工单
     * @param jsonStr
     * @return
     * @throws Exception
     */
    @Path("queryMyParticipantWorkOrder")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public String queryMyParticipantWorkOrder(String jsonStr) throws Exception{
        if(!StringUtil.isNull(JSONObject.parseObject(jsonStr), "user_id", "project_id", "page", "page_size")){
            return workOrderService.queryMyParticipantWorkOrder(jsonStr);
        }
        return ToolsUtil.return_error_json;
    }

    /**
     * 删除草稿工单
     * @param jsonStr
     * @return
     * @throws Exception
     */
    @Path("deleteDraftWorkOrderById")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public String deleteDraftWorkOrderById(String jsonStr) throws Exception{
        if(!StringUtil.isNull(JSONObject.parseObject(jsonStr), "user_id", "order_id")){
            return workOrderService.deleteDraftWorkOrderById(jsonStr);
        }
        return ToolsUtil.return_error_json;
    }

    /**
     * 预览草稿工单
     * @param jsonStr
     * @return
     * @throws Exception
     */
    @Path("previewWorkOrderById")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public String previewWorkOrderById(String jsonStr) throws Exception{
        if(!StringUtil.isNull(JSONObject.parseObject(jsonStr), "user_id", "order_id")){
            return workOrderService.previewWorkOrderById(jsonStr);
        }
        return ToolsUtil.return_error_json;
    }

    /**
     * 根据id查询工单详细信息-发布后的
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
     * 查询工单的操作记录
     * @param jsonStr
     * @return
     * @throws Exception
     */
    @Path("queryOperateRecord")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public String queryOperateRecord(String jsonStr) throws Exception{
        if(!StringUtil.isNull(JSONObject.parseObject(jsonStr), "user_id", "order_id")){
            return workOrderService.queryOperateRecord(jsonStr);
        }
        return ToolsUtil.return_error_json;
    }

    /**
     * 根据id查询工单详细信息-草稿的
     * @param jsonStr
     * @return
     * @throws Exception
     */
    @Path("queryDraftWorkOrderById")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public String queryDraftWorkOrderById(String jsonStr) throws Exception{
        if(!StringUtil.isNull(JSONObject.parseObject(jsonStr), "user_id", "order_id")){
            return workOrderService.queryDraftWorkOrderById(jsonStr);
        }
        return ToolsUtil.return_error_json;
    }

    /**
     * 编辑工单草稿
     * @param jsonStr
     * @return
     * @throws Exception
     */
    @Path("updateDraftWorkOrder")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public String updateDraftWorkOrder(String jsonStr) throws Exception{
        if(!StringUtil.isNull(JSONObject.parseObject(jsonStr), "user_id", "order_id")){
            return workOrderService.updateDraftWorkOrder(jsonStr);
        }
        return ToolsUtil.return_error_json;
    }

    /**
     * 保存工单草稿
     * @param jsonStr
     * @return
     * @throws Exception
     */
    @Path("saveDraftWorkOrder")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public String saveDraftWorkOrder(String jsonStr) throws Exception{
        if(!StringUtil.isNull(JSONObject.parseObject(jsonStr), "user_id")){
            return workOrderService.saveDraftWorkOrder(jsonStr);
        }
        return ToolsUtil.return_error_json;
    }

    /**
     * 预览工单草稿
     * @param jsonStr
     * @return
     * @throws Exception
     */
    @Path("previewWorkOrder")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public String previewWorkOrder(String jsonStr) throws Exception{
        if(!StringUtil.isNull(JSONObject.parseObject(jsonStr), "user_id")){
            return workOrderService.previewWorkOrder(jsonStr);
        }
        return ToolsUtil.return_error_json;
    }

    /**
     * 发布工单
     * @param jsonStr
     * @return
     * @throws Exception
     */
    @Path("publishWorkOrder")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public String publishWorkOrder(String jsonStr) throws Exception{
        if(!StringUtil.isNull(JSONObject.parseObject(jsonStr), "user_id")){
            return workOrderService.publishWorkOrder(jsonStr);
        }
        return ToolsUtil.return_error_json;
    }
}
