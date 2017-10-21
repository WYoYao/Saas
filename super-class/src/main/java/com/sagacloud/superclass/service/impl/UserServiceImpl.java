package com.sagacloud.superclass.service.impl;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.sagacloud.superclass.common.DataRequestPathUtil;
import com.sagacloud.superclass.common.DateUtil;
import com.sagacloud.superclass.common.StringUtil;
import com.sagacloud.superclass.common.ToolsUtil;
import com.sagacloud.superclass.common.DBConst.Result;
import com.sagacloud.superclass.dao.TeamMapper;
import com.sagacloud.superclass.dao.UserCustomMapper;
import com.sagacloud.superclass.dao.UserMapper;
import com.sagacloud.superclass.pojo.Team;
import com.sagacloud.superclass.pojo.User;
import com.sagacloud.superclass.pojo.UserCustom;
import com.sagacloud.superclass.service.UserServiceI;

/**
 * 功能描述：用户登录
 * @author gezhanbin
 *
 */
@Service("userService")
public class UserServiceImpl extends BaseService implements UserServiceI {
	@Value("${system-code}")
    public String systemCode;
    
    @Value("${image-secret}")
    public String systemSecret;

    @Autowired
    private UserMapper userMapper;
    
    @Autowired
    private UserCustomMapper userCustomMapper;
    
    @Autowired
    private TeamMapper teamMapper;
    
	@Override
	public String smsSendCode(JSONObject jsonObject) throws Exception {
		String phoneNum = jsonObject.getString("phoneNum");
		String url = getSmsPlatformPath(DataRequestPathUtil.smsPlat_send_code);
		JSONObject paramJson = JSONObject.parseObject("{}");
		paramJson.put("mobile", phoneNum);
		String result = httpPostRequest(url, paramJson.toJSONString());
		return result;
	}

	@Override
	public String userLogin(JSONObject jsonObject) throws Exception{
		String phoneNum = jsonObject.getString("phoneNum"); 
		String userPsw = jsonObject.getString("userPsw"); 
//		String login_result = "0";
		//返回结果
		JSONObject resultJson = JSONObject.parseObject("{}");
		String result = Result.SUCCESS;
		String resultMsg = "登录成功";

		JSONObject item = new JSONObject();
		//验证验证码
		String url = getSmsPlatformPath(DataRequestPathUtil.smsPlat_verify_code);
		JSONObject verifyParamJson = JSONObject.parseObject("{}");
		verifyParamJson.put("mobile", phoneNum);
		verifyParamJson.put("code", userPsw);
		String verifyMsg = httpPostRequest(url, verifyParamJson.toJSONString());
		JSONObject verifyJson = JSONObject.parseObject(verifyMsg);
		if(!"success".equals(verifyJson.getString("Result"))){
			result = Result.FAILURE;
			resultMsg = "用户名或密码错误";
		}else{
			//判断用户是否存在，如果不存在 则创建
			User user = userMapper.selectByPhoneNum(phoneNum);
			
			if(user == null) {
				//不存在 创建
				user = new User();
				String userId = ToolsUtil.getUuid();
				user.setUserId(userId);
				user.setPhoneNum(phoneNum);
				user.setNickname(phoneNum);
				Date date = new Date();
				user.setCreateTime(date);
				user.setUpdateTime(date);
				user.setValid("1");
				int count = userMapper.insert(user);
				if(count == 1) {
					String itemStr = JSON.toJSONStringWithDateFormat(user, DateUtil.sdf_time);
					item = JSONObject.parseObject(itemStr);
					item.put("systemId", systemCode);
					item.put("imageSecret", imageSecret);
					item.put("lastTeamId", "");
					item.put("lastTeamName", "");
					item.put("isMyCreate", false);
				} else {
					result = Result.FAILURE;
					resultMsg = "新用户创建失败！";
				}
			} else {
				String userId = user.getUserId();
				String itemStr = JSON.toJSONStringWithDateFormat(user, DateUtil.sdf_time);
				item = JSONObject.parseObject(itemStr);
				item.put("systemId", systemCode);
				item.put("imageSecret", imageSecret);
				//查找上次所在团队id
				UserCustom userCustom = userCustomMapper.selectByPrimaryKey(user.getUserId());
				String lastTeamId = "";
				String lastTeamName = "";
				Boolean isMyCreate = false;
				if(userCustom != null) {
					lastTeamId = userCustom.getLastTeamId();
					Team team = teamMapper.selectByPrimaryKey(lastTeamId);
					if(team != null) {
						lastTeamName = team.getTeamName();
						String userId_ = team.getCreaterId();
						if(userId.equals(userId_)) {
							isMyCreate = true;
						}
					}
				}
				item.put("lastTeamId", lastTeamId);
				item.put("lastTeamName", lastTeamName);
				item.put("isMyCreate", isMyCreate);
			}
			
		}
		// 返回结果
		resultJson.put("Result", result);
		resultJson.put("ResultMsg", resultMsg);
		resultJson.put("Item", item);
		
		
//		loginLogService.insertRecord(userName, user_type, user_ip, 
//				browser, terminal, system,
//				login_result, failure_reason);
		return resultJson.toJSONString();
	}

	@Override
	public String saveLastTeam(JSONObject jsonObject) throws Exception {
		JSONObject resultJson = JSONObject.parseObject("{}");
		String result = Result.SUCCESS;
		String resultMsg = "切换成功";
		String userId = jsonObject.getString("userId");
		String lastTeamId = jsonObject.getString("lastTeamId");
		UserCustom userCustom = userCustomMapper.selectByPrimaryKey(userId);
		int count = 0;
		UserCustom userCustom_new = new UserCustom();
		userCustom_new.setUserId(userId);
		userCustom_new.setLastTeamId(lastTeamId);
		Date date = new Date();
		userCustom_new.setUpdateTime(date);
		if(userCustom == null) {
			userCustom_new.setCreateTime(date);
			count = userCustomMapper.insert(userCustom_new);
		} else {
			count = userCustomMapper.updateByPrimaryKey(userCustom_new);
		}
		if(count == 0) {
			result = Result.FAILURE;
			resultMsg = "切换失败";
		}
		// 返回结果
		resultJson.put("Result", result);
		resultJson.put("ResultMsg", resultMsg);
		return resultJson.toJSONString();
	}

	@Override
	public String queryUserById(JSONObject jsonObject) throws Exception {
		//返回结果
		JSONObject resultJson = JSONObject.parseObject("{}");
		String result = Result.SUCCESS;
		String resultMsg = "查询成功";

		JSONObject item = new JSONObject();
		String queryUserId = jsonObject.getString("queryUserId");
		User user = userMapper.selectByPrimaryKey(queryUserId);
		if(user != null) {
			String itemStr = JSON.toJSONStringWithDateFormat(user, DateUtil.sdf_time);
			item = JSONObject.parseObject(itemStr);
			item.put("systemId", systemCode);
			item.put("imageSecret", imageSecret);
			//查找上次所在团队id
			UserCustom userCustom = userCustomMapper.selectByPrimaryKey(queryUserId);
			String lastTeamId = "";
			if(userCustom != null) {
				lastTeamId = userCustom.getLastTeamId();
			}
			item.put("lastTeamId", lastTeamId);
		} else {
			result = Result.FAILURE;
			resultMsg = "用户不存在！";
		}
		// 返回结果
		resultJson.put("Result", result);
		resultJson.put("ResultMsg", resultMsg);
		resultJson.put("Item", item);
		return resultJson.toJSONString();
	}

	@Override
	public String updateUser(JSONObject jsonObject) throws Exception {
		
		String userId = jsonObject.getString("userId");
		String nickname = jsonObject.getString("nickname");
		String headPortrait = jsonObject.getString("headPortrait");
		
		if(StringUtil.isNull(nickname) && StringUtil.isNull(headPortrait)) {
			return ToolsUtil.return_error_json;
		}
		
		//返回结果
		JSONObject resultJson = JSONObject.parseObject("{}");
		String result = Result.SUCCESS;
		String resultMsg = "修改成功";
		
		User user = new User();
		user.setUserId(userId);
		user.setNickname(nickname);
		user.setHeadPortrait(headPortrait);
		user.setUpdateTime(new Date());
		int count = userMapper.updateByPrimaryKeySelective(user);
		if(count == 0) {
			result = Result.FAILURE;
			resultMsg = "修改失败！";
		}
		
		// 返回结果
		resultJson.put("Result", result);
		resultJson.put("ResultMsg", resultMsg);
		return resultJson.toJSONString();
	}

	@Override
	public String updateUserPhoneNum(JSONObject jsonObject) throws Exception {
		String userId = jsonObject.getString("userId");
		String phoneNum = jsonObject.getString("phoneNum");
		String userPsw = jsonObject.getString("userPsw");
		
		//返回结果
		JSONObject resultJson = JSONObject.parseObject("{}");
		String result = Result.SUCCESS;
		String resultMsg = "更新手机号成功";

		JSONObject item = new JSONObject();
		//验证验证码
		String url = getSmsPlatformPath(DataRequestPathUtil.smsPlat_verify_code);
		JSONObject verifyParamJson = JSONObject.parseObject("{}");
		verifyParamJson.put("mobile", phoneNum);
		verifyParamJson.put("code", userPsw);
		String verifyMsg = httpPostRequest(url, verifyParamJson.toJSONString());
		JSONObject verifyJson = JSONObject.parseObject(verifyMsg);
		if(!"success".equals(verifyJson.getString("Result"))){
			result = Result.FAILURE;
			resultMsg = "用户名或密码错误";
		}else{
			//判断用户是否存在，如果不存在 则创建
			User user = userMapper.selectByPhoneNum(phoneNum);
			
			if(user != null && !userId.equals(user.getUserId())) {
				//手机号已存在
				result = Result.FAILURE;
				resultMsg = "该手机号已被注册过！";
			} else {
				//不存在   更新手机号
				user = new User();
				user.setUserId(userId);
				user.setPhoneNum(phoneNum);
				Date date = new Date();
				user.setUpdateTime(date);
				int count = userMapper.updateByPrimaryKeySelective(user);
				if(count == 0) {
					result = Result.FAILURE;
					resultMsg = "更新手机号失败！";
				}
			}
		}
		// 返回结果
		resultJson.put("Result", result);
		resultJson.put("ResultMsg", resultMsg);
		resultJson.put("Item", item);
		
		
		return resultJson.toJSONString();
	}

	@Override
	public Map<String, String> queryUserByUserIdList(List<String> userIdList) {
		Map<String, String> userNameMap = new HashMap<>();
		if(userIdList.size() > 0) {
			List<User> userList = userMapper.selectInByIds(userIdList);
			if(userList != null && userList.size() > 0) {
				for (User user : userList) {
					userNameMap.put(user.getUserId(), user.getNickname());
				}
			}
		}
		return userNameMap;
	}
	
	
	
}
