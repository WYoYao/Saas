package com.sagacloud.saas.service.impl;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.sagacloud.saas.common.CommonMessage;
import com.sagacloud.saas.common.DateUtil;
import com.sagacloud.saas.common.JSONUtil;
import com.sagacloud.saas.common.StringUtil;
import com.sagacloud.saas.common.ToolsUtil;
import com.sagacloud.saas.dao.DBCommonMethods;
import com.sagacloud.saas.dao.DBConst;
import com.sagacloud.saas.dao.DBConst.Result;
import com.sagacloud.saas.service.OperateLogServiceI;
import com.sagacloud.saas.service.RoleServiceI;

/**
 * @desc 角色
 * @author gezhanbin
 *
 */
@Service("roleService")
public class RoleServiceImpl implements RoleServiceI {

	@Autowired
	private OperateLogServiceI operateLogService;
	
	@Override
	public String queryFuncPackList(JSONObject jsonObject) {

		String queryResult = DBCommonMethods.queryAllValidRecord(DBConst.TABLE_FUNCTION_PACK);
		//倒序
		if(queryResult.contains(Result.RESULT) && queryResult.contains(Result.CONTENT)) {
    		JSONObject resultJson = JSONObject.parseObject(queryResult);
    		JSONArray contents = resultJson.getJSONArray(Result.CONTENT);
    		JSONArray items = new JSONArray();
    		int size = contents.size();
    		
    		for (int i = size - 1; i > -1; i--) {
    			JSONObject content = contents.getJSONObject(i);
    			JSONObject item = ToolsUtil.filterRemind(content, CommonMessage.filter_function_pack_list);
    			items.add(item);
			}
    		resultJson.put(Result.CONTENT, items);
    		queryResult = JSON.toJSONString(resultJson);
    	}
		
		return queryResult;
	}

	@Override
	public String addRole(JSONObject jsonObject) throws Exception {
		String requestContent = JSON.toJSONString(jsonObject);
		String operatePersonId = jsonObject.getString("user_id");
		jsonObject.remove("user_id");
		jsonObject.put("role_id", DBConst.TABLE_ROLE_ID_TAG + DateUtil.getUtcTimeNow());
		
		jsonObject.put(DBConst.TABLE_FIELD_UPDATE_TIME, DateUtil.getNowTimeStr());
		jsonObject = JSONUtil.prossesParamToJsonString(jsonObject, "func_pack_ids");
		String resultInfo = DBCommonMethods.insertRecord(DBConst.TABLE_ROLE, JSON.toJSONString(JSONUtil.getAddParamJson(jsonObject)));
		String operateResult = "0";
		if(resultInfo.contains(Result.SUCCESS)) {
			operateResult = "1";
		}
		//添加操作日志
		operateLogService.insertRecord(operatePersonId, DBConst.TABLE_ROLE, "I", "addRole", requestContent, operateResult, resultInfo);
		return resultInfo;
	}

	@Override
	public String queryRoleList(JSONObject jsonObject) {
		jsonObject.put(DBConst.TABLE_FIELD_VALID, true);
		jsonObject = JSONUtil.getCriteriaWithMajors(jsonObject, "project_id", DBConst.TABLE_FIELD_VALID);
		String queryResult = DBCommonMethods.queryRecordByCriteria(DBConst.TABLE_ROLE, jsonObject.toJSONString());
		if(queryResult.contains(Result.SUCCESS) && queryResult.contains(Result.CONTENT)) {
			JSONObject queryJson = JSONObject.parseObject(queryResult);
			JSONArray queryContents = queryJson.getJSONArray(Result.CONTENT);
			if(queryContents != null && queryContents.size() > 0) {
				Map<String, JSONObject> funcPackMap = queryFuncPackMap();
				for (int i = 0; i < queryContents.size(); i++) {
					JSONObject item = queryContents.getJSONObject(i);
					String func_pack_idStr = item.getString("func_pack_ids");
					if(!StringUtil.isNull(func_pack_idStr)) {
						JSONArray func_pack_ids = JSONArray.parseArray(func_pack_idStr);
						JSONArray func_pack_names = new JSONArray();
						for (int j = 0; j < func_pack_ids.size(); j++) {
							String func_pack_id = func_pack_ids.getString(j);
							JSONObject funcPack = funcPackMap.get(func_pack_id);
							String func_pack_name = "";
							if(funcPack != null) {
								func_pack_name = funcPack.getString("func_pack_name");
							}
							func_pack_names.add(func_pack_name);
						}
						item.put("func_pack_ids", func_pack_ids);
						item.put("func_pack_names", func_pack_names);
					}
					item.remove("create_time");
					item.remove("update_time");
					item.remove("valid");
				}
				
				queryResult = queryJson.toJSONString();
			}
		}
		return queryResult;
	}

	
	private Map<String,JSONObject> queryFuncPackMap() {
		Map<String, JSONObject> funcPackMap = new HashMap<>();
		String queryResult = DBCommonMethods.queryAllValidRecord(DBConst.TABLE_FUNCTION_PACK);
		//倒序
		if(queryResult.contains(Result.RESULT) && queryResult.contains(Result.CONTENT)) {
    		JSONObject resultJson = JSONObject.parseObject(queryResult);
    		JSONArray contents = resultJson.getJSONArray(Result.CONTENT);
    		int size = contents.size();
    		for (int i = size - 1; i > -1; i--) {
    			JSONObject content = contents.getJSONObject(i);
    			content.remove("func_packs");
    			content.remove("create_time");
    			content.remove("update_time");
    			content.remove("valid");
    			funcPackMap.put(content.getString("func_pack_id"), content);
			}
    	}
		return funcPackMap;
	}

	@Override
	public String queryRoleFuncPack(JSONObject jsonObject) {
		jsonObject = JSONUtil.getKeyWithMajors(jsonObject, "role_id");
		String queryResult = DBCommonMethods.getRecordBykey(DBConst.TABLE_ROLE, jsonObject.toJSONString());
		if(queryResult.contains(Result.SUCCESS) && queryResult.contains(Result.CONTENT)) {
			JSONObject queryJson = JSONObject.parseObject(queryResult);
			JSONArray queryContents = queryJson.getJSONArray(Result.CONTENT);
			JSONObject item = null;
			if(queryContents != null && queryContents.size() > 0) {
				item = queryContents.getJSONObject(0);
				String func_pack_idStr = item.getString("func_pack_ids");
				if(!StringUtil.isNull(func_pack_idStr)) {
					JSONArray func_pack_ids = JSONArray.parseArray(func_pack_idStr);
					item.put("func_pack_ids", func_pack_ids);
				}
				item.remove("create_time");
				item.remove("update_time");
				item.remove("valid");
			}
			queryJson.put("Item", item);
			queryJson.remove(Result.CONTENT);
			queryJson.remove(Result.COUNT);
			queryResult = queryJson.toJSONString();
		}
		return queryResult;
	}

	@Override
	public String queryRoleDetailById(JSONObject jsonObject) {
		jsonObject = JSONUtil.getKeyWithMajors(jsonObject, "role_id");
		String queryResult = DBCommonMethods.getRecordBykey(DBConst.TABLE_ROLE, jsonObject.toJSONString());
		if(queryResult.contains(Result.SUCCESS) && queryResult.contains(Result.CONTENT)) {
			JSONObject queryJson = JSONObject.parseObject(queryResult);
			JSONArray queryContents = queryJson.getJSONArray(Result.CONTENT);
			JSONObject item = null;
			if(queryContents != null && queryContents.size() > 0) {
				Map<String, JSONObject> funcPackMap = queryFuncPackMap();
				item = queryContents.getJSONObject(0);
				String func_pack_idStr = item.getString("func_pack_ids");
				JSONArray func_pack_list = new JSONArray();
				if(!StringUtil.isNull(func_pack_idStr)) {
					JSONArray func_pack_ids = JSONArray.parseArray(func_pack_idStr);
					for (int i = 0; i < func_pack_ids.size(); i++) {
						String func_pack_id = func_pack_ids.getString(i);
						JSONObject funcPack = funcPackMap.get(func_pack_id);
						func_pack_list.add(funcPack);
					}
				}
				item.remove("func_pack_ids");
				item.remove("create_time");
				item.remove("update_time");
				item.remove("valid");
				item.put("func_pack_list", func_pack_list);
			}
			queryJson.put("Item", item);
			queryJson.remove(Result.CONTENT);
			queryJson.remove(Result.COUNT);
			queryResult = queryJson.toJSONString();
		}
		return queryResult;
	}

	@Override
	public String updateRoleById(JSONObject jsonObject) throws Exception {
		String requestContent = JSON.toJSONString(jsonObject);
		String operatePersonId = jsonObject.getString("user_id");
		jsonObject.remove("user_id");
		jsonObject.put("update_time", DateUtil.getNowTimeStr());
		jsonObject = JSONUtil.prossesParamToJsonString(jsonObject, "func_pack_ids");
		String resultInfo = DBCommonMethods.updateRecord(DBConst.TABLE_ROLE, JSON.toJSONString(JSONUtil.getUpdateParamJson(jsonObject, "role_id")));
		String operateResult = "0";
		if(resultInfo.contains(Result.SUCCESS)) {
			operateResult = "1";
		}
		operateLogService.insertRecord(operatePersonId, DBConst.TABLE_ROLE, "U", "updateRoleById", requestContent, operateResult, resultInfo);
		return resultInfo;
	}
	
}
