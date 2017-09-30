/**
 * @包名称 com.sagacloud.service
 * @文件名 DictionaryServiceI.java
 * @创建者 wanghailong
 * @邮箱 wanghailong@persagy.com  
 * @修改描述 
 */

package com.sagacloud.saasmanage.service;

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
	public String queryAllRegionCode() throws Exception;
	
	/**
	 * 
	 * 功能描述：查询所有气候区代码
	 * @return
	 * @throws Exception 
	 * @创建者 wanghailong
	 * @邮箱 wanghailong@persagy.com 
	 * 修改描述
	 */
	public String queryAllClimateAreaCode() throws Exception;
	
	/**
	 * 
	 * 功能描述：查询所有发展水平代码
	 * @return
	 * @throws Exception 
	 * @创建者 wanghailong
	 * @邮箱 wanghailong@persagy.com 
	 * 修改描述
	 */
	public String queryAllDevelopmentLevelCode() throws Exception;
	
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
	public String queryAllWeatherStatusCode() throws Exception;

	/**
	 *
	 * 功能描述：查询所有风力等级
	 * @return
	 * @throws Exception
	 * @创建者 wanghailong
	 * @邮箱 wanghailong@persagy.com
	 * 修改描述
	 */
	public String queryAllWindLevelCode() throws Exception;

	/**
	 *
	 * 功能描述：查询所有方向代码
	 * @return
	 * @throws Exception
	 * @创建者 wanghailong
	 * @邮箱 wanghailong@persagy.com
	 * 修改描述
	 */
	public String queryAllDirectionCode() throws Exception;

	/**
	 *
	 * 功能描述：查询建筑功能类型
	 * @return
	 * @throws Exception
	 * @创建者 wanghailong
	 * @邮箱 wanghailong@persagy.com
	 * 修改描述
	 */
	public String queryAllBuildingCode() throws Exception;

	/**
	 *
	 * 功能描述：查询空间功能类型
	 * @return
	 * @throws Exception
	 * @创建者 wanghailong
	 * @邮箱 wanghailong@persagy.com
	 * 修改描述
	 */
	public String queryAllSpaceCode() throws Exception;

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
	 * 功能描述：根据字典、code查询名称
	 * @param dictionaryName
	 * @param code
	 * @return
	 * @throws Exception
	 */
	public String queryNameByCode(String dictionaryName, String... code) throws Exception;

}
