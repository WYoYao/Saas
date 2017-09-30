package com.sagacloud.saasmanage.service;

import java.util.Set;

/**
 * Created by DOOM on 2017/8/9.
 */
public interface BuildingServiceI {
    /**
     * 插入数据
     * @param jsonStr
     * @return
     * @throws Exception
     */
    public String addConfirmBuild(String jsonStr) throws Exception;

    /**
     * 插入草稿数据
     * @param jsonStr
     * @return
     * @throws Exception
     */
    public String addDraftBuild(String jsonStr) throws Exception;

    /**
     * 批量删除数据
     * @param keys
     * @return
     * @throws Exception
     */
    public String deleteBatchRecord(Set<String> keys) throws Exception;

    /**
     * 更新数据
     * @param jsonStr
     * @return
     * @throws Exception
     */
    public String updateConfirmBuild(String jsonStr) throws Exception;

    /**
     * 更新草稿数据
     * @param jsonStr
     * @return
     * @throws Exception
     */
    public String updateDraftBuild(String jsonStr) throws Exception;

    /**
     * 更新数据
     * @param jsonStr
     * @return
     * @throws Exception
     */
    public String updateAndPubishBuildByKey(String jsonStr) throws Exception;

    /**
     * 根据条件查询数据
     * @param jsonStr
     * @return
     * @throws Exception
     */
    public String queryRecordByCondition(String jsonStr) throws Exception;
}
