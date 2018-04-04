package com.cwa.client.dao;

import java.util.List;

import org.springframework.jdbc.core.BeanPropertyRowMapper;

import com.cwa.client.dto.AdvertiserPicDto;
import com.cwa.client.model.Tb_advertiser_pic;
import com.cwa.client.utils.Constant;
import com.cwa.client.utils.LogWriteUtil;

public class AdvertiserPicDao extends BaseDao<Tb_advertiser_pic, AdvertiserPicDto> implements Constant {

	private static final LogWriteUtil logWriteUtil = LogWriteUtil.getSingleton();
	
	/**
	 * 根据登录账号查询数据
	 * @param accountId
	 * @return
	 */
	public List<AdvertiserPicDto> queryByAccountId(String accountId){
		String sql = "SELECT A.ID,A.ADVERTISER_ID,A.PIC,A.CREATE_TIME FROM Tb_advertiser_pic A WHERE A.ADVERTISER_ID=? ";
		logWriteUtil.writeLog(LOGTYPE_DBQUERY,"queryByAccountId sql is "+sql+",params is "+accountId+"." ,LOGLEVEL_INFO,AdvertiserPicDao.class);
		List<AdvertiserPicDto> list = this.jdbcTemplate.query(sql, BeanPropertyRowMapper.newInstance(AdvertiserPicDto.class),accountId);
		return list;
	}
	
	/**
	 * 根据ID删除
	 * @param id
	 */
	public void deleteById(Integer id){
		String sql = "DELETE FROM Tb_advertiser_pic WHERE ID = ?";
		logWriteUtil.writeLog(LOGTYPE_DBQUERY,"deleteById sql is "+sql+",params is "+id+"." ,LOGLEVEL_INFO,AdvertiserPicDao.class);
		this.jdbcTemplate.update(sql,id);
		
	}
}
