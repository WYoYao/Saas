package com.sagacloud.superclass.pojo;

import java.util.Date;

public class Work_calendar {
    private String workCalId;

    private String teamId;

    private String scheduleId;

    private Date calendarDate;

    private String dayType;

    private String workShifts;

    private String valid;

    private String createrId;

    private Date createTime;

    private Date updateTime;

    public String getWorkCalId() {
        return workCalId;
    }

    public void setWorkCalId(String workCalId) {
        this.workCalId = workCalId == null ? null : workCalId.trim();
    }

    public String getTeamId() {
        return teamId;
    }

    public void setTeamId(String teamId) {
        this.teamId = teamId == null ? null : teamId.trim();
    }

    public String getScheduleId() {
        return scheduleId;
    }

    public void setScheduleId(String scheduleId) {
        this.scheduleId = scheduleId == null ? null : scheduleId.trim();
    }

    public Date getCalendarDate() {
        return calendarDate;
    }

    public void setCalendarDate(Date calendarDate) {
        this.calendarDate = calendarDate;
    }

    public String getDayType() {
        return dayType;
    }

    public void setDayType(String dayType) {
        this.dayType = dayType == null ? null : dayType.trim();
    }

    public String getWorkShifts() {
        return workShifts;
    }

    public void setWorkShifts(String workShifts) {
        this.workShifts = workShifts == null ? null : workShifts.trim();
    }

    public String getValid() {
        return valid;
    }

    public void setValid(String valid) {
        this.valid = valid == null ? null : valid.trim();
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

    public Date getUpdateTime() {
        return updateTime;
    }

    public void setUpdateTime(Date updateTime) {
        this.updateTime = updateTime;
    }
}