package com.sagacloud.saas.service.impl;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.sagacloud.saas.cache.ProjectCache;
import com.sagacloud.saas.common.CommonConst;
import com.sagacloud.saas.common.DataRequestPathUtil;
import com.sagacloud.saas.common.StringUtil;
import com.sagacloud.saas.common.ToolsUtil;
import com.sagacloud.saas.dao.DBConst.Result;
import com.sagacloud.saas.service.BaseService;
import com.sagacloud.saas.service.DictionaryServiceI;
import com.sagacloud.saas.service.GeneralDictServiceI;
import com.sagacloud.saas.service.ObjectInfoServiceI;
import com.sagacloud.saas.service.ObjectServiceI;
import com.sagacloud.saas.service.SystemServiceI;

/**
 * 功能描述：系统管理
 * @author gezhanbin
 *
 */
@Service("systemService")
public class SystemServiceImpl extends BaseService implements SystemServiceI {
	@Autowired
    private ProjectCache projectCache;
	@Autowired
	private ObjectInfoServiceI objectInfoService;
	@Autowired
	private DictionaryServiceI dictionaryService;
	@Autowired
	private GeneralDictServiceI generalDictService;
	
	@Override
	public String querySystemPublicInfo(JSONObject jsonObject) throws Exception {
		String project_id = jsonObject.getString("project_id");
		String system_id = jsonObject.getString("system_id");
		jsonObject.clear();
		String secret = projectCache.getProjectSecretById(project_id);
		//1、系统信息
		String requestUrl = getDataPlatformPath(DataRequestPathUtil.dataPlat_object_batch_query, project_id, secret);
		JSONArray criterias = new JSONArray();
		JSONObject objQuery = new JSONObject();
		objQuery.put("id", system_id);
		criterias.add(objQuery);
		jsonObject.put("criterias", criterias);
		String queryResult = this.httpPostRequest(requestUrl, jsonObject.toJSONString());
		JSONObject queryJson = JSONObject.parseObject(queryResult);
		if(Result.SUCCESS.equals(queryJson.getString(Result.RESULT))) {
			JSONObject result = new JSONObject();
			result.put(Result.RESULT, Result.SUCCESS);
			JSONObject item = new JSONObject();
			JSONArray queryContents = queryJson.getJSONArray(Result.CONTENT);
			if(queryContents != null && queryContents.size() > 0) {
				Map<String, String> equipCategoryMap = dictionaryService.queryAllEquipCategoryMap();
				JSONObject queryItem = queryContents.getJSONObject(0);
				item.put("system_id", system_id);
				String build_id = StringUtil.transferId(system_id, CommonConst.tag_build);
				JSONObject build = objectInfoService.queryObject(build_id, project_id, secret);
				String build_local_name = "";
				if(build != null) {
					build_local_name = build.getString("BuildLocalName");
				}
				String domain = system_id.substring(15, 17);
				String system_category = system_id.substring(17, 19);
				JSONObject dict = new JSONObject();
				dict.put("dict_type", "domain_require");
				dict.put("code", domain);
				dict.put("project_id", project_id);
				String domain_name = generalDictService.querydictName(dict);
				String system_category_name = equipCategoryMap.get(system_category);
				JSONObject infos = queryItem.getJSONObject("infos");
				String system_local_id = "";
				String system_local_name = "";
				String BIMID = "";
				if(infos != null) {
					system_local_id = infos.getString("SysLocalID");
					system_local_name = infos.getString("SysLocalName");
					BIMID = infos.getString("BIMID");
				}
				item.put("system_id", system_id);
				item.put("system_local_id", system_local_id);
				item.put("system_local_name", system_local_name);
				item.put("BIMID", BIMID);
				item.put("build_local_name", build_local_name);
				item.put("domain_name", domain_name);
				item.put("system_category_name", system_category_name);
			}
			queryJson.put("Item", item);
			queryJson.remove(Result.CONTENT);
			queryJson.remove(Result.COUNT);
			queryResult = queryJson.toJSONString();
		}
		return queryResult;
	}

	
	
	
	@Override
	public String querySystemDynamicInfo(JSONObject jsonObject) throws Exception {
		String project_id = jsonObject.getString("project_id");
		String system_id = jsonObject.getString("system_id");
		//类型类型
		String system_category_id = StringUtil.getEquipOrSystemCodeFromId(system_id, CommonConst.tag_dict_sytstem);
		String secret = projectCache.getProjectSecretById(project_id);
		//1、系统信息
		JSONObject systemItem = objectInfoService.queryObject(system_id, project_id, secret);
		JSONArray contents = new JSONArray();
		//对象类型
		Map<String, JSONObject> contentsMap = objectInfoService.queryObjectDynamicInfo("system", system_category_id, systemItem);
		contents.addAll(contentsMap.values());
		JSONObject result = new JSONObject();
		result.put(Result.RESULT, Result.SUCCESS);
		result.put(Result.CONTENT, contents);
		result.put(Result.COUNT, contents.size());
		return result.toJSONString();
	}

	@Override
	public String querySystemInfoPointHis(JSONObject jsonObject) throws Exception {
		String project_id = jsonObject.getString("project_id");
		String system_id = jsonObject.getString("system_id");
		String info_point_code = jsonObject.getString("info_point_code");
		String infoPointCode = ToolsUtil.systemInfoParamMap.get(info_point_code);
		String secret = projectCache.getProjectSecretById(project_id);
		return objectInfoService.queryObjectInfoHis(system_id, infoPointCode, project_id, secret);
	}

	@Override
	public String verifySystemName(JSONObject jsonObject) throws Exception {
		String project_id = jsonObject.getString("project_id");
		String build_id = jsonObject.getString("build_id");
		String system_id = jsonObject.getString("system_id");
		String system_local_name = jsonObject.getString("system_local_name");
		String secret = projectCache.getProjectSecretById(project_id);
		String objectParam = ToolsUtil.systemInfoParamMap.get("system_local_name");
		return objectInfoService.verifyObjectInfo(build_id, system_id, objectParam, system_local_name, "Sy", project_id, secret);
	}
	
	@Override
	public String verifySystemLocalId(JSONObject jsonObject) throws Exception {
		String project_id = jsonObject.getString("project_id");
		String system_id = jsonObject.getString("system_id");
		String system_local_id = jsonObject.getString("system_local_id");
		String secret = projectCache.getProjectSecretById(project_id);
		String objectParam = ToolsUtil.systemInfoParamMap.get("system_local_id");
		return objectInfoService.verifyObjectInfo(project_id, system_id, objectParam, system_local_id, "Sy", project_id, secret);
	}

	@Override
	public String verifySystemBimId(JSONObject jsonObject) throws Exception {
		String project_id = jsonObject.getString("project_id");
		String system_id = jsonObject.getString("system_id");
		String bimid = jsonObject.getString("BIMID");
		String secret = projectCache.getProjectSecretById(project_id);
		String objectParam = ToolsUtil.systemInfoParamMap.get("BIMID");
		return objectInfoService.verifyObjectInfo(project_id, system_id, objectParam, bimid, "Sy", project_id, secret);
	}

	@Override
	public String addSystem(JSONObject jsonObject) throws Exception {
		String project_id = jsonObject.getString("project_id");
		String build_id = jsonObject.getString("build_id");
//		String system_local_id = jsonObject.getString("system_local_id");
//		String system_local_name = jsonObject.getString("system_local_name");
//		String BIMID = jsonObject.getString("BIMID");
		String system_category = jsonObject.getString("system_category");
		jsonObject.remove("user_id");
		jsonObject.remove("project_id");
		jsonObject.remove("build_id");
//		jsonObject.remove("system_local_id");
//		jsonObject.remove("system_local_name");
//		jsonObject.remove("BIMID");
		jsonObject.remove("system_category");
		
		
		JSONObject infos = new JSONObject();
		
//		if(!StringUtil.isNull(system_local_id)) {
//			setSystemInfo(infos, "SysLocalID", system_local_id);
//		}
//		if(!StringUtil.isNull(system_local_name)) {
//			setSystemInfo(infos, "SysLocalName", system_local_name);
//		}
//		if(!StringUtil.isNull(BIMID)) {
//			setSystemInfo(infos, "BIMID", BIMID);
//		}
		for(String key : jsonObject.keySet()) {
			Object value = jsonObject.get(key);
			setSystemInfo(infos, key, value);
		}
		JSONObject criteria = new JSONObject();
		criteria.put("building_id", build_id);
		criteria.put("equipment_category", system_category);
		criteria.put("infos", infos);
		String secret = projectCache.getProjectSecretById(project_id);
		String requestUrl = this.getDataPlatformPath(DataRequestPathUtil.dataPlat_equipment_system_create,project_id,secret);
		String queryResult = httpPostRequest(requestUrl, criteria.toJSONString());
		return queryResult;
		
		
		
		
		
		
	}

	private void setSystemInfo(JSONObject infos, String param, Object value) {
		String paramNew = ToolsUtil.systemInfoParamMap.get(param);
		if(StringUtil.isNull(paramNew)) {
			paramNew = param;
		}
		if(value == null) {
			return;
		}
		if(value instanceof String) {
			if(StringUtil.isNull(value.toString()))  {
				return;
			}
		}
		JSONArray hisValues = new JSONArray();
		JSONObject hisValue = new JSONObject();
		hisValue.put("value", value);
		hisValues.add(hisValue);
		infos.put(paramNew, hisValues);
	}

	@Override
	public String querySystemDynamicInfoForAdd(JSONObject jsonObject) throws Exception {
//		String project_id = jsonObject.getString("project_id");
		String system_category = jsonObject.getString("system_category");
		JSONArray contents = new JSONArray();
		//对象类型
		Map<String, JSONObject> contentsMap = objectInfoService.queryObjectDynamicInfo("system", system_category, null);
		
		contents.addAll(contentsMap.values());
		JSONObject result = new JSONObject();
		result.put(Result.RESULT, Result.SUCCESS);
		result.put(Result.CONTENT, contents);
		result.put(Result.COUNT, contents.size());
		return result.toJSONString();
	}

	@Override
	public String queryBuildSystemTree(JSONObject jsonObject) throws Exception {
		String project_id = jsonObject.getString("project_id");
		String domain = jsonObject.getString("domain");
		String system_category = jsonObject.getString("system_category");
		
		JSONObject criteria = new JSONObject();
		String requestUrl = DataRequestPathUtil.dataPlat_object_subset_query;
		if(StringUtil.isNull(domain)) {
			JSONArray type = new JSONArray();
			type.add("Sy");
			criteria.put("type", type);
		} else {
			criteria.put("category", domain);
			requestUrl = DataRequestPathUtil.dataPlat_system_query_by_domain;
		}
		jsonObject.clear();
		jsonObject.put("criteria", criteria);
		String secret = projectCache.getProjectSecretById(project_id);
		requestUrl = this.getDataPlatformPath(requestUrl,project_id,secret);
		String queryResult = this.httpPostRequest(requestUrl, jsonObject.toJSONString());
		JSONObject queryJson = JSONObject.parseObject(queryResult);
		if(Result.FAILURE.equals(queryJson.getString(Result.RESULT))) {
			return queryResult;
		}
		JSONArray queryContents = queryJson.getJSONArray(Result.CONTENT);
		Map<String, JSONArray> buildSystemsMap = new HashMap<>();
		if(queryContents != null && queryContents.size() > 0) {
			for (int i = 0; i < queryContents.size(); i++) {
				JSONObject queryContent = queryContents.getJSONObject(i);
				String system_id = queryContent.getString("id");
				String system_category_id = system_id.substring(17, 19);
				if(!StringUtil.isNull(system_category)) {
					if(!system_category_id.equals(system_category)) {
						continue;
					}
				}
				JSONObject infos = queryContent.getJSONObject("infos");
				String system_local_id = "";
				String system_local_name = "";
				if(infos != null) {
					system_local_id = infos.getString("SysLocalID");
					system_local_name = infos.getString("SysLocalName");
				}
				JSONObject system = new JSONObject();
				system.put("system_id", system_id);
				system.put("system_local_id", system_local_id);
				system.put("system_local_name", system_local_name);
				String build_id = StringUtil.transferId(system_id, CommonConst.tag_build);
				JSONArray systems = buildSystemsMap.get(build_id);
				if(systems == null) {
					systems = new JSONArray();
					buildSystemsMap.put(build_id, systems);
				}
				systems.add(system);
			}
		}
		//获取所有建筑
		requestUrl = getDataPlatformPath(DataRequestPathUtil.dataPlat_object_subset_query, project_id, secret);
		queryResult = httpPostRequest(requestUrl, "{\"criteria\":{\"type\":[\"Bd\"]}}");
        queryJson = JSONObject.parseObject(queryResult);
        if(Result.FAILURE.equals(queryJson.getString(Result.RESULT))) {
			return queryResult;
		}
        JSONArray contents = new JSONArray();
        queryContents = queryJson.getJSONArray(Result.CONTENT);
		if(queryContents != null && queryContents.size() > 0) {
			for (int i = 0; i < queryContents.size(); i++) {
				JSONObject queryContent = queryContents.getJSONObject(i);
				String build_id = queryContent.getString("id");
				JSONObject content = new JSONObject();
				content.put("build_id", build_id);
				content.put("build_name", queryContent.getJSONObject(CommonConst.info_name_datas).getString(CommonConst.info_name_local_name_build));
				JSONArray systems = buildSystemsMap.get(build_id);
				if(systems == null) {
					systems = new JSONArray();
				}
				content.put("system", systems);
				
	            contents.add(content);
			}
		}
		queryJson.put(Result.CONTENT, contents);
		queryJson.put(Result.COUNT, contents.size());
		queryResult = queryJson.toJSONString();
		return queryResult;
	}




	@Override
	public String updateSystemInfo(JSONObject jsonObject) throws Exception {
		String project_id = jsonObject.getString("project_id");
		String system_id = jsonObject.getString("system_id");
		String info_point_code = jsonObject.getString("info_point_code");
		Object info_point_value = jsonObject.get("info_point_value");
		String valid_time = jsonObject.getString("valid_time");
		String infoPointCode = ToolsUtil.systemInfoParamMap.get(info_point_code);
		String secret = projectCache.getProjectSecretById(project_id);
		return objectInfoService.updateObjectInfo(system_id, infoPointCode, info_point_value, valid_time, project_id, secret);
	}

}
