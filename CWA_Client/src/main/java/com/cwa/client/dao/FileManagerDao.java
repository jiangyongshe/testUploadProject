package com.cwa.client.dao;

import java.util.ArrayList;
import java.util.List;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import com.cwa.client.dto.FileManagerDto;
import com.cwa.client.model.Tb_file_manager;
import com.cwa.client.utils.Constant;
import com.cwa.client.utils.LogWriteUtil;

public class FileManagerDao extends BaseDao<Tb_file_manager, FileManagerDto> implements Constant {

	private static final LogWriteUtil logWriteUtil = LogWriteUtil.getSingleton();
	
	/**
	 * 查询超过一星期未处理的文件
	 */
	public List<FileManagerDto> query(){
		
		String sql = "SELECT A.id,A.uploadTime,A.filePath,A.accountId,A.accountType,A.status FROM tb_file_manager A WHERE A.status = 1 AND HOUR(TIMEDIFF(NOW(),A.uploadTime))/24>=7";
		
		List<FileManagerDto> list = null;
		try {
			list = this.jdbcTemplate.query(sql,BeanPropertyRowMapper.newInstance(FileManagerDto.class));
		} catch (Exception e) {
			e.printStackTrace();
			logWriteUtil.writeLog(LOGTYPE_DBQUERY, e.getMessage(), LOGLEVEL_ERROR, FileManagerDao.class);
			list = new ArrayList<FileManagerDto>();
		}
		return list;
	}
	
	/**
	 * 更新文件状态
	 */
	public void upadteFileStatus(FileManagerDto param){
		String sql = "UPDATE tb_file_manager A SET A.status=? WHERE A.filePath=? ";
		this.jdbcTemplate.update(sql,param.getStatus(),param.getFilePath());
	}
}
