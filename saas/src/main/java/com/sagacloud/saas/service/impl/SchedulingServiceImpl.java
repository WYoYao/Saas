package com.sagacloud.saas.service.impl;

import java.io.IOException;
import java.io.InputStream;
import java.net.URLEncoder;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Set;

import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.usermodel.WorkbookFactory;
import org.apache.poi.ss.util.CellRangeAddress;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.sagacloud.saas.cache.ProjectCache;
import com.sagacloud.saas.common.CommonMessage;
import com.sagacloud.saas.common.DataRequestPathUtil;
import com.sagacloud.saas.common.DateUtil;
import com.sagacloud.saas.common.JSONUtil;
import com.sagacloud.saas.common.StringUtil;
import com.sagacloud.saas.dao.DBCommonMethods;
import com.sagacloud.saas.dao.DBConst;
import com.sagacloud.saas.dao.DBConst.Result;
import com.sagacloud.saas.service.BaseService;
import com.sagacloud.saas.service.BaseTransmissionService;
import com.sagacloud.saas.service.SchedulingServiceI;

/**
 * @desc 排班
 * @author gezhanbin
 *
 */
@Service("schedulingService")
public class SchedulingServiceImpl extends BaseTransmissionService implements SchedulingServiceI {
	private final static Logger log = Logger.getLogger(SchedulingServiceImpl.class);
	
	
	@Autowired
	private ProjectCache projectCache;
	
	@Override
	public String uploadSchedulingFile(String project_id, String month, String fileKey) {
		String[] weeks = new String[]{"日","一","二","三","四","五","六"};
		Workbook workbook = null;
		JSONObject result = new JSONObject();
		result.put(Result.RESULT, Result.FAILURE);
		InputStream inputStream = null;
		try {
			Date monthDate = DateUtil.parseDate(DateUtil.sdfMonth, month);
			Calendar calendar = Calendar.getInstance();
			calendar.setTime(monthDate);
			int monthDays = calendar.getActualMaximum(Calendar.DAY_OF_MONTH);
			
			JSONArray contents = new JSONArray();
			
			//获取所有用户信息
			Map<String, String> phoneNumPersonIdMap = queryPhoneNumPersonId();
			Map<String, String> personIdProjectIdMap = queryPersonIdProjectId(project_id);
			Set<String> codeSet = querySchedulingConfigCode(project_id);
			String requestUrl = getImageServicePath(DataRequestPathUtil.image_service_file_get, fileKey);
			inputStream = httpGetFileRequest(requestUrl);
			if(inputStream != null) {
				workbook = WorkbookFactory.create(inputStream);
				Sheet sheet = workbook.getSheetAt(0);
				int endRow = sheet.getLastRowNum();
				for (int i = 1; i <= endRow; i++) {
					Row row = sheet.getRow(i);
					if(row==null){
						continue;
					}
					JSONArray columns = new JSONArray();
					JSONObject columnInfo = new JSONObject();
					
					//该条记录是否含有无效数据1-含有无效数据     0-都是有效数据
					//人员姓名
					Cell cell = row.getCell(0);
					String value = getCellStringValue(cell, false);
					columns.add(setString(value));
					//手机号
					cell = row.getCell(1);
					value = getCellStringValue(cell, false);
					columns.add(setString(value));
					String phoneNumFlag = "1";
					if(!StringUtil.isNull(value)) {
						String person_id = phoneNumPersonIdMap.get(value);
						if(!StringUtil.isNull(person_id)) {
							String projectId = personIdProjectIdMap.get(person_id);
							if(!StringUtil.isNull(projectId)) {
								phoneNumFlag = "0";
							}
						}
					}
					
					
					//职位
					cell = row.getCell(2);
					value = getCellStringValue(cell, false);
					columns.add(setString(value));
					for (int j = 3; j < monthDays + 3; j++) {
						//日期
						cell = row.getCell(j);
						if(i == 1) {
							calendar.add(Calendar.DAY_OF_YEAR, j == 3 ? 0 : 1);
							int week = calendar.get(Calendar.DAY_OF_WEEK);
							week--;
							value = weeks[week];
						} else if(i == 2) {
							value = (j - 2) + "";
						} else {
							value = getCellStringValue(cell, false);
							if(!StringUtil.isNull(value)) {
								if(!codeSet.contains(value)) {
									phoneNumFlag = "1";
								}
							}
						}
						columns.add(setString(value));
					}
					if(i == 1 || i == 2) {
						phoneNumFlag = "0";
					}
					columns.add(0,setString(phoneNumFlag));
					columnInfo.put("columns", columns);
					contents.add(columnInfo);
					
				}
				result.put(Result.RESULT, Result.SUCCESS);
				result.put(Result.CONTENT, contents);
				result.put(Result.COUNT, contents.size());
			}
			
		} catch (Exception e) {
			result.put(Result.RESULTMSG, "解析文件失败");
			log.error(e.getMessage());
			e.printStackTrace();
		} finally {
			if(workbook != null) {
				try {
					workbook.close();
				} catch (IOException e) {
				}
			}
			if(inputStream != null) {
				try {
					inputStream.close();
				} catch (IOException e) {
				}
			}
		}
		
		return result.toJSONString();
	}

	private JSONObject setItem(String value) {
		JSONObject item = new JSONObject();
		
		if(!StringUtil.isNull(value)) {
			item.put("code", value);
		}
		return item;
	}
	private String setString(String value) {
		if(StringUtil.isNull(value)) {
			value = "";
		}
		return value;
	}
	
	private Map<String, Set<String>> queryPositionPersonIds(String project_id) {
		Map<String, Set<String>> positionPersonIdsMap = new HashMap<String, Set<String>>();
		JSONObject jsonObject = new JSONObject();
		jsonObject.put(DBConst.TABLE_FIELD_VALID, true);
		jsonObject.put("project_id", project_id);
		jsonObject = JSONUtil.getCriteriaWithMajors(jsonObject, "project_id",DBConst.TABLE_FIELD_VALID);
		String queryResult = DBCommonMethods.queryRecordByCriteria(DBConst.DATABASE_PERSON_SERVICE, DBConst.TABLE_PROJECT_PERSON, jsonObject.toJSONString());
		if(queryResult.contains(Result.SUCCESS) && queryResult.contains(Result.CONTENT)) {
			JSONObject resultJson = JSONObject.parseObject(queryResult);
			JSONArray contents = resultJson.getJSONArray(Result.CONTENT);
			if(contents != null && contents.size() > 0) {
				for (int i = 0; i < contents.size(); i++) {
					JSONObject content = contents.getJSONObject(i);
					String person_id = content.getString("person_id");
					String position = content.getString("position");
					if(!StringUtil.isNull(person_id)) {
						if(StringUtil.isNull(position)) {
							position = "--";
						}
						Set<String> personIds = positionPersonIdsMap.get(position);
						if(personIds == null) {
							personIds = new HashSet<>();
							positionPersonIdsMap.put(position, personIds);
						}
						personIds.add(person_id);
					}
				}
			}
		}
		
		return positionPersonIdsMap;
	}
	private Map<String, String> queryPersonIdProjectId(String project_id) {
		Map<String, String> personIdProjectIdMap = new HashMap<String, String>();
		JSONObject jsonObject = new JSONObject();
		jsonObject.put(DBConst.TABLE_FIELD_VALID, true);
		jsonObject.put("project_id", project_id);
		jsonObject = JSONUtil.getCriteriaWithMajors(jsonObject, "project_id",DBConst.TABLE_FIELD_VALID);
		String queryResult = DBCommonMethods.queryRecordByCriteria(DBConst.DATABASE_PERSON_SERVICE, DBConst.TABLE_PROJECT_PERSON, jsonObject.toJSONString());
		if(queryResult.contains(Result.SUCCESS) && queryResult.contains(Result.CONTENT)) {
			JSONObject resultJson = JSONObject.parseObject(queryResult);
			JSONArray contents = resultJson.getJSONArray(Result.CONTENT);
			if(contents != null && contents.size() > 0) {
				for (int i = 0; i < contents.size(); i++) {
					JSONObject content = contents.getJSONObject(i);
					String person_id = content.getString("person_id");
					if(!StringUtil.isNull(person_id)) {
						personIdProjectIdMap.put(person_id, project_id);
					}
				}
			}
		}
		
		return personIdProjectIdMap;
	}
	private Map<String, String> queryPhoneNumPersonId() {
		Map<String, String> phoneNumPersonIdMap = new HashMap<String, String>();
		JSONObject jsonObject = new JSONObject();
		jsonObject.put(DBConst.TABLE_FIELD_VALID, true);
		jsonObject = JSONUtil.getCriteriaWithMajors(jsonObject, DBConst.TABLE_FIELD_VALID);
		String queryResult = DBCommonMethods.queryRecordByCriteria(DBConst.DATABASE_PERSON_SERVICE, DBConst.TABLE_PERSON, jsonObject.toJSONString());
		if(queryResult.contains(Result.SUCCESS) && queryResult.contains(Result.CONTENT)) {
			JSONObject resultJson = JSONObject.parseObject(queryResult);
			JSONArray contents = resultJson.getJSONArray(Result.CONTENT);
			if(contents != null && contents.size() > 0) {
				for (int i = 0; i < contents.size(); i++) {
					JSONObject content = contents.getJSONObject(i);
					String person_id = content.getString("person_id");
					String phone_num = content.getString("phone_num");
					if(!StringUtil.isNull(phone_num)) {
						phoneNumPersonIdMap.put(phone_num, person_id);
					}
				}
			}
		}
		
		return phoneNumPersonIdMap;
	}
	private Map<String, JSONObject> queryPersons() {
		Map<String, JSONObject> personsMap = new HashMap<String, JSONObject>();
		JSONObject jsonObject = new JSONObject();
		jsonObject.put(DBConst.TABLE_FIELD_VALID, true);
		jsonObject = JSONUtil.getCriteriaWithMajors(jsonObject, DBConst.TABLE_FIELD_VALID);
		String queryResult = DBCommonMethods.queryRecordByCriteria(DBConst.DATABASE_PERSON_SERVICE, DBConst.TABLE_PERSON, jsonObject.toJSONString());
		if(queryResult.contains(Result.SUCCESS) && queryResult.contains(Result.CONTENT)) {
			JSONObject resultJson = JSONObject.parseObject(queryResult);
			JSONArray contents = resultJson.getJSONArray(Result.CONTENT);
			if(contents != null && contents.size() > 0) {
				for (int i = 0; i < contents.size(); i++) {
					JSONObject content = contents.getJSONObject(i);
					String person_id = content.getString("person_id");
					String phone_num = content.getString("phone_num");
					if(!StringUtil.isNull(phone_num)) {
						personsMap.put(person_id, content);
					}
				}
			}
		}
		
		return personsMap;
	}
	private Set<String> querySchedulingConfigCode(String project_id) {
		Set<String> codeSet = new HashSet<String>();
		
		JSONObject jsonObject = new JSONObject();
		jsonObject.put(DBConst.TABLE_FIELD_VALID, true);
		jsonObject.put("project_id", project_id);
		jsonObject = JSONUtil.getCriteriaWithMajors(jsonObject, "project_id",DBConst.TABLE_FIELD_VALID);
		String queryResult = DBCommonMethods.queryRecordByCriteria(DBConst.TABLE_SCHEDULING_CONFIG, jsonObject.toJSONString());
		if(queryResult.contains(Result.SUCCESS) && queryResult.contains(Result.CONTENT)) {
			JSONObject resultJson = JSONObject.parseObject(queryResult);
			JSONArray contents = resultJson.getJSONArray(Result.CONTENT);
			if(contents != null && contents.size() > 0) {
				for (int i = 0; i < contents.size(); i++) {
					JSONObject content = contents.getJSONObject(i);
					String code = content.getString("code");
					if(!StringUtil.isNull(code)) {
						codeSet.add(code);
					}
				}
			}
		}
		return codeSet;
	}

	@Override
	public String queryMonthSchedulingForWeb(JSONObject jsonObject) {
		jsonObject.put(DBConst.TABLE_FIELD_VALID, true);
		jsonObject = JSONUtil.getCriteriaWithMajors(jsonObject, DBConst.TABLE_FIELD_VALID, "project_id", "month");
		String queryResult = DBCommonMethods.queryRecordByCriteria(DBConst.TABLE_SCHEDULING_SHOW, jsonObject.toJSONString());
		if(queryResult.contains(Result.SUCCESS) && queryResult.contains(Result.CONTENT)) {
			JSONObject resultJson = JSONObject.parseObject(queryResult);
			JSONArray queryContents = resultJson.getJSONArray(Result.CONTENT);
			if(queryContents != null && queryContents.size() > 0) {
				JSONArray returnContents = new JSONArray();
				queryContents = JSONUtil.sortByIntegerField(queryContents, "order", 1);
				for (int i = 0; i < queryContents.size(); i++) {
					
					JSONArray columns = new JSONArray();
					JSONObject columnInfo = new JSONObject();
					
					JSONObject queryContent = queryContents.getJSONObject(i);
					JSONArray returnItems = new JSONArray();
					String exsit = queryContent.getString("exsit");
//					returnItems.add(setItem(exsit));
					columns.add(setString(exsit));
					String person_name = queryContent.getString("person_name");
//					returnItems.add(setItem(person_name));
					columns.add(setString(person_name));
					String phone_num = queryContent.getString("phone_num");
//					returnItems.add(setItem(phone_num));
					columns.add(setString(phone_num));
					String post_name = queryContent.getString("post_name");
//					returnItems.add(setItem(post_name));
					columns.add(setString(post_name));
					String content = queryContent.getString("content");
					JSONArray contents = JSONArray.parseArray(content);
//					columns.add(setString(post_name));
//					returnItems.addAll(contents);
					for (int j = 0; j < contents.size(); j++) {
						JSONObject contentObj = contents.getJSONObject(j);
						String code = contentObj.getString("code");
						columns.add(setString(code));
					}
					columnInfo.put("columns", columns);
					returnContents.add(columnInfo);
				}
				resultJson.put(Result.CONTENT, returnContents);
				queryResult = resultJson.toJSONString();
			}
		}
		
		return queryResult;
	}
	
	@Override
	public String queryMonthSchedulingForApp(JSONObject jsonObject) throws Exception {
		jsonObject.put(DBConst.TABLE_FIELD_VALID, true);
		jsonObject = JSONUtil.getCriteriaWithMajors(jsonObject, DBConst.TABLE_FIELD_VALID, "project_id", "month");
		String queryResult = DBCommonMethods.queryRecordByCriteria(DBConst.TABLE_SCHEDULING_SHOW, jsonObject.toJSONString());
		if(queryResult.contains(Result.SUCCESS) && queryResult.contains(Result.CONTENT)) {
			JSONObject resultJson = JSONObject.parseObject(queryResult);
			JSONArray queryContents = resultJson.getJSONArray(Result.CONTENT);
			if(queryContents != null && queryContents.size() > 0) {
				JSONArray returnContents = new JSONArray();
				queryContents = JSONUtil.sortByIntegerField(queryContents, "order", 1);
				Map<Integer, JSONObject> map = new LinkedHashMap<Integer, JSONObject>();
//				JSONArray columns = new JSONArray();
//				JSONObject columnInfo = new JSONObject();
				for (int i = 0; i < queryContents.size(); i++) {
					JSONObject queryContent = queryContents.getJSONObject(i);
//					String exsit = queryContent.getString("exsit");
//					setItems(returnContents, 0, exsit);
					String person_name = queryContent.getString("person_name");
					setItems(map, 0, person_name);
//					String phone_num = queryContent.getString("phone_num");
//					setItems(returnContents, 2, phone_num);
					String post_name = queryContent.getString("post_name");
					setItems(map, 1, post_name);
					String content = queryContent.getString("content");
					JSONArray contents = JSONArray.parseArray(content);
					for (int j = 0; j < contents.size(); j++) {
						int mark = j + 2;
						JSONObject item = contents.getJSONObject(j);
						String code = item.getString("code");
						setItems(map, mark, code);
					}
				}
				returnContents.addAll(map.values());
				resultJson.put(Result.CONTENT, returnContents);
				resultJson.put(Result.COUNT, returnContents.size());
				queryResult = resultJson.toJSONString();
			}
		}
		return queryResult;
	}
	private void setItems(Map<Integer, JSONObject> map, Integer key, String value) {
		
		JSONObject columnInfo = map.get(key);
		if(columnInfo == null) {
			columnInfo = new JSONObject();
			map.put(key, columnInfo);
		}
		
		JSONArray columns = columnInfo.getJSONArray("columns");
		if(columns == null) {
			columns = new JSONArray();
			columnInfo.put("columns", columns);
		}
//		JSONObject item = new JSONObject();
		
		if(StringUtil.isNull(value)) {
			value = "";
		}
		columns.add(value);
	}

	@Override
	public String saveSchedulingPlan(JSONObject jsonObject) throws Exception {
		String result = Result.SUCCESS;
		String project_id = jsonObject.getString("project_id");
		String month = jsonObject.getString("month");
		JSONArray contents = jsonObject.getJSONArray("contents");
		String create_time = DateUtil.getNowTimeStr();
		Date monthDate = DateUtil.parseDate(DateUtil.sdfMonth, month);
		Calendar calendar = Calendar.getInstance();
		
		Map<String, JSONArray> schedulingConfigMap = querySchedulingConfigMap(project_id);
		//获取所有用户信息
		Map<String, String> phoneNumPersonIdMap = queryPhoneNumPersonId();
		Map<String, String> personIdProjectIdMap = queryPersonIdProjectId(project_id);
		
		for (int i = 0; i < contents.size(); i++) {
			calendar.setTime(monthDate);
			JSONObject columnInfo = contents.getJSONObject(i);
			JSONObject schedulingShow = new JSONObject();
			schedulingShow.put("scheduling_show_id", "" + DateUtil.getUtcTimeNow());
			schedulingShow.put("project_id", project_id);
			schedulingShow.put("month", month);
			schedulingShow.put(DBConst.TABLE_FIELD_UPDATE_TIME, DateUtil.getNowTimeStr());
			schedulingShow.put("order", i + "");
			schedulingShow.put(DBConst.TABLE_FIELD_CTEATE_TIME, create_time);
			JSONArray schedulingShowContents = new JSONArray();
			String phoneNumFlag = "1";
			String person_id = null;
			JSONArray columns = columnInfo.getJSONArray("columns");
			if(columns == null || columns.isEmpty()) {
				continue;
			}
			for (int j = 0; j < columns.size(); j++) {
				String code = columns.getString(j);
//				String code = item.getString("code");
				JSONObject item = setItem(code);
				
				//添加排班展示表
				//0、是否有不合法数据
				//1、人员名称
				//2、手机号
				//3、职位
				//4、.....都是排班计划  保持顺序
				switch (j) {
					case 0:{
						//0、是否有不合法数据
						schedulingShow.put("exsit", code);
						break;
					}
					case 1:{
						//1、人员名称
						schedulingShow.put("person_name", code);
						break;
					}
					case 2:{
						//2、手机号
						schedulingShow.put("phone_num", code);
						if(i != 0 && i  != 1) {
							if(!StringUtil.isNull(code)) {
								person_id = phoneNumPersonIdMap.get(code);
								if(!StringUtil.isNull(person_id)) {
									String projectId = personIdProjectIdMap.get(person_id);
									if(!StringUtil.isNull(projectId)) {
										phoneNumFlag = "0";
									}
								}
							}
						}
						break;
					}
					case 3:{
						//3、职位
						schedulingShow.put("post_name", code);
						break;
					}
					default: {
						//4、.....都是排班计划  保持顺序
						schedulingShowContents.add(item);
						
						if("0".equals(phoneNumFlag)) {
							calendar.add(Calendar.DAY_OF_YEAR, j == 4 ? 0 : 1);
							String day = DateUtil.formatStr(DateUtil.sdf_Day, calendar.getTime());
							if(StringUtil.isNull(code)) {
								continue;
							}
							JSONArray configObjs = schedulingConfigMap.get(code);
							if(configObjs != null && configObjs.size() > 0) {
								for (int k = 0; k < configObjs.size(); k++) {
									JSONObject configObj = configObjs.getJSONObject(k);
									String start = configObj.getString("start");
									String end = configObj.getString("end");
									String start_time = day + " " + start + ":00";
									String end_time = day + " " + end + ":00";
									start_time = DateUtil.transferDateFormat(start_time, DateUtil.sdf_time, DateUtil.sdftime);
									end_time = DateUtil.transferDateFormat(end_time, DateUtil.sdf_time, DateUtil.sdftime);
									//添加排班表
									JSONObject scheduling = new JSONObject();
									scheduling.put("scheduling_id", DBConst.TABLE_SCHEDULING_ID_TAG + DateUtil.getUtcTimeNow());
									scheduling.put("project_id", project_id);
									scheduling.put("month", month);
									scheduling.put("person_id", person_id);
									scheduling.put(DBConst.TABLE_FIELD_UPDATE_TIME, DateUtil.getNowTimeStr());
									scheduling.put(DBConst.TABLE_FIELD_CTEATE_TIME, create_time);
									scheduling.put("start_time", start_time);
									scheduling.put("end_time", end_time);
									scheduling = JSONUtil.getAddParamJson(scheduling);
									//添加排班展示表
									String insertResult = DBCommonMethods.insertRecord(DBConst.TABLE_SCHEDULING, scheduling.toJSONString());
									if(insertResult.contains(Result.FAILURE)) {
										result = Result.FAILURE; 
									}
								}
							}
						}
						break;
					}
				}
			}
			schedulingShow.put("content", schedulingShowContents.toJSONString());
			schedulingShow = JSONUtil.getAddParamJson(schedulingShow);
			//添加排班展示表
			String insertResult = DBCommonMethods.insertRecord(DBConst.TABLE_SCHEDULING_SHOW, schedulingShow.toJSONString());
			if(insertResult.contains(Result.FAILURE)) {
				result = Result.FAILURE; 
			}
		}
		//删掉排班展示表历史数据
		JSONObject removeSchedulingShow = new JSONObject();
		removeSchedulingShow.put("project_id", project_id);
		removeSchedulingShow.put("month", month);
		JSONObject queryTime = new JSONObject();
		queryTime.put("$lt", create_time);
		removeSchedulingShow.put(DBConst.TABLE_FIELD_CTEATE_TIME, queryTime);
		removeSchedulingShow = JSONUtil.getCriteriaWithMajors(removeSchedulingShow, "project_id", "month", DBConst.TABLE_FIELD_CTEATE_TIME);
		DBCommonMethods.deleteRecord(DBConst.TABLE_SCHEDULING_SHOW, removeSchedulingShow.toJSONString());
		
		//删掉排班表历史数据
		JSONObject removeScheduling = new JSONObject();
		removeScheduling.put("project_id", project_id);
		removeScheduling.put("month", month);
		queryTime = new JSONObject();
		queryTime.put("$lt", create_time);
		removeScheduling.put(DBConst.TABLE_FIELD_CTEATE_TIME, queryTime);
		removeScheduling = JSONUtil.getCriteriaWithMajors(removeScheduling, "project_id", "month", DBConst.TABLE_FIELD_CTEATE_TIME);
		DBCommonMethods.deleteRecord(DBConst.TABLE_SCHEDULING, removeScheduling.toJSONString());
		JSONObject resultObj = new JSONObject();
		resultObj.put(Result.RESULT, result);
		
		return resultObj.toJSONString();
	}
	
	
	private Map<String, JSONArray> querySchedulingConfigMap(String project_id) {
		Map<String, JSONArray> schedulingConfigMap = new HashMap<String, JSONArray>();
		
		JSONObject jsonObject = new JSONObject();
		jsonObject.put(DBConst.TABLE_FIELD_VALID, true);
		jsonObject.put("project_id", project_id);
		jsonObject = JSONUtil.getCriteriaWithMajors(jsonObject, "project_id",DBConst.TABLE_FIELD_VALID);
		String queryResult = DBCommonMethods.queryRecordByCriteria(DBConst.TABLE_SCHEDULING_CONFIG, jsonObject.toJSONString());
		if(queryResult.contains(Result.SUCCESS) && queryResult.contains(Result.CONTENT)) {
			JSONObject resultJson = JSONObject.parseObject(queryResult);
			JSONArray contents = resultJson.getJSONArray(Result.CONTENT);
			if(contents != null && contents.size() > 0) {
				for (int i = 0; i < contents.size(); i++) {
					JSONObject content = contents.getJSONObject(i);
					String code = content.getString("code");
					String time_plan = content.getString("time_plan");
					if(!StringUtil.isNull(code, time_plan)) {
						schedulingConfigMap.put(code, JSONArray.parseArray(time_plan));
					}
				}
			}
		}
		return schedulingConfigMap;
	}

	

	@Override
	public String downloadSchedulingTemplateFile(HttpServletResponse response, String project_id, String month,
			String user_id) {
		String[] weeks = new String[]{"日","一","二","三","四","五","六"};
//		String month = jsonObject.getString("month");
		InputStream inputStream = Thread.currentThread().getContextClassLoader().getResourceAsStream("SchedulingTemplate.xlsx");
		Workbook workbook = null;
		try {
			Date monthDate = DateUtil.parseDate(DateUtil.sdfMonth, month);
			Calendar calendar = Calendar.getInstance();
			calendar.setTime(monthDate);
			int year = calendar.get(Calendar.YEAR);
			int MM = calendar.get(Calendar.MONTH) + 1;
			int monthDays = calendar.getActualMaximum(Calendar.DAY_OF_MONTH);
			//查询该项目下的岗位人员
			Map<String, JSONObject> personsMap = queryPersons();
			Map<String, Set<String>> positionPersonIdsMap = queryPositionPersonIds(project_id);
			//查询项目名称
			JSONObject projectObj = projectCache.getProjectJsonDataById(project_id);
			String project_name = null;
			if(projectObj != null) {
				JSONObject jsonData = projectObj.getJSONObject(CommonMessage.dataPlat_infos_dataName);
				if(jsonData != null) {
					project_name = jsonData.getString("ProjLocalName"); 
				}
			}
			String title = project_name + year + "年" + MM + "月份排班表";
			
			
			workbook = WorkbookFactory.create(inputStream);
			Sheet sheet = workbook.getSheetAt(0);
//			sheet.addMergedRegion(new Region(0, (short) 0, 5, (short) 0)); 
			sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, monthDays + 2)); 
			this.createCell(workbook, sheet, 0, 0, 0, title);
			
			for (int i = 1; i < 3; i++) {
				//姓名
				//电话
				//职位
				String person_name = "";
				String phone_num = "";
				String post_name = "";
				if(i == 1) {
					post_name = "星期";
				} else {
					person_name = "姓名";
					phone_num = "电话";
					post_name = "岗位";
				}
				
				
				this.createCell(workbook, sheet, i, 0, 1, person_name);
				this.createCell(workbook, sheet, i, 1, 1, phone_num);
				this.createCell(workbook, sheet, i, 2, 1, post_name);
				for (int j = 3; j < monthDays + 3; j++) {
					String value = null;
					calendar.add(Calendar.DAY_OF_YEAR, j == 3 ? 0 : 1);
					if(i == 1) {
						//星期
						int week = calendar.get(Calendar.DAY_OF_WEEK);
						week--;
						value = weeks[week];
					} else {
						//日期
						value = (j - 2) + "";
					}
					this.createCell(workbook, sheet, i, j, 2, value);
				}
				
			}
			int i = 3;
			for(Map.Entry<String, Set<String>> entry : positionPersonIdsMap.entrySet()) {
				String position = entry.getKey();
				Set<String> personIds = entry.getValue();
				for (String personId : personIds) {
					JSONObject person = personsMap.get(personId);
					if(person != null) {
						String person_name = person.getString("name");
						String phone_num = person.getString("phone_num");
						this.createCell(workbook, sheet, i, 0, 1, person_name);
						this.createCell(workbook, sheet, i, 1, 1, phone_num);
						this.createCell(workbook, sheet, i, 2, 1, position);
						i++;
					}
				}
			}
			
			
			
			String fileName = "排班模板.xlsx";
			response.setHeader("Content-disposition","attachment;filename=" + URLEncoder.encode(fileName, "UTF-8"));//为文件命名  
            response.addHeader("content-type","application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");  
            workbook.write(response.getOutputStream());
		} catch (Exception e) {
			log.error(e.getMessage());
			e.printStackTrace();
		} finally {
			if(inputStream != null) {
				try {
					inputStream.close();
				} catch (IOException e) {
				}
			}
			if(workbook != null) {
				try {
					workbook.close();
				} catch (IOException e) {
				}
			}
		}
		JSONObject result = new JSONObject();
		result.put(Result.RESULT, Result.SUCCESS);
		result.put(Result.RESULTMSG, "下载成功!");
		return result.toJSONString();
	}
	
	
	
}
