package com.sagacloud.saas.service;

/**
 * Created by guosongchao on 2017/9/6.
 */
public interface SopServiceI {
    /**
     * 查询可供选择的sop
     * @param jsonStr
     * @return
     * @throws Exception
     */
    public String querySopListForSel(String jsonStr) throws Exception;

    /**
     * 查询sop的详细信息
     * @param jsonStr
     * @return
     * @throws Exception
     */
    public String querySopDetailById(String jsonStr) throws Exception;

    /**
     * 验证对象和sop是否匹配
     * @param jsonStr
     * @return
     * @throws Exception
     */
    public String verifyObjectAndSop(String jsonStr) throws Exception;
}
