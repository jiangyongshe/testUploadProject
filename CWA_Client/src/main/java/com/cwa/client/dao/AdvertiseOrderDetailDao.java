package com.cwa.client.dao;

import java.util.ArrayList;
import java.util.List;

import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.RowMapper;

import com.cwa.client.dto.AdvertiseInfoDto;
import com.cwa.client.dto.OrderDetailDto;
import com.cwa.client.model.Tb_Order_Detail;
import com.cwa.client.utils.Constant;
import com.cwa.client.utils.LogWriteUtil;

/**
 * 查询广告信息数据层
 */
public class AdvertiseOrderDetailDao extends BaseDao<Tb_Order_Detail, OrderDetailDto> implements Constant{

private static final LogWriteUtil logWriteUtil = LogWriteUtil.getSingleton();
	
	/**
	 * 批量生成订单详情
	 * @param batchInsertOrder 生成订单详情数据
	 * @return
	 */
	public int[] batchInsertOrderDetail(final List<Object[]> batchInsertOrderDetail)throws Exception {
		int[] updateCounts=null; 
		try {
			updateCounts = jdbcTemplate.batchUpdate(
	 				"INSERT INTO tb_order_detail(SERIAL_NUMBER,DEVICE_ID,BEGIN_TIME,END_TIME,COMMIT_TIME,PLAY_DATE,ACCOUNT_ID,price)VALUES (?,?,?,?,?,?,?,?)",
	 				batchInsertOrderDetail);
			/*updateCounts = jdbcTemplate.batchUpdate(
					"INSERT INTO tb_order_detail(SERIAL_NUMBER,DEVICE_ID,BEGIN_TIME,END_TIME,COMMIT_TIME,PLAY_DATE,ACCOUNT_ID,price)VALUES (?,?,?,?,?,?,?,?)",
	 				new BatchPreparedStatementSetter() {
		        @Override
		        public void setValues(PreparedStatement ps, int i) throws SQLException {
		            Object[] args = batchInsertOrderDetail.get(i);
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
		return updateCounts;
	}
	
	/**
	 * 批量删除订单详情
	 * @param batchInsertOrder 生成订单数据
	 * @return
	 */
	public int[] batchDeleteOrderDetail(List<Object[]> batchDeleteOrderDetail)throws Exception {
		int[] updateCounts=null; 
		try {
			updateCounts = jdbcTemplate.batchUpdate(
	 				"delete from tb_order_detail where serial_number=? and not exists (select * from (select d.id from tb_order_detail d where d.serial_number=? limit 0,1) a where a.id=tb_order_detail.id) ",
	 				batchDeleteOrderDetail);
		} catch (Exception e) {
			 throw e;
		}
		return updateCounts;
	}
	
	/**
	 * 根据订单号查询订单详情
	 * @param orderNO 订单号
	 * @return
	 */
	public List<OrderDetailDto> queryEffectualTimeByOrderNo(String orderNo,String accountId,String beginTime,String endTime)throws Exception {
		String sql="select * from tb_order_detail where serial_number=? and account_id=? ";
		String param=orderNo+","+accountId;
		if(beginTime!=null){
			sql+="and play_date>=? ";
			param+=","+beginTime;
		}
		if(endTime!=null){
			sql+="and play_date<=? ";
			param+=","+endTime;
		}
		List<OrderDetailDto> list=new ArrayList<>();
		sql+="order by play_date";
		try {
			logWriteUtil.writeLog("", "====sql:"+sql+"====param:"+param, LOGLEVEL_INFO, AdvertiseOrderDetailDao.class);
			list=jdbcTemplate.query(sql, BeanPropertyRowMapper.newInstance(OrderDetailDto.class),param.split(","));
		} catch (Exception e) {
			 throw e;
		}
		return list;
	}
	
	public OrderDetailDto queryOrderDetailBySerialNum(String orderId)throws Exception{
		OrderDetailDto order=null;
		 try {
				   String sql="select * from tb_order_detail where SERIAL_NUMBER=?";
				   RowMapper<OrderDetailDto> rowMapper = BeanPropertyRowMapper.newInstance(OrderDetailDto.class);
				   order=getJdbcTemplate().queryForObject(sql, rowMapper,orderId);
			} catch (Exception e) {
				order=null;
				throw e;
			}
			   return order;
	}
	
	public List<AdvertiseInfoDto> queryOrderDetailAndOrderBySerialNum(String orderId,String accountId)throws Exception{
		 List<AdvertiseInfoDto> dto=null;
		 try {
			   String sql="select distinct o.if_sub,o.serial_number,o.advertiser_id id,o.file_type,o.device_id,o.play_begin_time startDate,o.play_end_time endDate,CONCAT(d.begin_time,\"-\",d.end_time) idle_time,o.price ad_price,total_price sumPrice from tb_order o,tb_order_detail d where o.SERIAL_NUMBER=d.SERIAL_NUMBER and (o.SERIAL_NUMBER=? or o.unified_serial_number=?) and o.account_id=? ";
			   RowMapper<AdvertiseInfoDto> rowMapper = BeanPropertyRowMapper.newInstance(AdvertiseInfoDto.class);
			   dto=getJdbcTemplate().query(sql, rowMapper,orderId,orderId,accountId);
			   logWriteUtil.writeLog("", "====sql:"+sql+"====param:"+orderId+"==accountId:"+accountId+"====listSize:"+dto.size(), LOGLEVEL_INFO, AdvertiseOrderDetailDao.class);
		 } catch (Exception e) {
				e.printStackTrace();
		 }
		 return dto;
	}
}
