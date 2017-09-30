package com.sagacloud.saas.service.impl;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.sagacloud.saas.common.DataRequestPathUtil;
import com.sagacloud.saas.common.StringUtil;
import com.sagacloud.saas.dao.DBConst.Result;
import com.sagacloud.saas.service.BaseService;
import com.sagacloud.saas.service.DictionaryServiceI;

import java.util.HashMap;
import java.util.Map;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;
@Service("dictionaryService")
public class DictionaryServiceImpl extends BaseService implements DictionaryServiceI {

	private static final Logger log = Logger.getLogger(DictionaryServiceImpl.class);
	/**
	 * 查询地理信息--省市信息
	 * @return
	 * @throws Exception
	 */
	public Map<String, String> queryAllRegionCode() throws Exception {
		Map<String, String> regionMap = new HashMap<>();
        String requestURL = this.getDataPlatDictPath(DataRequestPathUtil.dataPlat_dict_query ,"geography");
        String resultStr = this.httpGetRequest(requestURL);
		JSONObject resultJson = JSONObject.parseObject(resultStr);
		if("success".equals(resultJson.getString("Result"))){
			JSONObject contentJson = resultJson.getJSONObject("Content");
			JSONObject provinceItem, cityItem, cityInfo, districtItem;
			JSONArray proviceArray, cityArray, cityInfoArray, districtArray;
			//处理普通省市地区
			proviceArray = contentJson.getJSONArray("normal");
			if(proviceArray != null){
				for(int i=0; i<proviceArray.size(); i++){
					provinceItem = proviceArray.getJSONObject(i);
					//处理市级数据
					cityArray = provinceItem.getJSONArray("cities");
					for(int j=0; j<cityArray.size(); j++){
						cityItem = cityArray.getJSONObject(j);
						cityInfoArray = cityItem.getJSONArray("cityInfo");
						//处理市区数据
						districtArray = cityItem.getJSONArray("district");
						for(int k=0; k<districtArray.size(); k++){
							districtItem = districtArray.getJSONObject(k);
							regionMap.put(districtItem.getString("code"), districtItem.getString("districtName"));
						}
						//获取市级信息
						for(int k=0; k<cityInfoArray.size(); k++){
							cityInfo = cityInfoArray.getJSONObject(k);
							if(!cityInfo.getString("name").contains("市本级")) {
								regionMap.put(cityInfo.getString("code"), cityInfo.getString("name"));
								break;
							}
						}
					}
					//处理省级数据
					regionMap.put(StringUtil.completLengthFromRight(provinceItem.getString("provinceCode"), 6, "0"), provinceItem.getString("provinceName"));
				}
			}
			//处理直辖市
			proviceArray = contentJson.getJSONArray("specialCities");
			if(proviceArray != null){
				for(int i=0; i<proviceArray.size(); i++){
					provinceItem = proviceArray.getJSONObject(i);
					//处理市区信息
					districtArray = provinceItem.getJSONArray("district");
					for(int j=0; j<districtArray.size(); j++){
						districtItem = districtArray.getJSONObject(j);
						regionMap.put(districtItem.getString("code"), districtItem.getString("districtName"));
					}
					//处理市级信息
					cityInfoArray = provinceItem.getJSONArray("cityInfo");
					for(int j=0; j<cityInfoArray.size(); j++){
						cityInfo = cityInfoArray.getJSONObject(j);
						if(!cityInfo.getString("name").contains("市本级")){
							regionMap.put(cityInfo.getString("code"), cityInfo.getString("name"));
							break;
						}
					}
				}
			}
		}
		return regionMap;
	}

	/**
	 * 查询气候区
	 * @return
	 * @throws Exception
	 */
	public Map<String, String> queryAllClimateAreaCode() throws Exception {
		Map<String, String> climateMap = new HashMap<String, String>();
		String requestURL = this.getDataPlatDictPath(DataRequestPathUtil.dataPlat_dict_query ,"climate");
		String resultStr = this.httpGetRequest(requestURL);
		if(resultStr.contains(Result.SUCCESS)){
//			JSONObject climate, climateItem;
//			JSONArray climateArray;
			JSONObject climateJson = JSONObject.parseObject(resultStr);
			JSONArray climates = climateJson.getJSONArray("Content");
			getDictionaryCode(climateMap, climates);
//			for(int i=0; i<climates.size(); i++){
//				climate = climates.getJSONObject(i);
//				climateMap.put(climate.getString("code"), climate.getString("name"));
//				climateArray = climate.getJSONArray("content");
//				for(int j=0; j<climateArray.size(); j++){
//					climateItem = climateArray.getJSONObject(j);
//					climateMap.put(climateItem.getString("code"), climateItem.getString("name"));
//				}
//			}
		}
		return climateMap;
	}

	/**
	 * 查询发展水平
	 * @return
	 * @throws Exception
	 */
	public Map<String, String> queryAllDevelopmentLevelCode() throws Exception {
		Map<String, String> developMap = new HashMap<String, String>();
		String requestURL = this.getDataPlatDictPath(DataRequestPathUtil.dataPlat_dict_query ,"develop");
		String resultStr = this.httpGetRequest(requestURL);
		if(resultStr.contains("success")){
			JSONObject developJson = JSONObject.parseObject(resultStr);
			JSONArray develops = developJson.getJSONArray("Content");
			getDictionaryCode(developMap, develops);
		}
		return developMap;
	}

	public void getDictionaryCode(Map<String, String> dictionaryMap, JSONArray dictionarys){
		if(dictionarys == null || dictionarys.size() == 0){
			return;
		}
		JSONObject dictionary;
		for(int i=0; i<dictionarys.size(); i++){
			dictionary = dictionarys.getJSONObject(i);
			dictionaryMap.put(dictionary.getString("code"), dictionary.getString("name"));
			getDictionaryCode(dictionaryMap, dictionary.getJSONArray("content"));
		}
	}

	/**
	 * 查询所有设备类型的数据字典
	 * @return
	 * @throws Exception
	 */
	public String queryAllEquipmentCategory() throws Exception {
		String requestURL = this.getDataPlatDictPath(DataRequestPathUtil.dataPlat_dict_query ,"equipment_all");
		String resQuery = this.httpGetRequest(requestURL);
		return resQuery.replace("class", "name").replace("system", "name").replace("facility", "name");
	}

	/**
	 * 查询天气状态
	 * @return
	 * @throws Exception
	 */
	public Map<String, String> queryAllWeatherStatusCode() throws Exception{
		Map<String, String> weatherMap = new HashMap<String, String>();
		String requestURL = this.getDataPlatDictPath(DataRequestPathUtil.dataPlat_dict_query ,"weather");
		String resultStr = this.httpGetRequest(requestURL);
		if(resultStr.contains("success")){
			JSONObject weather;
			JSONObject weatherJson = JSONObject.parseObject(resultStr);
			JSONArray weathers = weatherJson.getJSONArray("Content");
			for(int i=0; i<weathers.size(); i++){
				weather = weathers.getJSONObject(i);
				weatherMap.put(weather.getString("code"), weather.getString("name"));
			}
		}
		return weatherMap;
	}

	/**
	 * 查询空气风力等级
	 * @return
	 * @throws Exception
	 */
	public Map<String, String> queryAllWindLevelCode() throws Exception{
		Map<String, String> windMap = new HashMap<String, String>();
		String requestURL = this.getDataPlatDictPath(DataRequestPathUtil.dataPlat_dict_query ,"wind");
		String resultStr = this.httpGetRequest(requestURL);
		if(resultStr.contains("success")){
			JSONObject wind;
			JSONObject windJson = JSONObject.parseObject(resultStr);
			JSONArray winds = windJson.getJSONArray("Content");
			for(int i=0; i<winds.size(); i++){
				wind = winds.getJSONObject(i);
				windMap.put(wind.getString("code"), wind.getString("name"));
			}
		}
		return windMap;
	}

	/**
	 * 查询方位信息
	 * @return
	 * @throws Exception
	 */
	public Map<String, String> queryAllDirectionCode() throws Exception{
		Map<String, String> directionMap = new HashMap<String, String>();
		String requestURL = this.getDataPlatDictPath(DataRequestPathUtil.dataPlat_dict_query ,"direction");
		String resultStr = this.httpGetRequest(requestURL);
		if(resultStr.contains("success")){
			JSONObject direction;
			JSONObject directionJson = JSONObject.parseObject(resultStr);
			JSONArray directions = directionJson.getJSONArray("Content");
			for(int i=0; i<directions.size(); i++){
				direction = directions.getJSONObject(i);
				directionMap.put(direction.getString("code"), direction.getString("name"));
			}
		}
		return directionMap;
	}

	

	/**
	 * 功能描述：数据字典:查询方位信息
	 * @return
	 * @throws Exception
	 */
	@Override
	public String queryAllListDirectionCode() throws Exception {
		String requestURL = this.getDataPlatDictPath(DataRequestPathUtil.dataPlat_dict_query ,"direction");
		return this.httpGetRequest(requestURL);
	}
	
	/**
	 * 查询建筑功能类型
	 * @return
	 * @throws Exception
	 */
	public Map<String, String> queryAllBuildingCode() throws Exception{
		Map<String, String> buildingMap = new HashMap<String, String>();
		String requestURL = this.getDataPlatDictPath(DataRequestPathUtil.dataPlat_dict_query ,"building");
		String resultStr = this.httpGetRequest(requestURL);
		if(resultStr.contains("success")){
//			JSONObject direction;
			JSONObject directionJson = JSONObject.parseObject(resultStr);
			JSONArray directions = directionJson.getJSONArray("Content");
			getDictionaryCode(buildingMap, directions);
//			for(int i=0; i<directions.size(); i++){
//				direction = directions.getJSONObject(i);
//				buildingMap.put(direction.getString("code"), direction.getString("name"));
//			}
		}
		return buildingMap;
	}
	
	/**
	 * 功能描述：查询建筑功能类型
	 * @return
	 * @throws Exception
	 */
	@Override
	public String queryAllListBuildingCode() throws Exception {
		String requestURL = this.getDataPlatDictPath(DataRequestPathUtil.dataPlat_dict_query ,"building");
		return this.httpGetRequest(requestURL);
	}

	/**
	 * 查询空间功能类型
	 * @return
	 * @throws Exception
	 */
	@Override
	public Map<String, String> queryAllSpaceCode() throws Exception{
		Map<String, String> spaceMap = new HashMap<String, String>();
		String requestURL = this.getDataPlatDictPath(DataRequestPathUtil.dataPlat_dict_query ,"space");
		String resultStr = this.httpGetRequest(requestURL);
		if(resultStr.contains("success")){
			JSONObject directionJson = JSONObject.parseObject(resultStr);
			JSONArray directions = directionJson.getJSONArray("Content");
			getDictionaryCode(spaceMap, directions);
		}
		return spaceMap;
	}

	/**
	 * 查询租赁业态
	 * @return
	 * @throws Exception
	 */
	public String queryAllRentalCode() throws Exception{
		String requestURL = this.getDataPlatDictPath(DataRequestPathUtil.dataPlat_dict_query ,"rental");
		return this.httpGetRequest(requestURL);
	}

    /**
     * 查询防尘等级
     * @return
     * @throws Exception
     */
    public String queryAllDustproofCode() throws Exception {
        String requestURL = this.getDataPlatDictPath(DataRequestPathUtil.dataPlat_dict_query ,"dustproof");
        return this.httpGetRequest(requestURL);
    }

    /**
     * 查询防水等级
     * @return
     * @throws Exception
     */
    @Override
    public String queryAllWaterproofCode() throws Exception {
        String requestURL = this.getDataPlatDictPath(DataRequestPathUtil.dataPlat_dict_query ,"waterproof");
        return this.httpGetRequest(requestURL);
    }

    /**
     * 查询防爆设备类型
     * @return
     * @throws Exception
     */
    public String queryAllDangerCode() throws Exception {
        String requestURL = this.getDataPlatDictPath(DataRequestPathUtil.dataPlat_dict_query ,"danger");
        return this.httpGetRequest(requestURL);
    }

    /**
     * 查询防爆型式
     * @return
     * @throws Exception
     */
    public String queryAllExplosionproofEquipmentCode() throws Exception {
        String requestURL = this.getDataPlatDictPath(DataRequestPathUtil.dataPlat_dict_query ,"explosionproof/equipment");
        return this.httpGetRequest(requestURL);
    }

    /**
     * 查询危险区域等级
     * @return
     * @throws Exception
     */
    public String queryAllExplosionproofGasTemperatureCode() throws Exception {
        String requestURL = this.getDataPlatDictPath(DataRequestPathUtil.dataPlat_dict_query ,"explosionproof/gas_temperature");
        return this.httpGetRequest(requestURL);
    }

    /**
     * 查询气体类型或温度类型
     * @return
     * @throws Exception
     */
    public String queryAllExplosionproofTypeCode() throws Exception {
        String requestURL = this.getDataPlatDictPath(DataRequestPathUtil.dataPlat_dict_query ,"explosionproof/type");
        return this.httpGetRequest(requestURL);
    }

	@Override
	public String queryAllEquipCategory() throws Exception {
		JSONObject result = new JSONObject();
		result.put(Result.RESULT, Result.SUCCESS);
		JSONArray contents = new JSONArray();
		result.put(Result.CONTENT, contents);
		
		//获取数据字典中 专业-系统-设备类型 树形结构
		String requestUrl = getDataPlatDictPath(DataRequestPathUtil.dataPlat_dict_query, "equipment_all");
		
		String equipmentStr = this.httpGetRequest(requestUrl);
//		if(StringUtil.isNull(equipmentStr)) {
//			return result.toJSONString();
//		}
		JSONObject equipmentJson = JSONObject.parseObject(equipmentStr);
		if(Result.FAILURE.equals(equipmentJson.getString(Result.RESULT))) {
			return equipmentStr;
		}
		JSONArray resultContents = equipmentJson.getJSONArray(Result.CONTENT);
		if(resultContents == null || resultContents.size() == 0) {
			return result.toJSONString();
		}
		for (int i = 0; i < resultContents.size(); i++) {
			JSONObject professionObj = resultContents.getJSONObject(i);
			String professionCode = professionObj.getString("code");
			String professionName = professionObj.getString("class");
			JSONObject resultProfession = new JSONObject();
			resultProfession.put("code", professionCode);
			resultProfession.put("name", professionName);
			contents.add(resultProfession);
			JSONArray systemContents = professionObj.getJSONArray("content");
			if(systemContents == null || systemContents.size()  == 0) {
				continue;
			}
			JSONArray resultProfessionContent = new JSONArray();
			resultProfession.put("content", resultProfessionContent);
			for (int j = 0; j < systemContents.size(); j++) {
				JSONObject systemObj = systemContents.getJSONObject(j);
				String systemCode = systemObj.getString("code");
				String systemName = systemObj.getString("system");
				JSONObject resultSystem = new JSONObject();
				resultSystem.put("code", systemCode);
				resultSystem.put("name", systemName);
//				resultSystem.put("type", "system");
				resultProfessionContent.add(resultSystem);
				
				JSONArray facilityContents = systemObj.getJSONArray("content");
				if(facilityContents == null || facilityContents.size()  == 0) {
					continue;
				}
				JSONArray resultSystemContent = new JSONArray();
				resultSystem.put("content", resultSystemContent);
				for (int k = 0; k < facilityContents.size(); k++) {
					JSONObject facilityObj = facilityContents.getJSONObject(k);
					String facilityCode = facilityObj.getString("code");
					String facilityName = facilityObj.getString("facility");
					JSONObject resultFacility = new JSONObject();
					resultFacility.put("code", facilityCode);
					resultFacility.put("name", facilityName);
//					resultFacility.put("type", "equip");
					resultSystemContent.add(resultFacility);
				}
			}
			
		}
		
		return result.toJSONString();
	}
	@Override
	public Map<String,String> queryAllEquipCategoryMap() throws Exception {
		Map<String, String> equipCategoryMap = new HashMap<>();
		
		//获取数据字典中 专业-系统-设备类型 树形结构
		String requestUrl = getDataPlatDictPath(DataRequestPathUtil.dataPlat_dict_query, "equipment_all");
		
		String equipmentStr = this.httpGetRequest(requestUrl);
		JSONObject equipmentJson = JSONObject.parseObject(equipmentStr);
		if(Result.FAILURE.equals(equipmentJson.getString(Result.RESULT))) {
			return equipCategoryMap;
		}
		JSONArray resultContents = equipmentJson.getJSONArray(Result.CONTENT);
		if(resultContents == null || resultContents.size() == 0) {
			return equipCategoryMap;
		}
		for (int i = 0; i < resultContents.size(); i++) {
			JSONObject professionObj = resultContents.getJSONObject(i);
			String professionCode = professionObj.getString("code");
			String professionName = professionObj.getString("class");
			equipCategoryMap.put(professionCode, professionName);
			JSONArray systemContents = professionObj.getJSONArray("content");
			if(systemContents == null || systemContents.size()  == 0) {
				continue;
			}
			for (int j = 0; j < systemContents.size(); j++) {
				JSONObject systemObj = systemContents.getJSONObject(j);
				String systemCode = systemObj.getString("code");
				String systemName = systemObj.getString("system");
				equipCategoryMap.put(systemCode, systemName);
				JSONArray facilityContents = systemObj.getJSONArray("content");
				if(facilityContents == null || facilityContents.size()  == 0) {
					continue;
				}
				for (int k = 0; k < facilityContents.size(); k++) {
					JSONObject facilityObj = facilityContents.getJSONObject(k);
					String facilityCode = facilityObj.getString("code");
					String facilityName = facilityObj.getString("facility");
					equipCategoryMap.put(facilityCode, facilityName);
				}
			}
			
		}
		
		return equipCategoryMap;
	}
	/**
	 * 查询租赁业态
	 * @return
	 * @throws Exception
	 */
	@Override
	public Map<String, String> queryAllRentalCodeMap() throws Exception{
		Map<String, String> rentalMap = new HashMap<>();
		String requestURL = this.getDataPlatDictPath(DataRequestPathUtil.dataPlat_dict_query ,"rental");
		String resultStr = this.httpGetRequest(requestURL);
		if(resultStr.contains("success")){
			JSONObject rentalJson = JSONObject.parseObject(resultStr);
			JSONArray rentals = rentalJson.getJSONArray("Content");
			getDictionaryCode(rentalMap, rentals);
		}
		return rentalMap;
	}
	

	  /**
	   * 查询防尘等级
	   * @return
	   * @throws Exception
	   */
		@Override
	  public Map<String, String> queryAllDustproofCodeMap() throws Exception {
			Map<String, String> dustproofMap = new HashMap<>();
	      String requestURL = this.getDataPlatDictPath(DataRequestPathUtil.dataPlat_dict_query ,"dustproof");
	      String resultStr = this.httpGetRequest(requestURL);
			if(resultStr.contains("success")){
				JSONObject direction;
				JSONObject directionJson = JSONObject.parseObject(resultStr);
				JSONArray directions = directionJson.getJSONArray("Content");
				for(int i=0; i<directions.size(); i++){
					direction = directions.getJSONObject(i);
					dustproofMap.put(direction.getString("code"), direction.getString("name"));
				}
			}
			return dustproofMap;
	  }
	/**
     * 查询防水等级
     * @return
     * @throws Exception
     */
    public Map<String, String> queryAllWaterproofCodeMap() throws Exception {
    	Map<String, String> waterproofMap = new HashMap<>();
        String requestURL = this.getDataPlatDictPath(DataRequestPathUtil.dataPlat_dict_query ,"waterproof");
        String resultStr = this.httpGetRequest(requestURL);
		if(resultStr.contains("success")){
			JSONObject direction;
			JSONObject directionJson = JSONObject.parseObject(resultStr);
			JSONArray directions = directionJson.getJSONArray("Content");
			for(int i=0; i<directions.size(); i++){
				direction = directions.getJSONObject(i);
				waterproofMap.put(direction.getString("code"), direction.getString("name"));
			}
		}
		return waterproofMap;
    }
	

    /**
     * 查询防爆设备类型
     * @return
     * @throws Exception
     */
    public Map<String, String> queryAllDangerCodeMap() throws Exception {
    	Map<String, String> dangerTypeMap = new HashMap<>();
        String requestURL = this.getDataPlatDictPath(DataRequestPathUtil.dataPlat_dict_query ,"danger");
        String resultStr = this.httpGetRequest(requestURL);
		if(resultStr.contains("success")){
			JSONObject direction;
			JSONObject directionJson = JSONObject.parseObject(resultStr);
			JSONArray directions = directionJson.getJSONArray("Content");
			for(int i=0; i<directions.size(); i++){
				direction = directions.getJSONObject(i);
				dangerTypeMap.put(direction.getString("code"), direction.getString("name"));
			}
		}
		return dangerTypeMap;
    }
    
    /**
     * 查询防爆型式
     * @return
     * @throws Exception
     */
    public Map<String, String> queryAllExplosionproofEquipmentCodeMap() throws Exception {
    	Map<String, String> proofEquipmentMap = new HashMap<>();
        String requestURL = this.getDataPlatDictPath(DataRequestPathUtil.dataPlat_dict_query ,"explosionproof/equipment");
        String resultStr = this.httpGetRequest(requestURL);
		if(resultStr.contains("success")){
			JSONObject rentalJson = JSONObject.parseObject(resultStr);
			JSONArray rentals = rentalJson.getJSONArray("Content");
			getDictionaryCode(proofEquipmentMap, rentals);
		}
		return proofEquipmentMap;
    }
    
    /**
     * 查询危险区域等级
     * @return
     * @throws Exception
     */
    public Map<String, String> queryAllExplosionproofGasTemperatureCodeMap() throws Exception {
    	Map<String, String> gasTemperatureMap = new HashMap<>();
        String requestURL = this.getDataPlatDictPath(DataRequestPathUtil.dataPlat_dict_query ,"explosionproof/gas_temperature");
        String resultStr = this.httpGetRequest(requestURL);
		if(resultStr.contains("success")){
			JSONObject direction;
			JSONObject directionJson = JSONObject.parseObject(resultStr);
			JSONArray directions = directionJson.getJSONArray("Content");
			for(int i=0; i<directions.size(); i++){
				direction = directions.getJSONObject(i);
				gasTemperatureMap.put(direction.getString("code"), direction.getString("name"));
			}
		}
		return gasTemperatureMap;
    }
    
    

    /**
     * 查询气体类型或温度类型
     * @return
     * @throws Exception
     */
    public Map<String, String> queryAllExplosionproofTypeCodeMap() throws Exception {
    	Map<String, String> proofTypeMap = new HashMap<>();
        String requestURL = this.getDataPlatDictPath(DataRequestPathUtil.dataPlat_dict_query ,"explosionproof/type");
        String resultStr = this.httpGetRequest(requestURL);
		if(resultStr.contains("success")){
			JSONObject rentalJson = JSONObject.parseObject(resultStr);
			JSONArray rentals = rentalJson.getJSONArray("Content");
			getDictionaryCode(proofTypeMap, rentals);
		}
		return proofTypeMap;
    }
    /**
     * 查询污秽等级
     * @return
     * @throws Exception
     */
    public Map<String, String> queryAllContaminationLevelCodeMap() throws Exception {
    	Map<String, String> contaminationLevelMap = new HashMap<>();
    	String requestURL = this.getDataPlatDictPath(DataRequestPathUtil.dataPlat_dict_query ,"contamination_level");
    	String resultStr = this.httpGetRequest(requestURL);
    	if(resultStr.contains("success")){
    		JSONObject direction;
    		JSONObject directionJson = JSONObject.parseObject(resultStr);
    		JSONArray directions = directionJson.getJSONArray("Content");
    		for(int i=0; i<directions.size(); i++){
    			direction = directions.getJSONObject(i);
    			contaminationLevelMap.put(direction.getString("code"), direction.getString("name"));
    		}
    	}
    	return contaminationLevelMap;
    }
    

    /**
     * 查询污染等级
     * @return
     * @throws Exception
     */
    public Map<String, String> queryAllPollutionLevelCodeMap() throws Exception {
    	Map<String, String> pollutionLevelMap = new HashMap<>();
        String requestURL = this.getDataPlatDictPath(DataRequestPathUtil.dataPlat_dict_query ,"pollution_level");
        String resultStr = this.httpGetRequest(requestURL);
		if(resultStr.contains("success")){
			JSONObject direction;
			JSONObject directionJson = JSONObject.parseObject(resultStr);
			JSONArray directions = directionJson.getJSONArray("Content");
			for(int i=0; i<directions.size(); i++){
				direction = directions.getJSONObject(i);
				pollutionLevelMap.put(direction.getString("code"), direction.getString("name"));
			}
		}
		return pollutionLevelMap;
    }
    
	/**
	 * 
	 * 功能描述：查询数据字典数据
	 * @param name
	 * @return 
	 * @创建者 wanghailong
	 * @邮箱 wanghailong@persagy.com 
	 * 修改描述
	 */
    @Override
	public Map<String, String> queryDictionaryDataByName(String name){
		Map<String, String> map = null;
		if(null == name || "".equals(name)) return map;
		try {
			if(name.contains("省市区代码")){
				map = queryAllRegionCode();
			}else if(name.contains("气候区代码")){
				map = queryAllClimateAreaCode();
			}else if(name.contains("天气状态")){
				map = queryAllWeatherStatusCode();
			}else if(name.contains("空气风力等级")){
				map = queryAllWindLevelCode();
			}else if(name.contains("方向代码")){
				map = queryAllDirectionCode();
			}else if(name.contains("建筑功能类型")){
				map = queryAllBuildingCode();
			}else if(name.contains("空间功能类型")){
				map = queryAllSpaceCode();
			}else if(name.contains("租赁业态类型")){
				map = queryAllRentalCodeMap();
			}else if(name.contains("防尘等级")){
				map = queryAllDustproofCodeMap();
			}else if(name.contains("防水等级")){
				map = queryAllWaterproofCodeMap();
			}else if(name.contains("防爆设备类型")){
				map = queryAllDangerCodeMap();
			}else if(name.contains("防爆型式")){
				map = queryAllExplosionproofEquipmentCodeMap();
			}else if(name.contains("危险区域等级")){
				map = queryAllExplosionproofGasTemperatureCodeMap();
			}else if(name.contains("气体类型") || name.contains("温度类型") ){
				map = queryAllExplosionproofTypeCodeMap();
			}else if(name.contains("防爆等级")){
//				map = queryAllPollutionLevelCode();
			}else if(name.contains("污秽等级")){
				map = queryAllContaminationLevelCodeMap();
			}else if(name.contains("污染等级")){
				map = queryAllPollutionLevelCodeMap();
			}else {
				log.info("未查到数据字典["+name+"]的信息!");
			}
		} catch (Exception e) {
			log.info("未查到数据字典["+name+"]的信息!");
		}
	
		return map;
	}
    
    @Override
	public Map<String, String> queryEquipmentCategory() throws Exception {
		Map<String, String> equipmentCategoryMap = new HashMap<>();
		String url = getDataPlatDictPath(DataRequestPathUtil.dataPlat_dict_query, "equipment_all");
		String queryResult = httpGetRequest(url);
		JSONObject queryJson = JSONObject.parseObject(queryResult);
		if(Result.SUCCESS.equals(queryJson.getString(Result.RESULT))) {
			JSONArray queryContents = queryJson.getJSONArray(Result.CONTENT);
			if(queryContents != null && queryContents.size() > 0) {
				for (int i = 0; i < queryContents.size(); i++) {
					queryJson = queryContents.getJSONObject(i);
					String code = queryJson.getString("code");
					String name = queryJson.getString("class");
					equipmentCategoryMap.put(code, name);
					JSONArray systemContents = queryJson.getJSONArray("content");
					if(systemContents != null && systemContents.size() > 0) {
						for (int j = 0; j < systemContents.size(); j++) {
							JSONObject system = systemContents.getJSONObject(j);
							code = system.getString("code");
							name = system.getString("system");
							equipmentCategoryMap.put(code, name);
							JSONArray categoryContents = system.getJSONArray("content");
							if(categoryContents != null && categoryContents.size() > 0) {
								for (int k = 0; k < categoryContents.size(); k++) {
									JSONObject category = categoryContents.getJSONObject(k);
									code = category.getString("code");
									name = category.getString("facility");
									equipmentCategoryMap.put(code, name);
								}
							}
						}
					}
				}
			}
		}
		return equipmentCategoryMap;
	}
    

}
