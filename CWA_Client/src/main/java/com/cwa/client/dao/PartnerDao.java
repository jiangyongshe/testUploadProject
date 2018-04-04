package com.cwa.client.dao;

import java.util.List;

import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.RowMapper;

import com.cwa.client.dto.PartnerDto;
import com.cwa.client.model.Tb_Partner;
import com.cwa.client.utils.Constant;
import com.cwa.client.utils.LogWriteUtil;


public class PartnerDao extends BaseDao<Tb_Partner, PartnerDto> implements Constant{
	
	private static final LogWriteUtil logWriteUtil = LogWriteUtil.getSingleton();
	
	public int findAdminByAccountId(String accountId){
		String sql="select * from tb_admin_account where account_id=? or mobile=?";
		RowMapper<PartnerDto> rowmapper=BeanPropertyRowMapper.newInstance(PartnerDto.class);
		List<PartnerDto> list = getJdbcTemplate().query(sql, rowmapper, accountId,accountId);
		logWriteUtil.writeLog("", "++++listSize:"+list.size(), LOGLEVEL_INFO, PartnerDao.class);
		return list.size();
	}
	
	public void insertCommonReport(String accountId){
		String sql="insert into Tb_partner_Comm_Report(partner_id,settlement_date) values(?,date_format(now(),'%Y-%m-%d'))";
		logWriteUtil.writeLog(LOGTYPE_DBQUERY, "sql:"+sql+";"+"param:"+accountId, LOGLEVEL_INFO, PartnerDao.class);
		this.jdbcTemplate.update(sql,accountId);
	}
	
	public void insertAdmin(String accountId,String passWord){
		String sql="insert into tb_admin_account(mobile,status,open_date,password,user_type,account_id,role_id,MERCHANTS_CENTER_MANAGER) values(?,,date_format(now(),'%Y-%m-%d'))";
		logWriteUtil.writeLog(LOGTYPE_DBQUERY, "sql:"+sql+";"+"param:"+accountId, LOGLEVEL_INFO, PartnerDao.class);
		this.jdbcTemplate.update(sql,accountId);
	}
}
