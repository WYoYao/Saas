package com.sagacloud.saasmanage.service.impl;

import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.Reader;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.sagacloud.json.JSONValue;
import com.sagacloud.saasmanage.common.CommonMessage;
import com.sagacloud.saasmanage.common.DateUtil;
import com.sagacloud.saasmanage.common.JSONUtil;
import com.sagacloud.saasmanage.common.StringUtil;
import com.sagacloud.saasmanage.common.ToolsUtil;
import com.sagacloud.saasmanage.dao.DBCommonMethods;
import com.sagacloud.saasmanage.dao.DBConst;
import com.sagacloud.saasmanage.dao.DBConst.Result;
import com.sagacloud.saasmanage.service.FuncPackServiceI;
import com.sagacloud.saasmanage.service.OperateLogServiceI;

/**
 * @desc 权限项管理
 * @author gezhanbin
 *
 */
@Service("funcPackService")
public class FuncPackServiceImple implements FuncPackServiceI {
	private static final Logger log = Logger.getLogger(FuncPackServiceImple.class);
	@Autowired
	private OperateLogServiceI operateLogService;
	
	@Override
	public String queryAllFuncPack(JSONObject jsonObject) {
		
		String queryResult = DBCommonMethods.queryAllValidRecord(DBConst.TABLE_FUNCTION_PACK);
		//倒序
		if(queryResult.contains(Result.RESULT) && queryResult.contains(Result.CONTENT)) {
    		JSONObject resultJson = JSONObject.parseObject(queryResult);
    		JSONArray contents = resultJson.getJSONArray(Result.CONTENT);
    		JSONArray items = new JSONArray();
    		int size = contents.size();
    		
    		for (int i = size - 1; i > -1; i--) {
    			JSONObject content = contents.getJSONObject(i);
    			JSONObject item = ToolsUtil.filterRemind(content, CommonMessage.filter_function_pack_list);
    			items.add(item);
			}
    		resultJson.put(Result.CONTENT, items);
    		queryResult = JSON.toJSONString(resultJson);
    	}
		
		return queryResult;
	}

	@Override
	public String queryFuncPointTree(JSONObject jsonObject) {
		JSONArray funcPoints = null;
		try {
			InputStream in = Thread.currentThread().getContextClassLoader().getResourceAsStream("functionPoint.json");
			Reader reader = new InputStreamReader(in);
			funcPoints = JSONArray.parseArray(JSONValue.parse(reader).toString());
			
		} catch (Exception e) {
			
			log.error(e.getMessage());
			e.printStackTrace();
		}
		JSONArray contents = new JSONArray();
		setFuncPoinsts("0", funcPoints, contents);
		int count = contents.size();
		
		JSONObject queryResult = new JSONObject();
		queryResult.put(Result.RESULT, Result.SUCCESS);
		queryResult.put(Result.CONTENT, contents);
		queryResult.put(Result.COUNT, count);
		return JSON.toJSONString(queryResult);
	}
	
	
	private void setFuncPoinsts(String parent_id, JSONArray funcPoints, JSONArray contents) {
		if(funcPoints == null || funcPoints.size() == 0) {
			return;
		}
		for (int i = 0; i < funcPoints.size(); i++) {
			JSONObject funcPoint = funcPoints.getJSONObject(i);
			JSONObject content = new JSONObject();
			String func_id = funcPoint.getString("func_id");
			String func_name = funcPoint.getString("func_name");
			String func_type = funcPoint.getString("func_type");
			JSONArray childs = funcPoint.getJSONArray("child");
			content.put("parent_id", parent_id);
			content.put("func_id", func_id);
			content.put("func_name", func_name);
			content.put("func_type", func_type);
			contents.add(content);
			
			setFuncPoinsts(func_id, childs, contents);
		}
	}
	
	
	
	@Override
	public String addFuncPack(JSONObject jsonObject) throws Exception {
		
		String requestContent = JSON.toJSONString(jsonObject);
		String operatePersonId = jsonObject.getString("user_id");
		jsonObject.remove("user_id");
		jsonObject.put("func_pack_id", DBConst.TABLE_FUNCTION_PACK_ID_TAG + DateUtil.getUtcTimeNow());
		
		jsonObject.put(DBConst.TABLE_FIELD_UPDATE_TIME, DateUtil.getNowTimeStr());
		jsonObject = JSONUtil.prossesParamToJsonString(jsonObject, "func_packs");
		String resultInfo = DBCommonMethods.insertRecord(DBConst.TABLE_FUNCTION_PACK, JSON.toJSONString(JSONUtil.getAddParamJson(jsonObject)));
		String operateResult = "0";
		if(resultInfo.contains(Result.SUCCESS)) {
			operateResult = "1";
		}
		//添加操作日志
		operateLogService.insertRecord(operatePersonId, DBConst.TABLE_FUNCTION_PACK, "I", "addFuncPack", requestContent, operateResult, resultInfo);
		return resultInfo;
	}

	@Override
	public String queryFuncPackById(JSONObject jsonObject) throws Exception {
		String queryResult = DBCommonMethods.getRecordBykey(DBConst.TABLE_FUNCTION_PACK, JSON.toJSONString(JSONUtil.getKeyWithMajors(jsonObject, "func_pack_id")));
		if(queryResult.contains(Result.RESULT) && queryResult.contains(Result.CONTENT)) {
			JSONObject resultJson = JSONObject.parseObject(queryResult);
			String result = resultJson.getString(Result.RESULT);
			if(Result.FAILURE.equals(result)) {
				return queryResult;
			}
			JSONArray contents = resultJson.getJSONArray(Result.CONTENT);
			JSONObject resultObj = new JSONObject();
			resultObj.put(Result.RESULT, Result.SUCCESS);
			JSONObject item = new JSONObject();
			if(contents != null && contents.size() > 0) {
				JSONObject content = contents.getJSONObject(0);
				item.put("func_pack_id", content.getString("func_pack_id"));
				item.put("func_pack_name", content.getString("func_pack_name"));
				item.put("description", content.getString("description"));
				String func_packs = content.getString("func_packs");
				 if(!StringUtil.isNull(func_packs)){
					 item.put("func_packs", JSONArray.parseArray(func_packs));
				 }
				String dataString = content.getString("create_time");
                if(!StringUtil.isNull(dataString)){
                	item.put("create_time", DateUtil.transferDateFormat(dataString, CommonMessage.dataFormat_save, CommonMessage.dataFormat_show));
                }
				resultObj.put("Item", item);
			}
			queryResult = JSON.toJSONString(resultObj);
			return queryResult;
		}
		
		return queryResult;
	}

	@Override
	public String updateFuncPackById(JSONObject jsonObject) throws Exception {
		String requestContent = JSON.toJSONString(jsonObject);
		String operatePersonId = jsonObject.getString("user_id");
		jsonObject.remove("user_id");
		jsonObject.put("update_time", DateUtil.getNowTimeStr());
		jsonObject = JSONUtil.prossesParamToJsonString(jsonObject, "func_packs");
		String resultInfo = DBCommonMethods.updateRecord(DBConst.TABLE_FUNCTION_PACK, JSON.toJSONString(JSONUtil.getUpdateParamJson(jsonObject, "func_pack_id")));
		String operateResult = "0";
		if(resultInfo.contains(Result.SUCCESS)) {
			operateResult = "1";
		}
		operateLogService.insertRecord(operatePersonId, DBConst.TABLE_FUNCTION_PACK, "U", "updateFuncPackById", requestContent, operateResult, resultInfo);
		return resultInfo;
	}

	

	
}
