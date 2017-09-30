package com.sagacloud.saas.cache;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.sagacloud.saas.dao.DBCommonMethods;
import com.sagacloud.saas.dao.DBConst;
import com.sagacloud.saas.service.DictionaryServiceI;

import org.apache.log4j.Logger;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

/**
 * Created by DOOM on 2017/9/7.
 */
public class DictionaryCache {
    private static final Logger log = Logger.getLogger(DictionaryCache.class);
    //设备类型缓存 key:设备类型Code value:设备类型名称
    public static ConcurrentHashMap<String, String> equipTypeCache = new ConcurrentHashMap<String, String>();
    //设备类型缓存 key:设备类型Code value:设备类型名称
    public static ConcurrentHashMap<String, String> clazzEquipTypeCache = new ConcurrentHashMap<String, String>();
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

    /**
     * 根据专业Code+设备类型Code获取设备类型名称
     * @param code
     * @return
     */
    public static String getEquipTypeName(String code, DictionaryServiceI dictionaryService){
        if(!equipTypeCache.containsKey(code)){
            synCache();
        }
        return equipTypeCache.get(code);
    }

    public static void synCache(){
        log.info("start to syn DictionaryCache.");
        try {
            String dictStr = DBCommonMethods.queryRecordByCriteria(DBConst.DATABASE_NAME, DBConst.TABLE_GENERAL_DICTIONARY, "{\"criteria\":{\"valid\":true}}");
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
            log.info("syn DictionaryCache error.");
        }
        log.info("end to syn DictionaryCache.");
    }
}
