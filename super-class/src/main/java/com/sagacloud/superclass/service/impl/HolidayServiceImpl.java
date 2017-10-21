package com.sagacloud.superclass.service.impl;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sagacloud.superclass.dao.HolidayMapper;
import com.sagacloud.superclass.pojo.Holiday;
import com.sagacloud.superclass.service.HolidayServiceI;

/**
 * 功能描述：节假日
 * @author gezhanbin
 *
 */
@Service("holidayService")
public class HolidayServiceImpl implements HolidayServiceI {
	@Autowired
	private HolidayMapper holidayMapper;
	
	public Map<Date, String> queryHolidayMap() {
		Map<Date, String> holidayMap = new HashMap<>();
		List<Holiday> holidays = holidayMapper.select();
		if(holidays != null && holidays.size() > 0) {
			for(Holiday holiday : holidays) {
				Date day = holiday.getDay();
				String dayType = holiday.getDayType();
				holidayMap.put(day, dayType);
			}
		}
		return holidayMap;
	}
}
