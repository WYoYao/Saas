package com.sagacloud.superclass.resource;

import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.springframework.beans.factory.annotation.Autowired;

import com.alibaba.fastjson.JSONObject;
import com.sagacloud.superclass.common.StringUtil;
import com.sagacloud.superclass.common.ToolsUtil;
import com.sagacloud.superclass.service.DemandServiceI;

/**
 * 功能描述：提要求
 * @author gezhanbin
 *
 */
@Path("/restDemandService")
public class RestDemandService {

	@Autowired
	private DemandServiceI demandService;
	
	/**
     * 
     * 功能描述：提要求-查询工作日历列表
     * @param jsonStr
     * @return
     * @throws Exception 
     * 修改描述
     */
    @POST
    @Path("/queryWorkCalList")
    @Produces(MediaType.APPLICATION_JSON)
    public String queryWorkCalList(String jsonStr) throws Exception {
    	JSONObject jsonObject = JSONObject.parseObject(jsonStr);
    	if(StringUtil.isNull(jsonObject, "userId","scheduleId")) {
    		return ToolsUtil.return_error_json;
    	}
    	return demandService.queryWorkCalList(jsonObject);
    }
    
    /**
     * 
     * 功能描述：提要求-查询提醒信息
     * @param jsonStr
     * @return
     * @throws Exception 
     * 修改描述
     */
    @POST
    @Path("/queryRemindByScheduleId")
    @Produces(MediaType.APPLICATION_JSON)
    public String queryRemindByScheduleId(String jsonStr) throws Exception {
    	JSONObject jsonObject = JSONObject.parseObject(jsonStr);
    	if(StringUtil.isNull(jsonObject, "userId","scheduleId")) {
    		return ToolsUtil.return_error_json;
    	}
    	return demandService.queryRemindByScheduleId(jsonObject);
    }
    
    /**
     * 
     * 功能描述：提要求-查询某日的班次列表
     * @param jsonStr
     * @return
     * @throws Exception 
     * 修改描述
     */
    @POST
    @Path("/queryDayShiftList")
    @Produces(MediaType.APPLICATION_JSON)
    public String queryDayShiftList(String jsonStr) throws Exception {
    	JSONObject jsonObject = JSONObject.parseObject(jsonStr);
    	if(StringUtil.isNull(jsonObject, "userId","scheduleId","calendarDate")) {
    		return ToolsUtil.return_error_json;
    	}
    	return demandService.queryDayShiftList(jsonObject);
    }
    
    /**
     * 
     * 功能描述：提要求-加入某个班次
     * @param jsonStr
     * @return
     * @throws Exception 
     * 修改描述
     */
    @POST
    @Path("/joinShif")
    @Produces(MediaType.APPLICATION_JSON)
    public String joinShif(String jsonStr) throws Exception {
    	JSONObject jsonObject = JSONObject.parseObject(jsonStr);
    	if(StringUtil.isNull(jsonObject, "userId","teamId","scheduleId","calendarDate","shiftId")) {
    		return ToolsUtil.return_error_json;
    	}
    	return demandService.joinShif(jsonObject);
    }
    
    /**
     * 
     * 功能描述：提要求-取消某个班次
     * @param jsonStr
     * @return
     * @throws Exception 
     * 修改描述
     */
    @POST
    @Path("/cancelShif")
    @Produces(MediaType.APPLICATION_JSON)
    public String cancelShif(String jsonStr) throws Exception {
    	JSONObject jsonObject = JSONObject.parseObject(jsonStr);
    	if(StringUtil.isNull(jsonObject, "userId","teamId","scheduleId","calendarDate","shiftId")) {
    		return ToolsUtil.return_error_json;
    	}
    	return demandService.cancelShif(jsonObject);
    }
	
}
