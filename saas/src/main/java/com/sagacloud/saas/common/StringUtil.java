package com.sagacloud.saas.common;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by gsc on 17/5/16.
 */
public class StringUtil {
    /**
     * 判断String是否为null或空
     * @param params
     * @return
     */
    public static boolean isNull(String... params){
        for(String param : params){
            if(param == null || "".equals(param)){
                return true;
            }
        }
        return false;
    }

    /**
     * 判断JSONObects是否包含parmas中的字段
     * @param jsonObject
     * @param params
     * @return
     */
    public static boolean isNull(JSONObject jsonObject, String... params){
        for(String param : params){
            if(isNull(jsonObject.getString(param))){
                return true;
            }
        }
        return false;
    }

    /**
     * 判断JSONObect中时候包含parmas中字段的为空数组
     * @param jsonObject
     * @param params
     * @return
     */
    public static boolean isEmptyList(JSONObject jsonObject, String... params){
        JSONArray jsonArray;
        for(String param : params){
            jsonArray = jsonObject.getJSONArray(param);
            if(jsonArray == null || jsonArray.isEmpty()){
                return true;
            }
        }
        return false;
    }

    /**
     * 转换ID
     * @param id     ID
     * @param taget 转换目标ID标识
     * @return
     */
    public static String transferId(String id, String taget){
        Map<String, String> map = new HashMap<String, String>();
        if(id.startsWith(CommonConst.tag_project)){

        }else if(id.startsWith(CommonConst.tag_build)){
            map.put(CommonConst.tag_project, CommonConst.tag_project+ id.substring(2, id.length()-3));
        }else if(id.startsWith(CommonConst.tag_floor)){
            map.put(CommonConst.tag_project, CommonConst.tag_project+id.substring(2, id.length()-6));
            map.put(CommonConst.tag_build, CommonConst.tag_build+id.substring(2, id.length()-3));
        }else if(id.startsWith(CommonConst.tag_space)){
            map.put(CommonConst.tag_project, CommonConst.tag_project+id.substring(2, id.length()-9));
            map.put(CommonConst.tag_build, CommonConst.tag_build+id.substring(2, id.length()-6));
            map.put(CommonConst.tag_floor, CommonConst.tag_floor+id.substring(2, id.length()-3));
        }else if(id.startsWith(CommonConst.tag_equip)){
            map.put(CommonConst.tag_project, CommonConst.tag_project+id.substring(2, id.length()-12));
            map.put(CommonConst.tag_build, CommonConst.tag_build+id.substring(2, id.length()-9));
        }else if(id.startsWith(CommonConst.tag_system)){
            map.put(CommonConst.tag_project, CommonConst.tag_project+id.substring(2, id.length()-10));
            map.put(CommonConst.tag_build, CommonConst.tag_build+id.substring(2, id.length()-7));
        }
        return map.get(taget);
    }

    /**
     * 获取设备或系统的类型
     * @param id 设备、系统ID
     * @Param taget 类型标识
     * @return
     */
    public static String getEquipOrSystemCodeFromId(String id, String taget){
        Map<String, String> map = new HashMap<String, String>();
        if(id.startsWith(CommonConst.tag_equip)){
            map.put(CommonConst.tag_dict_class, id.substring(15, 17));
            map.put(CommonConst.tag_dict_equip, id.substring(17, 21));
        }else if(id.startsWith(CommonConst.tag_system)){
            map.put(CommonConst.tag_dict_class, id.substring(15, 17));
            map.put(CommonConst.tag_dict_sytstem, id.substring(17, 19));
        }
        return map.get(taget);
    }

    /**
     * 右侧补齐String长度
     * @param str
     * @param length
     * @param sign
     * @return
     */
    public static String completLengthFromRight(String str, int length, String sign){
        while(str.length() < length){
            str = str + sign;
        }
        return str;
    }
}
