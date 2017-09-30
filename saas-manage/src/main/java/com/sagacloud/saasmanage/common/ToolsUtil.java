/**
 * @包名称 com.sagacloud.common
 * @文件名 ToolsUtil.java
 * @创建者 wanghailong
 * @邮箱 wanghailong@persagy.com  
 * @修改描述 
 */

package com.sagacloud.saasmanage.common;

import java.io.UnsupportedEncodingException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.UUID;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.sagacloud.saasmanage.dao.DBConst.Result;

import sun.misc.BASE64Encoder;
import sun.misc.BASE64Encoder;

/** 
 * 功能描述： 常用工具方法
 * @类型名称 ToolsUtil
 * @创建者 wanghailong
 * @邮箱 wanghailong@persagy.com  
 * @修改描述 
 */
public class ToolsUtil {
    //返回项-缺少必填项
    public final static String return_error_json = "{\"Result\":\"failure\",\"ResultMsg\":\"缺少必填项\"}";
    public static String errorJsonMsg(String msg) {
        JSONObject jsonRes = new JSONObject();
		jsonRes.put("Result", "failure");
		jsonRes.put("ResultMsg", msg);
		return jsonRes.toString();
    }
    public static String successJsonMsg(JSONObject item) {
        JSONObject jsonRes = new JSONObject();
        jsonRes.put("Result", "success");
        jsonRes.put("Item", item);
        return jsonRes.toString();
    }
    public static String successJsonMsg(JSONArray content) {
        JSONObject jsonRes = new JSONObject();
        jsonRes.put("Result", "success");
        jsonRes.put("Content", content);
        jsonRes.put("Count", content.size());
        return jsonRes.toString();
    }
    
    
    public static String getUuid() {
    	String uuid = UUID.randomUUID().toString().replace("-","");
    	return uuid;
    }

    /**
     * 倒序排序
     * @param array
     * @return
     */
    public static JSONArray sortDesc(JSONArray array){
        JSONArray newArray = new JSONArray();
        for(int i=array.size()-1; i>-1; i--){
            newArray.add(array.get(i));
        }
        return newArray;
    }

    /**
     * 根据条件过滤数组字段
     * @param array
     * @param filterCondition
     * @return
     */
    public static JSONArray filterRemind(JSONArray array, JSONArray filterCondition){
        JSONArray newArray = new JSONArray();
        JSONObject item, newItem;
        if(array != null){
            for(int i=0; i<array.size(); i++){
                item = array.getJSONObject(i);
                newItem = new JSONObject();
                for(int j=0; j<filterCondition.size(); j++){
                    newItem.put(filterCondition.getString(j), item.get(filterCondition.getString(j)));
                }
                newArray.add(newItem);
            }
        }
        return newArray;
    }
    /**
     * 根据条件过滤数组字段
     * @param filterCondition
     * @return
     */
    public static JSONObject filterRemind(JSONObject jsonObject, JSONArray filterCondition){
    	JSONObject newItem = new JSONObject();
    	if(jsonObject != null){
			for(int j=0; j<filterCondition.size(); j++){
				newItem.put(filterCondition.getString(j), jsonObject.get(filterCondition.getString(j)));
			}
    	}
    	return newItem;
    }
    /**
     * 根据条件过滤数组字段
     * @param array
     * @param filterConditions
     * @return
     */
    public static JSONArray filterRemind(JSONArray array, String... filterConditions){
    	JSONArray newArray = new JSONArray();
    	JSONObject item, newItem;
    	if(array != null){
    		for(int i=0; i<array.size(); i++){
    			item = array.getJSONObject(i);
    			newItem = new JSONObject();
    			for(String filterCondition : filterConditions){
    				newItem.put(filterCondition, item.get(filterCondition));
    			}
    			newArray.add(newItem);
    		}
    	}
    	return newArray;
    }
    /**
     * 根据条件过滤数组字段
     * @param queryResult
     * @param filterConditions
     * @return
     */
    public static String filterRemind(String queryResult, String... filterConditions){
    	if(queryResult.contains(Result.RESULT) && queryResult.contains(Result.CONTENT)) {
    		JSONObject resultJson = JSONObject.parseObject(queryResult);
			JSONArray contents = resultJson.getJSONArray(Result.CONTENT);
			contents = filterRemind(contents, filterConditions);
			resultJson.put(Result.CONTENT, contents);
			queryResult = JSON.toJSONString(resultJson);
    	}
    	return queryResult;
    }
    /**
     * 根据条件过滤数组字段
     * @param queryResult
     * @param filterCondition
     * @return
     */
    public static String filterRemind(String queryResult, JSONArray filterCondition){
    	if(queryResult.contains(Result.RESULT) && queryResult.contains(Result.CONTENT)) {
    		JSONObject resultJson = JSONObject.parseObject(queryResult);
    		JSONArray contents = resultJson.getJSONArray(Result.CONTENT);
    		contents = filterRemind(contents, filterCondition);
    		resultJson.put(Result.CONTENT, contents);
    		queryResult = JSON.toJSONString(resultJson);
    	}
    	return queryResult;
    }

    /**
     * MD5加密
     * @param str
     * @return
     * @throws NoSuchAlgorithmException
     * @throws UnsupportedEncodingException
     */
    public static String encodeByMd5(String str) throws NoSuchAlgorithmException, UnsupportedEncodingException {
        //确定计算方法
        MessageDigest md5= MessageDigest.getInstance("MD5");
        BASE64Encoder base64en = new BASE64Encoder();
        //加密后的字符串
        String newstr=base64en.encode(md5.digest(str.getBytes("utf-8")));
        return newstr;
    }
    
}
