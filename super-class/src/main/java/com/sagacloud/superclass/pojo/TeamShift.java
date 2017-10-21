package com.sagacloud.superclass.pojo;

import java.util.Date;

public class TeamShift {
    private String shiftId;

    private String teamId;

    private String shiftName;

    private String shortName;

    private String startTime;

    private String endTime;

    private String maxUserNum;

    private String minUserNum;

    private String isMinRestDay;

    private String isMustJoin;

    private String minJoinNum;

    private String createrId;

    private Date createTime;

    public String getShiftId() {
        return shiftId;
    }

    public void setShiftId(String shiftId) {
        this.shiftId = shiftId == null ? null : shiftId.trim();
    }

    public String getTeamId() {
        return teamId;
    }

    public void setTeamId(String teamId) {
        this.teamId = teamId == null ? null : teamId.trim();
    }

    public String getShiftName() {
        return shiftName;
    }

    public void setShiftName(String shiftName) {
        this.shiftName = shiftName == null ? null : shiftName.trim();
    }

    public String getShortName() {
        return shortName;
    }

    public void setShortName(String shortName) {
        this.shortName = shortName == null ? null : shortName.trim();
    }

    public String getStartTime() {
        return startTime;
    }

    public void setStartTime(String startTime) {
        this.startTime = startTime == null ? null : startTime.trim();
    }

    public String getEndTime() {
        return endTime;
    }

    public void setEndTime(String endTime) {
        this.endTime = endTime == null ? null : endTime.trim();
    }

    public String getMaxUserNum() {
        return maxUserNum;
    }

    public void setMaxUserNum(String maxUserNum) {
        this.maxUserNum = maxUserNum == null ? null : maxUserNum.trim();
    }

    public String getMinUserNum() {
        return minUserNum;
    }

    public void setMinUserNum(String minUserNum) {
        this.minUserNum = minUserNum == null ? null : minUserNum.trim();
    }

    public String getIsMinRestDay() {
        return isMinRestDay;
    }

    public void setIsMinRestDay(String isMinRestDay) {
        this.isMinRestDay = isMinRestDay == null ? null : isMinRestDay.trim();
    }

    public String getIsMustJoin() {
        return isMustJoin;
    }

    public void setIsMustJoin(String isMustJoin) {
        this.isMustJoin = isMustJoin == null ? null : isMustJoin.trim();
    }


    public String getMinJoinNum() {
        return minJoinNum;
    }

    public void setMinJoinNum(String minJoinNum) {
        this.minJoinNum = minJoinNum == null ? null : minJoinNum.trim();
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