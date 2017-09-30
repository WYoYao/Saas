package com.sagacloud.saasmanage.service;

public interface WoStateServiceI {
	/**
	 * 查询工单状态列表
	 * @param jsonStr
	 * @return
	 * @throws Exception
	 */
	public String queryWoStateList(String jsonStr) throws Exception;
	
	/**
	 * 修改本地名称
	 * @param jsonStr
	 * @return
	 * @throws Exception
	 */
	public String updateCustomerName(String jsonStr) throws Exception;
	
	/**
	 * 查询工单状态事件列表
	 * @param jsonStr
	 * @return
	 * @throws Exception
	 */
	public String queryWoStateEventList(String jsonStr) throws Exception;
	
	/**
	 * 查询工单状态事件下选项列表
	 * @param jsonStr
	 * @return
	 * @throws Exception
	 */
	public String queryWoStateOptionList(String jsonStr) throws Exception;
	
	/**
	 * 验证状态名称是否可以使用
	 * @param jsonStr
	 * @return
	 * @throws Exception
	 */
	public String verifyStateName(String jsonStr) throws Exception;
	
	/**
	 * 添加工单状态信息
	 * @param jsonStr
	 * @return
	 * @throws Exception
	 */
	public String addWoState(String jsonStr) throws Exception;
	
	/**
	 * 根据Id查询工单自定义状态信息
	 * @param jsonStr
	 * @return
	 * @throws Exception
	 */
	public String queryWoStateById(String jsonStr) throws Exception;
	
	/**
	 * 根据Id编辑工单自定义状态信息
	 * @param jsonStr
	 * @return
	 * @throws Exception
	 */
	public String updateWoStateById(String jsonStr) throws Exception;
}
