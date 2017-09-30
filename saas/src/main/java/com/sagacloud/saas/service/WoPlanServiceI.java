package com.sagacloud.saas.service;

public interface WoPlanServiceI {
	/**
	 * 查询tab标签列表
	 * @param jsonStr
	 * @return
	 * @throws Exception
	 */
	public String queryTabList(String jsonStr) throws Exception;
	
	/**
	 * 查询工单计划执行列表
	 * @param jsonStr
	 * @return
	 * @throws Exception
	 */
	public String queryWoPlanExecuteList(String jsonStr) throws Exception;
	
	/**
	 * 查询工单计划执行列表-频率日
	 * @param jsonStr
	 * @return
	 * @throws Exception
	 */
	public String queryWoPlanDayExecuteList(String jsonStr) throws Exception;
	
	/**
	 * 获得工单事项预览
	 * @param jsonStr
	 * @return
	 * @throws Exception
	 */
	public String getWoMattersPreview(String jsonStr) throws Exception;
	
	/**
	 * 发布/添加工单计划
	 * @param jsonStr
	 * @return
	 * @throws Exception
	 */
	public String addWoPlan(String jsonStr) throws Exception;
	
	/**
	 * 根据Id查询工单计划的详细信息
	 * @param jsonStr
	 * @return
	 * @throws Exception
	 */
	public String queryWoPlanById(String jsonStr) throws Exception;
	
	/**
	 * 作废工单计划
	 * @param jsonStr
	 * @return
	 * @throws Exception
	 */
	public String destroyWoPlanById(String jsonStr) throws Exception;
	
	/**
	 * 查询工单计划的历史列表
	 * @param jsonStr
	 * @return
	 * @throws Exception
	 */
	public String queryWoPlanHisList(String jsonStr) throws Exception;
	
	/**
	 * 查询作废的计划列表
	 * @param jsonStr
	 * @return
	 * @throws Exception
	 */
	public String queryDestroyedWoPlanList(String jsonStr) throws Exception;
	
	/**
	 * 查询工单计划生成的工单列表
	 * @param jsonStr
	 * @return
	 * @throws Exception
	 */
	public String queryWoListByPlanId(String jsonStr) throws Exception;
	
	/**
	 * 根据Id编辑工单计划信息
	 * @param jsonStr
	 * @return
	 * @throws Exception
	 */
	public String updateWoPlan(String jsonStr) throws Exception;
}
