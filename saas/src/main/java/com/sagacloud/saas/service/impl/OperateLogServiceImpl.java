/**
 * @包名称 com.sagacloud.service
 * @文件名 OperateLogServiceImpl.java
 * @创建者 wanghailong
 * @邮箱 wanghailong@persagy.com  
 * @修改描述 
 */

package com.sagacloud.saas.service.impl;

import com.alibaba.fastjson.JSONObject;
import com.sagacloud.saas.common.DateUtil;
import com.sagacloud.saas.common.JSONUtil;
import com.sagacloud.saas.dao.DBCommonMethods;
import com.sagacloud.saas.dao.DBConst;
import com.sagacloud.saas.service.OperateLogServiceI;

import org.springframework.stereotype.Service;

/** 
 * 功能描述： 日志操作服务类
 * @类型名称 OperateLogServiceImpl
 * @创建者 wanghailong
 * @邮箱 wanghailong@persagy.com  
 * @修改描述 
 */
@Service("operateLogService")
public class OperateLogServiceImpl implements OperateLogServiceI {

	public String insertRecord(String operatePersonId, String tableName, String operateType, String requestMethod, String requestContent, String operateResult, String resultContent) throws Exception {
		JSONObject jsonObject = new JSONObject();
		jsonObject.put("log_id", DBConst.TABLE_LOG_ID_TAG+ DateUtil.getUtcTimeNow());
		jsonObject.put("operate_person_id", operatePersonId);
		jsonObject.put("table_name", tableName);
		jsonObject.put("operate_type", operateType);
		jsonObject.put("request_method", requestMethod);
		jsonObject.put("request_content", requestContent);
		jsonObject.put("operate_time", DateUtil.getNowTimeStr());
		jsonObject.put("operate_result", operateResult);
		jsonObject.put("result_content", resultContent);
		return DBCommonMethods.insertRecord(DBConst.TABLE_OPERATE_LOG, JSONUtil.getAddParamJson(jsonObject).toJSONString());
	}

	public String queryRecordByCondition(String jsonStr) throws Exception {
		String resultStr = DBCommonMethods.queryRecordByCriteria(DBConst.TABLE_OPERATE_LOG, JSONUtil.getCriteriaWithMajors(JSONObject.parseObject(jsonStr), "operate_person_id", "table_name", "operate_type", "operate_time").toJSONString());
		return JSONUtil.prossesResultToJsonString(resultStr, "request_content", "result_content");
	}
}
