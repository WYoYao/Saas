package com.sagacloud.saasmanage.cache;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.sagacloud.saasmanage.dao.DBCommonMethods;
import com.sagacloud.saasmanage.dao.DBConst;

import org.apache.log4j.Logger;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

/**
 * Created by DOOM on 2017/6/21.
 */
public class DictionaryCache{
    private static final Logger log = Logger.getLogger(DictionaryCache.class);
    //数据字典缓存 key:dict_type+"-"code value:general_dictionary
    private static ConcurrentHashMap<String, JSONObject> dictCache = new ConcurrentHashMap<String, JSONObject>();

    /**
     * 根据字典类型、字典code码获取项目下字典名称
     * @param dictType
     * @param code
     * @param projectId
     * @return
     */
    public static String getNameByTypeCode(String dictType, String code, String projectId){
        if(dictCache.get(dictType + "-" + code) == null){
            synCache();
        }
        JSONObject dictionary = dictCache.get(dictType + "-" + code);
        String name = null;
        if(dictionary != null){
            name = dictionary.getString("name");
            JSONObject customerName = dictionary.getJSONObject("customer_name");
            if(customerName != null && customerName.containsKey(projectId))
                name = customerName.getString(projectId);
        }
        return name;
    }

    public static void synCache(){
        log.info("start to syn EquipTypeCache.");
        try {
            String dictStr = DBCommonMethods.queryRecordByCriteria(DBConst.TABLE_GENERAL_DICTIONARY, "{\"criteria\":{\"valid\":true}}");
            if(dictStr.contains("success")){
                JSONObject dictJson = JSONObject.parseObject(dictStr);
                JSONArray dicts = dictJson.getJSONArray("Content");
                JSONObject dict;
                Map<String, JSONObject> dictMap = new HashMap<String, JSONObject>();
                for(int i=0; i<dicts.size(); i++){
                    dict = dicts.getJSONObject(i);
                    dictMap.put(dict.getString("dict_type") + "-" + dict.getString("code"), dict);
                }
                dictCache.clear();;
                dictCache.putAll(dictMap);
            }
        } catch (Exception e) {
            log.info("syn EquipTypeCache error.");
        }
        log.info("end to syn EquipTypeCache.");
    }
}
