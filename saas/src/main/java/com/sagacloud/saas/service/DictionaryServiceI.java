/**
 * @包名称 com.sagacloud.service
 * @文件名 DictionaryServiceI.java
 * @创建者 wanghailong
 * @邮箱 wanghailong@persagy.com  
 * @修改描述 
 */

package com.sagacloud.saas.service;

import java.util.Map;


/**
 * 功能描述： 数据字典相关操作接口
 * 
 * @类型名称 DictionaryServiceI
 * @创建者 wanghailong
 * @邮箱 wanghailong@persagy.com
 * @修改描述
 */
public interface DictionaryServiceI {
	
	/**
	 * 
	 * 功能描述：查询所有行政区编码
	 * @return
	 * @throws Exception 
	 * @创建者 wanghailong
	 * @邮箱 wanghailong@persagy.com 
	 * 修改描述
	 */
	public Map<String, String> queryAllRegionCode() throws Exception;
	
	/**
	 * 
	 * 功能描述：查询所有气候区代码
	 * @return
	 * @throws Exception 
	 * @创建者 wanghailong
	 * @邮箱 wanghailong@persagy.com 
	 * 修改描述
	 */
	public Map<String, String> queryAllClimateAreaCode() throws Exception;
	
	/**
	 * 
	 * 功能描述：查询所有发展水平代码
	 * @return
	 * @throws Exception 
	 * @创建者 wanghailong
	 * @邮箱 wanghailong@persagy.com 
	 * 修改描述
	 */
	public Map<String, String> queryAllDevelopmentLevelCode() throws Exception;
	
	/**
	 * 
	 * 功能描述：查询所有设备类型
	 * @return
	 * @throws Exception 
	 * @创建者 wanghailong
	 * @邮箱 wanghailong@persagy.com 
	 * 修改描述
	 */
	public String queryAllEquipmentCategory() throws Exception;

	/**
	 *
	 * 功能描述：查询所有天气状态
	 * @return
	 * @throws Exception
	 * @创建者 wanghailong
	 * @邮箱 wanghailong@persagy.com
	 * 修改描述
	 */
	public Map<String, String> queryAllWeatherStatusCode() throws Exception;

	/**
	 *
	 * 功能描述：查询所有风力等级
	 * @return
	 * @throws Exception
	 * @创建者 wanghailong
	 * @邮箱 wanghailong@persagy.com
	 * 修改描述
	 */
	public Map<String, String> queryAllWindLevelCode() throws Exception;

	/**
	 *
	 * 功能描述：查询所有方向代码
	 * @return
	 * @throws Exception
	 * @创建者 wanghailong
	 * @邮箱 wanghailong@persagy.com
	 * 修改描述
	 */
	public Map<String, String> queryAllDirectionCode() throws Exception;

	
	/**
	 * 功能描述：数据字典:查询方位信息
	 * @return
	 * @throws Exception
	 */
	public String queryAllListDirectionCode() throws Exception;
	
	/**
	 *
	 * 功能描述：查询建筑功能类型
	 * @return
	 * @throws Exception
	 * @创建者 wanghailong
	 * @邮箱 wanghailong@persagy.com
	 * 修改描述
	 */
	public Map<String, String> queryAllBuildingCode() throws Exception;
	
	/**
	 * 功能描述：查询建筑功能类型
	 * @return
	 * @throws Exception
	 */
	public String queryAllListBuildingCode() throws Exception;
	

	/**
	 *
	 * 功能描述：查询空间功能类型
	 * @return
	 * @throws Exception
	 * @创建者 wanghailong
	 * @邮箱 wanghailong@persagy.com
	 * 修改描述
	 */
	public Map<String, String> queryAllSpaceCode() throws Exception;

	/**
	 *
	 * 功能描述：查询租赁业态类型
	 * @return
	 * @throws Exception
	 * @创建者 wanghailong
	 * @邮箱 wanghailong@persagy.com
	 * 修改描述
	 */
	public String queryAllRentalCode() throws Exception;

	/**
	 *
	 * 功能描述：查询防尘等级
	 * @return
	 * @throws Exception
	 * @创建者 wanghailong
	 * @邮箱 wanghailong@persagy.com
	 * 修改描述
	 */
	public String queryAllDustproofCode() throws Exception;

	/**
	 *
	 * 功能描述：查询防水等级
	 * @return
	 * @throws Exception
	 * @创建者 wanghailong
	 * @邮箱 wanghailong@persagy.com
	 * 修改描述
	 */
	public String queryAllWaterproofCode() throws Exception;

	/**
	 *
	 * 功能描述：查询防爆设备类型
	 * @return
	 * @throws Exception
	 * @创建者 wanghailong
	 * @邮箱 wanghailong@persagy.com
	 * 修改描述
	 */
	public String queryAllDangerCode() throws Exception;

	/**
	 *
	 * 功能描述：查询防爆类型
	 * @return
	 * @throws Exception
	 * @创建者 wanghailong
	 * @邮箱 wanghailong@persagy.com
	 * 修改描述
	 */
	public String queryAllExplosionproofEquipmentCode() throws Exception;

	/**
	 *
	 * 功能描述：查询危险区域等级
	 * @return
	 * @throws Exception
	 * @创建者 wanghailong
	 * @邮箱 wanghailong@persagy.com
	 * 修改描述
	 */
	public String queryAllExplosionproofGasTemperatureCode() throws Exception;

	/**
	 *
	 * 功能描述：查询气体类型和温度类型
	 * @return
	 * @throws Exception
	 * @创建者 wanghailong
	 * @邮箱 wanghailong@persagy.com
	 * 修改描述
	 */
	public String queryAllExplosionproofTypeCode() throws Exception;

	/**
	 * 功能描述：设备管理-新增页:查询专业-系统类型-设备类型
	 * @param jsonObject
	 * @throws Exception
	 * @return
	 */
	public String queryAllEquipCategory() throws Exception;
	
	/**
	 * 功能描述：设备管理-新增页:查询专业-系统类型-设备类型
	 * @param jsonObject
	 * @throws Exception
	 * @return
	 */
	public Map<String, String> queryAllEquipCategoryMap() throws Exception;
	
	/**
	 * 
	 * 功能描述：查询数据字典数据
	 * @param name
	 * @return 
	 * @创建者 wanghailong
	 * @邮箱 wanghailong@persagy.com 
	 * 修改描述
	 */
	public Map<String, String> queryDictionaryDataByName(String name);
	
	

	/**
	 *
	 * 功能描述：查询租赁业态类型
	 * @return
	 * @throws Exception
	 * @创建者 wanghailong
	 * @邮箱 wanghailong@persagy.com
	 * 修改描述
	 */
	public Map<String, String> queryAllRentalCodeMap() throws Exception;
	
	

	/**
	 *
	 * 功能描述：查询防尘等级
	 * @return
	 * @throws Exception
	 * @创建者 wanghailong
	 * @邮箱 wanghailong@persagy.com
	 * 修改描述
	 */
	public Map<String, String> queryAllDustproofCodeMap() throws Exception;
	
	
	/**
	 *
	 * 功能描述：查询防水等级
	 * @return
	 * @throws Exception
	 * @创建者 wanghailong
	 * @邮箱 wanghailong@persagy.com
	 * 修改描述
	 */
	public Map<String, String> queryAllWaterproofCodeMap() throws Exception;
	
	
	/**
	 *
	 * 功能描述：查询防爆设备类型
	 * @return
	 * @throws Exception
	 * @创建者 wanghailong
	 * @邮箱 wanghailong@persagy.com
	 * 修改描述
	 */
	public Map<String, String> queryAllDangerCodeMap() throws Exception;
	
	/**
	 *
	 * 功能描述：查询防爆类型
	 * @return
	 * @throws Exception
	 * @创建者 wanghailong
	 * @邮箱 wanghailong@persagy.com
	 * 修改描述
	 */
	public Map<String, String> queryAllExplosionproofEquipmentCodeMap() throws Exception;
	
	/**
	 *
	 * 功能描述：查询危险区域等级
	 * @return
	 * @throws Exception
	 * @创建者 wanghailong
	 * @邮箱 wanghailong@persagy.com
	 * 修改描述
	 */
	public Map<String, String> queryAllExplosionproofGasTemperatureCodeMap() throws Exception;
	
	/**
	 *
	 * 功能描述：查询气体类型和温度类型
	 * @return
	 * @throws Exception
	 * @创建者 wanghailong
	 * @邮箱 wanghailong@persagy.com
	 * 修改描述
	 */
	public Map<String, String> queryAllExplosionproofTypeCodeMap() throws Exception;
	
	/**
	 * 功能描述：查询污秽等级
	 * @return
	 * @throws Exception
	 */
	public Map<String, String> queryAllContaminationLevelCodeMap() throws Exception;
	

	/**
	 * 功能描述：查询污染等级
	 * @return
	 * @throws Exception
	 */
	public Map<String, String> queryAllPollutionLevelCodeMap() throws Exception;
	
	/**
	 * 功能描述：查询专业-系统类型-设备类型信息
	 * @return
	 * @throws Exception
	 */
	public Map<String, String> queryEquipmentCategory() throws Exception;
}
