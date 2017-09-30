package com.sagacloud.saasmanage.resource;

import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.Reader;

import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.springframework.beans.factory.annotation.Autowired;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.sagacloud.json.JSONValue;
import com.sagacloud.saasmanage.common.DateUtil;
import com.sagacloud.saasmanage.common.JSONUtil;
import com.sagacloud.saasmanage.common.StringUtil;
import com.sagacloud.saasmanage.common.ToolsUtil;
import com.sagacloud.saasmanage.dao.DBCommonMethods;
import com.sagacloud.saasmanage.dao.DBConst.Result;
import com.sagacloud.saasmanage.service.GeneralDictServiceI;

/**
 * @desc 
 * @author gezhanbin
 *
 */
@Path("/restGeneralDictService")
public class RestGeneralDictService {

	@Autowired
	private GeneralDictServiceI generalDictService;
	
	/**
	 * @desc 数据字典:字典类型
	 * @param jsonStr
	 * @return
	 * @throws Exception 
	 */
	@POST
	@Path("/queryGeneralDictByKey")
	@Produces(MediaType.APPLICATION_JSON)
	public String queryGeneralDictByKey(String jsonStr) throws Exception {
		//读取参数
    	JSONObject jsonObject = JSONObject.parseObject(jsonStr);
		//必填验证
		if(!StringUtil.isNull(jsonObject, "user_id","dict_type")){
			//调用数据接口
			return generalDictService.queryGeneralDictByKey(jsonObject);
		}else{
			return ToolsUtil.return_error_json;
		}
	}
	
	/**
	 * @desc 数据字典:字典类型(后台内部使用)
	 * @param jsonStr
	 * @return
	 */
	@POST
	@Path("/queryGeneralDictByDictType")
	@Produces(MediaType.APPLICATION_JSON)
	public String queryGeneralDictByDictType(String jsonStr) {
		//读取参数
    	JSONObject jsonObject = JSONObject.parseObject(jsonStr);
		//必填验证
		if(!StringUtil.isNull(jsonObject, "user_id","dict_type")){
			//调用数据接口
			return generalDictService.queryGeneralDictByDictType(jsonObject);
		}else{
			return ToolsUtil.return_error_json;
		}
	}
	/**
	 * @desc 数据字典:添加字典类型
	 * @param jsonStr
	 * @return
	 */
	@POST
	@Path("/addGeneralDict")
	@Produces(MediaType.APPLICATION_JSON)
	public String addGeneralDict(String jsonStr) {
		//读取参数
//		JSONObject jsonObject = JSONObject.parseObject(jsonStr);
//		//必填验证
//		if(!StringUtil.isNull(jsonObject, "user_id","dict_type","code","name")){
//			//调用数据接口
//			return generalDictService.addGeneralDict(jsonObject);
//		}else{
//			return ToolsUtil.return_error_json;
//		}
		JSONObject result = new JSONObject();
		result.put(Result.RESULT, Result.SUCCESS);
		result.put(Result.RESULTMSG, "添加成功");
		
		
		InputStream in = Thread.currentThread().getContextClassLoader().getResourceAsStream("general_dictionary.json");
		Reader reader = new InputStreamReader(in);
		String contentStr = JSONValue.parse(reader).toString();
		JSONArray contents = JSONArray.parseArray(contentStr);
		if(contents != null && contents.size() > 0) {
			JSONObject remove = new JSONObject();
			remove.put("criteria", new JSONObject());
			DBCommonMethods.deleteRecord("general_dictionary", remove.toJSONString());
			for (int i = 0; i < contents.size(); i++) {
				JSONObject content = contents.getJSONObject(i);
				String dict_type = content.getString("dict_type");
				JSONArray codes = content.getJSONArray("codes");
				if(codes != null && codes.size() > 0) {
					for (int j = 0; j < codes.size(); j++) {
						JSONObject codeObj = codes.getJSONObject(j);
						String code = codeObj.getString("code");
						String name = codeObj.getString("name");
						String description = codeObj.getString("description");
						JSONObject jsonObject = new JSONObject();
						jsonObject.put("dict_id", "" + DateUtil.getUtcTimeNow());
						jsonObject.put("dict_type", dict_type);
						jsonObject.put("code", code);
						jsonObject.put("name", name);
						if(!StringUtil.isNull(description)) {
							jsonObject.put("description", description);
						}
						jsonObject.put("default_use", true);
						jsonObject.put("update_time", DateUtil.getNowTimeStr());
//						jsonObject.put("create_time", DateUtil.getNowTimeStr());
//						jsonObject.put("valid", true);
//						dictionarys.add(jsonObject);
						jsonObject = JSONUtil.getAddParamJson(jsonObject);
						DBCommonMethods.insertRecord("general_dictionary", jsonObject.toJSONString());
					}
				}
			}
			
		}
		
		return result.toJSONString();
	}
	
	
	
	
}
