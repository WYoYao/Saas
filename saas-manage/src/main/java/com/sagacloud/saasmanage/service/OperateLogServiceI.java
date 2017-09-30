/**
 * @包名称 com.sagacloud.service
 * @文件名 PersonServiceI.java
 * @创建者 wanghailong
 * @邮箱 wanghailong@persagy.com  
 * @修改描述 
 */

package com.sagacloud.saasmanage.service;

/** 
 * 功能描述： 人员操作接口
 * @类型名称 PersonServiceI
 * @创建者 wanghailong
 * @邮箱 wanghailong@persagy.com  
 * @修改描述 
 */
public interface OperateLogServiceI {
	/**
	 * 功能描述：新增记录
	 * @param operatePersonId
	 * @param tableName
	 * @param operateType
	 * @param requestMethod
	 * @param requestContent
	 * @param operateResult
	 * @param resultContent
	 * @return
	 * @throws Exception
	 * @创建者 wanghailong
	 * @邮箱 wanghailong@persagy.com
	 */
	public String insertRecord(String operatePersonId, String tableName, String operateType, String requestMethod, String requestContent, String operateResult, String resultContent) throws Exception;
	
	/**
	 * 
	 * 功能描述：根据条件查询记录
	 * @param jsonStr
	 * @return
	 * @throws Exception 
	 * @创建者 wanghailong
	 * @邮箱 wanghailong@persagy.com 
	 * 修改描述
	 */
	public String queryRecordByCondition(String jsonStr) throws Exception;

}
