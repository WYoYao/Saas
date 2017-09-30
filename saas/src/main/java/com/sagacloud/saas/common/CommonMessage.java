package com.sagacloud.saas.common;

import com.alibaba.fastjson.JSONArray;

/**
 * Created by guosongchao on 2017/8/9.
 */
public class CommonMessage {

  //对象分类-对象
  public final static JSONArray object_class_object = JSONArray.parseArray("[{\"obj_type\":\"system_class\", \"obj_type_name\":\"通用系统类\"},{\"obj_type\":\"equip_class\", \"obj_type_name\":\"通用设备类\"},{\"obj_type\":\"build\", \"obj_type_name\":\"建筑体\"},{\"obj_type\":\"floor\", \"obj_type_name\":\"楼层\"},{\"obj_type\":\"space\", \"obj_type_name\":\"空间\"},{\"obj_type\":\"system\", \"obj_type_name\":\"系统\"},{\"obj_type\":\"equip\", \"obj_type_name\":\"设备\"},{\"obj_type\":\"component\", \"obj_type_name\":\"部件\"},{\"obj_type\":\"tool\", \"obj_type_name\":\"工具\"}]");
  //对象分类-信息点
  public final static JSONArray object_class_infoPoint = JSONArray.parseArray("[{\"obj_type\":\"system_class\",\"obj_type_name\":\"通用系统类\"},{\"obj_type\":\"equip_class\",\"obj_type_name\":\"通用设备类\"},{\"obj_type\":\"system\",\"obj_type_name\":\"系统\"},{\"obj_type\":\"equip\",\"obj_type_name\":\"设备\"}]");

  //过滤-客户信息-列表
    public static JSONArray filter_customer_list = JSONArray.parseArray("[\"customer_id\",\"project_name\",\"project_local_name\",\"company_name\",\"contact_person\",\"contact_phone\",\"customer_status\"]");
  //过滤-客户信息-实体
    public static JSONArray filter_customer_Object = JSONArray.parseArray("[\"customer_id\",\"company_name\",\"legal_person\",\"account\",\"mail\",\"contact_person\",\"contact_phone\",\"operation_valid_term_start\",\"operation_valid_term_end\",\"contract_valid_term_start\",\"contract_valid_term_end\",\"business_license\",\"pictures\",\"tool_type\",\"project_id\",\"project_name\",\"project_local_name\"]");
    //过滤-建筑信息-列表
    public static JSONArray filter_building_list = JSONArray.parseArray("[\"build_id\",\"build_code\",\"build_name\",\"build_local_name\",\"build_age\",\"build_func_type\",\"build_func_type_name\",\"create_time\"]");
    //过滤-人员缩略图信息-列表
    public static JSONArray filter_person_group_list = JSONArray.parseArray("[\"person_id\",\"project_id\",\"person_num\",\"name\",\"head_portrait\",\"id_photo\", \"update_time\"]");

    //过滤-功能包(权限项)信息-列表
    public static JSONArray filter_function_pack_list = JSONArray.parseArray("[\"func_pack_id\",\"func_pack_name\",\"description\"]");

    //数据平台-信息点集合名称
    public final static String dataPlat_infos_dataName = "infos";

    //时间格式-显示
    public static String dataFormat_show = "yyyy-MM-dd HH:mm:ss";
    //时间格式-存储
    public static String dataFormat_save = "yyyyMMddHHmmss";
}
