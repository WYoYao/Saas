package com.sagacloud.saasmanage.resource;


import com.alibaba.fastjson.JSONObject;
import com.sagacloud.saasmanage.common.StringUtil;
import com.sagacloud.saasmanage.common.ToolsUtil;
import com.sagacloud.saasmanage.service.UserServiceI;

import org.springframework.beans.factory.annotation.Autowired;

import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

/**
 * Created by guosongchao on 2017/8/9.
 */
@Path("restUserService")
public class RestUserService {

    @Autowired
    public UserServiceI userService;

    /**
     * 用户登录
     * @param jsonStr
     * @return
     */
    @Path("login")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public String login(String jsonStr) throws Exception{
        if(!StringUtil.isNull(JSONObject.parseObject(jsonStr), "user_name", "user_psw")){
            return userService.login(jsonStr);
        }
        return ToolsUtil.return_error_json;
    }
}
