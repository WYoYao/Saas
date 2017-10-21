package com.sagacloud.superclass.common;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;

import java.util.HashMap;
import java.util.Map;
import java.util.Random;

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
     * 判断JSONObects是否包含parmas中的字段
     * @param jsonObject
     * @param params
     * @return
     */
    public static boolean isExist(JSONObject jsonObject, String... params){
        for(String param : params){
            if(jsonObject.containsKey(param)){
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
     * 右侧补齐String长度
     * @param str
     * @param length
     * @param sign
     * @return
     */
    public static String completLengthFromRight(String str, int length, String sign){
        if(str == null)
            str = "";
        while(str.length() < length){
            str = str + sign;
        }
        return str;
    }

}
