package com.sagacloud.saas.service;

import com.alibaba.fastjson.JSONObject;

public interface EquipServiceI {

	/**
	 * 功能描述：设备管理-新增页/编辑页:验证设备编码是否可以使用
	 * @param jsonObject
	 * @throws Exception
	 * @return
	 */
	public String verifyEquipLocalId(JSONObject jsonObject) throws Exception ;
	
	/**
	 * 功能描述：设备管理-新增页/编辑页:验证设备BIM编码是否可以使用
	 * @param jsonObject
	 * @throws Exception
	 * @return
	 */
	public String verifyEquipBimId(JSONObject jsonObject) throws Exception ;
	
	/**
	 * 功能描述：设备管理-详细页:查询设备信息点的历史信息
	 * @param jsonObject
	 * @throws Exception
	 * @return
	 */
	public String queryEquipInfoPointHis(JSONObject jsonObject) throws Exception ;
	
	/**
	 * 功能描述：设备管理-新增页:查询设备动态信息
	 * @param jsonObject
	 * @throws Exception
	 * @return
	 */
	public String queryEquipDynamicInfoForAdd(JSONObject jsonObject) throws Exception ;
	
	/**
	 * 功能描述：设备管理-新增页:添加设备信息
	 * @param jsonObject
	 * @throws Exception
	 * @return
	 */
	public String addEquip(JSONObject jsonObject) throws Exception ;
	
	/**
	 * 功能描述：设备管理-详细页:查询设备通用信息
	 * @param jsonObject
	 * @throws Exception
	 * @return
	 */
	public String queryEquipPublicInfo(JSONObject jsonObject) throws Exception ;
	
	/**
	 * @desc 设备管理-详细页:查询设备动态信息
	 * @param jsonObject
	 * @return
	 */
	public String queryEquipDynamicInfo(JSONObject jsonObject) throws Exception;
	
	/**
	 * @desc 设备管理-详细页:编辑设备信息
	 * @param jsonObject
	 * @return
	 */
	public String updateEquipInfo(JSONObject jsonObject) throws Exception;
	
	/**
	 * @desc 设备管理-详细页:查询设备相关的工单
	 * @param jsonObject
	 * @throws Exception
	 * @return
	 */
	public String queryEquipRelWorkOrder(JSONObject jsonObject) throws Exception;
	
	/**
	 * 功能描述： 设备管理-首页:查询设备统计数量
	 * @param jsonObject
	 * @throws Exception
	 * @return
	 */
	public String queryEquipStatisticCount(JSONObject jsonObject) throws Exception;
	
	/**
	 * 功能描述： 设备管理-首页:查询项目下设备列表
	 * @param jsonObject
	 * @throws Exception
	 * @return
	 */
	public String queryEquipList(JSONObject jsonObject) throws Exception;
	
	/**
	 * 功能描述： 设备管理-首页:查询维修中设备列表
	 * @param jsonObject
	 * @throws Exception
	 * @return
	 */
	public String queryRepairEquipList(JSONObject jsonObject) throws Exception;
	
	/**
	 * 功能描述： 设备管理-首页:查询维保中设备列表
	 * @param jsonObject
	 * @throws Exception
	 * @return
	 */
	public String queryMaintEquipList(JSONObject jsonObject) throws Exception;
	
	/**
	 * 功能描述： 设备管理-首页:查询即将报废设备列表
	 * @param jsonObject
	 * @throws Exception
	 * @return
	 */
	public String queryGoingDestroyEquipList(JSONObject jsonObject) throws Exception;
	
	/**
	 * 功能描述： 设备管理-首页:验证设备是否可以报废
	 * @param jsonObject
	 * @throws Exception
	 * @return
	 */
	public String verifyDestroyEquip(JSONObject jsonObject) throws Exception;
	
	/**
	 * 功能描述： 设备管理-首页:报废设备
	 * @param jsonObject
	 * @throws Exception
	 * @return
	 */
	public String destroyEquip(JSONObject jsonObject) throws Exception;
	
	/**
	 * 功能描述： 设备管理-详细页:查询设备名片信息
	 * @param jsonObject
	 * @throws Exception
	 * @return
	 */
	public String queryEquipCardInfo(JSONObject jsonObject) throws Exception;

}
