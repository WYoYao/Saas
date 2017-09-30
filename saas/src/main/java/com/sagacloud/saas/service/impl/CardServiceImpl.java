package com.sagacloud.saas.service.impl;

import java.awt.Color;
import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.Reader;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.lowagie.text.Document;
import com.lowagie.text.Element;
import com.lowagie.text.Font;
import com.lowagie.text.Image;
import com.lowagie.text.PageSize;
import com.lowagie.text.Paragraph;
import com.lowagie.text.Rectangle;
import com.lowagie.text.pdf.BaseFont;
import com.lowagie.text.pdf.PdfPCell;
import com.lowagie.text.pdf.PdfPTable;
import com.lowagie.text.pdf.PdfWriter;
import com.sagacloud.json.JSONValue;
import com.sagacloud.saas.cache.GraphCache;
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
import com.sagacloud.saas.service.CardServiceI;
import com.sagacloud.saas.service.DictionaryServiceI;
import com.sagacloud.saas.service.ObjectServiceI;

/**
 * 功能描述：设备名片页
 * @author gezhanbin
 *
 */
@Service("cardService")
public class CardServiceImpl extends BaseService implements CardServiceI {
	@Autowired
	private ProjectCache projectCache;
	@Autowired
	private ObjectServiceI objectService;
	@Autowired
	private GraphCache graphCache;
	@Autowired
	private DictionaryServiceI dictionaryService;
	
	@Override
	public String queryEquipList(JSONObject jsonObject) throws Exception {
		String project_id = jsonObject.getString("project_id");
		String build_id = jsonObject.getString("build_id");
		String domain_code = jsonObject.getString("domain_code");
		String system_id = jsonObject.getString("system_id");
		Integer page = jsonObject.getInteger("page");
		Integer page_size = jsonObject.getInteger("page_size");
		String secret = projectCache.getProjectSecretById(project_id);
		if(!StringUtil.isNull(build_id) && !StringUtil.isNull(system_id)) {
			String build_id_temp = StringUtil.transferId(system_id, CommonConst.tag_build);
			if(!build_id_temp.equals(build_id)) {
				JSONObject result = new JSONObject();
				result.put(Result.CONTENT, new JSONArray());
				result.put(Result.RESULT, Result.SUCCESS);
				result.put(Result.COUNT, 0);
				return result.toJSONString();
			}
		}
		
		jsonObject.clear();
		
		
		
		jsonObject.put("valid", true);
		
		if(page ==  null || page < 1) {
			page = 1;
		}
		if(page_size != null && page_size > 0) {
			int skip = (page - 1) * page_size;
			JSONObject limit = new JSONObject();
			limit.put("skip", skip);
			limit.put("count", page_size);
			jsonObject.put("limit", limit);
		} 
		
		JSONObject criteria = new JSONObject();
		if(!StringUtil.isNull(system_id)) {
			String graph_id = graphCache.getGraphIdByProjectIdAndGraph(project_id, "SystemEquip");
			criteria.put("system_id", system_id);
			criteria.put("graph_id", graph_id);
			criteria.put("rel_type", "1");
		} else {
			if(!StringUtil.isNull(build_id)) {
				criteria.put("building_id", build_id);
			}
			domain_code =  domain_code == null ? "" : domain_code;
			criteria.put("category", domain_code);
		}
		
		jsonObject.put("criteria", criteria);
		
		
		
		
		String requestUrl = getDataPlatformPath(DataRequestPathUtil.dataPlat_equipment_complex_query, project_id, secret);
		String queryResult = httpPostRequest(requestUrl, jsonObject.toJSONString());
		JSONObject queryJson = JSONObject.parseObject(queryResult);
		if(Result.FAILURE.equals(queryJson.getString(Result.RESULT))) {
			return queryResult;
		}
		JSONArray queryContents = queryJson.getJSONArray(Result.CONTENT);
		if(queryContents != null && queryContents.size() > 0) {
			int size = queryContents.size();
			JSONArray contents = new JSONArray();
			JSONArray criterias = new JSONArray();
			String graph_id = graphCache.getGraphIdByProjectIdAndGraph(project_id, "EquipinSpace");
			Set<String> ids = new HashSet<>();
			//获取对象附加表
			Map<String, String> objAppendMap = queryObjAppendMap(project_id, "equip");
			
			for (int i = 0; i < size; i++) {
				criteria = new JSONObject();
				JSONObject queryContent = queryContents.getJSONObject(i);
				String equip_id = queryContent.getString("id");
				String build_id_temp = StringUtil.transferId(equip_id, CommonConst.tag_build);
				ids.add(build_id_temp);
				criteria.put("from_id", equip_id);
				criteria.put("graph_id", graph_id);
				criteria.put("rel_type", "1");
				criterias.add(criteria);
				String create_time = queryContent.getString("create_time");
				String equip_local_id = "";
				String equip_local_name = "";
				String specification = "";
				String supplier = "";
				JSONObject infos = queryContent.getJSONObject("infos");
				if(infos != null) {
					equip_local_id = infos.getString("EquipLocalID");
					equip_local_name = infos.getString("EquipLocalName");
					specification = infos.getString("Specification");
					supplier = infos.getString("Supplier");
				}
				
				JSONObject item = new JSONObject();
				item.put("equip_id", equip_id);
				item.put("equip_local_id", equip_local_id);
				item.put("equip_local_name", equip_local_name);
				item.put("specification", specification);
				String download_flag = objAppendMap.get(equip_id);
				download_flag = download_flag == null ? "0" : download_flag;
				item.put("supplier", supplier);
				item.put("download_flag", download_flag);
				item.put("create_time", create_time);
				contents.add(item);
			}
			//查询关系
			Map<String, String> equipSpaceMap = new HashMap<>();
			if(criterias.size() > 0) {
				jsonObject.clear();
				jsonObject.put("merge", true);
				jsonObject.put("criterias", criterias);
				
				equipSpaceMap = objectService.queryEquipSpaceSystemMap(jsonObject, project_id, secret);
				if(equipSpaceMap.size() > 0) {
					for (String space_id : equipSpaceMap.values()) {
						String floor_id = StringUtil.transferId(space_id, CommonConst.tag_floor);
						ids.add(space_id);
						ids.add(floor_id);
					}
				}
				
			}
			//查询建筑楼层信息
			Map<String, JSONObject> objectMap = new HashMap<>();
			if(ids.size() > 0) {
				objectMap = queryBatchObject(project_id, secret, ids);
			}
			if(objectMap.size() > 0) {
				for (int i = 0; i < contents.size(); i++) {
					JSONObject content = contents.getJSONObject(i);
					String position = "";
					String equip_id = content.getString("equip_id");
					String build_id_temp = StringUtil.transferId(equip_id, CommonConst.tag_build);
					String build_name = getObjectInfoValue(build_id_temp, objectMap, "BuildLocalName");
					if(!StringUtil.isNull(build_name)) {
						position = position + build_name;
					}
					String space_id = equipSpaceMap.get(equip_id);
					if(!StringUtil.isNull(space_id)) {
						String floor_id = StringUtil.transferId(space_id, CommonConst.tag_floor);
						String floor_name = getObjectInfoValue(floor_id, objectMap, "FloorLocalName");
						if(!StringUtil.isNull(floor_name)) {
							position = position + "-" + floor_name;
						}
						String space_name = getObjectInfoValue(space_id, objectMap, "RoomLocalName");
						if(!StringUtil.isNull(space_name)) {
							position = position + "-" + space_name;
						}
					}
					if(position.startsWith("-")) {
						position = position.substring(1, position.length());
					}
					content.put("position", position);
					
				}
				
			}
			queryJson.put(Result.CONTENT, contents);	
			queryJson.put(Result.COUNT, contents.size());	
			queryResult = queryJson.toJSONString();
		}
		return queryResult;
	}

	
	private Map<String, String> queryObjAppendMap(String project_id, String obj_type) {
		Map<String, String> objAppendMap = new HashMap<>();
		JSONObject jsonObject = new JSONObject();
		jsonObject.put(DBConst.TABLE_FIELD_VALID, true);
		jsonObject.put("project_id", project_id);
		jsonObject.put("obj_type", obj_type);
		jsonObject = JSONUtil.getCriteriaWithMajors(jsonObject, DBConst.TABLE_FIELD_VALID, "project_id", "obj_type");
		String queryResult = DBCommonMethods.queryRecordByCriteria(DBConst.TABLE_OBJ_APPEND, jsonObject.toJSONString());
		JSONObject queryJson = JSONObject.parseObject(queryResult);
		if(Result.SUCCESS.equals(queryJson.getString(Result.RESULT))) {
			JSONArray queryContents = queryJson.getJSONArray(Result.CONTENT);
			if(queryContents != null && queryContents.size() > 0) {
				for (int i = 0; i < queryContents.size(); i++) {
					JSONObject queryContent = queryContents.getJSONObject(i);
					String obj_id = queryContent.getString("obj_id");
					String download_flag = queryContent.getString("download_flag");
					objAppendMap.put(obj_id, download_flag);
				}
			}
		}
		return objAppendMap;
	}


	@Override
	public String queryNotDownloadEquipList(JSONObject jsonObject) throws Exception {
		String project_id = jsonObject.getString("project_id");
		Integer page = jsonObject.getInteger("page");
		Integer page_size = jsonObject.getInteger("page_size");
		String secret = projectCache.getProjectSecretById(project_id);
		
		if(page ==  null || page < 1) {
			page = 1;
		}
		
		
		JSONObject criteria = new JSONObject();
		
		jsonObject.clear();
		jsonObject.put(DBConst.TABLE_FIELD_VALID, true);
		jsonObject.put("project_id", project_id);
		jsonObject.put("obj_type", "equip");
		jsonObject.put("download_flag", "0");
		jsonObject = JSONUtil.getCriteriaWithMajors(jsonObject, DBConst.TABLE_FIELD_VALID, "project_id", "obj_type");
		String queryResult = DBCommonMethods.queryRecordByCriteria(DBConst.TABLE_OBJ_APPEND, jsonObject.toJSONString());
		JSONObject queryJson = JSONObject.parseObject(queryResult);
		if(Result.FAILURE.equals(queryJson.getString(Result.RESULT))) {
			return queryResult;
		}
		//待查询设备详情id
		JSONArray criterias = new JSONArray();
		//待查询设备所在空间id
		JSONArray graphCriterias = new JSONArray();
		//对象(设备、楼层、建筑)id
		Set<String> ids = new HashSet<>();
		JSONArray queryContents = queryJson.getJSONArray(Result.CONTENT);
		JSONArray contents = new JSONArray();
		if(queryContents != null && queryContents.size() > 0) {
			int size = queryContents.size();
			int skip = 0;
			if(page_size != null && page_size > 0) {
				skip = (page - 1) * page_size;
			}
			int count = 0;
			String graph_id = graphCache.getGraphIdByProjectIdAndGraph(project_id, "EquipinSpace");
			for (int i = skip; i < size; i++) {
				JSONObject queryContent = queryContents.getJSONObject(i);
				String equip_id = queryContent.getString("obj_id");
				String build_id_temp = StringUtil.transferId(equip_id, CommonConst.tag_build);
				ids.add(build_id_temp);
				count++;
				//查询设备新详情条件
				criteria = new JSONObject();
				criteria.put("id", equip_id);
				criterias.add(criteria);
				//查询设备所在空间条件
				JSONObject graphCriteria = new JSONObject();
				graphCriteria.put("from_id", equip_id);
				graphCriteria.put("graph_id", graph_id);
				graphCriteria.put("rel_type", "1");
				graphCriterias.add(graphCriteria);
//				JSONObject content = new JSONObject();
//				content.put("equip_id", equip_id);
//				contents.add(content);
				if(page_size != null && page_size > 0 && count >= page_size) {
					break;
				}
			}
		}
		//查询关系
		Map<String, String> equipSpaceMap = new HashMap<>();
		if(graphCriterias.size() > 0) {
			jsonObject.clear();
			jsonObject.put("merge", true);
			jsonObject.put("criterias", graphCriterias);
			
			equipSpaceMap = objectService.queryEquipSpaceSystemMap(jsonObject, project_id, secret);
			if(equipSpaceMap.size() > 0) {
				for (String space_id : equipSpaceMap.values()) {
					String floor_id = StringUtil.transferId(space_id, CommonConst.tag_floor);
					ids.add(space_id);
					ids.add(floor_id);
				}
			}
			
		}
		//查询建筑楼层信息
		Map<String, JSONObject> objectMap = new HashMap<>();
		if(ids.size() > 0) {
			objectMap = queryBatchObject(project_id, secret, ids);
		}
		if(criterias.size() > 0) {
			jsonObject.clear();
			jsonObject.put("criterias", criterias);
			
			String requestUrl = getDataPlatformPath(DataRequestPathUtil.dataPlat_object_batch_query, project_id, secret);
			queryResult = httpPostRequest(requestUrl, jsonObject.toJSONString());
			queryJson = JSONObject.parseObject(queryResult);
			if(Result.FAILURE.equals(queryJson.getString(Result.RESULT))) {
				return queryResult;
			}
			queryContents = queryJson.getJSONArray(Result.CONTENT);
			if(queryContents != null && queryContents.size() > 0) {
				int size = queryContents.size();
				for (int i = 0; i < size; i++) {
					criteria = new JSONObject();
					JSONObject queryContent = queryContents.getJSONObject(i);
					String equip_id = queryContent.getString("id");
					String build_id_temp = StringUtil.transferId(equip_id, CommonConst.tag_build);
					String create_time = queryContent.getString("create_time");
					String equip_local_id = "";
					String equip_local_name = "";
					String specification = "";
					String supplier = "";
					JSONObject infos = queryContent.getJSONObject("infos");
					if(infos != null) {
						equip_local_id = infos.getString("EquipLocalID");
						equip_local_name = infos.getString("EquipLocalName");
						specification = infos.getString("Specification");
						supplier = infos.getString("Supplier");
					}
					
					JSONObject item = new JSONObject();
					item.put("equip_id", equip_id);
					item.put("equip_local_id", equip_local_id);
					item.put("equip_local_name", equip_local_name);
					item.put("specification", specification);
					item.put("supplier", supplier);
					item.put("create_time", create_time);
					String position = "";
					String build_name = getObjectInfoValue(build_id_temp, objectMap, "BuildLocalName");
					if(!StringUtil.isNull(build_name)) {
						position = position + build_name;
					}
					String space_id = equipSpaceMap.get(equip_id);
					if(!StringUtil.isNull(space_id)) {
						String floor_id = StringUtil.transferId(space_id, CommonConst.tag_floor);
						String floor_name = getObjectInfoValue(floor_id, objectMap, "FloorLocalName");
						if(!StringUtil.isNull(floor_name)) {
							position = position + "-" + floor_name;
						}
						String space_name = getObjectInfoValue(space_id, objectMap, "RoomLocalName");
						if(!StringUtil.isNull(space_name)) {
							position = position + "-" + space_name;
						}
					}
					if(position.startsWith("-")) {
						position = position.substring(1, position.length());
					}
					item.put("position", position);
					
					
					contents.add(item);
				}
			}
		}
		queryJson.put(Result.CONTENT, contents);	
		queryJson.put(Result.COUNT, contents.size());	
		queryResult = queryJson.toJSONString();
		return queryResult;
	}


	@Override
	public String querySpaceList(JSONObject jsonObject) throws Exception {
		String project_id = jsonObject.getString("project_id");
		String build_id = jsonObject.getString("build_id");
		String floor_id = jsonObject.getString("floor_id");
		Integer page = jsonObject.getInteger("page");
		Integer page_size = jsonObject.getInteger("page_size");
		String secret = projectCache.getProjectSecretById(project_id);
		
		if(page ==  null || page < 1) {
			page = 1;
		}
		JSONObject criteria = new JSONObject();
		if(!StringUtil.isNull(floor_id)) {
			criteria.put("id", floor_id);
		} else if(!StringUtil.isNull(build_id)) {
			criteria.put("id", build_id);
		}
		JSONArray types = new JSONArray();
		types.add("Sp");
		criteria.put("type", types);
		jsonObject.clear();
		jsonObject.put("criteria", criteria);
		String requestUrl = getDataPlatformPath(DataRequestPathUtil.dataPlat_object_subset_query, project_id, secret);
		String queryResult = httpPostRequest(requestUrl, jsonObject.toJSONString());
		JSONObject queryJson = JSONObject.parseObject(queryResult);
		if(Result.SUCCESS.equals(queryJson.getString(Result.RESULT))) {
			JSONArray queryContents = queryJson.getJSONArray(Result.CONTENT);
			JSONArray contents = new JSONArray();
			if(queryContents != null && queryContents.size() > 0) {
				//获取对象附加表
				Map<String, String> objAppendMap = queryObjAppendMap(project_id, "space");
				
				//空间功能类型
				Map<String, String> spaceMap = dictionaryService.queryAllSpaceCode();
				
				int size = queryContents.size();
				int skip = 0;
				if(page_size != null && page_size > 0) {
					skip = (page - 1) * page_size;
				}
				int count = 0;
				for (int i = skip; i < size; i++) {
					count++;
					JSONObject content = new JSONObject();
					JSONObject queryContent = queryContents.getJSONObject(i);
					String space_id = queryContent.getString("id");
					String create_time = queryContent.getString("create_time");
					JSONObject infos = queryContent.getJSONObject("infos");
					String room_local_name = "";
					String room_func_type_name = "";
					String intro = "";
					if(infos != null) {
						room_local_name = infos.getString("RoomLocalName");
						intro = infos.getString("Intro");
						String room_func_type = infos.getString("RoomFuncType");
						if(!StringUtil.isNull(room_func_type)) {
							room_func_type_name = spaceMap.get(room_func_type);
						}
					}
					content.put("space_id", space_id);
					content.put("room_local_name", room_local_name);
					content.put("room_func_type_name", room_func_type_name);
					content.put("intro", intro);
					String download_flag = objAppendMap.get(space_id);
					download_flag = download_flag == null ? "0" : download_flag;
					content.put("download_flag", download_flag);
					content.put("create_time", create_time);
					contents.add(content);
					if(page_size != null && page_size > 0 && count >= page_size) {
						break;
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
	public String queryNotDownloadSpaceList(JSONObject jsonObject) throws Exception {
		String project_id = jsonObject.getString("project_id");
		Integer page = jsonObject.getInteger("page");
		Integer page_size = jsonObject.getInteger("page_size");
		String secret = projectCache.getProjectSecretById(project_id);
		
		if(page ==  null || page < 1) {
			page = 1;
		}
		
		
		JSONObject criteria = new JSONObject();
		
		jsonObject.clear();
		jsonObject.put(DBConst.TABLE_FIELD_VALID, true);
		jsonObject.put("project_id", project_id);
		jsonObject.put("obj_type", "space");
		jsonObject.put("download_flag", "0");
		jsonObject = JSONUtil.getCriteriaWithMajors(jsonObject, DBConst.TABLE_FIELD_VALID, "project_id", "obj_type");
		String queryResult = DBCommonMethods.queryRecordByCriteria(DBConst.TABLE_OBJ_APPEND, jsonObject.toJSONString());
		JSONObject queryJson = JSONObject.parseObject(queryResult);
		if(Result.FAILURE.equals(queryJson.getString(Result.RESULT))) {
			return queryResult;
		}
		//待查询空间详情id
		JSONArray criterias = new JSONArray();
		JSONArray queryContents = queryJson.getJSONArray(Result.CONTENT);
		JSONArray contents = new JSONArray();
		if(queryContents != null && queryContents.size() > 0) {
			int size = queryContents.size();
			int skip = 0;
			if(page_size != null && page_size > 0) {
				skip = (page - 1) * page_size;
			}
			int count = 0;
			for (int i = skip; i < size; i++) {
				JSONObject queryContent = queryContents.getJSONObject(i);
				String space_id = queryContent.getString("obj_id");
				count++;
				//查询设备新详情条件
				criteria = new JSONObject();
				criteria.put("id", space_id);
				criterias.add(criteria);
				if(page_size != null && page_size > 0 && count >= page_size) {
					break;
				}
			}
		}
		if(criterias.size() > 0) {
			jsonObject.clear();
			jsonObject.put("criterias", criterias);
			
			String requestUrl = getDataPlatformPath(DataRequestPathUtil.dataPlat_object_batch_query, project_id, secret);
			queryResult = httpPostRequest(requestUrl, jsonObject.toJSONString());
			queryJson = JSONObject.parseObject(queryResult);
			if(Result.FAILURE.equals(queryJson.getString(Result.RESULT))) {
				return queryResult;
			}
			queryContents = queryJson.getJSONArray(Result.CONTENT);
			if(queryContents != null && queryContents.size() > 0) {
				int size = queryContents.size();
				//空间功能类型
				Map<String, String> spaceMap = dictionaryService.queryAllSpaceCode();
				
				for (int i = 0; i < size; i++) {
					JSONObject content = new JSONObject();
					JSONObject queryContent = queryContents.getJSONObject(i);
					String space_id = queryContent.getString("id");
					String create_time = queryContent.getString("create_time");
					JSONObject infos = queryContent.getJSONObject("infos");
					String room_local_name = "";
					String room_func_type_name = "";
					String intro = "";
					if(infos != null) {
						room_local_name = infos.getString("RoomLocalName");
						intro = infos.getString("Intro");
						String room_func_type = infos.getString("RoomFuncType");
						if(!StringUtil.isNull(room_func_type)) {
							room_func_type_name = spaceMap.get(room_func_type);
						}
					}
					content.put("space_id", space_id);
					content.put("room_local_name", room_local_name);
					content.put("room_func_type_name", room_func_type_name);
					content.put("intro", intro);
					content.put("create_time", create_time);
					contents.add(content);
				}
			}
		}
		queryJson.put(Result.CONTENT, contents);	
		queryJson.put(Result.COUNT, contents.size());	
		queryResult = queryJson.toJSONString();
		return queryResult;
	}


	@Override
	public String queryEquipOptions(JSONObject jsonObject) throws Exception {
		
		JSONObject result = new JSONObject();
		
		try {
			InputStream in = Thread.currentThread().getContextClassLoader().getResourceAsStream("equipSpaceOptions.json");
			Reader reader = new InputStreamReader(in);
			String contentStr = JSONValue.parse(reader).toString();
			JSONObject content = JSONObject.parseObject(contentStr);
			JSONArray equipOptions = content.getJSONArray("EquipOptions");
			if(equipOptions == null) {
				equipOptions = new JSONArray();
			}
			result.put(Result.RESULT, Result.SUCCESS);
			result.put(Result.CONTENT, equipOptions);
			result.put(Result.COUNT, equipOptions.size());
			
		} catch (Exception e) {
			result.put(Result.RESULT, Result.FAILURE);
			result.put(Result.RESULTMSG, "查询失败");
		}
		
		return result.toJSONString();
	}


	@Override
	public String querySpaceOptions(JSONObject jsonObject) throws Exception {
		JSONObject result = new JSONObject();
		
		try {
			InputStream in = Thread.currentThread().getContextClassLoader().getResourceAsStream("equipSpaceOptions.json");
			Reader reader = new InputStreamReader(in);
			String contentStr = JSONValue.parse(reader).toString();
			JSONObject content = JSONObject.parseObject(contentStr);
			JSONArray spaceOptions = content.getJSONArray("SpaceOptions");
			if(spaceOptions == null) {
				spaceOptions = new JSONArray();
			}
			result.put(Result.RESULT, Result.SUCCESS);
			result.put(Result.CONTENT, spaceOptions);
			result.put(Result.COUNT, spaceOptions.size());
			
		} catch (Exception e) {
			result.put(Result.RESULT, Result.FAILURE);
			result.put(Result.RESULTMSG, "查询失败");
		}
		
		return result.toJSONString();
	}


	@Override
	public String saveEquipCardStyle(JSONObject jsonObject) throws Exception {
		JSONArray card_info = jsonObject.getJSONArray("card_info");
		if(card_info == null || card_info.size() == 0) {
			return ToolsUtil.return_error_json;
		}
		jsonObject.put("card_info", card_info.toJSONString());
		jsonObject.put(DBConst.TABLE_FIELD_VALID, true);
		JSONObject criteria = JSONUtil.getKeyWithMajors(jsonObject, DBConst.TABLE_FIELD_VALID,"obj_type");
		String queryResult = DBCommonMethods.getRecordBykey(DBConst.TABLE_OBJ_CARD_STYLE, criteria.toJSONString());
		JSONObject queryJson = JSONObject.parseObject(queryResult);
		if(Result.FAILURE.equals(queryJson.getString(Result.RESULT))) {
			return queryResult;
		}
		Integer count = queryJson.getInteger(Result.COUNT);
		jsonObject.put(DBConst.TABLE_FIELD_UPDATE_TIME, DateUtil.getNowTimeStr());
		if(count == 0) {
			//添加
			criteria = JSONUtil.getAddParamJson(jsonObject);
			queryResult = DBCommonMethods.insertRecord(DBConst.TABLE_OBJ_CARD_STYLE, criteria.toJSONString());
		} else {
			//修改
			criteria = JSONUtil.getUpdateParamJson(jsonObject, DBConst.TABLE_FIELD_VALID,"obj_type");
			queryResult = DBCommonMethods.updateRecord(DBConst.TABLE_OBJ_CARD_STYLE, criteria.toJSONString());
		}
		return queryResult;
	}


	@Override
	public String downloadEquipCard(JSONObject jsonObject) throws Exception {
		String project_id = jsonObject.getString("project_id");
		String secret = projectCache.getProjectSecretById(project_id);
		JSONArray equip_ids = jsonObject.getJSONArray("equip_ids");
		if(equip_ids == null || equip_ids.size() == 0) {
			return ToolsUtil.return_error_json;
		}
		JSONArray card_info = objectService.queryObjCardStyle("equip");
		Map<String, String> cardInfoMap = new HashMap<>();
		for (int i = 0; i < card_info.size(); i++) {
			JSONObject obj = card_info.getJSONObject(i);
			String info_point_code = obj.getString("info_point_code");
			if("not_have".equals(info_point_code)) {
				card_info.remove(i);
				i--;
			} else {
				cardInfoMap.put(info_point_code, "");
			}
		}
		JSONArray criterias = new JSONArray();
		for (int i = 0; i < equip_ids.size(); i++) {
			JSONObject criteria = new JSONObject();
			criteria.put("id", equip_ids.getString(i));
			criterias.add(criteria);
		}
		jsonObject.clear();
		
		jsonObject.put("criterias", criterias);
		
		String requestUrl = getDataPlatformPath(DataRequestPathUtil.dataPlat_object_batch_query, project_id, secret);
		String queryResult = httpPostRequest(requestUrl, jsonObject.toJSONString());
		JSONObject queryJson = JSONObject.parseObject(queryResult);
		if(Result.FAILURE.equals(queryJson.getString(Result.RESULT))) {
			return queryResult;
		}
		JSONArray queryContents = queryJson.getJSONArray(Result.CONTENT);
		JSONArray contents = new JSONArray();
		Set<String> ids = new HashSet<>();
		JSONArray spaceRelCriterias = new JSONArray();
		JSONArray systemRelCriterias = new JSONArray();
		if(queryContents != null && queryContents.size() > 0) {
			String equipinSpace_graph_id = graphCache.getGraphIdByProjectIdAndGraph(project_id, "EquipinSpace");
			String systemEquip_graph_id = graphCache.getGraphIdByProjectIdAndGraph(project_id, "SystemEquip");
			//设备类型
			Map<String, String> equipmentCategoryMap = dictionaryService.queryEquipmentCategory();
			
			
			
			int size = queryContents.size();
			for (int i = 0; i < size; i++) {
				JSONObject content = new JSONObject();
				JSONObject queryContent = queryContents.getJSONObject(i);
				String equip_id = queryContent.getString("id");
				
				content.put("equip_id", equip_id);
				
				JSONObject infos = queryContent.getJSONObject("infos");
				if(infos != null) {
					String equip_qr_code = infos.getString("EquipQRCode");
					equip_qr_code = equip_qr_code == null ? "" : equip_qr_code;
					content.put("equip_qr_code", equip_qr_code);
					
					if(cardInfoMap.containsKey("equip_local_name")) {
						//设备名称
						String equip_local_name = infos.getString("EquipLocalName");
						equip_local_name = equip_local_name == null ? "" : equip_local_name;
						content.put("equip_local_name", equip_local_name);
					} 
					if(cardInfoMap.containsKey("equip_local_id")) {
						//设备编码
						String equip_local_id = infos.getString("EquipLocalID");
						equip_local_id = equip_local_id == null ? "" : equip_local_id;
						content.put("equip_local_id", equip_local_id);
					}
					if(cardInfoMap.containsKey("specification")) {
						//设备型号
						String specification = infos.getString("Specification");
						specification = specification == null ? "" : specification;
						content.put("specification", specification);
					}
					if(cardInfoMap.containsKey("equip_category")) {
						//设备类型
						String category = StringUtil.getEquipOrSystemCodeFromId(equip_id, CommonConst.tag_dict_equip);
						String equip_category = equipmentCategoryMap.get(category);
						equip_category = equip_category == null ? "" : equip_category;
						content.put("equip_category", equip_category);
					} 
					if(cardInfoMap.containsKey("position")) {
						//安装位置
						content.put("position", "");
						String build_id = StringUtil.transferId(equip_id, CommonConst.tag_build);
						ids.add(build_id);
						JSONObject criteria = new JSONObject();
						criteria.put("from_id", equip_id);
						criteria.put("graph_id", equipinSpace_graph_id);
						criteria.put("rel_type", "1");
						spaceRelCriterias.add(criteria);
					} 
					if(cardInfoMap.containsKey("system_id")) {
						//所属系统
						content.put("system_id", "");
						JSONObject criteria = new JSONObject();
						criteria.put("to_id", equip_id);
						criteria.put("graph_id", systemEquip_graph_id);
						criteria.put("rel_type", "1");
						systemRelCriterias.add(criteria);
					} 
					if(cardInfoMap.containsKey("dept")) {
						//所属部门
						String dept = infos.getString("Dept");
						dept = dept == null ? "" : dept;
						content.put("dept", dept);
					} 
					if(cardInfoMap.containsKey("brand")) {
						//设备品牌
						String brand = infos.getString("Brand");
						brand = brand == null ? "" : brand;
						content.put("brand", brand);
					}
					if(cardInfoMap.containsKey("start_date")) {
						//投产日期
						String start_date = infos.getString("StartDate");
						start_date = start_date == null ? "" : start_date;
						content.put("start_date", start_date);
					} 
					if(cardInfoMap.containsKey("principal")) {
						//负责人
						String principal = infos.getString("Principal");
						principal = principal == null ? "" : principal;
						content.put("principal", principal);
					} 
					if(cardInfoMap.containsKey("service_life")) {
						//使用寿命
						String service_life = infos.getString("ServiceLife");
						service_life = service_life == null ? "" : service_life;
						content.put("service_life", service_life);
					}
					if(cardInfoMap.containsKey("maintainer")) {
						//维修商
						String maintainer = infos.getString("Maintainer");
						maintainer = maintainer == null ? "" : maintainer;
						content.put("maintainer", maintainer);
					} 
				}
				contents.add(content);	
			}
		}
		//查询关系
		Map<String, String> equipSpaceMap = new HashMap<>();
		Map<String, String> equipSystemMap = new HashMap<>();
		if(spaceRelCriterias.size() > 0) {
			jsonObject.clear();
			jsonObject.put("merge", true);
			jsonObject.put("criterias", spaceRelCriterias);
			
			equipSpaceMap = objectService.queryEquipSpaceSystemMap(jsonObject, project_id, secret);
			if(equipSpaceMap.size() > 0) {
				for (String space_id : equipSpaceMap.values()) {
					String floor_id = StringUtil.transferId(space_id, CommonConst.tag_floor);
					ids.add(space_id);
					ids.add(floor_id);
				}
			}
		}
		if(systemRelCriterias.size() > 0) {
			jsonObject.put("criterias", systemRelCriterias);
			
			equipSystemMap = objectService.queryEquipSpaceSystemMap(jsonObject, project_id, secret);
			if(equipSystemMap.size() > 0) {
				for (String system_id : equipSystemMap.values()) {
					ids.add(system_id);
				}
			}
			
		}
		if(ids.size() > 0) {	
			//查询建筑楼层信息
			Map<String, JSONObject> objectMap = queryBatchObject(project_id, secret, ids);
			if(objectMap.size() > 0) {
				for (int i = 0; i < contents.size(); i++) {
					JSONObject content = contents.getJSONObject(i);
					String equip_id = content.getString("equip_id");
					
					if(cardInfoMap.containsKey("position")) {
						//安装位置
						String position = "";
						String build_id = StringUtil.transferId(equip_id, CommonConst.tag_build);
						String build_name = getObjectInfoValue(build_id, objectMap, "BuildLocalName");
						if(!StringUtil.isNull(build_name)) {
							position = position + build_name;
						}
						String space_id = equipSpaceMap.get(equip_id);
						if(!StringUtil.isNull(space_id)) {
							String floor_id = StringUtil.transferId(space_id, CommonConst.tag_floor);
							String floor_name = getObjectInfoValue(floor_id, objectMap, "FloorLocalName");
							if(!StringUtil.isNull(floor_name)) {
								position = position + "-" + floor_name;
							}
							String space_name = getObjectInfoValue(space_id, objectMap, "RoomLocalName");
							if(!StringUtil.isNull(space_name)) {
								position = position + "-" + space_name;
							}
						}
						if(position.startsWith("-")) {
							position = position.substring(1, position.length());
						}
						content.put("position", position);
						
					} 
					if(cardInfoMap.containsKey("system_id")) {
						//所属系统
						String system_id = equipSystemMap.get(equip_id);
						String system_local_name = getObjectInfoValue(system_id, objectMap, "SysLocalName");
						if(system_local_name == null) {
							system_local_name = "";
						}
						content.put("system_id", system_local_name);
					}
					
					
				}
				
			}
		}
		
//		String fontStr = Constant.basePath + Constant.projectFileConfigMap.get(Constant.ProjectCode.EMS_Service_V+"_"+Constant.FileCode.sohofont);
		String fontStr = "D:/Develop/emsv5/background/ems_service_v/soho/simhei.ttf";
		BaseFont bfChinese = BaseFont.createFont(fontStr, BaseFont.IDENTITY_H, BaseFont.NOT_EMBEDDED);
		Font fontChinese = new Font(bfChinese, 8, Font.NORMAL);
		fontChinese.setColor(Color.black);
		
		Font titleChinese = new Font(bfChinese, 14, Font.NORMAL);
		titleChinese.setColor(Color.black);
		// 第一步，创建document对象
		Rectangle rectPageSize = new Rectangle(PageSize.A4);
		Document document = new Document(rectPageSize,-73,-73,0,-2);
		//第3步,打开文档
		String uuid = UUID.randomUUID().toString();
		String dirPath = getdownLoadQRCodePdfPath();
		String filePath = dirPath + File.separator + uuid + ".pdf";
		File file = new File(dirPath);
		if(!file.exists()) {
			file.mkdirs();
		}
		PdfWriter.getInstance(document,new FileOutputStream(filePath));
        document.open();
        float[] widths = {400, 400};
        float[] pdfWidths = {600,600};
        int len = contents.size();
		int size = card_info.size();
		String headPath = "D:/Develop/emsv5/background/ems_service_v/soho/logos/5700000001.jpg";
		for (int i = 0; i < len; i=i+2) {
			
			PdfPTable pdfTable = new PdfPTable(2);
			pdfTable.setWidths(pdfWidths);
			
			for (int j = 0; j < pdfWidths.length; j++) {
				int mark = j + i;
				PdfPTable table = new PdfPTable(2);
				table.setWidths(widths);
				if(mark < len) {
					JSONObject content = contents.getJSONObject(mark);
					String equip_id = content.getString("equip_id");
					String equip_qr_code = content.getString("equip_qr_code");
					//logo
					PdfPCell headCell = new PdfPCell();
					headCell.setColspan(2);
					headCell.setFixedHeight(45);
					headCell.setPadding(1);
					headCell.setBorder(0);
//						headCell.setBorderWidthLeft(0.5f);
//						headCell.setBorderWidthRight(0.5f);
//						headCell.setBorderWidthTop(0.5f);
//						headCell.setBorderColorLeft(Color.GRAY);
//						headCell.setBorderColorRight(Color.GRAY);
//						headCell.setBorderColorTop(Color.GRAY);
					headCell.setBottom(0);
					Image img = Image.getInstance(headPath);
					img.scaleToFit(255, 45);
					headCell.addElement(img);
					table.addCell(headCell);
					
					headCell = new PdfPCell();
					headCell.setColspan(2);
					headCell.setFixedHeight(20);
					headCell.setBorder(0);
					headCell.setPaddingTop(-4);
//						leftCell.setBorderWidthLeft(0.5f);
					headCell.setPaddingLeft(10);
//						leftCell.setBorderColorLeft(Color.GRAY);
					headCell.setVerticalAlignment(Element.ALIGN_CENTER);
					headCell.setHorizontalAlignment(Element.ALIGN_CENTER);
					headCell.addElement(new Paragraph("设备登记卡", titleChinese));
					table.addCell(headCell);
					boolean qrCodeFlag = true;
					for (int k = 0; k < size; k++) {
						JSONObject obj = card_info.getJSONObject(k);
						String info_point_code = obj.getString("info_point_code");
						String info_point_name = obj.getString("info_point_name");
						String info_point_value = content.getString(info_point_code);
						PdfPCell leftCell = new PdfPCell();
						leftCell.setBorder(0);
						leftCell.setPaddingLeft(10);
						leftCell.setPaddingTop(-4);
						leftCell.setFixedHeight(20);
//						leftCell.setBorderWidthLeft(0.5f);
//						leftCell.setBorderColorLeft(Color.GRAY);
						leftCell.setVerticalAlignment(Element.ALIGN_TOP);
						String value = info_point_name + "：" + info_point_value;
						leftCell.addElement(new Paragraph(value, fontChinese));
						table.addCell(leftCell);
						if(qrCodeFlag) {
							//二维码
							PdfPCell rightCell = new PdfPCell();
							rightCell.setRowspan(size);
							rightCell.setBorder(0);
							rightCell.setPaddingLeft(0);
							rightCell.setPaddingTop(-5);
//						rightCell.setBorderWidthBottom(0.5f);
//						rightCell.setBorderColorBottom(Color.GRAY);
//						rightCell.setBorderWidthRight(0.5f);
//						rightCell.setBorderColorRight(Color.GRAY);
							InputStream inputStream = null;
							try {
								if(!StringUtil.isNull(equip_qr_code)) {
									String qrCodeUrl = getImageServicePath(DataRequestPathUtil.image_service_image_get, equip_qr_code);
									inputStream = httpGetFileRequest(qrCodeUrl);
									byte[] imageBytes = new byte[inputStream.available()];
									inputStream.read(imageBytes);
									img = Image.getInstance("D:/Develop/saasQRDir/4c64b3cd95054840a7a03d3712bf57f1.png");
									img.scaleToFit(100, 100);
									rightCell.addElement(img);
								}
								
							} catch (Exception e) {
								if(inputStream != null) {
									try {
										inputStream.close();
									} catch (Exception e2) {
									}
								}
							}
							table.addCell(rightCell);
							qrCodeFlag = false;
						}
						
					}
					
					
				}
				table.setComplete(true);
				pdfTable.setKeepTogether(true);
				pdfTable.addCell(table);
			}
			document.add(pdfTable);
		}
		document.close();
		JSONObject item = new JSONObject();
		item.put("filePath", filePath);
		return item.toJSONString();
	}
	
	
}
