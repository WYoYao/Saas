package com.sagacloud.saas.service.impl;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.sagacloud.saas.cache.DictionaryCache;
import com.sagacloud.saas.cache.GraphCache;
import com.sagacloud.saas.cache.InfoPointCache;
import com.sagacloud.saas.cache.ProjectCache;
import com.sagacloud.saas.common.*;
import com.sagacloud.saas.dao.DBCommonMethods;
import com.sagacloud.saas.dao.DBConst;
import com.sagacloud.saas.dao.DBConst.Result;
import com.sagacloud.saas.service.BaseService;
import com.sagacloud.saas.service.ObjectServiceI;
import com.sagacloud.saas.common.DataRequestPathUtil;
import com.sagacloud.saas.common.JSONUtil;
import com.sagacloud.saas.common.StringUtil;
import com.sagacloud.saas.common.ToolsUtil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by guosongchao on 2017/8/26.
 */
@Service("objectService")
public class ObjectServiceImpl extends BaseService implements ObjectServiceI {
    @Autowired
    private ProjectCache projectCache;
    @Autowired
    private GraphCache graphCache;


    @Override
    public String searchObject(String jsonStr) throws Exception{
    	JSONObject jsonObject = JSONObject.parseObject(jsonStr);
        String projectId = jsonObject.getString("project_id");
        String keyWord = jsonObject.getString("keyword");
        keyWord = keyWord == null ? "" : keyWord;
        String[] keyWords = keyWord.split(" +"); 
        int count = 50;
        String type;
        JSONArray objects = new JSONArray();
        JSONObject result, object;
        //1 搜索物理世界
        JSONObject params = new JSONObject();
        params.put("keywords", keyWords);
        params.put("category", JSONArray.parseArray("[\"Eq\",\"Sy\",\"EqObj\",\"SyObj\",\"BdObj\",\"SpObj\",\"FlObj\"]"));
        params.put("limit", 100);
        String requestUrl = getDataPlatformPath(DataRequestPathUtil.dataPlat_object_like_query, projectId, projectCache.getProjectSecretById(projectId));
        String resultStr = httpPostRequest(requestUrl, params.toJSONString());
        if(resultStr.contains("failure")){
            return resultStr;
        }
        JSONObject parent;
        JSONArray parents, parentIds, parentNames;
        JSONObject resultJson = JSONObject.parseObject(resultStr);
        JSONArray resultArray = resultJson.getJSONArray("Content");
        resultArray = resultArray == null ? new JSONArray() : resultArray;
        for(int i=0; i<resultArray.size(); i++){
            result = resultArray.getJSONObject(i);
            if(count <= 0){
                break;
            }
            object = new JSONObject();
            type = result.getString("type");
            if("Eq".equals(type)){
                //设备大类
                if(StringUtil.isNull(result, "major", "majorName", "sys", "sysName")){
                   continue;
                }
                object.put("obj_id", result.getString("eq"));
                object.put("obj_name", result.getString("eqName"));
                object.put("obj_type", "equip_class");
                object.put("parents", JSONArray.parseArray("[{\"parent_ids\":[\""+result.getString("major")+"\",\""+result.getString("sys")+"\"],\"parent_names\":[\""+result.getString("majorName")+"\",\""+result.getString("sysName")+"\"]}]"));
            }else if("Sy".equals(type)){
                //系统大类
                if(StringUtil.isNull(result, "major", "majorName")){
                    continue;
                }
                object.put("obj_id", result.getString("sys"));
                object.put("obj_name", result.getString("sysName"));
                object.put("obj_type", "system_class");
                object.put("parents", JSONArray.parseArray("[{\"parent_ids\":[\""+result.getString("major")+"\"],\"parent_names\":[\""+result.getString("majorName")+"\"]}]"));
            }else if("EqObj".equals(type)){
                //设备对象
                parents = new JSONArray();
                parent = new JSONObject();
                parentIds = new JSONArray();
                parentNames = new JSONArray();
                parentIds.add(result.getString("bdObj"));
                parentNames.add(result.getString("bdObjName"));
                if(!StringUtil.isNull(result, "flObj", "flObjName", "spObj", "spObjName")){
                    parentIds.add(result.getString("flObj"));
                    parentNames.add(result.getString("flObjName"));
                    parentIds.add(result.getString("spObj"));
                    parentNames.add(result.getString("spObjName"));
                }
                parent.put("parent_ids", parentIds);
                parent.put("parent_names", parentNames);
                parents.add(parent);
                if(!StringUtil.isNull(result, "major", "majorName", "sysObj", "sysObjName")){
                    parent = JSONObject.parseObject("{\"parent_ids\":[\""+result.getString("major")+"\",\""+result.getString("sysObj")+"\"],\"parent_names\":[\""+result.getString("majorName")+"\",\""+result.getString("sysObjName")+"\"]}");
                    parents.add(parent);
                }
                object.put("obj_id", result.getString("eqObj"));
                object.put("obj_name", result.getString("eqObjName"));
                object.put("obj_type", "equip");
                object.put("parents", parents);
            }else if("SyObj".equals(type)){
                //系统对象
                parents = new JSONArray();
                parent = new JSONObject();
                parentIds = new JSONArray();
                parentNames = new JSONArray();
                parentIds.add(result.getString("bdObj"));
                parentNames.add(result.getString("bdObjName"));
                if(!StringUtil.isNull(result, "flObj", "flObjName", "spObj", "spObjName")){
                    parentIds.add(result.getString("flObj"));
                    parentNames.add(result.getString("flobjName"));
                    parentIds.add(result.getString("spObj"));
                    parentNames.add(result.getString("spObjName"));
                }
                parent.put("parent_ids", parentIds);
                parent.put("parent_names", parentNames);
                parents.add(parent);
                object.put("obj_id", result.getString("syObj"));
                object.put("obj_name", result.getString("syObjName"));
                object.put("obj_type", "system");
                object.put("parents", parents);
            }else if("SpObj".equals(type)){
                //空间对象
                object.put("obj_id", result.getString("spObj"));
                object.put("obj_name", result.getString("spObjName"));
                object.put("obj_type", "space");
                object.put("parents", JSONArray.parseArray("[{\"parent_ids\":[\""+result.getString("bdObj")+"\",\""+result.getString("flObj")+"\"],\"parent_names\":[\""+result.getString("bdObjName")+"\",\""+result.getString("flObjName")+"\"]}]"));
            }else if("FlObj".equals(type)){
                //楼层对象
                object.put("obj_id", result.getString("flObj"));
                object.put("obj_name", result.getString("flObjName"));
                object.put("obj_type", "floor");
                object.put("parents", JSONArray.parseArray("[{\"parent_ids\":[\""+result.getString("bdObj")+"\"],\"parent_names\":[\""+result.getString("bdObjName")+"\"]}]"));
            }else if("BdObj".equals(type)){
                //建筑对象
                object.put("obj_id", result.getString("bdObj"));
                object.put("obj_name", result.getString("bdObjName"));
                object.put("obj_type", "build");
            }
            count ++;
            objects.add(object);
        }
        //2 搜索临时对象
        if(count > 0){
            jsonObject.put(DBConst.TABLE_FIELD_VALID, true);
            jsonObject.put("obj_type", JSONArray.parseArray("[\"2\",\"3\"]"));
            String paramStr = JSONUtil.getCriteriasWithMajors(jsonObject, "obj_type", "obj_type", "valid", "project_id").toJSONString();
            resultStr = DBCommonMethods.queryBathchMergeRecordByCriterias(DBConst.TABLE_TEMP_OBJECT, paramStr);
            if(resultStr.contains("success")){
                String objectName;
                resultJson = JSONObject.parseObject(resultStr);
                resultArray = resultJson.getJSONArray("Content");
                resultArray = resultArray == null ? new JSONArray() : resultArray;
                for(int i=0; i<resultArray.size(); i++){
                    result = resultArray.getJSONObject(i);
                    if(count <= 0){
                        break;
                    }
                    objectName = result.getString("obj_name");
                    if(objectName != null){
                    	boolean likeFlag = false;
                    	for(String key : keyWords){
                    		if(objectName.contains(key)){
                    			likeFlag = true;
                    		}
                    	}
                    	if(likeFlag){
	                        object = new JSONObject();
	                        type = result.getString("obj_type");
	                        if("2".equals(type)){
	                            //部件
	                            object.put("obj_id", result.getString("obj_id"));
	                            object.put("obj_name", objectName);
	                            object.put("obj_type", "component");
	                        }else if("3".equals(type)){
	                            //工具
	                            object.put("obj_id", result.getString("obj_id"));
	                            object.put("obj_name", objectName);
	                            object.put("obj_type", "tool");
	                        }
	                        count ++;
	                        objects.add(object);
                    	}
                    }
                }
            }
        }
        return ToolsUtil.successJsonMsg(objects);
    }

    @Override
    public String queryObjClassForObjSel(String jsonStr) throws Exception {
        String resultStr;
        try{
            resultStr = ToolsUtil.successJsonMsg(CommonMessage.object_class_object);
        }catch (Exception e){
            resultStr = ToolsUtil.errorJsonMsg("");
        }
        return resultStr;
    }

    @Override
    public String queryBuild(String jsonStr) throws Exception {
    	JSONObject jsonObject = JSONObject.parseObject(jsonStr);
        String projectId = jsonObject.getString("project_id");
        String url = getDataPlatformPath(DataRequestPathUtil.dataPlat_object_subset_query, projectId, projectCache.getProjectSecretById(projectId));
        String buildStr = httpPostRequest(url, "{\"criteria\":{\"type\":[\"Bd\"]}}");
        JSONObject buildJson = JSONObject.parseObject(buildStr);
        if("success".equals(buildJson.getString("Result"))){
            JSONObject build, buildItem;
            JSONArray builds, buildArray;
            buildArray = buildJson.getJSONArray("Content");
            builds = new JSONArray();
            for(int i=0; i<buildArray.size(); i++){
                buildItem = buildArray.getJSONObject(i);
                build = new JSONObject();
                build.put("obj_id", buildItem.getString("id"));
                build.put("obj_name", buildItem.getJSONObject(CommonConst.info_name_datas).getString(CommonConst.info_name_local_name_build));
                builds.add(build);
            }
            buildStr = ToolsUtil.successJsonMsg(builds);
        }
        return buildStr;
    }

    @Override
    public String queryFloor(String jsonStr) throws Exception {
    	JSONObject jsonObject = JSONObject.parseObject(jsonStr);
        String projectId = jsonObject.getString("project_id");
        boolean needBack = jsonObject.getBooleanValue("need_back_parents");
        String floorUrl = getDataPlatformPath(DataRequestPathUtil.dataPlat_object_subset_query, projectId, projectCache.getProjectSecretById(projectId));
        String floorStr = httpPostRequest(floorUrl, "{\"criteria\":{\"type\":[\"Fl\"]}}");
        String buildUrl = getDataPlatformPath(DataRequestPathUtil.dataPlat_object_subset_query, projectId, projectCache.getProjectSecretById(projectId));
        String buildStr = httpPostRequest(buildUrl, "{\"criteria\":{\"type\":[\"Bd\"]}}");
        String resultStr = null;
        JSONObject floorJson = JSONObject.parseObject(floorStr);
        JSONObject buildJson = JSONObject.parseObject(buildStr);
        if("success".equals(floorJson.getString("Result"))){
            if("success".equals(buildJson.getString("Result"))){
                //key:buildId value:List<floor>
                Map<String, JSONArray> floorMap = new HashMap<String, JSONArray>();
                String parentStr, buildId, buildName, floorId;
                JSONObject build, buildItem, floor, floorItem;
                JSONArray builds, buildArray, floorArray, floorList;
                //遍历楼层暂存Map
                floorArray = floorJson.getJSONArray("Content");
                for(int i=0; i<floorArray.size(); i++){
                    floorItem = floorArray.getJSONObject(i);
                    floor = new JSONObject();
                    floorId = floorItem.getString("id");
                    floor.put("obj_id", floorId);
                    floor.put("obj_name", floorItem.getJSONObject(CommonConst.info_name_datas).getString(CommonConst.info_name_local_name_floor));
                    buildId = StringUtil.transferId(floorId, CommonConst.tag_build);
                    floorList = floorMap.getOrDefault(buildId, new JSONArray());
                    floorList.add(floor);
                    floorMap.put(buildId, floorList);
                }
                //遍历建筑
                buildArray = buildJson.getJSONArray("Content");
                builds = new JSONArray();
                for(int i=0; i<buildArray.size(); i++){
                    buildItem = buildArray.getJSONObject(i);
                    build = new JSONObject();
                    buildId = buildItem.getString("id");
                    buildName = buildItem.getJSONObject(CommonConst.info_name_datas).getString(CommonConst.info_name_local_name_build);
                    floorList = floorMap.get(buildId);
                    if(needBack && floorList != null){
                        parentStr = "[{\"parent_ids\":[\""+buildId+"\"],\"parent_names\":[\""+buildName+"\"]}]";
                        for(int j=0; j<floorList.size(); j++){
                            floor = floorList.getJSONObject(j);
                            floor.put("parents", JSONArray.parseArray(parentStr));
                        }
                    }
                    build.put("obj_id", buildId);
                    build.put("obj_name", buildName);
                    build.put("content", floorList);
                    builds.add(build);
                }
                resultStr = ToolsUtil.successJsonMsg(builds);
            }else{
                resultStr = buildStr;
            }
        }else{
            resultStr = floorStr;
        }

        return resultStr;
    }

    @Override
    public String querySpace(String jsonStr) throws Exception {
    	JSONObject jsonObject = JSONObject.parseObject(jsonStr);
        String projectId = jsonObject.getString("project_id");
        boolean needBack = jsonObject.getBooleanValue("need_back_parents");
        String objId = jsonObject.getString("obj_id");
        String objType = jsonObject.getString("obj_type");

        String spaceUrl = getDataPlatformPath(DataRequestPathUtil.dataPlat_object_subset_query, projectId, projectCache.getProjectSecretById(projectId));
        String buildUrl = getDataPlatformPath(DataRequestPathUtil.dataPlat_object_batch_query, projectId, projectCache.getProjectSecretById(projectId));
        String floorParamStr, buildParamStr, spaceStr, floorStr, buildStr;
        String floorUrl, spaceParmaStr = "{\"criteria\":{\"id\":\""+objId+"\",\"type\":[\"Sp\"]}}";
        if(CommonConst.data_type_floor.equals(objType)){
            floorUrl = getDataPlatformPath(DataRequestPathUtil.dataPlat_object_batch_query, projectId, projectCache.getProjectSecretById(projectId));
            String buildId = StringUtil.transferId(objId, CommonConst.tag_build);
            buildParamStr = "{\"criterias\":[{\"id\":\""+buildId+"\"}]}";
            floorParamStr = "{\"criterias\":[{\"id\":\""+objId+"\"}]}";
        }else{
            floorUrl = getDataPlatformPath(DataRequestPathUtil.dataPlat_object_subset_query, projectId, projectCache.getProjectSecretById(projectId));
            buildParamStr = "{\"criterias\":[{\"id\":\""+objId+"\"}]}";
            floorParamStr = "{\"criteria\":{\"id\":\""+objId+"\",\"type\":[\"Fl\"]}}";
        }
        spaceStr = httpPostRequest(spaceUrl, spaceParmaStr);
        floorStr = httpPostRequest(floorUrl, floorParamStr);
        buildStr = httpPostRequest(buildUrl, buildParamStr);
        String resultStr = null;
        JSONObject spaceJson = JSONObject.parseObject(spaceStr);
        JSONObject floorJson = JSONObject.parseObject(floorStr);
        JSONObject buildJson = JSONObject.parseObject(buildStr);
        if("success".equals(spaceJson.getString("Result")) && "success".equals(floorJson.getString("Result")) && "success".equals(buildJson.getString("Result"))){
            //定义缓存Map
            //key:buildId value:build
            Map<String, String> buildMap = new HashMap<String, String>();
            //key:floorId value:floor
            Map<String, String> floorMap = new HashMap<String, String>();
            //定义变量
            JSONObject space, spaceItem, floorItem, buildItem;
            JSONArray spaces, spaceArray, floorArray, buildArray;
            String spaceId, parentStr, floorId, buildId;
            //处理建筑数据
            buildArray = buildJson.getJSONArray("Content");
            for(int i=0; i<buildArray.size(); i++){
                buildItem = buildArray.getJSONObject(i);
                buildMap.put(buildItem.getString("id"), buildItem.getJSONObject(CommonConst.info_name_datas).getString(CommonConst.info_name_local_name_build));
            }
            //处理楼层数据
            floorArray = floorJson.getJSONArray("Content");
            for(int i=0; i<floorArray.size(); i++){
                floorItem = floorArray.getJSONObject(i);
                floorMap.put(floorItem.getString("id"), floorItem.getJSONObject(CommonConst.info_name_datas).getString(CommonConst.info_name_local_name_floor));
            }
            //处理空间数据
            spaceArray = spaceJson.getJSONArray("Content");
            spaces = new JSONArray();
            for(int i=0; i<spaceArray.size(); i++){
                spaceItem = spaceArray.getJSONObject(i);
                space = new JSONObject();
                spaceId = spaceItem.getString("id");
                if(needBack){
                    floorId = StringUtil.transferId(spaceId, CommonConst.tag_floor);
                    buildId = StringUtil.transferId(spaceId, CommonConst.tag_build);
                    if(floorMap.containsKey(floorId))
                        parentStr = "[{\"parent_ids\":[\""+buildId+"\",\""+floorId+"\"],\"parent_names\":[\""+buildMap.get(buildId)+"\",\""+floorMap.get(floorId)+"\"]}]";
                    else
                        parentStr = "[{\"parent_ids\":[\""+buildId+"\"],\"parent_names\":[\""+buildMap.get(buildId)+"\"]}]";
                    space.put("parents", JSONArray.parseArray(parentStr));
                }
                space.put("obj_id", spaceId);
                space.put("obj_name", spaceItem.getJSONObject(CommonConst.info_name_datas).getString(CommonConst.info_name_local_name_space));
                spaces.add(space);
            }
            resultStr = ToolsUtil.successJsonMsg(spaces);
        }
        if("failure".equals(spaceJson.getString("Result")))
            resultStr = spaceStr;
        if("failure".equals(floorJson.getString("Result")))
            resultStr = floorStr;
        if("failure".equals(buildJson.getString("Result")))
            resultStr = buildStr;
        return resultStr;
    }

    @Override
    public String querySystem(String jsonStr) throws Exception {
    	JSONObject jsonObject = JSONObject.parseObject(jsonStr);
        String projectId = jsonObject.getString("project_id");
        boolean needBack = jsonObject.getBooleanValue("need_back_parents");
        String dictUrl = getDataPlatDictPath(DataRequestPathUtil.dataPlat_dict_query, "equipment_all");
        String dictStr = httpGetRequest(dictUrl);
        String buildUrl = getDataPlatformPath(DataRequestPathUtil.dataPlat_object_subset_query, projectId, projectCache.getProjectSecretById(projectId));
        String buildStr = httpPostRequest(buildUrl, "{\"criteria\":{\"type\":[\"Bd\"]}}");
        String systemUrl = getDataPlatformPath(DataRequestPathUtil.dataPlat_object_subset_query, projectId, projectCache.getProjectSecretById(projectId));
        String systemStr = httpPostRequest(systemUrl, "{\"criteria\":{\"type\":[\"Sy\"]}}");
        JSONObject dictJson = JSONObject.parseObject(dictStr);
        JSONObject buildJson = JSONObject.parseObject(buildStr);
        JSONObject systemJson = JSONObject.parseObject(systemStr);
        String resultStr = null;
        if("success".equals(dictJson.getString("Result")) && "success".equals(buildJson.getString("Result")) && "success".equals(systemJson.getString("Result"))){
            //定义缓存
            //key:systemClass(dictId) value:List<system>
            Map<String, List<String>> systemMap = new HashMap<String, List<String>>();
            //key:buildId value:buildName
            Map<String, String> buildMap = new HashMap<String, String>();
            List<String> systemList;
            //定义变量
            String dictId, dictName, buildId, buildName, systemId, systemName, systemClass, parentStr;
            JSONObject dict, dictItem, buildItem, system, systemItem;
            JSONArray dicts, dictArray, buildArray, systems, systemArray;
            //处理系统数据
            systemArray = systemJson.getJSONArray("Content");
            for(int i=0; i<systemArray.size(); i++){
                systemItem = systemArray.getJSONObject(i);
                system = new JSONObject();
                systemId = systemItem.getString("id");
                systemName = systemItem.getJSONObject(CommonConst.info_name_datas).getString(CommonConst.info_name_local_name_system);
                systemClass = StringUtil.getEquipOrSystemCodeFromId(systemId, CommonConst.tag_dict_class);
                system.put("obj_id", systemId);
                system.put("obj_name", systemName);
                systemList = systemMap.getOrDefault(systemClass, new ArrayList<String>());
                systemList.add(system.toJSONString());
                systemMap.put(systemClass, systemList);
            }
            //处理建筑数据
            buildArray = buildJson.getJSONArray("Content");
            for(int i=0; i<buildArray.size(); i++){
                buildItem = buildArray.getJSONObject(i);
                buildMap.put(buildItem.getString("id"), buildItem.getJSONObject(CommonConst.info_name_datas).getString(CommonConst.info_name_local_name_build));
            }
            //处理数据字典
            dictArray = dictJson.getJSONArray("Content");
            dicts = new JSONArray();
            for(int i=0; i<dictArray.size(); i++){
                dictItem = dictArray.getJSONObject(i);
                dict = new JSONObject();
                dictId = dictItem.getString("code");
                dictName = DictionaryCache.getNameByTypeCode(CommonConst.dict_type_object_domain, dictId, projectId);
                systemList = systemMap.getOrDefault(dictId, new ArrayList<String>());
                systems = new JSONArray();
                for(String systemObj : systemList){
                    system = JSONObject.parseObject(systemObj);
                    systemId = system.getString("obj_id");
                    buildId = StringUtil.transferId(systemId, CommonConst.tag_build);
                    buildName = buildMap.get(buildId);
                    if(needBack){
                        parentStr = "[{\"parent_ids\":[\""+dictId+"\"],\"parent_names\":[\""+dictName+"\"]},{\"parent_ids\":[\""+buildId+"\"],\"parent_names\":[\""+buildName+"\"]}]";
                        system.put("parents", JSONArray.parseArray(parentStr));
                    }
                    systems.add(system);
                }
                dict.put("obj_id", dictId);
                dict.put("obj_name", dictName);
                dict.put("content", systems);
                dicts.add(dict);
            }
            resultStr = ToolsUtil.successJsonMsg(dicts);
        }
        if("failure".equals(dictJson.getString("Result")))
            resultStr = dictStr;
        if("failure".equals(buildJson.getString("Result")))
            resultStr = buildStr;
        if("failure".equals(systemJson.getString("Result")))
            resultStr = systemStr;
        return resultStr;
    }

    @Override
    public String querySystemForSystemDomain(String jsonStr) throws Exception {
    	JSONObject jsonObject = JSONObject.parseObject(jsonStr);
    	String buildId = jsonObject.getString("build_id");
        String projectId = jsonObject.getString("project_id");
        String url = getDataPlatformPath(DataRequestPathUtil.dataPlat_system_query_by_domain, projectId, projectCache.getProjectSecretById(projectId));
        String systemStr = httpPostRequest(url, "{\"criteria\":{\"category\":\""+jsonObject.getString("system_domain")+"\"}}");
        String resultStr = systemStr;
        JSONObject systemJson = JSONObject.parseObject(systemStr);
        if("success".equals(systemJson.getString("Result"))){
        	String systemId, sysBuildId;
            JSONObject system, systemItem;
            JSONArray systems, systemArray;
            systemArray = systemJson.getJSONArray("Content");
            systems = new JSONArray();
            for(int i=0; i<systemArray.size(); i++){
                systemItem = systemArray.getJSONObject(i);
                systemId = systemItem.getString("id");
                if(!StringUtil.isNull(buildId)){
                	sysBuildId = StringUtil.transferId(systemId, CommonConst.tag_build);
                	if(!buildId.equals(sysBuildId)){
                		continue;
                	}
                }
                system = new JSONObject();
                system.put("system_id", systemId);
                system.put("system_name", systemItem.getJSONObject(CommonConst.info_name_datas).getString(CommonConst.info_name_local_name_system));
                systems.add(system);
            }
            resultStr = ToolsUtil.successJsonMsg(systems);
        }
        return resultStr;
    }

    @Override
    public String queryBuildFloorSpaceTree(String jsonStr) throws Exception {
    	JSONObject jsonObject = JSONObject.parseObject(jsonStr);
        String projectId = jsonObject.getString("project_id");
        String params = "{\"criteria\":{\"type\":[\"Bd\",\"Fl\",\"Sp\"]}}";
        String requestUrl = getDataPlatformPath(DataRequestPathUtil.dataPlat_object_subset_query, projectId, projectCache.getProjectSecretById(projectId));
        String objectResultStr = httpPostRequest(requestUrl, params);
        if(objectResultStr.contains("success")){
            //key:buildId value:buildl+LocalName
            Map<String, String> buildMap = new HashMap<String, String>();
            //key:buildId value:List<FloorId-or-SpaceId>
            Map<String, JSONArray> relBuildStepObjectMap = new HashMap<String, JSONArray>();
            //key:floorId value:floor_local_name
            Map<String, String> floorMap = new HashMap<String, String>();
            //key:floorId value:List<SpaceId>
            Map<String, JSONArray> relFloorSpaceMap = new HashMap<String, JSONArray>();
            //key:spaceId value:space_local_name
            Map<String, String> spaceMap = new HashMap<String, String>();
            String objectId, buildId, floorId;
            JSONObject objectItem;
            JSONArray mapValues;
            JSONObject objectJson = JSONObject.parseObject(objectResultStr);
            JSONArray objectArray =objectJson.getJSONArray("Content");
            objectArray = objectArray == null ? new JSONArray() : objectArray;
            for(int i=0; i<objectArray.size(); i++){
                objectItem = objectArray.getJSONObject(i);
                objectId = objectItem.getString("id");
                if(objectId.startsWith(CommonConst.tag_build)){
                    //建筑
                    buildMap.put(objectId, objectItem.getJSONObject(CommonConst.info_name_datas).getString(CommonConst.info_name_local_name_build));
                }else if(objectId.startsWith(CommonConst.tag_floor)){
                    //楼层
                    buildId = StringUtil.transferId(objectId, CommonConst.tag_build);
                    mapValues = relBuildStepObjectMap.get(buildId);
                    mapValues = mapValues == null ? new JSONArray() : mapValues;
                    mapValues.add(objectId);
                    relBuildStepObjectMap.put(buildId, mapValues);
                    floorMap.put(objectId, objectItem.getJSONObject(CommonConst.info_name_datas).getString(CommonConst.info_name_local_name_floor));
                }else if(objectId.startsWith(CommonConst.tag_space)){
                    //空间
                    floorId = StringUtil.transferId(objectId, CommonConst.tag_floor);
                    if(floorId.endsWith("000")){
                        buildId = StringUtil.transferId(objectId, CommonConst.tag_build);
                        mapValues = relBuildStepObjectMap.get(buildId);
                        mapValues = mapValues == null ? new JSONArray() : mapValues;
                        mapValues.add(objectId);
                        relBuildStepObjectMap.put(buildId, mapValues);
                    }else{
                        mapValues = relFloorSpaceMap.get(floorId);
                        mapValues = mapValues == null ? new JSONArray() : mapValues;
                        mapValues.add(objectId);
                        relFloorSpaceMap.put(floorId, mapValues);
                    }
                    spaceMap.put(objectId, objectItem.getJSONObject(CommonConst.info_name_datas).getString(CommonConst.info_name_local_name_space));
                }
            }
            String stepObjectId, spaceId;
            JSONObject build, buildStepObject, space;
            JSONArray builds, buildStepObjects, spaces, relStepObjects, relSpaces;
            //
            builds = new JSONArray();
            for(String buildKey : buildMap.keySet()){
                build = new JSONObject();
                buildStepObjects = new JSONArray();
                //处理下级对象楼层、空间
                relStepObjects = relBuildStepObjectMap.getOrDefault(buildKey, new JSONArray());
                for(int i=0; i<relStepObjects.size(); i++){
                    stepObjectId = relStepObjects.getString(i);
                    buildStepObject = new JSONObject();
                    if(stepObjectId.startsWith(CommonConst.tag_floor)){
                        //楼层
                        spaces = new JSONArray();
                        relSpaces = relFloorSpaceMap.getOrDefault(stepObjectId, new JSONArray());
                        for(int j=0; j<relSpaces.size(); j++){
                            spaceId = relSpaces.getString(j);
                            space = new JSONObject();
                            space.put("obj_id", spaceId);
                            space.put("obj_name", spaceMap.getOrDefault(spaceId, ""));
                            space.put("obj_type", "space");
                            spaces.add(space);
                        }
                        buildStepObject.put("obj_id", stepObjectId);
                        buildStepObject.put("obj_name", floorMap.getOrDefault(stepObjectId, ""));
                        buildStepObject.put("obj_type", "floor");
                        buildStepObject.put("content", spaces);
                        buildStepObjects.add(buildStepObject);
                    }else{
                        //空间
                        buildStepObject.put("obj_id", stepObjectId);
                        buildStepObject.put("obj_id", spaceMap.getOrDefault(stepObjectId, ""));
                        buildStepObject.put("obj_type", "space");
                        buildStepObjects.add(buildStepObject);
                    }
                }
                build.put("obj_id", buildKey);
                build.put("obj_name", buildMap.getOrDefault(buildKey, ""));
                build.put("obj_type", "build");
                build.put("content", buildStepObjects);
                builds.add(build);
            }
            objectResultStr = ToolsUtil.successJsonMsg(builds);
        }
        return objectResultStr;
    }

    @Override
    public String queryEquip(String jsonStr) throws Exception {
    	JSONObject jsonObject = JSONObject.parseObject(jsonStr);
        String projectId = jsonObject.getString("project_id");
        String buildId = jsonObject.getString("build_id");
        String spaceId = jsonObject.getString("space_id");
        String domain = jsonObject.getString("domain_code");
        String systemId = jsonObject.getString("system_id");
        boolean needBackParents = jsonObject.getBooleanValue("need_back_parents");
        if(StringUtil.isNull(buildId)){
            if(!StringUtil.isNull(spaceId)){
                buildId = StringUtil.transferId(spaceId, CommonConst.tag_build);
            }else if(!StringUtil.isNull(systemId)){
                buildId = StringUtil.transferId(systemId, CommonConst.tag_build);
            }
        }
        String buildName = "";
        Map<String, String> objectIdNameMap = new HashMap<String, String>();
        if(needBackParents) {
            //查询建筑名称
            String paramsStr = "{\"criterias\":[{\"id\":\"" + buildId + "\"}]}";
            String buildRequstUrl = getDataPlatformPath(DataRequestPathUtil.dataPlat_object_batch_query, projectId, projectCache.getProjectSecretById(projectId));
            String buildResultStr = httpPostRequest(buildRequstUrl, paramsStr);
            JSONObject buildJson = JSONObject.parseObject(buildResultStr);
            JSONArray builds = buildJson.getJSONArray("Content");
            if ("failure".equals(buildJson.getString("Result")) || builds.size() < 1) {
                return buildResultStr;
            }
            JSONObject build = builds.getJSONObject(0);
            buildName = build.getJSONObject(CommonConst.info_name_datas).getString(CommonConst.info_name_local_name_build);
            //查询建筑下楼层、空间信息
            paramsStr = "{\"criteria\":{\"id\":\""+ buildId +"\",\"type\":[\"Fl\",\"Sp\",\"Sy\"]}}";
            String objectRequestUrl = getDataPlatformPath(DataRequestPathUtil.dataPlat_object_subset_query, projectId, projectCache.getProjectSecretById(projectId));
            String objectResultStr = httpPostRequest(objectRequestUrl, paramsStr);
            if(objectResultStr.contains("failure")){
                return objectResultStr;
            }
            objectIdNameMap = getObjectIdNameMap(objectResultStr);
        }

        JSONObject params = new JSONObject();
        Map<String, String> relationEqSpMap, relationEqSyMap;
        String relationUrl = getDataPlatformPath(DataRequestPathUtil.dataPlat_relation_relation_instance_query, projectId, projectCache.getProjectSecretById(projectId));
        //设备所在空间关系查询
        params.clear();
        String resultStr;
        String graphId = graphCache.getGraphIdByProjectIdAndGraph(projectId, CommonConst.graph_type_equip_in_space);
        if(StringUtil.isNull(graphId)){
        	resultStr = ToolsUtil.successJsonMsg(new JSONArray());
        }else{
        	JSONObject criteria = new JSONObject();
        	criteria.put("graph_id", graphId);
        	criteria.put("rel_type", CommonConst.relation_type_equip_in_space);
	        if(!StringUtil.isNull(spaceId)){
	        	criteria.put("to_id", spaceId);
	        }
	        params.put("criteria", criteria);
	        resultStr = httpPostRequest(relationUrl, params.toJSONString());
        }
        if(resultStr.contains("success")){
            relationEqSpMap = getRelationMap(resultStr, CommonConst.relation_from_id, CommonConst.relation_to_id);
            //设备所在系统关系查询
            params.clear();
            graphId = graphCache.getGraphIdByProjectIdAndGraph(projectId, CommonConst.graph_type_system_contain_equip);
            if(StringUtil.isNull(graphId)){
            	resultStr = ToolsUtil.successJsonMsg(new JSONArray());
            }else{
            	JSONObject criteria = new JSONObject();
            	criteria.put("graph_id", graphId);
            	criteria.put("rel_type", CommonConst.relation_type_system_contain_equip);
	            if(!StringUtil.isNull(systemId)){
	            	criteria.put("from_id", systemId);
	            }
	            params.put("criteria", criteria);
	            resultStr = httpPostRequest(relationUrl, params.toJSONString());
            }
            if(resultStr.contains("success")){
                relationEqSyMap = getRelationMap(resultStr, CommonConst.relation_to_id, CommonConst.relation_from_id);
                //查询建筑下所有设备
                String equipRequestUrl = getDataPlatformPath(DataRequestPathUtil.dataPlat_object_subset_query, projectId, projectCache.getProjectSecretById(projectId));
                params = new JSONObject();
                JSONObject criteria = new JSONObject();
                criteria.put("id", buildId);
                criteria.put("type", JSONArray.parseArray("[\""+CommonConst.tag_equip+"\"]"));
                params.put("criteria", criteria);
                resultStr = httpPostRequest(equipRequestUrl, params.toJSONString());
                if(resultStr.contains("success")){
                    String equipId, relSpaceId, relSpaceName, relFloorId, relFloorName, relSystemId, relSystemName, domainId, domainName;
                    JSONObject equip, equipItem, parent;
                    JSONArray equips, parents, parentIds, parentNames;
                    //处理设备数据
                    JSONObject equipJson = JSONObject.parseObject(resultStr);
                    JSONArray equipArray = equipJson.getJSONArray("Content");
                    equipArray = equipArray == null ? new JSONArray() : equipArray;
                    equips = new JSONArray();
                    for(int i=0; i<equipArray.size(); i++){
                        equipItem = equipArray.getJSONObject(i);
                        equipId = equipItem.getString("id");
                        if(!StringUtil.isNull(domain) && !domain.equals(StringUtil.getEquipOrSystemCodeFromId(equipId, CommonConst.tag_dict_class))){
                        	continue;
                        }
                        if(!StringUtil.isNull(spaceId) && !relationEqSpMap.containsKey(equipId)){
                            continue;
                        }
                        if(!StringUtil.isNull(systemId) && !relationEqSyMap.containsKey(equipId)){
                            continue;
                        }
                        equip = new JSONObject();
                        if(needBackParents){
                            //组织parents
                            parents = new JSONArray();
                            //建筑-楼层-空间
                            parent = new JSONObject();
                            parentIds = new JSONArray();
                            parentNames = new JSONArray();
                            parentIds.add(buildId);
                            parentNames.add(buildName);
                            if(relationEqSpMap.containsKey(equipId)){
                                relSpaceId = relationEqSpMap.get(equipId);
                                relSpaceName = objectIdNameMap.get(relSpaceId);
                                relFloorId = StringUtil.transferId(relSpaceId, CommonConst.tag_floor);
                                relFloorName = objectIdNameMap.get(relFloorId);
                                if(!relFloorId.endsWith("000") && !StringUtil.isNull(relFloorName)){
                                    parentIds.add(relFloorId);
                                    parentNames.add(relFloorName);
                                }
                                parentIds.add(relSpaceId);
                                parentNames.add(relSpaceName);
                            }
                            parent.put("parent_ids", parentIds);
                            parent.put("parent_names", parentNames);
                            parents.add(parent);
                            //专业-系统实例
                            if(relationEqSyMap.containsKey(equipId)){
                                parent = new JSONObject();
                                parentIds = new JSONArray();
                                parentNames = new JSONArray();
                                relSystemId = relationEqSyMap.get(equipId);
                                relSystemName = objectIdNameMap.get(relSystemId);
                                domainId = StringUtil.getEquipOrSystemCodeFromId(relSystemId, CommonConst.tag_dict_class);
                                domainName = DictionaryCache.getNameByTypeCode(CommonConst.dict_type_object_domain, domainId, projectId);
                                parentIds.add(domainId);
                                parentNames.add(domainName);
                                parentIds.add(relSystemId);
                                parentNames.add(relSystemName);
                                parent.put("parent_ids", parentIds);
                                parent.put("parent_names", parentNames);
                                parents.add(parent);
                            }
                            equip.put("parents", parents);
                        }
                        equip.put("obj_id", equipId);
                        equip.put("obj_name", equipItem.getJSONObject(CommonConst.info_name_datas).getString(CommonConst.info_name_local_name_equip));
                        equips.add(equip);
                    }
                    resultStr = ToolsUtil.successJsonMsg(equips);
                }
            }
        }
        return resultStr;
    }

    @Override
    public String queryTempObjectList(String jsonStr) throws Exception {
    	JSONObject jsonObject = JSONObject.parseObject(jsonStr);
        jsonObject.put(DBConst.TABLE_FIELD_VALID, true);
        String paramStr = JSONUtil.getCriteriaWithMajors(jsonObject, "valid", "project_id", "obj_type").toJSONString();
        String resultStr = DBCommonMethods.queryRecordByCriteria(DBConst.TABLE_TEMP_OBJECT, paramStr);
        resultStr = JSONUtil.processQueryResult(resultStr, null, null, JSONUtil.filter, null, null, "obj_id", "obj_name", "obj_type").toJSONString();
        return resultStr;
    }

    @Override
    public String addBatchTempObject(String jsonStr) throws Exception {
    	JSONObject jsonObject = JSONObject.parseObject(jsonStr);
        JSONArray objs = jsonObject.getJSONArray("objs");
        String resultStr, paramStr;
        paramStr = JSONUtil.getCriteriaWithMajors(jsonObject, "project_id", "obj_type").toJSONString();
        resultStr = DBCommonMethods.queryRecordByCriteria(DBConst.TABLE_TEMP_OBJECT, paramStr);
        List<String> objName = proccessQueryResult(JSONObject.parseObject(resultStr), "obj_name");
        JSONObject obj;
        resultStr = ToolsUtil.successJsonMsg("");
        for(int i=0; i<objs.size(); i++){
            obj = objs.getJSONObject(i);
            if(objName.contains(obj.getString("obj_name"))) {
                continue;
            }
            obj.put("obj_id", DateUtil.getUtcTimeNow() + "" + i);
            jsonObject.putAll(obj);
            paramStr = JSONUtil.getAddParamJson(jsonObject).toJSONString();
            resultStr = DBCommonMethods.insertRecord(DBConst.TABLE_TEMP_OBJECT, paramStr);
            if(resultStr.contains("failure"))
                break;
        }
        return resultStr;
    }

    @Override
    public String searchInfoPoint(String jsonStr) throws Exception {
    	JSONObject jsonObject = JSONObject.parseObject(jsonStr);
        String projectId = jsonObject.getString("project_id");
        String keyWord = jsonObject.getString("keyword");
        keyWord = keyWord == null ? "" : keyWord;
        String[] keyWords = keyWord.split(" +");
        JSONObject param  = new JSONObject();
        JSONArray category = JSONArray.parseArray("[\"Eq\",\"Sy\",\"EqObj\",\"SyObj\"]");
        param.put("keywords", keyWords);
        param.put("info_class", "private");
        param.put("category", category);
        param.put("limit", "200");
        String infoRequestUrl = getDataPlatformPath(DataRequestPathUtil.dataPlat_infoPoint_search, projectId, projectCache.getProjectSecretById(projectId));
        String resultStr = httpPostRequest(infoRequestUrl, param.toJSONString());
        if(resultStr.contains("success")){
            String infoType, parentId, parentName;
            JSONObject info, infoItem, parent, infoPoint;
            JSONArray infos, parents, parentIds, parentNames;
            JSONObject resultJson = JSONObject.parseObject(resultStr);
            JSONArray infoArray = resultJson.getJSONArray("Content");
            infos = new JSONArray();
            for(int i=0; i<infoArray.size(); i++){
                infoItem = infoArray.getJSONObject(i);
                info = new JSONObject();
                parents = new JSONArray();
                infoType = infoItem.getString("type");
                if(CommonConst.tag_equip.equals(infoType)){
                    //设备大类信息点
                    parents = new JSONArray();
                    infoPoint = new JSONObject();
                    //处理父级关系
                    parent = new JSONObject();
                    parentIds = new JSONArray();
                    parentNames = new JSONArray();
                    parentId = infoItem.getString("major");
                    parentName = DictionaryCache.getNameByTypeCode(CommonConst.dict_type_object_domain, parentId, projectId);
                    if(!StringUtil.isNull(parentId, parentName)) {
                        parentIds.add(parentId);
                        parentNames.add(parentName);
                    }
                    parentId = infoItem.getString("sys");
                    parentName = infoItem.getString("sysName");
                    if(!StringUtil.isNull(parentId, parentName)) {
                        parentIds.add(parentId);
                        parentNames.add(parentName);
                    }
                    parent.put("parent_ids", parentIds);
                    parent.put("parent_names", parentNames);
                    parents.add(parent);
                    //处理信息点
                    infoPoint.put("id", "equip_" + infoItem.getString("eq") + "_" + infoItem.getString("info"));
                    infoPoint.put("code", infoItem.getString("info"));
                    infoPoint.put("name", infoItem.getString("infoName"));

                    info.put("obj_id", infoItem.getString("eq"));
                    info.put("obj_name", infoItem.getString("eqName"));
                    info.put("obj_type", "equip_class");
                    info.put("parents", parents);
                    info.put("info_point", infoPoint);
                }else if(CommonConst.tag_system.equals(infoType)){
                    //系统大类信息点
                    parents = new JSONArray();
                    infoPoint = new JSONObject();
                    //处理父级关系
                    parent = new JSONObject();
                    parentIds = new JSONArray();
                    parentNames = new JSONArray();
                    parentId = infoItem.getString("major");
                    parentName = DictionaryCache.getNameByTypeCode(CommonConst.dict_type_object_domain, parentId, projectId);
                    if(!StringUtil.isNull(parentId, parentName)) {
                        parentIds.add(parentId);
                        parentNames.add(parentName);
                    }
                    parent.put("parent_ids", parentIds);
                    parent.put("parent_names", parentNames);
                    parents.add(parent);
                    //处理信息点
                    infoPoint.put("id", "system_" + infoItem.getString("sys") + "_" + infoItem.getString("info"));
                    infoPoint.put("code", infoItem.getString("info"));
                    infoPoint.put("name", infoItem.getString("infoName"));

                    info.put("obj_id", infoItem.getString("sys"));
                    info.put("obj_name", infoItem.getString("sysName"));
                    info.put("obj_type", "system_class");
                    info.put("parents", parents);
                    info.put("info_point", infoPoint);
                }else if(CommonConst.tag_equip_object.equals(infoType)){
                    //设备对象信息点
                    parents = new JSONArray();
                    infoPoint = new JSONObject();
                    //处理父级关系
                    parent = new JSONObject();
                    //处理设备大类父级关系
                    if(!StringUtil.isNull(infoItem, "major", "sysObj")) {
                        parentIds = new JSONArray();
                        parentNames = new JSONArray();
                        parentId = infoItem.getString("major");
                        parentName = DictionaryCache.getNameByTypeCode(CommonConst.dict_type_object_domain, parentId, projectId);
                        if (!StringUtil.isNull(parentId, parentName)) {
                            parentIds.add(parentId);
                            parentNames.add(parentName);
                        }
                        parentId = infoItem.getString("sysObj");
                        parentName = infoItem.getString("sysObjName");
                        if (!StringUtil.isNull(parentId, parentName)) {
                            parentIds.add(parentId);
                            parentNames.add(parentName);
                        }
                        parent.put("parent_ids", parentIds);
                        parent.put("parent_names", parentNames);
                        parents.add(parent);
                    }
                    //处理建筑-楼层-空间父级关系
                    parent = new JSONObject();
                    parentIds = new JSONArray();
                    parentNames = new JSONArray();
                    if(!StringUtil.isNull(infoItem, "bdObj")){
                        parentId = infoItem.getString("bdObj");
                        parentName = infoItem.getString("flObjName");
                        parentIds.add(parentId);
                        parentNames.add(parentName);
                    }
                    if(!StringUtil.isNull(infoItem, "flObj")){
                        parentId = infoItem.getString("flObj");
                        parentName = infoItem.getString("bdObjName");
                        parentIds.add(parentId);
                        parentNames.add(parentName);
                    }
                    if(!StringUtil.isNull(infoItem, "spObj")){
                        parentId = infoItem.getString("spObj");
                        parentName = infoItem.getString("spObjName");
                        parentIds.add(parentId);
                        parentNames.add(parentName);
                    }
                    parent.put("parent_ids", parentIds);
                    parent.put("parent_names", parentNames);
                    parents.add(parent);

                    //处理信息点
                    infoPoint.put("id", "equip_" + StringUtil.getEquipOrSystemCodeFromId(infoItem.getString("eqObj"), CommonConst.tag_dict_equip) + "_" + infoItem.getString("info"));
                    infoPoint.put("code", infoItem.getString("info"));
                    infoPoint.put("name", infoItem.getString("infoName"));

                    info.put("obj_id", infoItem.getString("eqObj"));
                    info.put("obj_name", infoItem.getString("eqObjName"));
                    info.put("obj_type", "equip");
                    info.put("parents", parents);
                    info.put("info_point", infoPoint);
                }else if(CommonConst.tag_system_object.equals(infoType)){
                    //系统对象信息点
                    parents = new JSONArray();
                    infoPoint = new JSONObject();
                    //处理父级关系
                    parent = new JSONObject();
                    parentIds = new JSONArray();
                    parentNames = new JSONArray();
                    parentId = infoItem.getString("major");
                    parentName = DictionaryCache.getNameByTypeCode(CommonConst.dict_type_object_domain, parentId, projectId);
                    if(!StringUtil.isNull(parentId, parentName)) {
                        parentIds.add(parentId);
                        parentNames.add(parentName);
                    }
                    parent.put("parent_ids", parentIds);
                    parent.put("parent_names", parentNames);
                    parents.add(parent);
                    //建筑
                    parentIds = new JSONArray();
                    parentNames = new JSONArray();
                    parentId = infoItem.getString("bdObj");
                    parentName = infoItem.getString("bdObjName");
                    if(!StringUtil.isNull(parentId, parentName)) {
                        parentIds.add(parentId);
                        parentNames.add(parentName);
                    }
                    parent.put("parent_ids", parentIds);
                    parent.put("parent_names", parentNames);
                    parents.add(parent);
                    //处理信息点
                    infoPoint.put("id", "system_" + StringUtil.getEquipOrSystemCodeFromId(infoItem.getString("sysObj"), CommonConst.tag_dict_sytstem) + "_" + infoItem.getString("info"));
                    infoPoint.put("code", infoItem.getString("info"));
                    infoPoint.put("name", infoItem.getString("infoName"));

                    info.put("obj_id", infoItem.getString("sysObj"));
                    info.put("obj_name", infoItem.getString("sysObjName"));
                    info.put("obj_type", "system");
                    info.put("parents", parents);
                    info.put("info_point", infoPoint);
                }
                infos.add(info);
            }
            resultStr = ToolsUtil.successJsonMsg(infos);
        }
        return resultStr;
    }

    @Override
    public String queryObjClassForInfoPointSel(String jsonStr) throws Exception {
        String resultStr;
        try{
            resultStr = ToolsUtil.successJsonMsg(CommonMessage.object_class_infoPoint);
        }catch (Exception e){
            resultStr = ToolsUtil.errorJsonMsg("");
        }
        return resultStr;
    }

    /**
     * 处理查询结果 获取sop主键ID
     * @param jsonObject
     * @param infoName
     * @return
     */
    public List<String> proccessQueryResult(JSONObject jsonObject, String infoName){
        List<String> set = null;
        if(jsonObject != null){
            JSONArray array = jsonObject.getJSONArray("Content");
            if(array != null){
                set = new ArrayList<String>();
                for(int i=0; i<array.size(); i++){
                    set.add(array.getJSONObject(i).getString(infoName));
                }
            }
        }
        return set;
    }

    @Override
    public String queryInfoPointForSystem(String jsonStr) throws Exception {
    	JSONObject jsonObject = JSONObject.parseObject(jsonStr);
        String systemId = jsonObject.getString("obj_id");
        String systemType = StringUtil.getEquipOrSystemCodeFromId(systemId, CommonConst.tag_dict_sytstem);
        String url = getDataPlatDictPath(DataRequestPathUtil.dataPlat_infoPoint_special, systemType);
        String infoStr = httpGetRequest(url);
        JSONObject infoJson = JSONObject.parseObject(infoStr);
        if("success".equals(infoJson.getString("Result"))){
            JSONObject info, infoItem;
            JSONArray infos, infoArray;
            String code, id;
            infoArray = infoJson.getJSONArray("Content");
            infos = new JSONArray();
            for(int i=0; i<infoArray.size(); i++){
                infoItem = infoArray.getJSONObject(i);
                code = infoItem.getString(CommonConst.info_name_info_point_code);
                id = "system"+"_" +systemType+"_"+code;
                if(InfoPointCache.isShowInApp(id)){
                    info = new JSONObject();
                    info.put("id", id);
                    info.put("code", code);
                    info.put("name", infoItem.getString(CommonConst.info_name_info_point_name));
                    infos.add(info);
                }
            }
            infoStr = ToolsUtil.successJsonMsg(infos);
        }
        return infoStr;
    }

    @Override
    public String queryInfoPointForEquip(String jsonStr) throws Exception {
    	JSONObject jsonObject = JSONObject.parseObject(jsonStr);
        String equipId = jsonObject.getString("obj_id");
        String equipType = StringUtil.getEquipOrSystemCodeFromId(equipId, CommonConst.tag_dict_equip);
        String url = getDataPlatDictPath(DataRequestPathUtil.dataPlat_infoPoint_special, equipType);
        String infoStr = httpGetRequest(url);
        JSONObject infoJson = JSONObject.parseObject(infoStr);
        if("success".equals(infoJson.getString("Result"))){
            JSONObject info, infoItem;
            JSONArray infos, infoArray;
            String code, id;
            infoArray = infoJson.getJSONArray("Content");
            infos = new JSONArray();
            for(int i=0; i<infoArray.size(); i++){
                infoItem = infoArray.getJSONObject(i);
                code = infoItem.getString(CommonConst.info_name_info_point_code);
                id = "equip"+"_" +equipType+"_"+code;
                if(InfoPointCache.isShowInApp(id)){
                    info = new JSONObject();
                    info.put("id", id);
                    info.put("code", code);
                    info.put("name", infoItem.getString(CommonConst.info_name_info_point_name));
                    infos.add(info);
                }
            }
            infoStr = ToolsUtil.successJsonMsg(infos);
        }
        return infoStr;
    }

    @Override
    public String queryInfoPointForSystemClass(String jsonStr) throws Exception {
    	JSONObject jsonObject = JSONObject.parseObject(jsonStr);
        String systemType = jsonObject.getString("obj_id");
        String url = getDataPlatDictPath(DataRequestPathUtil.dataPlat_infoPoint_special, systemType);
        String infoStr = httpGetRequest(url);
        JSONObject infoJson = JSONObject.parseObject(infoStr);
        if("success".equals(infoJson.getString("Result"))){
            JSONObject info, infoItem;
            JSONArray infos, infoArray;
            String code, id;
            infoArray = infoJson.getJSONArray("Content");
            infos = new JSONArray();
            for(int i=0; i<infoArray.size(); i++){
                infoItem = infoArray.getJSONObject(i);
                code = infoItem.getString(CommonConst.info_name_info_point_code);
                id = "system"+"_" +systemType+"_"+code;
                if(InfoPointCache.isShowInApp(id)){
                    info = new JSONObject();
                    info.put("id", id);
                    info.put("code", code);
                    info.put("name", infoItem.getString(CommonConst.info_name_info_point_name));
                    infos.add(info);
                }
            }
            infoStr = ToolsUtil.successJsonMsg(infos);
        }
        return infoStr;
    }

    @Override
    public String queryInfoPointForEquipClass(String jsonStr) throws Exception {
    	JSONObject jsonObject = JSONObject.parseObject(jsonStr);
        String equipType = jsonObject.getString("obj_id");
        String url = getDataPlatDictPath(DataRequestPathUtil.dataPlat_infoPoint_special, equipType);
        String infoStr = httpGetRequest(url);
        JSONObject infoJson = JSONObject.parseObject(infoStr);
        if("success".equals(infoJson.getString("Result"))){
            JSONObject info, infoItem;
            JSONArray infos, infoArray;
            String code, id;
            infoArray = infoJson.getJSONArray("Content");
            infos = new JSONArray();
            for(int i=0; i<infoArray.size(); i++){
                infoItem = infoArray.getJSONObject(i);
                code = infoItem.getString(CommonConst.info_name_info_point_code);
                id = "equip"+"_" +equipType+"_"+code;
                if(InfoPointCache.isShowInApp(id)){
                    info = new JSONObject();
                    info.put("id", id);
                    info.put("code", code);
                    info.put("name", infoItem.getString(CommonConst.info_name_info_point_name));
                    infos.add(info);
                }
            }
            infoStr = ToolsUtil.successJsonMsg(infos);
        }
        return infoStr;
    }

    @Override
    public String queryObjectByClass(String jsonStr) throws Exception {
    	JSONObject jsonObject = JSONObject.parseObject(jsonStr);
        String projectId = jsonObject.getString("project_id");
        String objectUrl = getDataPlatformPath(DataRequestPathUtil.dataPlat_object_subset_query, projectId, projectCache.getProjectSecretById(projectId));
        String relationUrl = getDataPlatformPath(DataRequestPathUtil.dataPlat_relation_relation_instance_query, projectId, projectCache.getProjectSecretById(projectId));
        String resultStr = httpPostRequest(objectUrl, "{\"criteria\":{\"type\":[\""+jsonObject.getString("obj_id")+"\"]}}");
        boolean isError = false;
        if(resultStr.contains("failure")){
            isError = true;
        }

        if("system_class".equals(jsonObject.getString("obj_type"))){
            Map<String, String> idNameMap = new HashMap<String, String>();
            //获取所有建筑实例数据
            if(!isError) {
                String objectStr = httpPostRequest(objectUrl, "{\"criteria\":{\"type\":[\""+CommonConst.tag_build+"\"]}}");
                if (objectStr.contains("success")) {
                    idNameMap = getObjectIdNameMap(objectStr);
                } else {
                    isError = true;
                    resultStr = objectStr;
                }
            }
            if(!isError){
                // 遍历系统
                String systemId, buildId, buildName, domain, domainName, systemClazz, systemClazzName;
                JSONObject system, systemItem, parent;
                JSONArray systems, parents, parentIds, parentNames;
                JSONObject systemJson = JSONObject.parseObject(resultStr);
                JSONArray systemArray = systemJson.getJSONArray("Content");
                systems = new JSONArray();
                for(int i=0; i<systemArray.size(); i++){
                    systemItem = systemArray.getJSONObject(i);
                    system = new JSONObject();
                    //获取参数值
                    systemId = systemItem.getString("id");
                    buildId = StringUtil.transferId(systemId, CommonConst.tag_build);
                    buildName = idNameMap.get(buildId);
                    domain =StringUtil.getEquipOrSystemCodeFromId(systemId, CommonConst.tag_dict_class);
                    domainName = DictionaryCache.getNameByTypeCode(CommonConst.dict_type_object_domain, domain, projectId);
                    systemClazz = StringUtil.getEquipOrSystemCodeFromId(systemId, CommonConst.tag_dict_sytstem);
                    systemClazzName = DictionaryCache.getNameByTypeCode(CommonConst.dict_type_object_domain, systemClazz, projectId);
                    //拼装parents、parent_ids、parent_names
                    parents = new JSONArray();
                    if(buildName != null){
                        parent = new JSONObject();
                        parentIds = new JSONArray();
                        parentIds.add(buildId);
                        parentNames = new JSONArray();
                        parentNames.add(buildName);
                        parent.put("parent_ids", parentIds);
                        parent.put("parent_names", parentNames);
                        parents.add(parent);
                    }
                    if(domainName != null && systemClazzName != null) {
                        parent = new JSONObject();
                        parentIds = new JSONArray();
                        parentNames = new JSONArray();
                        parentIds.add(domain);
                        parentNames.add(domainName);
                        parentIds.add(systemClazz);
                        parentNames.add(systemClazzName);
                        parent.put("parent_ids", parentIds);
                        parent.put("parent_names", parentNames);
                        parents.add(parent);
                    }
                    //设置system值
                    system.put("obj_id", systemId);
                    system.put("obj_name", systemItem.getJSONObject(CommonConst.info_name_datas).getString(CommonConst.info_name_local_name_system));
                    system.put("obj_type", "system");
                    system.put("parents", parents);
                    systems.add(system);
                }
                resultStr = ToolsUtil.successJsonMsg(systems);
            }
        }
        if("equip_class".equals(jsonObject.getString("obj_type"))){
            Map<String, String> idNameMap = new HashMap<String, String>(), relationEqSpMap = new HashMap<String, String>(), relationEqSyMap = new HashMap<>();
            //获取所有实例数据
            if(!isError) {
                String objectStr = httpPostRequest(objectUrl, "{\"criteria\":{\"type\":[\"Bd\",\"Fl\",\"Sp\",\"Sy\"]}}");
                if (objectStr.contains("success")) {
                    idNameMap = getObjectIdNameMap(objectStr);
                } else {
                    isError = true;
                    resultStr = objectStr;
                }
            }
            //获取所有设备所属空间关系数据
            if(!isError) {
            	String graphId = graphCache.getGraphIdByProjectIdAndGraph(projectId, CommonConst.graph_type_equip_in_space);
            	if(!StringUtil.isNull(graphId)){
            		JSONObject param = new JSONObject();
	                param.put("graph_id", graphId);
	                param.put("rel_type", CommonConst.relation_type_equip_in_space);
	                String paramStr = JSONUtil.getDataPlatCriteriaWithMajors(null, param, "graph_id", "rel_type").toJSONString();
	                String relationStr = httpPostRequest(relationUrl, paramStr);
	                if(relationStr.contains("success")){
	                    relationEqSpMap = getRelationMap(relationStr, CommonConst.relation_from_id, CommonConst.relation_to_id);
	                }else{
	                    isError = true;
	                    resultStr = relationStr;
	                }
            	}
            }
            if(!isError){
                String graphId = graphCache.getGraphIdByProjectIdAndGraph(projectId, CommonConst.graph_type_system_contain_equip);
                if(!StringUtil.isNull(graphId)){
                	JSONObject param = new JSONObject();
	                param.put("graph_id", graphId);
	                param.put("rel_type", CommonConst.relation_type_system_contain_equip);
	                String paramStr = JSONUtil.getDataPlatCriteriaWithMajors(null, param, "graph_id", "rel_type").toJSONString();
	                String relationStr = httpPostRequest(relationUrl, paramStr);
	                if(relationStr.contains("success")){
	                    relationEqSyMap = getRelationMap(relationStr, CommonConst.relation_to_id, CommonConst.relation_from_id);
	                }else{
	                    isError = true;
	                    resultStr = relationStr;
	                }
                }
            }
            if(!isError){
                // 遍历设备
                String equipId, buildId, floorId = null, spaceId, systemId, buildName, floorName = null, spaceName, systemName, domain, domainName;
                JSONObject equip, equipItem, parent;
                JSONArray equips, parents, parentIds, parentNames;
                JSONObject equipJson = JSONObject.parseObject(resultStr);
                JSONArray equipArray = equipJson.getJSONArray("Content");
                equips = new JSONArray();
                for(int i=0; i<equipArray.size(); i++){
                    equipItem = equipArray.getJSONObject(i);
                    equip = new JSONObject();
                    //获取参数
                    equipId = equipItem.getString("id");
                    buildId = StringUtil.transferId(equipId, CommonConst.tag_build);
                    buildName = idNameMap.get(buildId);
                    spaceId = relationEqSpMap.get(equipId);
                    spaceName = idNameMap.get(spaceId);
                    if(!StringUtil.isNull(spaceId)){
                    	floorId = StringUtil.transferId(spaceId, CommonConst.tag_floor);
                    	floorName = idNameMap.get(floorId);
                    }
                    domain = StringUtil.getEquipOrSystemCodeFromId(equipId, CommonConst.tag_dict_class);
                    domainName = DictionaryCache.getNameByTypeCode(CommonConst.dict_type_object_domain, domain, projectId);
//                    equipClazz = StringUtil.getEquipOrSystemCodeFromId(equipId, CommonConst.tag_dict_equip);
//                    equipClazzName = DictionaryCache.getNameByTypeCode(CommonConst.dict_type_object_domain, equipClazz, projectId);
                    //拼装parents、parent_ids、parent_names
                    parents = new JSONArray();
                    if(buildName != null || floorName != null || spaceName != null){
                        parent = new JSONObject();
                        parentIds = new JSONArray();
                        parentNames = new JSONArray();
                        if(buildName != null){
                            parentIds.add(buildId);
                            parentNames.add(buildName);
                        }
                        if(floorName != null){
                            parentIds.add(floorId);
                            parentNames.add(floorName);
                        }
                        if(spaceName != null){
                            parentIds.add(spaceId);
                            parentNames.add(spaceName);
                        }
                        parent.put("parent_ids", parentIds);
                        parent.put("parent_names", parentNames);
                        parents.add(parent);
                    }
                    if(domainName != null){
                        parent = new JSONObject();
                        parentIds = new JSONArray();
                        parentNames = new JSONArray();
                        parentIds.add(domain);
                        parentNames.add(domainName);
                        systemId = relationEqSyMap.get(equipId);
                        if(systemId != null){
                            systemName = idNameMap.get(systemId);
                            parentIds.add(systemId);
                            parentNames.add(systemName);
                        }
//                        parentIds.add(equipClazz);
//                        parentNames.add(equipClazzName);
                        parent.put("parent_ids", parentIds);
                        parent.put("parent_names", parentNames);
                        parents.add(parent);
                    }
                    //设置equip参数
                    equip.put("obj_id", equipId);
                    equip.put("obj_name", equipItem.getJSONObject(CommonConst.info_name_datas).getString(CommonConst.info_name_local_name_equip));
                    equip.put("obj_type", "equip");
                    equip.put("parents", parents);
                    equips.add(equip);
                }
                resultStr = ToolsUtil.successJsonMsg(equips);
            }
        }
        return resultStr;
    }

    /**
     * 处理实例实体查询结果中id与localname的对应关系
     * @param queryResult
     * @return
     */
    public Map<String, String> getObjectIdNameMap(String queryResult){
        Map<String, String> idNameMap = new HashMap<String, String>();
        String localName = null;
        JSONObject result, infoDatas;
        JSONArray results;
        JSONObject resultJson = JSONObject.parseObject(queryResult);
        results = resultJson.getJSONArray("Content");
        for(int i=0; i<results.size(); i++){
            result = results.getJSONObject(i);
            infoDatas = result.getJSONObject(CommonConst.info_name_datas);
            if(infoDatas.containsKey(CommonConst.info_name_local_name_project)){
                localName = infoDatas.getString(CommonConst.info_name_local_name_project);
            }else if(infoDatas.containsKey(CommonConst.info_name_local_name_build)){
                localName = infoDatas.getString(CommonConst.info_name_local_name_build);
            }else if(infoDatas.containsKey(CommonConst.info_name_local_name_floor)){
                localName = infoDatas.getString(CommonConst.info_name_local_name_floor);
            }else if(infoDatas.containsKey(CommonConst.info_name_local_name_space)){
                localName = infoDatas.getString(CommonConst.info_name_local_name_space);
            }else if(infoDatas.containsKey(CommonConst.info_name_local_name_equip)){
                localName = infoDatas.getString(CommonConst.info_name_local_name_equip);
            }else if(infoDatas.containsKey(CommonConst.info_name_local_name_system)){
                localName = infoDatas.getString(CommonConst.info_name_local_name_system);
            }
            idNameMap.put(result.getString("id"), localName);
        }
        return idNameMap;
    }

    public Map<String, String> getRelationMap(String queryResult, String keyName, String valueName){
        Map<String, String> relationMap = new HashMap<String, String>();
        if(queryResult.contains("success")){
            JSONObject result;
            JSONObject resultJson = JSONObject.parseObject(queryResult);
            JSONArray results = resultJson.getJSONArray("Content");
            for(int i=0; i<results.size(); i++){
                result = results.getJSONObject(i);
                relationMap.put(result.getString(keyName), result.getString(valueName));
            }
        }
        return relationMap;
    }

	@Override
	public String querySystemForBuild(JSONObject jsonObject) throws Exception {
		String project_id = jsonObject.getString("project_id");
		String build_id = jsonObject.getString("build_id");
		String secret = projectCache.getProjectSecretById(project_id);
		jsonObject.clear();
		JSONObject criteria = new JSONObject();
		criteria.put("id", build_id);
		JSONArray types = new JSONArray();
		types.add("Sy");
		criteria.put("type", types);
		jsonObject.put("criteria", criteria);
		String requestUrl = getDataPlatformPath(DataRequestPathUtil.dataPlat_object_subset_query, project_id, secret);
		String queryResult = httpPostRequest(requestUrl, jsonObject.toJSONString());
		JSONObject queryJson = JSONObject.parseObject(queryResult);
		if(Result.FAILURE.equals(queryJson.getString(Result.RESULT))) {
			return queryResult;
		}
			
		JSONArray queryContents = queryJson.getJSONArray(Result.CONTENT);
		JSONArray contents = new JSONArray();
		if(queryContents != null && queryContents.size() > 0) {
			for (int i = 0; i < queryContents.size(); i++) {
				JSONObject queryContent = queryContents.getJSONObject(i);
				String system_id = queryContent.getString("id");
				String domain = StringUtil.getEquipOrSystemCodeFromId(system_id, CommonConst.tag_dict_class);
				String system_category = StringUtil.getEquipOrSystemCodeFromId(system_id, CommonConst.tag_dict_sytstem);
				JSONObject infos = queryContent.getJSONObject("infos");
				String system_name = "";
				if(infos != null) {
					system_name = infos.getString("SysName");
				}
				JSONObject system = new JSONObject();
				system.put("system_id", system_id);
				system.put("system_name", system_name);
				system.put("domain", domain);
				system.put("system_category", system_category);
				contents.add(system);
			}
		}
		queryJson.put(Result.CONTENT, contents);
		queryJson.put(Result.COUNT, contents.size());
		queryResult = queryJson.toJSONString();
		return queryResult;
	}
	
	@Override
	public Map<String, String> queryEquipSpaceSystemMap(JSONObject jsonObject, String project_id, String secret) throws Exception {
		
		String requestUrl = getDataPlatformPath(DataRequestPathUtil.dataPlat_relation_relation_instance_query, project_id, secret);
		String queryResult = httpPostRequest(requestUrl, jsonObject.toJSONString());
		JSONObject queryJson = JSONObject.parseObject(queryResult);
		Map<String, String> equipSpaceSystemMap = new HashMap<>();
		if(Result.SUCCESS.equals(queryJson.getString(Result.RESULT))) {
			JSONArray queryContents = queryJson.getJSONArray(Result.CONTENT);
			if(queryContents != null && queryContents.size() > 0) {
				for (int i = 0; i < queryContents.size(); i++) {
					JSONObject queryContent = queryContents.getJSONObject(i);
					String from_id = queryContent.getString("from_id");
					String to_id = queryContent.getString("to_id");
					String key = "";
					String value = "";
					if(from_id.startsWith("Eq")) {
						key = from_id;
						value = to_id;
					} else {
						key = to_id;
						value = from_id;
					}
					equipSpaceSystemMap.put(key, value);
				}
			}
		}
		
		return equipSpaceSystemMap;
	}
	
	public JSONArray queryObjCardStyle(String obj_type) {
		JSONObject jsonObject = new JSONObject();
		jsonObject.put("obj_type", obj_type);
		jsonObject.put(DBConst.TABLE_FIELD_VALID, true);
		JSONObject criteria = JSONUtil.getKeyWithMajors(jsonObject, DBConst.TABLE_FIELD_VALID, "obj_type");
		String queryResult = DBCommonMethods.getRecordBykey(DBConst.TABLE_OBJ_CARD_STYLE, criteria.toJSONString());
		JSONObject queryJson = JSONObject.parseObject(queryResult);
		JSONArray queryContents = queryJson.getJSONArray(Result.CONTENT);
		JSONArray card_info = null;
		if(queryContents != null && queryContents.size() > 0) {
			queryJson = queryContents.getJSONObject(0);
			String card_info_str = queryJson.getString("card_info");
			if(!StringUtil.isNull(card_info_str)) {
				card_info = JSONArray.parseArray(card_info_str);
			}
		}
		if(card_info == null) {
			card_info = new JSONArray();
			if("equip".equals(obj_type)) {
				JSONObject content = new JSONObject();
				content.put("info_point_code", "equip_local_name");
				content.put("info_point_name", "设备名称");
				card_info.add(content);
				content = new JSONObject();
				content.put("info_point_code", "equip_local_id");
				content.put("info_point_name", "设备编码");
				card_info.add(content);
			} else {
				JSONObject content = new JSONObject();
				content.put("info_point_code", "room_local_name");
				content.put("info_point_name", "空间名称");
				card_info.add(content);
				content = new JSONObject();
				content.put("info_point_code", "room_local_id");
				content.put("info_point_name", "空间编码");
				card_info.add(content);
			}
		}
		return card_info;
	}
}
