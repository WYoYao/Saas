package com.sagacloud.superclass.service;

import java.util.List;
import java.util.Map;

import com.sagacloud.superclass.pojo.TeamShift;

public interface TeamShiftServiceI {

	/**
	 * 功能描述：获取用户id-简称
	 * @param shiftIdList
	 * @return
	 */
	public Map<String, TeamShift> queryShiftShortNameMap(List<String> shiftIdList);
}
