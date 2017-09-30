package com.sagacloud.saasmanage.service.impl;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

import org.springframework.stereotype.Service;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.sagacloud.saasmanage.common.DataRequestPathUtil;
import com.sagacloud.saasmanage.common.DateUtil;
import com.sagacloud.saasmanage.common.JSONUtil;
import com.sagacloud.saasmanage.common.StringUtil;
import com.sagacloud.saasmanage.common.ToolsUtil;
import com.sagacloud.saasmanage.dao.DBCommonMethods;
import com.sagacloud.saasmanage.dao.DBConst;
import com.sagacloud.saasmanage.dao.DBConst.Result;
import com.sagacloud.saasmanage.service.BaseService;
import com.sagacloud.saasmanage.service.GeneralDictServiceI;

/**
 * @desc 数据字典
 * @author gezhanbin
 *
 */
@Service("generalDictService")
public class GeneralDictServiceImpl extends BaseService implements GeneralDictServiceI {

	@Override
	public String queryGeneralDictByKey(JSONObject jsonObject) throws Exception {
		//key:编码-名称    --> value:JSONObject
		Map<String, JSONObject> dictTypeMap = new HashMap<>();
		JSONObject resultJson = JSONObject.parseObject("{}");
		String result = "success";
		JSONArray contents = new JSONArray();
		String project_id = jsonObject.getString("project_id");
		Set<String> projectIdSet = new HashSet<>();
		if(StringUtil.isNull(project_id)) {
			String user_id = jsonObject.getString("user_id");
			//获取当前用户下的所有项目主键
			JSONObject paramJson = JSONObject.parseObject("{}");
			paramJson.put("person_id", user_id);
			String requestUrl = getPersonServicePath(DataRequestPathUtil.persaon_service_query_person_by_personid);
			String queryResult = httpPostRequest(requestUrl, paramJson.toJSONString());
			JSONObject personJson  = JSONObject.parseObject(queryResult);
			if(Result.FAILURE.equals(personJson.getString(Result.RESULT))) {
				return queryResult;
			} else if(queryResult.contains("project_persons")) {
				JSONObject item = personJson.getJSONObject("Item");
				JSONArray projectPersons = item.getJSONArray("project_persons");
				if(projectPersons != null && projectPersons.size() > 0) {
					for (int i = 0; i < projectPersons.size(); i++) {
						JSONObject projectPerson = projectPersons.getJSONObject(i);
						project_id = projectPerson.getString("project_id");
						projectIdSet.add(project_id);
					}
				}
			}
		} else {
			projectIdSet.add(project_id);
		}
		if(projectIdSet.size() > 0) {
			
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
						JSONArray project_ids = null;
						if(!StringUtil.isNull(project_ids_str)) {
							project_ids = JSONArray.parseArray(project_ids_str);
							
						}
						JSONObject customerUseJson = null;
						if(!StringUtil.isNull(customer_use)) {
							customerUseJson = JSONObject.parseObject(customer_use);
						}
						JSONObject customerNameJson = null;
						if(!StringUtil.isNull(customer_name)) {
							customerNameJson = JSONObject.parseObject(customer_name);
						}
							//1、customer_use=true
							//2、customer_use=null && default_use=true 或者null
						for (String projectId : projectIdSet) {
							if(customerNameJson != null) {
								String proCustomerName = customerNameJson.getString(projectId);
								if(proCustomerName != null && !"".equals(proCustomerName)) {
									name = proCustomerName;
								}
							}
							JSONObject content = new JSONObject();
							content.put("code", code);
							content.put("name", name);
							content.put("description", description);
							Boolean proCustomerUse = null;
							if(customerUseJson != null) {
								proCustomerUse = customerUseJson.getBoolean(projectId);
							}
							if(proCustomerUse == null) {
								if(default_use == null || default_use) {
									//2、customer_use=null && null 或者 default_use=true
									if(project_ids == null) {
										dictTypeMap.put(code + "-" + name,  content);
									} else {
										if(project_ids.contains(project_id)) {
											dictTypeMap.put(code + "-" + name,  content);
										}
									}
								}
							} else if(proCustomerUse) {
								//1、customer_use=true
								dictTypeMap.put(code + "-" + name,  content);
							}
						}
					}
				}
			}
		}
		
		contents.addAll(dictTypeMap.values());
		resultJson.put(Result.RESULT, result);
		resultJson.put(Result.CONTENT, contents);
		resultJson.put(Result.COUNT, contents.size());
		
		return resultJson.toJSONString();
	}

	@Override
	public String queryGeneralDictByDictType(JSONObject jsonObject) {
		jsonObject.put(DBConst.TABLE_FIELD_VALID, true);
		jsonObject = JSONUtil.getCriteriaWithMajors(jsonObject, "dict_type", DBConst.TABLE_FIELD_VALID);
		String queryResult = DBCommonMethods.queryRecordByCriteria(DBConst.TABLE_GENERAL_DICTIONARY, jsonObject.toJSONString());
		queryResult = JSONUtil.prossesResultToJsonString(queryResult, "customer_use","customer_name");
		//过滤
		queryResult = ToolsUtil.filterRemind(queryResult, "code","name","description","default_use","customer_use","customer_name");
		return queryResult;
	}

	@Override
	public String addGeneralDict(JSONObject jsonObject) {
		jsonObject.remove("user_id");
		jsonObject.put("dict_id", "GZD" + DateUtil.getUtcTimeNow());
		
		jsonObject = JSONUtil.prossesParamToJsonString(jsonObject, "customer_use","customer_name");
		
		jsonObject.put("update_time", DateUtil.getNowTimeStr());
		jsonObject = JSONUtil.getAddParamJson(jsonObject);
		return DBCommonMethods.insertRecord(DBConst.TABLE_GENERAL_DICTIONARY, jsonObject.toJSONString());
	}

}
