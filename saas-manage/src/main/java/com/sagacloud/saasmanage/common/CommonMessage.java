package com.sagacloud.saasmanage.common;

import com.alibaba.fastjson.JSONArray;

/**
 * Created by guosongchao on 2017/8/9.
 */
public class CommonMessage {
    //过滤-客户信息-列表
    public static JSONArray filter_customer_list = JSONArray.parseArray("[\"customer_id\",\"project_name\",\"project_local_name\",\"company_name\",\"contact_person\",\"contact_phone\",\"customer_status\"]");
    //过滤-建筑信息-列表
    public static JSONArray filter_building_list = JSONArray.parseArray("[\"build_id\",\"build_code\",\"build_name\",\"build_local_name\",\"build_age\",\"build_func_type\",\"build_func_type_name\",\"create_time\"]");

    //过滤-功能包(权限项)信息-列表
    public static JSONArray filter_function_pack_list = JSONArray.parseArray("[\"func_pack_id\",\"func_pack_name\",\"description\"]");
    
    //过滤-组件关系信息-列表
    public static JSONArray filter_component_relation_list = JSONArray.parseArray("[\"cmpt_relation_id\",\"base_cmpt_code\",\"god_hand_cmpt_code\",\"saas_cmpt_code\",\"app_cmpt_code\"]");

    //时间格式-显示
    public static String dataFormat_show = "yyyy-MM-dd HH:mm:ss";
    //时间格式-存储
    public static String dataFormat_save = "yyyyMMddHHmmss";
}
