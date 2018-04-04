package com.cwa.client.dao;

import com.cwa.client.dto.CustomerCommReportDto;
import com.cwa.client.model.Tb_customer_comm_report;
import com.cwa.client.utils.Constant;
import com.cwa.client.utils.LogWriteUtil;

import net.sf.json.JSONObject;

public class CustomerCommReportDao extends BaseDao<Tb_customer_comm_report, CustomerCommReportDto> implements Constant {

	private static final LogWriteUtil logWriteUtil = LogWriteUtil.getSingleton();
	
	/**
	 * 修改出金
	 * @param accountId 客户ID
	 * @param withdraw 出金
	 */
	public void updateWithdraw(String accountId,Double withdraw){
		String sql = "UPDATE tb_customer_comm_report A INNER JOIN (SELECT ID,WITHDRAW+? WITHDRAW,today_comm-? today_comm,today_available_comm-? today_available_comm,deposit+? deposit,WALLET_DEPOSIT+? WALLET_DEPOSIT FROM tb_customer_comm_report WHERE CUSTOMER_ID = ? AND date_format(SETTLEMENT_DATE,'"+MYSQL_DATE_FORMAT_YMD+"')=date_format(NOW(),'"+MYSQL_DATE_FORMAT_YMD+"')) B ON A.ID=B.ID SET A.WITHDRAW = B.WITHDRAW,A.today_comm=B.today_comm,A.today_available_comm=B.today_available_comm,A.deposit=B.deposit,A.WALLET_DEPOSIT=B.WALLET_DEPOSIT ";
		logWriteUtil.writeLog(LOGTYPE_DBQUERY, "sql:"+sql+";"+"param:"+withdraw+","+accountId, LOGLEVEL_INFO, CustomerCommReportDao.class);
		jdbcTemplate.update(sql,withdraw,withdraw,withdraw,withdraw,withdraw,accountId);
	}
	
	public void insert(Tb_customer_comm_report entity){
		String sql="insert into Tb_customer_Comm_Report(customer_id,settlement_date,customer_name) values(?,?,?)";
		logWriteUtil.writeLog(LOGTYPE_DBQUERY, "sql:"+sql+";"+"param:"+JSONObject.fromObject(entity), LOGLEVEL_INFO, CustomerCommReportDao.class);
		this.jdbcTemplate.update(sql,entity.getCustomer_id(),entity.getSettlement_date(),entity.getCustomer_name());
	}
}