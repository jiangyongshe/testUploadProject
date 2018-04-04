package com.cwa.client.dao;

import java.util.List;

import org.springframework.jdbc.core.BeanPropertyRowMapper;

import com.cwa.client.dto.AdvertiserDeviceDto;
import com.cwa.client.dto.DeviceMonitorDto;
import com.cwa.client.model.Tb_advertiser_device;
import com.cwa.client.utils.Constant;
import com.cwa.client.utils.LogWriteUtil;

public class AdvertiserDeviceDao extends BaseDao<Tb_advertiser_device, AdvertiserDeviceDto> implements Constant{

	private static final LogWriteUtil logWriteUtil = LogWriteUtil.getSingleton();
	
	/**
	 * 查询设备监控详情
	 * @param advertiserId
	 * @return
	 */
	public List<DeviceMonitorDto> queryDeviceMonitor(Integer advertiserId){
		String sql = "SELECT A.DEVICE_ID,B.BEGIN_TIME,B.END_TIME,"
				   + "B.PLAY_NUMBER-C.PLAY_NUMBER as PLAY_NUMBER, "
				   + "C.PLAY_NUMBER selled_number,"
				   + "get_device_realtime_monitor(A.DEVICE_ID,A.DEVICE_STATUS) as STATUS "
				   + "from tb_advertiser_device A,tb_device_vedio_plan B,tb_device_vedio_count C "
				   + "where A.ADVERTISER_ID=? and A.DEVICE_ID=B.DEVICE_ID "
				   + "and A.DEVICE_ID=C.DEVICE_ID "
				   + "and C.PLAY_DATE=DATE_FORMAT(NOW(),'%Y-%m-%d') "
				   + "ORDER BY DATE_FORMAT(B.BEGIN_TIME,'%Y-%m-%d') ASC,"
				   + "DATE_FORMAT(B.END_TIME,'%Y-%m-%d') ASC";
		List<DeviceMonitorDto> list = null;
		logWriteUtil.writeLog(LOGTYPE_DBQUERY,"queryDeviceMonitor sql:"+sql+";params:"+advertiserId,LOGLEVEL_INFO,AdvertiserDeviceDao.class);
		list = jdbcTemplate.query(sql,BeanPropertyRowMapper.newInstance(DeviceMonitorDto.class),advertiserId);
		return list;
	}
	
	/**
	 * 查询设备详情
	 * @param advertiserId
	 * @return
	 */
	public List<AdvertiserDeviceDto> queryByAdvertiserId(Integer advertiserId){
		String sql = "SELECT A.DEVICE_ID,A.DEVICE_DETAIL FROM Tb_advertiser_device A WHERE A.ADVERTISER_ID=? ORDER BY DATE_FORMAT(A.COMMIT_TIME,'"+MYSQL_DATE_FORMAT_YCDHMS+"') DESC ";
		List<AdvertiserDeviceDto> list = null;
		logWriteUtil.writeLog(LOGTYPE_DBQUERY,"queryAdvertiser sql:"+sql+";params:"+advertiserId,LOGLEVEL_INFO,AdvertiserDeviceDao.class);
		list = jdbcTemplate.query(sql,BeanPropertyRowMapper.newInstance(AdvertiserDeviceDto.class),advertiserId);
		return list;
	}
	
	/**
	 * 查询设备详情
	 * @param advertiserId
	 * @return
	 */
	public AdvertiserDeviceDto queryDeviceRunStatus(String deviceId){
		String sql = "select m.id,m.device_id,m.DEVICE_STATUS,m.device_datetime commit_time,d.device_code device_detail from tb_device_realtime_monitor m,tb_advertiser_device d where m.device_id=d.device_id and m.device_id=?";
		List<AdvertiserDeviceDto> list = null;
		logWriteUtil.writeLog(LOGTYPE_DBQUERY,"queryAdvertiser sql:"+sql+";params:"+deviceId,LOGLEVEL_INFO,AdvertiserDeviceDao.class);
		list = jdbcTemplate.query(sql,BeanPropertyRowMapper.newInstance(AdvertiserDeviceDto.class),deviceId);
		return list.size()>0?list.get(0):null;
	}
	
}
