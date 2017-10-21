package com.sagacloud.superclass.pojo;

import java.util.Date;

public class UserCustom {
	private String userId;
	
	private String lastTeamId;
	
	private Date createTime;

	private Date updateTime;

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getLastTeamId() {
		return lastTeamId;
	}

	public void setLastTeamId(String lastTeamId) {
		this.lastTeamId = lastTeamId;
	}

	public Date getCreateTime() {
		return createTime;
	}

	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}

	public Date getUpdateTime() {
		return updateTime;
	}

	public void setUpdateTime(Date updateTime) {
		this.updateTime = updateTime;
	}
	
}
