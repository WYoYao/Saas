/**
 * @包名称 com.sagacloud.common
 * @文件名 ToolsUtil.java
 * @创建者 wanghailong
 * @邮箱 wanghailong@persagy.com  
 * @修改描述 
 */

package com.sagacloud.superclass.common;

import java.io.UnsupportedEncodingException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.UUID;

import com.alibaba.fastjson.JSONObject;

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
    public static String getUuid() {
    	String uuid = UUID.randomUUID().toString().replace("-","");
    	return uuid;
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
