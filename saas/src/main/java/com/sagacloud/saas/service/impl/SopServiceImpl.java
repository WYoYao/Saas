package com.sagacloud.saas.service.impl;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.sagacloud.saas.common.DataRequestPathUtil;
import com.sagacloud.saas.service.BaseService;
import com.sagacloud.saas.service.SopServiceI;

import org.springframework.stereotype.Service;

/**
 * Created by DOOM on 2017/9/6.
 */
@Service("sopService")
public class SopServiceImpl extends BaseService implements SopServiceI {
    @Override
    public String querySopListForSel(String jsonStr) throws Exception {
        String requestUrl = getSopServicePath(DataRequestPathUtil.sop_service_query_sops_for_sel);
        return httpPostRequest(requestUrl, jsonStr);
    }

    @Override
    public String querySopDetailById(String jsonStr) throws Exception {
        String requestUrl = getSopServicePath(DataRequestPathUtil.sop_service_query_sop_detail_by_id);
        return httpPostRequest(requestUrl, jsonStr);
    }

    @Override
    public String verifyObjectAndSop(String jsonStr) throws Exception {
        //TODO
        JSONObject jsonObject = JSONObject.parseObject(jsonStr);
        JSONArray objs = jsonObject.getJSONArray("objs");
        JSONArray sopIds = jsonObject.getJSONArray("sop_ids");
        return null;
    }
}
