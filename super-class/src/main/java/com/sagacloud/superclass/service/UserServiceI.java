package com.sagacloud.superclass.service;

import java.util.List;
import java.util.Map;

import com.alibaba.fastjson.JSONObject;

public interface UserServiceI {
	/**
	 * @desc 个人登录：发送验证码
	 * @param jsonObject
	 * @throws Exception
	 * @return
	 */
	public String smsSendCode(JSONObject jsonObject) throws Exception;
	
	/**
	 *
	 * 功能描述：登录
	 * @param jsonObject
	 * @return
	 * @创建者 wanghailong
	 * @邮箱 wanghailong@persagy.com
	 * @修改描述
	 */
	public String userLogin(JSONObject jsonObject) throws Exception;
	
	/**
	 *
	 * 功能描述：切换团队-记录用户最后一次所在的团队
	 * @param jsonObject
	 * @return
	 * @创建者 wanghailong
	 * @邮箱 wanghailong@persagy.com
	 * @修改描述
	 */
	public String saveLastTeam(JSONObject jsonObject) throws Exception;
	
	/**
	 *
	 * 功能描述：个人中心-查询用户详细信息
	 * @param jsonObject
	 * @return
	 * @创建者 wanghailong
	 * @邮箱 wanghailong@persagy.com
	 * @修改描述
	 */
	public String queryUserById(JSONObject jsonObject) throws Exception;
	
	/**
	 *
	 * 功能描述：个人中心-修改用户信息
	 * @param jsonObject
	 * @return
	 * @创建者 wanghailong
	 * @邮箱 wanghailong@persagy.com
	 * @修改描述
	 */
	public String updateUser(JSONObject jsonObject) throws Exception;
	
	/**
	 *
	 * 功能描述：个人中心-修改用户手机号
	 * @param jsonObject
	 * @return
	 * @创建者 wanghailong
	 * @邮箱 wanghailong@persagy.com
	 * @修改描述
	 */
	public String updateUserPhoneNum(JSONObject jsonObject) throws Exception;
	
	/**
	 * 功能描述：查询用户id与用户名
	 * @param userIdList
	 * @return
	 */
	public Map<String, String> queryUserByUserIdList(List<String> userIdList);
}
