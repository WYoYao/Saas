package com.sagacloud.saas.service.impl;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.sagacloud.saas.common.CommonConst;
import com.sagacloud.saas.common.DataRequestPathUtil;
import com.sagacloud.saas.common.JSONUtil;
import com.sagacloud.saas.common.StringUtil;
import com.sagacloud.saas.common.ToolsUtil;
import com.sagacloud.saas.dao.DBCommonMethods;
import com.sagacloud.saas.dao.DBConst;
import com.sagacloud.saas.service.BaseService;
import com.sagacloud.saas.service.FlowPlanServiceI;
import com.sagacloud.saas.service.GeneralDictServiceI;

/**
 * Created by guosongchao on 2017/9/7.
 */
@Service("flowPlanService")
public class FlowPlanServiceImpl extends BaseService implements FlowPlanServiceI {
	
	@Autowired
	private GeneralDictServiceI generalDictService;
	
    @Override
    public String queryProjectFlowPlan(String jsonStr) throws Exception {
        String requestUrl = getWorkOrderPath(DataRequestPathUtil.workOrder_service_query_flowPlan_by_projectId);
        return httpPostRequest(requestUrl, jsonStr);
    }

    @Override
    public String queryFlowPlanRemindMsg(String jsonStr) throws Exception {
    	JSONObject jsonObject = JSONObject.parseObject(jsonStr);
        String requestUrl = getWorkOrderPath(DataRequestPathUtil.workOrder_service_query_flowPlan_by_projectId);
        String resultStr = httpPostRequest(requestUrl, jsonStr);
        JSONObject flowPlanJson = JSONObject.parseObject(resultStr);
        if("success".equals(flowPlanJson.getString("Result"))){
        	jsonObject.put("dict_type", CommonConst.dict_type_work_order_type);
        	String orderTypeStr = generalDictService.queryGeneralDictByKey(jsonObject);
        	if(orderTypeStr.contains("failure")){
        		return orderTypeStr;
        	}
        	String remind = "";
        	Map<String, String> orderTypeMap = new HashMap<String, String>();
        	JSONObject orderTypeJson = JSONObject.parseObject(orderTypeStr);
        	JSONArray orderTypes = orderTypeJson.getJSONArray("Content");
        	orderTypes = orderTypes == null ? new JSONArray() : orderTypes;
        	JSONObject orderType;
        	for(int i=0; i<orderTypes.size(); i++){
        		orderType = orderTypes.getJSONObject(i);
        		orderTypeMap.put(orderType.getString("code"), orderType.getString("name"));
        	}
        	JSONArray flowPlans = flowPlanJson.getJSONArray("Content");
        	flowPlans = flowPlans == null ? new JSONArray() : flowPlans;
        	JSONObject flowPlan;
        	String planOrderType;
        	for(int i=0; i<flowPlans.size(); i++){
        		if(orderTypeMap.size() == 0){
        			break;
        		}
        		flowPlan = flowPlans.getJSONObject(i);
        		planOrderType = flowPlan.getString("order_type");
        		if(!StringUtil.isNull(planOrderType)){
        			orderTypeMap.remove(planOrderType);
        		}
        	}
        	for(String key : orderTypeMap.keySet()){
        		if("".equals(remind)){
        			remind = "您当前有以下工单类型尚未配置流转方案：" + orderTypeMap.get(key) + "工单";
        		}else{
        			remind = remind + "、" + orderTypeMap.get(key) + "工单";
        		}
        	}
        	JSONObject item = new JSONObject();
        	item.put("remind", remind);
        	resultStr = ToolsUtil.successJsonMsg(item);
        }
        return resultStr;
    }

    @Override
    public String deleteFlowPlanById(String jsonStr) throws Exception {
        String requestUrl = getWorkOrderPath(DataRequestPathUtil.workOrder_service_delete_flowPlan_by_id);
        return httpPostRequest(requestUrl, jsonStr);
    }
    
    @Override
    public String verifyFlowPlanType(String jsonStr) throws Exception{
    	JSONObject jsonObject = JSONObject.parseObject(jsonStr);
    	String planId = jsonObject.getString("plan_id");
    	boolean canUse = true;
    	jsonObject.put(DBConst.TABLE_FIELD_VALID, true);
    	String param = JSONUtil.getCriteriaWithMajors(jsonObject, "project_id", "order_type", "execute_type", "valid").toJSONString();
    	String resultStr = DBCommonMethods.queryRecordByCriteria(DBConst.DATABASE_WORK_ORDER, DBConst.TABLE_WO_FLOW_PLAN, param);
    	if(resultStr.contains("failure"))
    		return resultStr;
    	JSONObject resultJson = JSONObject.parseObject(resultStr);
    	JSONArray resultArr = resultJson.getJSONArray("Content");
    	if(resultArr != null && resultArr.size() > 0){
    		if(StringUtil.isNull(planId)){
    			canUse = false;
    		}else{
	    		for(int i=0; i<resultArr.size(); i++){
	    			JSONObject result = resultArr.getJSONObject(i);
	    			if(!planId.equals(result.getString("plan_id"))){
	    				canUse = false;
	    				break;
	    			}
	    		}
    		}
    	}
    	JSONObject item = new JSONObject();
    	item.put("can_use", canUse);
    	resultStr = ToolsUtil.successJsonMsg(item);
    	return resultStr;
    }

    @Override
    public String verifyPostAndDuty(String jsonStr) throws Exception {
        String requestUrl = getWorkOrderPath(DataRequestPathUtil.workOrder_service_verify_postAndDuty);
        return httpPostRequest(requestUrl, jsonStr);
    }
    
    @Override
    public String addFlowPlan(String jsonStr) throws Exception {
        String requestUrl = getWorkOrderPath(DataRequestPathUtil.workOrder_service_add_flowPlan);
        return httpPostRequest(requestUrl, jsonStr);
    }

    @Override
    public String queryFlowPlanById(String jsonStr) throws Exception {
        String requestUrl = getWorkOrderPath(DataRequestPathUtil.workOrder_service_query_flowPlan_id);
        return httpPostRequest(requestUrl, jsonStr);
    }

    @Override
    public String updateFlowPlanById(String jsonStr) throws Exception {
        String requestUrl = getWorkOrderPath(DataRequestPathUtil.workOrder_service_update_flowPlan_id);
        return httpPostRequest(requestUrl, jsonStr);
    }
}
