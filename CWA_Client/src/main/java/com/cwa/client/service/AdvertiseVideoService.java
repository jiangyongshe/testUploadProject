package com.cwa.client.service;


import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.cwa.client.dao.AdvertiseOrderDao;
import com.cwa.client.dao.AdvertiseVideoDao;
import com.cwa.client.dto.VideoDto;
import com.cwa.client.model.Tb_Vedio_Audit;
import com.cwa.client.utils.LogWriteUtil;

@Service
public class AdvertiseVideoService {
	
	private static final LogWriteUtil logWriteUtil = LogWriteUtil.getSingleton();
	
	@Resource
	private AdvertiseVideoDao advertiseVideoDao;
	
	@Resource
	private AdvertiseOrderDao advertiseOrderDao;
	
  
	public Tb_Vedio_Audit findById(Integer id){
		return advertiseVideoDao.findById(id);
	}
	
	public void save(Tb_Vedio_Audit entity) throws Exception{
		advertiseVideoDao.save(entity);
	}
	
	
	public void update(Tb_Vedio_Audit entity) throws Exception {
		advertiseVideoDao.update(entity);
	}
	
	public void updateForSub(Tb_Vedio_Audit entity) throws Exception {
		advertiseVideoDao.updateForSub(entity);
		//advertiseOrderDao.updateOrderType(entity.getIf_sub()==2?entity.getUnified_serial_number():entity.getSerial_number());
	}
	
	public List<VideoDto> findByOrderNo(String orderNo){
		List<VideoDto> listDto = advertiseVideoDao.findByOrderNo(orderNo);
		if(listDto.size()>0&&listDto.get(0).getAudit_status()==2){
			listDto=advertiseVideoDao.findVedioByOrderNo(orderNo);
		}
		return listDto;
	}
	
	public List<VideoDto> findVedioByOrderNo(String orderNo){
		return advertiseVideoDao.findVedioByOrderNo(orderNo);
	}
	
	public void saveVedioAndUpdateOrder(List<Object[]> batch,String orderNo) throws Exception{
		try {
			saveForInsert(batch);
			advertiseOrderDao.updateOrderVedio(orderNo);
		} catch (Exception e) {
			throw e;
		}
	}
	public void saveForInsert(List<Object[]> batch){
		advertiseVideoDao.saveForInsert(batch);
	}
	public Tb_Vedio_Audit queryVedioByMd5FileName(String md5Str)throws Exception{
		Tb_Vedio_Audit vedio=null;
		try {
			vedio=advertiseVideoDao.queryVedioByMd5FileName(md5Str);
		} catch (Exception e) {
			throw e;
		}
		return vedio;
	}
}
