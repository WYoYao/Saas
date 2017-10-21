package com.sagacloud.superclass.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sagacloud.superclass.dao.TeamShiftMapper;
import com.sagacloud.superclass.pojo.TeamShift;
import com.sagacloud.superclass.service.TeamShiftServiceI;
import com.sagacloud.superclass.service.UserServiceI;

/**
 * 功能描述：班次
 * @author gezhanbin
 *
 */
@Service("teamShiftService")
public class TeamShiftServiceImp implements TeamShiftServiceI {
	@Autowired
	private TeamShiftMapper teamShiftMapper;
	@Override
	public Map<String, TeamShift> queryShiftShortNameMap(List<String> shiftIdList) {
		Map<String, TeamShift> teamShiftMap = new HashMap<>(); 
		if(shiftIdList.size() > 0) {
			List<TeamShift> shiftShortNameMapList = teamShiftMapper.selectByShiftIdList(shiftIdList);
			if(shiftShortNameMapList != null) {
				for(TeamShift shift : shiftShortNameMapList) {
					String key = shift.getShiftId();
					teamShiftMap.put(key, shift);
				}
			}
		}
		return teamShiftMap;
	}

	
}
