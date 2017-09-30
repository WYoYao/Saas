package com.sagacloud.saas.service;

import java.util.Map;
import java.util.Set;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;

/**
 * Created by guosongchao on 2017/9/6.
 */
public interface WorkOrderServiceI {
    /**
     * 查询我的草稿工单
     * @param jsonStr
     * @return
     * @throws Exception
     */
    public String queryMyDraftWorkOrder(String jsonStr) throws Exception;

    /**
     * 查询我发布的工单
     * @param jsonStr
     * @return
     * @throws Exception
     */
    public String queryMyPublishWorkOrder(String jsonStr) throws Exception;

    /**
     * 查询我参与的工单
     * @param jsonStr
     * @return
     * @throws Exception
     */
    public String queryMyParticipantWorkOrder(String jsonStr) throws Exception;

    /**
     * 删除草稿工单
     * @param jsonStr
     * @return
     * @throws Exception
     */
    public String deleteDraftWorkOrderById(String jsonStr) throws Exception;

    /**
     * 预览草稿工单
     * @param jsonStr
     * @return
     * @throws Exception
     */
    public String previewWorkOrderById(String jsonStr) throws Exception;

    /**
     * 根据id查询工单详细信息-发布后的
     * @param jsonStr
     * @return
     * @throws Exception
     */
    public String queryWorkOrderById(String jsonStr) throws Exception;

    /**
     * 查询工单的操作记录
     * @param jsonStr
     * @return
     * @throws Exception
     */
    public String queryOperateRecord(String jsonStr) throws Exception;

    /**
     * 根据id查询工单详细信息-草稿的
     * @param jsonStr
     * @return
     * @throws Exception
     */
    public String queryDraftWorkOrderById(String jsonStr) throws Exception;

    /**
     * 编辑工单草稿
     * @param jsonStr
     * @return
     * @throws Exception
     */
    public String updateDraftWorkOrder(String jsonStr) throws Exception;

    /**
     * 保存工单草稿
     * @param jsonStr
     * @return
     * @throws Exception
     */
    public String saveDraftWorkOrder(String jsonStr) throws Exception;

    /**
     * 预览工单草稿
     * @param jsonStr
     * @return
     * @throws Exception
     */
    public String previewWorkOrder(String jsonStr) throws Exception;

    /**
     * 发布工单
     * @param jsonStr
     * @return
     * @throws Exception
     */
    public String publishWorkOrder(String jsonStr) throws Exception;

    /**
     * 查询项目下所有工单
     * @param jsonStr
     * @return
     * @throws Exception
     */
    public String queryAllWorkOrder(String jsonStr) throws Exception;

    /**
     * 查询工单岗位职责
     * @param jsonStr
     * @return
     * @throws Exception
     */
    public String queryPostDutyForWorkOrder(String jsonStr) throws Exception;

    /**
     * 管理员指派
     * @param jsonStr
     * @return
     * @throws Exception
     */
    public String doAssignWithAdmin(String jsonStr) throws Exception;

    /**
     * 直接关闭（中止操作）
     * @param jsonStr
     * @return
     * @throws Exception
     */
    public String doStopWithAdmin(String jsonStr) throws Exception;
    
    /**
     * 根据对象id查询工单信息
     * @param workOrderIds
     * @return
     * @throws Exception
     */
    public Map<String, JSONObject> queryWorkOrderByIds(Set<String> workOrderIds) throws Exception;
    
}
