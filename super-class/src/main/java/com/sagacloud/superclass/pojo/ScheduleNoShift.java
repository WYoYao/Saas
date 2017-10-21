package com.sagacloud.superclass.pojo;

import java.util.Date;

public class ScheduleNoShift {
    private String noShiftId;

    private String scheduleId;

    private String userIds;

    private String shiftIds;

    private String shiftNames;

    private String createrId;

    private Date createTime;

    public String getNoShiftId() {
        return noShiftId;
    }

    public void setNoShiftId(String noShiftId) {
        this.noShiftId = noShiftId == null ? null : noShiftId.trim();
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

    public String getShiftIds() {
        return shiftIds;
    }

    public void setShiftIds(String shiftIds) {
        this.shiftIds = shiftIds == null ? null : shiftIds.trim();
    }

    public String getShiftNames() {
        return shiftNames;
    }

    public void setShiftNames(String shiftNames) {
        this.shiftNames = shiftNames == null ? null : shiftNames.trim();
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