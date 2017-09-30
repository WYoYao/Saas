package com.sagacloud.saas.service;

import java.util.Map;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;

/**
 * Created by guosongchao on 2017/9/7.
 */
public interface ObjectServiceI {
    /**
     * 搜索物理世界对象
     * @param jsonStr
     * @return
     * @throws Exception
     */
    public String searchObject(String jsonStr) throws Exception;

    /**
     * 查询对象分类
     * @param jsonStr
     * @return
     * @throws Exception
     */
    public String queryObjClassForObjSel(String jsonStr) throws Exception;

    /**
     * 查询建筑体
     * @param jsonStr
     * @return
     * @throws Exception
     */
    public String queryBuild(String jsonStr) throws Exception;

    /**
     * 查询楼层
     * @param jsonStr
     * @return
     * @throws Exception
     */
    public String queryFloor(String jsonStr) throws Exception;

    /**
     * 查询空间
     * @param jsonStr
     * @return
     * @throws Exception
     */
    public String querySpace(String jsonStr) throws Exception;

    /**
     * 查询系统实例
     * @param jsonStr
     * @return
     * @throws Exception
     */
    public String querySystem(String jsonStr) throws Exception;

    /**
     * 系统专业下所有系统
     * @param jsonStr
     * @return
     * @throws Exception
     */
    public String querySystemForSystemDomain(String jsonStr) throws Exception;

    /**
     * 查询建筑-楼层-空间列表树
     * @param jsonStr
     * @return
     * @throws Exception
     */
    public String queryBuildFloorSpaceTree(String jsonStr) throws Exception;

    /**
     * 查询设备实例
     * @param jsonStr
     * @return
     * @throws Exception
     */
    public String queryEquip(String jsonStr) throws Exception;

    /**
     * 查询工具、部件列表
     * @param jsonStr
     * @return
     * @throws Exception
     */
    public String queryTempObjectList(String jsonStr) throws Exception;

    /**
     * 添加自定义对象
     * @param jsonStr
     * @return
     * @throws Exception
     */
    public String addBatchTempObject(String jsonStr) throws Exception;

    /**
     * 搜索信息点
     * @param jsonStr
     * @return
     * @throws Exception
     */
    public String searchInfoPoint(String jsonStr) throws Exception;

    /**
     * 查询对象分类
     * @param jsonStr
     * @return
     * @throws Exception
     */
    public String queryObjClassForInfoPointSel(String jsonStr) throws Exception;

    /**
     * 查询系统下信息点
     * @param jsonStr
     * @return
     * @throws Exception
     */
    public String queryInfoPointForSystem(String jsonStr) throws Exception;

    /**
     * 查询设备下信息点
     * @param jsonStr
     * @return
     * @throws Exception
     */
    public String queryInfoPointForEquip(String jsonStr) throws Exception;

    /**
     * 查询系统类下信息点
     * @param jsonStr
     * @return
     * @throws Exception
     */
    public String queryInfoPointForSystemClass(String jsonStr) throws Exception;

    /**
     * 查询设备类下信息点
     * @param jsonStr
     * @return
     * @throws Exception
     */
    public String queryInfoPointForEquipClass(String jsonStr) throws Exception;

    /**
     * 查询大类下的对象实例
     * @param jsonStr
     * @return
     * @throws Exception
     */
    public String queryObjectByClass(String jsonStr) throws Exception;
    
    /**
     * 功能描述：设备管理-新增页-查询建筑下的系统实例
     * @param jsonStr
     * @return
     * @throws Exception
     */
    public String querySystemForBuild(JSONObject jsonObject) throws Exception;
    
    
    /**
     * 功能描述：查询设备空间关系
     * @param jsonObject
     * @param project_id
     * @param secret
     * @return
     * @throws Exception
     */
    public Map<String, String> queryEquipSpaceSystemMap(JSONObject jsonObject, String project_id, String secret) throws Exception;
    
    /**
     * 功能描述：查询对象名片样式
     * @param obj_type
     * @return
     */
    public JSONArray queryObjCardStyle(String obj_type);
}
