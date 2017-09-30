package com.sagacloud.saas.service.impl;

import java.util.HashSet;
import java.util.Map;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.sagacloud.saas.cache.ObjWoRemindConfigCache;
import com.sagacloud.saas.cache.ProjectCache;
import com.sagacloud.saas.common.DataRequestPathUtil;
import com.sagacloud.saas.common.JSONUtil;
import com.sagacloud.saas.common.StringUtil;
import com.sagacloud.saas.common.ToolsUtil;
import com.sagacloud.saas.dao.DBConst.Result;
import com.sagacloud.saas.service.BaseService;
import com.sagacloud.saas.service.FloorServiceI;
import com.sagacloud.saas.service.ObjectInfoServiceI;

/**
 * 功能描述：楼层管理
 * @author gezhanbin
 *
 */
@Service("floorService")
public class FloorServiceImpl extends BaseService implements FloorServiceI {

	@Autowired
	private ObjectInfoServiceI objectInfoService;
	
	@Autowired
	private ProjectCache projectCache;
	
	@Override
	public String addFloor(JSONObject jsonObject) throws Exception {
		String project_id = jsonObject.getString("project_id");
		String build_id = jsonObject.getString("build_id");
		jsonObject = ToolsUtil.transformParam(jsonObject, ToolsUtil.floorInfoParamMap);
		JSONObject criteria = new JSONObject();
		criteria.put("building_id", build_id);
		criteria.put("infos", jsonObject);
		String secret = projectCache.getProjectSecretById(project_id);
		String requestUrl = getDataPlatformPath(DataRequestPathUtil.dataPlat_object_floor_create, project_id, secret);
		return httpPostRequest(requestUrl, criteria.toJSONString());
	}

	@Override
	public String queryFloorWithOrder(JSONObject jsonObject) throws Exception {
		String project_id = jsonObject.getString("project_id");
		String build_id = jsonObject.getString("build_id");
		JSONObject criteria = new JSONObject();
		criteria.put("id", build_id);
		JSONArray types = new JSONArray();
		types.add("Fl");
		criteria.put("type", types);
		jsonObject.clear();
		jsonObject.put("criteria", criteria);
		String secret = projectCache.getProjectSecretById(project_id);
		String requestUrl = getDataPlatformPath(DataRequestPathUtil.dataPlat_object_subset_query, project_id, secret);
		String queryResult = httpPostRequest(requestUrl, jsonObject.toJSONString());
		JSONObject queryJson = JSONObject.parseObject(queryResult);
		if(Result.SUCCESS.equals(queryJson.getString(Result.RESULT))) {
			JSONArray queryContents = queryJson.getJSONArray(Result.CONTENT);
			JSONArray contents = new JSONArray();
			if(queryContents != null && queryContents.size() > 0) {
				for (int i = 0; i < queryContents.size(); i++) {
					JSONObject queryContent = queryContents.getJSONObject(i);
					String floor_id = queryContent.getString("id");
					JSONObject infos = queryContent.getJSONObject("infos");
					String floor_local_id = "";
					String floor_local_name = "";
					String floor_sequence_id = "";
					String floor_type = "";
					String area = "";
					String net_height = "";
					String floor_func_type = "";
					if(infos != null) {
						floor_local_id = infos.getString("FloorLocalID");
						floor_local_name = infos.getString("FloorLocalName");
						floor_sequence_id = infos.getString("FloorSequenceID");
						floor_type = infos.getString("FloorType");
						area = infos.getString("Area");
						net_height = infos.getString("NetHeight");
						floor_func_type = infos.getString("FloorFuncType");
					}
					JSONObject content = new JSONObject();
					content.put("floor_id", floor_id);
					content.put("floor_local_id", floor_local_id);
					content.put("floor_local_name", floor_local_name);
					content.put("floor_sequence_id", floor_sequence_id);
					content.put("floor_type", floor_type);
					content.put("area", area);
					content.put("net_height", net_height);
					content.put("floor_func_type", floor_func_type);
					contents.add(content);
				}
			}
			contents = JSONUtil.sortByIntegerField(contents, "floor_sequence_id", -1);
			queryJson.put(Result.CONTENT, contents);
			queryJson.put(Result.COUNT, contents.size());
			queryResult = queryJson.toJSONString();
		}
		return queryResult;
	}

	@Override
	public String queryFloorById(JSONObject jsonObject) throws Exception {
		String project_id = jsonObject.getString("project_id");
		String floor_id = jsonObject.getString("floor_id");
		String secret = projectCache.getProjectSecretById(project_id);
		String requestUrl = getDataPlatformPath(
				DataRequestPathUtil.dataPlat_object_batch_query,
				project_id,
				secret);
		jsonObject = new JSONObject();
		JSONArray criterias = new JSONArray();
		JSONObject objQuery = new JSONObject();
		objQuery.put("id", floor_id);
		criterias.add(objQuery);
		jsonObject.put("criterias", criterias);
		String queryResult = this.httpPostRequest(requestUrl, jsonObject.toJSONString());
		if(queryResult.contains(Result.SUCCESS) && queryResult.contains(Result.CONTENT)) {
			JSONObject result = new JSONObject();
			JSONObject item = new JSONObject();
			result.put(Result.RESULT, Result.SUCCESS);
			JSONObject queryJson = JSONObject.parseObject(queryResult);
			JSONArray queryContents = queryJson.getJSONArray(Result.CONTENT);
			if(queryContents != null && queryContents.size() > 0) {
				JSONObject queryItem = queryContents.getJSONObject(0);
				queryItem = queryItem.getJSONObject("infos");
				if(queryItem != null) {
					item.put("floor_id", floor_id);
					for(String oldKey : ToolsUtil.floorInfoParamMap.keySet()) {
						String newKey = ToolsUtil.floorInfoParamMap.get(oldKey);
						String value = queryItem.getString(newKey);
						item.put(oldKey, value);
					}
				}
			}
			result.put("Item", item);
			queryResult = result.toJSONString();
		}
		return queryResult;
	}

	@Override
	public String updateFloorOrder(JSONObject jsonObject) throws Exception {
		String project_id = jsonObject.getString("project_id");
		JSONArray floors = jsonObject.getJSONArray("floors");
		if(floors == null || floors.size()  == 0) {
			return ToolsUtil.return_error_json;
		}
		jsonObject.clear();
		JSONArray criterias = new JSONArray();
		for (int i = 0; i < floors.size(); i++) {
			JSONObject floor = floors.getJSONObject(i);
			String floor_id = floor.getString("floor_id");
			String floor_sequence_id = floor.getString("floor_sequence_id");

			String infoPointCode = ToolsUtil.floorInfoParamMap.get("floor_sequence_id");
			JSONObject criteria = new JSONObject();
			JSONObject infos = new JSONObject();
			JSONArray hisValues = new JSONArray();
			JSONObject hisValue = new JSONObject();
			hisValue.put("value", floor_sequence_id);
			hisValues.add(hisValue);
			infos.put(infoPointCode, hisValues);
			criteria.put("id", floor_id);
			criteria.put("infos", infos);
			criterias.add(criteria);
		}
		jsonObject.put("criterias", criterias);
		String requestUrl = getDataPlatformPath(DataRequestPathUtil.dataPlat_object_batch_update, project_id, projectCache.getProjectSecretById(project_id));
		return httpPostRequest(requestUrl, jsonObject.toJSONString());
	}

	@Override
	public String updateFloorInfo(JSONObject jsonObject) throws Exception {
		String project_id = jsonObject.getString("project_id");
		String floor_id = jsonObject.getString("floor_id");
		String info_point_code = jsonObject.getString("info_point_code");
		Object info_point_value = jsonObject.get("info_point_value");
		String valid_time = jsonObject.getString("valid_time");
		
		String infoPointCode = ToolsUtil.floorInfoParamMap.get(info_point_code);
		String secret = projectCache.getProjectSecretById(project_id);
		return objectInfoService.updateObjectInfo(floor_id, infoPointCode, info_point_value, valid_time, project_id, secret);
	}


	@Override
	public String verifyFloorName(JSONObject jsonObject) throws Exception {
		String project_id = jsonObject.getString("project_id");
		String build_id = jsonObject.getString("build_id");
		String floor_id = jsonObject.getString("floor_id");
		String floor_local_name = jsonObject.getString("floor_local_name");
		String secret = projectCache.getProjectSecretById(project_id);
		String objectParam = ToolsUtil.floorInfoParamMap.get("floor_local_name");
		return objectInfoService.verifyObjectInfo(build_id, floor_id, objectParam, floor_local_name, "Fl", project_id, secret);
	}
	
	@Override
	public String verifyFloorLocalId(JSONObject jsonObject) throws Exception {
		String project_id = jsonObject.getString("project_id");
		String floor_id = jsonObject.getString("floor_id");
		String floor_local_id = jsonObject.getString("floor_local_id");
		String secret = projectCache.getProjectSecretById(project_id);
		String objectParam = ToolsUtil.floorInfoParamMap.get("floor_local_id");
		return objectInfoService.verifyObjectInfo(project_id, floor_id, objectParam, floor_local_id, "Fl", project_id, secret);
	}
	
	@Override
	public String verifyFloorBimId(JSONObject jsonObject) throws Exception {
		String project_id = jsonObject.getString("project_id");
		String floor_id = jsonObject.getString("floor_id");
		String bimid = jsonObject.getString("BIMID");
		String secret = projectCache.getProjectSecretById(project_id);
		String objectParam = ToolsUtil.floorInfoParamMap.get("BIMID");
		return objectInfoService.verifyObjectInfo(project_id, floor_id, objectParam, bimid, "Fl", project_id, secret);
	}

	@Override
	public String queryFloorInfoPointHis(JSONObject jsonObject) throws Exception {
		String project_id = jsonObject.getString("project_id");
		String floor_id = jsonObject.getString("floor_id");
		String info_point_code = jsonObject.getString("info_point_code");
		String infoPointCode = ToolsUtil.floorInfoParamMap.get(info_point_code);
		String secret = projectCache.getProjectSecretById(project_id);
		return objectInfoService.queryObjectInfoHis(floor_id, infoPointCode, project_id, secret);
	}

	@Override
	public String queryFloorList(JSONObject jsonObject) throws Exception {
		String project_id = jsonObject.getString("project_id");
		String build_id = jsonObject.getString("build_id");
		JSONObject criteria = new JSONObject();
		criteria.put("id", build_id);
		JSONArray types = new JSONArray();
		types.add("Fl");
		criteria.put("type", types);
		jsonObject.clear();
		jsonObject.put("criteria", criteria);
		String secret = projectCache.getProjectSecretById(project_id);
		String requestUrl = getDataPlatformPath(DataRequestPathUtil.dataPlat_object_subset_query, project_id, secret);
		String queryResult = httpPostRequest(requestUrl, jsonObject.toJSONString());
		JSONObject queryJson = JSONObject.parseObject(queryResult);
		if(Result.SUCCESS.equals(queryJson.getString(Result.RESULT))) {
			JSONArray queryContents = queryJson.getJSONArray(Result.CONTENT);
			JSONArray contents = new JSONArray();
			if(queryContents != null && queryContents.size() > 0) {
				for (int i = 0; i < queryContents.size(); i++) {
					JSONObject content = new JSONObject();
					JSONObject queryContent = queryContents.getJSONObject(i);
					String floor_id = queryContent.getString("id");
					JSONObject infos = queryContent.getJSONObject("infos");
					String floor_local_name = "";
					if(infos != null) {
						floor_local_name = infos.getString("FloorLocalName");
					}
					content.put("floor_id", floor_id);
					content.put("floor_local_name", floor_local_name);
					contents.add(content);
				}
			}
			queryJson.put(Result.CONTENT, contents);
			queryJson.put(Result.COUNT, contents.size());
			queryResult = queryJson.toJSONString();
		}
		return queryResult;
	}
}
