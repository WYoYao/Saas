package com.sagacloud.saasmanage.service.impl;

import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.sagacloud.saasmanage.cache.CustomerCache;
import com.sagacloud.saasmanage.cache.ProjectCache;
import com.sagacloud.saasmanage.common.CommonConst;
import com.sagacloud.saasmanage.common.CommonMessage;
import com.sagacloud.saasmanage.common.DataRequestPathUtil;
import com.sagacloud.saasmanage.common.DateUtil;
import com.sagacloud.saasmanage.common.JSONUtil;
import com.sagacloud.saasmanage.common.StringUtil;
import com.sagacloud.saasmanage.common.ToolsUtil;
import com.sagacloud.saasmanage.dao.DBCommonMethods;
import com.sagacloud.saasmanage.dao.DBConst;
import com.sagacloud.saasmanage.service.BaseService;
import com.sagacloud.saasmanage.service.BuildingServiceI;
import com.sagacloud.saasmanage.service.CustomerServiceI;
import com.sagacloud.saasmanage.service.DictionaryServiceI;
import com.sagacloud.saasmanage.service.OperateLogServiceI;

/**
 * Created by guosongchao on 2017/8/9.
 */
@Service("customerService")
public class CustomerServiceImpl extends BaseService implements CustomerServiceI {

    @Value("${project-default-secret}")
    public String projectDefaultSecret;
    @Value("${sms-platform-create-template}")
    public String createCustomerSmsTemplate;
    @Value("${sms-platform-reset-template}")
    public String resetPasswordSmsTemplate;
    @Value("${sms-platform-create-mail}")
    public String createCustomerMail;
    @Value("${sms-platform-reset-mail}")
    public String resetPasswordMail;

    @Autowired
    public BuildingServiceI buildingService;
    @Autowired
    public OperateLogServiceI operateLogService;
    @Autowired
    public ProjectCache projectCache;
    @Autowired
    private DictionaryServiceI dictionaryService;

    @Override
    public String queryAllCustomer(String jsonStr) throws Exception {
        JSONObject jsonObject = JSONObject.parseObject(jsonStr);
        jsonObject.put(DBConst.TABLE_FIELD_VALID, true);
        String paramStr = JSONUtil.getCriteriaWithMajors(jsonObject, "account", "passwd", "customer_status", "valid", "project_id").toJSONString();
        String resultStr = DBCommonMethods.queryRecordByCriteria(DBConst.TABLE_CUSTOMER, paramStr);
        resultStr = JSONUtil.prossesResultToDateString(resultStr, CommonMessage.dataFormat_save, CommonMessage.dataFormat_show, DBConst.TABLE_FIELD_CTEATE_TIME);
        resultStr = JSONUtil.prossesResultToJsonString(resultStr, "pictures");
        return resultStr;
    }

    @Override
    public String validCustomerMailForAdd(String jsonStr) throws Exception {
        JSONObject jsonObject = JSONObject.parseObject(jsonStr);
        String mail = jsonObject.getString("mail");
        String customerId = jsonObject.getString("customer_id");
        jsonObject.put("account", mail);
        jsonObject.put(DBConst.TABLE_FIELD_VALID, true);
        String params = JSONUtil.getCriteriaWithMajors(jsonObject, "valid", "account").toJSONString();
        String resultStr = DBCommonMethods.queryRecordByCriteria(DBConst.TABLE_CUSTOMER, params);
        if(resultStr.contains("success")){
            boolean canUse = true;
            JSONObject resultJson = JSONObject.parseObject(resultStr);
            JSONArray results = resultJson.getJSONArray("Content");
            results = results == null ? new JSONArray() : results;
            if(StringUtil.isNull(customerId) && results.size() != 0){
                canUse = false;
            }else {
                JSONObject result;
                for (int i = 0; i < results.size(); i++) {
                    result = results.getJSONObject(i);
                    if(mail.equals(result.getString("account"))){
                        if(!customerId.equals(result.getString("customer_id"))){
                            canUse = false;
                            break;
                        }
                    }
                }
            }
            JSONObject item = new JSONObject();
            item.put("can_use", canUse);
            resultStr = ToolsUtil.successJsonMsg(item);
        }
        return resultStr;
    }

    @Override
    public String saveDraftCustomer(String jsonStr) throws Exception {
        JSONObject jsonObject = JSONObject.parseObject(jsonStr);
        String resultStr;
        if(!StringUtil.isNull(jsonObject, "customer_id")){
            // 更新草稿
            resultStr = updateDraftCustomerById(jsonStr);
        }else{
            // 创建草稿
            resultStr = insertDraftCustomer(jsonStr);
        }
        JSONArray builds = jsonObject.getJSONArray("build_list");
        if(resultStr.contains("success")){
            String customerId = JSONObject.parseObject(resultStr).getString("id");
            JSONObject build;
            //查询现有建筑
            String parmaStr = "{\"customer_id\":\""+ customerId +"\"}";
            resultStr = buildingService.queryRecordByCondition(parmaStr);
            Set<String> buildIds = new HashSet<String>();
            JSONObject buildJson = JSONObject.parseObject(resultStr);
            if("success".equals(buildJson.getString("Result"))){
                JSONArray buildArray = buildJson.getJSONArray("Content");
                for(int i=0; i<buildArray.size(); i++){
                    buildIds.add(buildArray.getJSONObject(i).getString("build_id"));
                }
                //更新建筑信息
                if(builds != null){
                    for(int i=0; i<builds.size(); i++){
                        build = builds.getJSONObject(i);
                        build.put("customer_id", customerId);
                        if(!StringUtil.isNull(build, "build_id")){
                            //更新建筑草稿
                            buildIds.remove(build.getString("build_id"));
                            resultStr = buildingService.updateDraftBuild(build.toJSONString());
                        }else{
                            //创建建筑草稿
                            resultStr = buildingService.addDraftBuild(build.toJSONString());
                        }
                        if(resultStr.contains("failure")){
                            break;
                        }
                    }
                }
                //批量删除建筑
                if(resultStr.contains("success")){
                    resultStr = buildingService.deleteBatchRecord(buildIds);
                }
            }
        }
        operateLogService.insertRecord(jsonObject.getString("user_id"), DBConst.TABLE_CUSTOMER, "I", "saveDraftCustomer", jsonStr, resultStr.contains("success")?"0":"1", resultStr);
        return resultStr;
    }

    @Override
    public String saveConfirmCustomer(String jsonStr) throws Exception {
        JSONObject jsonObject = JSONObject.parseObject(jsonStr);
        String resultStr;
        String customerSecret = StringUtil.randomString(6);
        jsonObject.put("passwd", ToolsUtil.encodeByMd5(customerSecret));
        if(!StringUtil.isNull(jsonObject, "customer_id")){
            // 更新并发布
            resultStr = updateAndPublish(jsonObject.toJSONString());
        }else{
            // 创建并发布
            resultStr = insertAndPublishRecord(jsonObject.toJSONString());
        }
        JSONArray builds = jsonObject.getJSONArray("build_list");
        String mail = null, account = null, phone = null;
        if(resultStr.contains("success")){
            JSONObject result = JSONObject.parseObject(resultStr);
            String projectId = result.getString("project_id");
            String customerId = result.getString("id");
            mail = result.getString("mail");
            account = result.getString("account");
            phone = result.getString("phone");
            JSONObject build;
            //查询现有建筑
            String parmaStr = "{\"customer_id\":\""+ customerId +"\"}";
            resultStr = buildingService.queryRecordByCondition(parmaStr);
            Set<String> buildIds = new HashSet<String>();
            JSONObject buildJson = JSONObject.parseObject(resultStr);
            if("success".equals(buildJson.getString("Result"))) {
                JSONArray buildArray = buildJson.getJSONArray("Content");
                for (int i = 0; i < buildArray.size(); i++) {
                    buildIds.add(buildArray.getJSONObject(i).getString("build_id"));
                }
                if (builds != null) {
                    for (int i = 0; i < builds.size(); i++) {
                        build = builds.getJSONObject(i);
                        build.put("customer_id", customerId);
                        build.put("project_id", projectId);
                        if (!StringUtil.isNull(build, "build_id")) {
                            //更新建筑并发布
                            buildIds.remove(build.getString("build_id"));
                            resultStr = buildingService.updateAndPubishBuildByKey(build.toJSONString());
                        } else {
                            //创建发布建筑
                            resultStr = buildingService.addConfirmBuild(build.toJSONString());
                        }
                        if (resultStr.contains("failure")) {
                            break;
                        }
                    }
                }
                //批量删除建筑
                if(resultStr.contains("success")){
                    resultStr = buildingService.deleteBatchRecord(buildIds);
                }
            }
        }
        if(resultStr.contains("success")){
            // 发送邮件、短信
            String sendMailUrl = getSmsPlatformPath(DataRequestPathUtil.smsPlat_send_mail);
            httpPostRequest(sendMailUrl, createCustomerMail.replace("EMAIL", mail).replace("ACCOUNT", account).replace("PASSWORD", customerSecret));
            String semdSmsUrl = getSmsPlatformPath(DataRequestPathUtil.smsPlat_send_template);
            httpPostRequest(semdSmsUrl, createCustomerSmsTemplate.replace("PHONE", phone).replace("ACCOUNT", account).replace("PASSWORD", customerSecret));
        }
        operateLogService.insertRecord(jsonObject.getString("user_id"), DBConst.TABLE_CUSTOMER, "I", "saveConfirmCustomer", jsonStr, resultStr.contains("success")?"0":"1", resultStr);
        return resultStr;
    }

    @Override
    public String lockCustomerById(String jsonStr) throws Exception {
        JSONObject jsonObject = JSONObject.parseObject(jsonStr);
        jsonObject.put("customer_status", "3");
        String paramStr = JSONUtil.getUpdateParamJson(jsonObject, "customer_id").toJSONString();
        String resultStr = DBCommonMethods.updateRecord(DBConst.TABLE_CUSTOMER, paramStr);
        operateLogService.insertRecord(jsonObject.getString("user_id"), DBConst.TABLE_CUSTOMER, "U", "lockCustomerById", jsonStr, resultStr.contains("success")?"0":"1", resultStr);
        return resultStr;
    }

    @Override
    public String unlockCustomerById(String jsonStr) throws Exception {
        JSONObject jsonObject = JSONObject.parseObject(jsonStr);
        jsonObject.put("customer_status", "2");
        String paramStr = JSONUtil.getUpdateParamJson(jsonObject, "customer_id").toJSONString();
        String resultStr = DBCommonMethods.updateRecord(DBConst.TABLE_CUSTOMER, paramStr);
        operateLogService.insertRecord(jsonObject.getString("user_id"), DBConst.TABLE_CUSTOMER, "U", "unlockCustomerById", jsonStr, resultStr.contains("success")?"0":"1", resultStr);
        return resultStr;
    }

    @Override
    public String resetCustomerPasswd(String jsonStr) throws Exception {
        JSONObject jsonObject = JSONObject.parseObject(jsonStr);
        String customerId = jsonObject.getString("customer_id");
        String customerSecret = StringUtil.randomString(6);
        jsonObject.put("passwd", ToolsUtil.encodeByMd5(customerSecret));
        String paramStr = JSONUtil.getUpdateParamJson(jsonObject, "customer_id").toJSONString();
        String resultStr = DBCommonMethods.updateRecord(DBConst.TABLE_CUSTOMER, paramStr);
        if(resultStr.contains("success")){
            // 发送邮件、短信
            String sendMailUrl = getSmsPlatformPath(DataRequestPathUtil.smsPlat_send_mail);
            httpPostRequest(sendMailUrl, resetPasswordMail.replace("EMAIL", CustomerCache.getCustomerMailByCustomerId(customerId)).replace("ACCOUNT", CustomerCache.getCustomerAccountByCustomerId(customerId)).replace("PASSWORD", customerSecret));
            String semdSmsUrl = getSmsPlatformPath(DataRequestPathUtil.smsPlat_send_template);
            httpPostRequest(semdSmsUrl, resetPasswordSmsTemplate.replace("PHONE", CustomerCache.getCustomerPhoneByCustomerId(customerId)).replace("ACCOUNT", CustomerCache.getCustomerAccountByCustomerId(customerId)).replace("PASSWORD", customerSecret));
        }
        operateLogService.insertRecord(jsonObject.getString("user_id"), DBConst.TABLE_CUSTOMER, "U", "resetPassword", jsonStr, resultStr.contains("success")?"0":"1", resultStr);
        return resultStr;
    }

    @Override
    public String queryCustomerById(String jsonStr) throws Exception {
        JSONObject jsonObject = JSONObject.parseObject(jsonStr);
        String paramCustomStr = JSONUtil.getKeyWithMajors(jsonObject, "customer_id").toJSONString();
        String customResStr = DBCommonMethods.getRecordBykey(DBConst.TABLE_CUSTOMER, paramCustomStr);
        
//        if("success".equals(customJson.getString("Result"))){
//        	JSONArray customs = customJson.getJSONArray("Content");
//        	if(customs != null && customs.size() > 0){
//        		JSONObject custom = customs.getJSONObject(0);
//        		custom.put(DBConst.TABLE_FIELD_CTEATE_TIME, DateUtil.transferDateFormat(custom.getString(DBConst.TABLE_FIELD_CTEATE_TIME), CommonMessage.dataFormat_save, CommonMessage.dataFormat_show));
//        		custom = JSONUtil.prosses
//        	}
//        }
        customResStr = JSONUtil.prossesResultToDateString(customResStr, CommonMessage.dataFormat_save, CommonMessage.dataFormat_show, DBConst.TABLE_FIELD_CTEATE_TIME);
        customResStr = JSONUtil.prossesResultToJsonString(customResStr, "pictures");
        customResStr = JSONUtil.getFirstRecordfromResult(customResStr);
        JSONObject customJson = JSONObject.parseObject(customResStr);
        JSONObject custom = customJson.getJSONObject("Item");
        if(custom != null){
    		custom.put("province_city_name", dictionaryService.queryNameByCode("geography", custom.getString("province"), custom.getString("city"), custom.getString("district")));
        	custom.put("climate_zone_name", dictionaryService.queryNameByCode("climate", custom.getString("climate_zone")));
        	custom.put("urban_devp_lev_name", dictionaryService.queryNameByCode("develop", custom.getString("urban_devp_lev")));
        	customResStr = ToolsUtil.successJsonMsg(custom);
        }
        return customResStr;
    }

    @Override
    public String updateCustomerById(String jsonStr) throws Exception {
        JSONObject jsonObject = JSONObject.parseObject(jsonStr);
        String customerId = jsonObject.getString("customer_id");
        jsonObject = JSONUtil.prossesParamToJsonString(jsonObject, "pictures");
        String resultStr = null;
        String projectId = jsonObject.getString("project_id");
        //1 判断更新的内容是否包含经纬度等信息 如果包含 将信息更新到数据平台
        if(!StringUtil.isNull(projectId) && StringUtil.isExist(jsonObject, "longitude", "latitude", "altitude")){
            JSONObject param = new JSONObject();
            JSONArray criterias = new JSONArray();
            JSONObject criteria = new JSONObject();
            JSONObject infos = new JSONObject();

            if(jsonObject.containsKey("longitude"))
                infos.put("Longitude", JSONArray.parseArray("[{\"value\":\""+jsonObject.getString("longitude")+"\"}]"));
            if(jsonObject.containsKey("latitude"))
                infos.put("Latitude", JSONArray.parseArray("[{\"value\":\""+jsonObject.getString("latitude")+"\"}]"));
            if(jsonObject.containsKey("altitude"))
                infos.put("Altitude", JSONArray.parseArray("[{\"value\":\""+jsonObject.getString("altitude")+"\"}]"));
            criteria.put("id", projectId);
            criteria.put(CommonConst.info_name_datas, infos);
            criterias.add(criteria);
            param.put("criterias", criterias);
            String updateUrl = getDataPlatformPath(DataRequestPathUtil.dataPlat_object_batch_update, projectId, projectCache.getProjectSecretById(projectId));
            resultStr = httpPostRequest(updateUrl, param.toJSONString());
        }
        if(resultStr == null || resultStr.contains("success")){
            String paramStr = JSONUtil.getUpdateParamJson(jsonObject, "customer_id").toJSONString();
            resultStr = DBCommonMethods.updateRecord(DBConst.TABLE_CUSTOMER, paramStr);
            JSONObject result = JSONObject.parseObject(resultStr);
            result.put("id", customerId);
            resultStr = result.toJSONString();
        }
        operateLogService.insertRecord(jsonObject.getString("user_id"), DBConst.TABLE_CUSTOMER, "U", "updateCustomerById", jsonStr, resultStr.contains("success")?"0":"1", resultStr);
        return resultStr;
    }

    public String insertDraftCustomer(String jsonStr) throws Exception{
        JSONObject jsonObject = JSONObject.parseObject(jsonStr);
        jsonObject.put("customer_id", DBConst.TABLE_CUSTOMER_ID_TAG + DateUtil.getUtcTimeNow());
        jsonObject.put("customer_status", "1");
        jsonObject = JSONUtil.prossesParamToJsonString(jsonObject, "pictures");
        String paramStr = JSONUtil.getAddParamJson(jsonObject).toJSONString();
        String resultStr = DBCommonMethods.insertRecord(DBConst.TABLE_CUSTOMER, paramStr);
        JSONObject result = JSONObject.parseObject(resultStr);
        result.put("id", jsonObject.getString("customer_id"));
        operateLogService.insertRecord(jsonObject.getString("user_id"), DBConst.TABLE_CUSTOMER, "I", "insertDraftCustomer", jsonStr, resultStr.contains("success")?"0":"1", resultStr);
        return result.toJSONString();
    }

    public String insertAndPublishRecord(String jsonStr) throws Exception{
        JSONObject jsonObject = JSONObject.parseObject(jsonStr);
        String resultStr;
        //调用数据平台创建项目
        resultStr = createProject(jsonObject);
        if(resultStr.contains("success")){
            //获取项目的ID、Name
            JSONObject projectResult = JSONObject.parseObject(resultStr);
            //插入项目数据
            jsonObject.put("customer_id", DBConst.TABLE_CUSTOMER_ID_TAG + DateUtil.getUtcTimeNow());
            jsonObject.put("customer_status", "2");
            jsonObject.put("account", jsonObject.getString("mail"));
            jsonObject.put("project_id", projectResult.getString("id"));
            jsonObject.put("project_name", projectResult.getString(CommonConst.info_name_name_project));
            jsonObject = JSONUtil.prossesParamToJsonString(jsonObject, "pictures");
            String paramStr = JSONUtil.getAddParamJson(jsonObject).toJSONString();
            resultStr = DBCommonMethods.insertRecord(DBConst.TABLE_CUSTOMER, paramStr);
            JSONObject resultJson = JSONObject.parseObject(resultStr);
            resultJson.put("id", jsonObject.getString("customer_id"));
            resultJson.put("project_id", projectResult.getString("id"));
            resultJson.put("mail", jsonObject.getString("mail"));
            resultJson.put("account", jsonObject.getString("account"));
            resultJson.put("phone", jsonObject.getString("contact_phone"));
            resultStr = resultJson.toJSONString();
        }
        operateLogService.insertRecord(jsonObject.getString("user_id"), DBConst.TABLE_CUSTOMER, "I", "insertAndPublishRecord", jsonStr, resultStr.contains("success")?"0":"1", resultStr);
        return resultStr;
    }

    public String updateDraftCustomerById(String jsonStr) throws Exception{
        JSONObject jsonObject = JSONObject.parseObject(jsonStr);
        String customerId = jsonObject.getString("customer_id");
        jsonObject = JSONUtil.prossesParamToJsonString(jsonObject, "pictures");
        String paramStr = JSONUtil.getUpdateParamJson(jsonObject, "customer_id").toJSONString();
        String resultStr = DBCommonMethods.updateRecord(DBConst.TABLE_CUSTOMER, paramStr);
        JSONObject result = JSONObject.parseObject(resultStr);
        result.put("id", customerId);
        resultStr = result.toJSONString();
        operateLogService.insertRecord(jsonObject.getString("user_id"), DBConst.TABLE_CUSTOMER, "U", "updateDraftCustomerById", jsonStr, resultStr.contains("success")?"0":"1", resultStr);
        return resultStr;
    }

    public String updateAndPublish(String jsonStr) throws Exception{
        JSONObject jsonObject = JSONObject.parseObject(jsonStr);
        String customerId = jsonObject.getString("customer_id");
        //查询现有数据
        String paramStr = JSONUtil.getKeyWithMajors(jsonObject, "customer_id").toJSONString();
        String resultStr = DBCommonMethods.getRecordBykey(DBConst.TABLE_CUSTOMER, paramStr);
        resultStr = JSONUtil.prossesResultToJsonString(resultStr, "pictures");
        JSONObject customerJson = JSONObject.parseObject(resultStr);
        if("success".equals(customerJson.getString("Result")) && customerJson.getIntValue("Count") > 0) {
            //组合现有数据、通过数据平台创建项目
            JSONObject customer = customerJson.getJSONArray("Content").getJSONObject(0);
            customer.putAll(jsonObject);
            customer.put("account", customer.getString("mail"));
            resultStr = createProject(customer);
            if(resultStr.contains("success")) {
                //查询数据平台项目ID、Name
                JSONObject projectResultJson = JSONObject.parseObject(resultStr);
                String projectId = projectResultJson.getString("id");
                //更新数据
                customer.put("customer_status", "2");
                customer.put("project_id", projectId);
                customer.put("project_name", projectResultJson.getString(CommonConst.info_name_name_project));
                //更新客户
                customer = JSONUtil.prossesParamToJsonString(customer, "pictures");
                paramStr = JSONUtil.getUpdateParamJson(customer, "customer_id").toJSONString();
                resultStr = DBCommonMethods.updateRecord(DBConst.TABLE_CUSTOMER, paramStr);
                //组织返回值
                JSONObject result = JSONObject.parseObject(resultStr);
                result.put("id", customerId);
                result.put("project_id", projectId);
                result.put("mail", customer.getString("mail"));
                result.put("account", customer.getString("account"));
                result.put("phone", customer.getString("contact_phone"));
                resultStr = result.toJSONString();
            }
        }
        operateLogService.insertRecord(jsonObject.getString("user_id"), DBConst.TABLE_CUSTOMER, "U", "updateAndPublish", jsonStr, resultStr.contains("success")?"0":"1", resultStr);
        return resultStr;
    }

    public String createProject(JSONObject jsonObject) throws Exception{
        JSONObject param = new JSONObject();
        String areaCode;
        if(jsonObject.containsKey("district")){
            areaCode = jsonObject.getString("district");
        }else if(jsonObject.containsKey("city")){
            areaCode = jsonObject.getString("city");
        }else{
            areaCode = jsonObject.getString("province");
        }
        JSONObject infos = new JSONObject();

        infos.put(CommonConst.info_name_local_name_project, JSONArray.parseArray("[{\"time\":\""+DateUtil.getNowTimeStr()+"\",\"value\":\""+jsonObject.getString("project_local_name")+"\"}]"));
        infos.put("Province", JSONArray.parseArray("[{\"time\":\""+DateUtil.getNowTimeStr()+"\",\"value\":\""+jsonObject.getString("province")+"\"}]"));
        infos.put("City", JSONArray.parseArray("[{\"time\":\""+DateUtil.getNowTimeStr()+"\",\"value\":\""+jsonObject.getString("city")+"\"}]"));
        infos.put("UrbanZone", JSONArray.parseArray("[{\"time\":\""+DateUtil.getNowTimeStr()+"\",\"value\":\""+jsonObject.getString("district")+"\"}]"));
        infos.put("ClimateZone", JSONArray.parseArray("[{\"time\":\""+DateUtil.getNowTimeStr()+"\",\"value\":\""+jsonObject.getString("climate_zone")+"\"}]"));
        infos.put("UrbanDevpLev", JSONArray.parseArray("[{\"time\":\""+DateUtil.getNowTimeStr()+"\",\"value\":\""+jsonObject.getString("urban_devp_lev")+"\"}]"));
        infos.put("Longitude", JSONArray.parseArray("[{\"time\":\""+DateUtil.getNowTimeStr()+"\",\"value\":\""+jsonObject.getString("longitude")+"\"}]"));
        infos.put("Latitude", JSONArray.parseArray("[{\"time\":\""+DateUtil.getNowTimeStr()+"\",\"value\":\""+jsonObject.getString("latitude")+"\"}]"));
        infos.put("Altitude", JSONArray.parseArray("[{\"time\":\""+DateUtil.getNowTimeStr()+"\",\"value\":\""+jsonObject.getString("altitude")+"\"}]"));

        param.put("area_code", StringUtil.completLengthFromRight(areaCode, 6, "0"));
        param.put("password", projectDefaultSecret);
        param.put(CommonConst.info_name_datas, infos);
        String addProject = getDataPlatformPath(DataRequestPathUtil.dataPlat_project_create);
        String resultStr = httpPostRequest(addProject, param.toJSONString());
        if(resultStr.contains("success")){
            //添加设备所在空间、设备服务空间、系统包含设备图，挂在项目上
        }
        return resultStr;
    }
}
