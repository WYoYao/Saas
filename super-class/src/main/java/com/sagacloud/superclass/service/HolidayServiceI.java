package com.sagacloud.superclass.service;

import java.util.Date;
import java.util.Map;


public interface HolidayServiceI {

	/**
	 * 功能描述：获取所有节假期
	 * @return
	 */
	public Map<Date, String> queryHolidayMap();
}
