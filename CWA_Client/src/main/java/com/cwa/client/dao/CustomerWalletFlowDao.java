package com.cwa.client.dao;

import java.util.List;

import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.RowMapper;

import com.cwa.client.dto.CustomerWalletFlow;
import com.cwa.client.model.Tb_Customer_Wallet_Flow;
import com.cwa.client.utils.Constant;
import com.cwa.client.utils.LogWriteUtil;

/**
 * 查询广告信息数据层
 */
public class CustomerWalletFlowDao extends BaseDao<Tb_Customer_Wallet_Flow, CustomerWalletFlow> implements Constant{

private static final LogWriteUtil logWriteUtil = LogWriteUtil.getSingleton();
	
	public CustomerWalletFlow findByAccountId(String accountId,Integer type) {
		String sql="select * from Tb_Customer_Wallet_Flow where CUSTOMER_ID=? and flow_type=?";
		RowMapper<CustomerWalletFlow> rowmapper=BeanPropertyRowMapper.newInstance(CustomerWalletFlow.class);
		List<CustomerWalletFlow> list = getJdbcTemplate().query(sql, rowmapper,accountId,type);
		logWriteUtil.writeLog("", "==== listSize:"+list.size(), LOGLEVEL_INFO, CustomerWalletFlowDao.class);
		return list.size()>0?list.get(0):null;
	}
	
	public void deleteByAccountId(String accountId,String ids) {
		String sql="delete from Tb_Customer_Wallet_Flow where CUSTOMER_ID=? ";
		String[] strArr = (accountId+","+ids).split(",");
		for (int i = 1; i < strArr.length; i++) {
			if(i==1){
				sql+="and id in(?";
			}else{
				sql+=",?";
			}
			if(i==strArr.length-1){
				sql+=")";
			}
		}
		int length = this.jdbcTemplate.update(sql, strArr); 
		logWriteUtil.writeLog("", "==== delete walletFlow "+length+" ids:"+ids+"----accountId:"+accountId+"==sql:"+sql, LOGLEVEL_INFO, CustomerWalletFlowDao.class);
	}
}
