package com.sagacloud.saas.service.impl;

import org.springframework.stereotype.Service;

import com.sagacloud.saas.common.DataRequestPathUtil;
import com.sagacloud.saas.service.BaseService;
import com.sagacloud.saas.service.WoPlanServiceI;

@Service("woPlanService")
public class WoPlanServiceImpl extends BaseService implements WoPlanServiceI {

	@Override
	public String queryTabList(String jsonStr) throws Exception {
		String requstUrl = getWorkOrderPath(DataRequestPathUtil.workOrder_service_query_tab_list);
		return httpPostRequest(requstUrl, jsonStr);
	}

	@Override
	public String queryWoPlanExecuteList(String jsonStr) throws Exception {
		String requstUrl = getWorkOrderPath(DataRequestPathUtil.workOrder_service_query_woPlan_execute_list);
		return httpPostRequest(requstUrl, jsonStr);
	}

	@Override
	public String queryWoPlanDayExecuteList(String jsonStr) throws Exception {
		String requstUrl = getWorkOrderPath(DataRequestPathUtil.workOrder_service_query_woPlan_day_execute_list);
		return httpPostRequest(requstUrl, jsonStr);
	}

	@Override
	public String getWoMattersPreview(String jsonStr) throws Exception {
		String requstUrl = getWorkOrderPath(DataRequestPathUtil.workOrder_service_get_woMatters_preview);
		return httpPostRequest(requstUrl, jsonStr);
	}

	@Override
	public String addWoPlan(String jsonStr) throws Exception {
		String requstUrl = getWorkOrderPath(DataRequestPathUtil.workOrder_service_add_woPlan);
		return httpPostRequest(requstUrl, jsonStr);
	}

	@Override
	public String queryWoPlanById(String jsonStr) throws Exception {
		String requstUrl = getWorkOrderPath(DataRequestPathUtil.workOrder_service_query_woPlan_by_id);
		return httpPostRequest(requstUrl, jsonStr);
	}

	@Override
	public String destroyWoPlanById(String jsonStr) throws Exception {
		String requstUrl = getWorkOrderPath(DataRequestPathUtil.workOrder_service_destroy_woPlan_by_id);
		return httpPostRequest(requstUrl, jsonStr);
	}

	@Override
	public String queryWoPlanHisList(String jsonStr) throws Exception {
		String requstUrl = getWorkOrderPath(DataRequestPathUtil.workOrder_service_query_woPlan_his_list);
		return httpPostRequest(requstUrl, jsonStr);
	}

	@Override
	public String queryDestroyedWoPlanList(String jsonStr) throws Exception {
		String requstUrl = getWorkOrderPath(DataRequestPathUtil.workOrder_service_query_destoryed_woPlan_list);
		return httpPostRequest(requstUrl, jsonStr);
	}

	@Override
	public String queryWoListByPlanId(String jsonStr) throws Exception {
		String requstUrl = getWorkOrderPath(DataRequestPathUtil.workOrder_service_query_wo_list_by_planId);
		return httpPostRequest(requstUrl, jsonStr);
	}

	@Override
	public String updateWoPlan(String jsonStr) throws Exception {
		String requstUrl = getWorkOrderPath(DataRequestPathUtil.workOrder_service_update_woPlan);
		return httpPostRequest(requstUrl, jsonStr);
	}

}
