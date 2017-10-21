package com.sagacloud.superclass.pojo;

import java.util.Date;

public class SpecialDay {
    private String specialDayId;

    private String teamId;

    private String specialDayName;

    private String specialDayType;

    private Date startTime;

    private Date endTime;

    private String shifts;

    private String createrId;

    private Date createTime;

    public String getSpecialDayId() {
        return specialDayId;
    }

    public void setSpecialDayId(String specialDayId) {
        this.specialDayId = specialDayId == null ? null : specialDayId.trim();
    }

    public String getTeamId() {
        return teamId;
    }

    public void setTeamId(String teamId) {
        this.teamId = teamId == null ? null : teamId.trim();
    }

    public String getSpecialDayName() {
        return specialDayName;
    }

    public void setSpecialDayName(String specialDayName) {
        this.specialDayName = specialDayName == null ? null : specialDayName.trim();
    }

    public String getSpecialDayType() {
        return specialDayType;
    }

    public void setSpecialDayType(String specialDayType) {
        this.specialDayType = specialDayType == null ? null : specialDayType.trim();
    }

    public Date getStartTime() {
        return startTime;
    }

    public void setStartTime(Date startTime) {
        this.startTime = startTime;
    }

    public Date getEndTime() {
        return endTime;
    }

    public void setEndTime(Date endTime) {
        this.endTime = endTime;
    }

    public String getShifts() {
        return shifts;
    }

    public void setShifts(String shifts) {
        this.shifts = shifts == null ? null : shifts.trim();
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