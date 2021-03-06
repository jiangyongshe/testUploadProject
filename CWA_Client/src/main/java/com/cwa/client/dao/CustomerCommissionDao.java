package com.cwa.client.dao;

import org.springframework.jdbc.core.BeanPropertyRowMapper;
import com.cwa.client.dto.CustomerCommissionDto;
import com.cwa.client.model.Tb_customer_commission;
import com.cwa.client.utils.Constant;
import com.cwa.client.utils.LogWriteUtil;

public class CustomerCommissionDao extends BaseDao<Tb_customer_commission, CustomerCommissionDto> implements Constant {

	private static final LogWriteUtil logWriteUtil = LogWriteUtil.getSingleton();
	
	/**
	 * 根据用户登录账号查询用户佣金
	 * @param accountId
	 * @return
	 */
	public CustomerCommissionDto queryCustomerCommission(String id,String userType){
		String sql = "SELECT A.ID,A.LoginUser customer_id,A.TOTAL_COMM,A.AVAILABLE_COMM,A.SETTLEMENT_DATE,comm* FROM tableName A WHERE A.LoginUser=? ";
		if(TWO==Integer.parseInt(userType)){
			sql=sql.replace("tableName", "tb_advertiser_commission").replace("LoginUser", "ADVERTISER_ID").replace("comm*", "ad_comm,r_comm m_comm ");
		}else if(THREE==Integer.parseInt(userType)){
			sql=sql.replace("tableName", "tb_partner_commission").replace("LoginUser", "PARTNER_ID").replace("comm*", "ad_comm,m_comm ");
		}else if(FOUR==Integer.parseInt(userType)){
			sql=sql.replace("tableName", "tb_agent_commission").replace("LoginUser", "AGENT_ID").replace("comm*", "ad_comm,m_comm ");
		}else if(FIVE==Integer.parseInt(userType)){
			sql=sql.replace("tableName", "tb_salesman_commission").replace("LoginUser", "SALESMAN_ID").replace("comm*", "ad_comm,m_comm ").replace("AVAILABLE_COMM", "SALESMAN_AVAILABLE_COMM AVAILABLE_COMM ");
		}else if(SIX==Integer.parseInt(userType)){
			sql=sql.replace("tableName", "tb_salesperson_commission").replace("LoginUser", "SALESPERSON_ID").replace("comm*", "ad_comm,m_comm ");
		}else{
			sql=sql.replace("tableName", "tb_customer_commission").replace("LoginUser", "customer_id").replace("comm*", "0");
		}
		logWriteUtil.writeLog(LOGTYPE_DBQUERY, "sql:"+sql+";"+"param accountId:"+id+"==userType:"+userType, LOGLEVEL_INFO, CustomerCommissionDao.class);
		CustomerCommissionDto customerCommissionDto = null;
		try {
			customerCommissionDto = (CustomerCommissionDto)jdbcTemplate.queryForObject(sql, BeanPropertyRowMapper.newInstance(CustomerCommissionDto.class),id);
		} catch (Exception e) {
			e.printStackTrace();
			customerCommissionDto = null;
		}
		return customerCommissionDto;
	}
	
	/**
	 * 修改佣金
	 * @param accountId
	 * @param money
	 */
	public void updateCustomerCommission(String accountId,Double money){
		String sql = "UPDATE tb_customer_commission A INNER JOIN (SELECT ID,TOTAL_COMM+? TOTAL_COMM,AVAILABLE_COMM+? AVAILABLE_COMM FROM tb_customer_commission WHERE CUSTOMER_ID=?) B ON A.ID = B.ID SET A.TOTAL_COMM = B.TOTAL_COMM, A.AVAILABLE_COMM = B.AVAILABLE_COMM";
		logWriteUtil.writeLog(LOGTYPE_DBQUERY, "sql:"+sql+";"+"param:"+money+","+money+","+accountId, LOGLEVEL_INFO, CustomerCommissionDao.class);
		jdbcTemplate.update(sql,money,money,accountId);
	}
	
}
