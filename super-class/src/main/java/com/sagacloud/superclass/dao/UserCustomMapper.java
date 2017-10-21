package com.sagacloud.superclass.dao;

import com.sagacloud.superclass.pojo.UserCustom;

public interface UserCustomMapper {
	/**
	 * 功能描述：根据主键查询数据
	 * @param userId
	 * @return
	 */
	UserCustom selectByPrimaryKey(String userId);
	
	/**
	 * 功能描述：插入数据
	 * @param userCustom
	 * @return
	 */
	int insert(UserCustom userCustom);
	/**
	 * 功能描述：根据主键更新数据
	 * @param userCustom
	 * @return
	 */
	int updateByPrimaryKey(UserCustom userCustom);
}
