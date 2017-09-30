package com.sagacloud.saas.service;

public interface LoginLogServiceI {

	/**
	 * 功能描述：登录日志
	 * @param user_id
	 * @param user_type
	 * @param user_ip
	 * @param browser
	 * @param terminal
	 * @param system
	 * @param login_result
	 * @param failure_reason
	 * @return
	 * @throws Exception
	 */
	public String insertRecord(String user_id, String user_type, String user_ip,
			String browser, String terminal, String system,String login_result,
			String failure_reason);
	
	/**
	 * 功能描述：退出日志
	 * @param user_id
	 * @return
	 */
	public String updateRecord(String user_id);
	
	
}
