package com.sagacloud.saasmanage.cache;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.sagacloud.saasmanage.common.CommonMessage;
import com.sagacloud.saasmanage.common.JSONUtil;
import com.sagacloud.saasmanage.dao.DBCommonMethods;
import com.sagacloud.saasmanage.dao.DBConst;

import org.apache.log4j.Logger;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

/**
 * Created by guosongchao on 2017/8/9.
 */
public class CustomerCache {
    private static final Logger log = Logger.getLogger(CustomerCache.class);
    //客户缓存 key:constomer_id value:Customer
    private static ConcurrentHashMap<String, JSONObject> customerCache = new ConcurrentHashMap<String, JSONObject>();
    //客户缓存 key:project_id value:Customer
    private static ConcurrentHashMap<String, JSONObject> projectCustomerCahce = new ConcurrentHashMap<String, JSONObject>();

    /**
     * 根据客户ID查询客户管理的项目ID
     * @param customerId
     * @return
     */
    public static String getProjectIdByCustomerId(String customerId){
        if(!customerCache.containsKey(customerId)){
            synCache();
        }
        if(!customerCache.containsKey(customerId)){
            return null;
        }
        return customerCache.get(customerId).getString("project_id");
    }

    /**
     * 根据项目ID查询客户信息
     * @param projectId
     * @return
     */
    public static JSONObject getCustomerByProjectId(String projectId){
        if(!projectCustomerCahce.containsKey(projectId)){
            synCache();
        }
        return projectCustomerCahce.get(projectId);
    }

    /**
     * 根据客户ID查询客户账户
     * @param customerId
     * @return
     */
    public static String getCustomerAccountByCustomerId(String customerId){
        if(!customerCache.containsKey(customerId)){
            synCache();
        }
        if(!customerCache.containsKey(customerId)){
            return null;
        }
        return customerCache.get(customerId).getString("account");
    }

    /**
     * 根据客户ID查询客户联系电话
     * @param customerId
     * @return
     */
    public static String getCustomerPhoneByCustomerId(String customerId){
        if(!customerCache.containsKey(customerId)){
            synCache();
        }
        if(!customerCache.containsKey(customerId)){
            return null;
        }
        return customerCache.get(customerId).getString("contact_phone");
    }

    /**
     * 根据客户ID查询客户邮箱
     * @param customerId
     * @return
     */
    public static String getCustomerMailByCustomerId(String customerId){
        if(!customerCache.containsKey(customerId)){
            synCache();
        }
        if(!customerCache.containsKey(customerId)){
            return null;
        }
        return customerCache.get(customerId).getString("mail");
    }

    public static void synCache(){
        log.info("start to syn customerCache.");
        try {
            String customerStr = DBCommonMethods.queryRecordByCriteria(DBConst.TABLE_CUSTOMER, "{\"criteria\":{\"valid\":true}}");
            if(customerStr.contains("success")){
                customerStr = JSONUtil.prossesResultToDateString(customerStr, CommonMessage.dataFormat_save, CommonMessage.dataFormat_show, "create_time");
                JSONObject customerJson = JSONObject.parseObject(customerStr);
                JSONArray customers = customerJson.getJSONArray("Content");
                if(customers != null){
                    JSONArray nameCustomers;
                    JSONObject customer;
                    for(int i=0; i<customers.size(); i++){
                        customer = customers.getJSONObject(i);
                        //更新客户缓存
                        customerCache.put(customer.getString("customer_id"), customer);
                        //更新项目客户缓存
                        if(customer.getString("project_id") != null){
                            projectCustomerCahce.put(customer.getString("project_id"), customer);
                        }
                    }
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        log.info("Succeeded to syn customerCache.");
    }
}
