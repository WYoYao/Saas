package com.sagacloud.saas.service;

import com.alibaba.fastjson.JSONObject;

public interface FloorServiceI {

	/**
	 * 功能描述：空间管理-首页:添加楼层信息
	 * @param jsonObject
	 * @throws Exception
	 * @return
	 */
	public String addFloor(JSONObject jsonObject) throws Exception;
	
	/**
	 * 功能描述：空间管理-首页:查询某建筑下楼层信息
	 * @param jsonObject
	 * @throws Exception
	 * @return
	 */
	public String queryFloorWithOrder(JSONObject jsonObject) throws Exception;
	
	/**
	 * 功能描述：空间管理-首页:根据id查询楼层详细信息
	 * @param jsonObject
	 * @throws Exception
	 * @return
	 */
	public String queryFloorById(JSONObject jsonObject) throws Exception;
	
	/**
	 * 功能描述：空间管理-首页:更改楼层顺序
	 * @param jsonObject
	 * @throws Exception
	 * @return
	 */
	public String updateFloorOrder(JSONObject jsonObject) throws Exception;
	
	/**
	 * 功能描述：空间管理-详细页:编辑楼层信息
	 * @param jsonObject
	 * @throws Exception
	 * @return
	 */
	public String updateFloorInfo(JSONObject jsonObject) throws Exception;
	

	/**
	 * 功能描述：空间管理-新增页/编辑页:验证楼层名称是否可以使用
	 * @param jsonObject
	 * @return
	 */
	public String verifyFloorName(JSONObject jsonObject) throws Exception;
	
	/**
	 * 功能描述：空间管理-新增页/编辑页:验证楼层编码是否可以使用
	 * @param jsonObject
	 * @return
	 */
	public String verifyFloorLocalId(JSONObject jsonObject) throws Exception;
	
	/**
	 * 功能描述：空间管理-新增页/编辑页:验证楼层BIM模型中编码是否可以使用
	 * @param jsonObject
	 * @return
	 */
	public String verifyFloorBimId(JSONObject jsonObject) throws Exception;
	
	/**
	 * 功能描述：空间管理-详细页:查询楼层信息点的历史信息
	 * @param jsonObject
	 * @return
	 */
	public String queryFloorInfoPointHis(JSONObject jsonObject) throws Exception;
	
	/**
	 * 功能描述：空间名片页:查询某建筑下楼层列表
	 * @param jsonObject
	 * @return
	 */
	public String queryFloorList(JSONObject jsonObject) throws Exception;
	
	
}
