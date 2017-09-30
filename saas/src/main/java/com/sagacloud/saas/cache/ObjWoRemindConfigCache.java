package com.sagacloud.saas.cache;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.sagacloud.saas.common.JSONUtil;
import com.sagacloud.saas.common.StringUtil;
import com.sagacloud.saas.dao.DBCommonMethods;
import com.sagacloud.saas.dao.DBConst;
import com.sagacloud.saas.dao.DBConst.Result;
import com.sagacloud.saas.service.BaseService;

import org.apache.log4j.Logger;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

/**
 * Created by guosongchao on 2017/8/9.
 */

public class ObjWoRemindConfigCache extends BaseService {
    private static final Logger log = Logger.getLogger(ObjWoRemindConfigCache.class);
    //项目缓存 key:project_id-obj_type value:remind_order_types
    private static final ConcurrentHashMap<String, JSONArray> objWoRemindConfigCache = new ConcurrentHashMap<String, JSONArray>();

    public static JSONArray getRemindOrderTypesByProjectIdObjType(String project_id_obj_type) throws Exception{
        return objWoRemindConfigCache.get(project_id_obj_type);
    }


    public static void synCache() throws Exception{
        log.info("start to syn ObjWoRemindConfigCache.");
        
        Map<String, JSONArray> temp = new HashMap<>();
        JSONObject jsonObject = new JSONObject();
        jsonObject.put(DBConst.TABLE_FIELD_VALID, true);
		jsonObject = JSONUtil.getCriteriaWithMajors(jsonObject, DBConst.TABLE_FIELD_VALID); 
		String queryResult = DBCommonMethods.queryRecordByCriteria(DBConst.DATABASE_NAME, DBConst.TABLE_OBJ_WO_REMIND_CONFIG, jsonObject.toJSONString());
		JSONObject queryJson = JSONObject.parseObject(queryResult);
		if(queryResult.contains(Result.SUCCESS) && queryResult.contains(Result.CONTENT)) {
			JSONArray queryContents = queryJson.getJSONArray(Result.CONTENT);
			if(queryContents != null && queryContents.size() > 0) {
				for (int i = 0; i < queryContents.size(); i++) {
					queryJson = queryContents.getJSONObject(i);
					String project_id = queryJson.getString("project_id");
					String obj_type = queryJson.getString("obj_type");
					if(!StringUtil.isNull(project_id) && !StringUtil.isNull(obj_type)) {
						
						String remind_order_types_str = queryJson.getString("remind_order_types");
						if(!StringUtil.isNull(remind_order_types_str)) {
							JSONArray remind_order_types = JSONArray.parseArray(remind_order_types_str);
							temp.put(project_id + "-" + obj_type, remind_order_types);
						}
					}
				}
			}
			log.info("Succeeded to syn ObjWoRemindConfigCache.");
		} else {
			log.info("Failure to syn ObjWoRemindConfigCache.");
		}
		objWoRemindConfigCache.clear();
		objWoRemindConfigCache.putAll(temp);
    }
}
