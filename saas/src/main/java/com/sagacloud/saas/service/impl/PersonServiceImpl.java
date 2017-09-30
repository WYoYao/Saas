package com.sagacloud.saas.service.impl;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.sagacloud.saas.common.CommonMessage;
import com.sagacloud.saas.common.DataRequestPathUtil;
import com.sagacloud.saas.common.JSONUtil;
import com.sagacloud.saas.common.StringUtil;
import com.sagacloud.saas.common.ToolsUtil;
import com.sagacloud.saas.dao.DBCommonMethods;
import com.sagacloud.saas.dao.DBConst;
import com.sagacloud.saas.dao.DBConst.Result;
import com.sagacloud.saas.service.BaseService;
import com.sagacloud.saas.service.PersonServiceI;

/**
 * @desc 人员信息
 * @author gezhanbin
 *
 */
@Service("personService")
public class PersonServiceImpl extends BaseService implements PersonServiceI {

	@Override
	public String addPerson(JSONObject jsonObject) throws Exception {
		String operate_person_id = jsonObject.getString("user_id");
		jsonObject.remove("user_id");
		jsonObject.put("operate_person_id", operate_person_id);
		String requestUrl = this.getPersonServicePath(DataRequestPathUtil.person_service_add_person);
		return this.httpPostRequest(requestUrl, jsonObject.toJSONString());
	}

	@Override
	public String queryPositionsByProjectId(JSONObject jsonObject) throws Exception {
		jsonObject.remove("user_id");
		String requestUrl = this.getPersonServicePath(DataRequestPathUtil.person_service_query_position_by_project);
		return this.httpPostRequest(requestUrl, jsonObject.toJSONString());
	}

	@Override
	public String queryPersonTagsByProjectId(JSONObject jsonObject) throws Exception {
		jsonObject.remove("user_id");
		String requestUrl = this.getPersonServicePath(DataRequestPathUtil.person_service_query_persontags_by_project);
		String queryResult = this.httpPostRequest(requestUrl, jsonObject.toJSONString());
		if(queryResult.contains(Result.SUCCESS) && queryResult.contains("Item")) {
			JSONObject queryJson = JSONObject.parseObject(queryResult);
			JSONObject item = queryJson.getJSONObject("Item");
			if(item != null) {
				JSONArray custom_tags = item.getJSONArray("person_tags");
				item.put("custom_tags", custom_tags);
				item.remove("person_tags");
			}
			queryResult = queryJson.toJSONString();
		}
		return queryResult;
	}

	@Override
	public String queryPersonList(JSONObject jsonObject) throws Exception {
		jsonObject.remove("user_id"); 
		String position = jsonObject.getString("position");
		String project_id = jsonObject.getString("project_id");
		if(position != null && position.equals("")) {
			jsonObject.remove("position");
		}
		jsonObject.put(DBConst.TABLE_FIELD_VALID, true);
		String requestUrl = this.getPersonServicePath(DataRequestPathUtil.person_service_query_person_by_project);
		String queryResult = this.httpPostRequest(requestUrl, jsonObject.toJSONString());
		if(queryResult.contains(Result.SUCCESS) && queryResult.contains(Result.CONTENT)) {
			JSONObject queryJson = JSONObject.parseObject(queryResult);
			JSONArray queryContents = queryJson.getJSONArray(Result.CONTENT);
			if(queryContents != null && queryContents.size() > 0) {
				queryContents = JSONUtil.sortByField(queryContents, DBConst.TABLE_FIELD_UPDATE_TIME, -1);
				//获取所有专业
				Map<String, String> specialtyMap = querySpecialtyMap(project_id);
				for (int i = 0; i < queryContents.size(); i++) {
					JSONObject queryContent = queryContents.getJSONObject(i);;
					JSONArray specialtys = queryContent.getJSONArray("specialty");
					String specialty_names = "";
					if(specialtys != null && specialtys.size() > 0) {
						for (int j = 0; j < specialtys.size(); j++) {
							String specialty = specialtys.getString(j);
							String specialty_name = specialtyMap.get(specialty);
							if(!StringUtil.isNull(specialty_name)) {
								specialty_names += specialty_name;
								specialty_names += "、";
							}
//							specialty_names.add(specialty_name == null ? "" : specialty_name);
						}
						if(!StringUtil.isNull(specialty_names)) {
							specialty_names = specialty_names.substring(0, specialty_names.length() - 1);
						}
					}
					JSONObject roleObj = queryContent.getJSONObject("roles");
					if(roleObj != null) {
						String roles = "";
						for(Object obj : roleObj.values()) {
							if(obj != null) {
								String role = obj.toString();
								if(!StringUtil.isNull(role)) {
									roles += role;
									roles += "、";
								}
							}
						}
						if(!StringUtil.isNull(roles)) {
							roles = roles.substring(0, roles.length() - 1);
						}
						queryContent.put("roles", roles);
					}
					queryContent.remove("head_portrait");
					queryContent.remove("specialty");
					queryContent.put("specialty_name", specialty_names);
				}
				queryResult = queryJson.toJSONString();
			}
		}
		return queryResult;
	}

	@Override
	public String queryPersonWithGroup(JSONObject jsonObject) throws Exception {
		jsonObject.remove("user_id"); 
		jsonObject.put(DBConst.TABLE_FIELD_VALID, true);
		String requestUrl = this.getPersonServicePath(DataRequestPathUtil.person_service_query_person_by_project);
		String queryResult = this.httpPostRequest(requestUrl, jsonObject.toJSONString());
		if(queryResult.contains(Result.SUCCESS) && queryResult.contains(Result.CONTENT)) {
			JSONObject queryJson = JSONObject.parseObject(queryResult);
			JSONArray queryContents = queryJson.getJSONArray(Result.CONTENT);
			if(queryContents != null && queryContents.size() > 0) {
				JSONArray newContents = new JSONArray();
				Map<String, JSONObject> contentMap = new HashMap<>(); 
				for (int i = 0; i < queryContents.size(); i++) {
					JSONObject queryContent = queryContents.getJSONObject(i);;
					String position = queryContent.getString("position");
					if(StringUtil.isNull(position)) {
						position = "";
					}	
					queryContent = ToolsUtil.filterRemind(queryContent, CommonMessage.filter_person_group_list);
					
					JSONObject newContent = contentMap.get(position);
					if(newContent == null) {
						newContent = new JSONObject();
						contentMap.put(position, newContent);
					}
					newContent.put("position", position);
					JSONArray persons = newContent.getJSONArray("persons");
					if(persons == null) {
						persons = new JSONArray();
						newContent.put("persons", persons);
					}
					persons.add(queryContent);
				}
				
				//获取没有岗位的人员列表
				JSONObject personInfo = contentMap.get("");
				if(personInfo != null) {
					contentMap.remove("");
				}
				for(String position : contentMap.keySet()) {
					JSONObject personInfo_ = contentMap.get(position);
					JSONArray persons = personInfo_.getJSONArray("persons"); 
					//更新时间倒叙
					persons = JSONUtil.sortByStringField(persons, "update_time", -1);
					personInfo_.put("persons", persons);
					newContents.add(personInfo_);
				}
				if(personInfo != null) {
					JSONArray persons = personInfo.getJSONArray("persons"); 
					//更新时间倒叙
					persons = JSONUtil.sortByStringField(persons, "update_time", -1);
					personInfo.put("persons", persons);
					newContents.add(personInfo);
				}
				queryJson.put(Result.CONTENT, newContents);
				queryJson.put(Result.COUNT, newContents.size());
				queryResult = queryJson.toJSONString();
			}
		}
		return queryResult;
	}

	private Map<String, String> querySpecialtyMap(String project_id) {
		Map<String, String> specialtyMap = new HashMap<String, String>();
		JSONObject jsonObject = new JSONObject();
		jsonObject.put("dict_type", "domain_require");
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
					if(customerNameJson != null) {
						String proCustomerName = customerNameJson.getString(project_id);
						if(proCustomerName != null && !"".equals(proCustomerName)) {
							name = proCustomerName;
						}
					}
					Boolean proCustomerUse = null;
					if(customerUseJson != null) {
						proCustomerUse = customerUseJson.getBoolean(project_id);
					}
					if(proCustomerUse == null) {
						if(default_use == null || default_use) {
							//2、customer_use=null && null 或者 default_use=true
							specialtyMap.put(code, name);
							if(project_ids == null) {
								specialtyMap.put(code, name);
							} else {
								if(project_ids.contains(project_id)) {
									specialtyMap.put(code, name);
								}
							}
						}
					} else if(proCustomerUse) {
						//1、customer_use=true
						specialtyMap.put(code, name);
					}
				}
			}
		}
		
		return specialtyMap;
	}

	@Override
	public String queryPersonDetailById(JSONObject jsonObject) throws Exception {
		jsonObject.remove("user_id");
		String project_id = jsonObject.getString("project_id");
		String requestUrl = this.getPersonServicePath(DataRequestPathUtil.person_service_query_project_person_by_id);
		String queryResult = this.httpPostRequest(requestUrl, jsonObject.toJSONString());
		if(queryResult.contains(Result.SUCCESS) && queryResult.contains("Item")) {
			JSONObject queryJson = JSONObject.parseObject(queryResult);
			JSONObject item = queryJson.getJSONObject("Item");
			if(item != null) {
				//获取所有专业
				Map<String, String> specialtyMap = querySpecialtyMap(project_id);
				JSONArray specialtys = item.getJSONArray("specialty");
				JSONArray specialty_names = new JSONArray();
				if(specialtys != null && specialtys.size() > 0) {
					for (int j = 0; j < specialtys.size(); j++) {
						String specialty = specialtys.getString(j);
						String specialty_name = specialtyMap.get(specialty);
						JSONObject specialtyObj = new JSONObject();
						specialtyObj.put("code", specialty);
						specialtyObj.put("name", specialty_name);
						specialty_names.add(specialtyObj);
					}
				}
				item.put("specialty_name", specialty_names);
				item.remove("create_time");
			}
			queryResult = queryJson.toJSONString();
		}
		return queryResult;
	}

	@Override
	public String discardPersonById(JSONObject jsonObject) throws Exception {
		String operate_person_id = jsonObject.getString("user_id");
		jsonObject.put("operate_person_id", operate_person_id);
		jsonObject.remove("user_id");
		jsonObject.put("person_status", "0");
		String requestUrl = this.getPersonServicePath(DataRequestPathUtil.person_service_update_person_by_id);
		return this.httpPostRequest(requestUrl, jsonObject.toJSONString());
	}

	@Override
	public String regainPersonById(JSONObject jsonObject) throws Exception {
		String operate_person_id = jsonObject.getString("user_id");
		jsonObject.put("operate_person_id", operate_person_id);
		jsonObject.remove("user_id");
		jsonObject.put("person_status", "1");
		String requestUrl = this.getPersonServicePath(DataRequestPathUtil.person_service_update_person_by_id);
		return this.httpPostRequest(requestUrl, jsonObject.toJSONString());
	}

	@Override
	public String updatePersonById(JSONObject jsonObject) throws Exception {
		String operate_person_id = jsonObject.getString("user_id");
		jsonObject.put("operate_person_id", operate_person_id);
		jsonObject.remove("user_id");
		String requestUrl = this.getPersonServicePath(DataRequestPathUtil.person_service_update_person_by_id);
		return this.httpPostRequest(requestUrl, jsonObject.toJSONString());
	}

	@Override
	public String queryProjectPersonSel(JSONObject jsonObject) throws Exception {
		jsonObject.put("person_status", "1");
		jsonObject.put("valid", true);
		String requestUrl = this.getPersonServicePath(DataRequestPathUtil.person_service_query_person_by_project);
		String resultStr = this.httpPostRequest(requestUrl, jsonObject.toJSONString());
		resultStr = ToolsUtil.filterRemind(resultStr, "person_id", "name");
		return resultStr;
	}

	@Override
	public String queryValidPersonForPosition(JSONObject jsonObject) throws Exception {
		jsonObject.put("person_status", "1");
		jsonObject.put(DBConst.TABLE_FIELD_VALID, true);
		jsonObject.put("back_field", "[\"person_id\",\"name\"]");
		String requestUrl = getPersonServicePath(DataRequestPathUtil.person_service_query_by_project_position);
		String resultStr = httpPostRequest(requestUrl, jsonObject.toJSONString());
		return resultStr;
	}

	@Override
	public String queryPositionPersonSel(JSONObject jsonObject) throws Exception {
		jsonObject.put("person_status", "1");
		jsonObject.put(DBConst.TABLE_FIELD_VALID, true);
		jsonObject.put("back_field", JSONArray.parseArray("[\"person_id\",\"name\"]"));
		String requestUrl = getPersonServicePath(DataRequestPathUtil.person_service_query_by_project_position);
		String resultStr = httpPostRequest(requestUrl, jsonObject.toJSONString());
		JSONObject resultJson = JSONObject.parseObject(resultStr);
		if("success".equals(resultJson.getString("Result"))){
			JSONObject result;
			JSONArray noPositionPersons = null;
			JSONArray results = resultJson.getJSONArray("Content");
			results = results == null ? new JSONArray() : results;
			for(int i=0; i<results.size(); i++){
				result = results.getJSONObject(i);
				if(!StringUtil.isNull(result, "position")){
					result.put("name", result.getString("position"));
					result.put("type", "2");
					result.remove("position");
				}else{
					noPositionPersons = result.getJSONArray("persons");
					results.remove(result);
				}
			}
			if(noPositionPersons != null){
				JSONObject person;
				for(int i=0; i<noPositionPersons.size(); i++){
					person = noPositionPersons.getJSONObject(i);
					person.put("type", "3");
					results.add(person);
				}
			}
			resultStr = ToolsUtil.successJsonMsg(results);
		}
		return resultStr;
	}


}
