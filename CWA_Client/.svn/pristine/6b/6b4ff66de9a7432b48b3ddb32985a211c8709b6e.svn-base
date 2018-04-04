package com.cwa.client.dao;

import java.util.List;

import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.RowMapper;

import com.cwa.client.dto.VideoDto;
import com.cwa.client.model.Tb_Vedio_Audit;
import com.cwa.client.utils.Constant;
import com.cwa.client.utils.LogWriteUtil;
import com.cwa.client.web.AdVideoController;

import net.sf.json.JSONObject;

/**
 * 查询广告信息数据层
 */
public class AdvertiseVideoDao extends BaseDao<Tb_Vedio_Audit, VideoDto> implements Constant{

private static final LogWriteUtil logWriteUtil = LogWriteUtil.getSingleton();
	
	/**
	 * 批量生成订单
	 * @param batchInsertOrder 生成订单数据
	 * @return
	 */
	public int[] batchInsertOrder(List<Object[]> batchInsertOrder)throws Exception {
		int[] updateCounts=null; 
		try {
			updateCounts = jdbcTemplate.batchUpdate(
	 				"INSERT INTO tb_order(SERIAL_NUMBER,DEVICE_ID,ORDER_STATUS,ACCOUNT_ID,ACCOUNT_IP,COMMIT_TIME,PAY_TYPE,PLAY_BEGIN_TIME,PLAY_END_TIME,SHOP_NAME,TOTAL_PRICE,PRICE,RESULT,AUDIT_ID,AUDIT_DATETIME,ADVERTISER_ID) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
	 				batchInsertOrder);
		} catch (Exception e) {
			 throw e;
		}
		return updateCounts;
	}

	public List<VideoDto> findByOrderNo(String orderNo) {
		String sql="select v.*,o.upload_file_num upFileNum,o.device_id from Tb_Vedio_audit v left join tb_order o on o.serial_number=v.serial_number and v.commit_id=o.account_id where v.serial_number=? or v.UNIFIED_SERIAL_NUMBER=?";
		RowMapper<VideoDto> rowmapper=BeanPropertyRowMapper.newInstance(VideoDto.class);
		List<VideoDto> list = getJdbcTemplate().query(sql, rowmapper,orderNo,orderNo);
		logWriteUtil.writeLog("", "==== listSize:"+list.size(), LOGLEVEL_INFO, AdVideoController.class);
		return list;
	}
	
	public List<VideoDto> findVedioByOrderNo(String orderNo) {
		String sql="select v.*,o.upload_file_num upFileNum,o.device_id from Tb_Vedio v left join tb_order o on o.serial_number=v.serial_number and v.commit_id=o.account_id where v.serial_number=? or v.UNIFIED_SERIAL_NUMBER=?";
		RowMapper<VideoDto> rowmapper=BeanPropertyRowMapper.newInstance(VideoDto.class);
		List<VideoDto> list = getJdbcTemplate().query(sql, rowmapper,orderNo,orderNo);
		logWriteUtil.writeLog("", "==== listSize:"+list.size(), LOGLEVEL_INFO, AdVideoController.class);
		return list;
	}

	public Tb_Vedio_Audit queryVedioByMd5FileName(String md5Str)throws Exception{
		Tb_Vedio_Audit vedio=null;
		try {
			String sqlStr="select * from tb_vedio_audit  where substring_index(FILE_NAME ,'.', 1)=?";
			RowMapper<Tb_Vedio_Audit> rowMapper = BeanPropertyRowMapper.newInstance(Tb_Vedio_Audit.class);
			List<Tb_Vedio_Audit> dblist=getJdbcTemplate().query(sqlStr, rowMapper, md5Str);
			if(dblist!=null&&dblist.size()>0){
				vedio=dblist.get(dblist.size()-1);
			}else{
				vedio=null;
			}
		} catch (Exception e) {
			throw e;
		}
		return vedio;
	} 
	
	//支付批量修改订单状态
	public void updateVideoType(String orderNo) {
		String sql="update tb_vedio set order_type=3 where SERIAL_NUMBER=?";
		this.jdbcTemplate.update(sql, orderNo);
	}

	public void saveForInsert(List<Object[]> batch) {
		String sql= "INSERT INTO tb_vedio_audit(NAME,FILE_NAME,FILE_PATH,PLAY_PATH,INTRODUCTION,COMMIT_ID,COMMIT_TIME,AUDIT_ID,AUDIT_DATETIME,AUDIT_STATUS,VEDIO_TYPE,SERIAL_NUMBER,OLD_FILE_NAME,FILE_TYPE,ORDER_TYPE,IF_SUB,UNIFIED_SERIAL_NUMBER)"
				+ "VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
		int[] saveCounts=null; 
		try {
			saveCounts = jdbcTemplate.batchUpdate(sql,batch);
			
			logWriteUtil.writeLog("", "====saveForInsert saveCount:"+saveCounts, LOGLEVEL_INFO, AdVideoController.class);
			/*updateCounts = jdbcTemplate.batchUpdate(
	 				"INSERT INTO tb_order(SERIAL_NUMBER,DEVICE_ID,ORDER_STATUS,vedio_id,ACCOUNT_ID,ACCOUNT_IP,COMMIT_TIME,PAY_TYPE,PLAY_BEGIN_TIME,PLAY_END_TIME,SHOP_NAME,TOTAL_PRICE,PRICE,RESULT,ADVERTISER_ID,old_total_price,total_day_number) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
	 				new BatchPreparedStatementSetter() {
		        @Override
		        public void setValues(PreparedStatement ps, int i) throws SQLException {
		            Object[] args = batchInsertOrder.get(i);
		            ps.setString(1, (String) args[0]);
		            ps.setString(2, (String) args[1]);
		            ps.setString(3, (String) args[2]);
		        }

		        @Override
		        public int getBatchSize() {
		            return 0;
		        }
		    });*/
		} catch (Exception e) {
			 throw e;
		}
		
		
		
	}

	public void updateForSub(Tb_Vedio_Audit entity) {
		String sql="update Tb_Vedio_Audit set NAME=?,FILE_NAME=?,FILE_PATH=?,PLAY_PATH=?,INTRODUCTION=?"
				+ ",OLD_FILE_NAME=?,VEDIO_TYPE=?,audit_datetime=?,audit_id=?,audit_status=? where SERIAL_NUMBER=? or unified_serial_number=?";
		
		this.jdbcTemplate.update(sql, entity.getName(),entity.getFile_name(),entity.getFile_path(),entity.getPlay_path(),entity.getIntroduction(),entity.getOld_file_name(),entity.getVedio_type(),entity.getAudit_datetime(),entity.getAudit_id(),entity.getAudit_status(),entity.getSerial_number(),entity.getSerial_number());
		logWriteUtil.writeLog("", "====updateForSub entity:"+JSONObject.fromObject(entity), LOGLEVEL_INFO, AdVideoController.class);
	}
}
