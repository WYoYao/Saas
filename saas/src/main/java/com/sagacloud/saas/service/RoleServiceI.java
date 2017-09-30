package com.sagacloud.saas.service;

import com.alibaba.fastjson.JSONObject;

public interface RoleServiceI {

	/**
	 * @desc 角色管理-新增/编辑页:查询权限项列表
	 * @param jsonObject
	 * @return
	 */
	public String queryFuncPackList(JSONObject jsonObject);
	
	/**
	 * @desc 角色管理-新增页:添加角色信息
	 * @param jsonObject
	 * @throws Exception
	 * @return
	 */
	public String addRole(JSONObject jsonObject) throws Exception;
	
	/**
	 * @desc 角色管理-列表页:查询角色列表
	 * @param jsonObject
	 * @return
	 */
	public String queryRoleList(JSONObject jsonObject);
	
	/**
	 * @desc 角色管理-编辑页:根据id查询角色功能权限信息
	 * @param jsonObject
	 * @return
	 */
	public String queryRoleFuncPack(JSONObject jsonObject);
	
	/**
	 * @desc 角色管理-详细页:根据id查询角色详细信息
	 * @param jsonObject
	 * @return
	 */
	public String queryRoleDetailById(JSONObject jsonObject);
	
	/**
	 * @desc 角色管理-编辑页:根据Id编辑角色信息
	 * @param jsonObject
	 * @throws Exception
	 * @return
	 */
	public String updateRoleById(JSONObject jsonObject) throws Exception;
}
