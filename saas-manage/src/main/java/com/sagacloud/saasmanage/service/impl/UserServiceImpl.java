package com.sagacloud.saasmanage.service.impl;

import com.alibaba.fastjson.JSONObject;
import com.sagacloud.saasmanage.common.ToolsUtil;
import com.sagacloud.saasmanage.service.UserServiceI;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

/**
 * Created by guosongchao on 2017/8/9.
 */
@Service("userService")
public class UserServiceImpl implements UserServiceI {

    @Value("${admin-users-json}")
    public String adminUsers;
    @Value("${system-code}")
    public String systemCode;
    @Value("${image-secret}")
    public String systemSecret;

    public String login(String jsonStr) throws Exception {
        JSONObject jsonObject = JSONObject.parseObject(jsonStr);
        String resultStr;
        JSONObject admins = JSONObject.parseObject(adminUsers);
        String userName = jsonObject.getString("user_name");
        if(jsonObject.getString("user_psw").equals(admins.getString(userName))){
            JSONObject resultJson = new JSONObject();
            JSONObject itemJson = new JSONObject();
            itemJson.put("user_id", userName);
            itemJson.put("user_name", userName);
            itemJson.put("system_code", systemCode);
            itemJson.put("image_secret", systemSecret);
            resultJson.put("Result", "success");
            resultJson.put("Item", itemJson);
            resultStr = resultJson.toJSONString();
        }else{
            resultStr = ToolsUtil.errorJsonMsg("用户名或密码错误");
        }
        return resultStr;
    }
}
