package com.sagacloud.saasmanage.cache;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.sagacloud.saasmanage.common.CommonMessage;
import com.sagacloud.saasmanage.common.JSONUtil;
import com.sagacloud.saasmanage.dao.DBCommonMethods;
import com.sagacloud.saasmanage.dao.DBConst;

import org.apache.log4j.Logger;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

/**
 * Created by guosongchao on 2017/8/9.
 */
public class BuildingCache {
    private static final Logger log = Logger.getLogger(BuildingCache.class);
    //建筑缓存 key:customer_id value:List<Building>
    private static ConcurrentHashMap<String, JSONArray> customBuildingCache = new ConcurrentHashMap<String, JSONArray>();

    /**
     * 根据客户ID查询客户项目下的建筑信息
     * @param customerId 客户ID
     * @param refresh 刷新标记 当获取客户列表时只在开始时刷新一遍
     * @return
     */
    public static JSONArray getBuildingsByCustomerId(String customerId, boolean refresh){
        if(refresh)
            synCache();
        return customBuildingCache.get(customerId);
    }

    public static void synCache(){
        log.info("start to syn buildingCache.");
        try {
            String buildingStr = DBCommonMethods.queryRecordByCriteria(DBConst.TABLE_BUILDING, "{\"criteria\":{\"valid\":true}}");
            if(buildingStr.contains("success")){
                buildingStr = JSONUtil.prossesResultToDateString(buildingStr, CommonMessage.dataFormat_save, CommonMessage.dataFormat_show, "create_time");
                JSONObject buildingResJson = JSONObject.parseObject(buildingStr);
                JSONArray buildings = buildingResJson.getJSONArray("Content");
                if(buildings != null){
                    Map<String, JSONArray> customerBuildingMap = new HashMap<String, JSONArray>();
                    JSONObject building;
                    JSONArray customerBuildings;
                    String customerId;
                    for(int i=0; i<buildings.size(); i++){
                        building = buildings.getJSONObject(i);
                        customerId = building.getString("customer_id");
                        if(customerId == null)
                            continue;
                        //客户建筑缓存
                        customerBuildings = customerBuildingMap.get(customerId);
                        if(customerBuildings == null){
                            customerBuildings = new JSONArray();
                        }
                        customerBuildings.add(building);
                        customerBuildingMap.put(customerId, customerBuildings);
                    }
                    customBuildingCache.putAll(customerBuildingMap);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        log.info("Succeeded to syn buildingCache.");
    }
}
