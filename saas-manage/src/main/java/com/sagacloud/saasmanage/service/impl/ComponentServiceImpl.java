package com.sagacloud.saasmanage.service.impl;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.sagacloud.saasmanage.common.CommonMessage;
import com.sagacloud.saasmanage.common.DateUtil;
import com.sagacloud.saasmanage.common.JSONUtil;
import com.sagacloud.saasmanage.common.StringUtil;
import com.sagacloud.saasmanage.common.ToolsUtil;
import com.sagacloud.saasmanage.dao.DBCommonMethods;
import com.sagacloud.saasmanage.dao.DBConst;
import com.sagacloud.saasmanage.dao.DBConst.Result;
import com.sagacloud.saasmanage.service.ComponentServiceI;
import com.sagacloud.saasmanage.service.OperateLogServiceI;

/**
 * @desc 组件对应关系-列表页
 * @author gezhanbin
 *
 */
@Service("componentService")
public class ComponentServiceImpl implements ComponentServiceI {

	@Autowired
	private OperateLogServiceI operateLogService;
	
	@Override
	public String queryAllComponentRel(JSONObject jsonObject) {
		String queryResult = DBCommonMethods.queryAllValidRecord(DBConst.TABLE_COMPONENT_RELATION);
		return ToolsUtil.filterRemind(queryResult, CommonMessage.filter_component_relation_list);
	}

	@Override
	public String queryComponentGroupByType(JSONObject jsonObject) {
		String queryResult = DBCommonMethods.queryAllValidRecord(DBConst.TABLE_DYNAMIC_COMPONENT);
		if(queryResult.contains(Result.SUCCESS) && queryResult.contains(Result.CONTENT)) {
			JSONObject resultJson = JSONObject.parseObject(queryResult);
			JSONArray contents = resultJson.getJSONArray(Result.CONTENT);
			JSONObject item = new JSONObject();
			Map<String,JSONArray> itemMap = new HashMap<String,JSONArray>();
			if(contents != null && contents.size() > 0) {
				
				for (int i = 0; i < contents.size(); i++) {
					JSONObject content = contents.getJSONObject(i);
					String cmptType = content.getString("cmpt_type");
					JSONArray items = itemMap.get(cmptType);
					if(items == null) {
						items = new JSONArray();
						itemMap.put(cmptType, items);
					}
					JSONArray filterCondition = new JSONArray();
					filterCondition.add("cmpt_code");
					filterCondition.add("cmpt_name");
					items.add(ToolsUtil.filterRemind(content, filterCondition));
				}
			}
			if(itemMap.size() > 0) {
				for(String cmptType : itemMap.keySet()) {
					item.put(cmptType, itemMap.get(cmptType));
				}
			}
			resultJson.remove(Result.CONTENT);
			resultJson.put("Item", item);
			queryResult = resultJson.toJSONString();
		}
		return queryResult;
	}

	@Override
	public String updateComponentRelById(JSONObject jsonObject) throws Exception {
		String requestContent = JSON.toJSONString(jsonObject);
		String operatePersonId = jsonObject.getString("user_id");
		jsonObject.remove("user_id");
		jsonObject.put("update_time", DateUtil.getNowTimeStr());
		String resultInfo = DBCommonMethods.updateRecord(DBConst.TABLE_COMPONENT_RELATION, JSON.toJSONString(JSONUtil.getUpdateParamJson(jsonObject, "cmpt_relation_id")));
		String operateResult = "0";
		if(resultInfo.contains(Result.SUCCESS)) {
			operateResult = "1";
		}
		operateLogService.insertRecord(operatePersonId, DBConst.TABLE_COMPONENT_RELATION, "U", "updateComponentRelById", requestContent, operateResult, resultInfo);
		return resultInfo;
	}

	@Override
	public String queryAllComponent(JSONObject jsonObject) {
		String cmptType = jsonObject.getString("cmpt_type");
		String queryResult = null;
		if(StringUtil.isNull(cmptType)) {
			//全部
			queryResult = DBCommonMethods.queryAllValidRecord(DBConst.TABLE_DYNAMIC_COMPONENT);
		} else {
			//根据条件查询
			jsonObject.put(DBConst.TABLE_FIELD_VALID, true);
			queryResult = DBCommonMethods.queryValidRecordByCriteria(DBConst.TABLE_DYNAMIC_COMPONENT, JSON.toJSONString(JSONUtil.getCriteriaWithMajors(jsonObject, DBConst.TABLE_FIELD_VALID,"cmpt_type")));
		}
		return queryResult;
	}

	@Override
	public String addComponent(JSONObject jsonObject) throws Exception {
		String requestContent = JSON.toJSONString(jsonObject);
		String operatePersonId = jsonObject.getString("user_id");
		String cmptType = jsonObject.getString("cmpt_type");
		String cmptCode = jsonObject.getString("cmpt_code");
		jsonObject.remove("user_id");
		
		
		//组件增加时，要验证该类型下，组件编码唯一
		jsonObject.put(DBConst.TABLE_FIELD_VALID, true);
		String queryResult = DBCommonMethods.queryValidRecordByCriteria(DBConst.TABLE_DYNAMIC_COMPONENT, JSON.toJSONString(JSONUtil.getCriteriaWithMajors(jsonObject, DBConst.TABLE_FIELD_VALID,"cmpt_type","cmpt_code")));
		long count = 0;
		if(queryResult.contains(Result.SUCCESS) && queryResult.contains(Result.COUNT)) {
			JSONObject resultJson = JSONObject.parseObject(queryResult);
			count = resultJson.getLongValue(Result.COUNT);
		}
		if(count > 0) {
			JSONObject result = new JSONObject();
			result.put(Result.RESULT, Result.FAILURE);
			result.put(Result.RESULTMSG, "该组件编码已经存在，请修改后再保存");
			return result.toJSONString();
		}
		
		
		jsonObject.put("cmpt_id", DBConst.TABLE_DYNAMIC_COMPONENT_ID_TAG + DateUtil.getUtcTimeNow());
		
		jsonObject.put(DBConst.TABLE_FIELD_UPDATE_TIME, DateUtil.getNowTimeStr());
		
		String resultInfo = DBCommonMethods.insertRecord(DBConst.TABLE_DYNAMIC_COMPONENT, JSON.toJSONString(JSONUtil.getAddParamJson(jsonObject)));
		String operateResult = "0";
		if(resultInfo.contains(Result.SUCCESS)) {
			//有原始组件新增时，同时向组件关系表增加一条关系，只有原始组件编码有值；
			if("base".equals(cmptType)) {
				jsonObject = new JSONObject();
				jsonObject.put("cmpt_relation_id", DBConst.TABLE_COMPONENT_RELATION_ID_TAG + DateUtil.getUtcTimeNow());
				jsonObject.put("base_cmpt_code", cmptCode);
				jsonObject.put(DBConst.TABLE_FIELD_UPDATE_TIME, DateUtil.getNowTimeStr());
				DBCommonMethods.insertRecord(DBConst.TABLE_COMPONENT_RELATION, JSON.toJSONString(JSONUtil.getAddParamJson(jsonObject)));
			}
			operateResult = "1";
		}
		//添加操作日志
		operateLogService.insertRecord(operatePersonId, DBConst.TABLE_DYNAMIC_COMPONENT, "I", "addComponent", requestContent, operateResult, resultInfo);
		return resultInfo;
	}

}
