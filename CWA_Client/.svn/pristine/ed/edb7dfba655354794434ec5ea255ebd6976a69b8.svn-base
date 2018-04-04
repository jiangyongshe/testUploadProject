package com.cwa.client.dao;

import java.util.List;

import org.springframework.jdbc.core.BeanPropertyRowMapper;
import com.cwa.client.dto.SystemSetDto;
import com.cwa.client.model.Tb_system_set;
import com.cwa.client.utils.Constant;
import com.cwa.client.utils.LogWriteUtil;

public class SystemSetDao extends BaseDao<Tb_system_set, SystemSetDto> implements Constant {

	private static final LogWriteUtil logWriteUtil = LogWriteUtil.getSingleton();
	
	/**
	 * 查询所有配置信息
	 * @return
	 */
	public List<SystemSetDto> queryAllData(){
		String sql = "SELECT * FROM Tb_system_set";
		logWriteUtil.writeLog(LOGTYPE_DBQUERY, "sql:"+sql, LOGLEVEL_INFO, SystemSetDao.class);
		List<SystemSetDto> list = null;
		list = this.jdbcTemplate.query(sql.toString(), BeanPropertyRowMapper.newInstance(SystemSetDto.class));
		logWriteUtil.writeLog(LOGTYPE_DBQUERY, "size:"+list.size(), LOGLEVEL_INFO, SystemSetDao.class);
		return list;
	}
	
	/**
	 * 根据key获取value
	 * @param key
	 * @return
	 */
	public String getSystemValueByKey(String key){
		String sql = "SELECT SYSTEM_VALUE FROM Tb_system_set WHERE SYSTEM_KEY=?";
		logWriteUtil.writeLog(LOGTYPE_DBQUERY, "sql:"+sql+";params:"+key, LOGLEVEL_INFO, SystemSetDao.class);
		String value = null;
		try {
			value = this.jdbcTemplate.queryForObject(sql.toString(), String.class,key);
		} catch (Exception e) {
			value = null;
			e.printStackTrace();
			logWriteUtil.writeLog(LOGTYPE_DBQUERY, "getSystemValueByKey exception:"+e.getMessage(), LOGLEVEL_ERROR, SystemSetDao.class);
		}
		logWriteUtil.writeLog(LOGTYPE_DBQUERY, "value:"+value, LOGLEVEL_INFO, SystemSetDao.class);
		return value;
	}
}
