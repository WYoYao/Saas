package com.sagacloud.saas.cache;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.sagacloud.saas.common.CommonMessage;
import com.sagacloud.saas.common.DataRequestPathUtil;
import com.sagacloud.saas.common.JSONUtil;
import com.sagacloud.saas.common.StringUtil;
import com.sagacloud.saas.dao.DBCommonMethods;
import com.sagacloud.saas.dao.DBConst;
import com.sagacloud.saas.dao.DBConst.Result;
import com.sagacloud.saas.service.BaseService;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

/**
 * Created by guosongchao on 2017/8/9.
 */

public class CustomerCache extends BaseService {
    private static final Logger log = Logger.getLogger(CustomerCache.class);
    //项目缓存 key:project_id value:Customer
    private static final ConcurrentHashMap<String, JSONObject> customerCache = new ConcurrentHashMap<String, JSONObject>();

    public static JSONObject getCustomerByProjectId(String projectId) throws Exception{
        if(customerCache.get(projectId) == null){
            synCache();
        }
        return customerCache.get(projectId);
    }


    public static void synCache() throws Exception{
        log.info("start to syn customerCache.");
        
        Map<String, JSONObject> temp = new HashMap<>();
        JSONObject jsonObject = new JSONObject();
		jsonObject.put(DBConst.TABLE_FIELD_VALID, true);
		jsonObject = JSONUtil.getCriteriaWithMajors(jsonObject, DBConst.TABLE_FIELD_VALID);
		String queryResult = DBCommonMethods.queryRecordByCriteria(DBConst.TABLE_CUSTOMER, jsonObject.toJSONString());
		if(queryResult.contains(Result.SUCCESS) && queryResult.contains(Result.CONTENT)) {
			JSONObject resultJson = JSONObject.parseObject(queryResult);
			JSONArray queryContents = resultJson.getJSONArray(Result.CONTENT);
			if(queryContents != null && queryContents.size() > 0) {
				for (int i = 0; i < queryContents.size(); i++) {
					resultJson = queryContents.getJSONObject(i);
					String project_id = resultJson.getString("project_id");
					if(!StringUtil.isNull(project_id)) {
						temp.put(project_id, resultJson);
					}
					
				}
			}
			log.info("Succeeded to syn customerCache.");
		} else {
			log.info("Failure to syn customerCache.");
		}
		customerCache.clear();
		customerCache.putAll(temp);
    }
}
