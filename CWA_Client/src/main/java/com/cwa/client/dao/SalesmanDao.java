package com.cwa.client.dao;

import java.util.List;

import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.RowMapper;

import com.cwa.client.dto.BranchDto;
import com.cwa.client.dto.SalesPersonDto;
import com.cwa.client.dto.SalesmanDto;
import com.cwa.client.model.Tb_Salesman;
import com.cwa.client.utils.Constant;
import com.cwa.client.utils.LogWriteUtil;

public class SalesmanDao  extends BaseDao<Tb_Salesman, SalesmanDto> implements Constant{
	
	private static final LogWriteUtil logWriteUtil = LogWriteUtil.getSingleton();
	
	public BranchDto findBranchByCmpId(String CmpId){
		String sql="select ID,COMPANY_ID,COMPANY_NAME,COMPANY_FULL_NAME,CONTRACT_USER,CERTIFICATE_TYPE,ID_NUMBER,OPEN_DATE,REGISTER_FUND,OFFICE_ADDRESS,POSTAL_CODE,FAX,CONTACTS,TELEPHONE,E_MAIL,COMMIT_ID,COMMIT_TIME,COMPANY_STATUS,COMPANY_TYPE,SALESMAN_ID from tb_branch where COMPANY_ID=?";
		RowMapper<BranchDto> rowmapper=BeanPropertyRowMapper.newInstance(BranchDto.class);
		List<BranchDto> list = getJdbcTemplate().query(sql, rowmapper, CmpId);
		logWriteUtil.writeLog("", "++++listSize:"+list.size(), LOGLEVEL_INFO, SalesmanDao.class);
		return list.size()>0?list.get(0):null;
	}

	public SalesmanDto findBySalesmanid(String salesmanid) {
		String sql="select * from Tb_Salesman where salesman_id=?";
		RowMapper<SalesmanDto> rowmapper=BeanPropertyRowMapper.newInstance(SalesmanDto.class);
		List<SalesmanDto> list = getJdbcTemplate().query(sql, rowmapper, salesmanid);
		logWriteUtil.writeLog("", "++++listSize:"+list.size(), LOGLEVEL_INFO, SalesmanDao.class);
		return list.size()>0?list.get(0):null;
	}

	public SalesPersonDto findBySalesPersonid(String salesPersonId) {
		String sql="select * from Tb_salesperson where id=?";
		RowMapper<SalesPersonDto> rowmapper=BeanPropertyRowMapper.newInstance(SalesPersonDto.class);
		List<SalesPersonDto> list = getJdbcTemplate().query(sql, rowmapper, salesPersonId);
		logWriteUtil.writeLog("", "++++listSize:"+list.size(), LOGLEVEL_INFO, SalesPersonDto.class);
		return list.size()>0?list.get(0):null;
	}
	
	/**
	 * 修改佣金
	 * @param accountId
	 * @param money
	 */
	public void updateSalesmanCommission(String accountId,Double money){
		String sql = "UPDATE tb_salesman_commission set TOTAL_COMM=TOTAL_COMM+?,SALESMAN_AVAILABLE_COMM=SALESMAN_AVAILABLE_COMM+? where SALESMAN_ID=?";
		logWriteUtil.writeLog(LOGTYPE_DBQUERY, "sql:"+sql+";"+"param:"+money+","+money+","+accountId, LOGLEVEL_INFO, CustomerCommissionDao.class);
		jdbcTemplate.update(sql,money,money,accountId);
	}
	
	/**
	 * 修改报表数据库
	 * @param accountId 客户ID
	 * @param withdraw 出金
	 */
	public void updateSalesmanWithdraw(String accountId,Double withdraw){
		String sql = "UPDATE tb_salesman_comm_report A INNER JOIN (SELECT ID,WITHDRAW+? WITHDRAW,day_comm-? day_comm,today_available_comm-? today_available_comm FROM tb_salesman_comm_report WHERE salesman_ID = ? AND date_format(SETTLEMENT_DATE,'"+MYSQL_DATE_FORMAT_YMD+"')=date_format(NOW(),'"+MYSQL_DATE_FORMAT_YMD+"')) B ON A.ID=B.ID SET A.WITHDRAW = B.WITHDRAW,A.day_comm=B.day_comm,A.today_available_comm=B.today_available_comm ";
		logWriteUtil.writeLog(LOGTYPE_DBQUERY, "sql:"+sql+";"+"param:"+withdraw+","+accountId, LOGLEVEL_INFO, CustomerCommReportDao.class);
		jdbcTemplate.update(sql,withdraw,withdraw,withdraw,accountId);
	}
}
