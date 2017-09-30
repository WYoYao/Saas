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

public class InfoComponentCache {
	private static final Logger log = Logger.getLogger(InfoComponentCache.class);
	
	//信息点组件表信息缓存
	//Key: info_cmpt_id 主键ID
	//value: info_component 对象
	public static final ConcurrentHashMap<String, JSONObject> infoComponentCache = new ConcurrentHashMap<String, JSONObject>();
	
	
	/**
	 * @desc 根据 info_cmpt_id 主键获取信息点组件表 记录
	 * @param infoCmptId
	 * @return
	 */
	public static JSONObject getInfoComponentByInfoCmptId(String infoCmptId) {
		if(!infoComponentCache.containsKey(infoCmptId)) {
			synCache();
		}
		return infoComponentCache.get(infoCmptId);
		
	}
	
	/**
	 * @desc 
	 */
	public synchronized static void synCache() {
		log.info("start to syn InfoComponentCache.");
		String queryResult = DBCommonMethods.queryAllValidRecord(DBConst.TABLE_INFO_COMPONENT);
		Map<String, JSONObject> temp = new HashMap<String, JSONObject>();
		if(queryResult.contains(Result.RESULT) && queryResult.contains(Result.CONTENT)) {
			JSONObject resultJson = JSONObject.parseObject(queryResult);
			JSONArray contents = resultJson.getJSONArray(Result.CONTENT);
			if(contents == null || contents.size() == 0) {
				return;
			}
			for (int i = 0; i < contents.size(); i++) {
				JSONObject jsonObject = contents.getJSONObject(i);
				String infoCmptId = jsonObject.getString("info_cmpt_id");
				if(!StringUtil.isNull(infoCmptId)) {
					temp.put(infoCmptId, jsonObject);
				}
			}
		}
		infoComponentCache.clear();
		infoComponentCache.putAll(temp);
		log.info("Succeeded to syn InfoComponentCache.");
	}
	
}
