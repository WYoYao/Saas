package com.sagacloud.saasmanage.cache;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.sagacloud.saasmanage.common.DataRequestPathUtil;
import com.sagacloud.saasmanage.service.BaseService;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

/**
 * Created by guosongchao on 2017/8/9.
 */
@Service("projectCache")
public class ProjectCache extends BaseService {
    private static final Logger log = Logger.getLogger(ProjectCache.class);
    //项目缓存 key:project_id value:project
    private ConcurrentHashMap<String, JSONObject> projectCache = new ConcurrentHashMap<String, JSONObject>();

    public String getProjectSecretById(String projectId) throws Exception{
        if(projectCache.get(projectId) == null){
            synCache();
        }
        if(projectCache.get(projectId) == null){
            return null;
        }
        return projectCache.get(projectId).getString("password");
    }

    public void synCache() throws Exception{
        log.info("start to syn projectCache.");
        String requestUrl = getDataPlatformPath(DataRequestPathUtil.dataPlat_project_query);
        String result = httpGetRequest(requestUrl);
        if(result.contains("success")){
            JSONObject projectJson = JSONObject.parseObject(result);
            JSONObject project;
            Map<String, JSONObject> projectMap = new HashMap<String, JSONObject>();
            JSONArray projects = projectJson.getJSONArray("Content");
            projects = projects == null ? new JSONArray() : projects;
            for(int i=0; i<projects.size(); i++){
                project = projects.getJSONObject(i);
                projectMap.put(project.getString("id"), project);
            }
            projectCache.putAll(projectMap);
            log.info("Succeeded to syn projectCache.");
        }else{
            log.info("Failure to syn projectCache.");
        }
    }
}
