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

public class ObjWoRelCache extends BaseService {
    private static final Logger log = Logger.getLogger(ObjWoRelCache.class);
    //项目缓存 key:obj_id-order_type order_ids
    private static final ConcurrentHashMap<String, JSONArray> objWoRelCache = new ConcurrentHashMap<String, JSONArray>();

    public static JSONArray getOrderIdsByObjIdOrderType(String obj_id_order_type) throws Exception{
        if(objWoRelCache.get(obj_id_order_type) == null){
            synCache();
        }
        return objWoRelCache.get(obj_id_order_type);
    }


    public static void synCache() throws Exception{
        log.info("start to syn ObjWoRelCache.");
        
        Map<String, JSONArray> temp = new HashMap<>();
        JSONObject jsonObject = new JSONObject();
        jsonObject.put(DBConst.TABLE_FIELD_VALID, true);
		jsonObject = JSONUtil.getCriteriaWithMajors(jsonObject, DBConst.TABLE_FIELD_VALID); 
		String queryResult = DBCommonMethods.queryRecordByCriteria(DBConst.DATABASE_WORK_ORDER, DBConst.TABLE_OBJ_WO_REL, jsonObject.toJSONString());
		JSONObject queryJson = JSONObject.parseObject(queryResult);
		if(queryResult.contains(Result.SUCCESS) && queryResult.contains(Result.CONTENT)) {
			JSONArray queryContents = queryJson.getJSONArray(Result.CONTENT);
			if(queryContents != null && queryContents.size() > 0) {
				for (int i = 0; i < queryContents.size(); i++) {
					queryJson = queryContents.getJSONObject(i);
					String obj_id = queryJson.getString("obj_id");
					String order_type = queryJson.getString("order_type");
					if(!StringUtil.isNull(obj_id) && !StringUtil.isNull(order_type)) {
						String order_ids_str = queryJson.getString("order_ids");
						if(!StringUtil.isNull(order_ids_str)) {
							JSONArray order_ids = JSONArray.parseArray(order_ids_str);
							temp.put(obj_id + "-" + order_type, order_ids);
						}
					}
				}
			}
			log.info("Succeeded to syn ObjWoRelCache.");
		} else {
			log.info("Failure to syn ObjWoRelCache.");
		}
		objWoRelCache.clear();
		objWoRelCache.putAll(temp);
    }
}
