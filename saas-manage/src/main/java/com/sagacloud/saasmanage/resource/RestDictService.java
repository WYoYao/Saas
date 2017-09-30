package com.sagacloud.saasmanage.resource;

import com.alibaba.fastjson.JSONObject;
import com.sagacloud.saasmanage.common.StringUtil;
import com.sagacloud.saasmanage.common.ToolsUtil;
import com.sagacloud.saasmanage.service.DictionaryServiceI;

import org.springframework.beans.factory.annotation.Autowired;

import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

/**
 * Created by guosongchao on 2017/8/9.
 */
@Path("restDictService")
public class RestDictService {

    @Autowired
    public DictionaryServiceI dictionaryService;

    /**
     * 数据字典：查询所有行政区编码
     * @param jsonStr
     * @return
     * @throws Exception
     */
    @Path("queryAllRegionCode")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public String queryAllRegionCode(String jsonStr) throws Exception{
        if(!StringUtil.isNull(JSONObject.parseObject(jsonStr), "user_id")) {
            return dictionaryService.queryAllRegionCode();
        }
        return ToolsUtil.return_error_json;
    }

    /**
     * 数据字典：查询所有气候区代码
     * @param jsonStr
     * @return
     * @throws Exception
     */
    @Path("queryAllClimateAreaCode")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public String queryAllClimateAreaCode(String jsonStr) throws Exception{
        if(!StringUtil.isNull(JSONObject.parseObject(jsonStr), "user_id")) {
            return dictionaryService.queryAllClimateAreaCode();
        }
        return ToolsUtil.return_error_json;
    }

    /**
     * 数据字典：查询所有发展水平代码
     * @param jsonStr
     * @return
     * @throws Exception
     */
    @Path("queryAllDevelopLevelCode")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public String queryAllDevelopLevelCode(String jsonStr) throws Exception{
        if(!StringUtil.isNull(JSONObject.parseObject(jsonStr), "user_id")) {
            return dictionaryService.queryAllDevelopmentLevelCode();
        }
        return ToolsUtil.return_error_json;
    }

    /**
     * 数据字典：查询所有发展水平代码
     * @param jsonStr
     * @return
     * @throws Exception
     */
    @Path("queryAllBuildingType")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public String queryAllBuildingType(String jsonStr) throws Exception{
        if(!StringUtil.isNull(JSONObject.parseObject(jsonStr), "user_id")) {
            return dictionaryService.queryAllBuildingCode();
        }
        return ToolsUtil.return_error_json;
    }

}
