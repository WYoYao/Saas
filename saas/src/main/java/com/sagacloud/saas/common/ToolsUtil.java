/**
 * @包名称 com.sagacloud.common
 * @文件名 ToolsUtil.java
 * @创建者 wanghailong
 * @邮箱 wanghailong@persagy.com  
 * @修改描述 
 */

package com.sagacloud.saas.common;

import java.io.UnsupportedEncodingException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.sagacloud.saas.dao.DBConst.Result;

import sun.misc.BASE64Encoder;

/** 
 * 功能描述： 常用工具方法
 * @类型名称 ToolsUtil
 * @创建者 wanghailong
 * @邮箱 wanghailong@persagy.com  
 * @修改描述 
 */
public class ToolsUtil {
    //返回项-缺少必填项
    public final static String return_error_json = "{\"Result\":\"failure\",\"ResultMsg\":\"缺少必填项\"}";
    public static String errorJsonMsg(String msg) {
        JSONObject jsonRes = new JSONObject();
		jsonRes.put("Result", "failure");
		jsonRes.put("ResultMsg", msg);
		return jsonRes.toString();
    }
	public static String successJsonMsg(JSONArray array) {
		JSONObject jsonRes = new JSONObject();
		jsonRes.put("Result", "success");
		jsonRes.put("Content", array);
		jsonRes.put("Count", array.size());
		return jsonRes.toString();
	}
	public static String successJsonMsg(JSONObject Item) {
		JSONObject jsonRes = new JSONObject();
		jsonRes.put("Result", "success");
		jsonRes.put("Item", Item);
		return jsonRes.toString();
	}
	public static String successJsonMsg(String msg) {
		JSONObject jsonRes = new JSONObject();
		jsonRes.put("Result", "success");
		jsonRes.put("ResultMsg", msg);
		return jsonRes.toString();
	}
    //当前室外环境,降水类型，1-无， 2-雨， 3-雪 ，4-雾露霜 ，5-雨夹雪， 6-其他
    public static final Map<String, String> precipitationTypeMap = new HashMap<>();
    
    
    static {
    	precipitationTypeMap.put("1", "无");
    	precipitationTypeMap.put("2", "雨");
    	precipitationTypeMap.put("3", "雪");
    	precipitationTypeMap.put("4", "雾露霜");
    	precipitationTypeMap.put("5", "雨夹雪");
    	precipitationTypeMap.put("6", "其他");
    	
    	
    }
    
    //项目信息字段转换
    public static final Map<String,String> projectInfoParamMap = new HashMap<>();
    
    static {
    	projectInfoParamMap.put("project_local_id", "ProjLocalID");
    	projectInfoParamMap.put("project_local_name", "ProjLocalName");
    	projectInfoParamMap.put("BIMID", "BIMID");
    	projectInfoParamMap.put("group", "Group");
    	projectInfoParamMap.put("owner", "Owner");
    	projectInfoParamMap.put("designer", "Designer");
    	projectInfoParamMap.put("constructors", "Constructor");
    	projectInfoParamMap.put("property", "Property");
    	projectInfoParamMap.put("group_manage_zone", "GroupManageZone");
    	projectInfoParamMap.put("group_operate_zone", "GroupOperateZone");
    }
    //建筑信息字段转换
    public static final Map<String,String> buildInfoParamMap = new HashMap<>();
    
    static {
    	buildInfoParamMap.put("build_local_id", "BuildLocalID");
    	buildInfoParamMap.put("build_local_name", "BuildLocalName");
    	buildInfoParamMap.put("BIMID", "BIMID");
    	buildInfoParamMap.put("build_age", "BuildAge");
    	buildInfoParamMap.put("build_func_type", "BuildFuncType");
    	buildInfoParamMap.put("ac_type", "ACType");
    	buildInfoParamMap.put("heat_type", "HeatType");
    	buildInfoParamMap.put("green_build_lev", "GreenBuildLev");
    	buildInfoParamMap.put("intro", "Intro");
    	buildInfoParamMap.put("picture", "Pic");
    	buildInfoParamMap.put("design_cool_load_index", "DesignCoolLoadIndex");
    	buildInfoParamMap.put("design_heat_load_index", "DesignHeatLoadIndex");
    	buildInfoParamMap.put("design_elec_load_index", "DesignElecLoadIndex");
    	buildInfoParamMap.put("struct_type", "StructType");
    	buildInfoParamMap.put("SFI", "SFI");
    	buildInfoParamMap.put("shape_coeff", "ShapeCoeff");
    	buildInfoParamMap.put("build_direct", "BuildDirect");
    	buildInfoParamMap.put("insulate_type", "InsulateType");
    	buildInfoParamMap.put("GFA", "GFA");
    	buildInfoParamMap.put("tot_height", "TotHeight");
    	buildInfoParamMap.put("cover_area", "CoverArea");
    	buildInfoParamMap.put("drawing", "Drawing");
    	buildInfoParamMap.put("archive", "Archive");
    	buildInfoParamMap.put("consum_model", "EConsumModel");
    	buildInfoParamMap.put("permanent_people_num", "PermanentPeopleNum");
    }
    
    //楼层信息字段转换
    public static final Map<String,String> floorInfoParamMap = new HashMap<>();
    
    static {
    	floorInfoParamMap.put("floor_id", "FloorID");
    	floorInfoParamMap.put("floor_local_id", "FloorLocalID");
    	floorInfoParamMap.put("floor_local_name", "FloorLocalName");
    	floorInfoParamMap.put("BIMID", "BIMID");
    	floorInfoParamMap.put("floor_sequence_id", "FloorSequenceID");
    	floorInfoParamMap.put("floor_type", "FloorType");
    	floorInfoParamMap.put("area", "Area");
    	floorInfoParamMap.put("net_height", "NetHeight");
    	floorInfoParamMap.put("floor_func_type", "FloorFuncType");
    	floorInfoParamMap.put("permanent_people_num", "PermanentPeopleNum");
    	floorInfoParamMap.put("out_people_flow", "OutPeopleFlow");
    	floorInfoParamMap.put("in_people_flow", "InPeopleFlow");
    	floorInfoParamMap.put("exsit_people_num", "ExsitPeopleNum");
    }
    
    //系统信息字段转换
    public static final Map<String,String> systemInfoParamMap = new HashMap<>();
    
    static {
    	systemInfoParamMap.put("system_id", "SysID");
    	systemInfoParamMap.put("system_name", "SysName");
    	systemInfoParamMap.put("system_local_id", "SysLocalID");
    	systemInfoParamMap.put("system_local_name", "SysLocalName");
    	systemInfoParamMap.put("BIMID", "BIMID");
    }


    //空间信息字段转换
    public static final Map<String,String> spaceInfoParamMap = new HashMap<>();
    
    static {
    	spaceInfoParamMap.put("space_id", "RoomID");
    	spaceInfoParamMap.put("room_local_id", "RoomLocalID");
    	spaceInfoParamMap.put("room_local_name", "RoomLocalName");
    	spaceInfoParamMap.put("BIMID", "BIMID");
    	spaceInfoParamMap.put("RoomQRCode", "room_qr_code");
    	spaceInfoParamMap.put("room_func_type", "RoomFuncType");
    	spaceInfoParamMap.put("length", "Length");
    	spaceInfoParamMap.put("width", "Width");
    	spaceInfoParamMap.put("height", "Height");
    	spaceInfoParamMap.put("area", "Area");
    	spaceInfoParamMap.put("elec_cap", "ElecCap");
    	spaceInfoParamMap.put("intro", "Intro");
    	spaceInfoParamMap.put("tenant_type", "TenantType");
    	spaceInfoParamMap.put("tenant", "Tenant");
    	spaceInfoParamMap.put("permanent_people_num", "PermanentPeopleNum");
    	spaceInfoParamMap.put("out_people_flow", "OutPeopleFlow");
    	spaceInfoParamMap.put("in_people_flow", "InPeopleFlow");
    	spaceInfoParamMap.put("exsit_people_num", "ExsitPeopleNum");
    	spaceInfoParamMap.put("elec_power", "ElecP");
    	spaceInfoParamMap.put("cool_consum", "CoolConsum");
    	spaceInfoParamMap.put("heat_consum", "HeatConsum");
    	spaceInfoParamMap.put("ac_water_press", "ACWaterPress");
    	spaceInfoParamMap.put("water_consum", "WaterConsum");
    	spaceInfoParamMap.put("water_press", "WaterPress");
    	spaceInfoParamMap.put("hot_water_consum", "DHWConsum");
    	spaceInfoParamMap.put("hot_water_press", "DHWPress");
    	spaceInfoParamMap.put("gas_consum", "GasConsum");
    	spaceInfoParamMap.put("gas_press", "GasPress");
    	spaceInfoParamMap.put("PMV", "PMV");
    	spaceInfoParamMap.put("PPD", "PPD");
    }
    
    
    //空间信息字段转换
    public static final Map<String,String> equipInfoParamMap = new HashMap<>();
    
    static {
    	equipInfoParamMap.put("equip_id", "EquipID");
    	equipInfoParamMap.put("equip_local_id", "EquipLocalID");
    	equipInfoParamMap.put("equip_local_name", "EquipLocalName");
    	equipInfoParamMap.put("equip_qr_code", "EquipQRCode");
    	equipInfoParamMap.put("BIMID", "BIMID");
    	equipInfoParamMap.put("brand", "Brand");
    	equipInfoParamMap.put("specification", "Specification");
    	equipInfoParamMap.put("manufacturer", "Manufacturer");
    	equipInfoParamMap.put("product_date", "ProductDate");
    	equipInfoParamMap.put("serial_num", "SerialNum");
    	equipInfoParamMap.put("length", "Length");
    	equipInfoParamMap.put("width", "Width");
    	equipInfoParamMap.put("height", "Height");
    	equipInfoParamMap.put("mass", "Mass");
    	equipInfoParamMap.put("material", "Material");
    	equipInfoParamMap.put("dept", "Dept");
    	equipInfoParamMap.put("drawing", "InstallDrawing");
//    	equipInfoParamMap.put("picture", "InstallPic")pictrue重复了;
    	equipInfoParamMap.put("check_report", "CheckReport");
    	equipInfoParamMap.put("supplier", "Supplier");
    	equipInfoParamMap.put("supplier_phone", "SupplierPhone");
    	equipInfoParamMap.put("supplier_contactor", "SupplierContactor");
    	equipInfoParamMap.put("supplier_web", "SupplierWeb");
    	equipInfoParamMap.put("supplier_fax", "SupplierFax");
    	equipInfoParamMap.put("supplier_email", "SupplierEmail");
    	equipInfoParamMap.put("contract_id", "SupplierContractID");
    	equipInfoParamMap.put("asset_id", "AssetID");
    	equipInfoParamMap.put("purchase_price", "PurchasePrice");
    	equipInfoParamMap.put("principal", "Principal");
    	equipInfoParamMap.put("maintain_id", "MaintainID");
    	equipInfoParamMap.put("start_date", "StartDate");
    	equipInfoParamMap.put("maintain_deadline", "MaintainDeadline");
    	equipInfoParamMap.put("service_life", "ServiceLife");
    	equipInfoParamMap.put("expect_scrap_date", "ExpectScrapDate");
    	equipInfoParamMap.put("warranty", "Warranty");
    	equipInfoParamMap.put("maintain_cycle", "MaintainPeriod");
    	equipInfoParamMap.put("maintainer", "Maintainer");
    	equipInfoParamMap.put("maintainer_phone", "MaintainerPhone");
    	equipInfoParamMap.put("maintainer_contactor", "MaintainerContactor");
    	equipInfoParamMap.put("maintainer_web", "MaintainerWeb");
    	equipInfoParamMap.put("maintainer_fax", "MaintainerFax");
    	equipInfoParamMap.put("maintainer_email", "MaintainerEmail");
    	equipInfoParamMap.put("status", "Status");
    	equipInfoParamMap.put("insurer", "Insurer");
    	equipInfoParamMap.put("insurer_contactor", "InsurerContactor");
    	equipInfoParamMap.put("insurer_phone", "InsurerPhone");
    	equipInfoParamMap.put("insurer_num", "InsuranceNum");
    	equipInfoParamMap.put("insurance_file", "InsuranceFile");
    	equipInfoParamMap.put("nameplate", "Nameplate");
    	equipInfoParamMap.put("picture", "Pic");
    	equipInfoParamMap.put("archive", "Archive");
    }
    
    //空调类型
    public static final Map<String,String> acTypeMap = new HashMap<>();
    
    static {
    	acTypeMap.put("1", "中央空调系统");
    	acTypeMap.put("2", "分散空调系统");
    	acTypeMap.put("3", "混合系统");
    	acTypeMap.put("4", "其他");
    }
    //采暖类型
    public static final Map<String,String> heatTypeMap = new HashMap<>();
    
    static {
    	heatTypeMap.put("1", "城市热网");
    	heatTypeMap.put("2", "锅炉");
    	heatTypeMap.put("3", "热泵");
    	heatTypeMap.put("4", "其他");
    }
    //绿建等级
    public static final Map<String,String> greenBuildLevMap = new HashMap<>();
    
    static {
    	heatTypeMap.put("1", "无");
    	heatTypeMap.put("2", "一星级");
    	heatTypeMap.put("3", "二星级");
    	heatTypeMap.put("4", "三星级");
    	heatTypeMap.put("5", "其他");
    }
    //建筑结构类型
    public static final Map<String,String> structTypeMap = new HashMap<>();
    
    static {
    	structTypeMap.put("1", "钢筋混凝土结构");
    	structTypeMap.put("2", "钢架与玻璃幕墙");
    	structTypeMap.put("3", "砖混结构");
    	structTypeMap.put("4", "其他");
    }
    //抗震设防烈度
    public static final Map<String,String> SFIMap = new HashMap<>();
    
    static {
    	SFIMap.put("1", "6度");
    	SFIMap.put("2", "7度");
    	SFIMap.put("3", "8度");
    	SFIMap.put("4", "9度");
    	SFIMap.put("5", "其他");
    }
    //保温类型名称
    public static final Map<String,String> insulateTypeMap = new HashMap<>();
    
    static {
    	insulateTypeMap.put("1", "无保温");
    	insulateTypeMap.put("2", "内保温");
    	insulateTypeMap.put("3", "外保温");
    	insulateTypeMap.put("4", "其他");
    }
    
    public static String getUuid() {
    	String uuid = UUID.randomUUID().toString().replace("-","");
    	return uuid;
    }

    
    /**
     * 功能描述：saas系统字段向数据平台字段转换
     * @param oldObj    
     * @param parmas  新旧字段转换map
     * @return
     */
    public static JSONObject transformParam(JSONObject oldObj, Map<String,String> parmas) {
    	JSONObject newObj = new JSONObject();
    	for(String key : oldObj.keySet()) {
    		String newKey = parmas.get(key);
    		String value = oldObj.getString(key);
    		if(!StringUtil.isNull(newKey) && value != null) {
    			JSONArray values = new JSONArray();
    			JSONObject valueJson = new JSONObject();
    			valueJson.put("value", value);
    			values.add(valueJson);
    			newObj.put(newKey, values);
    		}
    	}
    	return newObj;
    }
    
    /**
     * 倒序排序
     * @param array
     * @return
     */
    public static JSONArray sortDesc(JSONArray array){
        JSONArray newArray = new JSONArray();
        for(int i=array.size()-1; i>-1; i--){
            newArray.add(array.get(i));
        }
        return newArray;
    }

    /**
     * 根据条件过滤数组字段
     * @param array
     * @param filterCondition
     * @return
     */
    public static JSONArray filterRemind(JSONArray array, JSONArray filterCondition){
        JSONArray newArray = new JSONArray();
        JSONObject item, newItem;
        if(array != null){
            for(int i=0; i<array.size(); i++){
                item = array.getJSONObject(i);
                newItem = new JSONObject();
                for(int j=0; j<filterCondition.size(); j++){
                    newItem.put(filterCondition.getString(j), item.get(filterCondition.getString(j)));
                }
                newArray.add(newItem);
            }
        }
        return newArray;
    }
    /**
     * 根据条件过滤数组字段
     * @param filterCondition
     * @return
     */
    public static JSONObject filterRemind(JSONObject jsonObject, JSONArray filterCondition){
    	JSONObject newItem = new JSONObject();
    	if(jsonObject != null){
			for(int j=0; j<filterCondition.size(); j++){
				newItem.put(filterCondition.getString(j), jsonObject.get(filterCondition.getString(j)));
			}
    	}
    	return newItem;
    }
    /**
     * 根据条件过滤数组字段
     * @param array
     * @param filterConditions
     * @return
     */
    public static JSONArray filterRemind(JSONArray array, String... filterConditions){
    	JSONArray newArray = new JSONArray();
    	JSONObject item, newItem;
    	if(array != null){
    		for(int i=0; i<array.size(); i++){
    			item = array.getJSONObject(i);
    			newItem = new JSONObject();
    			for(String filterCondition : filterConditions){
    				newItem.put(filterCondition, item.get(filterCondition));
    			}
    			newArray.add(newItem);
    		}
    	}
    	return newArray;
    }
    /**
     * 根据条件过滤数组字段
     * @param queryResult
     * @param filterConditions
     * @return
     */
    public static String filterRemind(String queryResult, String... filterConditions){
    	if(queryResult.contains(Result.RESULT) && queryResult.contains(Result.CONTENT)) {
    		JSONObject resultJson = JSONObject.parseObject(queryResult);
			JSONArray contents = resultJson.getJSONArray(Result.CONTENT);
			contents = filterRemind(contents, filterConditions);
			resultJson.put(Result.CONTENT, contents);
			queryResult = JSON.toJSONString(resultJson);
    	}
    	return queryResult;
    }
    /**
     * 根据条件过滤数组字段
     * @param queryResult
     * @param filterCondition
     * @return
     */
    public static String filterRemind(String queryResult, JSONArray filterCondition){
    	if(queryResult.contains(Result.RESULT) && queryResult.contains(Result.CONTENT)) {
    		JSONObject resultJson = JSONObject.parseObject(queryResult);
    		JSONArray contents = resultJson.getJSONArray(Result.CONTENT);
    		contents = filterRemind(contents, filterCondition);
    		resultJson.put(Result.CONTENT, contents);
    		queryResult = JSON.toJSONString(resultJson);
    	}
    	return queryResult;
    }

    /**
     * MD5加密
     * @param str
     * @return
     * @throws NoSuchAlgorithmException
     * @throws UnsupportedEncodingException
     */
    public static String encodeByMd5(String str) throws NoSuchAlgorithmException, UnsupportedEncodingException {
        //确定计算方法
        MessageDigest md5= MessageDigest.getInstance("MD5");
        BASE64Encoder base64en = new BASE64Encoder();
        //加密后的字符串
        String newstr=base64en.encode(md5.digest(str.getBytes("utf-8")));
        return newstr;
    }
    
}
