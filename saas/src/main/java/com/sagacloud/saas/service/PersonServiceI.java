package com.sagacloud.saas.service;

import com.alibaba.fastjson.JSONObject;

public interface PersonServiceI {

	/**
	 * @desc 人员信息-新增页:添加人员信息
	 * @param jsonObject
	 * @throws Exception
	 * @return
	 */
	public String addPerson(JSONObject jsonObject) throws Exception;
	
	/**
	 * @desc 人员信息-列表页:查询项目下岗位列表
	 * @param jsonObject
	 * @throws Exception
	 * @return
	 */
	public String queryPositionsByProjectId(JSONObject jsonObject) throws Exception;
	
	/**
	 * @desc 人员信息-新增页:查询项目下标签列表
	 * @param jsonObject
	 * @throws Exception
	 * @return
	 */
	public String queryPersonTagsByProjectId(JSONObject jsonObject) throws Exception;
	
	/**
	 * @desc 人员信息-列表页:查询人员列表
	 * @param jsonObject
	 * @throws Exception
	 * @return
	 */
	public String queryPersonList(JSONObject jsonObject) throws Exception;
	
	/**
	 * @desc 人员信息-列表页:查询人员缩略图
	 * @param jsonObject
	 * @throws Exception
	 * @return
	 */
	public String queryPersonWithGroup(JSONObject jsonObject) throws Exception;
	
	/**
	 * @desc 人员信息-详细页:根据查询人员详细信息
	 * @param jsonObject
	 * @throws Exception
	 * @return
	 */
	public String queryPersonDetailById(JSONObject jsonObject) throws Exception;
	
	/**
	 * @desc 人员信息-详细页:根据Id废弃（离职）人员信息
	 * @param jsonObject
	 * @throws Exception
	 * @return
	 */
	public String discardPersonById(JSONObject jsonObject) throws Exception;
	
	/**
	 * @desc 人员信息-详细页:根据Id恢复已废弃的人员信息
	 * @param jsonObject
	 * @throws Exception
	 * @return
	 */
	public String regainPersonById(JSONObject jsonObject) throws Exception;
	
	/**
	 * @desc 人员信息-编辑页:根据Id编辑人员信息
	 * @param jsonObject
	 * @throws Exception
	 * @return
	 */
	public String updatePersonById(JSONObject jsonObject) throws Exception;

	/**
	 * @desc 人员信息-编辑页:根据Id编辑人员信息
	 * @param jsonObject
	 * @throws Exception
	 * @return
	 */
	public String queryProjectPersonSel(JSONObject jsonObject) throws Exception;

	/**
	 * 工单配置-新增页:查询岗位下在职的人
	 * @param jsonObject
	 * @return
	 * @throws Exception
	 */
	public String queryValidPersonForPosition(JSONObject jsonObject) throws Exception;

	/**
	 * 工单配置-新增页:查询项目岗位人员列表
	 * @param jsonObject
	 * @return
	 * @throws Exception
	 */
	public String queryPositionPersonSel(JSONObject jsonObject) throws Exception;
}
