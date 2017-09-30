package com.sagacloud.saas.service;

/**
 * Created by guosongchao on 2017/9/7.
 */
public interface FlowPlanServiceI {
    /**
     * 查询项目下所有方案
     * @param jsonStr
     * @return
     * @throws Exception
     */
    public String queryProjectFlowPlan(String jsonStr) throws Exception;

    /**
     * 查询流转方案提醒消息
     * @param jsonStr
     * @return
     * @throws Exception
     */
    public String queryFlowPlanRemindMsg(String jsonStr) throws Exception;

    /**
     * 根据Id删除流转方案信息
     * @param jsonStr
     * @return
     * @throws Exception
     */
    public String deleteFlowPlanById(String jsonStr) throws Exception;

    /**
     * 验证是否可以创建某种类型方案
     * @param jsonStr
     * @return
     * @throws Exception
     */
    public String verifyFlowPlanType(String jsonStr) throws Exception;
    
    /**
	 * 功能描述：验证工单方案岗位职责
	 * @param jsonStr
	 * @return
	 * @throws Exception
	 */
	public String verifyPostAndDuty(String jsonStr) throws Exception;
    
    /**
     * 添加工单流转方案信息
     * @param jsonStr
     * @return
     * @throws Exception
     */
    public String addFlowPlan(String jsonStr) throws Exception;

    /**
     * 根据Id查询流转方案详细信息
     * @param jsonStr
     * @return
     * @throws Exception
     */
    public String queryFlowPlanById(String jsonStr) throws Exception;

    /**
     * 根据Id编辑流转方案信息
     * @param jsonStr
     * @return
     * @throws Exception
     */
    public String updateFlowPlanById(String jsonStr) throws Exception;
}
