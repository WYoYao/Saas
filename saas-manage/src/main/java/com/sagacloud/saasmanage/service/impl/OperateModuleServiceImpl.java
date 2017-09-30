package com.sagacloud.saasmanage.service.impl;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.sagacloud.saasmanage.cache.CustomerCache;
import com.sagacloud.saasmanage.common.CommonMessage;
import com.sagacloud.saasmanage.common.DateUtil;
import com.sagacloud.saasmanage.common.JSONUtil;
import com.sagacloud.saasmanage.common.StringUtil;
import com.sagacloud.saasmanage.common.ToolsUtil;
import com.sagacloud.saasmanage.dao.DBCommonMethods;
import com.sagacloud.saasmanage.dao.DBConst;
import com.sagacloud.saasmanage.dao.DBConst.Result;
import com.sagacloud.saasmanage.service.BaseService;
import com.sagacloud.saasmanage.service.OperateLogServiceI;
import com.sagacloud.saasmanage.service.OperateModuleServiceI;

/**
 * @desc 工单操作模块管理 业务层
 * @author gezhanbin
 *
 */
@Service("operateModuleService")
public class OperateModuleServiceImpl extends BaseService implements OperateModuleServiceI {

	@Autowired
	private OperateLogServiceI operateLogService;
	
	@Override
	public String queryAllOperateModule() {
		//查询全部操作模块信息
		JSONObject jsonObject = new JSONObject();
		jsonObject.put("dict_type", "wo_control_module");
		jsonObject.put(DBConst.TABLE_FIELD_VALID, true);
		jsonObject = JSONUtil.getCriteriaWithMajors(jsonObject, "dict_type",DBConst.TABLE_FIELD_VALID);
		String queryResult = DBCommonMethods.queryRecordByCriteria(DBConst.TABLE_GENERAL_DICTIONARY, jsonObject.toJSONString());
		//过滤    模块id  模块编码  模块名称  描述(释义) 专属客户
		if(queryResult.contains(Result.RESULT) && queryResult.contains(Result.CONTENT)) {
			JSONObject resultJson = JSONObject.parseObject(queryResult);
			JSONArray contents = resultJson.getJSONArray(Result.CONTENT);
			if(contents != null && contents.size() > 0) {
				JSONArray items = new JSONArray();
				int size = contents.size();
				for (int i = size - 1; i > -1; i--) {
					JSONObject content = contents.getJSONObject(i);
					String module_id = content.getString("dict_id");
					String module_code = content.getString("code");
					String module_name = content.getString("name");
					String description = content.getString("description");
					String create_time = content.getString(DBConst.TABLE_FIELD_CTEATE_TIME);
					//专属客户  从缓存里拿数据
					
					JSONObject item = new JSONObject();
					item.put("module_id", module_id);
					item.put("module_code", module_code);
					item.put("module_name", module_name);
					item.put("description", description);
					item.put("create_time", create_time);
					String project_ids = content.getString("project_ids");
					if(project_ids != null && !"".equals(project_ids)) {
						String projectLocalNames = "";
						JSONArray projectIds = JSONArray.parseArray(project_ids);
						for (int j = 0; j < projectIds.size(); j++) {
							String projectId = projectIds.getString(j);
							JSONObject customer = CustomerCache.getCustomerByProjectId(projectId);
							if(customer == null) {
								continue;
							}
							String projectLocalName = customer.getString("project_local_name");
							if(projectLocalName == null || "".equals(projectLocalName)) {
								continue;
							}
							projectLocalNames += projectLocalName;
							projectLocalNames += ",";
						}
						if(projectLocalNames.endsWith(",")) {
							projectLocalNames = projectLocalNames.substring(0, projectLocalNames.length() - 1);
						}
						if(!"".equals(projectLocalNames)) {
							item.put("project_local_names", projectLocalNames);
						}
					}
					items.add(item);
				}
				items = JSONUtil.sortByStringField(items, "create_time", -1);
				
				resultJson.put(Result.CONTENT, items);
			}
			queryResult = JSON.toJSONString(resultJson);
		}
		
		
		
		return queryResult;
	}

	@Override
	public String addOperateModule(JSONObject jsonObject) throws Exception {
		String requestContent = JSON.toJSONString(jsonObject);
		String operatePersonId = jsonObject.getString("user_id");
		String code = jsonObject.getString("module_code");
		String name = jsonObject.getString("module_name");
		String description = jsonObject.getString("description");
		JSONArray project_ids = jsonObject.getJSONArray("project_ids");
//		if(project_ids == null || project_ids.size() == 0) {
//			return ToolsUtil.return_error_json;
//		}
//		jsonObject.remove("user_id");
		jsonObject.clear();
		jsonObject.put("dict_id", "" + DateUtil.getUtcTimeNow());
		jsonObject.put("dict_type", "wo_control_module");
		jsonObject.put("code", code);
		jsonObject.put("name", name);
		jsonObject.put("description", description);
		jsonObject.put("default_use", true);
		if(project_ids != null) {
			jsonObject.put("project_ids", project_ids.toJSONString());
		}
		jsonObject.put(DBConst.TABLE_FIELD_UPDATE_TIME, DateUtil.getNowTimeStr());
		String resultInfo = DBCommonMethods.insertRecord(DBConst.TABLE_GENERAL_DICTIONARY, JSON.toJSONString(JSONUtil.getAddParamJson(jsonObject)));
		String operateResult = "0";
		if(resultInfo.contains(Result.SUCCESS)) {
			operateResult = "1";
		}
		//添加操作日志
		operateLogService.insertRecord(operatePersonId, DBConst.TABLE_GENERAL_DICTIONARY, "I", "addOperateModule", requestContent, operateResult, resultInfo);
		return resultInfo;
	}

	@Override
	public String queryOperateModuleById(JSONObject jsonObject) throws Exception {
		String dict_id = jsonObject.getString("module_id");
		jsonObject.clear();
		jsonObject.put("dict_id", dict_id);
		String queryResult = DBCommonMethods.getRecordBykey(DBConst.TABLE_GENERAL_DICTIONARY, JSON.toJSONString(JSONUtil.getKeyWithMajors(jsonObject, "dict_id")));
		if(queryResult.contains(Result.RESULT) && queryResult.contains(Result.CONTENT)) {
			JSONObject resultJson = JSONObject.parseObject(queryResult);
			String result = resultJson.getString(Result.RESULT);
			if(Result.FAILURE.equals(result)) {
				return queryResult;
			}
			JSONArray contents = resultJson.getJSONArray(Result.CONTENT);
			JSONObject resultObj = new JSONObject();
			resultObj.put(Result.RESULT, Result.SUCCESS);
			JSONObject content = new JSONObject();
			if(contents != null && contents.size() > 0) {
				JSONObject item = contents.getJSONObject(0);
				String module_id = item.getString("dict_id");
				String module_code = item.getString("code");
				String module_name = item.getString("name");
				String description = item.getString("description");
				String create_time = item.getString("create_time");
				content.put("module_id", module_id);
				content.put("module_code", module_code);
				content.put("module_name", module_name);
				content.put("description", description);
				String project_ids = item.getString("project_ids");
				JSONArray projectIds = null;
				JSONArray projectLocalNames = new JSONArray();
				if(project_ids != null && !"".equals(project_ids)) {
					projectIds = JSONArray.parseArray(project_ids);
					for (int j = 0; j < projectIds.size(); j++) {
						String projectId = projectIds.getString(j);
						JSONObject customer = CustomerCache.getCustomerByProjectId(projectId);
						if(customer == null) {
							continue;
						}
						String project_local_name = customer.getString("project_local_name");
						if(project_local_name == null || "".equals(project_local_name)) {
							continue;
						}
						projectLocalNames.add(project_local_name);
					}
				}
				content.put("project_ids", projectIds);
				content.put(DBConst.TABLE_FIELD_CTEATE_TIME, DateUtil.transferDateFormat(create_time, CommonMessage.dataFormat_save, CommonMessage.dataFormat_show));
				if(projectLocalNames.size() > 0) {
					content.put("project_local_names", projectLocalNames);
				}
				resultObj.put("Item", content);
			}
			queryResult = JSON.toJSONString(resultObj);
			
		}
		return queryResult;
	}

	@Override
	public String updateOperateModuleById(JSONObject jsonObject) throws Exception {
		String requestContent = JSON.toJSONString(jsonObject);
		String operatePersonId = jsonObject.getString("user_id");
		String dict_id = jsonObject.getString("module_id");
		String code = jsonObject.getString("module_code");
		String name = jsonObject.getString("module_name");
		String description = jsonObject.getString("description");
		JSONArray project_ids = jsonObject.getJSONArray("project_ids");
		
		jsonObject.clear();
		jsonObject.put("dict_id", dict_id);
		jsonObject.put("dict_type", "wo_control_module");
		jsonObject.put("code", code);
		jsonObject.put("name", name);
		jsonObject.put("description", description);
		jsonObject.put("default_use", true);
		if(project_ids != null) {
			jsonObject.put("project_ids", project_ids.toJSONString());
		}
		
		jsonObject.put("update_time", DateUtil.getNowTimeStr());
		String resultInfo = DBCommonMethods.updateRecord(DBConst.TABLE_GENERAL_DICTIONARY, JSON.toJSONString(JSONUtil.getUpdateParamJson(jsonObject, "dict_id")));
		String operateResult = "0";
		if(resultInfo.contains(Result.SUCCESS)) {
			operateResult = "1";
		}
		operateLogService.insertRecord(operatePersonId, DBConst.TABLE_GENERAL_DICTIONARY, "U", "updateOperateModuleById", requestContent, operateResult, resultInfo);
		return resultInfo;
	}

	@Override
	public String verifyModuleCode(JSONObject jsonObject) throws Exception {
		String dict_id = jsonObject.getString("module_id");
		String code = jsonObject.getString("module_code");
		boolean can_use = true;
		jsonObject.clear();
		jsonObject.put("dict_type", "wo_control_module");
		jsonObject.put("code", code);
		jsonObject.put(DBConst.TABLE_FIELD_VALID, true);
		jsonObject = JSONUtil.getCriteriaWithMajors(jsonObject, "code","dict_type",DBConst.TABLE_FIELD_VALID);
		String queryResult = DBCommonMethods.queryRecordByCriteria(DBConst.TABLE_GENERAL_DICTIONARY, jsonObject.toJSONString());
		//过滤    模块id  模块编码  模块名称  描述(释义) 专属客户
		JSONObject queryJson = JSONObject.parseObject(queryResult);
		if(Result.SUCCESS.equals(queryJson.getString(Result.RESULT))) {
			
			int count = queryJson.getIntValue(Result.COUNT);
			if(count > 1) {
				can_use = false;
			} else if(count == 1) {
				JSONArray queryContents = queryJson.getJSONArray(Result.CONTENT);
				if(queryContents != null && queryContents.size() > 0) {
					JSONObject queryContent = queryContents.getJSONObject(0);
					String dictId = queryContent.getString("dict_id");
					if(!StringUtil.isNull(dict_id)) {
						if(!dictId.equals(dict_id)) {
							can_use = false;
						}
					} else {
						can_use = false;
					}
				}
			}
			
			JSONObject item = new JSONObject();
			item.put("can_use", can_use);
			queryJson.put("Item", item);
			queryJson.remove(Result.CONTENT);
			queryJson.remove(Result.COUNT);
			queryResult = queryJson.toJSONString();
		}
		
		return queryResult;
	}

}
