package com.sagacloud.saas.service.impl;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.sagacloud.saas.cache.ObjWoRelCache;
import com.sagacloud.saas.cache.ObjWoRemindConfigCache;
import com.sagacloud.saas.cache.ProjectCache;
import com.sagacloud.saas.common.CommonConst;
import com.sagacloud.saas.common.DataRequestPathUtil;
import com.sagacloud.saas.common.DateUtil;
import com.sagacloud.saas.common.JSONUtil;
import com.sagacloud.saas.common.StringUtil;
import com.sagacloud.saas.common.ToolsUtil;
import com.sagacloud.saas.dao.DBCommonMethods;
import com.sagacloud.saas.dao.DBConst;
import com.sagacloud.saas.dao.DBConst.Result;
import com.sagacloud.saas.service.BaseService;
import com.sagacloud.saas.service.DictionaryServiceI;
import com.sagacloud.saas.service.GeneralDictServiceI;
import com.sagacloud.saas.service.ObjectInfoServiceI;
import com.sagacloud.saas.service.SpaceServiceI;
import com.sagacloud.saas.service.WorkOrderServiceI;

/**
 * 功能描述：空间管理
 * @author gezhanbin
 *
 */
@Service("spaceService")
public class SpaceServiceImpl extends BaseService implements SpaceServiceI {
	@Autowired
	private ProjectCache projectCache;
	@Autowired
	private GeneralDictServiceI generalDictService;
	@Autowired
	private DictionaryServiceI dictionaryService;
	@Autowired
	private ObjectInfoServiceI objectInfoService;
	@Autowired
	private WorkOrderServiceI workOrderService;
	
	@Override
	public String querySpaceWithGroup(JSONObject jsonObject) throws Exception {
		String project_id = jsonObject.getString("project_id");
		String build_id = jsonObject.getString("build_id");
		JSONObject criteria = new JSONObject();
		criteria.put("id", build_id);
		JSONArray types = new JSONArray();
		types.add("Fl");
		types.add("Sp");
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
				JSONArray remind_order_types = ObjWoRemindConfigCache.getRemindOrderTypesByProjectIdObjType(project_id + "-" + "space");
				//工单id
				Set<String> workOrderIds = new HashSet<>();
				//空间功能类型
				Map<String, String> spaceMap = dictionaryService.queryAllSpaceCode();
				//楼层与空间的关系
				Map<String, JSONArray> floorSpaceMap = new HashMap<>();
				for (int i = 0; i < queryContents.size(); i++) {
					JSONObject queryContent = queryContents.getJSONObject(i);
					String id = queryContent.getString("id");
					String floor_id = "";
					String space_id = "";
					boolean floorBoolean = true;
					if(id.startsWith("Sp")) {
						floorBoolean = false;
					}
					JSONObject infos = queryContent.getJSONObject("infos");
					String room_local_id = "";
					String room_local_name = "";
					String room_func_type_name = "";
					String floor_local_name = "";
					String floor_sequence_id = "";
					JSONObject space = new JSONObject();
					JSONObject floor = new JSONObject();
					floor.put("floor_id", id);
					space.put("space_id", id);
					if(infos != null) {
						
						if(floorBoolean) {
							floor_id = id;
							floor_local_name = infos.getString("FloorLocalName");
							floor_sequence_id = infos.getString("FloorSequenceID");
							floor.put("floor_local_name", floor_local_name);
							floor.put("floor_sequence_id", floor_sequence_id);
						} else {
							space_id = id;
							floor_id = StringUtil.transferId(space_id, CommonConst.tag_floor);
							room_local_id = infos.getString("RoomLocalID");
							room_local_name = infos.getString("RoomLocalName");
							String room_func_type = infos.getString("RoomFuncType");
							if(!StringUtil.isNull(room_func_type)) {
								room_func_type_name = spaceMap.get(room_func_type);
							}
							JSONArray work_orders = new JSONArray();
							if(remind_order_types != null) {
								for (int j = 0; j < remind_order_types.size(); j++) {
									String order_type = remind_order_types.getString(j);
									JSONObject work_order = new JSONObject();
									work_order.put("order_type", order_type);
									JSONArray orders = new JSONArray();
									JSONArray order_ids = ObjWoRelCache.getOrderIdsByObjIdOrderType(space_id + "-" + order_type);
									if(order_ids != null) {
										for (int k = 0; k < order_ids.size(); k++) {
											String order_id = order_ids.getString(k);
											workOrderIds.add(order_id);
											JSONObject order = new JSONObject();
											order.put("order_id", order_id);
											orders.add(order);
										}
										work_order.put("orders", orders);
										work_orders.add(work_order);
									}
								}
							}
							
							
							space.put("room_local_id", room_local_id);
							space.put("room_local_name", room_local_name);
							space.put("room_func_type_name", room_func_type_name);
							space.put("work_orders", work_orders);
						}
					}
					if(floorBoolean) {
						contents.add(floor);
					} else {
						
						JSONArray spaces = floorSpaceMap.get(floor_id);
						if(spaces == null) {
							spaces = new JSONArray();
							floorSpaceMap.put(floor_id, spaces);
						}
						spaces.add(space);	
					}
				}
				//开始组装楼层与空间的关系
				
				Map<String, JSONObject> workMap = null;
				if(workOrderIds.size() > 0) {
					workMap = workOrderService.queryWorkOrderByIds(workOrderIds);
				}
				for (int i = 0; i < contents.size(); i++) {
					JSONObject content = contents.getJSONObject(i);
					String floor_id = content.getString("floor_id");
					JSONArray spaces = floorSpaceMap.get(floor_id);
					if(spaces != null) {
						if(workMap != null && workMap.size() > 0) {
							setWorkOrderInfo(spaces, workMap);
						}
						//空间编码升序
						spaces = JSONUtil.sortByStringField(spaces, "room_local_id", 1);
						content.put("spaces", spaces);
					}
				}
				//楼层序号倒序
				contents = JSONUtil.sortByIntegerField(contents, "floor_sequence_id", -1);
				//判断本建筑下是否有未挂在楼层下的空间
				String firstFloorId = build_id + "000";
				JSONObject content = new JSONObject();
				content.put("floor_id", firstFloorId);
				content.put("floor_local_name", "");
				JSONArray spaces = floorSpaceMap.get(firstFloorId);
				if(spaces != null) {
					if(workMap != null && workMap.size() > 0) {
						setWorkOrderInfo(spaces, workMap);
					}
					//空间编码升序
					spaces = JSONUtil.sortByStringField(spaces, "room_local_id", 1);
					content.put("spaces", spaces);
				}
				contents.add(0, content);
			}
			queryJson.put(Result.CONTENT, contents);
			queryJson.put(Result.COUNT, contents.size());
			queryResult = queryJson.toJSONString();
		}
		
		
		return queryResult;
	}

	@Override
	public String querySpaceForFloor(JSONObject jsonObject) throws Exception {
		String project_id = jsonObject.getString("project_id");
		String floor_id = jsonObject.getString("floor_id");
		JSONObject criteria = new JSONObject();
		criteria.put("id", floor_id);
		JSONArray types = new JSONArray();
		types.add("Sp");
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
				JSONArray remind_order_types = ObjWoRemindConfigCache.getRemindOrderTypesByProjectIdObjType(project_id + "-" + "space");
				//工单id
				Set<String> workOrderIds = new HashSet<>();
				//空间功能类型
				Map<String, String> spaceMap = dictionaryService.queryAllSpaceCode();
				for (int i = 0; i < queryContents.size(); i++) {
					JSONObject content = new JSONObject();
					JSONObject queryContent = queryContents.getJSONObject(i);
					String space_id = queryContent.getString("id");
					JSONObject infos = queryContent.getJSONObject("infos");
					String room_local_id = "";
					String room_local_name = "";
					String room_func_type_name = "";
					if(infos != null) {
						room_local_id = infos.getString("RoomLocalID");
						room_local_name = infos.getString("RoomLocalName");
						String room_func_type = infos.getString("RoomFuncType");
						if(!StringUtil.isNull(room_func_type)) {
							room_func_type_name = spaceMap.get(room_func_type);
						}
					}
					JSONArray work_orders = new JSONArray();
					if(remind_order_types != null) {
						for (int j = 0; j < remind_order_types.size(); j++) {
							String order_type = remind_order_types.getString(j);
							JSONObject work_order = new JSONObject();
							work_order.put("order_type", order_type);
							JSONArray orders = new JSONArray();
							JSONArray order_ids = ObjWoRelCache.getOrderIdsByObjIdOrderType(space_id + "-" + order_type);
							if(order_ids != null) {
								for (int k = 0; k < order_ids.size(); k++) {
									String order_id = order_ids.getString(k);
									workOrderIds.add(order_id);
									JSONObject order = new JSONObject();
									order.put("order_id", order_id);
									orders.add(order);
								}
								work_order.put("orders", orders);
								work_orders.add(work_order);
							}
						}
					}
					content.put("space_id", space_id);
					content.put("room_local_id", room_local_id);
					content.put("room_local_name", room_local_name);
					content.put("room_func_type_name", room_func_type_name);
					content.put("work_orders", work_orders);
					contents.add(content);
				}
				if(workOrderIds.size() > 0) {
					Map<String, JSONObject> workMap = workOrderService.queryWorkOrderByIds(workOrderIds);
					if(workMap.size() > 0) {
						setWorkOrderInfo(contents, workMap);
					}
				}
				
			}
			queryJson.put(Result.CONTENT, contents);
			queryJson.put(Result.COUNT, contents.size());
			queryResult = queryJson.toJSONString();
		}
		return queryResult;
	}

	

	@Override
	public String queryDestroyedSpace(JSONObject jsonObject) throws Exception {
		String project_id = jsonObject.getString("project_id");
		String build_id = jsonObject.getString("build_id");
		JSONObject criteria = new JSONObject();
		criteria.put("id", build_id);
		JSONArray types = new JSONArray();
		types.add("Sp");
		criteria.put("type", types);
		jsonObject.clear();
		jsonObject.put("criteria", criteria);
		jsonObject.put("valid", false);
		String secret = projectCache.getProjectSecretById(project_id);
		String requestUrl = getDataPlatformPath(DataRequestPathUtil.dataPlat_object_subset_query, project_id, secret);
		String queryResult = httpPostRequest(requestUrl, jsonObject.toJSONString());
		JSONObject queryJson = JSONObject.parseObject(queryResult);
		if(Result.FAILURE.equals(queryJson.getString(Result.RESULT))) {
			return queryResult;
		}
		JSONArray queryContents = queryJson.getJSONArray(Result.CONTENT);
		JSONArray contents = new JSONArray();
		if(queryContents == null || queryContents.size() == 0) {
			return queryResult;
		}
		//空间功能类型
		Map<String, String> spaceMap = dictionaryService.queryAllSpaceCode();
		//楼层id
		Set<String> floor_ids = new HashSet<>();
		//楼层与空间的关系
		Map<String, JSONArray> floorSpaceMap = new HashMap<>();
		JSONArray criterias = new JSONArray();
		for (int i = 0; i < queryContents.size(); i++) {
			JSONObject queryContent = queryContents.getJSONObject(i);
			String space_id = queryContent.getString("id");
			String floor_id = StringUtil.transferId(space_id, CommonConst.tag_floor);
			if(!floor_ids.contains(floor_id)) {
				floor_ids.add(floor_id);
				criteria = new JSONObject();
				criteria.put("id", floor_id);
				criterias.add(criteria);
			}
			String room_local_id = "";
			String room_local_name = "";
			String room_func_type_name = "";
			JSONObject space = new JSONObject();
			space.put("space_id", space_id);
			JSONObject infos = queryContent.getJSONObject("infos");
			if(infos != null) {
					room_local_id = infos.getString("RoomLocalID");
					room_local_name = infos.getString("RoomLocalName");
					String room_func_type = infos.getString("RoomFuncType");
					if(!StringUtil.isNull(room_func_type)) {
						room_func_type_name = spaceMap.get(room_func_type);
					}
					
					space.put("room_local_id", room_local_id);
					space.put("room_local_name", room_local_name);
					space.put("room_func_type_name", room_func_type_name);
			}
			JSONArray spaces = floorSpaceMap.get(floor_id);
			if(spaces == null) {
				spaces = new JSONArray();
				floorSpaceMap.put(floor_id, spaces);
			}
			spaces.add(space);	
		}
		
		//获取设备信息
		jsonObject.clear();
		jsonObject.put("criterias", criterias);
		requestUrl = getDataPlatformPath(DataRequestPathUtil.dataPlat_object_subset_query, project_id, secret);
		queryResult = httpPostRequest(requestUrl, jsonObject.toJSONString());
		queryJson = JSONObject.parseObject(queryResult);
		if(Result.FAILURE.equals(queryJson.getString(Result.RESULT))) {
			return queryResult;
		}
		queryContents = queryJson.getJSONArray(Result.CONTENT);
		if(queryContents == null || queryContents.size() == 0) {
			return queryResult;
		}
		//开始组装楼层与空间的关系
		for (int i = 0; i < queryContents.size(); i++) {
			JSONObject queryContent = queryContents.getJSONObject(i);
			String floor_id = queryContent.getString("id");
			String floor_local_name = "";
			String floor_sequence_id = "";
			JSONObject infos = queryContent.getJSONObject("infos");
			JSONObject floor = new JSONObject();
			floor.put("floor_id", floor_id);
			if(infos != null) {
				floor_local_name = infos.getString("FloorLocalName");
				floor_sequence_id = infos.getString("FloorSequenceID");
				floor.put("floor_local_name", floor_local_name);
				floor.put("floor_sequence_id", floor_sequence_id);
			}
			JSONArray spaces = floorSpaceMap.get(floor_id);
			if(spaces != null) {
				//空间编码升序
				spaces = JSONUtil.sortByStringField(spaces, "room_local_id", 1);
				floor.put("spaces", spaces);
			}
			contents.add(floor);
		}
		//楼层序号倒序
		contents = JSONUtil.sortByIntegerField(contents, "floor_sequence_id", -1);
		//判断本建筑下是否有未挂在楼层下的空间
		String firstFloorId = build_id + "000";
		JSONObject content = new JSONObject();
		content.put("floor_id", firstFloorId);
		content.put("floor_local_name", "");
		JSONArray spaces = floorSpaceMap.get(firstFloorId);
		if(spaces != null) {
			//空间编码升序
			spaces = JSONUtil.sortByStringField(spaces, "room_local_id", 1);
			content.put("spaces", spaces);
		}
		contents.add(0, content);
		queryJson.put(Result.CONTENT, contents);
		queryJson.put(Result.COUNT, contents.size());
		queryResult = queryJson.toJSONString();
		
		
		return queryResult;
	}
	
	private void setWorkOrderInfo(JSONArray contents, Map<String,JSONObject> workMap) {
		for (int i = 0; i < contents.size(); i++) {
			JSONObject content = contents.getJSONObject(i);
			JSONArray work_orders = content.getJSONArray("work_orders");
			if(work_orders != null && work_orders.size() > 0) {
				for (int j = 0; j < work_orders.size(); j++) {
					JSONObject work_order = work_orders.getJSONObject(j);
					JSONArray orders = work_order.getJSONArray("orders");
					if(orders != null && orders.size() > 0) {
						for (int k = 0; k < orders.size(); k++) {
							JSONObject order = orders.getJSONObject(k);
							String order_id = order.getString("order_id");
							JSONObject workOrderBody = workMap.get(order_id);
							String order_state_name = "";
							String summary = "";
							if(workOrderBody != null) {
								order_state_name = workOrderBody.getString("order_state_name");
								summary = workOrderBody.getString("summary");
							}
							order.put("order_state_name", order_state_name);
							order.put("summary", summary);
						}
					}
				}
			}
		}
	}
	
	
	
	
	
	
	@Override
	public String saveSpaceRemindConfig(JSONObject jsonObject) throws Exception {
		String project_id = jsonObject.getString("project_id");
		String person_id = jsonObject.getString("person_id");
		JSONArray remind_order_types = jsonObject.getJSONArray("remind_order_types");
		if(remind_order_types == null || remind_order_types.size() == 0) {
			return ToolsUtil.return_error_json;
		}
		jsonObject.put("obj_type", "space");
		jsonObject = JSONUtil.getCriteriaWithMajors(jsonObject, "project_id", "person_id","obj_type"); 
		String queryResult = DBCommonMethods.queryRecordByCriteria(DBConst.TABLE_OBJ_WO_REMIND_CONFIG, jsonObject.toJSONString());
		JSONObject queryJson = JSONObject.parseObject(queryResult);
		if(Result.SUCCESS.equals(queryJson.getString(Result.RESULT))) {
			Integer count = queryJson.getInteger(Result.COUNT);
			if(count > 0) {
				//修改
				JSONArray queryContents = queryJson.getJSONArray(Result.CONTENT);
				if(queryContents != null && queryContents.size() > 0) {
					queryJson = queryContents.getJSONObject(0);
					String remind_config_id = queryJson.getString("remind_config_id");
					jsonObject.clear();
					jsonObject.put("remind_config_id", remind_config_id);
					jsonObject.put(DBConst.TABLE_FIELD_UPDATE_TIME, DateUtil.getNowTimeStr());
					jsonObject.put("remind_order_types", remind_order_types.toJSONString());
					jsonObject = JSONUtil.getUpdateParamJson(jsonObject, "remind_config_id");
					queryResult = DBCommonMethods.updateRecord(DBConst.TABLE_OBJ_WO_REMIND_CONFIG, jsonObject.toJSONString());
				}
			} else {
				//添加
				jsonObject.clear();
				jsonObject.put("remind_config_id", "" + DateUtil.getUtcTimeNow());
				jsonObject.put("project_id", project_id);
				jsonObject.put("person_id", person_id);
				jsonObject.put("obj_type", "space");
				jsonObject.put(DBConst.TABLE_FIELD_UPDATE_TIME, DateUtil.getNowTimeStr());
				jsonObject.put("remind_order_types", remind_order_types.toJSONString());
				jsonObject = JSONUtil.getAddParamJson(jsonObject);
				queryResult = DBCommonMethods.insertRecord(DBConst.TABLE_OBJ_WO_REMIND_CONFIG, jsonObject.toJSONString());
			}
		}
		return queryResult;
	}

	@Override
	public String querySpaceRemindConfig(JSONObject jsonObject) throws Exception {
		String project_id = jsonObject.getString("project_id");
//		String person_id = jsonObject.getString("person_id");
		jsonObject.put("obj_type", "space");
		jsonObject.put(DBConst.TABLE_FIELD_VALID, true);
		jsonObject = JSONUtil.getCriteriaWithMajors(jsonObject, DBConst.TABLE_FIELD_VALID,"project_id","person_id","obj_type");
		String queryResult = DBCommonMethods.queryRecordByCriteria(DBConst.TABLE_OBJ_WO_REMIND_CONFIG, jsonObject.toJSONString());
		JSONObject queryJson = JSONObject.parseObject(queryResult);
		Set<String> typeSet = new HashSet<>();
		if(Result.SUCCESS.equals(queryJson.getString(Result.RESULT))) {
			JSONArray queryContents = queryJson.getJSONArray(Result.CONTENT);
			if(queryContents != null && queryContents.size() > 0) {
				queryJson = queryContents.getJSONObject(0);
				String remind_order_type_str = queryJson.getString("remind_order_types");
				if(!StringUtil.isNull(remind_order_type_str)) {
					JSONArray remind_order_types = JSONArray.parseArray(remind_order_type_str);
					for (int i = 0; i < remind_order_types.size(); i++) {
						String remind_order_type = remind_order_types.getString(i);
						typeSet.add(remind_order_type);
					}
				}
			}
			JSONObject generalDict = new JSONObject();
			generalDict.put("project_id", project_id);
			generalDict.put("dict_type", "work_order_type");
			queryResult = generalDictService.queryGeneralDictByKey(generalDict);
			queryJson = JSONObject.parseObject(queryResult);
			if(Result.SUCCESS.equals(queryJson.getString(Result.RESULT))) {
				queryContents = queryJson.getJSONArray(Result.CONTENT);
				if(queryContents != null && queryContents.size() > 0) {
					for (int i = 0; i < queryContents.size(); i++) {
						JSONObject queryContent = queryContents.getJSONObject(i);
						String code = queryContent.getString("code");
						boolean is_remind = typeSet.contains(code);
						queryContent.put("is_remind", is_remind);
						queryContent.remove("description");
					}
				}
				queryResult = queryJson.toJSONString();
			}
		}  
		return queryResult;
	}

	@Override
	public String verifySpaceName(JSONObject jsonObject) throws Exception {
		String project_id = jsonObject.getString("project_id");
		String build_id = jsonObject.getString("build_id");
		String space_id = jsonObject.getString("space_id");
		String room_local_name = jsonObject.getString("room_local_name");
		String secret = projectCache.getProjectSecretById(project_id);
		String objectParam = ToolsUtil.spaceInfoParamMap.get("room_local_name");
		return objectInfoService.verifyObjectInfo(build_id, space_id, objectParam, room_local_name, "Sp", project_id, secret);
	}
	
	@Override
	public String verifySpaceLocalId(JSONObject jsonObject) throws Exception {
		String project_id = jsonObject.getString("project_id");
		String space_id = jsonObject.getString("space_id");
		String room_local_id = jsonObject.getString("room_local_id");
		String secret = projectCache.getProjectSecretById(project_id);
		String objectParam = ToolsUtil.spaceInfoParamMap.get("room_local_id");
		return objectInfoService.verifyObjectInfo(project_id, space_id, objectParam, room_local_id, "Sp", project_id, secret);
	}
	
	@Override
	public String verifySpaceBimId(JSONObject jsonObject) throws Exception {
		String project_id = jsonObject.getString("project_id");
		String space_id = jsonObject.getString("space_id");
		String bimid = jsonObject.getString("BIMID");
		String secret = projectCache.getProjectSecretById(project_id);
		String objectParam = ToolsUtil.spaceInfoParamMap.get("BIMID");
		return objectInfoService.verifyObjectInfo(project_id, space_id, objectParam, bimid, "Sp", project_id, secret);
	}

	@Override
	public String addSpace(JSONObject jsonObject) throws Exception {
		String project_id = jsonObject.getString("project_id");
		String floor_id = jsonObject.getString("floor_id");
		jsonObject = ToolsUtil.transformParam(jsonObject, ToolsUtil.spaceInfoParamMap);
		JSONObject criteria = new JSONObject();
		criteria.put("floor_id", floor_id);
		criteria.put("infos", jsonObject);
		String secret = projectCache.getProjectSecretById(project_id);
		String requestUrl = getDataPlatformPath(DataRequestPathUtil.dataPlat_object_space_create, project_id, secret);
		String queryResult = httpPostRequest(requestUrl, criteria.toJSONString());
		JSONObject queryJson = JSONObject.parseObject(queryResult);
		if(Result.FAILURE.equals(queryJson.getString(Result.RESULT))) {
			return queryResult;
		}
		String space_id = queryJson.getString("id");
		//更新附加表obj_append
		jsonObject.clear();
		jsonObject.put("obj_id", space_id);
		jsonObject.put("project_id", project_id);
		jsonObject.put("obj_type", "space");
		jsonObject.put("download_flag", "0");
		jsonObject.put(DBConst.TABLE_FIELD_UPDATE_TIME, DateUtil.getNowTimeStr());
		jsonObject = JSONUtil.getAddParamJson(jsonObject);
		DBCommonMethods.insertRecord(DBConst.TABLE_OBJ_APPEND, jsonObject.toJSONString());
		//处理二维码
		String qrcodeKey = UUID.randomUUID().toString().replaceAll("-", "");
		queryResult = createQRCode("jf", space_id, qrcodeKey);
		queryJson = JSONObject.parseObject(queryResult);
		if(Result.FAILURE.equals(queryJson.getString(Result.RESULT))) {
			String msg = queryJson.getString(Result.RESULTMSG);
			queryJson.put(Result.RESULTMSG, "空间创建成功,但是" + msg);
			queryResult = queryJson.toJSONString();
			return queryResult;
		}
		//更新空间二维码信息
		queryResult =  objectInfoService.updateObjectInfo(space_id, "RoomQRCode", qrcodeKey, null, project_id, secret);
		queryJson = JSONObject.parseObject(queryResult);
		if(Result.FAILURE.equals(queryJson.getString(Result.RESULT))) {
			queryJson.put(Result.RESULTMSG, "空间创建成功,但是空间二维码赋值失败");
			queryResult = queryJson.toJSONString();
		}
		
		
		return queryResult;
	}

	@Override
	public String querySpaceById(JSONObject jsonObject) throws Exception {
		String project_id = jsonObject.getString("project_id");
		String space_id = jsonObject.getString("space_id");
		String secret = projectCache.getProjectSecretById(project_id);
		String requestUrl = getDataPlatformPath(
				DataRequestPathUtil.dataPlat_object_batch_query,
				project_id,
				secret);
		jsonObject = new JSONObject();
		JSONArray criterias = new JSONArray();
		JSONObject objQuery = new JSONObject();
		objQuery.put("id", space_id);
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
					item.put("space_id", space_id);
					for(String oldKey : ToolsUtil.spaceInfoParamMap.keySet()) {
						String newKey = ToolsUtil.spaceInfoParamMap.get(oldKey);
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
	public String destroySpace(JSONObject jsonObject) throws Exception {
		String project_id = jsonObject.getString("project_id");
		String space_id = jsonObject.getString("space_id");
		String secret = projectCache.getProjectSecretById(project_id);
		String requestUrl = getDataPlatformPath(
				DataRequestPathUtil.dataPlat_object_space_delete,
				project_id,
				secret);
		jsonObject = new JSONObject();
		JSONObject criteria = new JSONObject();
		criteria.put("id", space_id);
		jsonObject.put("criteria", criteria);
		return this.httpPostRequest(requestUrl, jsonObject.toJSONString());
	}

	@Override
	public String updateSpaceInfo(JSONObject jsonObject) throws Exception {
		String project_id = jsonObject.getString("project_id");
		String space_id = jsonObject.getString("space_id");
		String info_point_code = jsonObject.getString("info_point_code");
		Object info_point_value = jsonObject.get("info_point_value");
		String valid_time = jsonObject.getString("valid_time");
		String infoPointCode = ToolsUtil.spaceInfoParamMap.get(info_point_code);
		String secret = projectCache.getProjectSecretById(project_id);
		return objectInfoService.updateObjectInfo(space_id, infoPointCode, info_point_value, valid_time, project_id, secret);
	}

	@Override
	public String querySpaceInfoPointHis(JSONObject jsonObject) throws Exception {
		String project_id = jsonObject.getString("project_id");
		String space_id = jsonObject.getString("space_id");
		String info_point_code = jsonObject.getString("info_point_code");
		String infoPointCode = ToolsUtil.spaceInfoParamMap.get(info_point_code);
		String secret = projectCache.getProjectSecretById(project_id);
		return objectInfoService.queryObjectInfoHis(space_id, infoPointCode, project_id, secret);
	}

	@Override
	public String verifyDestroySpace(JSONObject jsonObject) throws Exception {
		JSONObject result = new JSONObject();
		result.put(Result.RESULT, Result.SUCCESS);
		JSONObject item = new JSONObject();
		result.put("Item", item);
		String project_id = jsonObject.getString("project_id");
		String space_id = jsonObject.getString("space_id");
		boolean can_destroy = true;
		String secret = projectCache.getProjectSecretById(project_id);
		//查询图实例id
		String graph_id = "";
		JSONObject graphInstance = queryGraphInstance(project_id, secret, "EquipinSpace", null, DateUtil.getNowTimeStr());
		if(graphInstance != null) {
			graph_id = graphInstance.getString("graph_id");
		}

		if(!StringUtil.isNull(graph_id)) {
			JSONObject relation = queryRelation(project_id, secret, null, space_id, graph_id, "1");
			if(relation != null) {
				can_destroy = false;
				item.put("can_destroy", can_destroy);
				item.put("remind", "当前空间下还有设备，不可拆除!");
				return result.toJSONString();
			}
		}
		
		
		jsonObject.clear();
		jsonObject.put("obj_id", space_id);
		jsonObject.put(DBConst.TABLE_FIELD_VALID, true);
		jsonObject = JSONUtil.getCriteriaWithMajors(jsonObject, DBConst.TABLE_FIELD_VALID,"obj_id");
		String queryResult = DBCommonMethods.queryRecordByCriteria(DBConst.DATABASE_WORK_ORDER, DBConst.TABLE_WO_PLAN_OBJ_RELATION, jsonObject.toJSONString());
		JSONObject queryJson = JSONObject.parseObject(queryResult);
		if(Result.FAILURE.equals(queryJson.getString(Result.RESULT))) {
			return queryResult;
		}
		Integer count = queryJson.getInteger(Result.COUNT);
		if(count != null && count > 0) {
			can_destroy = false;
			item.put("remind", "工单计划中包含此空间，不可拆除!");
		}
		item.put("can_destroy", can_destroy);
		queryResult = result.toJSONString();
		return queryResult;
	}


}
