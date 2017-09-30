package com.sagacloud.saasmanage.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.sagacloud.saasmanage.cache.ComponentRelationCache;
import com.sagacloud.saasmanage.cache.InfoComponentCache;
import com.sagacloud.saasmanage.common.DataRequestPathUtil;
import com.sagacloud.saasmanage.common.DateUtil;
import com.sagacloud.saasmanage.common.JSONUtil;
import com.sagacloud.saasmanage.common.StringUtil;
import com.sagacloud.saasmanage.dao.DBCommonMethods;
import com.sagacloud.saasmanage.dao.DBConst;
import com.sagacloud.saasmanage.dao.DBConst.Result;
import com.sagacloud.saasmanage.service.BaseService;
import com.sagacloud.saasmanage.service.OperateLogServiceI;
import com.sagacloud.saasmanage.service.TemplateServiceI;

/**
 * @desc 动态模板管理
 * @author gezhanbin
 *
 */
@Service("templateService")
public class TemplateServiceImpl extends BaseService implements TemplateServiceI {

	@Autowired
	private OperateLogServiceI operateLogService;
	
	
	@Override
	public String queryObjectCategoryTree(String like) throws Exception {
		JSONObject result = new JSONObject();
		result.put(Result.RESULT, Result.SUCCESS);
		JSONArray contents = new JSONArray();
		JSONArray likeContents = new JSONArray();
		if(StringUtil.isNull(like)) {
			result.put(Result.CONTENT, contents);
		} else {
			result.put(Result.CONTENT, likeContents);
		}
		JSONObject jsonObject = new JSONObject();
		
		//获取数据字典中 专业-系统-设备类型 树形结构
		String requestUrl = getDataPlatDictPath(DataRequestPathUtil.dataPlat_dict_query, "equipment_all");
		
		String equipmentStr = this.httpGetRequest(requestUrl);
//		if(StringUtil.isNull(equipmentStr)) {
//			return result.toJSONString();
//		}
		JSONObject equipmentJson = JSONObject.parseObject(equipmentStr);
		if(Result.FAILURE.equals(equipmentJson.getString(Result.RESULT))) {
			return equipmentStr;
		}
		JSONArray resultContents = equipmentJson.getJSONArray(Result.CONTENT);
		if(resultContents == null || resultContents.size() == 0) {
			return result.toJSONString();
		}
		for (int i = 0; i < resultContents.size(); i++) {
			JSONObject professionObj = resultContents.getJSONObject(i);
			String professionCode = professionObj.getString("code");
			String professionName = professionObj.getString("class");
			JSONObject resultProfession = new JSONObject();
			resultProfession.put("code", professionCode);
			resultProfession.put("name", professionName);
			if(StringUtil.isNull(like)) {
				contents.add(resultProfession);
			}
			JSONArray systemContents = professionObj.getJSONArray("content");
			if(systemContents == null || systemContents.size()  == 0) {
				continue;
			}
			JSONArray resultProfessionContent = new JSONArray();
			resultProfession.put("content", resultProfessionContent);
			for (int j = 0; j < systemContents.size(); j++) {
				JSONObject systemObj = systemContents.getJSONObject(j);
				String systemCode = systemObj.getString("code");
				String systemName = systemObj.getString("system");
				JSONObject resultSystem = new JSONObject();
				resultSystem.put("code", systemCode);
				resultSystem.put("name", systemName);
				resultSystem.put("type", "system");
				resultProfessionContent.add(resultSystem);
				
				if(!StringUtil.isNull(like)) {
					if(systemName.contains(like)) {
						jsonObject = new JSONObject();
						jsonObject.put("code", systemCode);
						jsonObject.put("name", systemName);
						jsonObject.put("type", "system");
						jsonObject.put("description", professionName + "-" + systemName);
						likeContents.add(jsonObject);
					}
				} 
				
				
				
				JSONArray facilityContents = systemObj.getJSONArray("content");
				if(facilityContents == null || facilityContents.size()  == 0) {
					continue;
				}
				JSONArray resultSystemContent = new JSONArray();
				resultSystem.put("content", resultSystemContent);
				for (int k = 0; k < facilityContents.size(); k++) {
					JSONObject facilityObj = facilityContents.getJSONObject(k);
					String facilityCode = facilityObj.getString("code");
					String facilityName = facilityObj.getString("facility");
					JSONObject resultFacility = new JSONObject();
					resultFacility.put("code", facilityCode);
					resultFacility.put("name", facilityName);
					resultFacility.put("type", "equip");
					resultSystemContent.add(resultFacility);
					if(!StringUtil.isNull(like)) {
						if(facilityName.contains(like)) {
							jsonObject = new JSONObject();
							jsonObject.put("code", facilityCode);
							jsonObject.put("name", facilityName);
							jsonObject.put("type", "equip");
							jsonObject.put("description", professionName + "-" + systemName + "-" + facilityName);
							likeContents.add(jsonObject);
						}
					} 
				}
				
				
				
			}
			
		}
		
		return result.toJSONString();
	}

	@Override
	public String queryObjectCategory(JSONObject jsonObject) throws Exception {
		String like = jsonObject.getString("object_name");
		String queryResult = null;
		if(StringUtil.isNull(like)) {
			JSONObject result = new JSONObject();
			result.put(Result.RESULT, Result.SUCCESS);
			JSONArray likeContents = new JSONArray();
			result.put(Result.CONTENT, likeContents);
			queryResult = result.toJSONString();
		} else {
			queryResult = queryObjectCategoryTree(like);
		}
		return queryResult;
	}

	@Override
	public String queryObjectTemplate(JSONObject jsonObject) throws Exception {
		JSONObject result = new JSONObject();
		result.put(Result.RESULT, Result.SUCCESS);
		JSONArray contents = new JSONArray();
		result.put(Result.CONTENT, contents);
		
		JSONArray resultContents = new JSONArray();
		String code = jsonObject.getString("code");
		String type = jsonObject.getString("type");
		String requestUrl = null;
//		String requestIdUrl = null;
//		if("project".equals(type)) {
//			//项目
//			requestUrl = this.getDataPlatDictPath(DataRequestPathUtil.dataPlat_infocode_query_project, null);
//			code = "0";
//		} else if("build".equals(type)) {
//			//建筑体
//			requestUrl = this.getDataPlatDictPath(DataRequestPathUtil.dataPlat_infocode_query_building, null);
//			code = "0";
//		} else if("floor".equals(type)) {
//			//楼层
//			requestUrl = this.getDataPlatDictPath(DataRequestPathUtil.dataPlat_infocode_query_floor, null);
//			code = "0";
//		} else if("space".equals(type)) {
//			//空间
//			requestUrl = this.getDataPlatDictPath(DataRequestPathUtil.dataPlat_infocode_query_space, null);
//			code = "0";
//		} else if("system".equals(type)) {
//			//系统  设备类型
//			//设备通用信息点列表
//			requestUrl = this.getDataPlatDictPath(DataRequestPathUtil.dataPlat_infocode_query_system_general, null);
//			requestIdUrl = this.getDataPlatDictPath(DataRequestPathUtil.dataPlat_infocode_query_ID, code);
//		} else if("equip".equals(type)) {
//			//设备类型
//			requestUrl = this.getDataPlatDictPath(DataRequestPathUtil.dataPlat_infocode_query_equipment_general, null);
//			requestIdUrl = this.getDataPlatDictPath(DataRequestPathUtil.dataPlat_infocode_query_ID, code);
//		} 
		requestUrl = this.getDataPlatDictPath(DataRequestPathUtil.dataPlat_infocode_query_ID, code);
		String queryResult = this.httpGetRequest(requestUrl);
		
		JSONObject equipmentJson = JSONObject.parseObject(queryResult);
		if(Result.FAILURE.equals(equipmentJson.getString(Result.RESULT))) {
			return queryResult;
		}
		resultContents = equipmentJson.getJSONArray(Result.CONTENT);
		if(resultContents == null) {
			resultContents = new JSONArray();
		}
//		if(!StringUtil.isNull(requestIdUrl)) {
//			queryResult = this.httpGetRequest(requestIdUrl);
//			if(!StringUtil.isNull(queryResult)) {
//				JSONObject equipmentJson = JSONObject.parseObject(queryResult);
//				if(Result.SUCCESS.equals(equipmentJson.getString(Result.RESULT))) {
//					JSONArray resultContentIDs = equipmentJson.getJSONArray(Result.CONTENT);
//					if(resultContentIDs != null) {
//						resultContents.addAll(resultContentIDs);
//					}
//				}
//			}
//		}
		result.put(Result.COUNT, resultContents.size());
		if(resultContents.size() == 0) {
			return result.toJSONString();
		}
		for (int i = 0; i < resultContents.size(); i++) {
			JSONObject objJson = resultContents.getJSONObject(i);
			//原始组件编码
			String baseCmptCode = objJson.getString("inputMode");
			//信息点编码
			String infoPointCode = objJson.getString("infoPointCode");
			//信息点名称
			String infoPointName = objJson.getString("infoPointName");
			//信息点组件id
			String infoCmptId = type + "_" + code + "_" + infoPointCode;
			
			//获取组件关系表 信息
			//上帝之手组件编码
			String godHandCmptCode = null;
			//Saas组件编码
			String saasCmptCode = null;
			//app组件编码
			String appCmptCode = null;
			JSONObject componentRelation = ComponentRelationCache.getComponentRelationByBaseCmptCode(baseCmptCode);
			if(componentRelation != null) {
				godHandCmptCode = componentRelation.getString("god_hand_cmpt_code");
				saasCmptCode = componentRelation.getString("saas_cmpt_code");
				appCmptCode = componentRelation.getString("app_cmpt_code");
			}
			//获取信息点组件表信息
			//上帝之手页面标注
			String godHandNote = null;
			//Saas平台页面标注
			String saasNote = null;
			//Saas平台是否显示
			String saasShowFlag = null;
			//APP工单执行页面标注
			String appNote = null;
			//APP工单执行页面标注
			String appShowFlag = null;
			JSONObject infoComponent = InfoComponentCache.getInfoComponentByInfoCmptId(infoCmptId);
			if(infoComponent != null) {
				godHandNote = infoComponent.getString("god_hand_note");
				saasNote = infoComponent.getString("saas_note");
				saasShowFlag = infoComponent.getString("saas_show_flag");
				appNote = infoComponent.getString("app_note");
				appShowFlag = infoComponent.getString("app_show_flag");
			}
			
			if(StringUtil.isNull(saasCmptCode)) {
				saasShowFlag = "2";
			} else if(StringUtil.isNull(saasShowFlag)){
				saasShowFlag = "1";
			}
			if(StringUtil.isNull(appCmptCode)) {
				appShowFlag = "2";
			} else if(StringUtil.isNull(appShowFlag)){
				appShowFlag = "1";
			}
//			if("project".equals(type) || "build".equals(type)) {
//				//项目 建筑体
//				saasShowFlag = "2";
//				appShowFlag = "2";
//			}
			JSONObject resultObj = new JSONObject();
			resultObj.put("info_cmpt_id", infoCmptId);
			resultObj.put("info_point_code", infoPointName);
			resultObj.put("base_cmpt_code", baseCmptCode);
			resultObj.put("god_hand_cmpt_code", godHandCmptCode);
			resultObj.put("god_hand_note", godHandNote);
			resultObj.put("saas_cmpt_code", saasCmptCode);
			resultObj.put("saas_note", saasNote);
			resultObj.put("saas_show_flag", saasShowFlag);
			resultObj.put("app_cmpt_code", appCmptCode);
			resultObj.put("app_note", appNote);
			resultObj.put("app_show_flag", appShowFlag);
			
			contents.add(resultObj);
		}
		return result.toJSONString();
	}

	@Override
	public String updateInfoPointCmptById(JSONObject jsonObject) throws Exception {
		String requestContent = JSON.toJSONString(jsonObject);
		String operatePersonId = jsonObject.getString("user_id");
		String info_cmpt_id = jsonObject.getString("info_cmpt_id");
		jsonObject.remove("user_id");
		
		//判断是否存在
		JSONObject keyJson = JSONUtil.getKeyWithMajors(jsonObject, "info_cmpt_id");
		String queryResult = DBCommonMethods.getRecordBykey(DBConst.TABLE_INFO_COMPONENT, keyJson.toJSONString());
		long count = 0;
		if(queryResult.contains(Result.SUCCESS) && queryResult.contains(Result.COUNT)) {
			JSONObject resultJson = JSONObject.parseObject(queryResult);
			count = resultJson.getLongValue(Result.COUNT);
		}
		String resultInfo = null;
		jsonObject.put(DBConst.TABLE_FIELD_UPDATE_TIME, DateUtil.getNowTimeStr());
		String operateType = null;
		if(count == 0) {
			//插入
			String[] ids = info_cmpt_id.split("_");
			String objType = ids[0];
			String classCode = ids[1];
			if(!"system".equals(objType) && !"equip".equals(objType)) {
				classCode = "0";
			}
			jsonObject.put("obj_type", objType);
			jsonObject.put("class_code", classCode);
			jsonObject.put("info_point_code", ids[2]);
			resultInfo = DBCommonMethods.insertRecord(DBConst.TABLE_INFO_COMPONENT, JSON.toJSONString(JSONUtil.getAddParamJson(jsonObject)));
			operateType = "I";
		} else {
			//更新
			jsonObject = JSONUtil.getUpdateParamJson(jsonObject, "info_cmpt_id");
			
			resultInfo = DBCommonMethods.updateRecord(DBConst.TABLE_INFO_COMPONENT, jsonObject.toJSONString());
			operateType = "U";
		}
		
		String operateResult = "0";
		if(resultInfo.contains(Result.SUCCESS)) {
			operateResult = "1";
		}
		//添加操作日志
		operateLogService.insertRecord(operatePersonId, DBConst.TABLE_INFO_COMPONENT, operateType, "updateInfoPointCmptById", requestContent, operateResult, resultInfo);
		return resultInfo;
	}

}
