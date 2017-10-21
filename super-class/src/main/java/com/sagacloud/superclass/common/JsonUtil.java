package com.sagacloud.superclass.common;

import java.util.Collections;
import java.util.Comparator;
import java.util.Date;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;

/**
 * Created by DOOM on 2017/6/16.
 */
public class JsonUtil {
    public static String getSuccessResultJson(String successMsg){
        JSONObject resultJson = JSONObject.parseObject("{}");
        resultJson.put("Result", "success");
        resultJson.put("ResultMsg", successMsg);
        return resultJson.toJSONString();
    }

    public static String getSuccessRecordJson(Object itemValue){
        JSONObject resultJson = JSONObject.parseObject("{}");
        resultJson.put("Result", "success");
        resultJson.put("Item", itemValue);
        return resultJson.toJSONString();
    }

    public static String getSuccessRecordsJson(Object itemValue, int count){
        JSONObject resultJson = JSONObject.parseObject("{}");
        resultJson.put("Result", "success");
        resultJson.put("Content", itemValue);
        resultJson.put("Count", count);
        return resultJson.toJSONString();
    }

    public static String getFailureResultJson(Object errorMsg){
        JSONObject resultJson = JSONObject.parseObject("{}");
        resultJson.put("Result", "failure");
        resultJson.put("ResultMsg", errorMsg);
        return resultJson.toJSONString();
    }
    
    /**
     * 排序
     * @param array
     * @param field  排序的字段
     * @param order      -1:倒序  1:正序
     * @return
     */
    public static JSONArray sortByIntegerField(JSONArray array, String field, int order){
    	if(array != null){
    		Collections.sort(array, new Comparator<Object>(){
    			public int compare(Object str1, Object str2){
    				JSONObject obj1 = JSONObject.parseObject(str1.toString());
    				JSONObject obj2 = JSONObject.parseObject(str2.toString());
    				String order1_Str = obj1.getString(field);
    				String order2_Str = obj2.getString(field);
    				if(StringUtil.isNull(order1_Str)) {
    					order1_Str = Integer.MIN_VALUE + "";
    				}
    				if(StringUtil.isNull(order2_Str)) {
    					order2_Str = Integer.MIN_VALUE + "";
    				}
    				
    				
    				Integer order1 = Integer.valueOf(order1_Str);
    				Integer order2 = Integer.valueOf(order2_Str);
    				
    				if(order1 > order2){
    					return order;
    				}
    				if(order1 == order2){
    					return 0;
    				}
    				return -1 * order;
    			}
    		});
    	}
    	return array;
    }
    
    /**
     * 排序
     * @param array
     * @param field  排序的字段
     * @param order      -1:倒序  1:正序
     * @return
     */
    public static JSONArray sortByDateField(JSONArray array, String field, int order){
    	if(array != null){
    		Collections.sort(array, new Comparator<Object>(){
    			public int compare(Object str1, Object str2){
    				JSONObject obj1 = JSONObject.parseObject(str1.toString());
    				JSONObject obj2 = JSONObject.parseObject(str2.toString());
    				String order1_Str = obj1.getString(field);
    				String order2_Str = obj2.getString(field);
    				try {
    					Date order1 = DateUtil.parseDate(DateUtil.sdf_time, order1_Str);
    					Date order2 = DateUtil.parseDate(DateUtil.sdf_time, order2_Str);
    					
    					if(order1.getTime() > order2.getTime()){
    						return order;
    					}
    					if(order1.getTime() == order2.getTime()){
    						return 0;
    					}
					} catch (Exception e) {
					}
    				return -1 * order;
    			}
    		});
    	}
    	return array;
    }
    
}
