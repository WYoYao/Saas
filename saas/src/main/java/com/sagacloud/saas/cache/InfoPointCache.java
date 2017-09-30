package com.sagacloud.saas.cache;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.sagacloud.saas.dao.DBCommonMethods;
import com.sagacloud.saas.dao.DBConst;

import org.apache.log4j.Logger;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

/**
 * Created by DOOM on 2017/9/7.
 */
public class InfoPointCache {
    private static final Logger log = Logger.getLogger(InfoPointCache.class);
    //数据字典缓存 key:info_cmpt_id value:infoPoint
    private static ConcurrentHashMap<String, JSONObject> infoPointCache = new ConcurrentHashMap<String, JSONObject>();

    /**
     * 判断信息点是否在APP显示
     * @param infoCmptId
     * @return
     */
    public static boolean isShowInApp(String infoCmptId){
        if(infoPointCache.get(infoCmptId) == null){
            synCache();
        }
        boolean isShowInApp = true;
        JSONObject infoPoint = infoPointCache.get(infoCmptId);
        if(infoPoint != null){
            String appShowFlag = infoPoint.getString("app_show_flag");
            if(!"1".equals(appShowFlag))
                isShowInApp = false;
        }

        return isShowInApp;
    }
    
    /**
     * 判断信息点是否在Saas显示
     * @param infoCmptId
     * @return
     */
    public static boolean isShowInSaas(String infoCmptId){
    	if(infoPointCache.get(infoCmptId) == null){
    		synCache();
    	}
    	boolean isShowInSaaa = true;
    	JSONObject infoPoint = infoPointCache.get(infoCmptId);
    	if(infoPoint != null){
    		String saasShowFlag = infoPoint.getString("saas_show_flag");
    		if(!"1".equals(saasShowFlag))
    			isShowInSaaa = false;
    	}
    	
    	return isShowInSaaa;
    }

    public static void synCache(){
        log.info("start to syn infoPointCache.");
        try {
            String infoPointStr = DBCommonMethods.queryRecordByCriteria(DBConst.DATABASE_NAME, DBConst.TABLE_INFO_COMPONENT, "{\"criteria\":{\"valid\":true}}");
            if(infoPointStr.contains("success")){
                JSONObject infoPointJson = JSONObject.parseObject(infoPointStr);
                JSONArray infoPoints = infoPointJson.getJSONArray("Content");
                JSONObject infoPoint;
                Map<String, JSONObject> infoPointMap = new HashMap<String, JSONObject>();
                for(int i=0; i<infoPoints.size(); i++){
                    infoPoint = infoPoints.getJSONObject(i);
                    infoPointMap.put(infoPoint.getString("info_cmpt_id"), infoPoint);
                }
                infoPointCache.clear();;
                infoPointCache.putAll(infoPointMap);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        log.info("Succeeded to syn infoPointCache.");
    }
}
