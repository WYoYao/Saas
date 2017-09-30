package com.sagacloud.saas.service.impl;


import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.sagacloud.saas.cache.ProjectCache;
import com.sagacloud.saas.common.CommonMessage;
import com.sagacloud.saas.common.DataRequestPathUtil;
import com.sagacloud.saas.common.JSONUtil;
import com.sagacloud.saas.common.StringUtil;
import com.sagacloud.saas.common.ToolsUtil;
import com.sagacloud.saas.dao.DBCommonMethods;
import com.sagacloud.saas.dao.DBConst;
import com.sagacloud.saas.dao.DBConst.Result;
import com.sagacloud.saas.service.BaseService;
import com.sagacloud.saas.service.CustomerServiceI;
import com.sagacloud.saas.service.DictionaryServiceI;
import com.sagacloud.saas.service.ObjectInfoServiceI;

/**
 * @desc 账户管理
 * @author gezhanbin
 *
 */
@Service("customerService")
public class CustomerServiceImpl extends  BaseService implements CustomerServiceI {

	@Autowired
	private DictionaryServiceI dictionaryService;
	@Autowired
	private ProjectCache projectCache;
	@Autowired
	private ObjectInfoServiceI objectInfoService;
	@Override
	public String queryCustomerById(JSONObject jsonObject) {
		jsonObject = JSONUtil.getKeyWithMajors(jsonObject, "customer_id");
		String queryResult = DBCommonMethods.getRecordBykey(DBConst.TABLE_CUSTOMER, jsonObject.toJSONString());
		JSONObject item = null;
		if(queryResult.contains(Result.SUCCESS) && queryResult.contains(Result.CONTENT)) {
			JSONObject queryJson = JSONObject.parseObject(queryResult);
			JSONArray queryContents = queryJson.getJSONArray(Result.CONTENT);
			if(queryContents != null && queryContents.size() > 0) {
				item = ToolsUtil.filterRemind(queryContents.getJSONObject(0), CommonMessage.filter_customer_Object);
				String pictureStr = item.getString("pictures");
				JSONArray pictures = null;
				if(!StringUtil.isNull(pictureStr)) {
					pictures = JSONArray.parseArray(pictureStr);
				}
				item.put("pictures", pictures);
			}
			queryJson.put("Item", item);
			queryJson.remove(Result.CONTENT);
			queryJson.remove(Result.COUNT);
			queryResult = queryJson.toJSONString();
		}
		return queryResult;
	}

	@Override
	public String verifyCustomerPasswd(JSONObject jsonObject) throws Exception {
		
		String old_passwd = jsonObject.getString("old_passwd");
		jsonObject = JSONUtil.getKeyWithMajors(jsonObject, "customer_id");
		String queryResult = DBCommonMethods.getRecordBykey(DBConst.TABLE_CUSTOMER, jsonObject.toJSONString());
		if(queryResult.contains(Result.SUCCESS) && queryResult.contains(Result.CONTENT)) {
			JSONObject item = new JSONObject();
			JSONObject queryJson = JSONObject.parseObject(queryResult);
			JSONArray queryContents = queryJson.getJSONArray(Result.CONTENT);
			item.put("is_passwd", false);
			if(queryContents != null && queryContents.size() > 0) {
				JSONObject queryContent = queryContents.getJSONObject(0);
				String passwd = queryContent.getString("passwd");
				Boolean valid = queryContent.getBoolean("valid");
				if(valid && passwd.equals(ToolsUtil.encodeByMd5(old_passwd))) {
					item.put("is_passwd", true);
				}
			}
			queryJson.put("Item", item);
			queryJson.remove(Result.CONTENT);
			queryJson.remove(Result.COUNT);
			queryResult = queryJson.toJSONString();
		}
		
		
		return queryResult;
	}

	@Override
	public String updateCustomerPasswd(JSONObject jsonObject) throws Exception {
		String customer_id = jsonObject.getString("customer_id");
		String old_passwd = jsonObject.getString("old_passwd");
		String new_passwd = jsonObject.getString("new_passwd");
		jsonObject = JSONUtil.getKeyWithMajors(jsonObject, "customer_id");
		String queryResult = DBCommonMethods.getRecordBykey(DBConst.TABLE_CUSTOMER, jsonObject.toJSONString());
		String result = Result.FAILURE;
		String resultMsg = "原密码不正确";
		boolean updateFlag = false;
		if(queryResult.contains(Result.SUCCESS) && queryResult.contains(Result.CONTENT)) {
			JSONObject queryJson = JSONObject.parseObject(queryResult);
			JSONArray queryContents = queryJson.getJSONArray(Result.CONTENT);
			if(queryContents != null && queryContents.size() > 0) {
				JSONObject queryContent = queryContents.getJSONObject(0);
				String passwd = queryContent.getString("passwd");
				Boolean valid = queryContent.getBoolean("valid");
				if(valid && passwd.equals(ToolsUtil.encodeByMd5(old_passwd))) {
					updateFlag = true;
				}
			}
			//原密码正确
			if(updateFlag) {
				jsonObject = new JSONObject();
				jsonObject.put("customer_id", customer_id);
				jsonObject.put("passwd", ToolsUtil.encodeByMd5(new_passwd));
				jsonObject = JSONUtil.getUpdateParamJson(jsonObject, "customer_id");
				queryResult = DBCommonMethods.updateRecord(DBConst.TABLE_CUSTOMER, jsonObject.toJSONString());
				if(queryResult.contains(Result.SUCCESS)) {
					result = Result.SUCCESS;
					resultMsg = "修改成功";
				}
			}
			JSONObject resultJson = new JSONObject();
			resultJson.put(Result.RESULT, result);
			resultJson.put(Result.RESULTMSG, resultMsg);
			queryResult = resultJson.toJSONString();
		}
		return queryResult;
	}

	@Override
	public String queryProjectInfo(JSONObject jsonObject) throws Exception {
		
		String project_id = jsonObject.getString("project_id");
		String requestUrl = getDataPlatformPath(DataRequestPathUtil.dataPlat_object_batch_query, project_id, projectCache.getProjectSecretById(project_id));
		jsonObject = new JSONObject();
		JSONArray criterias = new JSONArray();
		JSONObject objQuery = new JSONObject();
		objQuery.put("id", project_id);
		criterias.add(objQuery);
		jsonObject.put("criterias", criterias);
		String queryResult = this.httpPostRequest(requestUrl, jsonObject.toJSONString());
		JSONObject queryJson = JSONObject.parseObject(queryResult);
		
		if(Result.FAILURE.equals(queryJson.getString(Result.RESULT))) {
			return queryResult;
		}
		JSONObject result = new JSONObject();
		JSONObject item = new JSONObject();
		result.put(Result.RESULT, Result.SUCCESS);
		
		JSONArray queryContents = queryJson.getJSONArray(Result.CONTENT);
		if(queryContents != null && queryContents.size() > 0) {
			JSONObject queryItem = queryContents.getJSONObject(0);
			queryItem = queryItem.getJSONObject("infos");
			if(queryItem != null) {
				//获取省市区域名称
				Map<String, String> regionMap = dictionaryService.queryAllRegionCode();
				//气候区名称
				Map<String, String> climateMap = dictionaryService.queryAllClimateAreaCode();
				//发展水平名称
				Map<String, String> developMap = dictionaryService.queryAllDevelopmentLevelCode();
				//天气状态名称
				Map<String, String> weatherMap = dictionaryService.queryAllWeatherStatusCode();
				//风力等级名称
				Map<String, String> windMap = dictionaryService.queryAllWindLevelCode();
				//风向名称
				Map<String, String> directionMap = dictionaryService.queryAllDirectionCode();
				item.put("project_id", project_id);
				String project_local_id = queryItem.getString("ProjLocalID");
				item.put("project_local_id", project_local_id);
				String project_local_name = queryItem.getString("ProjLocalName");
				item.put("project_local_name", project_local_name);
				String BIMID = queryItem.getString("BIMID");
				item.put("BIMID", BIMID);
				String province = queryItem.getString("Province");
				item.put("province", province);
				String city = queryItem.getString("City");
				item.put("city", city);
				String district = queryItem.getString("UrbanZone");
				item.put("district", district);
				//省市区域名称
				String province_city_name = regionMap.get(province) + "-" + regionMap.get(city) + "-" + regionMap.get(district);
				item.put("province_city_name", province_city_name);
				String climate_zone = queryItem.getString("ClimateZone");
				item.put("climate_zone", climate_zone);
				////气候区名称
				String climate_zone_name = climateMap.get(climate_zone);
				item.put("climate_zone_name", climate_zone_name);
				String urban_devp_lev = queryItem.getString("UrbanDevpLev");
				item.put("urban_devp_lev", urban_devp_lev);
				//城市发展水平名称
				String urban_devp_lev_name = developMap.get(urban_devp_lev);
				item.put("urban_devp_lev_name", urban_devp_lev_name);
				String longitude = queryItem.getString("Longitude");
				item.put("longitude", longitude);
				String latitude = queryItem.getString("Latitude");
				item.put("latitude", latitude);
				String altitude = queryItem.getString("Altitude");
				item.put("altitude", altitude);
				String group = queryItem.getString("Group");
				item.put("group", group);
				String owner = queryItem.getString("Owner");
				item.put("owner", owner);
				String designer = queryItem.getString("Designer");
				item.put("designer", designer);
				String constructors = queryItem.getString("Constructor");
				item.put("constructors", constructors);
				String property = queryItem.getString("Property");
				item.put("property", property);
				String group_manage_zone = queryItem.getString("GroupManageZone");
				item.put("group_manage_zone", group_manage_zone);
				String group_operate_zone = queryItem.getString("GroupOperateZone");
				item.put("group_operate_zone", group_operate_zone);
				String st_weather1 = queryItem.getString("1stWeather");
				item.put("1st_weather", st_weather1);
				//未来第1天,天气状态名称，页面显示
				String st_weather_name1 = weatherMap.get(st_weather1);
				item.put("1st_weather_name", st_weather_name1);
				String stTdb_1 = queryItem.getString("1stTdb");
				item.put("1stTdb", stTdb_1);
				String stRH_1 = queryItem.getString("1stRH");
				item.put("1stRH", stRH_1);
				String stPM2_5_1 = queryItem.getString("1stPM2.5");
				item.put("1stPM2.5", stPM2_5_1);
				String stPM10_1 = queryItem.getString("1stPM10");
				item.put("1stPM10", stPM10_1);
				String nd_weather_2 = queryItem.getString("2ndWeather");
				item.put("2nd_weather", nd_weather_2);
				//未来第2天,天气状态名称，页面显示
				String nd_weather_name_2 = weatherMap.get(nd_weather_2);
				item.put("2nd_weather_name", nd_weather_name_2);
				String ndTdb_2 = queryItem.getString("2ndTdb");
				item.put("2ndTdb", ndTdb_2);
				String ndRH_2 = queryItem.getString("2ndRH");
				item.put("2ndRH", ndRH_2);
				String ndPM2_5_2 = queryItem.getString("2ndPM2.5");
				item.put("2ndPM2.5", ndPM2_5_2);
				String ndPM10_2 = queryItem.getString("2ndPM10");
				item.put("2ndPM10", ndPM10_2);
				String rd_weather_3 = queryItem.getString("3rdWeather");
				item.put("3rd_weather", rd_weather_3);
				//未来第3天,天气状态名称，页面显示
				String rd_weather_name_3 = weatherMap.get(rd_weather_3);
				item.put("3rd_weather_name", rd_weather_name_3);
				String rdTdb_3 = queryItem.getString("3rdTdb");
				item.put("3rdTdb", rdTdb_3);
				String rdRH_3 = queryItem.getString("3rdRH");
				item.put("3rdRH", rdRH_3);
				String rdPM2_5_3 = queryItem.getString("3rdPM2.5");
				item.put("3rdPM2.5", rdPM2_5_3);
				String rdPM10_3 = queryItem.getString("3rdPM10");
				item.put("3rdPM10", rdPM10_3);
				String out_weather = queryItem.getString("OutWeather");
				item.put("out_weather", out_weather);
				//当前室外环境,天气状态名称，页面显示
				String out_weather_name = weatherMap.get(out_weather);
				item.put("out_weather_name", out_weather_name);
				String outTdb = queryItem.getString("OutTdb");
				item.put("outTdb", outTdb);
				
				String outRH = queryItem.getString("OutRH");
				item.put("outRH", outRH);
				String outD = queryItem.getString("OutD");
				item.put("outD", outD);
				String outTwb = queryItem.getString("OutTwb");
				item.put("outTwb", outTwb);
				String outTd = queryItem.getString("OutTd");
				item.put("outTd", outTd);
				String outH = queryItem.getString("OutH");
				item.put("outH", outH);
				String outRou = queryItem.getString("OutRou");
				item.put("outRou", outRou);
				String outTg = queryItem.getString("OutTg");
				item.put("outTg", outTg);
				String out_press = queryItem.getString("OutPress");
				item.put("out_press", out_press);
				String outCO2 = queryItem.getString("OutCO2");
				item.put("outCO2", outCO2);
				String outCO = queryItem.getString("OutCO");
				item.put("outCO", outCO);
				String outPM2_5 = queryItem.getString("OutPM2.5");
				item.put("outPM2.5", outPM2_5);
				String outPM10 = queryItem.getString("OutPM10");
				item.put("outPM10", outPM10);
				String outDust = queryItem.getString("OutDust");
				item.put("outDust", outDust);
				String outVOC = queryItem.getString("OutVOC");
				item.put("outVOC", outVOC);
				String outCH4 = queryItem.getString("OutCH4");
				item.put("outCH4", outCH4);
				String out_vision = queryItem.getString("Outvision");
				item.put("out_vision", out_vision);
				String outAQI = queryItem.getString("OutAQI");
				item.put("outAQI", outAQI);
				String outLux = queryItem.getString("OutLux");
				item.put("outLux", outLux);
				String outRI = queryItem.getString("OutRI");
				item.put("outRI", outRI);
				String out_horizontal_RI = queryItem.getString("OutHorizontalRI");
				item.put("out_horizontal_RI", out_horizontal_RI);
				String out_vertical_RI = queryItem.getString("OutVerticalRI");
				item.put("out_vertical_RI", out_vertical_RI);
				String out_noise = queryItem.getString("OutNoise");
				item.put("out_noise", out_noise);
				String out_ave_wind_v = queryItem.getString("out_ave_wind_v");
				item.put("out_ave_wind_v", out_ave_wind_v);
				String out_wind_scale = queryItem.getString("OutWindScale");
				item.put("out_wind_scale", out_wind_scale);
				 //当前室外环境,空气风力等级名称，页面显示
				String out_wind_scale_name = windMap.get(out_wind_scale);
				item.put("out_wind_scale_name", out_wind_scale_name);
				String out_wind_vx = queryItem.getString("OutWindVx");
				item.put("out_wind_vx", out_wind_vx);
				String out_wind_vy = queryItem.getString("OutWindVy");
				item.put("out_wind_vy", out_wind_vy);
				String out_wind_vz = queryItem.getString("OutWindVz");
				item.put("out_wind_vz", out_wind_vz);
				String out_wind_direct = queryItem.getString("OutWindDirect");
				item.put("out_wind_direct", out_wind_direct);
				//当前室外环境,空气风向名称，页面显示
				String out_wind_direct_name = directionMap.get(out_wind_direct);
				item.put("out_wind_direct_name", out_wind_direct_name);
				String day_precipitation = queryItem.getString("DayPrecipitation");
				item.put("day_precipitation", day_precipitation);
				String precipitation_type = queryItem.getString("PrecipitationType");
				item.put("precipitation_type", precipitation_type);
				//当前室外环境,降水类型名称，页面显示
				String precipitation_type_name = ToolsUtil.precipitationTypeMap.get(precipitation_type);
				item.put("precipitation_type_name", precipitation_type_name);
				String SRT = queryItem.getString("SRT");
				item.put("SRT", SRT);
				String SST = queryItem.getString("SST");
				item.put("SST", SST);
			}
		}
		result.put("Item", item);
		queryResult = result.toJSONString();
		
		return queryResult;
	}

	@Override
	public String queryProjectInfoPointHis(JSONObject jsonObject) throws Exception {

		String info_point_code = jsonObject.getString("info_point_code");
		String infoPointCode = ToolsUtil.projectInfoParamMap.get(info_point_code);
		String project_id = jsonObject.getString("project_id");
		String secret = projectCache.getProjectSecretById(project_id);
		return objectInfoService.queryObjectInfoHis(project_id, infoPointCode, project_id, secret);
	}

	@Override
	public String updateProjectInfo(JSONObject jsonObject) throws Exception {
		String project_id = jsonObject.getString("project_id");
		String info_point_code = jsonObject.getString("info_point_code");
		String info_point_value = jsonObject.getString("info_point_value");
		String valid_time = jsonObject.getString("valid_time");
		
		String infoPointCode = ToolsUtil.projectInfoParamMap.get(info_point_code);
		
		String secret = projectCache.getProjectSecretById(project_id);
		String queryResult = objectInfoService.updateObjectInfo(project_id, infoPointCode, info_point_value, valid_time, project_id, secret);
		
		JSONObject queryJson = JSONObject.parseObject(queryResult);
		if(Result.SUCCESS.equals(queryJson.getString(Result.RESULT))) {
			if("project_local_name".equals(info_point_code)) {
				//项目本地名称修改时，是saas平台客户信息和数据平台项目信息都修改，其它字段只是修改数据平台项目信息；
				jsonObject.clear();
				jsonObject.put("project_local_name", info_point_value);
				jsonObject.put("project_id", project_id);
				jsonObject = JSONUtil.getUpdateParamJson(jsonObject, "project_id");
				queryResult = DBCommonMethods.updateRecord(DBConst.TABLE_CUSTOMER, jsonObject.toJSONString());
			}
		}
		return queryResult;
	}

	@Override
	public String queryBuildList(JSONObject jsonObject) throws Exception {
		jsonObject.put(DBConst.TABLE_FIELD_VALID, true);
		jsonObject = JSONUtil.getCriteriaWithMajors(jsonObject, "customer_id",DBConst.TABLE_FIELD_VALID);
		
		String queryResult = DBCommonMethods.queryRecordByCriteria(DBConst.TABLE_BUILDING, jsonObject.toJSONString());
		if(queryResult.contains(Result.SUCCESS) && queryResult.contains(Result.CONTENT)) {
			JSONObject queryJson = JSONObject.parseObject(queryResult);
			JSONArray queryContents = queryJson.getJSONArray(Result.CONTENT);
			if(queryContents != null && queryContents.size() > 0) {
				queryContents = JSONUtil.sortByStringField(queryContents, "build_id", -1);
				Map<String, String> buildingMap = dictionaryService.queryAllBuildingCode();
				for (int i = 0; i < queryContents.size(); i++) {
					JSONObject content = queryContents.getJSONObject(i);
					String build_func_type = content.getString("build_func_type");
					String build_func_type_name = buildingMap.get(build_func_type);
					content.put("build_func_type_name", build_func_type_name);
					content.remove("customer_id");
					content.remove("project_id");
					content.remove("create_time");
					content.remove("update_time");
					content.remove("valid");
				}
			}
			queryResult = queryJson.toJSONString();
		}
		return queryResult;
	}

	@Override
	public String queryBuildInfo(JSONObject jsonObject) throws Exception {

		String project_id = jsonObject.getString("project_id");
		String build_id = jsonObject.getString("build_id");
		String build_code = jsonObject.getString("build_code");
		String requestUrl = getDataPlatformPath(DataRequestPathUtil.dataPlat_object_batch_query, project_id, projectCache.getProjectSecretById(project_id));
		jsonObject = new JSONObject();
		JSONArray criterias = new JSONArray();
		JSONObject objQuery = new JSONObject();
		objQuery.put("id", build_code);
		criterias.add(objQuery);
		jsonObject.put("criterias", criterias);
		String queryResult = this.httpPostRequest(requestUrl, jsonObject.toJSONString());
		JSONObject queryJson = JSONObject.parseObject(queryResult);
		
		if(Result.FAILURE.equals(queryJson.getString(Result.RESULT))) {
			return queryResult;
		}
		
		JSONObject result = new JSONObject();
		result.put(Result.RESULT, Result.SUCCESS);
		JSONObject item = new JSONObject();
		JSONArray queryContents = queryJson.getJSONArray(Result.CONTENT);
		if(queryContents != null && queryContents.size() > 0) {
			JSONObject queryItem = queryContents.getJSONObject(0);
			queryItem = queryItem.getJSONObject("infos");
			if(queryItem != null) {
				//建筑功能类型
				Map<String, String> buildingMap = dictionaryService.queryAllBuildingCode();
				//风向名称
				Map<String, String> directionMap = dictionaryService.queryAllDirectionCode();
				item.put("build_id", build_id);
				item.put("build_code", build_code);
				String build_local_id = queryItem.getString("BuildLocalID");
				item.put("build_local_id", build_local_id);
				String build_local_name = queryItem.getString("BuildLocalName");
				item.put("build_local_name", build_local_name);
				String BIMID = queryItem.getString("BIMID");
				item.put("BIMID", BIMID);
				String build_age = queryItem.getString("BuildAge");
				item.put("build_age", build_age);
				String build_func_type = queryItem.getString("BuildFuncType");
				item.put("build_func_type", build_func_type);
				//建筑功能类型名称，页面显示
				String build_func_type_name = buildingMap.get(build_func_type);
				item.put("build_func_type_name", build_func_type_name);
				String ac_type = queryItem.getString("ACType");
				item.put("ac_type", ac_type);
				String ac_type_name = ToolsUtil.acTypeMap.get(ac_type);
				item.put("ac_type_name", ac_type_name);
				String heat_type = queryItem.getString("HeatType");
				item.put("heat_type", heat_type);
				String heat_type_name = ToolsUtil.heatTypeMap.get(heat_type);
				item.put("heat_type_name", heat_type_name);
				String green_build_lev = queryItem.getString("GreenBuildLev");
				item.put("green_build_lev", green_build_lev);
				String green_build_lev_name = ToolsUtil.greenBuildLevMap.get(green_build_lev);
				item.put("green_build_lev_name", green_build_lev_name);
				String intro = queryItem.getString("Intro");
				item.put("intro", intro);
				JSONArray picture = queryItem.getJSONArray("Pic");
				item.put("picture", picture);
				String design_cool_load_index = queryItem.getString("DesignCoolLoadIndex");
				item.put("design_cool_load_index", design_cool_load_index);
				String design_heat_load_index = queryItem.getString("DesignHeatLoadIndex");
				item.put("design_heat_load_index", design_heat_load_index);
				String design_elec_load_index = queryItem.getString("DesignElecLoadIndex");
				item.put("design_elec_load_index", design_elec_load_index);
				String struct_type = queryItem.getString("StructType");
				item.put("struct_type", struct_type);
				String struct_type_name = ToolsUtil.structTypeMap.get(struct_type);
				item.put("struct_type_name", struct_type_name);
				String SFI = queryItem.getString("SFI");
				item.put("SFI", SFI);
				String SFI_name = ToolsUtil.SFIMap.get(SFI);
				item.put("SFI_name", SFI_name);
				String shape_coeff = queryItem.getString("ShapeCoeff");
				item.put("shape_coeff", shape_coeff);
				String build_direct = queryItem.getString("BuildDirect");
				item.put("build_direct", build_direct);
				String build_direct_name = directionMap.get(build_direct);
				item.put("build_direct_name", build_direct_name);
				String insulate_type = queryItem.getString("InsulateType");
				item.put("insulate_type", insulate_type);
				String insulate_type_name = ToolsUtil.insulateTypeMap.get(insulate_type);
				item.put("insulate_type_name", insulate_type_name);
				String GFA = queryItem.getString("GFA");
				item.put("GFA", GFA);
				String tot_height = queryItem.getString("TotHeight");
				item.put("tot_height", tot_height);
				String cover_area = queryItem.getString("CoverArea");
				item.put("cover_area", cover_area);
				JSONArray drawing = queryItem.getJSONArray("Drawing");
				item.put("drawing", drawing);
				JSONArray archive = queryItem.getJSONArray("Archive");
				item.put("archive", archive);
				JSONArray consum_model = queryItem.getJSONArray("EConsumModel");
				item.put("consum_model", consum_model);
				String permanent_people_num = queryItem.getString("PermanentPeopleNum");
				item.put("permanent_people_num", permanent_people_num);
			}
		}
		result.put("Item", item);
		return result.toJSONString();
	}

	@Override
	public String updateBuildInfo(JSONObject jsonObject) throws Exception {
		String project_id = jsonObject.getString("project_id");
		String build_id = jsonObject.getString("build_id");
		String build_code = jsonObject.getString("build_code");
		String info_point_code = jsonObject.getString("info_point_code");
		String infoPointCode = ToolsUtil.buildInfoParamMap.get(info_point_code);
		Object obj = jsonObject.get("info_point_value");
		String valid_time = jsonObject.getString("valid_time");
		String secret = projectCache.getProjectSecretById(project_id);
		String queryResult = objectInfoService.updateObjectInfo(build_code, infoPointCode, obj, valid_time, project_id, secret);
		JSONObject queryJson = JSONObject.parseObject(queryResult);
		if(Result.SUCCESS.equals(queryJson.getString(Result.RESULT))) {

			if("build_local_name".equals(info_point_code) 
					|| "build_age".equals(info_point_code) 
					|| "build_func_type".equals(info_point_code)) {
				String info_point_value = obj.toString();
				jsonObject.clear();
				jsonObject.put("build_id", build_id);
				jsonObject.put(info_point_code, info_point_value);
				jsonObject = JSONUtil.getUpdateParamJson(jsonObject, "build_id");
				queryResult = DBCommonMethods.updateRecord(DBConst.TABLE_BUILDING, jsonObject.toJSONString());
			}
		}
		
		return queryResult;
	}

	@Override
	public String queryBuildInfoPointHis(JSONObject jsonObject) throws Exception {
		String project_id = jsonObject.getString("project_id");
		String build_code = jsonObject.getString("build_code");
		String info_point_code = jsonObject.getString("info_point_code");
		String infoPointCode = ToolsUtil.buildInfoParamMap.get(info_point_code);
		String secret = projectCache.getProjectSecretById(project_id);
		return objectInfoService.queryObjectInfoHis(build_code, infoPointCode, project_id, secret);
	}

}
