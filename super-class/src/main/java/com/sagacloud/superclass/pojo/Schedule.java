package com.sagacloud.superclass.pojo;

import java.util.Date;

public class Schedule {
    private String scheduleId;

    private String teamId;

    private String shifts;

    private String isTurnShift;

    private String turnShiftCycle;

    private String turnShifts;

    private String isWeekendRest;

    private String isHolidayRest;

    private String isSpecialDayShift;

    private String specialDayIds;

    private Date startTime;

    private Date endTime;

    private String dayNum;

    private String minWorkDays;

    private String maxWeekendRestDays;

    private String maxConsecutiveRestDays;

    private String status;

    private String createrId;

    private Date createTime;

    private Date updateTime;

    public String getScheduleId() {
        return scheduleId;
    }

    public void setScheduleId(String scheduleId) {
        this.scheduleId = scheduleId == null ? null : scheduleId.trim();
    }

    public String getTeamId() {
        return teamId;
    }

    public void setTeamId(String teamId) {
        this.teamId = teamId == null ? null : teamId.trim();
    }

    public String getShifts() {
        return shifts;
    }

    public void setShifts(String shifts) {
        this.shifts = shifts == null ? null : shifts.trim();
    }

    public String getIsTurnShift() {
        return isTurnShift;
    }

    public void setIsTurnShift(String isTurnShift) {
        this.isTurnShift = isTurnShift == null ? null : isTurnShift.trim();
    }

    public String getTurnShiftCycle() {
        return turnShiftCycle;
    }

    public void setTurnShiftCycle(String turnShiftCycle) {
        this.turnShiftCycle = turnShiftCycle == null ? null : turnShiftCycle.trim();
    }

    public String getTurnShifts() {
        return turnShifts;
    }

    public void setTurnShifts(String turnShifts) {
        this.turnShifts = turnShifts == null ? null : turnShifts.trim();
    }

    public String getIsWeekendRest() {
        return isWeekendRest;
    }

    public void setIsWeekendRest(String isWeekendRest) {
        this.isWeekendRest = isWeekendRest == null ? null : isWeekendRest.trim();
    }

    public String getIsHolidayRest() {
        return isHolidayRest;
    }

    public void setIsHolidayRest(String isHolidayRest) {
        this.isHolidayRest = isHolidayRest == null ? null : isHolidayRest.trim();
    }

    public String getIsSpecialDayShift() {
        return isSpecialDayShift;
    }

    public void setIsSpecialDayShift(String isSpecialDayShift) {
        this.isSpecialDayShift = isSpecialDayShift == null ? null : isSpecialDayShift.trim();
    }

    public String getSpecialDayIds() {
        return specialDayIds;
    }

    public void setSpecialDayIds(String specialDayIds) {
        this.specialDayIds = specialDayIds == null ? null : specialDayIds.trim();
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

    public String getDayNum() {
        return dayNum;
    }

    public void setDayNum(String dayNum) {
        this.dayNum = dayNum == null ? null : dayNum.trim();
    }

    public String getMinWorkDays() {
        return minWorkDays;
    }

    public void setMinWorkDays(String minWorkDays) {
        this.minWorkDays = minWorkDays == null ? null : minWorkDays.trim();
    }

    public String getMaxWeekendRestDays() {
        return maxWeekendRestDays;
    }

    public void setMaxWeekendRestDays(String maxWeekendRestDays) {
        this.maxWeekendRestDays = maxWeekendRestDays == null ? null : maxWeekendRestDays.trim();
    }

    public String getMaxConsecutiveRestDays() {
        return maxConsecutiveRestDays;
    }

    public void setMaxConsecutiveRestDays(String maxConsecutiveRestDays) {
        this.maxConsecutiveRestDays = maxConsecutiveRestDays == null ? null : maxConsecutiveRestDays.trim();
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status == null ? null : status.trim();
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