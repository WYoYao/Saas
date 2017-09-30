package com.sagacloud.saas.service;

import com.alibaba.fastjson.JSONObject;

public interface EquipCompanyServiceI {

	
	/**
	 * 功能描述：设备通信录-列表页:添加公司信息
	 * @param jsonObject
	 * @return
	 */
	public String addEquipCompany(JSONObject jsonObject);
	
	/**
	 * 功能描述：设备通信录-详细页:根据Id查询公司的详细信息
	 * @param jsonObject
	 * @return
	 */
	public String queryEquipCompanyById(JSONObject jsonObject);
	
	/**
	 * 功能描述：设备通信录-详细页:编辑公司信息
	 * @param jsonObject
	 * @return
	 */
	public String updateEquipCompanyById(JSONObject jsonObject) throws Exception;
	
	/**
	 * 功能描述：设备通信录-详细页:删除公司信息
	 * @param jsonObject
	 * @return
	 */
	public String deleteEquipCompanyById(JSONObject jsonObject) throws Exception;
	
	/**
	 * 功能描述：设备通信录-列表页:查询设备通讯录列表
	 * @param jsonObject
	 * @return
	 */
	public String queryEquipCompanyList(JSONObject jsonObject) throws Exception;
	
	/**
	 * 功能描述：设备通信录-列表页:查询设备通讯录列表
	 * @param jsonObject
	 * @return
	 */
	public String queryEquipCompanySel(JSONObject jsonObject) throws Exception;
	
	/**
	 * 功能描述：设备通信录-设备调用:添加品牌信息
	 * @param jsonObject
	 * @return
	 */
	public String addCompanyBrand(JSONObject jsonObject) throws Exception;
	
	/**
	 * 功能描述：设备通信录-设备调用:添加保险单号
	 * @param jsonObject
	 * @return
	 */
	public String addCompanyInsurerNum(JSONObject jsonObject) throws Exception;
}
