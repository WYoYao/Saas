package com.sagacloud.saas.resource;

import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.springframework.beans.factory.annotation.Autowired;

import com.sagacloud.saas.service.DictionaryServiceI;

/**
 * 功能描述：数据字典查询
 * @author gezhanbin
 *
 */
@Path("/restDictService")
public class RestDictService {

	@Autowired
	private DictionaryServiceI dictionaryService;
	
	/**
	 * @desc 数据字典:查询建筑功能类型
	 * @param jsonStr
	 * @return
	 * @throws Exception
	 */
	@POST
	@Path("/queryAllBuildingCode")
	@Produces(MediaType.APPLICATION_JSON)
	public String queryAllBuildingCode(String jsonStr) throws Exception {
		return dictionaryService.queryAllListBuildingCode();
	}
	
	/**
	 * @desc 数据字典:查询方位信息
	 * @param jsonStr
	 * @return
	 * @throws Exception
	 */
	@POST
	@Path("/queryAllDirectionCode")
	@Produces(MediaType.APPLICATION_JSON)
	public String queryAllDirectionCode(String jsonStr) throws Exception {
		return dictionaryService.queryAllListDirectionCode();
	}
	
	
	/**
	 * 功能描述：设备管理-新增页:查询专业-系统类型-设备类型
	 * @param jsonStr
	 * @return
	 * @throws Exception
	 */
	@POST
	@Path("/queryAllEquipCategory")
	@Produces(MediaType.APPLICATION_JSON)
	public String queryAllEquipCategory(String jsonStr) throws Exception {
		return dictionaryService.queryAllEquipCategory();
	}
}
