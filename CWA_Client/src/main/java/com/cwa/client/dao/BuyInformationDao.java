package com.cwa.client.dao;

import java.util.List;
import java.util.Map;

import com.cwa.client.dto.BuyInformationDto;
import com.cwa.client.model.Tb_buy_information;
import com.cwa.client.utils.Constant;
import com.cwa.client.utils.LogWriteUtil;

public class BuyInformationDao extends BaseDao<Tb_buy_information, BuyInformationDto> implements Constant {

	private static final LogWriteUtil logWriteUtil = LogWriteUtil.getSingleton();
	
	@SuppressWarnings("unchecked")
	public void insert(Tb_buy_information param){
		Map<String,Object> map = this.packageInsertSQL(param);
		String sql = map.get("sql").toString();
		List<Object> params = (List<Object>)map.get("params");
		logWriteUtil.writeLog(LOGTYPE_DBQUERY, "sql:"+sql+";"+"param:"+params, LOGLEVEL_INFO, BuyInformationDao.class);
		this.jdbcTemplate.update(sql,params.toArray());
	}
}
