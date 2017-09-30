/**
 * @包名称 com.sagacloud.service
 * @文件名 BaseService.java
 * @创建者 wanghailong
 * @邮箱 wanghailong@persagy.com  
 * @修改描述 
 */

package com.sagacloud.saas.service;

import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.UUID;

import org.apache.http.HttpEntity;
import org.apache.http.NameValuePair;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.client.methods.HttpUriRequest;
import org.apache.http.entity.ByteArrayEntity;
import org.apache.http.entity.StringEntity;
import org.apache.http.entity.mime.MultipartEntityBuilder;
import org.apache.http.entity.mime.content.ByteArrayBody;
import org.apache.http.entity.mime.content.ContentBody;
import org.apache.http.entity.mime.content.FileBody;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.util.EntityUtils;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Value;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.sagacloud.saas.common.DataRequestPathUtil;
import com.sagacloud.saas.common.DateUtil;
import com.sagacloud.saas.common.QRCodeUtil;
import com.sagacloud.saas.common.StringUtil;
import com.sagacloud.saas.common.ToolsUtil;
import com.sagacloud.saas.dao.DBConst.Result;

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

	@Value("${sop-service-basePath}")
	public String sopServiceBasePath;

	@Value("${workorder-basePath}")
	public String workorderBasePath;
	
	@Value("${work-order-engine-basePath}")
	public String woEngineBasePath;

	@Value("${work-order-engine-deveploper}")
	public String woEngineDeveloper;

	@Value("${work-order-engine-secret}")
	public String woEngineSecret;
	
	@Value("${image-service-basePath}")
	public String imageServiceBasePath;
	
//	@Value("${image-systemId}")
//	public String imageSystemId;
	
	
	@Value("${system-code}")
	public String systemCode;
	
	@Value("${image-secret}")
	public String imageSecret;
	
	@Value("${qrcode-temp-Dir}")
	public String qrCodeTempDir;
	
	@Value("${qrcode-http-address}")
	public String qrCodeHttpAddress;

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

	/**
	 * @author guosongchao
	 * @desc 功能描述：获取sop服务请求路径
	 * @param requestPath 请求路径，DataRequestPathUtil中的属性值
	 * @return
	 */
	public String getSopServicePath(String requestPath) {
		String requestUrl = null;
		if(requestPath == null || "".equals(requestPath)) {
			return requestUrl;
		} else {
			requestUrl = requestPath;
		}
		requestUrl = requestUrl.replace("BASEPATH", sopServiceBasePath);
		return requestUrl;
	}

	/**
	 * @author guosongchao
	 * @desc 功能描述：获取workOrder服务请求路径
	 * @param requestPath 请求路径，DataRequestPathUtil中的属性值
	 * @return
	 */
	public String getWorkOrderPath(String requestPath) {
		String requestUrl = null;
		if(requestPath == null || "".equals(requestPath)) {
			return requestUrl;
		} else {
			requestUrl = requestPath;
		}
		requestUrl = requestUrl.replace("BASEPATH", workorderBasePath);
		return requestUrl;
	}
	
	/**
	 *
	 * 功能描述：获取工单引擎请求路径
	 * @param requestPath  请求路径，DataRequestPathUtil中的属性值
	 * @return
	 * @创建者 wanghailong
	 * @邮箱 wanghailong@persagy.com 修改描述
	 */
	public String getWorkOrderEnginePath(String requestPath) {
		String requestUrl = null;
		if (null == requestPath || "".equals(requestPath))
			return requestUrl;
		else
			requestUrl = requestPath;
		requestUrl = requestUrl.replace("BASEPATH", woEngineBasePath);
		requestUrl = requestUrl.replace("DEVELOPER", woEngineDeveloper);
		requestUrl = requestUrl.replace("SECRET", woEngineSecret);

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
	
	
	public String getdownLoadQRCodePdfPath() {
		String filePath = qrCodeTempDir + File.separator + "pdftemp";
		return filePath;
	}
	
	
	
	
	
	
	
	public String createQRCode(String type, String id, String key){
		
		String filePath = qrCodeTempDir + File.separator + key + ".png";
		try {
			//生成二维码
			File file = new File(qrCodeTempDir);
			if(!file.exists()) {
				file.mkdirs();
			}
			String content = qrCodeHttpAddress + File.separator + type + "?objId=" + id;
			QRCodeUtil.writeToPng(content, filePath, 400, 400);
		} catch (Exception e) {
			return ToolsUtil.errorJsonMsg("二维码生成失败！");
		}
		try {
			//上传二维码
			String requestUrl = getImageServicePath(DataRequestPathUtil.image_service_image_upload, key);
			String uploadResult = httpPostUploadFile(requestUrl, filePath);
			JSONObject resultJson = JSONObject.parseObject(uploadResult);
			if(Result.FAILURE.equals(resultJson.getString(Result.RESULT))) {
				uploadResult = ToolsUtil.errorJsonMsg("二维码上传失败！");
			}
			return uploadResult;
		} catch (Exception e) {
			return ToolsUtil.errorJsonMsg("二维码上传失败！");
		}
	}
	

	/**
	 * 功能描述： 获取数据平台图实例
	 * @param project_id
	 * @param secret
	 * @param graph_type
	 * @param bound_obj_id
	 * @param time
	 * @return
	 * @throws Exception
	 */
	public JSONObject queryGraphInstance(String project_id, String secret,
			String graph_type, String bound_obj_id,
			String time) throws Exception {
		String graphInstanceUrl = getDataPlatformPath(
				DataRequestPathUtil.dataPlat_relation_graph_instance_query,
				project_id,
				secret);
		JSONObject graphInstance = null;
		JSONObject jsonObject = new JSONObject();
		JSONObject criteria = new JSONObject();
		criteria.put("graph_type", graph_type);
		if(!StringUtil.isNull(bound_obj_id)) {
			criteria.put("bound_obj_id", bound_obj_id);
		}
		criteria.put("time", time);
		jsonObject.put("criteria", criteria);
		String graphInstanceResult = httpPostRequest(graphInstanceUrl, jsonObject.toJSONString());
		JSONObject graphInstanceJson = JSONObject.parseObject(graphInstanceResult);
		if(Result.SUCCESS.equals(graphInstanceJson.getString(Result.RESULT))) {
			JSONArray graphInstanceContents = graphInstanceJson.getJSONArray(Result.CONTENT);
			if(graphInstanceContents != null && graphInstanceContents.size() > 0) {
				graphInstance = graphInstanceContents.getJSONObject(0);
			}
		}
		return graphInstance;
	}
	
	/**
	 * 功能描述： 获取数据平台的关系实例
	 * @param project_id
	 * @param secret
	 * @param from_id
	 * @param to_id
	 * @param graph_id
	 * @param rel_type
	 * @return
	 * @throws Exception 
	 */
	public JSONObject queryRelation(String project_id, String secret,
			String from_id, String to_id,
			String graph_id, String rel_type) throws Exception {
		JSONObject jsonObject = new JSONObject();
		JSONObject criteria = new JSONObject();
		criteria.put("from_id", from_id);
		criteria.put("to_id", to_id);
		criteria.put("graph_id", graph_id);
		criteria.put("rel_type", rel_type);
		jsonObject.put("criteria", criteria);
		String relationUrl = getDataPlatformPath(DataRequestPathUtil.dataPlat_relation_relation_instance_query,
				project_id,
				secret);
		JSONObject relation = null;
		String queryResult = httpPostRequest(relationUrl, jsonObject.toJSONString());
		JSONObject relationJson = JSONObject.parseObject(queryResult);
		if(Result.SUCCESS.equals(relationJson.getString(Result.RESULT))) {
			JSONArray relationContents = relationJson.getJSONArray(Result.CONTENT);
			if(relationContents != null && relationContents.size() > 0) {
				relation = relationContents.getJSONObject(0);
			}
		}
		return relation;
	}
	/**
	 * 功能描述： 获取数据平台的关系实例
	 * @param project_id
	 * @param secret
	 * @param from_id
	 * @param to_id
	 * @param graph_id
	 * @param rel_type
	 * @return
	 * @throws Exception 
	 */
	public JSONArray queryRelations(String project_id, String secret,
			String from_id, String to_id,
			String graph_id, String rel_type) throws Exception {
		JSONObject jsonObject = new JSONObject();
		JSONObject criteria = new JSONObject();
		criteria.put("from_id", from_id);
		criteria.put("to_id", to_id);
		criteria.put("graph_id", graph_id);
		criteria.put("rel_type", rel_type);
		jsonObject.put("criteria", criteria);
		String relationUrl = getDataPlatformPath(DataRequestPathUtil.dataPlat_relation_relation_instance_query,
				project_id,
				secret);
		JSONArray relations = null;
		String queryResult = httpPostRequest(relationUrl, jsonObject.toJSONString());
		JSONObject relationJson = JSONObject.parseObject(queryResult);
		if(Result.SUCCESS.equals(relationJson.getString(Result.RESULT))) {
			relations = relationJson.getJSONArray(Result.CONTENT);
		}
		return relations;
	}
	
	/**
	 * 功能描述：创建图示例
	 * @param graph_type
	 * @param project_id
	 * @param secret
	 * @return
	 * @throws Exception
	 */
	public String createGraphInstance(String graph_type, String project_id, String secret) throws Exception {
		String graph_id = "";
		JSONObject jsonObject = new JSONObject();
		jsonObject.put("graph_type", graph_type);
		String requestUrl = getDataPlatformPath(DataRequestPathUtil.dataPlat_relation_graph_instance_create, project_id, secret);
		String queryResult = httpPostRequest(requestUrl, jsonObject.toJSONString());
		JSONObject queryJson = JSONObject.parseObject(queryResult);
		if(Result.SUCCESS.equals(queryJson.getString(Result.RESULT))) {
			graph_id = queryJson.getString("graph_id");
		}
		return graph_id;
	}
	
	/**
	 * 功能描述：创建关系实例
	 * @param from_id
	 * @param to_id
	 * @param graph_id
	 * @param rel_type
	 * @param project_id
	 * @param secret
	 * @return
	 * @throws Exception
	 */
	public String createRelations(String from_id, String to_id, String graph_id,
			String rel_type, String project_id, String secret) throws Exception {
		JSONObject jsonObject = new JSONObject();
		jsonObject.put("from_id", from_id);
		jsonObject.put("to_id", to_id);
		jsonObject.put("graph_id", graph_id);
		jsonObject.put("rel_type", rel_type);
		String requestUrl = getDataPlatformPath(DataRequestPathUtil.dataPlat_relation_create, project_id, secret);
		return httpPostRequest(requestUrl, jsonObject.toJSONString());
	}
	
	
	/**
	 * 功能描述：创建关系实例
	 * @param project_id
	 * @param secret
	 * @param graph_type
	 * @param from_id
	 * @param to_id
	 * @param rel_type
	 * @return
	 * @throws Exception
	 */
	public String createGraphInstanceRelations(String project_id, String secret, String graph_type,
			String from_id, String to_id, String rel_type) throws Exception {
		String queryResult = ToolsUtil.errorJsonMsg("创建关系实例失败！");
		String graph_id = "";
		JSONObject graphInstance = queryGraphInstance(project_id, secret, graph_type, null, DateUtil.getNowTimeStr());
		if(graphInstance != null) {
			graph_id = graphInstance.getString("graph_id");
		}
		if(StringUtil.isNull(graph_id)) {
			//增加设备所在空间图实例
			graph_id = createGraphInstance(graph_type, project_id, secret);
		}
		if(!StringUtil.isNull(graph_id)) {
			//建立设备所在空间关系
			queryResult = createRelations(from_id, to_id, graph_id, rel_type, project_id, secret);
			JSONObject queryJson = JSONObject.parseObject(queryResult);
			queryResult = queryJson.toJSONString();
		}
		return queryResult;
	}
	

	/**
	 * 功能描述:批量查询物理对象
	 * @param project_id
	 * @param secret
	 * @param ids
	 * @return
	 * @throws Exception 
	 */
	public Map<String, JSONObject> queryBatchObject(
			String project_id, String secret, Set<String> ids) throws Exception {
		Map<String, JSONObject> objectMap = new HashMap<>();
		JSONObject jsonObject = new JSONObject();
		JSONArray criterias = new JSONArray();
		for(String id : ids) {
			JSONObject idParam = new JSONObject();
			idParam.put("id", id);
			criterias.add(idParam);
		}
		jsonObject.put("criterias", criterias);
		String objectUrl = getDataPlatformPath(
				DataRequestPathUtil.dataPlat_object_batch_query,
				project_id,
				secret);
		String queryResult = httpPostRequest(objectUrl, jsonObject.toJSONString());
		JSONObject objectJson = JSONObject.parseObject(queryResult);
		if(Result.SUCCESS.equals(objectJson.getString(Result.RESULT))) {
			JSONArray objectContents = objectJson.getJSONArray(Result.CONTENT);
			if(objectContents != null && objectContents.size() > 0) {
				for (int i = 0; i < objectContents.size(); i++) {
					JSONObject object = objectContents.getJSONObject(i);
					String id = object.getString("id");
					objectMap.put(id, object);
				}
			}
		}
		return objectMap;
	}


	/**
	 * 功能描述：获取物理对象的info值
	 * @param id
	 * @param objectMap
	 * @param infoKey
	 * @return
	 */
	public String getObjectInfoValue(String id, Map<String, JSONObject> objectMap, String infoKey) {
		JSONObject object = objectMap.get(id);
		String infoValue = "";
		if(object != null) {
			JSONObject infos = object.getJSONObject("infos");
			if(infos != null) {
				infoValue = infos.getString(infoKey);
			}
		}
		return infoValue;
	}
	
	
	
}
