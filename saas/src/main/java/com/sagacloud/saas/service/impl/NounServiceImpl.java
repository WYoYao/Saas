package com.sagacloud.saas.service.impl;

import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.Reader;
import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.sagacloud.json.JSONValue;
import com.sagacloud.saas.common.DateUtil;
import com.sagacloud.saas.common.JSONUtil;
import com.sagacloud.saas.common.StringUtil;
import com.sagacloud.saas.dao.DBCommonMethods;
import com.sagacloud.saas.dao.DBConst;
import com.sagacloud.saas.dao.DBConst.Result;
import com.sagacloud.saas.service.NounServiceI;

/**
 * 功能描述：名词管理
 * @author gezhanbin
 *
 */
@Service("nounService")
public class NounServiceImpl implements NounServiceI {

	@Override
	public String queryNounTypeList(JSONObject jsonObject) {
		InputStream in = Thread.currentThread().getContextClassLoader().getResourceAsStream("nounType.json");
		Reader reader = new InputStreamReader(in);
		String contentStr = JSONValue.parse(reader).toString();
		JSONArray contents = JSONArray.parseArray(contentStr);	
		if(contents == null) {
			contents = new JSONArray();
		}
		JSONObject result = new JSONObject();
		result.put(Result.RESULT, Result.SUCCESS);
		result.put(Result.CONTENT, contents);
		result.put(Result.COUNT, contents.size());
		return result.toJSONString();
	}

	@Override
	public String queryNounList(JSONObject jsonObject) {
		String noun_type = jsonObject.getString("noun_type");
		String project_id = jsonObject.getString("project_id");
		JSONObject resultJson = JSONObject.parseObject("{}");
		String result = "success";
		JSONArray contents = new JSONArray();
		jsonObject.clear();
		jsonObject.put("dict_type", noun_type);
		jsonObject.put(DBConst.TABLE_FIELD_VALID, true);
		jsonObject = JSONUtil.getCriteriaWithMajors(jsonObject, "dict_type",DBConst.TABLE_FIELD_VALID);
		String queryResult = DBCommonMethods.queryRecordByCriteria(DBConst.TABLE_GENERAL_DICTIONARY, jsonObject.toJSONString());
		if(queryResult.contains(Result.SUCCESS) && queryResult.contains(Result.CONTENT)) {
			JSONObject dicttypeJson = JSONObject.parseObject(queryResult);
			JSONArray resultContents = dicttypeJson.getJSONArray(Result.CONTENT);
			if(resultContents != null && resultContents.size() > 0) {
				for (int i = 0; i < resultContents.size(); i++) {
					JSONObject resultContent = resultContents.getJSONObject(i);
					String dict_id = resultContent.getString("dict_id");
					String code = resultContent.getString("code");
					String name = resultContent.getString("name");
					String description = resultContent.getString("description");
					Boolean default_use = resultContent.getBoolean("default_use");
					String customer_use_str = resultContent.getString("customer_use");
					String customer_name_str = resultContent.getString("customer_name");
					String project_ids_str = resultContent.getString("project_ids");
					if(!StringUtil.isNull(project_ids_str)) {
						JSONArray project_ids = JSONArray.parseArray(project_ids_str);
						if(project_ids != null && project_ids.size() > 0) {
							if(!project_ids.contains(project_id)) {
								continue;
							}
						}
					}
					Boolean customer_use = default_use;
					String customer_name = "";
					if(!StringUtil.isNull(customer_use_str)) {
						JSONObject customerUseJson = JSONObject.parseObject(customer_use_str);
						Boolean proCustomerUse = customerUseJson.getBoolean(project_id);
						if(proCustomerUse != null) {
							customer_use = proCustomerUse;
						}
					}
					if(!StringUtil.isNull(customer_name_str)) {
						JSONObject customerNameJson = JSONObject.parseObject(customer_name_str);
						String proCustomerName = customerNameJson.getString(project_id);
						if(!StringUtil.isNull(proCustomerName)) {
							customer_name = proCustomerName;
						}
					}
					JSONObject content = new JSONObject();
					content.put("dict_id", dict_id);
					content.put("code", code);
					content.put("name", name);
					content.put("description", description);
					content.put("customer_use", customer_use);
					content.put("customer_name", customer_name);
					contents.add(content);
				}
			}
			resultJson.put(Result.RESULT, result);
			resultJson.put(Result.CONTENT, contents);
			resultJson.put(Result.COUNT, contents.size());
			queryResult = resultJson.toJSONString();
		}
		
		
		
		return queryResult;
	}

	@Override
	public String updateNounById(JSONObject jsonObject) {
		String dict_id = jsonObject.getString("dict_id");
		String project_id = jsonObject.getString("project_id");
		Boolean customer_use = jsonObject.getBoolean("customer_use");
		String customer_name = jsonObject.getString("customer_name");
		JSONObject resultJson = new JSONObject();
		String result = Result.FAILURE;
		String resultMsg = "";
		jsonObject = JSONUtil.getKeyWithMajors(jsonObject, "dict_id");
		String queryResult = DBCommonMethods.getRecordBykey(DBConst.TABLE_GENERAL_DICTIONARY, jsonObject.toJSONString());
		JSONObject queryJson = JSONObject.parseObject(queryResult);
		if(Result.SUCCESS.equals(queryJson.getString(Result.RESULT))) {
			JSONArray queryContents = queryJson.getJSONArray(Result.CONTENT);
			if(queryContents != null && queryContents.size() > 0) {
				JSONObject newItem = new JSONObject();
				newItem.put("dict_id", dict_id);
				JSONObject queryItem = queryContents.getJSONObject(0);
				if(customer_use != null) {
					JSONObject customerUseJson = null;
					String customer_use_str = queryItem.getString("customer_use");
					if(!StringUtil.isNull(customer_use_str)) {
						customerUseJson = JSONObject.parseObject(customer_use_str);
					} else {
						customerUseJson = new JSONObject();
					}
					customerUseJson.put(project_id, customer_use);
					newItem.put("customer_use", customerUseJson.toJSONString());
				}
				
				if(!StringUtil.isNull(customer_name)) {
					String customer_name_str = queryItem.getString("customer_name");
					JSONObject customerNameJson = null;
					if(!StringUtil.isNull(customer_name_str)) {
						customerNameJson = JSONObject.parseObject(customer_name_str);
					} else {
						customerNameJson = new JSONObject();
					}
					customerNameJson.put(project_id, customer_name);
					newItem.put("customer_name", customerNameJson.toJSONString());
				}
				newItem = JSONUtil.getUpdateParamJson(newItem, "dict_id");
				queryResult = DBCommonMethods.updateRecord(DBConst.TABLE_GENERAL_DICTIONARY, newItem.toJSONString());
			} else {
				resultMsg = "该条记录不存在！";
				resultJson.put(Result.RESULT, result);
				resultJson.put(Result.RESULTMSG, resultMsg);
				queryResult = resultJson.toJSONString();
			}
		}
		return queryResult;
	}

	@Override
	public String addNounByAdmin(JSONObject jsonObject) {
		jsonObject.remove("user_id");
		jsonObject.put("dict_id", DateUtil.getUtcTimeNow() + "");
		jsonObject.put(DBConst.TABLE_FIELD_UPDATE_TIME, DateUtil.getNowTimeStr());
		jsonObject = JSONUtil.getAddParamJson(jsonObject);
		return DBCommonMethods.insertRecord(DBConst.TABLE_GENERAL_DICTIONARY, jsonObject.toJSONString());
	}

	@Override
	public String deleteNounByAdmin(JSONObject jsonObject) {
		jsonObject.remove("user_id");
		jsonObject = JSONUtil.getUpdateParamJson(jsonObject, "dict_id");
		return DBCommonMethods.deleteRecord(DBConst.TABLE_GENERAL_DICTIONARY, jsonObject.toJSONString());
	}

	@Override
	public String updateNounByAdmin(JSONObject jsonObject) {
		jsonObject.remove("user_id");
		jsonObject = JSONUtil.getUpdateParamJson(jsonObject, "dict_id");
		return DBCommonMethods.updateRecord(DBConst.TABLE_GENERAL_DICTIONARY, jsonObject.toJSONString());
	}

}
