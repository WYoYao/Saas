package com.sagacloud.saas.service.impl;

import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.sagacloud.saas.cache.GraphCache;
import com.sagacloud.saas.cache.ObjWoRelCache;
import com.sagacloud.saas.cache.ObjWoRemindConfigCache;
import com.sagacloud.saas.cache.ProjectCache;
import com.sagacloud.saas.common.CommonConst;
import com.sagacloud.saas.common.DataRequestPathUtil;
import com.sagacloud.saas.common.DateUtil;
import com.sagacloud.saas.common.JSONUtil;
import com.sagacloud.saas.common.StringUtil;
import com.sagacloud.saas.common.ToolsUtil;
import com.sagacloud.saas.dao.DBCommonMethods;
import com.sagacloud.saas.dao.DBConst;
import com.sagacloud.saas.dao.DBConst.Result;
import com.sagacloud.saas.service.BaseService;
import com.sagacloud.saas.service.DictionaryServiceI;
import com.sagacloud.saas.service.EquipServiceI;
import com.sagacloud.saas.service.ObjectInfoServiceI;
import com.sagacloud.saas.service.ObjectServiceI;
import com.sagacloud.saas.service.WorkOrderServiceI;

/**
 * 功能描述：设备管理
 * @author gezhanbin
 *
 */
@Service("equipService")
public class EquipServiceImpl extends BaseService implements EquipServiceI {
	@Autowired
	private ProjectCache projectCache;
	@Autowired
	private ObjectInfoServiceI objectInfoService;
	@Autowired
	private WorkOrderServiceI workOrderService;
	@Autowired
	private ObjectServiceI objectService;
	@Autowired
	private DictionaryServiceI dictionaryService;
	
	@Autowired
	private GraphCache graphCache;
	
	@Override
	public String verifyEquipLocalId(JSONObject jsonObject) throws Exception {
		String project_id = jsonObject.getString("project_id");
		String equip_id = jsonObject.getString("equip_id");
		String equip_local_id = jsonObject.getString("equip_local_id");
		String secret = projectCache.getProjectSecretById(project_id);
		String objectParam = ToolsUtil.equipInfoParamMap.get("equip_local_id");
		return objectInfoService.verifyObjectInfo(project_id, equip_id, objectParam, equip_local_id, "Eq", project_id, secret);
	}
	@Override
	public String verifyEquipBimId(JSONObject jsonObject) throws Exception {
		String project_id = jsonObject.getString("project_id");
		String equip_id = jsonObject.getString("equip_id");
		String bimid = jsonObject.getString("BIMID");
		String secret = projectCache.getProjectSecretById(project_id);
		String objectParam = ToolsUtil.equipInfoParamMap.get("BIMID");
		return objectInfoService.verifyObjectInfo(project_id, equip_id, objectParam, bimid, "Eq", project_id, secret);
	}
	@Override
	public String queryEquipInfoPointHis(JSONObject jsonObject) throws Exception {
		String project_id = jsonObject.getString("project_id");
		String equip_id = jsonObject.getString("equip_id");
		String info_point_code = jsonObject.getString("info_point_code");
		String infoPointCode = ToolsUtil.equipInfoParamMap.get(info_point_code);
		String secret = projectCache.getProjectSecretById(project_id);
		return objectInfoService.queryObjectInfoHis(equip_id, infoPointCode, project_id, secret);
	}
	@Override
	public String queryEquipDynamicInfo(JSONObject jsonObject) throws Exception {
		String project_id = jsonObject.getString("project_id");
		String equip_id = jsonObject.getString("equip_id");
		JSONArray contents = new JSONArray();
		//1、获取设备的设备类型
		//2.根据设备类型查询出私有设备类型信息点（技术参数/分一二级），
		//3、根据信息点编码inputMode 组装info_cmpt_id 查询 信息点组件表info_component 中  app_show_flag 显示true或者为null的信息点编码
		//4、根据显示的信息点编码 查询组件关系表component_relation中的app组件编码app_cmpt_code 赋值给cmpt
		//5、在根据设备信息中的key获取value值，根据私有信息点data_type 赋值给***_value属性
		//6、把信息点中的dataSource值赋值给cmpt_data
		String secret = projectCache.getProjectSecretById(project_id);
		JSONObject equipItem = objectInfoService.queryObject(equip_id, project_id, secret);
		String equip_category = StringUtil.getEquipOrSystemCodeFromId(equip_id, CommonConst.tag_dict_equip);
		Map<String, JSONObject> contentsMap = objectInfoService.queryObjectDynamicInfo("equip", equip_category, equipItem);
		contents.addAll(contentsMap.values());
		JSONObject result = new JSONObject();
		result.put(Result.RESULT, Result.SUCCESS);
		result.put(Result.CONTENT, contents);
		result.put(Result.COUNT, contents.size());
		return result.toJSONString();
	}
	
	@Override
	public String queryEquipDynamicInfoForAdd(JSONObject jsonObject) throws Exception {
		String equip_category = jsonObject.getString("equip_category");
		Map<String, JSONObject> contentsMap = objectInfoService.queryObjectDynamicInfo("equip", equip_category, null);
		JSONArray contents = new JSONArray();
		contents.addAll(contentsMap.values());
		JSONObject result = new JSONObject();
		result.put(Result.CONTENT, contents);
		result.put(Result.RESULT, Result.SUCCESS);
		result.put(Result.COUNT, contents.size());
		return result.toJSONString();
	}
	@Override
	public String addEquip(JSONObject jsonObject) throws Exception {
		String resultMsg = "";
		String result = Result.SUCCESS;
		String project_id = jsonObject.getString("project_id");
		String build_id = jsonObject.getString("build_id");
		String space_id = jsonObject.getString("space_id");
		String system_id = jsonObject.getString("system_id");
		//设备类型编码
		String equip_category = jsonObject.getString("equip_category");
		//服务空间id数组
//		JSONArray service_space_ids = jsonObject.getJSONArray("service_space_ids");
		//供应商id
		String supplier_id = jsonObject.getString("supplier_id");
		//投产日期，yyyyMMddhhmmss
		String start_date = jsonObject.getString("start_date");
		//使用寿命
		String service_life = jsonObject.getString("service_life");
		//维修商单位id
		String maintainer_id = jsonObject.getString("maintainer_id");
		//保险公司id
		String insurer_id = jsonObject.getString("insurer_id");
		//保险单号
		String insurer_num = jsonObject.getString("insurer_num");
		
		String secret = projectCache.getProjectSecretById(project_id);
		
		jsonObject.remove("user_id");
		jsonObject.remove("project_id");
		jsonObject.remove("build_id");
		jsonObject.remove("space_id");
		jsonObject.remove("system_id");
		jsonObject.remove("equip_category");
		jsonObject.remove("service_space_ids");
		jsonObject.remove("manufacturer_id");
		jsonObject.remove("supplier_id");
		jsonObject.remove("maintainer_id");
		jsonObject.remove("insurer_id");
		jsonObject.remove("status");
		
		
		//查询供应商联系电话、联系人、网址、传真、电子邮件
		JSONObject company = new JSONObject();
		if(!StringUtil.isNull(supplier_id)) {
			company.put("company_id", supplier_id);
			company = JSONUtil.getKeyWithMajors(company, "company_id");
			String queryResult = DBCommonMethods.getRecordBykey(DBConst.TABLE_EQUIP_COMPANY_BOOK, company.toJSONString());
			JSONObject queryJson = JSONObject.parseObject(queryResult);
			if(Result.SUCCESS.equals(queryJson.getString(Result.RESULT))) {
				JSONArray queryContents = queryJson.getJSONArray(Result.CONTENT);
				if(queryContents != null && queryContents.size() > 0) {
					JSONObject item = queryContents.getJSONObject(0);
					String supplier_phone = item.getString("phone");
					jsonObject.put("supplier_phone", supplier_phone);
					String supplier_contactor = item.getString("contacts");
					jsonObject.put("supplier_contactor", supplier_contactor);
					String supplier_web = item.getString("web");
					jsonObject.put("supplier_web", supplier_web);
					String supplier_fax = item.getString("fax");
					jsonObject.put("supplier_fax", supplier_fax);
					String supplier_email = item.getString("email");
					jsonObject.put("supplier_email", supplier_email);
				}
			}
		}
		//查询维修商单位联系电话、联系人、网址、传真、电子邮件
		company.clear();
		if(!StringUtil.isNull(maintainer_id)) {
			company.put("company_id", maintainer_id);
			company = JSONUtil.getKeyWithMajors(company, "company_id");
			String queryResult = DBCommonMethods.getRecordBykey(DBConst.TABLE_EQUIP_COMPANY_BOOK, company.toJSONString());
			JSONObject queryJson = JSONObject.parseObject(queryResult);
			if(Result.SUCCESS.equals(queryJson.getString(Result.RESULT))) {
				JSONArray queryContents = queryJson.getJSONArray(Result.CONTENT);
				if(queryContents != null && queryContents.size() > 0) {
					JSONObject item = queryContents.getJSONObject(0);
					String maintainer_phone = item.getString("phone");
					jsonObject.put("maintainer_phone", maintainer_phone);
					String maintainer_contactor = item.getString("contacts");
					jsonObject.put("maintainer_contactor", maintainer_contactor);
					String maintainer_web = item.getString("web");
					jsonObject.put("maintainer_web", maintainer_web);
					String maintainer_fax = item.getString("fax");
					jsonObject.put("maintainer_fax", maintainer_fax);
					String maintainer_email = item.getString("email");
					jsonObject.put("maintainer_email", maintainer_email);
				}
			}
		}
		JSONArray insurance_files = new JSONArray();
		//查询保险公司联系电话、联系人、保险文件 
		company.clear();
		if(!StringUtil.isNull(insurer_id)) {
			company.put("company_id", insurer_id);
			company = JSONUtil.getKeyWithMajors(company, "company_id");
			String queryResult = DBCommonMethods.getRecordBykey(DBConst.TABLE_EQUIP_COMPANY_BOOK, company.toJSONString());
			JSONObject queryJson = JSONObject.parseObject(queryResult);
			if(Result.SUCCESS.equals(queryJson.getString(Result.RESULT))) {
				JSONArray queryContents = queryJson.getJSONArray(Result.CONTENT);
				if(queryContents != null && queryContents.size() > 0) {
					JSONObject item = queryContents.getJSONObject(0);
					String insurer_phone = item.getString("phone");
					jsonObject.put("insurer_phone", insurer_phone);
					String insurer_contactor = item.getString("contacts");
					jsonObject.put("insurer_contactor", insurer_contactor);
					if(!StringUtil.isNull(insurer_num)) {
						String insurer_info_str = item.getString("insurer_info");
						if(!StringUtil.isNull(insurer_info_str)) {
							JSONArray insurer_infos = JSONArray.parseArray(insurer_info_str);
							if(insurer_infos != null && insurer_infos.size() > 0) {
								for (int i = 0; i < insurer_infos.size(); i++) {
									JSONObject insurer_info = insurer_infos.getJSONObject(i);
									String insurer_num_temp = insurer_info.getString("insurer_num");
									if(insurer_num.equals(insurer_num_temp)) {
										String insurance_file_str = insurer_info.getString("insurance_file");
										if(!StringUtil.isNull(insurance_file_str)) {
											JSONObject insurance_file = JSONObject.parseObject(insurance_file_str);
											insurance_files.add(insurance_file);
										}
										break;
									}
									
								}
							}
						}
					}
				}
			}
		}
		
		jsonObject.put("insurance_file", insurance_files);
		
		//计算预计报废日期
		if(!StringUtil.isNull(start_date) && !StringUtil.isNull(service_life)) {
			Date startDate = DateUtil.parseDate(DateUtil.sdftime, start_date);
			Calendar calendar = Calendar.getInstance();
			calendar.setTime(startDate);
			Integer serviceLife = Integer.valueOf(service_life);
			calendar.add(Calendar.YEAR, serviceLife);
			String expect_scrap_date = DateUtil.formatStr(DateUtil.sdftime, calendar.getTime());
			jsonObject.put("expect_scrap_date", expect_scrap_date);
		}
		
		
		JSONObject infos = new JSONObject();
		for(String key : jsonObject.keySet()) {
			Object value = jsonObject.get(key);
			setEquipmentInfo(infos, key, value);
		}
		//添加设备信息
		JSONObject criteria = new JSONObject();
		criteria.put("building_id", build_id);
		criteria.put("equipment_category", equip_category);
		criteria.put("infos", infos);
		
		String requestUrl = this.getDataPlatformPath(DataRequestPathUtil.dataPlat_equipment_system_create,project_id,secret);
		String queryResult = httpPostRequest(requestUrl, criteria.toJSONString());
		JSONObject queryJson = JSONObject.parseObject(queryResult);
		if(Result.FAILURE.equals(queryJson.getString(Result.RESULT))) {
			queryJson.put(Result.RESULTMSG, "添加设备失败！");
			queryResult = queryJson.toJSONString();
			return queryResult;
		}
		String equip_id = queryJson.getString("id");
		//处理设备服务空间关系
//		String graph_id = "";
//		if(service_space_ids != null && service_space_ids.size() > 0) {
//			JSONObject graphInstance = queryGraphInstance(project_id, secret, "EquipforSpace", null, DateUtil.getNowTimeStr());
//			if(graphInstance != null) {
//				graph_id = graphInstance.getString("graph_id");
//			}
//			if(StringUtil.isNull(graph_id)) {
//				graph_id =createGraphInstance("EquipforSpace", project_id, secret);
//			}
//			if(!StringUtil.isNull(graph_id)) {
//				boolean flag = false;
//				for (int i = 0; i < service_space_ids.size(); i++) {
//					String service_space_id = service_space_ids.getString(i);
//					queryResult = createRelations(equip_id, service_space_id, graph_id, "1", project_id, secret);
//					queryJson = JSONObject.parseObject(queryResult);
//					if(Result.FAILURE.equals(queryJson.getString(Result.RESULT))) {
//						flag = true;
//					}
//				}
//				if(flag) {
//					resultMsg = resultMsg + "创建设备服务空间关系失败！";
//					result = Result.FAILURE;
//				}
//			}
//		}
		
		//处理设备所在空间关系
		if(!StringUtil.isNull(space_id)) {
			queryResult = createGraphInstanceRelations(project_id, secret, "EquipinSpace", equip_id, space_id, "1");
			queryJson = JSONObject.parseObject(queryResult);
			if(Result.FAILURE.equals(queryJson.getString(Result.RESULT))) {
				resultMsg = resultMsg + "创建设备所在空间关系失败！";
				result = Result.FAILURE;
			}
		}
		//处理系统包含设备关系
		if(!StringUtil.isNull(system_id)) {
			queryResult = createGraphInstanceRelations(project_id, secret, "SystemEquip", system_id, equip_id, "1");
			queryJson = JSONObject.parseObject(queryResult);
			if(Result.FAILURE.equals(queryJson.getString(Result.RESULT))) {
				resultMsg = resultMsg + "创建系统包含的设备关系失败！";
				result = Result.FAILURE;
			}
		}
		
		//更新附加表obj_append
		jsonObject.clear();
		jsonObject.put("obj_id", equip_id);
		jsonObject.put("project_id", project_id);
		jsonObject.put("obj_type", "equip");
		jsonObject.put("download_flag", "0");
		jsonObject.put(DBConst.TABLE_FIELD_UPDATE_TIME, DateUtil.getNowTimeStr());
		jsonObject = JSONUtil.getAddParamJson(jsonObject);
		DBCommonMethods.insertRecord(DBConst.TABLE_OBJ_APPEND, jsonObject.toJSONString());
		//处理二维码
		String qrcodeKey = UUID.randomUUID().toString().replaceAll("-", "");
		queryResult = createQRCode("eq", equip_id, qrcodeKey);
		queryJson = JSONObject.parseObject(queryResult);
		if(Result.FAILURE.equals(queryJson.getString(Result.RESULT))) {
			String msg = queryJson.getString(Result.RESULTMSG);
			resultMsg = resultMsg + msg;
			result = Result.FAILURE;
		}
		
		//更新设备二维码信息
		queryResult =  objectInfoService.updateObjectInfo(equip_id, "EquipQRCode", qrcodeKey, null, project_id, secret);
		queryJson = JSONObject.parseObject(queryResult);
		if(Result.FAILURE.equals(queryJson.getString(Result.RESULT))) {
			resultMsg = resultMsg + "二维码赋值失败！";
			result = Result.FAILURE;
		}
		JSONObject resultJson = new JSONObject();
		resultJson.put(Result.RESULT, result);
		resultJson.put(Result.RESULTMSG, resultMsg);
		queryResult = resultJson.toJSONString();
		return queryResult;
	}
	
	
	private void setEquipmentInfo(JSONObject infos, String param, Object value) {
		String paramNew = ToolsUtil.equipInfoParamMap.get(param);
		if(StringUtil.isNull(paramNew)) {
			paramNew = param;
		}
		if(value == null) {
			return;
		}
		if(value instanceof String) {
			if(StringUtil.isNull(value.toString()))  {
				return;
			}
		}
		JSONArray hisValues = new JSONArray();
		JSONObject hisValue = new JSONObject();
		hisValue.put("value", value);
		hisValues.add(hisValue);
		infos.put(paramNew, hisValues);
	}
	@Override
	public String queryEquipPublicInfo(JSONObject jsonObject) throws Exception {
		String project_id = jsonObject.getString("project_id");
		String equip_id = jsonObject.getString("equip_id");
		String secret = projectCache.getProjectSecretById(project_id);
		String requestUrl = getDataPlatformPath(
				DataRequestPathUtil.dataPlat_object_batch_query,
				project_id,
				secret);
		jsonObject = new JSONObject();
		JSONArray criterias = new JSONArray();
		JSONObject objQuery = new JSONObject();
		objQuery.put("id", equip_id);
		criterias.add(objQuery);
		jsonObject.put("criterias", criterias);
		String queryResult = this.httpPostRequest(requestUrl, jsonObject.toJSONString());
		if(queryResult.contains(Result.SUCCESS) && queryResult.contains(Result.CONTENT)) {
			JSONObject result = new JSONObject();
			JSONObject item = new JSONObject();
			result.put(Result.RESULT, Result.SUCCESS);
			JSONObject queryJson = JSONObject.parseObject(queryResult);
			JSONArray queryContents = queryJson.getJSONArray(Result.CONTENT);
			if(queryContents != null && queryContents.size() > 0) {
				Set<String> ids = new HashSet<>();
				JSONObject queryItem = queryContents.getJSONObject(0);
				queryItem = queryItem.getJSONObject("infos");
				item.put("equip_id", equip_id);
				String build_id = StringUtil.transferId(equip_id, CommonConst.tag_build);
				item.put("build_id", build_id);
				ids.add(build_id);
				if(queryItem != null) {
					
					String equip_local_id = queryItem.getString("EquipLocalID");
					item.put("equip_local_id", equip_local_id);
					String equip_local_name = queryItem.getString("EquipLocalName");
					item.put("equip_local_name", equip_local_name);
					String BIMID = queryItem.getString("BIMID");
					item.put("BIMID", BIMID);
					//安装位置
					String position = "";
					//查询图实例id
					String graph_id = graphCache.getGraphIdByProjectIdAndGraph(project_id, "EquipinSpace");
					//空间id
					String space_id = "";
					if(!StringUtil.isNull(graph_id)) {
						JSONObject relation = queryRelation(project_id, secret, equip_id, null, graph_id, "1");
						if(relation != null) {
							space_id = relation.getString("to_id");
						}
					}
					String floor_id = "";
					if(!StringUtil.isNull(space_id)) {
						//楼层id
						floor_id = StringUtil.transferId(space_id, CommonConst.tag_floor);
						ids.add(floor_id);
						ids.add(space_id);
					}
					
					//所属系统名称
					//查询图实例id
					graph_id = graphCache.getGraphIdByProjectIdAndGraph(project_id, "SystemEquip");

					//系统id
					String system_id = "";
					if(!StringUtil.isNull(graph_id)) {
						JSONObject relation = queryRelation(project_id, secret, null, equip_id, graph_id, "1");
						if(relation != null) {
							system_id = relation.getString("from_id");
						}
					}
					
					if(!StringUtil.isNull(system_id)) {
						ids.add(system_id);
					}
					
					Map<String, JSONObject> objectMap = queryBatchObject(project_id, secret, ids);
					if(objectMap.size() > 0) {
						String build_name = getObjectInfoValue(build_id, objectMap, "BuildLocalName");
						if(!StringUtil.isNull(build_name)) {
							position = position + build_name;
						}
						if(!StringUtil.isNull(floor_id)) {
							String floor_name = getObjectInfoValue(floor_id, objectMap, "FloorLocalName");
							if(!StringUtil.isNull(floor_name)) {
								position = position + "-" + floor_name;
							}
							
						}
						if(!StringUtil.isNull(space_id)) {
							String space_name = getObjectInfoValue(space_id, objectMap, "RoomLocalName");
							if(!StringUtil.isNull(space_name)) {
								position = position + "-" + space_name;
							}
						}
						if(position.startsWith("-")) {
							position = position.substring(1, position.length());
						}
						
					}
					item.put("position", position);
					//设备类型名称
					String equip_category_id = StringUtil.getEquipOrSystemCodeFromId(equip_id, CommonConst.tag_dict_equip);
					Map<String, String> equipmentCategoryMap = dictionaryService.queryEquipmentCategory();
					String equip_category_name = equipmentCategoryMap.get(equip_category_id);
					item.put("equip_category_name", equip_category_name);
					
					//系统名称
					String system_name = "";
					if(!StringUtil.isNull(system_id)) {
						system_name = getObjectInfoValue(system_id, objectMap, "SysLocalName");
					}
					item.put("system_name", system_name);
					//服务空间
					//查询图实例id
//					graph_id = graphCache.getGraphIdByProjectIdAndGraph(project_id, "EquipforSpace");
//					JSONArray space_names = new JSONArray();
//					//空间id
//					if(!StringUtil.isNull(graph_id)) {
//						JSONArray relations = queryRelations(project_id, secret, equip_id, null, graph_id, "1");
//						if(relations != null && relations.size() > 0) {
//							String[] system_ids = new String[relations.size()];
//							for (int i = 0; i < relations.size(); i++) {
//								JSONObject relation = relations.getJSONObject(i);
//								system_id = relation.getString("to_id");
//								system_ids[i] = system_id;
//							}
//
//							Map<String, JSONObject> objectMap = queryBatchObject(project_id, secret, system_ids);
//							for (int i = 0; i < relations.size(); i++) {
//								JSONObject relation = relations.getJSONObject(i);
//								system_id = relation.getString("to_id");
//								system_name = getObjectInfoValue(system_id, objectMap, "RoomLocalName");
//								if(!StringUtil.isNull(system_name)) {
//									space_names.add(system_name);
//								}
//							}
//						}
//					}
//					item.put("space_names", space_names);

					String length = queryItem.getString("Length");
					item.put("length", length);
					String width = queryItem.getString("Width");
					item.put("width", width);
					String height = queryItem.getString("Height");
					item.put("height", height);
					String mass = queryItem.getString("Mass");
					item.put("mass", mass);
					String material = queryItem.getString("Material");
					item.put("material", material);
					String dept = queryItem.getString("Dept");
					item.put("dept", dept);
					JSONArray drawing = queryItem.getJSONArray("InstallDrawing");
					item.put("drawing", drawing);

					JSONArray picture = queryItem.getJSONArray("Pic");
					item.put("picture", picture);

					JSONArray check_report = queryItem.getJSONArray("CheckReport");
					item.put("check_report", check_report);

					JSONArray nameplate = queryItem.getJSONArray("Nameplate");
					item.put("nameplate", nameplate);

					JSONArray archive = queryItem.getJSONArray("Archive");
					item.put("archive", archive);

					String manufacturer = queryItem.getString("Manufacturer");
					item.put("manufacturer", manufacturer);
					String brand = queryItem.getString("Brand");
					item.put("brand", brand);
					String product_date = queryItem.getString("ProductDate");
					item.put("product_date", product_date);
					String specification = queryItem.getString("Specification");
					item.put("specification", specification);
					String supplier = queryItem.getString("Supplier");
					item.put("supplier", supplier);
					String supplier_phone = queryItem.getString("SupplierPhone");
					item.put("supplier_phone", supplier_phone);
					String supplier_contactor = queryItem.getString("SupplierContactor");
					item.put("supplier_contactor", supplier_contactor);
					String supplier_web = queryItem.getString("SupplierWeb");
					item.put("supplier_web", supplier_web);
					String supplier_fax = queryItem.getString("SupplierFax");
					item.put("supplier_fax", supplier_fax);
					String supplier_email = queryItem.getString("SupplierEmail");
					item.put("supplier_email", supplier_email);
					String contract_id = queryItem.getString("SupplierContractID");
					item.put("contract_id", contract_id);
					String asset_id = queryItem.getString("AssetID");
					item.put("asset_id", asset_id);
					String purchase_price = queryItem.getString("PurchasePrice");
					item.put("purchase_price", purchase_price);
					String principal = queryItem.getString("Principal");
					item.put("principal", principal);
					String maintain_id = queryItem.getString("MaintainID");
					item.put("maintain_id", maintain_id);
					String start_date = queryItem.getString("StartDate");
					item.put("start_date", start_date);
					String maintain_deadline = queryItem.getString("MaintainDeadline");
					item.put("maintain_deadline", maintain_deadline);
					String service_life = queryItem.getString("ServiceLife");
					item.put("service_life", service_life);
					String warranty = queryItem.getString("Warranty");
					item.put("warranty", warranty);
					String maintain_cycle = queryItem.getString("MaintainPeriod");
					item.put("maintain_cycle", maintain_cycle);
					String maintainer = queryItem.getString("Maintainer");
					item.put("maintainer", maintainer);
					String maintainer_phone = queryItem.getString("MaintainerPhone");
					item.put("maintainer_phone", maintainer_phone);
					String maintainer_contactor = queryItem.getString("MaintainerContactor");
					item.put("maintainer_contactor", maintainer_contactor);
					String maintainer_web = queryItem.getString("MaintainerWeb");
					item.put("maintainer_web", maintainer_web);
					String maintainer_fax = queryItem.getString("MaintainerFax");
					item.put("maintainer_fax", maintainer_fax);
					String maintainer_email = queryItem.getString("MaintainerEmail");
					item.put("maintainer_email", maintainer_email);
					String status = queryItem.getString("Status");
					item.put("status", status);
					String insurer = queryItem.getString("Insurer");
					item.put("insurer", insurer);
					String insurer_num = queryItem.getString("InsuranceNum");
					item.put("insurer_num", insurer_num);
					String insurer_contactor = queryItem.getString("InsurerContactor");
					item.put("insurer_contactor", insurer_contactor);
					String insurer_phone = queryItem.getString("InsurerPhone");
					item.put("insurer_phone", insurer_phone);
					JSONArray insurance_file = queryItem.getJSONArray("InsuranceFile");
					item.put("insurance_file", insurance_file);
				}
			}
			result.put("Item", item);
			queryResult = result.toJSONString();
		}

		return queryResult;
	}

	
	@Override
	public String updateEquipInfo(JSONObject jsonObject) throws Exception {
		String project_id = jsonObject.getString("project_id");
		String equip_id = jsonObject.getString("equip_id");
		String info_point_code = jsonObject.getString("info_point_code");
		Object info_point_value = jsonObject.get("info_point_value");
		String valid_time = jsonObject.getString("valid_time");
		String infoPointCode = ToolsUtil.equipInfoParamMap.get(info_point_code);
		String secret = projectCache.getProjectSecretById(project_id);
		return objectInfoService.updateObjectInfo(equip_id, infoPointCode, info_point_value, valid_time, project_id, secret);
	}
	

	@Override
	public String queryEquipRelWorkOrder(JSONObject jsonObject) throws Exception {
		String equip_id = jsonObject.getString("equip_id");
		String order_type = jsonObject.getString("order_type");
		
		Integer page = jsonObject.getInteger("page");
		Integer page_size = jsonObject.getInteger("page_size");
		
		jsonObject.clear();
		if(page ==  null || page < 1) {
			page = 1;
		}
		JSONObject criteria = new JSONObject();
		criteria.put("precise", false);
		criteria.put("object", equip_id);
		if(!StringUtil.isNull(order_type)) {
			criteria.put("category", equip_id);
		}
		Integer skip = 0;
		if(page_size != null && page_size > 0) {
			skip = (page - 1) * page_size;
		} else {
			skip = 0;
			page_size = Integer.MAX_VALUE;
		}
		JSONObject limit = new JSONObject();
		limit.put("skip", skip);
		limit.put("count", page_size);
		limit.put("order", "desc");
		jsonObject.put("limit", limit);
		jsonObject.put("criteria", criteria);
		
		String url = getWorkOrderEnginePath(DataRequestPathUtil.wo_engine_query_by_object);
        String queryResult = httpPostRequest(url, jsonObject.toJSONString());
		JSONObject queryJson = JSONObject.parseObject(queryResult);
		if(Result.SUCCESS.equals(queryJson.getString(Result.RESULT))) {
			JSONArray queryContents = queryJson.getJSONArray(Result.CONTENT);
			JSONArray contents = new JSONArray();
			if(queryContents != null && queryContents.size() > 0) {
				for (int i = 0; i < queryContents.size(); i++) {
					JSONObject queryContent = queryContents.getJSONObject(i);
					JSONObject workOrder = queryContent.getJSONObject("work_order");
					if(workOrder != null) {
						String participants = "";
						JSONObject workOrderBody = workOrder.getJSONObject("wo_body");
						JSONObject executors = workOrder.getJSONObject("executors");
						if(executors != null) {
							Set<String> executorSet = new HashSet<>();
							JSONArray currents = executors.getJSONArray("current");
							if(currents != null && currents.size() > 0) {
								for (int j = 0; j < currents.size(); j++) {
									JSONObject current = currents.getJSONObject(j);
									String person_name = current.getString("person_name");
									executorSet.add(person_name);
								}
							}
							JSONArray pasts = executors.getJSONArray("past");
							if(pasts != null && pasts.size() > 0) {
								for (int j = 0; j < pasts.size(); j++) {
									JSONObject past = pasts.getJSONObject(j);
									String person_name = past.getString("person_name");
									executorSet.add(person_name);
								}
							}
							if(executorSet.size() > 0) {
								for(String person_name : executorSet) {
									if(!StringUtil.isNull(person_name)) {
										participants += person_name;
										participants += "，";
									}
								}
								if(!StringUtil.isNull(participants)) {
									participants = participants.substring(0, participants.length() - 1);
								}
							}
						}
						
						
						if(workOrderBody != null) {
							JSONObject content = new JSONObject();
							String order_id = workOrderBody.getString("order_id");
							String summary = workOrderBody.getString("summary");
							String order_state = workOrderBody.getString("order_state");
							String order_state_name = workOrderBody.getString("order_state_name");
							String custom_state_name = workOrderBody.getString("custom_state_name");
							String publish_time = workOrderBody.getString("publish_time");
							content.put("order_id", order_id);
							content.put("summary", summary);
							content.put("order_state", order_state);
							content.put("order_state_name", order_state_name);
							content.put("custom_state_name", custom_state_name);
							content.put("publish_time", publish_time);
							content.put("participants", participants);
							contents.add(content);
						}
					}
				}
			}
			queryJson.put(Result.CONTENT, contents);
			queryJson.put(Result.COUNT, contents.size());
			queryResult = queryJson.toJSONString();
		}
		return queryResult;
	}
	@Override
	public String queryEquipStatisticCount(JSONObject jsonObject) throws Exception {
		String project_id = jsonObject.getString("project_id");
		String secret = projectCache.getProjectSecretById(project_id);
		//设备总数:统计运行中的设备数量，即有效的
		jsonObject.clear();
		JSONArray type = new JSONArray();
		type.add("Eq");
		JSONObject criteria = new JSONObject();
		criteria.put("type", type);
		jsonObject.put("nodata", true);
		jsonObject.put("valid", true);
		jsonObject.put("criteria", criteria);
		String requestUrl = getDataPlatformPath(DataRequestPathUtil.dataPlat_object_subset_query, project_id, secret);
		String queryResult = httpPostRequest(requestUrl, jsonObject.toJSONString());
		JSONObject queryJson = JSONObject.parseObject(queryResult);
		if(Result.FAILURE.equals(queryJson.getString(Result.RESULT))) {
			return queryResult;
		}
		Integer equip_total = queryJson.getInteger(Result.COUNT);
		//本周新数量，没有则返回0
		Calendar calendar = Calendar.getInstance();
		int weekday = calendar.get(Calendar.DAY_OF_WEEK) - 1;
		if(weekday == 0) {
			weekday = 7;
		} 
		calendar.add(Calendar.DAY_OF_YEAR, - weekday);
		
		
		String start = DateUtil.formatStr(DateUtil.sdfDay, calendar.getTime());
		start = start + "000000";
		JSONObject ctime = new JSONObject();
		ctime.put("$gte", start);
		jsonObject.put("ctime", ctime);
		
		requestUrl = getDataPlatformPath(DataRequestPathUtil.dataPlat_object_subset_query, project_id, secret);
		queryResult = httpPostRequest(requestUrl, jsonObject.toJSONString());
		queryJson = JSONObject.parseObject(queryResult);
		if(Result.FAILURE.equals(queryJson.getString(Result.RESULT))) {
			return queryResult;
		}
		Integer new_count = queryJson.getInteger(Result.COUNT);
		jsonObject.clear();
		//当前维修中数量，没有则返回0   order_type = 2
		
		jsonObject.put(DBConst.TABLE_FIELD_VALID, true);
		jsonObject.put("project_id", project_id);
		jsonObject.put("obj_type", "equip");
		jsonObject.put("order_type", "2");
		criteria = JSONUtil.getCriteriaWithMajors(jsonObject, DBConst.TABLE_FIELD_VALID,
				"project_id","obj_type","order_type");
		queryResult = DBCommonMethods.queryRecordByCriteria(DBConst.DATABASE_WORK_ORDER, DBConst.TABLE_OBJ_WO_REL, criteria.toJSONString());
		queryJson = JSONObject.parseObject(queryResult);
		if(Result.FAILURE.equals(queryJson.getString(Result.RESULT))) {
			return queryResult;
		}
		Integer repair_count = queryJson.getInteger(Result.COUNT);
		//当前维保中数量，没有则返回0   order_type = 1
		jsonObject.put("order_type", "1");
		criteria = JSONUtil.getCriteriaWithMajors(jsonObject, DBConst.TABLE_FIELD_VALID,
				"project_id","obj_type","order_type");
		queryResult = DBCommonMethods.queryRecordByCriteria(DBConst.DATABASE_WORK_ORDER, DBConst.TABLE_OBJ_WO_REL, criteria.toJSONString());
		queryJson = JSONObject.parseObject(queryResult);
		if(Result.FAILURE.equals(queryJson.getString(Result.RESULT))) {
			return queryResult;
		}
		Integer maint_count = queryJson.getInteger(Result.COUNT);
		//即将报废数量，没有则返回0
		jsonObject.clear();
		criteria.clear();
		type = new JSONArray();
		type.add("Eq");
		criteria.put("type", type);
		jsonObject.put("nodata", true);
		jsonObject.put("valid", true);
		JSONObject info = new JSONObject();
		JSONObject expectScrapDate = new JSONObject();
		calendar = Calendar.getInstance();
		Date monthday = DateUtil.parseDate(DateUtil.sdfMonth, DateUtil.formatStr(DateUtil.sdfMonth, calendar.getTime()));
		calendar.setTime(monthday);
		calendar.add(Calendar.MONTH, -6);
		String time = DateUtil.formatStr(DateUtil.sdftime, calendar.getTime());
		expectScrapDate.put("$gte", time);
		info.put("ExpectScrapDate", expectScrapDate);
		JSONArray infos = new JSONArray();
		infos.add(info);
		criteria.put("infos", infos);
		jsonObject.put("criteria", criteria);
		requestUrl = getDataPlatformPath(DataRequestPathUtil.dataPlat_object_query_by_info, project_id, secret);
		queryResult = httpPostRequest(requestUrl, jsonObject.toJSONString());
		queryJson = JSONObject.parseObject(queryResult);
		if(Result.FAILURE.equals(queryJson.getString(Result.RESULT))) {
			return queryResult;
		}
		Integer going_destroy_count = queryJson.getInteger(Result.COUNT);
		JSONObject item = new JSONObject();
		item.put("equip_total", equip_total);
		item.put("new_count", new_count);
		item.put("repair_count", repair_count);
		item.put("maint_count", maint_count);
		item.put("going_destroy_count", going_destroy_count);
		JSONObject result = new JSONObject();
		result.put(Result.RESULT, Result.SUCCESS);
		result.put(Result.RESULTMSG, "");
		result.put("Item", item);
		return result.toJSONString();
	}
	@Override
	public String queryEquipList(JSONObject jsonObject) throws Exception {
		String project_id = jsonObject.getString("project_id");
		String build_id = jsonObject.getString("build_id");
		String domain_code = jsonObject.getString("domain_code");
		String system_id = jsonObject.getString("system_id");
		String keyword = jsonObject.getString("keyword");
		Boolean valid = jsonObject.getBoolean("valid");
		Integer page = jsonObject.getInteger("page");
		Integer page_size = jsonObject.getInteger("page_size");
		String secret = projectCache.getProjectSecretById(project_id);
		if(!StringUtil.isNull(build_id) && !StringUtil.isNull(system_id)) {
			String build_id_temp = StringUtil.transferId(system_id, CommonConst.tag_build);
			if(!build_id_temp.equals(build_id)) {
				JSONObject result = new JSONObject();
				result.put(Result.CONTENT, new JSONArray());
				result.put(Result.RESULT, Result.SUCCESS);
				result.put(Result.COUNT, 0);
				return result.toJSONString();
			}
		}
		
		jsonObject.clear();
		jsonObject.put("valid", valid);
		
		if(page ==  null || page < 1) {
			page = 1;
		}
		if(page_size != null && page_size > 0) {
			int skip = (page - 1) * page_size;
			JSONObject limit = new JSONObject();
			limit.put("skip", skip);
			limit.put("count", page_size);
			jsonObject.put("limit", limit);
		} 
		
		JSONObject criteria = new JSONObject();
		if(!StringUtil.isNull(keyword)) {
			criteria.put("name", keyword);
		}
		if(!StringUtil.isNull(system_id)) {
			String graph_id = graphCache.getGraphIdByProjectIdAndGraph(project_id, "SystemEquip");
			criteria.put("system_id", system_id);
			criteria.put("graph_id", graph_id);
			criteria.put("rel_type", "1");
		} else {
			if(!StringUtil.isNull(build_id)) {
				criteria.put("building_id", build_id);
			}
			domain_code =  domain_code == null ? "" : domain_code;
			criteria.put("category", domain_code);
		}
		
		if(!criteria.isEmpty()) {
			jsonObject.put("criteria", criteria);
		}
		
		
		
		
		Calendar calendar = Calendar.getInstance();
		Date nowDate = calendar.getTime();
		nowDate = DateUtil.parseDate(DateUtil.sdfDay, DateUtil.formatStr(DateUtil.sdfDay, nowDate));
		
		Date monthday = DateUtil.parseDate(DateUtil.sdfMonth, DateUtil.formatStr(DateUtil.sdfMonth, nowDate));
		calendar.setTime(monthday);
		calendar.add(Calendar.MONTH, -6);
		Date limitDay = calendar.getTime();
		String requestUrl = getDataPlatformPath(DataRequestPathUtil.dataPlat_equipment_complex_query, project_id, secret);
		String queryResult = httpPostRequest(requestUrl, jsonObject.toJSONString());
		JSONObject queryJson = JSONObject.parseObject(queryResult);
		if(Result.FAILURE.equals(queryJson.getString(Result.RESULT))) {
			return queryResult;
		}
		JSONArray queryContents = queryJson.getJSONArray(Result.CONTENT);
		if(queryContents != null && queryContents.size() > 0) {
			int size = queryContents.size();
			JSONArray contents = new JSONArray();
			JSONArray criterias = new JSONArray();
			String graph_id = graphCache.getGraphIdByProjectIdAndGraph(project_id, "EquipinSpace");
			Set<String> ids = new HashSet<>();
			for (int i = 0; i < size; i++) {
				criteria = new JSONObject();
				JSONObject queryContent = queryContents.getJSONObject(i);
				String equip_id = queryContent.getString("id");
				String build_id_temp = StringUtil.transferId(equip_id, CommonConst.tag_build);
				ids.add(build_id_temp);
				criteria.put("from_id", equip_id);
				criteria.put("graph_id", graph_id);
				criteria.put("rel_type", "1");
				criterias.add(criteria);
				String create_time = queryContent.getString("create_time");
				String equip_local_id = "";
				String equip_local_name = "";
				String specification = "";
				String supplier = "";
				String destroy_remind = "";
				String expect_scrap_date = "";
				JSONObject infos = queryContent.getJSONObject("infos");
				if(infos != null) {
					equip_local_id = infos.getString("EquipLocalID");
					equip_local_name = infos.getString("EquipLocalName");
					specification = infos.getString("Specification");
					supplier = infos.getString("Supplier");
					expect_scrap_date = infos.getString("ExpectScrapDate");
				}
				
				
				String destroy_remind_type = "";
				if(!StringUtil.isNull(expect_scrap_date)) {
					Date expectScrapDate = DateUtil.parseDate(DateUtil.sdftime, expect_scrap_date);
					long day = 0l;
					
					if(expectScrapDate.compareTo(nowDate) == 1) {
						//超期
						destroy_remind_type = "2";
						day = (expectScrapDate.getTime() - nowDate.getTime()) / (1000 * 60 * 60 * 24);
						destroy_remind = "已超长使用";
						long year = day / 365l;
						if(year > 0 ) {
							long subday = year % 365l;
							long month = subday / 30l;
							destroy_remind = destroy_remind + year + "年";
							if(month > 0) {
								destroy_remind = destroy_remind + month + "个月";
							} else {
								destroy_remind = destroy_remind + subday + "天";
							}
						} else {
							long month = day / 30l;
							destroy_remind = destroy_remind + month + "个月";
						}
					} else if(expectScrapDate.compareTo(limitDay) == 1) {
						//即将报废
						destroy_remind_type = "1";
						day = (expectScrapDate.getTime() - nowDate.getTime()) / (1000 * 60 * 60 * 24);
						long month = day / 30;
						destroy_remind = "距离报废时间" + (month + 1) + "个月";
					} 
				}
				JSONObject item = new JSONObject();
				item.put("equip_id", equip_id);
				item.put("equip_local_id", equip_local_id);
				item.put("equip_local_name", equip_local_name);
				item.put("specification", specification);
				
				item.put("supplier", supplier);
				item.put("create_time", create_time);
				item.put("destroy_remind_type", destroy_remind_type);
				item.put("destroy_remind", destroy_remind);
				contents.add(item);
			}
			//查询关系
			Map<String, String> equipSpaceMap = new HashMap<>();
			if(criterias.size() > 0) {
				jsonObject.clear();
				jsonObject.put("merge", true);
				jsonObject.put("criterias", criterias);
				
				equipSpaceMap = objectService.queryEquipSpaceSystemMap(jsonObject, project_id, secret);
				if(equipSpaceMap.size() > 0) {
					for (String space_id : equipSpaceMap.values()) {
						String floor_id = StringUtil.transferId(space_id, CommonConst.tag_floor);
						ids.add(space_id);
						ids.add(floor_id);
					}
				}
				
			}
			//查询建筑楼层信息
			Map<String, JSONObject> objectMap = new HashMap<>();
			if(ids.size() > 0) {
				objectMap = queryBatchObject(project_id, secret, ids);
			}
			if(objectMap.size() > 0) {
				for (int i = 0; i < contents.size(); i++) {
					JSONObject content = contents.getJSONObject(i);
					String position = "";
					String equip_id = content.getString("equip_id");
					String build_id_temp = StringUtil.transferId(equip_id, CommonConst.tag_build);
					String build_name = getObjectInfoValue(build_id_temp, objectMap, "BuildLocalName");
					if(!StringUtil.isNull(build_name)) {
						position = position + build_name;
					}
					String space_id = equipSpaceMap.get(equip_id);
					if(!StringUtil.isNull(space_id)) {
						String floor_id = StringUtil.transferId(space_id, CommonConst.tag_floor);
						String floor_name = getObjectInfoValue(floor_id, objectMap, "FloorLocalName");
						if(!StringUtil.isNull(floor_name)) {
							position = position + "-" + floor_name;
						}
						String space_name = getObjectInfoValue(space_id, objectMap, "RoomLocalName");
						if(!StringUtil.isNull(space_name)) {
							position = position + "-" + space_name;
						}
					}
					if(position.startsWith("-")) {
						position = position.substring(1, position.length());
					}
					content.put("position", position);
					
				}
				
			}
			queryJson.put(Result.CONTENT, contents);	
			queryJson.put(Result.COUNT, contents.size());	
			queryResult = queryJson.toJSONString();
		}
		return queryResult;
	}
	
	
	@Override
	public String queryRepairEquipList(JSONObject jsonObject) throws Exception {
		jsonObject.put("order_type", "2");
		return queryRepairOrMaintEquipList(jsonObject);
	}
	
	@Override
	public String queryMaintEquipList(JSONObject jsonObject) throws Exception {
		jsonObject.put("order_type", "1");
		return queryRepairOrMaintEquipList(jsonObject);
	}
	public String queryRepairOrMaintEquipList(JSONObject jsonObject) throws Exception {
		String order_type = jsonObject.getString("order_type");
		String project_id = jsonObject.getString("project_id");
		String build_id = jsonObject.getString("build_id");
		String domain_code = jsonObject.getString("domain_code");
		Integer page = jsonObject.getInteger("page");
		Integer page_size = jsonObject.getInteger("page_size");
		String secret = projectCache.getProjectSecretById(project_id);
		
		if(page ==  null || page < 1) {
			page = 1;
		}
		
		jsonObject.clear();
		jsonObject.put(DBConst.TABLE_FIELD_VALID, true);
		jsonObject.put("project_id", project_id);
		jsonObject.put("obj_type", "equip");
		jsonObject.put("order_type", order_type);
		jsonObject = JSONUtil.getCriteriaWithMajors(jsonObject, DBConst.TABLE_FIELD_VALID,
				"project_id","obj_type","order_type");
		String queryResult = DBCommonMethods.queryRecordByCriteria(DBConst.DATABASE_WORK_ORDER, DBConst.TABLE_OBJ_WO_REL, jsonObject.toJSONString());
		JSONObject queryJson = JSONObject.parseObject(queryResult);
		if(Result.FAILURE.equals(queryJson.getString(Result.RESULT))) {
			return queryResult;
		}
		JSONArray queryContents = queryJson.getJSONArray(Result.CONTENT);
		//待查询设备详情id
		JSONArray criterias = new JSONArray();
		//待查询设备所在空间id
		JSONArray graphCriterias = new JSONArray();
		//对象(设备、楼层、建筑)id
		Set<String> ids = new HashSet<>();
		//工单id
		Set<String> workOrderIds = new HashSet<>();
		if(queryContents != null && queryContents.size() > 0) {
			queryContents = JSONUtil.sortByStringField(queryContents, "company_name", 1);
			int size = queryContents.size();
			int skip = 0;
			if(page_size != null && page_size > 0) {
				skip = (page - 1) * page_size;
			}
			int count = 0;
			String graph_id = graphCache.getGraphIdByProjectIdAndGraph(project_id, "EquipinSpace");
			for (int i = 0; i < size; i++) {
				JSONObject queryContent = queryContents.getJSONObject(i);
				String equip_id = queryContent.getString("obj_id");
				String domain_code_temp = StringUtil.getEquipOrSystemCodeFromId(equip_id, CommonConst.tag_dict_class);
				String build_id_temp = StringUtil.transferId(equip_id, CommonConst.tag_build);
				if(!StringUtil.isNull(build_id)) {
					if(!build_id.contains(build_id_temp)) {
						continue;
					}
				}
				if(!StringUtil.isNull(domain_code)) {
					if(!domain_code.contains(domain_code_temp)) {
						continue;
					}
				}
				if(skip > 0) {
					skip--;
					continue;
				}
				
				count++;
				//查询设备新详情条件
				JSONObject criteria = new JSONObject();
				criteria.put("id", equip_id);
				criterias.add(criteria);
				//查询设备所在空间条件
				JSONObject graphCriteria = new JSONObject();
				graphCriteria.put("from_id", equip_id);
				graphCriteria.put("graph_id", graph_id);
				graphCriteria.put("rel_type", "1");
				graphCriterias.add(graphCriteria);
				//查询设备相关工单条件
				JSONArray order_ids = ObjWoRelCache.getOrderIdsByObjIdOrderType(equip_id + "-" + order_type);
				if(order_ids != null && order_ids.size() > 0) {
					for (int k = 0; k < order_ids.size(); k++) {
						String order_id = order_ids.getString(k);
						workOrderIds.add(order_id);
					}
				}
				//
				ids.add(build_id_temp);
				if(page_size != null && page_size > 0 && count >= page_size) {
					break;
				}
			}
		}
		//查询设备所在空间关系
		Map<String, String> equipSpaceMap = new HashMap<>();
		if(graphCriterias.size() > 0) {
			jsonObject.clear();
			jsonObject.put("merge", true);
			jsonObject.put("criterias", graphCriterias);
			
			equipSpaceMap = objectService.queryEquipSpaceSystemMap(jsonObject, project_id, secret);
			if(equipSpaceMap.size() > 0) {
				for (String space_id : equipSpaceMap.values()) {
					String floor_id = StringUtil.transferId(space_id, CommonConst.tag_floor);
					ids.add(space_id);
					ids.add(floor_id);
				}
			}
			
		}
		//查询建筑楼层空间信息
		Map<String, JSONObject> objectMap = new HashMap<>();
		if(ids.size() > 0) {
			objectMap = queryBatchObject(project_id, secret, ids);
		}
		
		
		//查询设备相关工单条件
		Map<String, JSONObject> workMap = new HashMap<>();
		if(workOrderIds.size() > 0) {
			workMap = workOrderService.queryWorkOrderByIds(workOrderIds);
		}
		
		
		JSONArray contents = new JSONArray();
		
		if(criterias.size() > 0) {
			jsonObject.clear();
			jsonObject.put("criterias", criterias);
			
			String requestUrl = getDataPlatformPath(DataRequestPathUtil.dataPlat_object_batch_query, project_id, secret);
			queryResult = httpPostRequest(requestUrl, jsonObject.toJSONString());
			queryJson = JSONObject.parseObject(queryResult);
			if(Result.FAILURE.equals(queryJson.getString(Result.RESULT))) {
				return queryResult;
			}
			
			queryContents = queryJson.getJSONArray(Result.CONTENT);
			for (int i = 0; i < queryContents.size(); i++) {
				JSONObject queryContent= queryContents.getJSONObject(i);
				String equip_id = queryContent.getString("id");
				String build_id_temp = StringUtil.transferId(equip_id, CommonConst.tag_build);
				String create_time = queryContent.getString("create_time");
				queryContent = queryContent.getJSONObject("infos");
				JSONObject content = new JSONObject();
				content.put("equip_id", equip_id);
				content.put("create_time", create_time);
				String equip_local_id = "";
				String equip_local_name = "";
				String specification = "";
				String maintainer = "";
				if(queryContent != null) {
					equip_local_id = queryContent.getString("EquipLocalID");
					equip_local_name = queryContent.getString("EquipLocalName");
					specification = queryContent.getString("Specification");
					maintainer = queryContent.getString("Maintainer");
				}
				content.put("equip_local_id", equip_local_id);
				content.put("equip_local_name", equip_local_name);
				content.put("specification", specification);
				content.put("maintainer", maintainer);
				//所在位置
				String position = "";
				
				String build_name = getObjectInfoValue(build_id_temp, objectMap, "BuildLocalName");
				if(!StringUtil.isNull(build_name)) {
					position = position + build_name;
				}
				String space_id = equipSpaceMap.get(equip_id);
				if(!StringUtil.isNull(space_id)) {
					String floor_id = StringUtil.transferId(space_id, CommonConst.tag_floor);
					String floor_name = getObjectInfoValue(floor_id, objectMap, "FloorLocalName");
					if(!StringUtil.isNull(floor_name)) {
						position = position + "-" + floor_name;
					}
					String space_name = getObjectInfoValue(space_id, objectMap, "RoomLocalName");
					if(!StringUtil.isNull(space_name)) {
						position = position + "-" + space_name;
					}
				}
				if(position.startsWith("-")) {
					position = position.substring(1, position.length());
				}
				content.put("position", position);
				
				JSONArray work_orders = new JSONArray();
				JSONArray order_ids = ObjWoRelCache.getOrderIdsByObjIdOrderType(equip_id + "-" + "2");
				if(order_ids != null && order_ids.size() > 0) {
					for (int k = 0; k < order_ids.size(); k++) {
						String order_id = order_ids.getString(k);
						JSONObject work_order = new JSONObject();
						
						JSONObject workOrderBody = workMap.get(order_id);
						String order_state_desc = "";
						String summary = "";
						if(workOrderBody != null) {
							order_state_desc = workOrderBody.getString("order_state_name");
							summary = workOrderBody.getString("summary");
						}
						work_order.put("order_id", order_id);
						work_order.put("order_state_desc", order_state_desc);
						work_order.put("summary", summary);
						
						work_orders.add(work_order);
					}
				}
				content.put("work_orders", work_orders);
				contents.add(content);
			}
			
		}
		queryJson.put(Result.CONTENT, contents);
		queryJson.put(Result.COUNT, contents.size());
		queryResult = queryJson.toJSONString();
		return queryResult;
	}
	
	
	@Override
	public String queryGoingDestroyEquipList(JSONObject jsonObject) throws Exception {
		String project_id = jsonObject.getString("project_id");
		String build_id = jsonObject.getString("build_id");
		String domain_code = jsonObject.getString("domain_code");
		
		Integer page = jsonObject.getInteger("page");
		Integer page_size = jsonObject.getInteger("page_size");
		String secret = projectCache.getProjectSecretById(project_id);
		
		if(page ==  null || page < 1) {
			page = 1;
		}
		
		
		jsonObject.clear();
		JSONObject criteria = new JSONObject();
		JSONArray type = new JSONArray();
		type.add("Eq");
		criteria.put("type", type);
		jsonObject.put("valid", true);
		JSONObject info = new JSONObject();
		JSONObject expectScrapDateObj = new JSONObject();
		
		Calendar calendar = Calendar.getInstance();
		Date nowDate = calendar.getTime();
		nowDate = DateUtil.parseDate(DateUtil.sdfDay, DateUtil.formatStr(DateUtil.sdfDay, nowDate));
		Date monthday = DateUtil.parseDate(DateUtil.sdfMonth, DateUtil.formatStr(DateUtil.sdfMonth, nowDate));
		calendar.setTime(monthday);
		calendar.add(Calendar.MONTH, -6);
		Date limitDay = calendar.getTime();
		String limitDay_str = DateUtil.formatStr(DateUtil.sdftime, limitDay);
		expectScrapDateObj.put("$gte", limitDay_str);
		info.put("ExpectScrapDate", expectScrapDateObj);
		JSONArray infos = new JSONArray();
		infos.add(info);
		criteria.put("infos", infos);
		jsonObject.put("criteria", criteria);
		String requestUrl = getDataPlatformPath(DataRequestPathUtil.dataPlat_object_query_by_info, project_id, secret);
		String queryResult = httpPostRequest(requestUrl, jsonObject.toJSONString());
		JSONObject queryJson = JSONObject.parseObject(queryResult);
		if(Result.FAILURE.equals(queryJson.getString(Result.RESULT))) {
			return queryResult;
		}
		JSONArray queryContents = queryJson.getJSONArray(Result.CONTENT);
		JSONArray contents = new JSONArray();
		//待查询设备所在空间id
		JSONArray graphCriterias = new JSONArray();
		//对象(设备、楼层、建筑)id
		Set<String> ids = new HashSet<>();
		if(queryContents != null && queryContents.size() > 0) {
			int size = queryContents.size();
			int skip = 0;
			if(page_size != null && page_size > 0) {
				skip = (page - 1) * page_size;
			}
			int count = 0;
			String graph_id = graphCache.getGraphIdByProjectIdAndGraph(project_id, "EquipinSpace");
			for (int i = 0; i < size; i++) {
				JSONObject queryContent = queryContents.getJSONObject(i);
				String equip_id = queryContent.getString("id");
				String domain_code_temp = StringUtil.getEquipOrSystemCodeFromId(equip_id, CommonConst.tag_dict_class);
				String build_id_temp = StringUtil.transferId(equip_id, CommonConst.tag_build);
				if(!StringUtil.isNull(build_id)) {
					if(!build_id.contains(build_id_temp)) {
						continue;
					}
				}
				if(!StringUtil.isNull(domain_code)) {
					if(!domain_code.contains(domain_code_temp)) {
						continue;
					}
				}
				if(skip > 0) {
					skip--;
					continue;
				}
				
				count++;
				JSONObject content = new JSONObject();
				String equip_local_id = "";
				String equip_local_name = "";
				String specification = "";
				String maintainer = "";
				String start_date = "";
				String service_life = "";
				String expect_scrap_date = "";
				queryContent = queryContent.getJSONObject("infos");
				if(queryContent != null) {
					equip_local_id = queryContent.getString("EquipLocalID");
					equip_local_name = queryContent.getString("EquipLocalName");
					specification = queryContent.getString("Specification");
					maintainer = queryContent.getString("Maintainer");
					start_date = queryContent.getString("StartDate");
					service_life = queryContent.getString("ServiceLife");
					expect_scrap_date = queryContent.getString("ExpectScrapDate");
				}
				
				
				String destroy_remind = "";
				String destroy_remind_type = "";
				if(!StringUtil.isNull(expect_scrap_date)) {
					Date expectScrapDate = DateUtil.parseDate(DateUtil.sdftime, expect_scrap_date);
					long day = 0l;
					
					if(expectScrapDate.compareTo(nowDate) == 1) {
						//超期
						destroy_remind_type = "2";
						day = (expectScrapDate.getTime() - nowDate.getTime()) / (1000 * 60 * 60 * 24);
						destroy_remind = "已超长使用";
						long year = day / 365l;
						if(year > 0 ) {
							long subday = year % 365l;
							long month = subday / 30l;
							destroy_remind = destroy_remind + year + "年";
							if(month > 0) {
								destroy_remind = destroy_remind + month + "个月";
							} else {
								destroy_remind = destroy_remind + subday + "天";
							}
						} else {
							long month = day / 30l;
							destroy_remind = destroy_remind + month + "个月";
						}
					} else if(expectScrapDate.compareTo(limitDay) == 1) {
						//即将报废
						destroy_remind_type = "1";
						day = (expectScrapDate.getTime() - nowDate.getTime()) / (1000 * 60 * 60 * 24);
						long month = day / 30;
						destroy_remind = "距离报废时间" + (month + 1) + "个月";
					} 
				}
				
				content.put("equip_id", equip_id);
				content.put("equip_local_id", equip_local_id);
				content.put("equip_local_name", equip_local_name);
				content.put("specification", specification);
				content.put("maintainer", maintainer);
				content.put("start_date", start_date);
				content.put("service_life", service_life);
				content.put("destroy_remind_type", destroy_remind_type);
				content.put("destroy_remind", destroy_remind);
				
				//查询设备所在空间条件
				JSONObject graphCriteria = new JSONObject();
				graphCriteria.put("from_id", equip_id);
				graphCriteria.put("graph_id", graph_id);
				graphCriteria.put("rel_type", "1");
				graphCriterias.add(graphCriteria);
				
				ids.add(build_id_temp);
				contents.add(content);
				if(page_size != null && page_size > 0 && count >= page_size) {
					break;
				}
				
			}
		}
		
		//查询设备所在空间关系
		Map<String, String> equipSpaceMap = new HashMap<>();
		if(graphCriterias.size() > 0) {
			jsonObject.clear();
			jsonObject.put("merge", true);
			jsonObject.put("criterias", graphCriterias);
			
			equipSpaceMap = objectService.queryEquipSpaceSystemMap(jsonObject, project_id, secret);
			if(equipSpaceMap.size() > 0) {
				for (String space_id : equipSpaceMap.values()) {
					String floor_id = StringUtil.transferId(space_id, CommonConst.tag_floor);
					ids.add(space_id);
					ids.add(floor_id);
				}
			}
			
		}
		//查询建筑楼层空间信息
		Map<String, JSONObject> objectMap = new HashMap<>();
		if(ids.size() > 0) {
			objectMap = queryBatchObject(project_id, secret, ids);
		}
		for (int i = 0; i < contents.size(); i++) {
			
			JSONObject content = contents.getJSONObject(i);
			String equip_id = content.getString("equip_id");
			String build_id_temp = StringUtil.transferId(equip_id, CommonConst.tag_build);
			//所在位置
			String position = "";
			
			String build_name = getObjectInfoValue(build_id_temp, objectMap, "BuildLocalName");
			if(!StringUtil.isNull(build_name)) {
				position = position + build_name;
			}
			String space_id = equipSpaceMap.get(equip_id);
			if(!StringUtil.isNull(space_id)) {
				String floor_id = StringUtil.transferId(space_id, CommonConst.tag_floor);
				String floor_name = getObjectInfoValue(floor_id, objectMap, "FloorLocalName");
				if(!StringUtil.isNull(floor_name)) {
					position = position + "-" + floor_name;
				}
				String space_name = getObjectInfoValue(space_id, objectMap, "RoomLocalName");
				if(!StringUtil.isNull(space_name)) {
					position = position + "-" + space_name;
				}
			}
			if(position.startsWith("-")) {
				position = position.substring(1, position.length());
			}
			content.put("position", position);
		}
		queryJson.put(Result.CONTENT, contents);
		queryJson.put(Result.COUNT, contents.size());
		queryResult = queryJson.toJSONString();
		
		
		return queryResult;
	}
	@Override
	public String verifyDestroyEquip(JSONObject jsonObject) throws Exception {
		String equip_id = jsonObject.getString("equip_id");
		boolean can_destroy = true;
		String remind = "";
		jsonObject.clear();
		jsonObject.put("obj_id", equip_id);
		jsonObject.put(DBConst.TABLE_FIELD_VALID, true);
		jsonObject = JSONUtil.getCriteriaWithMajors(jsonObject, DBConst.TABLE_FIELD_VALID, "obj_id");
		String queryResult = DBCommonMethods.queryRecordByCriteria(DBConst.DATABASE_WORK_ORDER, DBConst.TABLE_WO_PLAN_OBJ_RELATION, jsonObject.toJSONString());
		JSONObject queryJson = JSONObject.parseObject(queryResult);
		if(Result.FAILURE.equals(queryJson.getString(Result.RESULT))) {
			return queryResult;
		}
		Integer count = queryJson.getInteger(Result.COUNT);
		if(count > 0) {
			can_destroy = false;
			remind = "工单计划中包含此设备，不可报废!";
		}
		JSONObject item = new JSONObject();
		item.put("can_destroy", can_destroy);
		item.put("remind", remind);
		queryJson.remove(Result.CONTENT);
		queryJson.remove(Result.COUNT);
		queryJson.put("Item", item);
		
		queryResult = queryJson.toJSONString();
		
		return queryResult;
	}
	@Override
	public String destroyEquip(JSONObject jsonObject) throws Exception {
		String project_id = jsonObject.getString("project_id");
		String equip_id = jsonObject.getString("equip_id");
		String secret = projectCache.getProjectSecretById(project_id);
		jsonObject.clear();
		JSONObject criteria = new JSONObject();
		criteria.put("id", equip_id);
		jsonObject.put("criteria", criteria);
		
		String requestUrl = getDataPlatformPath(DataRequestPathUtil.dataPlat_object_equipment_delete, project_id, secret);
		String queryResult = httpPostRequest(requestUrl, jsonObject.toJSONString());
		JSONObject queryJson = JSONObject.parseObject(queryResult);
		if(Result.FAILURE.equals(queryJson.getString(Result.RESULT))) {
			return queryResult;
		}
		//删除设备所在空间 关系
		JSONArray criterias = new JSONArray();
		String graph_id = graphCache.getGraphIdByProjectIdAndGraph(project_id, "EquipinSpace");
		if(StringUtil.isNull(graph_id)) {
			//增加设备所在空间图实例
			criteria = new JSONObject();
			criteria.put("from_id", equip_id);
			criteria.put("graph_id", graph_id);
			criteria.put("rel_type", "1");
			criterias.add(criteria);
		}
		//删除系统包含的设备 关系
		graph_id = graphCache.getGraphIdByProjectIdAndGraph(project_id, "SystemEquip");
		if(StringUtil.isNull(graph_id)) {
			//增加设备所在空间图实例
			criteria = new JSONObject();
			criteria.put("to_id", equip_id);
			criteria.put("graph_id", graph_id);
			criteria.put("rel_type", "1");
			criterias.add(criteria);
		}
		if(criterias.size() > 0) {
			jsonObject.clear();
			jsonObject.put("criterias", criterias);
			requestUrl = getDataPlatformPath(DataRequestPathUtil.dataPlat_relation_delete, project_id, secret);
			queryResult = httpPostRequest(requestUrl, jsonObject.toJSONString());
			queryJson = JSONObject.parseObject(queryResult);
			if(Result.FAILURE.equals(queryJson.getString(Result.RESULT))) {
				queryJson.put(Result.RESULTMSG, "设备删除成功,但关系注销失败！");
				return queryResult;
			}
		}
		JSONObject result = new JSONObject();
		result.put(Result.RESULT, Result.SUCCESS);
		result.put(Result.RESULTMSG, "删除成功！");
		return result.toJSONString();
	}
	@Override
	public String queryEquipCardInfo(JSONObject jsonObject) throws Exception {
		String project_id = jsonObject.getString("project_id");
		String equip_id = jsonObject.getString("equip_id");
		String secret = projectCache.getProjectSecretById(project_id);
		JSONArray card_info = objectService.queryObjCardStyle("equip");
		Map<String, String> cardInfoMap = new HashMap<>();
		for (int i = 0; i < card_info.size(); i++) {
			JSONObject obj = card_info.getJSONObject(i);
			String info_point_code = obj.getString("info_point_code");
			if("not_have".equals(info_point_code)) {
				card_info.remove(i);
				i--;
			} else {
				cardInfoMap.put(info_point_code, "");
			}
		}
		JSONArray criterias = new JSONArray();
		JSONObject criteria = new JSONObject();
		criteria.put("id", equip_id);
		criterias.add(criteria);
		
		jsonObject.clear();
		
		jsonObject.put("criterias", criterias);
		
		String requestUrl = getDataPlatformPath(DataRequestPathUtil.dataPlat_object_batch_query, project_id, secret);
		String queryResult = httpPostRequest(requestUrl, jsonObject.toJSONString());
		JSONObject queryJson = JSONObject.parseObject(queryResult);
		if(Result.FAILURE.equals(queryJson.getString(Result.RESULT))) {
			return queryResult;
		}
		JSONArray queryContents = queryJson.getJSONArray(Result.CONTENT);
		Set<String> ids = new HashSet<>();
		JSONArray spaceRelCriterias = new JSONArray();
		JSONArray systemRelCriterias = new JSONArray();
		String equip_qr_code = "";
		if(queryContents != null && queryContents.size() > 0) {
			String equipinSpace_graph_id = graphCache.getGraphIdByProjectIdAndGraph(project_id, "EquipinSpace");
			String systemEquip_graph_id = graphCache.getGraphIdByProjectIdAndGraph(project_id, "SystemEquip");
			//设备类型
			Map<String, String> equipmentCategoryMap = dictionaryService.queryEquipmentCategory();
			
			
			
			JSONObject queryContent = queryContents.getJSONObject(0);
			
			cardInfoMap.put("equip_id", equip_id);
			
			JSONObject infos = queryContent.getJSONObject("infos");
			if(infos != null) {
				equip_qr_code = infos.getString("EquipQRCode");
				equip_qr_code = equip_qr_code == null ? "" : equip_qr_code;
				cardInfoMap.put("equip_qr_code", equip_qr_code);
				
				if(cardInfoMap.containsKey("equip_local_name")) {
					//设备名称
					String equip_local_name = infos.getString("EquipLocalName");
					equip_local_name = equip_local_name == null ? "" : equip_local_name;
					cardInfoMap.put("equip_local_name", equip_local_name);
				} 
				if(cardInfoMap.containsKey("equip_local_id")) {
					//设备编码
					String equip_local_id = infos.getString("EquipLocalID");
					equip_local_id = equip_local_id == null ? "" : equip_local_id;
					cardInfoMap.put("equip_local_id", equip_local_id);
				}
				if(cardInfoMap.containsKey("specification")) {
					//设备型号
					String specification = infos.getString("Specification");
					specification = specification == null ? "" : specification;
					cardInfoMap.put("specification", specification);
				}
				if(cardInfoMap.containsKey("equip_category")) {
					//设备类型
					String category = StringUtil.getEquipOrSystemCodeFromId(equip_id, CommonConst.tag_dict_equip);
					String equip_category = equipmentCategoryMap.get(category);
					equip_category = equip_category == null ? "" : equip_category;
					cardInfoMap.put("equip_category", equip_category);
				} 
				if(cardInfoMap.containsKey("position")) {
					//安装位置
					cardInfoMap.put("position", "");
					String build_id = StringUtil.transferId(equip_id, CommonConst.tag_build);
					ids.add(build_id);
					criteria = new JSONObject();
					criteria.put("from_id", equip_id);
					criteria.put("graph_id", equipinSpace_graph_id);
					criteria.put("rel_type", "1");
					spaceRelCriterias.add(criteria);
				} 
				if(cardInfoMap.containsKey("system_id")) {
					//所属系统
					cardInfoMap.put("system_id", "");
					criteria = new JSONObject();
					criteria.put("to_id", equip_id);
					criteria.put("graph_id", systemEquip_graph_id);
					criteria.put("rel_type", "1");
					systemRelCriterias.add(criteria);
				} 
				if(cardInfoMap.containsKey("dept")) {
					//所属部门
					String dept = infos.getString("Dept");
					dept = dept == null ? "" : dept;
					cardInfoMap.put("dept", dept);
				} 
				if(cardInfoMap.containsKey("brand")) {
					//设备品牌
					String brand = infos.getString("Brand");
					brand = brand == null ? "" : brand;
					cardInfoMap.put("brand", brand);
				}
				if(cardInfoMap.containsKey("start_date")) {
					//投产日期
					String start_date = infos.getString("StartDate");
					start_date = start_date == null ? "" : start_date;
					cardInfoMap.put("start_date", start_date);
				} 
				if(cardInfoMap.containsKey("principal")) {
					//负责人
					String principal = infos.getString("Principal");
					principal = principal == null ? "" : principal;
					cardInfoMap.put("principal", principal);
				} 
				if(cardInfoMap.containsKey("service_life")) {
					//使用寿命
					String service_life = infos.getString("ServiceLife");
					service_life = service_life == null ? "" : service_life;
					cardInfoMap.put("service_life", service_life);
				}
				if(cardInfoMap.containsKey("maintainer")) {
					//维修商
					String maintainer = infos.getString("Maintainer");
					maintainer = maintainer == null ? "" : maintainer;
					cardInfoMap.put("maintainer", maintainer);
				} 
			}
		}
		//查询关系
		Map<String, String> equipSpaceMap = new HashMap<>();
		Map<String, String> equipSystemMap = new HashMap<>();
		if(spaceRelCriterias.size() > 0) {
			jsonObject.clear();
			jsonObject.put("merge", true);
			jsonObject.put("criterias", spaceRelCriterias);
			
			equipSpaceMap = objectService.queryEquipSpaceSystemMap(jsonObject, project_id, secret);
			if(equipSpaceMap.size() > 0) {
				for (String space_id : equipSpaceMap.values()) {
					String floor_id = StringUtil.transferId(space_id, CommonConst.tag_floor);
					ids.add(space_id);
					ids.add(floor_id);
				}
			}
		}
		if(systemRelCriterias.size() > 0) {
			jsonObject.put("criterias", systemRelCriterias);
			
			equipSystemMap = objectService.queryEquipSpaceSystemMap(jsonObject, project_id, secret);
			if(equipSystemMap.size() > 0) {
				for (String system_id : equipSystemMap.values()) {
					ids.add(system_id);
				}
			}
			
		}
		if(ids.size() > 0) {	
			//查询建筑楼层信息
			Map<String, JSONObject> objectMap = queryBatchObject(project_id, secret, ids);
			if(objectMap.size() > 0) {
				if(cardInfoMap.containsKey("position")) {
					//安装位置
					String position = "";
					String build_id = StringUtil.transferId(equip_id, CommonConst.tag_build);
					String build_name = getObjectInfoValue(build_id, objectMap, "BuildLocalName");
					if(!StringUtil.isNull(build_name)) {
						position = position + build_name;
					}
					String space_id = equipSpaceMap.get(equip_id);
					if(!StringUtil.isNull(space_id)) {
						String floor_id = StringUtil.transferId(space_id, CommonConst.tag_floor);
						String floor_name = getObjectInfoValue(floor_id, objectMap, "FloorLocalName");
						if(!StringUtil.isNull(floor_name)) {
							position = position + "-" + floor_name;
						}
						String space_name = getObjectInfoValue(space_id, objectMap, "RoomLocalName");
						if(!StringUtil.isNull(space_name)) {
							position = position + "-" + space_name;
						}
					}
					if(position.startsWith("-")) {
						position = position.substring(1, position.length());
					}
					cardInfoMap.put("position", position);
					
				} 
				if(cardInfoMap.containsKey("system_id")) {
					//所属系统
					String system_id = equipSystemMap.get(equip_id);
					String system_local_name = getObjectInfoValue(system_id, objectMap, "SysLocalName");
					if(system_local_name == null) {
						system_local_name = "";
					}
					cardInfoMap.put("system_id", system_local_name);
				}
			}
		}
		
		JSONObject content = new JSONObject();
		content.put("equip_id", equip_id);
		content.put("equip_qr_code", equip_qr_code);
		for (int i = 0; i < card_info.size(); i++) {
			JSONObject cardInfo = card_info.getJSONObject(i);
			String info_point_code = cardInfo.getString("info_point_code");
			String value = cardInfoMap.get(info_point_code);
			cardInfo.put("value", value);
		}
		content.put("card_info", card_info);
		JSONObject result = new JSONObject();
		result.put(Result.RESULT, Result.SUCCESS);
		result.put("Item", content);
		return result.toJSONString();
	}
	
	
}
