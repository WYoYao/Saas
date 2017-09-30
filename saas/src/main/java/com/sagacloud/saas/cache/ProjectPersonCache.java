package com.sagacloud.saas.cache;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.sagacloud.saas.common.JSONUtil;
import com.sagacloud.saas.dao.DBCommonMethods;
import com.sagacloud.saas.dao.DBConst;

import org.apache.log4j.Logger;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

/**
 * 功能描述：项目员工信息缓存
 * @类型名称 PersonCache
 * @创建者 wanghailong
 * @邮箱 wanghailong@persagy.com
 * @修改描述
 */
public class ProjectPersonCache {
    private static final Logger log = Logger.getLogger(ProjectPersonCache.class);
    //人员信息key：project+"-"+person_id,value:人员Json
    public static ConcurrentHashMap<String, JSONObject> personsCache = new ConcurrentHashMap<String, JSONObject>();

    /**
     * 获取项目下人员岗位
     * @param projectId
     * @param personId
     * @return
     */
    public static String getPosition(String projectId, String personId){
        String key = projectId + "-" + personId;
        if(personsCache.get(key) == null){
            synCache();
        }
        if(personsCache.get(key) == null){
            return null;
        }
        return personsCache.get(key).getString("position");
    }

    //同步缓存
    public static void synCache(){
        log.info("start to syn PersonCache.");
        try {
            String projectPersonStr = DBCommonMethods.queryRecordByCriteria(DBConst.DATABASE_PERSON_SERVICE, DBConst.TABLE_PROJECT_PERSON, "{\"criteria\":{\"valid\":true}}");
            projectPersonStr = JSONUtil.prossesResultToJsonString(projectPersonStr, "custom_tag", "roles");
            JSONObject projectPersonJson = JSONObject.parseObject(projectPersonStr);
            if("success".equals(projectPersonJson.getString("Result"))){
                Map<String, JSONObject> personMap = new HashMap<String, JSONObject>();
                JSONArray projectPersonArray = projectPersonJson.getJSONArray("Content");
                JSONObject projectPerson;
                String projectId;
                for(int i=0; i<projectPersonArray.size(); i++){
                    projectPerson = projectPersonArray.getJSONObject(i);
                    projectPerson.put("specialty", JSONArray.parseArray(projectPerson.getString("specialty")));
                    projectId = projectPerson.getString("project_id");
                    //人员缓存
                    if(projectPerson.getBooleanValue("valid") && "1".equals(projectPerson.getString("person_status"))){
                    	personMap.put(projectId + "-" + projectPerson.getString("person_id"), projectPerson);
                    }
                }
                personsCache.putAll(personMap);
            }
        } catch (Exception e) {
            log.error("syn PersonCache error.", e);
        }finally {
            log.info("end to syn proPasCache.");
        }
    }

}