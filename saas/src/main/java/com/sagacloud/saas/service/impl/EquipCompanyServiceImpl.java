package com.sagacloud.saas.service.impl;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.sagacloud.saas.cache.ProjectCache;
import com.sagacloud.saas.common.DataRequestPathUtil;
import com.sagacloud.saas.common.DateUtil;
import com.sagacloud.saas.common.JSONUtil;
import com.sagacloud.saas.common.StringUtil;
import com.sagacloud.saas.common.ToolsUtil;
import com.sagacloud.saas.dao.DBCommonMethods;
import com.sagacloud.saas.dao.DBConst;
import com.sagacloud.saas.dao.DBConst.Result;
import com.sagacloud.saas.service.BaseService;
import com.sagacloud.saas.service.EquipCompanyServiceI;
/**
 * 功能描述：设备通信录
 * @author gezhanbin
 *
 */

@Service("equipCompanyService")
public class EquipCompanyServiceImpl extends BaseService implements EquipCompanyServiceI {
	@Autowired
	private ProjectCache projectCache;
	@Override
	public String addEquipCompany(JSONObject jsonObject) {
		String company_type = jsonObject.getString("company_type");
		JSONArray brands = jsonObject.getJSONArray("brands");
		JSONArray insurer_info = jsonObject.getJSONArray("insurer_info");
		jsonObject.remove("user_id");
		String company_id = DBConst.TABLE_EQUIP_COMPANY_BOOK_ID_TAG + DateUtil.getUtcTimeNow();
		jsonObject.put("company_id", company_id);
		if(brands != null && brands.size() > 0) {
			jsonObject  = JSONUtil.prossesParamToJsonString(jsonObject, "brands");
		}
		
		if(insurer_info != null && insurer_info.size() > 0) {
			jsonObject  = JSONUtil.prossesParamToJsonString(jsonObject, "insurer_info");
		}
		jsonObject.put(DBConst.TABLE_FIELD_UPDATE_TIME, DateUtil.getNowTimeStr());
		jsonObject = JSONUtil.getAddParamJson(jsonObject);
		return DBCommonMethods.insertRecord(DBConst.TABLE_EQUIP_COMPANY_BOOK, jsonObject.toJSONString());
	}

	@Override
	public String queryEquipCompanyById(JSONObject jsonObject) {
		jsonObject = JSONUtil.getKeyWithMajors(jsonObject, "company_id");
		String queryResult = DBCommonMethods.getRecordBykey(DBConst.TABLE_EQUIP_COMPANY_BOOK, jsonObject.toJSONString());
		JSONObject queryJson = JSONObject.parseObject(queryResult);
		if(Result.SUCCESS.equals(queryJson.getString(Result.RESULT))) {
			JSONArray queryContents = queryJson.getJSONArray(Result.CONTENT);
			JSONObject item = null;
			if(queryContents != null && queryContents.size() > 0) {
				item = queryContents.getJSONObject(0);
				String company_id = item.getString("company_id");
				String brands_str = item.getString("brands");
				JSONArray brands = null;
				if(!StringUtil.isNull(brands_str)) {
					brands = JSONArray.parseArray(brands_str);
				}
				item.put("brands", brands);
				
				String insurer_info_str = item.getString("insurer_info");
				JSONArray insurer_info = null;
				if(!StringUtil.isNull(insurer_info_str)) {
					insurer_info = JSONArray.parseArray(insurer_info_str);
				}
				item.put("insurer_info", insurer_info);
				item.remove(DBConst.TABLE_FIELD_VALID);
				jsonObject.clear();
				jsonObject.put(DBConst.TABLE_FIELD_VALID, true);
				jsonObject.put("company_id", company_id);
				jsonObject = JSONUtil.getCriteriaWithMajors(jsonObject, "company_id",DBConst.TABLE_FIELD_VALID);
				String queryRelResult = DBCommonMethods.queryRecordByCriteria(DBConst.TABLE_COMPANY_EQUIP_REL, jsonObject.toJSONString());
				JSONObject queryRelJson = JSONObject.parseObject(queryRelResult);
				Integer count = queryRelJson.getInteger(Result.COUNT);
				boolean can_delete = true; 
				if(count != null && count > 0) {
					can_delete = false;
				}
				item.put("can_delete", can_delete);
			}
			queryJson.put("Item", item);
			queryJson.remove(Result.CONTENT);
			queryJson.remove(Result.COUNT);
			queryResult = queryJson.toJSONString();
		}
		return queryResult;
	}

	@Override
	public String updateEquipCompanyById(JSONObject jsonObject) throws Exception {
		jsonObject.remove("user_id");
		String project_id = jsonObject.getString("project_id");
		String company_type = jsonObject.getString("company_type");
		String company_id = jsonObject.getString("company_id");
		String company_name = jsonObject.getString("company_name");
		String contacts = jsonObject.getString("contacts");
		String web = jsonObject.getString("web");
		String phone = jsonObject.getString("phone");
		String fax = jsonObject.getString("fax");
		String email = jsonObject.getString("email");
		JSONArray brands = jsonObject.getJSONArray("brands");
		JSONArray insurer_info = jsonObject.getJSONArray("insurer_info");
		
		//更新公司信息
		if(brands != null) {
			jsonObject.put("brands", brands.toJSONString());
		}
		if(insurer_info != null) {
			jsonObject.put("insurer_info", insurer_info.toJSONString());
		}
		jsonObject.put(DBConst.TABLE_FIELD_UPDATE_TIME, DateUtil.getNowTimeStr());
		jsonObject = JSONUtil.getUpdateParamJson(jsonObject, "company_id");
		
		String queryResult = DBCommonMethods.updateRecord(DBConst.TABLE_EQUIP_COMPANY_BOOK, jsonObject.toJSONString());
		JSONObject queryJson = JSONObject.parseObject(queryResult);
		if(Result.FAILURE.equals(queryJson.getString(Result.RESULT))) {
			return queryResult;
		}
		//更新公司关联的设备信息
		jsonObject.put(DBConst.TABLE_FIELD_VALID, true);
		jsonObject.put("company_id", company_id);
		jsonObject = JSONUtil.getCriteriaWithMajors(jsonObject, DBConst.TABLE_FIELD_VALID, "company_id");
		queryResult = DBCommonMethods.queryRecordByCriteria(DBConst.TABLE_COMPANY_EQUIP_REL, jsonObject.toJSONString());
		queryJson = JSONObject.parseObject(queryResult);
		if(Result.FAILURE.equals(queryJson.getString(Result.RESULT))) {
			return queryResult;
		}
		JSONArray queryContents = queryJson.getJSONArray(Result.CONTENT);
		if(queryContents != null && queryContents.size() > 0) {
			JSONArray criterias = new JSONArray();
			for (int i = 0; i < queryContents.size(); i++) {
				JSONObject queryContent = queryContents.getJSONObject(i);
				String equip_id = queryContent.getString("equip_id");
				
				JSONObject criteria = new JSONObject();
				criteria.put("id", equip_id);
				JSONObject infos = new JSONObject();
				
				if(!StringUtil.isNull(company_name)) {
					setEquipmentInfo(infos, "company_name", company_name, company_type);
				}
				if(!StringUtil.isNull(contacts)) {
					setEquipmentInfo(infos, "contacts", contacts, company_type);
				}
				if(!StringUtil.isNull(web)) {
					setEquipmentInfo(infos, "web", web, company_type);
				}
				if(!StringUtil.isNull(phone)) {
					setEquipmentInfo(infos, "phone", phone, company_type);
				}
				if(!StringUtil.isNull(fax)) {
					setEquipmentInfo(infos, "fax", fax, company_type);
				}
				if(!StringUtil.isNull(email)) {
					setEquipmentInfo(infos, "email", email, company_type);
				}
				criteria.put("infos", infos);
				criterias.add(criteria);
			}
			
			jsonObject.put("criterias", criterias);
			
			String secret = projectCache.getProjectSecretById(project_id);
			String requestUrl = getDataPlatformPath(DataRequestPathUtil.dataPlat_object_batch_update, project_id, secret);
			queryResult = httpPostRequest(requestUrl, jsonObject.toJSONString());
		}
		return queryResult;
	}
	
	private void setEquipmentInfo(JSONObject infos, String key, Object value, String company_type) {
		String paramKey = getEquipObjParam(company_type, key);
		if(!StringUtil.isNull(paramKey)) {
			JSONArray hisValues = new JSONArray();
			JSONObject hisValue = new JSONObject();
			hisValue.put("value", value);
			hisValues.add(hisValue);
			infos.put(paramKey, hisValues);
		}
	}
	
	private String getEquipObjParam(String company_type, String key) {
		Map<String, String> paramMap = new HashMap<>();
		switch (company_type) {
			case "1": {
				//供应商
				paramMap.put("company_name", "Supplier");
				paramMap.put("contacts", "SupplierContactor");
				paramMap.put("phone", "SupplierPhone");
				paramMap.put("web", "SupplierWeb");
				paramMap.put("fax", "SupplierFax");
				paramMap.put("email", "SupplierEmail");
				break;
			}
			case "2": {
				//生产厂家
				paramMap.put("company_name", "Manufacturer");
				break;
			}
			case "3": {
				//维修商
				paramMap.put("company_name", "Maintainer");
				paramMap.put("contacts", "MaintainerContactor");
				paramMap.put("phone", "MaintainerPhone");
				paramMap.put("web", "MaintainerWeb");
				paramMap.put("fax", "MaintainerFax");
				paramMap.put("email", "MaintainerEmail");
				break;
			}
			case "4": {
				//保险公司
				paramMap.put("company_name", "Insurer");
				paramMap.put("contacts", "InsurerContactor");
				paramMap.put("phone", "InsurerPhone");
				break;
			}
			default:
				break;
		}
		return paramMap.get(key);
	}

	@Override
	public String deleteEquipCompanyById(JSONObject jsonObject) throws Exception {
		jsonObject = JSONUtil.getCriteriaWithMajors(jsonObject, "company_id");
		return DBCommonMethods.deleteRecord(DBConst.TABLE_EQUIP_COMPANY_BOOK, jsonObject.toJSONString());
	}

	@Override
	public String queryEquipCompanyList(JSONObject jsonObject) throws Exception {
		Integer page = jsonObject.getInteger("page");
		Integer page_size = jsonObject.getInteger("page_size");
		
		if(page ==  null || page < 1) {
			page = 1;
		}
		jsonObject.put(DBConst.TABLE_FIELD_VALID, true);
		jsonObject = JSONUtil.getCriteriaWithMajors(jsonObject, DBConst.TABLE_FIELD_VALID,"project_id","company_type");
		String queryResult = DBCommonMethods.queryRecordByCriteria(DBConst.TABLE_EQUIP_COMPANY_BOOK, jsonObject.toJSONString());
		JSONObject queryJson = JSONObject.parseObject(queryResult);
		if(Result.FAILURE.equals(queryJson.getString(Result.RESULT))) {
			return queryResult;
		}
		JSONArray contents = new JSONArray();
		JSONArray queryContents = queryJson.getJSONArray(Result.CONTENT);
		if(queryContents != null && queryContents.size() > 0) {
			queryContents = JSONUtil.sortByStringField(queryContents, "company_name", 1);
			int size = queryContents.size();
			int skip = 0;
			int start = 0;
			if(page_size != null && page_size > 0) {
				skip = (page - 1) * page_size;
			}
			start = start + skip;
			if(start < size) {
				int count = 0;
				for (int i = start; i < size; i++) {
					count++;
					JSONObject queryContent = queryContents.getJSONObject(i);
					String brands_str = queryContent.getString("brands");
					JSONArray brands = null;
					if(!StringUtil.isNull(brands_str)) {
						brands = JSONArray.parseArray(brands_str);
					}
					queryContent.put("brands", brands);
					
					String insurer_info_str = queryContent.getString("insurer_info");
					JSONArray insurer_info = null;
					if(!StringUtil.isNull(insurer_info_str)) {
						insurer_info = JSONArray.parseArray(insurer_info_str);
					}
					queryContent.put("insurer_info", insurer_info);
					queryContent.remove(DBConst.TABLE_FIELD_CTEATE_TIME);
					queryContent.remove(DBConst.TABLE_FIELD_UPDATE_TIME);
					queryContent.remove(DBConst.TABLE_FIELD_VALID);
					contents.add(queryContent);
					if(page_size != null && page_size > 0 && count >= page_size) {
						break;
					}
				}
			}
		}
		queryJson.put(Result.CONTENT, contents);
		queryJson.put(Result.COUNT, contents.size());
		return queryJson.toJSONString();
	}

	@Override
	public String queryEquipCompanySel(JSONObject jsonObject) throws Exception {
		String company_name = jsonObject.getString("company_name");
		Integer page = jsonObject.getInteger("page");
		Integer page_size = jsonObject.getInteger("page_size");
		
		if(page ==  null || page < 1) {
			page = 1;
		}
		jsonObject.put(DBConst.TABLE_FIELD_VALID, true);
		jsonObject = JSONUtil.getCriteriaWithMajors(jsonObject, DBConst.TABLE_FIELD_VALID,"project_id","company_type");
		String queryResult = DBCommonMethods.queryRecordByCriteria(DBConst.TABLE_EQUIP_COMPANY_BOOK, jsonObject.toJSONString());
		JSONObject queryJson = JSONObject.parseObject(queryResult);
		if(Result.FAILURE.equals(queryJson.getString(Result.RESULT))) {
			return queryResult;
		}
		JSONArray contents = new JSONArray();
		JSONArray queryContents = queryJson.getJSONArray(Result.CONTENT);
		if(queryContents != null && queryContents.size() > 0) {
			queryContents = JSONUtil.sortByStringField(queryContents, "company_name", 1);
			int size = queryContents.size();
			int skip = 0;
			int start = 0;
			if(page_size != null && page_size > 0) {
				skip = (page - 1) * page_size;
			}
			int count = 0;
			for (int i = start; i < size; i++) {
				JSONObject queryContent = queryContents.getJSONObject(i);
				String company_name_temp = queryContent.getString("company_name");
				if(!StringUtil.isNull(company_name)) {
					if(!company_name.contains(company_name_temp)) {
						continue;
					}
				}
				if(skip > 0) {
					skip--;
					continue;
				}
				
				count++;
				String brands_str = queryContent.getString("brands");
				JSONArray brands = null;
				if(!StringUtil.isNull(brands_str)) {
					brands = JSONArray.parseArray(brands_str);
				}
				queryContent.put("brands", brands);
				
				String insurer_info_str = queryContent.getString("insurer_info");
				JSONArray insurer_info = null;
				if(!StringUtil.isNull(insurer_info_str)) {
					insurer_info = JSONArray.parseArray(insurer_info_str);
				}
				queryContent.put("insurer_info", insurer_info);
				queryContent.remove(DBConst.TABLE_FIELD_CTEATE_TIME);
				queryContent.remove(DBConst.TABLE_FIELD_UPDATE_TIME);
				queryContent.remove(DBConst.TABLE_FIELD_VALID);
				contents.add(queryContent);
				if(page_size != null && page_size > 0 && count >= page_size) {
					break;
				}
			}
		}
		queryJson.put(Result.CONTENT, contents);
		queryJson.put(Result.COUNT, contents.size());
		return queryJson.toJSONString();
	}

	@Override
	public String addCompanyBrand(JSONObject jsonObject) throws Exception {
		String brand = jsonObject.getString("brand");
		String company_id = jsonObject.getString("company_id");
		jsonObject = JSONUtil.getKeyWithMajors(jsonObject, "company_id");
		String queryResult = DBCommonMethods.getRecordBykey(DBConst.TABLE_EQUIP_COMPANY_BOOK, jsonObject.toJSONString());
		JSONObject queryJson = JSONObject.parseObject(queryResult);
		if(Result.FAILURE.equals(queryJson.getString(Result.RESULT))) {
			return queryResult;
		}
		JSONArray queryContents = queryJson.getJSONArray(Result.CONTENT);
		JSONObject item = null;
		if(queryContents == null || queryContents.size() == 0) {
			queryJson.put(Result.RESULT, Result.FAILURE);
			queryJson.put(Result.RESULTMSG, "公司不存在!");
			queryJson.remove(Result.CONTENT);
			queryJson.remove(Result.COUNT);
			queryResult = queryJson.toJSONString();
			return queryResult;
		}
		item = queryContents.getJSONObject(0);
		String brands_str = item.getString("brands");
		JSONArray brands = null;
		if(!StringUtil.isNull(brands_str)) {
			brands = JSONArray.parseArray(brands_str);
		}
		if(brands == null) {
			brands = new JSONArray();
		}
		if(brands.contains(brand)) {
			queryJson.put(Result.RESULT, Result.FAILURE);
			queryJson.put(Result.RESULTMSG, "公司中该品牌已存在!");
			queryJson.remove(Result.CONTENT);
			queryJson.remove(Result.COUNT);
			queryResult = queryJson.toJSONString();
			return queryResult;
		}
		brands.add(brand);
		jsonObject.clear();
		jsonObject.put("company_id", company_id);
		jsonObject.put("brands", brands.toJSONString());
		jsonObject.put(DBConst.TABLE_FIELD_UPDATE_TIME, DateUtil.getNowTimeStr());
		jsonObject = JSONUtil.getUpdateParamJson(jsonObject, "company_id");
		return DBCommonMethods.updateRecord(DBConst.TABLE_EQUIP_COMPANY_BOOK, jsonObject.toJSONString());
	}

	@Override
	public String addCompanyInsurerNum(JSONObject jsonObject) throws Exception {
		JSONObject insurer_info = jsonObject.getJSONObject("insurer_info");
		if(insurer_info == null || insurer_info.size() == 0) {
			return ToolsUtil.return_error_json;
		}
		String insurer_num = insurer_info.getString("insurer_num");
		String company_id = jsonObject.getString("company_id");
		jsonObject = JSONUtil.getKeyWithMajors(jsonObject, "company_id");
		String queryResult = DBCommonMethods.getRecordBykey(DBConst.TABLE_EQUIP_COMPANY_BOOK, jsonObject.toJSONString());
		JSONObject queryJson = JSONObject.parseObject(queryResult);
		if(Result.FAILURE.equals(queryJson.getString(Result.RESULT))) {
			return queryResult;
		}
		JSONArray queryContents = queryJson.getJSONArray(Result.CONTENT);
		JSONObject item = null;
		if(queryContents == null || queryContents.size() == 0) {
			queryJson.put(Result.RESULT, Result.FAILURE);
			queryJson.put(Result.RESULTMSG, "公司不存在!");
			queryJson.remove(Result.CONTENT);
			queryJson.remove(Result.COUNT);
			queryResult = queryJson.toJSONString();
			return queryResult;
		}
		item = queryContents.getJSONObject(0);
		String insurer_info_str = item.getString("insurer_info");
		JSONArray insurer_info_temp = null;
		if(!StringUtil.isNull(insurer_info_str)) {
			insurer_info_temp = JSONArray.parseArray(insurer_info_str);
		}
		if(insurer_info_temp == null) {
			insurer_info_temp = new JSONArray();
		}
		boolean exist = false;
		for (int i = 0; i < insurer_info_temp.size(); i++) {
			JSONObject insurer_info_temp_ = insurer_info_temp.getJSONObject(i);
			String insurer_num_temp = insurer_info_temp_.getString("insurer_num");
			if(insurer_num_temp.equals(insurer_num)) {
				exist = true;
				break;
			}
		}
		
		if(exist) {
			queryJson.put(Result.RESULT, Result.FAILURE);
			queryJson.put(Result.RESULTMSG, "公司中该保险单号已存在!");
			queryJson.remove(Result.CONTENT);
			queryJson.remove(Result.COUNT);
			queryResult = queryJson.toJSONString();
			return queryResult;
		}
		insurer_info_temp.add(insurer_info);
		jsonObject.clear();
		jsonObject.put("company_id", company_id);
		jsonObject.put("insurer_info", insurer_info_temp.toJSONString());
		jsonObject.put(DBConst.TABLE_FIELD_UPDATE_TIME, DateUtil.getNowTimeStr());
		jsonObject = JSONUtil.getUpdateParamJson(jsonObject, "company_id");
		return DBCommonMethods.updateRecord(DBConst.TABLE_EQUIP_COMPANY_BOOK, jsonObject.toJSONString());
	}
	

}
