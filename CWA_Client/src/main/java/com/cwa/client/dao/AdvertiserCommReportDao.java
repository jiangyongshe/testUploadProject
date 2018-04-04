package com.cwa.client.dao;

import com.cwa.client.dto.AdvertiserCommReportDto;
import com.cwa.client.model.Tb_advertiser_comm_report;
import com.cwa.client.utils.Constant;
import com.cwa.client.utils.LogWriteUtil;

public class AdvertiserCommReportDao extends BaseDao<Tb_advertiser_comm_report, AdvertiserCommReportDto> implements Constant {

	private static final LogWriteUtil logWriteUtil = LogWriteUtil.getSingleton();
	
	/**
	 * 修改出金
	 * @param accountId 广告商ID
	 * @param withdraw 出金
	 */
	public void updateWithdraw(String accountId,Double withdraw){
		String sql = "UPDATE Tb_advertiser_comm_report A INNER JOIN (SELECT ID,WITHDRAW+? WITHDRAW,today_comm-? today_comm,today_available_comm-? today_available_comm FROM Tb_advertiser_comm_report WHERE ADVERTISER_ID = ? AND date_format(SETTLEMENT_DATE,'"+MYSQL_DATE_FORMAT_YMD+"')=date_format(NOW(),'"+MYSQL_DATE_FORMAT_YMD+"')) B ON A.ID=B.ID SET A.WITHDRAW = B.WITHDRAW,A.today_comm=B.today_comm,A.today_available_comm=B.today_available_comm ";
		logWriteUtil.writeLog(LOGTYPE_DBQUERY, "sql:"+sql+";"+"param:"+withdraw+","+accountId, LOGLEVEL_INFO, AdvertiserCommReportDao.class);
		jdbcTemplate.update(sql,withdraw,withdraw,withdraw,accountId);
	}
	
	public void insert(Tb_advertiser_comm_report entity){
		String sql="insert into Tb_Advertiser_Comm_Report(advertiser_id,settlement_date,shop_name) values(?,?,?)";
		this.jdbcTemplate.update(sql,entity.getAdvertiser_id(),entity.getSettlement_date(),entity.getShop_name());
	}

}