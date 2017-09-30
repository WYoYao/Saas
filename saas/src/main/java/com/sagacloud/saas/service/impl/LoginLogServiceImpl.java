package com.sagacloud.saas.service.impl;

import org.springframework.stereotype.Service;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.sagacloud.saas.common.DateUtil;
import com.sagacloud.saas.common.JSONUtil;
import com.sagacloud.saas.dao.DBCommonMethods;
import com.sagacloud.saas.dao.DBConst;
import com.sagacloud.saas.dao.DBConst.Result;
import com.sagacloud.saas.service.LoginLogServiceI;

@Service("loginLogService")
public class LoginLogServiceImpl implements LoginLogServiceI {

	@Override
	public String insertRecord(String user_id, String user_type, String user_ip,
			String browser, String terminal, String system,String login_result,
			String failure_reason){
		JSONObject jsonObject = new JSONObject();
		jsonObject.put("log_id", "" + DateUtil.getUtcTimeNow());
		jsonObject.put("user_id", user_id);
		jsonObject.put("user_type", user_type);
		jsonObject.put("user_ip", user_ip);
		jsonObject.put("login_time", DateUtil.getNowTimeStr());
		jsonObject.put("browser", browser);
		jsonObject.put("terminal", terminal);
		jsonObject.put("system", system);
		jsonObject.put("logout_time", "-1");
		jsonObject.put("login_result", login_result);
		jsonObject.put("failure_reason", failure_reason);
		jsonObject.put("create_time", DateUtil.getNowTimeStr());
		jsonObject.put("update_time", DateUtil.getNowTimeStr());
		return DBCommonMethods.insertRecord(DBConst.TABLE_USER_LOGIN_LOG, JSONUtil.getAddParamJson(jsonObject).toJSONString());
	}

	@Override
	public String updateRecord(String user_id) {
		JSONObject jsonObject = new JSONObject();
		jsonObject.put("user_id", user_id);
		jsonObject.put("logout_time", "-1");
		//查询出当前用户最后一条记录logout_time = "-1"的记录
		jsonObject = JSONUtil.getCriteriaWithMajors(jsonObject, "user_id","logout_time");
		String queryResult = DBCommonMethods.queryRecordByCriteria(DBConst.TABLE_USER_LOGIN_LOG, jsonObject.toJSONString());
		if(queryResult.contains(Result.SUCCESS) && queryResult.contains(Result.CONTENT)) {
			JSONObject queryJson = JSONObject.parseObject(queryResult);
			JSONArray queryContents = queryJson.getJSONArray(Result.CONTENT);
			if(queryContents != null && queryContents.size() > 0) {
				queryJson = queryContents.getJSONObject(queryContents.size() - 1);
				String log_id = queryJson.getString("log_id");
				jsonObject = new JSONObject();
				jsonObject.put("log_id", log_id);
				jsonObject.put("logout_time", DateUtil.getNowTimeStr());
				jsonObject = JSONUtil.getUpdateParamJson(jsonObject, "log_id");
				queryResult = DBCommonMethods.updateRecord(DBConst.TABLE_USER_LOGIN_LOG, jsonObject.toJSONString());
			}
		}
		return queryResult;
	}
}
