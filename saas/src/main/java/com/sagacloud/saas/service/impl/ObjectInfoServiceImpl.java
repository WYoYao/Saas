package com.sagacloud.saas.service.impl;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.sagacloud.saas.cache.ComponentRelationCache;
import com.sagacloud.saas.cache.InfoPointCache;
import com.sagacloud.saas.common.DataRequestPathUtil;
import com.sagacloud.saas.common.JSONUtil;
import com.sagacloud.saas.common.StringUtil;
import com.sagacloud.saas.dao.DBConst.Result;
import com.sagacloud.saas.service.BaseService;
import com.sagacloud.saas.service.DictionaryServiceI;
import com.sagacloud.saas.service.ObjectInfoServiceI;

/**
 * @desc 获取数据平台历史数据
 * @author gezhanbin
 *
 */
@Service("objectInfoService")
public class ObjectInfoServiceImpl extends BaseService implements ObjectInfoServiceI{
	@Autowired
    private DictionaryServiceI dictionaryService;
	@Override
	public String queryObjectInfoHis(String id, String infoPointCode, String project_id, String secret) throws Exception {
		String requestUrl = getDataPlatformPath(DataRequestPathUtil.dataPlat_object_batch_query, project_id, secret);
		JSONObject jsonObject = new JSONObject();
		JSONArray criterias = new JSONArray();
		JSONObject objQuery = new JSONObject();
		objQuery.put("id", id);
		criterias.add(objQuery);
		jsonObject.put("criterias", criterias);
		String queryResult = this.httpPostRequest(requestUrl, jsonObject.toJSONString());
		JSONObject queryJson = JSONObject.parseObject(queryResult);
		
		if(Result.FAILURE.equals(queryJson.getString(Result.RESULT))) {
			return queryResult;
		}
		
		JSONObject result = new JSONObject();
		result.put(Result.RESULT, Result.SUCCESS);
		JSONArray queryContents = queryJson.getJSONArray(Result.CONTENT);
		if(queryContents != null && queryContents.size() > 0) {
			JSONObject queryItem = queryContents.getJSONObject(0);
			queryItem = queryItem.getJSONObject("infos");
			JSONArray infoPointCodeHis = null;
			if(queryItem != null) {
				infoPointCodeHis = queryItem.getJSONArray(infoPointCode + "_his");
			}
			if(infoPointCodeHis == null) {
				infoPointCodeHis = new JSONArray();
			} else {
				for (int i = 0; i < infoPointCodeHis.size(); i++) {
					JSONObject item = infoPointCodeHis.getJSONObject(i);
					item.put("date", item.getString("time"));
					item.remove("time");
				}
				infoPointCodeHis = JSONUtil.sortByStringField(infoPointCodeHis, "date", -1);
			}
			
			result.put(Result.CONTENT, infoPointCodeHis);
			result.put(Result.COUNT, infoPointCodeHis.size());
			queryResult = result.toJSONString();
		}
		return queryResult;
	}

	@Override
	public String verifyObjectInfo(String objectParentId, String objectId, String objectParam, String objectValue, String type, String project_id, String secret) throws Exception {
		boolean can_use = true;
		JSONObject jsonObject = new JSONObject();
		JSONObject criteria = new JSONObject();
		criteria.put("id", objectParentId);
		JSONArray types = new JSONArray();
		types.add(type);
		criteria.put("type", types);
		jsonObject.put("criteria", criteria);
		String requestUrl = getDataPlatformPath(DataRequestPathUtil.dataPlat_object_subset_query, project_id, secret);
		String queryResult = httpPostRequest(requestUrl, jsonObject.toJSONString());
		JSONObject queryJson = JSONObject.parseObject(queryResult);
		if(Result.SUCCESS.equals(queryJson.getString(Result.RESULT))) {
			JSONArray queryContents = queryJson.getJSONArray(Result.CONTENT);
			if(queryContents != null && queryContents.size() > 0) {
				for (int i = 0; i < queryContents.size(); i++) {
					JSONObject queryContent = queryContents.getJSONObject(i);
					String id = queryContent.getString("id");
					JSONObject infos = queryContent.getJSONObject("infos");
					if(infos != null) {
						String objectParamValue = infos.getString(objectParam);
						if(!StringUtil.isNull(objectParamValue)) {
							if(!StringUtil.isNull(objectId)) {
								if(objectValue.equals(objectParamValue) && !id.equals(objectId)) {
									can_use = false;
									break;
								}
							} else {
								if(objectValue.equals(objectParamValue)) {
									can_use = false;
									break;
								}
								
							}
						}
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

	@Override
	public String updateObjectInfo(String id, String infoPointCode, Object info_point_value, String valid_time, String project_id, String secret) throws Exception {
		JSONObject jsonObject = new JSONObject();
		JSONArray criterias = new JSONArray();
		JSONObject criteria = new JSONObject();
		JSONObject infos = new JSONObject();
		JSONArray hisValues = new JSONArray();
		JSONObject hisValue = new JSONObject();
		hisValue.put("value", info_point_value);
		if(!StringUtil.isNull(valid_time)) {
			hisValue.put("time", valid_time);
		}
		hisValues.add(hisValue);
		infos.put(infoPointCode, hisValues);
		criteria.put("id", id);
		criteria.put("infos", infos);
		criterias.add(criteria);
		jsonObject.put("criterias", criterias);
		String requestUrl = getDataPlatformPath(DataRequestPathUtil.dataPlat_object_batch_update, project_id, secret);
		return httpPostRequest(requestUrl, jsonObject.toJSONString());
	}

	@Override
	public Map<String, JSONObject> queryObjectDynamicInfo(String objectType, String typeCode, JSONObject objectItem) throws Exception {
		Map<String, JSONObject> contentsMap = new HashMap<>();
//		String objectType = "system";
		String requestUrl = this.getDataPlatDictPath(DataRequestPathUtil.dataPlat_infoPoint_special, typeCode);
		String queryResult = this.httpGetRequest(requestUrl);
		JSONObject equipmentJson = JSONObject.parseObject(queryResult);
		if(Result.SUCCESS.equals(equipmentJson.getString(Result.RESULT))) {
			JSONArray resultContents = equipmentJson.getJSONArray(Result.CONTENT);
			if(resultContents != null && resultContents.size() > 0) {
				Map<String, Map<String, String>> dataSourceMap = new HashMap<String, Map<String,String>>();
				for (int i = 0; i < resultContents.size(); i++) {
					JSONObject objJson = resultContents.getJSONObject(i);
					//一级标签
					String firstTag = objJson.getString("firstTag");
					if(!firstTag.contains("技术参数")) {
						continue;
					}
					//原始组件编码
					String info_code = objJson.getString("infoPointCode");
					String cmpt_code = objJson.getString("inputMode");
					//信息点组件id
					//3、根据信息点编码inputMode 组装info_cmpt_id 查询 信息点组件表info_component 中  app_show_flag 显示true或者为null的信息点编码
					String infoCmptId = objectType + "_" + typeCode + "_" + cmpt_code;
					boolean isShowInSaas = InfoPointCache.isShowInSaas(infoCmptId);
					if(!isShowInSaas) {
						continue;
					}
					//二级标签
					String secondTag = objJson.getString("secondTag");
					String dataType = objJson.getString("dataType");
					String unit = objJson.getString("unit");
					//信息点名称
					String info_name = objJson.getString("infoPointName");

					Object dataSource = objJson.get("dataSource");
					JSONArray cmpt_datas = new JSONArray();
					if(dataSource != null) {
						if(dataSource instanceof JSONArray) {
							cmpt_datas = objJson.getJSONArray("dataSource");
						} else {
							Map<String, String> codeMap = dataSourceMap.get(info_name);
							if(codeMap == null) {
								codeMap = dictionaryService.queryDictionaryDataByName(info_name);
								if(codeMap != null) {
									dataSourceMap.put(info_name, codeMap);
								}
							}
							if(codeMap != null) {
								for (String code : codeMap.keySet()) {
									String name = codeMap.get(code);
									JSONObject cmpt_data = new JSONObject();
									cmpt_data.put("code", code);
									cmpt_data.put("name", name);
									cmpt_datas.add(cmpt_data);
								}
							}
						}
					}
					//4、根据显示的信息点编码 查询组件关系表component_relation中的app组件编码app_cmpt_code 赋值给cmpt
					JSONObject compRelaObj = ComponentRelationCache.getComponentRelationByBaseCmptCode(cmpt_code);
					String cmpt = "";
					if(compRelaObj != null) {
						cmpt = compRelaObj.getString("saas_cmpt_code");
					}
					JSONObject info_PointObj = new JSONObject();
					info_PointObj.put("info_code", info_code);
					info_PointObj.put("info_name", info_name);
					info_PointObj.put("unit", unit);
					info_PointObj.put("cmpt", cmpt);

					//5、在根据设备信息中的key获取value值，根据私有信息点data_type 赋值给***_value属性
					Object value = null;
					if(objectItem != null) {
						value = objectItem.get(info_code);
					}
					if("Attachment".equals(dataType)) {
						//附件
						if(value == null) {
							value = new JSONArray();
						}
						info_PointObj.put("data_type", "Att");
						info_PointObj.put("att_value", value);
					} else if(dataType.contains("组") || dataType.contains("Arr")) {
						//数组
						if(value == null) {
							value = new JSONArray();
						}
						info_PointObj.put("data_type", "StrArr");
						info_PointObj.put("str_arr_value_", value);
					} else {
						//字符串
						if(value == null) {
							value = "";
						}
						
						info_PointObj.put("data_type", "Str");
						info_PointObj.put("str_value", value);
					}
					//6、把信息点中的dataSource值赋值给cmpt_data
					info_PointObj.put("cmpt_data", cmpt_datas);
					String tag = firstTag;
					if(!StringUtil.isNull(secondTag)) {
						tag = secondTag;
					}
					JSONObject content = contentsMap.get(tag);
					if(content == null) {
						content = new JSONObject();
						content.put("tag", tag);
						contentsMap.put(tag, content);
					}
					JSONArray info_Points = content.getJSONArray("info_Points");
					if(info_Points == null) {
						info_Points = new JSONArray();
						content.put("info_Points", info_Points);
					}
					info_Points.add(info_PointObj);
				}
			}
		}
		return contentsMap;
		
	}

	@Override
	public JSONObject queryObject(String id, String project_id, String secret) throws Exception {
		JSONObject item = null;
		String requestUrl = getDataPlatformPath(DataRequestPathUtil.dataPlat_object_batch_query, project_id, secret);
		JSONObject jsonObject = new JSONObject();
		JSONArray criterias = new JSONArray();
		JSONObject objQuery = new JSONObject();
		objQuery.put("id", id);
		criterias.add(objQuery);
		jsonObject.put("criterias", criterias);
		String queryResult = this.httpPostRequest(requestUrl, jsonObject.toJSONString());
		if(queryResult.contains(Result.SUCCESS) && queryResult.contains(Result.CONTENT)) {
			JSONObject result = new JSONObject();
			result.put(Result.RESULT, Result.SUCCESS);
			JSONObject queryJson = JSONObject.parseObject(queryResult);
			JSONArray queryContents = queryJson.getJSONArray(Result.CONTENT);
			if(queryContents != null && queryContents.size() > 0) {
				JSONObject queryItem = queryContents.getJSONObject(0);
				item = queryItem.getJSONObject("infos");
			}
		}
		return item;
	}

}
