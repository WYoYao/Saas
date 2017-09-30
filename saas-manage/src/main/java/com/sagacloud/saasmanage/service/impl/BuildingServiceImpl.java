package com.sagacloud.saasmanage.service.impl;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.sagacloud.saasmanage.cache.ProjectCache;
import com.sagacloud.saasmanage.common.*;
import com.sagacloud.saasmanage.dao.DBCommonMethods;
import com.sagacloud.saasmanage.dao.DBConst;
import com.sagacloud.saasmanage.service.BaseService;
import com.sagacloud.saasmanage.service.BuildingServiceI;
import com.sagacloud.saasmanage.service.OperateLogServiceI;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.ws.rs.Produces;
import java.util.Set;

/**
 * Created by guosongchao on 2017/8/9.
 */
@Service("buildingService")
public class BuildingServiceImpl extends BaseService implements BuildingServiceI {

    @Autowired
    public OperateLogServiceI operateLogService;
    @Autowired
    private ProjectCache projectCache;

    @Override
    public String addConfirmBuild(String jsonStr) throws Exception {
        String resultStr;
        JSONObject jsonObject = JSONObject.parseObject(jsonStr);
        String projectId = jsonObject.getString("project_id");
        //1 调用数据平台添加建筑
        JSONObject param = new JSONObject();
        param.put("project_id", projectId);
        JSONObject infos = new JSONObject();
        infos.put(CommonConst.info_name_local_name_build, JSONArray.parseArray("[{\"time\":\""+DateUtil.getNowTimeStr()+"\",\"value\":\""+jsonObject.getString("build_local_name")+"\"}]"));
        param.put(CommonConst.info_name_datas, infos);
        String addUrl = getDataPlatformPath(DataRequestPathUtil.dataPlat_building_create);
        resultStr = httpPostRequest(addUrl, param.toJSONString());
        if(!resultStr.contains("failure")){
            JSONObject addResultJson = JSONObject.parseObject(resultStr);
            //2 调用数据平台查询添加建筑的build_id、build_name
            String buildId = addResultJson.getString("id");
            String buildName = addResultJson.getString(CommonConst.info_name_name_build);
            //3 添加数据
            jsonObject.put("build_id", DBConst.TABLE_BUILDING_ID_TAG + DateUtil.getUtcTimeNow());
            jsonObject.put("build_code", buildId);
            jsonObject.put("build_name", buildName);
            String paramStr = JSONUtil.getAddParamJson(jsonObject).toJSONString();
            resultStr = DBCommonMethods.insertRecord(DBConst.TABLE_BUILDING, paramStr);
        }
        operateLogService.insertRecord(jsonObject.getString("user_id"), DBConst.TABLE_BUILDING, "I", "addConfirmBuild", jsonStr, resultStr.contains("success")?"0":"1", resultStr);
        return resultStr;
    }

    @Override
    public String addDraftBuild(String jsonStr) throws Exception{
        JSONObject jsonObject = JSONObject.parseObject(jsonStr);
        jsonObject.put("build_id", DBConst.TABLE_BUILDING_ID_TAG + DateUtil.getUtcTimeNow());
        String paramStr = JSONUtil.getAddParamJson(jsonObject).toJSONString();
        String resultStr = DBCommonMethods.insertRecord(DBConst.TABLE_BUILDING, paramStr);
        operateLogService.insertRecord(jsonObject.getString("user_id"), DBConst.TABLE_BUILDING, "I", "addDraftBuild", jsonStr, resultStr.contains("success")?"0":"1", resultStr);
        return resultStr;
    }

    @Override
    public String deleteBatchRecord(Set<String> keys) throws Exception {
        String resultStr = "{\"Result\":\"success\",\"ResultMsg\":\"\"}";
        String paramStr;
        for(String key : keys){
            paramStr = "{\"criteria\":{\"build_id\":\""+ key +"\"}}";
            resultStr = DBCommonMethods.deleteRecord(DBConst.TABLE_BUILDING, paramStr);
            if(resultStr.contains("failure")){
                break;
            }
        }
        return resultStr;
    }

    @Override
    public String updateConfirmBuild(String jsonStr) throws Exception {
        JSONObject jsonObject = JSONObject.parseObject(jsonStr);
        String buildId = jsonObject.getString("build_code");
        String projectId = StringUtil.transferId(buildId, CommonConst.tag_project);
        if(!StringUtil.isNull(jsonObject, "build_code") && StringUtil.isExist(jsonObject, "build_local_name", "build_func_type", "build_age")){
            JSONObject param = new JSONObject();
            JSONArray criterias = new JSONArray();
            JSONObject criteria = new JSONObject();
            JSONObject infos = new JSONObject();
            if(!StringUtil.isNull(jsonObject, "build_local_name")) {
                infos.put(CommonConst.info_name_local_name_build, JSONArray.parseArray("[{\"value\":\"" + jsonObject.getString("build_local_name") + "\"}]"));
            }
            if(!StringUtil.isNull(jsonObject, "build_func_type")){
                infos.put("BuildFuncType", JSONArray.parseArray("[{\"value\":\""+jsonObject.getString("build_func_type")+"\"}]"));
            }
            if(!StringUtil.isNull(jsonObject, "build_age")){
                infos.put("BuildAge", JSONArray.parseArray("[{\"value\":\""+jsonObject.getString("build_age")+"\"}]"));
            }
            criteria.put("id", jsonObject.getString("build_code"));
            criteria.put(CommonConst.info_name_datas, infos);
            criterias.add(criteria);
            param.put("criterias", criterias);
            String requestUrl = getDataPlatformPath(DataRequestPathUtil.dataPlat_object_batch_update, projectId, projectCache.getProjectSecretById(projectId));
            String resultStr = httpPostRequest(requestUrl, param.toJSONString());
            if(resultStr.contains("failure")){
                return resultStr;
            }
        }
        String paramStr = JSONUtil.getUpdateParamJson(jsonObject, "build_id").toJSONString();
        String resultStr = DBCommonMethods.updateRecord(DBConst.TABLE_BUILDING, paramStr);
        operateLogService.insertRecord(jsonObject.getString("user_id"), DBConst.TABLE_BUILDING, "U", "updateConfirmBuild", jsonStr, resultStr.contains("success")?"0":"1", resultStr);
        return resultStr;
    }

    @Override
    public String updateDraftBuild(String jsonStr) throws Exception {
        JSONObject jsonObject = JSONObject.parseObject(jsonStr);
        String paramStr = JSONUtil.getUpdateParamJson(jsonObject, "build_id").toJSONString();
        String resultStr = DBCommonMethods.updateRecord(DBConst.TABLE_BUILDING, paramStr);
        operateLogService.insertRecord(jsonObject.getString("user_id"), DBConst.TABLE_BUILDING, "U", "updateDraftBuild", jsonStr, resultStr.contains("success")?"0":"1", resultStr);
        return resultStr;
    }

    @Override
    public String updateAndPubishBuildByKey(String jsonStr) throws Exception {
        JSONObject jsonObject = JSONObject.parseObject(jsonStr);
        String projectId = jsonObject.getString("project_id");
        //1 根据主键查询记录
        String resultStr = queryBuildByKey(jsonStr);
        JSONObject buildingJson = JSONObject.parseObject(resultStr);
        if("success".equals(buildingJson.getString("Result")) && buildingJson.containsKey("Item")){
            JSONObject building = buildingJson.getJSONObject("Item");
            building.putAll(jsonObject);
            //2 组合查询结果及待更新数据，数据平台创建建筑
            JSONObject param = new JSONObject();
            param.put("project_id", projectId);
            JSONObject infos = new JSONObject();
            infos.put(CommonConst.info_name_local_name_build, JSONArray.parseArray("[{\"time\":\""+DateUtil.getNowTimeStr()+"\",\"value\":\""+building.getString("build_local_name")+"\"}]"));
            if(!StringUtil.isNull(building, "build_func_type")){
                infos.put("BuildFuncType", JSONArray.parseArray("[{\"time\":\""+DateUtil.getNowTimeStr()+"\",\"value\":\""+building.getString("build_func_type")+"\"}]"));
            }
            if(!StringUtil.isNull(building, "build_age")){
                infos.put("BuildAge", JSONArray.parseArray("[{\"time\":\""+DateUtil.getNowTimeStr()+"\",\"value\":\""+building.getString("build_age")+"\"}]"));
            }
            param.put(CommonConst.info_name_datas, infos);
            String addBuildUrl = getDataPlatformPath(DataRequestPathUtil.dataPlat_building_create);
            resultStr = httpPostRequest(addBuildUrl, param.toJSONString());
            if(resultStr.contains("success")){
                //3 查询建筑ID、Name
                JSONObject buildDataPlat = JSONObject.parseObject(resultStr);
                building.put("build_code", buildDataPlat.getString("id"));
                building.put("build_name", buildDataPlat.getString(CommonConst.info_name_name_build));
                String params = JSONUtil.getUpdateParamJson(building, "build_id").toJSONString();
                resultStr = DBCommonMethods.updateRecord(DBConst.TABLE_BUILDING, params);
            }
        }
        operateLogService.insertRecord(jsonObject.getString("user_id"), DBConst.TABLE_BUILDING, "U", "updateAndPubishBuildByKey", jsonStr, resultStr.contains("success")?"0":"1", resultStr);
        return resultStr;
    }

    public String queryBuildByKey(String jsonStr) throws Exception{
        JSONObject jsonObject = JSONObject.parseObject(jsonStr);
        String paramStr = JSONUtil.getKeyWithMajors(jsonObject, "build_id").toJSONString();
        String resultStr = DBCommonMethods.getRecordBykey(DBConst.TABLE_BUILDING, paramStr);
        resultStr = JSONUtil.prossesResultToDateString(resultStr, CommonMessage.dataFormat_save, CommonMessage.dataFormat_show, DBConst.TABLE_FIELD_CTEATE_TIME);
        resultStr = JSONUtil.getFirstRecordfromResult(resultStr);
        return resultStr;
    }

    @Override
    public String queryRecordByCondition(String jsonStr) throws Exception {
        JSONObject jsonObject = JSONObject.parseObject(jsonStr);
        jsonObject.put(DBConst.TABLE_FIELD_VALID, true);
        String paramStr = JSONUtil.getCriteriaWithMajors(jsonObject, "customer_id", "valid", "project_id").toJSONString();
        String resultStr = DBCommonMethods.queryRecordByCriteria(DBConst.TABLE_BUILDING, paramStr);
        resultStr = JSONUtil.prossesResultToDateString(resultStr, CommonMessage.dataFormat_save, CommonMessage.dataFormat_show, DBConst.TABLE_FIELD_CTEATE_TIME);
        return resultStr;
    }
}
