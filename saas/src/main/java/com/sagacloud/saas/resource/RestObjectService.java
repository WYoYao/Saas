package com.sagacloud.saas.resource;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.sagacloud.saas.common.StringUtil;
import com.sagacloud.saas.common.ToolsUtil;
import com.sagacloud.saas.service.ObjectServiceI;

import org.springframework.beans.factory.annotation.Autowired;

import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

/**
 * Created by guosongchao on 2017/9/6.
 */
@Path("restObjectService")
public class RestObjectService {

    @Autowired
    private ObjectServiceI objectService;

    /**
     * 搜索物理世界对象
     * @param jsonStr
     * @return
     * @throws Exception
     */
    @Path("searchObject")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public String searchObject(String jsonStr) throws Exception{
        if(!StringUtil.isNull(JSONObject.parseObject(jsonStr), "user_id", "project_id")){
            return objectService.searchObject(jsonStr);
        }
        return ToolsUtil.return_error_json;
    }

    /**
     * 查询对象分类
     * @param jsonStr
     * @return
             * @throws Exception
     */
    @Path("queryObjClassForObjSel")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public String queryObjClassForObjSel(String jsonStr) throws Exception{
        if(!StringUtil.isNull(JSONObject.parseObject(jsonStr), "user_id")){
            return objectService.queryObjClassForObjSel(jsonStr);
        }
        return ToolsUtil.return_error_json;
    }

    /**
     * 查询建筑体
     * @param jsonStr
     * @return
     * @throws Exception
     */
    @Path("queryBuild")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public String queryBuild(String jsonStr) throws Exception{
        if(!StringUtil.isNull(JSONObject.parseObject(jsonStr), "user_id", "project_id")){
            return objectService.queryBuild(jsonStr);
        }
        return ToolsUtil.return_error_json;
    }

    /**
     * 查询楼层
     * @param jsonStr
     * @return
     * @throws Exception
     */
    @Path("queryFloor")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public String queryFloor(String jsonStr) throws Exception{
        if(!StringUtil.isNull(JSONObject.parseObject(jsonStr), "user_id", "project_id", "need_back_parents")){
            return objectService.queryFloor(jsonStr);
        }
        return ToolsUtil.return_error_json;
    }

    /**
     * 查询空间
     * @param jsonStr
     * @return
     * @throws Exception
     */
    @Path("querySpace")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public String querySpace(String jsonStr) throws Exception{
        if(!StringUtil.isNull(JSONObject.parseObject(jsonStr), "user_id", "project_id", "obj_id", "obj_type", "need_back_parents")){
            return objectService.querySpace(jsonStr);
        }
        return ToolsUtil.return_error_json;
    }

    /**
     * 查询系统示例
     * @param jsonStr
     * @return
     * @throws Exception
     */
    @Path("querySystem")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public String querySystem(String jsonStr) throws Exception{
        if(!StringUtil.isNull(JSONObject.parseObject(jsonStr), "user_id", "project_id", "need_back_parents")){
            return objectService.querySystem(jsonStr);
        }
        return ToolsUtil.return_error_json;
    }

    /**
     * 系统专业下所有系统
     * @param jsonStr
     * @return
     * @throws Exception
     */
    @Path("querySystemForSystemDomain")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public String querySystemForSystemDomain(String jsonStr) throws Exception{
        if(!StringUtil.isNull(JSONObject.parseObject(jsonStr), "user_id", "project_id", "system_domain")){
            return objectService.querySystemForSystemDomain(jsonStr);
        }
        return ToolsUtil.return_error_json;
    }

    /**
     * 查询建筑-楼层-空间列表树
     * @param jsonStr
     * @return
     * @throws Exception
     */
    @Path("queryBuildFloorSpaceTree")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public String queryBuildFloorSpaceTree(String jsonStr) throws Exception{
        if(!StringUtil.isNull(JSONObject.parseObject(jsonStr), "user_id", "project_id")){
            return objectService.queryBuildFloorSpaceTree(jsonStr);
        }
        return ToolsUtil.return_error_json;
    }

    /**
     * 查询设备示例
     * @param jsonStr
     * @return
     * @throws Exception
     */
    @Path("queryEquip")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public String queryEquip(String jsonStr) throws Exception{
        if(!StringUtil.isNull(JSONObject.parseObject(jsonStr), "user_id", "project_id", "need_back_parents")){
            return objectService.queryEquip(jsonStr);
        }
        return ToolsUtil.return_error_json;
    }

    /**
     * 查询工具/部件列表
     * @param jsonStr
     * @return
     * @throws Exception
     */
    @Path("queryTempObjectList")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public String queryTempObjectList(String jsonStr) throws Exception {
        JSONObject jsonObject = JSONObject.parseObject(jsonStr);
        if (!StringUtil.isNull(jsonObject, "user_id", "project_id", "obj_type")) {
            String objStr = objectService.queryTempObjectList(jsonStr);
            if (jsonObject.containsKey("obj_name")) {
                String objName = jsonObject.getString("obj_name");
                JSONObject objJson = JSONObject.parseObject(objStr);
                if ("success".equals(objJson.getString("Result"))) {
                    JSONArray objs = objJson.getJSONArray("Content");
                    JSONObject obj;
                    for (int i = 0; i < objs.size(); i++) {
                        obj = objs.getJSONObject(i);
                        if (!obj.containsKey("obj_name") || !obj.getString("obj_name").contains(objName)) {
                            objs.remove(obj);
                        }
                    }
                    objStr = objJson.toJSONString();
                }
            }
            return objStr;
        }
        return ToolsUtil.return_error_json;
    }

    /**
     * 添加自定义对象
     * @param jsonStr
     * @return
     * @throws Exception
     */
    @Path("addTempObjectWithType")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public String addTempObjectWithType(String jsonStr) throws Exception{
        JSONObject jsonObject = JSONObject.parseObject(jsonStr);
        if(!StringUtil.isNull(jsonObject, "user_id", "project_id", "obj_type")){
            String objType = jsonObject.getString("obj_type");
            JSONArray objs = jsonObject.getJSONArray("obj_names");
            if(objs == null)
                objs = new JSONArray();
            if(jsonObject.containsKey("obj_name"))
                objs.add(jsonObject.getString("obj_name"));
            JSONArray objArray = new JSONArray();
            JSONObject obj;
            for(int i=0; i<objs.size(); i++){
                obj = new JSONObject();
                obj.put("obj_type", objType);
                obj.put("obj_name", objs.getString(i));
                objArray.add(obj);
            }
            jsonObject.put("objs", objArray);
            return objectService.addBatchTempObject(jsonObject.toJSONString());
        }
        return ToolsUtil.return_error_json;
    }

    /**
     * 搜索信息点
     * @param jsonStr
     * @return
     * @throws Exception
     */
    @Path("searchInfoPoint")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public String searchInfoPoint(String jsonStr) throws Exception{
        if(!StringUtil.isNull(JSONObject.parseObject(jsonStr), "user_id", "project_id")){
            return objectService.searchInfoPoint(jsonStr);
        }
        return ToolsUtil.return_error_json;
    }

    /**
     * 查询对象分类
     * @param jsonStr
     * @return
     * @throws Exception
     */
    @Path("queryObjClassForInfoPointSel")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public String queryObjClassForInfoPointSel(String jsonStr) throws Exception{
        if(!StringUtil.isNull(JSONObject.parseObject(jsonStr), "user_id")){
            return objectService.queryObjClassForInfoPointSel(jsonStr);
        }
        return ToolsUtil.return_error_json;
    }

    /**
     * 查询对象下信息点
     * @param jsonStr
     * @return
     * @throws Exception
     */
    @Path("queryInfoPointForObject")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public String queryInfoPointForObject(String jsonStr) throws Exception{
        JSONObject jsonObject = JSONObject.parseObject(jsonStr);
        if(!StringUtil.isNull(jsonObject, "user_id", "obj_id", "obj_type")){
            String objType = jsonObject.getString("obj_type");
            String resultStr = null;
            if("equip".equals(objType))
                resultStr = objectService.queryInfoPointForEquip(jsonStr);
            if("system".equals(objType))
                resultStr = objectService.queryInfoPointForSystem(jsonStr);
            if("equip_class".equals(objType))
                resultStr = objectService.queryInfoPointForEquipClass(jsonStr);
            if("system_class".equals(objType))
                resultStr = objectService.queryInfoPointForSystemClass(jsonStr);
            return resultStr;
        }
        return ToolsUtil.return_error_json;
    }

    /**
     * 查询大类下的对象实例
     * @param jsonStr
     * @return
     * @throws Exception
     */
    @Path("queryObjectByClass")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public String queryObjectByClass(String jsonStr) throws Exception{
        if(!StringUtil.isNull(JSONObject.parseObject(jsonStr), "user_id", "project_id", "obj_id", "obj_type")){
            return objectService.queryObjectByClass(jsonStr);
        }
        return ToolsUtil.return_error_json;
    }
    
    

	/**
	 * 功能描述：设备管理-新增页-查询建筑下的系统实例
	 * @param jsonStr
	 * @return
	 * @throws Exception 
	 */
	@POST
	@Path("/querySystemForBuild")
	@Produces(MediaType.APPLICATION_JSON)
	public String querySystemForBuild(String jsonStr) throws Exception {
		JSONObject jsonObject = JSONObject.parseObject(jsonStr);
		if(StringUtil.isNull(jsonObject, "user_id","project_id", "build_id")) {
			return ToolsUtil.return_error_json;
		}
		return objectService.querySystemForBuild(jsonObject);
	}
}
