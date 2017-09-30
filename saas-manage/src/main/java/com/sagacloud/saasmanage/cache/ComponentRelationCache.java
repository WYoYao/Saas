package com.sagacloud.saasmanage.cache;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.apache.log4j.Logger;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.sagacloud.saasmanage.common.StringUtil;
import com.sagacloud.saasmanage.dao.DBCommonMethods;
import com.sagacloud.saasmanage.dao.DBConst;
import com.sagacloud.saasmanage.dao.DBConst.Result;

public class ComponentRelationCache {
	private static final Logger log = Logger.getLogger(ComponentRelationCache.class);
	//组件关系表信息缓存   
	//Key:base_cmpt_code 原始组件编码  
	//value：component_relation 对象
	public static final ConcurrentHashMap<String, JSONObject> componentRelationCache = new ConcurrentHashMap<String, JSONObject>();
	
	
	/**
	 * @desc 根据  原始组件编码    查询单个对应关系记录
	 * @param baseCmptCode
	 * @return
	 */
	public static JSONObject getComponentRelationByBaseCmptCode(String baseCmptCode) {
		if(!componentRelationCache.containsKey(baseCmptCode)) {
			synCache();
		}
		return componentRelationCache.get(baseCmptCode);
	}
	
	public synchronized static void synCache() {
		log.info("start to syn ComponentRelationCache.");
		String queryResult = DBCommonMethods.queryAllValidRecord(DBConst.TABLE_COMPONENT_RELATION);
		Map<String, JSONObject> temp = new HashMap<String, JSONObject>();
		if(queryResult.contains(Result.RESULT) && queryResult.contains(Result.CONTENT)) {
			JSONObject resultJson = JSONObject.parseObject(queryResult);
			JSONArray contents = resultJson.getJSONArray(Result.CONTENT);
			if(contents == null || contents.size() == 0) {
				return;
			}
			for (int i = 0; i < contents.size(); i++) {
				JSONObject jsonObject = contents.getJSONObject(i);
				String baseCmptCode = jsonObject.getString("base_cmpt_code");
				if(!StringUtil.isNull(baseCmptCode)) {
					temp.put(baseCmptCode, jsonObject);
				}
			}
		}
		componentRelationCache.clear();
		componentRelationCache.putAll(temp);
		
		
		log.info("Succeeded to syn ComponentRelationCache.");
	}
	
	
}
