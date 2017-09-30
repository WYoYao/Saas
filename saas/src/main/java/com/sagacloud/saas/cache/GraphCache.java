package com.sagacloud.saas.cache;

import java.util.concurrent.ConcurrentHashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.sagacloud.saas.common.DataRequestPathUtil;
import com.sagacloud.saas.service.BaseService;

/**
 * Created by DOOM on 2017/9/6.
 */
@Service("graphCache")
public class GraphCache extends BaseService {
    @Autowired
    private ProjectCache projectCache;

    //key:project_id + "-" + graph value:graph_id
    public static ConcurrentHashMap<String, String> graphCache = new ConcurrentHashMap<String, String>();

    public String getGraphIdByProjectIdAndGraph(String projectId, String graph) throws Exception{
        String key = projectId + "-" + graph;
        if(graphCache.get(key) == null){
            synGraph(projectId, graph);
            if(graphCache.get(key) == null){
                return null;
            }
        }
        return graphCache.get(key);
    }

    public void synGraph(String projectId, String graphType) throws Exception{
        JSONObject params = new JSONObject();
        JSONObject criteria = new JSONObject();
        criteria.put("graph_type", graphType);
        params.put("criteria", criteria);
        String requestUrl = getDataPlatformPath(DataRequestPathUtil.dataPlat_relation_graph_instance_query, projectId, projectCache.getProjectSecretById(projectId));
        String resultStr = httpPostRequest(requestUrl, params.toJSONString());
        if(resultStr.contains("success")){
            JSONObject graphJson = JSONObject.parseObject(resultStr);
            JSONArray graphs = graphJson.getJSONArray("Content");
            if(graphs != null && graphs.size() > 0){
                JSONObject graph = graphs.getJSONObject(0);
                if(graph != null){
                    graphCache.put(projectId + "-" + graphType, graph.getString("graph_id"));
                }
            }
        }

    }
}
