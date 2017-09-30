package com.sagacloud.saasmanage.service.impl;

import java.io.File;
import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.google.common.io.Files;
import com.sagacloud.saasmanage.cache.DictionaryCache;
import com.sagacloud.saasmanage.common.CommonConst;
import com.sagacloud.saasmanage.common.DateUtil;
import com.sagacloud.saasmanage.common.JSONUtil;
import com.sagacloud.saasmanage.common.StringUtil;
import com.sagacloud.saasmanage.common.ToolsUtil;
import com.sagacloud.saasmanage.dao.DBCommonMethods;
import com.sagacloud.saasmanage.dao.DBConst;
import com.sagacloud.saasmanage.service.GeneralDictServiceI;
import com.sagacloud.saasmanage.service.OperateLogServiceI;
import com.sagacloud.saasmanage.service.WoStateServiceI;

@Service("woStateService")
public class WoStateServiceImpl implements WoStateServiceI {
	
	@Autowired
	private GeneralDictServiceI generalDictService;
	@Autowired
	private OperateLogServiceI operateLogService;
	
	//工单内置状态触发事件
	private JSONObject workOrderBuildInStateEvents = null;
//	//工单状态触发事件
//	private JSONArray workOrderStateEvents = null;
//	//工单状态触发条件
//	private JSONArray workOrderStateEventsOptions = null;
	
	//工单状态名称 key:projct_id value:<key:code value:name>
	Map<String, Map<String, String>> stateCodeNameCache = new HashMap<String, Map<String, String>>();
	
	private String basePath;
	
	{
		basePath = Thread.currentThread().getContextClassLoader().getResource("").getPath();
	}
	
	@Override
	public String queryWoStateList(String jsonStr) throws Exception {
		JSONObject jsonObject = JSONObject.parseObject(jsonStr);
		String isRepairUse = jsonObject.getString("is_repair_use");
		String projectId = jsonObject.getString("project_id");
		
		String resultStr, stateCode, stateName;
		JSONObject resultJson;
		JSONArray content = new JSONArray(), results;
		JSONObject result, item, event, eventItem;
		JSONArray events, eventArr;
		//key:state.code value:state.name
		Map<String, String> stateCodeName = new HashMap<String, String>();
		
		boolean isQueryBuildInState = "0".equals(isRepairUse) && StringUtil.isNull(jsonObject, "order_type") && StringUtil.isNull(jsonObject, "urgency");
		//获取系统内置状态
		if(workOrderBuildInStateEvents == null){
			String workOrderBuildInStateEventsStr = Files.toString(new File(basePath + "wo_state_events.json"), Charset.forName("UTF-8"));
			workOrderBuildInStateEvents = JSONObject.parseObject(workOrderBuildInStateEventsStr);
		}
		
		jsonObject.put("dict_type", "work_order_state");
		resultStr = generalDictService.queryGeneralDictByKey(jsonObject);
		resultJson = JSONObject.parseObject(resultStr);
		if("success".equals(resultJson.getString("Result"))){
			results = resultJson.getJSONArray("Content");
			results = results == null ? new JSONArray() : results;
			events = new JSONArray();
			for(int i=0; i<results.size(); i++){
				result = results.getJSONObject(i);
				stateCode = result.getString("code");
				stateName = result.getString("name");
				stateCodeName.put(stateCode, stateName);
				if(isQueryBuildInState){
					item = new JSONObject();
					eventArr = workOrderBuildInStateEvents.getJSONArray(stateCode);
					if(eventArr == null || eventArr.size() == 0){
						continue;
					}
					eventArr = eventArr == null ? new JSONArray() : eventArr;
					events = new JSONArray();
					for(int j=0; j<eventArr.size(); j++){
						eventItem = eventArr.getJSONObject(j);
						event = new JSONObject();
						
						event.put("event_name", eventItem.getString("event_name"));
						event.put("condition_desc", eventItem.getString("condition_desc"));
						event.put("description", "系统内置");
						events.add(event);
					}
					
					item.put("custom_state_id", stateCode);
					item.put("state_type", "1");
					item.put("code", stateCode);
					item.put("name", stateName);
					item.put("events", events);
					item.put("customer_name", stateName);
					content.add(item);
				}
			}
		}else{
			return resultStr;
		}
		//获取自定义状态
		String params = JSONUtil.getCriteriaWithMajors(jsonObject, "project_id", "order_type", "urgency").toJSONString();
		resultStr = DBCommonMethods.queryRecordByCriteria(DBConst.TABLE_WO_CUSTOM_STATE, params);
		resultJson = JSONObject.parseObject(resultStr);
		if("failure".equals(resultJson.getString("Result"))){
			return resultStr;
		}
		results = resultJson.getJSONArray("Content");
		results = results == null ? new JSONArray() : results;
		results = JSONUtil.sortByStringField(results, "code", CommonConst.asc);
		
		for(int i=0; i<results.size(); i++){
			result = results.getJSONObject(i);
			stateCode = result.getString("code");
			stateName = result.getString("name");
			stateCodeName.put(stateCode, stateName);
		}
		stateCodeNameCache.put(projectId, stateCodeName);
		
		String conditionDesc, optionType, conditionType, eventsStr;
		JSONObject condition;
		JSONArray conditions;
		List<String> conditionDescs;
		
		for(int i=0; i<results.size(); i++){
			result = results.getJSONObject(i);
			item = new JSONObject();
			
			eventsStr = result.getString("events");
			if(!StringUtil.isNull(eventsStr)){
				eventArr = JSONArray.parseArray(eventsStr);
			}else{
				eventArr = new JSONArray();
			}
			events = new JSONArray();
			for(int j=0; j<eventArr.size(); j++){
				eventItem = eventArr.getJSONObject(j);
				event = new JSONObject();
				
				conditionDescs = new ArrayList<String>();
				conditions = eventItem.getJSONArray("conditions");
				conditions = conditions == null ? new JSONArray() : conditions;
				for(int k=0; k<conditions.size(); k++){
					condition = conditions.getJSONObject(k);
					optionType = condition.getString("option1_type"); 
					if("1".equals(optionType)){
						String option1Name = condition.getString("option1_name");
						String logicName = condition.getString("logic_name");
						String option2Name = stateCodeName.get(condition.getString("option2_code"));
						conditionDesc = (option1Name == null ? "" : option1Name) + (logicName == null ? "" : logicName) + (option2Name == null ? "" : option2Name);
					}else if("2".equals(optionType)){
						String option1Name = condition.getString("option1_name");
						String logicName = condition.getString("logic_name");
						String option2Name = condition.getString("option2_name");
						String operatorsCode = condition.getString("operators_code");
						int minute = condition.getIntValue("minute");
						conditionDesc = (option1Name == null ? "" : option1Name) + (logicName == null ? "" : logicName) + (option2Name == null ? "" : option2Name);
						if(minute != 0){
							conditionDesc += operatorsCode + minute + "分钟"; 
						}
					}else if("3".equals(optionType)){
						String option1Name = condition.getString("option1_name");
						String option2Name = condition.getString("option2_name");
						conditionDesc = (option1Name == null ? "" : option1Name) + "为" + (option2Name == null ? "" : option2Name);
					}else if("4".equals(optionType)){
						String formulaDesc = condition.getString("formula_desc");
						conditionDesc = formulaDesc == null ? "" : formulaDesc;
					}else{
						conditionDesc = "";
					}
					conditionDescs.add(conditionDesc);
				}
				conditionType = eventItem.getString("condition_type");
				if("2".equals(conditionType)){
					conditionType = "且";
				}else if("3".equals(conditionType)){
					conditionType = "或";
				}
				
				event.put("event_name", eventItem.getString("event_name"));
				event.put("condition_desc", String.join(conditionType, conditionDescs));
				event.put("description", eventItem.getString(""));
				events.add(event);
			}
			
			item.put("custom_state_id", result.getString("custom_state_id"));
			item.put("state_type", "2");
			item.put("code", result.getString("code"));
			item.put("name", result.getString("name"));
			item.put("events", events);
			item.put("customer_name", result.getString("name"));
			content.add(item);
		}
		resultStr = ToolsUtil.successJsonMsg(content);
		return resultStr;
	}

	
	@Override
	public String updateCustomerName(String jsonStr) throws Exception {
		JSONObject jsonObject = JSONObject.parseObject(jsonStr);
		String projectId = jsonObject.getString("project_id");
		String code = jsonObject.getString("custom_state_id");
		String localName = jsonObject.getString("customer_name");
		JSONObject param = new JSONObject();
		param.put(DBConst.TABLE_FIELD_VALID, true);
		param.put("dict_type", "work_order_state");
		param.put("code", code);
		String params = JSONUtil.getCriteriaWithMajors(param, "valid", "dict_type", "code").toJSONString();
		String resultStr = DBCommonMethods.queryRecordByCriteria(DBConst.TABLE_GENERAL_DICTIONARY, params);
		JSONObject resultJson = JSONObject.parseObject(resultStr);
		if("success".equals(resultJson.getString("Result"))){
			JSONArray results = resultJson.getJSONArray("Content");
			if(results != null && results.size() > 0){
				JSONObject result = results.getJSONObject(0);
				String customerNames = result.getString("customer_name");
				JSONObject customerName;
				if(StringUtil.isNull(customerNames)){
					customerName = new JSONObject();
				}else{
					customerName = JSONObject.parseObject(customerNames);
				}
				customerName.put(projectId, localName);
				result.put("customer_name", customerName.toJSONString());
				params = JSONUtil.getUpdateParamJson(result, "dict_id").toJSONString();
				resultStr = DBCommonMethods.updateRecord(DBConst.TABLE_GENERAL_DICTIONARY, params);
			}else{
				resultStr = ToolsUtil.errorJsonMsg("未找到工单状态");
			}
		}
		operateLogService.insertRecord(jsonObject.getString("user_id"), DBConst.TABLE_GENERAL_DICTIONARY, "U", "updateCustomerName", jsonStr, resultStr.contains("success")?"1":"0", resultStr);
		return resultStr;
	}



	@Override
	public String queryWoStateEventList(String jsonStr) throws Exception {
		//获取工单状态事件列表
		String workOrderStateEventsStr = Files.toString(new File(basePath + "wo_custom_state_events.json"), Charset.forName("UTF-8"));
		JSONArray workOrderStateEvents = JSONArray.parseArray(workOrderStateEventsStr);
		return ToolsUtil.successJsonMsg(workOrderStateEvents);
	}

	@Override
	public String queryWoStateOptionList(String jsonStr) throws Exception {
		JSONObject jsonObject = JSONObject.parseObject(jsonStr);
		String eventCode = jsonObject.getString("event_code");
		String projectId = jsonObject.getString("project_id");
		String workOrderStateEventsOptionsStr = Files.toString(new File(basePath + "wo_custom_state_events_options.json"), Charset.forName("UTF-8"));
		JSONArray workOrderStateEventsOptions = JSONArray.parseArray(workOrderStateEventsOptionsStr);
		if(workOrderStateEventsOptions == null){
			return ToolsUtil.errorJsonMsg("获取数据失败");
		}
		JSONObject eventOption;
		JSONArray eventCodes;
		JSONArray eventOptions = new JSONArray();
		for(int i=0; i<workOrderStateEventsOptions.size(); i++){
			eventOption = workOrderStateEventsOptions.getJSONObject(i);
			eventOption = JSONObject.parseObject(eventOption.toJSONString());
			
			eventCodes = eventOption.getJSONArray("event_codes");
			eventCodes = eventCodes == null ? new JSONArray() : eventCodes;
			if(!eventCodes.contains(eventCode)){
				continue;
			}
			if("1".equals(eventOption.getString("option1_type"))){
				JSONObject option;
				JSONArray options = new JSONArray();
				//获取当前项目所有内置状态和自定义状态
				JSONObject param = new JSONObject();
				param.put(DBConst.TABLE_FIELD_VALID, true);
				param.put("dict_type", "work_order_state");
				String params = JSONUtil.getCriteriaWithMajors(param, "valid", "dict_type").toJSONString();
				String resultStr = DBCommonMethods.queryRecordByCriteria(DBConst.TABLE_GENERAL_DICTIONARY, params);
				JSONObject resultJson = JSONObject.parseObject(resultStr);
				if("failure".equals(resultJson.getString("Result"))){
					return resultStr;
				}
				
				String name;
				JSONObject buildInState;
				JSONArray buildInStates = resultJson.getJSONArray("Content");
				buildInStates = buildInStates == null ? new JSONArray() : buildInStates;
				for(int j=0; j<buildInStates.size(); j++){
					buildInState = buildInStates.getJSONObject(j);
					name = buildInState.getString("name");
					boolean defaultUse = buildInState.getBooleanValue("default_use");
					String customeUseStr = buildInState.getString("customer_use");
					String customeNameStr = buildInState.getString("customer_name");
					String projectIds = buildInState.getString("project_ids");
					if(!StringUtil.isNull(projectIds)){
						JSONArray projectIdsJson = JSONArray.parseArray(projectIds);
						if(projectIdsJson.size() != 0 && !projectIdsJson.contains(projectId)){
							continue;
						}
					}
					if(!StringUtil.isNull(customeUseStr)){
						JSONObject customeUseJson = JSONObject.parseObject(customeUseStr);
						if(customeUseJson.containsKey(projectId) && !customeUseJson.getBooleanValue(projectId)){
							continue;
						}
					}else{
						if(!defaultUse){
							continue;
						}
					}
					if(!StringUtil.isNull(customeNameStr)){
						JSONObject customeNameJson = JSONObject.parseObject(customeNameStr);
						if(!StringUtil.isNull(customeNameJson, projectId)){
							name = customeNameJson.getString(projectId);
						}
					}
					option = new JSONObject();
					option.put("option2_code", buildInState.getString("code"));
					option.put("option2_name", name);
					options.add(option);
				}
				//查询自定义状态
				param.clear();
				param.put(DBConst.TABLE_FIELD_VALID, true);
				param.put("project_id", projectId);
				params = JSONUtil.getCriteriaWithMajors(param, "valid", "project_id").toJSONString();
				resultStr = DBCommonMethods.queryRecordByCriteria(DBConst.TABLE_WO_CUSTOM_STATE, params);
				resultJson = JSONObject.parseObject(resultStr);
				if("failure".equals(resultJson.getString("Result"))){
					return resultStr;
				}
				JSONObject customState;
				JSONArray customStates = resultJson.getJSONArray("Content");
				customStates = customStates == null ? new JSONArray() : customStates;
				for(int j=0; j<customStates.size(); j++){
					customState = customStates.getJSONObject(j);
					option = new JSONObject();
					
					option.put("option2_code", customState.getString("code"));
					option.put("option2_name", customState.getString("name"));
					options.add(option);
				}
				
				eventOption.put("options", options);
			}
			eventOption.remove("event_codes");
			eventOptions.add(eventOption);
		}
		return ToolsUtil.successJsonMsg(eventOptions);
	}


	
	@Override
	public String verifyStateName(String jsonStr) throws Exception {
		JSONObject jsonObject = JSONObject.parseObject(jsonStr);
		String projectId = jsonObject.getString("project_id");
		String customStateId = jsonObject.getString("custom_state_id");
		String name = jsonObject.getString("name");
		boolean canUse = true;
		//获取当前项目所有内置状态和自定义状态
		JSONObject param = new JSONObject();
		param.put(DBConst.TABLE_FIELD_VALID, true);
		param.put("dict_type", "work_order_state");
		String params = JSONUtil.getCriteriaWithMajors(param, "valid", "dict_type").toJSONString();
		String resultStr = DBCommonMethods.queryRecordByCriteria(DBConst.TABLE_GENERAL_DICTIONARY, params);
		JSONObject resultJson = JSONObject.parseObject(resultStr);
		if("failure".equals(resultJson.getString("Result"))){
			return resultStr;
		}
		
		String stateName;
		JSONObject buildInState;
		JSONArray buildInStates = resultJson.getJSONArray("Content");
		buildInStates = buildInStates == null ? new JSONArray() : buildInStates;
		for(int j=0; j<buildInStates.size(); j++){
			buildInState = buildInStates.getJSONObject(j);
			stateName = buildInState.getString("name");
			if(name.equals(stateName) && (customStateId == null || !customStateId.equals(buildInState.getString("code")))){
				canUse = false;
				break;
			}
			boolean defaultUse = buildInState.getBooleanValue("default_use");
			String customeUseStr = buildInState.getString("customer_use");
			String customeNameStr = buildInState.getString("customer_name");
			String projectIds = buildInState.getString("project_ids");
			if(!StringUtil.isNull(projectIds)){
				JSONArray projectIdsJson = JSONArray.parseArray(projectIds);
				if(projectIdsJson.size() != 0 && !projectIdsJson.contains(projectId)){
					continue;
				}
			}
			if(!StringUtil.isNull(customeUseStr)){
				JSONObject customeUseJson = JSONObject.parseObject(customeUseStr);
				if(customeUseJson.containsKey(projectId) && !customeUseJson.getBooleanValue(projectId)){
					continue;
				}
			}else{
				if(!defaultUse){
					continue;
				}
			}
			if(!StringUtil.isNull(customeNameStr)){
				JSONObject customeNameJson = JSONObject.parseObject(customeNameStr);
				if(!StringUtil.isNull(customeNameJson, projectId)){
					stateName = customeNameJson.getString(projectId);
					if(name.equals(stateName) && (customStateId == null || !customStateId.equals(buildInState.getString("code")))){
						canUse = false;
						break;
					}
				}
			}
		}
		if(canUse){
			//查询自定义状态
			param.clear();
			param.put(DBConst.TABLE_FIELD_VALID, true);
			param.put("project_id", projectId);
			params = JSONUtil.getCriteriaWithMajors(param, "valid", "project_id").toJSONString();
			resultStr = DBCommonMethods.queryRecordByCriteria(DBConst.TABLE_WO_CUSTOM_STATE, params);
			resultJson = JSONObject.parseObject(resultStr);
			if("failure".equals(resultJson.getString("Result"))){
				return resultStr;
			}
			JSONObject customState;
			JSONArray customStates = resultJson.getJSONArray("Content");
			customStates = customStates == null ? new JSONArray() : customStates;
			for(int j=0; j<customStates.size(); j++){
				customState = customStates.getJSONObject(j);
				stateName = customState.getString("name");
				if(name.equals(stateName) && (customStateId == null || !customStateId.equals(customState.getString("custom_state_id")))){
					canUse = false;
					break;
				}
			}
		}
		JSONObject item = new JSONObject();
		item.put("can_use", canUse);
		return ToolsUtil.successJsonMsg(item);
	}


	
	@Override
	public String addWoState(String jsonStr) throws Exception {
		JSONObject jsonObject = JSONObject.parseObject(jsonStr);
		String projectId = jsonObject.getString("project_id");
		
		JSONObject param = new JSONObject();
		param.put("project_id", projectId);
		String resultStr = DBCommonMethods.queryAllRecord(DBConst.TABLE_WO_CUSTOM_STATE);
		JSONObject resultJson = JSONObject.parseObject(resultStr);
		if("failure".equals(resultJson.getString("Result"))){
			return resultStr;
		}
		int count = resultJson.getIntValue("Count");
		count++;
		String code = DBConst.TABLE_WO_CUSTOM_STATE_ID_TAG + count;
		String customStateId = DBConst.TABLE_WO_CUSTOM_STATE_ID_TAG + DateUtil.getUtcTimeNow();
		jsonObject.put("custom_state_id", customStateId);
		jsonObject.put("code", code);
		jsonObject = JSONUtil.prossesParamToJsonString(jsonObject, "events");
		String params = JSONUtil.getAddParamJson(jsonObject).toJSONString();
		resultStr = DBCommonMethods.insertRecord(DBConst.TABLE_WO_CUSTOM_STATE, params);
		operateLogService.insertRecord(jsonObject.getString("user_id"), DBConst.TABLE_WO_CUSTOM_STATE, "I", "addWoState", jsonStr, resultStr.contains("success")?"1":"0", resultStr);
		return resultStr;
	}


	
	@Override
	public String queryWoStateById(String jsonStr) throws Exception {
		JSONObject jsonObject = JSONObject.parseObject(jsonStr);
		String projectId = jsonObject.getString("project_id");
		
		Map<String, String> stateCodeName = stateCodeNameCache.getOrDefault(projectId, new HashMap<String, String>());
		
		String params = JSONUtil.getCriteriaWithMajors(jsonObject, "custom_state_id").toJSONString();
		String resultStr = DBCommonMethods.queryRecordByCriteria(DBConst.TABLE_WO_CUSTOM_STATE, params);
		JSONObject resultJson = JSONObject.parseObject(resultStr);
		if("success".equals(resultJson.getString("Result"))){
			JSONArray woStates = resultJson.getJSONArray("Content");
			if(woStates == null || woStates.size() == 0){
				resultStr = ToolsUtil.errorJsonMsg("未找到对应自定义状态");
			}else{
				JSONObject woState = woStates.getJSONObject(0);
				String eventStr = woState.getString("events");
				
				String optionType, stateCode, stateName;
				JSONObject event, condition;
				JSONArray conditions;
				JSONArray events = StringUtil.isNull(eventStr) ? new JSONArray() : JSONArray.parseArray(woState.getString("events"));
				for(int i=0; i<events.size(); i++){
					event = events.getJSONObject(i);
					conditions = event.getJSONArray("conditions");
					conditions = conditions == null ? new JSONArray() : conditions;
					for(int j=0; j<conditions.size(); j++){
						condition = conditions.getJSONObject(j);
						optionType = condition.getString("option1_type");
						if("1".equals(optionType)){
							stateCode = condition.getString("option2_code");
							stateName = stateCodeName.get(stateCode);
							if(!StringUtil.isNull(stateName)){
								condition.put("option2_name", stateName);
							}
						}
					}
				}
				woState.put("events", events);
				woState.put("order_type_name", DictionaryCache.getNameByTypeCode(CommonConst.dict_type_work_order_type, woState.getString("order_type"), projectId));
				resultStr = ToolsUtil.successJsonMsg(woState);
			}
		}
		return resultStr;
	}

	@Override
	public String updateWoStateById(String jsonStr) throws Exception {
		JSONObject jsonObject = JSONObject.parseObject(jsonStr);
		jsonObject = JSONUtil.prossesParamToJsonString(jsonObject, "events");
		String params = JSONUtil.getUpdateParamJson(jsonObject, "custom_state_id").toJSONString();
		String resultStr = DBCommonMethods.updateRecord(DBConst.TABLE_WO_CUSTOM_STATE, params);
		operateLogService.insertRecord(jsonObject.getString("user_id"), DBConst.TABLE_WO_CUSTOM_STATE, "U", "updateWoStateById", jsonStr, resultStr.contains("success")?"1":"0", resultStr);
		return resultStr;
	}
	
	
}
