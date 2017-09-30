package com.sagacloud.saas.service.impl;


import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.sagacloud.saas.cache.CustomerCache;
import com.sagacloud.saas.cache.ProjectCache;
import com.sagacloud.saas.common.DataRequestPathUtil;
import com.sagacloud.saas.common.DateUtil;
import com.sagacloud.saas.common.JSONUtil;
import com.sagacloud.saas.common.StringUtil;
import com.sagacloud.saas.common.ToolsUtil;
import com.sagacloud.saas.dao.DBCommonMethods;
import com.sagacloud.saas.dao.DBConst;
import com.sagacloud.saas.dao.DBConst.Result;
import com.sagacloud.saas.service.BaseService;
import com.sagacloud.saas.service.LoginLogServiceI;
import com.sagacloud.saas.service.OperateLogServiceI;
import com.sagacloud.saas.service.UserServiceI;

/**
 * @desc  用户登录
 * @author gezhanbin
 *
 */
@Service("userService")
public class UserServiceImpl extends BaseService implements UserServiceI {
	
	@Autowired
	private OperateLogServiceI operateLogService;
	
	@Autowired
	private LoginLogServiceI loginLogService;
	
	@Autowired
	private ProjectCache projectCache;
	
	@Value("${system-code}")
    public String systemCode;
    @Value("${image-secret}")
    public String systemSecret;
    
	@Override
	public String companyLogin(JSONObject jsonObject) throws Exception {
		String result = Result.FAILURE;
		String resultMsg = "登录失败";
		String login_result = "0";
		String failure_reason = "";
		String user_name = jsonObject.getString("user_name");
		String user_psw = jsonObject.getString("user_psw");
		String user_ip = jsonObject.getString("user_ip");
		String browser = jsonObject.getString("browser");
		String terminal = jsonObject.getString("terminal");
		String system = jsonObject.getString("system");
		jsonObject = new JSONObject();
		jsonObject.put("account", user_name);
		jsonObject.put("passwd", ToolsUtil.encodeByMd5(user_psw));
		jsonObject.put(DBConst.TABLE_FIELD_VALID, true);
		JSONObject criteria = new JSONObject();
		criteria.put("criteria", jsonObject);
		String queryResult = DBCommonMethods.queryRecordByCriteria(DBConst.TABLE_CUSTOMER, criteria.toJSONString());
		JSONObject item = new JSONObject();
		JSONObject resultJson = JSONObject.parseObject(queryResult);
		if(Result.SUCCESS.equals(resultJson.getString(Result.RESULT))) {
			JSONArray queryContents = resultJson.getJSONArray(Result.CONTENT);
			if(queryContents != null && queryContents.size() > 0) {
				resultJson = queryContents.getJSONObject(0);
				String customer_id = resultJson.getString("customer_id");
				String company_name = resultJson.getString("company_name");
				String project_id = resultJson.getString("project_id");
				String project_local_name = resultJson.getString("project_local_name");
				
				String last_project_id = "";
				jsonObject = new JSONObject();
				jsonObject.put("user_id", user_name);
				jsonObject.put(DBConst.TABLE_FIELD_VALID, true);
				criteria = new JSONObject();
				criteria.put("criteria", jsonObject);
				queryResult = DBCommonMethods.queryRecordByCriteria(DBConst.TABLE_USER_CUSTOM, criteria.toJSONString());				
				
				if(queryResult.contains(Result.SUCCESS) && queryResult.contains(Result.CONTENT)) {
					resultJson = JSONObject.parseObject(queryResult);
					queryContents = resultJson.getJSONArray(Result.CONTENT);
					if(queryContents != null && queryContents.size() > 0) {
						resultJson = queryContents.getJSONObject(0);
						last_project_id = resultJson.getString("last_project_id");
					}
				}
				item.put("customer_id", customer_id);
				item.put("company_name", company_name);
				item.put("project_id", project_id);
				item.put("project_local_name", project_local_name);
				item.put("system_code", systemCode);
				item.put("image_secret", systemSecret);
				item.put("last_project_id", last_project_id);
				result = Result.SUCCESS;
				resultMsg = "登录成功";
				login_result = "1";
				String tool_type = "";
				//tool_type的值根据项目id到客户信息中去查询；
				JSONObject customer = CustomerCache.getCustomerByProjectId(project_id);
				if(customer != null) {
					tool_type = customer.getString("tool_type");
				}
				item.put("tool_type", tool_type == null ? "" : tool_type);
			}
			
		} else {
			failure_reason = resultJson.getString(Result.RESULTMSG);
		}
		
		resultJson = new JSONObject(); 
		
		resultJson.put(Result.RESULT, result);
		resultJson.put(Result.RESULTMSG, resultMsg);
		resultJson.put("Item", item);
		
		loginLogService.insertRecord(user_name, "2", user_ip, 
				browser, terminal, system,
				login_result, failure_reason);
		return resultJson.toJSONString();
	}

	@Override
	public String smsSendCode(JSONObject jsonObject) throws Exception {
		String phoneNum = jsonObject.getString("phone_num");
		String url = getSmsPlatformPath(DataRequestPathUtil.smsPlat_send_code);
		JSONObject paramJson = JSONObject.parseObject("{}");
		paramJson.put("mobile", phoneNum);
		String result = httpPostRequest(url, paramJson.toJSONString());
		return result;
	}

	@Override
	public String personLogin(JSONObject jsonObject) throws Exception {
		String login_result = "0";
		String failure_reason = "";
		String user_name = jsonObject.getString("user_name");
		String user_psw = jsonObject.getString("user_psw");
		String user_ip = jsonObject.getString("user_ip");
		String browser = jsonObject.getString("browser");
		String terminal = jsonObject.getString("terminal");
		String system = jsonObject.getString("system");
		//返回结果
		JSONObject resultJson = JSONObject.parseObject("{}");
		String result = "success";
		String resultMsg = "登录成功";

		//判断用户是否存在
		JSONObject paramJson = JSONObject.parseObject("{}");
		paramJson.put("phone_num", user_name);
		String requestUrl = getPersonServicePath(DataRequestPathUtil.person_service_query_person_by_phonenum);
		String person = httpPostRequest(requestUrl, paramJson.toJSONString());
		
		JSONObject personJson = JSONObject.parseObject(person);
		
		JSONObject item = personJson.getJSONObject("Item");
		String personResult = personJson.getString(Result.RESULT);
		if(!Result.SUCCESS.equals(personResult) || item == null){
			result = "failure";
			resultMsg = "用户名错误";
		}else{
			//验证验证码
			String url = getSmsPlatformPath(DataRequestPathUtil.smsPlat_verify_code);
			JSONObject verifyParamJson = JSONObject.parseObject("{}");
			verifyParamJson.put("mobile", user_name);
			verifyParamJson.put("code", user_psw);
			String verifyMsg = httpPostRequest(url, verifyParamJson.toJSONString());
			JSONObject verifyJson = JSONObject.parseObject(verifyMsg);
			if(!"success".equals(verifyJson.getString("Result"))){
				result = "failure";
				resultMsg = "用户名或密码错误";
			}else{
				//处理从人员信息服务获取到的数据结构
				transferPersonToProject(item);
				resultJson.put("Item", item);
				login_result = "1";
			}
		}
		// 返回结果
		resultJson.put("Result", result);
		resultJson.put("ResultMsg", resultMsg);
		failure_reason = resultMsg;
		loginLogService.insertRecord(user_name, "3", user_ip, 
				browser, terminal, system,
				login_result, failure_reason);
		
		return resultJson.toJSONString();
	}
	
	public void transferPersonToProject(JSONObject item) throws Exception{
		String person_id = item.getString("person_id");
		//
		
		String last_project_id = "";
		JSONObject jsonObject = new JSONObject();
		jsonObject.put("user_id", person_id);
		jsonObject.put(DBConst.TABLE_FIELD_VALID, true);
		JSONObject criteria = new JSONObject();
		criteria.put("criteria", jsonObject);
		String queryResult = DBCommonMethods.queryRecordByCriteria(DBConst.TABLE_USER_CUSTOM, criteria.toJSONString());				
		
		if(queryResult.contains(Result.SUCCESS) && queryResult.contains(Result.CONTENT)) {
			JSONObject resultJson = JSONObject.parseObject(queryResult);
			JSONArray queryContents = resultJson.getJSONArray(Result.CONTENT);
			if(queryContents != null && queryContents.size() > 0) {
				resultJson = queryContents.getJSONObject(0);
				last_project_id = resultJson.getString("last_project_id");
			}
		}
		Map<String, Set<String>> funcPackIdsMap = queryRoleFuncPacksMap();
		JSONArray projectPersons = item.getJSONArray("project_persons");
		item.put("last_project_id", last_project_id);
		item.put("system_code", systemCode);
		item.put("image_secret", systemSecret);
		for (int i = 0; i < projectPersons.size(); i++) {
			JSONObject projectPerson = projectPersons.getJSONObject(i);
			String project_id = projectPerson.getString("project_id");
			JSONObject project = projectCache.getProjectJsonDataById(project_id);
			String project_name = null;
			if(project != null) {
				project_name = project.getString("ProjLocalName");
			}
			projectPerson.put("project_name", project_name);
			
			JSONObject roles = projectPerson.getJSONObject("roles");
			Set<String> funcPackIdSet = new HashSet<>();
			if(roles != null) {
				for(String role_id : roles.keySet()) {
					Set<String> funcPackIds = funcPackIdsMap.get(role_id);
					funcPackIdSet.addAll(funcPackIds);
//					for (int j = 0; j < funcPackIds.size(); j++) {
//						String funcPackId = funcPackIds.getString(j);
//						funcPackIdSet.add(funcPackId);
//					}
				}
			}
			JSONArray func_packs = new JSONArray();
			func_packs.addAll(funcPackIdSet);
			projectPerson.put("func_packs", func_packs);
			String tool_type = "";
			JSONObject customer = CustomerCache.getCustomerByProjectId(project_id);
			if(customer != null) {
				tool_type = customer.getString("tool_type");
			}
			item.put("tool_type", tool_type == null ? "" : tool_type);
		}
	}

	@Override
	public String savePersonUseProject(JSONObject jsonObject) throws Exception {
		String requestContent = JSON.toJSONString(jsonObject);
		String project_id = jsonObject.getString("project_id");
		String operatePersonId = jsonObject.getString("user_id");
		jsonObject = JSONUtil.getCriteriaWithMajors(jsonObject, "user_id");
		String queryResult = DBCommonMethods.queryRecordByCriteria(DBConst.TABLE_USER_CUSTOM, jsonObject.toJSONString());
		long count = 0;
		if(queryResult.contains(Result.SUCCESS) && queryResult.contains(Result.COUNT)) {
			JSONObject resultJson = JSONObject.parseObject(queryResult);
			count = resultJson.getLongValue(Result.COUNT);
		}
		String resultInfo = null;
		String operateType = null;
		jsonObject = new JSONObject();
		jsonObject.put("user_id", operatePersonId);
		jsonObject.put("last_project_id", project_id);
		if(count == 0) {
			//插入
			jsonObject.put("update_time", DateUtil.getNowTimeStr());
			jsonObject = JSONUtil.getAddParamJson(jsonObject);
			resultInfo = DBCommonMethods.insertRecord(DBConst.TABLE_USER_CUSTOM, jsonObject.toJSONString());
			operateType = "I";
		} else {
			//更新
			jsonObject.put(DBConst.TABLE_FIELD_VALID, true);
			jsonObject = JSONUtil.getUpdateParamJson(jsonObject, "user_id");
			resultInfo = DBCommonMethods.updateRecord(DBConst.TABLE_USER_CUSTOM, jsonObject.toJSONString());
		}
		String operateResult = "0";
		if(resultInfo.contains(Result.SUCCESS)) {
			operateResult = "1";
		}
		//添加操作日志
		operateLogService.insertRecord(operatePersonId, DBConst.TABLE_USER_CUSTOM, operateType, "savePersonUseProject", requestContent, operateResult, resultInfo);
		return resultInfo;
	}

	@Override
	public String logout(String user_id) {
		return loginLogService.updateRecord(user_id);
	}

	private Map<String, Set<String>> queryRoleFuncPacksMap() {
		Map<String, Set<String>> funcPackIdsMap = new HashMap<>();
		JSONObject jsonObject = new JSONObject();
		jsonObject.put(DBConst.TABLE_FIELD_VALID, true);
		jsonObject = JSONUtil.getCriteriaWithMajors(jsonObject, DBConst.TABLE_FIELD_VALID);
		String queryResult = DBCommonMethods.queryRecordByCriteria(DBConst.TABLE_ROLE, jsonObject.toJSONString());
		if(queryResult.contains(Result.SUCCESS) && queryResult.contains(Result.CONTENT)) {
			JSONObject queryJson = JSONObject.parseObject(queryResult);
			JSONArray queryContents = queryJson.getJSONArray(Result.CONTENT);
			if(queryContents != null && queryContents.size() > 0) {
				//获取所有功能包
				Map<String,JSONArray> funcPackIdMap = new HashMap<>();
				
				jsonObject.clear();
				jsonObject.put(DBConst.TABLE_FIELD_VALID, true);
				jsonObject = JSONUtil.getCriteriaWithMajors(jsonObject, DBConst.TABLE_FIELD_VALID);
				queryResult = DBCommonMethods.queryRecordByCriteria(DBConst.TABLE_FUNCTION_PACK, jsonObject.toJSONString());
				if(queryResult.contains(Result.SUCCESS) && queryResult.contains(Result.CONTENT)) {
					queryJson = JSONObject.parseObject(queryResult);
					JSONArray queryFuncs = queryJson.getJSONArray(Result.CONTENT);
					if(queryFuncs != null && queryFuncs.size() > 0) {
						for (int i = 0; i < queryFuncs.size(); i++) {
							queryJson =  queryFuncs.getJSONObject(i);
							String func_pack_id = queryJson.getString("func_pack_id");
							String funcPacks = queryJson.getString("func_packs");
							if(!StringUtil.isNull(funcPacks)) {
								JSONArray func_packs = JSONArray.parseArray(funcPacks);
								funcPackIdMap.put(func_pack_id, func_packs);
							}
						}
					}
				}				
				
				for (int i = 0; i < queryContents.size(); i++) {
					queryJson = queryContents.getJSONObject(i);
					String role_id = queryJson.getString("role_id");
					String funcPackIds = queryJson.getString("func_pack_ids");
					if(!StringUtil.isNull(funcPackIds)) {
						Set<String> funcPacks = new HashSet<>();
						JSONArray func_pack_ids = JSONArray.parseArray(funcPackIds);
						for (int j = 0; j < func_pack_ids.size(); j++) {
							String func_pack_id = func_pack_ids.getString(j);
							JSONArray func_packs = funcPackIdMap.get(func_pack_id);
							if(func_packs != null && func_packs.size() > 0) {
								for (int k = 0; k < func_packs.size(); k++) {
									String func_pack = func_packs.getString(k);
									funcPacks.add(func_pack);
								}
							}
						}
						if(funcPacks.size() > 0) {
							funcPackIdsMap.put(role_id, funcPacks);
						}
					}
				}
			}
		}
		return funcPackIdsMap;
	}

	@Override
	public String saveUserWoInputMode(JSONObject jsonObject) throws Exception {
		String jsonStr = jsonObject.toJSONString();
		jsonObject.put("wo_input_mode", jsonObject.getString("input_mode"));
		jsonObject.remove("input_mode");
		String params = JSONUtil.getCriteriaWithMajors(jsonObject, "user_id").toJSONString();
		String resultStr = DBCommonMethods.queryRecordByCriteria(DBConst.TABLE_USER_CUSTOM, params);
		if(resultStr.contains("failure")){
			return resultStr;
		}
		JSONObject resultJson = JSONObject.parseObject(resultStr);
		JSONArray results = resultJson.getJSONArray("Content");
		String operateType;
		if(results != null && results.size() > 0){
			operateType = "I";
			params = JSONUtil.getUpdateParamJson(jsonObject, "user_id").toJSONString();
			resultStr = DBCommonMethods.updateRecord(DBConst.TABLE_USER_CUSTOM, params);
		}else{
			operateType = "U";
			params = JSONUtil.getAddParamJson(jsonObject).toJSONString();
			resultStr = DBCommonMethods.insertRecord(DBConst.TABLE_USER_CUSTOM, params);
		}
		operateLogService.insertRecord(jsonObject.getString("user_id"), DBConst.TABLE_USER_CUSTOM, operateType, "saveUserWoInputMode", jsonStr, resultStr.contains("success")?"1":"0", resultStr);
		return null;
	}

	@Override
	public String updatePersonById(JSONObject jsonObject) throws Exception {
		String operate_person_id = jsonObject.getString("user_id");
		jsonObject.remove("user_id");
		jsonObject.put("operate_person_id", operate_person_id);
		String requestUrl = getPersonServicePath(DataRequestPathUtil.person_service_update_person_by_id);
		return httpPostRequest(requestUrl, jsonObject.toJSONString());
	}
	
}
