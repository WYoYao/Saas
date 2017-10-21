package com.sagacloud.superclass.service.impl;

import java.io.ByteArrayOutputStream;
import java.io.FileInputStream;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.apache.http.NameValuePair;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.client.methods.HttpUriRequest;
import org.apache.http.entity.ByteArrayEntity;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.util.EntityUtils;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Value;

import com.alibaba.fastjson.JSONObject;
import com.sagacloud.superclass.common.ToolsUtil;

/**
 * 功能描述：
 * 
 * @类型名称 BaseService
 * @创建者 wanghailong
 * @邮箱 wanghailong@persagy.com
 * @修改描述
 */
//@Service("baseService")
public class BaseService {
	
	@Value("${sms-platform-basePath}")
	public String smsPlatBasePath;
	
	@Value("${sms-platform-appCode}")
	public String smsPlatAppCode;

	
	@Value("${image-service-basePath}")
	public String imageServiceBasePath;
	
	@Value("${system-code}")
	public String systemCode;
	
	@Value("${image-secret}")
	public String imageSecret;
	

	private static final Logger log = Logger.getLogger(BaseService.class);
	/**
	 * 
	 * 功能描述：http请求，Json类型参数
	 * 
	 * @param url
	 * @param params
	 * @return
	 * @throws Exception
	 * @创建者 wanghailong
	 * @邮箱 wanghailong@persagy.com 修改描述
	 */
	public String httpPostRequest(String url, Map<String, String> params) throws Exception {
		log.info("请求数据平台post："+url);
		log.info(params);
		String respContent = null;
		CloseableHttpClient httpclient = HttpClients.createDefault();
		HttpPost httpPost = new HttpPost(url);
		httpPost.addHeader("Content-Type", "application/json;charset=utf-8");
		// 设置请求的的参数
		JSONObject jsonParam = new JSONObject();
		Set<String> keySet = params.keySet();
		for (String key : keySet) {
			jsonParam.put(key, params.get(key));
		}
		httpPost.setEntity(new StringEntity(jsonParam.toString(), "utf-8"));
		// 执行请求
		respContent = executeHttpRequest(httpclient, httpPost);
		log.info(respContent);
		return respContent;
	}
	
	/**
	 * 
	 * 功能描述：http请求，Json类型参数
	 * 
	 * @param url
	 * @param params
	 * @return
	 * @throws Exception
	 * @创建者 wanghailong
	 * @邮箱 wanghailong@persagy.com 修改描述
	 */
	public String httpPostUploadFile(String url, String filePath) throws Exception {
		log.info("请求数据平台post："+url);
		String respContent = null;
		CloseableHttpClient httpclient = HttpClients.createDefault();
		HttpPost httpPost = new HttpPost(url);
		httpPost.addHeader("Content-Type", "application/octet-stream;charset=utf-8");
		// 设置请求的的参数
		InputStream in = new FileInputStream(filePath);
		byte[] bytes = new byte[in.available()];
		in.read(bytes);
		httpPost.setEntity(new ByteArrayEntity(bytes));
		// 执行请求
		respContent = executeHttpRequest(httpclient, httpPost);
		log.info(respContent);
		if(in != null) {
			in.close();
		}
		return respContent;
	}

	/**
	 * 功能描述：http请求，Json类型参数
	 * 
	 * @param url
	 * @param jsonStr
	 * @return
	 * @throws Exception
	 * @创建者 wanghailong
	 * @邮箱 wanghailong@persagy.com 修改描述
	 */
	public String httpPostRequest(String url, String jsonStr) throws Exception {
		log.info("请求数据平台post："+url);
		log.info(jsonStr);
		String respContent = null;
		CloseableHttpClient httpclient = HttpClients.createDefault();
		HttpPost httpPost = new HttpPost(url);
		httpPost.addHeader("Content-Type", "application/json;charset=utf-8");
		httpPost.setEntity(new StringEntity(jsonStr, "utf-8"));
		// 执行请求
		respContent = executeHttpRequest(httpclient, httpPost);
		log.info(respContent);
		return respContent;
	}

	/**
	 * 
	 * 功能描述：：http请求，非Json类型参数，参数直接是'&'间隔的
	 * 
	 * @param url
	 * @param params
	 * @return
	 * @throws Exception
	 * @创建者 wanghailong
	 * @邮箱 wanghailong@persagy.com 修改描述
	 */
	@Deprecated
	public String httpPostWithListParams(String url, Map<String, String> params) throws Exception {
		String respContent = null;
		CloseableHttpClient httpclient = HttpClients.createDefault();
		HttpPost httpPost = new HttpPost(url);
		httpPost.addHeader("Content-Type", "application/json;charset=utf-8");
		// 设置请求的的参数
		List<NameValuePair> nvps = new ArrayList<NameValuePair>();
		// 参数 jsonArray形式
		Set<String> keySet = params.keySet();
		for (String key : keySet) {
			nvps.add(new BasicNameValuePair(key, params.get(key)));
		}
		httpPost.setEntity(new UrlEncodedFormEntity(nvps, "utf-8"));
		// 执行请求
		respContent = executeHttpRequest(httpclient, httpPost);
		log.info(respContent);
		return respContent;
	}

	public String httpGetRequest(String url) throws Exception {
		log.info("请求数据平台get："+url);
		String respContent = null;
		CloseableHttpClient httpclient = HttpClients.createDefault();
		HttpGet httpget = new HttpGet(url);
		// 执行请求
		respContent = executeHttpRequest(httpclient, httpget);
		log.info(respContent);
		return respContent;
	}
	public InputStream httpGetFileRequest(String url) throws Exception {
		log.info("请求数据平台get："+url);
		CloseableHttpClient httpclient = HttpClients.createDefault();
		HttpGet httpget = new HttpGet(url);
		// 执行请求
		CloseableHttpResponse response;
		InputStream inputStream = null;
		try {
			response = httpclient.execute(httpget);
			inputStream = response.getEntity().getContent();
		} catch (Exception e) {
			log.info("获取失败："+url);
			log.info(e.getMessage());
		}
		return inputStream;
	}
	public byte[] httpGetFileRequestByte(String url) throws Exception {
		log.info("请求数据平台get："+url);
		CloseableHttpClient httpclient = HttpClients.createDefault();
		HttpGet httpget = new HttpGet(url);
		// 执行请求
		CloseableHttpResponse response;
		InputStream inputStream = null;
		byte[] contents = null;
		try {
			response = httpclient.execute(httpget);
			inputStream = response.getEntity().getContent();
			contents = readStream(inputStream);
		} catch (Exception e) {
			log.info("获取失败："+url);
			log.info(e.getMessage());
		}
		return contents;
	}
	
	public byte[] readStream(InputStream inStream) throws Exception {  
        ByteArrayOutputStream outSteam = new ByteArrayOutputStream();  
        byte[] buffer = new byte[1024];  
        int len = -1;  
        while ((len = inStream.read(buffer)) != -1) {  
            outSteam.write(buffer, 0, len);  
        }  
        outSteam.close();  
        inStream.close();  
        return outSteam.toByteArray();  
    }  

	/**
	 * 执行http请求
	 * @param httpClient
	 * @param httpRequest
	 * @return
	 */
	private String executeHttpRequest(CloseableHttpClient httpClient, HttpUriRequest httpRequest){
		CloseableHttpResponse response;
		String respContent = null;
		try {
			response = httpClient.execute(httpRequest);
			respContent = EntityUtils.toString(response.getEntity(), "utf-8");
		} catch (Exception e) {
		}finally {
			if(respContent == null || respContent.startsWith("<")){
				respContent = ToolsUtil.errorJsonMsg("请求异常" + respContent);
			}
		}
		return respContent;
	}


   /**
    * 
    * 功能描述：：获取短信平台请求路径
    * @param requestPath 请求路径，DataRequestPathUtil中的属性值
    * @return 
    * @创建者 wanghailong
    * @邮箱 wanghailong@persagy.com 
    * 修改描述
    */
	public String getSmsPlatformPath(String requestPath) {
		String requestUrl = null;
		if (null == requestPath || "".equals(requestPath))
			return requestUrl;
		else
			requestUrl = requestPath;
		requestUrl = requestUrl.replace("BASEPATH", smsPlatBasePath);
		requestUrl = requestUrl.replace("APPCODE", smsPlatAppCode);
		return requestUrl;
	}
	/**
	 *
	 * 功能描述：获取图文请求路径
	 * @param requestPath  请求路径，DataRequestPathUtil中的属性值
	 * @return
	 * @创建者 wanghailong
	 * @邮箱 wanghailong@persagy.com 修改描述
	 */
	public String getImageServicePath(String requestPath,String key) {
		String requestUrl = null;
		if (null == requestPath || "".equals(requestPath))
			return requestUrl;
		else
			requestUrl = requestPath;
		requestUrl = requestUrl.replace("BASEPATH", imageServiceBasePath);
		if(requestUrl.contains("SYSTEMID")) {
			requestUrl = requestUrl.replace("SYSTEMID", systemCode);
		}
		if(requestUrl.contains("SECRET")) {
			requestUrl = requestUrl.replace("SECRET", imageSecret);
		}
		if(requestUrl.contains("KEY")) {
			requestUrl = requestUrl.replace("KEY", key);
		}
		
		return requestUrl;
	}
	
	
}
