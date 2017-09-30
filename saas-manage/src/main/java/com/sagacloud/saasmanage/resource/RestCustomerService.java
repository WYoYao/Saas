package com.sagacloud.saasmanage.resource;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.sagacloud.saasmanage.cache.BuildingCache;
import com.sagacloud.saasmanage.common.CommonMessage;
import com.sagacloud.saasmanage.common.JSONUtil;
import com.sagacloud.saasmanage.common.StringUtil;
import com.sagacloud.saasmanage.common.ToolsUtil;
import com.sagacloud.saasmanage.dao.DBCommonMethods;
import com.sagacloud.saasmanage.dao.DBConst;
import com.sagacloud.saasmanage.dao.DBConst.Result;
import com.sagacloud.saasmanage.service.BuildingServiceI;
import com.sagacloud.saasmanage.service.CustomerServiceI;

import org.springframework.beans.factory.annotation.Autowired;

import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

/**
 * Created by guosongchao on 2017/8/9.
 */
@Path("restCustomerService")
public class RestCustomerService {

    @Autowired
    public CustomerServiceI customerService;
    @Autowired
    public BuildingServiceI buildingService;

    /**
     * 客户信息管理:查询所有客户信息
     * @param jsonStr
     * @return
     * @throws Exception
     */
    @Path("queryAllCustomer")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public String queryAllCustomer(String jsonStr) throws Exception{
        JSONObject jsonObject = JSONObject.parseObject(jsonStr);
        JSONObject resultJson = new JSONObject();
        if(!StringUtil.isNull(jsonObject, "user_id")){
            //根据条件查询
            String resultStr = customerService.queryAllCustomer(jsonStr);
            if(jsonObject.containsKey("company_name")){
                //根据名称模糊查询
                resultJson = JSONUtil.likeFilterRecordByInfo(resultStr, "company_name", jsonObject.getString("company_name"));
            }else{
                resultJson = JSONObject.parseObject(resultStr);
            }
            JSONArray customers = filterRemind(resultJson.getJSONArray("Content"), CommonMessage.filter_customer_list);
            resultJson.put("Content", ToolsUtil.sortDesc(customers));
            resultJson.put("Count", customers.size());
            return resultJson.toJSONString();
        }
        return ToolsUtil.return_error_json;
    }

    /**
     * 验证邮箱是否唯一
     * @param jsonStr
     * @return
     * @throws Exception
     */
    @Path("validCustomerMailForAdd")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public String validCustomerMailForAdd(String jsonStr) throws Exception{
        if(!StringUtil.isNull(JSONObject.parseObject(jsonStr), "user_id", "mail")){
            return customerService.validCustomerMailForAdd(jsonStr);
        }
        return ToolsUtil.return_error_json;
    }

    /**
     * 客户信息管理：保存草稿状态客户信息
     * @param jsonStr
     * @return
     * @throws Exception
     */
    @Path("saveDraftCustomer")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public String saveDraftCustomer(String jsonStr) throws Exception{
        if(!StringUtil.isNull(JSONObject.parseObject(jsonStr), "user_id", "company_name")){
            return customerService.saveDraftCustomer(jsonStr);
        }
        return ToolsUtil.return_error_json;
    }

    /**
     * 客户信息管理：保存确认状态客户信息
     * @param jsonStr
     * @return
     * @throws Exception
     */
    @Path("saveConfirmCustomer")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public String saveConfirmCustomer(String jsonStr) throws Exception{
        if(!StringUtil.isNull(JSONObject.parseObject(jsonStr), "user_id", "company_name", "project_local_name", "province", "city", "district", "longitude", "latitude")){
            return customerService.saveConfirmCustomer(jsonStr);
        }
        return ToolsUtil.return_error_json;
    }

    /**
     * 客户信息管理：锁定客户信息
     * @param jsonStr
     * @return
     * @throws Exception
     */
    @Path("lockCustomerById")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public String lockCustomerById(String jsonStr) throws Exception{
        if(!StringUtil.isNull(JSONObject.parseObject(jsonStr), "user_id", "customer_id")){
            return customerService.lockCustomerById(jsonStr);
        }
        return ToolsUtil.return_error_json;
    }

    /**
     * 客户信息管理：解锁客户信息
     * @param jsonStr
     * @return
     * @throws Exception
     */
    @Path("unlockCustomerById")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public String unlockCustomerById(String jsonStr) throws Exception{
        if(!StringUtil.isNull(JSONObject.parseObject(jsonStr), "user_id", "customer_id")){
            return customerService.unlockCustomerById(jsonStr);
        }
        return ToolsUtil.return_error_json;
    }

    /**
     * 客户信息管理：重置客户密码
     * @param jsonStr
     * @return
     * @throws Exception
     */
    @Path("resetCustomerPasswd")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public String resetCustomerPasswd(String jsonStr) throws Exception{
        if(!StringUtil.isNull(JSONObject.parseObject(jsonStr), "user_id", "customer_id")){
            return customerService.resetCustomerPasswd(jsonStr);
        }
        return ToolsUtil.return_error_json;
    }

    /**
     * 客户信息管理：根据ID查询客户详细信息
     * @param jsonStr
     * @return
     * @throws Exception
     */
    @Path("queryCustomerById")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public String queryCustomerById(String jsonStr) throws Exception{
        if(!StringUtil.isNull(JSONObject.parseObject(jsonStr), "user_id", "customer_id")){
            String customStr = customerService.queryCustomerById(jsonStr);
            String resultStr = customStr;
            if(!customStr.contains("failure")){
                String buildingsStr = buildingService.queryRecordByCondition(jsonStr);
                resultStr = buildingsStr;
                if(!buildingsStr.contains("failure")){
                    JSONObject customJson = JSONObject.parseObject(customStr);
                    JSONObject buildingJson = JSONObject.parseObject(buildingsStr);
                    JSONObject custom = customJson.getJSONObject("Item");
                    if(custom != null){
                        custom.put("build_list", ToolsUtil.filterRemind(buildingJson.getJSONArray("Content"), CommonMessage.filter_building_list));
                    }
                    customJson.put("Item", custom);
                    resultStr = customJson.toJSONString();
                }
            }
            return resultStr;
        }
        return ToolsUtil.return_error_json;
    }

    /**
     * 客户信息管理：根据ID编辑客户信息
     * @param jsonStr
     * @return
     * @throws Exception
     */
    @Path("updateCustomerById")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public String updateCustomerById(String jsonStr) throws Exception{
        if(!StringUtil.isNull(JSONObject.parseObject(jsonStr), "user_id", "customer_id")){
            return customerService.updateCustomerById(jsonStr);
        }
        return ToolsUtil.return_error_json;
    }

    /**
     * 客户信息管理：添加确认状态的建筑信息
     * @param jsonStr
     * @return
     * @throws Exception
     */
    @Path("addConfirmBuild")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public String addConfirmBuild(String jsonStr) throws Exception{
        if(!StringUtil.isNull(JSONObject.parseObject(jsonStr), "user_id", "customer_id", "project_id")){
            return buildingService.addConfirmBuild(jsonStr);
        }
        return ToolsUtil.return_error_json;
    }

    /**
     * 客户信息管理：编辑确认状态的建筑信息
     * @param jsonStr
     * @return
     * @throws Exception
     */
    @Path("updateConfirmBuild")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public String updateConfirmBuild(String jsonStr) throws Exception{
        if(!StringUtil.isNull(JSONObject.parseObject(jsonStr), "user_id", "build_id", "build_code")){
            return buildingService.updateConfirmBuild(jsonStr);
        }
        return ToolsUtil.return_error_json;
    }

    public JSONArray filterRemind(JSONArray customers, JSONArray filterCondition){
        JSONArray newCustomers = new JSONArray();
        JSONObject customer, newCustomer;
        if(customers != null){
            for(int i=0; i<customers.size(); i++){
                customer = customers.getJSONObject(i);
                newCustomer = new JSONObject();
                for(int j=0; j<filterCondition.size(); j++){
                    newCustomer.put(filterCondition.getString(j), customer.get(filterCondition.getString(j)));
                }
                //只有第一个客户同步建筑  其他客户在第一个客户同步建筑时建筑信息已经同步
                JSONArray buildArray = BuildingCache.getBuildingsByCustomerId(customer.getString("customer_id"), i==0);
                newCustomer.put("build_count", buildArray == null ? 0 : buildArray.size());
                newCustomers.add(newCustomer);
            }
        }
        return newCustomers;
    }
    
	/**
	 * @Desc 操作模块管理-新增页:查询正常状态的客户信息
	 * @param jsonStr
	 * @return
	 * @throws Exception 
	 */
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/queryCustomerForNormal")
	public String queryCustomerForNormal(String jsonStr) throws Exception {
		JSONObject jsonObject = JSONObject.parseObject(jsonStr);
		if(StringUtil.isNull(jsonObject, "user_id")) {
			return ToolsUtil.return_error_json;
		}
		String userid = jsonObject.getString("user_id");
		//查询所有客户信息
		String queryResult = DBCommonMethods.queryAllValidRecord(DBConst.TABLE_CUSTOMER);
		//过滤   项目id   公司名称 
//		queryResult = ToolsUtil.filterRemind(queryResult, "project_id","project_local_name");
		if(queryResult.contains(Result.RESULT) && queryResult.contains(Result.CONTENT)) {
    		JSONObject resultJson = JSONObject.parseObject(queryResult);
			JSONArray queryContents = resultJson.getJSONArray(Result.CONTENT);
//			contents = filterRemind(contents, filterConditions);
			JSONArray contents = new JSONArray();
			if(queryContents != null && queryContents.size() > 0){
	    		for(int i=0; i<queryContents.size(); i++){
	    			JSONObject item = queryContents.getJSONObject(i);
//	    			for(String filterCondition : filterConditions){
//	    				newItem.put(filterCondition, item.get(filterCondition));
//	    			}
	    			String project_id = item.getString("project_id");
	    			String project_local_name = item.getString("project_local_name");
	    			if(!StringUtil.isNull(project_id) && !StringUtil.isNull(project_local_name)) {
	    				JSONObject newItem = new JSONObject();
	    				newItem.put("project_id", project_id);
	    				newItem.put("project_local_name", project_local_name);
	    				contents.add(newItem);
	    			}
	    		}
	    	}
			resultJson.put(Result.CONTENT, contents);
			resultJson.put(Result.COUNT, contents.size());
			
			queryResult = JSON.toJSONString(resultJson);
    	}
		return queryResult;
		
	}
}
