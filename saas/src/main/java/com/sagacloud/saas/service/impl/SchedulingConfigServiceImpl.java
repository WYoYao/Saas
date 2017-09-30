package com.sagacloud.saas.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.sagacloud.saas.common.DateUtil;
import com.sagacloud.saas.common.JSONUtil;
import com.sagacloud.saas.common.StringUtil;
import com.sagacloud.saas.common.ToolsUtil;
import com.sagacloud.saas.dao.DBCommonMethods;
import com.sagacloud.saas.dao.DBConst;
import com.sagacloud.saas.dao.DBConst.Result;
import com.sagacloud.saas.service.OperateLogServiceI;
import com.sagacloud.saas.service.SchedulingConfigServiceI;

/**
 * @desc 排班配置
 * @author gezhanbin
 *
 */
@Service("/schedulingConfigService")
public class SchedulingConfigServiceImpl implements SchedulingConfigServiceI {
	@Autowired
	private OperateLogServiceI operateLogService;
	
	@Override
	public String querySchedulingConfig(JSONObject jsonObject) {
		jsonObject.remove("user_id");
		jsonObject.put(DBConst.TABLE_FIELD_VALID, true);
		jsonObject = JSONUtil.getCriteriaWithMajors(jsonObject, "project_id", DBConst.TABLE_FIELD_VALID);
		String queryResult = DBCommonMethods.queryRecordByCriteria(DBConst.TABLE_SCHEDULING_CONFIG, jsonObject.toJSONString());
		if(queryResult.contains(Result.SUCCESS) && queryResult.contains(Result.CONTENT)) {
			JSONObject queryJson = JSONObject.parseObject(queryResult);
			JSONArray queryContents = queryJson.getJSONArray(Result.CONTENT);
			JSONArray contents = new JSONArray();
			if(queryContents != null && queryContents.size() > 0) {
				for (int i = 0; i < queryContents.size(); i++) {
					JSONObject queryContent = queryContents.getJSONObject(i);
					JSONObject content = new JSONObject();
					String code = queryContent.getString("code");
					String name = queryContent.getString("name");
					String time_plan = queryContent.getString("time_plan");
					String create_time = queryContent.getString("create_time");
					content.put("code", code);
					content.put("name", name);
					content.put("create_time", create_time);
					if(!StringUtil.isNull(time_plan)) {
						JSONArray time_plans = JSONArray.parseArray(time_plan);
						content.put("time_plan", time_plans);
					}
					contents.add(content);	
				}
				queryJson.put(Result.CONTENT, contents);
				queryResult = queryJson.toJSONString();
			}
		}
		return queryResult;
	}

	@Override
	public String saveSchedulingConfig(JSONObject jsonObject) throws Exception {
		JSONObject result = new JSONObject();
		result.put(Result.RESULT, Result.SUCCESS);
		result.put(Result.RESULTMSG, "");
		String requestContent = JSON.toJSONString(jsonObject);
		String operatePersonId = jsonObject.getString("user_id");
//		String project_id = jsonObject.getString("project_id");
//		String code = jsonObject.getString("code");
//		String name = jsonObject.getString("name");
		jsonObject.remove("user_id");
		jsonObject.put(DBConst.TABLE_FIELD_UPDATE_TIME, DateUtil.getNowTimeStr());
		jsonObject.put(DBConst.TABLE_FIELD_VALID, true);
		jsonObject.put("scheduling_config_id", DBConst.TABLE_SCHEDULING_CONFIG_ID_TAG + DateUtil.getUtcTimeNow());
		//判断编码与名称是否重复
		//1、判断编码
		JSONObject codeCriteria = JSONUtil.getCriteriaWithMajors(jsonObject, "code","project_id",DBConst.TABLE_FIELD_VALID);
		String codeQueryResult = DBCommonMethods.queryRecordByCriteria(DBConst.TABLE_SCHEDULING_CONFIG, codeCriteria.toJSONString());
		if(codeQueryResult.contains(Result.SUCCESS) && codeQueryResult.contains(Result.COUNT)) {
			JSONObject codeQueryJson = JSONObject.parseObject(codeQueryResult);
			int codeSize = codeQueryJson.getIntValue(Result.COUNT);
			if(codeSize > 0) {
				result.put(Result.RESULT, Result.FAILURE);
				result.put(Result.RESULTMSG, "编码重复！");
				return result.toJSONString();
			}
		}
		//2、判断名称
		JSONObject nameCriteria = JSONUtil.getCriteriaWithMajors(jsonObject, "name","project_id",DBConst.TABLE_FIELD_VALID);
		String nameQueryResult = DBCommonMethods.queryRecordByCriteria(DBConst.TABLE_SCHEDULING_CONFIG, nameCriteria.toJSONString());
		if(nameQueryResult.contains(Result.SUCCESS) && nameQueryResult.contains(Result.COUNT)) {
			JSONObject nameQueryJson = JSONObject.parseObject(nameQueryResult);
			int nameSize = nameQueryJson.getIntValue(Result.COUNT);
			if(nameSize > 0) {
				result.put(Result.RESULT, Result.FAILURE);
				result.put(Result.RESULTMSG, "名称重复！");
				return result.toJSONString();
			}
		}
		jsonObject = JSONUtil.prossesParamToJsonString(jsonObject, "time_plan");
		jsonObject = JSONUtil.getAddParamJson(jsonObject);
		String resultInfo = DBCommonMethods.insertRecord(DBConst.TABLE_SCHEDULING_CONFIG, jsonObject.toJSONString());
		String operateResult = "0";
		if(resultInfo.contains(Result.SUCCESS)) {
			operateResult = "1";
		}
		//添加操作日志
		operateLogService.insertRecord(operatePersonId, DBConst.TABLE_SCHEDULING_CONFIG, "I", "saveSchedulingConfig", requestContent, operateResult, resultInfo);
		return resultInfo;
	}

	@Override
	public String updateSchedulingConfig(JSONObject jsonObject) throws Exception {
		JSONObject result = new JSONObject();
		result.put(Result.RESULT, Result.SUCCESS);
		result.put(Result.RESULTMSG, "");
		String requestContent = JSON.toJSONString(jsonObject);
		String operatePersonId = jsonObject.getString("user_id");
		String scheduling_config_id = jsonObject.getString("scheduling_config_id");
		jsonObject.remove("user_id");
		jsonObject.put(DBConst.TABLE_FIELD_UPDATE_TIME, DateUtil.getNowTimeStr());
		jsonObject.put(DBConst.TABLE_FIELD_VALID, true);
		//判断编码与名称是否重复
		//1、判断编码
		JSONObject codeCriteria = JSONUtil.getCriteriaWithMajors(jsonObject, "code","project_id",DBConst.TABLE_FIELD_VALID);
		String codeQueryResult = DBCommonMethods.queryRecordByCriteria(DBConst.TABLE_SCHEDULING_CONFIG, codeCriteria.toJSONString());
		if(codeQueryResult.contains(Result.SUCCESS) && codeQueryResult.contains(Result.COUNT)) {
			JSONObject codeQueryJson = JSONObject.parseObject(codeQueryResult);
			int codeSize = codeQueryJson.getIntValue(Result.COUNT);
			if(codeSize > 1) {
				result.put(Result.RESULT, Result.FAILURE);
				result.put(Result.RESULTMSG, "编码重复！");
				return result.toJSONString();
			} else if(codeSize == 1) {
				codeQueryJson = codeQueryJson.getJSONArray(Result.CONTENT).getJSONObject(0);
				if(!scheduling_config_id.equals(codeQueryJson.getString("scheduling_config_id"))) {
					result.put(Result.RESULT, Result.FAILURE);
					result.put(Result.RESULTMSG, "编码重复！");
					return result.toJSONString();
				}
			}
		}
		//2、判断名称
		JSONObject nameCriteria = JSONUtil.getCriteriaWithMajors(jsonObject, "name","project_id",DBConst.TABLE_FIELD_VALID);
		String nameQueryResult = DBCommonMethods.queryRecordByCriteria(DBConst.TABLE_SCHEDULING_CONFIG, nameCriteria.toJSONString());
		if(nameQueryResult.contains(Result.SUCCESS) && nameQueryResult.contains(Result.COUNT)) {
			JSONObject nameQueryJson = JSONObject.parseObject(nameQueryResult);
			int nameSize = nameQueryJson.getIntValue(Result.COUNT);
			if(nameSize > 1) {
				result.put(Result.RESULT, Result.FAILURE);
				result.put(Result.RESULTMSG, "名称重复！");
				return result.toJSONString();
			} else if(nameSize == 1) {
				nameQueryJson = nameQueryJson.getJSONArray(Result.CONTENT).getJSONObject(0);
				if(!scheduling_config_id.equals(nameQueryJson.getString("scheduling_config_id"))) {
					result.put(Result.RESULT, Result.FAILURE);
					result.put(Result.RESULTMSG, "名称重复！");
					return result.toJSONString();
				}
			}
		}
		jsonObject = JSONUtil.prossesParamToJsonString(jsonObject, "time_plan");
		String resultInfo = DBCommonMethods.updateRecord(DBConst.TABLE_SCHEDULING_CONFIG, JSON.toJSONString(JSONUtil.getUpdateParamJson(jsonObject, "scheduling_config_id")));
		String operateResult = "0";
		if(resultInfo.contains(Result.SUCCESS)) {
			operateResult = "1";
		}
		operateLogService.insertRecord(operatePersonId, DBConst.TABLE_SCHEDULING_CONFIG, "U", "updateSchedulingConfig", requestContent, operateResult, resultInfo);
		return resultInfo;
	}

	@Override
	public String deleteSchedulingConfig(JSONObject jsonObject) throws Exception {
		String requestContent = JSON.toJSONString(jsonObject);
		String operatePersonId = jsonObject.getString("user_id");
		jsonObject = JSONUtil.getCriteriaWithMajors(jsonObject, "scheduling_config_id");
		String resultInfo = DBCommonMethods.deleteRecord(DBConst.TABLE_SCHEDULING_CONFIG, jsonObject.toJSONString());
		String operateResult = "0";
		if(resultInfo.contains(Result.SUCCESS)) {
			operateResult = "1";
		}
		operateLogService.insertRecord(operatePersonId, DBConst.TABLE_SCHEDULING_CONFIG, "D", "deleteSchedulingConfig", requestContent, operateResult, resultInfo);
		return resultInfo;
	}

	@Override
	public String saveOrUpdateSchedulingConfig(JSONObject jsonObject) throws Exception {
		String project_id = jsonObject.getString("project_id");
		JSONArray scheduling_configs = jsonObject.getJSONArray("scheduling_configs");
		//删除之前的该项目下的所有配置信息
		jsonObject.put(DBConst.TABLE_FIELD_VALID, true);
		jsonObject = JSONUtil.getCriteriaWithMajors(jsonObject, DBConst.TABLE_FIELD_VALID,"project_id");
		String queryResult = DBCommonMethods.deleteRecord(DBConst.TABLE_SCHEDULING_CONFIG, jsonObject.toJSONString());
		JSONObject queryJson = JSONObject.parseObject(queryResult);
		if(Result.FAILURE.equals(queryJson.getString(Result.RESULT))) {
			return queryResult;
		}
		String result = Result.SUCCESS;
		for (int i = 0; i < scheduling_configs.size(); i++) {
			JSONObject scheduling_config = scheduling_configs.getJSONObject(i);
			scheduling_config.put("project_id",project_id);
			JSONArray time_plan = scheduling_config.getJSONArray("time_plan");
			scheduling_config.put("time_plan", time_plan.toJSONString());
			scheduling_config.put(DBConst.TABLE_FIELD_UPDATE_TIME,DateUtil.getNowTimeStr());
			scheduling_config.put("scheduling_config_id", DBConst.TABLE_SCHEDULING_CONFIG_ID_TAG + DateUtil.getUtcTimeNow());
			scheduling_config = JSONUtil.getAddParamJson(scheduling_config);
			queryResult = DBCommonMethods.insertRecord(DBConst.TABLE_SCHEDULING_CONFIG, scheduling_config.toJSONString());
			queryJson = JSONObject.parseObject(queryResult);
			if(Result.FAILURE.equals(queryJson.getString(Result.RESULT))) {
				result = Result.FAILURE;
			}
		}
		JSONObject resultJson = new JSONObject();
		resultJson.put(Result.RESULT, result);
		resultJson.put(Result.RESULTMSG, "");
		return resultJson.toJSONString();
	}

}
