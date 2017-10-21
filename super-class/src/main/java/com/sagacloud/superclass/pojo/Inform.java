package com.sagacloud.superclass.pojo;

import java.util.Date;

public class Inform {
    private String informId;

    private String userId;

    private String informType;

    private String content;

    private String status;

    private Date createTime;

    public String getInformId() {
        return informId;
    }

    public void setInformId(String informId) {
        this.informId = informId == null ? null : informId.trim();
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId == null ? null : userId.trim();
    }

    public String getInformType() {
        return informType;
    }

    public void setInformType(String informType) {
        this.informType = informType == null ? null : informType.trim();
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content == null ? null : content.trim();
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status == null ? null : status.trim();
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }
}