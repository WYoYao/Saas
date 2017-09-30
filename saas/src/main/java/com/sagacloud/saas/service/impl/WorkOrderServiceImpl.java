package com.sagacloud.saas.service.impl;

import java.util.HashMap;
import java.util.Map;
import java.util.Set;

import org.springframework.stereotype.Service;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.sagacloud.saas.common.DataRequestPathUtil;
import com.sagacloud.saas.dao.DBConst.Result;
import com.sagacloud.saas.service.BaseService;
import com.sagacloud.saas.service.WorkOrderServiceI;

/**
 * Created by guosongchao on 2017/9/7.
 */
@Service("workOrderService")
public class WorkOrderServiceImpl extends BaseService implements WorkOrderServiceI{
    @Override
    public String queryMyDraftWorkOrder(String jsonStr) throws Exception {
        String requestUrl = getWorkOrderPath(DataRequestPathUtil.workOrder_service_query_myDraft_workOrder);
        String result = httpPostRequest(requestUrl, jsonStr);
        return result;
    }

    @Override
    public String queryMyPublishWorkOrder(String jsonStr) throws Exception {
        String requestUrl = getWorkOrderPath(DataRequestPathUtil.workOrder_service_query_myPublish_workOrder);
        String result = httpPostRequest(requestUrl, jsonStr);
        return result;
    }

    @Override
    public String queryMyParticipantWorkOrder(String jsonStr) throws Exception {
        String requestUrl = getWorkOrderPath(DataRequestPathUtil.workOrder_service_query_myParticipant_workOrder);
        String result = httpPostRequest(requestUrl, jsonStr);
        return result;
    }

    @Override
    public String deleteDraftWorkOrderById(String jsonStr) throws Exception {
        String requestUrl = getWorkOrderPath(DataRequestPathUtil.workOrder_service_delete_draft_workOrder_by_id);
        String result = httpPostRequest(requestUrl, jsonStr);
        return result;
    }

    @Override
    public String previewWorkOrderById(String jsonStr) throws Exception {
        String requestUrl = getWorkOrderPath(DataRequestPathUtil.workOder_service_preview_workOrder_by_id);
        String result = httpPostRequest(requestUrl, jsonStr);
        return result;
    }

    @Override
    public String queryWorkOrderById(String jsonStr) throws Exception {
        String requestUrl = getWorkOrderPath(DataRequestPathUtil.workOrder_service_query_workOrder_by_id);
        String result = httpPostRequest(requestUrl, jsonStr);
        return result;
    }

    @Override
    public String queryOperateRecord(String jsonStr) throws Exception {
        String requestUrl = getWorkOrderPath(DataRequestPathUtil.workOrder_service_query_operateRecord);
        String result = httpPostRequest(requestUrl, jsonStr);
        return result;
    }

    @Override
    public String queryDraftWorkOrderById(String jsonStr) throws Exception {
        String requestUrl = getWorkOrderPath(DataRequestPathUtil.workOrder_service_query_draft_workOrder_by_id);
        String result = httpPostRequest(requestUrl, jsonStr);
        return result;
    }

    @Override
    public String updateDraftWorkOrder(String jsonStr) throws Exception {
        String requestUrl = getWorkOrderPath(DataRequestPathUtil.workOrder_service_save_draft_workOrder);
        String result = httpPostRequest(requestUrl, jsonStr);
        return result;
    }

    @Override
    public String saveDraftWorkOrder(String jsonStr) throws Exception {
        String requestUrl = getWorkOrderPath(DataRequestPathUtil.workOrder_service_save_draft_workOrder);
        String result = httpPostRequest(requestUrl, jsonStr);
        return result;
    }

    @Override
    public String previewWorkOrder(String jsonStr) throws Exception {
        String requestUrl = getWorkOrderPath(DataRequestPathUtil.workOrder_service_preview_workOrder);
        String result = httpPostRequest(requestUrl, jsonStr);
        return result;
    }

    @Override
    public String publishWorkOrder(String jsonStr) throws Exception {
        String requestUrl = getWorkOrderPath(DataRequestPathUtil.workOrder_service_publish_workOrder);
        String result = httpPostRequest(requestUrl, jsonStr);
        return result;
    }

    @Override
    public String queryAllWorkOrder(String jsonStr) throws Exception {
        String requestUrl = getWorkOrderPath(DataRequestPathUtil.workOrder_service_query_all_workOrder);
        String result = httpPostRequest(requestUrl, jsonStr);
        return result;
    }

    @Override
    public String queryPostDutyForWorkOrder(String jsonStr) throws Exception {
        String requestUrl = getWorkOrderPath(DataRequestPathUtil.workOrder_service_query_postDuty_for_workOrder);
        String result = httpPostRequest(requestUrl, jsonStr);
        return result;
    }

    @Override
    public String doAssignWithAdmin(String jsonStr) throws Exception {
        String requestUrl = getWorkOrderPath(DataRequestPathUtil.workOrder_service_do_assign_admin);
        String result = httpPostRequest(requestUrl, jsonStr);
        return result;
    }

    @Override
    public String doStopWithAdmin(String jsonStr) throws Exception {
        String requestUrl = getWorkOrderPath(DataRequestPathUtil.workOrder_service_do_stop_admin);
        String result = httpPostRequest(requestUrl, jsonStr);
        return result;
    }
    
    
    @Override
    public Map<String, JSONObject> queryWorkOrderByIds(Set<String> workOrderIds) throws Exception {
		Map<String, JSONObject> workMap = new HashMap<>();
		JSONObject jsonObject = new JSONObject();
		jsonObject.put("id", workOrderIds);
		String url = getWorkOrderEnginePath(DataRequestPathUtil.wo_engine_query_by_key);
        String workOrderStr = httpPostRequest(url, jsonObject.toJSONString());
		JSONObject workOrder = JSONObject.parseObject(workOrderStr);
		if(Result.SUCCESS.equals(workOrder.getString(Result.RESULT))) {
			JSONArray workOrderContents = workOrder.getJSONArray(Result.CONTENT);
			if(workOrderContents != null && workOrderContents.size() > 0) {
				workOrder = workOrderContents.getJSONObject(0);
				workOrder = workOrder.getJSONObject("work_order");
				if(workOrder != null) {
					JSONObject workOrderBody = workOrder.getJSONObject("wo_body");
					if(workOrderBody != null) {
						String order_id = workOrderBody.getString("order_id");
						workMap.put(order_id, workOrderBody);
					}
				}
			}
		}
		return workMap;
	}
    
}
