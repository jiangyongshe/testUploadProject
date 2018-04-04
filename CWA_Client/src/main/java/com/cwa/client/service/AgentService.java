package com.cwa.client.service;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.cwa.client.dao.AgentDao;
import com.cwa.client.dto.AgentDto;
import com.cwa.client.utils.LogWriteUtil;

@Service
public class AgentService {
	
	private static LogWriteUtil util=LogWriteUtil.getSingleton();
	
	@Resource
	private AgentDao agentDao;
	
	public AgentDto findAgentByAgentId(String agentId){
		return agentDao.findAgentByAgentId(agentId);
	}
}
