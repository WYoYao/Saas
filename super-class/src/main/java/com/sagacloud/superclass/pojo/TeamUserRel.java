package com.sagacloud.superclass.pojo;

import java.util.Date;

public class TeamUserRel {
    private String teamUserId;

    private String teamId;

    private String userId;

    private String userType;

    private String createrId;

    private Date createTime;

    private Team team;
    
    private User user;
    
    public String getTeamUserId() {
        return teamUserId;
    }

    public void setTeamUserId(String teamUserId) {
        this.teamUserId = teamUserId == null ? null : teamUserId.trim();
    }

    public String getTeamId() {
        return teamId;
    }

    public void setTeamId(String teamId) {
        this.teamId = teamId == null ? null : teamId.trim();
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId == null ? null : userId.trim();
    }

    public String getUserType() {
        return userType;
    }

    public void setUserType(String userType) {
        this.userType = userType == null ? null : userType.trim();
    }

    public String getCreaterId() {
        return createrId;
    }

    public void setCreaterId(String createrId) {
        this.createrId = createrId == null ? null : createrId.trim();
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

	public Team getTeam() {
		return team;
	}

	public void setTeam(Team team) {
		this.team = team;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}
    
    
}