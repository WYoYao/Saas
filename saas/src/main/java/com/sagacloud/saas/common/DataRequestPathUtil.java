/**
 * @包名称 com.sagacloud.common
 * @文件名 DataRequestPathUtil.java
 * @创建者 wanghailong
 * @邮箱 wanghailong@persagy.com  
 * @修改描述 
 */

package com.sagacloud.saas.common;

/** 
 * 功能描述： 数据请求路径工具类
 * @类型名称 DataRequestPathUtil
 * @创建者 wanghailong
 * @邮箱 wanghailong@persagy.com  
 * @修改描述 
 */
public class DataRequestPathUtil {
	/**** 短信平台请求路径 ***/
	//post：短信平台-发送验证码 
	public final static String smsPlat_send_code = "BASEPATH/restSmsService/sendCode?appCode=APPCODE";
	//post：短信平台-校验验证码 
	public final static String smsPlat_verify_code = "BASEPATH/restSmsService/verifyCode?appCode=APPCODE";
	//get：图文下载服务-下载文件
	public final static String image_service_file_get = "BASEPATH/common/file_get/KEY?systemId=SYSTEMID";
	//post：图文下载服务-上传图片
	public final static String image_service_image_upload = "BASEPATH/common/image_upload?systemId=SYSTEMID&secret=SECRET&key=KEY";
	//get：图文下载服务-下载图片
	public final static String image_service_image_get = "BASEPATH/image-service/common/image_get?systemId=SYSTEMID&key=KEY";
	
	/**** 数据平台请求路径 ***/
	//post:数据平台-关系-图实例-查询
	public final static String dataPlat_relation_graph_instance_query = "BASEPATH/relation/graph_instance/query?projectId=PROJECTID&secret=SECRET";
	//get：数据平台-数据字典查询
	public final static String dataPlat_dict_query = "BASEPATH/dict/query/PARAM";
	//post: 数据平台-对象模糊查询
	public final static String dataPlat_object_like_query = "BASEPATH/object/search?projectId=PROJECTID&secret=SECRET";
	//post:数据平台-对象-根据对象类型查询对象
	public final static String dataPlat_object_query_by_type = "BASEPATH/object/type_query?projectId=PROJECTID&secret=SECRET";
	//post:数据平台-系统-查询某个专业下的所有系统
	public final static String dataPlat_system_query_by_domain = "BASEPATH/equipment/system_query?projectId=PROJECTID&secret=SECRET";
	//get:数据平台-信息点-设备、系统独有信息点
	public final static String dataPlat_infoPoint_special = "BASEPATH/infocode/query?ID=PARAM";
	//post:数据平台-关系-关系实例-查询
	public final static String dataPlat_relation_relation_instance_query = "BASEPATH/relation/query?projectId=PROJECTID&secret=SECRET";
	//post:数据平台-图-图实例-添加
	public final static String dataPlat_relation_graph_instance_create = "BASEPATH/relation/graph_instance/create?projectId=PROJECTID&secret=SECRET";
	//post:数据平台-关系-关系实例-添加
	public final static String dataPlat_relation_create = "BASEPATH/relation/create?projectId=PROJECTID&secret=SECRET";
	//post:数据平台-关系-关系实例-删除
	public final static String dataPlat_relation_delete = "BASEPATH/relation/delete?projectId=PROJECTID&secret=SECRET";
	//post:数据平台-对象-查询某个对象下的指定类型的objects
	public final static String dataPlat_object_subset_query = "BASEPATH/object/subset_query?projectId=PROJECTID&secret=SECRET";
	//post:数据平台-对象-根据信息点来查询各物理实体
	public final static String dataPlat_object_query_by_info = "BASEPATH/object/query_by_info?projectId=PROJECTID&secret=SECRET";
	//post:数据平台-对象-设备综合查询
	public final static String dataPlat_equipment_complex_query = "BASEPATH/equipment/complex_query?projectId=PROJECTID&secret=SECRET";
	//post：数据平台-系统-查询
	public final static String dataPlat_system_all_query = "BASEPATH/equipment/query_sys?projectId=PROJECTID&secret=SECRET";
	//post：数据平台-设备和系统添加
	public final static String dataPlat_equipment_system_create = "BASEPATH/equipment/create?projectId=PROJECTID&secret=SECRET";
	//post:数据平台-信息点-模糊查询
	public final static String dataPlat_infoPoint_search = "BASEPATH/info_point/search?projectId=PROJECTID&secret=SECRET";
	//post：数据平台-空间-查询
	public final static String dataPlat_space_query = "BASEPATH/space/query?projectId=PROJECTID&secret=SECRET";
	//post：数据平台-楼层-查询
	public final static String dataPlat_floor_query = "BASEPATH/floor/query?projectId=PROJECTID&secret=SECRET";
	//post:数据平台-建筑-查询-ID
	public final static String datePlat_building_query_by_id = "BASEPATH/mng/building/query?projectId=PROJECTID&secret=SECRET";
	//post：数据平台-建筑-查询
	public final static String dataPlat_building_query = "BASEPATH/mng/building/query?secret=SECRET";
	//get:数据平台-项目-管理员查询
	public final static String dataPlat_project_query = "BASEPATH/mng/project/query?secret=SECRET";
	//post：数据平台-建筑-查询
	public final static String dataPlat_object_batch_query = "BASEPATH/object/batch_query?projectId=PROJECTID&secret=SECRET";
	//post：数据平台-批量更新项目, 建筑体, 设备, 系统, 楼层, 空间, 虚拟对象的infos信息
	public final static String dataPlat_object_batch_update = "BASEPATH/object/batch_update?projectId=PROJECTID&secret=SECRET";
	//post：数据平台-楼层操作-增加
	public final static String dataPlat_object_floor_create = "BASEPATH/floor/create?projectId=PROJECTID&secret=SECRET";
	//post：数据平台-空间操作-增加
	public final static String dataPlat_object_space_create = "BASEPATH/space/create?projectId=PROJECTID&secret=SECRET";
	//post：数据平台-空间操作-删除
	public final static String dataPlat_object_space_delete = "BASEPATH/space/delete?projectId=PROJECTID&secret=SECRET";
	//post：数据平台-设备系统操作-删除
	public final static String dataPlat_object_equipment_delete = "BASEPATH/equipment/delete?projectId=PROJECTID&secret=SECRET";



	/**    人员信息服务请求路径      ***/

	//post：Person_service	根据查询项目岗位下人员信息
	public final static String person_service_query_by_project_position = "BASEPATH/restPersonService/queryPersonByProjectPosition";
	//post：Person_service  人员管理:根据手机号查询人员详细信息
	public final static String person_service_query_person_by_phonenum = "BASEPATH/restPersonService/queryPersonByPhoneNum";
	//post：Person_service  人员管理:添加人员信息
	public final static String person_service_add_person = "BASEPATH/restPersonService/addPerson";
	//post：Person_service  人员管理:查询项目下岗位列表
	public final static String person_service_query_position_by_project = "BASEPATH/restPersonService/queryPositionsByProjectId";
	//post：Person_service  人员管理:查询项目下标签列表
	public final static String person_service_query_persontags_by_project = "BASEPATH/restPersonService/queryPersonTagsByProjectId";
	//post：Person_service  人员管理:查询项目下所有人员信息
	public final static String person_service_query_person_by_project = "BASEPATH/restPersonService/queryAllPersonByProjectId";
	//post：Person_service  人员管理:根据Id查询项目人员详细信息
	public final static String person_service_query_project_person_by_id = "BASEPATH/restPersonService/queryProjectPersonById";
	//post：Person_service  人员管理:删除项目人员信息
	public final static String person_service_delete_project_person_by_id = "BASEPATH/restPersonService/deleteProjectPersonById";
	//post：Person_service  人员管理-编辑页:根据Id编辑人员信息
	public final static String person_service_update_person_by_id = "BASEPATH/restPersonService/updatePersonById";

	/****  sop服务请求路径 *****/
	//post：Sop_service	查询可供选择的sop
	public final static String sop_service_query_sops_for_sel = "BASEPATH/restSopService/querySopListForSel";
	//post：Sop_service	查询sop详细信息
	public final static String sop_service_query_sop_detail_by_id = "BASEPATH/restSopService/querySopDetailById";


	/****  工单服务请求路径 *****/
	//post: workorder	查询我的草稿工单
	public final static String workOrder_service_query_myDraft_workOrder = "BASEPATH/restMyWorkOrderService/queryMyDraftWorkOrder";
	//post: workorder	查询我发布的工单
	public final static String workOrder_service_query_myPublish_workOrder = "BASEPATH/restMyWorkOrderService/queryMyPublishWorkOrder";
	//post: workorder	查询我参与的工单
	public final static String workOrder_service_query_myParticipant_workOrder = "BASEPATH/restMyWorkOrderService/queryMyParticipantWorkOrder";
	//post: workorder	删除草稿工单
	public final static String workOrder_service_delete_draft_workOrder_by_id = "BASEPATH/restMyWorkOrderService/deleteDraftWorkOrderById";
	//post: workorder	预览草稿工单
	public final static String workOder_service_preview_workOrder_by_id = "BASEPATH/restMyWorkOrderService/previewWorkOrderById";
	//post: workorder	根据ID查询工单详细信息-发布后的
	public final static String workOrder_service_query_workOrder_by_id = "BASEPATH/restAppWorkOrderService/queryWorkOrderById";
	//post: workorder	查询工单的操作记录
	public final static String workOrder_service_query_operateRecord = "BASEPATH/restAppWorkOrderService/queryOperateRecord";
	//post: workorder	根据ID查询工单详细信息-草稿的
	public final static String workOrder_service_query_draft_workOrder_by_id = "BASEPATH/restMyWorkOrderService/queryDraftWorkOrderById";
	//post: workorder	编辑工单草稿
	public final static String workOrder_service_save_draft_workOrder = "BASEPATH/restMyWorkOrderService/saveDraftWorkOrder";
	//post: workorder	预览工单草稿
	public final static String workOrder_service_preview_workOrder = "BASEPATH/restAppWorkOrderService/previewWorkOrder";
	//post: workorder	发布工单
	public final static String workOrder_service_publish_workOrder = "BASEPATH/restAppWorkOrderService/publishWorkOrder";
	//post: workorder	查询项目下所有工单
	public final static String workOrder_service_query_all_workOrder = "BASEPATH/restWoMonitorService/queryAllWorkOrder";
	//post: workorder	查询工单岗位职责
	public final static String workOrder_service_query_postDuty_for_workOrder = "BASEPATH/restWorkOrderPlanService/queryPostDutyForWorkOrder";
	//post: workorder	管理员指派
	public final static String workOrder_service_do_assign_admin = "BASEPATH/restWoMonitorService/doAssignWithAdmin";
	//post: workorder	直接关闭（中止操作）
	public final static String workOrder_service_do_stop_admin = "BASEPATH/restWoMonitorService/doStopWithAdmin";
	//post: workorder	查询项目下所有流转方案
	public final static String workOrder_service_query_flowPlan_by_projectId = "BASEPATH/restFlowPlanService/queryProjectFlowPlan";
	//post: workorder	根据ID删除流转方案
	public final static String workOrder_service_delete_flowPlan_by_id = "BASEPATH/restFlowPlanService/deleteFlowPlanById";
	//post：workorder	验证工单方案岗位职责
	public final static String workOrder_service_verify_postAndDuty = "BASEPATH/restFlowPlanService/verifyPostAndDuty";
	//post: workorder	添加流转方案
	public final static String workOrder_service_add_flowPlan = "BASEPATH/restFlowPlanService/addFlowPlan";
	//post: workorder	根据ID查询流转方案
	public final static String workOrder_service_query_flowPlan_id = "BASEPATH/restFlowPlanService/queryFlowPlanById";
	//post: workorder	根据ID更新流转方案
	public final static String workOrder_service_update_flowPlan_id = "BASEPATH/restFlowPlanService/updateFlowPlanById";
	//post:	workorder	查询tab标签列表
	public final static String workOrder_service_query_tab_list = "BASEPATH/restWoPlanService/queryTabList";
	//post:	workorder	查询工单计划执行列表
	public final static String workOrder_service_query_woPlan_execute_list = "BASEPATH/restWoPlanService/queryWoPlanExecuteList";
	//post:	workorder	查询工单计划执行列表-频率日
	public final static String workOrder_service_query_woPlan_day_execute_list = "BASEPATH/restWoPlanService/queryWoPlanDayExecuteList";
	//post:	workorder	获得工单事项预览
	public final static String workOrder_service_get_woMatters_preview = "BASEPATH/restWoPlanService/getWoMattersPreview";
	//post:	workorder	发布/添加工单计划
	public final static String workOrder_service_add_woPlan = "BASEPATH/restWoPlanService/addWoPlan";
	//post:	workorder	根据Id查询工单计划的详细信息
	public final static String workOrder_service_query_woPlan_by_id = "BASEPATH/restWoPlanService/queryWoPlanById";
	//post:	workorder	作废工单计划
	public final static String workOrder_service_destroy_woPlan_by_id = "BASEPATH/restWoPlanService/destroyWoPlanById";
	//post:	workorder	查询工单计划的历史列表
	public final static String workOrder_service_query_woPlan_his_list = "BASEPATH/restWoPlanService/queryWoPlanHisList";
	//post:	workorder	查询作废的计划列表
	public final static String workOrder_service_query_destoryed_woPlan_list = "BASEPATH/restWoPlanService/queryDestroyedWoPlanList";
	//post:	workorder	查询工单计划生成的工单列表
	public final static String workOrder_service_query_wo_list_by_planId = "BASEPATH/restWoPlanService/queryWoListByPlanId";
	//post:	workorder	根据ID编辑工单计划信息
	public final static String workOrder_service_update_woPlan = "BASEPATH/restWoPlanService/updateWoPlan";
	//post：工单引擎-根据ID查询工单
	public final static String wo_engine_query_by_key = "BASEPATH/token/bget?developerId=DEVELOPER&secret=SECRET";
	//post：工单引擎-按物理对象查询相关令牌接口
	public final static String wo_engine_query_by_object = "BASEPATH/token/query_by_object?developerId=DEVELOPER&secret=SECRET";

}
