package com.sagacloud.saas.common;

/**
 * Created by DOOM on 2017/9/7.
 */
public class CommonConst {
    //时间格式-显示
    public static String data_format_show = "yyyy-MM-dd HH:mm:ss";
    //时间格式-存储
    public static String data_format_save = "yyyyMMddHHmmss";

    //字段名称-数据平台
    public static String info_name_datas = "infos";
    //字段名称-本地名称-项目
    public static String info_name_local_name_project = "ProjLocalName";
    //字段名称-本地名称-建筑
    public static String info_name_local_name_build = "BuildLocalName";
    //字段名称-本地名称-楼层
    public static String info_name_local_name_floor = "FloorLocalName";
    //字段名称-本地名称-空间
    public static String info_name_local_name_space = "RoomLocalName";
    //字段名称-本地名称-系统
    public static String info_name_local_name_system = "SysLocalName";
    //字段名称-本地名称-设备
    public static String info_name_local_name_equip = "EquipLocalName";
    //字段名称-信息点-code
    public static String info_name_info_point_code = "infoPointCode";
    //字段名称-信息点-name
    public static String info_name_info_point_name = "infoPointName";

    //数据字典类型-专业、系统大类、设备大类
    public static String dict_type_object_domain = "domain_require";
    //数据字典类型-信息点
    public static String dict_type_info_point = "info_point";
    //数据字典类型-专业要求
    public static String dict_type_domain_require = "domain_require";
    //数据字典类型-工单类型
    public static String dict_type_work_order_type = "work_order_type";
    //数据字典类型-工单执行类型
    public static String dict_type_work_order_execute_type = "wo_execute_type";

    //数据字典-工单执行-执行code
    public static String dict_wo_order_control_create = "create";
    //数据字典-工单执行-执行code
    public static String dict_wo_order_control_execute = "execute";
    //数据字典-工单执行-申请code
    public static String dict_wo_order_control_apply = "apply";
    //数据字典-工单执行-结束code
    public static String dict_wo_order_control_close = "close";
    //数据字典-工单执行-终止code
    public static String dict_wo_order_control_stop = "stop";

    //关联关系-关系对象
    public static String relation_from_id = "from_id";
    //关联关系-被关联对象
    public static String relation_to_id = "to_id";

    //图类型-设备所在空间
    public final static String graph_type_equip_in_space = "EquipinSpace";
    //图类型-设备服务空间
    public final static String graph_type_equip_service_space = "EquipforSpace";
    //图类型-系统包含设备
    public final static String graph_type_system_contain_equip = "SystemEquip";

    //关系类型-设备所在空间
    public final static String relation_type_equip_in_space = "1";
    //关系类型-设备服务空间
    public final static String relation_type_equip_service_space = "1";
    //关系类型-系统包含设备
    public final static String relation_type_system_contain_equip = "1";


    //数据类型-建筑
    public static String data_type_build = "build";
    //数据类型-楼层
    public static String data_type_floor = "floor";

    //标识-项目
    public static String tag_project = "Pj";
    //标识-建筑
    public static String tag_build = "Bd";
    //标识-楼层
    public static String tag_floor = "Fl";
    //标识-空间
    public static String tag_space = "Sp";
    //标识-设备
    public static String tag_equip = "Eq";
    //标识-系统
    public static String tag_system = "Sy";
    //标识-设备对象
    public final static String tag_equip_object = "EqObj";
    //标识-系统对象
    public final static String tag_system_object = "SyObj";
    //标识-设备字典-专业
    public static String tag_dict_class = "Clazz";
    //标识-设备字典-系统
    public static String tag_dict_sytstem = "System";
    //标识-设备字典-设备
    public static String tag_dict_equip = "Equip";
}
