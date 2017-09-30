/**
 * @包名称 com.sagacloud.service
 * @文件名 BaseService.java
 * @创建者 wanghailong
 * @邮箱 wanghailong@persagy.com  
 * @修改描述 
 */

package com.sagacloud.saasmanage.service;

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
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.util.EntityUtils;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Value;

import com.sagacloud.json.JSONObject;
import com.sagacloud.saasmanage.common.ToolsUtil;

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
	@Value("${data-platform-basePath}")
	public String dataPlatBasePath;

	@Value("${data-platform-default-secret}")
	public String dataPlatDefaultSecret;
	
	@Value("${sms-platform-basePath}")
	public String smsPlatBasePath;
	
	@Value("${sms-platform-appCode}")
	public String smsPlatAppCode;
	
	
	@Value("${person-service-basePath}")
	public String personServiceBasePath;

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
			respContent = ToolsUtil.errorJsonMsg("请求异常");
		}finally {
			if(respContent == null || respContent.startsWith("<")){
				respContent = ToolsUtil.errorJsonMsg("请求异常");
			}
		}
		return respContent;
	}

	  /**
	    *
	    * 功能描述：：获取数据平台请求路径
	    * @param requestPath 请求路径，DataRequestPathUtil中的属性值
	    * @return
	    * @创建者 wanghailong
	    * @邮箱 wanghailong@persagy.com
	    * 修改描述
	    */
		public String getDataPlatformPath(String requestPath) {
			String requestUrl = null;
			if (null == requestPath || "".equals(requestPath))
				return requestUrl;
			else
				requestUrl = requestPath;
			requestUrl = requestUrl.replace("BASEPATH", dataPlatBasePath);
			requestUrl = requestUrl.replace("SECRET", dataPlatDefaultSecret);
			return requestUrl;
		}
		/**
		 *
		 * 功能描述：获取数据平台-数据字典请求路径
		 * @param requestPath
		 * @param param 数据字典编码
		 * @return
		 * @创建者 wanghailong
		 * @邮箱 wanghailong@persagy.com
		 * 修改描述
		 */
		public String getDataPlatDictPath(String requestPath , String param) {
			String requestUrl = null;
			if (null == requestPath || "".equals(requestPath))
				return requestUrl;
			else
				requestUrl = requestPath;
			requestUrl = requestUrl.replace("BASEPATH", dataPlatBasePath);
			if(null != param && !"".equals(param)){
				requestUrl = requestUrl.replace("PARAM", param);
			}
			return requestUrl;
		}
	/**
	 *
	 * 功能描述：获取数据平台请求路径
	 * @param requestPath  请求路径，DataRequestPathUtil中的属性值
	 * @param projectId 项目Id，项目相关请求，path中可以不带该参数
	 * @param secret 秘钥，项目相关请求可以使用默认秘钥，其它请求需要projectId和secret匹配
	 * @return
	 * @创建者 wanghailong
	 * @邮箱 wanghailong@persagy.com 修改描述
	 */
	public String getDataPlatformPath(String requestPath, String projectId, String secret) {
		String requestUrl = null;
		if (null == requestPath || "".equals(requestPath))
			return requestUrl;
		else
			requestUrl = requestPath;
		requestUrl = requestUrl.replace("BASEPATH", dataPlatBasePath);
		if (null != projectId && !"".equals(projectId)) {
			requestUrl = requestUrl.replace("PROJECTID", projectId);
		}
		if (null != secret && !"".equals(secret)) {
			requestUrl = requestUrl.replace("SECRET", secret);
		} else {
			requestUrl = requestUrl.replace("SECRET", dataPlatDefaultSecret);
		}
		return requestUrl;
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
		 * @author gezhanbin
		 * @desc 功能描述：获取人员信息服务请求路径
		 * @param requestPath 请求路径，DataRequestPathUtil中的属性值
		 * @return
		 */
		public String getPersonServicePath(String requestPath) {
			String requestUrl = null;
			if(requestPath == null || "".equals(requestPath)) {
				return requestUrl;
			} else {
				requestUrl = requestPath;
			}
			requestUrl = requestUrl.replace("BASEPATH", personServiceBasePath);
			return requestUrl;
		}
		
}
