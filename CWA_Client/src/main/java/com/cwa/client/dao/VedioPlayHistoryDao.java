package com.cwa.client.dao;

import java.util.List;

import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.RowMapper;

import com.cwa.client.dto.VedioPlayHistoryDto;
import com.cwa.client.model.Tb_Vedio_Play_History;
import com.cwa.client.utils.Constant;
import com.cwa.client.utils.LogWriteUtil;

public class VedioPlayHistoryDao  extends BaseDao<Tb_Vedio_Play_History, VedioPlayHistoryDto> implements Constant{
	
	private static final LogWriteUtil logWriteUtil = LogWriteUtil.getSingleton();
	
	public VedioPlayHistoryDto findBranchByCmpId(String CmpId){
		String sql="select ID,COMPANY_ID,COMPANY_NAME,COMPANY_FULL_NAME,CONTRACT_USER,CERTIFICATE_TYPE,ID_NUMBER,OPEN_DATE,REGISTER_FUND,OFFICE_ADDRESS,POSTAL_CODE,FAX,CONTACTS,TELEPHONE,E_MAIL,COMMIT_ID,COMMIT_TIME,COMPANY_STATUS,COMPANY_TYPE,SALESMAN_ID from tb_branch where COMPANY_ID=?";
		RowMapper<VedioPlayHistoryDto> rowmapper=BeanPropertyRowMapper.newInstance(VedioPlayHistoryDto.class);
		List<VedioPlayHistoryDto> list = getJdbcTemplate().query(sql, rowmapper, CmpId);
		logWriteUtil.writeLog("", "++++listSize:"+list.size(), LOGLEVEL_INFO, VedioPlayHistoryDao.class);
		return list.size()>0?list.get(0):null;
	}
}
