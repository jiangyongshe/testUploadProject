package com.cwa.client.dao;

import java.util.List;

import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.RowMapper;

import com.cwa.client.dto.AgentDto;
import com.cwa.client.model.Tb_Agent;
import com.cwa.client.utils.Constant;
import com.cwa.client.utils.LogWriteUtil;

public class AgentDao extends BaseDao<Tb_Agent, AgentDto> implements Constant{
	
	private static final LogWriteUtil logWriteUtil = LogWriteUtil.getSingleton();
	
	public AgentDto findAgentByAgentId(String agentId){
		String sql="select ID,COMPANY_ID,AGENT_ID from Tb_Agent where agent_id=? and status=2";
		RowMapper<AgentDto> rowmapper=BeanPropertyRowMapper.newInstance(AgentDto.class);
		List<AgentDto> list = getJdbcTemplate().query(sql, rowmapper, agentId);
		logWriteUtil.writeLog("", "++++listSize:"+list.size(), LOGLEVEL_INFO, AgentDao.class);
		return list.size()>0?list.get(0):null;
	}
}
