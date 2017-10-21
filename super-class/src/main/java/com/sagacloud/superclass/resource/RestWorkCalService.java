package com.sagacloud.superclass.resource;

import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import com.alibaba.fastjson.JSONObject;
import com.sagacloud.superclass.common.StringUtil;
import com.sagacloud.superclass.common.ToolsUtil;
import com.sagacloud.superclass.service.WorkCalServiceI;

/**
 * 功能描述：工作历
 * @author gezhanbin
 *
 */
@Path("/restWorkCalService")
public class RestWorkCalService {
	
	private WorkCalServiceI workCalServiceI;
	
	/**
     * 
     * 功能描述：工作历-查询未生效的排班
     * @param jsonStr
     * @return
     * @throws Exception 
     * 修改描述
     */
    @POST
    @Path("/queryInvalidSchedule")
    @Produces(MediaType.APPLICATION_JSON)
    public String queryInvalidSchedule(String jsonStr) {
    	JSONObject jsonObject = JSONObject.parseObject(jsonStr);
    	if(StringUtil.isNull(jsonObject, "userId","teamId")) {
    		return ToolsUtil.return_error_json;
    	}
    	return workCalServiceI.queryInvalidSchedule(jsonObject);
    }
    
    /**
     * 
     * 功能描述：工作历-查询指定人某月的工作日历
     * @param jsonStr
     * @return
     * @throws Exception 
     * 修改描述
     */
    @POST
    @Path("/queryMonthWorkCalByUserId")
    @Produces(MediaType.APPLICATION_JSON)
    public String queryMonthWorkCalByUserId(String jsonStr) throws Exception {
    	JSONObject jsonObject = JSONObject.parseObject(jsonStr);
    	if(StringUtil.isNull(jsonObject, "userId","teamId","yearMonth","queryUserId")) {
    		return ToolsUtil.return_error_json;
    	}
    	return workCalServiceI.queryMonthWorkCalByUserId(jsonObject);
    }
    
    /**
     * 
     * 功能描述：工作历-查询某日的排班
     * @param jsonStr
     * @return
     * @throws Exception 
     * 修改描述
     */
    @POST
    @Path("/queryDayWorkCal")
    @Produces(MediaType.APPLICATION_JSON)
    public String queryDayWorkCal(String jsonStr) throws Exception {
    	JSONObject jsonObject = JSONObject.parseObject(jsonStr);
    	if(StringUtil.isNull(jsonObject, "userId","teamId","calendarDate")) {
    		return ToolsUtil.return_error_json;
    	}
    	return workCalServiceI.queryDayWorkCal(jsonObject);
    }
}
