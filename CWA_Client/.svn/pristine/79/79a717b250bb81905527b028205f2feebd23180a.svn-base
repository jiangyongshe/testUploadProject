package com.cwa.client.service;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Service;

import com.cwa.client.dao.AdvertiseOrderDetailDao;
import com.cwa.client.dto.AdvertiseInfoDto;
import com.cwa.client.model.Tb_Order_Detail;
import com.cwa.client.utils.LogWriteUtil;

@Service
public class OrderDetailService {
	
	private static final LogWriteUtil logWriteUtil = LogWriteUtil.getSingleton();
	
	@Resource
	private AdvertiseOrderDetailDao advertiseOrderDetailDao;
  
	public Tb_Order_Detail findById(Integer id){
		return advertiseOrderDetailDao.findById(id);
	}
	
	public void save(Tb_Order_Detail entity) throws Exception{
		advertiseOrderDetailDao.save(entity);
	}
	
	
	public void update(Tb_Order_Detail entity) throws Exception {
		advertiseOrderDetailDao.update(entity);
	}
	
	public List<AdvertiseInfoDto> queryOrderDetailAndOrderBySerialNum(String orderId,String accountId)throws Exception{
		return advertiseOrderDetailDao.queryOrderDetailAndOrderBySerialNum(orderId,accountId);
	}
}
