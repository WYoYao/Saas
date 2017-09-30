package com.sagacloud.saasmanage.service;

/**
 * Created by guosongchao on 2017/8/9.
 */
public interface CustomerServiceI {

    /**
     * 查询所有客户信息
     * @param jsonStr
     * @return
     * @throws Exception
     */
    public String queryAllCustomer(String jsonStr) throws Exception;

    /**
     * 验证邮箱是否可用
     * @param jsonStr
     * @return
     * @throws Exception
     */
    public String validCustomerMailForAdd(String jsonStr) throws Exception;

    /**
     * 保存草稿状态客户信息
     * @param jsonStr
     * @return
     * @throws Exception
     */
    public String saveDraftCustomer(String jsonStr) throws Exception;

    /**
     * 保存确认状态客户信息
     * @param jsonStr
     * @return
     * @throws Exception
     */
    public String saveConfirmCustomer(String jsonStr) throws Exception;

    /**
     * 锁定客户信息
     * @param jsonStr
     * @return
     * @throws Exception
     */
    public String lockCustomerById(String jsonStr) throws Exception;

    /**
     * 解锁客户信息
     * @param jsonStr
     * @return
     * @throws Exception
     */
    public String unlockCustomerById(String jsonStr) throws Exception;

    /**
     * 重置客户密码
     * @param jsonStr
     * @return
     * @throws Exception
     */
    public String resetCustomerPasswd(String jsonStr) throws Exception;

    /**
     * 根据ID查询客户详细信息
     * @param jsonStr
     * @return
     * @throws Exception
     */
    public String queryCustomerById(String jsonStr) throws Exception;

    /**
     * 根据ID编辑客户信息
     * @param jsonStr
     * @return
     * @throws Exception
     */
    public String updateCustomerById(String jsonStr) throws Exception;
}
