/**
 * @包名称 com.sagacloud.superclass.service
 * @文件名 TeamService.java
 * @创建者 wanghailong
 * @邮箱 wanghailong@persagy.com  
 * @修改描述 
 */

package com.sagacloud.superclass.service;

import java.util.List;

import com.alibaba.fastjson.JSONObject;
import com.sagacloud.superclass.pojo.Team;


/** 
 * 功能描述： 团队接口类型
 * @类型名称 TeamService
 * @创建者 wanghailong
 * @邮箱 wanghailong@persagy.com  
 * @修改描述 
 */
public interface TeamServiceI {

	/**
	 * 
	 * 功能描述：新增团队信息
	 * @param jsonObject
	 * @return
	 * @throws Exception 
	 * @创建者 wanghailong
	 * @邮箱 wanghailong@persagy.com 
	 * 修改描述
	 */
	public String insertRecord(JSONObject jsonObject) throws Exception;
	/**
	 * 
	 * 功能描述：修改团队信息
	 * @param jsonStr
	 * @return
	 * @throws Exception 
	 * @创建者 wanghailong
	 * @邮箱 wanghailong@persagy.com 
	 * 修改描述
	 */
	public String updateRecordById(String jsonStr) throws Exception;
	
	/**
	 * 功能描述：团队管理-根据查询团队详细信息
	 * @param jsonObject
	 * @return
	 */
	public String queryTeamById(JSONObject jsonObject);

	public List<Team> getAllRecord();
	
	/**
	 * 功能描述：团队管理-验证团队编号
	 * @param jsonObject
	 * @return
	 */
	public String verifyTeamNumExist(JSONObject jsonObject);
	
	/**
	 * 功能描述：团队管理-加入团队
	 * @param jsonObject
	 * @return
	 */
	public String joinTeam(JSONObject jsonObject);
	
	/**
	 * 功能描述：团队管理-加入团队
	 * @param jsonObject
	 * @return
	 */
	public String queryUserTeamList(JSONObject jsonObject);
	
	/**
	 * 功能描述：团队管理-查询团队成员列表
	 * @param jsonObject
	 * @return
	 */
	public String queryTeamUserList(JSONObject jsonObject);
	
	/**
	 * 功能描述：团队管理-删除团队成员
	 * @param jsonObject
	 * @return
	 */
	public String removeTeamUser(JSONObject jsonObject);
	
	/**
	 * 功能描述：团队管理-修改团队名称
	 * @param jsonObject
	 * @return
	 */
	public String updateTeamName(JSONObject jsonObject);
	
	/**
	 * 功能描述：团队管理-解散团队
	 * @param jsonObject
	 * @return
	 */
	public String invalidTeam(JSONObject jsonObject);
	
}
