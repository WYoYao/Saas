package com.sagacloud.superclass.resource;

import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.springframework.beans.factory.annotation.Autowired;

import com.alibaba.fastjson.JSONObject;
import com.sagacloud.superclass.common.StringUtil;
import com.sagacloud.superclass.common.ToolsUtil;
import com.sagacloud.superclass.service.ScheduleServiceI;

/**
 * 功能描述：排班表
 * @author gezhanbin
 *
 */
@Path("/restScheduleService")
public class RestScheduleService {

	@Autowired
	private ScheduleServiceI scheduleService;
	
	

	/**
	 * 
	 * 功能描述：创建排班表-新增班次
	 * @param jsonStr
	 * @return
	 * @throws Exception 
	 * 修改描述
	 */
    @POST
    @Path("/addShift")
    @Produces(MediaType.APPLICATION_JSON)
    public String addShift(String jsonStr) throws Exception {
    	JSONObject jsonObject = JSONObject.parseObject(jsonStr);
    	if(StringUtil.isNull(jsonObject, "userId","teamId","shiftName","shortName", "startTime", "endTime")) {
    		return ToolsUtil.return_error_json;
    	}
    	return scheduleService.addShift(jsonObject);
    }
    
    /**
     * 
     * 功能描述：创建排班表-查询班次详细信息
     * @param jsonStr
     * @return
     * @throws Exception 
     * 修改描述
     */
    @POST
    @Path("/queryShiftById")
    @Produces(MediaType.APPLICATION_JSON)
    public String queryShiftById(String jsonStr) throws Exception {
    	JSONObject jsonObject = JSONObject.parseObject(jsonStr);
    	if(StringUtil.isNull(jsonObject, "userId","shiftId")) {
    		return ToolsUtil.return_error_json;
    	}
    	return scheduleService.queryShiftById(jsonObject);
    }
    
    /**
     * 
     * 功能描述：创建排班表-查询上次排班中的班次列表
     * @param jsonStr
     * @return
     * @throws Exception 
     * 修改描述
     */
    @POST
    @Path("/queryLastShiftList")
    @Produces(MediaType.APPLICATION_JSON)
    public String queryLastShiftList(String jsonStr) throws Exception {
    	JSONObject jsonObject = JSONObject.parseObject(jsonStr);
    	if(StringUtil.isNull(jsonObject, "userId","teamId")) {
    		return ToolsUtil.return_error_json;
    	}
    	return scheduleService.queryLastShiftList(jsonObject);
    }
    
    /**
     * 
     * 功能描述：创建排班表-新增特殊日
     * @param jsonStr
     * @return
     * @throws Exception 
     * 修改描述
     */
    @POST
    @Path("/addSpecialDay")
    @Produces(MediaType.APPLICATION_JSON)
    public String addSpecialDay(String jsonStr) throws Exception {
    	JSONObject jsonObject = JSONObject.parseObject(jsonStr);
    	if(StringUtil.isNull(jsonObject, "userId","teamId","specialDayName","specialDayType","startTime")) {
    		return ToolsUtil.return_error_json;
    	}
    	return scheduleService.addSpecialDay(jsonObject);
    }
    
    /**
     * 
     * 功能描述：创建排班表-查询上次排班中的特殊日列表
     * @param jsonStr
     * @return
     * @throws Exception 
     * 修改描述
     */
    @POST
    @Path("/queryLastSpecialDayList")
    @Produces(MediaType.APPLICATION_JSON)
    public String queryLastSpecialDayList(String jsonStr) throws Exception {
    	JSONObject jsonObject = JSONObject.parseObject(jsonStr);
    	if(StringUtil.isNull(jsonObject, "userId","teamId")) {
    		return ToolsUtil.return_error_json;
    	}
    	return scheduleService.queryLastSpecialDayList(jsonObject);
    }
    
    /**
     * 
     * 功能描述：创建排班表-新增排班配置
     * @param jsonStr
     * @return
     * @throws Exception 
     * 修改描述
     */
    @POST
    @Path("/addSchedule")
    @Produces(MediaType.APPLICATION_JSON)
    public String addSchedule(String jsonStr) throws Exception {
    	JSONObject jsonObject = JSONObject.parseObject(jsonStr);
    	if(StringUtil.isNull(jsonObject, "userId","teamId","isTurnShift","isWeekendRest","isHolidayRest","isSpecialDayShift")) {
    		return ToolsUtil.return_error_json;
    	}
    	return scheduleService.addSchedule(jsonObject);
    }
    
    /**
     * 
     * 功能描述：创建排班表-修改排班配置
     * @param jsonStr
     * @return
     * @throws Exception 
     * 修改描述
     */
    @POST
    @Path("/updateSchedule")
    @Produces(MediaType.APPLICATION_JSON)
    public String updateSchedule(String jsonStr) throws Exception {
    	JSONObject jsonObject = JSONObject.parseObject(jsonStr);
    	if(StringUtil.isNull(jsonObject, "userId","teamId","scheduleId")) {
    		return ToolsUtil.return_error_json;
    	}
    	return scheduleService.updateSchedule(jsonObject);
    }
    
    
    /**
     * 
     * 功能描述：创建排班表-查询排班详细信息
     * @param jsonStr
     * @return
     * @throws Exception 
     * 修改描述
     */
    @POST
    @Path("/queryScheduleById")
    @Produces(MediaType.APPLICATION_JSON)
    public String queryScheduleById(String jsonStr) throws Exception {
    	JSONObject jsonObject = JSONObject.parseObject(jsonStr);
    	if(StringUtil.isNull(jsonObject, "userId","scheduleId")) {
    		return ToolsUtil.return_error_json;
    	}
    	return scheduleService.queryScheduleById(jsonObject);
    }
    
    /**
     * 
     * 功能描述：创建排班表-生成日历
     * @param jsonStr
     * @return
     * @throws Exception 
     * 修改描述
     */
    @POST
    @Path("/createWorkCalendar")
    @Produces(MediaType.APPLICATION_JSON)
    public String createWorkCalendar(String jsonStr) throws Exception {
    	JSONObject jsonObject = JSONObject.parseObject(jsonStr);
    	if(StringUtil.isNull(jsonObject, "userId","scheduleId")) {
    		return ToolsUtil.return_error_json;
    	}
    	return scheduleService.createWorkCalendar(jsonObject);
    }
    
    /**
     * 
     * 功能描述：创建排班表-修改休息日
     * @param jsonStr
     * @return
     * 修改描述
     */
    @POST
    @Path("/updateWorkCalendar")
    @Produces(MediaType.APPLICATION_JSON)
    public String updateWorkCalendar(String jsonStr) {
    	JSONObject jsonObject = JSONObject.parseObject(jsonStr);
    	if(StringUtil.isNull(jsonObject, "userId")) {
    		return ToolsUtil.return_error_json;
    	}
    	return scheduleService.updateWorkCalendar(jsonObject);
    }
    
    /**
     * 
     * 功能描述：创建排班表-开始排班
     * @param jsonStr
     * @return
     * 修改描述
     */
    @POST
    @Path("/startSchedule")
    @Produces(MediaType.APPLICATION_JSON)
    public String startSchedule(String jsonStr) {
    	JSONObject jsonObject = JSONObject.parseObject(jsonStr);
    	if(StringUtil.isNull(jsonObject, "userId","scheduleId")) {
    		return ToolsUtil.return_error_json;
    	}
    	return scheduleService.startSchedule(jsonObject);
    }
    
    /**
     * 
     * 功能描述：管理排班表-查询排班生成的日历-状态是2时
     * @param jsonStr
     * @return
     * 修改描述
     */
    @POST
    @Path("/queryWorkCalById")
    @Produces(MediaType.APPLICATION_JSON)
    public String queryWorkCalById(String jsonStr) {
    	JSONObject jsonObject = JSONObject.parseObject(jsonStr);
    	if(StringUtil.isNull(jsonObject, "userId","scheduleId")) {
    		return ToolsUtil.return_error_json;
    	}
    	return scheduleService.queryWorkCalById(jsonObject);
    }
    
    /**
     * 
     * 功能描述：管理排班表-查询排班生成的日历-状态是3时
     * @param jsonStr
     * @return
     * 修改描述
     */
    @POST
    @Path("/queryWorkCalList")
    @Produces(MediaType.APPLICATION_JSON)
    public String queryWorkCalList(String jsonStr) {
    	JSONObject jsonObject = JSONObject.parseObject(jsonStr);
    	if(StringUtil.isNull(jsonObject, "userId","scheduleId")) {
    		return ToolsUtil.return_error_json;
    	}
    	return scheduleService.queryWorkCalList(jsonObject);
    }
    
    /**
     * 
     * 功能描述：管理排班表-查询某日的班次列表
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
    	return scheduleService.queryDayShiftList(jsonObject);
    }
    
    /**
     * 
     * 功能描述：管理排班表-保存某日的班次数据
     * @param jsonStr
     * @return
     * @throws Exception 
     * 修改描述
     */
    @POST
    @Path("/saveDayShiftList")
    @Produces(MediaType.APPLICATION_JSON)
    public String saveDayShiftList(String jsonStr) throws Exception {
    	JSONObject jsonObject = JSONObject.parseObject(jsonStr);
    	if(StringUtil.isNull(jsonObject, "userId","scheduleId","calendarDate")) {
    		return ToolsUtil.return_error_json;
    	}
    	return scheduleService.saveDayShiftList(jsonObject);
    }
    
    /**
     * 
     * 功能描述：管理排班表-按人查看统计
     * @param jsonStr
     * @return
     * @throws Exception 
     * 修改描述
     */
    @POST
    @Path("/verifySchedule")
    @Produces(MediaType.APPLICATION_JSON)
    public String verifySchedule(String jsonStr) throws Exception {
    	JSONObject jsonObject = JSONObject.parseObject(jsonStr);
    	if(StringUtil.isNull(jsonObject, "userId","scheduleId")) {
    		return ToolsUtil.return_error_json;
    	}
    	return scheduleService.verifySchedule(jsonObject);
    }
    
    /**
     * 
     * 功能描述：管理排班表-立即生效验证
     * @param jsonStr
     * @return
     * @throws Exception 
     * 修改描述
     */
    @POST
    @Path("/queryScheduleStatForUser")
    @Produces(MediaType.APPLICATION_JSON)
    public String queryScheduleStatForUser(String jsonStr) throws Exception {
    	JSONObject jsonObject = JSONObject.parseObject(jsonStr);
    	if(StringUtil.isNull(jsonObject, "userId","scheduleId")) {
    		return ToolsUtil.return_error_json;
    	}
    	return scheduleService.queryScheduleStatForUser(jsonObject);
    }
    
    /**
     * 
     * 功能描述：管理排班表-按日查看统计
     * @param jsonStr
     * @return
     * @throws Exception 
     * 修改描述
     */
    @POST
    @Path("/queryScheduleStatForDay")
    @Produces(MediaType.APPLICATION_JSON)
    public String queryScheduleStatForDay(String jsonStr) throws Exception {
    	JSONObject jsonObject = JSONObject.parseObject(jsonStr);
    	if(StringUtil.isNull(jsonObject, "userId","scheduleId")) {
    		return ToolsUtil.return_error_json;
    	}
    	return scheduleService.queryScheduleStatForDay(jsonObject);
    }
    
    /**
     * 
     * 功能描述：管理排班表-立即生效
     * @param jsonStr
     * @return
     * @throws Exception 
     * 修改描述
     */
    @POST
    @Path("/effectSchedule")
    @Produces(MediaType.APPLICATION_JSON)
    public String effectSchedule(String jsonStr) throws Exception {
    	JSONObject jsonObject = JSONObject.parseObject(jsonStr);
    	if(StringUtil.isNull(jsonObject, "userId","scheduleId")) {
    		return ToolsUtil.return_error_json;
    	}
    	return scheduleService.effectSchedule(jsonObject);
    }
    
    /**
     * 
     * 功能描述：创建排班表-查询上次排班配置
     * @param jsonStr
     * @return
     * @throws Exception 
     * 修改描述
     */
    @POST
    @Path("/queryLastSchedule")
    @Produces(MediaType.APPLICATION_JSON)
    public String queryLastSchedule(String jsonStr) throws Exception {
    	JSONObject jsonObject = JSONObject.parseObject(jsonStr);
    	if(StringUtil.isNull(jsonObject, "userId","teamId")) {
    		return ToolsUtil.return_error_json;
    	}
    	return scheduleService.queryLastSchedule(jsonObject);
    }
    
    
    
    
	
}
