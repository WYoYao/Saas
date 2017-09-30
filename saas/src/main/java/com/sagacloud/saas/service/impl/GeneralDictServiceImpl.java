package com.sagacloud.saas.service.impl;


import java.util.HashSet;
import java.util.Set;

import org.springframework.stereotype.Service;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.sagacloud.saas.cache.DictionaryCache;
import com.sagacloud.saas.cache.ProjectPersonCache;
import com.sagacloud.saas.common.CommonConst;
import com.sagacloud.saas.common.JSONUtil;
import com.sagacloud.saas.common.StringUtil;
import com.sagacloud.saas.common.ToolsUtil;
import com.sagacloud.saas.dao.DBCommonMethods;
import com.sagacloud.saas.dao.DBConst;
import com.sagacloud.saas.dao.DBConst.Result;
import com.sagacloud.saas.service.GeneralDictServiceI;

/**
 * @desc 数据字典
 * @author gezhanbin
 *
 */
@Service("generalDictService")
public class GeneralDictServiceImpl implements GeneralDictServiceI {

	@Override
	public String queryGeneralDictByKey(JSONObject jsonObject) {
		JSONObject resultJson = JSONObject.parseObject("{}");
		String result = "success";
		JSONArray contents = new JSONArray();
		String project_id = jsonObject.getString("project_id");
		
		jsonObject.put(DBConst.TABLE_FIELD_VALID, true);
		jsonObject = JSONUtil.getCriteriaWithMajors(jsonObject, "dict_type",DBConst.TABLE_FIELD_VALID);
		String queryResult = DBCommonMethods.queryRecordByCriteria(DBConst.TABLE_GENERAL_DICTIONARY, jsonObject.toJSONString());
		if(queryResult.contains(Result.SUCCESS) && queryResult.contains(Result.CONTENT)) {
			JSONObject dicttypeJson = JSONObject.parseObject(queryResult);
			JSONArray resultContents = dicttypeJson.getJSONArray(Result.CONTENT);
			if(resultContents != null && resultContents.size() > 0) {
				for (int i = 0; i < resultContents.size(); i++) {
					JSONObject resultContent = resultContents.getJSONObject(i);
					String code = resultContent.getString("code");
					String name = resultContent.getString("name");
					String description = resultContent.getString("description");
					Boolean default_use = resultContent.getBoolean("default_use");
					String customer_use = resultContent.getString("customer_use");
					String customer_name = resultContent.getString("customer_name");
					String project_ids_str = resultContent.getString("project_ids");
					JSONObject customerUseJson = null;
					if(!StringUtil.isNull(customer_use)) {
						customerUseJson = JSONObject.parseObject(customer_use);
					}
					Boolean proCustomerUse = null;
					if(customerUseJson != null) {
						proCustomerUse = customerUseJson.getBoolean(project_id);
					}
					JSONObject customerNameJson = null;
					if(!StringUtil.isNull(customer_name)) {
						customerNameJson = JSONObject.parseObject(customer_name);
					}
					//1、customer_use=true
					//2、customer_use=null && default_use=true 或者null
					if(customerNameJson != null) {
						String proCustomerName = customerNameJson.getString(project_id);
						if(proCustomerName != null && !"".equals(proCustomerName)) {
							name = proCustomerName;
						}
					}
					JSONArray project_ids = null;
					if(!StringUtil.isNull(project_ids_str)) {
						project_ids = JSONArray.parseArray(project_ids_str);
					}
					
					JSONObject content = new JSONObject();
					content.put("code", code);
					content.put("name", name);
					content.put("description", description);
					
					if(proCustomerUse == null) {
						if(default_use == null || default_use) {
							//2、customer_use=null && null 或者 default_use=true
//							contents.add(content);
							if(project_ids == null || project_ids.size() == 0) {
								contents.add(content);
							} else {
								if(project_ids.contains(project_id)) {
									contents.add(content);
								}
							}
							
						}
					} else if(proCustomerUse) {
						//1、customer_use=true
						contents.add(content);
					}
				}
			}
		}
		
		resultJson.put(Result.RESULT, result);
		resultJson.put(Result.CONTENT, contents);
		resultJson.put(Result.COUNT, contents.size());
		
		return resultJson.toJSONString();
	}

	@Override
	public String queryWorkOrderType(String jsonStr) throws Exception {
		JSONObject jsonObject = JSONObject.parseObject(jsonStr);
		String personId = jsonObject.getString("user_id");
		String projectId = jsonObject.getString("project_id");
		String position = ProjectPersonCache.getPosition(projectId, personId);
		jsonObject.put(DBConst.TABLE_FIELD_VALID, true);
		String params = JSONUtil.getCriteriaWithMajors(jsonObject, "project_id", "valid").toJSONString();
		String resultStr = DBCommonMethods.queryRecordByCriteria(DBConst.DATABASE_WORK_ORDER, DBConst.TABLE_WO_FLOW_PLAN, params);
		if(resultStr.contains("failure")){
			return resultStr;
		}
		Set<String> workOrderType = new HashSet<String>();
		JSONObject flowPlan, postAndDuty, duty;
		JSONArray postAndDutyArr, dutyArr;
		JSONObject resultJson = JSONObject.parseObject(resultStr);
		JSONArray flowPlanArr = (JSONArray)resultJson.getOrDefault("Content", new JSONArray());
		for(int i=0; i<flowPlanArr.size(); i++){
			flowPlan = flowPlanArr.getJSONObject(i);
			postAndDutyArr = JSONArray.parseArray((String)flowPlan.getOrDefault("post_and_duty", "[]"));
			boolean isBreak = false;
			for(int j=0; j<postAndDutyArr.size(); j++){
				postAndDuty = postAndDutyArr.getJSONObject(j);
				if("2".equals(postAndDuty.getString("type")) && postAndDuty.getString("name").equals(position)){
					//
					dutyArr = (JSONArray)postAndDuty.getOrDefault("duty", new JSONArray());
					for(int k=0; k<dutyArr.size(); k++){
						duty = dutyArr.getJSONObject(k);
						if(CommonConst.dict_wo_order_control_create.equals(duty.getString("control_code"))){
							workOrderType.add(flowPlan.getString("order_type"));
							isBreak = true;
							break;
						}
					}
				}else if("3".equals(postAndDuty.getString("type")) && personId.equals(postAndDuty.getString("person_id"))){
					//
					dutyArr = (JSONArray)postAndDuty.getOrDefault("duty", new JSONArray());
					for(int k=0; k<dutyArr.size(); k++){
						duty = dutyArr.getJSONObject(k);
						if(CommonConst.dict_wo_order_control_create.equals(duty.getString("control_code"))){
							workOrderType.add(flowPlan.getString("order_type"));
							isBreak = true;
							break;
						}
					}
				}
				if(isBreak){
					break;
				}
			}
		}
		JSONObject returnItem;
		JSONArray returnArr = new JSONArray();
		for(String orderType : workOrderType){
			returnItem = new JSONObject();
			returnItem.put("code", orderType);
			returnItem.put("name", DictionaryCache.getNameByTypeCode(CommonConst.dict_type_work_order_type, orderType, projectId));
			returnArr.add(returnItem);
		}
		return ToolsUtil.successJsonMsg(returnArr);
	}

	@Override
	public String querydictName(JSONObject jsonObject) {
		String project_id = jsonObject.getString("project_id"); 
		String dict_name = "";
		jsonObject.put(DBConst.TABLE_FIELD_VALID, true);
		jsonObject = JSONUtil.getCriteriaWithMajors(jsonObject, "dict_type", "code", DBConst.TABLE_FIELD_VALID);
		String queryResult = DBCommonMethods.queryRecordByCriteria(DBConst.TABLE_GENERAL_DICTIONARY, jsonObject.toJSONString());
		if(queryResult.contains(Result.SUCCESS) && queryResult.contains(Result.CONTENT)) {
			JSONObject dicttypeJson = JSONObject.parseObject(queryResult);
			JSONArray resultContents = dicttypeJson.getJSONArray(Result.CONTENT);
			if(resultContents != null && resultContents.size() > 0) {
				JSONObject resultContent = resultContents.getJSONObject(0);
				String name = resultContent.getString("name");
				Boolean default_use = resultContent.getBoolean("default_use");
				String customer_use = resultContent.getString("customer_use");
				String customer_name = resultContent.getString("customer_name");
				String project_ids_str = resultContent.getString("project_ids");
				JSONObject customerUseJson = null;
				if(!StringUtil.isNull(customer_use)) {
					customerUseJson = JSONObject.parseObject(customer_use);
				}
				Boolean proCustomerUse = null;
				if(customerUseJson != null) {
					proCustomerUse = customerUseJson.getBoolean(project_id);
				}
				JSONObject customerNameJson = null;
				if(!StringUtil.isNull(customer_name)) {
					customerNameJson = JSONObject.parseObject(customer_name);
				}
				if(customerNameJson != null) {
					String proCustomerName = customerNameJson.getString(project_id);
					if(proCustomerName != null && !"".equals(proCustomerName)) {
						name = proCustomerName;
					}
				}
				JSONArray project_ids = null;
				if(!StringUtil.isNull(project_ids_str)) {
					project_ids = JSONArray.parseArray(project_ids_str);
				}
				if(proCustomerUse == null) {
					if(default_use == null || default_use) {
						if(project_ids == null || project_ids.size() == 0) {
							dict_name = name;
						} else {
							if(project_ids.contains(project_id)) {
								dict_name = name;
							}
						}
					}
				} else if(proCustomerUse) {
					dict_name = name;
				}
			}
		}
		return dict_name;
	}
	
}
