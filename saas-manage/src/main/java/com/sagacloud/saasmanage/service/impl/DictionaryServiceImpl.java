package com.sagacloud.saasmanage.service.impl;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.sagacloud.saasmanage.common.DataRequestPathUtil;
import com.sagacloud.saasmanage.common.StringUtil;
import com.sagacloud.saasmanage.service.BaseService;
import com.sagacloud.saasmanage.service.DictionaryServiceI;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Service;
@Service("dictionaryService")
public class DictionaryServiceImpl extends BaseService implements DictionaryServiceI {

	/**
	 * 查询地理信息--省市信息
	 * @return
	 * @throws Exception
	 */
	public String queryAllRegionCode() throws Exception {
        String requestURL = this.getDataPlatDictPath(DataRequestPathUtil.dataPlat_dict_query ,"geography");
        String resultStr = this.httpGetRequest(requestURL);
		JSONObject resultJson = JSONObject.parseObject(resultStr);
		if("success".equals(resultJson.getString("Result"))){
			JSONObject contentJson = resultJson.getJSONObject("Content");
			JSONObject province, city, district, provinceItem, cityItem, cityInfo=null, districtItem;
			JSONArray provinces, cities, districts, proviceArray, cityArray, cityInfoArray, districtArray;
			provinces = new JSONArray();
			//处理普通省市地区
			proviceArray = contentJson.getJSONArray("normal");
			if(proviceArray != null){
				for(int i=0; i<proviceArray.size(); i++){
					provinceItem = proviceArray.getJSONObject(i);
					province = new JSONObject();
					//处理市级数据
					cityArray = provinceItem.getJSONArray("cities");
					cities = new JSONArray();
					for(int j=0; j<cityArray.size(); j++){
						cityItem = cityArray.getJSONObject(j);
						city = new JSONObject();
						cityInfoArray = cityItem.getJSONArray("cityInfo");
						//处理市区数据
						districtArray = cityItem.getJSONArray("district");
						districts = new JSONArray();
						for(int k=0; k<districtArray.size(); k++){
							districtItem = districtArray.getJSONObject(k);
							district = new JSONObject();
							district.put("code", districtItem.getString("code"));
							district.put("name", districtItem.getString("districtName"));
							district.put("longitude", districtItem.getString("longitude"));
							district.put("latitude", districtItem.getString("latitude"));
							district.put("altitude", districtItem.getString("altitude"));
							districts.add(district);
						}
						//获取市级信息
						for(int k=0; k<cityInfoArray.size(); k++){
							cityInfo = cityInfoArray.getJSONObject(k);
							if(!cityInfo.getString("name").contains("市本级"))
								break;
						}
						city.put("code", cityInfo != null ? cityInfo.getString("code") : null);
						city.put("name", cityItem.getString("cityName"));
						city.put("longitude", cityInfo != null ? cityInfo.getString("longitude") : null);
						city.put("latitude", cityInfo != null ? cityInfo.getString("latitude") : null);
						city.put("altitude", cityInfo != null ? cityInfo.getString("altitude") : null);
						city.put("climate", cityItem.getString("climate"));
						city.put("developLevel", cityItem.getString("developLevel"));
						city.put("districts", districts);
						cities.add(city);
					}
					//处理省级数据
					province.put("code", StringUtil.completLengthFromRight(provinceItem.getString("provinceCode"), 6, "0"));
					province.put("name", provinceItem.getString("provinceName"));
					province.put("type", "1");
					province.put("cities", cities);
					provinces.add(province);
				}
			}
			//处理直辖市
			proviceArray = contentJson.getJSONArray("specialCities");
			if(proviceArray != null){
				for(int i=0; i<proviceArray.size(); i++){
					provinceItem = proviceArray.getJSONObject(i);
					province = new JSONObject();
					cities = new JSONArray();
					city = new JSONObject();
					//处理市区信息
					districtArray = provinceItem.getJSONArray("district");
					districts = new JSONArray();
					for(int j=0; j<districtArray.size(); j++){
						districtItem = districtArray.getJSONObject(j);
						district = new JSONObject();
						district.put("code", districtItem.getString("code"));
						district.put("name", districtItem.getString("districtName"));
						district.put("longitude", districtItem.getString("longitude"));
						district.put("latitude", districtItem.getString("latitude"));
						district.put("altitude", districtItem.getString("altitude"));
						districts.add(district);
					}
					//处理市级信息
					cityInfoArray = provinceItem.getJSONArray("cityInfo");
					for(int j=0; j<cityInfoArray.size(); j++){
						cityInfo = cityInfoArray.getJSONObject(j);
						if(!cityInfo.getString("name").contains("市本级")){
							break;
						}
					}
					city.put("code", cityInfo != null ? cityInfo.getString("code") : null);
					city.put("name", provinceItem.getString("name"));
					city.put("longitude", cityInfo != null ? cityInfo.getString("longitude") : null);
					city.put("latitude", cityInfo != null ? cityInfo.getString("latitude") : null);
					city.put("altitude", cityInfo != null ? cityInfo.getString("altitude") : null);
					city.put("climate", provinceItem.getString("climate"));
					city.put("developLevel", provinceItem.getString("developLevel"));
					city.put("districts", districts);
					cities.add(city);
					//处理直辖市信息
					province.put("code", StringUtil.completLengthFromRight(provinceItem.getString("code"), 6, "0"));
					province.put("name", provinceItem.getString("name"));
					province.put("type", "2");
					province.put("cities", cities);
					provinces.add(province);
				}
			}
			resultJson.put("Content", provinces);
			resultJson.put("Count", provinces.size());
		}
		return resultJson.toJSONString();
	}

	/**
	 * 查询气候区
	 * @return
	 * @throws Exception
	 */
	public String queryAllClimateAreaCode() throws Exception {
		String requestURL = this.getDataPlatDictPath(DataRequestPathUtil.dataPlat_dict_query ,"climate");
		return this.httpGetRequest(requestURL);
	}

	/**
	 * 查询发展水平
	 * @return
	 * @throws Exception
	 */
	public String queryAllDevelopmentLevelCode() throws Exception {
		String requestURL = this.getDataPlatDictPath(DataRequestPathUtil.dataPlat_dict_query ,"develop");
		return this.httpGetRequest(requestURL);
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
	public String queryAllWeatherStatusCode() throws Exception{
		String requestURL = this.getDataPlatDictPath(DataRequestPathUtil.dataPlat_dict_query ,"weather");
		return this.httpGetRequest(requestURL);
	}

	/**
	 * 查询空气风力等级
	 * @return
	 * @throws Exception
	 */
	public String queryAllWindLevelCode() throws Exception{
		String requestURL = this.getDataPlatDictPath(DataRequestPathUtil.dataPlat_dict_query ,"wind");
		return this.httpGetRequest(requestURL);
	}

	/**
	 * 查询方位信息
	 * @return
	 * @throws Exception
	 */
	public String queryAllDirectionCode() throws Exception{
		String requestURL = this.getDataPlatDictPath(DataRequestPathUtil.dataPlat_dict_query ,"direction");
		return this.httpGetRequest(requestURL);
	}

	/**
	 * 查询建筑功能类型
	 * @return
	 * @throws Exception
	 */
	public String queryAllBuildingCode() throws Exception{
		String requestURL = this.getDataPlatDictPath(DataRequestPathUtil.dataPlat_dict_query ,"building");
		return this.httpGetRequest(requestURL);
	}

	/**
	 * 查询空间功能类型
	 * @return
	 * @throws Exception
	 */
	public String queryAllSpaceCode() throws Exception{
		String requestURL = this.getDataPlatDictPath(DataRequestPathUtil.dataPlat_dict_query ,"space");
		return this.httpGetRequest(requestURL);
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
	public String queryNameByCode(String dictionaryName, String... codes) throws Exception {
		String name = null;
		if(dictionaryName == null || codes == null){
			return name;
		}
		String requestUrl = this.getDataPlatDictPath(DataRequestPathUtil.dataPlat_dict_query, dictionaryName);
		String resultStr = this.httpGetRequest(requestUrl);
		if(resultStr.contains("success")){
			Map<String, String> dictionMap = new HashMap<String, String>();
			JSONObject dictionJson = JSONObject.parseObject(resultStr);
			if(dictionaryName.equals("geography")){
				JSONObject contentJson = dictionJson.getJSONObject("Content");
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
								dictionMap.put(districtItem.getString("code"), districtItem.getString("districtName"));
							}
							//获取市级信息
							for(int k=0; k<cityInfoArray.size(); k++){
								cityInfo = cityInfoArray.getJSONObject(k);
								if(!cityInfo.getString("name").contains("市本级")) {
									dictionMap.put(cityInfo.getString("code"), cityInfo.getString("name"));
									break;
								}
							}
						}
						//处理省级数据
						dictionMap.put(StringUtil.completLengthFromRight(provinceItem.getString("provinceCode"), 6, "0"), provinceItem.getString("provinceName"));
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
							dictionMap.put(districtItem.getString("code"), districtItem.getString("districtName"));
						}
						//处理市级信息
						cityInfoArray = provinceItem.getJSONArray("cityInfo");
						for(int j=0; j<cityInfoArray.size(); j++){
							cityInfo = cityInfoArray.getJSONObject(j);
							if(!cityInfo.getString("name").contains("市本级")){
								dictionMap.put(cityInfo.getString("code"), cityInfo.getString("name"));
								break;
							}
						}
					}
				}
			}else{
				JSONArray dictions = dictionJson.getJSONArray("Content");
				getDictionaryName(dictionMap, dictions);
			}
			for(String code : codes){
				if(name == null){
					name = dictionMap.get(code);
				}else{
					name += "·" + dictionMap.get(code);
				}
			}
		}
		return name;
	}
	
	private void getDictionaryName(Map<String, String> dictionaryMap, JSONArray dictionarys){
		if(dictionarys == null || dictionarys.size() == 0){
			return;
		}
		JSONObject dictionary;
		for(int i=0; i<dictionarys.size(); i++){
			dictionary = dictionarys.getJSONObject(i);
			dictionaryMap.put(dictionary.getString("code"), dictionary.getString("name"));
			getDictionaryName(dictionaryMap, dictionary.getJSONArray("content"));
		}
	}
}
