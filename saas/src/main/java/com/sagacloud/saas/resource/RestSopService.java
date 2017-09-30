package com.sagacloud.saas.resource;

import com.alibaba.fastjson.JSONObject;
import com.sagacloud.saas.common.StringUtil;
import com.sagacloud.saas.common.ToolsUtil;
import com.sagacloud.saas.service.SopServiceI;

import org.springframework.beans.factory.annotation.Autowired;

import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

/**
 * Created by guosongchao on 2017/9/6.
 */
@Path("restSopService")
public class RestSopService {

    @Autowired
    private SopServiceI sopService;

    /**
     * 查询可供选择的sop
     * @param jsonStr
     * @return
     * @throws Exception
     */
    @Path("querySopListForSel")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public String querySopListForSel(String jsonStr) throws Exception{
        if(!StringUtil.isNull(JSONObject.parseObject(jsonStr), "user_id", "project_id")){
            return sopService.querySopListForSel(jsonStr);
        }
        return ToolsUtil.return_error_json;
    }

    /**
     * 查询sop的详细信息
     * @param jsonStr
     * @return
     * @throws Exception
     */
    @Path("querySopDetailById")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public String querySopDetailById(String jsonStr) throws Exception{
        if(!StringUtil.isNull(JSONObject.parseObject(jsonStr), "user_id", "sop_id", "version")){
            return sopService.querySopDetailById(jsonStr);
        }
        return ToolsUtil.return_error_json;
    }

    /**
     * 验证对象和sop是否匹配
     * @param jsonStr
     * @return
     * @throws Exception
     */
    @Path("verifyObjectAndSop")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public String verifyObjectAndSop(String jsonStr) throws Exception{
        JSONObject jsonObject = JSONObject.parseObject(jsonStr);
        if(!StringUtil.isNull(JSONObject.parseObject(jsonStr), "user_id") && !StringUtil.isEmptyList(jsonObject, "objs", "sop_ids")){
            return sopService.verifyObjectAndSop(jsonStr);
        }
        return ToolsUtil.return_error_json;
    }


}
