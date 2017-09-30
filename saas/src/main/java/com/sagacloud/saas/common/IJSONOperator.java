package com.sagacloud.saas.common;

import com.alibaba.fastjson.JSONObject;

/**
 * Created by guosongchao on 2017/8/16.
 */
public interface IJSONOperator {
    public JSONObject operation(JSONObject jsonObject, String... str) throws Exception;
}