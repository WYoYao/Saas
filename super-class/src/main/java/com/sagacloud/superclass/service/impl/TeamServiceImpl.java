/**
 * @包名称 com.sagacloud.superclass.service.impl
 * @文件名 TeamServiceImpl.java
 * @创建者 wanghailong
 * @邮箱 wanghailong@persagy.com  
 * @修改描述 
 */

package com.sagacloud.superclass.service.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.sagacloud.superclass.common.DateUtil;
import com.sagacloud.superclass.common.JsonUtil;
import com.sagacloud.superclass.common.ToolsUtil;
import com.sagacloud.superclass.common.DBConst.Result;
import com.sagacloud.superclass.dao.TeamMapper;
import com.sagacloud.superclass.dao.TeamUserRelMapper;
import com.sagacloud.superclass.pojo.Team;
import com.sagacloud.superclass.pojo.TeamUserRel;
import com.sagacloud.superclass.pojo.User;
import com.sagacloud.superclass.service.TeamServiceI;

/** 
 * 功能描述： 团队接口实现类
 * @类型名称 TeamServiceImpl
 * @创建者 wanghailong
 * @邮箱 wanghailong@persagy.com  
 * @修改描述 
 */
@Service("teamService")
public class TeamServiceImpl implements TeamServiceI {

	@Autowired
	private TeamMapper teamMapper;
	@Autowired
	private TeamUserRelMapper teamUserRelMapper;
	
	@Override
	public String insertRecord(JSONObject jsonObject) throws Exception {
		//返回结果
		JSONObject resultJson = JSONObject.parseObject("{}");
		String result = Result.SUCCESS;
		String resultMsg = "创建成功！";
		String userId = jsonObject.getString("userId");
		String teamName = jsonObject.getString("teamName");
		Team team = new Team();
		String teamId = ToolsUtil.getUuid();
		team.setTeamId(teamId);
		team.setTeamName(teamName);
		team.setCreaterId(userId);
		//团队编号
		Date date = new Date();
		team.setCreateTime(date);
		team.setUpdateTime(date);
		team.setValid("1");
		Integer teamNum = teamMapper.selectMaxTeamNum();
//		Integer teamNum = 1001;
		if(teamNum == null) {
			teamNum = 1001;
		} else {
			teamNum++;
		}
		team.setTeamNum(teamNum + "");
		int count = teamMapper.insert(team);
		if(count == 0) {
			//返回结果
			result = Result.SUCCESS;
			resultMsg = "创建失败！";
		} else {
			TeamUserRel teamUserRel = new TeamUserRel();
			String teamUserId = ToolsUtil.getUuid();
			teamUserRel.setTeamUserId(teamUserId);
			teamUserRel.setTeamId(teamId);
			teamUserRel.setUserId(userId);
			teamUserRel.setCreateTime(date);
			teamUserRel.setUserType("1");
			teamUserRel.setCreaterId(userId);
			teamUserRelMapper.insert(teamUserRel);
		}
		
		// 返回结果
		JSONObject item = new JSONObject();
		item.put("teamId", teamId);
		resultJson.put("Result", result);
		resultJson.put("ResultMsg", resultMsg);
		resultJson.put("Item", item);
		return resultJson.toJSONString();
	}

	@Override
	public String updateRecordById(String jsonStr) throws Exception {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String queryTeamById(JSONObject jsonObject) {
		String teamId = jsonObject.getString("teamId");
		Team team = teamMapper.selectByPrimaryKey(teamId);
		if(team != null) {
			String resultStr = JSON.toJSONStringWithDateFormat(team, "yyyy-MM-dd HH:mm:ss");
			JSONObject item = JSONObject.parseObject(resultStr);
			//查询团队人数
			int userCount = teamUserRelMapper.selectUserCountByTeamId(teamId);
			item.put("userCount", userCount + "");
			return JsonUtil.getSuccessRecordJson(item);
		} else {
			return JsonUtil.getFailureResultJson("该团队不存在！");
		}
	}

	@Override
	public List<Team> getAllRecord() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String verifyTeamNumExist(JSONObject jsonObject) {
//		String userId = jsonObject.getString("userId");
		String teamNum = jsonObject.getString("teamNum");
		Team team = teamMapper.selectByTeamNum(teamNum);
		boolean isExist = true;
		if(team == null) {
			//不存在
			isExist = false;
		}
		JSONObject item = new JSONObject();
		item.put("isExist", isExist);
		JSONObject resultJson = new JSONObject();
		resultJson.put(Result.RESULT, Result.SUCCESS);
		resultJson.put("Item", item);
		resultJson.put(Result.RESULTMSG, "");
		return resultJson.toJSONString();
	}

	@Override
	public String joinTeam(JSONObject jsonObject) {
		JSONObject resultJson = JSONObject.parseObject("{}");
		JSONObject item = new JSONObject();
		String result = Result.SUCCESS;
		String resultMsg = "加入团队成功！";
		String userId = jsonObject.getString("userId");
		String teamNum = jsonObject.getString("teamNum");
		//查询团队信息
		Team team = teamMapper.selectByTeamNum(teamNum);
		if(team == null) {
			result = Result.FAILURE;
			resultMsg = "该团队号不存在！";
		} else {
			String teamId = team.getTeamId();
			int userCount = teamUserRelMapper.selectUserCountByTeamId(teamId);
			if(userCount >= 300) {
				return JsonUtil.getFailureResultJson("该团队成员人数已到上限");
			}
			
			TeamUserRel teamUserRel = new TeamUserRel();
			String teamUserId = ToolsUtil.getUuid();
			teamUserRel.setTeamUserId(teamUserId);
			teamUserRel.setTeamId(teamId);
			teamUserRel.setUserId(userId);
			Date date = new Date();
			teamUserRel.setCreateTime(date);
			teamUserRel.setUserType("2");
			teamUserRel.setCreaterId(userId);
			int count = teamUserRelMapper.insert(teamUserRel);
			if(count == 0) {
				result = Result.FAILURE;
				resultMsg = "加入团队失败！";
			} else {
				String itemStr = JSON.toJSONStringWithDateFormat(team, DateUtil.sdf_time);
				item = JSONObject.parseObject(itemStr);
			}
		}
		// 返回结果
		resultJson.put("Result", result);
		resultJson.put("ResultMsg", resultMsg);
		resultJson.put("Item", item);
		return resultJson.toJSONString();
	}

	@Override
	public String queryUserTeamList(JSONObject jsonObject) {
		String userId = jsonObject.getString("userId");
		List<TeamUserRel> teamUserRels = teamUserRelMapper.selectByUserId(userId);
		if(teamUserRels != null) {
			List<String> teamIdLIst = new ArrayList<>();
			for (int i = 0; i < teamUserRels.size(); i++) {
				TeamUserRel teamUserRel = teamUserRels.get(i);
				Team team = teamUserRel.getTeam();
				String teamId = team.getTeamId();
				if(!teamIdLIst.contains(teamId)) {
					teamIdLIst.add(teamId);
				}
			}
			Map<String, Integer> userCountMap = new HashMap<>();
			if(teamIdLIst.size() > 0) {
				List<Map<String, Object>> userCountMapList = teamUserRelMapper.selectUserCountMapByTeamIds(teamIdLIst);
				if(userCountMapList != null) {
					for(Map<String, Object> map : userCountMapList) {
						String key = (String) map.get("team_id");
						Long value = (Long) map.get("userCount");
						userCountMap.put(key, value.intValue());
					}
				}
			}
			JSONArray contentSelfs = new JSONArray();
			JSONArray contentOthers = new JSONArray();
			JSONObject item = null;
			for (int i = 0; i < teamUserRels.size(); i++) {
				TeamUserRel teamUserRel = teamUserRels.get(i);
				Team team = teamUserRel.getTeam();
				String teamId = team.getTeamId();
				String itemStr = JSON.toJSONStringWithDateFormat(team, DateUtil.sdf_time);
				item = JSONObject.parseObject(itemStr);
				boolean isMyCreate = false;
				String createrId = team.getCreaterId();
				if(userId.equals(createrId)) {
					isMyCreate = true;
					contentSelfs.add(item);
				} else {
					contentOthers.add(item);
				}
				item.put("isMyCreate", isMyCreate);
				Integer userCount = userCountMap.get(teamId);
				if(userCount == null) {
					userCount = 0;
				}
				item.put("userCount", userCount + "");
			}
			JSONArray contents = new JSONArray();
			//排序 创建时间倒序排序
			if(contentSelfs.size() > 0) {
				contentSelfs = JsonUtil.sortByDateField(contentSelfs, "createTime", -1);
				contents.addAll(contentSelfs);
			}
			if(contentOthers.size() > 0) {
				contentOthers = JsonUtil.sortByDateField(contentOthers, "createTime", -1);
				contents.addAll(contentOthers);
			}
			return JsonUtil.getSuccessRecordsJson(contents, contents.size());
		} else {
			return JsonUtil.getFailureResultJson("该人员未加入任何团队！");
		}
	}

	@Override
	public String queryTeamUserList(JSONObject jsonObject) {
		String userId = jsonObject.getString("userId");
		String teamId = jsonObject.getString("teamId");
		
		List<TeamUserRel> teamUserRels = teamUserRelMapper.selectUserByTeamIds(teamId);
		JSONArray contents = new JSONArray();
		if(teamUserRels != null) {
			for(TeamUserRel teamUserRel : teamUserRels) {
				String userType = teamUserRel.getUserType();
				User user = teamUserRel.getUser();
				String userId_ = user.getUserId();
				String nickname = user.getNickname();
				String headPortrait = user.getHeadPortrait();
				String isCurrentUser = "0";
				if(userId.equals(userId_)) {
					isCurrentUser = "1";
				}
				JSONObject item = new JSONObject();
				item.put("userId", userId_);
				item.put("userType", userType);
				item.put("nickname", nickname);
				item.put("headPortrait", headPortrait);
				item.put("isCurrentUser", isCurrentUser);
				contents.add(item);
			}
		}
		return JsonUtil.getSuccessRecordsJson(contents, contents.size());
	}

	@Override
	public String removeTeamUser(JSONObject jsonObject) {
		String userId = jsonObject.getString("userId");
		String teamId = jsonObject.getString("teamId");
		String removeUserId = jsonObject.getString("removeUserId");
		int count = teamUserRelMapper.deleteByUserTeamId(teamId, removeUserId);
		if(count == 0) {
			return JsonUtil.getFailureResultJson("删除失败！");
		} else {
			return JsonUtil.getSuccessResultJson("删除成功！");
		}
	}

	@Override
	public String updateTeamName(JSONObject jsonObject) {
		// TODO Auto-generated method stub
		String userId = jsonObject.getString("userId");
		String teamId = jsonObject.getString("teamId");
		String teamName = jsonObject.getString("teamName");
		Team team = new Team();
		team.setTeamId(teamId);
		team.setTeamName(teamName);
		int count = teamMapper.updateByPrimaryKeySelective(team);
		if(count == 0) {
			return JsonUtil.getFailureResultJson("修改失败！");
		} else {
			return JsonUtil.getSuccessResultJson("修改成功！");
		}
	}

	@Override
	public String invalidTeam(JSONObject jsonObject) {
		String userId = jsonObject.getString("userId");
		String teamId = jsonObject.getString("teamId");
		Team team = new Team();
		team.setTeamId(teamId);
		team.setValid("0");
		int count = teamMapper.updateByPrimaryKeySelective(team);
		if(count == 0) {
			return JsonUtil.getFailureResultJson("修改失败！");
		} else {
			teamUserRelMapper.deleteByTeamId(teamId);
			return JsonUtil.getSuccessResultJson("修改成功！");
		}
	}

}
