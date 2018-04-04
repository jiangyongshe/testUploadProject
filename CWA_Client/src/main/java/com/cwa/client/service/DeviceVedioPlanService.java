package com.cwa.client.service;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.cwa.client.dao.DeviceVedioPlanDao;
import com.cwa.client.model.Tb_Device_Vedio_Plan;
import com.cwa.client.utils.LogWriteUtil;

@Service
public class DeviceVedioPlanService {
	
	private static final LogWriteUtil logWriteUtil = LogWriteUtil.getSingleton();
	
	@Resource
	private DeviceVedioPlanDao deviceVedioPlanDao;
  
	public Tb_Device_Vedio_Plan findById(Integer id){
		return deviceVedioPlanDao.findById(id);
	}
	
	public void save(Tb_Device_Vedio_Plan entity) throws Exception{
		deviceVedioPlanDao.save(entity);
	}
	
	
	public void update(Tb_Device_Vedio_Plan entity) throws Exception {
		deviceVedioPlanDao.update(entity);
	}
}
