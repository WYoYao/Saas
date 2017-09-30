package com.sagacloud.saasmanage.service;

/**
 * Created by guosongchao on 2017/8/9.
 */
public interface UserServiceI {
    /**
     * 用户登录
     * @param jsonStr
     * @return
     * @throws Exception
     */
    public String login(String jsonStr) throws Exception;
}
