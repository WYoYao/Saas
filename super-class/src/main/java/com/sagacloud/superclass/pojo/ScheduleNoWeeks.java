package com.sagacloud.superclass.pojo;

import java.util.Date;

public class ScheduleNoWeeks {
    private String noWeeksId;

    private String scheduleId;

    private String userIds;

    private String weeksCodes;

    private String weeksNames;

    private String createrId;

    private Date createTime;

    public String getNoWeeksId() {
        return noWeeksId;
    }

    public void setNoWeeksId(String noWeeksId) {
        this.noWeeksId = noWeeksId == null ? null : noWeeksId.trim();
    }

    public String getScheduleId() {
        return scheduleId;
    }

    public void setScheduleId(String scheduleId) {
        this.scheduleId = scheduleId == null ? null : scheduleId.trim();
    }

    public String getUserIds() {
        return userIds;
    }

    public void setUserIds(String userIds) {
        this.userIds = userIds == null ? null : userIds.trim();
    }

    public String getWeeksCodes() {
        return weeksCodes;
    }

    public void setWeeksCodes(String weeksCodes) {
        this.weeksCodes = weeksCodes == null ? null : weeksCodes.trim();
    }

    public String getWeeksNames() {
        return weeksNames;
    }

    public void setWeeksNames(String weeksNames) {
        this.weeksNames = weeksNames == null ? null : weeksNames.trim();
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
}