package com.cwa.client.dao;

import java.util.List;

import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.RowMapper;

import com.cwa.client.dto.CustomerWallet;
import com.cwa.client.model.Tb_Customer_Wallet;
import com.cwa.client.utils.Constant;
import com.cwa.client.utils.LogWriteUtil;

/**
 * 查询广告信息数据层
 */
public class CustomerWalletDao extends BaseDao<Tb_Customer_Wallet, CustomerWallet> implements Constant{

private static final LogWriteUtil logWriteUtil = LogWriteUtil.getSingleton();
	
	public Tb_Customer_Wallet findByAccountId(String accountId) {
		String sql="select * from Tb_Customer_Wallet where CUSTOMER_ID=?";
		RowMapper<Tb_Customer_Wallet> rowmapper=BeanPropertyRowMapper.newInstance(Tb_Customer_Wallet.class);
		List<Tb_Customer_Wallet> list = getJdbcTemplate().query(sql, rowmapper,accountId);
		logWriteUtil.writeLog("", "==== listSize:"+list.size(), LOGLEVEL_INFO, CustomerWalletDao.class);
		return list.size()>0?list.get(0):null;
	}
	
}
